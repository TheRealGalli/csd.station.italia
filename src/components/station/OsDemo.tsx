import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ArrowUpRight, Monitor } from 'lucide-react';
import { StationHeader } from './Station';
import type { OsProduct } from '@/seo/routes';
import './os-demo.css';

// Demo OS: l'interfaccia vera (in /os/<prodotto>/, sorgenti in os-demos/) si apre subito con la demo guidata dal passo 1.
// La demo guidata si chiude e si riapre quando si vuole, e la sfida si avvia in qualsiasi momento. Solo desktop.
const whatsapp = (message: string) => `https://wa.me/393518628203?text=${encodeURIComponent(message)}`;
const products: Record<OsProduct, { name: string; sector: string; tagline: string; src: string; shot: string }> = {
  restaurant: {
    name: 'CS Restaurant OS', sector: 'ristoranti', src: '/os/restaurant/index.html', shot: '/os-shots/restaurant.webp',
    tagline: 'Sala, cucina, cassa e magazzino. Tutto collegato, in tempo reale.',
  },
  notaro: {
    name: 'CS Notaro OS', sector: 'studi notarili', src: '/os/notaro/index.html', shot: '/os-shots/notaro.webp',
    tagline: 'Posta, pratiche, documenti e scadenze. Con l’AI al centro dello studio.',
  },
};
const desktopQuery = '(min-width: 1024px)';
const subscribe = (callback: () => void) => { const m = window.matchMedia(desktopQuery); m.addEventListener('change', callback); return () => m.removeEventListener('change', callback); };

export default function OsDemo({ product }: { product: OsProduct }) {
  const p = products[product];
  const desktop = useSyncExternalStore(subscribe, () => window.matchMedia(desktopQuery).matches, () => true);
  const [open, setOpen] = useState(true);
  // la X chiude solo la barra in basso, non la demo né il gioco
  const [barClosed, setBarClosed] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  // Sotto il menu si vede una foto del sistema: il sistema vero intanto si carica dietro, nascosto.
  // La foto sparisce solo quando il visitatore entra e l'iframe è pronto, così non si vede mai il bianco.
  const [ready, setReady] = useState(false);
  const contact = whatsapp(`Ciao Carlo! Vorrei avere più informazioni su ${p.name}.`);

  useEffect(() => { setOpen(true); setTouring(false); setBarClosed(false); setReady(false); pending.current = 'csd:start-tour'; }, [product]);
  useEffect(() => {
    document.documentElement.style.backgroundColor = '#101510';
    document.body.style.backgroundColor = '#101510';
  }, []);

  // La demo nell'iframe parte ferma: si accende solo mentre il visitatore la esplora e si rispegne quando la chiude.
  const tell = (message: string) => frame.current?.contentWindow?.postMessage(message, window.location.origin);
  useEffect(() => { tell(open ? 'csd:resume' : 'csd:pause'); }, [open]);
  // durante la demo guidata la barra in basso sparisce, così non copre mai le nuvolette di Otto
  const [touring, setTouring] = useState(false);
  useEffect(() => {
    const listen = (e: MessageEvent) => { if (e.origin === window.location.origin && (e.data === 'csd:tour-start' || e.data === 'csd:tour-end')) setTouring(e.data === 'csd:tour-start'); };
    window.addEventListener('message', listen); return () => window.removeEventListener('message', listen);
  }, []);
  // Se il visitatore sceglie prima che il sistema dietro abbia finito di caricare, il comando aspetta il caricamento:
  // un messaggio mandato a una pagina non ancora pronta andrebbe perso, e la demo si aprirebbe senza partire.
  const pending = useRef<string | null>('csd:start-tour');
  return <div className="station-site os-site">
    <StationHeader/>
    <main id="main-content" className="os-stage">
      {desktop ? <>
        <iframe ref={frame} className={`os-frame ${open ? 'is-open' : ''}`} src={`${p.src}?v=${__OS_VERSION__}`} title={`${p.name}, demo dimostrativa`} onLoad={() => { tell(open ? 'csd:resume' : 'csd:pause'); setTimeout(() => { setReady(true); if (pending.current) { tell('csd:resume'); tell(pending.current); pending.current = null; } }, 400); }} tabIndex={open ? 0 : -1} aria-hidden={!open}/>
        <img className={`os-shot ${open && ready ? 'is-gone' : ''}`} src={p.shot} alt="" aria-hidden="true" fetchPriority="high" decoding="async"/>
        <h1 className="os-sr">{p.name}, demo dimostrativa</h1>
        {open && !touring && !barClosed && <div className="os-bar">
          <span><i/> {p.name} · demo con dati inventati</span>
          <a href={contact} target="_blank" rel="noreferrer">Vorrei più informazioni <ArrowUpRight size={15}/></a>
          <button type="button" className="os-bar-x" onClick={() => setBarClosed(true)} aria-label="Chiudi questa barra (la demo resta aperta)" title="Chiudi la barra">×</button>
        </div>}
      </> : <div className="os-mobile">
        <Monitor size={34}/>
        <span className="os-eyebrow"><i/> DEMO DIMOSTRATIVA</span>
        <h1>{p.name}</h1>
        <p>{p.tagline}</p>
        <p className="os-text">La demo è pensata per lo schermo di un computer. Aprila da desktop, oppure scrivimi e te la mostro.</p>
        <a className="os-whatsapp" href={contact} target="_blank" rel="noreferrer">Vorrei più informazioni su {p.name} <ArrowUpRight size={18}/></a>
      </div>}
    </main>
  </div>;
}
