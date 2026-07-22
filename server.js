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

// Initialize Firebase Admin SDK
if (getApps().length === 0) {
  try {
    initializeApp();
    console.log('[Firebase] Initialized successfully.');
  } catch (error) {
    console.error('[Firebase] Initialization error:', error.message);
  }
}

let db;
try {
  db = getFirestore();
} catch (err) {
  console.warn('[Firebase] Warning on Firestore init:', err.message);
}

// Middleware
app.use(express.json());

// Path to compiled Vite frontend static files
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Health check endpoint for Cloud Run / Load Balancers
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
    if (!db) {
      db = getFirestore();
    }
    const docRef = db.collection('links').doc(slug);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      console.warn(`[Shortener] Slug not found in Firestore: "${slug}"`);
      return res.status(404).sendFile(path.join(distPath, 'index.html'));
    }

    const data = docSnap.data();

    // Determine current public base URL (Cloud Run URL or custom domain)
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.headers['x-forwarded-host'] || req.get('host');
    const baseUrl = process.env.BASE_URL || `${protocol}://${host}`;
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

// Start Express Server - bind to 0.0.0.0 for container environments
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 CSD Station Server running on port ${PORT}`);
});
