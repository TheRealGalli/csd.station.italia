import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Box, CalendarCheck, Camera, Check, Clapperboard, Globe, Images, Nfc, Pencil, Scissors, ShieldCheck, Users } from 'lucide-react';
import { servicePaths } from '@/seo/routes';
import { webIntro } from '@/seo/content';
import './sito-social.css';

// Prezzi provvisori: da confermare prima della pubblicazione.
const whatsapp = (message: string) => `https://wa.me/393518628203?text=${encodeURIComponent(message)}`;
export const webContact = whatsapp('Ciao Carlo! Vorrei informazioni su sito e social per la mia attività.');
function Eyebrow({ children }: { children: React.ReactNode }) { return <div className="station-eyebrow"><span/>{children}</div>; }

const previews = [
  { key: 'site', label: 'Sito', name: 'Sito Essenziale', price: 'da 690 €' },
  { key: 'site3d', label: 'Sito 3D', name: 'Sito 3D', price: 'da 1.490 €' },
  { key: 'social', label: 'Social', name: 'Gestione social', price: 'da 390 €/mese' },
] as const;

const sites = [
  { name: 'Sito Essenziale', price: 'da 690 €', unit: 'una tantum', icon: Globe, description: 'Una pagina veloce, moderna, in React. Chi ti cerca trova subito quello che serve.', points: ['Ottimizzato per smartphone', 'Menu, orari, mappa e WhatsApp', 'SEO locale e scheda Google collegata'] },
  { name: 'Sito 3D', price: 'da 1.490 €', unit: 'una tantum', icon: Box, description: 'Tutto l’Essenziale, con una scena 3D o animazioni che si muovono mentre scorri.', points: ['Modello che hai già o di libreria', 'Animazioni allo scorrimento', 'Più sezioni: storia, eventi, galleria'] },
  { name: 'Modello 3D su misura', price: 'Su preventivo', unit: 'in base al soggetto', icon: Clapperboard, description: 'Creiamo il modello del tuo piatto, del locale o di un prodotto. Da usare nel sito e nei video.', points: ['Piatto, ambiente o prodotto', 'Riutilizzabile nei contenuti social', 'Si aggiunge a qualsiasi formato'] },
];

const plans = [
  { name: 'Social Base', price: '390 €', points: ['8 caroselli al mese', '4 reel o short al mese', 'Calendario mensile da approvare', 'Un giro di modifiche incluso'] },
  { name: 'Social Plus', price: '690 €', points: ['12 caroselli al mese', '8 reel, short o clip al mese', 'Stories ogni settimana', 'Una campagna al mese, anche WhatsApp'] },
];

const posts = [
  { day: 'LUN 3', type: 'Carosello · 5 slide', title: 'Il menu d’autunno, piatto per piatto', icon: Images },
  { day: 'GIO 6', type: 'Reel · 20 secondi', title: 'Dalla cucina: la pasta fresca del giorno', icon: Camera },
  { day: 'SAB 8', type: 'Clip · da un’intervista', title: 'Perché scegliamo farine toscane', icon: Scissors },
];

function SitePreview({ three }: { three: boolean }) {
  return <div className="web-browser" aria-hidden="true">
    <div className="web-browser-bar"><i/><i/><i/><span>trattoria-esempio.it</span></div>
    <div className="web-browser-page">
      <div className="web-mock-nav"><b>Trattoria Esempio</b><span/><span/><span/></div>
      <div className="web-mock-hero">
        <div><small>DAL 1987 · FIRENZE</small><strong>Cucina toscana,<br/>fatta a mano.</strong><em>Prenota un tavolo</em></div>
        {three ? <div className="web-sphere">{[0, 1, 2, 3, 4, 5].map(i => <i key={i} style={{ transform: `rotateY(${i * 30}deg)` }}/>)}<b/></div> : <div className="web-mock-photo"/>}
      </div>
      <div className="web-mock-rows"><span/><span/><span/></div>
    </div>
  </div>;
}

function SocialPreview() {
  return <div className="web-phone" aria-hidden="true">
    <div className="web-phone-head"><span className="web-phone-avatar"/><div><b>trattoria.esempio</b><small>12 post questo mese</small></div></div>
    <div className="web-phone-grid">{Array.from({ length: 9 }, (_, i) => <span key={i} className={`tile-${i % 4}`}>{i === 0 ? <em>1/5</em> : i === 4 ? <Clapperboard size={13}/> : null}</span>)}</div>
  </div>;
}

function ApprovalDemo() {
  const [status, setStatus] = useState<Record<number, 'approved' | 'edit' | undefined>>({});
  const edits = Object.values(status).filter(s => s === 'edit').length;
  const approved = Object.values(status).filter(s => s === 'approved').length;
  const set = (i: number, value: 'approved' | 'edit') => setStatus(s => ({ ...s, [i]: s[i] === value ? undefined : value }));
  return <div className="web-approval">
    <div className="web-approval-top"><span><CalendarCheck size={16}/> IL CALENDARIO DEL MESE</span><small>ESEMPIO</small></div>
    <ul>{posts.map((p, i) => <li key={p.title} className={status[i] ?? ''}>
      <span className="web-approval-day">{p.day}</span>
      <div><small><p.icon size={13}/> {p.type}</small><b>{p.title}</b></div>
      <div className="web-approval-actions" role="group" aria-label={`Contenuto: ${p.title}`}>
        <button type="button" aria-pressed={status[i] === 'approved'} onClick={() => set(i, 'approved')}><Check size={14}/> Approva</button>
        <button type="button" aria-pressed={status[i] === 'edit'} onClick={() => set(i, 'edit')} disabled={edits >= 1 && status[i] !== 'edit'}><Pencil size={13}/> Modifica</button>
      </div>
    </li>)}</ul>
    <p className="web-approval-foot" aria-live="polite">{approved === posts.length ? 'Tutto approvato: il mese è pronto per la pubblicazione.' : `Approvati ${approved} di ${posts.length} · Modifiche usate ${edits} di 1`}</p>
  </div>;
}

export default function SitoSocial() {
  const [selected, setSelected] = useState(0);
  const preview = previews[selected];
  return <>
    <section className="nfc-hero web-hero"><div className="wrap nfc-hero-layout"><div>
      <Eyebrow>SITI WEB E SOCIAL PER ATTIVITÀ LOCALI</Eyebrow>
      <h1>Ti trovano.<br/><span>Ti scelgono.<br/>Ti seguono.</span></h1>
      <p>{webIntro}</p>
      <a className="station-button" href="#siti">Scegli da dove partire <ArrowDown size={18}/></a>
      <div className="nfc-benefits"><span><Check size={15}/> Contenuti approvati da te</span><span><Check size={15}/> Prezzi chiari, quantità fisse</span></div>
    </div><div className="nfc-display">
      <div className="product-orbit"/><span className="product-overline">LA TUA ATTIVITÀ. ANCHE ONLINE.</span>
      <div className="web-preview">{preview.key === 'social' ? <SocialPreview/> : <SitePreview three={preview.key === 'site3d'}/>}</div>
      <span className="product-float">{preview.key === 'social' ? <><Images size={18}/> CAROSELLI + REEL</> : <><Globe size={18}/> REACT{preview.key === 'site3d' ? ' + 3D' : ''}</>}</span>
      <div className="product-selector" role="group" aria-label="Anteprima del servizio">{previews.map((p, i) => <button key={p.key} type="button" aria-pressed={selected === i} onClick={() => setSelected(i)} className={selected === i ? 'selected' : ''}>{p.label}</button>)}</div>
      <div className="product-caption"><span>{preview.name}</span><b>{preview.price}</b></div>
    </div></div></section>

    <div className="expertise-strip nfc-strip web-strip"><div className="wrap"><span>UN PERCORSO COMPLETO</span><b><Nfc size={18}/> Ti trovano su Maps</b><b><Globe size={18}/> Arrivano sul tuo sito</b><b><Images size={18}/> Ti seguono sui social</b><b><Users size={18}/> Tornano da te</b></div></div>

    <section className="product-section" id="siti"><div className="wrap">
      <div className="section-heading"><div><Eyebrow>01 / IL SITO</Eyebrow><h2>La tua vetrina.<br/>Tre modi di costruirla.</h2></div><p>Siti moderni e veloci, pensati prima di tutto per chi ti cerca dallo smartphone. Il 3D è un passo in più, non un obbligo.</p></div>
      <div className="products-grid">{sites.map((s, i) => <article className="product-card web-card" key={s.name}>
        <div className="web-card-head"><s.icon size={30}/><span>0{i + 1}</span></div>
        <div className="product-card-content"><h3>{s.name}</h3><p>{s.description}</p>
          <ul className="web-points">{s.points.map(point => <li key={point}><Check size={14}/>{point}</li>)}</ul>
          <div className="price-row"><strong>{s.price}</strong><span>{s.unit}</span></div>
          <a className="station-button" href={whatsapp(`Ciao Carlo! Mi interessa il formato ${s.name} (${s.price}) per il sito della mia attività.`)} target="_blank" rel="noreferrer">Parliamone <ArrowUpRight size={17}/></a>
        </div>
      </article>)}</div>
      <p className="catalog-note">Dominio, hosting e testi si concordano nel preventivo. Il sito resta della tua attività.</p>
    </div></section>

    <section className="web-social wrap" id="social">
      <div className="section-heading"><div><Eyebrow>02 / I SOCIAL</Eyebrow><h2>Ogni mese, contenuti pronti.<br/><span>Tu approvi, io pubblico.</span></h2></div><p>Instagram, TikTok, YouTube Shorts e Facebook. Caroselli, reel, video animati e clip montate da video più lunghi.</p></div>
      <div className="web-social-layout">
        <div className="web-plans">{plans.map(p => <article key={p.name} className="web-plan">
          <h3>{p.name}</h3>
          <div className="price-row"><strong>{p.price}</strong><span>al mese</span></div>
          <ul className="web-points">{p.points.map(point => <li key={point}><Check size={14}/>{point}</li>)}</ul>
          <a className="text-link" href={whatsapp(`Ciao Carlo! Mi interessa il piano ${p.name} (${p.price} al mese) per i social della mia attività.`)} target="_blank" rel="noreferrer">Richiedi {p.name} <ArrowUpRight size={16}/></a>
        </article>)}
          <article className="web-plan web-plan-extra"><Scissors size={22}/><div><h3>Clipping</h3><p>Da un’intervista, un evento o una diretta: clip verticali pronte da pubblicare. A pacchetto, su preventivo.</p></div></article>
        </div>
        <ApprovalDemo/>
      </div>
      <ol className="tap-steps web-steps">
        <li><span>01</span> Pianifichiamo insieme il mese.</li>
        <li><span>02</span> Mi mandi i video dal telefono, oppure giriamo mezza giornata insieme.</li>
        <li><span>03</span> Approvi il calendario, con un giro di modifiche.</li>
        <li><span>04</span> Pubblico e ti mando un riepilogo a fine mese.</li>
      </ol>
    </section>

    <section className="web-bundle" id="pacchetto"><div className="wrap web-bundle-inner">
      <div><Eyebrow>03 / IL PACCHETTO PRESENZA</Eyebrow><h2>Sito nuovo e social.<br/><span>Un solo canone.</span></h2><p>Il Sito 3D è compreso nel canone. Paghi l’attivazione, poi una quota fissa al mese per un anno.</p></div>
      <div className="web-bundle-card">
        <span className="web-bundle-tag">SITO 3D + SOCIAL BASE</span>
        <div className="web-bundle-price"><strong>590 €</strong><span>al mese · 12 mesi</span></div>
        <small>+ 490 € di attivazione, una sola volta</small>
        <ul className="web-points">{['Sito 3D incluso nel canone', '8 caroselli e 4 reel ogni mese', 'Dominio intestato alla tua attività', 'Se interrompi prima dei 12 mesi, saldi la quota restante del sito'].map(point => <li key={point}><Check size={14}/>{point}</li>)}</ul>
        <a className="station-button" href={whatsapp('Ciao Carlo! Mi interessa il Pacchetto Presenza (Sito 3D + Social Base). Possiamo parlarne?')} target="_blank" rel="noreferrer">Richiedi il pacchetto <ArrowUpRight size={17}/></a>
      </div>
    </div></section>

    <section className="nfc-included wrap" id="regole"><div className="section-heading"><div><Eyebrow>COME LAVORO</Eyebrow><h2>Poche regole chiare.<br/>Da entrambe le parti.</h2></div><p>Preferisco seguire bene poche attività che promettere a tutti risultati che non dipendono solo da me.</p></div>
      <div className="included-grid">{[
        { icon: Users, title: 'Posti limitati', text: 'Seguo al massimo 6 attività per volta. Così ognuna ha il tempo e l’attenzione che merita.' },
        { icon: Camera, title: 'Solo materiale vero', text: 'I tuoi piatti, il tuo locale, le tue persone. L’AI aiuta a montare e animare, non a inventare.' },
        { icon: ShieldCheck, title: 'Niente promesse gonfiate', text: 'Non garantisco follower, prenotazioni o vendite. Nel riepilogo mensile trovi i dati che le piattaforme rendono disponibili.' },
      ].map(v => <article key={v.title}><v.icon size={28}/><h3>{v.title}</h3><p>{v.text}</p></article>)}</div>
    </section>

    <div className="wrap nfc-crosslink"><div><span>HAI GIÀ LE CARD NFC?</span><h3>Il primo passo per farti trovare è su Google Maps.</h3><p>Card, plate e stand portano i clienti alla tua scheda. Il sito e i social fanno il resto.</p></div><Link className="text-link" to={servicePaths.nfc}>Scopri le card NFC <ArrowUpRight size={18}/></Link></div>
  </>;
}
