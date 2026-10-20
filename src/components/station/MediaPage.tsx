import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, ChevronLeft, ChevronRight, Clapperboard, Monitor, Play, Presentation, X } from 'lucide-react';
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
  { n: '01', title: 'Presentazione universitaria', note: 'Tesi e tesine: dalla domanda ai risultati, in 30 secondi.' },
  { n: '02', title: 'Lancio di un prodotto', note: 'Il prodotto, i vantaggi, il prezzo. Chiaro e veloce.' },
  { n: '03', title: 'Report aziendale', note: 'Numeri e grafici che si capiscono al primo sguardo.' },
  { n: '04', title: 'Menu e locale', note: 'Piatti, orari e prenotazioni, raccontati in motion.' },
  { n: '05', title: 'Pitch per investitori', note: 'Problema, soluzione, mercato: tutto in un minuto.' },
  { n: '06', title: 'Onboarding clienti', note: 'Come funziona il servizio, passo per passo.' },
];

// Slide d'esempio, in HTML. Quando arrivano quelle vere si sostituiscono con immagini o componenti.
type Slide = { kind: 'title' | 'list' | 'chart' | 'quote' | 'end'; eyebrow: string; title: string; body?: string[]; values?: [string, number][] };
const slides: Slide[] = [
  { kind: 'title', eyebrow: 'TESINA · ESEMPIO', title: 'Energia solare in Toscana', body: ['Quanto produce, quanto costa, quanto conviene.'] },
  { kind: 'list', eyebrow: '01 / DI COSA PARLIAMO', title: 'Tre domande', body: ['Quanta energia producono i tetti toscani?', 'Quanto si risparmia in bolletta?', 'In quanti anni si ripaga un impianto?'] },
  { kind: 'chart', eyebrow: '02 / PRODUZIONE', title: 'kWh per kW installato, all’anno', values: [['Firenze', 1240], ['Siena', 1290], ['Pisa', 1270], ['Grosseto', 1350]] },
  { kind: 'quote', eyebrow: '03 / IL PUNTO', title: '«In media un impianto domestico si ripaga in 6–8 anni.»', body: ['Stima su un impianto da 4 kW con detrazioni.'] },
  { kind: 'end', eyebrow: '04 / CONCLUSIONE', title: 'Conviene, se il tetto è giusto.', body: ['Esposizione a sud, poche ombre, consumi di giorno.'] },
];

function SlideView({ s, active }: { s: Slide; active: boolean }) {
  const max = Math.max(...(s.values ?? [['', 1]]).map(v => v[1]));
  return <div className={`ms-slide ms-${s.kind} ${active ? 'on' : ''}`}>
    <span className="ms-eyebrow">{s.eyebrow}</span>
    <h3>{s.title}</h3>
    {s.kind === 'list' && <ol>{s.body!.map((b, i) => <li key={b} style={{ transitionDelay: `${.15 + i * .12}s` }}><span>{i + 1}</span>{b}</li>)}</ol>}
    {s.kind === 'chart' && <div className="ms-chart">{s.values!.map(([label, v], i) => <div key={label}><b style={{ height: `${(v / max) * 100}%`, transitionDelay: `${.15 + i * .1}s` }}><em>{v.toLocaleString('it-IT')}</em></b><span>{label}</span></div>)}</div>}
    {(s.kind === 'title' || s.kind === 'quote' || s.kind === 'end') && s.body?.map(b => <p key={b}>{b}</p>)}
    <span className="ms-otto" aria-hidden="true"><OttoIcon mood={s.kind === 'end' ? 'happy' : 'read'} size={22}/></span>
    <span className="ms-brand">CSD STATION</span>
  </div>;
}

function SlideDeck() {
  const [i, setI] = useState(0);
  const go = (n: number) => setI(Math.max(0, Math.min(slides.length - 1, n)));
  return <div className="ms-deck" tabIndex={0} aria-label="Slide interattive d’esempio: usa le frecce" onKeyDown={e => { if (e.key === 'ArrowRight') go(i + 1); if (e.key === 'ArrowLeft') go(i - 1); }}>
    <div className="ms-stage">
      {slides.map((s, k) => <SlideView key={k} s={s} active={k === i}/>)}
      <button type="button" className="ms-arrow l" aria-label="Slide precedente" disabled={i === 0} onClick={() => go(i - 1)}><ChevronLeft size={20}/></button>
      <button type="button" className="ms-arrow r" aria-label="Slide successiva" disabled={i === slides.length - 1} onClick={() => go(i + 1)}><ChevronRight size={20}/></button>
      <span className="ms-progress" style={{ transform: `scaleX(${(i + 1) / slides.length})` }}/>
    </div>
    <div className="ms-thumbs">{slides.map((s, k) => <button key={k} type="button" aria-pressed={k === i} onClick={() => setI(k)}><span>{String(k + 1).padStart(2, '0')}</span>{s.title.replace(/[«»]/g, '').slice(0, 26)}</button>)}</div>
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
      <div className="section-heading"><div><Eyebrow>01 / SLIDE INTERATTIVE</Eyebrow><h2>Presentazioni che<br/><span>si sfogliano da sole.</span></h2></div><p>Layout moderni per presentazioni web, esportabili per Google Slides. Prova a sfogliare l’esempio con le frecce.</p></div>
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
