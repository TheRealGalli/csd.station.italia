import { useEffect, useRef, useState } from 'react';
import { GraduationCap, ArrowDown, ArrowUpRight, Check, Clapperboard, Monitor, Play, Presentation, X } from 'lucide-react';
import { mediaIntro } from '@/seo/content';
import { OttoIcon } from './OttoIcon';
import { Otto } from './StationExperiences';
import './media.css';

// Video & Slide: vetrina delle slide interattive (49 € ogni 15) e dei video motion (99 € ogni 2 minuti).
// I materiali arrivano dalla sessione di produzione (Remotion + FFmpeg): basta indicare qui src e poster.
const whatsapp = (message: string) => `https://wa.me/393518628203?text=${encodeURIComponent(message)}`;
export const mediaContact = whatsapp('Ciao Carlo! Vorrei informazioni su video motion e slide interattive.');
function Eyebrow({ children }: { children: React.ReactNode }) { return <div className="station-eyebrow"><span/>{children}</div>; }

type Demo = { n: string; title: string; note: string; src?: string; poster?: string; start?: number };
// Video demo da 30 secondi, 1920×1080, con colonna sonora originale composta per ciascuno.
const videos: Demo[] = [
  { n: '01', title: 'Università e tesine', note: 'Da una tesi di 80 pagine a 10 minuti chiari, in 30 secondi.', src: '/video-slide/film-universita.mp4', poster: '/video-slide/film-universita.jpg', start: 1.6 },
  { n: '02', title: 'Immobili e progetti', note: 'Dal terreno alla casa finita: un progetto raccontato in 30 secondi.', src: '/video-slide/film-casa.mp4', poster: '/video-slide/film-casa.jpg' },
  { n: '03', title: 'Veicoli e colori', note: 'Un’icona, sei colori: uno studio colore in 30 secondi.', src: '/video-slide/film-veicoli.mp4', poster: '/video-slide/film-veicoli.jpg', start: 2.5 },
  { n: '04', title: 'Lancio di un prodotto', note: 'Sette gusti, una linea: CSD Pop raccontata in 30 secondi.', src: '/video-slide/film-prodotto.mp4', poster: '/video-slide/film-prodotto.jpg', start: 1.6 },
  { n: '05', title: 'Report aziendale', note: 'Numeri e grafici che si capiscono al primo sguardo.' },
  { n: '06', title: 'Menu e locale', note: 'Piatti, orari e prenotazioni, raccontati in motion.' },
];

// Slide interattive vere, una presentazione da 15 slide per settore (file HTML autonomi in /video-slide/).
type Deck = { sector: string; src?: string; slides?: number; bg?: string };
const decks: Deck[] = [
  { sector: 'Università', src: '/video-slide/slide-01-universita.html', slides: 8 },
  { sector: 'Prodotto', src: '/video-slide/pop/index.html', slides: 8, bg: '#2db7f5' }, { sector: 'Immobili', src: '/video-slide/casa/index.html', slides: 6, bg: '#dfd8cd' }, { sector: 'Cibo' }, { sector: 'Report', src: '/video-slide/report/index.html', slides: 8, bg: '#0B0D10' }, { sector: 'Veicoli', src: '/video-slide/slide-06-auto.html', slides: 8 }, { sector: 'Hardware' },
];

function SlideDeck() {
  const [i, setI] = useState(0), [height, setHeight] = useState(0), [say, setSay] = useState(''), [happy, setHappy] = useState(false), [throwing, setThrowing] = useState(false);
  const deck = decks[i];
  const frameRef = useRef<HTMLIFrameElement>(null), stageRef = useRef<HTMLDivElement>(null), [idle, setIdle] = useState(false);
  const heights = useRef<Record<string, number>>({}), said = useRef<Record<string, { text: string; happy: boolean }>>({}), [warm, setWarm] = useState(false);
  // tutte le presentazioni restano caricate una sopra l'altra: cambiare categoria è istantaneo.
  // Le altre si caricano solo quando la sezione è vicina, per non appesantire l'apertura della pagina.
  useEffect(() => {
    const stage = stageRef.current; if (!stage) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setWarm(true); io.disconnect(); } }, { rootMargin: '700px' });
    io.observe(stage); return () => io.disconnect();
  }, []);
  // fuori schermo, o con un video aperto sopra, la presentazione smette di disegnarsi
  useEffect(() => {
    const stage = stageRef.current; if (!stage) return;
    let out = false;
    const sync = () => setIdle(out || document.body.classList.contains('mv-watching'));
    const io = new IntersectionObserver(([e]) => { out = !e.isIntersecting; sync(); }, { rootMargin: '200px' });
    io.observe(stage);
    const mo = new MutationObserver(sync); mo.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
  // Il riquadro ha la stessa altezza per tutte le slide: si misura la slide più alta e la si usa per tutte.
  // Con la pagina prerenderizzata l'iframe può finire di caricare prima di React: per questo si aggancia da un effetto.
  useEffect(() => {
    setHeight(heights.current[deck.src ?? ''] ?? 0); // ogni presentazione riparte dal suo riquadro, misurato una volta sola
    const frame = frameRef.current; if (!frame) return;
    let observer: ResizeObserver | undefined;
    const fit = () => {
      const doc = frame.contentDocument, win = frame.contentWindow as (Window & { go?: (i: number) => void }) | null;
      if (!doc || !win || !doc.getElementById('menu')) return;
      if (heights.current[deck.src ?? '']) return;
      // dentro il riquadro: niente menu a tendina (restano Avanti e Indietro), Otto più piccolo accanto ai contenuti, spazi più compatti
      if (!doc.getElementById('csd-fit')) { const st = doc.createElement('style'); st.id = 'csd-fit';
      st.textContent = 'main{min-height:0!important;overflow:hidden}.index select{display:none!important}.visual:has(.mascot){padding-right:120px}.visual .mascot{transform:scale(.5);right:0}.chart{padding:0}.cards,.cards:has(.card:nth-child(3)){padding-bottom:0}.card{padding:16px 20px;font-size:20px}.offers{font-size:52px}.row{padding:7px 0}';
      doc.head.append(st); }
      const main = doc.querySelector('main'), menu = doc.getElementById('menu') as HTMLSelectElement, slides = menu.options.length;
      const measure = () => {
        if (main && win.go && slides) {
          const current = Number(menu.value || 0);
          main.style.height = '';
          let tallest = 0;
          for (let k = 0; k < slides; k++) { win.go(k); tallest = Math.max(tallest, main.offsetHeight); }
          win.go(current); main.style.height = `${tallest}px`;
        }
        const h = doc.body.scrollHeight + 2; heights.current[deck.src ?? ''] = h; setHeight(h); // +2: il bordo del riquadro
      };
      measure();
      let w = frame.clientWidth;
      observer = new ResizeObserver(() => { if (frame.clientWidth !== w) { w = frame.clientWidth; heights.current[deck.src ?? ''] = 0; measure(); } });
      observer.observe(frame);
    };
    fit(); frame.addEventListener('load', fit);
    return () => { frame.removeEventListener('load', fit); observer?.disconnect(); };
  }, [deck.src]);
  // Le battute di Otto arrivano dalla presentazione e si leggono fuori dal riquadro, accanto a lui.
  useEffect(() => {
    const last = said.current[deck.src ?? '']; setSay(last?.text ?? ''); setHappy(!!last?.happy);
    const listen = (e: MessageEvent) => { if (e.source !== frameRef.current?.contentWindow || e.data?.csd !== 'otto') return;
      if (e.data.action === 'throw') { setThrowing(true); setTimeout(() => setThrowing(false), 700); return; }
      said.current[deck.src ?? ''] = { text: String(e.data.text || ''), happy: !!e.data.happy }; setSay(String(e.data.text || '')); setHappy(!!e.data.happy); };
    window.addEventListener('message', listen); return () => window.removeEventListener('message', listen);
  }, [deck.src]);
  return <div className="ms-deck">
    <div className="ms-tabs" role="tablist" aria-label="Presentazioni per settore">{decks.map((d, k) => <button key={d.sector} type="button" role="tab" aria-selected={k === i} disabled={!d.src} onClick={() => setI(k)}>{d.sector}{d.src ? null : <small>In arrivo</small>}</button>)}</div>
    <div className="ms-frame">
      <div ref={stageRef} className={`ms-stage${idle ? ' is-idle' : ''}`} style={{ ...(height ? { height } : {}), ...(deck.bg ? { background: deck.bg } : {}) }}>{decks.map((d, k) => d.src && (k === i || warm) ? <iframe key={d.src} src={d.src} title={`Slide interattive: ${d.sector}`} ref={k === i ? frameRef : undefined} className={k === i ? undefined : 'is-off'} aria-hidden={k === i ? undefined : true} tabIndex={k === i ? undefined : -1}/> : null)}</div>
      {say && <div className={`ms-otto${throwing ? ' throwing' : ''}`} aria-hidden="true"><Otto mood={happy ? 'happy' : 'awake'}/></div>}
      {say && <p className="ms-say" key={say} aria-live="polite">{say}</p>}
    </div>
    <p className="ms-hint">{deck.slides ?? 15} slide · clicca dentro le slide per proseguire, o usa le frecce · <a href={deck.src} target="_blank" rel="noreferrer">apri a schermo intero <ArrowUpRight size={13}/></a></p>
  </div>;
}

function VideoCard({ v, onOpen }: { v: Demo; onOpen: () => void }) {
  return <article className={`mv-card ${v.src ? '' : 'soon'}`}>
    <button type="button" className="mv-frame" onClick={v.src ? onOpen : undefined} disabled={!v.src} aria-label={v.src ? `Guarda: ${v.title}` : `${v.title}: in arrivo`}
      onMouseEnter={e => { const vid = e.currentTarget.querySelector('video'); if (!vid) return; if (vid.currentTime < (v.start ?? 0)) vid.currentTime = v.start ?? 0; vid.play().catch(() => {}); }} onMouseLeave={e => { const vid = e.currentTarget.querySelector('video'); if (vid) { vid.pause(); vid.currentTime = v.start ?? 0; } }}>
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

// Otto in miniatura che corre avanti e indietro nello spazio libero del bollino.
// Quando la scritta cambia entra di colpo e lo colpisce: Otto vola, rimbalza su pavimento, soffitto e pareti
// con gravità e schiacciamento, poi atterra e riprende a correre. Spazio stretto = percorso corto.
function OttoRunner({ hit, textRef, boxRef }: { hit: number; textRef: React.RefObject<HTMLElement>; boxRef: React.RefObject<HTMLElement> }) {
  const el = useRef<HTMLSpanElement>(null);
  const st = useRef({ x: 200, y: 0, vx: 55, vy: 0, squash: 0, t: 0 });
  useEffect(() => {
    // colpo: spinta verso destra e verso l'alto, più forte se la nuova scritta lo invade
    const p = st.current, box = boxRef.current, text = textRef.current; if (!box || !text) return;
    const wall = text.offsetLeft + text.offsetWidth + 10;
    p.vy = -(170 + Math.random() * 90); p.vx = 140 + Math.random() * 120 + (p.x < wall ? 120 : 0);
  }, [hit, boxRef, textRef]);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0, last = performance.now(), lastRaf = 0, visible = true;
    // fuori dallo schermo Otto si ferma: niente calcoli inutili mentre si legge il resto della pagina
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; last = performance.now(); });
    if (boxRef.current) io.observe(boxRef.current);
    const G = 900, SIZE = 16, CEIL = -13, RUN = 62;
    const step = (now: number) => {
      if (!visible || document.body.classList.contains('mv-watching')) return;
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      const p = st.current, box = boxRef.current, text = textRef.current, node = el.current;
      if (box && text && node) {
        const left = text.offsetLeft + text.offsetWidth + 10, right = box.clientWidth - SIZE - 10;
        const airborne = p.y < 0 || p.vy < 0;
        if (airborne) {
          p.vy += G * dt; p.y += p.vy * dt;
          if (p.y >= 0) { p.y = 0; if (p.vy > 60) { p.squash = Math.min(1, p.vy / 300); p.vy = -p.vy * .55; } else p.vy = 0; }
          if (p.y < CEIL) { p.y = CEIL; p.vy = Math.abs(p.vy) * .5; p.squash = .5; }
          p.vx *= Math.pow(.6, dt); // l'aria lo frena un poco
        } else {
          // a terra corre: rallenta o accelera dolcemente verso la velocità di corsa
          const dir = Math.sign(p.vx) || 1; p.vx += (dir * RUN - p.vx) * Math.min(1, dt * 3);
        }
        p.x += p.vx * dt;
        if (p.x < left) { p.x = left; p.vx = Math.abs(p.vx) * (airborne ? .7 : 1); if (airborne) p.squash = Math.max(p.squash, .35); }
        if (p.x > right) { p.x = Math.max(left, right); p.vx = -Math.abs(p.vx) * (airborne ? .7 : 1); if (airborne) p.squash = Math.max(p.squash, .35); }
        p.squash = Math.max(0, p.squash - dt * 5); p.t += dt;
        const bob = airborne ? 0 : -Math.abs(Math.sin(p.t * 14)) * 2; // passettini mentre corre
        const sx = 1 + p.squash * .35, sy = 1 - p.squash * .35, flip = p.vx < 0 ? -1 : 1, tilt = airborne ? p.vx * .06 : flip * 6;
        node.style.transform = `translate(${p.x}px, ${p.y + bob}px) rotate(${tilt}deg) scale(${sx * flip}, ${sy})`;
      }
    };
    const frame = (now: number) => { lastRaf = performance.now(); step(now); raf = requestAnimationFrame(frame); };
    raf = requestAnimationFrame(frame);
    // se il browser non concede fotogrammi (scheda o pannello in secondo piano) la fisica va avanti a timer
    const backup = setInterval(() => { if (performance.now() - lastRaf > 120) step(performance.now()); }, 40);
    return () => { cancelAnimationFrame(raf); clearInterval(backup); io.disconnect(); };
  }, [boxRef, textRef]);
  return <span className="mh-runner" ref={el} aria-hidden="true"><OttoIcon mood="happy" size={16}/></span>;
}

export default function MediaPage({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState<Demo | null>(null), [peek, setPeek] = useState(1);
  const chipRef = useRef<HTMLSpanElement>(null), chipText = useRef<HTMLSpanElement>(null);
  const heroVideo = useRef<HTMLVideoElement>(null);
  // un solo video alla volta: quello aperto. L'hero si ferma fuori schermo e mentre si guarda un esempio.
  useEffect(() => {
    document.body.classList.toggle('mv-watching', !!open);
    if (open) document.querySelectorAll<HTMLVideoElement>('.mv-card video').forEach(v => v.pause());
    return () => document.body.classList.remove('mv-watching');
  }, [open]);
  useEffect(() => {
    const vid = heroVideo.current; if (!vid) return;
    let seen = true;
    const sync = () => { if (seen && !document.body.classList.contains('mv-watching')) vid.play().catch(() => {}); else vid.pause(); };
    const io = new IntersectionObserver(([e]) => { seen = e.isIntersecting; sync(); });
    io.observe(vid);
    const mo = new MutationObserver(sync); mo.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
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
      <div className="nfc-benefits"><span><Check size={15}/> 15 slide a 49 €</span><span><Check size={15}/> Video da 99 € ogni 2 minuti</span><span className="mh-student"><GraduationCap size={15}/> Studenti universitari: −50%</span></div>
    </div><div className="media-hero-art">
      <div className="mh-slide" aria-hidden="true"><div className="mh-peek" key={peek}><span className="ms-eyebrow">PROSSIMA · {heroScenes[peek].sector.toUpperCase()}</span><b>{heroScenes[peek].title}</b><PeekVisual kind={heroScenes[peek].kind}/></div></div>
      <div className="mh-video" aria-hidden="true"><video ref={heroVideo} onTimeUpdate={e => setPeek((Math.floor(e.currentTarget.currentTime / 5) + 1) % heroScenes.length)} src="/video-slide/media-motion.mp4" poster="/video-slide/media-motion.jpg" autoPlay muted loop playsInline preload="metadata"/><span className="mh-rec"><i/> MOTION</span></div>
      <span className="product-float mh-chip" aria-hidden="true" ref={chipRef}><span className={`mh-chip-in in-${(peek + 5) % 4}`} key={`otto-${(peek + 5) % 6}`} ref={chipText}>{ottoLines[(peek + 5) % 6].text} <i>{ottoLines[(peek + 5) % 6].emoji}</i></span><OttoRunner hit={peek} textRef={chipText} boxRef={chipRef}/></span>
      <div className="mh-note" aria-hidden="true"><b>COME LAVORO</b><ul><li>Studio del contenuto e del pubblico</li><li>Coerenza in ogni slide</li><li>Pensate per essere condivise</li></ul><small>Qualità sì, viralità garantita no.</small></div>
      <a className="mh-click" href={whatsapp('Ciao Carlo! Vorrei slide e video come quelli della pagina Video & Slide.')} target="_blank" rel="noreferrer"><span>Voglio slide così</span><svg viewBox="0 0 24 28" width="18" height="21" aria-hidden="true"><path d="M2 2 L2 22 L8 16 L12 26 L16 24 L12 14 L20 14 Z" fill="#f8faf3" stroke="#1d2b16" strokeWidth="1.6" strokeLinejoin="round"/></svg><small>SCRIVIMI SU WHATSAPP</small></a>
    </div></div></section>

    <section className="media-section media-slides" id="slide"><div className="wrap media-slides-inner">
      <div className="section-heading"><div><Eyebrow>01 / SLIDE INTERATTIVE</Eyebrow><h2>Presentazioni che<br/><span>si sfogliano da sole.</span></h2></div><p>Layout moderni per presentazioni web, esportabili per Google Slides. Sfoglia gli esempi per settore.</p></div>
      <SlideDeck/>
    </div></section>

    <section className="media-section wrap" id="video">
      <div className="section-heading"><div><Eyebrow>02 / VIDEO MOTION</Eyebrow><h2>Sei esempi da 30 secondi.<br/><span>Nessuna voce, solo ritmo.</span></h2></div><p>Grafiche animate, dati verosimili e Otto che guida lo sguardo. Ogni video ha la sua musica originale, a tempo con le scene.</p></div>
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
      <a className="mp-student" href="/terms-of-service/#studenti"><GraduationCap size={22}/><span><b>Studenti universitari: 50% di sconto</b> su slide e video per tesi, tesine ed esami. Basta un documento che provi l’iscrizione.</span><ArrowUpRight size={17}/></a>
      <p className="catalog-note">Gli esempi usano un marchio dimostrativo e dati verosimili, non clienti reali. Pianoforte delle colonne sonore: Salamander Grand Piano di Alexander Holm (<a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noreferrer">CC BY 3.0</a>).</p>
    </section>

    {children}

    {open && <div className="mv-lightbox" role="dialog" aria-modal="true" aria-label={open.title} onClick={() => setOpen(null)}>
      <div className="mv-player" onClick={e => e.stopPropagation()}>
        <video src={open.src} poster={open.poster} controls autoPlay playsInline preload="auto"/>
        <button type="button" className="mv-close" onClick={() => setOpen(null)} aria-label="Chiudi"><X size={20}/></button>
        <span className="mv-title">{open.n} · {open.title}</span>
      </div>
    </div>}
  </>;
}

// Da telefono la sezione non è ancora pronta: un invito ad aprirla dal computer.
// fallback: dentro la pagina prerenderizzata il titolo è un h2, per non avere due h1 insieme alla versione desktop
export function MediaMobile({ fallback = false }: { fallback?: boolean }) {
  const Title = fallback ? 'h2' : 'h1';
  return <div className="mobile-landing"><section className="mobile-section media-mobile">
    <span className="mobile-eyebrow"><i/> VIDEO & SLIDE</span>
    <Title className="mm-title">Questa sezione<br/><em>si apre dal computer.</em></Title>
    <p>Slide interattive da 49 € ogni 15 e video motion da 99 € ogni 2 minuti: gli esempi sono pensati per lo schermo grande.</p>
    <div className="media-mobile-icon"><Monitor size={40}/></div>
    <a className="mobile-primary" href={mediaContact} target="_blank" rel="noreferrer">Scrivimi su WhatsApp <ArrowUpRight size={20}/></a>
  </section></div>;
}
