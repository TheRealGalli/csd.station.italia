// Copia le due demo OS (sorgenti in os-demos/) dentro public/os/, così Vite le pubblica come pagine statiche.
// Si lancia da solo prima di `npm run dev` e `npm run build`. Modifica sempre i file in os-demos/, mai in public/os/.
//
// Ogni copia porta un numero di versione nei collegamenti (?v=…): GitHub Pages fa tenere i file in cache
// per 10 minuti e la demo vive in un iframe, quindi senza versione il browser continuerebbe a usare i file vecchi.
import { cp, rm, mkdir, access, readFile, writeFile, readdir } from 'node:fs/promises';
const demos = { 'cs-restaurant-os': 'restaurant', 'cs-notaro-os': 'notaro' };
const runtime = ['index.html', 'manifest.json', 'assets', 'css', 'js', 'vendor'];
const version = Date.now().toString(36);
const stamp = url => `${url}${url.includes('?') ? '&' : '?'}v=${version}`;

for (const [source, target] of Object.entries(demos)) {
  const out = `public/os/${target}`;
  await rm(out, { recursive: true, force: true });
  await mkdir(out, { recursive: true });
  for (const item of runtime) {
    try { await access(`os-demos/${source}/${item}`); } catch { continue; }
    await cp(`os-demos/${source}/${item}`, `${out}/${item}`, { recursive: true });
  }
  // index.html: fogli di stile e script locali con la versione
  const html = await readFile(`${out}/index.html`, 'utf8');
  await writeFile(`${out}/index.html`, html.replace(/(href|src)="((?:css|js|vendor)\/[^"?]+)"/g, (m, attr, url) => `${attr}="${stamp(url)}"`));
  // moduli JavaScript: anche gli import tra file portano la versione
  for (const file of await readdir(`${out}/js`)) {
    if (!file.endsWith('.js')) continue;
    const path = `${out}/js/${file}`, code = await readFile(path, 'utf8');
    await writeFile(path, code.replace(/(from\s+|import\s*\(\s*)(['"])(\.\/[^'"?]+\.js)\2/g, (m, pre, q, url) => `${pre}${q}${stamp(url)}${q}`));
  }
}
console.log(`Demo OS sincronizzate in public/os/ (restaurant, notaro), versione ${version}.`);
