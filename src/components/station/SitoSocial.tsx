import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Camera, Check, ChevronLeft, ChevronRight, Clapperboard, Globe, Images, Nfc, ShieldCheck, Users } from 'lucide-react';
import { servicePaths } from '@/seo/routes';
import { OttoIcon } from './OttoIcon';
import { Otto } from './StationExperiences';
import { MotionVideo, SiteMock, SocialMock, VideoMock } from './SitoSocialMocks';
import { webIntro } from '@/seo/content';
import './sito-social.css';

// Prezzi provvisori: da confermare prima della pubblicazione definitiva.
const whatsapp = (message: string) => `https://wa.me/393518628203?text=${encodeURIComponent(message)}`;
export const webContact = whatsapp('Ciao Carlo! Vorrei informazioni su sito e social per la mia attività.');
function Eyebrow({ children }: { children: React.ReactNode }) { return <div className="station-eyebrow"><span/>{children}</div>; }

const previews = [
  { key: 'site', label: 'Sito', name: 'Sito standard', price: 'da 344 €', tag: 'SITO STANDARD' },
  { key: '3d', label: 'Motion', name: 'Sito motion capture', price: 'da 744 €', tag: 'MOTION' },
  { key: 'social', label: 'Social', name: 'Gestione social', price: 'da 149 €/mese', tag: 'CAROSELLI + REEL' },
] as const;

const sites = [
  { name: 'Sito standard', price: 'da 344 €', unit: 'una tantum', mock: 'site', description: 'Un sito moderno e veloce. Chi ti cerca trova subito quello che serve.', points: ['Ottimizzato per smartphone', 'Menu, orari, mappa e WhatsApp', 'SEO locale e scheda Google collegata'] },
  { name: 'Sito motion capture', price: 'da 744 €', unit: 'una tantum', mock: '3d', description: 'Il sito standard con animazioni in movimento: le sezioni prendono vita mentre scorri.', points: ['Animazioni e transizioni in movimento', 'Scene animate con il modello che hai già', 'Più sezioni: storia, eventi, galleria'] },
  { name: 'Montaggio e clipping video', price: 'Su preventivo', unit: 'in base al progetto', mock: 'video', description: 'Dall’idea al video finito: animazioni in motion e montaggio di video anche molto lunghi.', points: ['Animazioni in motion, anche su video reali', 'Montaggio di video lunghi, anche podcast oltre l’ora', 'Clip verticali pronte per Instagram e TikTok'] },
];

const plans = [
  { name: 'Social Base', price: '149 €', points: ['8 caroselli al mese, da 1 a 5 immagini', '4 reel al mese, da 15 a 30 secondi', 'Formati pronti per Instagram e TikTok', 'Da approvare su WhatsApp, un giro di modifiche'] },
  { name: 'Social Plus', price: '249 €', points: ['16 caroselli al mese, da 1 a 5 immagini', '8 reel al mese, da 15 a 30 secondi', '10 stories al mese, inviate come materiale', 'Formati pronti per Instagram e TikTok'] },
];

const slides = [1, 2, 3, 4, 5].map(n => `/sito-social/car-${n}.jpg`);

// Entrata animata: ogni blocco compare quando arriva sullo schermo.
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null), [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el || seen) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: .25 });
    io.observe(el); return () => io.disconnect();
  }, [seen]);
  return [ref, seen] as const;
}

// La revisione dei contenuti avviene su WhatsApp: Otto manda il carosello, che si sfoglia come sul telefono.
function OttoChat() {
  const [slide, setSlide] = useState(0);
  const [ref, seen] = useReveal<HTMLDivElement>(), [step, setStep] = useState(0);
  useEffect(() => {
    if (!seen || step >= 2) return;
    const t = setTimeout(() => setStep(n => n + 1), step === 0 ? 1000 : 1700); return () => clearTimeout(t);
  }, [seen, step]);
  return <div className="wa" ref={ref}>
    <div className="wa-head"><span className="wa-avatar"><OttoIcon mood="happy" size={20}/></span><div><b>Otto · CSD Station</b><small>{seen && step < 2 ? 'sta scrivendo…' : 'online'}</small></div><em>ESEMPIO</em></div>
    <div className="wa-body">
      <span className="wa-day">OGGI</span>
      <div className={`wa-msg in ${step >= 1 ? '' : 'wa-later'}`}>{seen && step === 0 && <span className="wa-msg in wa-typing"><i/><i/><i/></span>}<p>Ciao Marco! Ecco il carosello di lunedì. Sfoglialo e dimmi se va bene 👇</p><time>10:02</time></div>
      <div className={`wa-msg in wa-attach ${step >= 2 ? '' : 'wa-later'}`}>{step === 1 && <span className="wa-msg in wa-typing"><i/><i/><i/></span>}
        <div className="wa-slide"><img src={slides[slide]} alt={`Slide ${slide + 1} del carosello d’esempio`}/><span className="wa-count">{slide + 1}/{slides.length}</span>
          <button type="button" className="wa-arrow l" aria-label="Slide precedente" disabled={slide === 0} onClick={() => setSlide(slide - 1)}><ChevronLeft size={16}/></button>
          <button type="button" className="wa-arrow r" aria-label="Slide successiva" disabled={slide === slides.length - 1} onClick={() => setSlide(slide + 1)}><ChevronRight size={16}/></button>
        </div>
        <div className="wa-dots">{slides.map((_, i) => <i key={i} className={i === slide ? 'on' : ''}/>)}</div>
        <p><Images size={13}/> Carosello · 5 slide · <b>lun 12:30</b></p><time>10:02</time>
      </div>
    </div>
  </div>;
}

function Reveal({ as: Tag = 'div', className = '', children, ...rest }: { as?: 'div' | 'section'; className?: string; id?: string; children: React.ReactNode }) {
  const [ref, seen] = useReveal<HTMLElement>();
  return <Tag ref={ref as React.RefObject<HTMLDivElement>} className={`${className} reveal ${seen ? 'in' : ''}`} {...rest}>{children}</Tag>;
}

export default function SitoSocial({ children }: { children?: React.ReactNode }) {
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
      <div className="web-preview"><div className={preview.key === 'site' ? 'on' : ''}><SiteMock/></div><div className={preview.key === '3d' ? 'on' : ''}><MotionVideo/></div><div className={preview.key === 'social' ? 'on' : ''}><SocialMock/></div></div>
      <span className="product-float">{preview.key === 'social' ? <Images size={18}/> : <Globe size={18}/>} {preview.tag}</span>
      <div className="product-selector" role="group" aria-label="Anteprima del servizio">{previews.map((p, i) => <button key={p.key} type="button" aria-pressed={selected === i} onClick={() => setSelected(i)} className={selected === i ? 'selected' : ''}>{p.label}</button>)}</div>
      <div className="product-caption"><span>{preview.name}</span><b>{preview.price}</b></div>
    </div></div></section>
    <div className="web-after">
    <div className="expertise-strip nfc-strip web-strip"><div className="wrap"><span>UN PERCORSO COMPLETO</span><b><Nfc size={18}/> Ti trovano su Maps</b><b><Globe size={18}/> Arrivano sul tuo sito</b><b><Images size={18}/> Ti seguono sui social</b><b><Users size={18}/> Tornano da te</b></div></div>

    <Reveal as="section" className="product-section" id="siti"><div className="wrap">
      <div className="section-heading"><div><Eyebrow>01 / IL SITO</Eyebrow><h2>La tua vetrina.<br/>Tre modi di costruirla.</h2></div><p>Siti moderni e veloci, pensati prima di tutto per chi ti cerca dallo smartphone. Le animazioni sono un passo in più, non un obbligo.</p></div>
      <div className="products-grid">{sites.map((s, i) => <article className="product-card web-card" key={s.name}>
        <div className="web-card-head">{s.mock === 'video' ? <VideoMock/> : s.mock === '3d' ? <MotionVideo/> : <SiteMock/>}<span>0{i + 1}</span></div>
        <div className="product-card-content"><h3>{s.name}</h3><p>{s.description}</p>
          <ul className="web-points">{s.points.map(point => <li key={point}><Check size={14}/>{point}</li>)}</ul>
          <div className="price-row"><strong>{s.price}</strong><span>{s.unit}</span></div>
          <a className="station-button" href={whatsapp(`Ciao Carlo! Mi interessa il formato ${s.name} (${s.price}) per il sito della mia attività.`)} target="_blank" rel="noreferrer">Parliamone <ArrowUpRight size={17}/></a>
        </div>
      </article>)}</div>
      <p className="catalog-note">Dominio, hosting e testi si concordano nel preventivo. Il sito resta della tua attività.</p>
    </div></Reveal>

    <Reveal as="section" className="web-social wrap" id="social">
      <div className="section-heading"><div><Eyebrow>02 / I SOCIAL</Eyebrow><h2>Ogni mese, contenuti pronti.<br/><span>Tu approvi, io pubblico.</span></h2></div><p>Instagram, TikTok, YouTube Shorts e Facebook. Caroselli, reel e video animati, da approvare con un messaggio.</p></div>
      <div className="web-social-layout">
        <div className="web-plans">{plans.map(p => <article key={p.name} className="web-plan">
          <h3>{p.name}</h3>
          <div className="price-row"><strong>{p.price}</strong><span>al mese</span></div>
          <ul className="web-points">{p.points.map(point => <li key={point}><Check size={14}/>{point}</li>)}</ul>
          <a className="text-link" href={whatsapp(`Ciao Carlo! Mi interessa il piano ${p.name} (${p.price} al mese) per i social della mia attività.`)} target="_blank" rel="noreferrer">Richiedi {p.name} <ArrowUpRight size={16}/></a>
        </article>)}
          <article className="web-plan web-plan-extra"><Clapperboard size={22}/><div><h3>Montaggio e clipping video</h3><p>Dall’idea al video finito: animazioni in motion, anche su video reali, montaggio di video lunghi e podcast anche oltre l’ora, clip verticali da interviste, eventi o dirette. Su preventivo, in base a durata e lavoro.</p></div></article>
        </div>
        <OttoChat/>
      </div>
      <ol className="tap-steps web-steps">
        <li><span>01</span> Pianifichiamo insieme il mese.</li>
        <li><span>02</span> Mi mandi i video dal telefono, oppure giriamo mezza giornata insieme.</li>
        <li><span>03</span> Otto ti manda i contenuti su WhatsApp: approvi o chiedi una modifica.</li>
        <li><span>04</span> Pubblico e ti mando un riepilogo a fine mese.</li>
      </ol>
    </Reveal>

    <section className="web-bundle" id="pacchetto"><div className="wrap web-bundle-inner">
      <div><Eyebrow>03 / IL PACCHETTO PRESENZA</Eyebrow><h2>Sito nuovo e social.<br/><span>Un solo canone.</span></h2><p>Il Sito standard è compreso nel canone. Paghi l’attivazione una volta, poi una quota fissa al mese. Nessun vincolo: puoi interrompere quando vuoi.</p></div>
      <div className="web-bundle-card">
        <span className="web-bundle-tag">SITO STANDARD + SOCIAL BASE</span>
        <div className="web-bundle-price"><strong>290 €</strong><span>al mese</span></div>
        <small>+ 90 € di attivazione, una sola volta</small>
        <ul className="web-points">{['Sito standard incluso nel canone', 'Social Base: 8 caroselli e 4 reel al mese', 'Dominio gestito da noi e intestato alla tua attività', 'Puoi interrompere in qualsiasi momento'].map(point => <li key={point}><Check size={14}/>{point}</li>)}</ul>
        <a className="station-button" href={whatsapp('Ciao Carlo! Mi interessa il Pacchetto Presenza (Sito standard + Social Base). Possiamo parlarne?')} target="_blank" rel="noreferrer">Richiedi il pacchetto <ArrowUpRight size={17}/></a>
      </div>
    </div></section>

    <section className="nfc-included wrap" id="regole"><div className="section-heading"><div><Eyebrow>COME LAVORO</Eyebrow><h2>Poche regole chiare.<br/>Da entrambe le parti.</h2></div><div className="web-desk-wrap">
        {/* Otto al lavoro sul portatile, seduto sopra la frase: monta un video */}
        <div className="web-desk" aria-hidden="true">
          <div className="web-laptop"><div className="web-laptop-screen"><span className="wl-view"/><span className="wl-track"><b style={{ width: '38%' }}/><b className="b2" style={{ width: '22%' }}/><b style={{ width: '30%' }}/></span><span className="wl-track"><b className="b3" style={{ width: '70%' }}/></span><i className="wl-head"/></div><span className="web-laptop-base"/></div>
          <div className="web-desk-otto"><Otto mood="busy"/></div>
        </div>
        <p>Preferisco seguire bene poche attività che promettere a tutti risultati che non dipendono solo da me.</p>
      </div></div>
      <div className="included-grid">{[
        { icon: Users, title: 'Posti limitati', text: 'Seguo al massimo 6 attività per volta. Così ognuna ha il tempo e l’attenzione che merita.' },
        { icon: Camera, title: 'Solo materiale vero', text: 'I tuoi piatti, il tuo locale, le tue persone. L’AI aiuta a montare e animare, non a inventare.' },
        { icon: ShieldCheck, title: 'Niente promesse gonfiate', text: 'Non garantisco follower, prenotazioni o vendite. Nel riepilogo mensile trovi i dati che le piattaforme rendono disponibili.' },
      ].map(v => <article key={v.title}><v.icon size={28}/><h3>{v.title}</h3><p>{v.text}</p></article>)}</div>
    </section>

    <div className="wrap nfc-crosslink"><div><span>HAI GIÀ LE CARD NFC?</span><h3>Il primo passo per farti trovare è su Google Maps.</h3><p>Card, plate e stand portano i clienti alla tua scheda. Il sito e i social fanno il resto.</p></div><Link className="text-link" to={servicePaths.nfc}>Scopri le card NFC <ArrowUpRight size={18}/></Link></div>
    {children}
    </div>
  </>;
}

const instagram = 'https://www.instagram.com/carlogalli.ai';

// Da telefono: tre blocchi leggeri, dal servizio che costa meno. Niente 3D e niente pacchetto.
export function SitoSocialMobile() {
  const blocks = [
    { n: '01', eyebrow: 'GESTIONE SOCIAL', title: <>Ogni mese,<br/><em>contenuti pronti.</em></>, price: 'da 149 €', unit: 'al mese', mock: <SocialMock/>,
      points: ['8 caroselli e 4 reel al mese con Social Base', '16 caroselli, 8 reel e 10 stories con Social Plus (249 €)', 'Formati per Instagram e TikTok, approvati su WhatsApp'],
      cta: 'Ciao Carlo! Vorrei informazioni sulla gestione dei social per la mia attività.' },
    { n: '02', eyebrow: 'SITO STANDARD', title: <>La tua vetrina.<br/><em>Veloce e chiara.</em></>, price: 'da 344 €', unit: 'una tantum', mock: <SiteMock/>,
      points: ['Pensato prima di tutto per lo smartphone', 'Menu, orari, mappa e WhatsApp', 'SEO locale e scheda Google collegata'],
      cta: 'Ciao Carlo! Mi interessa il Sito standard per la mia attività.' },
    { n: '03', eyebrow: 'SITO MOTION', title: <>Il sito che<br/><em>prende vita.</em></>, price: 'da 744 €', unit: 'una tantum', mock: <MotionVideo/>,
      points: ['Animazioni e transizioni in movimento', 'Scene animate con il modello che hai già', 'Più sezioni: storia, eventi, galleria'],
      cta: 'Ciao Carlo! Mi interessa il Sito motion per la mia attività.' },
  ];
  return <div className="mobile-landing mobile-web">
    {blocks.map((b, i) => <section key={b.n} className="mobile-section" aria-labelledby={`mobile-web-${b.n}`}>
      <span className="mobile-eyebrow">{i === 0 ? <i/> : null}{b.n} / {b.eyebrow}</span>
      {i === 0 ? <h1 id={`mobile-web-${b.n}`}>{b.title}</h1> : <h2 id={`mobile-web-${b.n}`}>{b.title}</h2>}
      {i === 0 ? <a className="mw-mock" href={instagram} target="_blank" rel="noreferrer" aria-label="Apri il profilo Instagram di CSD Station">{b.mock}</a> : <div className="mw-mock">{b.mock}</div>}
      <div className="mw-price"><strong>{b.price}</strong><span>{b.unit}</span></div>
      {i === 0 && <a className="mw-ig" href={instagram} target="_blank" rel="noreferrer">Guarda il profilo Instagram <ArrowUpRight size={15}/></a>}
      <ul className="mw-points">{b.points.map(point => <li key={point}><Check size={15}/>{point}</li>)}</ul>
      <a className="mobile-primary" href={whatsapp(b.cta)} target="_blank" rel="noreferrer">Scrivimi su WhatsApp <ArrowUpRight size={20}/></a>
      {i === 2 && <Link className="mobile-crosslink" to={servicePaths.nfc}><span>Hai già le card NFC?<small>Il primo passo per farti trovare su Google Maps.</small></span><ArrowUpRight size={20}/></Link>}
    </section>)}
  </div>;
}
