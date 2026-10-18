import { useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent, type MouseEvent } from 'react';
import { ArrowUpRight, Monitor, Lock, Play, Gamepad2, MousePointer2, MessageCircle, type LucideIcon } from 'lucide-react';
import { StationHeader } from './Station';
import { Otto } from './StationExperiences';
import type { OsProduct } from '@/seo/routes';
import './os-demo.css';

// Vetrina delle demo OS: l'interfaccia vera gira dietro (in /os/<prodotto>/, sorgenti in os-demos/),
// oscurata e non interagibile finché il visitatore non sceglie di esplorarla. Solo desktop.
const whatsapp = (message: string) => `https://wa.me/393518628203?text=${encodeURIComponent(message)}`;
const products: Record<OsProduct, { name: string; sector: string; tagline: string; src: string; shot: string; points: string[] }> = {
  restaurant: {
    name: 'CS Restaurant OS', sector: 'ristoranti', src: '/os/restaurant/index.html', shot: '/os-shots/restaurant.webp',
    tagline: 'Sala, cucina, cassa e magazzino. Tutto collegato, in tempo reale.',
    points: ['Il tavolo ordina, la cucina riceve, il magazzino si scala', 'Otto risponde al telefono e alle recensioni', 'Prenotazioni e ospiti su WhatsApp'],
  },
  notaro: {
    name: 'CS Notaro OS', sector: 'studi notarili', src: '/os/notaro/index.html', shot: '/os-shots/notaro.webp',
    tagline: 'Posta, pratiche, documenti e scadenze. Con l’AI al centro dello studio.',
    points: ['Email e PEC lette e smistate nel team', 'L’AI compila moduli e confronta atti con le fonti', 'Clienti e banche aggiornati su WhatsApp'],
  },
};
// Le facce di Otto al posto delle classiche stelline: una per punto, ognuna con la sua espressione.
const faces = ['awake', 'happy', 'wink'] as const;
function OttoFace({ mood }: { mood: typeof faces[number] }) {
  return <span className={`os-face os-face-${mood}`} aria-hidden="true"><i/><i/><b/></span>;
}
// Il menu della vetrina è lo schermo di Otto: un terminale a fosfori verdi, una scelta per riga.
// Il mouse (o le frecce) accende la riga; clic o Invio la avvia.
type Choice = { key: string; label: string; note: string; icon: LucideIcon; run?: () => void; href?: string };
function OttoTerminal({ name, choices }: { name: string; choices: Choice[] }) {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLDivElement>(null);
  // La freccetta a pixel la disegna il sito: il cursore di sistema qui dentro è nascosto,
  // così su nessun sistema (Mac compreso) diventa la manina sopra pulsanti e link.
  const screen = useRef<HTMLDivElement>(null), arrow = useRef<HTMLSpanElement>(null);
  const moveArrow = (e: MouseEvent<HTMLDivElement>) => {
    const r = screen.current?.getBoundingClientRect(); if (!r || !arrow.current) return;
    arrow.current.style.transform = `translate(${e.clientX - r.left}px, ${e.clientY - r.top}px)`;
    arrow.current.style.opacity = '1';
  };
  const hideArrow = () => { if (arrow.current) arrow.current.style.opacity = '0'; };
  const focusRow = (i: number) => { setActive(i); (list.current?.children[i] as HTMLElement | undefined)?.focus(); };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); focusRow((active + 1) % choices.length); }
    if (e.key === 'ArrowUp') { e.preventDefault(); focusRow((active - 1 + choices.length) % choices.length); }
  };
  return <div className="os-term">
    <span className="os-term-antenna" aria-hidden="true"><i/></span>
    <span className="os-term-ear left" aria-hidden="true"/><span className="os-term-ear right" aria-hidden="true"/>
    <div className="os-term-screen" ref={screen} onMouseMove={moveArrow} onMouseLeave={hideArrow}>
      <span className="os-term-cursor" ref={arrow} aria-hidden="true"><svg viewBox="0 0 11 15" width="22" height="30" shapeRendering="crispEdges"><path d="M1 1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1H7v1h1v2H7v1H6v-2H5v-1H4v1H3v1H2v1H1z" fill="#0b1d0f" stroke="#d6ff9f" strokeWidth="1.1"/></svg></span>
      <div className="os-term-head" aria-hidden="true"><span className="os-term-eyes"><i/><i/></span><span>OTTO-OS · {name.toUpperCase()}</span><span>SCEGLI UN PROGRAMMA</span></div>
      <div className="os-term-list" role="menu" aria-label={`Come vuoi vedere ${name}`} ref={list} onKeyDown={onKey}>
        {choices.map((c, i) => {
          const props = { role: 'menuitem', className: `os-term-row ${i === active ? 'on' : ''}`, onMouseEnter: () => setActive(i), onFocus: () => setActive(i), tabIndex: i === active ? 0 : -1 };
          const body = <><span className="os-term-caret" aria-hidden="true">{i === active ? '>' : ' '}</span><span className="os-term-label">{c.label}</span><span className="os-term-icon" aria-hidden="true"><c.icon size={16} strokeWidth={2.2}/></span><span className="os-term-dots" aria-hidden="true"/><span className="os-term-key" aria-hidden="true">[{i + 1}]</span></>;
          return c.href ? <a key={c.key} {...props} href={c.href} target="_blank" rel="noreferrer">{body}</a> : <button key={c.key} type="button" {...props} onClick={c.run}>{body}</button>;
        })}
      </div>
      <div className="os-term-status" aria-live="polite"><span>&gt; {choices[active].note}</span><i className="os-term-blink" aria-hidden="true"/></div>
      <span className="os-term-mouth" aria-hidden="true"/>
    </div>
  </div>;
}
const desktopQuery = '(min-width: 1024px)';
const subscribe = (callback: () => void) => { const m = window.matchMedia(desktopQuery); m.addEventListener('change', callback); return () => m.removeEventListener('change', callback); };

export default function OsDemo({ product }: { product: OsProduct }) {
  const p = products[product];
  const desktop = useSyncExternalStore(subscribe, () => window.matchMedia(desktopQuery).matches, () => true);
  const [open, setOpen] = useState(false);
  // la X chiude solo la barra in basso, non la demo né il gioco
  const [barClosed, setBarClosed] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  // Sotto il menu si vede una foto del sistema: il sistema vero intanto si carica dietro, nascosto.
  // La foto sparisce solo quando il visitatore entra e l'iframe è pronto, così non si vede mai il bianco.
  const [ready, setReady] = useState(false);
  const contact = whatsapp(`Ciao Carlo! Vorrei avere più informazioni su ${p.name}.`);

  useEffect(() => { setOpen(false); setTouring(false); setBarClosed(false); setReady(false); }, [product]);
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
  const startTour = () => {
    setOpen(true);
    setTimeout(() => tell('csd:start-tour'), 250);
  };
  // la demo da giocare: Otto spiega in tre passaggi e poi parte la sfida con le missioni
  const startGame = () => {
    setOpen(true);
    setTimeout(() => tell('csd:start-game'), 250);
  };

  return <div className="station-site os-site">
    <StationHeader/>
    <main id="main-content" className="os-stage">
      {desktop ? <>
        <iframe ref={frame} className={`os-frame ${open ? 'is-open' : ''}`} src={`${p.src}?v=${__OS_VERSION__}`} title={`${p.name}, demo dimostrativa`} onLoad={() => { tell(open ? 'csd:resume' : 'csd:pause'); setTimeout(() => setReady(true), 400); }} tabIndex={open ? 0 : -1} aria-hidden={!open}/>
        <img className={`os-shot ${open && ready ? 'is-gone' : ''}`} src={p.shot} alt="" aria-hidden="true" fetchPriority="high" decoding="async"/>
        {!open && <div className="os-veil">
          <div className="os-card">
            <div className={`os-otto os-otto-${product}`}><Otto mood="happy"/>{product === 'restaurant' ? <span className="os-prop os-plate" aria-hidden="true"><i/></span> : <><span className="os-prop os-glasses" aria-hidden="true"/><span className="os-prop os-book" aria-hidden="true"/></>}</div>
            <span className="os-eyebrow"><i/> DEMO DIMOSTRATIVA · NON ANCORA RILASCIATO</span>
            <h1>{p.name}</h1>
            <p className="os-tagline">{p.tagline}</p>
            <p className="os-text">Questa è una demo dimostrativa di come funzionano i nostri sistemi OS per {p.sector} a 360°, ancora non rilasciati e direttamente collegati con WhatsApp.</p>
            <ul>{p.points.map((point, i) => <li key={point}><OttoFace mood={faces[i % faces.length]}/>{point}</li>)}</ul>
            <OttoTerminal name={p.name} choices={[
              { key: 'tour', icon: Play, label: 'Guarda la demo guidata', note: 'Otto ti accompagna passo per passo.', run: startTour },
              { key: 'free', icon: MousePointer2, label: 'Esplora da solo', note: 'Il sistema è acceso: tocca tutto quello che vuoi.', run: () => setOpen(true) },
              { key: 'wa', icon: MessageCircle, label: 'Più informazioni su WhatsApp', note: 'Scrivi a Carlo: risponde lui, direttamente.', href: contact },
              { key: 'play', icon: Gamepad2, label: 'Gioca', note: 'Missioni vere, generate a caso. Si impara giocando.', run: startGame },
            ]}/>
            <small><Lock size={12}/> Dati, persone e numeri sono inventati. Il sistema dietro sta già girando.</small>
          </div>
        </div>}
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
