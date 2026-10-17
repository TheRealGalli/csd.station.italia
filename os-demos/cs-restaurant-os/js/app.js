import {icon, otto} from './icons.js';
import {modules, groups, groupNotes, moduleById} from './modules.js';
import * as D from './demo.js';
import {startTour} from './tour.js';
import {restaurantTour} from './tour-steps.js';

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
const ui = {table:'T3', adding:false, otto:[], category:'all', query:'', prev:{}, done:{reviews:[], haccp:[]}, qr:{table:'T7', cart:{}, step:'menu', cat:'Primi', receipt:null}, menuReply:''};

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
  <nav><div class="nav-group">${navItem('home', 'Il servizio di stasera', 'home', '<span class="live-dot"></span>')}${navItem('modules', 'L’ecosistema', 'flow')}</div>
  ${Object.entries(groups).map(([g, l]) => `<span class="nav-label">${l.toUpperCase()}</span>${modules.filter(m => m.group === g).map(m => navItem(m.id, m.title, m.icon, extra(m))).join('')}`).join('')}</nav>
  <div class="sidebar-bottom"><button class="plan-mini" data-action="otto"><span class="plan-orbit">${icon('otto-happy')}</span><span>Chiedi a Otto<small>Un solo assistente per tutto il locale</small></span>${icon('chevron')}</button>${navItem('settings', 'Impostazioni', 'settings')}<button class="account" data-action="account"><span class="avatar">MR</span><span>Marta Rinaldi<small>Titolare</small></span>${icon('down')}</button></div>
 </aside><div class="mobile-scrim" data-action="sidebar"></div>
 <div class="app-body"><header class="topbar"><div class="breadcrumbs"><button class="icon-btn mobile-toggle" data-action="sidebar" aria-label="Apri navigazione" aria-controls="workspace-navigation" aria-expanded="false">${icon('list')}</button><span>Locale</span>${icon('chevron')}<strong id="crumb"></strong></div>
  <div class="topbar-actions"><button class="live-toggle ${D.service.live ? 'on' : ''}" data-action="live" aria-pressed="${D.service.live}" title="Servizio live: la cucina avanza e arrivano ordini">${D.service.live ? '<span class="live-dot"></span>' : '<i></i>'}<span>Servizio live</span></button><button class="search-trigger" data-action="search" aria-label="Cerca">${icon('search')}<span>Cerca</span><kbd>⌘ K</kbd></button><button class="ask-otto" data-action="otto">${icon('otto-happy')}<span>Chiedi a Otto</span></button><button class="demo-btn" data-action="tour"><i></i><span>Demo interattiva</span></button></div></header>
  <main id="main" tabindex="-1"></main>
  <footer class="app-footer"><span>CSD Station <span class="footer-divider">/</span> Il tuo ristorante, connesso.</span><span>Anteprima dimostrativa · locale, ospiti e numeri inventati · nessun servizio collegato</span></footer></div>
 <aside class="otto-drawer" id="otto-drawer" aria-label="Otto" hidden></aside><div class="live-stack" id="live-stack" aria-live="polite"></div>`;
 render(); syncNavigation();
}
const pages = {home, modules:catalog, settings, sala, kds, menu_pos:menuPos, magazzino, centralino_ai:centralino, recensioni_ai:recensioni, whatsapp, fidelity_nfc:fidelity, fatture, bandi, staff, app_builder:brandPage};
function render() {
 const id = route(), m = moduleById(id);
 const title = m?.title || {home:'Il servizio di stasera', modules:'L’ecosistema', settings:'Impostazioni'}[id] || 'Pagina non trovata';
 document.querySelector('#crumb').textContent = title; document.title = `${title} · CS Restaurant OS`;
 const main = document.querySelector('#main');
 main.className = id !== lastRoute ? 'enter' : ''; lastRoute = id;
 main.innerHTML = pages[id] ? pages[id]() : `<div class="empty-state"><h2>Questo spazio non esiste.</h2><a class="btn btn-primary" href="#home">Torna al servizio${icon('arrow')}</a></div>`;
 syncCounts();
}
// Aggiorna solo ciò che vive: chiamato a ogni evento del servizio.
function liveRefresh() {
 if (renderQueued) return; renderQueued = true;
 requestAnimationFrame(() => {
  renderQueued = false;
  const busy = document.activeElement?.matches?.('input,textarea,select') || dialog.open;
  if (['home', 'sala', 'kds', 'menu_pos', 'magazzino', 'centralino_ai', 'recensioni_ai', 'fatture'].includes(route()) && !busy) {
   const y = scrollY; render(); scrollTo(0, y);
  } else syncCounts();
 });
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
 return `<div class="metrics-grid live-kpis">${kpi('rev', 'Incassato stasera', euro(D.service.revenue), `${D.service.closed.length} conti chiusi · ${euro(open)} ancora in sala`, 'coins', 'kpi-revenue hero')}${kpi('tab', 'Tavoli occupati', `${busy}/${D.tables.length}`, `${D.tables.reduce((n, t) => n + t.guests, 0)} ospiti seduti ora`, 'table')}${kpi('kit', 'Comande in cucina', kitchen.length, `${kitchen.filter(l => l.state === 'ready').length} pronte al pass · ${D.service.qrOrders} dal QR`, 'chef')}${kpi('cov', 'Coperti della serata', D.service.covers + 4, `${D.bookings.length} prenotazioni in arrivo`, 'users')}</div>`;
}

// ————— IL SERVIZIO DI STASERA —————
function home() {
 const low = D.lowStock();
 return `${heading('SERVIZIO IN CORSO · DALLE 19:00', 'Buonasera, Marta.', 'Il locale in tempo reale. Otto tiene d’occhio tutto il resto.', `<span class="live-pill"><span class="live-dot"></span>Live</span>`)}
 ${kpis()}
 <section class="home-live">
  <div class="workspace-panel"><div class="panel-title"><h2>La sala adesso</h2><a class="text-link" href="#sala">Apri la sala${icon('arrow')}</a></div><div class="floor mini">${floorTables(true)}</div></div>
  <div class="home-side">
   ${ottoPanel('IL PUNTO DI OTTO', `Stasera **${D.bookings.length} prenotazioni** ancora in arrivo. ${low.length ? `**${low.map(i => i.name).join(', ')}** sotto scorta: ho preparato l’ordine.` : 'Magazzino in ordine.'} Ci sono **${D.reviews.filter(r => !ui.done.reviews.includes(r.who)).length} recensioni** con risposta pronta.`, `<a class="btn btn-primary" href="#magazzino">Vedi il magazzino${icon('arrow')}</a>`)}
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
function floorTables(mini=false) {
 return D.tables.map(t => {
  const total = D.tableTotal(t), ready = t.lines.some(l => l.state === 'ready');
  return `<button class="ftable s-${t.status} ${t.shape || 'square'} ${ui.table === t.id && !mini ? 'selected' : ''}" style="left:${t.x}%;top:${t.y}%" data-table="${t.id}" aria-label="Tavolo ${t.id}, ${tableLabel[t.status]}">
   <b>${t.id.slice(1)}</b>${t.status === 'free' ? `<small>${t.seats} posti</small>` : `<small>${t.guests} ${icon('users')}${mini ? '' : ` · ${minutes(t.since)}′`}</small>${total ? `<em>${euro(total)}</em>` : ''}`}${ready ? '<i class="ready-dot" title="Piatti pronti al pass"></i>' : ''}</button>`;
 }).join('') + (mini ? '' : '<span class="floor-label bar">BANCO</span><span class="floor-label door">INGRESSO</span>');
}
function sala() {
 return `${heading('SALA & CUCINA · 01', 'Sala & tavoli', 'Tocca un tavolo: vedi cosa ha ordinato, a che punto è la cucina, quanto è il conto.', `<span class="live-pill"><span class="live-dot"></span>${D.tables.filter(t => t.status !== 'free').length} tavoli in servizio</span>`)}
 ${kpis()}
 <div class="sala-layout"><section class="workspace-panel floor-panel"><div class="panel-title"><h2>Sala principale</h2><div class="legend">${Object.entries(tableLabel).map(([k, v]) => `<span><i class="lg s-${k}"></i>${v}</span>`).join('')}</div></div><div class="floor">${floorTables()}</div></section>
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
  <div class="tp-actions">${btn(ui.adding ? 'Chiudi menu' : 'Aggiungi piatto', 'adding', ui.adding ? 'btn-secondary' : 'btn-primary', ui.adding ? 'close' : 'plus')}${t.status === 'bill' ? btn('Chiudi conto · carta', `close:${t.id}`, 'btn-dark', 'check') : btn('Richiedi il conto', `bill:${t.id}`, 'btn-secondary', 'receipt')}</div>`;
}

// ————— CUCINA —————
function kds() {
 const lines = D.kitchenLines();
 const col = (state, title) => { const ls = lines.filter(l => l.state === state).sort((a, b) => a.at - b.at); return `<section class="kds-col k-${state}"><header><b>${title}</b><span>${ls.length}</span></header>${ls.map(l => { const d = D.dish(l.dish); const age = Math.round((Date.now() - l.at) / 60000) + (state === 'waiting' ? 2 : 9); return `<button class="ticket ${Date.now() - l.at < 2500 ? 'row-in' : ''} ${age > 15 ? 'late' : ''}" data-advance="${l.id}"><span class="tk-top"><b>${l.table}</b><small>${age}′</small></span><span class="tk-dish">${l.qty}× ${esc(d.name)}</span>${d.allergens.length ? `<span class="tk-all">${d.allergens.map(a => `<i>${a}</i>`).join('')}</span>` : ''}<span class="tk-next">${{waiting:'Inizia', cooking:'Pronto', ready:'Servito'}[state]} ${icon('arrow')}</span></button>`; }).join('') || '<p class="muted pad-s">Niente qui.</p>'}</section>`; };
 return `${heading('SALA & CUCINA · 02', 'Cucina & comande', 'Le comande arrivano dal tavolo in tempo reale. Tocca una comanda per farla avanzare.', `<span class="live-pill"><span class="live-dot"></span>Pass collegato</span>`)}
 <div class="kds-board">${col('waiting', 'In attesa')}${col('cooking', 'In preparazione')}${col('ready', 'Pronti al pass')}</div>
 ${ottoNote('Le comande oltre i **15 minuti** si colorano. Gli allergeni dichiarati al telefono (celiachia del tavolo 2 delle 21:15) arriveranno qui insieme alla comanda.')}`;
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
 show(`<span class="dialog-kicker">EDITOR DEL MENU</span><h2 id="dialog-title">Il menu di stasera</h2><p class="dialog-description">Ogni modifica è subito su tutti i QR dei tavoli. Puoi anche chiederla a Otto a parole.</p>
  <div class="editor-list">${D.menu.map(d => `<div class="editor-row"><span><b>${esc(d.name)}</b><small>${d.cat}${d.special ? ' · piatto del giorno' : ''}</small></span><label class="editor-price">€ <input type="number" min="1" step="0.5" value="${d.price}" data-edit-price="${d.id}" aria-label="Prezzo ${esc(d.name)}"></label><label class="editor-toggle"><input type="checkbox" ${d.visible ? 'checked' : ''} data-edit-visible="${d.id}" aria-label="${esc(d.name)} visibile sul QR"><i></i></label></div>`).join('')}</div>`, 'editor-dialog');
}
function qrAction(a) {
 const q = ui.qr;
 if (a === 'checkout') q.step = 'checkout';
 if (a === 'back' || a === 'again') { q.step = 'menu'; if (a === 'again') { q.cart = {}; q.receipt = null; } }
 if (a === 'pay' || a === 'order') {
  const items = Object.entries(q.cart).filter(([, n]) => n > 0);
  const r = D.qrOrder(q.table, items, a === 'pay', 'Apple Pay');
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
 <div class="quote-layout"><section class="workspace-panel"><div class="panel-title"><h2>Dispensa e cella</h2>${badge(`${low.length} sotto scorta`, low.length ? 'badge-red' : 'badge-green')}</div><div class="stock">${D.ingredients.map(i => { const pct = Math.min(100, i.qty / (i.min * 3) * 100); const recent = Date.now() - (i.changed || 0) < 3000; return `<div class="stock-row ${i.qty <= i.min ? 'low' : ''} ${recent ? 'row-in' : ''}" data-ing="${i.id}"><span class="st-name"><b>${esc(i.name)}</b><small>${esc(i.supplier)}</small></span><span class="st-bar"><i style="width:${pct}%"></i><em style="left:${100 / 3}%"></em></span><span class="st-qty ${recent ? 'bump' : ''}">${D.fmtQty(i)}</span>${i.qty <= i.min ? badge('Sotto scorta', 'badge-red') : badge('OK', 'badge-green')}</div>`; }).join('')}</div></section>
 <aside class="module-side">${low.length ? ottoPanel('ORDINE PROPOSTO', `**${low.map(i => `${i.name} (+${i.min * 2} ${i.unit})`).join(', ')}** da ${sup.join(', ')}. Arriva domattina, prima del pranzo.`, btn('Invia l’ordine ai fornitori', 'reorder', 'btn-primary', 'check')) : ottoPanel('MAGAZZINO', 'Tutto sopra la scorta minima. Ti avviso io quando qualcosa scende.')}
 <div class="workspace-panel"><div class="panel-title"><h2>Ricette: cosa scala un piatto</h2></div>${D.menu.filter(d => d.course).slice(0, 5).map(d => `<div class="mini-row"><span><b>${esc(d.name)}</b><small>${Object.entries(d.recipe).map(([k, q]) => `${D.ingredient(k).name} ${q < 1 ? Math.round(q * 1000) + (D.ingredient(k).unit === 'kg' ? ' g' : '') : q + ' ' + D.ingredient(k).unit}`).join(' · ')}</small></span><span class="fc">${euro(+D.foodCost(d).toFixed(2))}</span></div>`).join('')}</div></aside></div>`;
}

// ————— moduli AI e relazioni —————
function centralino() {
 return `${heading('INTELLIGENZA ARTIFICIALE · 04', 'Centralino AI', 'Otto risponde mentre siete in servizio: prenota, segnala le allergie, gestisce la lista d’attesa.', `<span class="live-pill"><span class="live-dot"></span>Attivo</span>`)}
 <div class="metrics-grid">${[['phone', 'Chiamate stasera', D.calls.length], ['calendar', 'Prenotazioni prese', 2], ['users', 'In lista d’attesa', 1], ['clock', 'Minuti al telefono risparmiati', 14]].map(([i, t, n]) => `<article class="metric"><div><span>${t}</span>${icon(i)}</div><strong class="has-value">${n}</strong></article>`).join('')}</div>
 <div class="call-grid">${D.liveCalls.filter(c => c.live).map(c => `<article class="workspace-panel call live-call"><div class="panel-title"><h2>${esc(c.caller)}</h2><span class="badge badge-red"><span class="live-dot red"></span> In corso</span></div><div class="transcript"><div class="bubble caller row-in">${esc(c.text)}</div><div class="bubble typing"><i></i><i></i><i></i></div></div></article>`).join('')}${D.calls.map(c => `<article class="workspace-panel call"><div class="panel-title"><h2>${esc(c.caller)}</h2><span>${badge(c.outcome, 'badge-green')} <small class="muted">${c.time}</small></span></div><div class="transcript"><div class="bubble caller">${esc(c.text)}</div><div class="bubble agent"><small>${icon('sparkle')} Otto</small>${esc(c.reply)}</div></div></article>`).join('')}</div>`;
}
function recensioni() {
 return `${heading('INTELLIGENZA ARTIFICIALE · 05', 'Recensioni AI', 'Ogni recensione letta da Otto, con una risposta nel tuo tono pronta da approvare.')}
 <div class="review-list">${D.reviews.map(r => { const done = ui.done.reviews.includes(r.who); return `<article class="workspace-panel review ${done ? 'done' : ''}"><div class="rv-head"><span class="stars">${'★'.repeat(r.stars)}<i>${'★'.repeat(5 - r.stars)}</i></span><b>${esc(r.who)}</b><small>${r.source}</small>${done ? badge('Risposta pubblicata', 'badge-green') : ''}</div><p class="rv-text">“${esc(r.text)}”</p>${ottoNote(r.draft, r.stars < 3 ? 'warn' : '')}${done ? '' : `<div class="detail-actions">${btn('Approva e pubblica', `review:${r.who}`, 'btn-primary', 'check')}</div>`}</article>`; }).join('')}</div>
 ${ottoNote('Tema ricorrente nell’ultimo mese: **attesa sui secondi il sabato**. Lo stesso dato emerge dai tempi della cucina.', 'info')}`;
}
function whatsapp() {
 return `${heading('CLIENTI & MARKETING · 06', 'WhatsApp & campagne', 'Promemoria automatici e campagne preparate da Otto, solo agli ospiti che hanno dato il consenso.')}
 <div class="quote-layout"><section class="workspace-panel"><div class="panel-title"><h2>Campagne</h2></div>${D.campaigns.map(c => `<div class="mini-row"><span><b>${esc(c.name)}</b><small>${c.kind}${c.sent ? ` · ${c.sent} inviati · ${c.read} letti` : ''}</small></span>${c.sent ? badge(`${Math.round(c.read / c.sent * 100)}% letti`, 'badge-green') : btn('Rivedi', 'toast:Bozza pronta: in produzione parte dopo la tua approvazione', 'btn-secondary', '')}</div>`).join('')}</section>
 <aside class="module-side"><div class="phone-mock"><div class="wa bot">Ciao Luca! Ti aspettiamo stasera alle 20:45 per il vostro anniversario 🥂 Abbiamo tenuto per voi il tavolo vicino alla finestra.</div><div class="wa client">Grazie mille, a stasera!</div></div>${ottoPanel('IDEA', 'Arrivano i porcini e a novembre il tartufo: ho preparato una campagna per **118 ospiti** che hanno ordinato piatti ai funghi negli ultimi 6 mesi.')}</aside></div>`;
}
function fidelity() {
 return `${heading('CLIENTI & MARKETING · 07', 'Fidelity & NFC', 'Gli ospiti abituali riconosciuti al tavolo, con punti e premi.')}
 <section class="workspace-panel"><div class="table-scroll"><table class="data-table"><thead><tr><th>Ospite</th><th>Visite</th><th>Punti</th><th>Premio disponibile</th></tr></thead><tbody>${D.members.map(m => `<tr><td><b>${esc(m.name)}</b></td><td>${m.visits}</td><td>${m.points}</td><td>${m.reward === '—' ? '—' : badge(m.reward, 'badge-green')}</td></tr>`).join('')}</tbody></table></div></section>
 ${ottoNote('**Luca Pieri** arriva alle 20:45 per l’anniversario ed è alla 15ª visita: ha diritto al dessert offerto. L’ho segnalato sul tavolo 10.')}`;
}
function fatture() {
 const pays = D.service.payments, stripePays = pays.filter(p => p.method.startsWith('Stripe')), sent = pays.filter(p => p.ade === 'Trasmesso').length;
 return `${heading('GESTIONE · 09', 'Cassa & Agenzia delle Entrate', 'Ogni incasso, dal POS o dal QR con Stripe, diventa un documento commerciale e finisce nei corrispettivi trasmessi all’Agenzia. Senza fare niente.', `<span class="live-pill"><span class="live-dot"></span>Corrispettivi collegati</span>`)}
 <div class="metrics-grid">${kpi('fz', 'Incassato stasera', euro(D.service.revenue), `${D.service.closed.length} conti chiusi`, 'coins', 'hero')}${kpi('st', 'Pagato dal QR con Stripe', euro(stripePays.reduce((n, p) => n + p.amount, 0)), `${stripePays.length} pagamenti anticipati`, 'card')}${kpi('dc', 'Documenti commerciali', pays.length, 'Emessi stasera', 'receipt')}${kpi('ade', 'Trasmessi all’Agenzia', sent, `${pays.length - sent} in invio`, 'check')}</div>
 <div class="quote-layout"><section class="workspace-panel"><div class="panel-title"><h2>Incassi e documenti commerciali</h2>${badge('In tempo reale', 'badge-green')}</div><div class="table-scroll"><table class="data-table pay-table"><thead><tr><th>Documento</th><th>Ora</th><th>Cosa</th><th>Metodo</th><th>Importo</th><th>Agenzia Entrate</th></tr></thead><tbody>${pays.map(p => `<tr class="${Date.now() - p.at < 3000 ? 'row-in' : ''}"><td><b>${p.id}</b></td><td>${p.time}</td><td>${esc(p.what)}</td><td>${p.method.startsWith('Stripe') ? `<span class="stripe-tag">stripe</span> ${esc(p.method.slice(9))}` : esc(p.method)}</td><td><b>${euro(p.amount)}</b></td><td>${badge(p.ade, p.ade === 'Trasmesso' ? 'badge-green' : 'badge-amber')}</td></tr>`).join('') || '<tr><td colspan="6" class="muted">I primi incassi della serata arrivano qui.</td></tr>'}</tbody></table></div></section>
 <aside class="module-side"><div class="workspace-panel ade-panel"><div class="panel-title"><h2>${icon('shield')} Collegamenti fiscali</h2></div>
  <div class="ade-row ok"><span>${icon('check')}</span><div><b>POS collegato al registratore telematico</b><small>Obbligo dal 1° gennaio 2026: le matricole sono associate nell’area Fatture e Corrispettivi. Ogni pagamento elettronico ha il suo scontrino.</small></div></div>
  <div class="ade-row ok"><span>${icon('check')}</span><div><b>Stripe riconciliato con i corrispettivi</b><small>Ogni pagamento dal QR emette il documento commerciale con lo stesso importo: l’incrocio dell’Agenzia con i dati dei pagamenti torna sempre.</small></div></div>
  <div class="ade-row next"><span>${icon('clock')}</span><div><b>Dal 2027 la cassa può diventare software</b><small>L’Agenzia sta introducendo soluzioni software certificate per memorizzare e trasmettere i corrispettivi da PC, tablet o SmartPOS. CS Restaurant OS è pensato per diventare la tua cassa.</small></div></div></div>
  ${ottoPanel('IL PUNTO DI OTTO', `Stasera **${pays.length} documenti commerciali**, ${sent} già trasmessi. La cena dello **Studio Marchetti** va fatturata: ho preparato la fattura elettronica con i dati dell’ultima volta.`)}
  <div class="workspace-panel"><div class="panel-title"><h2>Fatture</h2></div>${D.invoices.map(f => `<div class="mini-row"><span><b>${f.n} · ${esc(f.to)}</b><small>${euro(f.amount)}</small></span>${badge(f.state, f.state.includes('SDI') ? 'badge-green' : 'badge-amber')}</div>`).join('')}</div></aside></div>
 <div class="notice">${icon('info')}<p>Anteprima dimostrativa: nessun collegamento reale con l’Agenzia delle Entrate o con Stripe. Date e regole fiscali vanno sempre verificate con il tuo commercialista.</p></div>`;
}

function bandi() {
 return `${heading('GESTIONE · 10', 'Bandi & opportunità', 'Otto cerca contributi adatti al locale e ti avvisa prima della scadenza.')}
 <div class="feed">${D.grants.map(g => `<article class="update"><div class="update-top">${badge('Compatibilità ' + g.fit, g.fit === 'Alta' ? 'badge-green' : '')}<small>${esc(g.who)}</small>${badge('Scadenza ' + g.deadline, 'badge-amber')}</div><h3>${esc(g.title)}</h3>${ottoNote(g.fit === 'Alta' ? 'Il nuovo abbattitore e la cappa rientrano tra le spese ammissibili: contributo stimato fino al 40%.' : 'Utile per il nuovo menu digitale e le prenotazioni online.')}</article>`).join('')}</div>
 <div class="notice">${icon('info')}<p>Bandi di esempio, non reali.</p></div>`;
}
function staff() {
 return `${heading('GESTIONE · 11', 'Staff & HACCP', 'Chi è in turno stasera e le checklist della cucina.')}
 <div class="quote-layout"><section class="workspace-panel"><div class="panel-title"><h2>Checklist HACCP di oggi</h2>${badge(`${D.haccp.filter((h, i) => h.done || ui.done.haccp.includes(i)).length}/${D.haccp.length}`)}</div><div class="haccp">${D.haccp.map((h, i) => { const done = h.done || ui.done.haccp.includes(i); return `<label class="task ${done ? 'done' : ''}"><input type="checkbox" data-haccp="${i}" ${done ? 'checked' : ''} ${h.done ? 'disabled' : ''}><span><b>${esc(h.task)}</b><small>${esc(h.by)}</small></span></label>`; }).join('')}</div></section>
 <aside class="module-side"><div class="workspace-panel"><div class="panel-title"><h2>In turno stasera</h2></div>${D.staff.map(s => `<div class="mini-row"><span><b>${esc(s.name)}</b><small>${s.role}</small></span><span class="muted">${s.shift}</span></div>`).join('')}</div>
 ${ottoPanel('TURNI', 'Sabato prossimo hai **38 coperti** già prenotati: ti suggerisco una persona in più in sala dalle 20.')}</aside></div>`;
}
function brandPage() {
 return `${heading('CLIENTI & MARKETING · 12', 'Brand & app', 'Il menu QR e il portale ospiti, sempre allineati con la cucina.')}
 <div class="quote-layout"><section class="workspace-panel"><div class="panel-title"><h2>Menu QR, come lo vede l’ospite</h2>${badge('Si aggiorna con il magazzino', 'badge-green')}</div><div class="qr-menu">${D.menu.map(d => `<div class="qr-item ${D.available(d) ? '' : 'off'}"><span><b>${esc(d.name)}</b><small>${d.allergens.join(' · ') || 'Senza allergeni dichiarati'}</small></span><b>${D.available(d) ? euro(d.price) : 'Esaurito'}</b></div>`).join('')}</div></section>
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
 if (a === 'otto') return toggleOtto();
 if (a === 'search') return searchDialog();
 if (a === 'tour') return startTour(restaurantTour({toggleOtto, ui, D}), {otto, name:'Demo interattiva CS Restaurant OS', onEnd:() => toggleOtto(false)});
 if (a === 'live') { D.service.live = !D.service.live; toast(D.service.live ? 'Servizio live: la cucina avanza e arrivano ordini.' : 'Servizio in pausa.'); return shell(); }
 if (k === 'toast') return toast(a.slice(6));
 if (k === 'go') { location.hash = a.slice(3); return; }
 if (a === 'adding') { ui.adding = !ui.adding; return render(); }
 if (k === 'seat') { D.openTable(x, +y); return; }
 if (k === 'bill') { D.requestBill(x); return; }
 if (k === 'close') { const total = D.closeBill(x); ui.adding = false; toast(`Tavolo ${x.slice(1)} chiuso: ${euro(total)} in cassa.`); return; }
 if (a === 'menu-editor') return menuEditor();
 if (a === 'reset') { location.hash = 'home'; location.reload(); return; }
 if (a === 'reorder') { D.reorder(D.lowStock().map(i => i.id)); toast('Ordine inviato ai fornitori (demo).'); return; }
 if (k === 'review') { ui.done.reviews.push(a.slice(7)); toast('Risposta pubblicata (demo).'); return shell(); }
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
 if ((x = el('[data-table]'))) { if (route() !== 'sala') { ui.table = x.dataset.table; location.hash = 'sala'; return; } ui.table = x.dataset.table; ui.adding = false; return render(); }
 if ((x = el('[data-add]'))) { const ok = D.addDish(ui.table, x.dataset.add); toast(ok ? `${D.dish(x.dataset.add).name} → cucina · conto e magazzino aggiornati` : 'Piatto esaurito: ingredienti insufficienti.'); return; }
 if ((x = el('[data-advance]'))) { D.advance(x.dataset.advance); return; }
 if ((x = el('[data-category]'))) { ui.category = x.dataset.category; return render(); }
 if ((x = el('[data-otto]'))) return askGlobal(x.dataset.otto);
 if ((x = el('[data-qr-add]'))) { ui.qr.cart[x.dataset.qrAdd] = (ui.qr.cart[x.dataset.qrAdd] || 0) + 1; return render(); }
 if ((x = el('[data-qr-cat]'))) { ui.qr.cat = x.dataset.qrCat; return render(); }
 if ((x = el('[data-qr-table]'))) { ui.qr = {table:x.dataset.qrTable, cart:{}, step:'menu', cat:ui.qr.cat, receipt:null}; return render(); }
 if ((x = el('[data-qr]'))) return qrAction(x.dataset.qr);
 if ((x = el('[data-menu-otto]'))) { ui.menuReply = D.menuCommand(x.dataset.menuOtto); return render(); }
});
document.addEventListener('change', e => {
 const d = e.target.dataset;
 if (d.haccp) { ui.done.haccp.push(+d.haccp); render(); }
 if (d.editPrice && +e.target.value > 0) { D.editDish(d.editPrice, {price:+e.target.value}); toast('Prezzo aggiornato su tutti i QR.'); }
 if (d.editVisible) { D.editDish(d.editVisible, {visible:e.target.checked}); toast(e.target.checked ? 'Di nuovo nel menu.' : 'Tolto dal menu di stasera.'); }
});
document.addEventListener('input', e => {
 if (e.target.id === 'catalog-search') { ui.query = e.target.value; const y = e.target.selectionStart; render(); const i = document.querySelector('#catalog-search'); i.focus(); i.setSelectionRange(y, y); }
 if (e.target.id === 'global-search') document.querySelector('#search-results').innerHTML = searchResults(e.target.value);
});
document.addEventListener('submit', e => {
 e.preventDefault();
 if (e.target.id === 'otto-form') { const v = e.target.querySelector('#otto-input').value.trim(); if (v) askGlobal(v); }
 if (e.target.id === 'menu-otto-form') { const v = e.target.querySelector('#menu-otto-input').value.trim(); if (v) { ui.menuReply = D.menuCommand(v); render(); } }
});
document.addEventListener('keydown', e => {
 if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); searchDialog(); }
 if (e.key === 'Enter' && !e.shiftKey && e.target.id === 'otto-input') { e.preventDefault(); e.target.form.requestSubmit(); }
 if (e.key === 'Escape' && !dialog.open) { if (document.body.classList.contains('otto-open')) toggleOtto(false); document.body.classList.remove('sidebar-open'); syncNavigation(); }
});
window.addEventListener('hashchange', () => { if (dialog.open) dialog.close(); document.body.classList.remove('sidebar-open'); shell(); if (document.body.classList.contains('otto-open')) toggleOtto(true); scrollTo({top:0, behavior:'instant'}); });
function liveToast(ev) {
 const stack = document.querySelector('#live-stack'); if (!stack || document.body.classList.contains('touring')) return;
 const card = document.createElement('button');
 card.className = `live-card lc-${ev.type}`; card.dataset.action = `go:${ev.go}`;
 card.innerHTML = `<span class="lc-icon">${icon(ev.icon)}</span><span><b>${esc(ev.title)}</b><small>${esc(ev.text)}</small></span>`;
 stack.prepend(card); [...stack.children].slice(3).forEach(x => x.remove());
 setTimeout(() => { card.classList.add('out'); setTimeout(() => card.remove(), 300); }, 6500);
}
D.onInbound(liveToast);
D.subscribe(liveRefresh);
// Dentro il sito la demo parte ferma (niente cicli né animazioni): si accende solo quando il visitatore la apre.
let awake = window.parent === window;
const busy = () => !awake || document.hidden || document.body.classList.contains('touring');
const wake = on => { awake = on; document.documentElement.classList.toggle('csd-paused', !on); };
wake(awake);
setInterval(() => { if (!busy()) D.tick(); }, 3500);
(function inbound() { setTimeout(() => { if (!busy()) D.inboundTick(); inbound(); }, 14000 + Math.random() * 10000); })();
window.addEventListener('message', e => {
 if (e.origin !== location.origin) return;
 if (e.data === 'csd:start-tour') { wake(true); action('tour'); }
 if (e.data === 'csd:resume') wake(true);
 if (e.data === 'csd:pause') wake(false);
});
shell();
