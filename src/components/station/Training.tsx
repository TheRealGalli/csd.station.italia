import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Link2, MapPin, MessageSquare, ShieldCheck, Users, Video } from 'lucide-react';
import portrait from '@/assets/profile-web.jpg';
import { Otto } from './StationExperiences';
import './training.css';

export const trainingMessage = 'Ciao Carlo! Vorrei organizzare un training sull’intelligenza artificiale per il team della mia azienda. Possiamo confrontarci su strumenti, attività e obiettivi?';
export const trainingContact = `https://wa.me/393518628203?text=${encodeURIComponent(trainingMessage)}`;

const objectives = [
  { label: 'Lavoro quotidiano', icon: null, title: <>Dalle richieste quotidiane<br/>ai risultati per il team.</>, question: 'Quali attività assorbono più tempo al tuo team?', practice: 'Preparare richieste chiare, lavorare su testi e contenuti, verificare le risposte.', outcome: 'Capire quando l’AI aiuta e quando serve il giudizio di una persona.' },
  { label: 'Strumenti collegati', icon: Link2, title: 'L’AI dentro il vostro modo di lavorare.', question: 'Quali applicazioni usate già in azienda?', practice: 'Esplorare collegamenti e procedure riutilizzabili, quando gli strumenti lo consentono.', outcome: 'Ridurre i passaggi ripetitivi, sapendo quali dati e permessi sono coinvolti.' },
  { label: 'Uso consapevole', icon: ShieldCheck, title: 'Più capacità. Più consapevolezza.', question: 'Quali informazioni e decisioni gestisce il team?', practice: 'Riconoscere dati delicati, risultati da controllare e attività da sottoporre a verifica.', outcome: 'Usare gli strumenti con attenzione alle regole e alle responsabilità aziendali.' },
];

function TrainingOtto({ variant }: { variant: 'tab' | 'heading' | 'wave' }) {
  return <div className={`training-otto training-otto-${variant}`} aria-hidden="true"><Otto mood={variant === 'wave' ? 'happy' : 'awake'}/></div>;
}

function TrainingNotebook() {
  const [selected, setSelected] = useState(0);
  return <div className="training-notebook">
    <div className="training-notebook-top"><span><Users size={16}/> IL TUO TEAM, AL CENTRO</span><span>AI / TRAINING</span></div>
    <div className="training-objectives" role="group" aria-label="Esplora gli obiettivi del training">
      {objectives.map((item, index) => <button key={item.label} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>{item.icon ? <item.icon size={20}/> : <TrainingOtto variant="tab"/>}<span>{item.label}</span></button>)}
    </div>
    {/* Overlapping panels reserve the tallest content at every viewport width. */}
    <div className="training-notebook-panels" aria-live="polite" aria-atomic="true">
      {objectives.map((objective, index) => <div key={objective.label} className="training-notebook-page" aria-hidden={selected !== index}>
        <span className="training-page-number">0{index + 1} / ESEMPIO DI OBIETTIVO</span>
        <div className="training-page-heading">{objective.icon ? <objective.icon size={27}/> : <TrainingOtto variant="heading"/>}<h2>{objective.title}</h2></div>
        <dl><div><dt>Partiamo da qui</dt><dd>{objective.question}</dd></div><div><dt>Facciamo pratica</dt><dd>{objective.practice}</dd></div></dl>
        <p className="training-page-outcome"><Check size={17}/>{objective.outcome}</p>
      </div>)}
    </div>
    <div className="training-notebook-bottom"><i/> Il programma si costruisce insieme.</div>
  </div>;
}

export default function Training() {
  const [format, setFormat] = useState<'remote' | 'onsite' | null>(null);
  const message = trainingMessage + (format === 'remote' ? ' Ci interessa la modalità da remoto.' : format === 'onsite' ? ' Ci interessa la formazione in presenza presso la nostra sede.' : '');
  const contact = `https://wa.me/393518628203?text=${encodeURIComponent(message)}`;
  return <div className="training-page">
    <section className="training-hero training-section wrap" aria-labelledby="training-title">
      <div className="training-hero-copy">
        <span className="training-eyebrow"><i/> FORMAZIONE AI PER AZIENDE</span>
        <h1 id="training-title">L’intelligenza artificiale.<br/><em>Nel lavoro <br/>del tuo team.</em></h1>
        <p>Un training costruito sugli strumenti che usate, sulle attività che svolgete e sugli obiettivi della vostra azienda.</p>
        <a className="training-cta" href={trainingContact} target="_blank" rel="noreferrer">Parliamo del tuo team <ArrowUpRight size={19}/></a>
        <div className="training-hero-note"><Users size={16}/><span>Per team aziendali · Da remoto o in presenza</span></div>
        <a className="training-anchor" href="#training-percorso">Come costruiamo il percorso <ArrowDown size={16}/></a>
      </div>
      <TrainingNotebook/>
    </section>

    <section className="training-section training-method wrap" id="training-percorso" aria-labelledby="training-method-title">
      <div className="training-section-heading"><div><span className="training-eyebrow">02 / SU MISURA, FIN DALL’INIZIO</span><h2 id="training-method-title">Si parte da come<br/><em>lavorate davvero.</em></h2></div><p>Gli strumenti evolvono. Il percorso si adatta alle esigenze dell’azienda e alle competenze del team.</p></div>
      <ol className="training-path">
        <li><span>01</span><h3>Ascoltiamo il referente.</h3><p>Un confronto su persone, strumenti, attività e obiettivi. Anche se state iniziando da zero.</p></li>
        <li><span>02</span><h3>Facciamo pratica.</h3><p>Esempi ed esercitazioni vicini al vostro lavoro, con contenuti adatti a essere usati nella formazione.</p></li>
        <li><span>03</span><h3>Costruiamo buone abitudini.</h3><p>Richieste più efficaci, verifiche dei risultati e criteri per scegliere quando usare l’AI.</p></li>
      </ol>
      <div className="training-responsibility"><TrainingOtto variant="wave"/><div><span className="training-eyebrow">DATI, COMPLIANCE E RESPONSABILITÀ</span><h3>Saper usare l’AI significa <br/>anche sapere quando fermarsi.</h3><p>Dati personali, riservatezza, permessi e controllo umano entrano nella pratica del training.</p><details><summary>Come affrontiamo privacy e GDPR <ChevronDown size={18}/></summary><p><strong>Partiamo da un caso concreto.</strong> Un sistema che prepara bozze di pratiche dai documenti condivisi nello studio può essere utile, ma va valutato prima di usarlo. Esaminiamo finalità, base giuridica, dati necessari, autorizzazioni e rischi: avere accesso a un documento non significa poterlo caricare in qualsiasi servizio.</p>
        <p><strong>Scegliamo strumenti e account adatti.</strong> Nel training impariamo a verificare garanzie contrattuali, conservazione, eventuale riutilizzo dei contenuti e trasferimenti dei dati. La buona prassi è usare account aziendali individuali, approvati e gestiti dall’organizzazione, evitando quelli personali. Un piano “business”, da solo, non garantisce la conformità.</p>
        <p><strong>Una persona mantiene il controllo.</strong> Nei passaggi delicati introduciamo una verifica umana concreta: qualcuno confronta la bozza con le fonti e può correggerla o bloccarla prima dell’invio o di una decisione. È il principio del <em>human in the loop</em>. Definiamo chi può accedere a cosa e condividiamo solo i dati necessari; nelle esercitazioni privilegiamo esempi fittizi.</p>
        <p>Il percorso parte dalle vostre procedure e dal livello di rischio. Per esigenze giuridiche specifiche, valutiamo il coinvolgimento di professionisti abilitati.</p></details></div></div>
    </section>

    <section className="training-section training-contact wrap" id="training-contatto" aria-labelledby="training-contact-title">
      <div className="training-section-heading"><div><span className="training-eyebrow">03 / PARLIAMONE</span><h2 id="training-contact-title">Il primo passo?<br/><em>Conoscere la tua realtà.</em></h2></div><p>Raccontami che cosa fate e chi vorresti coinvolgere. Da qui capiamo quale training proporre.</p></div>
      <div className="training-contact-layout"><div>
        <div className="training-formats" role="group" aria-label="Modalità di formazione preferita, facoltativa">
          <button type="button" aria-pressed={format === 'remote'} onClick={() => setFormat(format === 'remote' ? null : 'remote')}><Video size={24}/><strong>Da remoto</strong><span>Sessioni con il team su Google Meet.</span><i>{format === 'remote' ? <Check size={17}/> : <ArrowUpRight size={17}/>}</i></button>
          <button type="button" aria-pressed={format === 'onsite'} onClick={() => setFormat(format === 'onsite' ? null : 'onsite')}><MapPin size={24}/><strong>In presenza</strong><span>Un consulente presso la tua azienda, su accordo.</span><i>{format === 'onsite' ? <Check size={17}/> : <ArrowUpRight size={17}/>}</i></button>
        </div>
        <p className="training-format-note" aria-live="polite">{format ? 'La preferenza sarà inclusa nel messaggio WhatsApp.' : 'Puoi scegliere una modalità oppure valutarla insieme.'}</p>
      </div><div className="training-contact-card">
        <div className="training-person"><img src={portrait} alt="Carlo Galli" width="52" height="52" loading="lazy"/><div><strong>Parli direttamente con Carlo.</strong><span>CSD Station · Training aziendali</span></div></div>
        <a className="training-cta" href={contact} target="_blank" rel="noreferrer"><MessageSquare size={18}/> Scrivimi su WhatsApp <ArrowUpRight size={19}/></a>
        <span className="training-contact-note">Partiamo da strumenti, persone e obiettivi.</span>
      </div></div>
    </section>
  </div>;
}
