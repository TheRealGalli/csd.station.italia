import nodemailer from 'nodemailer';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Firebase Admin SDK if not initialized
const projectId = process.env.GOOGLE_CLOUD_PROJECT || process.env.GCP_PROJECT || 'nfc-tag-503214';
if (getApps().length === 0) {
  initializeApp({ projectId });
}

const dbName = process.env.FIRESTORE_DATABASE_ID || 'nfctag';
let db;
try {
  db = getFirestore(dbName);
} catch (err) {
  db = getFirestore();
}

/**
 * Configure Nodemailer Transporter with Google App Password (SMTP)
 */
function createTransporter() {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);

  if (!smtpUser || !smtpPass) {
    throw new Error('CONFIG ERROR: Environment variables SMTP_USER and SMTP_PASS are required.');
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
}

/**
 * Generate Responsive HTML Email Template for Monthly Report
 * (Updated: Removed shortUrl as requested by user)
 */
function generateReportHtml({ clientName, monthLabel, locations, totalClicks }) {
  const senderName = process.env.SENDER_NAME || 'CSD Station Italia';
  
  const locationsHtml = locations.map((loc) => {
    const locName = loc.location_name || loc.title || loc.id;
    const clicks = loc.clicks || 0;
    const peakDate = loc.peakDayDate || 'N/D';
    const peakClicks = loc.peakDayClicks || 0;

    return `
      <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
        <div style="font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 12px; display: flex; items-center; gap: 8px;">
          📍 ${locName}
        </div>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top: 1px solid #f1f5f9; padding-top: 12px;">
          <tr>
            <td width="50%" style="vertical-align: top;">
              <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; tracking-wider: 0.05em;">Tap Questo Mese</div>
              <div style="font-size: 22px; font-weight: 800; color: #2563eb; margin-top: 2px;">${clicks} <span style="font-size: 12px; font-weight: 600; color: #64748b;">interazioni</span></div>
            </td>
            <td width="50%" style="vertical-align: top;">
              <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; tracking-wider: 0.05em;">Giorno di Picco Record</div>
              <div style="font-size: 15px; font-weight: 700; color: #0f172a; margin-top: 4px;">${peakDate}</div>
              <div style="font-size: 12px; font-weight: 600; color: #16a34a; margin-top: 2px;">⚡ ${peakClicks} tap in 24h</div>
            </td>
          </tr>
        </table>
      </div>
    `;
  }).join('');

  return `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Report Mensile NFC — ${senderName}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px 12px; color: #1e293b;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01); border: 1px solid #e2e8f0;">
    
    <!-- Header Banner -->
    <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 36px 28px; text-align: center; color: #ffffff;">
      <div style="display: inline-block; background-color: rgba(34, 197, 94, 0.15); color: #4ade80; border: 1px solid rgba(74, 222, 128, 0.3); font-size: 11px; font-weight: 800; padding: 5px 14px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 14px;">
        REPORT MENSILE INTERAZIONI NFC
      </div>
      <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em; color: #ffffff;">
        Report Performance di ${clientName}
      </h1>
      <p style="margin: 8px 0 0 0; font-size: 14px; color: #94a3b8; font-weight: 500;">
        Mese di Riferimento: <strong style="color: #e2e8f0;">${monthLabel}</strong>
      </p>
    </div>

    <!-- Executive Summary Box -->
    <div style="margin: 24px; background: linear-gradient(180deg, #f0fdf4 0%, #dcfce7 100%); border: 2px solid #86efac; border-radius: 16px; padding: 24px; text-align: center;">
      <div style="font-size: 12px; font-weight: 800; color: #15803d; text-transform: uppercase; letter-spacing: 0.06em;">
        Totale Tap & Scansioni Ricevute
      </div>
      <div style="font-size: 42px; font-weight: 900; color: #15803d; line-height: 1; margin-top: 8px; letter-spacing: -0.03em;">
        ${totalClicks.toLocaleString('it-IT')}
      </div>
      <div style="font-size: 13px; font-weight: 600; color: #166534; margin-top: 8px;">
        ⚡ Totale cumulativo registrato su ${locations.length} ${locations.length === 1 ? 'sede' : 'sedi attive'}
      </div>
    </div>

    <!-- Location Cards Breakdown -->
    <div style="padding: 0 24px 12px 24px;">
      <h2 style="font-size: 14px; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px; margin-top: 0;">
        Dettaglio Performance per Sede:
      </h2>
      ${locationsHtml}
    </div>

    <!-- Footer -->
    <div style="background-color: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #f1f5f9; font-size: 12px; color: #64748b;">
      <div style="font-weight: 700; color: #334155; margin-bottom: 4px;">${senderName}</div>
      <div>Assistenza & Configurazione Card NFC • WhatsApp Support: +39 351 862 8203</div>
      <div style="margin-top: 12px; font-size: 11px; color: #94a3b8;">Email automatica generata il 1° del mese da CSD Station Cloud Engine.</div>
    </div>

  </div>
</body>
</html>
  `;
}

/**
 * Main Function to Run Monthly Report Email Dispatch
 */
export async function sendMonthlyReports() {
  console.log('=== [Monthly Report Generator] Starting Email Dispatch ===');
  
  const transporter = createTransporter();
  const snapshot = await db.collection('links').get();

  if (snapshot.empty) {
    console.log('[Monthly Report] No links found in Firestore.');
    return { success: true, count: 0, details: 'No links found.' };
  }

  // Current Month Label (e.g. "Agosto 2026")
  const now = new Date();
  const monthLabel = new Intl.DateTimeFormat('it-IT', {
    timeZone: 'Europe/Rome',
    month: 'long',
    year: 'numeric',
  }).format(now);
  const formattedMonth = monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1);

  // Support Test Override: TEST_EMAIL env var or --test command-line argument
  const testEmailArg = process.argv.find((arg) => arg.startsWith('--test='))?.split('=')[1] || process.env.TEST_EMAIL;

  if (testEmailArg) {
    console.log(`\n🧪 [TEST MODE ACTIVE] Redirecting ALL emails to test address: "${testEmailArg}"`);
  }

  // Group links by contact_email
  const clientGroups = new Map();

  snapshot.forEach((doc) => {
    const data = doc.data();
    let email = (
      data.clientEmail ||
      data.contact_email ||
      data.contactEmail ||
      data.email ||
      data.client_email ||
      ''
    ).trim().toLowerCase();

    // If in test mode and document lacks email, assign fallback test email
    if (!email && testEmailArg) {
      console.log(`[Test Mode Info] Document "${doc.id}" has no contact_email in Firestore. Assigning fallback for test.`);
      email = `test-placeholder-${doc.id}@preview.local`;
    }

    if (!email) {
      console.warn(`[Monthly Report Warning] Document "${doc.id}" has no contact_email configured in Firestore. Skipping.`);
      return;
    }

    if (!clientGroups.has(email)) {
      clientGroups.set(email, {
        email,
        clientName: data.client_name || data.clientName || data.title || doc.id,
        locations: [],
      });
    }

    const group = clientGroups.get(email);
    group.locations.push({
      id: doc.id,
      location_name: data.location_name || data.locationName || data.title || doc.id,
      clicks: data.clicks || 0,
      peakDayDate: data.peakDayDate || 'N/D',
      peakDayClicks: data.peakDayClicks || 0,
      ...data,
    });
  });

  console.log(`[Monthly Report] Found ${clientGroups.size} unique client email(s) to notify.`);

  const results = [];
  const senderEmail = process.env.SMTP_USER;

  for (const [email, client] of clientGroups.entries()) {
    const totalClicks = client.locations.reduce((sum, loc) => sum + (loc.clicks || 0), 0);
    const htmlContent = generateReportHtml({
      clientName: client.clientName,
      monthLabel: formattedMonth,
      locations: client.locations,
      totalClicks,
    });

    const destinationAddress = testEmailArg || email;
    const subjectPrefix = testEmailArg ? '[TEST OVERRIDE] ' : '';

    const mailOptions = {
      from: `"${process.env.SENDER_NAME || 'CSD Station Italia'}" <${senderEmail}>`,
      to: destinationAddress,
      subject: `${subjectPrefix}📊 Report Mensile NFC (${formattedMonth}): ${totalClicks} tap ricevuti — ${client.clientName}`,
      html: htmlContent,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`[Monthly Report SUCCESS] Sent email for "${client.clientName}" -> Delivered to: "${destinationAddress}" (${client.locations.length} location(s)). MessageId: ${info.messageId}`);
      results.push({ clientEmail: email, deliveredTo: destinationAddress, status: 'SENT', messageId: info.messageId, locationCount: client.locations.length });
    } catch (sendErr) {
      console.error(`[Monthly Report ERROR] Failed to send email for "${client.clientName}" to "${destinationAddress}":`, sendErr.message);
      results.push({ clientEmail: email, deliveredTo: destinationAddress, status: 'FAILED', error: sendErr.message });
    }
  }

  console.log('=== [Monthly Report Generator] Dispatch Completed ===');
  return { success: true, count: results.length, results };
}

// Allow direct execution from CLI (e.g. `node scripts/send-monthly-reports.js`)
if (process.argv[1] && process.argv[1].endsWith('send-monthly-reports.js')) {
  sendMonthlyReports()
    .then((res) => {
      console.log('Finished with result:', JSON.stringify(res, null, 2));
      process.exit(0);
    })
    .catch((err) => {
      console.error('Fatal execution error:', err);
      process.exit(1);
    });
}
