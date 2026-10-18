// Modalità sfida CSD Station. Motore unico, identico in CS Restaurant OS e CS Notaro OS: cambiano solo le sfide (challenges.js).
// L'idea è quella del prodotto: Otto prepara, tu verifichi. Si guadagnano punti aprendo la fonte e scegliendo bene,
// si perdono solo con una scelta sbagliata. Chi non la avvia vede la demo come sempre.
//
// La sfida è spenta di base: parte solo quando il visitatore la avvia. Da lì le pagine con una decisione aperta
// hanno un puntino rosso nel menu a sinistra.
//
// Sfida: {id, level:1|2|3, page, title, text, sources:[{label, text, key}], options:[{label, ok, partial, why}], vars:[{...}]}
// Nei testi **grassetto**, nelle fonti ==evidenziato==, {nome} prende il valore della variante della giornata.
const calm = matchMedia('(prefers-reduced-motion: reduce)');
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rich = v => esc(v).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/==(.+?)==/g, '<mark>$1</mark>');
const base = {1:10, 2:20, 3:30};
const levelNotes = {1:'Si comincia: scelte chiare per prendere la mano.', 2:'Arrivano le prime trappole. Prima di approvare, apri le fonti.', 3:'Ultimo livello: errori sottili e un po’ di fretta.'};

let C = [], icon = () => '', pageName = id => id, place = 'lo studio', timer = 0, hooks = {};
const S = {chapter:-1, chProgress:0, chStart:0, bought:{}, paused:0, coached:{}, tasksDone:0, tasks:{}, tseq:0, fx:{shield:0, double:0, freeHints:0, freezeUntil:0}, gifts:[], gift:null, offers:[], missions:{}, mseq:0, avail:{}, seenOpen:0, started:false, points:0, level:1, round:1, streak:0, last:null, solved:{}, cards:{}, showing:{}, sound:true};
try { S.sound = localStorage.getItem('csd.game.sound') !== 'off'; } catch {}

export function initGame(challenges, opts) {
 C = challenges; icon = opts.icon; pageName = opts.pageName || pageName; place = opts.place || place; hooks = opts;
 document.addEventListener('click', onClick);
 document.addEventListener('input', onInput);
 document.addEventListener('keydown', onKey);
}

// ————— stato —————
// Ogni decisione ha il suo tempo da quando il livello si apre: più il livello è alto, meno tempo c'è.
const duration = c => Math.round({1:90, 2:70, 3:50}[c.level] * (S.round > 1 ? .8 : 1));
const left = c => S.avail[c.id] ? duration(c) * 1000 - (Date.now() - S.avail[c.id]) : duration(c) * 1000;
// Ogni giornata usa una variante diversa (nomi e numeri) e mescola l'ordine delle risposte.
let cache = {round:0, list:[]};
const fill = (v, x) => typeof v === 'string' ? v.replace(/\{(\w+)\}/g, (m, k) => x[k] ?? m) : v;
function resolve(c) {
 const x = c.vars?.length ? c.vars[(S.round - 1) % c.vars.length] : {};
 const f = v => fill(v, x);
 const options = c.options.map(o => ({...o, label:f(o.label), why:f(o.why)}));
 // mescolate davvero a ogni giornata, e la giusta non resta mai al primo posto due giornate di fila
 for (let i = options.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [options[i], options[j]] = [options[j], options[i]]; }
 if (options.length > 1 && options[0].ok && Math.random() < .7) options.push(options.shift());
 return {...c, title:f(c.title), text:f(c.text), sources:(c.sources || []).map(s => ({...s, label:f(s.label), text:f(s.text)})), options};
}
const list = () => { if (cache.round !== S.round) cache = {round:S.round, list:C.map(resolve)}; return cache.list; };
const open = () => hooks.missionsOnly ? [] : list().filter(c => c.level === S.level && !S.solved[c.id]);
export const gameLevel = () => S.level;
// In modalità solo missioni il livello sale con i punti: più missioni insieme e meno tempo.
function syncLevel() {
 storyProgress('points');
 if (!hooks.missionsOnly) return;
 const l = S.points >= 400 ? 3 : S.points >= 150 ? 2 : 1;
 if (l > S.level) { S.level = l; updateChip(); setTimeout(() => coach(`level${l}`, '.game-chip', `Livello ${l}`, l === 2 ? 'Bravo. Da adesso possono arrivare **due cose insieme**, con un po’ meno tempo.' : 'Servizio pieno: fino a **tre cose insieme**. Le fonti restano la tua arma migliore.', 'otto-happy'), 900); }
}
// Missioni: decisioni legate a un elemento preciso (un'email), con il loro minigioco. Le crea il regista dell'app.
const missionLeft = m => m.ttl - (Date.now() - m.created);
const openMissions = () => Object.values(S.missions).filter(m => !m.result);
// ————— compiti dell'ecosistema —————
// Il cuore della sfida: il sistema gira da solo e, quando serve una persona, nasce un compito vero
// (scorte sotto il minimo, un conto da chiudere, un'email da approvare…). Si completa usando la sezione
// vera: il tasto dell'app chiama ecoPoints con la stessa chiave. Se scade, Otto lo fa da solo.
// Le app forniscono i candidati con hooks.tasks(): [{key, ref, page, title, text, valid(), auto()}].
const taskTtl = () => ({1:120000, 2:100000, 3:80000})[S.level];
// Quante cose possono essere aperte insieme (compiti + missioni): al livello 1 una sola, così si impara.
const maxOpen = () => ({1:1, 2:2, 3:3})[S.level];
const gap = () => ({1:[40, 70], 2:[30, 55], 3:[25, 45]})[S.level];
const taskPts = () => ({1:15, 2:20, 3:25})[S.level];
const openTasks = () => Object.values(S.tasks).filter(t => !t.done);
const taskLeft = t => t.ttl - (Date.now() - t.created);
let nextTaskAt = 0;
function taskDirector() {
 if (!hooks.tasks) return;
 const now = Date.now();
 for (const t of openTasks()) if (t.valid && !t.valid()) { delete S.tasks[t.id]; refresh(t.page); markNav(); updateAlert(); }
 for (const t of openTasks()) if (taskLeft(t) <= 0) {
  t.done = true; try { t.auto?.(); } catch {}
  const pen = Math.min(5, S.points); S.points -= pen; S.streak = 0;
  play('bad'); if (pen) float(-pen, document.querySelector('.game-chip'), 'Otto l’ha fatto da solo'); else updateChip();
  refresh(t.page); markNav(); updateAlert();
  coach('auto', '.game-chip', 'Ci ho pensato io', 'Il tempo era finito e **l’ho fatto io**, seguendo le regole. Costa qualche punto, ma niente panico: la prossima volta tocca a te.', 'otto-think');
 }
 if (now < nextTaskAt || openAll().length >= maxOpen()) return;
 const [g1, g2] = gap(); nextTaskAt = now + (g1 + Math.random() * (g2 - g1)) * 1000;
 const busy = new Set(openTasks().map(t => `${t.key}:${t.ref ?? ''}`));
 const list = (hooks.tasks() || []).filter(c => !busy.has(`${c.key}:${c.ref ?? ''}`));
 if (!list.length) return;
 const c = list[Math.floor(Math.random() * list.length)], id = `tk${++S.tseq}`;
 S.tasks[id] = {...c, id, created:now, ttl:taskTtl(), pts:taskPts()};
 refresh(c.page); markNav(); updateAlert();
 const a = document.querySelector('.game-alert'); if (a) { a.classList.remove('ring'); void a.offsetWidth; a.classList.add('ring'); }
 setTimeout(() => coach('first-task', '.game-alert', 'Ho bisogno di te', `**${c.title}**: qui serve una persona. Il quadrato rosso ti porta dove fare il lavoro.`, 'otto-wink'), 400);
}
// Il tasto vero da premere pulsa, così si vede subito dove agire nella sezione.
function markTargets() {
 document.querySelectorAll('.game-target').forEach(e => e.classList.remove('game-target'));
 if (!S.started) return;
 const page = location.hash.slice(1) || 'home';
 for (const t of openTasks()) if (t.page === page && t.target) {
  let el = null; try { el = document.querySelector(t.target); } catch {}
  if (!el) continue;
  el.classList.add('game-target'); el.style.animationDelay = `-${(Date.now() % 1400) / 1000}s`;
  coach('target', t.target, 'Il tasto che lampeggia', 'Fai come faresti davvero, con i tasti di questa sezione: **quello che lampeggia** è il prossimo passo.', 'otto-read');
 }
}
function completeTask(t) {
 t.done = true; S.tasksDone++; storyProgress('tasks', t.page);
 const fast = Date.now() - t.created < 30000;
 let pts = t.pts + (fast ? 5 : 0);
 if (S.fx.double) { S.fx.double--; pts *= 2; }
 S.points += pts; S.streak++; S.last = 'ok'; syncLevel(); checkGifts(); play(fast ? 'great' : 'good');
 float(pts, document.querySelector('.game-chip'), fast ? 'Fatto · veloce!' : 'Fatto');
 setTimeout(() => { refresh(t.page); markNav(); updateAlert(); }, 50);
 setTimeout(() => coach('first-done', '.game-chip', `+${pts} punti`, 'Ogni lavoro fatto vale punti, e **più sei veloce più ne prendi**. Se lasci scadere il tempo lo faccio io, e perdi qualche punto.', 'otto-happy'), 1300);
}
function taskBanner(t) {
 const el = (t.ttl - taskLeft(t)) / 1000;
 return `<div class="game-task ${Date.now() - t.created < 1500 ? 'fresh' : ''}" data-task="${t.id}"><span class="gtk-ico">${icon('otto-wink')}</span><div class="gtk-body"><b>${esc(t.title)}</b><span>${rich(t.text)}</span></div><span class="gtk-time"><i style="animation-duration:${t.ttl / 1000}s;animation-delay:-${el.toFixed(1)}s"></i></span></div>`;
}
const openAll = () => [...openTasks().map(t => ({id:t.id, title:t.title, page:t.page, ref:t.ref, left:taskLeft(t), pts:t.pts, task:true})), ...open().map(c => ({id:c.id, title:c.title, page:c.page, left:left(c), pts:maxPts(c)})), ...openMissions().map(m => ({id:m.id, title:m.title, page:m.page, ref:m.ref, left:missionLeft(m), pts:45}))];
export function addMission(m) {
 const id = `ms${++S.mseq}`;
 const first = !!m.brief && !S.coached[`brief-${m.page}`];
 S.missions[id] = {...m, id, created:Date.now(), st:{id}, result:null, armed:!first};
 markNav(); updateAlert();
 setTimeout(() => coach('first-mission', '.game-alert', 'Tocca a te', `È arrivato: **${m.title}**. Questa volta la decisione è tua, non mia. Premi il quadrato rosso${first ? ': quando ci sei davanti ti spiego tutto, e il tempo parte solo dopo' : ''}.`, 'otto-think'), 500);
 return id;
}
export function missionPanel(id) {
 const m = S.missions[id]; if (!m || m.closed) return '';
 const r = m.result, elapsed = (m.ttl - missionLeft(m)) / 1000;
 return `<section class="game-card mission l2 ${r ? (r.pts < 0 ? 'is-ko' : 'is-ok') : ''}" data-mission="${id}">
  <div class="gc-top"><span class="gc-tag">${icon(r ? (r.pts < 0 ? 'otto-think' : 'otto-happy') : m.brief?.role || 'otto-read')} ${esc(m.title)}</span>${!r && m.hint ? hintBtn(id) : ''}</div>
  ${r ? '' : `<div class="gc-timer ${m.armed ? '' : 'waiting'}"><i style="animation-duration:${m.ttl / 1000}s;animation-delay:-${elapsed.toFixed(1)}s"></i></div>`}
  ${!r && m.st.hintMsg ? `<p class="gc-hintmsg">${icon('otto-wink')}<span>${esc(m.st.hintMsg)}</span></p>` : ''}
  <div class="mg">${m.render(m.data, m.st)}</div>
  ${r ? `<div class="gc-result"><b class="${r.pts < 0 ? 'neg' : ''}">${r.pts > 0 ? '+' : ''}${r.pts} pt · ${esc(r.label)}</b><p>${rich(r.why)}</p>${nextAfter(id) ? `<button class="gc-nextm" data-game="mclose:${id}">Prossima missione ${icon('arrow')}<i class="gc-auto"></i></button>` : `<button data-game="mclose:${id}">Fatto ${icon('check')}</button>`}</div>` : ''}
 </section>`;
}
// L'indizio di Otto costa punti, una volta per missione: più il livello è alto, più costa.
const hintCost = () => ({1:10, 2:15, 3:20})[S.level];
function hintBtn(id) {
 const m = S.missions[id]; if (!m || m.st.hintMsg) return '';
 const free = S.fx.freeHints, ok = free || S.points >= hintCost();
 return `<button class="gc-hint" data-game="hint:${id}" ${ok ? '' : 'disabled'} title="${ok ? 'Un aiuto di Otto' : `Servono ${hintCost()} punti`}">${icon('otto-wink')} Indizio <b>${free ? 'gratis' : `${hintCost()} pt`}</b></button>`;
}
function useHint(id, from) {
 const m = S.missions[id]; if (!m || m.result || m.st.hintMsg) return;
 const cost = S.fx.freeHints ? 0 : hintCost();
 if (S.points < cost) { play('bad'); return; }
 if (S.fx.freeHints) S.fx.freeHints--;
 S.points -= cost; m.st.hintMsg = m.hint(m.data, m.st) || 'Rileggi bene le fonti.';
 play('open'); refreshMission(id);
 float(-cost, document.querySelector(`[data-mission="${id}"] .gc-hintmsg`) || from);
}
// Dopo una missione si passa da soli alla più urgente, con una dissolvenza leggera.
const nextAfter = id => openAll().filter(x => x.id !== id).sort((a, b) => a.left - b.left)[0];
let autoNext = 0;
function closeAndNext(id) {
 clearTimeout(autoNext);
 const m = S.missions[id]; if (!m) return;
 m.closed = true;
 const next = nextAfter(id), main = document.querySelector('#main');
 if (!next || !main) { m.ref ? refreshMission(id) : refresh(m.page); return; }
 play('click');
 main.classList.add('game-fadeout');
 setTimeout(() => {
  go(next.page, next.ref);
  setTimeout(() => { const el = document.querySelector('#main'); el?.classList.remove('game-fadeout'); el?.classList.add('game-fadein'); setTimeout(() => el?.classList.remove('game-fadein'), 300); }, 60);
 }, 170);
}
// Azioni normali dell'ecosistema (rifornire, chiudere un conto, approvare un'email…): pochi punti, ma sempre.
// Ogni oggetto vero conta una volta sola (niente spam); i punti sono pieni se lo fai subito e scendono
// se aspetti, fino a 1. Le azioni senza oggetto hanno una pausa di 20 secondi.
const ecoLast = {}, ecoDone = {};
function fresh(pts, born) {
 if (!born) return pts;
 const age = (Date.now() - born) / 1000;
 return age <= 30 ? pts : age >= 180 ? 1 : Math.max(1, Math.round(pts * (1 - (age - 30) / 150)));
}
export function ecoPoints(key, pts, label, ref, payload) {
 if (!S.started || touring()) return;
 const t = openTasks().find(x => x.key === key && (x.ref == null || ref == null || String(x.ref) === String(ref)));
 // compiti con verifica: il risultato deve essere quello chiesto (piatti, tavolo, pagamento, lavoro giusto…)
 if (t?.check) { const r = t.check(payload || {}); if (!r.ok) { const pen = Math.min(5, S.points); S.points -= pen; play('bad'); float(-pen || 0, document.querySelector('.game-chip'), r.why); return; } }
 if (t) return completeTask(t);
 const now = Date.now();
 if (ref != null) { const id = `${key}:${ref}`; if (ecoDone[id]) return; ecoDone[id] = true; }
 else { if (now - (ecoLast[key] || 0) < 20000) return; ecoLast[key] = now; }
 const p = fresh(pts, payload?.born), late = p < pts;
 S.points += p; syncLevel(); checkGifts(); play('coin');
 float(p, document.querySelector('.game-chip'), late ? `${label} · in ritardo` : label);
}
// Penalità continua (una colonna della cucina in rosso, un lavoro dimenticato): pochi punti al secondo, a tempo fermo no.
let penBuf = 0, penTimer = 0;
export function penalty(n, label) {
 if (!S.started || S.paused || touring() || document.hidden || !n) return;
 const take = Math.min(n, S.points); if (!take) return;
 S.points -= take; penBuf += take; updateChip();
 // i punti scendono subito; il "−N" volante si mostra ogni 3 secondi, per non riempire lo schermo
 if (!penTimer) penTimer = setTimeout(() => { if (penBuf) float(-penBuf, document.querySelector('.game-chip'), label); penBuf = 0; penTimer = 0; }, 3000);
}
// Bottega: oltre ai potenziamenti comuni, ogni app aggiunge i suoi (hooks.shop).
const allItems = () => [...catalog, ...(hooks.shop || [])];
// La Bottega costa davvero: prezzi base ×2, e ogni acquisto dello stesso potenziamento lo rincara del 2%.
const price = c => Math.round(c.cost * 2 * Math.pow(1.02, S.bought[c.id] || 0));
function refreshMission(id) {
 const el = document.querySelector(`[data-mission="${id}"]`);
 if (el) el.outerHTML = missionPanel(id);
}
// le app che disegnano la missione dentro un oggetto (email, chiamata, tavolo…) lo segnalano qui
export const missionShown = () => setTimeout(coachMission, 500);
function resolveMission(m, r, from) {
 m.st.done = true;
 let pts = Math.max(r.pts, -S.points);
 if (pts < 0 && S.fx.shield) { S.fx.shield--; pts = 0; r = {...r, label:`${r.label} · fermato dallo scudo`, why:`${r.why} **Lo scudo di Otto ha parato i punti persi.**`}; }
 if (pts > 0 && S.fx.double && !r.delegated) { S.fx.double--; pts *= 2; r = {...r, why:`${r.why} **Punti doppi!**`}; }
 if (pts > 0 && !r.delegated) { S.streak++; S.last = 'ok'; if (S.streak % 3 === 0) { pts += 15; r.why += ` **Serie di ${S.streak}: +15 bonus.**`; } } else { S.streak = 0; S.last = 'ko'; }
 S.points += pts; m.result = {...r, pts}; syncLevel(); checkGifts();
 if (pts > 0 && !r.delegated) storyProgress('missions', m.page);
 play(pts > 0 ? (pts >= 30 ? 'great' : 'good') : 'bad');
 refreshMission(m.id);
 if (pts < 0) setTimeout(() => coach('first-ko', `[data-mission="${m.id}"] .gc-result`, 'Capita', 'Sotto trovi **perché** non andava: è così che il sistema ti insegna il lavoro. Si va avanti.', 'otto-think'), 900);
 float(pts, document.querySelector(`[data-mission="${m.id}"] .gc-result b`) || from);
 markNav(); updateAlert();
 m.onDone?.();
 clearTimeout(autoNext);
 if (nextAfter(m.id)) autoNext = setTimeout(() => { if (!m.closed && (location.hash.slice(1) || 'home') === m.page) closeAndNext(m.id); }, 5000);
}
const keySources = c => (c.sources || []).map((s, i) => s.key ? i : -1).filter(i => i >= 0);
const maxPts = c => base[c.level] + (keySources(c).length ? base[c.level] / 2 : 0);
const face = () => S.last === 'ko' ? 'otto-think' : S.streak >= 3 ? 'otto-wink' : S.last === 'ok' ? 'otto-happy' : 'sparkle';
const touring = () => document.body.classList.contains('touring');
const challenge = id => list().find(c => c.id === id);

// ————— barra in alto —————
export function gameChip() {
 if (!S.started) return `<button class="game-chip idle" data-game="menu" aria-label="La sfida di Otto: avviala" title="La sfida di Otto"><span class="gch-face">${icon('otto-happy')}</span><b class="gch-play">Sfida</b></button>`;
 const ch = chapterInfo();
 return `<button class="game-chip ${S.points ? '' : 'idle'}" data-game="menu" aria-label="La sfida di Otto: ${S.points} punti, livello ${S.level}" title="${ch ? esc(`Capitolo ${ch.n} · ${ch.title} — ${ch.goal}`) : 'La sfida di Otto'}"><span class="gch-face">${icon(face())}</span><b class="gch-pts">${S.points}</b><small>pt</small><span class="gch-lvl">${[1, 2, 3].map(l => `<i class="${l < S.level ? 'done' : l === S.level ? 'on' : ''}"></i>`).join('')}</span>${S.gift ? '<i class="gch-gift" title="Otto ha un regalo per te"></i>' : ''}</button>${ch ? `<button class="game-chapter" data-game="menu" title="${esc(ch.goal)}"><small>CAP. ${ch.n}/${ch.of}</small><b>${esc(ch.title)}</b><i>${esc(ch.goal.split(' · ').pop())}</i></button>` : ''}${alertBtn()}`;
}
function updateChip(bump) {
 document.querySelectorAll('.game-alert, .game-chapter').forEach(el => el.remove());
 document.querySelectorAll('.game-chip').forEach(el => {
  el.outerHTML = gameChip();
 });
 updateAlert(); syncShopLabels();
 const chip = document.querySelector('.game-chip');
 if (bump && chip && !calm.matches) { chip.classList.add(bump); burst(chip, bump === 'bump-bad'); }
}

// ————— scheda della sfida dentro la pagina —————
function card(c) {
 const k = S.cards[c.id] ||= {opened:[], seen:false};
 const t = !k.result;
 const elapsed = (duration(c) * 1000 - left(c)) / 1000;
 const fresh = !k.seen; k.seen = true;
 const r = k.result;
 return `<section class="game-card l${c.level} ${fresh ? 'new' : ''} ${r ? (r.pts < 0 ? 'is-ko' : 'is-ok') : ''}" data-gcard="${c.id}">
  <div class="gc-top"><span class="gc-tag">${icon(r ? (r.pts < 0 ? 'otto-think' : 'otto-happy') : 'otto-read')} LA SFIDA DI OTTO · LIVELLO ${c.level}${S.round > 1 ? ` · GIORNO ${S.round}` : ''}</span>${r ? '' : `<span class="gc-worth">fino a +${maxPts(c)} pt</span>`}</div>
  ${t ? `<div class="gc-timer" title="Tempo"><i style="animation-duration:${duration(c)}s;animation-delay:-${elapsed.toFixed(1)}s"></i></div>` : ''}
  <h3>${esc(c.title)}</h3><p class="gc-text">${rich(c.text)}</p>
  ${c.sources?.length ? `<div class="gc-sources">${c.sources.map((s, i) => k.opened.includes(i) || r
   ? `<blockquote class="gc-src ${k.opened.includes(i) && !r ? 'row-open' : ''}"><small>${icon('file')} ${esc(s.label)}</small><p>${rich(s.text)}</p></blockquote>`
   : `<button class="gc-open" data-game="src:${c.id}:${i}">${icon('eye')}<span>Apri la fonte</span><b>${esc(s.label)}</b></button>`).join('')}</div>` : ''}
  ${r ? `<div class="gc-result"><b class="${r.pts < 0 ? 'neg' : ''}">${r.pts > 0 ? '+' : ''}${r.pts} pt · ${esc(r.label)}</b><p>${rich(r.why)}</p><button data-game="next:${c.id}">Continua ${icon('arrow')}</button></div>`
   : `<div class="gc-options">${c.options.map((o, i) => `<button data-game="pick:${c.id}:${i}">${esc(o.label)}</button>`).join('')}</div>`}
 </section>`;
}
function teaser() {
 if (S.started) return '';
 if (S.started && hooks.missionsOnly) {
  const n = openAll().length;
  return `<div class="game-teaser"><span class="gt-face">${icon(face())}</span><p><b>La sfida di Otto · livello ${S.level}, ${S.points} punti.</b> ${n ? `${n} ${n === 1 ? 'missione aspetta' : 'missioni aspettano'}: aprile dal quadrato rosso <b class="gt-bang">!</b> in alto.` : 'Le missioni arrivano da sole dal lavoro di ogni giorno. Tieni d’occhio il quadrato rosso <b class="gt-bang">!</b> in alto.'}</p></div>`;
 }
 if (!S.started) return `<div class="game-teaser"><span class="gt-face">${icon('otto-happy')}</span><p><b>Vuoi provare a gestire ${place}?</b> Otto lavora, tu intervieni quando ti chiama.</p><button data-game="start">Gioca ${icon('arrow')}</button></div>`;
 const next = open()[0];
 if (!next) return '';
 return `<div class="game-teaser"><span class="gt-face">${icon(S.points ? face() : 'otto-happy')}</span><p>${S.points
  ? `<b>La sfida di Otto · livello ${S.level}, ${S.points} punti.</b> ${open().length} ${open().length === 1 ? 'decisione aspetta' : 'decisioni aspettano'}: aprile dal quadrato rosso <b class="gt-bang">!</b> in alto o dai puntini rossi nel menu.`
  : `<b>Gestisci ${place} come se fosse tuo.</b> Ogni decisione ha il suo tempo: aprile dal quadrato rosso <b class="gt-bang">!</b> in alto o dai puntini rossi nel menu.`}</p><button data-game="go:${next.page}">Vai ${icon('arrow')}</button></div>`;
}
function inner(page) {
 if (touring()) return '';
 if (!S.started) return page === 'home' ? teaser() : '';
 // compiti di questa sezione (si fanno con i tasti veri), poi l'eventuale missione bonus
 const tasks = openTasks().filter(t => t.page === page).map(taskBanner).join('');
 const pm = Object.values(S.missions).filter(m => m.page === page && !m.ref && !m.closed).sort((a, b) => (a.result ? 0 : 1) - (b.result ? 0 : 1) || a.created - b.created)[0];
 if (pm || tasks) return tasks + (pm ? missionPanel(pm.id) : '');
 const showing = S.showing[page] && challenge(S.showing[page]);
 const c = showing || open().find(x => x.page === page);
 if (c) { S.showing[page] = c.id; return card(c); }
 return page === 'home' ? teaser() : '';
}
function arm() {}
// Un solo orologio per tutte le decisioni aperte: quando una scade toglie un po' di punti, meno di una scelta sbagliata.
function openLevel() { const t = Date.now(); open().forEach(c => { S.avail[c.id] ||= t; }); }
function tick() {
 if (!S.started || touring() || document.hidden || S.paused) { for (const id in S.avail) S.avail[id] += 1000; openMissions().forEach(m => { m.created += 1000; }); openTasks().forEach(t => { t.created += 1000; }); return; }
 if (Date.now() < S.fx.freezeUntil) openTasks().forEach(t => { t.created += 1000; });
 taskDirector();
 if (Date.now() < S.fx.freezeUntil) { openMissions().forEach(m => { m.created += 1000; }); for (const id in S.avail) S.avail[id] += 1000; }
 openMissions().forEach(m => { if (!m.armed) m.created += 1000; });
 for (const m of openMissions()) if (missionLeft(m) <= 0) resolveMission(m, {pts:-8, label:'Tempo scaduto', why:'Nessuno ha deciso in tempo: Otto ha scelto da solo seguendo le regole e ti segnala il caso da ricontrollare. Una decisione lasciata a metà costa meno di una sbagliata, ma costa.'});
 for (const c of open()) {
  if (left(c) > 0) continue;
  const b = base[c.level], k = S.cards[c.id] ||= {opened:[], seen:true};
  const pts = -Math.min(Math.ceil(b / 4), S.points);
  S.points += pts; S.solved[c.id] = true; S.streak = 0; S.last = 'ko';
  k.result = {pts, label:'Tempo scaduto', why:'Nessuno ha deciso in tempo: Otto ha messo la pratica in attesa. Una decisione presa tardi costa meno di una sbagliata, ma costa.'};
  play('bad'); updateChip('bump-bad'); refresh(c.page); markNav();
  if (!open().length) setTimeout(levelUp, 650);
 }
 updateAlert();
}
setInterval(tick, 1000);
// Consigli casuali di Otto, a tempo fermo, solo quando non c'è niente di urgente.
const tips = [
 ['tip-sources', '.game-chip', 'Un consiglio', 'Nei documenti **i numeri in arancione** sono quelli da confrontare: guardali prima di decidere.'],
 ['tip-hint', '.game-chip', 'Se ti blocchi', 'Dentro ogni problema c’è il tasto **Indizio**: costa qualche punto, ma ti mostro dove guardare.'],
 ['tip-shop', '.ask-otto', 'La Bottega di Otto', 'Con i punti compri **tempo extra, pause e scudi** contro gli errori. La trovi qui.'],
 ['tip-calm', '.game-chip', 'Con calma', 'Non serve correre: **una cosa alla volta**. Quando hai preso il ritmo, il lavoro aumenta.']
];
let idleSince = 0;
function tipDirector() {
 if (!S.started || S.paused || touring() || document.hidden) return;
 if (openAll().length) { idleSince = 0; return; }
 idleSince ||= Date.now();
 if (Date.now() - idleSince < 25000) return;
 const t = tips.find(x => !S.coached[x[0]]); if (!t) return;
 idleSince = Date.now(); coach(t[0], t[1], t[2], t[3], 'otto-wink');
}
setInterval(tipDirector, 5000);
// Il quadrato rosso con il punto esclamativo: quante decisioni aspettano, e ci porta lì.
function alertBtn() {
 const n = S.started ? openAll().length : 0;
 return n ? `<button class="game-alert" data-game="alert" aria-label="${n} decisioni da prendere" title="Decisioni da prendere"><b>!</b>${n > 1 ? `<small>${n}</small>` : ''}</button>` : '';
}
function updateAlert() {
 const n = S.started ? openAll().length : 0;
 document.querySelectorAll('.game-alert').forEach(el => el.remove());
 const chip = document.querySelector('.game-chip'); if (!chip || !n) return;
 chip.insertAdjacentHTML('afterend', alertBtn());
 if (n > S.seenOpen) document.querySelector('.game-alert')?.classList.add('ring');
 S.seenOpen = n;
}
function chooser() {
 const list = openAll();
 if (list.length === 1) return go(list[0].page, list[0].ref);
 const btn = document.querySelector('.game-alert'); if (!btn) return;
 document.querySelector('.game-pop')?.remove();
 const r = btn.getBoundingClientRect(), el = document.createElement('div');
 el.className = 'game-pop'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'Decisioni da prendere');
 el.innerHTML = `<header><span>${icon('otto-think')}</span><div><b>${list.length} decisioni aspettano</b><small>Scegli da quale cominciare</small></div></header>
  ${[...list].sort((a, b) => a.left - b.left).map(c => `<button class="gp-item ${c.task ? 'is-task' : 'is-mission'}" data-game="go:${c.page}${c.ref ? ':' + c.ref : ''}"><b>${esc(c.title)}</b><small>${esc(pageName(c.page))} · ${Math.max(0, Math.ceil(c.left / 1000))} s · fino a +${c.pts} pt</small></button>`).join('')}`;
 el.style.top = `${r.bottom + 10}px`; el.style.right = `${Math.max(12, innerWidth - r.right)}px`;
 document.body.append(el);
}
// Puntini rossi nel menu a sinistra: dove c'è una decisione aperta.
function markNav() {
 document.querySelectorAll('.game-dot').forEach(d => d.remove());
 if (!S.started || touring()) return;
 for (const page of new Set(openAll().map(c => c.page))) {
  const a = document.querySelector(`.sidebar a[href="#${page}"]`);
  a?.insertAdjacentHTML('beforeend', '<i class="game-dot" title="Decisione da prendere"></i>');
 }
}
// In modalità gioco i tasti "Chiedi a Otto" diventano "Bottega di Otto" (in alto e nella barra laterale).
function syncShopLabels() {
 const on = S.started;
 document.querySelectorAll('.ask-otto').forEach(b => {
  const sp = b.querySelector('span'); if (sp) sp.textContent = on ? 'Bottega di Otto' : 'Chiedi a Otto';
  b.classList.toggle('is-shop', on); b.classList.toggle('has-gift', on && !!S.gift);
 });
 document.querySelectorAll('.plan-mini > span:not(.plan-orbit)').forEach(sp => {
  const t = [...sp.childNodes].find(n => n.nodeType === 3); if (t) t.textContent = on ? 'Bottega di Otto' : 'Chiedi a Otto';
  const sm = sp.querySelector('small'); if (sm) { sm.dataset.orig ||= sm.textContent; sm.textContent = on ? 'Spendi i punti in potenziamenti' : sm.dataset.orig; }
 });
}
// Chiamata dall'app dopo ogni render: inserisce la sfida sotto il titolo della pagina.
export function mountGame(page, main) {
 clearTimeout(timer); markNav(); syncShopLabels(); setTimeout(markTargets, 30); setTimeout(coachMission, 600);
 const html = inner(page); if (!html) return;
 const box = `<div class="game-slot" data-gslot="${page}">${html}</div>`;
 // la cosa arrivata va dove arriverebbe davvero: ogni sezione indica il suo posto con data-anchor
 const anchor = main.querySelector('[data-anchor]');
 const head = main.querySelector(':scope > .page-heading');
 if (anchor) anchor.insertAdjacentHTML('afterbegin', box);
 else head ? head.insertAdjacentHTML('afterend', box) : main.insertAdjacentHTML('afterbegin', box);
 arm(page);
}
function coachMission() {
 const m = document.querySelector('[data-mission]:not(.is-ok):not(.is-ko)');
 if (!m) return;
 const base = `[data-mission="${m.dataset.mission}"]`;
 // la prima missione di ogni settore la spiega un Otto di quel settore: cosa fare e perché
 const ms = S.missions[m.dataset.mission], b = ms?.brief;
 if (b && !S.coached[`brief-${ms.page}`]) return storyChat(ms, base);
 const sel = m.querySelector('.mg-docs') ? `${base} .mg-docs` : m.querySelector('.mg-sources') ? `${base} .mg-sources` : `${base} .mg`;
 coach('inside', sel, 'Guarda i documenti', 'Qui ci sono le fonti vere. **I numeri in arancione** sono quelli da confrontare. Leggi con calma, poi decidi.', 'otto-read');
}
// Aggiorna solo il contenuto della scheda, senza ridisegnare la pagina (e senza rifarne l'animazione d'ingresso).
function refresh(page) {
 if ((location.hash.slice(1) || 'home') !== page) return;
 const el = document.querySelector(`[data-gslot="${page}"]`), main = document.querySelector('#main');
 if (!el) { if (main) mountGame(page, main); return; }
 const html = inner(page);
 if (html) { el.innerHTML = html; arm(page); } else el.remove();
 markNav(); markTargets();
}

// ————— punteggio —————
function pick(id, i, btn) {
 const c = challenge(id), k = S.cards[id], o = c.options[i];
 if (!c || !k || k.result) return;
 const b = base[c.level], keys = keySources(c), checked = keys.length && keys.every(x => k.opened.includes(x));
 let pts, label;
 if (o.ok) { pts = keys.length ? (checked ? b + b / 2 : b / 2) : b; label = keys.length ? (checked ? 'Verificato alla fonte' : 'Giusto, ma alla cieca') : 'Ottima scelta'; S.streak++; S.last = 'ok'; }
 else if (o.partial) { pts = b / 2; label = 'Funziona, ma si poteva fare meglio'; S.last = 'ok'; }
 else { pts = -b / 2; label = 'Da rivedere'; S.streak = 0; S.last = 'ko'; }
 let why = o.why || '';
 if (o.ok && keys.length && !checked) why += ' La prossima volta apri la fonte prima di approvare: vale il triplo.';
 if (o.ok && S.streak && S.streak % 3 === 0) { pts += 15; why += ` **Serie di ${S.streak} decisioni giuste: +15 bonus.**`; }
 pts = Math.max(pts, -S.points);
 S.points += pts; S.solved[id] = true; k.result = {pts, label, why};
 play(pts > 0 ? (pts >= 30 ? 'great' : 'good') : pts < 0 ? 'bad' : 'click');
 refresh(c.page);
 float(pts, document.querySelector(`[data-gcard="${id}"] .gc-result b`) || btn);
 markNav();
 if (!open().length) setTimeout(levelUp, 650);
}
function levelUp() {
 if (open().length) return;
 if (S.level < 3) {
  S.level++; openLevel(); updateChip(); markNav();
  celebrate(`Livello ${S.level}`, levelNotes[S.level]);
 } else {
  const total = S.points;
  S.round++; S.level = 1; S.solved = {}; S.avail = {}; S.cards = Object.fromEntries(Object.entries(S.cards).filter(([id]) => Object.values(S.showing).includes(id)));
  openLevel(); updateChip(); markNav();
  celebrate('Giornata completata!', `${total} punti. Domani si ricomincia, ma ogni decisione è a tempo.`);
 }
}

// ————— animazioni e suoni —————
function float(pts, from, label) {
 if (!from || !pts) return updateChip();
 const chip = document.querySelector('.game-chip'), r = from.getBoundingClientRect();
 const el = document.createElement('div');
 el.className = `game-float ${pts < 0 ? 'neg' : ''} ${label ? 'eco' : ''}`; el.textContent = `${pts > 0 ? '+' : ''}${pts}${label ? ` · ${label}` : ''}`;
 el.style.left = `${r.left + 30}px`; el.style.top = `${r.top}px`;
 document.body.append(el);
 let ended = false;
 const done = () => { if (ended) return; ended = true; el.remove(); updateChip(pts > 0 ? 'bump' : 'bump-bad'); };
 setTimeout(done, 1500); // se il browser sospende le animazioni (scheda in background), i punti arrivano comunque
 if (calm.matches || !chip) { setTimeout(done, 400); return; }
 const c = chip.getBoundingClientRect();
 const dx = c.left + c.width / 2 - r.left - 30, dy = c.top + c.height / 2 - r.top;
 const frames = pts > 0
  ? [{transform:'translate(-50%,0) scale(.6)', opacity:0}, {transform:'translate(-50%,-30px) scale(1.3)', opacity:1, offset:.3}, {transform:`translate(calc(-50% + ${dx}px), ${dy}px) scale(.5)`, opacity:.85}]
  : [{transform:'translate(-50%,0)', opacity:0}, {transform:'translate(-50%,-16px)', opacity:1, offset:.3}, {transform:'translate(-50%,26px)', opacity:0}];
 el.animate(frames, {duration:pts > 0 ? 1050 : 900, easing:'cubic-bezier(.3,.7,.35,1)'}).onfinish = done;
}
function burst(chip, bad) {
 const r = chip.getBoundingClientRect();
 for (let i = 0; i < (bad ? 0 : 8); i++) {
  const p = document.createElement('i'); p.className = 'game-spark';
  p.style.left = `${r.left + r.width / 2}px`; p.style.top = `${r.top + r.height / 2}px`;
  document.body.append(p); setTimeout(() => p.remove(), 900);
  const a = i / 8 * Math.PI * 2, d = 26 + Math.random() * 14;
  p.animate([{transform:'translate(-50%,-50%) scale(1)', opacity:1}, {transform:`translate(calc(-50% + ${Math.cos(a) * d}px), calc(-50% + ${Math.sin(a) * d}px)) scale(.2)`, opacity:0}], {duration:650, easing:'cubic-bezier(.2,.8,.3,1)'}).onfinish = () => p.remove();
 }
}
function celebrate(title, text) {
 play('level');
 const chip = document.querySelector('.game-chip'); if (!chip) return;
 document.querySelector('.game-level')?.remove();
 const r = chip.getBoundingClientRect(), el = document.createElement('div');
 el.className = 'game-level'; el.setAttribute('role', 'status');
 el.innerHTML = `<span>${icon('otto-happy')}</span><div><b>${esc(title)}</b><p>${esc(text)}</p></div>`;
 el.style.top = `${r.bottom + 12}px`; el.style.right = `${Math.max(12, innerWidth - r.right)}px`;
 document.body.append(el);
 setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 350); }, 4200);
}
// Alla fine della demo guidata: un invito discreto, vicino ai punti.
export function gameInvite() {
 markNav();
 if (S.started) return;
 setTimeout(() => celebrate('Ora prova tu', 'Avvia la sfida di Otto da “Sfida” in alto: le decisioni vere passano a te.'), 500);
}
// Introduzione in tre passaggi, prima della prima partita: spiega che il gioco è il funzionamento reale del sistema.
let introSeen = false;
export function gameIntro() {
 if (S.started) return;
 document.querySelector('.game-pop')?.remove();
 const types = hooks.missionTypes || 18, sections = hooks.sections || 12;
 const slides = [
  [icon('otto-happy'), 'Questa demo si gioca', `Il sistema lavora da solo. Quando serve una persona, <b>Otto ti chiama</b>: è così che funzionerà davvero.`],
  [icon('otto-read'), 'Fai il lavoro vero', `Usi le sezioni vere, con i loro tasti. Ogni tanto arriva qualcosa che non torna, e <b>la decisione è tua</b>.`],
  [icon('otto-wink'), 'Si impara giocando', `Si comincia piano, <b>una cosa alla volta</b>. Ti spiego tutto io quando serve, e intanto <b>il tempo si ferma</b>.`]
 ];
 let k = 0;
 const el = document.createElement('div'); el.className = 'game-intro'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'Come funziona il gioco');
 const draw = () => {
  const [ic, t, x] = slides[k], last = k === slides.length - 1;
  el.innerHTML = `<div class="gi-card"><div class="gi-top"><span class="gi-face">${ic}</span><span class="gi-step">${k + 1} DI ${slides.length}</span><button class="gi-x" data-intro="close" aria-label="Chiudi">×</button></div>
   <h3>${esc(t)}</h3><p>${x}</p>
   <div class="gi-foot"><span class="gi-dots">${slides.map((_, i) => `<i class="${i === k ? 'on' : i < k ? 'done' : ''}"></i>`).join('')}</span><button class="gi-next" data-intro="${last ? 'go' : 'next'}">${last ? 'Inizia a giocare' : 'Avanti'} <span aria-hidden="true">→</span></button></div></div>`;
  el.querySelector('.gi-next').focus({preventScroll:true});
 };
 el.addEventListener('click', e => {
  const b = e.target.closest('[data-intro]'); if (!b) return;
  if (b.dataset.intro === 'next') { k++; play('click'); draw(); }
  else if (b.dataset.intro === 'go') { el.remove(); introSeen = true; start(); }
  else el.remove();
 });
 document.body.append(el); draw(); play('open');
}
function start() {
 S.started = true; openLevel(); nextTaskAt = Date.now() + 12000; hooks.onStart?.(); updateChip('bump'); play('level');
 refresh(location.hash.slice(1) || 'home'); markNav();
 setTimeout(() => startChapter(0), 1400);
 setTimeout(() => coach('welcome', '.game-chip', 'Si comincia', `Questi sono i tuoi punti. Guardati intorno con calma: ${place} lavora da solo e **ti chiamo io** quando serve.`, 'otto-happy'), 600);
}

// ————— le nuvolette di Otto —————
// Spiegano il gioco la prima volta che una cosa succede, attaccate all'elemento di cui parlano.
// Finché sono aperte il tempo è fermo: chi legge con calma non perde niente.
const coachQueue = [];
let coachOpen = null;
export function coach(key, target, title, text, mood = 'otto-wink') {
 if (!S.started || S.coached[key] || touring()) return;
 if (coachOpen) { if (!coachQueue.some(q => q[0] === key)) coachQueue.push([key, target, title, text, mood]); return; }
 let el = target;
 if (typeof target === 'string') { try { el = document.querySelector(target); } catch { el = null; } }
 if (!el || !el.isConnected || !el.getClientRects().length) return; // non è a schermo: ci riproveremo la prossima volta
 S.coached[key] = true; S.paused++; document.body.classList.add('game-paused');
 const box = document.createElement('div');
 box.className = 'game-coach'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', title);
 box.innerHTML = `<div class="gco-spot"></div><div class="gco-bubble"><span class="gco-face">${icon(mood)}</span><div><b>${esc(title)}</b><p>${rich(text)}</p><div class="gco-foot"><small>${icon('pause')} Il tempo è fermo</small><button data-coach="ok">Ho capito</button></div></div></div>`;
 document.body.append(box); play('open');
 const spot = box.querySelector('.gco-spot'), bubble = box.querySelector('.gco-bubble');
 let raf = 0;
 const sel = typeof target === 'string' ? target : null;
 const follow = () => {
  if (!el.isConnected && sel) { try { el = document.querySelector(sel) || el; } catch {} }
  const r = el.getBoundingClientRect(), p = 6;
  Object.assign(spot.style, {left:`${r.left - p}px`, top:`${r.top - p}px`, width:`${r.width + p * 2}px`, height:`${r.height + p * 2}px`});
  const bw = Math.min(340, innerWidth - 24), bh = bubble.offsetHeight;
  const below = innerHeight - r.bottom > bh + 24 || r.top < bh + 24;
  let x = r.left + r.width / 2 - bw / 2; x = Math.max(12, Math.min(innerWidth - bw - 12, x));
  const y = below ? Math.min(innerHeight - bh - 12, r.bottom + 14) : r.top - bh - 14;
  Object.assign(bubble.style, {width:`${bw}px`, left:`${x}px`, top:`${y}px`});
  bubble.dataset.arrow = below ? 'top' : 'bottom';
  bubble.style.setProperty('--ax', `${Math.max(20, Math.min(bw - 20, r.left + r.width / 2 - x))}px`);
  raf = requestAnimationFrame(follow);
 };
 const r0 = el.getBoundingClientRect();
 if (r0.bottom > innerHeight - 40 || r0.top < 80) el.scrollIntoView({block:'center', behavior:calm.matches ? 'auto' : 'smooth'});
 follow();
 coachOpen = box;
 const close = () => {
  cancelAnimationFrame(raf); box.classList.add('out'); setTimeout(() => box.remove(), 200); coachOpen = null;
  S.paused = Math.max(0, S.paused - 1); if (!S.paused) document.body.classList.remove('game-paused');
  const next = coachQueue.shift(); if (next) setTimeout(() => coach(...next), 450);
 };
 box.addEventListener('click', e => { if (e.target.closest('[data-coach]')) { play('click'); close(); } });
 box.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === 'Escape') { e.preventDefault(); close(); } });
 box.querySelector('[data-coach]').focus({preventScroll:true});
}
// ————— la chat di Otto di settore —————
// La prima volta che hai davanti un tipo di missione, l'Otto di quel settore ti racconta in chat cosa sta
// succedendo davvero: dove sei, cosa è arrivato, cosa faresti nella realtà e perché conta. Il tempo parte dopo.
function storyChat(m, sel) {
 if (coachOpen || touring()) return;
 const b = m.brief, key = `brief-${m.page}`;
 let el; try { el = document.querySelector(sel); } catch {}
 if (!el || !el.getClientRects().length) return;
 S.coached[key] = true; S.paused++; document.body.classList.add('game-paused');
 const ev = m.event ? `${m.event[0]}. ${m.event[1]}.` : `È arrivato: ${m.title}.`;
 const lines = [`Ciao, sono **${b.name}**. Adesso sei ${b.where}.`, ev, `Nella realtà: ${b.what.charAt(0).toLowerCase()}${b.what.slice(1)}`, `**Perché conta:** ${b.why}`, 'Prenditi il tempo che ti serve: **il cronometro parte solo quando premi “Sono pronto”**.'];
 const box = document.createElement('div');
 box.className = 'game-coach game-story'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', b.name);
 box.innerHTML = `<div class="gco-spot"></div><div class="gst-panel"><header><span class="gco-face">${icon(b.role)}</span><div><b>${esc(b.name)}</b><small>${icon('pause')} il tempo è fermo</small></div></header><div class="gst-msgs" aria-live="polite"></div><footer><button data-story="skip" class="gst-skip">Salta</button><button data-story="go" class="gst-go" disabled>Sono pronto</button></footer></div>`;
 document.body.append(box); play('open');
 const spot = box.querySelector('.gco-spot'), panel = box.querySelector('.gst-panel'), msgs = box.querySelector('.gst-msgs'), goBtn = box.querySelector('.gst-go');
 let raf = 0, timer = 0, k = 0;
 const follow = () => {
  if (!el.isConnected) { try { el = document.querySelector(sel) || el; } catch {} }
  const r = el.getBoundingClientRect(), p = 6;
  Object.assign(spot.style, {left:`${r.left - p}px`, top:`${r.top - p}px`, width:`${r.width + p * 2}px`, height:`${r.height + p * 2}px`});
  raf = requestAnimationFrame(follow);
 };
 const r0 = el.getBoundingClientRect();
 if (r0.top < 80 || r0.top > innerHeight * .55) el.scrollIntoView({block:'start', behavior:calm.matches ? 'auto' : 'smooth'});
 follow(); coachOpen = box;
 const next = () => {
  if (k >= lines.length) { goBtn.disabled = false; goBtn.focus({preventScroll:true}); return; }
  const typing = document.createElement('div'); typing.className = 'gst-msg typing'; typing.innerHTML = '<i></i><i></i><i></i>';
  msgs.append(typing); msgs.scrollTop = msgs.scrollHeight;
  timer = setTimeout(() => { typing.remove(); const d = document.createElement('div'); d.className = 'gst-msg'; d.innerHTML = rich(lines[k++]); msgs.append(d); msgs.scrollTop = msgs.scrollHeight; play('click'); timer = setTimeout(next, calm.matches ? 50 : 420); }, calm.matches ? 50 : Math.min(1400, 450 + lines[k].length * 12));
 };
 next();
 const close = () => {
  clearTimeout(timer); cancelAnimationFrame(raf); box.classList.add('out'); setTimeout(() => box.remove(), 200); coachOpen = null;
  S.paused = Math.max(0, S.paused - 1); if (!S.paused) document.body.classList.remove('game-paused');
  m.armed = true; refreshMission(m.id); play('level');
  const n = coachQueue.shift(); if (n) setTimeout(() => coach(...n), 450);
 };
 box.addEventListener('click', e => {
  const t = e.target.closest('[data-story]'); if (!t) return;
  if (t.dataset.story === 'skip') { clearTimeout(timer); msgs.querySelector('.typing')?.remove(); while (k < lines.length) { const d = document.createElement('div'); d.className = 'gst-msg'; d.innerHTML = rich(lines[k++]); msgs.append(d); } msgs.scrollTop = msgs.scrollHeight; goBtn.disabled = false; t.remove(); goBtn.focus({preventScroll:true}); return; }
  close();
 });
}
// ————— la storia: capitoli con un antagonista —————
// Ogni partita è una giornata in capitoli (hooks.story). Ogni capitolo si apre e si chiude con la chat di un Otto,
// ha un obiettivo (compiti, missioni vinte in certe sezioni, punti) e cambia il gioco: sposta le missioni verso
// le sezioni dell'antagonista (bias) e stringe qualche regola (apply).
const chapters = () => hooks.story?.chapters || [];
export const storyBias = () => chapters()[S.chapter]?.bias || null;
export const chapterInfo = () => { const c = chapters()[S.chapter]; return c ? {n:S.chapter + 1, of:chapters().length, title:c.title, goal:goalText(c), progress:S.chProgress} : null; };
function goalText(c) {
 const g = c.goal, left = g.type === 'points' ? `${Math.min(g.n, S.points - S.chStart)}/${g.n} punti` : `${Math.min(g.n, S.chProgress)}/${g.n}`;
 return `${g.label} · ${left}`;
}
function startChapter(i) {
 const c = chapters()[i]; if (!c || !S.started) return;
 S.chapter = i; S.chProgress = 0; S.chStart = S.points;
 try { c.apply?.(true); } catch {}
 updateChip();
 ottoChat({name:c.narrator, role:c.role, title:`Capitolo ${i + 1} · ${c.title}`, lines:[...c.intro, `**Obiettivo:** ${c.goal.label}.`], button:'Iniziamo'});
}
function storyProgress(kind, page) {
 const c = chapters()[S.chapter]; if (!c || c.done) return;
 const g = c.goal;
 if (g.type === kind && kind !== 'points' && (!g.pages || g.pages.includes(page))) S.chProgress++;
 const ok = g.type === 'points' ? S.points - S.chStart >= g.n : S.chProgress >= g.n;
 updateChip();
 if (!ok) return;
 c.done = true;
 setTimeout(() => {
  try { c.apply?.(false); } catch {}
  S.points += 50; updateChip('bump'); play('level');
  const last = S.chapter >= chapters().length - 1;
  ottoChat({name:c.narrator, role:c.role, title:`Capitolo ${S.chapter + 1} completato`, lines:[...c.outro, '**+50 punti** per il capitolo.', last ? (hooks.story.ending || 'La giornata è finita. Puoi continuare a giocare quanto vuoi.') : 'Ma la giornata non è finita…'], button:last ? 'Continua a giocare' : 'Avanti', onClose:() => { if (!last) setTimeout(() => startChapter(S.chapter + 1), 1200); else { S.chapter = chapters().length; updateChip(); } }});
 }, 1600);
}
// Chat di Otto senza un elemento da indicare (capitoli): pannello in basso a destra, tempo fermo.
function ottoChat({name, role, title, lines, button = 'Ho capito', onClose}) {
 if (coachOpen || touring()) { setTimeout(() => ottoChat({name, role, title, lines, button, onClose}), 1500); return; }
 S.paused++; document.body.classList.add('game-paused');
 const box = document.createElement('div');
 box.className = 'game-coach game-story no-spot'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', title);
 box.innerHTML = `<div class="gst-panel"><header><span class="gco-face">${icon(role)}</span><div><b>${esc(name)}</b><small>${esc(title)}</small></div></header><div class="gst-msgs" aria-live="polite"></div><footer><button data-story="skip" class="gst-skip">Salta</button><button data-story="go" class="gst-go" disabled>${esc(button)}</button></footer></div>`;
 document.body.append(box); play('level'); coachOpen = box;
 const msgs = box.querySelector('.gst-msgs'), goBtn = box.querySelector('.gst-go');
 let k = 0, timer = 0;
 const add = () => { const d = document.createElement('div'); d.className = 'gst-msg'; d.innerHTML = rich(lines[k++]); msgs.append(d); msgs.scrollTop = msgs.scrollHeight; };
 const next = () => {
  if (k >= lines.length) { goBtn.disabled = false; goBtn.focus({preventScroll:true}); return; }
  const typing = document.createElement('div'); typing.className = 'gst-msg typing'; typing.innerHTML = '<i></i><i></i><i></i>'; msgs.append(typing); msgs.scrollTop = msgs.scrollHeight;
  timer = setTimeout(() => { typing.remove(); add(); play('click'); timer = setTimeout(next, calm.matches ? 50 : 380); }, calm.matches ? 50 : Math.min(1300, 400 + lines[k].length * 11));
 };
 next();
 box.addEventListener('click', e => {
  const t = e.target.closest('[data-story]'); if (!t) return;
  if (t.dataset.story === 'skip') { clearTimeout(timer); msgs.querySelector('.typing')?.remove(); while (k < lines.length) add(); goBtn.disabled = false; t.remove(); goBtn.focus({preventScroll:true}); return; }
  clearTimeout(timer); box.classList.add('out'); setTimeout(() => box.remove(), 200); coachOpen = null;
  S.paused = Math.max(0, S.paused - 1); if (!S.paused) document.body.classList.remove('game-paused');
  onClose?.();
  const n = coachQueue.shift(); if (n) setTimeout(() => coach(...n), 450);
 });
}
export const gamePaused = () => S.paused > 0;
export const isReserved = ref => ref != null && (openTasks().some(t => t.ref != null && String(t.ref) === String(ref)) || openMissions().some(m => m.ref != null && String(m.ref) === String(ref)));
// Le missioni arrivano solo dopo due compiti fatti, e mai oltre il numero di cose aperte del livello.
export const canSpawnMission = () => S.started && !S.paused && S.tasksDone >= 2 && openAll().length < maxOpen();

let ac;
function tone(f, t0, dur, type = 'sine', vol = .06, f2) {
 const a = ac, o = a.createOscillator(), g = a.createGain(), t = a.currentTime + t0;
 o.type = type; o.frequency.setValueAtTime(f, t); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
 g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + .012); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
 o.connect(g).connect(a.destination); o.start(t); o.stop(t + dur + .03);
}
const sfx = {
 click:() => tone(2100, 0, .035, 'square', .018),
 open:() => { tone(1400, 0, .04, 'triangle', .03); tone(1900, .03, .05, 'triangle', .02); },
 good:() => { tone(784, 0, .14); tone(1175, .08, .26); },
 great:() => { tone(784, 0, .12); tone(988, .07, .12); tone(1319, .14, .34, 'sine', .07); },
 bad:() => tone(330, 0, .28, 'triangle', .05, 170),
 level:() => [523, 659, 784, 1047].forEach((f, i) => tone(f, i * .09, .3, 'sine', .055)),
 coin:() => { tone(988, 0, .07, 'square', .03); tone(1319, .07, .16, 'square', .03); }
};
function play(name) {
 if (!S.sound) return;
 try { ac ||= new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === 'suspended') ac.resume(); sfx[name](); } catch {}
}

// ————— menu della sfida —————
function menu() {
 const pop = document.querySelector('.game-pop');
 if (pop) { pop.remove(); return; }
 const chip = document.querySelector('.game-chip'); if (!chip) return;
 const r = chip.getBoundingClientRect(), el = document.createElement('div');
 el.className = 'game-pop'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'La sfida di Otto');
 const list = open();
 if (!S.started) el.innerHTML = `<header><span>${icon('otto-happy')}</span><div><b>La sfida di Otto</b><small>Spenta · si attiva solo se vuoi</small></div></header>
  <p>Prova a gestire ${place} come se fosse tuo. <b>Otto prepara, tu verifichi:</b> apri le fonti, poi approva la scelta giusta. Decisioni vere su tre livelli.${hooks.menuNote ? ' ' + esc(hooks.menuNote) : ''}</p>
  <ul class="gp-rules"><li><i class="ok"></i>Giusto e verificato alla fonte <b>pieno + bonus</b></li><li><i class="mid"></i>Giusto ma alla cieca <b>metà</b></li><li><i class="ko"></i>Scelta sbagliata <b>punti in meno</b></li></ul>
  <button class="gp-start" data-game="start">Inizia la sfida</button>
  <footer><button data-game="sound">${S.sound ? 'Suoni attivi' : 'Suoni spenti'}</button></footer>`;
 else el.innerHTML = `<header><span>${icon(face())}</span><div><b>La sfida di Otto</b><small>Livello ${S.level} di 3${S.round > 1 ? ` · giorno ${S.round}` : ''} · ${S.points} punti</small></div></header>
  ${chapterInfo() ? `<p class="gp-chapter"><b>Capitolo ${chapterInfo().n} di ${chapterInfo().of} · ${esc(chapterInfo().title)}</b><br>${esc(chapterInfo().goal)}</p>` : '<p>Gestisci il lavoro come se fosse tuo. <b>Otto prepara, tu verifichi.</b></p>'}
  <ul class="gp-rules"><li><i class="ok"></i>Giusto e verificato alla fonte <b>pieno + bonus</b></li><li><i class="mid"></i>Giusto ma alla cieca <b>metà</b></li><li><i class="ko"></i>Scelta sbagliata <b>punti in meno</b></li></ul>
  ${list.length ? `<span class="gp-label">DECISIONI APERTE</span>${list.map(c => `<button class="gp-item" data-game="go:${c.page}"><b>${esc(c.title)}</b><small>${esc(pageName(c.page))} · ${Math.max(0, Math.ceil(left(c) / 1000))} s · fino a +${maxPts(c)} pt</small></button>`).join('')}` : ''}
  <button class="gp-start shop" data-game="shop">${S.gift ? 'Apri il regalo di Otto' : 'Bottega di Otto'}</button>
  <footer><button data-game="sound">${S.sound ? 'Suoni attivi' : 'Suoni spenti'}</button><button data-game="restart">Ricomincia da zero</button></footer>`;
 el.style.top = `${r.bottom + 10}px`; el.style.right = `${Math.max(12, innerWidth - r.right)}px`;
 document.body.append(el);
}
function go(page, ref) {
 if (ref && hooks.focus) return hooks.focus(page, ref);
 if ((location.hash.slice(1) || 'home') !== page) location.hash = page;
 setTimeout(() => document.querySelector('[data-mission]')?.scrollIntoView({block:'center', behavior:'smooth'}), 150);
}
function missionAction(id, action, v, from) {
 const m = S.missions[id]; if (!m || m.result) return;
 const r = m.handle(m.data, m.st, action, v);
 if (r?.done) return resolveMission(m, r, from);
 if (r?.sound) play(r.sound); else play('click');
 refreshMission(id);
}
function onInput(e) {
 const t = e.target.closest?.('[data-mg-input]'); if (!t) return;
 const [id, i] = t.dataset.mgInput.split(':'), m = S.missions[id]; if (!m || m.result) return;
 // anche incollando o scrivendo veloce: i caratteri in più scorrono nelle caselle successive
 const boxes = [...t.parentElement.querySelectorAll('[data-mg-input]')], chars = [...t.value.toUpperCase().replace(/\s/g, '')];
 if (!chars.length) { m.handle(m.data, m.st, 'type', {i:+i, v:''}); return; }
 let j = +i;
 for (const ch of chars) { if (!boxes[j]) break; boxes[j].value = ch; boxes[j].classList.remove('bad'); m.handle(m.data, m.st, 'type', {i:j, v:ch}); j++; }
 play('click'); (boxes[j] || boxes[boxes.length - 1]).focus();
}
function onKey(e) {
 const t = e.target.closest?.('[data-mg-input]'); if (!t) return;
 const boxes = [...t.parentElement.querySelectorAll('[data-mg-input]')], i = boxes.indexOf(t);
 if (e.key === 'Backspace' && !t.value && i > 0) { boxes[i - 1].focus(); e.preventDefault(); }
 if (e.key === 'Enter') { e.preventDefault(); missionAction(t.dataset.mgInput.split(':')[0], 'confirm', '0', t); }
}
// ————— la Bottega di Otto —————
// Con la sfida avviata, "Chiedi a Otto" diventa il mercante: con i punti si comprano potenziamenti per questa partita.
// A certe soglie di punti Otto fa un regalo: tre potenziamenti a caso, se ne sceglie uno gratis.
const urgent = () => openMissions().sort((a, b) => missionLeft(a) - missionLeft(b))[0];
const catalog = [
 {id:'tempo', name:'Tempo extra', desc:'+60 secondi a compiti e missioni aperti.', cost:15, mood:'otto-happy', use:() => { const l = openMissions(), t = openTasks(); if (!l.length && !t.length) return false; l.forEach(m => { m.ttl += 60000; refreshMission(m.id); }); t.forEach(x => { x.ttl += 60000; }); refresh(location.hash.slice(1) || 'home'); return `+60 secondi a ${l.length + t.length} tra compiti e missioni.`; }},
 {id:'pausa', name:'Pausa caffè', desc:'Ferma tutti i timer per un minuto.', cost:20, mood:'otto-read', use:() => { S.fx.freezeUntil = Date.now() + 60000; return 'Timer fermi per 60 secondi: respira.'; }},
 {id:'scudo', name:'Scudo di Otto', desc:'Il prossimo errore non ti toglie punti.', cost:25, mood:'otto-wink', use:() => { S.fx.shield++; return 'Scudo attivo sul prossimo errore.'; }},
 {id:'lente', name:'Lente di Otto', desc:'I prossimi 3 indizi sono gratis.', cost:30, mood:'otto-read', use:() => { S.fx.freeHints += 3; return '3 indizi gratis pronti.'; }},
 {id:'meta', name:'Metà lavoro', desc:'Otto fa metà della missione più urgente.', cost:30, mood:'otto-think', use:() => { const m = urgent(); if (!m) return false; halfWork(m); return `Otto ha fatto metà di “${m.title}”.`; }},
 {id:'doppio', name:'Punti doppi', desc:'Raddoppia le prossime 3 missioni vinte.', cost:40, mood:'otto-happy', use:() => { S.fx.double += 3; return 'Le prossime 3 missioni vinte valgono doppio.'; }},
 {id:'delega', name:'Delega a Otto', desc:'Otto chiude per te la missione più urgente (+15 pt).', cost:25, mood:'otto-wink', use:() => { const m = urgent(); if (!m) return false; resolveMission(m, {pts:15, delegated:true, label:'Delegata a Otto', why:'Otto l’ha chiusa al posto tuo: meno punti, ma tempo risparmiato per le altre.'}); return `Otto ha chiuso “${m.title}”.`; }}
];
function halfWork(m) {
 const st = m.st, n = Math.max(1, Math.ceil((m.data.items?.length || m.data.chips?.filter(c => c.ok).length || 2) / 2));
 let msg = '';
 for (let k = 0; k < (['triage', 'classify', 'multi'].includes(m.kind) ? n : 1); k++) msg = m.hint?.(m.data, st) || msg;
 st.hintMsg = `Metà lavoro fatto da Otto. ${msg}`;
 refreshMission(m.id);
}
const sample = (n, not = []) => allItems().filter(c => !not.includes(c.id)).sort(() => Math.random() - .5).slice(0, n);
function checkGifts() {
 for (const t of [100, 250, 450, 700, 1000]) if (S.points >= t && !S.gifts.includes(t)) {
  S.gifts.push(t); S.gift = sample(3);
  setTimeout(() => S.coached.gift ? celebrate('Un regalo per te', 'Aprilo nella Bottega di Otto.') : coach('gift', '.ask-otto', 'Un regalo per te', `Hai superato ${t} punti: nella **Bottega di Otto** scegli un potenziamento gratis.`, 'otto-happy'), 1400);
  updateChip();
  break;
 }
}
export const gameOn = () => S.started;
export function openShop() {
 document.querySelector('.game-pop')?.remove();
 if (S.offers.length < 4) S.offers = sample(4).map(c => c.id);
 let el = document.querySelector('.otto-shop');
 if (!el) { el = document.createElement('aside'); el.className = 'otto-shop'; el.setAttribute('aria-label', 'Bottega di Otto'); document.body.append(el); }
 const active = [S.fx.shield && `Scudo ×${S.fx.shield}`, S.fx.double && `Punti doppi ×${S.fx.double}`, S.fx.freeHints && `Indizi gratis ×${S.fx.freeHints}`, Date.now() < S.fx.freezeUntil && 'Timer fermi'].filter(Boolean);
 el.innerHTML = `<header><span class="shop-otto">${icon('otto-happy')}</span><div><b>Bottega di Otto</b><small>Hai <strong>${S.points}</strong> punti da spendere</small></div><button class="icon-btn" data-game="shopclose" aria-label="Chiudi la bottega">×</button></header>
  ${S.gift ? `<section class="shop-gift"><span class="gp-label">REGALO · SCEGLINE UNO</span>${S.gift.map(c => `<button class="shop-item gift" data-game="gift:${c.id}">${icon(c.mood)}<span><b>${esc(c.name)}</b><small>${esc(c.desc)}</small></span><em>gratis</em></button>`).join('')}</section>` : ''}
  <span class="gp-label">IN VENDITA OGGI</span>
  <div class="shop-list">${S.offers.map(id => allItems().find(c => c.id === id)).filter(Boolean).map(c => `<button class="shop-item" data-game="buy:${c.id}" ${S.points < price(c) ? 'disabled' : ''}>${icon(c.mood)}<span><b>${esc(c.name)}</b><small>${esc(c.desc)}${S.bought[c.id] ? ` · comprato ${S.bought[c.id]} ${S.bought[c.id] === 1 ? 'volta' : 'volte'}` : ''}</small></span><em>${price(c)} pt</em></button>`).join('')}</div>
  ${active.length ? `<div class="shop-active"><span class="gp-label">ATTIVI ORA</span>${active.map(a => `<i>${a}</i>`).join('')}</div>` : ''}
  <p class="shop-note">${S.shopNote ? esc(S.shopNote) : 'Le offerte cambiano ogni volta che compri. A 100, 250, 450, 700 e 1.000 punti Otto ti fa un regalo.'}</p>`;
}
function buy(id, free) {
 const c = allItems().find(x => x.id === id); if (!c) return;
 if (!free && S.points < price(c)) { play('bad'); return; }
 const res = c.use();
 if (res === false) { S.shopNote = 'Non ci sono missioni aperte su cui usarlo: tienilo per dopo.'; play('bad'); return openShop(); }
 if (!free) { S.points -= price(c); S.bought[c.id] = (S.bought[c.id] || 0) + 1; S.offers = S.offers.filter(x => x !== id); S.offers.push(sample(1, S.offers.concat(id))[0]?.id || id); }
 else S.gift = null;
 S.shopNote = `${free ? 'Regalo usato' : `Comprato: ${c.name}`}. ${res}`;
 play('level'); updateChip(free ? 'bump' : 'bump-bad'); markNav(); openShop();
}

function onClick(e) {
 if (!e.target.closest('.gc-nextm')) { clearTimeout(autoNext); document.querySelectorAll('.gc-auto').forEach(x => x.remove()); }
 const b = e.target.closest('[data-game]');
 if (!b) { if (!e.target.closest('.game-pop')) document.querySelector('.game-pop')?.remove(); return; }
 const [k, id, i] = b.dataset.game.split(':');
 if (k !== 'menu' && k !== 'sound' && k !== 'alert') document.querySelector('.game-pop')?.remove();
 if (k === 'menu') { play('click'); return menu(); }
 if (k === 'start') return introSeen ? start() : gameIntro();
 if (k === 'alert') { play('click'); return chooser(); }
 if (k === 'go') return go(id, i);
 if (k === 'mg') return missionAction(id, i, b.dataset.game.split(':').slice(3).join(':'), b);
 if (k === 'hint') return useHint(id, b);
 if (k === 'shop') return openShop();
 if (k === 'shopclose') { document.querySelector('.otto-shop')?.remove(); S.shopNote = ''; return; }
 if (k === 'buy') return buy(id);
 if (k === 'gift') return buy(id, true);
 if (k === 'mclose') return closeAndNext(id);
 if (k === 'src') { const c = S.cards[id]; if (c && !c.opened.includes(+i)) c.opened.push(+i); play('open'); return refresh(challenge(id).page); }
 if (k === 'pick') return pick(id, +i, b);
 if (k === 'next') { const c = challenge(id); delete S.showing[c.page]; play('click'); return refresh(c.page); }
 if (k === 'sound') { S.sound = !S.sound; try { localStorage.setItem('csd.game.sound', S.sound ? 'on' : 'off'); } catch {} b.textContent = S.sound ? 'Suoni attivi' : 'Suoni spenti'; play('click'); return; }
 if (k === 'restart') { hooks.onReset?.(); Object.assign(S, {chapter:-1, chProgress:0, chStart:0, bought:{}, paused:0, coached:{}, tasksDone:0, tasks:{}, fx:{shield:0, double:0, freeHints:0, freezeUntil:0}, gifts:[], gift:null, offers:[], missions:{}, avail:{}, seenOpen:0, started:false, points:0, level:1, round:1, streak:0, last:null, solved:{}, cards:{}, showing:{}}); updateChip(); refresh(location.hash.slice(1) || 'home'); }
}
