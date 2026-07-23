import express from 'express';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

const projectId = process.env.GOOGLE_CLOUD_PROJECT || process.env.GCP_PROJECT || 'nfc-tag-503214';

// Initialize Firebase Admin SDK
if (getApps().length === 0) {
  try {
    initializeApp({ projectId });
    console.log(`[Firebase] Initialized with projectId "${projectId}".`);
  } catch (error) {
    console.error('[Firebase] Initialization error:', error.message);
  }
}

// Support named database 'nfctag' (as configured in Google Cloud Firestore) or fallback to default
const dbName = process.env.FIRESTORE_DATABASE_ID || 'nfctag';
let db;
try {
  db = getFirestore(dbName);
  console.log(`[Firestore] Connected to database "${dbName}"`);
} catch (err) {
  console.warn(`[Firestore] Could not connect to "${dbName}", falling back to default database:`, err.message);
  db = getFirestore();
}

// Fixed canonical public base URL for Cloud Run (defaults to custom domain https://nfc.csd-station.it)
const CANONICAL_BASE_URL = (process.env.BASE_URL || 'https://nfc.csd-station.it').replace(/\/$/, '');

function getBaseUrl() {
  return CANONICAL_BASE_URL;
}

// Generate properly encoded shortUrl (handles spaces, accents like "Autofficina Calò")
function buildShortUrl(slug) {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/${encodeURIComponent(slug)}`;
}

/**
 * Synchronize all links in Firestore database:
 * Ensures every document with a `destinationUrl` has a valid, properly formatted `shortUrl`.
 */
async function syncAllLinks() {
  try {
    console.log('[Firestore Sync] Running full sync of links collection...');
    const snapshot = await db.collection('links').get();
    const updatePromises = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      const slug = doc.id;
      const expectedShortUrl = buildShortUrl(slug);

      if (data.destinationUrl && (!data.shortUrl || data.shortUrl !== expectedShortUrl)) {
        console.log(`[Firestore Sync] Updating shortUrl for "${slug}" -> ${expectedShortUrl}`);
        updatePromises.push(
          doc.ref.update({ shortUrl: expectedShortUrl }).catch((err) => {
            console.error(`[Firestore Sync Error] Failed to update "${slug}":`, err.message);
          })
        );
      }
    });

    if (updatePromises.length > 0) {
      await Promise.all(updatePromises);
      console.log(`[Firestore Sync] Successfully synced ${updatePromises.length} shortUrl field(s).`);
    } else {
      console.log('[Firestore Sync] All shortUrl fields are up to date.');
    }
  } catch (err) {
    console.error('[Firestore Sync Error] Failed full sync:', err.message);
  }
}

// Real-time Firestore Listener for immediate updates when server is active
function startAutoShortUrlSync() {
  console.log('[Firestore Sync] Starting real-time shortUrl sync listener...');
  try {
    db.collection('links').onSnapshot(
      async (snapshot) => {
        const updatePromises = [];
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added' || change.type === 'modified') {
            const doc = change.doc;
            const data = doc.data();
            const slug = doc.id;
            const expectedShortUrl = buildShortUrl(slug);

            if (data.destinationUrl && (!data.shortUrl || data.shortUrl !== expectedShortUrl)) {
              updatePromises.push(
                doc.ref.update({ shortUrl: expectedShortUrl }).catch((err) => {
                  console.error(`[Firestore Sync Error] Failed to update "${slug}":`, err.message);
                })
              );
            }
          }
        });

        if (updatePromises.length > 0) {
          await Promise.all(updatePromises);
          console.log(`[Firestore Sync] Real-time snapshot updated ${updatePromises.length} document(s).`);
        }
      },
      (error) => {
        console.error('[Firestore Sync Error] Snapshot listener error:', error.message);
      }
    );
  } catch (err) {
    console.error('[Firestore Sync Error] Failed to attach listener:', err.message);
  }
}

// Run full sync and start real-time listener on server boot
syncAllLinks().then(() => {
  startAutoShortUrlSync();
});

// Middleware
app.use(express.json());

// Path to compiled Vite frontend static files
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Health check endpoint for Cloud Run
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Manual trigger endpoint to force sync all links instantly
app.get('/api/sync-links', async (req, res) => {
  await syncAllLinks();
  res.json({ success: true, message: 'Sync complete' });
});

// Known SPA static routes for CSD Station website
const SPA_ROUTES = new Set(['privacy-policy', 'terms-of-service', 'cookie-policy', 'api']);

/**
 * GET /:slug - URL Shortener Redirect & Analytics Tracker
 */
app.get('/:slug', async (req, res, next) => {
  // Decode slug parameter (handles %20 and special characters)
  let rawSlug = req.params.slug;
  let slug = rawSlug;
  try {
    slug = decodeURIComponent(rawSlug);
  } catch (e) {
    slug = rawSlug;
  }

  // Skip static assets or recognized SPA sub-routes
  if (slug.includes('.') || SPA_ROUTES.has(slug)) {
    return next();
  }

  try {
    let docRef = db.collection('links').doc(slug);
    let docSnap = await docRef.get();

    // Fallback: try rawSlug if decoded slug does not exist
    if (!docSnap.exists && rawSlug !== slug) {
      docRef = db.collection('links').doc(rawSlug);
      docSnap = await docRef.get();
    }

    if (!docSnap.exists) {
      console.warn(`[Shortener] Slug not found in Firestore: "${slug}"`);
      return res.status(404).sendFile(path.join(distPath, 'index.html'));
    }

    const data = docSnap.data();
    const generatedShortUrl = buildShortUrl(slug);

    // Prepare fields to update: increment clicks + ensure canonical shortUrl
    const updates = {
      clicks: FieldValue.increment(1)
    };

    if (!data.shortUrl || data.shortUrl !== generatedShortUrl) {
      updates.shortUrl = generatedShortUrl;
    }

    // Atomically update Firestore document
    await docRef.update(updates);
    console.log(`[Shortener] Slug "${slug}" clicked (${(data.clicks || 0) + 1} total). Redirecting to: ${data.destinationUrl}`);

    // HTTP 302 Redirect to destinationUrl
    if (data.destinationUrl) {
      return res.redirect(302, data.destinationUrl);
    } else {
      return res.status(404).sendFile(path.join(distPath, 'index.html'));
    }
  } catch (error) {
    console.error(`[Shortener Error] Error processing slug "${slug}":`, error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

// Catch-all fallback middleware to serve SPA frontend for any unhandled routes
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start Express Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 CSD Station Server running on port ${PORT}`);
});
