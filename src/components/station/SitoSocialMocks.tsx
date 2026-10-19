import { Clapperboard, Copy, Grid3x3 } from 'lucide-react';
import ModelLoop from './ModelLoop';

// Mockup della sezione Sito & Social. Misure in em: la scala la decide chi li ospita.

// Sito standard: una pagina negozio, senza marchio.
function Shop() {
  return <div className="mk-page mk-shop">
    <div className="mk-nav"><i className="mk-logo"/><span/><span/><span/><b className="mk-cart"/></div>
    <div className="mk-banner"><div><span className="l1"/><span className="l2"/><em/></div></div>
    <div className="mk-products">{[0, 1, 2, 3].map(i => <div key={i}><i className={`p${i}`}/><span/><b/></div>)}</div>
  </div>;
}

// Sito motion capture: la stessa idea di pagina, con la casa animata nella hero.
function Page3D({ lite = false }: { lite?: boolean }) {
  return <div className="mk-page mk-3d">
    <div className="mk-nav"><i className="mk-logo"/><span/><span/><span/></div>
    <div className="mk-3d-hero"><div><span className="l1"/><span className="l2"/><span className="l3"/><em/></div>{lite ? <div className="mk-pulse"><i/><i/><i/></div> : <div className="mk-loop-house"><ModelLoop kind="house"/></div>}</div>
    <div className="mk-strip"><span/><span/><span/></div>
  </div>;
}

export function SiteMock({ three = false, lite = false }: { three?: boolean; lite?: boolean }) {
  return <div className="mk-browser" aria-hidden="true">
    <div className="mk-bar"><i/><i/><i/><span>la-tua-attivita.it</span></div>
    {three ? <Page3D lite={lite}/> : <Shop/>}
  </div>;
}

// Montaggio e clipping: un editor con l'anteprima di un piatto e la timeline che scorre.
export function VideoMock() {
  return <div className="mk-editor" aria-hidden="true">
    <div className="mk-bar"><i/><i/><i/><span>montaggio-finale.mp4</span></div>
    <div className="mk-ed-view"><div className="mk-shot"><i className="mk-plate"/></div><span className="mk-rec"><i/> REC · 4K</span><span className="mk-frame"/></div>
    <div className="mk-ed-tracks">
      <div><b className="v1" style={{ left: '2%', width: '30%' }}/><b className="v2" style={{ left: '34%', width: '22%' }}/><b className="v1" style={{ left: '58%', width: '36%' }}/></div>
      <div><b className="c1" style={{ left: '10%', width: '14%' }}/><b className="c1" style={{ left: '40%', width: '10%' }}/><b className="c1" style={{ left: '70%', width: '16%' }}/></div>
      <div><b className="a1" style={{ left: '2%', width: '92%' }}/></div>
      <span className="mk-playhead"/>
    </div>
  </div>;
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
