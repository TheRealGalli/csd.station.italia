import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, Clapperboard, Monitor, Play, Presentation, X } from 'lucide-react';
import { mediaIntro } from '@/seo/content';
import { OttoIcon } from './OttoIcon';
import './media.css';

// Video & Slide: vetrina delle slide interattive (49 € ogni 15) e dei video motion (99 € ogni 2 minuti).
// I materiali arrivano dalla sessione di produzione (Remotion + FFmpeg): basta indicare qui src e poster.
const whatsapp = (message: string) => `https://wa.me/393518628203?text=${encodeURIComponent(message)}`;
export const mediaContact = whatsapp('Ciao Carlo! Vorrei informazioni su video motion e slide interattive.');
function Eyebrow({ children }: { children: React.ReactNode }) { return <div className="station-eyebrow"><span/>{children}</div>; }

type Demo = { n: string; title: string; note: string; src?: string; poster?: string };
// Video demo da 30 secondi, 1920×1080. Il primo è definito; gli altri titoli sono segnaposto da confermare.
const videos: Demo[] = [
  { n: '01', title: 'Università e tesine', note: 'Tesi e tesine: dalla domanda ai risultati, in 30 secondi.', src: '/video-slide/video-01-universita.mp4', poster: '/video-slide/video-01-universita.jpg' },
  { n: '02', title: 'Lancio di un prodotto', note: 'Il prodotto, i vantaggi, il prezzo. Chiaro e veloce.' },
  { n: '03', title: 'Report aziendale', note: 'Numeri e grafici che si capiscono al primo sguardo.' },
  { n: '04', title: 'Menu e locale', note: 'Piatti, orari e prenotazioni, raccontati in motion.' },
  { n: '05', title: 'Pitch per investitori', note: 'Problema, soluzione, mercato: tutto in un minuto.' },
  { n: '06', title: 'Concessionarie e autofficine', note: 'Tagliandi, revisioni e offerte, spiegati in 30 secondi.' },
];

// Slide interattive vere, una presentazione da 15 slide per settore (file HTML autonomi in /video-slide/).
type Deck = { sector: string; src?: string; slides?: number };
const decks: Deck[] = [
  { sector: 'Università', src: '/video-slide/slide-01-universita.html', slides: 8 },
  { sector: 'Prodotto' }, { sector: 'Immobili' }, { sector: 'Cibo' }, { sector: 'Grafici' }, { sector: 'Veicoli', src: '/video-slide/slide-06-auto.html', slides: 8 }, { sector: 'Hardware' },
];

function SlideDeck() {
  const [i, setI] = useState(0), [height, setHeight] = useState(0), [say, setSay] = useState('');
  const deck = decks[i];
  const frameRef = useRef<HTMLIFrameElement>(null);
  // Il riquadro ha la stessa altezza per tutte le slide: si misura la slide più alta e la si usa per tutte.
  // Con la pagina prerenderizzata l'iframe può finire di caricare prima di React: per questo si aggancia da un effetto.
  useEffect(() => {
    setHeight(0); // ogni presentazione riparte dal riquadro standard
    const frame = frameRef.current; if (!frame) return;
    let observer: ResizeObserver | undefined;
    const fit = () => {
      const doc = frame.contentDocument, win = frame.contentWindow as (Window & { go?: (i: number) => void }) | null;
      if (!doc || !win || !doc.getElementById('menu') || doc.getElementById('csd-fit')) return;
      // dentro il riquadro: niente menu a tendina (restano Avanti e Indietro), Otto più piccolo accanto ai contenuti, spazi più compatti
      const st = doc.createElement('style'); st.id = 'csd-fit';
      st.textContent = 'main{min-height:0!important;overflow:hidden}.index select{display:none!important}.visual:has(.mascot){padding-right:120px}.visual .mascot{transform:scale(.5);right:0}.chart{padding:0}.cards,.cards:has(.card:nth-child(3)){padding-bottom:0}.card{padding:16px 20px;font-size:20px}.offers{font-size:52px}.row{padding:7px 0}';
      doc.head.append(st);
      const main = doc.querySelector('main'), menu = doc.getElementById('menu') as HTMLSelectElement, slides = menu.options.length;
      const measure = () => {
        if (main && win.go && slides) {
          const current = Number(menu.value || 0);
          main.style.height = '';
          let tallest = 0;
          for (let k = 0; k < slides; k++) { win.go(k); tallest = Math.max(tallest, main.offsetHeight); }
          win.go(current); main.style.height = `${tallest}px`;
        }
        setHeight(doc.body.scrollHeight + 2); // +2: il bordo del riquadro
      };
      measure();
      let w = frame.clientWidth;
      observer = new ResizeObserver(() => { if (frame.clientWidth !== w) { w = frame.clientWidth; measure(); } });
      observer.observe(frame);
    };
    fit(); frame.addEventListener('load', fit);
    return () => { frame.removeEventListener('load', fit); observer?.disconnect(); };
  }, [deck.src]);
  // Le battute di Otto arrivano dalla presentazione e si leggono fuori dal riquadro, accanto a lui.
  useEffect(() => {
    setSay('');
    const listen = (e: MessageEvent) => { if (e.source === frameRef.current?.contentWindow && e.data?.csd === 'otto') setSay(String(e.data.text || '')); };
    window.addEventListener('message', listen); return () => window.removeEventListener('message', listen);
  }, [deck.src]);
  return <div className="ms-deck">
    <div className="ms-tabs" role="tablist" aria-label="Presentazioni per settore">{decks.map((d, k) => <button key={d.sector} type="button" role="tab" aria-selected={k === i} disabled={!d.src} onClick={() => setI(k)}>{d.sector}{d.src ? null : <small>In arrivo</small>}</button>)}</div>
    <div className="ms-frame">
      <div className="ms-stage" style={height ? { height } : undefined}>{deck.src && <iframe key={deck.src} src={deck.src} title={`Slide interattive: ${deck.sector}`} ref={frameRef}/>}</div>
      {say && <p className="ms-say" key={say} aria-live="polite"><OttoIcon mood="happy" size={16}/>{say}</p>}
    </div>
    <p className="ms-hint">{deck.slides ?? 15} slide · clicca dentro le slide per proseguire, o usa le frecce · <a href={deck.src} target="_blank" rel="noreferrer">apri a schermo intero <ArrowUpRight size={13}/></a></p>
  </div>;
}

function VideoCard({ v, onOpen }: { v: Demo; onOpen: () => void }) {
  return <article className={`mv-card ${v.src ? '' : 'soon'}`}>
    <button type="button" className="mv-frame" onClick={v.src ? onOpen : undefined} disabled={!v.src} aria-label={v.src ? `Guarda: ${v.title}` : `${v.title}: in arrivo`}
      onMouseEnter={e => e.currentTarget.querySelector('video')?.play().catch(() => {})} onMouseLeave={e => { const vid = e.currentTarget.querySelector('video'); if (vid) { vid.pause(); vid.currentTime = 0; } }}>
      {v.src ? <video src={v.src} poster={v.poster} muted loop playsInline preload="metadata"/> : <span className="mv-soon"><OttoIcon mood="think" size={34}/><b>In arrivo</b></span>}
      <span className="mv-n">{v.n}</span>
      {v.src && <span className="mv-play"><Play size={22} fill="currentColor"/></span>}
      <span className="mv-dur">0:30 · 1920×1080</span>
    </button>
    <h3>{v.title}</h3><p>{v.note}</p>
  </article>;
}

// La card dietro il video anticipa la scena successiva (il video cambia settore ogni 5 secondi),
// ognuna con la sua piccola animazione: barre, linea, prodotto, numeri, cerchi, auto.
// Il bollino di Otto cambia mestiere con il settore in onda.
const ottoLines: { text: string; emoji: string; mood: 'awake' | 'happy' | 'wink' | 'read' | 'think' }[] = [
  { text: 'OTTO TI AIUTA A STUDIARE', emoji: '🎓', mood: 'read' },
  { text: 'OTTO RISTORATORE', emoji: '🍝', mood: 'happy' },
  { text: 'OTTO TI CONSIGLIA', emoji: '🛍️', mood: 'wink' },
  { text: 'OTTO CALCOLA', emoji: '📊', mood: 'think' },
  { text: 'OTTO FA IL PITCH', emoji: '🚀', mood: 'awake' },
  { text: 'OTTO TI GUIDA', emoji: '🔧', mood: 'happy' },
];
type Peek = 'bars' | 'line' | 'product' | 'kpi' | 'funnel' | 'garage';
const heroScenes: { sector: string; title: string; kind: Peek }[] = [
  { sector: 'Università', title: 'Come arrivano gli studenti', kind: 'bars' },
  { sector: 'Ristorante', title: 'Coperti della settimana', kind: 'line' },
  { sector: 'Negozio', title: 'Borraccia in alluminio', kind: 'product' },
  { sector: 'Azienda', title: 'Risultati del trimestre', kind: 'kpi' },
  { sector: 'Startup', title: 'Il mercato che puntiamo', kind: 'funnel' },
  { sector: 'Officina', title: 'Tagliandi e revisioni', kind: 'garage' },
];
function PeekVisual({ kind }: { kind: Peek }) {
  if (kind === 'bars') return <div className="mh-bars">{[46, 38, 52, 74, 30].map((h, k) => <i key={k} style={{ height: `${h}%`, animationDelay: `${k * .08}s` }}/>)}</div>;
  if (kind === 'line') return <svg className="mh-line" viewBox="0 0 240 80" preserveAspectRatio="none"><polyline pathLength={1} points="4,60 42,50 80,54 118,40 156,32 194,8 236,20"/><circle cx="194" cy="8" r="5"/></svg>;
  if (kind === 'product') return <div className="mh-product"><img src="/video-slide/peek-bottiglia.png" alt=""/><span>19,90 €</span></div>;
  if (kind === 'kpi') return <div className="mh-kpi">{[['1,24 M€', 82], ['318', 64], ['22%', 48]].map(([n, w], k) => <div key={k} style={{ animationDelay: `${k * .1}s` }}><b>{n}</b><i style={{ width: `${w}%`, animationDelay: `${.3 + k * .1}s` }}/></div>)}</div>;
  if (kind === 'funnel') return <div className="mh-funnel">{[0, 1, 2].map(k => <i key={k} style={{ animationDelay: `${k * .15}s` }}/>)}<span>120k clienti</span></div>;
  return <div className="mh-garage"><img src="/video-slide/peek-auto.png" alt=""/><span>52 tagliandi</span></div>;
}

export default function MediaPage({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState<Demo | null>(null), [peek, setPeek] = useState(1);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null); };
    document.addEventListener('keydown', esc); return () => document.removeEventListener('keydown', esc);
  }, [open]);
  return <>
    <section className="nfc-hero media-hero"><div className="wrap nfc-hero-layout"><div>
      <Eyebrow>SLIDE INTERATTIVE E VIDEO MOTION</Eyebrow>
      <h1>Le idee si capiscono<br/><span>quando si muovono.</span></h1>
      <p>{mediaIntro}</p>
      <a className="station-button" href="#slide">Guarda gli esempi <ArrowDown size={18}/></a>
      <div className="nfc-benefits"><span><Check size={15}/> 15 slide a 49 €</span><span><Check size={15}/> Video da 99 € ogni 2 minuti</span></div>
    </div><div className="media-hero-art">
      <div className="mh-slide" aria-hidden="true"><div className="mh-peek" key={peek}><span className="ms-eyebrow">PROSSIMA · {heroScenes[peek].sector.toUpperCase()}</span><b>{heroScenes[peek].title}</b><PeekVisual kind={heroScenes[peek].kind}/></div></div>
      <div className="mh-video" aria-hidden="true"><video onTimeUpdate={e => setPeek((Math.floor(e.currentTarget.currentTime / 5) + 1) % heroScenes.length)} src="/video-slide/media-motion.mp4" poster="/video-slide/media-motion.jpg" autoPlay muted loop playsInline preload="metadata"/><span className="mh-rec"><i/> MOTION</span></div>
      <span className="product-float mh-chip" aria-hidden="true"><span className={`mh-chip-in in-${(peek + 5) % 4}`} key={`otto-${(peek + 5) % 6}`}><OttoIcon mood={ottoLines[(peek + 5) % 6].mood} size={18}/> {ottoLines[(peek + 5) % 6].text} <i>{ottoLines[(peek + 5) % 6].emoji}</i></span></span>
      <div className="mh-note" aria-hidden="true"><b>COME LAVORO</b><ul><li>Studio del contenuto e del pubblico</li><li>Coerenza in ogni slide</li><li>Pensate per essere condivise</li></ul><small>Qualità sì, viralità garantita no.</small></div>
      <a className="mh-click" href={whatsapp('Ciao Carlo! Vorrei slide e video come quelli della pagina Video & Slide.')} target="_blank" rel="noreferrer"><span>Voglio slide così</span><svg viewBox="0 0 24 28" width="18" height="21" aria-hidden="true"><path d="M2 2 L2 22 L8 16 L12 26 L16 24 L12 14 L20 14 Z" fill="#f8faf3" stroke="#1d2b16" strokeWidth="1.6" strokeLinejoin="round"/></svg><small>SCRIVIMI SU WHATSAPP</small></a>
      <div className="mh-sectors" aria-hidden="true">{['Università', 'Ristorante', 'Negozio', 'Azienda', 'Startup', 'Concessionarie e autofficine'].map((l, k) => <span key={l} className={k === (peek + 5) % 6 ? 'on' : undefined}>{l.toUpperCase()}</span>)}</div>
    </div></div></section>

    <section className="media-section media-slides" id="slide"><div className="wrap media-slides-inner">
      <div className="section-heading"><div><Eyebrow>01 / SLIDE INTERATTIVE</Eyebrow><h2>Presentazioni che<br/><span>si sfogliano da sole.</span></h2></div><p>Layout moderni per presentazioni web, esportabili per Google Slides. Sfoglia la presentazione d’esempio per l’università.</p></div>
      <SlideDeck/>
    </div></section>

    <section className="media-section wrap" id="video">
      <div className="section-heading"><div><Eyebrow>02 / VIDEO MOTION</Eyebrow><h2>Sei esempi da 30 secondi.<br/><span>Nessuna voce, solo ritmo.</span></h2></div><p>Grafiche animate, dati verosimili e Otto che guida lo sguardo. Musica di sottofondo ed effetti sonori sincronizzati a ogni clic.</p></div>
      <div className="mv-grid">{videos.map(v => <VideoCard key={v.n} v={v} onOpen={() => setOpen(v)}/>)}</div>
    </section>

    <section className="media-section wrap" id="prezzi">
      <div className="section-heading"><div><Eyebrow>03 / PREZZI</Eyebrow><h2>Due formati.<br/>Prezzi chiari.</h2></div><p>Si parte dai tuoi contenuti: testi, dati e immagini. Al resto pensiamo noi, dall’idea al file finito.</p></div>
      <div className="mp-grid">
        <article className="mp-card"><Presentation size={28}/><h3>Slide interattive</h3><div className="price-row"><strong>49 €</strong><span>pacchetto da 15 slide</span></div>
          <ul className="web-points">{['Layout moderni e coerenti', 'Grafici e numeri leggibili', 'Presentazione web o esportazione per Google Slides', 'Otto e il tuo marchio, se vuoi'].map(p => <li key={p}><Check size={14}/>{p}</li>)}</ul>
          <a className="station-button" href={whatsapp('Ciao Carlo! Mi interessano le slide interattive (49 € per 15 slide).')} target="_blank" rel="noreferrer">Richiedi le slide <ArrowUpRight size={17}/></a></article>
        <article className="mp-card"><Clapperboard size={28}/><h3>Video motion interattivo</h3><div className="price-row"><strong>99 €</strong><span>ogni 2 minuti di contenuto</span></div>
          <ul className="web-points">{['Grafiche, testi e dati animati', 'Otto come guida in ogni scena', 'Musica ed effetti sonori, senza voce fuori campo', 'Full HD 1920×1080, pronto per il web'].map(p => <li key={p}><Check size={14}/>{p}</li>)}</ul>
          <a className="station-button" href={whatsapp('Ciao Carlo! Mi interessa un video motion interattivo (99 € ogni 2 minuti).')} target="_blank" rel="noreferrer">Richiedi un video <ArrowUpRight size={17}/></a></article>
      </div>
      <p className="catalog-note">Gli esempi usano un marchio dimostrativo e dati verosimili, non clienti reali.</p>
    </section>

    {children}

    {open && <div className="mv-lightbox" role="dialog" aria-modal="true" aria-label={open.title} onClick={() => setOpen(null)}>
      <div className="mv-player" onClick={e => e.stopPropagation()}>
        <video src={open.src} poster={open.poster} controls autoPlay playsInline/>
        <button type="button" className="mv-close" onClick={() => setOpen(null)} aria-label="Chiudi"><X size={20}/></button>
        <span className="mv-title">{open.n} · {open.title}</span>
      </div>
    </div>}
  </>;
}

// Da telefono la sezione non è ancora pronta: un invito ad aprirla dal computer.
export function MediaMobile() {
  return <div className="mobile-landing"><section className="mobile-section media-mobile">
    <span className="mobile-eyebrow"><i/> VIDEO & SLIDE</span>
    <h1>Questa sezione<br/><em>si apre dal computer.</em></h1>
    <p>Slide interattive da 49 € ogni 15 e video motion da 99 € ogni 2 minuti: gli esempi sono pensati per lo schermo grande.</p>
    <div className="media-mobile-icon"><Monitor size={40}/></div>
    <a className="mobile-primary" href={mediaContact} target="_blank" rel="noreferrer">Scrivimi su WhatsApp <ArrowUpRight size={20}/></a>
  </section></div>;
}
