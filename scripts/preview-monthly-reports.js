import { mkdir, writeFile } from 'node:fs/promises';
import { generateReportHtml } from './monthly-report-template.js';
const directory = new URL('../docs/monthly-report-previews/', import.meta.url);
await mkdir(directory, { recursive: true });
for (const multi of [false, true]) {
  const locations = (multi ? [128, 76, 214, 0, 35, 92] : [128]).map((clicks, i) => ({ id: `demo-${i}`, location_name: `Sede dimostrativa ${i + 1}`, clicks, peakDayDate: clicks ? '18/10/2026' : '', peakDayClicks: clicks ? 12 : 0 }));
  await writeFile(new URL(multi ? 'multisede.html' : 'singola-sede.html', directory), generateReportHtml({clientName:'Attività dimostrativa',monthLabel:'ottobre 2026',locations,totalClicks:locations.reduce((sum,l)=>sum+l.clicks,0)}));
}
console.log('Anteprime con soli dati inventati in docs/monthly-report-previews');
