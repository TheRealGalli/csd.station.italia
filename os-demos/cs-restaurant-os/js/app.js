import {persona} from './persona.js';
import {icon, otto} from './icons.js';
import {modules, groups, groupNotes, moduleById} from './modules.js';
import * as D from './demo.js';
import {startTour} from './tour.js';
import {enhancePanels} from './panels.js';
import {initGame, gameChip, mountGame, gameInvite, gameOn, openShop, gameIntro, ecoPoints, missionPanel, gamePaused, isReserved, penalty, gameLevel, ottoMessage, setPressure, later, gameState, pickOne} from './game.js';
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
 return {sala:D.tables.filter(t => t.status !== 'free').length, delivery:D.dActive().length, kds:D.kitchenLines().filter(l => l.state !== 'served').length, magazzino:D.lowStock().length, recensioni_ai:D.reviews.filter(r => !ui.done.reviews.includes(r.who)).length};
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
  <div class="sidebar-bottom"><button class="plan-mini" data-action="otto"><span class="plan-orbit">${icon('otto-happy')}</span><span>Chiedi a Otto<small>Un solo assistente per tutto il locale</small></span>${icon('chevron')}</button>${navItem('settings', 'Impostazioni', 'settings')}<button class="account" data-action="account"><span class="avatar">${persona.initials}</span><span>${persona.name}<small>Titolare</small></span>${icon('down')}</button></div>
 </aside><div class="mobile-scrim" data-action="sidebar"></div>
 <div class="app-body"><header class="topbar"><div class="breadcrumbs"><button class="icon-btn mobile-toggle" data-action="sidebar" aria-label="Apri navigazione" aria-controls="workspace-navigation" aria-expanded="false">${icon('list')}</button><span>Locale</span>${icon('chevron')}<strong id="crumb"></strong></div>
  <div class="topbar-actions">${gameChip()}<button class="search-trigger" data-action="search" aria-label="Cerca">${icon('search')}<span>Cerca</span><kbd>⌘ K</kbd></button><button class="ask-otto" data-action="otto">${icon('otto-happy')}<span>Chiedi a Otto</span></button><button class="demo-btn" data-action="tour" aria-label="Demo interattiva" title="Demo interattiva"><i></i><span>Demo interattiva</span></button></div></header>
  <main id="main" tabindex="-1"></main>
  <footer class="app-footer"><span>CSD Station <span class="footer-divider">/</span> Il tuo ristorante, connesso.</span><span>Anteprima dimostrativa · locale, ospiti e numeri inventati · nessun servizio collegato</span></footer></div>
 <aside class="otto-drawer" id="otto-drawer" aria-label="Otto" hidden></aside><div class="live-stack" id="live-stack" aria-live="polite"></div>`;
 render(); syncNavigation();
}
const pages = {home, modules:catalog, settings, sala, kds, menu_pos:menuPos, delivery:deliveryPage, magazzino, centralino_ai:centralino, recensioni_ai:recensioni, whatsapp, fidelity_nfc:fidelity, fatture, bandi, staff, app_builder:brandPage};
function render() {
 const id = route(), m = moduleById(id);
 const title = m?.title || {home:SV.title, modules:'L’ecosistema', settings:'Impostazioni'}[id] || 'Pagina non trovata';
 document.querySelector('#crumb').textContent = title; document.title = `${title} · CS Restaurant OS`;
 const main = document.querySelector('#main');
 main.className = id !== lastRoute ? 'enter' : ''; lastRoute = id;
 try {
  main.innerHTML = pages[id] ? pages[id]() : `<div class="empty-state"><h2>Questo spazio non esiste.</h2><a class="btn btn-primary" href="#home">Torna al servizio${icon('arrow')}</a></div>`;
  mountGame(id, main);
  // elenchi vivi in riquadri fissi che si scorrono (con la lente quando sono lunghi): la pagina non cambia altezza
  enhancePanels(main, id, ({home:['.feed-list'], fatture:['.table-scroll'], delivery:['.table-scroll'], recensioni_ai:['.review-list'], centralino_ai:['.review-list']})[id]);
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
  if (['home', 'sala', 'kds', 'menu_pos', 'delivery', 'magazzino', 'centralino_ai', 'recensioni_ai', 'fatture', 'staff'].includes(route()) && !busy) {
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
 return `${heading(`SERVIZIO DI ${SV.name.toUpperCase()} · ${NOW.weekday.toUpperCase()} · DALLE ${SV.start}`, `${NOW.greet}, ${persona.first}.`, 'Il locale in tempo reale. Otto tiene d’occhio tutto il resto.', `<span class="live-pill"><span class="live-dot"></span>Live</span>`)}
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
 return `<section class="ecosystem"><div class="section-title"><div class="inline-title"><h2>Un ristorante, tutto collegato</h2><span class="count-tag">${modules.length} MODULI · 1 ASSISTENTE</span></div><a class="text-link" href="#modules">L’ecosistema${icon('arrow')}</a></div>
 <div class="eco-flow">${Object.entries(groups).map(([g, l], i) => `<div class="eco-col ${g === 'operations' ? 'eco-core' : ''}"><span class="eco-step">0${i + 1}</span><h3>${l}</h3><p>${groupNotes[g]}</p>${modules.filter(m => m.group === g).map(m => `<a href="#${m.id}" class="eco-item">${icon(m.icon)}<span>${m.title}</span>${m.live ? '<span class="live-dot"></span>' : ''}</a>`).join('')}</div>`).join('')}</div>
 <div class="eco-otto">${icon('otto-wink')}<p><b>Un piatto, tutto il sistema.</b> Quando un ospite ordina una carbonara dal QR, la comanda arriva in cucina, il pagamento con Stripe diventa documento commerciale per l’Agenzia delle Entrate e il magazzino scala pasta, guanciale, uova e pecorino. Nello stesso istante.</p></div></section>`;
}
function catalog() {
 const q = ui.query.toLowerCase();
 const list = modules.filter(m => (ui.category === 'all' || m.group === ui.category) && `${m.title} ${m.description}`.toLowerCase().includes(q));
 return `${heading('L’ECOSISTEMA', 'Tredici moduli. Un solo locale.', 'I moduli che usano i ristoranti ogni giorno, collegati tra loro e con Otto.')}${ecosystem()}
 <div class="catalog-toolbar"><div class="filter-tabs">${[['all', 'Tutti'], ...Object.entries(groups)].map(([k, v]) => `<button data-category="${k}" class="${ui.category === k ? 'selected' : ''}" aria-pressed="${ui.category === k}">${v}</button>`).join('')}</div><label class="input-search">${icon('search')}<input id="catalog-search" value="${esc(ui.query)}" placeholder="Cerca un modulo…" aria-label="Cerca un modulo"></label></div>
 <div class="module-grid" id="catalog-results">${list.map(m => `<a class="module-card" href="#${m.id}"><div class="module-card-top"><span class="module-icon tone-${m.group}">${icon(m.icon)}</span>${m.live ? badge('<span class="live-dot"></span> Live', 'badge-green') : badge(m.group === 'ai' ? 'AI' : 'Demo')}</div><h3>${m.title}</h3><p>${m.description}</p><ul class="mini-features">${m.features.map(f => `<li>${icon('check')}${f}</li>`).join('')}</ul><div class="module-card-footer"><span>${groups[m.group]}</span>${icon('arrow')}</div></a>`).join('')}</div>`;
}

// ————— SALA —————
// Gli ospiti all'ingresso (solo nella sfida): si tocca il gruppo, poi un tavolo libero abbastanza grande.
function doorPanel() {
 if (!gameOn() || !D.service.game) return '';
 if (ui.door && !D.door.some(p => p.id === ui.door)) ui.door = null;
 const sel = D.door.find(p => p.id === ui.door);
 return `<div class="door-queue" data-anchor-door><span class="dq-title">${icon('users')} All’ingresso</span>${D.door.length ? D.door.map(p => { const w = D.doorWait(p); return `<button class="dq-party ${ui.door === p.id ? 'on' : ''} ${D.doorRed(p) ? 'red' : ''}" data-door="${p.id}"><b>${esc(p.name)}</b><small>${p.n} persone · aspetta da <span data-door-wait="${p.id}">${Math.floor(w)}</span> s</small><i data-door-bar="${p.id}" style="width:${Math.min(100, w / D.doorLeave() * 100)}%"></i></button>`; }).join('') : '<small class="dq-empty">Nessuno in attesa. Quando arriva qualcuno senza prenotazione, toccalo e scegli un tavolo libero abbastanza grande.</small>'}${sel ? (D.tables.some(t => D.fits(t, sel)) ? `<span class="dq-hint">${icon('arrow')} Ora tocca un tavolo <b>libero</b> con almeno <b>${sel.n} posti</b></span>` : `<span class="dq-hint full">Nessun tavolo libero da ${sel.n}: chiudi un conto in sala per liberarne uno.</span>`) : ''}</div>`;
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
  <div class="tp-total"><span>Conto${total !== D.tableDue(t) ? `<small>${euro(total - D.tableDue(t))} già pagati dal QR</small>` : ''}${t.perk ? `<small class="tp-perk">${icon('card')} ${esc(t.perk.label)} · −${euro(t.perk.amount)}</small>` : ''}</span><strong class="${ui.prev['t' + t.id] !== total && ui.prev['t' + t.id] !== undefined ? 'bump' : ''}">${euro(total)}</strong></div>${(ui.prev['t' + t.id] = total, '')}
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
   : state === 'cooking' ? (l.cooked ? (D.autoOn('pass') ? `<span class="tk-next">${icon('check')} Cotto · va al pass da solo</span>` : `<button class="tk-go" data-pass="${l.id}">Cotto · manda al pass ${icon('arrow')}</button>`) : `<span class="tk-next">In cottura · <b data-cook-left="${l.id}">${Math.max(0, Math.ceil(D.cookTime(d) - (now - (l.cookAt || now)) / 1000))}</b> s</span>`)
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
// I tavoli sotto il QR: tutti e dodici, sempre negli stessi posti, sei per pagina con le frecce.
// Se il tavolo di un ordine da fare è nell'altra pagina, la freccia verso di lui si accende di rosso.
const QR_PAGE = 6;
function qrTables() {
 const pages = Math.ceil(D.tables.length / QR_PAGE), page = Math.min(pages - 1, ui.qrPage ?? Math.floor((+ui.qr.table.slice(1) - 1) / QR_PAGE));
 const wanted = gameOn() ? Object.values(gameState().tasks).filter(t => t.key === 'qr' && !t.done).map(t => t.ref) : [];
 const hot = dir => D.tables.some((t, i) => wanted.includes(t.id) && (dir < 0 ? i < page * QR_PAGE : i >= (page + 1) * QR_PAGE));
 const arrow = (dir, to) => `<button class="qr-arrow ${hot(dir) ? 'hot' : ''}" data-qr-page="${to}" aria-label="${dir < 0 ? 'Tavoli precedenti' : 'Tavoli successivi'}">${dir < 0 ? '‹' : '›'}</button>`;
 return `<div class="qr-tables">${page > 0 ? arrow(-1, page - 1) : ''}${D.tables.slice(page * QR_PAGE, (page + 1) * QR_PAGE).map(t => `<button data-qr-table="${t.id}" class="${ui.qr.table === t.id ? 'on' : ''} ${wanted.includes(t.id) ? 'wanted' : ''}" ${t.status === 'free' ? 'disabled title="Tavolo libero: nessuno da servire"' : ''}>T${t.id.slice(1)}</button>`).join('')}${page < pages - 1 ? arrow(1, page + 1) : ''}</div>`;
}
function menuPos() {
 return `${heading('SALA & CUCINA · 03', 'Menu digitale QR', 'Ogni tavolo ha il suo QR: l’ospite ordina dal telefono e, se vuole, paga subito. La comanda arriva in cucina e il menu cambia da solo quando un piatto finisce.', `<span class="live-pill"><span class="live-dot"></span>${D.service.qrOrders} ordini dal QR stasera</span>`)}
 <div data-anchor="menu"></div>
 <div class="qr-layout">
  <section class="workspace-panel qr-card"><div class="panel-title"><h2>Il QR del tavolo</h2></div>
   <div class="qr-body"><button class="btn btn-dark qr-editor" data-action="menu-editor">${icon('menu')} Apri l’editor del menu</button>
   <div class="qr-code">${qrSvg(ui.qr.table)}<span>${ui.qr.table.slice(1)}</span></div><small class="qr-url">menu.osteriadelborgo.it/t/${ui.qr.table.slice(1)}</small>
   ${qrTables()}
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
 return `${heading('GESTIONE · 09', 'Magazzino & food cost', 'Ogni piatto venduto scala i suoi ingredienti dalla ricetta. Le righe che si accendono stanno cambiando adesso.', `<span class="live-pill"><span class="live-dot"></span>Scarico automatico</span>`)}
 <div class="quote-layout"><section class="workspace-panel"><div data-anchor="magazzino" class="anchor-pad"></div><div class="panel-title"><h2>Dispensa e cella</h2>${badge(`${low.length} sotto scorta`, low.length ? 'badge-red' : 'badge-green')}</div><div class="stock">${D.ingredients.map(i => { const pct = Math.min(100, i.qty / (i.min * 3) * 100); const recent = Date.now() - (i.changed || 0) < 3000; return `<div class="stock-row ${i.qty <= i.min ? 'low' : ''} ${recent ? 'row-in' : ''}" data-ing="${i.id}"><span class="st-name"><b>${esc(i.name)}</b><small>${esc(i.supplier)}</small></span><span class="st-bar"><i style="width:${pct}%"></i><em style="left:${100 / 3}%"></em></span><span class="st-qty ${recent ? 'bump' : ''}">${D.fmtQty(i)}</span>${i.qty <= i.min ? badge('Sotto scorta', 'badge-red') : badge('OK', 'badge-green')}</div>`; }).join('')}</div></section>
 <aside class="module-side">${low.length ? ottoPanel('ORDINE PROPOSTO', `**${low.map(i => `${i.name} (+${i.min * 2} ${i.unit})`).join(', ')}** da ${sup.join(', ')}. Arriva domattina, prima del pranzo.`, btn('Invia l’ordine ai fornitori', 'reorder', 'btn-primary', 'check')) : ottoPanel('MAGAZZINO', 'Tutto sopra la scorta minima. Ti avviso io quando qualcosa scende.')}
 <div class="workspace-panel"><div class="panel-title"><h2>Ricette: cosa scala un piatto</h2></div>${D.menu.filter(d => d.course).slice(0, 5).map(d => `<div class="mini-row"><span><b>${esc(d.name)}</b><small>${Object.entries(d.recipe).map(([k, q]) => `${D.ingredient(k).name} ${q < 1 ? Math.round(q * 1000) + (D.ingredient(k).unit === 'kg' ? ' g' : '') : q + ' ' + D.ingredient(k).unit}`).join(' · ')}</small></span><span class="fc">${euro(+D.foodCost(d).toFixed(2))}</span></div>`).join('')}</div></aside></div>`;
}

// ————— moduli AI e relazioni —————
function centralino() {
 return `${heading('INTELLIGENZA ARTIFICIALE · 05', 'Centralino AI', 'Otto risponde mentre siete in servizio: prenota, segnala le allergie, gestisce la lista d’attesa.', `<span class="live-pill"><span class="live-dot"></span>Attivo</span>`)}
 <div class="metrics-grid">${[['phone', `Chiamate ${SV.today}`, D.calls.length], ['calendar', 'Prenotazioni prese', 2], ['users', 'In lista d’attesa', 1], ['clock', 'Minuti al telefono risparmiati', 14]].map(([i, t, n]) => `<article class="metric"><div><span>${t}</span>${icon(i)}</div><strong class="has-value">${n}</strong></article>`).join('')}</div>
 <div data-anchor="centralino"></div>
 <div class="call-grid">${D.liveCalls.filter(c => c.live).map(c => `<article class="workspace-panel call live-call"><div class="panel-title"><h2>${esc(c.caller)}</h2><span class="badge badge-red"><span class="live-dot red"></span> In corso</span></div><div class="transcript"><div class="bubble caller row-in">${esc(c.text)}</div><div class="bubble typing"><i></i><i></i><i></i></div></div></article>`).join('')}${D.calls.map(c => `<article class="workspace-panel call"><div class="panel-title"><h2>${esc(c.caller)}</h2><span>${badge(c.outcome, 'badge-green')} <small class="muted">${c.time}</small></span></div><div class="transcript"><div class="bubble caller">${esc(c.text)}</div><div class="bubble agent"><small>${icon('sparkle')} Otto</small>${esc(c.reply)}</div></div></article>`).join('')}</div>`;
}
function recensioni() {
 return `${heading('INTELLIGENZA ARTIFICIALE · 06', 'Recensioni AI', 'Ogni recensione letta da Otto, con una risposta nel tuo tono pronta da approvare.')}
 <div class="review-list"><div data-anchor="recensioni"></div>${D.reviews.map(r => { const done = ui.done.reviews.includes(r.who); return `<article class="workspace-panel review ${done ? 'done' : ''}"><div class="rv-head"><span class="stars">${'★'.repeat(r.stars)}<i>${'★'.repeat(5 - r.stars)}</i></span><b>${esc(r.who)}</b><small>${r.source}</small>${done ? badge('Risposta pubblicata', 'badge-green') : ''}</div><p class="rv-text">“${esc(r.text)}”</p>${ottoNote(r.draft, r.stars < 3 ? 'warn' : '')}${done ? '' : `<div class="detail-actions">${btn('Approva e pubblica', `review:${r.who}`, 'btn-primary', 'check')}</div>`}</article>`; }).join('')}</div>
 ${ottoNote('Tema ricorrente nell’ultimo mese: **attesa sui secondi il sabato**. Lo stesso dato emerge dai tempi della cucina.', 'info')}`;
}
function whatsapp() {
 return `${heading('CLIENTI & MARKETING · 07', 'WhatsApp & campagne', 'Promemoria automatici e campagne preparate da Otto, solo agli ospiti che hanno dato il consenso.')}
 <div data-anchor="whatsapp"></div><div class="quote-layout"><section class="workspace-panel"><div class="panel-title"><h2>Campagne</h2></div>${D.campaigns.map(c => `<div class="mini-row"><span><b>${esc(c.name)}</b><small>${c.kind}${c.sent ? ` · ${c.sent} inviati · ${c.read} letti` : ''}</small></span>${c.sent ? badge(`${Math.round(c.read / c.sent * 100)}% letti`, 'badge-green') : btn('Rivedi', 'toast:Bozza pronta: in produzione parte dopo la tua approvazione', 'btn-secondary', '')}</div>`).join('')}</section>
 <aside class="module-side"><div class="phone-mock"><div class="wa bot">Ciao Luca! Ti aspettiamo ${SV.name === 'pranzo' ? 'oggi alle 13:15' : 'stasera alle 20:45'} per il vostro anniversario 🥂 Abbiamo tenuto per voi il tavolo vicino alla finestra.</div><div class="wa client">Grazie mille, a ${SV.name === 'pranzo' ? 'dopo' : 'stasera'}!</div></div>${ottoPanel('IDEA', 'Arrivano i porcini e a novembre il tartufo: ho preparato una campagna per **118 ospiti** che hanno ordinato piatti ai funghi negli ultimi 6 mesi.')}</aside></div>`;
}
// ————— FIDELITY & NFC —————
// La card fisica: bianca, con il logo del locale e il segno NFC, come quelle che si lasciano sul tavolo.
const nfcCard = (name = 'Card fedeltà', sub = 'Avvicina al lettore del tavolo') => `<div class="nfc-card" aria-hidden="true"><span class="nfc-logo">OdB</span><b>${esc(D.restaurant.name)}</b><small>${esc(name)}</small><span class="nfc-wave"><i></i><i></i><i></i></span><em>${esc(sub)}</em></div>`;
const tierBadge = m => { const t = D.tierOf(m); return `<span class="tier tier-${t.id}">${t.name}</span>`; };
const fmtPts = n => new Intl.NumberFormat('it-IT').format(n);
// Nella sfida: l'ospite ha appoggiato la card e aspetta. Si sceglie cosa spetta secondo le regole del programma.
function nfcTapCard(tap) {
 const m = tap.m, t = D.table(tap.table), r = tap.want && D.reward(tap.want), w = D.nfcWait(tap), tier = D.tierOf(m);
 const opt = (v, label, sub) => `<button class="nfc-opt" data-nfc-choice="${tap.id}|${v}"><b>${label}</b><small>${sub}</small></button>`;
 return `<article class="nfc-tap ${D.nfcRed(tap) ? 'red' : ''}" data-nfc-tap="${tap.id}"><header><span class="nfc-pulse">${icon('card')}</span><div><b>${esc(m.name)}</b><small>Tavolo ${tap.table.slice(1)} · ${tierBadge(m)} · saldo <b>${fmtPts(m.points)} punti</b> · ${fmtPts(m.year)} negli ultimi 12 mesi</small></div><span class="nfc-time"><span data-nfc-wait="${tap.id}">${Math.floor(w)}</span> s</span></header>
  <p class="nfc-ask">${tap.ask === 'premio' ? `“Vorrei usare i punti per <b>${esc(r.name.toLowerCase())}</b>.”` : `“Il conto, grazie. Ho la card.” · conto <b>${euro(D.tableTotal(t))}</b>`}</p>
  <div class="nfc-opts">${D.rewards.map(x => opt(`reward:${x.id}`, x.name, `${fmtPts(x.cost)} punti · vale ${euro(x.value)}`)).join('')}${opt('sconto', 'Sconto del livello', tier.off ? `${tier.name}: ${tier.off}% sul conto` : 'Argento 5% · Oro 10%')}${opt('punti', 'Solo punti', `+${Math.round(D.tableTotal(t))} punti con il conto di stasera`)}</div>
  <i class="nfc-bar"><i data-nfc-bar="${tap.id}" style="width:${Math.min(100, w / (D.nfc.cfg.leave + D.nfc.cfg.bonus * 1.5) * 100)}%"></i></i></article>`;
}
function nfcReader() {
 const live = gameOn() && D.nfc.on;
 const taps = live ? D.nfc.taps : [];
 return `<section class="workspace-panel nfc-reader"><div class="panel-title"><h2>${icon('card')} Al tavolo, adesso</h2>${live ? badge(`${taps.length} card in attesa`, taps.length ? 'badge-amber' : 'badge-green') : badge('Lettori NFC collegati', 'badge-green')}</div>
  <div class="nfc-stage">${nfcCard()}<div class="nfc-how"><b>Un tocco, e Otto sa chi è</b><span>Card fisica o card nel telefono: il lettore sul tavolo riconosce l’ospite, mostra livello, preferenze e allergie al cameriere e somma i punti alla chiusura del conto.</span></div></div>
  ${live ? (taps.length ? `<div class="nfc-taps">${taps.map(nfcTapCard).join('')}</div>` : `<p class="nfc-empty">Nessuna card in attesa. Quando un ospite appoggia la card, decidi tu cosa spetta: <b>premio</b>, <b>sconto del livello</b> o <b>solo punti</b>.</p>`)
   : `<ul class="nfc-log">${D.nfcLog.slice(0, 5).map(x => `<li><span class="nfc-dot">${icon('card')}</span><span><b>${esc(x.who)}</b> · tavolo ${x.table.slice(1)}<small>${esc(x.what)}</small></span><em>${x.time}${x.pts ? `<b class="${x.pts.startsWith('−') ? 'neg' : ''}">${x.pts}</b>` : ''}</em></li>`).join('')}</ul>`}</section>`;
}
function fidelity() {
 const seg = D.segments.find(s => s.id === (ui.fidSeg || 'oro')), inSeg = D.members.filter(seg.test), reach = inSeg.filter(m => m.wa);
 return `${heading('CLIENTI & MARKETING · 08', 'Fidelity & NFC', 'L’ospite appoggia la card al lettore del tavolo: Otto lo riconosce, somma i punti e propone il premio giusto. Il livello sale con le visite, i premi si pagano con i punti.', `<span class="live-pill"><span class="live-dot"></span>412 iscritti</span>`)}
 <div class="metrics-grid">${kpi('fm', 'Iscritti alla card', '412', '+18 questo mese · 71% con consenso WhatsApp', 'users', 'hero')}${kpi('fv', 'Coperti da iscritti', '38%', `${SV.of === 'del pranzo' ? 'oggi a pranzo' : 'stasera'} 11 ospiti riconosciuti`, 'card')}${kpi('fr', 'Premi riscattati', '27', 'in ottobre · valore € 412', 'star')}${kpi('fd', 'Ritorno medio', '24 giorni', 'tra una visita e l’altra · erano 39', 'calendar')}</div>
 <div data-anchor="fidelity"></div>
 <div class="fid-layout">${nfcReader()}
  <div class="module-side">
  <section class="workspace-panel"><div class="panel-title"><h2>Livelli</h2>${badge('Punti degli ultimi 12 mesi')}</div>${D.tiers.map(t => `<div class="mini-row"><span><b><span class="tier tier-${t.id}">${t.name}</span> da ${fmtPts(t.from)} punti</b><small>${t.perk}</small></span><span class="muted">${D.members.filter(m => D.tierOf(m).id === t.id).length} ospiti</span></div>`).join('')}</section>
  <section class="workspace-panel"><div class="panel-title"><h2>Premi</h2>${badge('1 punto = 1 euro speso')}</div>${D.rewards.map(r => `<div class="mini-row"><span><b>${r.name}</b><small>vale ${euro(r.value)} · riscattato ${{caffe:14, dessert:9, chianti:3, cena:1}[r.id]} volte a ottobre</small></span><b class="pts">${fmtPts(r.cost)} pt</b></div>`).join('')}</section>
  </div>
  <section class="workspace-panel fid-campaign"><div class="panel-title"><h2>${icon('message')} Campagna agli iscritti</h2></div>
   <div class="seg-chips">${D.segments.map(s => `<button data-fid-seg="${s.id}" class="${s.id === seg.id ? 'on' : ''}">${s.name}</button>`).join('')}</div>
   <p class="seg-count"><b>${reach.length}</b> di ${inSeg.length} ospiti con consenso WhatsApp${inSeg.length > reach.length ? ` · ${inSeg.length - reach.length} senza consenso restano fuori` : ''}</p>
   <div class="wa bot seg-msg">${esc({oro:'Ciao {nome}! Per i nostri ospiti Oro: giovedì 24 serata vini toscani in anteprima, con il tuo tavolo preferito già tenuto. Rispondi SÌ per prenotare.', lontani:'Ciao {nome}, è un po’ che non ci vediamo! Sono arrivati i porcini: alla prossima cena il caffè e l’amaro li offriamo noi.', compleanno:'Buon compleanno in anticipo, {nome}! 🎂 Il dessert del tuo compleanno è offerto: ti basta appoggiare la card al tavolo.', premio:'Ciao {nome}, hai un premio da usare sulla card: {premio}. Ti aspettiamo!'}[seg.id])}</div>
   <div class="detail-actions">${btn('Prepara la campagna', 'fid-campaign', 'btn-primary', 'send')}</div></section>
 </div>
  <section class="workspace-panel fid-members"><div class="panel-title"><h2>Ospiti riconosciuti</h2>${badge('Riconosciuti dalla card al tavolo')}</div><div class="table-scroll"><table class="data-table"><thead><tr><th>Ospite</th><th>Livello</th><th>Saldo</th><th>Visite</th><th>Preferenze</th><th>Premio pronto</th></tr></thead><tbody>${D.members.map(m => { const nt = D.nextTier(m), b = D.bestReward(m), prog = nt ? Math.min(100, m.year / nt.from * 100) : 100; return `<tr><td><b>${esc(m.name)}</b><small>card ${m.uid} · dal ${m.since}</small></td><td>${tierBadge(m)}<span class="tier-bar"><i style="width:${prog}%"></i></span><small>${nt ? `${fmtPts(nt.from - m.year)} punti a ${nt.name}` : 'Livello massimo'}</small></td><td><b>${fmtPts(m.points)}</b></td><td>${m.visits}<small>ultima ${m.last}</small></td><td>${esc(m.fav)}${m.allergy ? `<small class="allergy">${icon('alert')} ${esc(m.allergy)}</small>` : ''}</td><td>${b ? badge(b.name, 'badge-green') : `<small>${fmtPts(D.rewards[0].cost - m.points)} punti al primo premio</small>`}</td></tr>`; }).join('')}</tbody></table></div></section>
 ${ottoNote('**Luca Pieri** arriva alle 20:45 per l’anniversario: è livello **Oro** e ha 340 punti, abbastanza per il dessert offerto. L’ho segnalato al tavolo 10 e in cucina.')}`;
}

function fatture() {
 const pays = D.service.payments, stripePays = pays.filter(p => p.method.startsWith('Stripe')), sent = pays.filter(p => p.ade === 'Trasmesso').length;
 return `${heading('GESTIONE · 10', 'Cassa & Agenzia delle Entrate', 'Ogni incasso, dal POS o dal QR con Stripe, diventa un documento commerciale e finisce nei corrispettivi trasmessi all’Agenzia. Senza fare niente.', `<span class="live-pill"><span class="live-dot"></span>Corrispettivi collegati</span>`)}
 <div class="metrics-grid">${kpi('fz', `Incassato ${SV.today}`, euro(D.service.revenue), `${D.service.closed.length} conti chiusi`, 'coins', 'hero')}${kpi('st', 'Pagato dal QR con Stripe', euro(stripePays.reduce((n, p) => n + p.amount, 0)), `${stripePays.length} pagamenti anticipati`, 'card')}${kpi('dc', 'Documenti commerciali', pays.length, `Emessi ${SV.today}`, 'receipt')}${kpi('ade', 'Trasmessi all’Agenzia', sent, `${pays.length - sent} in invio`, 'check')}</div>
 <div data-anchor="fatture"></div>
 <div class="quote-layout"><section class="workspace-panel"><div class="panel-title"><h2>Incassi e documenti commerciali</h2>${badge('In tempo reale', 'badge-green')}</div><div class="table-scroll"><table class="data-table pay-table"><thead><tr><th>Documento</th><th>Ora</th><th>Cosa</th><th>Metodo</th><th>Importo</th><th>Agenzia Entrate</th></tr></thead><tbody>${pays.map(p => `<tr class="${Date.now() - p.at < 3000 ? 'row-in' : ''}"><td><b>${p.id}</b></td><td>${p.time}</td><td>${esc(p.what)}</td><td>${p.method.startsWith('Stripe') ? `<span class="stripe-tag">stripe</span> ${esc(p.method.slice(9))}` : esc(p.method)}</td><td><b>${euro(p.amount)}</b></td><td>${badge(p.ade, p.ade === 'Trasmesso' ? 'badge-green' : 'badge-amber')}</td></tr>`).join('') || '<tr><td colspan="6" class="muted">I primi incassi del servizio arrivano qui.</td></tr>'}</tbody></table></div></section>
 <aside class="module-side"><div class="workspace-panel ade-panel"><div class="panel-title"><h2>${icon('shield')} Collegamenti fiscali</h2></div>
  <div class="ade-row ok"><span>${icon('check')}</span><div><b>POS collegato al registratore telematico</b><small>Obbligo dal 1° gennaio 2026: le matricole sono associate nell’area Fatture e Corrispettivi. Ogni pagamento elettronico ha il suo scontrino.</small></div></div>
  <div class="ade-row ok"><span>${icon('check')}</span><div><b>Stripe riconciliato con i corrispettivi</b><small>Ogni pagamento dal QR emette il documento commerciale con lo stesso importo: l’incrocio dell’Agenzia con i dati dei pagamenti torna sempre.</small></div></div>
  <div class="ade-row next"><span>${icon('clock')}</span><div><b>Dal 2027 la cassa può diventare software</b><small>L’Agenzia sta introducendo soluzioni software certificate per memorizzare e trasmettere i corrispettivi da PC, tablet o SmartPOS. CS Restaurant OS è pensato per diventare la tua cassa.</small></div></div></div>
  ${ottoPanel('IL PUNTO DI OTTO', `${SV.name === 'pranzo' ? 'Oggi a pranzo' : 'Stasera'} **${pays.length} documenti commerciali**, ${sent} già trasmessi. La cena dello **Studio Marchetti** va fatturata: ho preparato la fattura elettronica con i dati dell’ultima volta.`)}
  ${cashClose(pays)}
  <div class="workspace-panel"><div class="panel-title"><h2>Fatture</h2></div>${D.invoices.map(f => `<div class="mini-row"><span><b>${f.n} · ${esc(f.to)}</b><small>${euro(f.amount)}</small></span>${badge(f.state, f.state.includes('SDI') ? 'badge-green' : 'badge-amber')}</div>`).join('')}</div></aside></div>
 <div class="notice">${icon('info')}<p>Anteprima dimostrativa: nessun collegamento reale con l’Agenzia delle Entrate o con Stripe. Date e regole fiscali vanno sempre verificate con il tuo commercialista.</p></div>`;
}

// La chiusura di cassa: ogni metodo di pagamento con il suo totale, e quanto deve esserci nel cassetto.
function cashClose(pays) {
 const by = k => pays.filter(p => k(p.method)).reduce((n, p) => n + p.amount, 0), fondo = 150, cash = by(m => m === 'Contanti');
 const rows = [['Contanti', cash], ['POS · carte', by(m => m.startsWith('POS'))], ['Stripe · QR e app', by(m => m.startsWith('Stripe'))], ['Piattaforme delivery', by(m => m.startsWith('Bonifico'))]];
 return `<div class="workspace-panel cash-close"><div class="panel-title"><h2>${icon('coins')} Chiusura di cassa</h2>${badge('Si chiude alle 00:30')}</div>${rows.map(([k, v]) => `<div class="mini-row"><span><b>${k}</b></span><b>${euro(v)}</b></div>`).join('')}<div class="mini-row cc-drawer"><span><b>Nel cassetto</b><small>fondo cassa ${euro(fondo)} + contanti incassati</small></span><b>${euro(fondo + cash)}</b></div><p class="cc-note">Le piattaforme delivery pagano con bonifico ogni 15 giorni, già al netto delle commissioni: Otto le riconcilia con i documenti commerciali emessi.</p></div>`;
}
function bandi() {
 const open = D.grants.filter(g => g.fit !== 'Bassa'), est = open.reduce((n, g) => n + Math.min(g.cap, g.our * g.pct / 100), 0);
 const fact = (k, v) => `<span><em>${k}</em><b>${v}</b></span>`;
 return `${heading('GESTIONE · 11', 'Bandi & opportunità', 'Otto legge ogni settimana i bandi di Regione, Camera di Commercio e Ministeri, li incrocia con il locale e con le spese che stai per fare, e prepara i documenti prima della scadenza.', `<span class="live-pill"><span class="live-dot"></span>${D.grants.length} bandi seguiti</span>`)}
 <div class="metrics-grid">${kpi('bc', 'Contributi possibili', euro(est), `su ${open.length} bandi compatibili`, 'coins', 'hero')}${kpi('bs', 'Prossima scadenza', D.grants[0].deadline, `tra ${D.grants[0].days} giorni · ${D.grants[0].who}`, 'calendar')}${kpi('bd', 'Documenti pronti', `${D.grants.flatMap(g => g.docs).filter(d => d[1]).length}/${D.grants.flatMap(g => g.docs).length}`, 'preparati da Otto', 'file')}${kpi('bh', 'Già ottenuti', euro(D.grantHistory.reduce((n, g) => n + g.amount, 0)), 'dal 2020', 'check')}</div>
 <div data-anchor="bandi"></div>
 <div class="quote-layout"><div class="grant-list">${D.grants.map(g => { const ready = g.docs.filter(d => d[1]).length; return `<article class="workspace-panel grant ${g.fit === 'Bassa' ? 'off' : ''}"><div class="grant-top">${badge('Compatibilità ' + g.fit.toLowerCase(), g.fit === 'Alta' ? 'badge-green' : g.fit === 'Media' ? 'badge-amber' : '')}<small>${esc(g.who)}</small>${badge(g.days ? `Scadenza ${g.deadline} · ${g.days} giorni` : 'A sportello', g.days && g.days < 45 ? 'badge-red' : '')}</div>
   <h3>${esc(g.title)}</h3>
   <div class="grant-facts">${fact('Contributo', g.pct ? `${g.pct}% a fondo perduto` : g.kind)}${fact('Massimale', g.cap ? euro(g.cap) : '—')}${fact('Spese ammesse', esc(g.spend))}${fact('Le tue spese', g.our ? `${euro(g.our)} → <i>${euro(Math.min(g.cap, g.our * g.pct / 100))}</i>` : '—')}</div>
   ${g.docs.length ? `<div class="grant-docs"><span class="eyebrow">DOCUMENTI · ${ready}/${g.docs.length}</span><span class="km-bar"><i style="width:${ready / g.docs.length * 100}%"></i></span><ul>${g.docs.map(([d, ok]) => `<li class="${ok ? 'ok' : ''}">${icon(ok ? 'check' : 'clock')}${esc(d)}</li>`).join('')}</ul></div>` : ''}
   ${ottoNote(g.note, g.fit === 'Bassa' ? 'info' : '')}</article>`; }).join('')}</div>
 <aside class="module-side"><div class="workspace-panel"><div class="panel-title"><h2>Come legge un bando</h2></div>${[['Chi può', 'forma della società, anni di attività, codice ATECO 56.10.11'], ['Cosa paga', 'solo spese nuove, dopo la domanda, con fattura e pagamento tracciato'], ['Quanto', 'percentuale sulle spese ammesse, fino al massimale'], ['Regola de minimis', 'massimo € 300.000 di aiuti in tre anni, da dichiarare']].map(([k, v]) => `<div class="mini-row"><span><b>${k}</b><small>${v}</small></span></div>`).join('')}</div>
  <div class="workspace-panel"><div class="panel-title"><h2>Già ottenuti</h2></div>${D.grantHistory.map(g => `<div class="mini-row"><span><b>${esc(g.title)}</b><small>${g.state}</small></span><b>${euro(g.amount)}</b></div>`).join('')}</div></aside></div>
 <div class="notice">${icon('info')}<p>Bandi di esempio, non reali: importi, scadenze e regole vanno sempre verificati sul testo ufficiale e con il tuo commercialista.</p></div>`;
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
 return `${heading('GESTIONE · 12', 'Staff & HACCP', `Chi è in turno ${SV.today}, le celle frigorifere e le checklist della cucina.`)}
 ${fridgePanel()}
 <div class="quote-layout"><section class="workspace-panel"><div class="panel-title"><h2>Checklist HACCP di oggi</h2>${badge(`${D.haccp.filter((h, i) => h.done || ui.done.haccp.includes(i)).length}/${D.haccp.length}`)}</div><div data-anchor="staff" class="anchor-pad"></div><div class="haccp">${D.haccp.map((h, i) => { const done = h.done || ui.done.haccp.includes(i); return `<label class="task ${done ? 'done' : ''}"><input type="checkbox" data-haccp="${i}" ${done ? 'checked' : ''} ${h.done ? 'disabled' : ''}><span><b>${esc(h.task)}</b><small>${esc(h.by)}</small></span></label>`; }).join('')}</div></section>
 <aside class="module-side"><div class="workspace-panel"><div class="panel-title"><h2>In turno ${SV.today}</h2></div>${D.staff.map(s => `<div class="mini-row"><span><b>${esc(s.name)}</b><small>${s.role}</small></span><span class="muted">${s.shift}</span></div>`).join('')}</div>
 ${ottoPanel('TURNI', 'Sabato prossimo hai **38 coperti** già prenotati: ti suggerisco una persona in più in sala dalle 20.')}</aside></div>`;
}
// ————— BRAND & APP —————
// Il costruttore dell'app del locale: nome, colori e sezioni a sinistra, l'app vera sul telefono al centro, notifiche e store a destra.
function appPhone() {
 const a = D.appCfg, th = a.themes[a.theme], on = id => a.blocks.find(b => b.id === id)?.on;
 const tabs = [['home', 'Home', 'home'], ...(on('prenota') ? [['prenota', 'Prenota', 'calendar']] : []), ...(on('card') ? [['card', 'Card', 'card']] : []), ['notifiche', 'Avvisi', 'bell']];
 if (!tabs.some(t => t[0] === a.tab)) a.tab = 'home';
 const luca = D.member('M1'), tier = D.tierOf(luca), nt = D.nextTier(luca);
 const tile = (id, ic, t, s) => on(id) ? `<button class="ap-tile" data-app-tab="${id === 'menu' || id === 'delivery' || id === 'eventi' ? 'home' : id}">${icon(ic)}<b>${t}</b><small>${s}</small></button>` : '';
 const body = {
  home:`<div class="ap-hero"><small>${SV.name === 'pranzo' ? 'OGGI A PRANZO' : 'STASERA'}</small><b>Porcini del Mugello e tartufo di San Miniato</b><span>Tavoli liberi dalle 21:30</span></div>
   <div class="ap-tiles">${tile('prenota', 'calendar', 'Prenota', 'Un tavolo in 3 tocchi')}${tile('menu', 'menu', 'Menu', 'Con gli allergeni')}${tile('card', 'card', 'La tua card', `${fmtPts(luca.points)} punti`)}${tile('delivery', 'bike', 'A domicilio', 'Senza commissioni')}${tile('eventi', 'star', 'Serate', 'Giovedì vini toscani')}</div>
   <div class="ap-hours"><b>Orari</b>${a.hours.map(([d, h]) => `<span><em>${d}</em>${h}</span>`).join('')}</div>`,
  prenota:`<div class="ap-form"><b class="ap-h">Prenota un tavolo</b><span class="ap-lbl">Quando</span><div class="ap-chips">${['Oggi', 'Domani', 'Ven 24', 'Sab 25'].map((d, i) => `<i class="${i === 0 ? 'on' : ''}">${d}</i>`).join('')}</div><span class="ap-lbl">Persone</span><div class="ap-step"><i>−</i><b>2</b><i>+</i></div><span class="ap-lbl">Orari liberi</span><div class="ap-chips">${['19:30', '21:30', '21:45', a.booking.last].map((h, i) => `<i class="${i === 1 ? 'on' : ''}">${h}</i>`).join('')}</div><small class="ap-note">Online fino a ${a.booking.maxOnline} persone. Da ${a.booking.deposit} persone caparra di ${euro(a.booking.depositAmount)} a testa, rimborsata fino a ${a.booking.advance} prima.</small><span class="ap-cta">Conferma la prenotazione</span></div>`,
  card:`<div class="ap-card"><span class="ap-cardtop"><b>${esc(a.short)}</b><span class="tier tier-${tier.id}">${tier.name}</span></span><strong>${fmtPts(luca.points)}<small> punti</small></strong><span class="ap-cardname">${esc(luca.name)}</span><span class="tier-bar"><i style="width:${nt ? luca.year / nt.from * 100 : 100}%"></i></span><small>${nt ? `${fmtPts(nt.from - luca.year)} punti al livello ${nt.name}` : 'Livello Oro · sconto 10% sul conto'}</small></div>
   <b class="ap-h">I tuoi premi</b>${D.rewards.map(r => `<div class="ap-rw ${luca.points >= r.cost ? 'ok' : ''}"><span>${r.name}</span><b>${luca.points >= r.cost ? 'Pronto' : `${fmtPts(r.cost - luca.points)} pt`}</b></div>`).join('')}<small class="ap-note">Appoggia il telefono al lettore del tavolo come una card NFC.</small>`,
  notifiche:`<b class="ap-h">Avvisi</b>${[...a.pushes].map(p => `<div class="ap-push"><span class="ap-pi">${esc(a.short)}</span><span><b>${esc(p.title)}</b><small>${esc(p.text)}</small></span><em>${p.when}</em></div>`).join('')}`
 }[a.tab];
 return `<div class="guest-phone app-phone" style="--abg:${th.bg};--aink:${th.ink}"><div class="ap-top"><span class="gp-logo">${esc(a.short)}</span><span><b>${esc(a.name)}</b><small>Firenze · ${SV.name === 'pranzo' ? 'aperto ora' : 'aperto fino alle 23'}</small></span>${icon('bell')}</div><div class="ap-body">${body}</div>
  <nav class="ap-nav">${tabs.map(([id, l, ic]) => `<button data-app-tab="${id}" class="${a.tab === id ? 'on' : ''}">${icon(ic)}<span>${l}</span></button>`).join('')}</nav></div>`;
}
function brandPage() {
 const a = D.appCfg, s = a.stats;
 return `${heading('CLIENTI & MARKETING · 13', 'Brand & app', 'L’app del tuo locale, con il tuo nome e i tuoi colori, su App Store e Google Play. Non è il menu QR del tavolo: è quella che l’ospite tiene sul telefono, per prenotare, ordinare a casa e usare la card.', `<span class="live-pill"><span class="live-dot"></span>v2.4 sugli store</span>`)}
 <div class="metrics-grid">${kpi('ad', 'Download', fmtPts(s.downloads), '+64 questo mese', 'download', 'hero')}${kpi('aa', 'Utenti attivi', fmtPts(s.active), 'negli ultimi 30 giorni', 'users')}${kpi('ab', 'Prenotazioni dall’app', s.bookings, 'a ottobre · 22% del totale', 'calendar')}${kpi('ao', 'Ordini a domicilio', s.orders, 'dall’app · nessuna commissione', 'bike')}</div>
 <div data-anchor="brand" class="anchor-pad"></div>
 <div class="app-layout">
  <section class="workspace-panel app-builder"><div class="panel-title"><h2>${icon('palette')} Costruisci l’app</h2>${badge('Modifiche in anteprima subito', 'badge-green')}</div>
   <div class="ab-group"><span class="eyebrow">IDENTITÀ</span><div class="ab-id"><span class="gp-logo" style="background:${a.themes[a.theme].ink};color:${a.themes[a.theme].bg}">${esc(a.short)}</span><span><b>${esc(a.name)}</b><small>Icona, nome e descrizione sugli store</small></span></div>
    <div class="ab-themes">${Object.entries(a.themes).map(([k, t]) => `<button data-app-theme="${k}" class="${a.theme === k ? 'on' : ''}" aria-pressed="${a.theme === k}"><i style="background:${t.bg}"><em style="background:${t.ink}"></em></i>${t.name}</button>`).join('')}</div></div>
   <div class="ab-group"><span class="eyebrow">SEZIONI DELL’APP</span>${a.blocks.map(b => `<label class="ab-block"><span><b>${b.name}</b><small>${b.note}</small></span><span class="editor-toggle"><input type="checkbox" data-app-block="${b.id}" ${b.on ? 'checked' : ''} aria-label="${esc(b.name)}"><i></i></span></label>`).join('')}</div>
   <div class="ab-group"><span class="eyebrow">REGOLE DELLE PRENOTAZIONI</span><div class="ab-rules"><span><em>Online fino a</em><b>${a.booking.maxOnline} persone</b></span><span><em>Ultimo orario</em><b>${a.booking.last}</b></span><span><em>Caparra da</em><b>${a.booking.deposit} persone · ${euro(a.booking.depositAmount)} a testa</b></span><span><em>Rimborso</em><b>fino a ${a.booking.advance} prima</b></span></div></div>
  </section>
  <section class="guest-wrap"><span class="eyebrow">L’APP SUL TELEFONO DELL’OSPITE</span>${appPhone()}</section>
  <aside class="module-side">
   <div class="workspace-panel app-push"><div class="panel-title"><h2>${icon('bell')} Notifiche push</h2></div>
    <div class="push-draft"><span class="eyebrow">BOZZA DI OTTO · ${esc(a.draft.seg.toUpperCase())}</span><b>${esc(a.draft.title)}</b><p>${esc(a.draft.text)}</p>${btn('Programma per venerdì alle 11', 'push-send', 'btn-primary', 'send')}</div>
    ${a.pushes.map(p => `<div class="mini-row"><span><b>${esc(p.title)}</b><small>${esc(p.seg)} · ${fmtPts(p.sent)} inviate · ${p.when}</small></span>${badge(`${p.open}% aperte`, p.open >= 50 ? 'badge-green' : '')}</div>`).join('')}</div>
   <div class="workspace-panel"><div class="panel-title"><h2>Sugli store</h2></div>${a.store.map(([k, v, st]) => `<div class="ade-row ${st === 'ok' ? 'ok' : 'next'}"><span>${icon(st === 'ok' ? 'check' : 'clock')}</span><div><b>${k}</b><small>${v}</small></div></div>`).join('')}</div>
   ${ottoPanel('COLLEGATA A TUTTO', 'Prenotazioni, card e ordini dell’app arrivano negli stessi posti di sala, fidelity e delivery. **Un ordine dall’app non paga commissioni**: su 41 ordini di ottobre sono circa **€ 420** risparmiati.')}
  </aside>
 </div>`;
}

// ————— DELIVERY —————
const chChip = c => `<span class="ch-chip" style="background:${c.bg};color:${c.ink}">${c.short}</span>`;
const mmss = s => `${Math.floor(Math.max(0, s) / 60)}:${String(Math.floor(Math.max(0, s) % 60)).padStart(2, '0')}`;
function dlvTimer(o) {
 const now = Date.now();
 if (o.state === 'new') return `<span class="dlv-t ${D.dRed(o) ? 'red' : ''}" data-dlv-t="${o.id}">${icon('clock')} Da accettare · <b>${Math.floor(D.dWait(o))} s</b></span>`;
 if (o.state === 'prep') return `<span class="dlv-t" data-dlv-t="${o.id}">${icon('chef')} In cucina · pronto tra <b>${Math.max(0, Math.ceil(o.prep - (now - o.prepAt) / 1000))} s</b></span>`;
 if (o.state === 'ready') return now < o.riderAt ? `<span class="dlv-t" data-dlv-t="${o.id}">${icon('bike')} ${esc(o.rider)} arriva tra <b>${mmss((o.riderAt - now) / 1000)}</b></span>` : `<span class="dlv-t ${D.dRed(o) ? 'red' : ''}" data-dlv-t="${o.id}">${icon('bike')} ${esc(o.rider)} è al banco da <b>${Math.floor(D.riderWait(o))} s</b></span>`;
 return o.state === 'lost' ? `<span class="dlv-t red">${icon('alert')} Annullato dalla piattaforma</span>` : `<span class="dlv-t done">${icon('check')} Ritirato da ${esc(o.rider)}</span>`;
}
function dlvOrder(o) {
 const c = D.channel(o.ch), here = Date.now() >= o.riderAt;
 const act = o.state === 'new' ? `<button class="tk-go" data-dlv-accept="${o.id}">Accetta e manda in cucina ${icon('arrow')}</button>`
  : o.state === 'ready' ? (here ? `<button class="tk-go" data-dlv-hand="${o.id}">Consegna a ${esc(o.rider.split(' ')[0])} ${icon('arrow')}</button>` : `<span class="tk-next">${icon('check')} Imbustato · aspetta il rider</span>`) : '';
 return `<article class="dlv-order ${Date.now() - o.at < 2500 ? 'row-in' : ''} ${['new', 'prep', 'ready'].includes(o.state) && D.dRed(o) ? 'red' : ''} st-${o.state}" data-dlv="${o.id}"><span class="dlv-top">${chChip(c)}<b>${o.code}</b><em>${euro(D.dTotal(o))}</em></span><span class="dlv-who">${esc(o.who)} · ${esc(o.zone)}, ${String(o.km).replace('.', ',')} km</span><ul>${o.items.map(([id, q]) => `<li>${q}× ${esc(D.dish(id).name)}</li>`).join('')}</ul>${dlvTimer(o)}${act}</article>`;
}
function deliveryPage() {
 const ch = D.channels, gross = ch.reduce((n, c) => n + c.gross, 0), fees = ch.reduce((n, c) => n + c.gross * c.fee / 100 + (c.rider ? c.orders * c.rider : 0), 0), orders = ch.reduce((n, c) => n + c.orders, 0);
 const idle = gameOn() && D.service.game && !D.delivery.on, live = !idle;
 const col = (st, title) => { const os = D.delivery.orders.filter(o => st === 'done' ? ['picked', 'lost'].includes(o.state) : o.state === st); return `<section class="dlv-col c-${st} ${os.some(o => o.state !== 'picked' && o.state !== 'lost' && D.dRed(o)) ? 'hot' : ''}"><header><b>${title}</b><span>${os.length}</span></header>${os.map(dlvOrder).join('') || '<p class="muted pad-s">Niente qui.</p>'}</section>`; };
 const chCard = c => { const paused = D.chPaused(c), left = c.until ? Math.ceil((c.until - Date.now()) / 1000) : 0; return `<article class="dlv-ch ${paused ? 'paused' : ''}">${chChip(c)}<span><b>${esc(c.name)}</b><small>${c.fee ? `commissione ${c.fee}%` : `nessuna commissione · rider ${euro(c.rider)}`} · prep. ${c.prep}′</small></span><span class="dlv-ch-n"><b>${c.orders}</b><small>${euro(c.gross)}</small></span><button class="btn ${paused ? 'btn-dark' : 'btn-secondary'} dlv-pause" data-dlv-pause="${c.id}" ${idle ? 'disabled' : ''}>${paused ? (left > 0 ? `Riapre tra <span data-dlv-until="${c.id}">${mmss(left)}</span>` : 'In pausa · riattiva') : 'Metti in pausa'}</button></article>`; };
 return `${heading('SALA & CUCINA · 04', 'Delivery', 'Glovo, Deliveroo, Just Eat e il sito del locale su un solo schermo: ogni ordine arriva come comanda in cucina e come documento in cassa. Se la cucina è piena, un tocco mette in pausa un canale.', `<span class="live-pill"><span class="live-dot"></span>${D.dActive().length} ordini in corso</span>`)}
 <div class="metrics-grid">${kpi('do', `Ordini delivery ${SV.today}`, orders, `${ch.filter(c => !D.chPaused(c)).length} canali su 4 attivi`, 'bike', 'hero')}${kpi('dg', 'Incasso lordo', euro(gross), 'prezzi del menu delivery', 'coins')}${kpi('df', 'Commissioni e rider', euro(Math.round(fees)), `${Math.round(fees / gross * 100)}% del lordo`, 'receipt')}${kpi('dn', 'Netto al locale', euro(Math.round(gross - fees)), `${euro(+((gross - fees) / orders).toFixed(2))} a ordine`, 'check')}</div>
 <div class="dlv-channels">${ch.map(chCard).join('')}</div>
 <div data-anchor="delivery"></div>
 ${idle ? `<div class="workspace-panel dlv-idle">${ottoNote(`I canali delivery aprono più tardi ${SV.name === 'pranzo' ? 'oggi' : 'stasera'}: quando si accendono ti avviso io. Da quel momento ogni ordine va **accettato entro ${D.delivery.cfg.accept} secondi** e consegnato al rider quando arriva al banco.`)}</div>`
  : `<div class="dlv-board">${col('new', 'Nuovi')}${col('prep', 'In preparazione')}${col('ready', 'Pronti · rider')}${col('done', 'Ritirati')}</div>`}
 <div class="quote-layout"><section class="workspace-panel"><div class="panel-title"><h2>Menu del delivery</h2>${badge('Solo i piatti che viaggiano bene')}</div><div class="table-scroll"><table class="data-table"><thead><tr><th>Piatto</th><th>In sala</th><th>Delivery</th><th>Nel box</th><th>Stato</th></tr></thead><tbody>${D.deliveryMenu.map(x => { const d = D.dish(x.id); return `<tr><td><b>${esc(d.name)}</b></td><td>${euro(d.price)}</td><td><b>${euro(x.price)}</b></td><td><small>${esc(x.note)}</small></td><td>${x.on ? (D.available(d) ? badge('Sulle piattaforme', 'badge-green') : badge('Esaurito', 'badge-red')) : badge('Solo in sala')}</td></tr>`; }).join('')}</tbody></table></div></section>
 <aside class="module-side"><div class="workspace-panel"><div class="panel-title"><h2>Su 100 € di ordini</h2>${badge('Commissioni di esempio')}</div>${ch.map(c => { const net = c.fee ? 100 - c.fee : 100 - c.rider * 100 / (c.gross / c.orders); return `<div class="mini-row dlv-net">${chChip(c)}<span><b>${esc(c.name)}</b><span class="km-bar"><i style="width:${net}%"></i></span></span><b>${euro(Math.round(net))}</b></div>`; }).join('')}</div>
  ${ottoPanel('CUCINA PIENA?', `Quando le comande in attesa superano i fornelli, ${live ? 'metti in pausa' : 'Otto mette in pausa'} prima **il canale con la commissione più alta**: gli ospiti vedono “non disponibile ora” invece di aspettare un’ora. Il sito del locale resta aperto.`)}</aside></div>`;
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
 if (a === 'fid-campaign') { const sg = D.segments.find(x => x.id === (ui.fidSeg || 'oro')), n = D.members.filter(sg.test).filter(m => m.wa).length; ecoPoints('fid-campaign', 3, 'Campagna pronta', sg.id); return toast(`Campagna “${sg.name}” pronta per ${n} ospiti con consenso: parte dopo la tua approvazione (demo).`); }
 if (a === 'push-send') { const dr = D.appCfg.draft; if (dr.sent) return toast('Notifica già programmata.'); dr.sent = true; D.appCfg.pushes.unshift({title:dr.title, text:dr.text, seg:dr.seg, sent:0, open:0, when:'ven 11:00'}); ecoPoints('push', 3, 'Notifica programmata'); toast('Notifica programmata per venerdì alle 11 (demo).'); return render(); }
 if (a === 'account') return show(`<span class="dialog-kicker">IL TUO LOCALE</span><h2 id="dialog-title">${persona.name}</h2><p class="dialog-description">Titolare · ${esc(D.restaurant.name)}. L’accesso CSD Station sarà collegato al servizio.</p>`);
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
 if ((x = el('[data-qr-page]'))) { ui.qrPage = +x.dataset.qrPage; return render(); }
 if ((x = el('[data-qr-table]'))) { ui.qr = {table:x.dataset.qrTable, cart:{}, step:'menu', cat:ui.qr.cat, receipt:null}; return render(); }
 if ((x = el('[data-qr]'))) return qrAction(x.dataset.qr);
 if ((x = el('[data-dlv-accept]'))) { const id = x.dataset.dlvAccept, o = D.delivery.orders.find(y => y.id === id); if (D.acceptOrder(id)) { ecoPoints('dlv-accept', 3, 'Ordine accettato', id, {born:o?.at}); toast(`${o.code} accettato: la comanda è in cucina.`); } return; }
 if ((x = el('[data-dlv-hand]'))) { const id = x.dataset.dlvHand, o = D.delivery.orders.find(y => y.id === id); if (D.handOrder(id)) { ecoPoints('dlv-hand', 4, 'Consegnato al rider', id, {born:o?.riderAt}); toast(`${o.code} consegnato a ${o.rider}: documento commerciale emesso.`); } return; }
 if ((x = el('[data-dlv-pause]'))) { const c = D.channel(x.dataset.dlvPause), was = D.chPaused(c); D.pauseChannel(c.id, gameOn() && D.service.game ? 90 : 0); if (!was) ecoPoints('dlv-pause', 3, 'Canale in pausa', c.id); toast(was ? `${c.name} di nuovo attivo.` : `${c.name} in pausa: gli ospiti vedono “non disponibile ora”.`); return render(); }
 if ((x = el('[data-nfc-choice]'))) { const [id, choice] = x.dataset.nfcChoice.split('|'), tap = D.nfc.taps.find(y => y.id === id); if (!tap) return; const right = D.nfcAnswer(tap); if (choice !== right) { penalty(5, 'Fidelity sbagliata'); toast(`Scelta sbagliata. ${D.nfcWhy(tap, choice)}`); x.classList.add('wrong'); return; } D.nfcResolve(id, choice); ecoPoints('nfc', 6, 'Fidelity giusta', id, {born:tap.at}); toast(D.nfcWhy(tap, choice)); return render(); }
 if ((x = el('[data-fid-seg]'))) { ui.fidSeg = x.dataset.fidSeg; return render(); }
 if ((x = el('[data-app-theme]'))) { D.appCfg.theme = x.dataset.appTheme; return render(); }
 if ((x = el('[data-app-tab]'))) { D.appCfg.tab = x.dataset.appTab; return render(); }
 if ((x = el('[data-menu-otto]'))) { ui.menuReply = D.menuCommand(x.dataset.menuOtto); ecoPoints('menu', 2, 'Menu aggiornato'); checkChef(); return render(); }
});
document.addEventListener('change', e => {
 const d = e.target.dataset;
 if (d.haccp) { ui.done.haccp.push(+d.haccp); ecoPoints('haccp', 3, 'Controllo HACCP', +d.haccp); render(); }
 if (d.editPrice && +e.target.value > 0) { D.editDish(d.editPrice, {price:+e.target.value}); toast('Prezzo aggiornato su tutti i QR.'); checkChef(); }
 if (d.appBlock) { const b = D.appCfg.blocks.find(x => x.id === d.appBlock); if (b) { b.on = e.target.checked; ecoPoints('app-block', 2, 'App aggiornata', `${b.id}-${b.on}`); toast(b.on ? `“${b.name}” è nell’app: arriva agli ospiti con il prossimo aggiornamento.` : `“${b.name}” tolta dall’app.`); render(); } }
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
// Le sezioni nuove della sfida non arrivano sempre: a ogni partita si estrae da quando aprono
// (dal capitolo 2 o 3, oppure dal livello 2 o 3) o se per questa volta restano chiuse.
const unlockAt = {};
function drawUnlocks() {
 unlockAt.delivery = pickOne([{ch:1}, {ch:1}, {ch:2}, {lvl:3}, null]);
 unlockAt.nfc = pickOne([{ch:1}, {ch:2}, {ch:2}, {lvl:2}, null]);
}
const due = u => !!u && (u.ch != null ? gameState().chapter >= u.ch : gameLevel() >= u.lvl);
function unlockTick() {
 if (!D.delivery.on && (D.delivery.forced || due(unlockAt.delivery))) {
  D.deliveryGameStart(); if (route() === 'delivery') render();
  ottoMessage({name:'Otto rider', role:'otto-phone', title:'Si apre il delivery', button:'Ho capito', lines:['Si sono accesi i canali delivery: **Glovo, Deliveroo, Just Eat** e il sito del locale arrivano tutti nello stesso tablet.', 'Ogni ordine nuovo va **accettato entro ' + D.delivery.cfg.accept + ' secondi**: poi va in cucina e, quando è pronto, lo consegni al rider appena arriva al banco. Se il rider aspetta troppo, riparte e la piattaforma annulla l’ordine.', 'Se la cucina è piena, **metti in pausa un canale**: meglio “non disponibile ora” che un’ora di attesa.']});
 }
 if (!D.nfc.on && due(unlockAt.nfc)) {
  D.nfcGameStart();
  ottoMessage({name:'Otto fidelity', role:'otto-star', title:'Le card al tavolo', button:'Ho capito', lines:['Da adesso gli ospiti iscritti **appoggiano la card NFC** al lettore del tavolo, e il cameriere sei tu.', 'In **Fidelity & NFC** decidi cosa spetta: il **premio** se il saldo basta, lo **sconto del livello** (Argento 5%, Oro 10%) quando pagano, oppure **solo punti**.', 'Una scelta sbagliata costa punti, e un ospite che aspetta troppo rinuncia.']});
 }
}
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
  unlockTick();
  const dl = D.deliveryTick(gameLevel());
  dl.lost.forEach(o => { penalty(10, 'Ordine delivery annullato'); toast(`${o.code} annullato: il rider di ${D.channel(o.ch).name} è ripartito senza l’ordine.`); });
  const nf = D.nfcTick(gameLevel());
  nf.left.forEach(x => { penalty(5, 'Ospite senza premio'); toast(`${x.m.name} al tavolo ${x.table.slice(1)} ha rinunciato: nessuno ha letto la card.`); });
  const dsig2 = D.delivery.orders.map(o => o.id + o.state + (Date.now() >= o.riderAt ? 1 : 0) + (D.dRed(o) ? 1 : 0)).join(',') + D.channels.map(c => D.chPaused(c) ? 1 : 0).join('') + D.delivery.on;
  if (dsig2 !== ui.dlvSig) { ui.dlvSig = dsig2; if (route() === 'delivery') { const y = scrollY; render(); scrollTo(0, y); } }
  else if (route() === 'delivery') {
   D.delivery.orders.forEach(o => { const e = document.querySelector(`[data-dlv-t="${o.id}"] b`); if (!e) return; const now = Date.now(); e.textContent = o.state === 'new' ? `${Math.floor(D.dWait(o))} s` : o.state === 'prep' ? `${Math.max(0, Math.ceil(o.prep - (now - o.prepAt) / 1000))} s` : now < o.riderAt ? `${Math.floor((o.riderAt - now) / 60000)}:${String(Math.floor((o.riderAt - now) / 1000) % 60).padStart(2, '0')}` : `${Math.floor(D.riderWait(o))} s`; });
   D.channels.forEach(c => { const e = document.querySelector(`[data-dlv-until="${c.id}"]`); if (e && c.until) { const l = Math.max(0, Math.ceil((c.until - Date.now()) / 1000)); e.textContent = `${Math.floor(l / 60)}:${String(l % 60).padStart(2, '0')}`; } });
  }
  const nsig = D.nfc.taps.map(x => x.id + (D.nfcRed(x) ? 1 : 0)).join(',') + D.nfc.on;
  if (nsig !== ui.nfcSig) { ui.nfcSig = nsig; if (route() === 'fidelity_nfc') { const y = scrollY; render(); scrollTo(0, y); } }
  else if (route() === 'fidelity_nfc') D.nfc.taps.forEach(x => { const e = document.querySelector(`[data-nfc-wait="${x.id}"]`); if (e) e.textContent = Math.floor(D.nfcWait(x)); const b = document.querySelector(`[data-nfc-bar="${x.id}"]`); if (b) b.style.width = `${Math.min(100, D.nfcWait(x) / (D.nfc.cfg.leave + D.nfc.cfg.bonus * 1.5) * 100)}%`; });
  const h = D.kitchenGameTick(gameLevel());
 if (h.handover) ottoMessage({name:'Otto cuoco', role:'otto-chef', title:'La cucina passa a te', button:'Ho capito', lines:['Per i primi minuti ho mandato avanti io la cucina, così hai potuto guardarti intorno.', '**Da adesso la cucina è manuale**: metti i piatti sui fornelli, manda al pass quelli cotti e servili al tavolo. Se una colonna diventa rossa, perdi punti.', 'Niente paura: con i punti, nella **Bottega di Otto**, puoi comprare tre automatismi — **in cucina**, **al pass** e **al tavolo** — e non pensarci più.']});
  // ogni cosa in rosso costa 1 punto al secondo, ma al massimo 2 in tutto: si perde, senza crollare
  const reds = fr.red.length + (h.waiting ? 1 : 0) + (h.pass ? 1 : 0) + (dr.red.length ? 1 : 0) + (dl.red.length ? 1 : 0) + (nf.red.length ? 1 : 0);
  if (reds) penalty(Math.min(2, reds), fr.red.length ? 'Cella fuori norma' : h.waiting ? 'Comande ferme' : h.pass ? 'Piatti fermi al pass' : dl.red.length ? 'Delivery in ritardo' : nf.red.length ? 'Card in attesa' : 'Ospiti in attesa');
  const was = ui.kitchenHot || {}; ui.kitchenHot = h;
  // la cucina si ridisegna appena un piatto cambia stato (cotto, al pass, servito, nuova comanda), non solo uscendo e rientrando
  const ksig = D.kitchenLines().map(l => `${l.id}${l.state}${l.cooked ? 1 : 0}`).join(',') + D.autoOn('cook') + D.autoOn('pass') + D.autoOn('serve');
  const kchanged = ksig !== ui.kitchenSig; ui.kitchenSig = ksig;
  if ((kchanged || was.waiting !== h.waiting || was.pass !== h.pass || h.handover) && route() === 'kds') { const y = scrollY; render(); scrollTo(0, y); }
  else if (route() === 'kds' && D.kitchen.autoUntil > Date.now() && Date.now() % 5000 < 1000) liveRefresh(); // il conto alla rovescia della cucina automatica
  if (route() === 'kds') document.querySelectorAll('[data-cook-left]').forEach(e => { const l = D.kitchenLines().find(x => x.id === e.dataset.cookLeft); if (l) e.textContent = Math.max(0, Math.ceil(D.cookTime(D.dish(l.dish)) - (Date.now() - (l.cookAt || Date.now())) / 1000)); });
  // cosa sta facendo perdere punti, e dove andare a sistemarlo
  const pr = [];
  if (h.waiting) pr.push({page:'kds', label:'Comande ferme in cucina'});
  if (h.pass) pr.push({page:'kds', label:'Piatti fermi al pass'});
  fr.red.forEach(f => pr.push({page:'staff', label:`${f.name} fuori temperatura`}));
  if (dr.red.length) pr.push({page:'sala', label:dr.red.length === 1 ? `All’ingresso aspetta: ${dr.red[0].name}` : `${dr.red.length} gruppi aspettano all’ingresso`});
  if (dl.red.length) { const o = dl.red[0]; pr.push({page:'delivery', label:dl.red.length > 1 ? `${dl.red.length} ordini delivery in ritardo` : o.state === 'new' ? `Ordine ${o.code} da accettare` : `Il rider di ${o.code} aspetta al banco`}); }
  if (nf.red.length) pr.push({page:'fidelity_nfc', label:nf.red.length > 1 ? `${nf.red.length} card in attesa ai tavoli` : `Card in attesa al tavolo ${nf.red[0].table.slice(1)}`});
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
  // delivery: l'ordine più vecchio da accettare, il rider al banco, la cucina piena che chiede una pausa
  if (D.delivery.on) {
   const nw = D.delivery.orders.filter(o => o.state === 'new').sort((a, b) => a.at - b.at)[0];
   if (nw) { const ch = D.channel(nw.ch); c.push({key:'dlv-accept', ref:nw.id, page:'delivery', urgent:D.dWait(nw) > D.delivery.cfg.accept * .5, title:`Nuovo ordine ${ch.name} · ${nw.code}`, text:`In Delivery **accetta l’ordine ${nw.code}** e mandalo in cucina: la piattaforma lo vuole confermato entro ${D.delivery.cfg.accept} secondi.`, target:`[data-dlv-accept="${nw.id}"]`, valid:() => D.delivery.orders.some(o => o.id === nw.id && o.state === 'new'), auto:() => D.acceptOrder(nw.id)}); }
   D.delivery.orders.filter(o => o.state === 'ready' && Date.now() >= o.riderAt).forEach(o => c.push({key:'dlv-hand', ref:o.id, page:'delivery', urgent:true, title:`Il rider di ${o.code} è al banco`, text:`In Delivery premi **Consegna a ${o.rider.split(' ')[0]}**: se aspetta troppo riparte e l’ordine viene annullato.`, target:`[data-dlv-hand="${o.id}"]`, valid:() => D.delivery.orders.some(x => x.id === o.id && x.state === 'ready'), auto:() => D.handOrder(o.id)}));
   const waitingK = D.kitchenLines().filter(l => l.state === 'waiting').length, ch = D.channels.filter(x => x.fee && !D.chPaused(x)).sort((a, b) => b.fee - a.fee)[0];
   if (ch && waitingK >= D.kitchen.cap + 1 && D.dActive().length >= 2) c.push({key:'dlv-pause', ref:ch.id, page:'delivery', title:`Cucina piena: pausa a ${ch.name}`, text:`${waitingK} comande aspettano i fornelli. In Delivery **metti in pausa ${ch.name}** (la commissione più alta, ${ch.fee}%) per un minuto e mezzo.`, target:`[data-dlv-pause="${ch.id}"]`, valid:() => !D.chPaused(ch), auto:() => D.pauseChannel(ch.id, 90)});
  }
  D.nfc.taps.forEach(x => c.push({key:'nfc', ref:x.id, page:'fidelity_nfc', urgent:D.nfcWait(x) > D.nfc.cfg.wait * .5, title:`Card al tavolo ${x.table.slice(1)}: ${x.m.name}`, text:`In Fidelity & NFC **scegli cosa spetta** a ${x.m.name}: ${x.ask === 'premio' ? 'chiede un premio, guarda se il saldo basta' : 'paga il conto, guarda il livello'}.`, target:`[data-nfc-tap="${x.id}"]`, valid:() => D.nfc.taps.some(y => y.id === x.id), auto:() => D.nfcResolve(x.id, D.nfcAnswer(x))}));
  const h = D.haccp.findIndex((x, i) => !x.done && !ui.done.haccp.includes(i));
  if (h >= 0) c.push({key:'haccp', ref:h, page:'staff', title:`HACCP · ${D.haccp[h].task}`, text:'In Staff & HACCP **spunta il controllo** nella checklist di oggi.', target:`input[data-haccp="${h}"]`, valid:() => !ui.done.haccp.includes(h), auto:() => ui.done.haccp.push(h)});
  // come un cameriere: un ordine da fare dal menu QR, con il pagamento giusto
  const seated = D.tables.filter(t => (t.status === 'seated' || t.status === 'ordered') && !['T3', 'T7', 'T8'].includes(t.id));
  if (seated.length && Math.random() < .5) {
   const t = seated[Math.floor(Math.random() * seated.length)], dishes = D.menu.filter(D.available).sort(() => Math.random() - .5).slice(0, 1 + Math.floor(Math.random() * 2));
   const want = dishes.map(d => [d.id, 1 + Math.floor(Math.random() * 2)]), prepaid = Math.random() < .5;
   const list = want.map(([id, n]) => `${n}× ${D.dish(id).name}`).join(', ');
   c.push({key:'qr', ref:t.id, page:'menu_pos', title:`Ordine al tavolo ${t.id.slice(1)}`, text:`Il tavolo ${t.id.slice(1)} ordina **${list}**. ${prepaid ? 'Il cliente **paga subito con Stripe**: premi Paga ora.' : 'Il cliente **paga dopo, in cassa**: premi Ordina e paga a fine cena.'} Scegli il tavolo sotto il QR e componi l’ordine sul telefono.`, target:`[data-qr-table="${t.id}"], .qr-arrow.hot`,
    check:p => { const got = Object.fromEntries((p.items || []).map(([id, n]) => [id, +n])); const same = want.every(([id, n]) => got[id] === n) && Object.keys(got).length === want.length; return !same ? {ok:false, why:'Piatti o quantità diversi'} : p.prepaid !== prepaid ? {ok:false, why:prepaid ? 'Doveva pagare subito' : 'Doveva pagare in cassa'} : {ok:true}; }});
  }
  return c;
 },
 focus:(page, ref) => { if (page === 'menu_pos' && ref && D.table(ref)) { ui.qr = {table:ref, cart:{}, step:'menu', cat:ui.qr.cat, receipt:null}; ui.qrPage = undefined; } if (page === 'sala') { ui.table = ref; ui.adding = false; } if (route() === page) render(); else location.hash = page; }, missionTypes:22, sections:13, placeOf:'del locale', startNote:'Fatture, comande, conti, chiamate e prenotazioni arrivano dal quadrato rosso “!” in alto, e ogni sezione del locale ha la sua missione.', onStart:() => { startMissions(); D.kitchenGameStart(); D.fridgeGameStart(); D.doorGameStart(); D.delivery.orders.length = 0; D.delivery.forced = false; D.channels.forEach(c => { c.on = true; c.until = 0; }); drawUnlocks(); ui.door = null; ui.chefOrder = null; nextChefAt = Date.now() + 90000; }, onReset:() => { stopMissions(); D.kitchenGameStop(); D.doorGameStop(); D.deliveryGameStop(); D.nfcGameStop(); D.delivery.forced = false; ui.door = null; setPressure([]); },
 // potenziamenti del locale, da comprare nella Bottega di Otto
 shop:[
  {id:'auto-cook', name:'Automatismo in cucina', desc:'Le comande in attesa vanno sui fornelli da sole, appena c’è posto.', cost:1000, fixed:true, max:1, mood:'otto-chef', use:() => { if (D.kitchen.auto.cook) return false; D.kitchen.auto.cook = true; render(); return 'Le comande vanno sui fornelli da sole.'; }},
  {id:'auto-pass', name:'Automatismo al pass', desc:'I piatti cotti vanno al pass da soli.', cost:800, fixed:true, max:1, mood:'otto-chef', use:() => { if (D.kitchen.auto.pass) return false; D.kitchen.auto.pass = true; render(); return 'I piatti cotti vanno al pass da soli.'; }},
  {id:'auto-serve', name:'Automatismo al tavolo', desc:'Un cameriere serve da solo i piatti pronti al pass.', cost:1000, fixed:true, max:1, mood:'otto-bow', use:() => { if (D.kitchen.auto.serve) return false; D.kitchen.auto.serve = true; render(); return 'I piatti pronti arrivano al tavolo da soli.'; }},
  {id:'cuoco', name:'Secondo cuoco', desc:'+1 piatto sui fornelli insieme (fino a 7).', cost:500, fixed:true, max:3, mood:'otto-chef', use:() => { if (D.kitchen.cap >= 7) return false; D.kitchen.cap++; render(); return `Ora i fornelli reggono ${D.kitchen.cap} piatti insieme.`; }},
  {id:'cameriere', name:'Cameriere al pass', desc:'+20 secondi prima che il pass vada in rosso.', cost:300, fixed:true, max:2, mood:'otto-bow', use:() => { D.kitchen.passTime += 20; render(); return `Dal pass si serve entro ${D.kitchen.passTime} secondi.`; }},
  {id:'forno', name:'Forno nuovo', desc:'Cottura più veloce del 20%.', cost:600, fixed:true, max:2, mood:'otto-chef', use:() => { if (D.kitchen.speed <= .5) return false; D.kitchen.speed = +(D.kitchen.speed * .8).toFixed(2); render(); return 'I piatti cuociono più in fretta.'; }},
  {id:'assistenza', name:'Contratto di assistenza', desc:'Il tecnico dei frigo arriva in 15 secondi invece di 45.', cost:500, fixed:true, max:1, mood:'otto-inspector', use:() => { if (D.fridgeCfg.repair <= 15) return false; D.fridgeCfg.repair = 15; return 'Il tecnico ora arriva in 15 secondi.'; }},
  {id:'allarme', name:'Allarme porta frigo', desc:'Le porte rimaste aperte si richiudono da sole dopo 20 secondi.', cost:400, fixed:true, max:1, mood:'otto-inspector', use:() => { if (D.fridgeCfg.autoDoor) return false; D.fridgeCfg.autoDoor = 20; return 'Allarme attivo sulle porte delle celle.'; }},
  {id:'comis', name:'Commis in cucina', desc:'+30 secondi prima che le comande in attesa vadano in rosso.', cost:300, fixed:true, max:2, mood:'otto-chef', use:() => { D.kitchen.waitBonus += 30; render(); return `Le comande possono aspettare ${D.waitMax()} secondi.`; }},
  {id:'maitre', name:'Maître di sala', desc:'Accomoda da solo gli ospiti alla porta dopo 20 secondi, al tavolo giusto.', cost:1000, fixed:true, max:1, mood:'otto-bow', use:() => { if (D.doorCfg.autoSeat) return false; D.doorCfg.autoSeat = true; return 'Il maître accoglie e accomoda gli ospiti al tavolo giusto.'; }},
  {id:'hostess', name:'Hostess all’ingresso', desc:'Gli ospiti alla porta aspettano 30 secondi in più prima di spazientirsi.', cost:500, fixed:true, max:2, mood:'otto-bow', use:() => { if (D.doorCfg.bonus >= 90) return false; D.doorCfg.bonus += 30; render(); return 'All’ingresso c’è chi accoglie: gli ospiti hanno più pazienza.'; }},
  {id:'dlv-tablet', name:'Tablet unico delivery', desc:'Gli ordini di tutte le piattaforme si accettano da soli dopo 8 secondi.', cost:900, fixed:true, max:1, mood:'otto-phone', use:() => { if (D.delivery.cfg.autoAccept) return false; D.delivery.cfg.autoAccept = true; render(); return 'Il tablet accetta da solo gli ordini delivery.'; }},
  {id:'dlv-banco', name:'Addetto al banco delivery', desc:'Imbusta e consegna da solo gli ordini pronti appena arriva il rider.', cost:1000, fixed:true, max:1, mood:'otto-bow', use:() => { if (D.delivery.cfg.autoHand) return false; D.delivery.cfg.autoHand = true; render(); return 'Al banco delivery c’è chi consegna ai rider.'; }},
  {id:'rider-paz', name:'Accordo con le piattaforme', desc:'I rider aspettano 30 secondi in più prima di ripartire.', cost:500, fixed:true, max:1, mood:'otto-phone', use:() => { if (D.delivery.cfg.bonus) return false; D.delivery.cfg.bonus = 30; return 'I rider aspettano 30 secondi in più.'; }},
  {id:'nfc-cassa', name:'Cassa collegata alla fidelity', desc:'Premi e sconti delle card si applicano da soli, con la regola giusta, dopo 10 secondi.', cost:700, fixed:true, max:1, mood:'otto-star', use:() => { if (D.nfc.cfg.auto) return false; D.nfc.cfg.auto = true; return 'La cassa applica da sola premi e sconti della card.'; }},
  {id:'prenota', name:'Prenotazioni online', desc:'Un terzo in meno di ospiti senza prenotazione alla porta.', cost:1200, fixed:true, max:1, mood:'otto-phone', use:() => { if (D.doorCfg.calm > 1) return false; D.doorCfg.calm = 1.5; return 'Ora quasi tutti prenotano dal sito: meno sorprese alla porta.'; }}
 ], menuNote:'Le missioni arrivano dal locale vivo: fatture dei fornitori, comande grandi, conti, prenotazioni e chiamate. Sempre nuove.', pageName:id => moduleById(id)?.title || {home:SV.title}[id] || id});
shell();
