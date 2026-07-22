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

// Helper to determine base URL using exact Cloud Run service URL
function getBaseUrl(req) {
  if (process.env.BASE_URL) {
    return process.env.BASE_URL.replace(/\/$/, '');
  }
  if (req) {
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.headers['x-forwarded-host'] || req.get('host');
    return `${protocol}://${host}`;
  }
  // Exact Cloud Run public service URL from GCP Console
  return 'https://nfc-271110757335.europe-west1.run.app';
}

// Real-time Firestore Listener: Automatically generates and saves `shortUrl` IMMEDIATELY when a document is created or updated
function startAutoShortUrlSync() {
  console.log('[Firestore Sync] Starting real-time shortUrl sync listener...');
  try {
    db.collection('links').onSnapshot(
      (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === 'added' || change.type === 'modified') {
            const doc = change.doc;
            const data = doc.data();
            const slug = doc.id;

            const baseUrl = getBaseUrl(null);
            const expectedShortUrl = `${baseUrl}/${slug}`;

            // If destinationUrl exists and shortUrl is missing, empty, or outdated, generate and write it immediately to Firestore!
            if (data.destinationUrl && (!data.shortUrl || data.shortUrl !== expectedShortUrl)) {
              try {
                await doc.ref.update({ shortUrl: expectedShortUrl });
                console.log(`[Firestore Sync] Auto-generated shortUrl for "${slug}": ${expectedShortUrl}`);
              } catch (err) {
                console.error(`[Firestore Sync Error] Failed to update shortUrl for "${slug}":`, err.message);
              }
            }
          }
        });
      },
      (error) => {
        console.error('[Firestore Sync Error] Snapshot listener error:', error.message);
      }
    );
  } catch (err) {
    console.error('[Firestore Sync Error] Failed to attach listener:', err.message);
  }
}

// Start automatic real-time sync on server boot
startAutoShortUrlSync();

// Middleware
app.use(express.json());

// Path to compiled Vite frontend static files
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Health check endpoint for Cloud Run
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Known SPA static routes for CSD Station website
const SPA_ROUTES = new Set(['privacy-policy', 'terms-of-service', 'cookie-policy']);

/**
 * GET /:slug - URL Shortener Redirect & Analytics Tracker
 */
app.get('/:slug', async (req, res, next) => {
  const { slug } = req.params;

  // Skip static assets or recognized SPA sub-routes
  if (slug.includes('.') || SPA_ROUTES.has(slug)) {
    return next();
  }

  try {
    const docRef = db.collection('links').doc(slug);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      console.warn(`[Shortener] Slug not found in Firestore: "${slug}"`);
      return res.status(404).sendFile(path.join(distPath, 'index.html'));
    }

    const data = docSnap.data();

    // Determine current public base URL
    const baseUrl = getBaseUrl(req);
    const generatedShortUrl = `${baseUrl}/${slug}`;

    // Prepare fields to update: increment clicks + auto-populate/update shortUrl
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
