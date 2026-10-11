import { useEffect, useId, useRef, useState } from 'react';
import { ChevronsUp, Pause, Play, RotateCcw, Volume2, VolumeX, X } from 'lucide-react';
import { WORLD, createWorld, requestJump, stepWorld } from './runnerWorld';
import { drawWorld } from './runnerDrawing';
import type { RunnerAudio } from './runnerAudio';
import './runner.css';

type Phase = 'running' | 'paused' | 'over';

export default function OttoRunner({ onClose, audio }: { onClose: () => void; audio: RunnerAudio | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const surfaceRef = useRef<HTMLButtonElement>(null);
  const jumpRef = useRef<() => void>(() => {});
  const restartRef = useRef<() => void>(() => {});
  const phaseRef = useRef<Phase>('running');
  const [phase, setPhase] = useState<Phase>('running');
  const [score, setScore] = useState(0);
  // Best is session-only: the game neither saves nor sends visitor data.
  const [best, setBest] = useState(0);
  const [doubleJump, setDoubleJump] = useState(false);
  const [available, setAvailable] = useState(true);
  const [volume, setVolume] = useState(audio?.volume ?? 25);
  const [muted, setMuted] = useState(false);
  const volumeId = useId();
  function changePhase(next: Phase) { phaseRef.current = next; setPhase(next); audio?.setPlaying(next === 'running'); }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) { setAvailable(false); return; }
    audio?.setPlaying(true);
    let frame = 0;
    let last = 0;
    let world = createWorld();
    let lastDisplayed = -1;
    let lastAbility = false;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const scale = (canvas.clientWidth || WORLD.width) / WORLD.width;
      canvas.width = Math.round(WORLD.width * scale * ratio);
      canvas.height = Math.round(WORLD.height * scale * ratio);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    jumpRef.current = () => { if (phaseRef.current === 'running') { const before = world.jumpSerial; requestJump(world); if (world.jumpSerial !== before) audio?.effect(world.jumps === 2 ? 'double' : 'jump'); } };
    restartRef.current = () => {
      world = createWorld(); lastDisplayed = -1; lastAbility = false; last = 0;
      changePhase('running'); setScore(0); setDoubleJump(false);
      surfaceRef.current?.focus({ preventScroll: true });
    };
    const pauseWhenAway = () => { if (phaseRef.current === 'running') changePhase('paused'); };
    const onVisibility = () => { if (document.hidden) pauseWhenAway(); };
    window.addEventListener('blur', pauseWhenAway);
    document.addEventListener('visibilitychange', onVisibility);
    surfaceRef.current?.focus({ preventScroll: true });

    function draw(now: number) {
      const dt = last ? Math.min((now - last) / 1000, .033) : 0;
      last = now;
      if (phaseRef.current === 'running') {
        const previousJump = world.jumpSerial;
        stepWorld(world, dt);
        if (world.jumpSerial !== previousJump) audio?.effect(world.jumps === 2 ? 'double' : 'jump');
        if (world.score !== lastDisplayed) { lastDisplayed = world.score; setScore(world.score); }
        if (world.doubleJump !== lastAbility) { lastAbility = world.doubleJump; setDoubleJump(world.doubleJump); if (world.doubleJump) audio?.effect('pickup'); }
        if (world.over) { changePhase('over'); audio?.effect('over'); setBest(value => Math.max(value, world.score)); }
      }
      ctx.setTransform(canvas.width / WORLD.width, 0, 0, canvas.height / WORLD.height, 0, 0);
      drawWorld(ctx, world, reduceMotion);
      frame = window.requestAnimationFrame(draw);
    }
    frame = window.requestAnimationFrame(draw);
    return () => {
      audio?.setPlaying(false);
      window.cancelAnimationFrame(frame); observer.disconnect();
      window.removeEventListener('blur', pauseWhenAway); document.removeEventListener('visibilitychange', onVisibility);
      jumpRef.current = () => {}; restartRef.current = () => {};
    };
  }, [audio]);

  function action() {
    audio?.unlock();
    if (phaseRef.current === 'over') restartRef.current();
    else if (phaseRef.current === 'paused') { changePhase('running'); surfaceRef.current?.focus({ preventScroll: true }); }
    else jumpRef.current();
  }
  const route = doubleJump ? '03 / OLTRE LA ROUTINE' : score >= 500 ? '02 / IL MAGAZZINO' : '01 / LA ROUTINE';
  return <div className="otto-runner">
    <div className="runner-header"><span>OTTO RUN <i/> SALTA LA ROUTINE</span><button onClick={onClose} aria-label="Chiudi il minigioco"><X size={17}/></button></div>
    <div className="runner-scores"><span>PUNTI <b>{score.toString().padStart(4, '0')}</b></span><span>RECORD SESSIONE <b>{Math.max(best, score).toString().padStart(4, '0')}</b></span></div>
    <div className={`runner-ability ${doubleJump ? 'is-unlocked' : ''}`}><span>{route}</span><span aria-live="polite"><ChevronsUp size={13}/>{doubleJump ? 'DOPPIO SALTO ATTIVO' : score >= 2000 ? 'RACCOGLI IL POTENZIAMENTO' : 'DOPPIO SALTO / 2000 PT'}</span></div>
    <div className="runner-screen">
      <button ref={surfaceRef} className="runner-surface" aria-label={phase === 'over' ? 'Partita finita. Premi per riprovare' : phase === 'paused' ? 'Riprendi il gioco' : doubleJump ? 'Salta: spazio, freccia su o tap. Premi di nuovo in aria per il doppio salto.' : 'Salta: premi spazio, freccia su oppure tocca'} onPointerDown={e => { if (e.pointerType === 'mouse' && e.button !== 0) return; e.preventDefault(); surfaceRef.current?.focus({ preventScroll: true }); action(); }} onKeyDown={e => { if ([' ', 'ArrowUp', 'Enter'].includes(e.key)) { e.preventDefault(); if (!e.repeat) action(); } }} onClick={e => { if (e.detail === 0) action(); }}>
        <canvas ref={canvasRef} width={WORLD.width} height={WORLD.height} aria-hidden="true"/>
      </button>
      {(!available || phase !== 'running') && <div className="runner-overlay" aria-live="polite"><span>{!available ? 'Il gioco non è disponibile in questo browser.' : phase === 'over' ? 'La routine ti ha raggiunto.' : 'Otto si prende una pausa.'}</span>{available && <><p>{phase === 'over' ? `${score} punti. Un altro giro?` : 'Riprendi quando vuoi.'}</p><button onClick={action}>{phase === 'over' ? <RotateCcw size={16}/> : <Play size={16}/>} {phase === 'over' ? 'Riprova' : 'Riprendi'}</button></>}</div>}
    </div>
    <div className="runner-footer"><span><kbd>SPAZIO</kbd> / <kbd>↑</kbd> / tap per saltare</span><button disabled={!available || phase === 'over'} onClick={() => { if (phaseRef.current === 'running') changePhase('paused'); else action(); }}>{phase === 'paused' ? <Play size={14}/> : <Pause size={14}/>} {phase === 'paused' ? 'Riprendi' : 'Pausa'}</button></div>
    <div className="runner-audio">
      <button type="button" aria-label={muted ? 'Riattiva musica ed effetti' : 'Silenzia musica ed effetti'} aria-pressed={muted} onClick={() => { audio?.unlock(); audio?.setMuted(!muted); setMuted(!muted); }}>{muted || volume === 0 ? <VolumeX size={14}/> : <Volume2 size={14}/>}</button>
      <label htmlFor={volumeId}>Musica + effetti</label>
      <input id={volumeId} type="range" min="0" max="100" step="1" value={volume} aria-valuetext={`${volume} per cento${muted ? ', audio silenziato' : ''}`} onChange={event => { const value = Number(event.target.value); audio?.unlock(); audio?.setVolume(value); setVolume(value); if (muted && value > 0) { audio?.setMuted(false); setMuted(false); } }}/>
      <output htmlFor={volumeId}>{muted ? 'MUTO' : `${volume}%`}</output>
    </div>
    {audio?.failed && <span className="runner-audio-unavailable">Audio non disponibile. Puoi continuare a giocare.</span>}
    <p className="runner-tip" aria-live="polite">{doubleJump ? 'Premi di nuovo in aria: supera piattaforme e aeroplanini-scontrino sopra i pacchi!' : score >= 2000 ? 'Prendi il rombo verde per sbloccare il secondo salto in aria.' : score >= 500 ? 'Salta sulle piattaforme, evita le punte e scavalca i pacchi.' : 'Mail, fatture, scadenze e scorte. A 500 punti si sale sulle piattaforme.'}</p>
  </div>;
}
