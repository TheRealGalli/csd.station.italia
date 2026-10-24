export type ServiceMode = 'automazioni' | 'nfc' | 'training' | 'web' | 'media' | 'lead' | 'forecasting';
export const servicePaths: Record<ServiceMode, string> = {
  automazioni: '/', nfc: '/card-nfc/', training: '/training-ai/', web: '/sito-social/', media: '/video-slide/', lead: '/lead/', forecasting: '/forecasting/',
};
// Demo dei sistemi OS di settore: solo desktop, non ancora rilasciati (noindex).
export type OsProduct = 'restaurant' | 'notaro';
export const osPaths: Record<OsProduct, string> = { restaurant: '/restaurant-os/', notaro: '/notaro-os/' };
export function getOsProduct(pathname: string): OsProduct | null {
  const path = normalizePath(pathname);
  return (Object.keys(osPaths) as OsProduct[]).find(key => osPaths[key] === path) ?? null;
}
export const legalPaths = ['/privacy-policy/', '/terms-of-service/', '/nfc/privacy-policy/', '/nfc/terms-of-service/', '/cookie-policy/'];
export function normalizePath(path: string) {
  return path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`;
}
export function getServiceMode(pathname: string, search = ''): ServiceMode {
  const path = normalizePath(pathname);
  if (path === servicePaths.forecasting) return 'forecasting';
  if (path === servicePaths.lead) return 'lead';
  if (path === servicePaths.training) return 'training';
  if (path === servicePaths.web) return 'web';
  if (path === servicePaths.media) return 'media';
  if (path === servicePaths.nfc || path.startsWith('/nfc/') || path.endsWith('-nfc/')) return 'nfc';
  if (path === '/') {
    const mode = new URLSearchParams(search).get('mode');
    if (mode === 'nfc' || mode === 'training' || mode === 'lead' || mode === 'forecasting') return mode;
  }
  return 'automazioni';
}
// GitHub Pages cannot issue query-based HTTP redirects. Keep legacy shared links working.
export function canonicalNavigation(pathname: string, search: string, hash: string) {
  const path = normalizePath(pathname);
  const params = new URLSearchParams(search);
  let target = path;
  if (path === '/' && params.has('mode')) {
    target = servicePaths[getServiceMode(path, search)];
    params.delete('mode');
  } else if (path === '/privacy-policy-nfc/') target = '/nfc/privacy-policy/';
  else if (path === '/terms-of-service-nfc/') target = '/nfc/terms-of-service/';
  const known = Object.values(servicePaths).includes(target) || legalPaths.includes(target);
  if (!known) return null;
  params.delete('mode');
  const query = params.toString();
  const next = target + (query ? `?${query}` : '') + hash;
  return next === pathname + search + hash ? null : next;
}
