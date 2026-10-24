import { generateReportHtml, generateReportText, getReportMonth } from './monthly-report-template.js';
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
  const rawPass = process.env.SMTP_PASS || '';
  const smtpPass = rawPass.replace(/\s+/g, ''); // Clean spaces if present
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);

  if (!smtpUser || !smtpPass) {
    throw new Error('CONFIG ERROR: Environment variables SMTP_USER and SMTP_PASS are required.');
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465 (SSL), false for 587 (STARTTLS)
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });
}

/**
 * Main Function to Run Monthly Report Email Dispatch
 */
export async function sendMonthlyReports(options = {}) {
  const testEmailArg = options.testEmail || process.argv.find(arg => arg.startsWith('--test='))?.slice(7) || process.env.TEST_EMAIL;
  const targetSlugArg = options.slug || process.argv.find(arg => arg.startsWith('--slug='))?.slice(7);
  const dryRun = options.dryRun || process.argv.includes('--dry-run');
  const month = options.month || process.argv.find(arg => arg.startsWith('--month='))?.slice(8);
  if (testEmailArg && !/^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/.test(testEmailArg)) throw new Error('Invalid test email: use one address.');
  if (process.argv.includes('--test=') || process.argv.includes('--test')) throw new Error('Use --test=your@email.com');
  if (month && !testEmailArg && !dryRun) throw new Error('--month is available only for tests or dry runs: it changes the label, not the counters.');
  const formattedMonth = getReportMonth(new Date(), month);
  console.log('=== [Monthly Report Generator] Starting Email Dispatch ===');
  
  const transporter = dryRun ? null : createTransporter();
  const snapshot = await db.collection('links').get();

  if (snapshot.empty) {
    console.log('[Monthly Report] No links found in Firestore.');
    return { success: true, count: 0, details: 'No links found.' };
  }

  if (testEmailArg) {
    console.log(`\n🧪 [TEST MODE ACTIVE] Redirecting ALL emails to test address: "${testEmailArg}"`);
  }
  if (targetSlugArg) {
    console.log(`🎯 [SLUG FILTER ACTIVE] Processing ONLY slug: "${targetSlugArg}"`);
  }

  // Group links by contact_email
  const clientGroups = new Map();

  snapshot.forEach((doc) => {
    // If slug filter is set, skip documents that don't match
    if (targetSlugArg && doc.id !== targetSlugArg && !doc.id.toLowerCase().includes(targetSlugArg.toLowerCase())) {
      return;
    }

    const data = doc.data();
    let email = (
      data.clientEmail ||
      data.contact_email ||
      data.contactEmail ||
      data.email ||
      data.client_email ||
      ''
    ).trim().toLowerCase();

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
      clicks: Number.isFinite(Number(data.clicks)) ? Math.max(0, Number(data.clicks)) : 0,
      peakDayDate: data.peakDayDate || 'N/D',
      peakDayClicks: Number.isFinite(Number(data.peakDayClicks)) ? Math.max(0, Number(data.peakDayClicks)) : 0,

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
      text: generateReportText({ clientName: client.clientName, monthLabel: formattedMonth, locations: client.locations, totalClicks }),
    };

    if (dryRun) {
      results.push({ status: 'PREVIEW', locationCount: client.locations.length, totalClicks });
      continue;
    }
    try {
      const info = await transporter.sendMail(mailOptions);
      if (!info.accepted?.length) throw new Error('SMTP did not accept the recipient');
      console.log(`[Monthly Report SUCCESS] Sent email for "${client.clientName}" -> Delivered to: "${destinationAddress}" (${client.locations.length} location(s)). MessageId: ${info.messageId}`);
      results.push({ clientEmail: email, deliveredTo: destinationAddress, status: 'SENT', messageId: info.messageId, locationCount: client.locations.length });
    } catch (sendErr) {
      console.error(`[Monthly Report ERROR] Failed to send email for "${client.clientName}" to "${destinationAddress}":`, sendErr.message);
      results.push({ clientEmail: email, deliveredTo: destinationAddress, status: 'FAILED', error: sendErr.message });
    }
  }

  console.log('=== [Monthly Report Generator] Dispatch Completed ===');
  return { success: results.every(result => result.status !== 'FAILED'), count: results.length, results };
}

// Allow direct execution from CLI (e.g. `node scripts/send-monthly-reports.js`)
if (process.argv[1] && process.argv[1].endsWith('send-monthly-reports.js')) {
  sendMonthlyReports()
    .then((res) => {
      console.log('Finished with result:', JSON.stringify(res, null, 2));
      process.exit(res.success ? 0 : 1);
    })
    .catch((err) => {
      console.error('Fatal execution error:', err);
      process.exit(1);
    });
}
