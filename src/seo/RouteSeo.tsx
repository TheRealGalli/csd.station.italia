import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageMeta, renderSeoHead } from './metadata';

export function RouteSeo() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    document.title = 'CSD Station';
    document.head.querySelectorAll('[data-seo]').forEach(element => element.remove());
    document.head.insertAdjacentHTML('beforeend', renderSeoHead(getPageMeta(pathname, search)));
  }, [pathname, search]);
  return null;
}
