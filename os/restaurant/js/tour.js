// Guida interattiva CSD Station. Motore unico, identico in CS Restaurant OS e CS Notaro OS: cambiano solo i passaggi.
// Una freccetta automatica (distinta dal cursore dell'utente) si muove, scorre e clicca; nuvolette verde scuro
// spiegano ogni passaggio; Otto accompagna il tour in basso a sinistra.
//
// Passaggio: {route, before:[azioni], target, title, text, otto, placement}
// Azioni: {click:sel} · {hover:sel} · {type:[sel, testo]} · {wait:ms} · {call:fn} · {scroll:sel}
const calm = matchMedia('(prefers-reduced-motion: reduce)');
const sleep = ms => new Promise(r => setTimeout(r, calm.matches ? Math.min(ms, 80) : ms));
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rich = v => esc(v).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
const visible = el => { if (!el) return false; const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };

async function waitFor(sel, timeout = 3000) {
 if (!sel) return null;
 const t0 = performance.now();
 while (performance.now() - t0 < timeout) {
  const el = typeof sel === 'function' ? sel() : document.querySelector(sel);
  if (visible(el)) return el;
  await sleep(60);
 }
 return null;
}

let active = null;

export function startTour(steps, {otto, onEnd, name = 'Demo interattiva'} = {}) {
 if (active) return;
 const root = document.createElement('div');
 root.className = 'tour-layer';
 root.innerHTML = `<div class="tour-block"></div><div class="tour-spot" hidden></div>
  <div class="tour-cursor" aria-hidden="true"><svg viewBox="0 0 24 24" width="30" height="30"><path d="M4 2.5 19.5 12l-7 1.6L9 20.5z" fill="#173022" stroke="#c5f476" stroke-width="1.6" stroke-linejoin="round"/></svg><span>Otto</span></div>
  <div class="tour-otto" aria-hidden="true"><div class="tour-otto-inner"></div><span class="tour-otto-say"></span></div>
  <div class="tour-bubble" role="dialog" aria-live="polite" aria-label="${esc(name)}" hidden></div>
  <div class="tour-working" hidden><i></i>Otto ti sta mostrando…</div>`;
 document.body.append(root);
 document.body.classList.add('touring');
 // dentro il sito avvisa la pagina che ospita la demo (nasconde la sua barra in basso)
 if (window.parent !== window) window.parent.postMessage('csd:tour-start', location.origin);
 const $ = s => root.querySelector(s);
 const cursor = $('.tour-cursor'), spot = $('.tour-spot'), bubble = $('.tour-bubble'), ottoBox = $('.tour-otto'), working = $('.tour-working');
 const pos = {x: 90, y: innerHeight - 140};
 cursor.style.transform = `translate(${pos.x}px,${pos.y}px)`;
 let index = -1, focusEl = null, focusSel = null, raf = 0, token = 0;
 const resolve = sel => typeof sel === 'function' ? sel() : document.querySelector(sel);

 const setOtto = (mood = 'happy', say = '') => {
  const map = {wave:'busy', think:'busy', happy:'happy', point:'awake', idle:'awake'};
  $('.tour-otto-inner').innerHTML = otto ? otto(map[mood] || 'awake') : '';
  ottoBox.className = `tour-otto tour-otto-${mood}`;
  $('.tour-otto-say').textContent = say; $('.tour-otto-say').hidden = !say;
 };
 const follow = () => {
  if (focusSel && !focusEl?.isConnected) focusEl = resolve(focusSel); // la pagina può ridisegnarsi (dati live)
  if (focusEl && visible(focusEl)) {
   const r = focusEl.getBoundingClientRect(), p = 7;
   Object.assign(spot.style, {left:`${r.left - p}px`, top:`${r.top - p}px`, width:`${r.width + p * 2}px`, height:`${r.height + p * 2}px`});
   spot.hidden = false;
  } else spot.hidden = true;
  raf = requestAnimationFrame(follow);
 };
 follow();

 async function moveTo(el) {
  if (!visible(el)) return false;
  el.scrollIntoView({block:'center', inline:'nearest', behavior: calm.matches ? 'auto' : 'smooth'});
  await sleep(420);
  const r = el.getBoundingClientRect();
  pos.x = Math.min(innerWidth - 40, Math.max(6, r.left + Math.min(r.width / 2, 120)));
  pos.y = Math.min(innerHeight - 40, Math.max(6, r.top + r.height / 2));
  cursor.style.transform = `translate(${pos.x}px,${pos.y}px)`;
  await sleep(650);
  return true;
 }
 async function click(sel) {
  let el = await waitFor(sel); if (!el) return;
  if (visible(el)) { await moveTo(el); cursor.classList.add('press'); spawnRipple(); await sleep(170); cursor.classList.remove('press'); }
  if (!el.isConnected) el = resolve(sel) || el; // ridisegnata durante il movimento
  if (!visible(el) && el.getAttribute?.('href')) location.hash = el.getAttribute('href').replace(/^#/, '');
  else el.click();
  await sleep(250);
 }
 function spawnRipple() {
  const r = document.createElement('i'); r.className = 'tour-ripple';
  r.style.transform = `translate(${pos.x}px,${pos.y}px)`; root.append(r); setTimeout(() => r.remove(), 650);
 }
 async function type(sel, text) {
  await click(sel); const el = resolve(sel); if (!el) return; el.focus();
  for (const ch of text) { el.value += ch; el.dispatchEvent(new Event('input', {bubbles:true})); await sleep(28); }
 }
 async function goRoute(route) {
  if (route == null) return;
  if ((location.hash.slice(1) || 'home') !== route) { location.hash = route; await sleep(450); }
 }

 function placeBubble(el, step) {
  const pad = 16, bw = Math.min(360, innerWidth - pad * 2);
  bubble.style.width = `${bw}px`;
  bubble.hidden = false;
  const bh = bubble.offsetHeight;
  let x = (innerWidth - bw) / 2, y = (innerHeight - bh) / 2, arrow = 'none';
  if (el && visible(el)) {
   const r = el.getBoundingClientRect();
   const below = innerHeight - r.bottom, above = r.top, right = innerWidth - r.right;
   const want = step.placement || (below > bh + 30 ? 'bottom' : above > bh + 30 ? 'top' : right > bw + 30 ? 'right' : 'left');
   if (want === 'bottom') { x = r.left + r.width / 2 - bw / 2; y = r.bottom + 16; arrow = 'top'; }
   else if (want === 'top') { x = r.left + r.width / 2 - bw / 2; y = r.top - bh - 16; arrow = 'bottom'; }
   else if (want === 'right') { x = r.right + 16; y = r.top + r.height / 2 - bh / 2; arrow = 'left'; }
   else { x = r.left - bw - 16; y = r.top + r.height / 2 - bh / 2; arrow = 'right'; }
   if (want === 'center') { x = (innerWidth - bw) / 2; y = (innerHeight - bh) / 2; arrow = 'none'; }
  }
  x = Math.max(pad, Math.min(innerWidth - bw - pad, x)); y = Math.max(pad, Math.min(innerHeight - bh - pad, y));
  bubble.style.left = `${x}px`; bubble.style.top = `${y}px`; bubble.dataset.arrow = arrow;
  if (el && visible(el) && (arrow === 'top' || arrow === 'bottom')) {
   const r = el.getBoundingClientRect();
   bubble.style.setProperty('--ax', `${Math.max(22, Math.min(bw - 22, r.left + r.width / 2 - x))}px`);
  } else bubble.style.setProperty('--ax', '50%');
 }

 async function show(i) {
  const my = ++token;
  index = i;
  const step = steps[i];
  bubble.hidden = true; working.hidden = false; focusEl = null; focusSel = null;
  setOtto(step.otto || 'point', '');
  await goRoute(step.route); if (my !== token) return;
  for (const a of step.before || []) {
   if (my !== token) return;
   if (a.wait) { if (a.otto) setOtto(a.otto, a.say || ''); await sleep(a.wait); }
   if (a.click) await click(a.click);
   if (a.hover) await moveTo(await waitFor(a.hover));
   if (a.scroll) { const el = await waitFor(a.scroll); el?.scrollIntoView({block:'center', behavior:'smooth'}); await sleep(450); }
   if (a.type) await type(a.type[0], a.type[1]);
   if (a.call) await a.call();
  }
  if (my !== token) return;
  const el = step.target ? await waitFor(step.target, 3500) : null;
  if (el) await moveTo(el);
  if (my !== token) return;
  focusEl = el; focusSel = el ? step.target : null;
  setOtto(step.otto || 'point', step.say || '');
  const last = i === steps.length - 1;
  bubble.innerHTML = `<div class="tb-top"><span class="tb-step">${i + 1} di ${steps.length}</span><button class="tb-x" data-tour="end" aria-label="Esci dalla demo">×</button></div>
   ${step.title ? `<h3>${esc(step.title)}</h3>` : ''}<p>${rich(step.text)}</p>
   <div class="tb-foot"><span class="tb-dots">${steps.map((_, k) => `<i class="${k === i ? 'on' : k < i ? 'done' : ''}"></i>`).join('')}</span><button class="tb-next" data-tour="${last ? 'end' : 'next'}">${last ? 'Fine' : 'Avanti'} <span aria-hidden="true">→</span></button></div>
   ${i === 0 ? '<small class="tb-hint">Premi Avanti per continuare · Esc per uscire</small>' : ''}`;
  working.hidden = true;
  placeBubble(el, step);
  bubble.querySelector('.tb-next').focus({preventScroll:true});
 }

 function end() {
  token++; cancelAnimationFrame(raf);
  removeEventListener('keydown', onKey, true); removeEventListener('resize', onResize);
  root.classList.add('leaving'); document.body.classList.remove('touring'); if (window.parent !== window) window.parent.postMessage('csd:tour-end', location.origin);
  setTimeout(() => root.remove(), 250);
  active = null; onEnd?.();
 }
 const next = () => index < steps.length - 1 ? show(index + 1) : end();
 const onKey = e => {
  if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); end(); }
  else if ((e.key === 'Enter' || e.key === 'ArrowRight') && !bubble.hidden) { e.preventDefault(); e.stopPropagation(); next(); }
 };
 const onResize = () => { if (!bubble.hidden) placeBubble(focusEl, steps[index]); };
 root.addEventListener('click', e => { const b = e.target.closest('[data-tour]'); if (!b) return; b.dataset.tour === 'end' ? end() : next(); });
 addEventListener('keydown', onKey, true); addEventListener('resize', onResize);
 active = {end};
 show(0);
}
export const tourActive = () => !!active;
