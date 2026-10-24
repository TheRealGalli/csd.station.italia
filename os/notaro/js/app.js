import {persona} from './persona.js?v=mvmmjk2c';
import {icon, otto} from './icons.js?v=mvmmjk2c';
import {modules, groups, groupNotes, moduleById} from './modules.js?v=mvmmjk2c';
import {state, esc, rich, toggle, reset, persist} from './store.js?v=mvmmjk2c';
import * as D from './demo.js?v=mvmmjk2c';
import {studioScenario, studioSuggestions, askOtto, ottoSuggestions, proposeValues} from './agent.js?v=mvmmjk2c';
import {inspect, fillNative, formPdf} from './pdf-core.js?v=mvmmjk2c';
import {startTour} from './tour.js?v=mvmmjk2c';
import {enhancePanels} from './panels.js?v=mvmmjk2c';
import {initGame, gameChip, mountGame, gameInvite, missionPanel, gameOn, openShop, gameIntro, ecoPoints, gamePaused, penalty, gameLevel, setPressure, later} from './game.js?v=mvmmjk2c';
import {story} from './story.js?v=mvmmjk2c';
import * as P from './pressure.js?v=mvmmjk2c';
import {startMissions, stopMissions} from './missions.js?v=mvmmjk2c';
import {challenges} from './challenges.js?v=mvmmjk2c';
import {notaroTour} from './tour-steps.js?v=mvmmjk2c';
import {live, subscribe as onLive, startLive} from './live.js?v=mvmmjk2c';
import {now as NOW} from './clock.js?v=mvmmjk2c';

const app = document.querySelector('#app'), dialog = document.querySelector('#dialog');
const compact = matchMedia('(max-width:760px)');
const calm = matchMedia('(prefers-reduced-motion: reduce)');
const route = () => location.hash.slice(1) || 'home';
let returnFocus, toastTimer, lastRoute = null;

// Stato di interfaccia (non persistito)
const ui = {mail:'m1', mailFilter:'all', call:'c1', chat:'w1', memory:null, category:'all', catalogQuery:'',
 studio:{messages:[], artifact:null, showDoc:true, running:false, uploaded:null},
 otto:[], quote:{type:'prima', price:245000, rendita:1084.56, mortgage:180000}};
let runToken = 0;

// ————— helpers —————
const badge = (s, c='') => `<span class="badge ${c}">${s}</span>`;
const btn = (label, act, c='btn-primary', i='arrow') => `<button class="btn ${c}" data-action="${act}">${label}${i ? icon(i) : ''}</button>`;
const heading = (k, t, p, a='') => `<div class="page-heading"><div><span class="eyebrow">${k}</span><h1>${t}</h1><p>${p}</p></div>${a}</div>`;
const avatar = (id, cls='') => `<span class="mini-avatar ${cls}" title="${esc(D.person(id).name)}">${esc(id)}</span>`;
const pchip = id => id ? `<span class="practice-chip">${icon('folder')}${esc(D.practice(id)?.name || id)}</span>` : '';
const euro = n => new Intl.NumberFormat('it-IT', {style:'currency', currency:'EUR', maximumFractionDigits:0}).format(n);
const today = () => new Intl.DateTimeFormat('it-IT', {weekday:'long', day:'numeric', month:'long', timeZone:'Europe/Rome'}).format(new Date());
const ottoNote = (text, cls='') => `<div class="otto-note ${cls}"><span class="otto-dot">${icon('otto-read')}</span><div><span class="eyebrow">OTTO HA CAPITO</span><p>${rich(text)}</p></div></div>`;
const wait = ms => new Promise(r => setTimeout(r, calm.matches ? Math.min(ms, 60) : ms));
const brand = () => `<span class="brand-symbol"><i></i><i></i><i></i></span><span class="brand-type">CSD <span>Station</span><small>CS NOTARO OS</small></span>`;

function counts() {
 return {
  posta: D.mails.filter(m => !state.handled.includes(m.id)).length,
  centralino: D.calls.filter(c => c.outcome === 'In attesa di conferma').length,
  whatsapp: D.chats.reduce((n, c) => n + (state.sent.includes(c.id) ? 0 : c.unread), 0),
  scadenze: D.deadlines.filter(d => d.state === 'urgent').length,
  antiriciclaggio: D.clients.filter(c => c.flag && c.risk !== 'Da valutare').length
 };
}

// ————— shell —————
function navItem(id, title, ic, extra='') {
 const active = route() === id;
 return `<a href="#${id}" class="nav-item ${active ? 'active' : ''} ${id === 'studio' ? 'nav-core' : ''}" ${active ? 'aria-current="page"' : ''}>${icon(ic)}<span>${title}</span>${extra}</a>`;
}
function shell() {
 const c = counts();
 const navGroups = Object.entries(groups).map(([g, label]) => `<span class="nav-label">${label.toUpperCase()}</span>${modules.filter(m => m.group === g).map(m => navItem(m.id, m.title, m.icon, m.core ? '<small class="ai-mark">AI</small>' : c[m.id] ? `<small class="nav-count">${c[m.id]}</small>` : '')).join('')}`).join('');
 app.innerHTML = `<aside class="sidebar" id="workspace-navigation" aria-label="Navigazione principale">
  <button class="nav-close icon-btn" data-action="sidebar" aria-label="Chiudi navigazione">${icon('close')}</button>
  <a href="#home" class="brand" aria-label="CSD Station, oggi in studio">${brand()}</a>
  <div class="workspace-switch static"><span class="workspace-icon">${icon('book')}</span><span><strong>${esc(D.studio.name)}</strong><small>${esc(D.studio.city)} · studio dimostrativo</small></span></div>
  <nav><div class="nav-group">${navItem('home', 'Oggi in studio', 'home')}${navItem('modules', 'L’ecosistema', 'flow')}</div>${navGroups}</nav>
  <div class="sidebar-bottom"><button class="plan-mini" data-action="otto"><span class="plan-orbit">${icon('otto-happy')}</span><span>Chiedi a Otto<small>Un solo assistente per tutto lo studio</small></span>${icon('chevron')}</button>${navItem('settings', 'Impostazioni', 'settings')}<button class="account" data-action="account"><span class="avatar">${persona.initials}</span><span>${persona.name}<small>Notaio titolare</small></span>${icon('down')}</button></div>
 </aside><div class="mobile-scrim" data-action="sidebar"></div>
 <div class="app-body"><header class="topbar"><div class="breadcrumbs"><button class="icon-btn mobile-toggle" data-action="sidebar" aria-label="Apri navigazione" aria-controls="workspace-navigation" aria-expanded="false">${icon('list')}</button><span>Studio</span>${icon('chevron')}<strong id="crumb"></strong></div>
  <div class="topbar-actions">${gameChip()}<button class="search-trigger" data-action="search" aria-label="Cerca nella Station">${icon('search')}<span>Cerca</span><kbd>⌘ K</kbd></button><button class="ask-otto" data-action="otto">${icon('otto-happy')}<span>Chiedi a Otto</span></button><button class="demo-btn" data-action="tour" aria-label="Demo interattiva" title="Demo interattiva"><i></i><span>Demo interattiva</span></button></div></header>
  <main id="main" tabindex="-1"></main>
  <footer class="app-footer"><span>CSD Station <span class="footer-divider">/</span> Lo studio notarile, tutto collegato.</span><span>Anteprima dimostrativa · persone, pratiche e documenti inventati · nessun servizio collegato</span></footer></div>
 <aside class="otto-drawer" id="otto-drawer" aria-label="Otto, assistente dello studio" hidden></aside><div class="live-stack" id="live-stack" aria-live="polite"></div>`;
 render(); syncNavigation();
}

const pages = {home, modules:catalog, settings, posta, centralino, whatsapp, studio:studioPage, memoria, visure, preventivi, osservatorio, staff, scadenze, antiriciclaggio, compliance};
function render() {
 const id = route(), m = moduleById(id);
 const titles = {home:'Oggi in studio', modules:'L’ecosistema', settings:'Impostazioni'};
 const title = m?.title || titles[id] || 'Pagina non trovata';
 document.querySelector('#crumb').textContent = title;
 document.title = `${title} · CS Notaro OS`;
 const main = document.querySelector('#main');
 main.className = (id === 'studio' ? 'main-studio' : '') + (id !== lastRoute ? ' enter' : '');
 lastRoute = id;
 try {
 main.innerHTML = pages[id] ? pages[id]() : `<div class="empty-state"><span class="empty-icon">${icon('search')}</span><h2>Questo spazio non esiste.</h2><p>Torna a “Oggi in studio”.</p><a class="btn btn-primary" href="#home">Torna a oggi${icon('arrow')}</a></div>`;
 mountGame(id, main);
 // elenchi vivi in riquadri fissi che si scorrono (con la lente quando sono lunghi): la pagina non cambia altezza
 enhancePanels(main, id, ({posta:['.list-pane'], centralino:['.list-pane'], whatsapp:['.list-pane'], scadenze:['.filing-list', '.timeline'], visure:['.visura-list'], compliance:['.audit-scroll']})[id]);
 if (id === 'studio') afterStudioRender();
 } catch (err) {
  // mai una pagina bianca: lo diciamo, e si riparte da uno stato pulito
  console.warn('CS Notaro OS · errore nella sezione', err);
  main.innerHTML = `<div class="empty-state"><span class="empty-icon">${icon('otto-think')}</span><h2>Questa sezione si è inceppata.</h2><p>Il resto dello studio continua a lavorare. Riprova: Otto riparte da uno stato pulito.</p><a class="btn btn-primary" href="#home">Torna a oggi${icon('arrow')}</a></div>`;
 }
}

// ————— OGGI IN STUDIO —————
function home() {
 const c = counts();
 const open = D.tasks.filter(t => !t.done && !state.done.includes(t.id));
 const decisions = [
  {icon:'scan', text:'Rossi / Verdi: subalterno 8 o 6? Perizia e visura dicono 8, la bozza 6.', go:'studio', label:'Apri nello Studio'},
  {icon:'shield', text:'Lumen Tech: il socio Helix Ventures (40%) richiede l’identificazione del titolare effettivo.', go:'antiriciclaggio', label:'Vedi la verifica'}
 ];
 return `${heading(today().toUpperCase(), `${NOW.greet}, Notaio ${persona.last}.`, 'Otto ha già letto ciò che è arrivato. Ecco lo studio di oggi.')}
 <section class="briefing">
  <div class="briefing-copy"><span class="eyebrow"><span class="live-dot"></span> IL PUNTO DI OTTO · AGGIORNATO ALLE ${new Intl.DateTimeFormat('it-IT', {hour:'2-digit', minute:'2-digit', timeZone:'Europe/Rome'}).format(new Date())}</span>
   <h2>${NOW.part === 'mattina' ? 'Stamattina' : 'Oggi'} ho letto <b>${D.mails.length} email</b> e gestito <b>${D.calls.length} chiamate</b>.<br>Ho preparato <b>${D.mails.filter(m => m.draft).length} bozze</b> e distribuito <b>${D.tasks.length} attività</b> nel team.</h2>
   <p>Due decisioni spettano a te. Tutto il resto è pronto da approvare.</p>
   <div class="welcome-actions"><a class="btn btn-primary" href="#posta">Apri la coda di oggi${icon('arrow')}</a><button class="hero-secondary" data-action="otto">Chiedi a Otto ${icon('otto-happy')}</button></div></div>
  <div class="otto-scene small"><div class="scene-orbit orbit-1"></div><div class="scene-floor"></div><div class="hero-otto">${otto('happy')}</div></div>
 </section>
 <section class="decisions"><div class="section-title"><h2>Servono le tue decisioni</h2><span class="subtle-label">Otto non decide al posto tuo</span></div>
  ${decisions.map(d => `<article class="decision"><span class="soft-icon warn">${icon(d.icon)}</span><p>${esc(d.text)}</p><a class="btn btn-secondary" href="#${d.go}">${d.label}${icon('arrow')}</a></article>`).join('')}</section>
 <section class="today-section"><div class="metrics-grid">${[
  ['inbox','Da approvare in posta', c.posta, 'Email lette, con bozza pronta', 'posta'],
  ['calendar','Stipule questa settimana', 2, 'Rossi / Verdi venerdì · Lumen Tech 29/10', 'staff'],
  ['clock','Termini entro 5 giorni', c.scadenze, 'Deposito R.I. e copia esecutiva', 'scadenze'],
  ['phone','Chiamate gestite da Otto', D.calls.length, '1 nuovo cliente, 1 rifiutata per privacy', 'centralino']
 ].map(([i, t, n, s, go]) => `<a class="metric" href="#${go}"><div><span>${t}</span>${icon(i)}</div><strong class="has-value">${n}</strong><small>${s}</small></a>`).join('')}</div></section>
 <section class="home-grid">
  <div class="workspace-panel"><div class="panel-title"><h2>Il team, oggi</h2><a class="text-link" href="#staff">Tutte le attività${icon('arrow')}</a></div>
   <div class="team-today">${D.team.map(p => {const n = open.filter(t => t.who === p.id).length; return `<div class="team-row ${p.present ? '' : 'away'}">${avatar(p.id)}<span><b>${esc(p.name)}</b><small>${esc(p.present ? p.role : p.away)}</small></span><span class="load"><i style="width:${p.load}%"></i></span><span class="task-count">${n} attività</span></div>`;}).join('')}</div></div>
  <div class="workspace-panel"><div class="panel-title"><h2>Pratiche in movimento</h2><a class="text-link" href="#studio">Apri lo Studio${icon('arrow')}</a></div>
   <div class="practice-list">${D.practices.map(p => `<div class="practice-row"><span><b>${esc(p.name)}</b><small>${esc(p.type)} · ${esc(p.stage)}</small></span><span class="progress-track"><i style="width:${p.progress}%"></i></span>${avatar(p.owner)}<span class="stipula">${esc(p.stipula)}</span></div>`).join('')}</div></div>
 </section>
 ${ecosystemMap()}`;
}

function ecosystemMap() {
 return `<section class="ecosystem"><div class="section-title"><div class="inline-title"><h2>Lo studio, tutto collegato</h2><span class="count-tag">12 MODULI · 1 ASSISTENTE</span></div><a class="text-link" href="#modules">L’ecosistema${icon('arrow')}</a></div>
 <div class="eco-flow">${Object.entries(groups).map(([g, label], i) => `<div class="eco-col ${g === 'lavoro' ? 'eco-core' : ''}"><span class="eco-step">0${i + 1}</span><h3>${label}</h3><p>${groupNotes[g]}</p>${modules.filter(m => m.group === g).map(m => `<a href="#${m.id}" class="eco-item ${m.core ? 'core' : ''}">${icon(m.icon)}<span>${m.title}</span></a>`).join('')}</div>`).join('')}</div>
 <div class="eco-otto">${icon('sparkle')}<p><b>Otto vede tutti i moduli.</b> Quando gli chiedi di compilare un documento legge le email, i vecchi atti, le visure e l’agenda prima di scrivere. Anche da WhatsApp.</p></div></section>`;
}

// ————— CATALOGO —————
function catalog() {
 return `${heading('L’ECOSISTEMA', 'Dodici moduli. Un solo studio.', 'Il percorso di ogni pratica: entra, viene lavorata, si organizza, resta sotto controllo.')}
 ${ecosystemMap()}
 <div class="catalog-toolbar"><div class="filter-tabs" aria-label="Aree">${[['all', 'Tutti'], ...Object.entries(groups)].map(([k, v]) => `<button data-category="${k}" aria-pressed="${k === ui.category}" class="${k === ui.category ? 'selected' : ''}">${v}</button>`).join('')}</div><label class="input-search">${icon('search')}<input id="catalog-search" value="${esc(ui.catalogQuery)}" placeholder="Cerca un modulo…" aria-label="Cerca un modulo"></label></div>
 <div id="catalog-results">${catalogResults()}</div>`;
}
function catalogResults() {
 const q = ui.catalogQuery.toLowerCase();
 const list = modules.filter(m => (ui.category === 'all' || m.group === ui.category) && `${m.title} ${m.description} ${m.features.join(' ')}`.toLowerCase().includes(q));
 return list.length ? `<div class="module-grid">${list.map(m => `<a class="module-card ${m.core ? 'core' : ''}" href="#${m.id}"><div class="module-card-top"><span class="module-icon tone-${m.group}">${icon(m.icon)}</span>${badge(m.core ? 'Centro dello studio' : 'Demo', m.core ? 'badge-lime' : '')}</div><h3>${m.title}</h3><p>${m.description}</p><ul class="mini-features">${m.features.map(f => `<li>${icon('check')}${f}</li>`).join('')}</ul><div class="module-card-footer"><span>${groups[m.group]}</span>${icon('arrow')}</div></a>`).join('')}</div>` : `<div class="empty-state"><h2>Nessun modulo trovato.</h2></div>`;
}

// ————— 01 POSTA —————
function posta() {
 const filtered = D.mails.filter(m => ui.mailFilter === 'all' || (ui.mailFilter === 'todo' ? !state.handled.includes(m.id) : state.handled.includes(m.id)));
 const m = D.mails.find(x => x.id === ui.mail) || D.mails[0];
 const queue = D.team.filter(p => p.id !== 'AC').map(p => ({p, n:D.mails.filter(x => x.assignee === p.id && !state.handled.includes(x.id)).length}));
 return `${heading('CIÒ CHE ENTRA · 01', 'Posta & coda pratiche', 'Email e PEC arrivano già lette, collegate alla pratica, con il lavoro pronto da approvare.', `<button class="btn btn-secondary" data-action="toast:In produzione: collegamento IMAP/PEC e Microsoft 365">${icon('link')}Caselle collegate · 2</button>`)}
 ${gameOn() && ui.pressure?.late?.length ? `<div class="alert-banner hot-banner">${icon('alert')}<p><b>${ui.pressure.late.length} ${ui.pressure.late.length === 1 ? 'email aspetta' : 'email aspettano'} risposta da più di ${P.slaText()}</b> · −1 punto al secondo finché restano in ritardo.</p></div>` : ''}
 <div class="queue-strip"><span class="eyebrow">CODA DI OGGI</span>${queue.map(({p, n}) => `<span class="queue-person">${avatar(p.id)}<b>${n}</b> ${esc(p.name.split(' ')[0])}</span>`).join('')}</div>
 <div class="split">
  <section class="list-pane"><div class="filter-tabs small">${[['all', 'Tutte'], ['todo', 'Da approvare'], ['done', 'Gestite']].map(([k, v]) => `<button data-mail-filter="${k}" class="${ui.mailFilter === k ? 'selected' : ''}" aria-pressed="${ui.mailFilter === k}">${v}</button>`).join('')}</div>
   ${filtered.map(x => `<button class="list-item ${x.missionOpen && !x.reading ? 'has-mission' : ''} ${x.id === m.id ? 'active' : ''} ${state.handled.includes(x.id) ? 'handled' : ''}" data-mail="${x.id}"><span class="li-top"><b>${x.missionOpen && !x.reading ? '<span class="mission-flag" title="Serve il tuo controllo">!</span>' : ''}${x.live && Date.now() - x.at < 90000 ? '<span class="new-tag">NUOVA</span>' : ''}${P.mailLate(x, state.handled.includes(x.id)) ? '<span class="new-tag late-tag">IN RITARDO</span>' : ''}${esc(x.from)}</b><small>${x.time}</small></span><span class="li-subject">${esc(x.subject)}</span><span class="li-ai">${x.reading ? '<i class="spinner"></i>Otto la sta leggendo…' : icon('sparkle') + esc(x.understood)}</span><span class="li-meta">${pchip(x.practice)}<span class="prio prio-${x.priority}">${x.priority}</span>${avatar(x.assignee)}</span></button>`).join('') || '<p class="muted pad">Nessuna email in questa vista.</p>'}
  </section>
  <section class="detail-pane">
   <div class="detail-head"><div><span class="eyebrow">${esc(m.kind.toUpperCase())} · ${m.time}</span><h2>${esc(m.subject)}</h2><p class="muted">${esc(m.from)} · ${esc(m.address)}</p></div>${state.handled.includes(m.id) ? badge('Gestita', 'badge-green') : badge('Da approvare', 'badge-amber')}</div>
   <details class="original"><summary>Messaggio originale</summary><p>${esc(m.body)}</p></details>
   ${m.attachments.length ? `<div class="attachments">${m.attachments.map(a => `<span class="file-chip">${icon('clip')}${esc(a)}</span>`).join('')}</div>` : ''}
   ${m.mission && !m.reading ? missionPanel(m.mission) : ''}
   ${m.reading ? `<div class="otto-reading"><i class="spinner"></i><div><b>Otto sta leggendo l’email e gli allegati…</b><span class="skeleton"></span><span class="skeleton short"></span></div></div>` : `${ottoNote(m.understood)}
   ${m.prepared.length ? `<div class="prepared"><span class="eyebrow">HO GIÀ PREPARATO</span>${m.prepared.map(p => `<${p.go ? `button data-action="${p.go.startsWith('studio:') ? p.go : 'go:' + p.go}"` : 'div'} class="prepared-item">${icon(p.icon)}<span>${esc(p.text)}</span>${p.go ? icon('arrow') : icon('check')}</${p.go ? 'button' : 'div'}>`).join('')}</div>` : ''}
   ${m.draft ? `<label class="draft"><span class="eyebrow">BOZZA DI RISPOSTA</span><textarea rows="4">${esc(m.draft)}</textarea></label>` : ''}`}
   ${m.missionOpen ? '' : `<div class="detail-actions">${state.handled.includes(m.id) ? btn('Riapri', `handle:${m.id}`, 'btn-secondary', '') : btn(m.draft ? 'Approva e invia' : 'Approva e archivia', `handle:${m.id}`, 'btn-primary', 'check')}<span class="assign">Assegnata a ${avatar(m.assignee)} ${esc(D.person(m.assignee).name)}</span></div>`}
  </section>
 </div>`;
}

// ————— 02 CENTRALINO —————
// La sala d'attesa (solo nella sfida): si tocca chi è arrivato, poi una sala libera con abbastanza posti.
function lobbyPanel() {
 if (!gameOn()) return '';
 if (ui.guest && !P.lobby.some(p => p.id === ui.guest)) ui.guest = null;
 const sel = P.lobby.find(p => p.id === ui.guest);
 return `<section class="workspace-panel lobby"><div class="panel-title"><h2>${icon('users')} Sala d’attesa</h2>${badge(sel ? (P.rooms.some(r => P.fitsRoom(r, sel)) ? `Scegli una sala con almeno ${sel.n} posti` : `Nessuna sala libera da ${sel.n}: aspetta che finisca un appuntamento`) : 'Accompagna le parti in una sala libera', sel ? (P.rooms.some(r => P.fitsRoom(r, sel)) ? 'badge-lime' : 'badge-amber') : '')}</div>
  <div class="lobby-grid"><div class="lobby-queue">${P.lobby.length ? P.lobby.map(p => `<button class="lb-guest ${ui.guest === p.id ? 'on' : ''} ${P.lobbyRed(p) ? 'red' : ''}" data-guest="${p.id}"><b>${esc(p.who)}</b>${p.tag ? `<em class="lb-tag">${esc(p.tag)}</em>` : ''}<small>${esc(p.act)} · <strong>${p.n} persone</strong> (${esc(p.note)})</small><em>arrivati alle ${p.time} · aspettano da <span data-guest-wait="${p.id}">${Math.floor(P.lobbyWait(p))}</span> s</em><i data-guest-bar="${p.id}" style="width:${Math.min(100, P.lobbyWait(p) / P.lobbyLeave() * 100)}%"></i></button>`).join('') : '<p class="muted lb-empty">Nessuno in attesa. Quando arrivano le parti di un appuntamento, toccale e scegli la sala.</p>'}</div>
  <div class="lobby-rooms ${sel ? 'seating' : ''}">${P.rooms.map(r => `<button class="lb-room ${r.with ? 'busy' : ''} ${sel ? (P.fitsRoom(r, sel) ? 'fit' : 'nofit') : ''}" data-room="${r.id}"><b>${esc(r.name)}</b><small>${r.seats} posti</small><em>${r.with ? `${esc(r.with.act)} · libera tra <span data-room-left="${r.id}">${P.roomLeft(r)}</span> s` : 'Libera'}</em></button>`).join('')}</div></div></section>`;
}
function centralino() {
 const c = D.calls.find(x => x.id === ui.call) || D.calls[0];
 return `${heading('CIÒ CHE ENTRA · 02', 'Centralino & segreteria', 'Otto risponde al telefono, raccoglie le richieste dei nuovi clienti e dà le prime informazioni.', `<span class="live-pill"><i></i>Assistente attivo · 24/7</span>`)}
 <div class="metrics-grid three-up">${[['phone', 'Chiamate oggi', D.calls.length], ['users', 'Nuovi clienti', 1], ['calendar', 'Appuntamenti proposti', 2], ['lock', 'Richieste rifiutate per privacy', 1]].map(([i, t, n]) => `<article class="metric"><div><span>${t}</span>${icon(i)}</div><strong class="has-value">${n}</strong></article>`).join('')}</div>
 ${lobbyPanel()}
 <div class="split">
  <section class="list-pane">${D.calls.map(x => `<button class="list-item ${x.missionOpen ? 'has-mission' : ''} ${x.id === c.id ? 'active' : ''}" data-call="${x.id}"><span class="li-top"><b>${x.missionOpen ? '<span class="mission-flag" title="Serve il tuo aiuto">!</span>' : ''}${esc(x.caller)}</b><small>${x.time} · ${x.duration}</small></span><span class="li-subject">${esc(x.intent)}</span><span class="li-meta">${badge(esc(x.kind))}${x.live ? '<span class="badge badge-red"><span class="live-dot red"></span> In corso</span>' : badge(esc(x.outcome), x.outcome === 'Rifiutata' ? 'badge-red' : x.outcome.includes('attesa') ? 'badge-amber' : 'badge-green')}</span></button>`).join('')}</section>
  <section class="detail-pane">
   <div class="detail-head"><div><span class="eyebrow">CHIAMATA · ${c.time} · ${c.duration}</span><h2>${esc(c.caller)}</h2><p class="muted">${esc(c.number)} · ${esc(c.kind)}</p></div>${badge(esc(c.outcome))}</div>
   ${c.mission ? missionPanel(c.mission) : `<div class="transcript">${c.lines ? c.lines.slice(0, c.shown ?? c.lines.length).map(([who, text]) => `<div class="bubble ${who === 'agent' ? 'agent' : 'caller'} row-in"><small>${who === 'agent' ? icon('sparkle') + ' Otto' : esc(c.caller)}</small>${esc(text)}</div>`).join('') + (c.live ? '<div class="bubble typing"><i></i><i></i><i></i></div>' : '') : `<div class="bubble caller"><small>${esc(c.caller)}</small>${esc(c.summary)}</div><div class="bubble agent"><small>${icon('sparkle')} Otto</small>${esc(c.reply)}</div>`}</div>`}
   ${c.actions.length ? `<div class="prepared"><span class="eyebrow">DOPO LA CHIAMATA</span>${c.actions.map(a => `<div class="prepared-item">${icon('check')}<span>${esc(a)}</span></div>`).join('')}</div>` : ''}
   <div class="detail-actions">${btn('Richiama', 'toast:In produzione: chiamata dal centralino VoIP', 'btn-secondary', 'phone')}${c.id === 'c1' ? btn('Apri il preventivo', 'go:preventivi') : ''}</div>
  </section>
 </div>
 <section class="workspace-panel rules"><div class="panel-title"><h2>Come risponde Otto</h2>${badge('Regole dello studio')}</div><div class="rule-grid">${[
  ['Nuovi clienti', 'Raccoglie richiesta, tipo di atto e recapiti. Invia documenti necessari e stima dei costi.'],
  ['Clienti con pratica aperta', 'Dà lo stato della pratica solo se il numero è tra i contatti verificati.'],
  ['Informazioni su terzi', 'Mai. Invita a scrivere allo studio e registra la richiesta.'],
  ['Urgenze', 'Trasferisce alla segreteria o al notaio di turno.']].map(([t, d]) => `<div class="rule"><b>${t}</b><p>${d}</p></div>`).join('')}</div></section>`;
}

// ————— 03 WHATSAPP —————
function whatsapp() {
 const c = D.chats.find(x => x.id === ui.chat) || D.chats[0];
 const sent = state.sent.includes(c.id);
 return `${heading('CIÒ CHE ENTRA · 03', 'WhatsApp & notifiche', 'Le pratiche già in corso: clienti e banche ricevono aggiornamenti senza telefonare allo studio.')}
 <div class="split chat-split">
  <section class="list-pane">${D.chats.map(x => `<button class="list-item ${x.missionOpen ? 'has-mission' : ''} ${x.id === c.id ? 'active' : ''}" data-chat="${x.id}"><span class="li-top"><b>${x.missionOpen ? '<span class="mission-flag" title="Serve il tuo aiuto">!</span>' : ''}${esc(x.who)}</b><small>${x.last}</small></span><span class="li-subject">${esc(x.messages.at(-1).text)}</span><span class="li-meta">${pchip(x.practice)}${badge(x.channel)}${x.unread && !state.sent.includes(x.id) ? `<span class="unread">${x.unread}</span>` : ''}</span></button>`).join('')}</section>
  <section class="detail-pane phone-pane">
   <div class="detail-head"><div><span class="eyebrow">${esc(c.channel.toUpperCase())}</span><h2>${esc(c.who)}</h2></div>${pchip(c.practice)}</div>
   <div class="wa-thread">${c.messages.map(msg => `<div class="wa ${msg.from}">${esc(msg.text)}</div>`).join('')}${sent ? `<div class="wa bot">${esc(c.draft)}</div>` : ''}</div>
   ${c.mission ? missionPanel(c.mission) : ''}
   ${c.thinking ? `<div class="wa-draft"><span class="eyebrow">${icon('otto-think')} OTTO STA SCRIVENDO</span><div class="bubble typing"><i></i><i></i><i></i></div></div>` : ''}
   ${c.draft && !sent && !c.mission ? `<div class="wa-draft"><span class="eyebrow">${icon('otto-wink')} RISPOSTA PROPOSTA DA OTTO</span><p>${esc(c.draft)}</p><div class="detail-actions">${btn('Invia', `send:${c.id}`, 'btn-primary', 'send')}${btn('Modifica', 'toast:Modifica della bozza disponibile con il backend', 'btn-secondary', '')}</div></div>` : ''}
  </section>
 </div>
 <section class="workspace-panel rules"><div class="panel-title"><h2>Notifiche automatiche</h2>${badge('Inviate solo a contatti con consenso')}</div>
  <div class="toggle-list">${D.notificationRules.map((r, i) => {const on = state.rules['n' + i] ?? r.on; return `<label class="toggle-row"><span><b>${esc(r.event)}</b><small>${esc(r.to)}</small></span><input type="checkbox" data-rule="n${i}" ${on ? 'checked' : ''}><i class="switch"></i></label>`;}).join('')}</div></section>`;
}

// ————— 04 LO STUDIO —————
function studioPage() {
 const s = ui.studio;
 return `<div class="studio ${s.showDoc ? 'with-doc' : 'no-doc'}">
  <section class="studio-chat">
   <header class="studio-bar"><div class="studio-title"><span class="studio-mark">${icon('otto-read')}</span><div><h1>Lo Studio</h1><small>Otto lavora con tutto l’archivio dello studio</small></div></div>
    <div class="studio-tools"><label class="practice-select">${icon('folder')}<select id="studio-practice" aria-label="Pratica">${D.practices.map(p => `<option value="${p.id}">${esc(p.name)} · ${esc(p.type)}</option>`).join('')}</select></label>
    <button class="icon-btn doc-toggle" data-action="toggle-doc" aria-pressed="${s.showDoc}" title="${s.showDoc ? 'Nascondi il documento' : 'Mostra il documento'}">${icon('eye')}</button>
    <button class="icon-btn" data-action="studio-new" title="Nuova conversazione">${icon('plus')}</button></div></header>
   <div class="studio-context">${['Email della pratica · 9', 'Atti in archivio · 12.480', 'Visure · 3', 'Clausolario · 1.240', 'Agenda'].map(x => `<span>${icon('check')}${x}</span>`).join('')}</div>
   <div class="studio-messages" id="studio-messages">${studioMessages()}</div>
   <div data-anchor="studio" class="studio-anchor"></div>
   <form class="studio-composer" id="studio-form">
    <div class="suggestion-row" ${s.messages.length ? '' : 'hidden'}>${studioSuggestions.map(x => `<button type="button" data-studio="${x.id}">${esc(x.label)}</button>`).join('')}</div>
    <div class="composer-box"><label class="attach" title="Carica un PDF">${icon('clip')}<input type="file" id="studio-file" accept="application/pdf" hidden><span class="sr-only">Carica un documento</span></label>
     <textarea id="studio-input" rows="1" maxlength="1500" placeholder="${compact.matches ? 'Chiedi a Otto…' : 'Chiedi a Otto di compilare, confrontare, redigere o cercare…'}" aria-label="Richiesta per Otto"></textarea>
     <button class="send-btn" type="submit" aria-label="Invia">${icon('send')}</button></div>
    <small class="composer-note">Otto prepara, tu approvi. Ogni dato riporta la sua fonte.</small>
   </form>
  </section>
  <section class="studio-doc" id="studio-doc" aria-label="Documento">${studioDoc()}</section>
 </div>`;
}
function studioMessages() {
 const msgs = ui.studio.messages;
 if (!msgs.length) return `<div class="studio-welcome"><div class="welcome-otto">${otto('happy')}</div><h2>Di cosa ti occupi oggi?</h2><p>Otto conosce le pratiche, la posta, i vecchi atti e il clausolario. Chiedigli un documento: prima cerca, poi scrive.</p><div class="welcome-cards">${studioSuggestions.map(x => `<button data-studio="${x.id}"><span>${icon({erogazione:'file', confronto:'scan', bozza:'book', ricerca:'search'}[x.id])}</span><b>${esc(x.label)}</b>${icon('arrow')}</button>`).join('')}</div></div>`;
 return msgs.map(m => m.role === 'user'
  ? `<div class="msg-user">${m.file ? `<span class="file-chip">${icon('file')}${esc(m.file)}</span>` : ''}${m.text ? `<p>${esc(m.text)}</p>` : ''}</div>`
  : `<div class="msg-agent"><span class="agent-name">${icon('sparkle')} Otto</span>
     <ol class="agent-steps">${m.steps.slice(0, m.shown).map((st, i) => `<li class="${i < m.shown - 1 || m.done ? 'done' : 'doing'}">${i < m.shown - 1 || m.done ? icon('check') : '<i class="spinner"></i>'}${esc(st)}</li>`).join('')}</ol>
     ${m.done ? `<p class="agent-reply">${rich(m.reply)}</p>${m.actions?.length ? `<div class="agent-actions">${m.actions.map(a => `<button class="btn btn-secondary" data-action="${esc(a.act)}">${a.icon ? icon(a.icon) : ''}${esc(a.label)}</button>`).join('')}</div>` : ''}${m.artifact && !ui.studio.showDoc ? `<button class="text-link" data-action="toggle-doc">Mostra il documento${icon('arrow')}</button>` : ''}` : ''}</div>`).join('');
}
function studioDoc() {
 const a = ui.studio.artifact;
 if (!a) return `<div class="doc-empty"><span class="doc-paper"><i></i><i></i><i></i><i></i></span><h3>Il documento compare qui</h3><p>Mentre Otto lavora vedi il modulo compilarsi, le differenze emergere o la bozza prendere forma. Puoi anche caricare un PDF con il fermaglio.</p></div>`;
 const head = `<header class="doc-head"><div><span class="eyebrow">${{form:'MODULO', diff:'CONFRONTO', draft:'BOZZA D’ATTO', results:'RICERCA', file:'DOCUMENTO CARICATO'}[a.type]}</span><h2>${esc(a.title)}</h2></div><button class="icon-btn" data-action="toggle-doc" aria-label="Chiudi il documento">${icon('close')}</button></header>`;
 if (a.type === 'form') {
  const filled = a.filled ?? a.fields.length;
  const done = a.fields.slice(0, filled);
  const ok = done.filter(f => f.value && !f.warn).length, warn = done.filter(f => f.warn).length, miss = done.filter(f => f.missing).length;
  return `${head}<div class="doc-summary">${badge(`${ok} compilati`, 'badge-green')}${warn ? badge(`${warn} da verificare`, 'badge-amber') : ''}${miss ? badge(`${miss} ${miss === 1 ? 'mancante' : 'mancanti'}`, 'badge-red') : ''}${a.file ? `<span class="file-chip">${icon('file')}${esc(a.file)}</span>` : ''}</div>
  <div class="doc-sheet form-sheet">${a.fields.map((f, i) => `<div class="ff ${i < filled ? (f.missing ? 'missing' : f.warn ? 'warn' : 'filled') : 'pending'} ${i === filled - 1 && filled < a.fields.length ? 'typing just' : ''}"><label>${esc(f.label)}</label><div class="ff-value">${i < filled ? (f.value ? esc(f.value) : '<em>—</em>') : ''}</div>${i < filled ? `<small>${f.missing ? icon('alert') + esc(f.missing) : f.warn ? icon('alert') + esc(f.warn) + ' · ' + esc(f.source) : f.source ? icon('link') + esc(f.source) : ''}</small>` : ''}</div>`).join('')}</div>
  ${filled >= a.fields.length ? `<div class="doc-foot">${btn('Scarica PDF compilato', 'download-form', 'btn-primary', 'download')}<span class="muted">Copia da revisionare. L’originale non viene modificato.</span></div>` : ''}`;
 }
 if (a.type === 'diff') return `${head}<div class="doc-summary">${badge(`${a.rows.filter(r => r[3] === 'ok').length} coincidono`, 'badge-green')}${badge(`${a.rows.filter(r => r[3] === 'ko').length} differenze`, 'badge-amber')}</div><div class="doc-sheet"><div class="diff-table"><div class="diff-row diff-head"><span>Punto</span><span>Prima</span><span>Dopo</span></div>${a.rows.slice(0, a.filled ?? a.rows.length).map(r => `<div class="diff-row ${r[3]}"><span><b>${esc(r[0])}</b></span><span>${esc(r[1])}</span><span>${esc(r[2])}</span>${r[4] ? `<small>${icon('sparkle')}${esc(r[4])}</small>` : ''}</div>`).join('')}</div></div>`;
 if (a.type === 'draft') return `${head}<div class="doc-sheet draft-sheet"><p class="deed-title">REPUBBLICA ITALIANA</p>${a.clauses.slice(0, a.filled ?? a.clauses.length).map(c => `<div class="clause ${c.decide ? 'decide' : ''}"><h4>${esc(c.head)}</h4><p>${esc(c.text)}</p><small>${icon('book')}${esc(c.source)}</small>${c.decide ? `<div class="decide-box">${icon('alert')}${esc(c.decide)}</div>` : ''}</div>`).join('')}</div>`;
 if (a.type === 'results') return `${head}<div class="doc-sheet">${a.items.slice(0, a.filled ?? a.items.length).map(r => `<div class="result-row"><div><b>${esc(r[0])}</b><p>${esc(r[1])}</p></div>${badge(esc(r[2]), 'badge-green')}</div>`).join('')}</div>`;
 if (a.type === 'file') return `${head}<div class="doc-sheet"><div class="file-info">${icon('file')}<div><b>${esc(a.file)}</b><p>${a.pages} ${a.pages === 1 ? 'pagina' : 'pagine'} · nessun campo compilabile</p></div></div><p class="muted">In produzione Otto legge anche i PDF senza campi (scansioni e moduli statici) con OCR e posiziona il testo da solo.</p></div>`;
 return head;
}
function refreshStudio(scroll=true) {
 const box = document.querySelector('#studio-messages'), doc = document.querySelector('#studio-doc');
 if (!box) return;
 box.innerHTML = studioMessages(); if (doc) doc.innerHTML = studioDoc();
 const chips = document.querySelector('.suggestion-row'); if (chips) chips.hidden = !ui.studio.messages.length;
 const st = document.querySelector('.studio'); st?.classList.toggle('with-doc', ui.studio.showDoc); st?.classList.toggle('no-doc', !ui.studio.showDoc);
 if (scroll) box.scrollTop = box.scrollHeight;
}
function afterStudioRender() {
 const sel = document.querySelector('#studio-practice'); if (sel) sel.value = ui.studio.practice || 'P-184';
 const box = document.querySelector('#studio-messages'); if (box) box.scrollTop = box.scrollHeight;
 if (ui.studio.pending) { const {prompt, id} = ui.studio.pending; ui.studio.pending = null; runStudio(prompt, id); }
}
// Interrompe un lavoro in corso (cambio pagina, nuova conversazione) lasciando il risultato completo.
function stopRun() {
 runToken++;
 if (!ui.studio.running) return;
 ui.studio.running = false;
 const m = ui.studio.messages.at(-1);
 if (m?.role === 'agent' && !m.done) { m.shown = m.steps.length; m.done = true; if (!m.reply) m.reply = 'Lavoro interrotto.'; }
 if (ui.studio.artifact) delete ui.studio.artifact.filled;
}
async function runStudio(text, scenarioId) {
 if (ui.studio.running) return;
 const token = ++runToken; ui.studio.running = true;
 const sc = studioScenario(scenarioId || text);
 ui.studio.messages.push({role:'user', text});
 const msg = {role:'agent', steps:sc.steps, shown:0, reply:sc.reply, artifact:sc.artifact, actions:sc.actions, done:false};
 ui.studio.messages.push(msg);
 if (sc.artifact) { ui.studio.artifact = {...sc.artifact, filled:0}; if (compact.matches) ui.studio.showDoc = false; }
 refreshStudio();
 for (let i = 1; i <= sc.steps.length; i++) { await wait(650); if (token !== runToken) return; msg.shown = i; refreshStudio(); }
 await wait(500); if (token !== runToken) return;
 if (sc.artifact) {
  const total = (sc.artifact.fields || sc.artifact.rows || sc.artifact.clauses || sc.artifact.items || []).length;
  for (let i = 1; i <= total; i++) { ui.studio.artifact.filled = i; document.querySelector('#studio-doc').innerHTML = studioDoc(); await wait(sc.artifact.type === 'draft' ? 420 : 260); if (token !== runToken) return; }
 }
 msg.done = true; ui.studio.running = false; refreshStudio();
}
async function uploadToStudio(file) {
 if (ui.studio.running) return;
 const token = ++runToken; ui.studio.running = true;
 ui.studio.messages.push({role:'user', text:'', file:file.name});
 const msg = {role:'agent', steps:['Apro il documento', 'Cerco i campi compilabili', 'Abbino i campi ai dati della pratica Rossi / Verdi'], shown:1, reply:'', actions:[], done:false};
 ui.studio.messages.push(msg); refreshStudio();
 try {
  if (file.size > 20 * 1024 * 1024) throw Error('Il file supera 20 MB.');
  const bytes = new Uint8Array(await file.arrayBuffer());
  const info = await inspect(bytes);
  await wait(500); if (token !== runToken) return; msg.shown = 2; refreshStudio();
  const fields = info.fields.filter(f => f.type === 'text' && !f.readOnly);
  await wait(500); if (token !== runToken) return; msg.shown = 3; refreshStudio();
  if (!fields.length) {
   ui.studio.artifact = {type:'file', title:file.name, file:file.name, pages:info.pages.length};
   msg.reply = `È un PDF di **${info.pages.length} ${info.pages.length === 1 ? 'pagina' : 'pagine'}** senza campi compilabili. In questa anteprima compilo solo moduli con campi; la lettura visiva delle scansioni arriva con il servizio AI.`;
  } else {
   const values = proposeValues(fields);
   ui.studio.uploaded = {bytes, values, name:file.name};
   ui.studio.artifact = {type:'form', title:file.name, file:file.name, upload:true, filled:0, fields:fields.slice(0, 40).map(f => values[f.name] ? {label:f.name, value:values[f.name], source:'Dati verificati della pratica P-184'} : {label:f.name, value:'', source:'', missing:'Nessun dato corrispondente nella pratica'})};
   for (let i = 1; i <= ui.studio.artifact.fields.length; i++) { ui.studio.artifact.filled = i; document.querySelector('#studio-doc').innerHTML = studioDoc(); await wait(160); if (token !== runToken) return; }
   const n = Object.keys(values).length;
   msg.reply = `Ho trovato **${fields.length} campi** e ne ho compilati **${n}** con i dati della pratica. ${n < fields.length ? 'Gli altri restano vuoti: non invento valori che non trovo nei documenti.' : ''}`;
   msg.actions = [{label:'Scarica PDF compilato', act:'download-form', icon:'download'}];
  }
 } catch (err) {
  msg.reply = `Non riesco a lavorare su questo file: ${err.message}`;
 }
 msg.shown = msg.steps.length; msg.done = true; ui.studio.running = false; refreshStudio();
}
async function downloadForm() {
 const a = ui.studio.artifact; if (!a || a.type !== 'form') return;
 try {
  let bytes;
  if (a.upload && ui.studio.uploaded) bytes = await fillNative(ui.studio.uploaded.bytes, ui.studio.uploaded.values);
  else { const base = await formPdf(a.title, a.fields.map(f => f.label)); bytes = await fillNative(base, Object.fromEntries(a.fields.filter(f => f.value).map(f => [f.label, f.value]))); }
  download(bytes, (a.file || 'modulo.pdf').replace(/\.pdf$/i, '') + '_compilato.pdf', 'application/pdf');
  toast('PDF compilato scaricato. È una copia da revisionare.');
 } catch (err) { toast('Download non riuscito: ' + err.message); }
}
function download(data, name, type) {
 const url = URL.createObjectURL(new Blob([data], {type}));
 const a = Object.assign(document.createElement('a'), {href:url, download:name}); document.body.append(a); a.click(); a.remove();
 setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ————— 05 MEMORIA —————
function memoria() {
 const r = ui.memory;
 return `${heading('IL LAVORO · 05', 'Memoria dello studio', 'Domande veloci su tutto l’archivio, senza aprire una pratica. Ogni risposta indica da dove arriva.')}
 <section class="memory-hero"><form id="memory-form" class="memory-ask">${icon('search')}<input id="memory-input" placeholder="Chiedi all’archivio dello studio…" aria-label="Domanda all’archivio" autocomplete="off" value="${esc(r?.q || '')}"><button class="btn btn-primary" type="submit">Chiedi${icon('arrow')}</button></form>
  <div class="suggestions">${D.memoryQA.map(x => `<button data-memory="${esc(x.q)}">${esc(x.q)}</button>`).join('')}</div></section>
 ${r ? `<section class="workspace-panel answer">${r.a ? `<span class="agent-name">${icon('otto-read')} Otto · dall’archivio</span><p class="answer-text">${esc(r.a)}</p><div class="citations">${r.sources.map(([s, where]) => `<button class="citation-chip" data-action="toast:In produzione si apre il documento al punto citato">${icon('file')}<b>${esc(s)}</b><small>${esc(where)}</small></button>`).join('')}</div>` : `<p class="answer-text">Non ho trovato nulla di pertinente nell’archivio dimostrativo. Prova una delle domande suggerite.</p>`}</section>` : ''}
 <div data-anchor="memoria"></div>
 <div class="metrics-grid">${D.memoryIndex.map(([t, n]) => `<article class="metric"><div><span>${t}</span>${icon('database')}</div><strong class="has-value">${n}</strong><small>Indicizzati · archivio dimostrativo</small></article>`).join('')}</div>
 <div class="notice">${icon('info')}<p>La Memoria risponde in pochi secondi su domande puntuali. Per lavorare su un documento usa <a href="#studio">Lo Studio</a>, dove Otto può anche scrivere.</p></div>`;
}

// ————— 06 VISURE —————
function visure() {
 return `${heading('IL LAVORO · 06', 'Visure & Public Gateway', 'Le richieste partono dai dati della pratica. Otto legge gli esiti e segnala ciò che non torna.', btn('Nuova richiesta', 'toast:Seleziona un registro qui sotto', 'btn-primary', 'plus'))}
 <div class="block-head"><h2>Registri collegati</h2><small>Tocca un registro: la richiesta parte già compilata dalla pratica</small></div>
 <div class="registry-grid">${D.registries.map(r => `<button class="registry" data-action="toast:Richiesta a ${esc(r.name)} preparata dai dati della pratica (demo)"><span class="soft-icon">${icon(r.icon)}</span><span><b>${esc(r.name)}</b><small>${esc(r.note)}</small></span>${icon('plus')}</button>`).join('')}</div>
 <section class="workspace-panel"><div class="panel-title"><h2>Richieste recenti</h2>${badge(`${D.visure.filter(v => v.status !== 'Completata').length} in lavorazione`)}</div><div data-anchor="visure" class="anchor-pad"></div>
  <div class="visura-list">${D.visure.map(v => `<article class="visura"><div class="visura-head"><span><small>${esc(v.registry)} · ${v.time}</small><b>${esc(v.what)}</b></span>${pchip(v.practice)}${badge(v.status, v.status === 'Completata' ? 'badge-green' : 'badge-amber')}</div>${v.finding ? ottoNote(v.finding, v.level) : `<p class="muted pad-s">${icon('clock')} In attesa dell’esito dal registro.</p>`}</article>`).join('')}</div></section>
 <div class="notice">${icon('info')}<p>Interfaccia di anteprima. I collegamenti ai registri pubblici richiedono i canali e le credenziali dello studio e saranno attivati nel backend.</p></div>`;
}

// ————— 07 PREVENTIVI —————
function quote() {
 const q = ui.quote, price = +q.price || 0, rendita = +q.rendita || 0, mortgage = +q.mortgage || 0;
 const rows = [];
 if (q.type === 'impresa') {
  rows.push(['IVA 4% (prima casa, da impresa)', price * .04], ['Imposta di registro (fissa)', 200], ['Imposta ipotecaria (fissa)', 200], ['Imposta catastale (fissa)', 200]);
 } else {
  const prima = q.type === 'prima';
  const base = rendita * 1.05 * (prima ? 110 : 120);
  rows.push([`Imposta di registro ${prima ? '2%' : '9%'} sul valore catastale (${euro(base)})`, Math.max(1000, base * (prima ? .02 : .09))], ['Imposta ipotecaria', 50], ['Imposta catastale', 50]);
 }
 if (mortgage > 0) rows.push([`Imposta sostitutiva mutuo ${q.type === 'seconda' ? '2%' : '0,25%'}`, mortgage * (q.type === 'seconda' ? .02 : .0025)]);
 const taxes = rows.reduce((n, r) => n + r[1], 0);
 const fee = 1400 + Math.max(0, price - 100000) * .003 + (mortgage > 0 ? 900 : 0);
 return {rows, taxes, fee, vat:fee * .22, total:taxes + fee * 1.22 + 250};
}
function quoteResult() {
 const r = quote();
 return `<div class="quote-lines">${r.rows.map(([t, v]) => `<div><span>${esc(t)}</span><b>${euro(v)}</b></div>`).join('')}<div class="sub"><span>Imposte</span><b>${euro(r.taxes)}</b></div><div><span>Onorario (tariffario dello studio · esempio)</span><b>${euro(r.fee)}</b></div><div><span>IVA 22% sull’onorario</span><b>${euro(r.vat)}</b></div><div><span>Spese di visure, archivio e copie</span><b>${euro(250)}</b></div></div><div class="quote-total"><span>Totale stimato</span><strong>${euro(r.total)}</strong></div>`;
}
function preventivi() {
 const q = ui.quote;
 return `${heading('LO STUDIO · 07', 'Preventivi & imposte', 'Una stima chiara in pochi secondi, dagli stessi dati che arrivano da posta e centralino.')}
 <div class="quote-layout">
  <section class="workspace-panel"><div data-anchor="preventivi" class="anchor-pad"></div><div class="panel-title"><h2>Compravendita di abitazione</h2>${badge('Laura Bianchi · dalla chiamata delle 09:12')}</div>
   <form class="quote-form" id="quote-form">
    <label class="field"><span>Tipo di acquisto</span><select name="type"><option value="prima" ${q.type === 'prima' ? 'selected' : ''}>Prima casa da privato</option><option value="seconda" ${q.type === 'seconda' ? 'selected' : ''}>Seconda casa da privato</option><option value="impresa" ${q.type === 'impresa' ? 'selected' : ''}>Prima casa da impresa (con IVA)</option></select></label>
    <label class="field"><span>Prezzo (€)</span><input name="price" type="number" min="0" step="1000" value="${q.price}"></label>
    <label class="field"><span>Rendita catastale (€)</span><input name="rendita" type="number" min="0" step="0.01" value="${q.rendita}"></label>
    <label class="field"><span>Importo del mutuo (€)</span><input name="mortgage" type="number" min="0" step="1000" value="${q.mortgage}"></label>
   </form>
   <div id="quote-result">${quoteResult()}</div>
   <div class="detail-actions">${btn('Invia il preventivo al cliente', 'toast:Preventivo pronto: in produzione parte via email o WhatsApp dopo la tua approvazione', 'btn-primary', 'send')}${btn('Salva', 'toast:Preventivo salvato nella pratica P-199', 'btn-secondary', '')}</div>
   <p class="fineprint">Stima indicativa con regole semplificate. Il calcolo definitivo resta del notaio.</p></section>
  <aside class="module-side"><div class="workspace-panel"><div class="panel-title"><h2>Preventivi recenti</h2></div>${[['Laura Bianchi', 'Prima casa · Scandicci', 'Bozza'], ['Marco Bellandi', 'Costituzione S.r.l.', 'Bozza'], ['Lumen Tech S.r.l.', 'Costituzione S.r.l.', 'Accettato'], ['Famiglia Sarti', 'Donazione immobile', 'Inviato']].map(([n, t, s]) => `<div class="mini-row"><span><b>${n}</b><small>${t}</small></span>${badge(s, s === 'Accettato' ? 'badge-green' : '')}</div>`).join('')}</div>
   <a class="integration-note" href="#osservatorio">${icon('radar')}<div><strong>Tariffario e aliquote aggiornati</strong><p>L’Osservatorio segnala quando una novità cambia un calcolo.</p></div></a></aside>
 </div>`;
}

// ————— 08 OSSERVATORIO —————
function osservatorio() {
 const touched = new Set(D.updates.flatMap(u => u.practices)).size;
 return `${heading('LO STUDIO · 08', 'Osservatorio normativo & bandi', 'Otto legge le fonti pubbliche ogni giorno e ti dice cosa cambia per le pratiche aperte.')}
 <div class="metrics-grid">${[['radar', 'Novità questa settimana', D.updates.length], ['folder', 'Pratiche toccate', touched], ['alert', 'Da applicare prima della firma', D.updates.filter(u => u.practices.length).length], ['coins', 'Bandi compatibili', D.updates.filter(u => u.kind === 'Bando').length]].map(([i, t, n]) => `<article class="metric"><div><span>${t}</span>${icon(i)}</div><strong class="has-value">${n}</strong></article>`).join('')}</div>
 <div class="quote-layout">
  <section class="feed"><div data-anchor="osservatorio"></div>${D.updates.map(u => `<article class="update"><div class="update-top">${badge(esc(u.tag), u.tag === 'Bando' ? 'badge-lime' : '')}<small>${esc(u.source)} · ${esc(u.kind)} · ${esc(u.date)}</small>${u.deadline ? badge('Scadenza ' + u.deadline, 'badge-amber') : ''}</div><h3>${esc(u.title)}</h3>${ottoNote(u.impact)}<div class="update-foot">${u.practices.map(pchip).join('')}<span class="spacer"></span>${btn('Avvisa il team', 'toast:Nota inviata ai responsabili delle pratiche coinvolte', 'btn-secondary', 'users')}</div></article>`).join('')}</section>
  <aside class="module-side"><div class="workspace-panel"><div class="panel-title"><h2>Fonti monitorate</h2></div>${['Gazzetta Ufficiale', 'Agenzia delle Entrate · prassi', 'Consiglio Nazionale del Notariato', 'Corte di Cassazione', 'Bandi regionali e nazionali', 'Registro Imprese'].map(s => `<div class="mini-row"><span>${esc(s)}</span>${icon('check')}</div>`).join('')}</div>
   <div class="notice">${icon('info')}<p>Gli elementi mostrati sono <b>esempi illustrativi</b>, non provvedimenti reali.</p></div></aside>
 </div>`;
}

// ————— 09 STAFF —————
function staff() {
 const isDone = t => t.done ? !state.done.includes(t.id) : state.done.includes(t.id);
 return `${heading('LO STUDIO · 09', 'Staff & task', 'Otto assegna il lavoro in base a pratica, competenze e carico. Tu decidi le priorità.')}
 <div data-anchor="staff"></div>
 <div class="block-head"><h2>Il team, oggi</h2><small>Le attività di ognuno, con il motivo per cui Otto le ha create</small></div>
 <div class="board">${D.team.map(p => {const list = D.tasks.filter(t => t.who === p.id); return `<section class="board-col ${p.present ? '' : 'away'}"><header>${avatar(p.id)}<span><b>${esc(p.name)}</b><small>${esc(p.present ? p.role : p.away)}</small></span></header><div class="load"><i style="width:${p.load}%"></i></div>${list.map(t => `<label class="task ${isDone(t) ? 'done' : ''}"><input type="checkbox" data-task="${t.id}" ${isDone(t) ? 'checked' : ''}><span><b>${esc(t.text)}</b><small>${t.practice ? esc(D.practice(t.practice).name) + ' · ' : ''}${esc(t.due)}${t.by === 'Otto' ? ` · ${icon('sparkle')} ${esc(t.reason)}` : ` · da ${esc(t.by)}`}</small></span></label>`).join('') || '<p class="muted pad-s">Nessuna attività.</p>'}${!p.present ? `<button class="btn btn-secondary small-btn" data-action="toast:Attività di Paolo riassegnate a Giulia e Sara (demo)">Riassegna${icon('arrow')}</button>` : ''}</section>`;}).join('')}</div>
 <section class="workspace-panel"><div class="panel-title"><h2>Workflow dello studio</h2>${badge('Ogni pratica segue il suo')}</div><div class="table-scroll"><table class="data-table"><thead><tr><th>Tipo di pratica</th><th>Passaggi</th><th>Durata media</th><th>Pratiche attive</th></tr></thead><tbody>${D.workflows.map(w => `<tr><td><b>${esc(w.name)}</b></td><td>${w.steps}</td><td>${esc(w.avg)}</td><td>${w.active}</td></tr>`).join('')}</tbody></table></div></section>`;
}

// ————— 10 SCADENZE —————
// Il "fornello" dello studio: adempimenti con capienza, tempo di lavoro e scadenza di legge.
function filingsPanel() {
 // nella sfida gli adempimenti li avvii tu; fuori dalla sfida Paolo li lavora da solo, e qui si guarda
 const manual = gameOn(), now = Date.now(), doing = P.doingNow().length, cap = P.studioCfg.cap;
 const bar = (start, total, cls) => `<span class="tk-bar ${cls}"><i style="animation-duration:${total}s;animation-delay:-${Math.min(total, (now - start) / 1000).toFixed(1)}s"></i></span>`;
 const todo = f => !manual ? `<span class="fr-wait">${icon('clock')} Paolo lo avvia appena si libera</span>` : doing >= cap ? `<span class="tk-full">Addetto occupato · ${doing}/${cap}</span>` : `<button class="btn btn-secondary" data-filing-act="${f.id}">Avvia ${icon('arrow')}</button>`;
 return `<section class="workspace-panel filings game-kds"><div class="panel-title"><h2>${icon('clock')} Adempimenti in lavorazione</h2><span class="live-pill"><span class="live-dot"></span>Paolo · ${doing}/${cap} in lavorazione</span></div>
  <div class="filing-list">${P.filings.map(f => { const left = Math.max(0, Math.ceil(P.filingLeft(f))), red = manual && P.filingRed(f); return `<article class="filing ${red ? 'red' : ''} fs-${f.state}"><span class="fl-body"><b>${esc(f.what)}</b><small>${esc(f.act)} · ${esc(f.office)}</small>${f.state === 'todo' && manual ? bar(f.created, f.due, 'pass') : f.state === 'doing' ? bar(f.doneAt - P.studioCfg.work * (manual ? 1000 : 1600), P.studioCfg.work * (manual ? 1 : 1.6), 'cook') : ''}</span>${f.state === 'todo' ? todo(f) : f.state === 'doing' ? `<span class="fr-wait">${icon('clock')} In lavorazione</span>` : f.state === 'done' ? badge(`Fatto alle ${f.doneTime}`, 'badge-green') : badge('Scaduto · sanzione', 'badge-red')}${f.state === 'todo' && manual ? `<span class="fl-left ${red ? 'hot' : ''}">${left} s</span>` : ''}</article>`; }).join('') || '<p class="muted pad-s">Nessun adempimento aperto.</p>'}</div></section>`;
}
function scadenze() {
 const sorted = [...D.deadlines].sort((a, b) => (a.days ?? 9999) - (b.days ?? 9999));
 return `${heading('IL CONTROLLO · 10', 'Scadenziario & post-stipula', 'Dopo la firma ogni atto genera i suoi adempimenti. Otto calcola i termini e avvisa chi se ne occupa.')}
 ${filingsPanel()}
 <div class="alert-banner">${icon('alert')}<p><b>Paolo Donati è in ferie fino a lunedì</b> e ha 2 termini entro 5 giorni.</p>${btn('Riassegna a Giulia', 'toast:Termini riassegnati a Giulia Marchi (demo)', 'btn-secondary', 'users')}</div>
 <section class="workspace-panel"><div class="panel-title"><h2>${icon('calendar')} Termini di legge</h2>${badge('Calcolati dalla data dell’atto')}</div><div data-anchor="scadenze" class="anchor-pad"></div><div class="timeline">${sorted.map(d => `<div class="tl-row ${d.state}"><span class="tl-days">${d.days === null ? icon('check') : `<b>${d.days}</b><small>giorni</small>`}</span><span class="tl-body"><b>${esc(d.what)}</b><small>${esc(d.act)}</small></span><span class="tl-due">${esc(d.due)}</span>${avatar(d.owner)}${badge(d.state === 'done' ? 'Completato' : d.state === 'urgent' ? 'Urgente' : 'Programmato', d.state === 'done' ? 'badge-green' : d.state === 'urgent' ? 'badge-red' : '')}</div>`).join('')}</div></section>
 <div class="notice">${icon('info')}<p>Termini di esempio. Nel servizio reale vengono calcolati dalla data dell’atto e dalle regole configurate dallo studio.</p></div>`;
}

// ————— 11 ANTIRICICLAGGIO —————
function antiriciclaggio() {
 const steps = [['documento', 'Identificazione'], ['titolare', 'Titolare effettivo'], ['pep', 'Verifica PEP e liste'], ['fondi', 'Origine dei fondi']];
 return `${heading('IL CONTROLLO · 11', 'Antiriciclaggio & clienti', 'L’adeguata verifica si prepara mentre la pratica avanza, con i documenti già arrivati in studio.')}
 <section class="workspace-panel"><div class="panel-title"><h2>${icon('shield')} Adeguata verifica dei clienti</h2>${badge('Si completa mentre la pratica avanza')}</div><div class="table-scroll"><table class="data-table aml"><thead><tr><th>Cliente</th><th>Rischio</th>${steps.map(s => `<th>${s[1]}</th>`).join('')}</tr></thead><tbody>${D.clients.map(c => `<tr><td><b>${esc(c.name)}</b><small>${esc(D.practice(c.practice).name)}</small></td><td>${badge(c.risk, c.risk === 'Basso' ? 'badge-green' : c.risk === 'Medio' ? 'badge-amber' : '')}</td>${steps.map(s => `<td><span class="dot ${c.steps[s[0]] ? 'ok' : 'no'}">${c.steps[s[0]] ? icon('check') : ''}</span></td>`).join('')}</tr>`).join('')}</tbody></table></div></section>
 <div class="section-title"><h2>Da valutare</h2><span class="subtle-label">Otto segnala, il notaio valuta</span></div>
 <div data-anchor="antiriciclaggio"></div>
 <div class="flag-grid">${D.clients.filter(c => c.flag).map(c => `<article class="workspace-panel">${ottoNote(c.flag, c.risk === 'Medio' ? 'warn' : '')}<div class="detail-actions">${pchip(c.practice)}${btn('Richiedi documenti', 'toast:Richiesta preparata, in attesa di approvazione', 'btn-secondary', '')}</div></article>`).join('')}</div>`;
}

// ————— 12 COMPLIANCE —————
function compliance() {
 return `${heading('IL CONTROLLO · 12', 'Privacy, audit & compliance', 'Ogni azione di Otto è registrata con chi l’ha approvata. L’AI prepara, il professionista decide.')}
 <div class="metrics-grid">${[['sparkle', 'Azioni di Otto oggi', D.audit.filter(a => a.actor === 'Otto').length], ['check', 'Approvate da una persona', 1], ['settings', 'Da regole automatiche', 2], ['lock', 'Richieste bloccate dalla policy', 1]].map(([i, t, n]) => `<article class="metric"><div><span>${t}</span>${icon(i)}</div><strong class="has-value">${n}</strong></article>`).join('')}</div>
 <section class="workspace-panel"><div class="panel-title"><h2>Registro delle azioni</h2>${badge('Append-only nel servizio reale')}</div><div data-anchor="compliance" class="anchor-pad"></div><div class="table-scroll audit-scroll"><table class="data-table"><thead><tr><th>Ora</th><th>Chi</th><th>Azione</th><th>Approvazione</th><th>Modulo</th></tr></thead><tbody>${D.audit.map(a => `<tr><td>${a.time}</td><td>${a.actor === 'Otto' ? `<span class="otto-tag">${icon('sparkle')}Otto</span>` : esc(a.actor)}</td><td>${esc(a.action)}</td><td>${esc(a.approved)}</td><td>${badge(esc(a.area))}</td></tr>`).join('')}</tbody></table></div></section>
 <div class="quote-layout"><section class="workspace-panel"><div class="panel-title"><h2>Richieste degli interessati</h2>${badge('Risposta entro un mese')}</div><div class="table-scroll"><table class="data-table"><thead><tr><th>Chi</th><th>Richiesta</th><th>Arrivata</th><th>Scadenza</th><th>Stato</th></tr></thead><tbody>${D.dataRequests.map(r => `<tr><td><b>${esc(r.who)}</b><small>${esc(r.via)}</small></td><td>${esc(r.what)}${r.note ? `<small>${esc(r.note)}</small>` : ''}</td><td>${r.received}</td><td><b>${r.due}</b><small>tra ${r.days} giorni</small></td><td>${badge(r.state, r.state === 'Completata' ? 'badge-green' : r.state === 'Da valutare' ? 'badge-amber' : '')}</td></tr>`).join('')}</tbody></table></div></section>
 <aside class="module-side"><div class="workspace-panel"><div class="panel-title"><h2>Controlli privacy</h2></div>${D.privacyChecks.map(([t, d, ok]) => `<div class="mini-row"><span><b>${t}</b><small>${d}</small></span>${badge(ok ? 'In regola' : 'Da fare', ok ? 'badge-green' : 'badge-amber')}</div>`).join('')}</div></aside></div>
 <div class="rule-grid four">${[
  ['lock', 'Accessi per ruolo', 'Notai, collaboratori e segreteria vedono solo le pratiche di competenza.'],
  ['message', 'Informativa sull’uso dell’AI', 'Testo pronto per informare i clienti dell’uso di strumenti di intelligenza artificiale.'],
  ['database', 'Conservazione', 'Tempi di conservazione per email, registrazioni e bozze, configurabili.'],
  ['shield', 'Dati in Europa', 'Modelli e archivi su infrastruttura europea, senza addestramento sui dati dello studio.']
 ].map(([i, t, d]) => `<div class="rule">${icon(i)}<b>${t}</b><p>${d}</p></div>`).join('')}</div>
 <div class="notice">${icon('info')}<p>Configurazioni previste per il servizio. In questa anteprima nessun dato lascia il browser.</p></div>`;
}

// ————— IMPOSTAZIONI —————
function settings() {
 return `${heading('IMPOSTAZIONI', 'Lo studio', 'Anteprima dimostrativa: le scelte fatte qui restano solo in questo browser.')}
 <section class="workspace-panel"><div class="setting-line"><span><b>${esc(D.studio.name)}</b><small>${esc(D.studio.city)} · ${D.team.length} persone · studio inventato</small></span></div>
 <div class="setting-line"><span><b>Ripristina la demo</b><small>Riporta email, attività e notifiche allo stato iniziale.</small></span>${btn('Ripristina', 'reset', 'btn-secondary', '')}</div></section>`;
}

// ————— OTTO GLOBALE —————
function ottoDrawer() {
 return `<header class="drawer-head"><span class="studio-mark">${icon('sparkle')}</span><div><b>Otto</b><small>Vede posta, pratiche, archivio, scadenze e team</small></div><button class="icon-btn" data-action="otto" aria-label="Chiudi Otto">${icon('close')}</button></header>
 <div class="drawer-body" id="otto-body">${ui.otto.length ? ui.otto.map(m => m.role === 'user' ? `<div class="msg-user"><p>${esc(m.text)}</p></div>` : `<div class="msg-agent"><p class="agent-reply">${rich(m.text)}</p>${m.links?.length ? `<div class="agent-actions">${m.links.map(([l, h]) => `<a class="btn btn-secondary" href="#${h}">${esc(l)}${icon('arrow')}</a>`).join('')}</div>` : ''}</div>`).join('') : `<div class="drawer-welcome"><div class="welcome-otto small">${otto('awake')}</div><p>Sono lo stesso assistente in tutti i moduli, e presto anche su WhatsApp. Chiedimi qualcosa sullo studio.</p></div>`}</div>
 <div class="drawer-suggest">${ottoSuggestions.map(s => `<button data-otto="${esc(s)}">${esc(s)}</button>`).join('')}</div>
 <form id="otto-form" class="composer-box"><textarea id="otto-input" rows="1" placeholder="Chiedi a Otto…" aria-label="Domanda a Otto"></textarea><button class="send-btn" type="submit" aria-label="Invia">${icon('send')}</button></form>`;
}
function toggleOtto(force) {
 const d = document.querySelector('#otto-drawer');
 const open = force ?? d.hidden;
 d.hidden = !open; document.body.classList.toggle('otto-open', open);
 if (open) { d.innerHTML = ottoDrawer(); d.querySelector('#otto-input').focus(); }
}
function askGlobal(text) {
 ui.otto.push({role:'user', text}, {role:'agent', ...askOtto(text)});
 const d = document.querySelector('#otto-drawer'); d.innerHTML = ottoDrawer();
 const b = d.querySelector('#otto-body'); b.scrollTop = b.scrollHeight; d.querySelector('#otto-input').focus();
}

// ————— dialoghi, ricerca, toast —————
function show(content, cls='') { returnFocus = document.activeElement; if (dialog.open) dialog.close(); dialog.className = cls; dialog.innerHTML = `${content}<button class="dialog-close icon-btn" data-action="close" aria-label="Chiudi finestra">${icon('close')}</button>`; dialog.showModal(); }
function searchDialog() { show(`<h2 id="dialog-title" class="sr-only">Cerca nella Station</h2><label class="command-input">${icon('search')}<input id="global-search" placeholder="Moduli, pratiche, email…" aria-label="Cerca" autocomplete="off"></label><div class="search-caption">RISULTATI</div><div id="search-results">${searchResults('')}</div><div class="search-hint">Invio per aprire <span>Esc per chiudere</span></div>`, 'search-dialog'); }
function searchResults(q) {
 q = q.toLowerCase();
 const items = [...modules.map(m => ({href:m.id, icon:m.icon, title:m.title, sub:m.description})),
  ...D.practices.map(p => ({href:'studio', icon:'folder', title:p.name, sub:`${p.type} · ${p.stage}`})),
  ...D.mails.map(m => ({href:'posta', icon:'inbox', title:m.subject, sub:m.from}))].filter(x => `${x.title} ${x.sub}`.toLowerCase().includes(q)).slice(0, 9);
 return items.length ? items.map(x => `<a href="#${x.href}" class="search-result" data-close>${icon(x.icon)}<span><b>${esc(x.title)}</b><small>${esc(x.sub)}</small></span>${icon('arrow')}</a>`).join('') : '<p class="search-empty">Nessun risultato.</p>';
}
function toast(s) { const el = document.querySelector('#toast'); el.textContent = s; el.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 4500); }

// ————— azioni —————
function action(a) {
 if (a === 'close') return dialog.close();
 if (a === 'sidebar') { document.body.classList.toggle('sidebar-open'); return syncNavigation(); }
 // con la sfida avviata, Chiedi a Otto apre la sua bottega
 if (a === 'otto') return gameOn() ? openShop() : toggleOtto();
 if (a === 'search') return searchDialog();
 if (a === 'live') { live.on = !live.on; toast(live.on ? 'Studio live: email, chiamate e messaggi arrivano da soli.' : 'Studio in pausa.'); return shell(); }
 if (a === 'tour') return startTour(notaroTour({toggleOtto}), {otto, name:'Demo interattiva CS Notaro OS', onEnd: () => { toggleOtto(false); gameInvite(); }});
 if (a.startsWith('toast:')) return toast(a.slice(6));
 if (a.startsWith('go:')) { location.hash = a.slice(3); return; }
 if (a.startsWith('studio:')) { const id = a.slice(7); const s = studioSuggestions.find(x => x.id === id); const prompt = s?.prompt || 'Confronta lo statuto Lumen Tech v2 con la v3';
  if (route() !== 'studio') { ui.studio.pending = {prompt, id}; location.hash = 'studio'; } else runStudio(prompt, id); return; }
 if (a === 'toggle-doc') { ui.studio.showDoc = !ui.studio.showDoc; const st = document.querySelector('.studio'); st?.classList.toggle('with-doc', ui.studio.showDoc); st?.classList.toggle('no-doc', !ui.studio.showDoc); document.querySelector('.doc-toggle')?.setAttribute('aria-pressed', ui.studio.showDoc); return refreshStudio(false); }
 if (a === 'studio-new') { stopRun(); ui.studio.messages = []; ui.studio.artifact = null; ui.studio.uploaded = null; return render(); }
 if (a === 'download-form') { ecoPoints('form', 3, 'Modulo scaricato'); return downloadForm(); }
 if (a.startsWith('handle:')) { const on = toggle('handled', a.slice(7)); if (on) ecoPoints('handle', 4, 'Email gestita', a.slice(7), {born:D.mails.find(m => m.id === a.slice(7))?.at}); toast(on ? 'Approvata. In anteprima nessuna email viene inviata.' : 'Email riaperta.'); return shell(); }
 if (a.startsWith('send:')) { toggle('sent', a.slice(5)); ecoPoints('send', 4, 'Messaggio inviato', a.slice(5), {born:D.chats.find(c => c.id === a.slice(5))?.at}); toast('Messaggio segnato come inviato. In anteprima non parte nulla.'); return shell(); }
 if (a === 'account') return show(`<span class="dialog-kicker">IL TUO STUDIO</span><h2 id="dialog-title">${persona.name}</h2><p class="dialog-description">Notaio titolare · ${esc(D.studio.name)}. L’accesso CSD Station sarà collegato al servizio.</p>`);
 if (a === 'reset') { stopRun(); reset(); ui.studio.messages = []; ui.studio.artifact = null; ui.otto = []; toast('Demo ripristinata.'); return shell(); }
}
function syncNavigation() {
 const side = document.querySelector('.sidebar'), body = document.querySelector('.app-body');
 const open = compact.matches && document.body.classList.contains('sidebar-open');
 side.inert = compact.matches && !open; body.inert = open;
 document.querySelector('.mobile-toggle').setAttribute('aria-expanded', String(open));
}

compact.addEventListener('change', () => { document.body.classList.remove('sidebar-open'); syncNavigation(); });
dialog.addEventListener('close', () => { if (returnFocus?.isConnected) returnFocus.focus(); });
dialog.addEventListener('click', e => { if (e.target === dialog) { const b = dialog.getBoundingClientRect(); if (e.clientX < b.left || e.clientX > b.right || e.clientY < b.top || e.clientY > b.bottom) dialog.close(); } });

document.addEventListener('click', e => {
 const t = e.target;
 if (t.closest('.skip-link')) { e.preventDefault(); document.querySelector('#main').focus(); return; }
 if (t.closest('[data-close]')) dialog.close();
 const el = sel => t.closest(sel);
 let x;
 if ((x = el('[data-action]'))) return action(x.dataset.action);
 if ((x = el('[data-mail]'))) { ui.mail = x.dataset.mail; return render(); }
 if ((x = el('[data-mail-filter]'))) { ui.mailFilter = x.dataset.mailFilter; return render(); }
 if ((x = el('[data-call]'))) { ui.call = x.dataset.call; return render(); }
 if ((x = el('[data-chat]'))) { ui.chat = x.dataset.chat; return render(); }
 if ((x = el('[data-category]'))) { ui.category = x.dataset.category; return render(); }
 if ((x = el('[data-guest]'))) { ui.guest = ui.guest === x.dataset.guest ? null : x.dataset.guest; return render(); }
 if ((x = el('[data-room]'))) {
  const r = P.rooms.find(y => y.id === x.dataset.room), p = P.lobby.find(y => y.id === ui.guest);
  if (!p) { toast(r?.with ? `${r.name}: ${r.with.act.toLowerCase()} in corso.` : 'Prima tocca chi aspetta in sala d’attesa.'); return; }
  if (r && P.fitsRoom(r, p)) {
   // la sala più piccola che basta: la Sala Arno occupata da due persone fa aspettare la prossima stipula
   const best = Math.min(...P.rooms.filter(x => P.fitsRoom(x, p)).map(x => x.seats)), good = r.seats === best;
   P.seatClient(p.id, r.id); ecoPoints('room', good ? 6 : 3, good ? 'Sala giusta' : 'Parti accomodate', p.id, {born:p.at}); ui.guest = null;
   toast(good ? `${p.who} in ${r.name}: la sala giusta per ${p.n}.` : `${p.who} in ${r.name}. Bastava una sala da ${best}: questa da ${r.seats} serviva a un atto con più parti.`); return render();
  }
  toast(r?.with ? `${r.name} è occupata.` : `${r?.name} ha ${r?.seats} posti: sono in ${p.n}.`); return;
 }
 if ((x = el('[data-filing-act]'))) { const id = x.dataset.filingAct, f = P.filings.find(y => y.id === id); if (P.startFiling(id)) ecoPoints('filing', 3, 'Adempimento avviato', id, {born:f?.created}); else toast(`L’addetto lavora ${P.studioCfg.cap} adempimenti alla volta: aspetta che uno finisca.`); return render(); }
 if ((x = el('[data-studio]'))) { ecoPoints('studio', 3, 'Lavoro con Otto', null, {id:x.dataset.studio}); const s = studioSuggestions.find(s => s.id === x.dataset.studio); return runStudio(s.prompt, s.id); }
 if ((x = el('[data-memory]'))) { ask(x.dataset.memory); return; }
 if ((x = el('[data-otto]'))) return askGlobal(x.dataset.otto);
});
function ask(q) {
 const n = q.toLowerCase();
 const found = D.memoryQA.find(x => x.q === q) || D.memoryQA.find(x => x.keys.filter(k => n.includes(k)).length >= 2) || D.memoryQA.find(x => x.keys.some(k => n.includes(k)));
 ui.memory = found ? {...found, q} : {q, a:'', sources:[]}; render();
}
document.addEventListener('input', e => {
 const el = e.target;
 if (el.id === 'catalog-search') { ui.catalogQuery = el.value; document.querySelector('#catalog-results').innerHTML = catalogResults(); }
 if (el.id === 'global-search') document.querySelector('#search-results').innerHTML = searchResults(el.value);
 if (el.closest('#quote-form')) { ui.quote = Object.fromEntries(new FormData(el.form)); document.querySelector('#quote-result').innerHTML = quoteResult(); }
 if (el.matches('#studio-input,#otto-input')) { el.style.height = 'auto'; el.style.height = Math.min(el.scrollHeight, 160) + 'px'; }
});
document.addEventListener('change', e => {
 const el = e.target;
 if (el.dataset.task) { if (toggle('done', el.dataset.task)) ecoPoints('task', 3, 'Attività fatta', el.dataset.task); render(); }
 if (el.dataset.rule) { state.rules[el.dataset.rule] = el.checked; persist(); toast(el.checked ? 'Notifica attivata.' : 'Notifica disattivata.'); }
 if (el.id === 'studio-practice') { ui.studio.practice = el.value; toast('Contesto aggiornato. In demo gli scenari usano la pratica Rossi / Verdi.'); }
 if (el.id === 'studio-file' && el.files[0]) { uploadToStudio(el.files[0]); el.value = ''; }
 if (el.closest('#quote-form')) { ui.quote = Object.fromEntries(new FormData(el.form)); document.querySelector('#quote-result').innerHTML = quoteResult(); }
});
document.addEventListener('submit', e => {
 const f = e.target; e.preventDefault();
 if (f.id === 'studio-form') { const i = f.querySelector('#studio-input'); const v = i.value.trim(); if (!v) return; i.value = ''; i.style.height = 'auto'; runStudio(v); }
 if (f.id === 'otto-form') { const v = f.querySelector('#otto-input').value.trim(); if (v) askGlobal(v); }
 if (f.id === 'memory-form') { const v = f.querySelector('#memory-input').value.trim(); if (v) ask(v); }
});
document.addEventListener('keydown', e => {
 if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); searchDialog(); }
 if (e.key === 'Enter' && !e.shiftKey && e.target.matches('#studio-input,#otto-input')) { e.preventDefault(); e.target.form.requestSubmit(); }
 if (e.key === 'Enter' && e.target.id === 'global-search') { const first = document.querySelector('#search-results a'); if (first) { location.hash = first.getAttribute('href').slice(1); dialog.close(); } }
 if (e.key === 'Escape' && !dialog.open) { if (document.body.classList.contains('otto-open')) toggleOtto(false); document.body.classList.remove('sidebar-open'); syncNavigation(); }
});
window.addEventListener('hashchange', () => { stopRun(); if (dialog.open) dialog.close(); document.body.classList.remove('sidebar-open'); shell(); if (document.body.classList.contains('otto-open')) toggleOtto(true); window.scrollTo({top:0, behavior:'instant'}); document.querySelector('#main').focus({preventScroll:true}); });
// ————— studio live —————
const livePages = ['home', 'posta', 'centralino', 'whatsapp', 'visure', 'staff', 'compliance', 'scadenze'];
let refreshQueued = false;
function liveRefresh() {
 if (refreshQueued) return; refreshQueued = true;
 let ran = false;
 const run = () => {
  if (ran) return; ran = true;
  refreshQueued = false;
  // con una nuvoletta di Otto aperta la pagina resta ferma: l'aggiornamento si fa appena si chiude
  if (gamePaused()) { setTimeout(liveRefresh, 600); return; }
  const busy = document.activeElement?.matches?.('input,textarea,select') || dialog.open || ui.studio.running;
  if (livePages.includes(route()) && !busy) { const y = scrollY; render(); scrollTo(0, y); }
  syncNavCounts();
 };
 // rAF per restare fluidi; il timeout copre le schede in background, dove rAF non scatta
 requestAnimationFrame(run); setTimeout(run, 300);
}
function syncNavCounts() {
 const c = counts();
 for (const [id, n] of Object.entries(c)) {
  const a = document.querySelector(`.sidebar a[href="#${id}"]`); if (!a) continue;
  let el = a.querySelector('.nav-count');
  if (!n) { el?.remove(); continue; }
  if (!el) { el = document.createElement('small'); el.className = 'nav-count'; a.append(el); }
  if (el.textContent !== String(n)) { el.textContent = n; el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }
 }
}
function liveToast(ev) {
 const stack = document.querySelector('#live-stack'); if (!stack) return;
 const card = document.createElement('button');
 card.className = `live-card lc-${ev.type}`; card.dataset.action = `go:${ev.go}`;
 card.innerHTML = `<span class="lc-icon">${icon(ev.icon)}</span><span><b>${esc(ev.title)}</b><small>${esc(ev.text)}</small></span>`;
 stack.prepend(card);
 [...stack.children].slice(3).forEach(x => x.remove());
 setTimeout(() => { card.classList.add('out'); setTimeout(() => card.remove(), 300); }, 6500);
}
onLive(ev => {
 if (ev.type === 'wa') { const i = state.sent.indexOf(ev.ref); if (i >= 0) { state.sent.splice(i, 1); persist(); } }
 if (!ev.quiet) liveToast(ev);
 liveRefresh();
});
// Le sezioni vive dello studio nella sfida: un battito al secondo.
setInterval(() => {
 try {
  if (!gameOn() || gamePaused() || document.hidden || document.body.classList.contains('touring')) return;
  const r = P.studioTick(gameLevel(), state.handled);
  // ogni cosa in rosso costa 1 punto al secondo, ma al massimo 2 in tutto
  const reds = r.late.length + r.red.length + (r.lobbyRed.length ? 1 : 0);
  if (reds) penalty(Math.min(2, reds), r.late.length ? 'Email in ritardo' : r.red.length ? 'Adempimento in scadenza' : 'Parti in attesa');
  r.left.forEach(p => { penalty(10, 'Appuntamento saltato'); toast(`${p.who} se ne sono andati dopo troppa attesa: appuntamento da riprogrammare.`); });
  r.met.forEach(p => { ecoPoints('signed', 4, `${p.act} conclusa`, p.id); toast(`${p.room} di nuovo libera: ${p.act.toLowerCase()} conclusa${p.files ? '. Nello Scadenziario è nato il suo adempimento' : ''}.`); });
  document.querySelectorAll('[data-guest-wait]').forEach(e => { const p = P.lobby.find(y => y.id === e.dataset.guestWait); if (!p) return; e.textContent = Math.floor(P.lobbyWait(p)); e.closest('.lb-guest')?.classList.toggle('red', P.lobbyRed(p)); const b = document.querySelector(`[data-guest-bar="${p.id}"]`); if (b) b.style.width = `${Math.min(100, P.lobbyWait(p) / P.lobbyLeave() * 100)}%`; });
  document.querySelectorAll('[data-room-left]').forEach(e => { const rm = P.rooms.find(y => y.id === e.dataset.roomLeft); if (rm) e.textContent = P.roomLeft(rm); });
  const lsig = P.lobby.map(p => p.id).join(',') + '|' + P.rooms.map(x => x.with?.id || '').join(','); if (lsig !== ui.lobbySig) { ui.lobbySig = lsig; if (route() === 'centralino') render(); }
  r.expired.forEach(f => { penalty(15, 'Termine scaduto'); toast(`${f.what} (${f.act}): termine scaduto, sanzione per lo studio.`); });
  r.done.forEach(f => ecoPoints('filed', 6, 'Adempimento chiuso', f.id, {born:f.doneAt}));
  const sig = `${r.late.length}|${r.red.length}`, was = ui.pressure?.sig;
  ui.pressure = {...r, sig};
  // nello Scadenziario i secondi scorrono a vista; in Posta si ridisegna solo quando cambia qualcosa
  if (route() === 'scadenze' || ((r.changed || was !== sig) && route() === 'posta')) liveRefresh();
  // cosa sta facendo perdere punti, e dove andare a sistemarlo
  const n = r.late.length;
  setPressure([...(n ? [{page:'posta', label:`${n === 1 ? 'Un’email aspetta' : `${n} email aspettano`} risposta da più di ${P.slaText()}`}] : []),
   ...r.red.map(f => ({page:'scadenze', label:`${f.what} quasi scaduta`})),
   ...(r.lobbyRed.length ? [{page:'centralino', label:r.lobbyRed.length === 1 ? `In sala d’attesa: ${r.lobbyRed[0].who}` : `${r.lobbyRed.length} appuntamenti aspettano in sala d’attesa`}] : [])]);
 } catch (err) { console.warn('CS Notaro OS · errore nel battito', err); }
}, 1000);
// Fuori dalla sfida lo Scadenziario va avanti da solo (vedi pressure.js): si ridisegna quando cambia qualcosa.
setInterval(() => {
 if (gameOn() || !live.awake || document.hidden || document.body.classList.contains('touring')) return;
 if (P.studioDemoTick() && route() === 'scadenze') liveRefresh();
}, 1000);
P.studioDemoTick();
// Dentro il sito la demo parte ferma (niente cicli né animazioni): si accende solo quando il visitatore la apre.
const wake = on => { live.awake = on; document.documentElement.classList.toggle('csd-paused', !on); };
wake(live.awake);
window.addEventListener('message', e => {
 if (e.origin !== location.origin) return;
 if (e.data === 'csd:start-tour') { wake(true); action('tour'); }
 if (e.data === 'csd:start-game') { wake(true); gameIntro(); }
 if (e.data === 'csd:resume') wake(true);
 if (e.data === 'csd:pause') wake(false);
});
initGame(challenges, {story,icon, missionsOnly:true,
 // "il tempo è fermo" vale per tutto: il motore restituisce qui il tempo passato a gioco fermo
 freeze:ms => {
  D.mails.forEach(m => { if (m.slaFrom) m.slaFrom = later(m.slaFrom, ms); else if (m.at) m.at = later(m.at, ms); });
  P.filings.forEach(f => { f.created = later(f.created, ms); if (f.doneAt) f.doneAt += ms; });
  P.lobby.forEach(p => { p.at = later(p.at, ms); });
  P.rooms.forEach(r => { if (r.until) r.until += ms; });
  P.shiftClocks(ms);
 },
 // compiti veri: nascono dallo stato dello studio e si fanno con i tasti delle sezioni
 tasks:() => {
  const c = [];
  P.filings.filter(f => f.state === 'todo' && P.filingLeft(f) < 100).forEach(f => c.push({key:'filing', urgent:true, ref:f.id, page:'scadenze', title:`${f.what} in scadenza`, text:`Nello Scadenziario **avvia ${f.what.toLowerCase()}** (${f.act}) prima che scada il termine.`, target:`[data-filing-act="${f.id}"]`, valid:() => f.state === 'todo', auto:() => P.startFiling(f.id)}));
  D.mails.filter(m => !m.reading && !m.missionOpen && !state.handled.includes(m.id)).slice(0, 4).forEach(m => c.push({key:'handle', urgent:!m.old, ref:m.id, page:'posta', title:`Email · ${m.from}`, text:`Apri **“${m.subject}”**, leggi cosa ha capito Otto e premi **${m.draft ? 'Approva e invia' : 'Approva e archivia'}**.`, target:`[data-action="handle:${m.id}"]`, valid:() => !state.handled.includes(m.id), auto:() => { if (!state.handled.includes(m.id)) state.handled.push(m.id); }}));
  D.chats.filter(ch => ch.draft && !ch.mission && !ch.thinking && !state.sent.includes(ch.id)).forEach(ch => c.push({key:'send', ref:ch.id, page:'whatsapp', title:`WhatsApp · ${ch.who}`, text:'Controlla la risposta proposta da Otto e premi **Invia**.', target:`[data-action="send:${ch.id}"]`, valid:() => !state.sent.includes(ch.id), auto:() => { if (!state.sent.includes(ch.id)) state.sent.push(ch.id); }}));
  P.lobby.forEach(p => c.push({key:'room', ref:p.id, page:'centralino', urgent:P.lobbyWait(p) > 15, title:`In sala d’attesa: ${p.who}, ${p.n} persone`, text:`In Centralino & segreteria **tocca ${p.who}** nella sala d’attesa, poi **una sala libera con almeno ${p.n} posti**.`, target:`[data-guest="${p.id}"]`, valid:() => P.lobby.some(x => x.id === p.id), auto:() => { const rm = P.rooms.find(x => P.fitsRoom(x, p)); if (rm) P.seatClient(p.id, rm.id); }}));
  D.tasks.filter(t => !t.done && !state.done.includes(t.id)).slice(0, 3).forEach(t => c.push({key:'task', ref:t.id, page:'staff', title:`Attività · ${t.text}`, text:'In Staff & task **spunta l’attività** quando è completata.', target:`input[data-task="${t.id}"]`, valid:() => !state.done.includes(t.id), auto:() => { if (!state.done.includes(t.id)) state.done.push(t.id); }}));
  // come nella demo guidata: un lavoro da chiedere a Otto nello Studio, quello giusto
  if (Math.random() < .5) {
   const w = [['erogazione', 'Banca Arno aspetta il modulo di erogazione', 'La banca ha mandato delibera e perizia: nello **Studio** chiedi a Otto di **compilare il modulo di erogazione**.'], ['confronto', 'Preliminare e bozza non coincidono', 'Prima della firma serve il **confronto tra preliminare e bozza d’atto**: chiedilo a Otto nello **Studio**.'], ['bozza', 'Serve la bozza della compravendita', 'Le parti aspettano la **bozza dell’atto di compravendita**: falla preparare a Otto nello **Studio**.'], ['ricerca', 'Un cliente chiede di una servitù a Fiesole', 'Cerca negli atti dello studio le **servitù di passaggio a Fiesole**: chiedilo a Otto nello **Studio**.']][Math.floor(Math.random() * 4)];
   c.push({key:'studio', page:'studio', title:w[1], text:w[2], target:`[data-studio="${w[0]}"]`, check:p => p.id === w[0] ? {ok:true} : {ok:false, why:'Hai chiesto un altro lavoro'}});
  }
  return c;
 }, missionTypes:12, sections:12, placeOf:'dello studio', startNote:'Email, messaggi e chiamate da gestire arrivano dal quadrato rosso “!” in alto, e ogni sezione dello studio ha la sua missione.', menuNote:'Le missioni arrivano dallo studio vivo: email da controllare, messaggi da correggere, chiamate in diretta. Sempre nuove.',
 focus:(page, ref) => { if (page === 'posta') { ui.mail = ref; ui.mailFilter = 'all'; } if (page === 'whatsapp') ui.chat = ref; if (page === 'centralino') ui.call = ref; if (route() === page) { render(); } else location.hash = page; setTimeout(() => document.querySelector('[data-mission]')?.scrollIntoView({block:'center', behavior:'smooth'}), 120); },
 onStart:() => { P.studioGameStart(state.handled); ui.pressure = {}; ui.guest = null; startMissions((id, page) => { if (page === 'posta' && !state.handled.includes(id)) state.handled.push(id); if (route() === page) { const y = scrollY; render(); scrollTo(0, y); } }); },
 onReset:() => { stopMissions(); P.studioGameStop(); setPressure([]); },
 // potenziamenti dello studio, da comprare nella Bottega di Otto
 shop:[
  {id:'segretaria', name:'Segretaria in più', desc:'+60 secondi prima che un’email vada in ritardo.', cost:500, fixed:true, max:2, mood:'otto-cap', use:() => { P.studioCfg.slaBonus += 60; return `Ora le email possono aspettare ${P.slaText()}.`; }},
  {id:'addetto', name:'Secondo addetto agli adempimenti', desc:'+1 adempimento in lavorazione insieme (fino a 4).', cost:600, fixed:true, max:2, mood:'otto-notary', use:() => { if (P.studioCfg.cap >= 4) return false; P.studioCfg.cap++; render(); return `Ora si lavorano ${P.studioCfg.cap} adempimenti insieme.`; }},
  {id:'firma', name:'Firma digitale remota', desc:'Ogni adempimento richiede 15 secondi invece di 25.', cost:800, fixed:true, max:1, mood:'otto-notary', use:() => { if (P.studioCfg.work <= 15) return false; P.studioCfg.work = 15; return 'Adempimenti più veloci: 15 secondi l’uno.'; }},
  {id:'reception', name:'Receptionist', desc:'In sala d’attesa le parti hanno 30 secondi di pazienza in più.', cost:500, fixed:true, max:2, mood:'otto-phone', use:() => { if (P.lobbyCfg.bonus >= 90) return false; P.lobbyCfg.bonus += 30; render(); return 'C’è chi accoglie le parti e offre un caffè: aspettano più volentieri.'; }},
  {id:'boboli', name:'Sala riunioni in più', desc:'Apre la Sala Boboli da 6 posti: un appuntamento in più alla volta.', cost:1200, fixed:true, max:1, mood:'otto-notary', use:() => { if (P.rooms.some(r => r.id === 'R4')) return false; P.rooms.push({id:'R4', name:'Sala Boboli', seats:6, until:0, with:null}); render(); return 'Sala Boboli aperta: ora le sale sono quattro.'; }}
 ],
 pageName:id => moduleById(id)?.title || {home:'Oggi in studio'}[id] || id});
shell();
startLive();
