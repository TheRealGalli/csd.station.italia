import express from 'express';
import admin from 'firebase-admin';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Initialize Firebase Admin SDK
// On Google Cloud Run, default credentials (ADC) are automatically picked up.
// For local testing, GOOGLE_APPLICATION_CREDENTIALS or custom configuration can be provided.
if (!admin.apps.length) {
  try {
    admin.initializeApp();
    console.log('[Firebase] Initialized with Application Default Credentials.');
  } catch (error) {
    console.error('[Firebase] Initialization error:', error.message);
  }
}

const db = admin.firestore();

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
app.get('/:slug', async (req, res) => {
  const { slug } = req.params;

  // Skip static assets or recognized SPA sub-routes
  if (slug.includes('.') || SPA_ROUTES.has(slug)) {
    return res.sendFile(path.join(distPath, 'index.html'));
  }

  try {
    const docRef = db.collection('links').doc(slug);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      console.warn(`[Shortener] Slug not found in Firestore: "${slug}"`);
      // Return SPA 404 page
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
      clicks: admin.firestore.FieldValue.increment(1)
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

// Catch-all route to serve SPA frontend for any other GET requests
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 CSD Station Server running on port ${PORT}`);
});
