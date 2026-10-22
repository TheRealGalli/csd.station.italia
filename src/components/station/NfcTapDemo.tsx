import { useEffect, useRef, useState } from 'react';
import { Check, Nfc, RotateCcw } from 'lucide-react';
import { useNfcChime } from './StationExperiences';
import './nfc-tap.css';

// Come nella realtà: il telefono legge la card, compare la notifica con il link, la si tocca e si apre la pagina.
type TapPhase = 'idle' | 'approaching' | 'reading' | 'leaving' | 'pointing' | 'press' | 'done';

export default function NfcTapDemo() {
  const [phase, setPhase] = useState<TapPhase>('idle');
  const stageRef = useRef<HTMLDivElement>(null);
  const [cardStartX, setCardStartX] = useState<number>(300);
  const { prepareAudio, playChime } = useNfcChime();
  const tapped = phase === 'done';
  const notified = ['reading', 'leaving', 'pointing', 'press'].includes(phase);
  const busy = phase !== 'idle' && phase !== 'done';

  useEffect(() => {
    const updateCardStart = () => {
      if (stageRef.current) {
        const rect = stageRef.current.getBoundingClientRect();
        const cardHalfWidth = rect.width <= 420 ? 68 : 78;
        const cardBaseLeft = rect.width / 2 - cardHalfWidth;
        const dist = rect.width - cardBaseLeft + 24;
        setCardStartX(Math.round(dist));
      }
    };

    updateCardStart();
    window.addEventListener('resize', updateCardStart);
    const timer = window.setTimeout(updateCardStart, 150);
    return () => {
      window.removeEventListener('resize', updateCardStart);
      window.clearTimeout(timer);
    };
  }, []);

  // tempi pensati per essere letti: la notifica resta in vista, poi arriva la mano e la tocca
  useEffect(() => {
    const next: Partial<Record<TapPhase, [TapPhase, number]>> = { reading: ['leaving', 1100], pointing: ['press', 1000], press: ['done', 380] };
    const step = next[phase]; if (!step) return;
    const timer = window.setTimeout(() => setPhase(step[0]), step[1]);
    return () => window.clearTimeout(timer);
  }, [phase]);

  return <div className="tap-demo">
    <div className={`nfc-tap-stage tap-${phase}`} ref={stageRef} style={{ '--card-start-x': `${cardStartX}px` } as React.CSSProperties}>
      <div className="nfc-card-track" aria-hidden="true"><div className="nfc-demo-card" aria-hidden="true" onAnimationEnd={event => {
        if (event.animationName === 'nfc-card-arrive' && phase === 'approaching') {
          setPhase('reading');
          void playChime();
        } else if (event.animationName === 'nfc-card-depart' && phase === 'leaving') setPhase('pointing');
      }}><span>NFC</span><Nfc size={27}/></div></div>
      <div className="phone">
        <div className="phone-notch"/><span className="phone-time">9:41 <span>● ● ▰</span></span>
        <div className={`nfc-notice ${notified ? 'on' : ''} ${phase === 'press' ? 'pressed' : ''}`} aria-hidden={!notified}><span className="nfc-notice-icon"><Nfc size={14}/></span><span><b>Tag NFC rilevato</b><small>Tocca per aprire · g.page/la-tua-attivita</small></span></div>
        <div className={`phone-content ${tapped ? 'tapped' : ''}`} aria-live="polite">
          {tapped ? <><span className="google-g">G</span><h3>La tua attività</h3><div className="phone-stars">☆ ☆ ☆ ☆ ☆</div><p>Qui il cliente trova la tua pagina e può condividere la sua esperienza.</p><span className="demo-pill"><Check size={13}/> Collegamento aperto</span></> : <><div className="phone-signal"><Nfc size={42}/></div><h3>Un gesto.<br/>Sei connesso.</h3><p>{phase === 'approaching' ? 'Avviciniamo la card al telefono…' : 'Prova il pulsante qui sotto per vedere il percorso.'}</p></>}
        </div><span className="phone-bottom"/>
      </div>
      <svg className={`nfc-hand ${phase === 'pointing' || phase === 'press' ? 'in' : ''} ${phase === 'press' ? 'press' : ''}`} viewBox="0 0 64 80" aria-hidden="true"><path d="M22 6c3.3 0 6 2.7 6 6v22l2-1.2c3-1.6 6.6-.6 8.2 2.3l.6 1.1 1.6-.8c3-1.4 6.5-.2 8 2.7l.4.8 1-.4c3-1.1 6.3.4 7.4 3.4.4 1 .6 2 .6 3.1V58c0 9.9-8.1 18-18 18h-4.6c-6.6 0-12.6-3.7-15.6-9.6L9.5 52.6c-1.5-3-.4-6.6 2.5-8.2 2.7-1.5 6.1-.7 7.9 1.8l-3.9-.1V12c0-3.3 2.7-6 6-6z" fill="#fff" stroke="#283421" strokeWidth="3" strokeLinejoin="round"/></svg>
    </div>
    <span className="nfc-tap-caption" hidden aria-live="polite">{phase === 'approaching' ? '01 / Avvicina la card' : phase === 'reading' ? '02 / NFC rilevato · si apre il collegamento' : tapped ? '03 / La tua pagina, sul suo telefono' : 'Una card. Un telefono. Una connessione.'}</span>
    <button className="tap-button" disabled={busy} onClick={() => { void prepareAudio(); setPhase('approaching'); }}>
      {tapped ? <RotateCcw size={19}/> : <Nfc size={19}/>} {busy ? 'Tap in corso…' : tapped ? 'Riprova il tap' : 'Simula un tap'}
    </button>
    <small>Dimostrazione · Nessuna recensione viene inviata</small>
  </div>;
}
