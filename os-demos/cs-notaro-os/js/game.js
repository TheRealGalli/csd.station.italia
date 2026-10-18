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
const S = {missions:{}, mseq:0, avail:{}, seenOpen:0, started:false, points:0, level:1, round:1, streak:0, last:null, solved:{}, cards:{}, showing:{}, sound:true};
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
 if (!hooks.missionsOnly) return;
 const l = S.points >= 300 ? 3 : S.points >= 120 ? 2 : 1;
 if (l > S.level) { S.level = l; updateChip(); setTimeout(() => celebrate(`Livello ${l}`, l === 2 ? 'Ora possono arrivare tre missioni insieme, con un po’ meno tempo.' : 'Ultimo livello: missioni più veloci. Le fonti restano la tua arma.'), 900); }
}
// Missioni: decisioni legate a un elemento preciso (un'email), con il loro minigioco. Le crea il regista dell'app.
const missionLeft = m => m.ttl - (Date.now() - m.created);
const openMissions = () => Object.values(S.missions).filter(m => !m.result);
const openAll = () => [...open().map(c => ({id:c.id, title:c.title, page:c.page, left:left(c), pts:maxPts(c)})), ...openMissions().map(m => ({id:m.id, title:m.title, page:m.page, ref:m.ref, left:missionLeft(m), pts:45}))];
export function addMission(m) {
 const id = `ms${++S.mseq}`;
 S.missions[id] = {...m, id, created:Date.now(), st:{id}, result:null};
 markNav(); updateAlert();
 return id;
}
export function missionPanel(id) {
 const m = S.missions[id]; if (!m || m.closed) return '';
 const r = m.result, elapsed = (m.ttl - missionLeft(m)) / 1000;
 return `<section class="game-card mission l2 ${r ? (r.pts < 0 ? 'is-ko' : 'is-ok') : ''}" data-mission="${id}">
  <div class="gc-top"><span class="gc-tag">${icon(r ? (r.pts < 0 ? 'otto-think' : 'otto-happy') : 'otto-read')} MISSIONE · ${esc(m.label)}</span>${r ? '' : '<span class="gc-worth">fino a +45 pt</span>'}</div>
  ${r ? '' : `<div class="gc-timer"><i style="animation-duration:${m.ttl / 1000}s;animation-delay:-${elapsed.toFixed(1)}s"></i></div>`}
  <div class="mg">${m.render(m.data, m.st)}</div>
  ${r ? `<div class="gc-result"><b class="${r.pts < 0 ? 'neg' : ''}">${r.pts > 0 ? '+' : ''}${r.pts} pt · ${esc(r.label)}</b><p>${rich(r.why)}</p><button data-game="mclose:${id}">Fatto ${icon('check')}</button></div>` : ''}
 </section>`;
}
function refreshMission(id) {
 const el = document.querySelector(`[data-mission="${id}"]`);
 if (el) el.outerHTML = missionPanel(id);
}
function resolveMission(m, r, from) {
 m.st.done = true;
 let pts = Math.max(r.pts, -S.points);
 if (pts > 0) { S.streak++; S.last = 'ok'; if (S.streak % 3 === 0) { pts += 15; r.why += ` **Serie di ${S.streak}: +15 bonus.**`; } } else { S.streak = 0; S.last = 'ko'; }
 S.points += pts; m.result = {...r, pts}; syncLevel();
 play(pts > 0 ? (pts >= 30 ? 'great' : 'good') : 'bad');
 refreshMission(m.id);
 float(pts, document.querySelector(`[data-mission="${m.id}"] .gc-result b`) || from);
 markNav(); updateAlert();
 m.onDone?.();
}
const keySources = c => (c.sources || []).map((s, i) => s.key ? i : -1).filter(i => i >= 0);
const maxPts = c => base[c.level] + (keySources(c).length ? base[c.level] / 2 : 0);
const face = () => S.last === 'ko' ? 'otto-think' : S.streak >= 3 ? 'otto-wink' : S.last === 'ok' ? 'otto-happy' : 'sparkle';
const touring = () => document.body.classList.contains('touring');
const challenge = id => list().find(c => c.id === id);

// ————— barra in alto —————
export function gameChip() {
 if (!S.started) return `<button class="game-chip idle" data-game="menu" aria-label="La sfida di Otto: avviala" title="La sfida di Otto"><span class="gch-face">${icon('otto-happy')}</span><b class="gch-play">Sfida</b></button>`;
 return `<button class="game-chip ${S.points ? '' : 'idle'}" data-game="menu" aria-label="La sfida di Otto: ${S.points} punti, livello ${S.level}" title="La sfida di Otto"><span class="gch-face">${icon(face())}</span><b class="gch-pts">${S.points}</b><small>pt</small><span class="gch-lvl">${[1, 2, 3].map(l => `<i class="${l < S.level ? 'done' : l === S.level ? 'on' : ''}"></i>`).join('')}</span></button>${alertBtn()}`;
}
function updateChip(bump) {
 document.querySelectorAll('.game-alert').forEach(el => el.remove());
 document.querySelectorAll('.game-chip').forEach(el => {
  el.outerHTML = gameChip();
 });
 updateAlert();
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
 if (S.started && hooks.missionsOnly) {
  const n = openAll().length;
  return `<div class="game-teaser"><span class="gt-face">${icon(face())}</span><p><b>La sfida di Otto · livello ${S.level}, ${S.points} punti.</b> ${n ? `${n} ${n === 1 ? 'missione aspetta' : 'missioni aspettano'}: aprile dal quadrato rosso <b class="gt-bang">!</b> in alto.` : 'Le missioni arrivano da sole: email, messaggi e chiamate. Tieni d’occhio il quadrato rosso <b class="gt-bang">!</b> in alto.'}</p></div>`;
 }
 if (!S.started) return `<div class="game-teaser"><span class="gt-face">${icon('otto-happy')}</span><p><b>Vuoi provare a gestire ${place}?</b> Con la sfida di Otto prendi tu le decisioni vere: Otto prepara, tu verifichi le fonti e approvi. Ogni scelta giusta vale punti.</p><button data-game="start">Inizia la sfida ${icon('arrow')}</button></div>`;
 const next = open()[0];
 if (!next) return '';
 return `<div class="game-teaser"><span class="gt-face">${icon(S.points ? face() : 'otto-happy')}</span><p>${S.points
  ? `<b>La sfida di Otto · livello ${S.level}, ${S.points} punti.</b> ${open().length} ${open().length === 1 ? 'decisione aspetta' : 'decisioni aspettano'}: aprile dal quadrato rosso <b class="gt-bang">!</b> in alto o dai puntini rossi nel menu.`
  : `<b>Gestisci ${place} come se fosse tuo.</b> Ogni decisione ha il suo tempo: aprile dal quadrato rosso <b class="gt-bang">!</b> in alto o dai puntini rossi nel menu.`}</p><button data-game="go:${next.page}">Vai ${icon('arrow')}</button></div>`;
}
function inner(page) {
 if (touring()) return '';
 if (!S.started) return page === 'home' ? teaser() : '';
 const showing = S.showing[page] && challenge(S.showing[page]);
 const c = showing || open().find(x => x.page === page);
 if (c) { S.showing[page] = c.id; return card(c); }
 return page === 'home' ? teaser() : '';
}
function arm() {}
// Un solo orologio per tutte le decisioni aperte: quando una scade toglie un po' di punti, meno di una scelta sbagliata.
function openLevel() { const t = Date.now(); open().forEach(c => { S.avail[c.id] ||= t; }); }
function tick() {
 if (!S.started || touring() || document.hidden) { for (const id in S.avail) S.avail[id] += 1000; openMissions().forEach(m => { m.created += 1000; }); return; }
 for (const m of openMissions()) if (missionLeft(m) <= 0) resolveMission(m, {pts:-8, label:'Tempo scaduto', why:'L’email è rimasta senza risposta: Otto l’ha rimessa in coda. Una decisione presa tardi costa meno di una sbagliata, ma costa.'});
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
  ${[...list].sort((a, b) => a.left - b.left).map(c => `<button class="gp-item ${c.ref ? 'is-mission' : ''}" data-game="go:${c.page}${c.ref ? ':' + c.ref : ''}"><b>${esc(c.title)}</b><small>${esc(pageName(c.page))} · ${Math.max(0, Math.ceil(c.left / 1000))} s · fino a +${c.pts} pt</small></button>`).join('')}`;
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
// Chiamata dall'app dopo ogni render: inserisce la sfida sotto il titolo della pagina.
export function mountGame(page, main) {
 clearTimeout(timer); markNav();
 const html = inner(page); if (!html) return;
 const box = `<div class="game-slot" data-gslot="${page}">${html}</div>`;
 const head = main.querySelector(':scope > .page-heading');
 head ? head.insertAdjacentHTML('afterend', box) : main.insertAdjacentHTML('afterbegin', box);
 arm(page);
}
// Aggiorna solo il contenuto della scheda, senza ridisegnare la pagina (e senza rifarne l'animazione d'ingresso).
function refresh(page) {
 if ((location.hash.slice(1) || 'home') !== page) return;
 const el = document.querySelector(`[data-gslot="${page}"]`), main = document.querySelector('#main');
 if (!el) { if (main) mountGame(page, main); return; }
 const html = inner(page);
 if (html) { el.innerHTML = html; arm(page); } else el.remove();
 markNav();
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
function float(pts, from) {
 if (!from || !pts) return updateChip();
 const chip = document.querySelector('.game-chip'), r = from.getBoundingClientRect();
 const el = document.createElement('div');
 el.className = `game-float ${pts < 0 ? 'neg' : ''}`; el.textContent = `${pts > 0 ? '+' : ''}${pts}`;
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
function start() {
 S.started = true; openLevel(); hooks.onStart?.(); updateChip('bump'); play('level');
 refresh(location.hash.slice(1) || 'home'); markNav();
 celebrate('La sfida è iniziata', hooks.missionsOnly ? 'Email, messaggi e chiamate da gestire arrivano dal quadrato rosso “!” in alto. Ognuna ha il suo tempo.' : 'Le decisioni arrivano dal quadrato rosso “!” in alto e dai puntini rossi nel menu. Ognuna ha il suo tempo.');
}

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
 level:() => [523, 659, 784, 1047].forEach((f, i) => tone(f, i * .09, .3, 'sine', .055))
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
  <p>Gestisci il lavoro come se fosse tuo. <b>Otto prepara, tu verifichi:</b> apri le fonti, poi approva la scelta giusta.</p>
  <ul class="gp-rules"><li><i class="ok"></i>Giusto e verificato alla fonte <b>pieno + bonus</b></li><li><i class="mid"></i>Giusto ma alla cieca <b>metà</b></li><li><i class="ko"></i>Scelta sbagliata <b>punti in meno</b></li></ul>
  ${list.length ? `<span class="gp-label">DECISIONI APERTE</span>${list.map(c => `<button class="gp-item" data-game="go:${c.page}"><b>${esc(c.title)}</b><small>${esc(pageName(c.page))} · ${Math.max(0, Math.ceil(left(c) / 1000))} s · fino a +${maxPts(c)} pt</small></button>`).join('')}` : ''}
  <footer><button data-game="sound">${S.sound ? 'Suoni attivi' : 'Suoni spenti'}</button><button data-game="restart">Ricomincia da zero</button></footer>`;
 el.style.top = `${r.bottom + 10}px`; el.style.right = `${Math.max(12, innerWidth - r.right)}px`;
 document.body.append(el);
}
function go(page, ref) {
 if (ref && hooks.focus) return hooks.focus(page, ref);
 location.hash = page;
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
function onClick(e) {
 const b = e.target.closest('[data-game]');
 if (!b) { if (!e.target.closest('.game-pop')) document.querySelector('.game-pop')?.remove(); return; }
 const [k, id, i] = b.dataset.game.split(':');
 if (k !== 'menu' && k !== 'sound' && k !== 'alert') document.querySelector('.game-pop')?.remove();
 if (k === 'menu') { play('click'); return menu(); }
 if (k === 'start') return start();
 if (k === 'alert') { play('click'); return chooser(); }
 if (k === 'go') return go(id, i);
 if (k === 'mg') return missionAction(id, i, b.dataset.game.split(':').slice(3).join(':'), b);
 if (k === 'mclose') { S.missions[id].closed = true; refreshMission(id); return; }
 if (k === 'src') { const c = S.cards[id]; if (c && !c.opened.includes(+i)) c.opened.push(+i); play('open'); return refresh(challenge(id).page); }
 if (k === 'pick') return pick(id, +i, b);
 if (k === 'next') { const c = challenge(id); delete S.showing[c.page]; play('click'); return refresh(c.page); }
 if (k === 'sound') { S.sound = !S.sound; try { localStorage.setItem('csd.game.sound', S.sound ? 'on' : 'off'); } catch {} b.textContent = S.sound ? 'Suoni attivi' : 'Suoni spenti'; play('click'); return; }
 if (k === 'restart') { hooks.onReset?.(); Object.assign(S, {missions:{}, avail:{}, seenOpen:0, started:false, points:0, level:1, round:1, streak:0, last:null, solved:{}, cards:{}, showing:{}}); updateChip(); refresh(location.hash.slice(1) || 'home'); }
}
