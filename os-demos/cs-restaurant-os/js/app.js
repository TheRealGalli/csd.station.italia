import {icon, otto} from './icons.js';
import {modules, groups, groupNotes, moduleById} from './modules.js';
import * as D from './demo.js';
import {startTour} from './tour.js';
import {initGame, gameChip, mountGame, gameInvite, gameOn, openShop, gameIntro, ecoPoints, missionPanel, gamePaused, isReserved, penalty, gameLevel, ottoMessage, setPressure, later} from './game.js';
import {story} from './story.js';
import {challenges} from './challenges.js';
import {startMissions, stopMissions} from './missions.js';
import {restaurantTour} from './tour-steps.js';
import {now as NOW, service as SV} from './clock.js';

const app = document.querySelector('#app'), dialog = document.querySelector('#dialog');
const compact = matchMedia('(max-width:760px)');
const route = () => location.hash.slice(1) || 'home';
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rich = v => esc(v).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
const euro = n => new Intl.NumberFormat('it-IT', {style:'currency', currency:'EUR', maximumFractionDigits:n % 1 ? 2 : 0}).format(n);
const minutes = t => t ? Math.max(1, Math.round((Date.now() - t) / 60000) + 18) : 0; // +18: il servizio è iniziato prima dell'apertura della demo
const badge = (s, c='') => `<span class="badge ${c}">${s}</span>`;
const btn = (label, act, c='btn-primary', i='arrow') => `<button class="btn ${c}" data-action="${act}">${label}${i ? icon(i) : ''}</button>`;
const heading = (k, t, p, a='') => `<div class="page-heading"><div><span class="eyebrow">${k}</span><h1>${t}</h1><p>${p}</p></div>${a}</div>`;
const brand = () => `<span class="brand-symbol"><i></i><i></i><i></i></span><span class="brand-type">CSD <span>Station</span><small>CS RESTAURANT OS</small></span>`;
const ottoNote = (text, cls='') => `<div class="otto-note ${cls}"><span class="otto-dot">${icon('sparkle')}</span><div><span class="eyebrow">OTTO</span><p>${rich(text)}</p></div></div>`;
const ottoPanel = (title, text, action='') => `<div class="otto-panel"><span class="eyebrow">${icon('sparkle')} ${title}</span><p>${rich(text)}</p>${action}</div>`;
const stateLabel = {waiting:['In attesa', 'badge-amber'], cooking:['In preparazione', 'badge-violet'], ready:['Pronto al pass', 'badge-green'], served:['Servito', '']};
const tableLabel = {free:'Libero', seated:'Accomodati', ordered:'In servizio', bill:'Conto'};
let returnFocus, toastTimer, lastRoute = null, renderQueued = false;
const ui = {ticket:null, table:'T3', adding:false, otto:[], category:'all', query:'', prev:{}, done:{reviews:[], haccp:[]}, qr:{table:'T7', cart:{}, step:'menu', cat:'Primi', receipt:null}, menuReply:''};

// ————— shell —————
function navItem(id, title, ic, extra='') {
 const a = route() === id;
 return `<a href="#${id}" class="nav-item ${a ? 'active' : ''}" ${a ? 'aria-current="page"' : ''}>${icon(ic)}<span>${title}</span>${extra}</a>`;
}
function navCounts() {
 return {sala:D.tables.filter(t => t.status !== 'free').length, kds:D.kitchenLines().filter(l => l.state !== 'served').length, magazzino:D.lowStock().length, recensioni_ai:D.reviews.filter(r => !ui.done.reviews.includes(r.who)).length};
}
function shell() {
 const c = navCounts();
 const extra = m => m.group === 'ai' ? '<small class="ai-mark">AI</small>' : c[m.id] ? `<small class="nav-count ${m.id === 'magazzino' ? 'warn' : ''}">${c[m.id]}</small>` : '';
 app.innerHTML = `<aside class="sidebar" id="workspace-navigation" aria-label="Navigazione principale">
  <button class="nav-close icon-btn" data-action="sidebar" aria-label="Chiudi navigazione">${icon('close')}</button>
  <a href="#home" class="brand" aria-label="CSD Station, il servizio di stasera">${brand()}</a>
  <div class="workspace-switch static"><span class="workspace-icon">${icon('store')}</span><span><strong>${esc(D.restaurant.name)}</strong><small>${esc(D.restaurant.city)} · ristorante dimostrativo</small></span></div>
  <nav><div class="nav-group">${navItem('home', SV.title, 'home', '<span class="live-dot"></span>')}${navItem('modules', 'L’ecosistema', 'flow')}</div>
  ${Object.entries(groups).map(([g, l]) => `<span class="nav-label">${l.toUpperCase()}</span>${modules.filter(m => m.group === g).map(m => navItem(m.id, m.title, m.icon, extra(m))).join('')}`).join('')}</nav>
  <div class="sidebar-bottom"><button class="plan-mini" data-action="otto"><span class="plan-orbit">${icon('otto-happy')}</span><span>Chiedi a Otto<small>Un solo assistente per tutto il locale</small></span>${icon('chevron')}</button>${navItem('settings', 'Impostazioni', 'settings')}<button class="account" data-action="account"><span class="avatar">MR</span><span>Marta Rinaldi<small>Titolare</small></span>${icon('down')}</button></div>
 </aside><div class="mobile-scrim" data-action="sidebar"></div>
 <div class="app-body"><header class="topbar"><div class="breadcrumbs"><button class="icon-btn mobile-toggle" data-action="sidebar" aria-label="Apri navigazione" aria-controls="workspace-navigation" aria-expanded="false">${icon('list')}</button><span>Locale</span>${icon('chevron')}<strong id="crumb"></strong></div>
  <div class="topbar-actions">${gameChip()}<button class="search-trigger" data-action="search" aria-label="Cerca">${icon('search')}<span>Cerca</span><kbd>⌘ K</kbd></button><button class="ask-otto" data-action="otto">${icon('otto-happy')}<span>Chiedi a Otto</span></button><button class="demo-btn" data-action="tour" aria-label="Demo interattiva" title="Demo interattiva"><i></i><span>Demo interattiva</span></button></div></header>
  <main id="main" tabindex="-1"></main>
  <footer class="app-footer"><span>CSD Station <span class="footer-divider">/</span> Il tuo ristorante, connesso.</span><span>Anteprima dimostrativa · locale, ospiti e numeri inventati · nessun servizio collegato</span></footer></div>
 <aside class="otto-drawer" id="otto-drawer" aria-label="Otto" hidden></aside><div class="live-stack" id="live-stack" aria-live="polite"></div>`;
 render(); syncNavigation();
}
const pages = {home, modules:catalog, settings, sala, kds, menu_pos:menuPos, magazzino, centralino_ai:centralino, recensioni_ai:recensioni, whatsapp, fidelity_nfc:fidelity, fatture, bandi, staff, app_builder:brandPage};
function render() {
 const id = route(), m = moduleById(id);
 const title = m?.title || {home:SV.title, modules:'L’ecosistema', settings:'Impostazioni'}[id] || 'Pagina non trovata';
 document.querySelector('#crumb').textContent = title; document.title = `${title} · CS Restaurant OS`;
 const main = document.querySelector('#main');
 main.className = id !== lastRoute ? 'enter' : ''; lastRoute = id;
 try {
  main.innerHTML = pages[id] ? pages[id]() : `<div class="empty-state"><h2>Questo spazio non esiste.</h2><a class="btn btn-primary" href="#home">Torna al servizio${icon('arrow')}</a></div>`;
  mountGame(id, main);
 } catch (err) { main.innerHTML = sectionError(err); }
 syncCounts();
}
// Mai una pagina bianca: se una sezione si rompe lo diciamo, e si riparte da uno stato pulito.
function sectionError(err) {
 console.warn('CS Restaurant OS · errore nella sezione', err);
 ui.qr = {table:'T1', cart:{}, step:'menu', cat:ui.qr?.cat, receipt:null}; ui.ticket = null; ui.adding = false;
 return `<div class="empty-state"><span class="empty-icon">${icon('otto-think')}</span><h2>Questa sezione si è inceppata.</h2><p>Il resto del locale continua a lavorare. Riprova: Otto riparte da uno stato pulito.</p><button class="btn btn-primary" data-action="retry">Riprova${icon('arrow')}</button></div>`;
}
// Aggiorna solo ciò che vive: chiamato a ogni evento del servizio.
function liveRefresh() {
 if (renderQueued) return; renderQueued = true;
 let ran = false;
 const run = () => {
  if (ran) return; ran = true;
  renderQueued = false;
  // con una nuvoletta di Otto aperta la pagina resta ferma: l'aggiornamento si fa appena si chiude
  if (gamePaused()) { setTimeout(liveRefresh, 600); return; }
  const busy = document.activeElement?.matches?.('input,textarea,select') || dialog.open;
  if (['home', 'sala', 'kds', 'menu_pos', 'magazzino', 'centralino_ai', 'recensioni_ai', 'fatture', 'staff'].includes(route()) && !busy) {
   const y = scrollY; render(); scrollTo(0, y);
  } else syncCounts();
 };
 // rAF per restare fluidi; il timeout copre le schede in background, dove rAF non scatta
 requestAnimationFrame(run); setTimeout(run, 300);
}
function syncCounts() {
 const c = navCounts();
 for (const [id, n] of Object.entries(c)) { const el = document.querySelector(`.sidebar a[href="#${id}"] .nav-count`); if (el) el.textContent = n; }
 if (document.body.classList.contains('otto-open')) {}
}
function kpi(key, label, value, sub, ic, cls='') {
 const changed = ui.prev[key] !== undefined && ui.prev[key] !== value; ui.prev[key] = value;
 return `<article class="metric ${cls}" data-kpi="${key}"><div><span>${label}</span>${icon(ic)}</div><strong class="has-value ${changed ? 'bump' : ''}">${value}</strong><small>${sub}</small></article>`;
}
function kpis() {
 const open = D.tables.reduce((n, t) => n + D.tableTotal(t), 0);
 const busy = D.tables.filter(t => t.status !== 'free').length;
 const kitchen = D.kitchenLines().filter(l => l.state !== 'served');
 return `<div class="metrics-grid live-kpis">${kpi('rev', `Incassato ${SV.today}`, euro(D.service.revenue), `${D.service.closed.length} conti chiusi · ${euro(open)} ancora in sala`, 'coins', 'kpi-revenue hero')}${kpi('tab', 'Tavoli occupati', `${busy}/${D.tables.length}`, `${D.tables.reduce((n, t) => n + t.guests, 0)} ospiti seduti ora`, 'table')}${kpi('kit', 'Comande in cucina', kitchen.length, `${kitchen.filter(l => l.state === 'ready').length} pronte al pass · ${D.service.qrOrders} dal QR`, 'chef')}${kpi('cov', `Coperti ${SV.of}`, D.service.covers + 4, `${D.bookings.length} prenotazioni in arrivo`, 'users')}</div>`;
}

// ————— IL SERVIZIO DI STASERA —————
function home() {
 const low = D.lowStock();
 return `${heading(`SERVIZIO DI ${SV.name.toUpperCase()} · ${NOW.weekday.toUpperCase()} · DALLE ${SV.start}`, `${NOW.greet}, Marta.`, 'Il locale in tempo reale. Otto tiene d’occhio tutto il resto.', `<span class="live-pill"><span class="live-dot"></span>Live</span>`)}
 ${kpis()}
 <section class="home-live">
  <div class="workspace-panel"><div class="panel-title"><h2>La sala adesso</h2><a class="text-link" href="#sala">Apri la sala${icon('arrow')}</a></div><div class="floor mini">${floorTables(true)}</div></div>
  <div class="home-side">
   ${ottoPanel('IL PUNTO DI OTTO', `${SV.name === 'pranzo' ? 'Oggi a pranzo' : 'Stasera'} **${D.bookings.length} prenotazioni** ancora in arrivo. ${low.length ? `**${low.map(i => i.name).join(', ')}** sotto scorta: ho preparato l’ordine.` : 'Magazzino in ordine.'} Ci sono **${D.reviews.filter(r => !ui.done.reviews.includes(r.who)).length} recensioni** con risposta pronta.`, `<a class="btn btn-primary" href="#magazzino">Vedi il magazzino${icon('arrow')}</a>`)}
   <div class="workspace-panel feed-panel"><div class="panel-title"><h2><span class="live-dot"></span> Cosa sta succedendo</h2></div><ul class="feed-list">${D.service.events.slice(0, 7).map(e => `<li class="${Date.now() - e.at < 2500 ? 'row-in' : ''}"><span class="feed-kind k-${e.kind}">${icon({sala:'table', cucina:'chef', magazzino:'box', cassa:'coins'}[e.kind] || 'sparkle')}</span><span>${esc(e.text)}</span><small>${e.time}</small></li>`).join('')}</ul></div>
  </div>
 </section>
 ${ecosystem()}`;
}
function ecosystem() {
 return `<section class="ecosystem"><div class="section-title"><div class="inline-title"><h2>Un ristorante, tutto collegato</h2><span class="count-tag">12 MODULI · 1 ASSISTENTE</span></div><a class="text-link" href="#modules">L’ecosistema${icon('arrow')}</a></div>
 <div class="eco-flow">${Object.entries(groups).map(([g, l], i) => `<div class="eco-col ${g === 'operations' ? 'eco-core' : ''}"><span class="eco-step">0${i + 1}</span><h3>${l}</h3><p>${groupNotes[g]}</p>${modules.filter(m => m.group === g).map(m => `<a href="#${m.id}" class="eco-item">${icon(m.icon)}<span>${m.title}</span>${m.live ? '<span class="live-dot"></span>' : ''}</a>`).join('')}</div>`).join('')}</div>
 <div class="eco-otto">${icon('otto-wink')}<p><b>Un piatto, tutto il sistema.</b> Quando un ospite ordina una carbonara dal QR, la comanda arriva in cucina, il pagamento con Stripe diventa documento commerciale per l’Agenzia delle Entrate e il magazzino scala pasta, guanciale, uova e pecorino. Nello stesso istante.</p></div></section>`;
}
function catalog() {
 const q = ui.query.toLowerCase();
 const list = modules.filter(m => (ui.category === 'all' || m.group === ui.category) && `${m.title} ${m.description}`.toLowerCase().includes(q));
 return `${heading('L’ECOSISTEMA', 'Dodici moduli. Un solo locale.', 'I moduli che usano i ristoranti ogni giorno, collegati tra loro e con Otto.')}${ecosystem()}
 <div class="catalog-toolbar"><div class="filter-tabs">${[['all', 'Tutti'], ...Object.entries(groups)].map(([k, v]) => `<button data-category="${k}" class="${ui.category === k ? 'selected' : ''}" aria-pressed="${ui.category === k}">${v}</button>`).join('')}</div><label class="input-search">${icon('search')}<input id="catalog-search" value="${esc(ui.query)}" placeholder="Cerca un modulo…" aria-label="Cerca un modulo"></label></div>
 <div class="module-grid" id="catalog-results">${list.map(m => `<a class="module-card" href="#${m.id}"><div class="module-card-top"><span class="module-icon tone-${m.group}">${icon(m.icon)}</span>${m.live ? badge('<span class="live-dot"></span> Live', 'badge-green') : badge(m.group === 'ai' ? 'AI' : 'Demo')}</div><h3>${m.title}</h3><p>${m.description}</p><ul class="mini-features">${m.features.map(f => `<li>${icon('check')}${f}</li>`).join('')}</ul><div class="module-card-footer"><span>${groups[m.group]}</span>${icon('arrow')}</div></a>`).join('')}</div>`;
}

// ————— SALA —————
// Gli ospiti all'ingresso (solo nella sfida): si tocca il gruppo, poi un tavolo libero abbastanza grande.
function doorPanel() {
 if (!gameOn() || !D.service.game) return '';
 if (ui.door && !D.door.some(p => p.id === ui.door)) ui.door = null;
 const sel = D.door.find(p => p.id === ui.door);
 return `<div class="door-queue" data-anchor-door><span class="dq-title">${icon('users')} All’ingresso</span>${D.door.length ? D.door.map(p => { const w = D.doorWait(p); return `<button class="dq-party ${ui.door === p.id ? 'on' : ''} ${D.doorRed(p) ? 'red' : ''}" data-door="${p.id}"><b>${esc(p.name)}</b><small>${p.n} persone · aspetta da <span data-door-wait="${p.id}">${Math.floor(w)}</span> s</small><i data-door-bar="${p.id}" style="width:${Math.min(100, w / D.doorLeave() * 100)}%"></i></button>`; }).join('') : '<small class="dq-empty">Nessuno in attesa. Quando arriva qualcuno senza prenotazione, toccalo e scegli un tavolo libero abbastanza grande.</small>'}${sel ? `<span class="dq-hint">${icon('arrow')} Ora tocca un tavolo <b>libero</b> con almeno <b>${sel.n} posti</b></span>` : ''}</div>`;
}
function floorTables(mini=false) {
 return D.tables.map(t => {
  const total = D.tableTotal(t), ready = t.lines.some(l => l.state === 'ready');
  const party = !mini && ui.door && D.door.find(p => p.id === ui.door), fit = party ? (D.fits(t, party) ? 'fit' : 'nofit') : '';
  return `<button class="ftable s-${t.status} ${t.shape || 'square'} ${fit} ${ui.table === t.id && !mini ? 'selected' : ''}" style="left:${t.x}%;top:${t.y}%" data-table="${t.id}" aria-label="Tavolo ${t.id}, ${tableLabel[t.status]}">
   <b>${t.id.slice(1)}</b>${t.status === 'free' ? `<small>${t.seats} posti</small>` : `<small>${t.guests} ${icon('users')}${mini ? '' : ` · ${minutes(t.since)}′`}</small>${total ? `<em>${euro(total)}</em>` : ''}`}${ready ? '<i class="ready-dot" title="Piatti pronti al pass"></i>' : ''}${t.mission && gameOn() ? '<i class="table-bang" title="Il conto aspetta te">!</i>' : ''}</button>`;
 }).join('') + (mini ? '' : '<span class="floor-label bar">BANCO</span><span class="floor-label door">INGRESSO</span>');
}
function sala() {
 return `${heading('SALA & CUCINA · 01', 'Sala & tavoli', 'Tocca un tavolo: vedi cosa ha ordinato, a che punto è la cucina, quanto è il conto.', `<span class="live-pill"><span class="live-dot"></span>${D.tables.filter(t => t.status !== 'free').length} tavoli in servizio</span>`)}
 ${kpis()}
 <div class="sala-layout"><section class="workspace-panel floor-panel"><div class="panel-title"><h2>Sala principale</h2><div class="legend">${Object.entries(tableLabel).map(([k, v]) => `<span><i class="lg s-${k}"></i>${v}</span>`).join('')}</div></div>${doorPanel()}<div class="floor ${ui.door ? 'seating' : ''}">${floorTables()}</div></section>
 <aside class="table-panel workspace-panel" id="table-panel">${tablePanel()}</aside></div>
 <section class="workspace-panel"><div class="panel-title"><h2>Prenotazioni in arrivo</h2>${badge('Raccolte da Centralino AI e WhatsApp')}</div><div class="table-scroll"><table class="data-table"><thead><tr><th>Ora</th><th>Ospite</th><th>Coperti</th><th>Tavolo</th><th>Canale</th><th>Note</th></tr></thead><tbody>${D.bookings.map(b => `<tr><td><b>${b.time}</b></td><td>${esc(b.name)}</td><td>${b.guests}</td><td>${b.table}</td><td>${badge(b.channel, b.channel.includes('AI') ? 'badge-violet' : '')}</td><td>${esc(b.note)}</td></tr>`).join('')}</tbody></table></div></section>`;
}
function tablePanel() {
 const t = D.table(ui.table);
 if (!t) return `<div class="empty-state compact"><h2>Seleziona un tavolo</h2></div>`;
 const head = `<div class="tp-head"><div><span class="eyebrow">TAVOLO ${t.id.slice(1)} · ${t.seats} POSTI</span><h2>${t.status === 'free' ? 'Libero' : `${t.guests} ospiti · da ${minutes(t.since)} min`}</h2></div>${badge(tableLabel[t.status], t.status === 'bill' ? 'badge-amber' : t.status === 'free' ? '' : 'badge-green')}</div>`;
 if (t.status === 'free') return `${head}<p class="muted pad-s">Tavolo pronto. Accomoda gli ospiti per aprire la comanda.</p><div class="tp-actions">${[2, 4].filter(n => n <= t.seats).map(n => btn(`Accomoda ${n} ospiti`, `seat:${t.id}:${n}`, 'btn-secondary', 'users')).join('')}</div>`;
 const courses = [[0, 'Bevande'], [1, 'Antipasti'], [2, 'Primi'], [3, 'Secondi'], [4, 'Dolci']];
 const lines = courses.map(([c, label]) => { const ls = t.lines.filter(l => D.dish(l.dish).course === c); return ls.length ? `<div class="course"><span class="eyebrow">${label.toUpperCase()}</span>${ls.map(l => `<div class="tline ${Date.now() - l.at < 2500 ? 'row-in' : ''}"><span class="q">${l.qty}×</span><span class="n">${esc(D.dish(l.dish).name)}${l.via === 'qr' ? '<i class="via-qr">QR</i>' : ''}${l.paid ? '<i class="via-paid">pagato</i>' : ''}</span>${badge(...(stateLabel[l.state] || ['']))}<b>${euro(D.dish(l.dish).price * l.qty)}</b></div>`).join('')}</div>` : ''; }).join('');
 const total = D.tableTotal(t);
 return `${head}<div class="tp-lines">${lines || '<p class="muted pad-s">Nessun piatto ancora. Aggiungi la comanda.</p>'}</div>
  <div class="tp-total"><span>Conto${total !== D.tableDue(t) ? `<small>${euro(total - D.tableDue(t))} già pagati dal QR</small>` : ''}</span><strong class="${ui.prev['t' + t.id] !== total && ui.prev['t' + t.id] !== undefined ? 'bump' : ''}">${euro(total)}</strong></div>${(ui.prev['t' + t.id] = total, '')}
  ${ui.adding ? `<div class="quick-menu">${D.menu.map(d => `<button data-add="${d.id}" ${D.available(d) ? '' : 'disabled'}><b>${esc(d.name)}</b><small>${euro(d.price)}${D.available(d) ? '' : ' · esaurito'}</small></button>`).join('')}</div>` : ''}
  ${t.mission && gameOn() ? `<div class="tp-mission">${missionPanel(t.mission)}</div>` : ''}
  <div class="tp-actions" ${t.mission && gameOn() ? 'hidden' : ''}>${btn(ui.adding ? 'Chiudi menu' : 'Aggiungi piatto', 'adding', ui.adding ? 'btn-secondary' : 'btn-primary', ui.adding ? 'close' : 'plus')}${t.status === 'bill' ? btn('Chiudi conto · carta', `close:${t.id}`, 'btn-dark', 'check') : btn('Richiedi il conto', `bill:${t.id}`, 'btn-secondary', 'receipt')}</div>`;
}

// ————— CUCINA —————
function kdsClassic() {
 const lines = D.kitchenLines();
 const col = (state, title) => { const ls = lines.filter(l => l.state === state).sort((a, b) => a.at - b.at); return `<section class="kds-col k-${state}"><header><b>${title}</b><span>${ls.length}</span></header>${ls.map(l => { const d = D.dish(l.dish); const age = Math.round((Date.now() - l.at) / 60000) + (state === 'waiting' ? 2 : 9); const sel = ui.ticket === l.id; return `<article class="ticket ${Date.now() - l.at < 2500 ? 'row-in' : ''} ${age > 15 ? 'late' : ''} ${sel ? 'selected' : ''}" data-ticket="${l.id}" tabindex="0" role="button" aria-expanded="${sel}"><span class="tk-top"><b>${l.table}</b><small>${age}′</small></span><span class="tk-dish">${l.qty}× ${esc(d.name)}</span>${d.allergens.length ? `<span class="tk-all">${d.allergens.map(a => `<i>${a}</i>`).join('')}</span>` : ''}${sel ? `<button class="tk-go" data-advance="${l.id}">${{waiting:'Avvia la preparazione', cooking:'Segna pronto al pass', ready:'Segna servito'}[state]} ${icon('arrow')}</button>` : `<span class="tk-next">Tocca per aprire</span>`}</article>`; }).join('') || '<p class="muted pad-s">Niente qui.</p>'}</section>`; };
 return `${heading('SALA & CUCINA · 02', 'Cucina & comande', 'Le comande arrivano dal tavolo in tempo reale. Apri una comanda e conferma per farla avanzare: un tocco per sbaglio non sposta niente.', `<span class="live-pill"><span class="live-dot"></span>Pass collegato</span>`)}
 <div data-anchor="kds"></div>
 <div class="kds-board">${col('waiting', 'In attesa')}${col('cooking', 'In preparazione')}${col('ready', 'Pronti al pass')}</div>
 ${ottoNote('Le comande oltre i **15 minuti** si colorano. Gli allergeni dichiarati al telefono (celiachia del tavolo 2 delle 21:15) arriveranno qui insieme alla comanda.')}`;
}
// Nella sfida la cucina ha limiti veri: fornelli pieni, tempi di cottura, un tempo per servire dal pass.
function kds() {
 if (!(gameOn() && D.service.game)) return kdsClassic();
 const lines = D.kitchenLines(), now = Date.now(), k = D.kitchen, hot = ui.kitchenHot || {};
 const cooking = lines.filter(l => l.state === 'cooking').length, full = cooking >= k.cap;
 const bar = (start, total, cls = '') => `<span class="tk-bar ${cls}"><i style="animation-duration:${total}s;animation-delay:-${Math.min(total, (now - start) / 1000).toFixed(1)}s"></i></span>`;
 const ticket = (l, state) => {
  const d = D.dish(l.dish), sel = ui.ticket === l.id;
  const timer = state === 'waiting' ? bar(l.at, D.waitMax(), 'wait') : state === 'cooking' ? bar(l.cookAt || now, D.cookTime(d), 'cook') : bar(l.readyAt || now, k.passTime, 'pass');
  const action = state === 'waiting' ? (full ? `<span class="tk-full">Fornelli pieni · ${cooking}/${k.cap}</span>` : `<button class="tk-go" data-cook="${l.id}">Metti sui fornelli ${icon('arrow')}</button>`)
   : state === 'cooking' ? (l.cooked ? (D.autoOn('pass') ? `<span class="tk-next">${icon('check')} Cotto · va al pass da solo</span>` : `<button class="tk-go" data-pass="${l.id}">Cotto · manda al pass ${icon('arrow')}</button>`) : `<span class="tk-next">In cottura · ${D.cookTime(d)} s</span>`)
   : D.autoOn('serve') ? `<span class="tk-next">${icon('check')} Il cameriere lo porta</span>` : `<button class="tk-go" data-serve="${l.id}">Servi al tavolo ${icon('arrow')}</button>`;
  return `<article class="ticket ${now - l.at < 2500 ? 'row-in' : ''} ${sel ? 'selected' : ''}" data-ticket="${l.id}" tabindex="0" role="button" aria-expanded="${sel}"><span class="tk-top"><b>${l.table}</b><small>${state === 'cooking' ? icon('clock') : ''}</small></span><span class="tk-dish">${l.qty}× ${esc(d.name)}</span>${d.allergens.length ? `<span class="tk-all">${d.allergens.map(a => `<i>${a}</i>`).join('')}</span>` : ''}${l.cooked && state === 'cooking' ? '' : timer}${sel || state !== 'waiting' ? action : D.autoOn('cook') ? '<span class="tk-next">Va sui fornelli da solo</span>' : '<span class="tk-next">Tocca per aprire</span>'}</article>`;
 };
 const autoLeft = Math.max(0, Math.ceil((k.autoUntil - now) / 1000)), autoTag = key => D.autoOn(key) ? '<i class="kds-auto">AUTO</i>' : '';
 const col = (state, title, extra = '') => { const ls = lines.filter(l => l.state === state).sort((a, b) => a.at - b.at); const red = (state === 'waiting' && hot.waiting) || (state === 'ready' && hot.pass); return `<section class="kds-col k-${state} ${red ? 'hot' : ''}"><header><b>${title} ${autoTag({waiting:'cook', cooking:'pass', ready:'serve'}[state])}</b><span>${extra || ls.length}</span></header>${red ? `<p class="kds-hot">${icon('alert')} ${state === 'waiting' ? 'Comande ferme troppo a lungo' : 'Piatti fermi al pass'} · −1 pt al secondo</p>` : ''}${ls.map(l => ticket(l, state)).join('') || '<p class="muted pad-s">Niente qui.</p>'}</section>`; };
 return `${heading('SALA & CUCINA · 02', 'Cucina & comande', `I fornelli reggono <b>${k.cap} piatti insieme</b>: ogni piatto ha il suo tempo di cottura e va al pass da solo. Dal pass si serve entro ${k.passTime} secondi.`, `${autoLeft ? `<span class="live-pill kds-autopill">${icon('clock')} Cucina automatica ancora ${Math.floor(autoLeft / 60)}:${String(autoLeft % 60).padStart(2, '0')}</span>` : ''}<span class="live-pill"><span class="live-dot"></span>Fornelli ${cooking}/${k.cap}</span>`)}
 <div data-anchor="kds"></div>
 <div class="kds-board game-kds">${col('waiting', 'In attesa')}${col('cooking', 'Sui fornelli', `${cooking}/${k.cap}`)}${col('ready', 'Pronti al pass')}</div>`;
}

// ————— MENU DIGITALE QR —————
// Un finto QR, sempre uguale per lo stesso tavolo: tre mirini agli angoli e moduli pseudo-casuali.
function qrSvg(seed) {
 const n = 25; let x = [...seed].reduce((a, c) => a * 31 + c.charCodeAt(0), 7) >>> 0; const rnd = () => (x = (x * 1103515245 + 12345) >>> 0) / 4294967296;
 const finder = (r, c) => [[0, 0], [0, n - 7], [n - 7, 0]].some(([a, b]) => r >= a - 1 && r < a + 8 && c >= b - 1 && c < b + 8);
 let cells = '';
 for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (!finder(r, c) && rnd() < .48) cells += `M${c} ${r}h1v1h-1z`;
 const eye = (r, c) => `<rect x="${c + .5}" y="${r + .5}" width="6" height="6" rx="1.2" fill="none" stroke="currentColor"/><rect x="${c + 2}" y="${r + 2}" width="3" height="3" rx=".6"/>`;
 return `<svg viewBox="-1 -1 ${n + 2} ${n + 2}" fill="currentColor" aria-label="Codice QR del tavolo" role="img"><path d="${cells}"/>${eye(0, 0)}${eye(0, n - 7)}${eye(n - 7, 0)}</svg>`;
}
const dishState = d => !d.visible ? ['Tolto da Otto', ''] : d.paused ? ['In pausa · cucina piena', 'badge-amber'] : D.portions(d) < 1 ? ['Esaurito', 'badge-red'] : D.portions(d) <= 3 ? [`Ultime ${D.portions(d)}`, 'badge-amber'] : ['Disponibile', 'badge-green'];
function guestPhone() {
 // un riferimento non valido (per esempio quello di un compito) non deve rompere la pagina
 if (!D.table(ui.qr.table)) ui.qr = {table:'T1', cart:{}, step:'menu', cat:ui.qr.cat, receipt:null};
 const q = ui.qr, t = D.table(q.table);
 const cart = Object.entries(q.cart).filter(([, n]) => n > 0);
 const count = cart.reduce((n, [, k]) => n + k, 0), total = cart.reduce((n, [id, k]) => n + D.dish(id).price * k, 0);
 const top = `<div class="gp-top"><span class="gp-logo">OdB</span><span><b>${esc(D.restaurant.name)}</b><small>Tavolo ${q.table.slice(1)} · ${t.guests || 2} ospiti</small></span></div>`;
 if (q.step === 'paid') return `${top}<div class="gp-done"><span class="gp-check">${icon('check')}</span><h3>Ordine in cucina</h3><p>${q.receipt?.prepaid ? `Pagato <b>${euro(q.receipt.amount)}</b> con ${esc(q.receipt.method)}. A fine cena non passi dalla cassa.` : 'Paghi a fine cena, alla cassa o dal telefono.'}</p>${q.receipt?.doc ? `<div class="gp-receipt"><small>DOCUMENTO COMMERCIALE</small><b>${q.receipt.doc}</b><span>Trasmesso all’Agenzia delle Entrate · copia su WhatsApp</span></div>` : ''}<button class="gp-btn ghost" data-qr="again">Ordina ancora</button></div>`;
 if (q.step === 'checkout') return `${top}<div class="gp-check-out"><h3>Il tuo ordine</h3>${cart.map(([id, k]) => `<div class="gp-line"><span>${k}× ${esc(D.dish(id).name)}</span><b>${euro(D.dish(id).price * k)}</b></div>`).join('')}<div class="gp-line total"><span>Totale</span><b>${euro(total)}</b></div>
  <button class="gp-btn pay" data-qr="pay"><span>${icon('lock')} Paga ora ${euro(total)}</span><small>Apple Pay · Google Pay · carta · con Stripe</small></button><button class="gp-btn ghost" data-qr="order">Ordina e paga a fine cena</button><button class="gp-back" data-qr="back">← Torna al menu</button></div>`;
 const cats = ['Antipasti', 'Primi', 'Secondi', 'Dolci', 'Vini'];
 return `${top}<div class="gp-cats">${cats.map(c => `<button data-qr-cat="${c}" class="${q.cat === c ? 'on' : ''}">${c}</button>`).join('')}</div>
 <div class="gp-list">${D.menu.filter(d => d.visible && d.cat === q.cat).map(d => { const [st, cls] = dishState(d); const off = !D.available(d); return `<div class="gp-item ${off ? 'off' : ''} ${d.special ? 'special' : ''}" data-gp="${d.id}"><span><b>${esc(d.name)}</b><small>${esc(d.desc)}</small><em>${d.allergens.join(' · ') || 'Senza allergeni dichiarati'}</em>${st !== 'Disponibile' ? `<i class="gp-flag ${cls}">${st}</i>` : ''}</span><span class="gp-buy"><b>${euro(d.price)}</b>${off ? '' : `<button data-qr-add="${d.id}" aria-label="Aggiungi ${esc(d.name)}">${q.cart[d.id] ? q.cart[d.id] : icon('plus')}</button>`}</span></div>`; }).join('') || '<p class="gp-empty">Niente in questa sezione stasera.</p>'}</div>
 ${count ? `<button class="gp-cart" data-qr="checkout"><span>${count} ${count === 1 ? 'piatto' : 'piatti'}</span><b>Vai all’ordine · ${euro(total)}</b></button>` : ''}`;
}
function smartPanel() {
 const load = D.kitchenLoad(), pct = Math.min(100, load / D.loadLimit * 100);
 return `<div class="workspace-panel smart-menu"><div class="panel-title"><h2>Menu intelligente</h2>${badge('Si aggiorna da solo', 'badge-green')}</div>
  <div class="km-load"><span><em>Carico della cucina</em> <b>${load}/${D.loadLimit} comande</b></span><span class="km-bar ${pct >= 100 ? 'full' : pct > 65 ? 'warm' : ''}"><i style="width:${pct}%"></i></span><small>Oltre il limite i piatti più lenti vanno in pausa sui QR e tornano appena la cucina respira.</small></div>
  ${D.menu.filter(d => d.course > 0).map(d => { const [st, cls] = dishState(d); return `<div class="mini-row sm-row"><span><b>${esc(d.name)}</b><small>${D.portions(d) > 40 ? 'Molte porzioni' : `${D.portions(d)} porzioni in magazzino`} · ${d.prep}′ di preparazione</small></span>${badge(st, cls)}</div>`; }).join('')}</div>`;
}
function menuOtto() {
 return `<div class="workspace-panel menu-otto"><div class="panel-title"><h2>${icon('otto-happy')} Cambia il menu parlando con Otto</h2></div>
  ${ui.menuReply ? `<div class="mo-reply row-in"><p>${rich(ui.menuReply)}</p></div>` : '<p class="mo-intro">Scrivi come parleresti in cucina. Otto cambia il menu su tutti i QR, subito.</p>'}
  <div class="mo-suggest">${['Togli la tagliata stasera', 'Metti il risotto a 18 €', 'Aggiungi un piatto del giorno a 22 €', 'Rimetti tutto com’era'].map(x => `<button data-menu-otto="${x}">${x}</button>`).join('')}</div>
  <form id="menu-otto-form" class="mo-form"><input id="menu-otto-input" placeholder="Es. “il tiramisù è finito”" aria-label="Chiedi a Otto di cambiare il menu" autocomplete="off"><button class="send-btn" type="submit" aria-label="Invia">${icon('send')}</button></form></div>`;
}
function menuPos() {
 const seated = D.tables.filter(t => t.status !== 'free').slice(0, 8);
 return `${heading('SALA & CUCINA · 03', 'Menu digitale QR', 'Ogni tavolo ha il suo QR: l’ospite ordina dal telefono e, se vuole, paga subito. La comanda arriva in cucina e il menu cambia da solo quando un piatto finisce.', `<span class="live-pill"><span class="live-dot"></span>${D.service.qrOrders} ordini dal QR stasera</span>`)}
 <div data-anchor="menu"></div>
 <div class="qr-layout">
  <section class="workspace-panel qr-card"><div class="panel-title"><h2>Il QR del tavolo</h2></div>
   <div class="qr-body"><button class="btn btn-dark qr-editor" data-action="menu-editor">${icon('menu')} Apri l’editor del menu</button>
   <div class="qr-code">${qrSvg(ui.qr.table)}<span>${ui.qr.table.slice(1)}</span></div><small class="qr-url">menu.osteriadelborgo.it/t/${ui.qr.table.slice(1)}</small>
   <div class="qr-tables">${seated.map(t => `<button data-qr-table="${t.id}" class="${ui.qr.table === t.id ? 'on' : ''}">T${t.id.slice(1)}</button>`).join('')}</div>
   <ul class="qr-points"><li>${icon('check')}Ordine con il numero del tavolo, dritto in cucina</li><li>${icon('check')}Pagamento anticipato con Stripe, niente coda alla cassa</li><li>${icon('check')}Allergeni sempre visibili, piatti esauriti nascosti</li></ul></div></section>
  <section class="guest-wrap"><span class="eyebrow">COSÌ LO VEDE L’OSPITE</span><div class="guest-phone">${guestPhone()}</div></section>
  <aside class="module-side">${menuOtto()}${smartPanel()}</aside>
 </div>
 <section class="workspace-panel"><div class="panel-title"><h2>Menu alla carta e margini</h2>${badge('Food cost calcolato dalle ricette')}</div><div class="table-scroll"><table class="data-table"><thead><tr><th>Piatto</th><th>Prezzo</th><th>Food cost</th><th>Margine</th><th>Allergeni</th><th>Sul QR</th></tr></thead><tbody>${D.menu.map(d => { const fc = D.foodCost(d), m = (1 - fc / d.price) * 100; return `<tr><td><b>${esc(d.name)}</b><small>${d.cat}</small></td><td>${euro(d.price)}</td><td>${euro(+fc.toFixed(2))}</td><td><span class="margin ${m < 65 ? 'low' : ''}">${m.toFixed(0)}%</span></td><td>${d.allergens.map(a => `<span class="allergen">${a}</span>`).join('') || '—'}</td><td>${badge(...dishState(d))}</td></tr>`; }).join('')}</tbody></table></div></section>`;
}
function menuEditor() {
 show(`<span class="dialog-kicker">EDITOR DEL MENU</span><h2 id="dialog-title">Il menu ${SV.of === 'del pranzo' ? 'del pranzo' : 'di stasera'}</h2><p class="dialog-description">Ogni modifica è subito su tutti i QR dei tavoli. Puoi anche chiederla a Otto a parole.</p>
  <div class="editor-list">${D.menu.map(d => `<div class="editor-row"><span><b>${esc(d.name)}</b><small>${d.cat}${d.special ? ' · piatto del giorno' : ''}</small></span><label class="editor-price">€ <input type="number" min="1" step="0.5" value="${d.price}" data-edit-price="${d.id}" aria-label="Prezzo ${esc(d.name)}"></label><label class="editor-toggle"><input type="checkbox" ${d.visible ? 'checked' : ''} data-edit-visible="${d.id}" aria-label="${esc(d.name)} visibile sul QR"><i></i></label></div>`).join('')}</div>`, 'editor-dialog');
}
function qrAction(a) {
 const q = ui.qr;
 if (a === 'checkout') q.step = 'checkout';
 if (a === 'back' || a === 'again') { q.step = 'menu'; if (a === 'again') { q.cart = {}; q.receipt = null; } }
 if (a === 'pay' || a === 'order') {
  const items = Object.entries(q.cart).filter(([, n]) => n > 0);
  const r = D.qrOrder(q.table, items, a === 'pay', 'Apple Pay'); if (r) ecoPoints('qr', 3, 'Ordine dal QR', q.table, {items, prepaid:a === 'pay'});
  q.receipt = r ? {prepaid:a === 'pay', amount:r.amount, method:'Apple Pay', doc:r.receipt?.id} : null;
  q.cart = {}; q.step = 'paid';
  toast(a === 'pay' ? `Tavolo ${q.table.slice(1)}: ordine in cucina e pagato con Stripe · ${euro(r?.amount || 0)}` : `Tavolo ${q.table.slice(1)}: ordine in cucina, paga a fine cena`);
 }
 render();
}

// ————— MAGAZZINO —————
function magazzino() {
 const low = D.lowStock();
 const sup = [...new Set(low.map(i => i.supplier))];
 return `${heading('GESTIONE · 08', 'Magazzino & food cost', 'Ogni piatto venduto scala i suoi ingredienti dalla ricetta. Le righe che si accendono stanno cambiando adesso.', `<span class="live-pill"><span class="live-dot"></span>Scarico automatico</span>`)}
 <div class="quote-layout"><section class="workspace-panel"><div data-anchor="magazzino" class="anchor-pad"></div><div class="panel-title"><h2>Dispensa e cella</h2>${badge(`${low.length} sotto scorta`, low.length ? 'badge-red' : 'badge-green')}</div><div class="stock">${D.ingredients.map(i => { const pct = Math.min(100, i.qty / (i.min * 3) * 100); const recent = Date.now() - (i.changed || 0) < 3000; return `<div class="stock-row ${i.qty <= i.min ? 'low' : ''} ${recent ? 'row-in' : ''}" data-ing="${i.id}"><span class="st-name"><b>${esc(i.name)}</b><small>${esc(i.supplier)}</small></span><span class="st-bar"><i style="width:${pct}%"></i><em style="left:${100 / 3}%"></em></span><span class="st-qty ${recent ? 'bump' : ''}">${D.fmtQty(i)}</span>${i.qty <= i.min ? badge('Sotto scorta', 'badge-red') : badge('OK', 'badge-green')}</div>`; }).join('')}</div></section>
 <aside class="module-side">${low.length ? ottoPanel('ORDINE PROPOSTO', `**${low.map(i => `${i.name} (+${i.min * 2} ${i.unit})`).join(', ')}** da ${sup.join(', ')}. Arriva domattina, prima del pranzo.`, btn('Invia l’ordine ai fornitori', 'reorder', 'btn-primary', 'check')) : ottoPanel('MAGAZZINO', 'Tutto sopra la scorta minima. Ti avviso io quando qualcosa scende.')}
 <div class="workspace-panel"><div class="panel-title"><h2>Ricette: cosa scala un piatto</h2></div>${D.menu.filter(d => d.course).slice(0, 5).map(d => `<div class="mini-row"><span><b>${esc(d.name)}</b><small>${Object.entries(d.recipe).map(([k, q]) => `${D.ingredient(k).name} ${q < 1 ? Math.round(q * 1000) + (D.ingredient(k).unit === 'kg' ? ' g' : '') : q + ' ' + D.ingredient(k).unit}`).join(' · ')}</small></span><span class="fc">${euro(+D.foodCost(d).toFixed(2))}</span></div>`).join('')}</div></aside></div>`;
}

// ————— moduli AI e relazioni —————
function centralino() {
 return `${heading('INTELLIGENZA ARTIFICIALE · 04', 'Centralino AI', 'Otto risponde mentre siete in servizio: prenota, segnala le allergie, gestisce la lista d’attesa.', `<span class="live-pill"><span class="live-dot"></span>Attivo</span>`)}
 <div class="metrics-grid">${[['phone', `Chiamate ${SV.today}`, D.calls.length], ['calendar', 'Prenotazioni prese', 2], ['users', 'In lista d’attesa', 1], ['clock', 'Minuti al telefono risparmiati', 14]].map(([i, t, n]) => `<article class="metric"><div><span>${t}</span>${icon(i)}</div><strong class="has-value">${n}</strong></article>`).join('')}</div>
 <div data-anchor="centralino"></div>
 <div class="call-grid">${D.liveCalls.filter(c => c.live).map(c => `<article class="workspace-panel call live-call"><div class="panel-title"><h2>${esc(c.caller)}</h2><span class="badge badge-red"><span class="live-dot red"></span> In corso</span></div><div class="transcript"><div class="bubble caller row-in">${esc(c.text)}</div><div class="bubble typing"><i></i><i></i><i></i></div></div></article>`).join('')}${D.calls.map(c => `<article class="workspace-panel call"><div class="panel-title"><h2>${esc(c.caller)}</h2><span>${badge(c.outcome, 'badge-green')} <small class="muted">${c.time}</small></span></div><div class="transcript"><div class="bubble caller">${esc(c.text)}</div><div class="bubble agent"><small>${icon('sparkle')} Otto</small>${esc(c.reply)}</div></div></article>`).join('')}</div>`;
}
function recensioni() {
 return `${heading('INTELLIGENZA ARTIFICIALE · 05', 'Recensioni AI', 'Ogni recensione letta da Otto, con una risposta nel tuo tono pronta da approvare.')}
 <div class="review-list"><div data-anchor="recensioni"></div>${D.reviews.map(r => { const done = ui.done.reviews.includes(r.who); return `<article class="workspace-panel review ${done ? 'done' : ''}"><div class="rv-head"><span class="stars">${'★'.repeat(r.stars)}<i>${'★'.repeat(5 - r.stars)}</i></span><b>${esc(r.who)}</b><small>${r.source}</small>${done ? badge('Risposta pubblicata', 'badge-green') : ''}</div><p class="rv-text">“${esc(r.text)}”</p>${ottoNote(r.draft, r.stars < 3 ? 'warn' : '')}${done ? '' : `<div class="detail-actions">${btn('Approva e pubblica', `review:${r.who}`, 'btn-primary', 'check')}</div>`}</article>`; }).join('')}</div>
 ${ottoNote('Tema ricorrente nell’ultimo mese: **attesa sui secondi il sabato**. Lo stesso dato emerge dai tempi della cucina.', 'info')}`;
}
function whatsapp() {
 return `${heading('CLIENTI & MARKETING · 06', 'WhatsApp & campagne', 'Promemoria automatici e campagne preparate da Otto, solo agli ospiti che hanno dato il consenso.')}
 <div data-anchor="whatsapp"></div><div class="quote-layout"><section class="workspace-panel"><div class="panel-title"><h2>Campagne</h2></div>${D.campaigns.map(c => `<div class="mini-row"><span><b>${esc(c.name)}</b><small>${c.kind}${c.sent ? ` · ${c.sent} inviati · ${c.read} letti` : ''}</small></span>${c.sent ? badge(`${Math.round(c.read / c.sent * 100)}% letti`, 'badge-green') : btn('Rivedi', 'toast:Bozza pronta: in produzione parte dopo la tua approvazione', 'btn-secondary', '')}</div>`).join('')}</section>
 <aside class="module-side"><div class="phone-mock"><div class="wa bot">Ciao Luca! Ti aspettiamo ${SV.name === 'pranzo' ? 'oggi alle 13:15' : 'stasera alle 20:45'} per il vostro anniversario 🥂 Abbiamo tenuto per voi il tavolo vicino alla finestra.</div><div class="wa client">Grazie mille, a ${SV.name === 'pranzo' ? 'dopo' : 'stasera'}!</div></div>${ottoPanel('IDEA', 'Arrivano i porcini e a novembre il tartufo: ho preparato una campagna per **118 ospiti** che hanno ordinato piatti ai funghi negli ultimi 6 mesi.')}</aside></div>`;
}
function fidelity() {
 return `${heading('CLIENTI & MARKETING · 07', 'Fidelity & NFC', 'Gli ospiti abituali riconosciuti al tavolo, con punti e premi.')}
 <div data-anchor="fidelity"></div>
 <section class="workspace-panel"><div class="table-scroll"><table class="data-table"><thead><tr><th>Ospite</th><th>Visite</th><th>Punti</th><th>Premio disponibile</th></tr></thead><tbody>${D.members.map(m => `<tr><td><b>${esc(m.name)}</b></td><td>${m.visits}</td><td>${m.points}</td><td>${m.reward === '—' ? '—' : badge(m.reward, 'badge-green')}</td></tr>`).join('')}</tbody></table></div></section>
 ${ottoNote('**Luca Pieri** arriva alle 20:45 per l’anniversario ed è alla 15ª visita: ha diritto al dessert offerto. L’ho segnalato sul tavolo 10.')}`;
}
function fatture() {
 const pays = D.service.payments, stripePays = pays.filter(p => p.method.startsWith('Stripe')), sent = pays.filter(p => p.ade === 'Trasmesso').length;
 return `${heading('GESTIONE · 09', 'Cassa & Agenzia delle Entrate', 'Ogni incasso, dal POS o dal QR con Stripe, diventa un documento commerciale e finisce nei corrispettivi trasmessi all’Agenzia. Senza fare niente.', `<span class="live-pill"><span class="live-dot"></span>Corrispettivi collegati</span>`)}
 <div class="metrics-grid">${kpi('fz', `Incassato ${SV.today}`, euro(D.service.revenue), `${D.service.closed.length} conti chiusi`, 'coins', 'hero')}${kpi('st', 'Pagato dal QR con Stripe', euro(stripePays.reduce((n, p) => n + p.amount, 0)), `${stripePays.length} pagamenti anticipati`, 'card')}${kpi('dc', 'Documenti commerciali', pays.length, `Emessi ${SV.today}`, 'receipt')}${kpi('ade', 'Trasmessi all’Agenzia', sent, `${pays.length - sent} in invio`, 'check')}</div>
 <div data-anchor="fatture"></div>
 <div class="quote-layout"><section class="workspace-panel"><div class="panel-title"><h2>Incassi e documenti commerciali</h2>${badge('In tempo reale', 'badge-green')}</div><div class="table-scroll"><table class="data-table pay-table"><thead><tr><th>Documento</th><th>Ora</th><th>Cosa</th><th>Metodo</th><th>Importo</th><th>Agenzia Entrate</th></tr></thead><tbody>${pays.map(p => `<tr class="${Date.now() - p.at < 3000 ? 'row-in' : ''}"><td><b>${p.id}</b></td><td>${p.time}</td><td>${esc(p.what)}</td><td>${p.method.startsWith('Stripe') ? `<span class="stripe-tag">stripe</span> ${esc(p.method.slice(9))}` : esc(p.method)}</td><td><b>${euro(p.amount)}</b></td><td>${badge(p.ade, p.ade === 'Trasmesso' ? 'badge-green' : 'badge-amber')}</td></tr>`).join('') || '<tr><td colspan="6" class="muted">I primi incassi del servizio arrivano qui.</td></tr>'}</tbody></table></div></section>
 <aside class="module-side"><div class="workspace-panel ade-panel"><div class="panel-title"><h2>${icon('shield')} Collegamenti fiscali</h2></div>
  <div class="ade-row ok"><span>${icon('check')}</span><div><b>POS collegato al registratore telematico</b><small>Obbligo dal 1° gennaio 2026: le matricole sono associate nell’area Fatture e Corrispettivi. Ogni pagamento elettronico ha il suo scontrino.</small></div></div>
  <div class="ade-row ok"><span>${icon('check')}</span><div><b>Stripe riconciliato con i corrispettivi</b><small>Ogni pagamento dal QR emette il documento commerciale con lo stesso importo: l’incrocio dell’Agenzia con i dati dei pagamenti torna sempre.</small></div></div>
  <div class="ade-row next"><span>${icon('clock')}</span><div><b>Dal 2027 la cassa può diventare software</b><small>L’Agenzia sta introducendo soluzioni software certificate per memorizzare e trasmettere i corrispettivi da PC, tablet o SmartPOS. CS Restaurant OS è pensato per diventare la tua cassa.</small></div></div></div>
  ${ottoPanel('IL PUNTO DI OTTO', `${SV.name === 'pranzo' ? 'Oggi a pranzo' : 'Stasera'} **${pays.length} documenti commerciali**, ${sent} già trasmessi. La cena dello **Studio Marchetti** va fatturata: ho preparato la fattura elettronica con i dati dell’ultima volta.`)}
  <div class="workspace-panel"><div class="panel-title"><h2>Fatture</h2></div>${D.invoices.map(f => `<div class="mini-row"><span><b>${f.n} · ${esc(f.to)}</b><small>${euro(f.amount)}</small></span>${badge(f.state, f.state.includes('SDI') ? 'badge-green' : 'badge-amber')}</div>`).join('')}</div></aside></div>
 <div class="notice">${icon('info')}<p>Anteprima dimostrativa: nessun collegamento reale con l’Agenzia delle Entrate o con Stripe. Date e regole fiscali vanno sempre verificate con il tuo commercialista.</p></div>`;
}

function bandi() {
 return `${heading('GESTIONE · 10', 'Bandi & opportunità', 'Otto cerca contributi adatti al locale e ti avvisa prima della scadenza.')}
 <div class="feed"><div data-anchor="bandi"></div>${D.grants.map(g => `<article class="update"><div class="update-top">${badge('Compatibilità ' + g.fit, g.fit === 'Alta' ? 'badge-green' : '')}<small>${esc(g.who)}</small>${badge('Scadenza ' + g.deadline, 'badge-amber')}</div><h3>${esc(g.title)}</h3>${ottoNote(g.fit === 'Alta' ? 'Il nuovo abbattitore e la cappa rientrano tra le spese ammissibili: contributo stimato fino al 40%.' : 'Utile per il nuovo menu digitale e le prenotazioni online.')}</article>`).join('')}</div>
 <div class="notice">${icon('info')}<p>Bandi di esempio, non reali.</p></div>`;
}
// Gli ordini dello chef durante il servizio: togliere un piatto finito o cambiargli il prezzo.
// Si fanno dall'editor del menu o chiedendo a Otto; il gioco controlla che il menu sia cambiato davvero.
let chefSeq = 0, nextChefAt = 0;
function chefDirector() {
 if (ui.chefOrder || Date.now() < nextChefAt) return;
 nextChefAt = Date.now() + (110 + Math.random() * 70) * 1000;
 const d = D.menu.filter(x => x.course > 0 && x.visible && !x.special).sort(() => Math.random() - .5)[0]; if (!d) return;
 const kind = Math.random() < .55 ? 'off' : 'price', np = kind === 'price' ? d.price + (Math.random() < .5 ? -2 : 2) : null;
 ui.chefOrder = {kind, dish:d.id, price:np, ref:`chef-${++chefSeq}`};
}
function checkChef() {
 const o = ui.chefOrder; if (!o) return;
 const d = D.dish(o.dish);
 if ((o.kind === 'off' && !d.visible) || (o.kind === 'price' && d.price === o.price)) { ecoPoints('chef', 3, 'Menu aggiornato', o.ref); ui.chefOrder = null; }
}
// Le celle frigorifere con la sonda: la temperatura si aggiorna ogni secondo senza ridisegnare la pagina.
const fridgeTemp = f => f.state === 'sensor' ? '−−,−' : f.shown.toFixed(1).replace('.', ',').replace('-', '−');
function fridgePanel() {
 const act = f => ({door:['Chiudi la porta', 'La porta è rimasta aperta'], fault:['Chiama il tecnico', 'Il compressore non parte'], sensor:['Ricollega la sonda', 'La sonda non risponde'], repair:[`Tecnico in arrivo`, 'Riparazione in corso'], ok:['', 'In norma']})[f.state];
 return `<section class="workspace-panel fridges"><div class="panel-title"><h2>${icon('clock')} Celle frigorifere</h2>${badge('Sonde collegate · in tempo reale', 'badge-green')}</div>
  <div class="fridge-grid">${D.fridges.map(f => { const [label, note] = act(f), red = D.fridgeRed(f); return `<article class="fridge ${red ? 'red' : ''} st-${f.state}" data-fridge="${f.id}"><span class="fr-name">${esc(f.name)}</span><strong><span data-fridge-temp="${f.id}">${fridgeTemp(f)}</span><small> °C</small></strong><span class="fr-max">massimo ${String(f.max).replace('-', '−')} °C</span><span class="fr-note">${f.state === 'ok' ? icon('check') : icon('alert')} ${note}</span>${label && f.state !== 'repair' ? `<button class="btn btn-secondary fr-act" data-fridge-act="${f.id}">${label}</button>` : f.state === 'repair' ? `<span class="fr-wait">${icon('clock')} ${label}</span>` : ''}</article>`; }).join('')}</div></section>`;
}
function staff() {
 return `${heading('GESTIONE · 11', 'Staff & HACCP', `Chi è in turno ${SV.today}, le celle frigorifere e le checklist della cucina.`)}
 ${fridgePanel()}
 <div class="quote-layout"><section class="workspace-panel"><div class="panel-title"><h2>Checklist HACCP di oggi</h2>${badge(`${D.haccp.filter((h, i) => h.done || ui.done.haccp.includes(i)).length}/${D.haccp.length}`)}</div><div data-anchor="staff" class="anchor-pad"></div><div class="haccp">${D.haccp.map((h, i) => { const done = h.done || ui.done.haccp.includes(i); return `<label class="task ${done ? 'done' : ''}"><input type="checkbox" data-haccp="${i}" ${done ? 'checked' : ''} ${h.done ? 'disabled' : ''}><span><b>${esc(h.task)}</b><small>${esc(h.by)}</small></span></label>`; }).join('')}</div></section>
 <aside class="module-side"><div class="workspace-panel"><div class="panel-title"><h2>In turno ${SV.today}</h2></div>${D.staff.map(s => `<div class="mini-row"><span><b>${esc(s.name)}</b><small>${s.role}</small></span><span class="muted">${s.shift}</span></div>`).join('')}</div>
 ${ottoPanel('TURNI', 'Sabato prossimo hai **38 coperti** già prenotati: ti suggerisco una persona in più in sala dalle 20.')}</aside></div>`;
}
function brandPage() {
 return `${heading('CLIENTI & MARKETING · 12', 'Brand & app', 'Il menu QR e il portale ospiti, sempre allineati con la cucina.')}
 <div class="quote-layout"><section class="workspace-panel"><div class="panel-title"><h2>Menu QR, come lo vede l’ospite</h2>${badge('Si aggiorna con il magazzino', 'badge-green')}</div><div data-anchor="brand" class="anchor-pad"></div><div class="qr-menu">${D.menu.map(d => `<div class="qr-item ${D.available(d) ? '' : 'off'}"><span><b>${esc(d.name)}</b><small>${d.allergens.join(' · ') || 'Senza allergeni dichiarati'}</small></span><b>${D.available(d) ? euro(d.price) : 'Esaurito'}</b></div>`).join('')}</div></section>
 <aside class="module-side">${ottoPanel('COLLEGATO', 'Quando un piatto finisce in magazzino, sparisce dal menu QR e dal portale. **Nessuno ordina più qualcosa che non c’è.**')}</aside></div>`;
}

// ————— IMPOSTAZIONI —————
function settings() {
 return `${heading('IMPOSTAZIONI', 'Il locale', 'Anteprima dimostrativa: le scelte fatte qui restano solo in questa pagina.')}
 <section class="workspace-panel"><div class="setting-line"><span><b>${esc(D.restaurant.name)}</b><small>${esc(D.restaurant.city)} · ${D.tables.length} tavoli · ${D.staff.length} persone in turno · locale inventato</small></span></div>
 <div class="setting-line"><span><b>Servizio live</b><small>La cucina avanza da sola e arrivano ordini, chiamate e recensioni.</small></span>${btn(D.service.live ? 'Metti in pausa' : 'Riprendi', 'live', 'btn-secondary', '')}</div>
 <div class="setting-line"><span><b>Menu digitale QR</b><small>Prezzi, piatti e disponibilità su tutti i tavoli.</small></span>${btn('Apri l’editor', 'menu-editor', 'btn-secondary', '')}</div>
 <div class="setting-line"><span><b>Ripristina la demo</b><small>Riporta sala, cucina, cassa e menu allo stato iniziale.</small></span>${btn('Ripristina', 'reset', 'btn-secondary', '')}</div></section>`;
}

// ————— OTTO —————
function askOtto(text) {
 const t = text.toLowerCase();
 if (/andat|incass|serata|finora/.test(t)) { const open = D.tables.reduce((n, x) => n + D.tableTotal(x), 0); return {text:`Finora **${euro(D.service.revenue)}** incassati con ${D.service.closed.length} conti, più **${euro(open)}** ancora aperti in sala. ${D.tables.filter(x => x.status !== 'free').length} tavoli occupati, ${D.kitchenLines().filter(l => l.state !== 'served').length} comande in cucina.`, links:[['La cassa', 'menu_pos']]}; }
 if (/magazz|manca|scorta|ordin/.test(t)) { const low = D.lowStock(); return {text: low.length ? `Sotto scorta: **${low.map(i => `${i.name} (${D.fmtQty(i)})`).join(', ')}**. L’ordine ai fornitori è pronto.` : 'Tutto sopra la scorta minima.', links:[['Il magazzino', 'magazzino']]}; }
 if (/tavol|aspett|attesa|cucina/.test(t)) { const w = D.kitchenLines().filter(l => l.state === 'waiting'); return {text: w.length ? `Aspettano la cucina: **${[...new Set(w.map(l => l.table))].join(', ')}**. Il più vecchio è ${w.sort((a, b) => a.at - b.at)[0].table}.` : 'Nessun tavolo in attesa della cucina.', links:[['La cucina', 'kds']]}; }
 if (/(togli|nascondi|prezzo|piatto del giorno|rimetti|è finit|e finit)/.test(t)) return {text:D.menuCommand(text), links:[['Il menu QR', 'menu_pos']]};
 if (/prenot|arriv/.test(t)) return {text:`In arrivo: ${D.bookings.map(b => `**${b.time}** ${b.name} (${b.guests})`).join(', ')}. Anna Serra è celiaca: già segnalato alla cucina.`, links:[['La sala', 'sala']]};
 return {text:'Vedo sala, cucina, cassa, magazzino, prenotazioni e recensioni. Chiedimi “com’è andata finora?”, “cosa manca in magazzino?” o “quali tavoli aspettano?”.', links:[]};
}
const ottoSuggestions = ['Com’è andata finora?', 'Cosa manca in magazzino?', 'Quali tavoli aspettano?', 'Togli la tagliata stasera'];
function ottoDrawer() {
 return `<header class="drawer-head"><span class="studio-mark">${icon('sparkle')}</span><div><b>Otto</b><small>Vede sala, cucina, cassa, magazzino e ospiti</small></div><button class="icon-btn" data-action="otto" aria-label="Chiudi Otto">${icon('close')}</button></header>
 <div class="drawer-body" id="otto-body">${ui.otto.length ? ui.otto.map(m => m.role === 'user' ? `<div class="msg-user"><p>${esc(m.text)}</p></div>` : `<div class="msg-agent"><p class="agent-reply">${rich(m.text)}</p>${m.links.length ? `<div class="agent-actions">${m.links.map(([l, h]) => `<a class="btn btn-secondary" href="#${h}">${l}${icon('arrow')}</a>`).join('')}</div>` : ''}</div>`).join('') : `<div class="drawer-welcome"><div class="welcome-otto small">${otto('awake')}</div><p>Sono lo stesso assistente in tutti i moduli, e presto anche su WhatsApp. Chiedimi del servizio.</p></div>`}</div>
 <div class="drawer-suggest">${ottoSuggestions.map(s => `<button data-otto="${s}">${s}</button>`).join('')}</div>
 <form id="otto-form" class="composer-box"><textarea id="otto-input" rows="1" placeholder="Chiedi a Otto…" aria-label="Domanda a Otto"></textarea><button class="send-btn" type="submit" aria-label="Invia">${icon('send')}</button></form>`;
}
function toggleOtto(force) {
 const d = document.querySelector('#otto-drawer'); const open = force ?? d.hidden;
 d.hidden = !open; document.body.classList.toggle('otto-open', open);
 if (open) { d.innerHTML = ottoDrawer(); d.querySelector('#otto-input').focus(); }
}
function askGlobal(text) {
 ui.otto.push({role:'user', text}, {role:'agent', ...askOtto(text)});
 const d = document.querySelector('#otto-drawer'); d.innerHTML = ottoDrawer(); const b = d.querySelector('#otto-body'); b.scrollTop = b.scrollHeight;
}

// ————— azioni ed eventi —————
function show(content, cls='') { returnFocus = document.activeElement; if (dialog.open) dialog.close(); dialog.className = cls; dialog.innerHTML = `${content}<button class="dialog-close icon-btn" data-action="close" aria-label="Chiudi">${icon('close')}</button>`; dialog.showModal(); }
function searchDialog() { show(`<h2 id="dialog-title" class="sr-only">Cerca</h2><label class="command-input">${icon('search')}<input id="global-search" placeholder="Moduli, piatti, tavoli…" aria-label="Cerca" autocomplete="off"></label><div class="search-caption">RISULTATI</div><div id="search-results">${searchResults('')}</div><div class="search-hint">Invio per aprire <span>Esc per chiudere</span></div>`, 'search-dialog'); }
function searchResults(q) {
 q = q.toLowerCase();
 const items = [...modules.map(m => ({h:m.id, i:m.icon, t:m.title, s:m.description})), ...D.menu.map(d => ({h:'menu_pos', i:'menu', t:d.name, s:`${d.cat} · ${euro(d.price)}`})), ...D.ingredients.map(x => ({h:'magazzino', i:'box', t:x.name, s:D.fmtQty(x)}))].filter(x => `${x.t} ${x.s}`.toLowerCase().includes(q)).slice(0, 9);
 return items.map(x => `<a href="#${x.h}" class="search-result" data-close>${icon(x.i)}<span><b>${esc(x.t)}</b><small>${esc(x.s)}</small></span>${icon('arrow')}</a>`).join('') || '<p class="search-empty">Nessun risultato.</p>';
}
function toast(s) { const el = document.querySelector('#toast'); el.textContent = s; el.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 4000); }
function action(a) {
 const [k, x, y] = a.split(':');
 if (a === 'close') return dialog.close();
 if (a === 'sidebar') { document.body.classList.toggle('sidebar-open'); return syncNavigation(); }
 // con la sfida avviata, Chiedi a Otto apre la sua bottega
 if (a === 'otto') return gameOn() ? openShop() : toggleOtto();
 if (a === 'search') return searchDialog();
 if (a === 'tour') return startTour(restaurantTour({toggleOtto, ui, D}), {otto, name:'Demo interattiva CS Restaurant OS', onEnd:() => { toggleOtto(false); gameInvite(); }});
 if (a === 'live') { D.service.live = !D.service.live; toast(D.service.live ? 'Servizio live: la cucina avanza e arrivano ordini.' : 'Servizio in pausa.'); return shell(); }
 if (a === 'retry') return render();
 if (k === 'toast') return toast(a.slice(6));
 if (k === 'go') { location.hash = a.slice(3); return; }
 if (a === 'adding') { ui.adding = !ui.adding; return render(); }
 if (k === 'seat') { D.openTable(x, +y); ecoPoints('seat', 2, 'Tavolo accomodato'); return; }
 if (k === 'bill') { D.requestBill(x); ecoPoints('bill', 2, 'Conto richiesto', x); return; }
 if (k === 'close') { const total = D.closeBill(x); ui.adding = false; ecoPoints('close', 5, 'Conto chiuso', x); toast(`Tavolo ${x.slice(1)} chiuso: ${euro(total)} in cassa.`); return; }
 if (a === 'menu-editor') return menuEditor();
 if (a === 'reset') { location.hash = 'home'; location.reload(); return; }
 if (a === 'reorder') { D.reorder(D.lowStock().map(i => i.id)); ecoPoints('reorder', 8, 'Magazzino rifornito'); toast('Ordine inviato ai fornitori (demo).'); return; }
 if (k === 'review') { ui.done.reviews.push(a.slice(7)); ecoPoints('review', 4, 'Recensione pubblicata', a.slice(7)); toast('Risposta pubblicata (demo).'); return shell(); }
 if (a === 'account') return show(`<span class="dialog-kicker">IL TUO LOCALE</span><h2 id="dialog-title">Marta Rinaldi</h2><p class="dialog-description">Titolare · ${esc(D.restaurant.name)}. L’accesso CSD Station sarà collegato al servizio.</p>`);
}
function syncNavigation() {
 const side = document.querySelector('.sidebar'), body = document.querySelector('.app-body');
 const open = compact.matches && document.body.classList.contains('sidebar-open');
 side.inert = compact.matches && !open; body.inert = open;
 document.querySelector('.mobile-toggle').setAttribute('aria-expanded', String(open));
}
compact.addEventListener('change', () => { document.body.classList.remove('sidebar-open'); syncNavigation(); });
dialog.addEventListener('close', () => { if (returnFocus?.isConnected) returnFocus.focus(); });
document.addEventListener('click', e => {
 const t = e.target, el = s => t.closest(s); let x;
 if (el('[data-close]')) dialog.close();
 if ((x = el('[data-action]'))) return action(x.dataset.action);
 if ((x = el('[data-door]'))) { ui.door = ui.door === x.dataset.door ? null : x.dataset.door; return render(); }
 if ((x = el('[data-table]')) && ui.door && route() === 'sala') {
  const id = x.dataset.table, t = D.table(id), p = D.door.find(y => y.id === ui.door);
  if (p && t && D.fits(t, p)) {
   // il tavolo più piccolo che basta è la scelta giusta: un tavolo da 8 dato a due persone blocca il prossimo gruppo grande
   const best = Math.min(...D.tables.filter(x => D.fits(x, p)).map(x => x.seats)), good = t.seats === best;
   D.seatParty(p.id, id); ecoPoints('seat', good ? 6 : 3, good ? 'Tavolo giusto' : 'Ospiti accomodati', p.id, {born:p.at}); ui.door = null; ui.table = id; ui.adding = false;
   toast(good ? `${p.name} al tavolo ${id.slice(1)}: il tavolo giusto per ${p.n}.` : `${p.name} al tavolo ${id.slice(1)}. C’era un tavolo da ${best}: questo da ${t.seats} serviva a un gruppo più grande.`); return render();
  }
  toast(t?.status !== 'free' ? `Il tavolo ${id.slice(1)} è occupato.` : `Il tavolo ${id.slice(1)} ha ${t.seats} posti: ${p?.name} sono in ${p?.n}.`); return;
 }
 if ((x = el('[data-table]'))) { if (route() !== 'sala') { ui.table = x.dataset.table; location.hash = 'sala'; return; } ui.table = x.dataset.table; ui.adding = false; return render(); }
 if ((x = el('[data-add]'))) { const ok = D.addDish(ui.table, x.dataset.add); if (ok) ecoPoints('add', 2, 'Comanda in cucina'); toast(ok ? `${D.dish(x.dataset.add).name} → cucina · conto e magazzino aggiornati` : 'Piatto esaurito: ingredienti insufficienti.'); return; }
 if ((x = el('[data-fridge-act]'))) { const f = D.fridge(x.dataset.fridgeAct), born = f?.since, no = f?.faults; if (D.fridgeAction(x.dataset.fridgeAct)) ecoPoints('fridge', 5, 'Cella sistemata', `${f.id}-${no}`, {born}); return render(); }
 if ((x = el('[data-cook]'))) { const id = x.dataset.cook, l = D.kitchenLines().find(y => y.id === id); if (D.startCooking(id)) { ecoPoints('advance', 3, 'Sui fornelli', id, {born:l?.at}); ui.ticket = null; } else toast(`Fornelli pieni: aspetta che un piatto vada al pass (${D.kitchen.cap} insieme).`); return; }
 if ((x = el('[data-pass]'))) { const id = x.dataset.pass, l = D.kitchenLines().find(y => y.id === id); if (D.passLine(id)) { ecoPoints('pass', 3, 'Al pass', id, {born:l?.cookedAt}); ui.ticket = null; } return; }
 if ((x = el('[data-serve]'))) { const id = x.dataset.serve, l = D.kitchenLines().find(y => y.id === id); if (D.serveLine(id)) { ecoPoints('serve', 4, 'Servito', id, {born:l?.readyAt}); ui.ticket = null; } return; }
 if ((x = el('[data-advance]'))) { D.advance(x.dataset.advance); ecoPoints('advance', 2, 'Comanda avanti', x.dataset.advance); ui.ticket = null; return; }
 if ((x = el('[data-ticket]'))) { ui.ticket = ui.ticket === x.dataset.ticket ? null : x.dataset.ticket; return render(); }
 if ((x = el('[data-category]'))) { ui.category = x.dataset.category; return render(); }
 if ((x = el('[data-otto]'))) return askGlobal(x.dataset.otto);
 if ((x = el('[data-qr-add]'))) { ui.qr.cart[x.dataset.qrAdd] = (ui.qr.cart[x.dataset.qrAdd] || 0) + 1; return render(); }
 if ((x = el('[data-qr-cat]'))) { ui.qr.cat = x.dataset.qrCat; return render(); }
 if ((x = el('[data-qr-table]'))) { ui.qr = {table:x.dataset.qrTable, cart:{}, step:'menu', cat:ui.qr.cat, receipt:null}; return render(); }
 if ((x = el('[data-qr]'))) return qrAction(x.dataset.qr);
 if ((x = el('[data-menu-otto]'))) { ui.menuReply = D.menuCommand(x.dataset.menuOtto); ecoPoints('menu', 2, 'Menu aggiornato'); checkChef(); return render(); }
});
document.addEventListener('change', e => {
 const d = e.target.dataset;
 if (d.haccp) { ui.done.haccp.push(+d.haccp); ecoPoints('haccp', 3, 'Controllo HACCP', +d.haccp); render(); }
 if (d.editPrice && +e.target.value > 0) { D.editDish(d.editPrice, {price:+e.target.value}); toast('Prezzo aggiornato su tutti i QR.'); checkChef(); }
 if (d.editVisible) { D.editDish(d.editVisible, {visible:e.target.checked}); toast(e.target.checked ? 'Di nuovo nel menu.' : 'Tolto dal menu di stasera.'); checkChef(); }
});
document.addEventListener('input', e => {
 if (e.target.id === 'catalog-search') { ui.query = e.target.value; const y = e.target.selectionStart; render(); const i = document.querySelector('#catalog-search'); i.focus(); i.setSelectionRange(y, y); }
 if (e.target.id === 'global-search') document.querySelector('#search-results').innerHTML = searchResults(e.target.value);
});
document.addEventListener('submit', e => {
 e.preventDefault();
 if (e.target.id === 'otto-form') { const v = e.target.querySelector('#otto-input').value.trim(); if (v) askGlobal(v); }
 if (e.target.id === 'menu-otto-form') { const v = e.target.querySelector('#menu-otto-input').value.trim(); if (v) { ui.menuReply = D.menuCommand(v); checkChef(); render(); } }
});
document.addEventListener('keydown', e => {
 if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); searchDialog(); }
 if (e.key === 'Enter' && !e.shiftKey && e.target.id === 'otto-input') { e.preventDefault(); e.target.form.requestSubmit(); }
 if (e.key === 'Escape' && !dialog.open) { if (document.body.classList.contains('otto-open')) toggleOtto(false); document.body.classList.remove('sidebar-open'); syncNavigation(); }
});
window.addEventListener('hashchange', () => { if (dialog.open) dialog.close(); document.body.classList.remove('sidebar-open'); shell(); if (document.body.classList.contains('otto-open')) toggleOtto(true); scrollTo({top:0, behavior:'instant'}); });
function liveToast(ev) {
 const stack = document.querySelector('#live-stack'); if (!stack || document.body.classList.contains('touring')) return;
 if (gameOn() && ev.type !== 'mission') return;
 const card = document.createElement('button');
 card.className = `live-card lc-${ev.type}`; card.dataset.action = `go:${ev.go}`;
 card.innerHTML = `<span class="lc-icon">${icon(ev.icon)}</span><span><b>${esc(ev.title)}</b><small>${esc(ev.text)}</small></span>`;
 stack.prepend(card); [...stack.children].slice(3).forEach(x => x.remove());
 setTimeout(() => { card.classList.add('out'); setTimeout(() => card.remove(), 300); }, 6500);
}
D.onInbound(liveToast);
D.setReserved(isReserved);
D.subscribe(liveRefresh);
// Dentro il sito la demo parte ferma (niente cicli né animazioni): si accende solo quando il visitatore la apre.
let awake = window.parent === window;
const busy = () => !awake || document.hidden || document.body.classList.contains('touring') || gamePaused();
const wake = on => { awake = on; document.documentElement.classList.toggle('csd-paused', !on); };
wake(awake);
setInterval(() => { try { if (!busy()) D.tick(); } catch (err) { console.warn('CS Restaurant OS · errore nel servizio', err); } }, 3500);
setInterval(() => {
 try {
  if (busy() || !gameOn() || !D.service.game) return;
  chefDirector();
  const fr = D.fridgeTick();
  fr.lost.forEach(f => { penalty(10, 'Merce buttata'); toast(`${f.name}: oltre i ${f.max + 4} °C, metà della merce va buttata.`); });
  document.querySelectorAll('[data-fridge-temp]').forEach(e => { const f = D.fridge(e.dataset.fridgeTemp); e.textContent = fridgeTemp(f); e.closest('.fridge')?.classList.toggle('red', D.fridgeRed(f)); });
  const dr = D.doorTick(gameLevel());
  dr.left.forEach(p => { penalty(10, 'Ospiti andati via'); toast(`${p.name} (${p.n} persone) se ne sono andati: troppa attesa all’ingresso.`); });
  document.querySelectorAll('[data-door-wait]').forEach(e => { const p = D.door.find(y => y.id === e.dataset.doorWait); if (!p) return; e.textContent = Math.floor(D.doorWait(p)); e.closest('.dq-party')?.classList.toggle('red', D.doorRed(p)); const bar = document.querySelector(`[data-door-bar="${p.id}"]`); if (bar) bar.style.width = `${Math.min(100, D.doorWait(p) / D.doorLeave() * 100)}%`; });
  const dsig = D.door.map(p => p.id).join(','); if (dsig !== ui.doorSig) { ui.doorSig = dsig; if (route() === 'sala') render(); }
  const h = D.kitchenGameTick(gameLevel());
 if (h.handover) ottoMessage({name:'Otto cuoco', role:'otto-chef', title:'La cucina passa a te', button:'Ho capito', lines:['Per i primi minuti ho mandato avanti io la cucina, così hai potuto guardarti intorno.', '**Da adesso la cucina è manuale**: metti i piatti sui fornelli, manda al pass quelli cotti e servili al tavolo. Se una colonna diventa rossa, perdi punti.', 'Niente paura: con i punti, nella **Bottega di Otto**, puoi comprare tre automatismi — **in cucina**, **al pass** e **al tavolo** — e non pensarci più.']});
  // ogni cosa in rosso costa 1 punto al secondo, ma al massimo 2 in tutto: si perde, senza crollare
  const reds = fr.red.length + (h.waiting ? 1 : 0) + (h.pass ? 1 : 0) + (dr.red.length ? 1 : 0);
  if (reds) penalty(Math.min(2, reds), fr.red.length ? 'Cella fuori norma' : h.waiting ? 'Comande ferme' : h.pass ? 'Piatti fermi al pass' : 'Ospiti in attesa');
  const was = ui.kitchenHot || {}; ui.kitchenHot = h;
  if ((was.waiting !== h.waiting || was.pass !== h.pass || h.handover) && route() === 'kds') render();
  else if (route() === 'kds' && D.kitchen.autoUntil > Date.now() && Date.now() % 5000 < 1000) liveRefresh(); // il conto alla rovescia della cucina automatica
  // cosa sta facendo perdere punti, e dove andare a sistemarlo
  const pr = [];
  if (h.waiting) pr.push({page:'kds', label:'Comande ferme in cucina'});
  if (h.pass) pr.push({page:'kds', label:'Piatti fermi al pass'});
  fr.red.forEach(f => pr.push({page:'staff', label:`${f.name} fuori temperatura`}));
  if (dr.red.length) pr.push({page:'sala', label:dr.red.length === 1 ? `All’ingresso aspetta: ${dr.red[0].name}` : `${dr.red.length} gruppi aspettano all’ingresso`});
  setPressure(pr);
 } catch (err) { console.warn('CS Restaurant OS · errore nel battito', err); }
}, 1000);
(function inbound() { setTimeout(() => { if (!busy()) D.inboundTick(); inbound(); }, 14000 + Math.random() * 10000); })();
window.addEventListener('message', e => {
 if (e.origin !== location.origin) return;
 if (e.data === 'csd:start-tour') { wake(true); action('tour'); }
 if (e.data === 'csd:start-game') { wake(true); gameIntro(); }
 if (e.data === 'csd:resume') wake(true);
 if (e.data === 'csd:pause') wake(false);
});
initGame(challenges, {story,icon, place:'il locale', missionsOnly:true,
 // "il tempo è fermo" vale per tutto: il motore restituisce qui il tempo passato a gioco fermo
 freeze:ms => {
  if (!D.service.game) return;
  D.door.forEach(p => { p.at = later(p.at, ms); });
  D.tables.forEach(t => t.lines.forEach(l => { ['at', 'cookAt', 'cookedAt', 'readyAt'].forEach(k => { if (l[k]) l[k] = later(l[k], ms); }); }));
  D.fridges.forEach(f => { if (f.since) f.since = later(f.since, ms); if (f.repairUntil) f.repairUntil += ms; });
  if (D.kitchen.autoUntil > Date.now() - ms) D.kitchen.autoUntil += ms;
  D.shiftClocks(ms);
 },
 // compiti veri: nascono dallo stato del locale e si fanno con i tasti delle sezioni
 tasks:() => {
  const c = [], low = D.lowStock();
  if (low.length) c.push({key:'reorder', page:'magazzino', title:`Sotto scorta: ${low.slice(0, 2).map(i => i.name).join(', ')}`, text:'Otto ha preparato l’ordine: **invialo ai fornitori** dal pannello “Ordine proposto”.', target:'[data-action="reorder"]', valid:() => D.lowStock().length > 0, auto:() => D.reorder(D.lowStock().map(i => i.id))});
  D.tables.filter(t => t.status === 'bill' && t.id !== 'T8' && !t.mission).forEach(t => c.push({key:'close', ref:t.id, page:'sala', title:`Il tavolo ${t.id.slice(1)} chiede il conto`, text:`Apri il **tavolo ${t.id.slice(1)}** nella pianta e premi **Chiudi conto**.`, target:`[data-action="close:${t.id}"]`, valid:() => D.table(t.id).status === 'bill', auto:() => D.closeBill(t.id)}));
  D.tables.filter(t => t.status === 'ordered' && t.id !== 'T3' && !t.mission && t.lines.length >= 3 && t.lines.every(l => l.state === 'served')).forEach(t => c.push({key:'bill', ref:t.id, page:'sala', title:`Il tavolo ${t.id.slice(1)} ha finito di mangiare`, text:`Apri il **tavolo ${t.id.slice(1)}** e premi **Richiedi il conto**.`, target:`[data-action="bill:${t.id}"]`, valid:() => D.table(t.id).status === 'ordered', auto:() => D.requestBill(t.id)}));
  const late = D.kitchenLines().filter(l => l.state === 'waiting').sort((a, b) => a.at - b.at)[0];
  if (late) c.push({key:'advance', urgent:D.service.game && !D.autoOn('cook') && Date.now() - late.at > D.waitMax() * 500, ref:late.id, page:'kds', title:`Comanda in attesa · tavolo ${late.table.slice(1)}`, text:D.service.game ? `In Cucina **apri la comanda del tavolo ${late.table.slice(1)}** e premi **Metti sui fornelli**. Se i fornelli sono pieni, prima manda al pass un piatto cotto.` : `In Cucina **apri la comanda del tavolo ${late.table.slice(1)}** e premi **Avvia la preparazione**.`, target:D.service.game ? `[data-cook="${late.id}"], [data-ticket="${late.id}"]` : `[data-ticket="${late.id}"]`, valid:() => D.kitchenLines().some(l => l.id === late.id && l.state === 'waiting'), auto:() => D.service.game ? D.startCooking(late.id) : D.advance(late.id)});
  const rev = D.reviews.find(r => !ui.done.reviews.includes(r.who));
  if (rev) c.push({key:'review', ref:rev.who, page:'recensioni_ai', title:`Nuova recensione di ${rev.who.trim()}`, text:'Leggi la bozza di Otto e premi **Approva e pubblica**.', target:`[data-action="review:${rev.who}"]`, valid:() => !ui.done.reviews.includes(rev.who), auto:() => ui.done.reviews.push(rev.who)});
  D.fridges.filter(f => ['door', 'fault', 'sensor'].includes(f.state)).forEach(f => c.push({key:'fridge', urgent:true, ref:`${f.id}-${f.faults}`, page:'staff', title:`${f.name}: ${f.state === 'door' ? 'porta aperta' : f.state === 'fault' ? 'compressore guasto' : 'sonda scollegata'}`, text:`In Staff & HACCP **${f.state === 'door' ? 'chiudi la porta' : f.state === 'fault' ? 'chiama il tecnico' : 'ricollega la sonda'}** della ${f.name.toLowerCase()} prima che la temperatura salga.`, target:`[data-fridge-act="${f.id}"]`, valid:() => D.fridge(f.id).state === f.state, auto:() => D.fridgeAction(f.id)}));
  D.door.forEach(p => c.push({key:'seat', ref:p.id, page:'sala', urgent:D.doorWait(p) > 15, title:`All’ingresso: ${p.name}, ${p.n} persone`, text:`In Sala **tocca ${p.name}** nel riquadro “All’ingresso”, poi **un tavolo libero con almeno ${p.n} posti**.`, target:`[data-door="${p.id}"]`, valid:() => D.door.some(x => x.id === p.id), auto:() => { const t = D.tables.find(x => D.fits(x, p)); if (t) D.seatParty(p.id, t.id); }}));
  const o = ui.chefOrder;
  if (o) { const d = D.dish(o.dish); c.push({key:'chef', ref:o.ref, page:'menu_pos', title:o.kind === 'off' ? `Lo chef: ${d.name} è finito` : `Lo chef: ${d.name} a € ${o.price}`, text:`Apri **l’editor del menu** (o chiedilo a Otto a parole) e ${o.kind === 'off' ? `**togli ${d.name}** dal menu di stasera` : `metti **${d.name} a € ${o.price}**`}.`, target:'[data-action="menu-editor"]', valid:() => ui.chefOrder?.ref === o.ref, auto:() => { D.editDish(o.dish, o.kind === 'off' ? {visible:false} : {price:o.price}); ui.chefOrder = null; }}); }
  const h = D.haccp.findIndex((x, i) => !x.done && !ui.done.haccp.includes(i));
  if (h >= 0) c.push({key:'haccp', ref:h, page:'staff', title:`HACCP · ${D.haccp[h].task}`, text:'In Staff & HACCP **spunta il controllo** nella checklist di oggi.', target:`input[data-haccp="${h}"]`, valid:() => !ui.done.haccp.includes(h), auto:() => ui.done.haccp.push(h)});
  // come un cameriere: un ordine da fare dal menu QR, con il pagamento giusto
  const seated = D.tables.filter(t => (t.status === 'seated' || t.status === 'ordered') && !['T3', 'T7', 'T8'].includes(t.id));
  if (seated.length && Math.random() < .5) {
   const t = seated[Math.floor(Math.random() * seated.length)], dishes = D.menu.filter(D.available).sort(() => Math.random() - .5).slice(0, 1 + Math.floor(Math.random() * 2));
   const want = dishes.map(d => [d.id, 1 + Math.floor(Math.random() * 2)]), prepaid = Math.random() < .5;
   const list = want.map(([id, n]) => `${n}× ${D.dish(id).name}`).join(', ');
   c.push({key:'qr', ref:t.id, page:'menu_pos', title:`Ordine al tavolo ${t.id.slice(1)}`, text:`Il tavolo ${t.id.slice(1)} ordina **${list}**. ${prepaid ? 'Il cliente **paga subito con Stripe**: premi Paga ora.' : 'Il cliente **paga dopo, in cassa**: premi Ordina e paga a fine cena.'} Scegli il tavolo sotto il QR e componi l’ordine sul telefono.`, target:`[data-qr-table="${t.id}"]`,
    check:p => { const got = Object.fromEntries((p.items || []).map(([id, n]) => [id, +n])); const same = want.every(([id, n]) => got[id] === n) && Object.keys(got).length === want.length; return !same ? {ok:false, why:'Piatti o quantità diversi'} : p.prepaid !== prepaid ? {ok:false, why:prepaid ? 'Doveva pagare subito' : 'Doveva pagare in cassa'} : {ok:true}; }});
  }
  return c;
 },
 focus:(page, ref) => { if (page === 'menu_pos' && ref && D.table(ref)) ui.qr = {table:ref, cart:{}, step:'menu', cat:ui.qr.cat, receipt:null}; if (page === 'sala') { ui.table = ref; ui.adding = false; } if (route() === page) render(); else location.hash = page; }, missionTypes:12, sections:12, placeOf:'del locale', startNote:'Fatture, comande, conti, chiamate e prenotazioni arrivano dal quadrato rosso “!” in alto, e ogni sezione del locale ha la sua missione.', onStart:() => { startMissions(); D.kitchenGameStart(); D.fridgeGameStart(); D.doorGameStart(); ui.door = null; ui.chefOrder = null; nextChefAt = Date.now() + 90000; }, onReset:() => { stopMissions(); D.kitchenGameStop(); D.doorGameStop(); ui.door = null; setPressure([]); },
 // potenziamenti del locale, da comprare nella Bottega di Otto
 shop:[
  {id:'auto-cook', name:'Automatismo in cucina', desc:'Le comande in attesa vanno sui fornelli da sole, appena c’è posto.', cost:60, mood:'otto-chef', use:() => { if (D.kitchen.auto.cook) return false; D.kitchen.auto.cook = true; render(); return 'Le comande vanno sui fornelli da sole.'; }},
  {id:'auto-pass', name:'Automatismo al pass', desc:'I piatti cotti vanno al pass da soli.', cost:50, mood:'otto-chef', use:() => { if (D.kitchen.auto.pass) return false; D.kitchen.auto.pass = true; render(); return 'I piatti cotti vanno al pass da soli.'; }},
  {id:'auto-serve', name:'Automatismo al tavolo', desc:'Un cameriere serve da solo i piatti pronti al pass.', cost:70, mood:'otto-bow', use:() => { if (D.kitchen.auto.serve) return false; D.kitchen.auto.serve = true; render(); return 'I piatti pronti arrivano al tavolo da soli.'; }},
  {id:'cuoco', name:'Secondo cuoco', desc:'+1 piatto sui fornelli insieme (fino a 7).', cost:35, mood:'otto-chef', use:() => { if (D.kitchen.cap >= 7) return false; D.kitchen.cap++; render(); return `Ora i fornelli reggono ${D.kitchen.cap} piatti insieme.`; }},
  {id:'cameriere', name:'Cameriere al pass', desc:'+20 secondi prima che il pass vada in rosso.', cost:25, mood:'otto-bow', use:() => { D.kitchen.passTime += 20; render(); return `Dal pass si serve entro ${D.kitchen.passTime} secondi.`; }},
  {id:'forno', name:'Forno nuovo', desc:'Cottura più veloce del 20%.', cost:40, mood:'otto-chef', use:() => { if (D.kitchen.speed <= .5) return false; D.kitchen.speed = +(D.kitchen.speed * .8).toFixed(2); render(); return 'I piatti cuociono più in fretta.'; }},
  {id:'assistenza', name:'Contratto di assistenza', desc:'Il tecnico dei frigo arriva in 15 secondi invece di 45.', cost:30, mood:'otto-inspector', use:() => { if (D.fridgeCfg.repair <= 15) return false; D.fridgeCfg.repair = 15; return 'Il tecnico ora arriva in 15 secondi.'; }},
  {id:'allarme', name:'Allarme porta frigo', desc:'Le porte rimaste aperte si richiudono da sole dopo 20 secondi.', cost:25, mood:'otto-inspector', use:() => { if (D.fridgeCfg.autoDoor) return false; D.fridgeCfg.autoDoor = 20; return 'Allarme attivo sulle porte delle celle.'; }},
  {id:'comis', name:'Commis in cucina', desc:'+30 secondi prima che le comande in attesa vadano in rosso.', cost:20, mood:'otto-chef', use:() => { D.kitchen.waitBonus += 30; render(); return `Le comande possono aspettare ${D.waitMax()} secondi.`; }},
  {id:'hostess', name:'Hostess all’ingresso', desc:'Gli ospiti alla porta aspettano 30 secondi in più prima di spazientirsi.', cost:25, mood:'otto-bow', use:() => { if (D.doorCfg.bonus >= 90) return false; D.doorCfg.bonus += 30; render(); return 'All’ingresso c’è chi accoglie: gli ospiti hanno più pazienza.'; }},
  {id:'prenota', name:'Prenotazioni online', desc:'Un terzo in meno di ospiti senza prenotazione alla porta.', cost:30, mood:'otto-phone', use:() => { if (D.doorCfg.calm > 1) return false; D.doorCfg.calm = 1.5; return 'Ora quasi tutti prenotano dal sito: meno sorprese alla porta.'; }}
 ], menuNote:'Le missioni arrivano dal locale vivo: fatture dei fornitori, comande grandi, conti, prenotazioni e chiamate. Sempre nuove.', pageName:id => moduleById(id)?.title || {home:SV.title}[id] || id});
shell();
