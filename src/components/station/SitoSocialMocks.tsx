import { Clapperboard, Copy, Grid3x3 } from 'lucide-react';
import ModelLoop from './ModelLoop';

// Mockup della sezione Sito & Social. Misure in em: la scala la decide chi li ospita.

// Sito React: una pagina negozio standard, senza marchio.
function Shop() {
  return <div className="mk-page mk-shop">
    <div className="mk-nav"><i className="mk-logo"/><span/><span/><span/><b className="mk-cart"/></div>
    <div className="mk-banner"><div><span className="l1"/><span className="l2"/><em/></div></div>
    <div className="mk-products">{[0, 1, 2, 3].map(i => <div key={i}><i className={`p${i}`}/><span/><b/></div>)}</div>
  </div>;
}

// Sito 3D: la stessa idea di pagina, con un modello che ruota nella hero.
function Page3D() {
  return <div className="mk-page mk-3d">
    <div className="mk-nav"><i className="mk-logo"/><span/><span/><span/></div>
    <div className="mk-3d-hero"><div><span className="l1"/><span className="l2"/><span className="l3"/><em/></div><div className="mk-loop-house"><ModelLoop kind="house"/></div></div>
    <div className="mk-strip"><span/><span/><span/></div>
  </div>;
}

export function SiteMock({ three = false }: { three?: boolean }) {
  return <div className="mk-browser" aria-hidden="true">
    <div className="mk-bar"><i/><i/><i/><span>la-tua-attivita.it</span></div>
    {three ? <Page3D/> : <Shop/>}
  </div>;
}

export function ModelMock() {
  return <div className="mk-model" aria-hidden="true"><div className="mk-loop-otto"><ModelLoop kind="otto"/></div><span>OTTO · PEZZO PER PEZZO</span></div>;
}

// Social: il profilo Instagram di CSD Station, con i caroselli veri. Avatar e caroselli aprono il profilo.
const instagram = 'https://www.instagram.com/carlogalli.ai';
export function SocialMock() {
  return <div className="mk-phone">
    <div className="mk-ig-head"><a href={instagram} target="_blank" rel="noreferrer" aria-label="Il profilo Instagram di CSD Station"><img src="/sito-social/avatar.jpg" alt=""/></a><div><b>csd-station</b><span><em>12</em> post</span><span><em>9</em> caroselli</span></div></div>
    <div className="mk-ig-tabs"><Grid3x3 size={11}/><Clapperboard size={11}/></div>
    <div className="mk-grid">{[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => <a key={n} href={instagram} target="_blank" rel="noreferrer" aria-label={`Carosello ${n} su Instagram`}><img src={`/sito-social/ig-${n}.jpg`} alt="" loading="lazy"/><Copy size={9}/></a>)}</div>
  </div>;
}
