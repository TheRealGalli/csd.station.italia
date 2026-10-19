import { Play } from 'lucide-react';

// Mockup contestuali: un ristorante d'esempio, non un'identità astratta. Misure in em: la scala la decide chi li ospita.
export function SiteMock({ three = false }: { three?: boolean }) {
  return <div className="mk-browser" aria-hidden="true">
    <div className="mk-bar"><i/><i/><i/><span>trattoriadelborgo.it</span></div>
    <div className="mk-page">
      <div className="mk-nav"><b>Trattoria del Borgo</b><span>Menu</span><span>Storia</span><span>Contatti</span></div>
      <div className="mk-hero"><div><small>FIRENZE · DAL 1987</small><strong>Cucina toscana,<br/>fatta a mano.</strong><em>Prenota un tavolo</em></div>
        {three ? <div className="mk-sphere">{[0, 1, 2, 3, 4, 5].map(i => <i key={i} style={{ transform: `rotateY(${i * 30}deg)` }}/>)}<b/></div> : <div className="mk-photo"><span>Pici al ragù</span></div>}</div>
      <div className="mk-rows"><span><b>Pici al ragù</b>14 €</span><span><b>Ribollita</b>11 €</span><span><b>Tagliata</b>22 €</span></div>
    </div>
  </div>;
}
export function SocialMock() {
  return <div className="mk-phone" aria-hidden="true">
    <div className="mk-phone-head"><span/><div><b>trattoria.delborgo</b><small>12 post questo mese</small></div></div>
    <div className="mk-grid">{['Menu d’autunno', '', 'Fatto a mano', '', '', '', 'Ribollita', '', ''].map((t, i) => <span key={i} className={`t${i % 4}`}>{i === 0 ? <em>1/5</em> : i === 4 ? <Play size={10} fill="currentColor"/> : null}{t ? <small>{t}</small> : null}</span>)}</div>
    <div className="mk-legend"><span><i className="a"/>Carosello · 5 slide</span><span><i className="b"/>Reel · 20 s</span></div>
  </div>;
}
