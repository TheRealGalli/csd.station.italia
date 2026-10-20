import { useEffect, useState } from 'react';
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
type Deck = { sector: string; src?: string };
const decks: Deck[] = [
  { sector: 'Università', src: '/video-slide/slide-01-universita.html' },
  { sector: 'Prodotto' }, { sector: 'Azienda' }, { sector: 'Ristorante' }, { sector: 'Startup' }, { sector: 'Concessionarie e autofficine' },
];

function SlideDeck() {
  const [i, setI] = useState(0), [height, setHeight] = useState(0);
  const deck = decks[i];
  // il riquadro prende l'altezza della presentazione, slide per slide: niente barre di scorrimento interne
  const fit = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
    const doc = e.currentTarget.contentDocument; if (!doc) return;
    // dentro il riquadro l'altezza la decide il contenuto, non la finestra (la presentazione usa min-height in vh)
    const st = doc.createElement('style'); st.textContent = 'main{min-height:0!important}'; doc.head.append(st);
    const measure = () => setHeight(doc.body.scrollHeight + 2); // +2: il bordo del riquadro
    measure(); new ResizeObserver(measure).observe(doc.body);
  };
  return <div className="ms-deck">
    <div className="ms-tabs" role="tablist" aria-label="Presentazioni per settore">{decks.map((d, k) => <button key={d.sector} type="button" role="tab" aria-selected={k === i} disabled={!d.src} onClick={() => setI(k)}>{d.sector}{d.src ? null : <small>In arrivo</small>}</button>)}</div>
    <div className="ms-stage" style={height ? { height } : undefined}>{deck.src && <iframe key={deck.src} src={deck.src} title={`Slide interattive: ${deck.sector}`} onLoad={fit}/>}</div>
    <p className="ms-hint">15 slide · usa le frecce o i pulsanti dentro la presentazione · <a href={deck.src} target="_blank" rel="noreferrer">apri a schermo intero <ArrowUpRight size={13}/></a></p>
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

export default function MediaPage({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState<Demo | null>(null);
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
    </div><div className="media-hero-art" aria-hidden="true">
      <div className="mh-slide"><span className="ms-eyebrow">02 / PRODUZIONE</span><b>kWh per kW installato</b><div className="mh-bars"><i/><i/><i/><i/></div></div>
      <div className="mh-video"><video src="/video-slide/media-motion.mp4" poster="/video-slide/media-motion.jpg" autoPlay muted loop playsInline preload="metadata"/><span className="mh-rec"><i/> MOTION · 1920×1080</span></div>
      <span className="product-float mh-chip"><OttoIcon mood="happy" size={18}/> OTTO TI GUIDA</span>
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
