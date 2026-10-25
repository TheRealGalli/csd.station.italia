import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronRight, Cpu, FileSpreadsheet, LockKeyhole, Pause, Play, PlugZap, ShieldCheck, UtensilsCrossed, ShoppingBag, Package, Zap } from 'lucide-react';
import { OttoIcon } from './OttoIcon';
import { ServiceAnswers } from './ServiceAnswers';
import './forecasting.css';
import LocalElasticDemo from './LocalElasticDemo';

export const forecastContact = `https://wa.me/393518628203?text=${encodeURIComponent('Ciao Carlo! Vorrei valutare la prova gratuita di una settimana di AI Forecasting. La mia attività è… Vorrei prevedere… Ho uno storico di…')}`;
const days = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
const fullDays = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
const examples = [
  { name: 'Ristorante', question: 'Quanti coperti prepariamo?', metric: 'coperti', unit: 'coperti', values: [42, 47, 51, 62, 86, 112, 78], actual: [45, 43, 55, 59, 92, 106, 83], history: [38, 46, 42, 57, 78, 105, 72, 43, 48, 46, 61, 82, 108], detail: 'Prenotazioni, calendario, festività ed eventi programmati possono affiancare lo storico.', decision: 'Acquisti e turni, con un quadro in più.', note: 'Sabato · evento in zona', action: 'Valuta scorte e copertura del servizio.' },
  { name: 'Negozio', question: 'Cosa venderemo di più?', metric: 'articoli', unit: 'articoli', values: [39, 45, 42, 56, 75, 98, 63], actual: [42, 41, 47, 52, 81, 94, 68], history: [31, 43, 39, 50, 64, 91, 56, 38, 44, 37, 53, 73, 92], detail: 'Vendite per categoria, promozioni e aperture: una vista leggibile anche per più punti vendita.', decision: 'Assortimento e riordini, con più contesto.', note: 'Sabato · promozione prevista', action: 'Controlla la disponibilità della categoria.' },
  { name: 'Magazzino', question: 'Quanto dovremo riordinare?', metric: 'unità richieste', unit: 'unità', values: [73, 89, 103, 96, 83, 48, 36], actual: [78, 83, 110, 91, 88, 44, 40], history: [61, 78, 94, 86, 73, 39, 30, 68, 82, 97, 90, 77, 42], detail: 'Ordini, disponibilità e tempi di consegna aiutano a leggere domanda e fabbisogno.', decision: 'Meno scorte ferme. Meno acquisti d’urgenza.', note: 'Mercoledì · consegne programmate', action: 'Verifica le giacenze prima del riordino.' },
];
const point = (value: number, index: number, start: number, spacing: number) => `${start + index * spacing},${222 - value * 1.37}`;
const line = (values: number[], start: number, spacing: number) => values.map((value, index) => `${index ? 'L' : 'M'}${point(value, index, start, spacing)}`).join(' ');

function SectorIcon({ sector }: { sector: string }) {
  const Icon = { '01': UtensilsCrossed, '02': ShoppingBag, '03': Package, '04': Zap }[sector] ?? Package;
  return <Icon className="fc-sector-symbol" size={23} strokeWidth={1.5} aria-hidden="true"/>;
}

function ForecastObservatory() {
  const [day, setDay] = useState(2);
  const sample = examples[2];
  const value = sample.values[day];
  const lower = Math.round(value * .8), upper = Math.round(value * 1.2);
  const forecast = [sample.history[12], ...sample.values];
  const band = `${line(forecast.map(v => v * 1.2), 410, 43)} ${forecast.map((v, i) => point(v * .8, i, 410, 43)).reverse().map(p => `L${p}`).join(' ')} Z`;
  return <div className="fc-observatory">
    <div className="fc-observatory-heading"><div><span className="fc-mono">A COLPO D’OCCHIO</span><h2>Quanto dovremmo riordinare?</h2></div><span className="fc-simulated"><i/> ESEMPIO SIMULATO</span></div>
    <div className="fc-instrument"><div className="fc-chart-area"><div className="fc-chart-labels"><span>LO STORICO CHE HAI</span><span>LA SETTIMANA CHE ARRIVA <ArrowRight size={13}/></span></div><svg className="fc-chart" viewBox="0 0 760 265" role="img" aria-label={`Esempio inventato: storico e previsione settimanale di ${sample.metric}. La fascia mostra l’incertezza illustrativa, senza probabilità calibrata.`}>
      <defs><linearGradient id="fc-band" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#c5f476" stopOpacity=".28"/><stop offset="1" stopColor="#c5f476" stopOpacity=".03"/></linearGradient></defs>
      {[55, 110, 165, 220].map(y => <line key={y} x1="12" x2="738" y1={y} y2={y} stroke="#ffffff12"/>)}
      <line x1="410" x2="410" y1="18" y2="235" stroke="#eaf0dc66" strokeDasharray="3 6"/><text x="410" y="255" fill="#9ba591" fontSize="10" textAnchor="middle">OGGI</text>
      <path d={line(sample.history, 14, 33)} fill="none" stroke="#a4ae9c" strokeWidth="2" strokeLinejoin="round"/>
      <g className="fc-forecast-drawing"><path d={band} fill="url(#fc-band)"/><path d={line(forecast, 410, 43)} fill="none" stroke="#c5f476" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round"/></g>
      <line x1={453 + day * 43} x2={453 + day * 43} y1="22" y2="226" stroke="#c5f47644"/>
      <circle className="fc-signal-halo" cx={453 + day * 43} cy={222 - value * 1.37} r="13" fill="#c5f47622"/><circle cx={453 + day * 43} cy={222 - value * 1.37} r="5" fill="#c5f476" stroke="#152016" strokeWidth="3"/>
      <text x="16" y="255" fill="#7c8977" fontSize="10">DATI PASSATI</text><text x="737" y="255" fill="#a8b79b" fontSize="10" textAnchor="end">+7 GIORNI</text>
    </svg><div className="fc-chart-legend"><span><i/> Storico</span><span><i/> Previsione</span><span><i/> Fascia di incertezza</span></div></div>
    <div className="fc-forecast-ticket" aria-live="polite" aria-atomic="true"><span className="fc-mono">{days[day].toUpperCase()} / PREVISIONE ILLUSTRATIVA</span><div className="fc-ticket-number">{value}<span>{sample.unit}</span></div><p>Fascia illustrativa <b>{lower}–{upper}</b></p><div className="fc-ticket-rule"/><span className="fc-ticket-context"><CalendarDays size={15}/>{day === 2 ? sample.note : `${fullDays[day]} · calendario attività`}</span><p className="fc-ticket-action">{sample.action}</p></div></div>
    <div className="fc-day-select"><span>ESPLORA I GIORNI</span><div role="group" aria-label="Scegli un giorno della previsione">{days.map((label, index) => <button type="button" key={label} aria-pressed={day === index} onClick={() => setDay(index)}>{label}{index === day && <i/>}</button>)}</div><span>01 — 07</span></div>
    <div className="fc-example-foot"><p>{sample.decision}</p><small>Dati inventati. Questa pagina non esegue un modello AI e non raccoglie file.</small></div>
  </div>;
}

function TrialComparison({ paused }: { paused: boolean }) {
  const [frame, setFrame] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const board = useRef<HTMLDivElement>(null);
  const day = Math.floor(frame / 3), phase = frame % 3;
  const playing = !paused && !stopped && !reduced;
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update(); media.addEventListener('change', update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .25 });
    if (board.current) observer.observe(board.current);
    return () => { media.removeEventListener('change', update); observer.disconnect(); };
  }, []);
  useEffect(() => {
    if (!playing || !visible) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setFrame(previous => (previous + 1) % 21);
    }, 1800);
    return () => window.clearInterval(timer);
  }, [playing, visible]);
  const sample = examples[0];
  const value = sample.values[day], actual = sample.actual[day];
  const reveal = !playing || phase > 0;
  const reviewing = !playing || phase === 2;
  return <div ref={board} className="fc-trial-board" data-playing={playing && visible} data-phase={phase}>
    <div className="fc-trial-board-top"><span className="fc-mono">IL DIARIO DELLA PROVA</span><span>ESEMPIO INVENTATO</span></div>
    <div className="fc-trial-motion-bar"><span><i/>{playing ? 'LA SETTIMANA, IN MOVIMENTO' : 'ESPLORA LA SETTIMANA'}</span>{!reduced && <button type="button" aria-label={stopped || paused ? 'Avvia il diario animato' : 'Metti in pausa il diario'} disabled={paused} onClick={() => setStopped(!stopped)}>{stopped || paused ? <Play size={12}/> : <Pause size={12}/>} {stopped || paused ? 'Riprendi' : 'Pausa'}</button>}</div>
    <div className="fc-week" role="group" aria-label="Esplora il diario dimostrativo della settimana">{days.map((label, index) => <button key={label} type="button" aria-pressed={day === index} onClick={() => { setFrame(index * 3 + 2); setStopped(true); }}><span>0{index + 1}</span>{label}<i/></button>)}</div>
    <div className="fc-day-progress" aria-hidden="true"><i key={`${day}-${playing}`} /></div>
    <div className="fc-comparison" aria-live={playing ? 'off' : 'polite'} aria-atomic="true">
      <div><span>AVEVAMO PREVISTO / {fullDays[day].toUpperCase()}</span><b key={`forecast-${day}`} className="fc-value-enter">{value}<small>coperti</small></b><div className="fc-comparison-track"><i style={{width:`${value / 1.3}%`}}/></div></div>
      <div className={reveal ? '' : 'fc-result-waiting'}><span>È SUCCESSO DAVVERO</span><b key={`actual-${day}-${reveal}`} className="fc-value-enter">{reveal ? actual : '…'}<small>{reveal ? 'coperti' : 'aspettiamo il dato'}</small></b><div className="fc-comparison-track actual"><i style={{width:reveal ? `${actual / 1.3}%` : '0%'}}/></div></div>
      <p><span>SCOSTAMENTO ASSOLUTO</span><b>{reviewing ? `${Math.abs(value - actual)} coperti` : 'Confronto in corso'}</b></p>
    </div>
    <div className="fc-otto-analyst"><div className="fc-otto-figure" aria-hidden="true"><div className="fc-otto-head"><OttoIcon size={65} mood={reviewing ? 'happy' : 'read'}/></div><div className="fc-otto-body"><i/><i/><span/></div><div className="fc-otto-report"><i/><i/><i/><Check size={12}/></div></div><div className="fc-otto-comment" aria-live="off"><span>OTTO / IN MODALITÀ ANALISTA</span><p key={`${day}-${phase}-${playing}`}>{!playing ? `${fullDays[day]}: ${Math.abs(value - actual)} coperti di differenza. Il confronto resta visibile.` : phase === 0 ? `${fullDays[day]}: partiamo dalla previsione. Il risultato arriverà dopo.` : phase === 1 ? `Ora abbiamo il dato reale: ${actual} coperti. Mettiamoli a confronto.` : `${Math.abs(value - actual)} coperti di differenza. Annotato: passiamo al giorno successivo.`}</p></div></div>
    <small className="fc-trial-example">Animazione con dati inventati. Otto illustra il metodo: non è un’analisi AI in tempo reale né un risultato cliente.</small>
  </div>;
}

export default function ForecastPage() {
  return <div className="fc-page">
    <section className="fc-hero"><div className="fc-horizon" aria-hidden="true"><div/><div/><div/></div><div className="wrap fc-hero-copy"><div className="fc-hero-topline"><span className="fc-eyebrow"><i/> AI FORECASTING / CSD STATION</span><span className="fc-mono">MENO IMPROVVISAZIONE. PIÙ PROSPETTIVA.</span></div><div className="fc-hero-layout"><div><h1>Domani arriva.<br/><em>Tu, arrivaci prima.</em></h1></div><div className="fc-hero-side"><p>Scorte ferme, sprechi, acquisti d’urgenza: decidere senza leggere i dati ha un costo. Usiamo previsioni e margini di incertezza per aiutarti a <strong>pianificare meglio e ridurre i costi nel tempo.</strong></p><a className="station-button" href={forecastContact} target="_blank" rel="noreferrer">Proviamoci sui tuoi dati <ArrowUpRight size={19}/></a><span className="fc-trial-promise">Una settimana di prova gratuita.<br/>Prima verifichiamo insieme la fattibilità.</span></div></div><div className="fc-hero-tags"><span><LockKeyhole size={15}/> Anche al 100% in locale</span><span><Cpu size={15}/> Hardware leggero, se adatto al progetto</span><a href="#forecasting-prova">Prima la prova. Poi decidi. <ArrowDown size={15}/></a></div><ForecastObservatory/></div></section>

    <section className="fc-reading wrap" id="forecasting-metodo"><span className="fc-eyebrow">01 / DAI NUMERI, ALLE SCELTE</span><div className="fc-reading-grid"><h2>Il futuro non è scritto.<br/><em>Qualche segnale, sì.</em></h2><div><p>Vendite, coperti, consumi, ordini. I numeri di ieri possono raccontare qualcosa di domani. Il forecasting cerca questi segnali e li trasforma in <strong>previsioni che puoi leggere e verificare.</strong></p><p>Li affianchiamo, quando utili e disponibili, a calendario, festività, promozioni ed eventi. In un’interfaccia semplice: cosa ci aspettiamo, con quale margine e cosa è successo davvero.</p></div></div><div className="fc-input-flow"><span><FileSpreadsheet size={20}/> Il tuo storico</span><i/><span><CalendarDays size={20}/> Il tuo contesto</span><i/><span><OttoIcon size={23} mood="read"/> Una previsione leggibile</span><i/><span><Check size={20}/> La tua decisione</span></div></section>

    <section className="fc-usecases"><div className="wrap"><div className="fc-section-top"><span className="fc-eyebrow">02 / DOVE PUÒ FARE LA DIFFERENZA</span><span className="fc-mono">UNA DOMANDA CONCRETA, PER COMINCIARE.</span></div><div className="fc-sectors-intro"><h2>Partiamo dalle PMI.<br/><em>Dalle decisioni di ogni giorno.</em></h2><p>Bar e ristoranti, negozi e piccole catene, distribuzione e magazzini: i primi ambiti su cui concentrarci. Anche produzione ed energia, quando ci sono dati adatti e una domanda concreta.</p></div><div className="fc-case-list">{[
      ['01', 'Bar & ristorazione', 'Quanti ne aspettiamo?', 'Coperti, incassi e consumi per preparare acquisti e turni. Anche tra più locali.', 'Meno sprechi. Più organizzazione.'],
      ['02', 'Negozi & retail', 'Cosa mettiamo a scaffale?', 'Vendite per sede e categoria, con stagionalità e promozioni quando disponibili.', 'Riordini con più prospettiva.'],
      ['03', 'Distribuzione & magazzino', 'Quanto ci servirà?', 'Domanda, rotazione delle scorte e fabbisogno, considerando tempi di approvvigionamento.', 'Prepararsi, prima dell’urgenza.'],
      ['04', 'Produzione & energia', 'Come cambia il carico?', 'Volumi, consumi energetici e serie di sensori: progetti da valutare con un’analisi dedicata.', 'Capacità da pianificare.'],
    ].map(([number, name, question, description, result]) => <article key={number}><span className="fc-case-index">{number}</span><div><h3 className="fc-sector-name">{name}</h3><span className="fc-case-question">{question}</span></div><p>{description}</p><span className="fc-case-result">{result}<SectorIcon sector={number}/></span></article>)}</div><p className="fc-section-note">Sono obiettivi da verificare sul tuo caso, non risultati garantiti. Si parte da una variabile e una decisione utile.</p></div></section>

    <section className="fc-local" id="forecasting-locale"><div className="wrap fc-local-layout"><div className="fc-local-copy"><span className="fc-eyebrow">03 / L’AI ENTRA. I DATI RESTANO.</span><h2>Il tuo domani.<br/>Dentro la<br/><em>tua azienda.</em></h2><p>Possiamo costruire un sistema che elabora i dati <strong>interamente in locale</strong>, nell’infrastruttura della tua attività. I dati restano tuoi: non serve cederli a un fornitore AI per fare previsioni.</p><p>Valutiamo anche un piccolo computer dedicato o l’hardware che hai già. Dimensionamento, velocità e compatibilità si verificano sui tuoi volumi, prima di scegliere.</p><Link to="/privacy-policy/#forecasting" className="fc-text-link">Come trattiamo i dati <ArrowUpRight size={16}/></Link></div><LocalElasticDemo paused={false}/></div><div className="wrap fc-local-bottom"><div><PlugZap size={22}/><p><b>Collegato al tuo lavoro.</b> Import da Excel e CSV, oppure integrazioni con gestionali e calendari se compatibili, con accessi autorizzati.</p></div><div><ShieldCheck size={22}/><p><b>Un perimetro chiaro.</b> Backup, assistenza remota e servizi cloud si definiscono prima. Il 100% locale richiede che anche questi flussi restino nel perimetro concordato.</p></div></div></section>

    <section className="fc-trial wrap" id="forecasting-prova"><div className="fc-trial-copy"><span className="fc-eyebrow">04 / LA PROVA DEI FATTI</span><h2>Una settimana.<br/><em>Vediamo cosa<br/>ci racconta.</em></h2><p>La prova di forecasting è gratuita per sette giorni. Prima scegliamo cosa prevedere e controlliamo lo storico. Poi fissiamo insieme perimetro e giorno di partenza.</p><ol><li><span>01</span><div><h3>Mettiamo a fuoco la domanda.</h3><p>Una sede, una variabile, un obiettivo. Verifichiamo qualità, frequenza e profondità dei dati.</p></div></li><li><span>02</span><div><h3>Prevediamo. E confrontiamo.</h3><p>Testiamo su periodi storici tenuti da parte e confrontiamo con un metodo semplice, come lo stesso giorno della settimana precedente. Durante la prova registriamo le previsioni prima dei risultati.</p></div></li><li><span>03</span><div><h3>Ti mostriamo com’è andata.</h3><p>Previsioni, scostamenti e limiti. Valutiamo insieme se c’è valore per proseguire, senza obblighi o rinnovi automatici.</p></div></li></ol><Link className="fc-text-link" to="/terms-of-service/#forecasting">Il perimetro della prova <ArrowUpRight size={16}/></Link></div><div className="fc-trial-right"><TrialComparison paused={false}/><div className="fc-trial-honesty"><span>SETTE GIORNI SONO UN INIZIO.</span><p>Possiamo considerare festività, promozioni ed eventi programmati, quando le informazioni sono disponibili. La prova offre un primo riscontro: misuriamo i risultati sul tuo caso e li verifichiamo nel tempo.</p><p>Hardware, installazioni e integrazioni ulteriori si concordano separatamente, prima di qualsiasi attività a pagamento.</p></div></div></section>


    <section className="fc-faq wrap"><div><span className="fc-eyebrow">PRIMA DI COMINCIARE</span><h2>Domande di oggi.<br/><em>Risposte chiare.</em></h2></div><ServiceAnswers mode="forecasting"/></section>
    <section className="fc-contact" id="forecasting-contatto"><div className="wrap"><div className="fc-contact-top"><span className="fc-eyebrow"><i/> IL PROSSIMO PASSO</span><OttoIcon size={42} mood="read"/></div><h2>Cosa vorresti<br/><em>sapere in anticipo?</em></h2><div className="fc-contact-bottom"><div><p>Raccontami che attività hai, cosa vuoi prevedere e da quanto tempo raccogli i dati. Partiamo da una domanda, prima dei file.</p><small>Nel primo messaggio non allegare dati aziendali o personali.<br/>Concordiamo un canale adatto, oppure lavoriamo direttamente in azienda.</small></div><div><a className="station-button" href={forecastContact} target="_blank" rel="noreferrer">Valutiamo la settimana gratuita <ArrowUpRight size={19}/></a><a className="fc-contact-email" href="mailto:carlo@csd-station.it?subject=Prova%20AI%20Forecasting">Oppure scrivimi un’email <ChevronRight size={16}/></a></div></div><div className="fc-contact-legal"><Link to="/terms-of-service/#forecasting">Condizioni del servizio <ArrowUpRight size={13}/></Link><Link to="/privacy-policy/#forecasting">Privacy e dati aziendali <ArrowUpRight size={13}/></Link></div></div></section>
  </div>;
}


export function ForecastMobile() {
  return <div className="fc-page fc-mobile-page">
    <section className="fcm-intro wrap" id="forecasting-metodo" aria-labelledby="fcm-title">
      <span className="fc-eyebrow"><i/> AI FORECASTING / PER LE PMI</span>
      <h1 id="fcm-title">Domani arriva.<br/><em>Arrivaci prima.</em></h1>
      <p>Scorte ferme, sprechi, acquisti d’urgenza: decidere senza leggere i dati ha un costo. Le previsioni possono aiutarti a pianificare meglio e ridurre i costi nel tempo.</p>
      <div className="fcm-sectors" aria-label="Settori principali"><span>Bar & ristoranti</span><span>Negozi & retail</span><span>Magazzini</span><span>Produzione & energia</span></div>
      <a className="station-button" href={forecastContact} target="_blank" rel="noreferrer">Valutiamo la settimana gratuita <ArrowUpRight size={18}/></a>
      <span className="fcm-promise">Prima verifichiamo i dati. Nessun obbligo di proseguire.</span>
      <div className="fcm-trust"><span><LockKeyhole size={15}/> Anche al 100% in locale</span><span><FileSpreadsheet size={15}/> Partiamo dal tuo storico</span></div>
      <a href="#forecasting-prova" className="fcm-scroll">La prova, con Otto <ArrowDown size={15}/></a>
    </section>

    <section className="fcm-trial" id="forecasting-prova" aria-labelledby="fcm-trial-title"><div className="wrap">
      <span className="fc-eyebrow">02 / PRIMA LA PROVA. POI DECIDI.</span>
      <h2 id="fcm-trial-title">Sette giorni.<br/><em>Il confronto è concreto.</em></h2>
      <p>Definiamo obiettivo e partenza, considerando anche calendario ed eventi programmati disponibili. Ogni giorno confrontiamo la previsione con quello che succede davvero.</p>
      <TrialComparison paused={false}/>
      <p className="fcm-trial-note">Dati e fattibilità si verificano prima. Confrontiamo anche con metodi semplici e periodi storici: una settimana è un primo riscontro, non una garanzia di accuratezza.</p>
      <Link className="fc-text-link" to="/terms-of-service/#forecasting">Cosa comprende la prova <ArrowUpRight size={15}/></Link>
    </div></section>

    <section className="fcm-contact wrap" id="forecasting-contatto" aria-labelledby="fcm-contact-title">
      <span className="fc-eyebrow">03 / IL TUO PROSSIMO PASSO</span>
      <h2 id="fcm-contact-title">I tuoi dati.<br/><em>La tua prossima scelta.</em></h2>
      <div className="fcm-local" id="forecasting-locale"><ShieldCheck size={24}/><div><h3>L’AI entra. I dati restano.</h3><p>Possibile anche interamente in azienda, su hardware leggero se adatto. Accessi, backup e assistenza si concordano prima: i dati restano tuoi.</p></div></div>
      <details className="fcm-questions"><summary>Settori, dati e altre domande <ChevronRight size={18}/></summary><ServiceAnswers mode="forecasting"/></details>
      <p className="fcm-contact-copy">Che attività hai? Cosa vorresti sapere in anticipo? Raccontami il tuo obiettivo e lo storico disponibile.</p>
      <a className="station-button" href={forecastContact} target="_blank" rel="noreferrer">Parliamone su WhatsApp <ArrowUpRight size={18}/></a>
      <p className="fcm-first-message">Nel primo messaggio descrivi i dati, senza allegarli. Hardware, integrazioni e prosecuzione richiedono un accordo separato.</p>
      <div className="fcm-legal"><Link to="/privacy-policy/#forecasting">Privacy e dati <ArrowUpRight size={13}/></Link><Link to="/terms-of-service/#forecasting">Condizioni della prova <ArrowUpRight size={13}/></Link></div>
    </section>
  </div>;
}
