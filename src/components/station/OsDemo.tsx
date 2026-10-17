import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ArrowUpRight, Monitor, Play, MousePointer2, Lock } from 'lucide-react';
import { StationHeader } from './Station';
import { Otto } from './StationExperiences';
import type { OsProduct } from '@/seo/routes';
import './os-demo.css';

// Vetrina delle demo OS: l'interfaccia vera gira dietro (in /os/<prodotto>/, sorgenti in os-demos/),
// oscurata e non interagibile finché il visitatore non sceglie di esplorarla. Solo desktop.
const whatsapp = (message: string) => `https://wa.me/393518628203?text=${encodeURIComponent(message)}`;
const products: Record<OsProduct, { name: string; sector: string; tagline: string; src: string; points: string[] }> = {
  restaurant: {
    name: 'CS Restaurant OS', sector: 'ristoranti', src: '/os/restaurant/index.html',
    tagline: 'Sala, cucina, cassa e magazzino. Tutto collegato, in tempo reale.',
    points: ['Il tavolo ordina, la cucina riceve, il magazzino si scala', 'Otto risponde al telefono e alle recensioni', 'Prenotazioni e ospiti su WhatsApp'],
  },
  notaro: {
    name: 'CS Notaro OS', sector: 'studi notarili', src: '/os/notaro/index.html',
    tagline: 'Posta, pratiche, documenti e scadenze. Con l’AI al centro dello studio.',
    points: ['Email e PEC lette e smistate nel team', 'L’AI compila moduli e confronta atti con le fonti', 'Clienti e banche aggiornati su WhatsApp'],
  },
};
// Le facce di Otto al posto delle classiche stelline: una per punto, ognuna con la sua espressione.
const faces = ['awake', 'happy', 'wink'] as const;
function OttoFace({ mood }: { mood: typeof faces[number] }) {
  return <span className={`os-face os-face-${mood}`} aria-hidden="true"><i/><i/><b/></span>;
}
const desktopQuery = '(min-width: 1024px)';
const subscribe = (callback: () => void) => { const m = window.matchMedia(desktopQuery); m.addEventListener('change', callback); return () => m.removeEventListener('change', callback); };

export default function OsDemo({ product }: { product: OsProduct }) {
  const p = products[product];
  const desktop = useSyncExternalStore(subscribe, () => window.matchMedia(desktopQuery).matches, () => true);
  const [open, setOpen] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  const contact = whatsapp(`Ciao Carlo! Vorrei avere più informazioni su ${p.name}.`);

  useEffect(() => { setOpen(false); }, [product]);
  useEffect(() => {
    document.documentElement.style.backgroundColor = '#101510';
    document.body.style.backgroundColor = '#101510';
  }, []);

  // La demo nell'iframe parte ferma: si accende solo mentre il visitatore la esplora e si rispegne quando la chiude.
  const tell = (message: string) => frame.current?.contentWindow?.postMessage(message, window.location.origin);
  useEffect(() => { tell(open ? 'csd:resume' : 'csd:pause'); }, [open]);
  const startTour = () => {
    setOpen(true);
    setTimeout(() => tell('csd:start-tour'), 250);
  };

  return <div className="station-site os-site">
    <StationHeader/>
    <main id="main-content" className="os-stage">
      {desktop ? <>
        <iframe ref={frame} className={`os-frame ${open ? 'is-open' : ''}`} src={p.src} title={`${p.name}, demo dimostrativa`} onLoad={() => tell(open ? 'csd:resume' : 'csd:pause')} tabIndex={open ? 0 : -1} aria-hidden={!open}/>
        {!open && <div className="os-veil">
          <div className="os-card">
            <div className="os-otto"><Otto mood="happy"/></div>
            <span className="os-eyebrow"><i/> DEMO DIMOSTRATIVA · NON ANCORA RILASCIATO</span>
            <h1>{p.name}</h1>
            <p className="os-tagline">{p.tagline}</p>
            <p className="os-text">Questa è una demo dimostrativa di come funzionano i nostri sistemi OS per {p.sector} a 360°, ancora non rilasciati e direttamente collegati con WhatsApp.</p>
            <ul>{p.points.map((point, i) => <li key={point}><OttoFace mood={faces[i % faces.length]}/>{point}</li>)}</ul>
            <a className="os-whatsapp" href={contact} target="_blank" rel="noreferrer">Vorrei più informazioni su {p.name} <ArrowUpRight size={18}/></a>
            <div className="os-secondary">
              <button type="button" onClick={startTour}><Play size={15}/> Guarda la demo guidata</button>
              <button type="button" onClick={() => setOpen(true)}><MousePointer2 size={15}/> Esplora da solo</button>
            </div>
            <small><Lock size={12}/> Dati, persone e numeri sono inventati. Il sistema dietro sta già girando.</small>
          </div>
        </div>}
        {open && <div className="os-bar">
          <span><i/> {p.name} · demo con dati inventati</span>
          <a href={contact} target="_blank" rel="noreferrer">Vorrei più informazioni <ArrowUpRight size={15}/></a>
          <button type="button" onClick={() => setOpen(false)}>Chiudi</button>
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
