import test from 'node:test';
import assert from 'node:assert/strict';
import nodemailer from 'nodemailer';
import { generateReportHtml, generateReportText, getReportMonth } from './monthly-report-template.js';
test('Rome month at UTC boundary and January rollover', () => {
  assert.equal(getReportMonth(new Date('2026-10-31T23:30:00Z')), 'ottobre 2026');
  assert.equal(getReportMonth(new Date('2027-01-01T07:00:00Z')), 'dicembre 2026');
  assert.throws(() => getReportMonth(new Date(), '2026-13'));
});
test('single, many locations, zero counts and escaped customer content', async () => {
  for (const count of [1, 30]) {
    const data = {clientName:'Demo <script>', monthLabel:'ottobre 2026',totalClicks:0,locations:Array.from({length:count},(_,i)=>({id:`demo-${i}`,location_name:`Sede & ${i}`,clicks:0}))};
    const html = generateReportHtml(data);
    assert.ok(!html.includes('<script>'));
    assert.ok(html.includes('Demo &lt;script&gt;'));
    assert.ok(html.includes(`Sede &amp; ${count-1}`));
    assert.ok(html.includes('Non disponibile'));
    assert.ok(generateReportText(data).includes(`Sede & ${count-1}`));
    const info = await nodemailer.createTransport({streamTransport:true,buffer:true}).sendMail({from:'sender@example.com',to:'test@example.com',html,text:generateReportText(data)});
    assert.ok(!info.message.toString().includes('Content-ID:'));
    assert.ok(!html.includes('<img'));
    assert.ok(!html.includes('wa.me'));
    assert.ok(!html.includes('Il prossimo tap'));
    assert.ok(!generateReportText(data).includes('Ogni tap'));
  }
});
