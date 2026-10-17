// Copia le due demo OS (sorgenti in os-demos/) dentro public/os/, così Vite le pubblica come pagine statiche.
// Si lancia da solo prima di `npm run dev` e `npm run build`. Modifica sempre i file in os-demos/, mai in public/os/.
import { cp, rm, mkdir, access } from 'node:fs/promises';
const demos = { 'cs-restaurant-os': 'restaurant', 'cs-notaro-os': 'notaro' };
const runtime = ['index.html', 'manifest.json', 'assets', 'css', 'js', 'vendor'];
for (const [source, target] of Object.entries(demos)) {
  const out = `public/os/${target}`;
  await rm(out, { recursive: true, force: true });
  await mkdir(out, { recursive: true });
  for (const item of runtime) {
    try { await access(`os-demos/${source}/${item}`); } catch { continue; }
    await cp(`os-demos/${source}/${item}`, `${out}/${item}`, { recursive: true });
  }
}
console.log('Demo OS sincronizzate in public/os/ (restaurant, notaro).');
