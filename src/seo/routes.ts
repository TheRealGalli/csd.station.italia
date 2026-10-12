export type ServiceMode = 'automazioni' | 'nfc' | 'training';
export const servicePaths: Record<ServiceMode, string> = {
  automazioni: '/', nfc: '/card-nfc/', training: '/training-ai/',
};
export const legalPaths = ['/privacy-policy/', '/terms-of-service/', '/nfc/privacy-policy/', '/nfc/terms-of-service/', '/cookie-policy/'];
export function normalizePath(path: string) {
  return path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`;
}
export function getServiceMode(pathname: string, search = ''): ServiceMode {
  const path = normalizePath(pathname);
  if (path === servicePaths.training) return 'training';
  if (path === servicePaths.nfc || path.startsWith('/nfc/') || path.endsWith('-nfc/')) return 'nfc';
  if (path === '/') {
    const mode = new URLSearchParams(search).get('mode');
    if (mode === 'nfc' || mode === 'training') return mode;
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
