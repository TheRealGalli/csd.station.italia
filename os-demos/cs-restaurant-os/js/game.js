// Modalità sfida CSD Station. Motore unico, identico in CS Restaurant OS e CS Notaro OS: cambiano solo le sfide (challenges.js).
// L'idea è quella del prodotto: Otto prepara, tu verifichi. Si guadagnano punti aprendo la fonte e scegliendo bene,
// si perdono solo con una scelta sbagliata. Chi non tocca niente resta a 0 punti e vede la demo come sempre.
//
// Sfida: {id, level:1|2|3, page, title, text, sources:[{label, text, key}], options:[{label, ok, partial, why}]}
// Nei testi **grassetto**, nelle fonti ==evidenziato==.
const calm = matchMedia('(prefers-reduced-motion: reduce)');
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rich = v => esc(v).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/==(.+?)==/g, '<mark>$1</mark>');
const base = {1:10, 2:20, 3:30};
const levelNotes = {1:'Si comincia: scelte chiare per prendere la mano.', 2:'Arrivano le prime trappole. Prima di approvare, apri le fonti.', 3:'Ultimo livello: errori sottili e un po’ di fretta.'};

let C = [], icon = () => '', pageName = id => id, place = 'lo studio', timer = 0;
const S = {points:0, level:1, round:1, streak:0, last:null, solved:{}, cards:{}, showing:{}, sound:true};
try { S.sound = localStorage.getItem('csd.game.sound') !== 'off'; } catch {}

export function initGame(challenges, opts) {
 C = challenges; icon = opts.icon; pageName = opts.pageName || pageName; place = opts.place || place;
 document.addEventListener('click', onClick);
}

// ————— stato —————
const timed = c => c.level === 3 || S.round > 1;
const duration = c => c.level === 3 ? 45 : 60;
const open = () => C.filter(c => c.level === S.level && !S.solved[c.id]);
const keySources = c => (c.sources || []).map((s, i) => s.key ? i : -1).filter(i => i >= 0);
const maxPts = c => base[c.level] + (keySources(c).length ? base[c.level] / 2 : 0);
const face = () => S.last === 'ko' ? 'otto-think' : S.streak >= 3 ? 'otto-wink' : S.last === 'ok' ? 'otto-happy' : 'sparkle';
const touring = () => document.body.classList.contains('touring');
const challenge = id => C.find(c => c.id === id);

// ————— barra in alto —————
export function gameChip() {
 return `<button class="game-chip ${S.points ? '' : 'idle'}" data-game="menu" aria-label="La sfida di Otto: ${S.points} punti, livello ${S.level}" title="La sfida di Otto"><span class="gch-face">${icon(face())}</span><b class="gch-pts">${S.points}</b><small>pt</small><span class="gch-lvl">${[1, 2, 3].map(l => `<i class="${l < S.level ? 'done' : l === S.level ? 'on' : ''}"></i>`).join('')}</span></button>`;
}
function updateChip(bump) {
 document.querySelectorAll('.game-chip').forEach(el => {
  el.outerHTML = gameChip();
 });
 const chip = document.querySelector('.game-chip');
 if (bump && chip && !calm.matches) { chip.classList.add(bump); burst(chip, bump === 'bump-bad'); }
}

// ————— scheda della sfida dentro la pagina —————
function card(c) {
 const k = S.cards[c.id] ||= {opened:[], start:0, expired:false, seen:false};
 const t = timed(c) && !k.result && !k.expired;
 if (t && !k.start) k.start = Date.now();
 const elapsed = k.start ? (Date.now() - k.start) / 1000 : 0;
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
   : k.expired ? `<div class="gc-wait"><p>Tempo scaduto: Otto ha messo la decisione in attesa. Nessun punto perso.</p><button data-game="retry:${c.id}">Riprova</button></div>`
   : `<div class="gc-options">${c.options.map((o, i) => `<button data-game="pick:${c.id}:${i}">${esc(o.label)}</button>`).join('')}</div>`}
 </section>`;
}
function teaser() {
 const next = open()[0];
 if (!next) return '';
 return `<div class="game-teaser"><span class="gt-face">${icon(S.points ? face() : 'otto-happy')}</span><p>${S.points
  ? `<b>La sfida di Otto · livello ${S.level}, ${S.points} punti.</b> Prossima decisione in <b>${esc(pageName(next.page))}</b>.`
  : `<b>Gestisci ${place} come se fosse tuo.</b> Otto prepara, tu verifichi: ogni decisione presa bene vale punti. La prima ti aspetta in <b>${esc(pageName(next.page))}</b>.`}</p><button data-game="go:${next.page}">Vai ${icon('arrow')}</button></div>`;
}
function inner(page) {
 if (touring()) return '';
 const showing = S.showing[page] && challenge(S.showing[page]);
 const c = showing || open().find(x => x.page === page);
 if (c) { S.showing[page] = c.id; return card(c); }
 return page === 'home' ? teaser() : '';
}
function arm(page) {
 clearTimeout(timer);
 const id = S.showing[page], c = id && challenge(id), k = c && S.cards[c.id];
 if (c && k?.start && !k.result && !k.expired) {
  const left = duration(c) * 1000 - (Date.now() - k.start);
  timer = setTimeout(() => { if (!k.result && !touring()) { k.expired = true; k.start = 0; refresh(page); } }, Math.max(0, left));
 }
}
// Chiamata dall'app dopo ogni render: inserisce la sfida sotto il titolo della pagina.
export function mountGame(page, main) {
 clearTimeout(timer);
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
 if (!open().length) setTimeout(levelUp, 650);
}
function levelUp() {
 if (S.level < 3) {
  S.level++; updateChip();
  celebrate(`Livello ${S.level}`, levelNotes[S.level]);
 } else {
  const total = S.points;
  S.round++; S.level = 1; S.solved = {}; S.cards = Object.fromEntries(Object.entries(S.cards).filter(([id]) => Object.values(S.showing).includes(id)));
  updateChip();
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
 const next = open()[0]; if (!next || S.points) return;
 setTimeout(() => celebrate('Ora prova tu', `Otto ha una decisione per te in ${pageName(next.page)}. Aprila dai punti in alto.`), 500);
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
 el.innerHTML = `<header><span>${icon(face())}</span><div><b>La sfida di Otto</b><small>Livello ${S.level} di 3${S.round > 1 ? ` · giorno ${S.round}` : ''} · ${S.points} punti</small></div></header>
  <p>Gestisci il lavoro come se fosse tuo. <b>Otto prepara, tu verifichi:</b> apri le fonti, poi approva la scelta giusta.</p>
  <ul class="gp-rules"><li><i class="ok"></i>Giusto e verificato alla fonte <b>pieno + bonus</b></li><li><i class="mid"></i>Giusto ma alla cieca <b>metà</b></li><li><i class="ko"></i>Scelta sbagliata <b>punti in meno</b></li></ul>
  ${list.length ? `<span class="gp-label">DECISIONI APERTE</span>${list.map(c => `<button class="gp-item" data-game="go:${c.page}"><b>${esc(c.title)}</b><small>${esc(pageName(c.page))} · fino a +${maxPts(c)} pt</small></button>`).join('')}` : ''}
  <footer><button data-game="sound">${S.sound ? 'Suoni attivi' : 'Suoni spenti'}</button><button data-game="restart">Ricomincia da zero</button></footer>`;
 el.style.top = `${r.bottom + 10}px`; el.style.right = `${Math.max(12, innerWidth - r.right)}px`;
 document.body.append(el);
}
function onClick(e) {
 const b = e.target.closest('[data-game]');
 if (!b) { if (!e.target.closest('.game-pop')) document.querySelector('.game-pop')?.remove(); return; }
 const [k, id, i] = b.dataset.game.split(':');
 if (k !== 'menu' && k !== 'sound') document.querySelector('.game-pop')?.remove();
 if (k === 'menu') { play('click'); return menu(); }
 if (k === 'go') { location.hash = id; return; }
 if (k === 'src') { const c = S.cards[id]; if (c && !c.opened.includes(+i)) c.opened.push(+i); play('open'); return refresh(challenge(id).page); }
 if (k === 'pick') return pick(id, +i, b);
 if (k === 'next') { const c = challenge(id); delete S.showing[c.page]; play('click'); return refresh(c.page); }
 if (k === 'retry') { const c = S.cards[id]; c.expired = false; c.start = 0; play('click'); return refresh(challenge(id).page); }
 if (k === 'sound') { S.sound = !S.sound; try { localStorage.setItem('csd.game.sound', S.sound ? 'on' : 'off'); } catch {} b.textContent = S.sound ? 'Suoni attivi' : 'Suoni spenti'; play('click'); return; }
 if (k === 'restart') { Object.assign(S, {points:0, level:1, round:1, streak:0, last:null, solved:{}, cards:{}, showing:{}}); updateChip(); const p = location.hash.slice(1) || 'home'; refresh(p); }
}
