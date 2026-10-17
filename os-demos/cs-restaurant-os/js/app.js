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
const ui = {table:'T3', adding:false, otto:[], category:'all', query:'', prev:{}, done:{reviews:[], haccp:[]}};

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
  <div class="sidebar-bottom"><button class="plan-mini" data-action="otto"><span class="plan-orbit">${icon('sparkle')}</span><span>Chiedi a Otto<small>Un solo assistente per tutto il locale</small></span>${icon('chevron')}</button><button class="account" data-action="account"><span class="avatar">MR</span><span>Marta Rinaldi<small>Titolare</small></span>${icon('down')}</button></div>
 </aside><div class="mobile-scrim" data-action="sidebar"></div>
 <div class="app-body"><header class="topbar"><div class="breadcrumbs"><button class="icon-btn mobile-toggle" data-action="sidebar" aria-label="Apri navigazione" aria-controls="workspace-navigation" aria-expanded="false">${icon('list')}</button><span>Locale</span>${icon('chevron')}<strong id="crumb"></strong></div>
  <div class="topbar-actions"><button class="live-toggle ${D.service.live ? 'on' : ''}" data-action="live" aria-pressed="${D.service.live}" title="Servizio live: la cucina avanza e arrivano ordini">${D.service.live ? '<span class="live-dot"></span>' : '<i></i>'}<span>Servizio live</span></button><button class="search-trigger" data-action="search" aria-label="Cerca">${icon('search')}<span>Cerca</span><kbd>⌘ K</kbd></button><button class="ask-otto" data-action="otto">${icon('sparkle')}<span>Chiedi a Otto</span></button><button class="demo-btn" data-action="tour"><i></i><span>Demo interattiva</span></button></div></header>
  <main id="main" tabindex="-1"></main>
  <footer class="app-footer"><span>CSD Station <span class="footer-divider">/</span> Il tuo ristorante, connesso.</span><span>Anteprima dimostrativa · locale, ospiti e numeri inventati · nessun servizio collegato</span></footer></div>
 <aside class="otto-drawer" id="otto-drawer" aria-label="Otto" hidden></aside><div class="live-stack" id="live-stack" aria-live="polite"></div>`;
 render(); syncNavigation();
}
const pages = {home, modules:catalog, sala, kds, menu_pos:menuPos, magazzino, centralino_ai:centralino, recensioni_ai:recensioni, whatsapp, fidelity_nfc:fidelity, fatture, bandi, staff, app_builder:brandPage};
function render() {
 const id = route(), m = moduleById(id);
 const title = m?.title || {home:'Il servizio di stasera', modules:'L’ecosistema'}[id] || 'Pagina non trovata';
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
  if (['home', 'sala', 'kds', 'menu_pos', 'magazzino', 'centralino_ai', 'recensioni_ai'].includes(route()) && !busy) {
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
 return `<div class="metrics-grid live-kpis">${kpi('rev', 'Incassato stasera', euro(D.service.revenue), `${D.service.closed.length} conti chiusi · ${euro(open)} ancora in sala`, 'coins', 'kpi-revenue hero')}${kpi('tab', 'Tavoli occupati', `${busy}/${D.tables.length}`, `${D.tables.reduce((n, t) => n + t.guests, 0)} ospiti seduti ora`, 'table')}${kpi('kit', 'Comande in cucina', kitchen.length, `${kitchen.filter(l => l.state === 'ready').length} pronte al pass`, 'chef')}${kpi('cov', 'Coperti della serata', D.service.covers + 4, `${D.bookings.length} prenotazioni in arrivo`, 'users')}</div>`;
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
 <div class="eco-otto">${icon('sparkle')}<p><b>Un piatto, tutto il sistema.</b> Quando la sala ordina una carbonara, la comanda arriva in cucina, entra nel conto del tavolo e scala pasta, guanciale, uova e pecorino dal magazzino. Nello stesso istante.</p></div></section>`;
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
 const lines = courses.map(([c, label]) => { const ls = t.lines.filter(l => D.dish(l.dish).course === c); return ls.length ? `<div class="course"><span class="eyebrow">${label.toUpperCase()}</span>${ls.map(l => `<div class="tline ${Date.now() - l.at < 2500 ? 'row-in' : ''}"><span class="q">${l.qty}×</span><span class="n">${esc(D.dish(l.dish).name)}</span>${badge(...(stateLabel[l.state] || ['']))}<b>${euro(D.dish(l.dish).price * l.qty)}</b></div>`).join('')}</div>` : ''; }).join('');
 const total = D.tableTotal(t);
 return `${head}<div class="tp-lines">${lines || '<p class="muted pad-s">Nessun piatto ancora. Aggiungi la comanda.</p>'}</div>
  <div class="tp-total"><span>Conto</span><strong class="${ui.prev['t' + t.id] !== total && ui.prev['t' + t.id] !== undefined ? 'bump' : ''}">${euro(total)}</strong></div>${(ui.prev['t' + t.id] = total, '')}
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

// ————— MENU & CASSA —————
function menuPos() {
 const pay = D.service.closed.reduce((m, c) => (m[c.method] = (m[c.method] || 0) + c.total, m), {});
 return `${heading('SALA & CUCINA · 03', 'Menu digitale & cassa', 'Ogni piatto con il suo costo reale. Ogni conto chiuso, in cassa.')}
 <div class="quote-layout"><section class="workspace-panel"><div class="panel-title"><h2>Menu alla carta</h2>${badge('Food cost calcolato dalle ricette')}</div><div class="table-scroll"><table class="data-table"><thead><tr><th>Piatto</th><th>Prezzo</th><th>Food cost</th><th>Margine</th><th>Allergeni</th><th>Stato</th></tr></thead><tbody>${D.menu.map(d => { const fc = D.foodCost(d), m = (1 - fc / d.price) * 100; return `<tr><td><b>${esc(d.name)}</b><small>${d.cat}</small></td><td>${euro(d.price)}</td><td>${euro(+fc.toFixed(2))}</td><td><span class="margin ${m < 65 ? 'low' : ''}">${m.toFixed(0)}%</span></td><td>${d.allergens.map(a => `<span class="allergen">${a}</span>`).join('') || '—'}</td><td>${D.available(d) ? badge('Disponibile', 'badge-green') : badge('Esaurito', 'badge-red')}</td></tr>`; }).join('')}</tbody></table></div></section>
 <aside class="module-side"><div class="workspace-panel cassa"><div class="panel-title"><h2>Cassa della serata</h2><span class="live-dot"></span></div><div class="cassa-total"><small>Incassato</small><strong class="kpi-revenue-big">${euro(D.service.revenue)}</strong><span>${Object.entries(pay).map(([k, v]) => `${k} ${euro(v)}`).join(' · ')}</span></div>${D.service.closed.map((c, i) => `<div class="mini-row ${i === 0 ? 'row-in' : ''}"><span><b>Tavolo ${c.table.slice(1)} · ${euro(c.total)}</b><small>${c.time} · ${c.guests} ospiti · ${c.items} voci · ${c.method}</small></span>${icon('check')}</div>`).join('')}</div>
 ${ottoPanel('MARGINI', 'La **tagliata** ha il margine più basso del menu. Con il prezzo del controfiletto di questa settimana, a € 26 torneresti sopra il 65%.')}</aside></div>`;
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
 return `${heading('GESTIONE · 09', 'Fatture & corrispettivi', 'Corrispettivi della serata dalla cassa, fatture e acquisti pronti per il commercialista.')}
 <div class="metrics-grid">${kpi('fz', 'Corrispettivi di stasera', euro(D.service.revenue), 'Dalla cassa, in tempo reale', 'coins', 'hero')}${[['receipt', 'Fatture da emettere', 1], ['box', 'Acquisti ricevuti', 1]].map(([i, t, n]) => `<article class="metric"><div><span>${t}</span>${icon(i)}</div><strong class="has-value">${n}</strong></article>`).join('')}</div>
 <section class="workspace-panel"><div class="table-scroll"><table class="data-table"><thead><tr><th>Documento</th><th>Intestatario</th><th>Importo</th><th>Stato</th></tr></thead><tbody>${D.invoices.map(f => `<tr><td><b>${f.n}</b></td><td>${esc(f.to)}</td><td>${euro(f.amount)}</td><td>${badge(f.state, f.state.includes('SDI') ? 'badge-green' : 'badge-amber')}</td></tr>`).join('')}</tbody></table></div></section>
 ${ottoNote('La cena dello **Studio Marchetti** di stasera va fatturata: ho preparato la fattura con i dati dell’ultima volta.')}`;
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

// ————— OTTO —————
function askOtto(text) {
 const t = text.toLowerCase();
 if (/andat|incass|serata|finora/.test(t)) { const open = D.tables.reduce((n, x) => n + D.tableTotal(x), 0); return {text:`Finora **${euro(D.service.revenue)}** incassati con ${D.service.closed.length} conti, più **${euro(open)}** ancora aperti in sala. ${D.tables.filter(x => x.status !== 'free').length} tavoli occupati, ${D.kitchenLines().filter(l => l.state !== 'served').length} comande in cucina.`, links:[['La cassa', 'menu_pos']]}; }
 if (/magazz|manca|scorta|ordin/.test(t)) { const low = D.lowStock(); return {text: low.length ? `Sotto scorta: **${low.map(i => `${i.name} (${D.fmtQty(i)})`).join(', ')}**. L’ordine ai fornitori è pronto.` : 'Tutto sopra la scorta minima.', links:[['Il magazzino', 'magazzino']]}; }
 if (/tavol|aspett|attesa|cucina/.test(t)) { const w = D.kitchenLines().filter(l => l.state === 'waiting'); return {text: w.length ? `Aspettano la cucina: **${[...new Set(w.map(l => l.table))].join(', ')}**. Il più vecchio è ${w.sort((a, b) => a.at - b.at)[0].table}.` : 'Nessun tavolo in attesa della cucina.', links:[['La cucina', 'kds']]}; }
 if (/prenot|arriv/.test(t)) return {text:`In arrivo: ${D.bookings.map(b => `**${b.time}** ${b.name} (${b.guests})`).join(', ')}. Anna Serra è celiaca: già segnalato alla cucina.`, links:[['La sala', 'sala']]};
 return {text:'Vedo sala, cucina, cassa, magazzino, prenotazioni e recensioni. Chiedimi “com’è andata finora?”, “cosa manca in magazzino?” o “quali tavoli aspettano?”.', links:[]};
}
const ottoSuggestions = ['Com’è andata finora?', 'Cosa manca in magazzino?', 'Quali tavoli aspettano?', 'Prenotazioni in arrivo?'];
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
 if (a === 'tour') return startTour(restaurantTour({toggleOtto, ui}), {otto, name:'Demo interattiva CS Restaurant OS', onEnd:() => toggleOtto(false)});
 if (a === 'live') { D.service.live = !D.service.live; toast(D.service.live ? 'Servizio live: la cucina avanza e arrivano ordini.' : 'Servizio in pausa.'); return shell(); }
 if (k === 'toast') return toast(a.slice(6));
 if (k === 'go') { location.hash = a.slice(3); return; }
 if (a === 'adding') { ui.adding = !ui.adding; return render(); }
 if (k === 'seat') { D.openTable(x, +y); return; }
 if (k === 'bill') { D.requestBill(x); return; }
 if (k === 'close') { const total = D.closeBill(x); ui.adding = false; toast(`Tavolo ${x.slice(1)} chiuso: ${euro(total)} in cassa.`); return; }
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
});
document.addEventListener('change', e => { if (e.target.dataset.haccp) { ui.done.haccp.push(+e.target.dataset.haccp); render(); } });
document.addEventListener('input', e => {
 if (e.target.id === 'catalog-search') { ui.query = e.target.value; const y = e.target.selectionStart; render(); const i = document.querySelector('#catalog-search'); i.focus(); i.setSelectionRange(y, y); }
 if (e.target.id === 'global-search') document.querySelector('#search-results').innerHTML = searchResults(e.target.value);
});
document.addEventListener('submit', e => { e.preventDefault(); if (e.target.id === 'otto-form') { const v = e.target.querySelector('#otto-input').value.trim(); if (v) askGlobal(v); } });
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
