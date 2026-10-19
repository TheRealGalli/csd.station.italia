import { consultingIntro, nfcIntro, trainingIntro, webIntro } from './content';
import { getOsProduct, getServiceMode, legalPaths, normalizePath, osPaths, servicePaths, type ServiceMode } from './routes';

export const origin = 'https://csd-station.it';
const titles: Record<ServiceMode, string> = {
  automazioni: 'Consulenza AI, informatica e automazioni per PMI | CSD Station',
  nfc: 'Card, plate e stand NFC per recensioni Google | CSD Station',
  training: 'Training AI aziendale e formazione per PMI | CSD Station',
  web: 'Siti web, siti 3D e gestione social per attività locali | CSD Station',
};
const descriptions = { automazioni: consultingIntro, nfc: nfcIntro, training: trainingIntro, web: webIntro };
const legalNames = ['Privacy consulenza', 'Termini consulenza', 'Privacy NFC', 'Termini NFC', 'Cookie policy'];
export const buildPaths = [...Object.values(servicePaths), ...legalPaths, '/privacy-policy-nfc/', '/terms-of-service-nfc/', ...Object.values(osPaths)];
const osPages = {
  restaurant: { name: 'CS Restaurant OS · demo | CSD Station', description: 'Demo dimostrativa di CS Restaurant OS: sala, cucina, cassa e magazzino collegati in tempo reale, con un assistente AI e WhatsApp. Sistema non ancora rilasciato.' },
  notaro: { name: 'CS Notaro OS · demo | CSD Station', description: 'Demo dimostrativa di CS Notaro OS: posta, pratiche, documenti compilati dall’AI e scadenze dello studio notarile, collegati con WhatsApp. Sistema non ancora rilasciato.' },
};

export function getPageMeta(pathname: string, search = '') {
  const path = normalizePath(pathname);
  const os = getOsProduct(path);
  if (os) {
    const url = origin + path;
    return { name: osPages[os].name, description: osPages[os].description, url, found: true, demo: true, service: false, mode: 'automazioni' as ServiceMode, markdown: null,
      graph: { '@context': 'https://schema.org', '@graph': [{ '@type': 'WebPage', '@id': `${url}#webpage`, url, name: osPages[os].name, description: osPages[os].description, inLanguage: 'it-IT' }] } };
  }
  const mode = getServiceMode(path, search);
  const service = Object.values(servicePaths).includes(path);
  const canonicalPath = service ? servicePaths[mode] : path === '/privacy-policy-nfc/' ? '/nfc/privacy-policy/' : path === '/terms-of-service-nfc/' ? '/nfc/terms-of-service/' : path;
  const legal = legalPaths.indexOf(canonicalPath);
  const found = service || legal >= 0;
  const name = service ? titles[mode] : found ? `${legalNames[legal]} | CSD Station` : 'Pagina non trovata | CSD Station';
  const description = service ? descriptions[mode] : found ? `${legalNames[legal]} di CSD Station: informazioni su servizi, condizioni e gestione dei dati.` : 'La pagina richiesta non è disponibile. Scopri consulenza AI, training aziendali, prodotti NFC, siti e social di CSD Station.';
  const url = origin + canonicalPath;
  const organization = {
    '@type': 'Organization', '@id': `${origin}/#organization`, name: 'CSD Station', url: `${origin}/`,
    logo: `${origin}/csd-brand.png`, email: 'carlo@csd-station.it', telephone: '+393518628203',
    founder: { '@id': `${origin}/#carlo-galli` }, areaServed: { '@type': 'Country', name: 'Italia' },
  };
  const graph: Record<string, unknown>[] = [organization,
    { '@type': 'Person', '@id': `${origin}/#carlo-galli`, name: 'Carlo Galli', worksFor: { '@id': organization['@id'] }, sameAs: ['https://www.skills.google/public_profiles/4a3ed6b8-9f55-463f-83a6-8c218717a8fd'] },
    { '@type': 'WebSite', '@id': `${origin}/#website`, url: `${origin}/`, name: 'CSD Station', inLanguage: 'it-IT', publisher: { '@id': organization['@id'] } },
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name, description, inLanguage: 'it-IT', isPartOf: { '@id': `${origin}/#website` }, about: { '@id': organization['@id'] }, ...(service ? { mainEntity: { '@id': `${url}#service` } } : {}) },
  ];
  if (service) graph.push({
    '@type': 'Service', '@id': `${url}#service`, name: name.replace(' | CSD Station', ''), description, url,
    provider: { '@id': organization['@id'] }, areaServed: { '@type': 'Country', name: 'Italia' },
    serviceType: mode === 'training' ? ['Training AI aziendale', 'Formazione AI per PMI'] : mode === 'web' ? ['Realizzazione siti web', 'Siti web 3D', 'Modelli 3D', 'Gestione social media', 'Clipping video'] : mode === 'nfc' ? ['Card NFC per recensioni Google', 'Plate adesive NFC', 'Stand NFC'] : ['Consulenza AI', 'Consulenza informatica', 'Automazioni aziendali', 'Consulenza hardware e NFC'],
  });
  if (service && canonicalPath !== '/') graph.push({
    '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'CSD Station', item: `${origin}/` },
      { '@type': 'ListItem', position: 2, name: mode === 'training' ? 'Training AI' : mode === 'web' ? 'Sito & Social' : 'Card NFC', item: url },
    ],
  });
  return { name, description, url, found, demo: false, service, mode, markdown: service ? `${url}index.md` : null, graph: { '@context': 'https://schema.org', '@graph': graph } };
}
export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]!));
}
export function renderSeoHead(page: ReturnType<typeof getPageMeta>) {
  const meta = (key: string, value: string, property = false) => `<meta data-seo ${property ? 'property' : 'name'}="${key}" content="${escapeHtml(value)}">`;
  return [
    // The browser title deliberately remains CSD Station, as requested by the owner.
    meta('description', page.description), meta('author', 'Carlo Galli — CSD Station'),
    meta('robots', page.found && !page.demo ? 'index, follow, max-image-preview:large' : 'noindex, follow'),
    ...(page.found ? [`<link data-seo rel="canonical" href="${escapeHtml(page.url)}">`] : []),
    meta('og:type', 'website', true), meta('og:site_name', 'CSD Station', true), meta('og:locale', 'it_IT', true),
    meta('og:title', page.name, true), meta('og:description', page.description, true), meta('og:url', page.url, true),
    meta('og:image', `${origin}/csd-brand.png`, true), meta('og:image:alt', 'Logo CSD Station', true),
    meta('twitter:card', 'summary'), meta('twitter:title', page.name), meta('twitter:description', page.description),
    meta('twitter:image', `${origin}/csd-brand.png`), meta('twitter:image:alt', 'Logo CSD Station'),
    `<link data-seo rel="describedby" href="${origin}/llms.txt" type="text/plain">`,
    ...(page.markdown ? [`<link data-seo rel="alternate" type="text/markdown" href="${page.markdown}" title="Versione testuale della pagina">`] : []),
    ...(page.found ? [`<script data-seo type="application/ld+json">${JSON.stringify(page.graph).replace(/</g, '\\u003c')}</script>`] : []),
  ].join('\n    ');
}
