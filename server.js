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

  const dayOfMonth = parseInt(new Intl.DateTimeFormat('it-IT', {
    timeZone: 'Europe/Rome',
    day: 'numeric'
  }).format(now), 10);

  return { currentMonth, todayDate, dayOfMonth };
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
 * Helper to ensure all 9 required NFC link variables exist on a document.
 * Sets default initial values (0 or empty strings) without EVER overwriting
 * existing data (clicks, URLs, emails, dates) on already active documents.
 */
function fillMissingLinkFields(data, docId) {
  const updates = {};
  const expectedShortUrl = buildShortUrl(docId);

  // 1. clicks (int64 / number)
  if (data.clicks === undefined) updates.clicks = 0;

  // 2. clientEmail (string)
  if (data.clientEmail === undefined) updates.clientEmail = '';

  // 3. destinationUrl (string)
  if (data.destinationUrl === undefined) updates.destinationUrl = '';

  // 4. shortUrl (string) - ensure always initialized to canonical URL
  if (!data.shortUrl || (data.destinationUrl && data.shortUrl !== expectedShortUrl)) {
    updates.shortUrl = expectedShortUrl;
  }

  // 5. peakDayDate (string)
  if (data.peakDayDate === undefined) updates.peakDayDate = '';

  // 6. peakDayClicks (int64 / number)
  if (data.peakDayClicks === undefined) updates.peakDayClicks = 0;

  // 7. lastResetMonth (string)
  if (data.lastResetMonth === undefined) updates.lastResetMonth = '';

  // 8. currentDayClicks (int64 / number)
  if (data.currentDayClicks === undefined) updates.currentDayClicks = 0;

  // 9. currentDayDate (string)
  if (data.currentDayDate === undefined) updates.currentDayDate = '';

  return updates;
}

/**
 * Synchronize all links in Firestore database:
 * 1. Automatically fills all 9 required variables for newly created/incomplete documents.
 * 2. Ensures shortUrl is up to date and clean.
 * 3. Checks monthly reset on the 2nd of each month (without touching day 1 for reports).
 * 4. NEVER overwrites or resets existing active documents.
 */
async function syncAllLinks() {
  try {
    console.log('[Firestore Sync] Running full sync of links collection...');
    const snapshot = await db.collection('links').get();
    const updatePromises = [];
    const { currentMonth, todayDate, dayOfMonth } = getRomeDateInfo();

    snapshot.forEach((doc) => {
      const data = doc.data();
      const docId = doc.id;
      const docUpdates = {};

      // Reset occurs on Day 2 of the month or later (leaving Day 1 100% intact for monthly reporting)
      // Only resets documents that actually have an active previous month recorded
      const isNewMonth = Boolean(data.lastResetMonth) && data.lastResetMonth !== currentMonth && dayOfMonth >= 2;

      if (isNewMonth) {
        docUpdates.clicks = 0;
        docUpdates.currentDayDate = todayDate;
        docUpdates.currentDayClicks = 0;
        docUpdates.peakDayDate = '';
        docUpdates.peakDayClicks = 0;
        docUpdates.lastResetMonth = currentMonth;
      }

      // Automatically fill any missing fields without touching existing values
      const missing = fillMissingLinkFields(data, docId);
      for (const [key, value] of Object.entries(missing)) {
        if (docUpdates[key] === undefined) {
          docUpdates[key] = value;
        }
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
        const { currentMonth, todayDate, dayOfMonth } = getRomeDateInfo();

        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added' || change.type === 'modified') {
            const doc = change.doc;
            const data = doc.data();
            const docId = doc.id;
            const docUpdates = {};

            // Reset occurs on Day 2 of the month or later (leaving Day 1 100% intact for monthly reporting)
            const isNewMonth = Boolean(data.lastResetMonth) && data.lastResetMonth !== currentMonth && dayOfMonth >= 2;

            if (isNewMonth) {
              docUpdates.clicks = 0;
              docUpdates.currentDayDate = todayDate;
              docUpdates.currentDayClicks = 0;
              docUpdates.peakDayDate = '';
              docUpdates.peakDayClicks = 0;
              docUpdates.lastResetMonth = currentMonth;
            }

            // Automatically fill any missing fields without touching existing values
            const missing = fillMissingLinkFields(data, docId);
            for (const [key, value] of Object.entries(missing)) {
              if (docUpdates[key] === undefined) {
                docUpdates[key] = value;
              }
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
 * Direct Link Creation API
 * Allows creating a new link document with all 9 variables initialized in 1 step.
 * Usage GET:  /api/create-link?id=autofficina-halo&destinationUrl=https://...&clientEmail=...
 * Usage POST: /api/create-link (JSON body: { id, destinationUrl, clientEmail })
 */
app.all('/api/create-link', async (req, res) => {
  try {
    const rawId = req.query.id || req.query.slug || req.query.title || req.body?.id || req.body?.slug || req.body?.title;
    if (!rawId || typeof rawId !== 'string' || !rawId.trim()) {
      return res.status(400).json({
        error: 'Parametro "id" o "title" mancante. Esempio: /api/create-link?id=autofficina-halo'
      });
    }

    const cleanSlug = slugify(rawId);
    const destinationUrl = (req.query.destinationUrl || req.body?.destinationUrl || '').trim();
    const clientEmail = (req.query.clientEmail || req.body?.clientEmail || '').trim();

    const docRef = db.collection('links').doc(cleanSlug);
    const existingSnap = await docRef.get();

    if (existingSnap.exists) {
      return res.status(200).json({
        success: false,
        message: `Il documento "${cleanSlug}" esiste già in Firestore. Nessuna modifica apportata per preservare i dati esistenti.`,
        docId: cleanSlug,
        shortUrl: buildShortUrl(cleanSlug),
        data: existingSnap.data()
      });
    }

    const expectedShortUrl = buildShortUrl(cleanSlug);
    const newDocData = {
      clicks: 0,
      clientEmail: clientEmail,
      destinationUrl: destinationUrl,
      shortUrl: expectedShortUrl,
      peakDayDate: '',
      peakDayClicks: 0,
      lastResetMonth: '',
      currentDayClicks: 0,
      currentDayDate: ''
    };

    await docRef.set(newDocData);
    console.log(`[Firestore Link Created] Creato nuovo documento "${cleanSlug}":`, newDocData);

    return res.status(201).json({
      success: true,
      message: `Documento "${cleanSlug}" creato con successo in Firestore con tutte le 9 variabili!`,
      docId: cleanSlug,
      shortUrl: expectedShortUrl,
      data: newDocData
    });
  } catch (error) {
    console.error('[Create Link Error]', error);
    return res.status(500).json({ error: 'Errore durante la creazione del link', details: error.message });
  }
});

/**
 * Modern CSD Station Admin Web Page to quickly generate new NFC Links
 */
app.get('/crea-link', (req, res) => {
  res.type('html').send(`<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Crea Nuovo Link NFC — CSD Station</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #090d16;
      color: #e2e8f0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .container {
      width: 100%;
      max-width: 580px;
      background: radial-gradient(circle at top right, rgba(56, 189, 248, 0.08), transparent 60%),
                  radial-gradient(circle at bottom left, rgba(16, 185, 129, 0.05), transparent 60%),
                  #0e1526;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 24px;
      padding: 36px 32px;
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.7);
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(56, 189, 248, 0.12);
      border: 1px solid rgba(56, 189, 248, 0.3);
      color: #38bdf8;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      padding: 4px 12px;
      border-radius: 9999px;
      margin-bottom: 12px;
    }
    h1 { font-size: 26px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em; margin-bottom: 8px; }
    p.subtitle { font-size: 14px; color: #94a3b8; margin-bottom: 24px; line-height: 1.5; }
    .form-group { margin-bottom: 18px; }
    label { display: block; font-size: 13px; font-weight: 600; color: #cbd5e1; margin-bottom: 6px; }
    .optional { color: #64748b; font-weight: 400; font-size: 11px; }
    input {
      width: 100%;
      background: #090e1a;
      border: 1px solid #1e293b;
      border-radius: 12px;
      padding: 12px 14px;
      color: #ffffff;
      font-size: 14px;
      font-family: inherit;
      transition: all 0.2s;
    }
    input:focus {
      outline: none;
      border-color: #38bdf8;
      box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.15);
    }
    .preview-box {
      background: rgba(15, 23, 42, 0.8);
      border: 1px dashed #334155;
      border-radius: 12px;
      padding: 12px;
      margin-top: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      color: #38bdf8;
      word-break: break-all;
    }
    .preview-label { font-size: 10px; color: #64748b; text-transform: uppercase; margin-bottom: 2px; font-family: 'Outfit', sans-serif; font-weight: 600; }
    button.btn-submit {
      width: 100%;
      background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%);
      color: #ffffff;
      border: none;
      border-radius: 12px;
      padding: 14px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      margin-top: 10px;
      transition: transform 0.15s, box-shadow 0.15s;
      box-shadow: 0 4px 14px rgba(14, 165, 233, 0.35);
    }
    button.btn-submit:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(14, 165, 233, 0.45);
    }
    button.btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }
    .result {
      margin-top: 24px;
      border-radius: 14px;
      padding: 18px;
      display: none;
    }
    .result.success {
      display: block;
      background: rgba(16, 185, 129, 0.08);
      border: 1px solid rgba(16, 185, 129, 0.3);
    }
    .result.error {
      display: block;
      background: rgba(239, 68, 68, 0.08);
      border: 1px solid rgba(239, 68, 68, 0.3);
    }
    .variables-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-top: 14px;
      font-size: 11px;
      background: rgba(0, 0, 0, 0.3);
      padding: 12px;
      border-radius: 10px;
    }
    .var-badge { color: #94a3b8; font-family: 'JetBrains Mono', monospace; }
    .var-badge span { color: #34d399; font-weight: 600; }
    .btn-copy {
      background: #1e293b;
      border: 1px solid #334155;
      color: #f1f5f9;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: 10px;
    }
    .btn-copy:hover { background: #334155; }
    .info-note {
      margin-top: 24px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 12px;
      padding: 14px;
      font-size: 12px;
      color: #94a3b8;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="badge">⚡ CSD Station Engine</div>
    <h1>Crea Nuovo Link NFC</h1>
    <p class="subtitle">Inserisci il nome della pagina/attività. Verrà creata la scheda in Firestore con tutte le 9 variabili pronte e shortUrl configurato.</p>

    <form id="createForm">
      <div class="form-group">
        <label for="linkId">Titolo / Document ID *</label>
        <input type="text" id="linkId" placeholder="es. autofficina-halo o Centro Dentale Zanardi" required autofocus>
        <div class="preview-box">
          <div class="preview-label">Short URL generato:</div>
          <span id="urlPreview">https://nfc.csd-station.it/...</span>
        </div>
      </div>

      <div class="form-group">
        <label for="destUrl">Destination URL <span class="optional">(Opzionale - link Google Maps / Recensioni)</span></label>
        <input type="url" id="destUrl" placeholder="https://maps.app.goo.gl/...">
      </div>

      <div class="form-group">
        <label for="email">Client Email <span class="optional">(Opzionale - per report mensile)</span></label>
        <input type="email" id="email" placeholder="cliente@azienda.it">
      </div>

      <button type="submit" id="submitBtn" class="btn-submit">Crea Scheda NFC Automatica</button>
    </form>

    <div id="resultBox" class="result">
      <div id="resultTitle" style="font-weight: 700; font-size: 15px; margin-bottom: 6px;"></div>
      <div id="resultMessage" style="font-size: 13px; color: #cbd5e1;"></div>
      <button id="copyBtn" class="btn-copy" style="display:none;" onclick="copyShortUrl()">📋 Copia Short URL</button>
      <div id="varsBox" class="variables-grid" style="display:none;"></div>
    </div>

    <div class="info-note">
      💡 <strong>Oppure da Firestore Studio:</strong> Puoi anche continuare a creare il documento direttamente dal pannello Google Cloud Firestore inserendo il Document ID e salvando. Il server in background completerà istantaneamente tutte le 9 variabili mancanti senza sovrascrivere mai i documenti esistenti.
    </div>
  </div>

  <script>
    const baseUrl = 'https://nfc.csd-station.it';
    const linkInput = document.getElementById('linkId');
    const urlPreview = document.getElementById('urlPreview');
    const form = document.getElementById('createForm');
    const submitBtn = document.getElementById('submitBtn');
    const resultBox = document.getElementById('resultBox');
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('resultMessage');
    const copyBtn = document.getElementById('copyBtn');
    const varsBox = document.getElementById('varsBox');

    let lastCreatedUrl = '';

    function slugify(text) {
      return text.toString().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '')
        .toLowerCase().trim().replace(/[^a-z0-9 -]/g, '').replace(/\\s+/g, '-').replace(/-+/g, '-');
    }

    linkInput.addEventListener('input', () => {
      const slug = slugify(linkInput.value);
      urlPreview.textContent = slug ? (baseUrl + '/' + slug) : (baseUrl + '/...');
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      submitBtn.disabled = true;
      submitBtn.textContent = 'Creazione in corso...';
      resultBox.className = 'result';
      resultBox.style.display = 'none';

      try {
        const res = await fetch('/api/create-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: linkInput.value,
            destinationUrl: document.getElementById('destUrl').value,
            clientEmail: document.getElementById('email').value
          })
        });

        const data = await res.json();

        if (res.ok && data.success) {
          resultBox.className = 'result success';
          resultTitle.textContent = '✅ Scheda NFC Creata con Successo!';
          resultTitle.style.color = '#34d399';
          resultMessage.innerHTML = 'Documento: <strong>' + data.docId + '</strong><br>Short URL: <a href="' + data.shortUrl + '" target="_blank" style="color:#38bdf8; text-decoration:none;">' + data.shortUrl + '</a>';
          lastCreatedUrl = data.shortUrl;
          copyBtn.style.display = 'inline-flex';

          varsBox.style.display = 'grid';
          varsBox.innerHTML = \`
            <div class="var-badge">clicks: <span>\${data.data.clicks}</span></div>
            <div class="var-badge">peakDayClicks: <span>\${data.data.peakDayClicks}</span></div>
            <div class="var-badge">currentDayClicks: <span>\${data.data.currentDayClicks}</span></div>
            <div class="var-badge">peakDayDate: <span>""</span></div>
            <div class="var-badge">lastResetMonth: <span>""</span></div>
            <div class="var-badge">currentDayDate: <span>""</span></div>
            <div class="var-badge">clientEmail: <span>"\${data.data.clientEmail}"</span></div>
            <div class="var-badge">destinationUrl: <span>"\${data.data.destinationUrl}"</span></div>
          \`;
          resultBox.style.display = 'block';
        } else {
          resultBox.className = 'result error';
          resultTitle.textContent = '⚠️ Attenzione';
          resultTitle.style.color = '#f87171';
          resultMessage.textContent = data.message || data.error || 'Errore nella creazione.';
          copyBtn.style.display = 'none';
          varsBox.style.display = 'none';
          resultBox.style.display = 'block';
        }
      } catch (err) {
        resultBox.className = 'result error';
        resultTitle.textContent = '❌ Errore di Rete';
        resultTitle.style.color = '#f87171';
        resultMessage.textContent = err.message;
        resultBox.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Crea Scheda NFC Automatica';
      }
    });

    function copyShortUrl() {
      if (lastCreatedUrl) {
        navigator.clipboard.writeText(lastCreatedUrl);
        copyBtn.textContent = '✅ Copiato!';
        setTimeout(() => { copyBtn.textContent = '📋 Copia Short URL'; }, 2000);
      }
    }
  </script>
</body>
</html>`);
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
const SPA_ROUTES = new Set(['privacy-policy', 'terms-of-service', 'cookie-policy', 'api', 'crea-link']);

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
    const { currentMonth, todayDate, dayOfMonth } = getRomeDateInfo();

    let updates = {};

    // Reset occurs on Day 2 of the month or later (leaving Day 1 100% intact for monthly reporting)
    const isNewMonth = data.lastResetMonth !== currentMonth && dayOfMonth >= 2;

    if (isNewMonth) {
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
