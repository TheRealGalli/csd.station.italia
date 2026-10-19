import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Camera, Check, CheckCheck, ChevronLeft, ChevronRight, Clapperboard, Globe, Images, Nfc, Play, ShieldCheck, Users } from 'lucide-react';
import { servicePaths } from '@/seo/routes';
import { OttoIcon } from './OttoIcon';
import SitoSocialFilm from './SitoSocialFilm';
import './sito-social.css';

// Prezzi provvisori: da confermare prima della pubblicazione definitiva.
const whatsapp = (message: string) => `https://wa.me/393518628203?text=${encodeURIComponent(message)}`;
export const webContact = whatsapp('Ciao Carlo! Vorrei informazioni su sito e social per la mia attività.');
function Eyebrow({ children }: { children: React.ReactNode }) { return <div className="station-eyebrow"><span/>{children}</div>; }

const sites = [
  { name: 'Sito React', price: 'da 690 €', unit: 'una tantum', image: '/sito-social/card-site.jpg', description: 'Un sito moderno e veloce, in React. Chi ti cerca trova subito quello che serve.', points: ['Ottimizzato per smartphone', 'Menu, orari, mappa e WhatsApp', 'SEO locale e scheda Google collegata'] },
  { name: 'Sito 3D / VFX', price: 'da 1.490 €', unit: 'una tantum', image: '/sito-social/card-3d.jpg', description: 'Il Sito React con animazioni in motion e una scena 3D costruita sul modello che hai già.', points: ['Modello 3D che hai già', 'Animazioni e transizioni in motion', 'Più sezioni: storia, eventi, galleria'] },
  { name: 'Modello 3D / VFX su misura', price: 'Su preventivo', unit: 'in base al soggetto', image: '/sito-social/card-model.jpg', description: 'Creiamo il modello del tuo piatto, del locale o di un prodotto. Da usare nel sito e nei video.', points: ['Piatto, ambiente o prodotto', 'Riutilizzabile nei contenuti social', 'Si aggiunge a qualsiasi formato'] },
];

const plans = [
  { name: 'Social Base', price: '149 €', points: ['8 caroselli al mese', '4 reel o short al mese', 'Contenuti da approvare su WhatsApp', 'Un giro di modifiche incluso'] },
  { name: 'Social Plus', price: '249 €', points: ['12 caroselli al mese', '8 reel, short o clip al mese', 'Stories ogni settimana', 'Una campagna al mese, anche WhatsApp'] },
];

const slides = [
  { image: '/sito-social/card-site.jpg', title: 'Il menu d’autunno', note: 'Piatto per piatto' },
  { image: '/sito-social/card-model.jpg', title: 'Fatto a mano', note: 'Ogni mattina, in cucina' },
  { image: '/sito-social/card-3d.jpg', title: 'Nuovo: il tagliere', note: 'Da venerdì in carta' },
  { image: '/sito-social/card-social.jpg', title: 'Ci trovi anche qui', note: 'Prenota su WhatsApp' },
  { image: '/sito-social/card-site.jpg', title: 'Ti aspettiamo', note: 'Aperti dalle 19' },
];

// La revisione dei contenuti avviene su WhatsApp, con Otto: allegati veri da sfogliare, poi si approva o si chiede una modifica.
function OttoChat() {
  const [slide, setSlide] = useState(0);
  const [answer, setAnswer] = useState<'ok' | 'edit' | null>(null);
  const [typing, setTyping] = useState(false);
  const reply = (a: 'ok' | 'edit') => { setAnswer(a); setTyping(true); setTimeout(() => setTyping(false), 1100); };
  const s = slides[slide];
  return <div className="wa">
    <div className="wa-head"><span className="wa-avatar"><OttoIcon mood="happy" size={20}/></span><div><b>Otto · CSD Station</b><small>{typing ? 'sta scrivendo…' : 'online'}</small></div><em>ESEMPIO</em></div>
    <div className="wa-body">
      <span className="wa-day">OGGI</span>
      <div className="wa-msg in"><p>Ciao Marco! Ecco i contenuti della prossima settimana. Sfoglia il carosello e dimmi se va bene 👇</p><time>10:02</time></div>
      <div className="wa-msg in wa-attach">
        <div className="wa-slide"><img src={s.image} alt="" loading="lazy"/><div><b>{s.title}</b><small>{s.note}</small></div><span className="wa-count">{slide + 1}/{slides.length}</span>
          <button type="button" className="wa-arrow l" aria-label="Slide precedente" disabled={slide === 0} onClick={() => setSlide(slide - 1)}><ChevronLeft size={16}/></button>
          <button type="button" className="wa-arrow r" aria-label="Slide successiva" disabled={slide === slides.length - 1} onClick={() => setSlide(slide + 1)}><ChevronRight size={16}/></button>
        </div>
        <div className="wa-dots">{slides.map((_, i) => <i key={i} className={i === slide ? 'on' : ''}/>)}</div>
        <p><Images size={13}/> Carosello · 5 slide · <b>lun 12:30</b></p><time>10:02</time>
      </div>
      <div className="wa-msg in wa-attach"><div className="wa-reel"><img src="/sito-social/card-social.jpg" alt="" loading="lazy"/><span><Play size={18} fill="currentColor"/></span><small>0:20</small></div><p><Clapperboard size={13}/> Reel · dalla cucina · <b>gio 19:00</b></p><time>10:03</time></div>
      {answer && <div className="wa-msg out"><p>{answer === 'ok' ? 'Approvati tutti e due 👍' : 'Nella slide 3 metterei la foto del piatto nuovo'}</p><time>10:05 <CheckCheck size={13}/></time></div>}
      {answer && typing && <div className="wa-msg in wa-typing"><i/><i/><i/></div>}
      {answer && !typing && <div className="wa-msg in"><p>{answer === 'ok' ? 'Perfetto! Li programmo: lunedì alle 12:30 e giovedì alle 19:00. A fine mese ti mando il riepilogo ✅' : 'Ricevuto! Rifaccio la slide 3 con il piatto nuovo e ti mando la bozza entro domani. È la modifica inclusa del mese ✏️'}</p><time>10:05</time></div>}
    </div>
    <div className="wa-replies">{answer ? <button type="button" onClick={() => { setAnswer(null); setSlide(0); }}>Ricomincia l’esempio</button> : <><button type="button" onClick={() => reply('ok')}>👍 Approva tutto</button><button type="button" onClick={() => reply('edit')}>✏️ Cambia la slide 3</button></>}</div>
  </div>;
}

export default function SitoSocial({ children }: { children?: React.ReactNode }) {
  const [live, setLive] = useState(false);
  return <>
    <SitoSocialFilm onLive={setLive}/>
    <div className={`web-after ${live ? 'on' : ''}`}>
    <div className="expertise-strip nfc-strip web-strip"><div className="wrap"><span>UN PERCORSO COMPLETO</span><b><Nfc size={18}/> Ti trovano su Maps</b><b><Globe size={18}/> Arrivano sul tuo sito</b><b><Images size={18}/> Ti seguono sui social</b><b><Users size={18}/> Tornano da te</b></div></div>

    <section className="product-section" id="siti"><div className="wrap">
      <div className="section-heading"><div><Eyebrow>01 / IL SITO</Eyebrow><h2>La tua vetrina.<br/>Tre modi di costruirla.</h2></div><p>Siti moderni e veloci, pensati prima di tutto per chi ti cerca dallo smartphone. Il 3D e il VFX sono un passo in più, non un obbligo.</p></div>
      <div className="products-grid">{sites.map((s, i) => <article className="product-card web-card" key={s.name}>
        <div className="web-card-head"><img src={s.image} alt={`${s.name}: esempio`} loading="lazy"/><span>0{i + 1}</span></div>
        <div className="product-card-content"><h3>{s.name}</h3><p>{s.description}</p>
          <ul className="web-points">{s.points.map(point => <li key={point}><Check size={14}/>{point}</li>)}</ul>
          <div className="price-row"><strong>{s.price}</strong><span>{s.unit}</span></div>
          <a className="station-button" href={whatsapp(`Ciao Carlo! Mi interessa il formato ${s.name} (${s.price}) per il sito della mia attività.`)} target="_blank" rel="noreferrer">Parliamone <ArrowUpRight size={17}/></a>
        </div>
      </article>)}</div>
      <p className="catalog-note">Dominio, hosting e testi si concordano nel preventivo. Il sito resta della tua attività.</p>
    </div></section>

    <section className="web-social wrap" id="social">
      <div className="section-heading"><div><Eyebrow>02 / I SOCIAL</Eyebrow><h2>Ogni mese, contenuti pronti.<br/><span>Tu approvi, io pubblico.</span></h2></div><p>Instagram, TikTok, YouTube Shorts e Facebook. Caroselli, reel e video animati, da approvare con un messaggio.</p></div>
      <div className="web-social-layout">
        <div className="web-plans">{plans.map(p => <article key={p.name} className="web-plan">
          <h3>{p.name}</h3>
          <div className="price-row"><strong>{p.price}</strong><span>al mese</span></div>
          <ul className="web-points">{p.points.map(point => <li key={point}><Check size={14}/>{point}</li>)}</ul>
          <a className="text-link" href={whatsapp(`Ciao Carlo! Mi interessa il piano ${p.name} (${p.price} al mese) per i social della mia attività.`)} target="_blank" rel="noreferrer">Richiedi {p.name} <ArrowUpRight size={16}/></a>
        </article>)}
          <article className="web-plan web-plan-extra"><Clapperboard size={22}/><div><h3>Clipping e montaggio video</h3><p>Clip verticali da interviste, eventi o dirette, e montaggi completi con animazioni in motion e grafiche React dentro il video. Su preventivo.</p></div></article>
        </div>
        <OttoChat/>
      </div>
      <ol className="tap-steps web-steps">
        <li><span>01</span> Pianifichiamo insieme il mese.</li>
        <li><span>02</span> Mi mandi i video dal telefono, oppure giriamo mezza giornata insieme.</li>
        <li><span>03</span> Otto ti manda i contenuti su WhatsApp: approvi o chiedi una modifica.</li>
        <li><span>04</span> Pubblico e ti mando un riepilogo a fine mese.</li>
      </ol>
    </section>

    <section className="web-bundle" id="pacchetto"><div className="wrap web-bundle-inner">
      <div><Eyebrow>03 / IL PACCHETTO PRESENZA</Eyebrow><h2>Sito nuovo e social.<br/><span>Un solo canone.</span></h2><p>Il Sito React è compreso nel canone. Paghi l’attivazione una volta, poi una quota fissa al mese per un anno.</p></div>
      <div className="web-bundle-card">
        <span className="web-bundle-tag">SITO REACT + SOCIAL BASE</span>
        <div className="web-bundle-price"><strong>590 €</strong><span>al mese · 12 mesi</span></div>
        <small>+ 490 € di attivazione, una sola volta</small>
        <ul className="web-points">{['Sito React incluso nel canone', '8 caroselli e 4 reel ogni mese', 'Dominio intestato alla tua attività', 'Se interrompi prima dei 12 mesi, saldi la quota restante del sito'].map(point => <li key={point}><Check size={14}/>{point}</li>)}</ul>
        <a className="station-button" href={whatsapp('Ciao Carlo! Mi interessa il Pacchetto Presenza (Sito React + Social Base). Possiamo parlarne?')} target="_blank" rel="noreferrer">Richiedi il pacchetto <ArrowUpRight size={17}/></a>
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
    {children}
    </div>
  </>;
}

// Su telefono l'esperienza non è ancora presentabile: un invito ad aprirla dal computer.
export function SitoSocialMobile() {
  return <section className="web-desktop-only"><div className="station-eyebrow"><span/>SITO & SOCIAL</div><h1>Questa sezione<br/><span>si apre dal computer.</span></h1><p>Siti React, 3D e gestione dei social: l’esperienza interattiva è pensata per lo schermo grande. Nel frattempo, scrivimi pure su WhatsApp.</p><a className="station-button" href={webContact} target="_blank" rel="noreferrer">Scrivimi su WhatsApp <ArrowUpRight size={18}/></a></section>;
}
