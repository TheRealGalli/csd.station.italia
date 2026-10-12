import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Link2, MapPin, MessageSquare, ShieldCheck, Sparkles, Users, Video } from 'lucide-react';
import portrait from '@/assets/profile-web.jpg';
import './training.css';

export const trainingMessage = 'Ciao Carlo! Vorrei organizzare un training sull’intelligenza artificiale per il team della mia azienda. Possiamo confrontarci su strumenti, attività e obiettivi?';
export const trainingContact = `https://wa.me/393518628203?text=${encodeURIComponent(trainingMessage)}`;

const objectives = [
  { label: 'Lavoro quotidiano', icon: Sparkles, title: 'Dalle richieste ai risultati utili.', question: 'Quali attività assorbono più tempo al tuo team?', practice: 'Preparare richieste chiare, lavorare su testi e contenuti, verificare le risposte.', outcome: 'Capire quando l’AI aiuta e quando serve il giudizio di una persona.' },
  { label: 'Strumenti collegati', icon: Link2, title: 'L’AI dentro il vostro modo di lavorare.', question: 'Quali applicazioni usate già in azienda?', practice: 'Esplorare collegamenti e procedure riutilizzabili, quando gli strumenti lo consentono.', outcome: 'Ridurre i passaggi ripetitivi, sapendo quali dati e permessi sono coinvolti.' },
  { label: 'Uso consapevole', icon: ShieldCheck, title: 'Più capacità. Più consapevolezza.', question: 'Quali informazioni e decisioni gestisce il team?', practice: 'Riconoscere dati delicati, risultati da controllare e attività da sottoporre a verifica.', outcome: 'Usare gli strumenti con attenzione alle regole e alle responsabilità aziendali.' },
];

function TrainingNotebook() {
  const [selected, setSelected] = useState(0);
  const objective = objectives[selected];
  const Icon = objective.icon;
  return <div className="training-notebook">
    <div className="training-notebook-top"><span><Users size={16}/> IL TUO TEAM, AL CENTRO</span><span>AI / TRAINING</span></div>
    <div className="training-objectives" role="group" aria-label="Esplora gli obiettivi del training">
      {objectives.map((item, index) => <button key={item.label} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}><item.icon size={17}/><span>{item.label}</span></button>)}
    </div>
    <div className="training-notebook-page" aria-live="polite" aria-atomic="true">
      <span className="training-page-number">0{selected + 1} / ESEMPIO DI OBIETTIVO</span>
      <div className="training-page-heading"><Icon size={27}/><h2>{objective.title}</h2></div>
      <dl><div><dt>Partiamo da qui</dt><dd>{objective.question}</dd></div><div><dt>Facciamo pratica</dt><dd>{objective.practice}</dd></div></dl>
      <p className="training-page-outcome"><Check size={17}/>{objective.outcome}</p>
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
      <div className="training-responsibility"><div className="training-shield"><ShieldCheck size={30}/></div><div><span className="training-eyebrow">DATI, COMPLIANCE E RESPONSABILITÀ</span><h3>Saper usare l’AI significa <br/>anche sapere quando fermarsi.</h3><p>Dati personali, riservatezza, permessi e controllo umano entrano nella pratica del training.</p><details><summary>Come affrontiamo privacy e GDPR <ChevronDown size={18}/></summary><p>Partiamo dalle procedure aziendali e dai casi d’uso: quali informazioni condividere, chi può accedervi e quali risultati verificare. Per esigenze giuridiche specifiche, valutiamo il coinvolgimento di professionisti abilitati.</p></details></div></div>
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
