import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, CheckCheck, FileSpreadsheet, FolderOpen, Handshake, MessageSquare, RotateCcw, ShieldCheck } from 'lucide-react';
import { leadIntro } from '@/seo/content';
import { OttoIcon } from './OttoIcon';
import { OttoHero } from './StationExperiences';
import './mobile-landing.css';
import { ServiceAnswers } from './ServiceAnswers';
import './lead.css';

export const leadContact = `https://wa.me/393518628203?text=${encodeURIComponent('Ciao Carlo! Vorrei riattivare una lista di miei contatti già interessati. Possiamo valutare provenienza della lista, obiettivo e compenso sul risultato?')}`;
const stages = [
  { label: 'La tua lista', title: 'C’è già stato un primo interesse.', description: 'Un preventivo rimasto in sospeso. Una richiesta di tempo fa. Partiamo dai contatti che hai già, verificando che possano essere ricontattati.' },
  { label: 'Il ricontatto', title: 'Riprendiamo il filo giusto.', description: 'Concordiamo il messaggio, il canale consentito e l’offerta. Poi ci occupiamo del ricontatto per conto della tua attività, con un contesto riconoscibile.' },
  { label: 'La risposta', title: 'Una conversazione torna viva.', description: 'Raccogliamo le risposte, rispettiamo chi non vuole essere ricontattato e ti riportiamo le opportunità che meritano di essere seguite.' },
  { label: 'Il risultato', title: 'Il valore si verifica insieme.', description: 'Il contatto torna cliente secondo i criteri concordati. Solo allora matura la piccola quota di valore prevista dall’accordo: il nostro interesse coincide con il tuo.' },
];

function LeadScene({ index }: { index: number }) {
  if (index === 0) return <div className="lead-list-scene">
    <div className="lead-file"><span><FileSpreadsheet size={25}/></span><div><b>contatti_da_riprendere.xlsx</b><small>Il tuo archivio, il nostro punto di partenza</small></div><FolderOpen size={18}/></div>
    <div className="lead-table"><div><span>CONTATTO</span><span>DA DOVE RIPARTIRE</span></div><div><b><i>MA</i>Martina</b><span>Preventivo in sospeso</span></div><div><b><i>LU</i>Luca</b><span>Richiesta di informazioni</span></div><div className="lead-excluded"><b><i>AN</i>Anna</b><span>Opposizione · esclusa</span></div></div>
    <p className="lead-scene-note"><ShieldCheck size={15}/> Prima verifichiamo origine e possibilità di ricontatto.</p>
  </div>;
  if (index === 1) return <div className="lead-message-scene"><div className="lead-message-header"><i><OttoIcon size={23} mood="read"/></i><div><b>La tua attività</b><span>Messaggio concordato insieme</span></div><CheckCheck size={20}/></div><div className="lead-message"><small>BOZZA DI ESEMPIO</small><p>Ciao Martina, ci eravamo sentiti per il tuo progetto. Ti interessa riprendere il discorso e valutare insieme il prossimo passo?</p><span>Un messaggio pertinente. Un contesto che riconosci.</span></div><div className="lead-message-approved"><Check size={16}/> Testo, destinatari e canale approvati prima di partire.</div></div>;
  if (index === 2) return <div className="lead-reply-scene"><div className="lead-mini-sent">Ti interessa riprendere il discorso?</div><div className="lead-reply"><span>Martina · risposta di esempio</span><p>«Sì, è il momento giusto.<br/>Possiamo parlarne?»</p><i><MessageSquare size={20}/></i></div><div className="lead-opportunity"><span><i/> INTERESSE RITROVATO</span><b>Ora c’è una conversazione da seguire.</b><p>Una risposta o un appuntamento, da soli, non sono ancora un cliente riattivato.</p></div></div>;
  return <div className="lead-result-scene"><div className="lead-result-symbol"><Handshake size={43}/><i><Check size={18}/></i></div><span>RISULTATO CONCORDATO</span><h4>Si torna a lavorare.<br/>Insieme.</h4><div className="lead-result-lines"><p><Check size={16}/> Acquisto attribuito alla riattivazione</p><p><Check size={16}/> Esito verificato con la tua attività</p><p><Check size={16}/> Compenso sul valore concordato</p></div></div>;
}

function LeadPresentation() {
  const [step, setStep] = useState(0);
  return <div className="lead-presentation">
    <div className="lead-deck-top"><span><OttoIcon mood="read" size={18}/> DAL CONTATTO AL CLIENTE</span><span>ILLUSTRAZIONE / 0{step + 1}</span></div>
    <div className="lead-deck-pages" aria-live="polite" aria-atomic="true">
      {stages.map((stage, index) => <div key={stage.label} className="lead-deck-page" aria-hidden={step !== index}><span className="lead-deck-kicker">0{index + 1} / {stage.label}</span><h3>{stage.title}</h3><LeadScene index={index}/></div>)}
    </div>
    <div className="lead-deck-navigation"><button type="button" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} aria-label="Passaggio precedente"><ArrowLeft size={18}/></button><div role="group" aria-label="Passaggi della riattivazione">{stages.map((stage, index) => <button key={stage.label} type="button" aria-pressed={index === step} aria-label={`Passaggio ${index + 1}: ${stage.label}`} onClick={() => setStep(index)}><i/></button>)}</div><button type="button" onClick={() => setStep(step === stages.length - 1 ? 0 : step + 1)} aria-label={step === stages.length - 1 ? 'Ricomincia la presentazione' : 'Passaggio successivo'}>{step === stages.length - 1 ? <RotateCcw size={18}/> : <ArrowRight size={18}/>}</button></div>
    <p className="lead-deck-disclaimer">Esempio con dati inventati. Nessun messaggio viene inviato.</p>
  </div>;
}

export default function LeadPage() {
  return <div className="lead-page">
    <section className="lead-hero"><div className="wrap lead-hero-layout"><div className="lead-hero-copy"><span className="lead-eyebrow"><i/> LEAD / RIATTIVAZIONE CONTATTI</span><h1>I tuoi vecchi contatti.<br/><em>Una nuova<br/>possibilità.</em></h1><p>{leadIntro}</p><a className="station-button" href={leadContact} target="_blank" rel="noreferrer">Parliamo della tua lista <ArrowUpRight size={19}/></a><div className="lead-hero-promise"><Handshake size={19}/><span>Una piccola quota del valore recuperato.<br/><b>Solo sul risultato concordato e verificato.</b></span></div><a className="lead-scroll" href="#lead-percorso">Guarda come lavoriamo <ArrowDown size={16}/></a></div><LeadPresentation/></div><div className="wrap lead-hero-bottom"><span>HAI GIÀ FATTO IL PRIMO PASSO. RIPARTIAMO DA LÌ.</span><span><ShieldCheck size={14}/> Solo contatti tuoi e ricontattabili</span></div></section>

    <section className="lead-section wrap" id="lead-percorso"><div className="lead-heading"><div><span className="lead-eyebrow">01 / IL PERCORSO</span><h2>Dal file fermo.<br/><em>Alla relazione che riparte.</em></h2></div><p>Ci occupiamo del ricontatto. Tu resti al centro dell’offerta e della relazione con il cliente.</p></div><ol className="lead-process">{stages.map((stage, index) => <li key={stage.label}><span>0{index + 1}</span><h3>{stage.label}</h3><p>{stage.description}</p></li>)}</ol><div className="lead-format-strip"><FileSpreadsheet size={23}/><div><b>Partiamo dal formato che hai.</b><p>Excel, CSV, export del gestionale, PDF o un altro archivio: valutiamo leggibilità e conversione prima di iniziare.</p></div><span>PRIMA IL CONFRONTO.<br/>POI I DATI.</span></div></section>

    <section className="lead-value-section"><div className="wrap lead-value-layout"><div><span className="lead-eyebrow">02 / UN INTERESSE CONDIVISO</span><h2>Tu recuperi valore.<br/><em>Noi cresciamo con te.</em></h2><p>Il compenso è una piccola quota del valore del cliente riattivato. Si definisce insieme, in base alla tua attività, e matura solo quando il risultato concordato si realizza.</p><Link className="lead-text-link" to="/terms-of-service/#lead">Come definiamo il risultato <ArrowUpRight size={17}/></Link></div><div className="lead-value-card"><span><Handshake size={20}/> UN ACCORDO CHIARO, PRIMA</span><div><b>Quale cliente conta</b><p>Stabiliamo cosa significa “riattivato”: per esempio, un nuovo acquisto concluso e incassato grazie al ricontatto.</p></div><div><b>Su quale valore</b><p>Concordiamo la quota e la base di calcolo, con regole per annullamenti, rimborsi e acquisti già in corso.</p></div><div><b>Come lo verifichiamo</b><p>Definiamo periodo di attribuzione e conferma dell’esito. Un’apertura, una risposta o un appuntamento non bastano.</p></div></div></div></section>

    <section className="lead-section wrap lead-contact-section" id="lead-contatto"><div className="lead-list-policy"><div className="lead-policy-icon"><ShieldCheck size={29}/></div><div><span className="lead-eyebrow">LA LISTA GIUSTA, PRIMA DI TUTTO</span><h2>Un rapporto da riprendere.<br/><em>Con il permesso di farlo.</em></h2><p>Lavoriamo su contatti propri, raccolti lecitamente e con i presupposti necessari per il ricontatto sul canale scelto. Niente liste rubate, scraping o contatti raccolti sul web.</p><p>Prima di partire ti chiediamo di confermare la provenienza della lista e documentare le autorizzazioni. In caso di dubbi il lavoro si ferma per le verifiche.</p><div className="lead-policy-links"><Link to="/terms-of-service/#lead">Leggi le condizioni <ArrowUpRight size={15}/></Link><Link to="/privacy-policy/#lead">Come gestiamo i dati <ArrowUpRight size={15}/></Link></div></div></div><div className="lead-heading lead-contact-heading"><div><span className="lead-eyebrow">03 / PARLIAMONE</span><h2>Da quanto tempo<br/><em>non vi sentite?</em></h2></div><div><p>Raccontami che attività hai, da dove arrivano i contatti e quale risultato vorresti. Valutiamo se e come riaprire il dialogo.</p><a className="station-button" href={leadContact} target="_blank" rel="noreferrer">Scrivimi su WhatsApp <ArrowUpRight size={19}/></a><span className="lead-contact-note">Nel primo messaggio descrivi la lista, senza allegare dati dei contatti.</span></div></div><ServiceAnswers mode="lead"/></section>
  </div>;
}

const mobileStages = [
  { title: 'La lista da cui ripartire.', note: 'Verifichiamo provenienza e possibilità di ricontatto.', icon: FileSpreadsheet, content: 'Un preventivo in sospeso. Una richiesta di tempo fa. I tuoi contatti, nel formato che hai.' },
  { title: 'Un messaggio pertinente.', note: 'Concordiamo testo, offerta e canale prima di partire.', icon: MessageSquare, content: '«Ciao Martina, ci eravamo sentiti per il tuo progetto. Ti interessa riprendere il discorso?»' },
  { title: 'Una conversazione si riapre.', note: 'Seguiamo le risposte e rispettiamo chi non vuole essere ricontattato.', icon: CheckCheck, content: '«Sì, è il momento giusto. Possiamo parlarne?» L’interesse torna vivo: ora c’è un’opportunità da seguire.' },
  { title: 'Il cliente torna ad acquistare.', note: 'Una risposta o un appuntamento, da soli, non bastano.', icon: Handshake, content: 'Verifichiamo insieme il risultato attribuito al ricontatto. Solo allora matura la quota concordata sul valore recuperato.' },
];

export function LeadMobile() {
  const [step, setStep] = useState(0);
  const stage = mobileStages[step];
  const Icon = stage.icon;
  return <div className="mobile-landing mobile-lead">
    <section className="mobile-section mobile-hero" aria-labelledby="mobile-lead-title">
      <span className="mobile-eyebrow"><i/> LEAD / RIATTIVAZIONE CONTATTI</span>
      <h1 id="mobile-lead-title">I tuoi contatti.<br/><em>Una nuova<br/>possibilità.</em></h1>
      <div className="mobile-hero-story"><p>Riprendiamo il dialogo con chi si era già interessato alla tua attività.</p><OttoHero/></div>
      <a className="mobile-primary" href={leadContact} target="_blank" rel="noreferrer">Parliamo della tua lista <ArrowUpRight size={20}/></a>
      <p className="lead-mobile-promise"><Handshake size={18}/><span>Una piccola quota del valore recuperato.<br/>Solo sul risultato concordato e verificato.</span></p>
      <a className="mobile-scroll-link" href="#lead-percorso">Guarda come funziona <ArrowDown size={16}/></a>
    </section>
    <section className="mobile-section mobile-work" id="lead-percorso" aria-labelledby="mobile-lead-process-title">
      <span className="mobile-eyebrow">02 / DAL CONTATTO AL CLIENTE</span>
      <h2 id="mobile-lead-process-title">Riprendiamo il filo.<br/><em>Un passo alla volta.</em></h2>
      <div className="lead-mobile-steps" role="group" aria-label="Scegli un passaggio della riattivazione">{stages.map((item, index) => <button key={item.label} type="button" aria-pressed={step === index} onClick={() => setStep(index)}><span>0{index + 1}</span>{['Lista', 'Ricontatto', 'Risposta', 'Risultato'][index]}</button>)}</div>
      <div className="mobile-example-card lead-mobile-example">
        <div className="mobile-example-status"><span><i/> ESEMPIO SIMULATO</span><span>0{step + 1} / 04</span></div>
        <div className="mobile-example-body" aria-live="polite" aria-atomic="true"><span className="mobile-example-icon"><Icon size={25}/></span><h3>{stage.title}</h3><p className="lead-mobile-story">{stage.content}</p><p className="lead-mobile-note">{stage.note}</p></div>
        <button type="button" className="mobile-example-next" onClick={() => setStep((step + 1) % mobileStages.length)}>{step === mobileStages.length - 1 ? 'Rivedi il percorso' : 'Passaggio successivo'}{step === mobileStages.length - 1 ? <RotateCcw size={18}/> : <ArrowRight size={18}/>}</button>
      </div>
      <p className="mobile-demo-note">Dati inventati. Nessun messaggio viene inviato.</p>
      <p className="lead-mobile-formats"><FileSpreadsheet size={18}/><span>Excel, CSV, export CRM, PDF o altro archivio: valutiamo insieme il formato che hai.</span></p>
    </section>
    <section className="mobile-section mobile-contact-section" id="lead-contatto" aria-labelledby="mobile-lead-contact-title">
      <span className="mobile-eyebrow">03 / UN ACCORDO CHIARO, PRIMA</span>
      <h2 id="mobile-lead-contact-title">Tu recuperi valore.<br/><em>Noi cresciamo con te.</em></h2>
      <p>Definiamo insieme risultato, quota e verifica. Il compenso di riattivazione matura solo quando il risultato concordato si realizza.</p>
      <div className="lead-mobile-policy"><ShieldCheck size={21}/><p>Solo contatti tuoi, raccolti lecitamente e ricontattabili. Niente scraping: prima verifichiamo provenienza e autorizzazioni.</p></div>
      <div className="mobile-details"><ServiceAnswers mode="lead"/></div>
      <a className="mobile-primary" href={leadContact} target="_blank" rel="noreferrer">Scrivimi su WhatsApp <ArrowUpRight size={20}/></a>
      <p className="mobile-demo-note">Descrivi la lista nel primo messaggio, senza allegare dati dei contatti.</p>
      <div className="lead-mobile-links"><Link to="/terms-of-service/#lead">Condizioni del servizio <ArrowUpRight size={15}/></Link><Link to="/privacy-policy/#lead">Come gestiamo i dati <ArrowUpRight size={15}/></Link></div>
    </section>
  </div>;
}
