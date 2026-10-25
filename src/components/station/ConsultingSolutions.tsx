import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, BarChart3, GraduationCap, Globe, Nfc, Play, Users, Workflow } from 'lucide-react';
import { osPaths, servicePaths } from '@/seo/routes';
import './consulting-solutions.css';

const services = [
  { mode: 'training', icon: GraduationCap, title: 'Training AI', text: 'Porta strumenti e competenze nel lavoro del tuo team.' },
  { mode: 'forecasting', icon: BarChart3, title: 'Forecasting', text: 'Usa i tuoi dati per valutare domanda e scenari futuri.' },
  { mode: 'lead', icon: Users, title: 'Riattivazione lead', text: 'Riprendi il dialogo con i contatti già raccolti.' },
  { mode: 'web', icon: Globe, title: 'Sito & Social', text: 'Dai alla tua attività una presenza online curata.' },
  { mode: 'media', icon: Play, title: 'Video & Slide', text: 'Trasforma idee e contenuti in presentazioni e video.' },
  { mode: 'nfc', icon: Nfc, title: 'Card & prodotti NFC', text: 'Semplifica l’accesso alla tua pagina di recensioni Google.' },
] as const;

export default function ConsultingSolutions() {
  return <section className="consulting-solutions wrap" id="solutions" aria-labelledby="solutions-title">
    <div className="section-heading">
      <div><div className="station-eyebrow"><span/>CONSULENZA, SISTEMI E COMPETENZE</div><h2 id="solutions-title">Il punto di partenza<br/>è come lavori tu.</h2></div>
      <p>Un processo da ripensare, un team da formare, un progetto da realizzare. Troviamo gli strumenti adatti e li facciamo lavorare insieme.</p>
    </div>
    <div className="consulting-solutions-layout">
      <article className="consulting-feature">
        <div className="consulting-feature-label"><Workflow size={20}/><span>LA CONSULENZA, AL CENTRO</span></div>
        <h3>Dal problema quotidiano.<br/><em>Al tuo sistema di lavoro.</em></h3>
        <p>Partiamo da richieste, documenti, dati e strumenti che usi già. Capiamo dove si inceppa il lavoro e progettiamo una soluzione intorno alla tua attività.</p>
        <ol className="consulting-outcomes">
          <li><span>01</span><div><b>Capire cosa serve</b><small>Analisi dei flussi, delle priorità e degli strumenti.</small></div></li>
          <li><span>02</span><div><b>Costruire i collegamenti</b><small>AI, automazioni, software e hardware, dove utili.</small></div></li>
          <li><span>03</span><div><b>Portarli nel lavoro reale</b><small>Prove, affiancamento e verifica dei risultati.</small></div></li>
        </ol>
        <a className="consulting-feature-cta" href="#demo">Guarda alcuni esempi <ArrowDown size={18}/></a>
      </article>
      <div className="consulting-service-list"><div className="consulting-list-label">UN’ESIGENZA PRECISA? PARTI DA QUI.</div>
        {services.map(({mode, icon: Icon, title, text}) => <Link key={mode} to={servicePaths[mode]} className="consulting-service-row"><span className="consulting-service-icon"><Icon size={22}/></span><div><h3>{title}</h3><p>{text}</p></div><ArrowUpRight size={19}/></Link>)}
      </div>
    </div>
    <div className="consulting-system-demos"><div><span className="consulting-list-label">SISTEMI DI SETTORE · DEMO INTERATTIVE</span><p>Esplora come può prendere forma un sistema dedicato.</p></div><div><Link to={osPaths.restaurant}>Restaurant OS <ArrowRight size={17}/></Link><Link to={osPaths.notaro}>Notaro OS <ArrowRight size={17}/></Link></div></div>
  </section>;
}
