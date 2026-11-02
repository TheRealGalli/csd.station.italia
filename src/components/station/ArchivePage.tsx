import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, AudioLines, Building2, ChevronRight, FileText, Film, FolderTree, Image, Landmark, Layers, LockKeyhole, Mail, Quote, RefreshCw, Scale, ScanText, Search, Server, ShieldCheck, Stethoscope, Users, WifiOff } from 'lucide-react';
import { osPaths } from '@/seo/routes';
import { ServiceAnswers } from './ServiceAnswers';
import { createArchiveGraph, kindColors, type Kind } from './ArchiveGraph';
import './archive.css';

// Archivio AI: la memoria dello studio collegata all'AI, tutta in locale. La hero è una rete alla Obsidian in movimento.
export const archiveContact = `https://wa.me/393518628203?text=${encodeURIComponent('Ciao Carlo! Vorrei informazioni sull’Archivio AI. La mia attività è… Oggi i documenti sono in… Cerco più spesso…')}`;
type Graph = ReturnType<typeof createArchiveGraph>;
const kindIcon = { doc: FileText, audio: AudioLines, video: Film, image: Image, mail: Mail };
const kindOf = (file: string): Kind => /\.m4a$/.test(file) ? 'audio' : /\.mp4$/.test(file) ? 'video' : /\.(jpg|png)$/.test(file) ? 'image' : /^(Re|Fwd):/.test(file) ? 'mail' : 'doc';
const searches = [
  { chip: 'Contratto via Roma', q: 'Il contratto di via Roma: quando si rinnova?', file: 'Contratto locazione via Roma.pdf', where: 'Pagina 4 · articolo 7', quote: ['…si rinnova ', 'tacitamente per altri quattro anni', ', salvo disdetta inviata sei mesi prima della scadenza…'], related: ['Re: rinnovo contratto', 'Visura catastale.pdf'], time: 0.9 },
  { chip: 'Riunione soci', q: 'Cosa abbiamo deciso con i soci sul preventivo dell’impianto?', file: 'Riunione soci 12 mar.m4a', where: 'Audio · minuto 14:32', quote: ['«…', 'approviamo il preventivo 114', ', a patto di chiudere i lavori entro giugno.»'], related: ['Preventivo 114-2024.pdf', 'Re: preventivo impianto'], time: 1.3 },
  { chip: 'Crepe sul tetto', q: 'Il video del sopralluogo con le crepe sul tetto', file: 'Videoperizia tetto.mp4', where: 'Video · da 02:10', quote: ['«…qui sul lato nord si vedono ', 'due crepe lungo il colmo', '…»'], related: ['Foto danni 07.jpg', 'Nota vocale cantiere.m4a'], time: 1.1 },
  { chip: 'Lettera del 1998', q: 'Quella lettera del 1998 sulla servitù di passaggio', file: 'Scansione lettera 1998.jpg', where: 'Scansione · testo riconosciuto', quote: ['…concede il ', 'diritto di passaggio', ' sul lato nord del fondo…'], related: ['Atto compravendita 2021.pdf', 'Fascicolo 1987.pdf'], time: 1.2 },
];
const seconds = (value: number) => value.toLocaleString('it-IT', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
function FileName({ file, small = false }: { file: string; small?: boolean }) {
  const kind = kindOf(file), Icon = kindIcon[kind];
  return <span className={small ? 'ar-file small' : 'ar-file'}><Icon size={small ? 13 : 18} color={kindColors[kind]} aria-hidden="true"/>{file}</span>;
}

type Search = typeof searches[number];
function Found({ s, compact = false }: { s: Search; compact?: boolean }) {
  return <div className="ar-found">
    <div className="ar-found-head"><FileName file={s.file}/><span className="ar-time">trovato in {seconds(s.time)} s</span></div>
    <span className="ar-where">{s.where}</span>
    {!compact && <><p className="ar-quote">{s.quote[0]}<mark>{s.quote[1]}</mark>{s.quote[2]}</p>
    <div className="ar-related"><span>COLLEGATI</span>{s.related.map(file => <FileName key={file} file={file} small/>)}<span className="ar-simulated">ESEMPIO SIMULATO</span></div></>}
  </div>;
}

type Phase = 'typing' | 'search' | 'found' | 'clear';
// la console fa le domande da sola, una dopo l'altra; i bottoni sotto ne scelgono una. Da telefono è compatta, senza bottoni.
function SearchConsole({ graph, ready, compact = false }: { graph: React.MutableRefObject<Graph | null>; ready: boolean; compact?: boolean }) {
  const [index, setIndex] = useState(0), [phase, setPhase] = useState<Phase>('found'), [chars, setChars] = useState(searches[0].q.length);
  const [held, setHeld] = useState(false), [elapsed, setElapsed] = useState(0), [visible, setVisible] = useState(true), [reduced, setReduced] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const s = searches[index], paused = !visible || reduced;
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)'), update = () => setReduced(media.matches);
    update(); media.addEventListener('change', update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .2 });
    if (box.current) observer.observe(box.current);
    return () => { media.removeEventListener('change', update); observer.disconnect(); };
  }, []);
  useEffect(() => {
    const g = graph.current; if (!ready || !g) return;
    if (phase === 'search') g.scan(); else if (phase === 'found') g.found(s.file, s.related); else g.clear();
  }, [ready, phase, s, graph]);
  useEffect(() => {
    if (paused) return;
    let timer = 0;
    if (phase === 'typing') timer = chars < s.q.length ? window.setTimeout(() => setChars(c => c + 1), chars === 0 ? 300 : s.q[chars - 1] === ' ' ? 70 : 32) : window.setTimeout(() => setPhase('search'), 420);
    else if (phase === 'search') timer = window.setTimeout(() => setPhase('found'), 1150);
    else if (phase === 'found') timer = window.setTimeout(() => setPhase('clear'), held ? 12000 : 6400);
    else timer = window.setTimeout(() => { setIndex(i => (i + 1) % searches.length); setChars(0); setHeld(false); setPhase('typing'); }, 550);
    return () => clearTimeout(timer);
  }, [phase, chars, paused, held, s]);
  useEffect(() => {
    if (phase !== 'search') return;
    const begin = performance.now(), timer = window.setInterval(() => setElapsed(Math.min(s.time, (performance.now() - begin) / 1000 * s.time / .95)), 70);
    return () => { clearInterval(timer); setElapsed(0); };
  }, [phase, s]);
  const choose = (i: number) => { setIndex(i); setChars(searches[i].q.length); setHeld(true); setPhase(reduced ? 'found' : 'search'); };
  return <div className={compact ? 'ar-console-wrap compact' : 'ar-console-wrap'} ref={box}>
    <div className="ar-console" data-phase={phase}>
      {/* le copie invisibili tengono la console sempre alta come la domanda e il risultato più lunghi: niente salti sotto */}
      <div className="ar-query"><Search size={17} aria-hidden="true"/><p className="ar-stack"><span>{phase === 'typing' ? s.q.slice(0, chars) : s.q}<i className="ar-caret" aria-hidden="true"/></span>{searches.map(item => <span key={item.chip} className="ar-ghost" aria-hidden="true">{item.q}</span>)}</p><span className="ar-local-tag"><i/>IN LOCALE</span></div>
      <div className="ar-result ar-stack">
        <div aria-live={held ? 'polite' : 'off'} aria-atomic="true">{phase === 'found' ? <Found key={index} s={s} compact={compact}/>
          : phase === 'search' ? <div className="ar-searching"><span><i/>Cerco tra documenti, audio e video…</span><b>{seconds(elapsed)} s</b></div>
          : <div className="ar-waiting">{compact ? 'Chiedi come faresti a un collega.' : 'Chiedi come faresti a un collega. L’archivio cerca nel contenuto, non solo nei nomi dei file.'}</div>}</div>
        {searches.map(item => <div key={item.chip} className="ar-ghost" aria-hidden="true"><Found s={item} compact={compact}/></div>)}
      </div>
    </div>
    {compact ? <span className="ar-compact-note">ESEMPIO SIMULATO · TOCCA UN FILE PER I SUOI COLLEGAMENTI</span> : <div className="ar-try" role="group" aria-label="Prova una domanda di esempio"><span>PROVA</span>{searches.map((item, i) => <button type="button" key={item.chip} aria-pressed={index === i && phase !== 'typing'} onClick={() => choose(i)}>{item.chip}</button>)}</div>}
  </div>;
}

// la rete della hero: si disegna nella sezione, si centra nello spazio di orbit e si abbassa accanto al testo di copy
function useArchiveGraph() {
  const section = useRef<HTMLElement>(null), canvas = useRef<HTMLCanvasElement>(null), orbit = useRef<HTMLDivElement>(null), copy = useRef<HTMLDivElement>(null);
  const graph = useRef<Graph | null>(null), [ready, setReady] = useState(false);
  useEffect(() => {
    if (!canvas.current || !section.current || !orbit.current || !copy.current) return;
    graph.current = createArchiveGraph(canvas.current, { section: section.current, orbit: orbit.current, copy: copy.current, reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches });
    setReady(true);
    return () => { graph.current?.destroy(); graph.current = null; };
  }, []);
  return { section, canvas, orbit, copy, graph, ready };
}

function ArchiveHero() {
  const { section, canvas, orbit, copy, graph, ready } = useArchiveGraph();
  return <section className="ar-hero" ref={section}>
    <canvas ref={canvas} className="ar-canvas" aria-hidden="true"/>
    <div className="wrap ar-hero-top"><span className="ar-eyebrow"><i/> ARCHIVIO AI / CSD STATION</span><span className="ar-mono">LA MEMORIA DEL TUO STUDIO. A PORTATA DI DOMANDA.</span></div>
    <div className="wrap ar-hero-layout">
      <div className="ar-hero-copy" ref={copy}>
        <h1>Il tuo archivio.<br/><em>Finalmente risponde.</em></h1>
        <p>Costruiamo la memoria della tua attività e la colleghiamo all’intelligenza artificiale: contratti, pratiche, email, scansioni, foto, audio e video diventano un’unica fonte di verità. Chiedi come faresti a un collega e ritrovi il documento in pochi secondi, con la fonte in vista. <strong>Tutti i dati restano in locale, sul tuo hardware.</strong></p>
        <div className="ar-hero-actions"><a className="station-button" href={archiveContact} target="_blank" rel="noreferrer">Raccontami il tuo archivio <ArrowUpRight size={19}/></a><span>Partiamo da come archivi oggi.<br/>Anche se è un armadio di carta.</span></div>
        <ul className="ar-hero-tags"><li><LockKeyhole size={15}/> 100% in locale, sul tuo hardware</li><li><Layers size={15}/> PDF, scansioni, email, audio e video</li><li><Quote size={15}/> Ogni risposta con la sua fonte</li></ul>
      </div>
      <div className="ar-hero-stage"><div className="ar-orbit" ref={orbit}/><SearchConsole graph={graph} ready={ready}/></div>
    </div>
    <div className="wrap ar-legend"><div aria-hidden="true">{(['doc', 'mail', 'image', 'audio', 'video'] as Kind[]).map(kind => <span key={kind}><i style={{ background: kindColors[kind] }}/>{{ doc: 'Documenti', mail: 'Email', image: 'Immagini e scansioni', audio: 'Audio', video: 'Video' }[kind]}</span>)}</div><span className="ar-hint" aria-hidden="true"><b className="ar-hint-mouse">Passa sopra un file per vedere i collegamenti. Trascinalo per spostarlo.</b><b className="ar-hint-touch">Tocca un file per vedere i suoi collegamenti.</b></span><a href="#archivio-tipi">Cosa entra nell’archivio <ArrowDown size={14}/></a></div>
  </section>;
}

// piccoli disegni dei tipi di file, negli stessi colori della rete
function TypeArt({ kind }: { kind: string }) {
  const c = kindColors[kind === 'scan' ? 'doc' : kind as Kind];
  const art: Record<string, JSX.Element> = {
    doc: <><rect x="34" y="6" width="52" height="64" rx="4" fill="none" stroke={c} strokeOpacity=".55"/>{[18, 27, 36, 45, 54].map((y, i) => <rect key={y} x="42" y={y} width={i === 2 ? 36 : 28 + (i % 2) * 8} height="3" rx="1.5" fill={i === 2 ? '#c5f476' : c} fillOpacity={i === 2 ? 1 : .35}/>)}</>,
    scan: <><g transform="rotate(-6 60 38)"><rect x="34" y="6" width="52" height="64" rx="3" fill="none" stroke={c} strokeOpacity=".55"/>{[18, 27, 36, 45, 54].map((y, i) => <rect key={y} x="42" y={y} width={30 + (i % 3) * 4} height="3" rx="1.5" fill={c} fillOpacity={i < 3 ? .55 : .18} strokeDasharray="2 2"/>)}</g><rect x="22" y="40" width="76" height="2" fill="#c5f476"/></>,
    mail: <><rect x="26" y="16" width="68" height="46" rx="5" fill="none" stroke={c} strokeOpacity=".6"/><path d="M27 19l33 24 33-24" fill="none" stroke={c} strokeOpacity=".6"/><circle cx="92" cy="58" r="8" fill="#0f1712" stroke="#c5f476"/><path d="M89 58h6M92 55v6" stroke="#c5f476"/></>,
    audio: <>{Array.from({ length: 22 }, (_, i) => { const h = 6 + Math.abs(Math.sin(i * 1.7) * 26) + (i % 3) * 3; return <rect key={i} x={10 + i * 4.6} y={38 - h / 2} width="2.4" height={h} rx="1.2" fill={i >= 11 && i <= 15 ? '#c5f476' : c} fillOpacity={i >= 11 && i <= 15 ? 1 : .5}/>; })}<text x="72" y="72" fill="#c5f476" fontSize="8" fontFamily="ui-monospace,monospace" textAnchor="middle">14:32</text></>,
    video: <><rect x="20" y="8" width="80" height="46" rx="4" fill="none" stroke={c} strokeOpacity=".6"/><path d="M55 22l14 9-14 9z" fill={c} fillOpacity=".7"/><rect x="20" y="63" width="80" height="2" rx="1" fill={c} fillOpacity=".3"/><rect x="20" y="63" width="30" height="2" rx="1" fill="#c5f476"/><circle cx="50" cy="64" r="3.5" fill="#c5f476"/></>,
    image: <><rect x="24" y="10" width="72" height="56" rx="4" fill="none" stroke={c} strokeOpacity=".6"/><circle cx="78" cy="26" r="6" fill={c} fillOpacity=".6"/><path d="M28 60l20-22 14 14 10-9 20 17" fill="none" stroke={c} strokeOpacity=".75" strokeLinejoin="round"/><rect x="31" y="15" width="26" height="9" rx="2" fill="#c5f476"/></>,
  };
  return <svg viewBox="0 0 120 76" className="ar-type-art" aria-hidden="true">{art[kind]}</svg>;
}
function AnswerCard() {
  return <div className="ar-answer">
    <div className="ar-answer-top"><span className="ar-mono">DOMANDA</span><span className="ar-mono">ESEMPIO SIMULATO</span></div>
    <p className="ar-answer-question">Entro quando dobbiamo mandare la disdetta per via Roma?</p>
    <span className="ar-mono">RISPOSTA</span>
    <p className="ar-answer-text">La disdetta va inviata almeno sei mesi prima della scadenza<sup>1</sup>. Il contratto scade il 31 gennaio 2028: quindi entro il <mark>31 luglio 2027</mark><sup>1</sup>. Il proprietario ha chiesto di parlarne prima di quella data<sup>2</sup>.</p>
    <span className="ar-mono">FONTI</span>
    <ol className="ar-sources"><li><sup>1</sup><FileName file="Contratto locazione via Roma.pdf" small/><small>pag. 4, art. 7</small><span className="ar-open">Apri <ArrowUpRight size={12}/></span></li><li><sup>2</sup><FileName file="Re: rinnovo contratto" small/><small>email del 3 marzo</small><span className="ar-open">Apri <ArrowUpRight size={12}/></span></li></ol>
    <small className="ar-answer-note">Le risposte si verificano sull’originale: per questo la fonte è sempre lì.</small>
  </div>;
}
const types = [
  { kind: 'doc', icon: FileText, title: 'Documenti', text: 'PDF, Word ed Excel letti per intero, non solo dal nome del file.', example: 'es. «la clausola di recesso»' },
  { kind: 'scan', icon: ScanText, title: 'Scansioni e carta', text: 'Le pagine scansionate diventano testo cercabile. Anche quelle di vent’anni fa.', example: 'es. la lettera del 1998' },
  { kind: 'mail', icon: Mail, title: 'Email e allegati', text: 'Messaggi e allegati collegati alla pratica e al cliente giusti.', example: 'es. «documenti mancanti»' },
  { kind: 'audio', icon: AudioLines, title: 'Audio', text: 'Dettature, riunioni e note vocali trascritte: arrivi al minuto esatto.', example: 'es. minuto 14:32' },
  { kind: 'video', icon: Film, title: 'Video', text: 'Sopralluoghi, perizie e riunioni registrate: cerchi una frase, parti dal punto giusto.', example: 'es. da 02:10' },
  { kind: 'image', icon: Image, title: 'Immagini', text: 'Foto, planimetrie e schemi, con le loro note e una descrizione cercabile.', example: 'es. le foto del lato nord' },
];
const sectors = [
  { icon: Scale, name: 'Studi legali e notarili', question: 'Dov’è l’atto con quella servitù di passaggio?', text: 'Atti, fascicoli, precedenti e corrispondenza, cercati per contenuto. Anche l’archivio di carta, una volta scansionato.', result: 'Meno ore tra gli scaffali.' },
  { icon: Stethoscope, name: 'Studi medici e dentistici', question: 'Quando abbiamo fatto l’ultima panoramica a questo paziente?', text: 'Referti, consensi, immagini e note organizzati per paziente, sul computer dello studio.', result: 'L’archivio ritrova. La valutazione clinica resta tua.' },
  { icon: Building2, name: 'PMI', question: 'Che condizioni avevamo fatto a quel cliente nel 2022?', text: 'Preventivi, ordini, manuali, schede tecniche ed email: il sapere dell’azienda non se ne va con le persone.', result: 'Il sapere resta in azienda.' },
  { icon: Landmark, name: 'Pubbliche amministrazioni', question: 'Quale determina citava quel bando regionale?', text: 'Delibere, determine, protocolli e regolamenti, con accessi distinti per ufficio e servizio.', result: 'Requisiti dell’ente verificati prima.' },
];

export default function ArchivePage() {
  return <div className="ar-page">
    <ArchiveHero/>
    <div className="ar-sectors-strip"><div className="wrap"><span>PENSATO PER</span><b><Scale size={18}/> Studi legali e notarili</b><b><Stethoscope size={18}/> Studi medici e dentistici</b><b><Building2 size={18}/> PMI</b><b><Landmark size={18}/> Pubbliche amministrazioni</b></div></div>

    <section className="ar-types wrap" id="archivio-tipi">
      <span className="ar-eyebrow">01 / NON SOLO PDF</span>
      <div className="ar-split"><h2>Tutto ciò che il lavoro produce.<br/><em>In un’unica memoria.</em></h2><p>Un archivio vero non è fatto solo di PDF. Ci sono le email, le scansioni di vent’anni fa, le note vocali, le foto del sopralluogo, le riunioni registrate. L’AI le legge, le trascrive e le collega tra loro: <strong>cerchi una volta, in tutto.</strong></p></div>
      <div className="ar-type-grid">{types.map(t => <article key={t.kind}><TypeArt kind={t.kind}/><div className="ar-type-title"><t.icon size={18}/><h3>{t.title}</h3></div><p>{t.text}</p><span className="ar-mono">{t.example}</span></article>)}</div>
    </section>

    <section className="ar-truth" id="archivio-fonte"><div className="wrap ar-truth-layout">
      <div className="ar-truth-copy">
        <span className="ar-eyebrow">02 / UNA FONTE DI VERITÀ</span>
        <h2>Una risposta.<br/><em>Con le prove in mano.</em></h2>
        <p>L’AI non risponde a memoria: cerca nei tuoi documenti e cita file, pagina o minuto. Apri l’originale e controlli in un clic. È configurata per dirti quando non trova un riscontro.</p>
        <ul>
          <li><Search size={20}/><div><h3>Cerca per significato</h3><p>Chiedi «proroga» e trova anche «rinnovo». Non serve ricordare le parole esatte, né il nome del file.</p></div></li>
          <li><Users size={20}/><div><h3>Ognuno vede il suo</h3><p>Permessi per persona o per ufficio: la ricerca mostra solo ciò che puoi aprire.</p></div></li>
          <li><RefreshCw size={20}/><div><h3>Si aggiorna da sola</h3><p>I file nuovi nelle cartelle concordate entrano nella memoria senza passaggi in più.</p></div></li>
        </ul>
      </div>
      <AnswerCard/>
    </div></section>

    <section className="ar-sectors wrap" id="archivio-settori">
      <span className="ar-eyebrow">03 / PER CHI</span>
      <div className="ar-split"><h2>Ogni attività ha la sua memoria.<br/><em>La facciamo parlare.</em></h2><p>Dove i documenti si accumulano da anni e ritrovarli costa tempo: studi professionali, aziende, uffici pubblici. Si parte dalle domande che fate ogni settimana.</p></div>
      <div className="ar-sector-list">{sectors.map((sector, i) => <article key={sector.name}><span className="ar-index">0{i + 1}</span><div className="ar-sector-name"><sector.icon size={22} strokeWidth={1.5}/><h3>{sector.name}</h3></div><p className="ar-sector-question">«{sector.question}»</p><p>{sector.text}</p><span className="ar-sector-result">{sector.result}</span></article>)}</div>
      <div className="ar-sector-foot"><p>Per dati sanitari ed enti pubblici valutiamo prima ruoli, misure di sicurezza e requisiti con il titolare del trattamento e, se presente, con il DPO.</p><Link to={osPaths.notaro}>Hai uno studio notarile? Guarda la demo di Notaro OS <ArrowUpRight size={16}/></Link></div>
    </section>

    <section className="ar-local" id="archivio-locale"><div className="wrap ar-local-layout">
      <div className="ar-local-copy">
        <span className="ar-eyebrow">04 / I DATI RESTANO A CASA</span>
        <h2>I tuoi dati.<br/>Il tuo hardware.<br/><em>La tua memoria.</em></h2>
        <p>Archivio, indice e modello di intelligenza artificiale lavorano su un computer della tua attività: un piccolo server dedicato o l’hardware che hai già, se adatto. <strong>I documenti non vengono inviati a servizi AI esterni</strong> e la ricerca funziona anche senza internet.</p>
        <p>Backup, accesso da remoto e assistenza si concordano prima, dentro il perimetro che decidi tu.</p>
      </div>
      <div className="ar-perimeter" aria-label="Schema: archivio, indice e modello AI dentro la rete dello studio, nessun invio a servizi AI esterni">
        <svg className="ar-perimeter-line" aria-hidden="true"><rect x="1" y="1" rx="26"/></svg>
        <span className="ar-perimeter-label"><ShieldCheck size={14}/> IL TUO STUDIO · RETE LOCALE</span>
        <div className="ar-perimeter-row"><div><FolderTree size={20}/><b>Archivio</b><small>i tuoi file, dove sono</small></div><i/><div><Search size={20}/><b>Indice</b><small>testo, trascrizioni, collegamenti</small></div><i/><div><Server size={20}/><b>Modello AI</b><small>sul tuo hardware</small></div></div>
        <div className="ar-perimeter-people"><Users size={18}/> Le persone dello studio, ognuna con i suoi permessi</div>
        <div className="ar-perimeter-out"><WifiOff size={16}/><s>Servizi AI esterni</s><span>nessun invio</span></div>
      </div>
    </div></section>

    <section className="ar-method wrap" id="archivio-metodo">
      <span className="ar-eyebrow">05 / COME LAVORIAMO</span>
      <h2>Dal caos delle cartelle.<br/><em>A una memoria che risponde.</em></h2>
      <ol>{[
        ['Mappiamo l’archivio', 'Dove sono oggi i file: cartelle, NAS, email, carta. Decidiamo cosa entra e chi può vedere cosa.'],
        ['Scegliamo l’hardware', 'Un piccolo server dedicato o i computer che hai già, dimensionati su volumi e persone. Prima di acquistare.'],
        ['Costruiamo la memoria', 'Leggiamo, trascriviamo e indicizziamo. I file nuovi entrano da soli dalle cartelle concordate.'],
        ['Proviamo con le tue domande', 'Facciamo le domande vere del tuo lavoro e controlliamo insieme risposte e fonti. Poi ti mostro come usarlo.'],
      ].map(([title, text], i) => <li key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
    </section>

    <section className="ar-faq wrap"><div><span className="ar-eyebrow">PRIMA DI COMINCIARE</span><h2>Domande giuste.<br/><em>Risposte con la fonte.</em></h2></div><ServiceAnswers mode="archivio"/></section>
    <section className="ar-contact" id="archivio-contatto"><div className="wrap">
      <span className="ar-eyebrow"><i/> IL PROSSIMO PASSO</span>
      <h2>Cosa vorresti<br/><em>ritrovare per primo?</em></h2>
      <div className="ar-contact-bottom"><div><p>Raccontami che attività hai, dove tieni oggi i documenti e cosa cerchi più spesso. Partiamo da lì, prima di toccare un file.</p><small>Nel primo messaggio non allegare documenti o dati personali.</small></div><div><a className="station-button" href={archiveContact} target="_blank" rel="noreferrer">Raccontami il tuo archivio <ArrowUpRight size={19}/></a><a className="ar-contact-email" href="mailto:carlo@csd-station.it?subject=Archivio%20AI">Oppure scrivimi un’email <ChevronRight size={16}/></a></div></div>
      <div className="ar-contact-legal"><Link to="/terms-of-service/#archivio">Condizioni del servizio <ArrowUpRight size={13}/></Link><Link to="/privacy-policy/#archivio">Privacy e documenti dello studio <ArrowUpRight size={13}/></Link></div>
    </div></section>
  </div>;
}

export function ArchiveMobile() {
  const { section, canvas, orbit, copy, graph, ready } = useArchiveGraph();
  return <div className="ar-page arm-page">
    <section className="arm-intro" ref={section} id="archivio-metodo" aria-labelledby="arm-title">
      <canvas ref={canvas} className="ar-canvas" aria-hidden="true"/>
      <div className="wrap arm-copy" ref={copy}><span className="ar-eyebrow"><i/> ARCHIVIO AI / IN LOCALE</span><h1 id="arm-title">Il tuo archivio.<br/><em>Finalmente risponde.</em></h1></div>
      <div className="arm-orbit" ref={orbit}/>
      <div className="wrap arm-stage"><SearchConsole graph={graph} ready={ready} compact/></div>
      <div className="wrap arm-bottom">
        <p>Documenti, scansioni, email, audio e video in un’unica memoria collegata all’AI. Chiedi come a un collega: ritrovi il file in pochi secondi, con la fonte.</p>
        <div className="arm-sectors" aria-label="Pensato per"><span>Studi legali e notarili</span><span>Studi medici e dentistici</span><span>PMI</span><span>Pubbliche amministrazioni</span></div>
        <a className="station-button" href={archiveContact} target="_blank" rel="noreferrer">Raccontami il tuo archivio <ArrowUpRight size={18}/></a>
        <span className="arm-promise">Partiamo da come archivi oggi. Anche se è un armadio di carta.</span>
        <div className="arm-trust"><span><LockKeyhole size={15}/> 100% in locale, sul tuo hardware</span><span><Quote size={15}/> Ogni risposta con la fonte</span></div>
        <a href="#archivio-tipi" className="arm-scroll">Cosa entra nell’archivio <ArrowDown size={15}/></a>
      </div>
    </section>

    <section className="arm-types" id="archivio-tipi" aria-labelledby="arm-types-title"><div className="wrap">
      <span className="ar-eyebrow">02 / NON SOLO PDF</span>
      <h2 id="arm-types-title">Tutto ciò che il lavoro produce.<br/><em>Con la fonte in mano.</em></h2>
      <ul className="arm-type-list">{types.map(t => <li key={t.kind}><t.icon size={19} color={kindColors[t.kind === 'scan' ? 'doc' : t.kind as Kind]}/><div><h3>{t.title}</h3><p>{t.text}</p></div></li>)}</ul>
      <AnswerCard/>
    </div></section>

    <section className="arm-contact wrap" id="archivio-contatto" aria-labelledby="arm-contact-title">
      <span className="ar-eyebrow">03 / IL TUO PROSSIMO PASSO</span>
      <h2 id="arm-contact-title">I tuoi dati.<br/><em>Il tuo hardware.</em></h2>
      <div className="arm-local" id="archivio-locale"><ShieldCheck size={24}/><div><h3>L’AI entra. I documenti restano.</h3><p>Archivio, indice e modello AI lavorano su un computer della tua attività. Nessun invio a servizi AI esterni; backup e assistenza si concordano prima.</p></div></div>
      <details className="arm-questions"><summary>File, settori e altre domande <ChevronRight size={18}/></summary><ServiceAnswers mode="archivio"/></details>
      <p className="arm-contact-copy">Che attività hai? Dove tieni oggi i documenti? Raccontami cosa cerchi più spesso.</p>
      <a className="station-button" href={archiveContact} target="_blank" rel="noreferrer">Parliamone su WhatsApp <ArrowUpRight size={18}/></a>
      <p className="arm-first-message">Nel primo messaggio descrivi l’archivio, senza allegare documenti o dati personali. Hardware, digitalizzazione e integrazioni si concordano prima.</p>
      <div className="arm-legal"><Link to="/privacy-policy/#archivio">Privacy e documenti <ArrowUpRight size={13}/></Link><Link to="/terms-of-service/#archivio">Condizioni del servizio <ArrowUpRight size={13}/></Link></div>
    </section>
  </div>;
}
