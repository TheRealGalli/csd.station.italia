import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppContent } from '@/App';
export { getPageMeta, renderSeoHead, buildPaths, origin } from './metadata';
export { servicePaths, canonicalNavigation, getServiceMode } from './routes';
export function renderPage(pathname: string) {
  return renderToString(<StaticRouter location={pathname}><AppContent/></StaticRouter>);
}
