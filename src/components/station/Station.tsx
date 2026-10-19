import { useEffect, useState, useSyncExternalStore } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, ArrowDown, Zap, Workflow, ScanLine, Boxes, ShieldCheck, Check, Mail, FileText, Database, Activity, Radio, Play, RotateCcw, Plus, Minus, BarChart3, Nfc, Cpu, GraduationCap } from 'lucide-react';
import portrait from '@/assets/profile-web.jpg';
import card from '@/assets/nfc-card.jpg';
import { getOsProduct, getServiceMode, osPaths, servicePaths } from '@/seo/routes';
import { consultingIntro, nfcIntro } from '@/seo/content';
import { ServiceAnswers } from './ServiceAnswers';
import plate from '@/assets/nfc-plate.png';
import stand from '@/assets/nfc-stand.png';
import './station.css';
import { GuidedDemo, OttoHero } from './StationExperiences';
import NfcTapDemo from './NfcTapDemo';
import { MobileConsulting, MobileNfc } from './MobileLanding';
import Training, { trainingContact } from './Training';
import { OttoIcon } from './OttoIcon';
const OttoGlyph = ({ size = 18 }: { size?: number }) => <OttoIcon mood="read" size={size}/>;

const whatsapp = (message: string) => `https://wa.me/393518628203?text=${encodeURIComponent(message)}`;
const consultingContact = whatsapp('Ciao Carlo! Vorrei informazioni sull’intelligenza artificiale e sulle vostre consulenze informatiche.');
const processContact = whatsapp('Ciao Carlo! Vorrei capire come automatizzare le attività ripetitive nella mia attività. Possiamo parlarne?');
const skills = 'https://www.skills.google/public_profiles/4a3ed6b8-9f55-463f-83a6-8c218717a8fd';
export function Brand() { return <span className="station-brand"><span className="brand-symbol"><i/><i/><i/></span><span>CSD<span className="brand-light"> Station</span><small>CONSULENZA · AI · NFC</small></span></span>; }
// Le demo OS in un'unica voce: l'etichetta DEMO apre una nuvoletta per scegliere Restaurant OS o Notaro OS.
// I link restano nell'HTML anche a nuvoletta chiusa, così i motori di ricerca li trovano.
function DemoMenu({ active }: { active: ReturnType<typeof getOsProduct> }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => { if (e instanceof KeyboardEvent ? e.key === 'Escape' : !(e.target as Element).closest?.('.nav-demo')) setOpen(false); };
    document.addEventListener('click', close); document.addEventListener('keydown', close);
    return () => { document.removeEventListener('click', close); document.removeEventListener('keydown', close); };
  }, [open]);
  const items = [
    { key: 'restaurant', to: osPaths.restaurant, name: 'Restaurant OS', note: 'Sala, cucina, delivery e cassa collegati' },
    { key: 'notaro', to: osPaths.notaro, name: 'Notaro OS', note: 'Posta, pratiche e scadenze con l’AI al centro' },
  ] as const;
  return <div className={`nav-demo ${open ? 'open' : ''} ${active ? 'active' : ''}`}>
    <button type="button" className="nav-demo-tag" aria-expanded={open} aria-controls="nav-demo-pop" onClick={() => setOpen(o => !o)}>DEMO</button>
    <div className="nav-demo-pop" id="nav-demo-pop" hidden={!open}>
      <span className="nav-demo-head">Prova un sistema dal vivo</span>
      {items.map(i => <Link key={i.key} className={active === i.key ? 'active' : ''} aria-current={active === i.key ? 'page' : undefined} to={i.to}><b>{i.name}</b><small>{i.note}</small></Link>)}
    </div>
  </div>;
}
export function StationHeader() {
  const location = useLocation();
  const os = getOsProduct(location.pathname);
  const mode = os ? null : getServiceMode(location.pathname, location.search);
  const contactHref = os ? whatsapp(`Ciao Carlo! Vorrei avere più informazioni su ${os === 'restaurant' ? 'CS Restaurant OS' : 'CS Notaro OS'}.`) : mode === 'training' ? trainingContact : mode === 'nfc' ? whatsapp('Ciao Carlo! Vorrei informazioni sulle card e sui prodotti NFC di CSD Station.') : consultingContact;
  return <header className="station-header"><div className="station-nav wrap">
    <Link to="/" aria-label="CSD Station, homepage" onClick={() => window.scrollTo({top: 0, behavior: 'instant' as ScrollBehavior})}><Brand/></Link>
    <nav className="station-links" id="station-navigation" aria-label="Navigazione principale">
      <Link className={mode === 'automazioni' ? 'active' : ''} aria-current={mode === 'automazioni' ? 'page' : undefined} to={servicePaths.automazioni}>Consulenza AI</Link>
      <Link className={mode === 'training' ? 'active' : ''} aria-current={mode === 'training' ? 'page' : undefined} to={servicePaths.training}>Training</Link>
      <Link className={mode === 'nfc' ? 'active' : ''} aria-current={mode === 'nfc' ? 'page' : undefined} to={servicePaths.nfc}>Card NFC <span className="nav-dot"/></Link>
      <DemoMenu active={os}/>
    </nav>
    <a className="station-button small nav-contact" href={contactHref} target="_blank" rel="noreferrer">Parliamone <ArrowUpRight size={16}/></a>
  </div></header>;
}

export function StationFooter() { return <footer className="station-footer"><div className="wrap footer-top"><Link to="/" aria-label="CSD Station homepage"><Brand/></Link><p>Tecnologia che lavora.<br/>Tempo che torna tuo.</p><div><a href="mailto:carlo@csd-station.it">carlo@csd-station.it <ArrowUpRight size={16}/></a><span>Dalla Toscana, in tutta Italia.</span></div></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} CSD Station · Carlo Galli · P.IVA 01630510525</span><div><Link to="/privacy-policy/">Privacy consulenza</Link><Link to="/nfc/privacy-policy/">Privacy NFC</Link><Link to="/terms-of-service/">Termini consulenza</Link><Link to="/nfc/terms-of-service/">Termini NFC</Link><Link to="/cookie-policy/">Cookie</Link></div></div></footer>; }
function Eyebrow({children}: {children: React.ReactNode}) { return <div className="station-eyebrow"><span/>{children}</div>; }
function Contact({nfc = false}: {nfc?: boolean}) { return <section className={`contact-section ${nfc ? 'nfc-contact' : ''}`} id={nfc ? 'nfc-booking' : 'booking'}><div className="wrap contact-inner"><div><Eyebrow>IL PROSSIMO PASSO È SEMPLICE</Eyebrow><h2>{nfc ? <>La tua prossima recensione<br/>inizia con un tap.</> : <>Partiamo da ciò che<br/>ti fa perdere tempo.</>}</h2><p>{nfc ? 'Scegli il formato. Alla configurazione pensiamo noi.' : 'Raccontami su WhatsApp come lavori e dove perdi tempo. Capiamo insieme da dove cominciare.'}</p></div><div className="contact-actions"><a className="station-button" href={nfc ? whatsapp('Ciao Carlo! Vorrei informazioni sui prodotti NFC di CSD Station.') : processContact} target="_blank" rel="noreferrer">{nfc ? 'Scrivimi su WhatsApp' : 'Parliamone su WhatsApp'}<ArrowUpRight size={18}/></a><span>{nfc ? 'Preventivo e dettagli di spedizione su richiesta' : 'Un contatto diretto con Carlo, senza appuntamento'}</span><a className="contact-email" href="mailto:carlo@csd-station.it">Oppure scrivimi un’email <ArrowRight size={15}/></a></div></div></section>; }
function FAQ({nfc = false}: {nfc?: boolean}) {
  return <section className="faq-section wrap"><div><Eyebrow>PRIMA DI COMINCIARE</Eyebrow><h2>Qualche risposta,<br/>senza complicazioni.</h2></div><ServiceAnswers mode={nfc ? 'nfc' : 'automazioni'}/></section>;
}

function TimeCalculator() {
  const [minutes, setMinutes] = useState(30);
  const [people, setPeople] = useState(2);
  const hours = minutes * people * 22 / 60;
  return <div className="time-calculator"><div className="calc-top"><span><Activity size={16}/> IL TEMPO HA UN VALORE</span><small>SIMULAZIONE</small></div><div className="calc-content"><div><label htmlFor="minutes">Minuti ripetitivi al giorno <strong>{minutes} min</strong></label><input id="minutes" type="range" min="10" max="120" step="5" value={minutes} onChange={e => setMinutes(Number(e.target.value))}/><label htmlFor="people">Persone coinvolte <strong>{people}</strong></label><input id="people" type="range" min="1" max="10" value={people} onChange={e => setPeople(Number(e.target.value))}/></div><div className="calc-result" aria-live="polite"><strong>{hours.toLocaleString('it-IT', {maximumFractionDigits: 1})}<span>ore / mese</span></strong><p>dedicate a queste attività</p></div></div><p className="calc-note">Stima su 22 giorni lavorativi. È il tempo impegnato, non un risparmio garantito: analizziamo insieme quale parte si può recuperare.</p></div>;
}
function Home() {
 return <>
  <section className="station-hero"><div className="hero-ambient"/><div className="wrap hero-layout"><div className="hero-copy"><Eyebrow>CONSULENZA AI E INFORMATICA PER PMI</Eyebrow><h1>Meno lavoro<br/>ripetitivo.<br/><span>Più possibilità.</span></h1><p>{consultingIntro}</p><div className="hero-actions"><a className="station-button" href={processContact} target="_blank" rel="noreferrer">Troviamo da dove partire <ArrowUpRight size={18}/></a><a className="text-link" href="#demo">Guarda come <ArrowDown size={16}/></a></div><div className="hero-note"><span className="avatar-mini"><img src={portrait} alt="Carlo Galli"/></span><span>Parli direttamente con Carlo.<br/><b>Scrivimi direttamente su WhatsApp.</b></span></div></div><div className="hero-console"><OttoHero/></div></div><div className="wrap hero-bottom"><span>UNA SOLA STATION. PIÙ MODI DI CRESCERE.</span><a href="#services">Esplora le soluzioni <ArrowDown size={14}/></a></div></section>
  <div className="expertise-strip"><div className="wrap"><span>IL TUO LAVORO, CONNESSO.</span><b><OttoIcon mood="happy" size={19}/> Intelligenza artificiale</b><b><span className="google-g">G</span> Ecosistema Google</b><b><Workflow size={19}/> Automazioni su misura</b><b><Nfc size={19}/> Tecnologia NFC</b></div></div>
  <section className="solutions-section wrap" id="services"><div className="section-heading"><div><Eyebrow>TRE PERCORSI. UN UNICO OBIETTIVO.</Eyebrow><h2>Fai spazio a ciò<br/>che conta davvero.</h2></div><p>Che tu voglia migliorare il lavoro di ogni giorno o rendere più semplice il contatto con i clienti, partiamo dal risultato.</p></div><div className="solution-grid"><a className="solution-card solution-ai" href="#demo"><div className="solution-top"><span>01 / CONSULENZA & AI</span><ArrowUpRight/></div><div className="solution-art mini-workflow" aria-hidden="true"><span><Mail/></span><i/><span className="mini-core"><Workflow size={36}/></span><i/><span><Check/></span><div className="mini-orbit"/></div><h3>Il tuo lavoro.<br/>Una marcia in più.</h3><p>Processi chiari, dati organizzati e automazioni costruite intorno a te.</p><div className="solution-tags"><span>AI & Google</span><span>Software & hardware</span><span>Processi & dati</span></div><div className="solution-link">Scopri cosa possiamo migliorare <ArrowRight size={18}/></div></a><Link className="solution-card solution-nfc" to={servicePaths.nfc}><div className="solution-top"><span>02 / CARD & PRODOTTI NFC</span><ArrowUpRight/></div><div className="solution-art nfc-art"><div className="decor-nfc-card"><span>CSD STATION <Nfc size={24}/></span><b>Un piccolo gesto.<br/>Una nuova connessione.</b><span className="decor-stars">★★★★★</span></div><div className="tap-circle"><ScanLine size={28}/></div></div><h3>Un tap.<br/>E sei più vicino.</h3><p>Card, plate e stand per portare i clienti alla tua pagina di recensioni Google.</p><div className="solution-tags"><span>Pronti all’uso</span><span>Report inclusi</span><span>Una tantum</span></div><div className="solution-link">Esplora i prodotti NFC <ArrowRight size={18}/></div></Link><Link className="training-service-link" to={servicePaths.training}><GraduationCap size={38}/><div><span>03 / TRAINING AI PER AZIENDE</span><h3>Le competenze crescono. Insieme.</h3><p>Formazione su misura per usare l’AI nel lavoro del tuo team, con attenzione a dati e buone prassi.</p></div><b>Scopri i training <ArrowRight size={18}/></b></Link></div></section>
  <section className="process-demo" id="demo"><div className="wrap"><div className="section-heading"><div><Eyebrow>OTTO TI FA VEDERE COME</Eyebrow><h2>Guarda il lavoro cambiare.<br/><span>Un passaggio alla volta.</span></h2></div><p>Una richiesta, un documento, un oggetto in magazzino. Otto ti accompagna dal problema al risultato, e ti mostra dove serve ancora il tuo giudizio.</p></div><GuidedDemo/><TimeCalculator/></div></section>
  <section className="method-section wrap" id="metodo"><div className="section-heading"><div><Eyebrow>IL METODO CSD STATION</Eyebrow> <h2>Prima capiamo.<br/>Poi costruiamo.</h2></div><p>Non serve avere già tutte le risposte. Anche un foglio bianco è un buon punto di partenza.</p></div><div className="method-grid">{[{n:'01',title:'Ascoltiamo',text:'Mi racconti come lavori. Individuiamo i passaggi che ti costano tempo e le informazioni che si perdono.'},{n:'02',title:'Mettiamo ordine',text:'Disegniamo il processo, scegliamo cosa tracciare e definiamo strumenti, priorità e obiettivi.'},{n:'03',title:'Colleghiamo',text:'Realizziamo la soluzione: automazioni, AI, software o hardware. Con attenzione ad accessi e gestione dei dati.'},{n:'04',title:'Verifichiamo',text:'Proviamo il flusso, ti accompagno nell’utilizzo e valutiamo insieme cosa migliorare.'}].map(s=><div className="method-step" key={s.n}><span>{s.n}</span><h3>{s.title}</h3><p>{s.text}</p></div>)}</div></section>
  <section className="capabilities-section"><div className="wrap capabilities-inner"><div><Eyebrow>UNA VISIONE D’INSIEME</Eyebrow><h2>La tecnologia giusta.<br/>Nel posto giusto.</h2><p>La consulenza collega le esigenze della tua attività agli strumenti che possono davvero aiutarti.</p></div><div className="capability-list">{[{icon:OttoGlyph,title:'AI & ecosistema Google',text:'Intelligenza artificiale applicata a documenti, informazioni e attività quotidiane. Integrazioni con gli strumenti Google quando sono adatti al progetto.'},{icon:Cpu,title:'Software, hardware & NFC',text:'Dagli strumenti di lavoro all’inventario: sistemi per raccogliere dati, identificare oggetti e tenere traccia di ciò che succede.'},{icon:ShieldCheck,title:'Dati, privacy & consapevolezza',text:'Gestione dei dati e accessi considerati fin dall’inizio. Per gli aspetti legali, valutiamo il coinvolgimento di professionisti abilitati.'}].map(c=><article key={c.title}><c.icon size={25}/><div><h3>{c.title}</h3><p>{c.text}</p></div><ArrowUpRight size={18}/></article>)}</div></div></section>
  <section className="about-section wrap" id="about"><div className="portrait-wrap"><img src={portrait} alt="Carlo Galli, fondatore di CSD Station" loading="lazy"/><span><i/> IL TUO PUNTO DI RIFERIMENTO</span></div><div className="about-copy"><Eyebrow>DIETRO LA STATION, UNA PERSONA</Eyebrow><h2>Piacere, Carlo.<br/><span>Partiamo dal tuo lavoro.</span></h2><p>Sono Carlo Galli, fondatore di CSD Station. Mi occupo di consulenza informatica, automazioni e intelligenza artificiale, con particolare attenzione all’ecosistema Google.</p><p>Mi interessa capire come funziona la tua attività e costruire qualcosa che ti sia utile ogni giorno. Dall’idea iniziale alla scelta degli strumenti, hai un interlocutore diretto.</p><a className="credential-link" href={skills} target="_blank" rel="noreferrer"><span className="google-g">G</span><span>Formazione e competenze Google<small>Esplora il mio profilo Google Skills</small></span><ArrowUpRight size={20}/></a></div></section>
  <FAQ/><Contact/>
 </>;
}
const products = [{name:'Card NFC', price:'19,90 €', image:card, description:'Sempre con te. Perfetta da presentare al cliente al momento giusto.'}, {name:'Plate adesiva NFC',price:'34,90 €',image:plate, description:'Una postazione fissa, senza ingombro. Da applicare su una superficie adatta.'}, {name:'Stand NFC',price:'39,90 €',image:stand,description:'In bella vista sul banco. Un invito semplice a lasciare una recensione.'}];
function NfcPage() {
 const [selected, setSelected] = useState(0);
 const product = products[selected];
 return <>
 <section className="nfc-hero"><div className="wrap nfc-hero-layout"><div><Eyebrow>CARD NFC PER RECENSIONI GOOGLE</Eyebrow><h1>Un piccolo tap.<br/><span>Una grande<br/>connessione.</span></h1><p>{nfcIntro}</p><a className="station-button" href="#prodotti">Scegli il tuo formato <ArrowDown size={18}/></a><div className="nfc-benefits"><span><Check size={15}/> Un solo pagamento</span><span><Check size={15}/> Report mensili inclusi</span></div></div><div className="nfc-display"><div className="product-orbit"/><span className="product-overline">CONNESSIONI REALI. CON UN GESTO.</span><div className="product-image"><img className={selected === 1 ? "product-plate" : selected === 2 ? "product-stand" : "product-card-image"} src={product.image} alt={product.name + ' per recensioni Google'}/></div><span className="product-float"><Nfc size={18}/> NFC + QR CODE</span><div className="product-selector" role="group" aria-label="Anteprima formato NFC">{products.map((p,i)=><button key={p.name} aria-pressed={selected === i} onClick={()=>setSelected(i)} className={selected===i?'selected':''}>{p.name.replace(' NFC','')}</button>)}</div><div className="product-caption"><span>{product.name}</span><b>{product.price}</b></div></div></div></section>
 <div className="expertise-strip nfc-strip"><div className="wrap"><span>PENSATO PER LA TUA ATTIVITÀ</span><b>Ristoranti & bar</b><b>Negozi</b><b>Studi professionali</b><b>Ospitalità & servizi</b></div></div>
 <section className="tap-section wrap"><div><Eyebrow>DAL BANCO ALLO SMARTPHONE</Eyebrow><h2>Il percorso più breve<br/>tra “grazie” e<br/><span>“ti lascio una recensione”.</span></h2><p>Nessun indirizzo da dettare. Il cliente apre il collegamento alla tua scheda Google con NFC, oppure inquadra il QR code.</p><ol className="tap-steps"><li><span>01</span> Avvicina lo smartphone o scansiona il QR.</li><li><span>02</span> Apri la pagina della tua attività.</li><li><span>03</span> Lascia una recensione, in libertà.</li></ol><small>NFC richiede un dispositivo compatibile. Per pubblicare su Google serve un account.</small></div><NfcTapDemo/></section>
 <section className="product-section" id="prodotti"><div className="wrap"><div className="section-heading"><div><Eyebrow>TROVA IL TUO FORMATO</Eyebrow><h2>Stessa semplicità.<br/>Tre modi di usarla.</h2></div><p>Configurazione, QR code e report mensili inclusi. Scegli il supporto più adatto al tuo spazio.</p></div><div className="products-grid">{products.map((p,i)=><article className={`product-card ${i===2?'product-card-stand':''}`} key={p.name}><div className={`catalog-image ${i===2?'catalog-image-stand':''}`}><img src={p.image} alt={p.name} loading="lazy"/><span>0{i+1}</span></div><div className="product-card-content"><h3>{p.name}</h3><p>{p.description}</p><div className="price-row"><strong>{p.price}</strong><span>una tantum</span></div><a className="station-button" href={whatsapp(`Ciao Carlo! Mi interessa ${p.name} (${p.price}) di CSD Station. Vorrei informazioni su configurazione e spedizione.`)} target="_blank" rel="noreferrer">Richiedi {i===0?'la card':i===1?'la plate':'lo stand'} <ArrowUpRight size={17}/></a></div></article>)}</div><p className="catalog-note">Per quantità, personalizzazioni e costi di spedizione, richiedi un preventivo prima dell’ordine.</p></div></section>
 <section className="nfc-included wrap" id="nfc-value"><div className="section-heading"><div><Eyebrow>OLTRE IL SUPPORTO</Eyebrow><h2>Il valore continua.<br/>Anche dopo il tap.</h2></div><p>Il supporto è solo l’inizio. La configurazione e i report rendono il servizio completo.</p></div><div className="included-grid">{[{icon:ScanLine,title:'Pronto per la tua attività',text:'Configuriamo il collegamento alla tua scheda Google e il QR code.'},{icon:BarChart3,title:'Report mensili inclusi',text:'Ricevi le metriche di utilizzo del collegamento per capire quando viene aperto.'},{icon:Zap,title:'Nessun canone mensile',text:'Acquisto una tantum. I dettagli del servizio sono nei termini dedicati ai prodotti NFC.'}].map(v=><article key={v.title}><v.icon size={28}/><h3>{v.title}</h3><p>{v.text}</p></article>)}</div></section>
 <div className="wrap nfc-crosslink"><div><span>HAI IN MENTE UN ALTRO UTILIZZO?</span><h3>L’NFC può anche organizzare il tuo lavoro.</h3><p>Inventario, identificazione di oggetti, tracciamento: progettiamo una soluzione dedicata.</p></div><Link className="text-link" to={servicePaths.automazioni}>Scopri la consulenza <ArrowUpRight size={18}/></Link></div>
 <FAQ nfc/><Contact nfc/>
 </>;
}
const compactQuery = '(max-width: 767px)';
function subscribeCompact(callback: () => void) {
 const media = window.matchMedia(compactQuery);
 media.addEventListener('change', callback);
 return () => media.removeEventListener('change', callback);
}

export default function Station() {
 const compact = useSyncExternalStore(subscribeCompact, () => window.matchMedia(compactQuery).matches, () => false);
 const location = useLocation();
 const mode = getServiceMode(location.pathname, location.search);
 useEffect(() => {
   if (location.hash) { const timer = setTimeout(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' as ScrollBehavior : 'smooth'}), 50); return () => clearTimeout(timer); }
   window.scrollTo({top:0, behavior:'instant' as ScrollBehavior});
 }, [mode, location.pathname, location.hash, location.key]);
 useEffect(() => {
   const isDark = compact || mode === 'training';
   const bg = isDark ? '#152016' : mode === 'nfc' ? '#131b13' : '#f6f7f2';
   document.documentElement.style.backgroundColor = bg;
   document.body.style.backgroundColor = bg;
 }, [compact, mode]);
 return <div className={`station-site ${mode === 'nfc' ? 'nfc-site' : mode === 'training' ? 'training-site' : ''} ${compact ? 'compact-site' : ''}`}><a className="station-skip" href="#main-content">Vai al contenuto</a><StationHeader/><main id="main-content">{mode === 'training' ? <Training/> : compact ? mode === 'nfc' ? <MobileNfc products={products} whatsapp={whatsapp}/> : <MobileConsulting contact={processContact} skills={skills}/> : mode === 'nfc' ? <NfcPage/> : <Home/>}</main><StationFooter/></div>;
}
