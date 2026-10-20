import { build } from 'vite';
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { htmlToMarkdown } from './seo-markdown.mjs';

// Static HTML for GitHub Pages; no production server or Firebase dependency.
const temporary = resolve('.seo-build');
try {
  await build({ build: { ssr: 'src/seo/render.tsx', outDir: temporary, emptyOutDir: true, manifest: false, minify: false }, logLevel: 'warn' });
  const { renderPage, getPageMeta, renderSeoHead, buildPaths, servicePaths, origin } = await import(pathToFileURL(resolve(temporary, 'render.js')).href);
  const template = await readFile('dist/index.html', 'utf8');
  if (!template.includes('<!--seo-head-->') || !template.includes('<div id="root"></div>')) throw new Error('SEO template placeholders missing');
  const documents = [];
  for (const pathname of [...buildPaths, '/404.html']) {
    const page = getPageMeta(pathname);
    const body = renderPage(pathname);
    const html = template.replace('<!--seo-head-->', renderSeoHead(page)).replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${body}</div>`);
    const output = pathname === '/404.html' ? 'dist/404.html' : `dist${pathname}index.html`;
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, html);
    if (page.service) {
      const main = body.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
      if (!main) throw new Error(`No main content for ${pathname}`);
      const markdown = `# ${page.name.replace(' | CSD Station', '')}\n\nFonte: ${page.url}\n\n${htmlToMarkdown(main)}\n\nContatto: [WhatsApp](https://wa.me/393518628203) · [Email](mailto:carlo@csd-station.it)\n`;
      await writeFile(`dist${pathname}index.md`, markdown);
      documents.push(markdown);
    }
  }
  // Regenerate from actual rendered pages on every build, avoiding stale parallel copy.
  await writeFile('dist/llms-full.txt', `# CSD Station\n\nVersione testuale delle pagine servizi. Esempi e simulazioni descritti nelle pagine non sono casi cliente o risultati garantiti.\n\n${documents.join('\n---\n\n')}`);
  const locations = [...Object.values(servicePaths), '/privacy-policy/', '/terms-of-service/'];
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locations.map(path => `  <url><loc>${origin}${path}</loc></url>`).join('\n')}\n</urlset>\n`);
  console.log(`SEO: ${buildPaths.length} pagine HTML + 404, ${documents.length} versioni Markdown, llms-full.txt e sitemap generati.`);
} finally {
  await rm(temporary, { recursive: true, force: true });
}
