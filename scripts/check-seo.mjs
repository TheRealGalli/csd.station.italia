import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { transformWithEsbuild } from 'vite';
import { htmlToMarkdown } from './seo-markdown.mjs';

const origin = 'https://csd-station.it';
const read = path => readFile(`dist/${path}`, 'utf8');
const pages = ['/', '/card-nfc/', '/training-ai/', '/sito-social/', '/video-slide/', '/lead/', '/forecasting/'];
const descriptions = new Set();
for (const path of pages) {
  const html = await read(`${path.slice(1)}index.html`);
  assert.equal((html.match(/<title>/g) || []).length, 1);
  assert.ok(html.includes('<title>CSD Station</title>'));
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
  assert.ok(html.includes(`rel="canonical" href="${origin}${path}"`));
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `Single page heading: ${path}`);
  assert.ok(html.includes('data-prerendered="true"'));
  assert.ok(!html.includes('content="noindex'));
  const description = html.match(/name="description" content="([^"]+)"/)?.[1];
  assert.ok(description && description.length > 80);
  descriptions.add(description);
  const structured = JSON.parse(html.match(/<script data-seo type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(structured['@context'], 'https://schema.org');
  assert.equal(structured['@graph'].filter(item => item['@type'] === 'WebPage')[0].url, origin + path);
  assert.equal(structured['@graph'].filter(item => item['@type'] === 'Service').length, 1);
  assert.ok(!JSON.stringify(structured).includes('aggregateRating'), 'No invented ratings');
  for (const target of pages) assert.ok(html.includes(`href="${target}"`), `Navigation ${target} from ${path}`);
  for (const match of html.matchAll(/(?:src|href)="(\/assets\/[^"#?]+)"/g)) await access(`dist${match[1]}`);
  const markdown = await read(`${path.slice(1)}index.md`);
  assert.ok(markdown.includes(`Fonte: ${origin}${path}`));
  assert.ok(markdown.includes('WhatsApp'));
  assert.ok(markdown.length > 1500, `Substantive transcript: ${path}`);
  assert.ok(!markdown.includes('<svg'));
}
assert.equal(descriptions.size, pages.length, 'Distinct descriptions');
const sitemap = await read('sitemap.xml');
for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const url = new URL(match[1]);
  assert.equal(url.origin, origin);
  assert.equal(url.search, '');
  await access(`dist${url.pathname}index.html`);
}
assert.ok((await read('robots.txt')).includes(`Sitemap: ${origin}/sitemap.xml`));
const llms = await read('llms.txt');
for (const match of llms.matchAll(/\]\(https:\/\/csd-station.it([^)]*)\)/g)) {
  await access(`dist${match[1]}${match[1].endsWith('/') ? 'index.html' : ''}`);
}
const full = await read('llms-full.txt');
for (const phrase of ['Prenota Chiamata', 'Partner Avanzato Certificato', 'agenti intelligenti che lavorano 24/7']) assert.ok(!full.includes(phrase));
const notFound = await read('404.html');
assert.ok(notFound.includes('content="noindex, follow"'));
assert.ok(!notFound.includes('rel="canonical"'));
assert.ok(!notFound.includes('location.replace'), '404 must not redirect all missing pages to the homepage');

// Verify compatibility of previously shared URLs, tracking parameters and deep links.
const transformed = await transformWithEsbuild(await readFile('src/seo/routes.ts', 'utf8'), 'routes.ts', { loader: 'ts', format: 'esm' });
const { canonicalNavigation, getServiceMode } = await import(`data:text/javascript;base64,${Buffer.from(transformed.code).toString('base64')}`);
assert.equal(canonicalNavigation('/', '?mode=training&utm_source=mail', '#training-percorso'), '/training-ai/?utm_source=mail#training-percorso');
assert.equal(canonicalNavigation('/', '?mode=nfc', '#prodotti'), '/card-nfc/#prodotti');
assert.equal(canonicalNavigation('/', '?mode=automazioni', '#demo'), '/#demo');
assert.equal(canonicalNavigation('/card-nfc', '', ''), '/card-nfc/');
assert.equal(canonicalNavigation('/training-ai/', '', ''), null);
assert.equal(canonicalNavigation('/privacy-policy-nfc', '', ''), '/nfc/privacy-policy/');
assert.equal(canonicalNavigation('/non-esiste', '', ''), null);
assert.equal(getServiceMode('/card-nfc/', '?mode=training'), 'nfc');
assert.equal(getServiceMode('/nfc/privacy-policy/'), 'nfc');
assert.equal(getServiceMode('/training-ai/'), 'training');
assert.equal(getServiceMode('/sito-social'), 'web');
assert.equal(getServiceMode('/lead/'), 'lead');
assert.equal(getServiceMode('/forecasting/'), 'forecasting');
assert.equal(canonicalNavigation('/', '?mode=forecasting', '#forecasting-prova'), '/forecasting/#forecasting-prova');
assert.equal(canonicalNavigation('/', '?mode=lead', '#lead-contatto'), '/lead/#lead-contatto');
assert.equal(htmlToMarkdown('<h1>Ciao &amp; benvenuto</h1><div aria-hidden="true"><span>decorazione</span></div><details><summary>Domanda</summary><p>Risposta <strong>utile</strong>.</p></details><button>Avvia</button>'), '## Ciao & benvenuto\n\nDomanda\n\nRisposta utile.');
const leadHtml = await read('lead/index.html');
assert.equal((leadHtml.match(/class="lead-deck-page"/g) || []).length, 4);
assert.equal((leadHtml.match(/class="lead-deck-page" aria-hidden="true"/g) || []).length, 3);
assert.ok(leadHtml.includes('Nessun messaggio viene inviato'));
assert.ok(!leadHtml.includes('type="file"'), 'No real contact upload in the public presentation');
assert.ok(!/\b10%|10 %|500 euro|50 euro/.test(await read('lead/index.md')), 'No public commission rate');
for (const path of ['terms-of-service/index.html', 'privacy-policy/index.html']) {
  assert.ok((await read(path)).includes('id="lead"'), 'Lead legal section is reachable');
  assert.ok((await read(path)).includes('id="forecasting"'), 'Forecasting legal section is reachable');
}
console.log('SEO verificata: HTML, canonical, metadati, schema, asset, sitemap, trascrizioni, 404 e compatibilità dei vecchi link.');
