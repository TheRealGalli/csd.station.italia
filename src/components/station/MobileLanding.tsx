import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, FileText, Mail, Package } from 'lucide-react';
import portrait from '@/assets/profile-web.jpg';
import { OttoHero } from './StationExperiences';
import NfcTapDemo from './NfcTapDemo';
import './mobile-landing.css';
import { servicePaths } from '@/seo/routes';
import { nfcIntro } from '@/seo/content';
import { ServiceAnswers } from './ServiceAnswers';
import { OttoIcon } from './OttoIcon';

const examples = [
  { label: 'Richieste', icon: Mail, source: 'Martina · Richiesta di preventivo', message: '«Mi servono 12 sedie, da consegnare a Siena venerdì.»',
    manual: 'Leggi, ricopi i dati e prepari una risposta.', result: 'Una richiesta già organizzata.',
    fields: [['Prodotto', '12 sedie'], ['Consegna', 'Siena · venerdì'], ['Prossimo passo', 'Verifica la bozza di risposta']],
    note: 'L’AI estrae i dati. Tu controlli la risposta prima dell’invio.' },
  { label: 'Documenti', icon: FileText, source: 'Fattura · PDF ricevuto', message: 'Un altro documento da leggere, archiviare e ricordare.',
    manual: 'Ricopi importo e scadenza nel tuo foglio.', result: 'Dati pronti, scadenza in vista.',
    fields: [['Documento', 'Fattura n. 042'], ['Importo', '€ 240,00'], ['Prossimo passo', 'Conferma dati e promemoria']],
    note: 'L’AI legge il PDF. Dopo la tua verifica, l’automazione archivia e crea il promemoria.' },
  { label: 'Inventario', icon: Package, source: 'Magazzino · Un articolo in uscita', message: 'Dove si trova? Quanti ne restano? Chi lo ha preso?',
    manual: 'Cerchi la scheda e aggiorni le quantità a mano.', result: 'Un tap, un movimento tracciato.',
    fields: [['Articolo', 'Sedia · A-012'], ['Operazione', 'Uscita di 1 unità'], ['Prossimo passo', 'Conferma il movimento']],
    note: 'L’NFC identifica l’oggetto. L’automazione aggiorna l’inventario quando confermi.' },
];

function CompactExamples() {
  const [selected, setSelected] = useState(0);
  const [result, setResult] = useState(false);
  const example = examples[selected];
  const Icon = example.icon;
  return <div className="mobile-examples">
    <div className="mobile-example-tabs" role="group" aria-label="Scegli un esempio di automazione">
      {examples.map((item, i) => <button key={item.label} aria-pressed={selected === i} onClick={() => { setSelected(i); setResult(false); }}><item.icon size={19}/>{item.label}</button>)}
    </div>
    <div className={`mobile-example-card ${result ? 'shows-result' : ''}`}>
      <div className="mobile-example-status"><span><i/>{result ? 'CON IL TUO SISTEMA' : 'OGGI, A MANO'}</span><span>{result ? '02' : '01'} / 02</span></div>
      <div className="mobile-example-body" aria-live="polite" aria-atomic="true">
        {result ? <><span className="mobile-example-icon"><Check size={25}/></span><h3>{example.result}</h3><dl>{example.fields.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><p>{example.note}</p></> : <><span className="mobile-example-icon"><Icon size={25}/></span><span className="mobile-source">{example.source}</span><h3>{example.message}</h3><p>{example.manual}</p></>}
      </div>
      <button className="mobile-example-next" onClick={() => setResult(!result)}>{result ? 'Rivedi il punto di partenza' : 'Vedi cosa cambia'}{result ? <ArrowRight size={18}/> : <OttoIcon mood="happy" size={18}/>}</button>
    </div>
    <p className="mobile-demo-note">Esempio simulato. Sei tu a verificare e confermare.</p>
  </div>;
}

export function MobileConsulting({ contact, skills }: { contact: string; skills: string }) {
  return <div className="mobile-landing mobile-consulting">
    <section className="mobile-hero mobile-section" id="services" aria-labelledby="mobile-consulting-title">
      <span className="mobile-eyebrow"><i/> CONSULENZA AI E INFORMATICA PER PMI</span>
      <h1 id="mobile-consulting-title">Meno routine.<br/><em>Più possibilità.</em></h1>
      <div className="mobile-hero-story"><p>Consulenza AI e informatica per PMI. Meno lavoro ripetitivo, con processi chiari e automazioni su misura.</p><OttoHero/></div>
      <a className="mobile-primary" href={contact} target="_blank" rel="noreferrer">Parliamone su WhatsApp <ArrowUpRight size={20}/></a>
      <a className="mobile-scroll-link" href="#demo">Guarda un esempio <ArrowDown size={16}/></a>
    </section>
    <section className="mobile-section mobile-work" id="demo" aria-labelledby="mobile-work-title">
      <span className="mobile-eyebrow">02 / DAL PROBLEMA AL RISULTATO</span>
      <h2 id="mobile-work-title">Le piccole attività.<br/><em>Il tempo che si somma.</em></h2>
      <CompactExamples/>
    </section>
    <section className="mobile-section mobile-contact-section" id="booking" aria-labelledby="mobile-contact-title">
      <span className="mobile-eyebrow">03 / PARTIAMO DA TE</span>
      <h2 id="mobile-contact-title">Una persona.<br/><em>Un progetto su misura.</em></h2>
      <div className="mobile-person" id="about"><img src={portrait} alt="Carlo Galli" width="64" height="64" loading="lazy"/><div><strong>Carlo, piacere.</strong><span>Il tuo contatto diretto in CSD Station.</span></div></div>
      <p>Carlo Galli: consulenza informatica, AI, hardware e NFC per la tua attività. Dalla Toscana, in tutta Italia.</p>
      <div className="mobile-details" id="metodo"><ServiceAnswers mode="automazioni"/></div>
      <a className="mobile-primary" href={contact} target="_blank" rel="noreferrer">Raccontami come lavori <ArrowUpRight size={20}/></a>
      <a className="mobile-subtle-link" href={skills} target="_blank" rel="noreferrer">Le mie competenze Google <ArrowUpRight size={16}/></a>
      <Link className="mobile-crosslink" to={servicePaths.nfc}><span>Cerchi le card NFC?<small>Scopri card, plate e stand.</small></span><ArrowRight size={20}/></Link>
      <Link className="mobile-crosslink" to={servicePaths.training}><span>Vuoi formare il tuo team?<small>Training AI per la tua azienda.</small></span><ArrowRight size={20}/></Link>
    </section>
  </div>;
}

type Product = { name: string; price: string; image: string; description: string };
export function MobileNfc({ products, whatsapp }: { products: Product[]; whatsapp: (message: string) => string }) {
  return <div className="mobile-landing mobile-nfc">
    <section className="mobile-section mobile-nfc-hero" aria-labelledby="mobile-nfc-title">
      <span className="mobile-eyebrow"><i/> CARD · PLATE · STAND</span>
      <h1 id="mobile-nfc-title">Un piccolo tap.<br/><em>Sei già più vicino.</em></h1>
      <p>{nfcIntro}</p>
      <NfcTapDemo/>
      <a className="mobile-scroll-link" href="#prodotti">Scegli il tuo formato <ArrowDown size={16}/></a>
    </section>
    <section className="mobile-section mobile-shop" id="prodotti" aria-labelledby="mobile-shop-title">
      <span className="mobile-eyebrow">02 / IL FORMATO GIUSTO PER TE</span>
      <h2 id="mobile-shop-title">Un solo acquisto.<br/><em>Pronto all’uso.</em></h2>
      <p>Configurazione, QR e report mensili inclusi.</p>
      <div className="mobile-products">{products.map((product, i) => <article key={product.name}>
        <div className={`mobile-product-image ${i === 2 ? 'mobile-product-stand' : ''}`}><img src={product.image} alt={product.name} loading="lazy" width="100" height="112"/></div>
        <div><h3>{product.name}</h3><p>{['Da portare sempre con te.', 'Da applicare dove serve.', 'In bella vista sul banco.'][i]}</p><strong>{product.price}</strong></div>
        <a href={whatsapp(`Ciao Carlo! Mi interessa ${product.name} (${product.price}) di CSD Station. Vorrei informazioni su configurazione e spedizione.`)} target="_blank" rel="noreferrer">Richiedi {i === 0 ? 'la card' : i === 1 ? 'la plate' : 'lo stand'}<ArrowUpRight size={17}/></a>
      </article>)}</div>
      <p className="mobile-demo-note">Spedizione, quantità e personalizzazioni su preventivo.</p>
    </section>
    <section className="mobile-section mobile-contact-section" id="nfc-booking" aria-labelledby="mobile-nfc-contact-title">
      <span className="mobile-eyebrow">03 / ALLA CONFIGURAZIONE PENSIAMO NOI</span>
      <h2 id="mobile-nfc-contact-title">La tua attività.<br/><em>A un tap di distanza.</em></h2>
      <div className="mobile-details"><ServiceAnswers mode="nfc"/></div>
      <a className="mobile-primary" href={whatsapp('Ciao Carlo! Vorrei informazioni sui prodotti NFC di CSD Station.')} target="_blank" rel="noreferrer">Scrivimi su WhatsApp <ArrowUpRight size={20}/></a>
      <Link className="mobile-crosslink" to={servicePaths.automazioni}><span>NFC anche per l’inventario?<small>Parliamo della tua idea.</small></span><ArrowRight size={20}/></Link>
    </section>
  </div>;
}
