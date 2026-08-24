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

// Fixed canonical public base URL for Cloud Run
const CANONICAL_BASE_URL = (process.env.BASE_URL || 'https://nfc.csd-station.it').replace(/\/$/, '');

function getBaseUrl() {
  return CANONICAL_BASE_URL;
}

/**
 * Helper to get current month (YYYY-MM) and current date (DD/MM/YYYY)
 * in Italian timezone (Europe/Rome).
 */
function getRomeDateInfo() {
  const now = new Date();
  const currentMonth = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Rome',
    year: 'numeric',
    month: '2-digit'
  }).format(now);

  const todayDate = new Intl.DateTimeFormat('it-IT', {
    timeZone: 'Europe/Rome',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(now);

  return { currentMonth, todayDate };
}

/**
 * Slugify helper: Converts text with accents, spaces, and special characters
 * into a clean, elegant ASCII URL slug.
 * Example: "Autofficina-Calò" -> "autofficina-calo"
 */
function slugify(text) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents (ò -> o, à -> a, ecc.)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '')    // Remove special characters
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/-+/g, '-');          // Collapse multiple hyphens
}

// Generate clean shortUrl using slugify
function buildShortUrl(docId) {
  const baseUrl = getBaseUrl();
  const cleanSlug = slugify(docId);
  return `${baseUrl}/${cleanSlug}`;
}

/**
 * Synchronize all links in Firestore database:
 * 1. Ensures shortUrl is up to date and clean.
 * 2. Checks monthly reset (resets clicks and peak day counters on the 1st of each month).
 */
async function syncAllLinks() {
  try {
    console.log('[Firestore Sync] Running full sync of links collection...');
    const snapshot = await db.collection('links').get();
    const updatePromises = [];
    const { currentMonth, todayDate } = getRomeDateInfo();

    snapshot.forEach((doc) => {
      const data = doc.data();
      const docId = doc.id;
      const expectedShortUrl = buildShortUrl(docId);
      const docUpdates = {};

      // Check if a new month started -> reset monthly clicks and peak day counters
      if (data.lastResetMonth !== currentMonth) {
        docUpdates.clicks = 0;
        docUpdates.currentDayDate = todayDate;
        docUpdates.currentDayClicks = 0;
        docUpdates.peakDayDate = "";
        docUpdates.peakDayClicks = 0;
        docUpdates.lastResetMonth = currentMonth;
      } else {
        if (data.peakDayDate === undefined) docUpdates.peakDayDate = "";
        if (data.peakDayClicks === undefined) docUpdates.peakDayClicks = 0;
        if (data.clicks === undefined) docUpdates.clicks = 0;
      }

      // Ensure canonical clean shortUrl
      if (data.destinationUrl && (!data.shortUrl || data.shortUrl !== expectedShortUrl)) {
        docUpdates.shortUrl = expectedShortUrl;
      }

      if (Object.keys(docUpdates).length > 0) {
        console.log(`[Firestore Sync] Updating document "${docId}":`, docUpdates);
        updatePromises.push(
          doc.ref.update(docUpdates).catch((err) => {
            console.error(`[Firestore Sync Error] Failed to update "${docId}":`, err.message);
          })
        );
      }
    });

    if (updatePromises.length > 0) {
      await Promise.all(updatePromises);
      console.log(`[Firestore Sync] Successfully synced ${updatePromises.length} document(s).`);
    } else {
      console.log('[Firestore Sync] All documents are up to date.');
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
        const { currentMonth, todayDate } = getRomeDateInfo();

        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added' || change.type === 'modified') {
            const doc = change.doc;
            const data = doc.data();
            const docId = doc.id;
            const expectedShortUrl = buildShortUrl(docId);
            const docUpdates = {};

            if (data.lastResetMonth !== currentMonth) {
              docUpdates.clicks = 0;
              docUpdates.currentDayDate = todayDate;
              docUpdates.currentDayClicks = 0;
              docUpdates.peakDayDate = "";
              docUpdates.peakDayClicks = 0;
              docUpdates.lastResetMonth = currentMonth;
            } else {
              if (data.peakDayDate === undefined) docUpdates.peakDayDate = "";
              if (data.peakDayClicks === undefined) docUpdates.peakDayClicks = 0;
            }

            if (data.destinationUrl && (!data.shortUrl || data.shortUrl !== expectedShortUrl)) {
              docUpdates.shortUrl = expectedShortUrl;
            }

            if (Object.keys(docUpdates).length > 0) {
              updatePromises.push(
                doc.ref.update(docUpdates).catch((err) => {
                  console.error(`[Firestore Sync Error] Failed to update "${docId}":`, err.message);
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
  res.json({ success: true, message: 'Clean sync complete' });
});

/**
 * Automated Monthly Report Cron Endpoint (For Google Cloud Scheduler on 1st of month)
 * Usage: GET /api/cron/send-monthly-reports?key=YOUR_CRON_SECRET
 */
app.get('/api/cron/send-monthly-reports', async (req, res) => {
  const secretKey = process.env.CRON_SECRET;
  const providedKey = req.query.key || req.headers['x-cron-secret'];

  if (secretKey && providedKey !== secretKey) {
    return res.status(401).json({ error: 'Unauthorized: Invalid CRON_SECRET key.' });
  }

  try {
    const { sendMonthlyReports } = await import('./scripts/send-monthly-reports.js');
    const result = await sendMonthlyReports();
    return res.json({ success: true, message: 'Monthly report dispatch complete.', result });
  } catch (error) {
    console.error('[Cron API Error] Failed to send monthly reports:', error.message);
    return res.status(500).json({ error: 'Failed to send monthly reports', details: error.message });
  }
});

// Known SPA static routes for CSD Station website
const SPA_ROUTES = new Set(['privacy-policy', 'terms-of-service', 'cookie-policy', 'api']);

/**
 * GET /:slug - URL Shortener Redirect & Analytics Tracker
 * Handles monthly reset and peak day tracking on click.
 */
app.get('/:slug', async (req, res, next) => {
  let rawSlug = req.params.slug;
  let decodedSlug = rawSlug;
  try {
    decodedSlug = decodeURIComponent(rawSlug);
  } catch (e) {
    decodedSlug = rawSlug;
  }

  // Skip static assets or recognized SPA sub-routes
  if (decodedSlug.includes('.') || SPA_ROUTES.has(decodedSlug)) {
    return next();
  }

  try {
    let docRef = db.collection('links').doc(decodedSlug);
    let docSnap = await docRef.get();

    // Fallback 1: try raw slug
    if (!docSnap.exists && rawSlug !== decodedSlug) {
      docRef = db.collection('links').doc(rawSlug);
      docSnap = await docRef.get();
    }

    // Fallback 2: search by slugified ID or clean shortUrl match
    if (!docSnap.exists) {
      const targetSlug = slugify(decodedSlug);
      const snapshot = await db.collection('links').get();

      snapshot.forEach((doc) => {
        if (!docSnap.exists) {
          if (slugify(doc.id) === targetSlug) {
            docRef = doc.ref;
            docSnap = doc;
          }
        }
      });
    }

    if (!docSnap.exists) {
      console.warn(`[Shortener] Slug not found in Firestore: "${decodedSlug}"`);
      return res.status(404).sendFile(path.join(distPath, 'index.html'));
    }

    const data = docSnap.data();
    const docId = docSnap.id;
    const generatedShortUrl = buildShortUrl(docId);
    const { currentMonth, todayDate } = getRomeDateInfo();

    let updates = {};

    // Check if new month -> reset monthly clicks and peak day
    if (data.lastResetMonth !== currentMonth) {
      updates = {
        clicks: 1,
        currentDayDate: todayDate,
        currentDayClicks: 1,
        peakDayDate: todayDate,
        peakDayClicks: 1,
        lastResetMonth: currentMonth
      };
    } else {
      // Same month -> increment total monthly clicks
      const newClicks = (data.clicks || 0) + 1;
      updates.clicks = newClicks;

      // Track daily clicks for today
      let newDayClicks = 1;
      if (data.currentDayDate === todayDate) {
        newDayClicks = (data.currentDayClicks || 0) + 1;
      }
      updates.currentDayDate = todayDate;
      updates.currentDayClicks = newDayClicks;

      // Track peak day (giornata record del mese)
      const currentPeakClicks = data.peakDayClicks || 0;
      if (newDayClicks > currentPeakClicks) {
        updates.peakDayClicks = newDayClicks;
        updates.peakDayDate = todayDate;
      } else {
        if (!data.peakDayDate) updates.peakDayDate = todayDate;
        if (data.peakDayClicks === undefined) updates.peakDayClicks = newDayClicks;
      }
    }

    // Ensure clean shortUrl
    if (!data.shortUrl || data.shortUrl !== generatedShortUrl) {
      updates.shortUrl = generatedShortUrl;
    }

    // Atomically update Firestore document
    await docRef.update(updates);
    console.log(`[Shortener] Slug "${docId}" clicked (${updates.clicks} total this month, today: ${updates.currentDayClicks}, peak: ${updates.peakDayClicks} on ${updates.peakDayDate}). Redirecting to: ${data.destinationUrl}`);

    // HTTP 302 Redirect to destinationUrl
    if (data.destinationUrl) {
      return res.redirect(302, data.destinationUrl);
    } else {
      return res.status(404).sendFile(path.join(distPath, 'index.html'));
    }
  } catch (error) {
    console.error(`[Shortener Error] Error processing slug "${decodedSlug}":`, error);
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
