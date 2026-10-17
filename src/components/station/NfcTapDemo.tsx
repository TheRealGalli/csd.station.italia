import { useEffect, useRef, useState } from 'react';
import { Check, Nfc, RotateCcw } from 'lucide-react';
import { useNfcChime } from './StationExperiences';
import './nfc-tap.css';

type TapPhase = 'idle' | 'approaching' | 'reading' | 'leaving' | 'done';

export default function NfcTapDemo() {
  const [phase, setPhase] = useState<TapPhase>('idle');
  const stageRef = useRef<HTMLDivElement>(null);
  const [cardStartX, setCardStartX] = useState<number>(300);
  const { prepareAudio, playChime } = useNfcChime();
  const tapped = ['reading', 'leaving', 'done'].includes(phase);
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

  useEffect(() => {
    if (phase !== 'reading') return;
    const timer = window.setTimeout(() => setPhase('leaving'), 1250);
    return () => window.clearTimeout(timer);
  }, [phase]);

  return <div className="tap-demo">
    <div className={`nfc-tap-stage tap-${phase}`} ref={stageRef} style={{ '--card-start-x': `${cardStartX}px` } as React.CSSProperties}>
      <div className="nfc-card-track" aria-hidden="true"><div className="nfc-demo-card" aria-hidden="true" onAnimationEnd={event => {
        if (event.animationName === 'nfc-card-arrive' && phase === 'approaching') {
          setPhase('reading');
          void playChime();
        } else if (event.animationName === 'nfc-card-depart' && phase === 'leaving') setPhase('done');
      }}><span>NFC</span><Nfc size={27}/></div></div>
      <div className="phone">
        <div className="phone-notch"/><span className="phone-time">9:41 <span>● ● ▰</span></span>
        <div className={`phone-content ${tapped ? 'tapped' : ''}`} aria-live="polite">
          {tapped ? <><span className="google-g">G</span><h3>La tua attività</h3><div className="phone-stars">☆ ☆ ☆ ☆ ☆</div><p>Qui il cliente trova la tua pagina e può condividere la sua esperienza.</p><span className="demo-pill"><Check size={13}/> Collegamento aperto</span></> : <><div className="phone-signal"><Nfc size={42}/></div><h3>Un gesto.<br/>Sei connesso.</h3><p>{phase === 'approaching' ? 'Avviciniamo la card al telefono…' : 'Prova il pulsante qui sotto per vedere il percorso.'}</p></>}
        </div><span className="phone-bottom"/>
      </div>
    </div>
    <span className="nfc-tap-caption" aria-live="polite">{phase === 'approaching' ? '01 / Avvicina la card' : phase === 'reading' ? '02 / NFC rilevato · si apre il collegamento' : tapped ? '03 / La tua pagina, sul suo telefono' : 'Una card. Un telefono. Una connessione.'}</span>
    <button className="tap-button" disabled={busy} onClick={() => { void prepareAudio(); setPhase('approaching'); }}>
      {tapped ? <RotateCcw size={19}/> : <Nfc size={19}/>} {busy ? 'Tap in corso…' : tapped ? 'Riprova il tap' : 'Simula un tap'}
    </button>
    <small>Dimostrazione · Nessuna recensione viene inviata</small>
  </div>;
}
