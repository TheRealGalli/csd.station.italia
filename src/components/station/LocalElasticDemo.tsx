import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { Cpu, Database, LockKeyhole, ShieldCheck } from 'lucide-react';
import { OttoIcon } from './OttoIcon';
import './local-elastic.css';

type Position = { x: number; y: number };
const origin = { x: 0, y: 0 };

export default function LocalElasticDemo({ paused }: { paused: boolean }) {
  const perimeter = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 440, height: 470 });
  const [position, setPosition] = useState<Position>(origin);
  const [dragging, setDragging] = useState(false);
  const location = useRef<Position>(origin);
  const velocity = useRef<Position>(origin);
  const pointer = useRef<{ id: number; x: number; y: number; start: Position; time: number } | null>(null);
  const animation = useRef(0);
  const limits = { x: Math.max(22, size.width / 2 - 115), y: Math.max(18, size.height / 2 - 200) };
  const place = (next: Position) => { location.current = next; setPosition(next); };

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
      cancelAnimationFrame(animation.current);
      location.current = origin; velocity.current = origin; setPosition(origin);
    });
    if (perimeter.current) observer.observe(perimeter.current);
    return () => { observer.disconnect(); cancelAnimationFrame(animation.current); };
  }, []);

  function settle() {
    cancelAnimationFrame(animation.current);
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      place(origin); velocity.current = origin; return;
    }
    let previous = performance.now();
    const step = (time: number) => {
      const dt = Math.min((time - previous) / 1000, .025); previous = time;
      const p = location.current, v = velocity.current;
      // A damped spring keeps the rebound small and lets it settle naturally.
      const nextV = { x: v.x + (-145 * p.x - 15 * v.x) * dt, y: v.y + (-145 * p.y - 15 * v.y) * dt };
      const next = { x: Math.max(-limits.x, Math.min(limits.x, p.x + nextV.x * dt)), y: Math.max(-limits.y, Math.min(limits.y, p.y + nextV.y * dt)) };
      velocity.current = nextV;
      if (Math.hypot(next.x, next.y) < .12 && Math.hypot(nextV.x, nextV.y) < .6) { place(origin); velocity.current = origin; return; }
      place(next); animation.current = requestAnimationFrame(step);
    };
    animation.current = requestAnimationFrame(step);
  }
  function grab(event: PointerEvent<HTMLButtonElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    cancelAnimationFrame(animation.current);
    event.currentTarget.setPointerCapture(event.pointerId);
    pointer.current = { id: event.pointerId, x: event.clientX, y: event.clientY, start: location.current, time: performance.now() };
    velocity.current = origin; setDragging(true);
  }
  function move(event: PointerEvent<HTMLButtonElement>) {
    const drag = pointer.current;
    if (!drag || drag.id !== event.pointerId) return;
    const now = performance.now(), dt = Math.max((now - drag.time) / 1000, .008);
    // Resistance grows towards the edge; the module never leaves its safe area.
    const next = { x: limits.x * Math.tanh((drag.start.x + event.clientX - drag.x) / limits.x), y: limits.y * Math.tanh((drag.start.y + event.clientY - drag.y) / limits.y) };
    velocity.current = { x: Math.max(-260, Math.min(260, (next.x - location.current.x) / dt)), y: Math.max(-260, Math.min(260, (next.y - location.current.y) / dt)) };
    drag.time = now; place(next);
  }
  function release(event: PointerEvent<HTMLButtonElement>) {
    if (pointer.current?.id !== event.pointerId) return;
    if (performance.now() - pointer.current.time > 80) velocity.current = origin;
    pointer.current = null; setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    settle();
  }
  function keyboard(event: KeyboardEvent<HTMLButtonElement>) {
    const directions: Record<string, Position> = { ArrowLeft: {x:-35,y:0}, ArrowRight: {x:35,y:0}, ArrowUp: {x:0,y:-30}, ArrowDown: {x:0,y:30} };
    if (event.key === 'Escape') { pointer.current = null; setDragging(false); settle(); return; }
    const delta = directions[event.key]; if (!delta) return;
    event.preventDefault(); cancelAnimationFrame(animation.current);
    place({ x: Math.max(-limits.x, Math.min(limits.x, location.current.x + delta.x)), y: Math.max(-limits.y, Math.min(limits.y, location.current.y + delta.y)) });
    velocity.current = origin; settle();
  }

  const center = { x: size.width / 2, y: size.height / 2 + 2 };
  const tilt = -5 + position.x * .065;
  const radians = tilt * Math.PI / 180;
  const top = { x: center.x + position.x + Math.sin(radians) * 75, y: center.y + position.y - Math.cos(radians) * 75 };
  const bottom = { x: center.x + position.x - Math.sin(radians) * 75, y: center.y + position.y + Math.cos(radians) * 75 };
  const upperWire = `M ${center.x} 120 C ${center.x} 150, ${top.x} ${top.y - 25}, ${top.x} ${top.y}`;
  const lowerWire = `M ${bottom.x} ${bottom.y} C ${bottom.x} ${bottom.y + 25}, ${center.x} ${size.height - 150}, ${center.x} ${size.height - 120}`;

  return <div className="fc-local-visual fc-elastic-visual">
    <div ref={perimeter} className="fc-perimeter fc-elastic-perimeter" data-dragging={dragging}>
      <span className="fc-perimeter-label"><ShieldCheck size={16}/> IL PERIMETRO DELLA TUA AZIENDA</span>
      <div className="fc-local-node fc-elastic-source"><Database size={22}/><span>Gestionale / CSV<small>I tuoi dati</small></span></div>
      <svg className="fc-elastic-wires" viewBox={`0 0 ${size.width} ${size.height}`} aria-hidden="true">
        {[upperWire, lowerWire].map((d, index) => <g key={index}><path className="fc-wire-shadow" d={d}/><path className="fc-wire" d={d}/><path className="fc-wire-flow" d={d}/></g>)}
        <circle cx={top.x} cy={top.y} r="3"/><circle cx={bottom.x} cy={bottom.y} r="3"/>
      </svg>
      <button type="button" className="fc-local-core fc-elastic-core" style={{ transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) rotate(${tilt}deg)` }} onPointerDown={grab} onPointerMove={move} onPointerUp={release} onPointerCancel={release} onLostPointerCapture={release} onKeyDown={keyboard} aria-label="Modulo AI locale: trascinalo e rilascialo, oppure usa i tasti freccia" aria-describedby="fc-elastic-hint">
        <span className="fc-core-top"><OttoIcon size={45} mood={dragging ? 'think' : 'read'}/><Cpu size={22}/></span><span className="fc-elastic-title">AI, QUI.</span><small>Elaborazione locale</small><span className="fc-core-lights"><i/><i/><i/><i/></span>
      </button>
      <div className="fc-local-node fc-elastic-output"><div className="fc-mini-bars"><i/><i/><i/><i/><i/></div><span>La tua dashboard<small>Previsioni da consultare</small></span></div>
      <div className="fc-perimeter-bottom"><LockKeyhole size={15}/><span>100% locale nella configurazione concordata</span></div>
    </div>
    <p className="fc-elastic-hint" id="fc-elastic-hint">Afferra il modulo e prova a portarlo fuori.<br/><b>I collegamenti lo tengono qui.</b></p>
    <p className="fc-local-visual-caption">Schema interattivo illustrativo. Nessun collegamento reale ai tuoi sistemi.</p>
  </div>;
}
