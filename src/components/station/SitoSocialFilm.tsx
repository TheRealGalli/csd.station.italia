import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import './sito-social-film.css';

// "Accendi la Station": il film (sorgenti in "sito react/accendi-la-station") si guida a tap, non a scorrimento.
// 1° tap accende, 2° tap va tenuto un secondo; alla fine il fotogramma diventa la hero vera, in HTML.
const FPS = 30, TAP_AT = 119 / FPS, HOLD_AT = 569 / FPS, HOLD_MS = 1000;
const DONE_KEY = 'csd-film-done';
type Phase = 'intro' | 'tap' | 'run' | 'hold' | 'outro' | 'live';
type Pick = 'site' | '3d' | 'social';

const read = () => { try { return sessionStorage.getItem(DONE_KEY) === '1'; } catch { return false; } };
const save = () => { try { sessionStorage.setItem(DONE_KEY, '1'); } catch { /* sessione privata */ } };

// Musica di fondo generata nel browser: continua anche quando il film è fermo. Gli effetti sonori del video restano fuori.
function createMusic() {
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  const ctx = new Ctx(), master = ctx.createGain(), filter = ctx.createBiquadFilter();
  filter.type = 'lowpass'; filter.frequency.value = 1100;
  master.gain.value = 0; filter.connect(master).connect(ctx.destination);
  [[55, .5], [110, .34], [164.81, .2], [220, .12], [329.63, .06]].forEach(([hz, level], i) => {
    const osc = ctx.createOscillator(), gain = ctx.createGain(), lfo = ctx.createOscillator(), depth = ctx.createGain();
    osc.type = i < 2 ? 'sine' : 'triangle'; osc.frequency.value = hz; osc.detune.value = i % 2 ? 5 : -5;
    gain.gain.value = level; lfo.frequency.value = .06 + i * .025; depth.gain.value = level * .45;
    lfo.connect(depth).connect(gain.gain); osc.connect(gain).connect(filter); osc.start(); lfo.start();
  });
  const fade = (to: number, seconds: number) => { const t = ctx.currentTime; master.gain.cancelScheduledValues(t); master.gain.setValueAtTime(master.gain.value, t); master.gain.linearRampToValueAtTime(to, t + seconds); };
  // L'accordo che si apre quando la Station si connette: musica, non un effetto.
  const bloom = () => [220, 277.18, 329.63, 440, 554.37, 659.25].forEach((hz, k) => {
    const osc = ctx.createOscillator(), gain = ctx.createGain(), t = ctx.currentTime + k * .45;
    osc.type = 'sine'; osc.frequency.value = hz; gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(.05, t + .5); gain.gain.exponentialRampToValueAtTime(.0001, t + 4.5);
    osc.connect(gain).connect(filter); osc.start(t); osc.stop(t + 4.6);
  });
  return { ctx, fade, bloom };
}

function Hero({ live, onPick, pick }: { live: boolean; pick: Pick; onPick: (p: Pick) => void }) {
  const card = useRef<HTMLDivElement>(null);
  const tilt = (e: React.PointerEvent) => {
    if (!live || !card.current) return;
    const r = card.current.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    card.current.style.setProperty('--rx', `${(-y * 5).toFixed(2)}deg`); card.current.style.setProperty('--ry', `${(x * 7).toFixed(2)}deg`);
  };
  const reset = () => { card.current?.style.setProperty('--rx', '0deg'); card.current?.style.setProperty('--ry', '0deg'); };
  return <div className="film-hero">
    <div className="fh-brand"><span className="fh-mark"><img src="/csd-mark.svg" alt=""/></span><span><b>CSD STATION</b><small>ITALIA</small></span></div>
    <nav className="fh-nav" aria-label="Sezioni della pagina"><a href="#siti">Servizi</a><a href="#regole">Come lavoro</a><a href="#web-contatto">Contatti <ArrowUpRight/></a></nav>
    <span className="fh-eyebrow">SITI WEB E SOCIAL PER ATTIVITÀ LOCALI</span>
    <h1 className="fh-title">Ti trovano.<br/><span>Ti scelgono.<br/>Ti seguono.</span></h1>
    <p className="fh-lead">Sito e social. Una presenza che racconta<br/>la tua attività, anche online.</p>
    <a className="fh-cta" href="#siti">Scegli da dove partire <ArrowUpRight/></a>
    <div className="fh-card" ref={card} onPointerMove={tilt} onPointerLeave={reset}>
      <img className={`fh-shot fh-shot-3d ${pick === '3d' ? 'on' : ''}`} src="/sito-social/card-3d.jpg" alt="Sito 3D d’esempio con un modello in primo piano"/>
      <img className={`fh-shot fh-shot-flat ${pick === 'site' ? 'on' : ''}`} src="/sito-social/card-site.jpg" alt="Sito React d’esempio" loading="lazy"/>
      <img className={`fh-shot fh-shot-flat ${pick === 'social' ? 'on' : ''}`} src="/sito-social/card-social.jpg" alt="Sito e contenuti social d’esempio" loading="lazy"/>
      <div className="fh-pick" role="group" aria-label="Anteprima">{([['site', 'SITO'], ['3d', 'SITO 3D'], ['social', 'SOCIAL']] as const).map(([k, label]) => <button key={k} type="button" aria-pressed={pick === k} onClick={() => onPick(k)}>{label}</button>)}</div>
      <span className="fh-chip fh-chip-1">REACT · VELOCE</span><span className="fh-chip fh-chip-2">3D / VFX</span><span className="fh-chip fh-chip-3">CAROSELLI + REEL</span>
    </div>
    <a className="fh-scroll" href="#siti">Scorri per scoprire <ArrowDown/></a>
    <div className="fh-rule"><span>CSD STATION ITALIA / SITO E SOCIAL</span><span>LA TUA ATTIVITÀ. ANCHE ONLINE.</span></div>
  </div>;
}

export default function SitoSocialFilm({ onLive }: { onLive: (live: boolean) => void }) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [pick, setPick] = useState<Pick>('3d');
  const [muted, setMuted] = useState(false);
  const [hold, setHold] = useState(0);
  const video = useRef<HTMLVideoElement>(null), stage = useRef<HTMLElement>(null);
  const music = useRef<ReturnType<typeof createMusic>>(null), stopAt = useRef<number | null>(null), raf = useRef(0), holdStart = useRef(0), holdRaf = useRef(0), holdTimer = useRef(0);
  const live = phase === 'live';

  // Il film segue i fotogrammi: si ferma esattamente sul gesto da fare.
  const playTo = (to: number | null, next: Phase) => {
    const v = video.current; if (!v) return;
    stopAt.current = to; cancelAnimationFrame(raf.current);
    // rAF per la precisione al fotogramma; timeupdate come rete se la scheda non disegna (in background).
    const check = () => {
      if (stopAt.current == null || v.currentTime < stopAt.current - .02) return false;
      v.pause(); v.currentTime = stopAt.current; stopAt.current = null; v.ontimeupdate = null; setPhase(next); return true;
    };
    const watch = () => { if (!check()) raf.current = requestAnimationFrame(watch); };
    v.ontimeupdate = to == null ? null : check;
    v.play().then(() => { raf.current = requestAnimationFrame(watch); }).catch(() => setPhase(next));
  };

  useEffect(() => {
    const header = document.querySelector<HTMLElement>('.station-header');
    stage.current?.style.setProperty('--film-top', `${header?.offsetHeight ?? 88}px`);
    // Nella stessa sessione il film non riparte: si torna direttamente alla hero.
    if (read()) setPhase('live'); else playTo(TAP_AT, 'tap');
    return () => { cancelAnimationFrame(raf.current); cancelAnimationFrame(holdRaf.current); clearTimeout(holdTimer.current); video.current?.pause(); music.current?.ctx.close().catch(() => {}); music.current = null; document.documentElement.classList.remove('film-lock'); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Finché il film non è finito la pagina non scorre; quando la hero prende vita si sviluppano le sezioni sotto.
  useEffect(() => {
    document.documentElement.classList.toggle('film-lock', !live);
    onLive(live);
    if (live) { save(); music.current?.fade(0, 7); }
  }, [live, onLive]);

  const powerOn = () => {
    if (phase !== 'tap') return;
    if (!music.current) { music.current = createMusic(); if (music.current && !muted) music.current.fade(.13, 2.5); }
    setPhase('run'); playTo(HOLD_AT, 'hold');
  };
  const transmit = () => {
    navigator.vibrate?.([40, 30, 80]); music.current?.bloom(); setHold(1);
    setPhase('run'); playTo(null, 'outro');
  };
  const holdDown = (e: React.PointerEvent | React.KeyboardEvent) => {
    if (phase !== 'hold' || holdStart.current) return;
    if ('key' in e && e.key !== ' ' && e.key !== 'Enter') return;
    e.preventDefault(); holdStart.current = performance.now(); navigator.vibrate?.(15);
    // Il timer decide quando il secondo è passato; rAF disegna solo la linea verde.
    holdTimer.current = window.setTimeout(() => { holdStart.current = 0; cancelAnimationFrame(holdRaf.current); transmit(); }, HOLD_MS);
    const tick = () => { if (!holdStart.current) return; setHold(Math.min(.99, (performance.now() - holdStart.current) / HOLD_MS)); holdRaf.current = requestAnimationFrame(tick); };
    holdRaf.current = requestAnimationFrame(tick);
  };
  const holdUp = () => { if (!holdStart.current) return; holdStart.current = 0; clearTimeout(holdTimer.current); cancelAnimationFrame(holdRaf.current); setHold(0); };
  const toggleMute = () => { setMuted(m => { const next = !m; if (music.current) music.current.fade(next ? 0 : .13, .6); return next; }); };
  const skip = () => { video.current?.pause(); cancelAnimationFrame(raf.current); setPhase('live'); };
  const replay = () => { const v = video.current; if (!v) return; v.currentTime = 0; setHold(0); setPhase('intro'); window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); playTo(TAP_AT, 'tap'); };

  return <section ref={stage} className={`film is-${phase}`} aria-label="Accendi la Station, introduzione interattiva"
    onClick={phase === 'tap' ? powerOn : undefined}
    onPointerDown={phase === 'hold' ? holdDown : undefined} onPointerUp={holdUp} onPointerLeave={holdUp} onPointerCancel={holdUp}>
    <div className="film-box">
      <video ref={video} className="film-video" src="/sito-social/accendi-la-station.mp4" poster="/sito-social/poster.jpg" muted playsInline preload={live ? 'none' : 'auto'}
        onEnded={() => { setPhase('outro'); setTimeout(() => setPhase('live'), 700); }} aria-hidden="true"/>
      {phase === 'tap' && <button type="button" className="film-power" onClick={e => { e.stopPropagation(); powerOn(); }} autoFocus><span>Tocca per accendere</span></button>}
      {phase === 'hold' && <button type="button" className="film-transmit" aria-label="Tieni premuto per trasmettere" onKeyDown={holdDown} onKeyUp={holdUp} autoFocus/>}
      {(phase === 'hold' || hold > 0) && phase !== 'live' && phase !== 'outro' && <div className={`film-hold ${hold >= 1 ? 'done' : ''}`} aria-live="polite"><span>{hold >= 1 ? 'Connessa' : 'Tieni premuto'}</span><i><b style={{ transform: `scaleX(${hold})` }}/></i></div>}
      <Hero live={live} pick={pick} onPick={setPick}/>
      {live && <button type="button" className="film-replay" onClick={replay}><RotateCcw size={13}/> Rivedi l’intro</button>}
    </div>
    {!live && <div className="film-tools">
      {music.current && <button type="button" onClick={e => { e.stopPropagation(); toggleMute(); }} aria-label={muted ? 'Riattiva la musica' : 'Togli la musica'}>{muted ? <VolumeX size={15}/> : <Volume2 size={15}/>}</button>}
      <button type="button" onClick={e => { e.stopPropagation(); skip(); }}>Salta l’intro</button>
    </div>}
  </section>;
}
