import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, Clock3, FileText, FolderOpen, Mail, Package, RotateCcw, ScanLine, ShieldCheck, Workflow } from 'lucide-react';
import './experiences.css';
import { OttoIcon } from './OttoIcon';

/** A shared, code-native mascot: the same Otto in the hero and the guided examples. */
export function Otto({ mood = 'awake', small = false }: { mood?: 'sleep' | 'awake' | 'busy' | 'happy'; small?: boolean }) {
  return <div className={`otto otto-${mood} ${small ? 'otto-small' : ''}`} aria-hidden="true">
    <div className="otto-aerial"><i /></div>
    <div className="otto-ear ear-left"/><div className="otto-ear ear-right"/>
    <div className="otto-head"><div className="otto-face"><i className="otto-eye"/><i className="otto-eye"/><span className="otto-mouth"/></div><span className="otto-cheek cheek-left"/><span className="otto-cheek cheek-right"/></div>
    <div className="otto-arm arm-left"/><div className="otto-arm arm-right"/>
    <div className="otto-body"><span>OTTO</span><i/><div className="otto-vents">···</div></div>
    <div className="otto-foot foot-left"/><div className="otto-foot foot-right"/>
    <div className="otto-shadow"/>
  </div>;
}

export function OttoHero() {
  return <div className="otto-hero" role="img" aria-label="Otto, la mascotte di CSD Station"><Otto mood="awake"/></div>;
}

type Scenario = 'email' | 'document' | 'inventory';
const scenarios = {
  email: {
    label: 'Richieste clienti', icon: Mail, problem: 'Una richiesta arriva. Il lavoro si moltiplica.',
    before: 'Leggere l’email, ricopiare i dati, preparare una risposta, ricordarsi di seguire il cliente.',
    after: 'Una richiesta ordinata e una bozza pronta da verificare. Il referente sa cosa fare.',
    steps: ['Arriva l’email', 'L’AI legge', 'Il flusso prepara', 'Tu approvi'],
    guide: ['“Ciao, mi servono 12 sedie per venerdì. Consegna a Siena?” È una semplice email. Vediamo quanto lavoro si porta dietro.', 'L’AI riconosce il senso del messaggio ed estrae prodotto, quantità, data e luogo. Sono dati proposti, da verificare.', 'L’automazione organizza la richiesta e prepara una bozza usando quei dati. Le disponibilità e il prezzo restano da verificare.', 'Qui entri in gioco tu: controlli i dati e la bozza. Nessuna risposta parte da sola. Prova ad approvare nell’esempio.'],
    success: 'Richiesta verificata e bozza approvata nell’esempio. Il lavoro ripetitivo è organizzato, la relazione col cliente resta tua.',
    approve: 'Approva la bozza', tools: 'Email → AI → Elenco richieste → Verifica umana',
  },
  document: {
    label: 'Documenti', icon: FileText, problem: 'Un altro PDF. Gli stessi dati da ricopiare.',
    before: 'Aprire il documento, cercare importo e scadenza, rinominarlo, trovare la cartella e segnare un promemoria.',
    after: 'Campi già proposti, una destinazione di archivio e un promemoria pronti per la tua verifica.',
    steps: ['Arriva il PDF', 'L’AI estrae', 'Il flusso prepara', 'Tu verifichi'],
    guide: ['È arrivata una fattura. In genere la apri, cerchi i dati e li ricopi altrove. Qui partiamo direttamente dal documento.', 'L’AI propone fornitore, numero, importo e scadenza. Un documento poco leggibile può generare errori: la verifica conta.', 'Le regole del flusso preparano nome del file, cartella e promemoria. Non devi reinserire gli stessi dati tre volte.', 'Confronta i campi con il documento e conferma. Nell’esempio, la tua verifica sblocca archiviazione e promemoria.'],
    success: 'Documento archiviato e promemoria preparato nell’esempio. Hai controllato le informazioni, senza ricopiarle.',
    approve: 'Conferma i dati', tools: 'PDF → AI → Archivio + promemoria → Verifica umana',
  },
  inventory: {
    label: 'Inventario NFC', icon: Package, problem: 'Il trapano è uscito. Qualcuno lo ha segnato?',
    before: 'Un attrezzo va in cantiere, il foglio non viene aggiornato e nessuno sa quanti ne rimangono.',
    after: 'Oggetto identificato, destinazione confermata e disponibilità aggiornata nello stesso flusso.',
    steps: ['Esce un oggetto', 'Leggi il tag', 'Prepari il movimento', 'Confermi il prelievo'],
    guide: ['Martina prende un trapano per il Cantiere Nord. In magazzino risultano 6 pezzi: senza registrare il movimento, quel numero diventa sbagliato.', 'Il tag NFC apre la scheda dell’oggetto TR-014. Qui non serve AI: un identificativo preciso risolve il problema.', 'La scheda propone un prelievo di 1 pezzo. Martina sceglie il Cantiere Nord e controlla il movimento prima di registrarlo.', 'Conferma il prelievo nell’esempio: la disponibilità passerà da 6 a 5, con oggetto, destinazione e operatore tracciati.'],
    success: 'Prelievo registrato nell’esempio: 5 pezzi disponibili, 1 al Cantiere Nord. Il movimento è tracciato e consultabile.',
    approve: 'Conferma il prelievo', tools: 'Tag NFC → Scheda oggetto → Movimento → Inventario',
  },
};
function SourceDocument({ type, extracted }: { type: Scenario; extracted: boolean }) {
  if (type === 'email') return <div className="sample-email"><div className="sample-avatar">M</div><div className="sample-sender"><b>Martina · cliente</b><span>A: la tua attività</span></div><div className="sample-subject">Richiesta disponibilità sedie</div><p>Ciao! Mi servono <mark className={extracted ? 'highlighted' : ''}>12 sedie</mark> per <mark className={extracted ? 'highlighted' : ''}>venerdì</mark>. Riuscite a consegnarle a <mark className={extracted ? 'highlighted' : ''}>Siena</mark>?</p><p>Potete farmi sapere disponibilità e prezzo?<br/>Grazie, Martina</p><span className="sample-timestamp">OGGI, 09:12 · EMAIL DI ESEMPIO</span></div>;
  if (type === 'document') return <div className="sample-invoice"><div className="invoice-head"><FileText size={24}/><span>OFFICINA VERDE<small>Documento di esempio</small></span></div><h4>Fattura <mark className={extracted ? 'highlighted' : ''}>147</mark></h4><div className="invoice-lines"><span>Fornitura materiali</span><b>1 lotto</b><span>Importo totale</span><b><mark className={extracted ? 'highlighted' : ''}>€ 248,00</mark></b><span>Scadenza</span><b><mark className={extracted ? 'highlighted' : ''}>30/11/2026</mark></b></div><div className="document-barcode"/><span className="sample-timestamp">FATTURA_147.PDF · 1 PAGINA</span></div>;
  return <div className="sample-inventory"><div className={`inventory-object ${extracted ? 'scanned' : ''}`}><Package size={48} strokeWidth={1.2}/><span className="inventory-tag"><ScanLine size={18}/> TR-014</span>{extracted && <div className="scan-sweep"/>}</div><h4>Trapano avvitatore</h4><p>Magazzino → Cantiere Nord</p><div className="inventory-operator"><span>M</span><div><b>Martina</b><small>Prelievo di 1 pezzo</small></div><span className="stock-tag">6 a scaffale</span></div></div>;
}
function Extraction({ type }: { type: Scenario }) {
  const fields = type === 'email' ? [['Prodotto','Sedie'],['Quantità','12'],['Quando','Venerdì'],['Consegna','Siena']] : type === 'document' ? [['Fornitore','Officina Verde'],['Numero','147'],['Totale','€ 248,00'],['Scadenza','30/11/2026']] : [['Codice tag','TR-014'],['Oggetto','Trapano avvitatore'],['Disponibili','6 pezzi'],['Posizione','Magazzino']];
  return <div className="extracted-data"><span className="workspace-kicker">{type === 'inventory' ? 'OGGETTO IDENTIFICATO DAL TAG' : 'DATI PROPOSTI DALL’AI'}</span>{fields.map(([label,value],i) => <div className="extracted-row" style={{animationDelay:`${i * 100}ms`}} key={label}><span>{label}</span><b>{value}</b><Check size={12}/></div>)}<p className="workspace-note">{type === 'inventory' ? 'Un collegamento univoco alla scheda. Nessun nome da ricopiare.' : 'L’AI interpreta il contenuto. I dati restano da verificare.'}</p></div>;
}
function PreparedOutput({ type, confirmed }: { type: Scenario; confirmed: boolean }) {
  if (type === 'email') return <div className="prepared-output"><div className="mini-record"><span>RICHIESTA #024</span><b>Martina · 12 sedie · Siena</b><small>{confirmed ? 'Verificata · referente avvisato' : 'Venerdì · da verificare'}</small></div><div className="draft-response"><span><Mail size={14}/> BOZZA DI RISPOSTA</span><p>Ciao Martina, grazie per la richiesta di 12 sedie per venerdì a Siena. Verifichiamo disponibilità e consegna e ti inviamo un preventivo.</p><small>{confirmed ? 'Bozza approvata nell’esempio' : 'In attesa della tua approvazione'}</small></div></div>;
  if (type === 'document') return <div className="prepared-output"><div className="archive-preview"><FolderOpen size={30}/><span>{confirmed ? 'ARCHIVIATO NELL’ESEMPIO' : 'DESTINAZIONE PROPOSTA'}</span><b>Fornitori / Officina Verde / 2026</b><small>2026_147_Officina-Verde.pdf</small></div><div className="reminder-preview"><Clock3 size={17}/><div><b>Controlla la scadenza</b><span>30 novembre · Fattura 147 · € 248,00</span></div></div></div>;
  return <div className="prepared-output"><div className="stock-counter"><span>DISPONIBILITÀ IN MAGAZZINO</span><div><b className={confirmed ? 'old-stock' : ''}>6</b><ArrowRight size={25}/><b className={confirmed ? 'new-stock' : 'preview-stock'}>5</b></div><small>{confirmed ? 'Aggiornato nell’esempio' : 'Anteprima dopo la conferma'}</small></div><div className="movement-row"><Package size={19}/><div><b>−1 trapano · TR-014</b><span>Martina → Cantiere Nord</span></div><span>{confirmed ? 'Registrato' : 'Da confermare'}</span></div></div>;
}
export function GuidedDemo() {
  const [selected, setSelected] = useState<Scenario>('email');
  const [step, setStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const scenario = scenarios[selected];
  function choose(type: Scenario) { setSelected(type); setStep(0); setConfirmed(false); }
  function goTo(next: number) { setStep(next); setConfirmed(false); }
  return <div className="guided-demo">
    <div className="guided-tabs" role="group" aria-label="Scegli il processo da esplorare">{(Object.keys(scenarios) as Scenario[]).map(key => {
      const Icon = scenarios[key].icon;
      return <button key={key} className={selected === key ? 'active' : ''} aria-pressed={selected === key} onClick={() => choose(key)}><Icon size={19}/><span>{scenarios[key].label}</span><ArrowUpRight size={15}/></button>;
    })}</div>
    <div className="guided-layout">
      <aside className="guided-story"><span className="micro-label">IL PROBLEMA</span><h3>{scenario.problem}</h3><p>{scenario.before}</p><div className="guided-outcome"><span><Check size={14}/> COSA CAMBIA</span><p>{scenario.after}</p></div><div className="guided-legend"><span><OttoIcon mood="wink" size={15}/> AI: interpreta le informazioni</span><span><Workflow size={15}/> Automazione: esegue le regole</span><span><ShieldCheck size={15}/> Tu: verifichi e decidi</span></div></aside>
      <div className="walkthrough">
        <div className="walkthrough-toolbar"><span><i/><i/><i/> IL TUO LAVORO, VISTO DA DENTRO</span><small>ESEMPIO SIMULATO</small></div>
        <div className="walkthrough-steps" role="group" aria-label="Passaggi della dimostrazione">{scenario.steps.map((label,i) => <button key={label} aria-pressed={step === i} className={i === step ? 'current' : i < step ? 'past' : ''} onClick={() => goTo(i)}><span>{i < step ? <Check size={11}/> : i + 1}</span><b>{label}</b></button>)}</div>
        <div className="walkthrough-workspace">
          <div className="source-pane"><div className="pane-title">{selected === 'email' ? <Mail size={14}/> : selected === 'document' ? <FileText size={14}/> : <ScanLine size={14}/>} {selected === 'email' ? 'La richiesta originale' : selected === 'document' ? 'Il documento originale' : 'L’oggetto da tracciare'}</div><SourceDocument type={selected} extracted={step > 0}/></div>
          <div className="result-pane" key={`${selected}-${step}`}><div className="pane-title">{step === 0 ? <Clock3 size={14}/> : step === 1 ? <OttoIcon mood="read" size={14}/> : <Workflow size={14}/>} {step === 0 ? 'Tutto ancora da fare' : step === 1 ? selected === 'inventory' ? 'Identificazione NFC' : 'Lettura intelligente' : confirmed ? 'Operazione completata' : 'Il risultato prende forma'}</div>
            {step === 0 ? <div className="manual-checklist"><span>LA TUA LISTA, A MANO</span>{(selected === 'email' ? ['Leggi la richiesta','Ricopia i dati','Prepara una risposta','Avvisa il referente'] : selected === 'document' ? ['Leggi il PDF','Ricopia i campi','Archivia il file','Segna la scadenza'] : ['Cerca la scheda','Identifica l’oggetto','Segna la destinazione','Aggiorna la quantità']).map(t => <div key={t}><i/>{t}</div>)}<p>Passaggi piccoli. Ripetuti ogni giorno.</p></div> : step === 1 ? <Extraction type={selected}/> : <PreparedOutput type={selected} confirmed={confirmed}/>}
          </div>
        </div>
        <div className={`otto-guide ${confirmed ? 'guide-success' : ''}`}><div className="guide-mascot"><Otto small mood={confirmed ? 'happy' : step === 1 || step === 2 ? 'busy' : 'awake'}/></div><div aria-live="polite"><span>OTTO {confirmed ? ' / FATTO, INSIEME.' : ' / TI ACCOMPAGNO IO.'}</span><p>{confirmed ? scenario.success : scenario.guide[step]}</p></div></div>
        <div className="walkthrough-controls"><span>{step + 1} / 4 <i/> {confirmed ? 'Completato' : step === 3 ? 'Ora tocca a te' : 'Segui Otto'}</span><div>{step > 0 && !confirmed && <button className="walk-secondary" onClick={() => goTo(step - 1)}>Indietro</button>}
          <button className="walk-primary" onClick={() => { if (confirmed) choose(selected); else if (step === 3) { setConfirmed(true); } else { setStep(s => Math.min(3, s + 1)); } }}>{confirmed ? <><RotateCcw size={14}/> Rivedi il processo</> : step === 3 ? <><Check size={15}/>{scenario.approve}</> : <>Passaggio successivo <ArrowRight size={14}/></>}</button></div></div>
      </div>
    </div>
    <p className="walkthrough-disclaimer">{scenario.tools}<br/>Dati inventati per la dimostrazione. Nessuna email inviata, nessun documento o inventario reale modificato.</p>
  </div>;
}

/** An original two-note chime, generated locally only in response to a user gesture. */
export function useNfcChime() {
  const audio = useRef<AudioContext | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [audioUnavailable, setAudioUnavailable] = useState(false);
  useEffect(() => () => { const context = audio.current; audio.current = null; if (context && context.state !== 'closed') void context.close().catch(() => {}); }, []);
  // Unlock on the button gesture, before the card's visual approach (iOS included).
  async function prepareAudio(enabled = soundEnabled) {
    if (!enabled) return null;
    try {
      const AudioClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioClass) { setAudioUnavailable(true); return null; }
      const context = audio.current ?? (audio.current = new AudioClass());
      if (context.state === 'suspended') await context.resume();
      return context.state === 'closed' ? null : context;
    } catch { setAudioUnavailable(true); return null; }
  }
  async function playChime() {
    if (!soundEnabled) return;
    try {
      const context = await prepareAudio();
      if (!context || context !== audio.current) return;
      const start = context.currentTime;
      const master = context.createGain();
      master.gain.value = .22;
      master.connect(context.destination);
      [[1318.51, 0, .27], [2093, .085, .45]].forEach(([frequency, delay, duration]) => {
        [1, 2.01, 3.98].forEach((harmonic, i) => {
          const osc = context.createOscillator();
          const envelope = context.createGain();
          osc.type = 'sine';
          osc.frequency.value = frequency * harmonic;
          const t = start + delay;
          envelope.gain.setValueAtTime(0, t);
          envelope.gain.linearRampToValueAtTime(i === 0 ? .7 : .07 / i, t + .006);
          envelope.gain.exponentialRampToValueAtTime(.0001, t + duration / (i + 1));
          osc.connect(envelope); envelope.connect(master);
          osc.start(t); osc.stop(t + duration + .03);
          osc.onended = () => { osc.disconnect(); envelope.disconnect(); };
        });
      });
      // The final node is disconnected after the longest tone ends.
      const release = context.createOscillator();
      const silent = context.createGain(); silent.gain.value = 0;
      release.connect(silent); silent.connect(master);
      release.start(start); release.stop(start + .65);
      release.onended = () => { release.disconnect(); silent.disconnect(); master.disconnect(); };
      setAudioUnavailable(false);
    } catch { setAudioUnavailable(true); }
  }
  return { soundEnabled, setSoundEnabled, audioUnavailable, prepareAudio, playChime };
}
