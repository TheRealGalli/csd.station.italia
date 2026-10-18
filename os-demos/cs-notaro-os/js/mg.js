// Meccaniche dei minigiochi delle missioni, identiche in CS Notaro OS e CS Restaurant OS (cambiano solo i contenuti, in missions.js).
// Ogni meccanica è {render(data, state), handle(data, state, action, value)}: handle restituisce {done, pts, label, why} a fine partita.
// I testi di vittoria e sconfitta arrivano dai dati, così ogni modulo parla la sua lingua.
//  diff     · due documenti, tocchi la riga che non torna e scegli il valore giusto
//  boxes    · copi un dato dalla fonte giusta, una casella per carattere
//  triage   · ogni elemento nella corsia giusta (persone, partite, uffici)
//  proof    · trovi e correggi l'errore in un testo
//  phone    · scegli le risposte durante una chiamata
//  calc     · calcolatrice completa: + − × ÷, percentuali, parentesi, decimali
//  cal      · scegli la data giusta sul calendario
//  classify · per ogni voce scegli uno stato (vale / non vale, approva / rifiuta…)
//  pick     · tra più carte, quella giusta
//  multi    · selezioni tutto ciò che vale, e niente di più
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rich = v => esc(v).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
export const sources = (list, hint = -1) => list?.length ? `<div class="mg-sources">${list.map((s, i) => `<div class="mg-doc ${s.official ? 'official' : ''} ${i === hint ? 'hinted' : ''}"><span class="mg-doc-t">${esc(s.t)}</span>${s.rows.map(r => `<div class="mg-row"><span class="mg-k">${esc(r[0])}</span><span class="mg-v ${r[2] ? 'mono' : ''}">${esc(r[1])}</span></div>`).join('')}</div>`).join('')}</div>` : '';
const ask = (d, st, extra = '') => `<p class="mg-ask">${d.ask}${st.tries ? ` <span class="mg-tries">Tentativi sbagliati: ${st.tries}/${d.maxTries || 2}</span>` : ''}${extra}</p>`;
const score = (m, base = 30) => Math.max(10, base + (m ? 0 : 15) - m * 5);
const win = (d, m, perfect, ok) => ({done:true, pts:score(m), label:m ? (d.winLabel2 || 'Giusto, con qualche tentativo') : (d.winLabel || perfect), why:ok || d.winWhy});
const lose = (d, why, pts = -15) => ({done:true, pts, label:d.loseLabel || 'Da rivedere', why});

// ————— diff —————
const diff = {
 render(d, st) {
  const step = st.step || 'find';
  const row = (r, i, left) => {
   const cls = [left && step === 'find' ? 'pick' : '', st.misses?.includes(i) ? 'miss' : '', step !== 'find' && i === d.wrongRow ? 'hit' : '', left && st.hintRow === i && step === 'find' ? 'hinted' : ''].join(' ');
   const cell = `<span class="mg-k">${esc(r[0])}</span><span class="mg-v">${esc(left ? r[1] : r[2])}</span>`;
   return left && step === 'find' ? `<button class="mg-row ${cls}" data-game="mg:${st.id}:row:${i}">${cell}</button>` : `<div class="mg-row ${cls}">${cell}</div>`;
  };
  return `<p class="mg-ask">${step === 'find' ? d.ask : `Trovata: <b>${esc(d.rows[d.wrongRow][0].toLowerCase())}</b>. ${d.chooseAsk || 'Quale valore è quello giusto?'}`}</p>
   <div class="mg-docs"><div class="mg-doc"><span class="mg-doc-t">${esc(d.left)}</span>${d.rows.map((r, i) => row(r, i, true)).join('')}</div>
   <div class="mg-doc official"><span class="mg-doc-t">${esc(d.right)} · fonte</span>${d.rows.map((r, i) => row(r, i, false)).join('')}</div></div>
   ${step === 'choose' && !st.done ? `<div class="gc-options">${d.options.map((o, i) => `<button data-game="mg:${st.id}:pick:${i}">${esc(o.v)}</button>`).join('')}</div>` : ''}`;
 },
 handle(d, st, a, v) {
  if (a === 'row') { if (+v === d.wrongRow) { st.step = 'choose'; return {sound:'open'}; } (st.misses ||= []).includes(+v) || st.misses.push(+v); return {sound:'bad'}; }
  if (a === 'pick') { const o = d.options[+v]; return o.ok ? win(d, st.misses?.length || 0, 'Occhio di falco') : lose(d, d.loseWhy || `La fonte dice ${d.rows[d.wrongRow][2]}.`); }
 }
};

// ————— boxes —————
const boxes = {
 render(d, st) {
  const vals = st.vals || [], bad = st.bad || [];
  const cells = [...d.answer].map((_, i) => `${d.split && i === +d.split ? `<span class="mg-sep">${esc(d.splitLabel || '·')}</span>` : ''}<input class="mg-box ${bad.includes(i) ? 'bad' : ''} ${st.done ? 'ok' : ''}" data-mg-input="${st.id}:${i}" autocomplete="off" inputmode="${/^\d+$/.test(d.answer) ? 'numeric' : 'text'}" value="${esc(st.done ? d.answer[i] : vals[i] || '')}" aria-label="Carattere ${i + 1}" ${st.done ? 'disabled' : ''}>`).join('');
  return `${ask({...d, maxTries:3}, st)}${sources(d.sources, st.hintSrc ?? -1)}
   <div class="mg-form"><span class="mg-doc-t">${esc(d.field)}</span><div class="mg-line">${d.prefix ? `<span class="mg-prefix mono">${esc(d.prefix)}</span>` : d.firstLabel ? `<span class="mg-sep">${esc(d.firstLabel)}</span>` : ''}${cells}</div></div>
   ${st.done ? '' : `<div class="gc-options"><button data-game="mg:${st.id}:confirm:0">Conferma</button></div>`}`;
 },
 handle(d, st, a, v) {
  if (a === 'type') { (st.vals ||= [])[v.i] = v.v.toUpperCase(); st.bad = (st.bad || []).filter(x => x !== v.i); return null; }
  if (a !== 'confirm') return;
  const vals = st.vals || [];
  st.bad = [...d.answer].map((c, i) => (vals[i] || '') === c ? -1 : i).filter(i => i >= 0);
  if (!st.bad.length) { st.done = true; return win(d, st.tries || 0, 'Copiato alla perfezione'); }
  st.tries = (st.tries || 0) + 1;
  if (st.tries >= 3) { st.done = true; return lose(d, `Il valore giusto era ${d.answer}. ${d.loseWhy || ''}`, -10); }
  return {sound:'bad'};
 }
};

// ————— triage —————
const triage = {
 render(d, st) {
  const a = st.assign || {}, all = d.items.every((_, i) => a[i]);
  return `<p class="mg-ask">${d.ask}</p>
   <div class="mg-lanes" style="grid-template-columns:repeat(${d.lanes.length},minmax(0,1fr))">${d.lanes.map(l => `<span><b>${esc(l[1])}</b>${esc(l[2] || '')}</span>`).join('')}</div>
   ${sources(d.sources)}
   <div class="mg-queue">${d.items.map((it, i) => `<div class="mg-qrow ${st.done ? (a[i] === it.lane ? 'right' : 'wrong') : ''}"><span class="mg-qtext">${esc(it.text)}${it.sub ? `<small>${esc(it.sub)}</small>` : ''}</span><span class="mg-chips">${d.lanes.map(l => `<button class="${a[i] === l[0] ? 'on' : ''} ${st.done && it.lane === l[0] ? 'sol' : ''}" data-game="mg:${st.id}:set:${i}.${l[0]}" ${st.done ? 'disabled' : ''}>${esc(l[1])}</button>`).join('')}</span></div>`).join('')}</div>
   ${st.done ? '' : `<div class="gc-options"><button data-game="mg:${st.id}:confirm:0" ${all ? '' : 'disabled'}>${esc(d.confirm || 'Conferma')}</button></div>`}`;
 },
 handle(d, st, a, v) {
  if (a === 'set') { const k = v.indexOf('.'); (st.assign ||= {})[v.slice(0, k)] = v.slice(k + 1); return {sound:'click'}; }
  if (a !== 'confirm') return;
  const as = st.assign || {}, ok = d.items.filter((it, i) => as[i] === it.lane).length, t = d.items.length;
  if (ok === t) return {done:true, pts:45, label:d.winLabel || 'Tutto al posto giusto', why:d.winWhy};
  if (ok >= t / 2) return {done:true, pts:Math.round(30 * ok / t), label:`${ok} su ${t} al posto giusto`, why:d.partWhy || 'Le righe rosse sono al posto sbagliato: in verde quello giusto.'};
  return {done:true, pts:-10, label:`Solo ${ok} su ${t}`, why:d.partWhy || 'Più della metà al posto sbagliato: in verde quello giusto.'};
 }
};

// ————— proof —————
const proof = {
 render(d, st) {
  const sel = st.sel, fixed = st.fixed || {};
  return `<p class="mg-ask">${d.ask}</p>${sources(d.sources)}
   <div class="mg-draft"><span class="mg-doc-t">${esc(d.draftLabel || 'Bozza proposta da Otto')}</span><p>${d.parts.map((p, i) => i % 2 ? `<button class="mg-tok ${fixed[i] ? 'fixed' : ''} ${st.hintTok === i && !fixed[i] ? 'hinted' : ''} ${sel === i ? 'sel' : ''} ${st.misses?.includes(i) ? 'miss' : ''}" data-game="mg:${st.id}:tok:${i}" ${st.done || fixed[i] ? 'disabled' : ''}>${esc(fixed[i] || p.t)}</button>` : esc(p.t)).join('')}</p></div>
   ${sel != null && !st.done ? `<div class="gc-options">${d.parts[sel].choices.map(c => `<button data-game="mg:${st.id}:fix:${encodeURIComponent(c)}">${esc(c)}</button>`).join('')}</div>` : ''}`;
 },
 handle(d, st, a, v) {
  if (a === 'tok') { const i = +v; if (d.parts[i].err) { st.sel = i; return {sound:'open'}; } (st.misses ||= []).includes(i) || st.misses.push(i); return {sound:'bad'}; }
  if (a !== 'fix') return;
  const p = d.parts[st.sel], c = decodeURIComponent(v);
  if (c === p.ok) { (st.fixed ||= {})[st.sel] = c; st.sel = null; return win(d, st.misses?.length || 0, 'Testo perfetto'); }
  return lose(d, `Le fonti dicono **${p.ok}**: ${d.loseWhy || 'il testo sarebbe partito sbagliato.'}`);
 }
};

// ————— phone —————
const phone = {
 render(d, st) {
  const at = st.turn || 0, log = st.log || [];
  return `<p class="mg-ask">${d.ask || 'Chiamata in corso. <b>Scegli cosa risponde Otto</b>: le fonti dicono cosa si può fare.'}</p>${sources(d.sources)}
   <div class="transcript mg-call">${d.turns.slice(0, at + 1).map((t, i) => `<div class="bubble caller"><small>${esc(d.caller)}</small>${esc(t.c)}</div>${log.filter(l => l.turn === i).map(l => l.ok ? `<div class="bubble agent"><small>Otto</small>${esc(l.t)}</div>` : `<div class="mg-oops">${esc(l.why)}</div>`).join('')}`).join('')}</div>
   ${st.done ? '' : `<div class="gc-options mg-replies">${d.turns[at].o.map((o, i) => `<button class="${st.elim?.[at] === i ? 'elim' : ''}" data-game="mg:${st.id}:say:${i}" ${log.some(l => l.turn === at && !l.ok && l.t === o.t) || st.elim?.[at] === i ? 'disabled' : ''}>${esc(o.t)}</button>`).join('')}</div>`}`;
 },
 handle(d, st, a, v) {
  if (a !== 'say') return;
  const at = st.turn || 0, o = d.turns[at].o[+v];
  (st.log ||= []).push({turn:at, ok:!!o.ok, t:o.t, why:o.why});
  if (!o.ok) { st.misses = (st.misses || 0) + 1; return {sound:'bad'}; }
  if (at + 1 < d.turns.length) { st.turn = at + 1; return {sound:'good'}; }
  const m = st.misses || 0;
  return {done:true, pts:m ? Math.max(-10, 30 - m * 12) : 45, label:m ? (m > 1 ? 'Chiamata recuperata a fatica' : 'Chiamata gestita, con un inciampo') : 'Chiamata perfetta', why:m ? 'Otto ha corretto il tiro, ma al telefono la prima risposta è quella che si ricorda.' : (d.winWhy || 'Risposte giuste al primo colpo: Otto registra tutto.')};
 }
};

// ————— calc: calcolatrice completa —————
// Parser senza eval: + − × ÷, parentesi, meno unario, % come "diviso cento" (200 × 2% = 4).
export function evaluate(expr) {
 const s = expr.replace(/,/g, '.').replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
 let i = 0;
 const peek = () => s[i], eat = c => s[i] === c ? (i++, true) : false;
 const num = () => { const m = /^\d*\.?\d+/.exec(s.slice(i)); if (!m) throw 0; i += m[0].length; return +m[0]; };
 const primary = () => { if (eat('(')) { const v = add(); if (!eat(')')) throw 0; return v; } return num(); };
 const factor = () => { if (eat('-')) return -factor(); let v = primary(); while (eat('%')) v /= 100; return v; };
 const mul = () => { let v = factor(); for (;;) { if (eat('*')) v *= factor(); else if (eat('/')) { const r = factor(); if (!r) throw 0; v /= r; } else return v; } };
 function add() { let v = mul(); for (;;) { if (eat('+')) v += mul(); else if (eat('-')) v -= mul(); else return v; } }
 try { const v = add(); return i === s.length && isFinite(v) ? v : null; } catch { return null; }
}
const fmt = n => n == null ? '' : (Math.round(n * 100) / 100).toLocaleString('it-IT', {maximumFractionDigits:2});
const calc = {
 render(d, st) {
  const e = st.expr || '', v = e ? evaluate(e) : null;
  const keys = ['C', '(', ')', '⌫', '7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '−', '0', ',', '%', '+', '='];
  const key = k => `<button class="${'C⌫'.includes(k) ? 'fn' : k === '=' ? 'eq' : '÷×−+%()'.includes(k) ? 'op' : ''}" data-game="mg:${st.id}:key:${encodeURIComponent(k)}">${k}</button>`;
  return `${ask(d, st)}${sources(d.sources)}
   <div class="mg-calc ${st.done ? 'done' : ''}">
    <div class="mg-screen"><small>${esc(e) || '&nbsp;'}</small><b>${st.done ? `${d.unit ? d.unit + ' ' : ''}${fmt(d.answer)}` : v != null ? `${d.unit ? d.unit + ' ' : ''}${fmt(v)}` : '<span>0</span>'}</b></div>
    ${st.done ? '' : `<div class="mg-ckeys">${keys.map(key).join('')}</div>
    <button class="mg-submit" data-game="mg:${st.id}:submit:0" ${v == null ? 'disabled' : ''}>Conferma il risultato</button>`}
   </div>`;
 },
 handle(d, st, a, v) {
  if (a === 'key') {
   const k = decodeURIComponent(v), e = st.expr || '';
   if (k === 'C') st.expr = '';
   else if (k === '⌫') st.expr = e.slice(0, -1);
   else if (k === '=') { const r = evaluate(e); if (r != null) st.expr = fmt(r).replace(/\./g, ''); }
   else if (e.length < 40) st.expr = e + k;
   return {sound:'click'};
  }
  if (a !== 'submit') return;
  const r = evaluate(st.expr || '');
  if (r == null) return {sound:'bad'};
  if (Math.abs(r - d.answer) < (d.tolerance ?? .005)) { st.done = true; return win(d, st.tries || 0, 'Conto perfetto'); }
  st.tries = (st.tries || 0) + 1; st.expr = '';
  if (st.tries >= 2) { st.done = true; return lose(d, `Il risultato giusto era ${d.unit ? d.unit + ' ' : ''}${fmt(d.answer)}. ${d.hint || ''}`, -10); }
  return {sound:'bad'};
 }
};

// ————— cal: calendario —————
const cal = {
 render(d, st) {
  const [y, m] = d.month, first = new Date(y, m, 1), pad = (first.getDay() + 6) % 7, n = new Date(y, m + 1, 0).getDate();
  const cells = [...Array(pad).fill(''), ...Array.from({length:n}, (_, i) => i + 1)];
  return `${ask(d, st)}${sources(d.sources)}
   <div class="mg-cal"><span class="mg-doc-t">${first.toLocaleDateString('it-IT', {month:'long', year:'numeric'})}</span><div class="mg-cal-grid">${['L', 'M', 'M', 'G', 'V', 'S', 'D'].map(x => `<i>${x}</i>`).join('')}${cells.map(c => c ? `<button class="${st.done && new Date(y, m, c).toDateString() === d.answer ? 'sol' : ''} ${st.wrong?.includes(c) ? 'miss' : ''}" data-game="mg:${st.id}:day:${c}" ${st.done ? 'disabled' : ''}>${c}</button>` : '<span></span>').join('')}</div></div>`;
 },
 handle(d, st, a, v) {
  if (a !== 'day') return;
  if (new Date(d.month[0], d.month[1], +v).toDateString() === d.answer) { st.done = true; return win(d, st.tries || 0, 'Data perfetta'); }
  (st.wrong ||= []).push(+v); st.tries = (st.tries || 0) + 1;
  if (st.tries >= 2) { st.done = true; return lose(d, `La data giusta era il ${new Date(d.answer).toLocaleDateString('it-IT', {day:'numeric', month:'long'})}. ${d.hint || ''}`, -10); }
  return {sound:'bad'};
 }
};

// ————— classify —————
const classify = {
 render(d, st) {
  const a = st.set || {}, all = d.items.every((_, i) => a[i]);
  return `<p class="mg-ask">${d.ask}</p>${sources(d.sources)}
   <div class="mg-queue">${d.items.map((it, i) => `<div class="mg-qrow ${st.done ? (a[i] === it.ans ? 'right' : 'wrong') : ''}"><span class="mg-qtext">${esc(it.text)}${it.sub ? `<small>${esc(it.sub)}</small>` : ''}</span><span class="mg-chips">${d.states.map(s => `<button class="${a[i] === s[0] ? 'on' : ''} ${st.done && it.ans === s[0] ? 'sol' : ''} st-${s[0]}" data-game="mg:${st.id}:set:${i}.${s[0]}" ${st.done ? 'disabled' : ''}>${esc(s[1])}</button>`).join('')}</span></div>`).join('')}</div>
   ${st.done ? '' : `<div class="gc-options"><button data-game="mg:${st.id}:confirm:0" ${all ? '' : 'disabled'}>${esc(d.confirm || 'Conferma')}</button></div>`}`;
 },
 handle(d, st, a, v) {
  if (a === 'set') { const k = v.indexOf('.'); (st.set ||= {})[v.slice(0, k)] = v.slice(k + 1); return {sound:'click'}; }
  if (a !== 'confirm') return;
  const s = st.set || {}, ok = d.items.filter((it, i) => s[i] === it.ans).length, t = d.items.length; st.done = true;
  if (ok === t) return {done:true, pts:45, label:d.winLabel || 'Tutto giusto', why:d.winWhy};
  if (ok >= t / 2) return {done:true, pts:Math.round(30 * ok / t), label:`${ok} su ${t} giuste`, why:d.partWhy || 'In rosso le voci sbagliate, in verde la scelta giusta.'};
  return {done:true, pts:-10, label:`Solo ${ok} su ${t}`, why:d.partWhy || 'Più della metà sbagliate: in verde la scelta giusta.'};
 }
};

// ————— pick —————
const pick = {
 render(d, st) {
  return `<p class="mg-ask">${d.ask}</p>${sources(d.sources)}
   <div class="mg-cards">${d.cards.map((c, i) => `<button class="mg-card ${st.misses?.includes(i) ? 'miss' : ''} ${st.elim === i ? 'elim' : ''} ${st.done && c.ok ? 'sol' : ''}" data-game="mg:${st.id}:card:${i}" ${st.done || st.misses?.includes(i) || st.elim === i ? 'disabled' : ''}>${c.meta ? `<small>${esc(c.meta)}</small>` : ''}<b>${esc(c.title)}</b>${c.body ? `<span>${rich(c.body)}</span>` : ''}</button>`).join('')}</div>
   ${st.note ? `<div class="mg-oops">${esc(st.note)}</div>` : ''}`;
 },
 handle(d, st, a, v) {
  if (a !== 'card') return;
  const c = d.cards[+v];
  if (c.ok) { st.done = true; return win(d, st.misses?.length || 0, 'Scelta perfetta'); }
  (st.misses ||= []).push(+v); st.note = c.why || '';
  if (st.misses.length >= Math.min(2, d.cards.length - 1)) { st.done = true; return lose(d, `${c.why || ''} ${d.loseWhy || ''}`.trim(), -10); }
  return {sound:'bad'};
 }
};

// ————— multi —————
const multi = {
 render(d, st) {
  const on = st.on || [];
  return `<p class="mg-ask">${d.ask}</p>${sources(d.sources)}
   <div class="mg-multi">${d.chips.map((c, i) => `<button class="${on.includes(i) ? 'on' : ''} ${st.hintChip === i && !st.done ? 'hinted' : ''} ${st.done ? (c.ok ? 'sol' : on.includes(i) ? 'miss' : '') : ''}" data-game="mg:${st.id}:tog:${i}" ${st.done ? 'disabled' : ''}>${esc(c.t)}</button>`).join('')}</div>
   ${st.done ? '' : `<div class="gc-options"><button data-game="mg:${st.id}:confirm:0">${esc(d.confirm || 'Conferma')}</button></div>`}`;
 },
 handle(d, st, a, v) {
  if (a === 'tog') { const on = st.on ||= [], i = +v; on.includes(i) ? on.splice(on.indexOf(i), 1) : on.push(i); return {sound:'click'}; }
  if (a !== 'confirm') return;
  const on = st.on || [], right = d.chips.map((c, i) => c.ok ? i : -1).filter(i => i >= 0);
  const missing = right.filter(i => !on.includes(i)).length, extra = on.filter(i => !d.chips[i].ok).length; st.done = true;
  if (!missing && !extra) return {done:true, pts:45, label:d.winLabel || 'Selezione perfetta', why:d.winWhy};
  if (missing + extra <= 1) return {done:true, pts:15, label:'Quasi', why:`${missing ? 'Ne manca una' : 'Una di troppo'}: in verde quelle giuste. ${d.partWhy || ''}`};
  return {done:true, pts:-10, label:'Selezione sbagliata', why:`In verde quelle giuste. ${d.partWhy || ''}`};
 }
};

// ————— indizi di Otto —————
// Ogni meccanica sa dare un aiuto: evidenziare la fonte giusta, indicare dov'è l'errore o togliere una risposta sbagliata.
// Restituiscono la frase che Otto dice; lo stato cambia in modo che render mostri l'aiuto.
diff.hint = (d, st) => { st.hintRow = d.wrongRow; return `Guarda bene la riga “${d.rows[d.wrongRow][0]}”: confrontala con la fonte.`; };
boxes.hint = (d, st) => {
 const v = st.vals ||= []; [0, 1].forEach(i => { v[i] = d.answer[i]; }); st.bad = (st.bad || []).filter(i => i > 1);
 if (d.sources.length > 1) { st.hintSrc = 0; return `La fonte giusta è “${d.sources[0].t}”, e ti ho scritto i primi due caratteri.`; }
 return `Ti ho scritto i primi due caratteri: “${d.answer.slice(0, 2)}”. Attenzione alla riga giusta della fonte.`;
};
const fixOne = (items, map, key, label) => { const i = items.findIndex((it, k) => map[k] !== it[key]); if (i < 0) return null; map[i] = items[i][key]; return label(items[i]); };
triage.hint = (d, st) => fixOne(d.items, st.assign ||= {}, 'lane', it => `Ti ho sistemato “${it.text}”: va a ${d.lanes.find(l => l[0] === it.lane)[1]}.`) || 'Fin qui è tutto giusto: conferma pure.';
classify.hint = (d, st) => fixOne(d.items, st.set ||= {}, 'ans', it => `Ti ho sistemato “${it.text}”: la scelta giusta è “${d.states.find(s => s[0] === it.ans)[1]}”.`) || 'Fin qui è tutto giusto: conferma pure.';
proof.hint = (d, st) => { st.hintTok = d.parts.findIndex(p => p.err); return 'L’errore è nella parte che ho evidenziato: controllala con le fonti.'; };
phone.hint = (d, st) => { const at = st.turn || 0, tried = (st.log || []).filter(l => l.turn === at && !l.ok).map(l => l.t), i = d.turns[at].o.findIndex(o => !o.ok && !tried.includes(o.t)); (st.elim ||= {})[at] = i; return 'Ho tolto una risposta che non va: scegli tra le altre.'; };
pick.hint = (d, st) => { st.elim = d.cards.findIndex((c, i) => !c.ok && !st.misses?.includes(i)); return 'Ho tolto una carta sbagliata: scegli tra le altre.'; };
multi.hint = (d, st) => { const on = st.on ||= [], i = d.chips.findIndex((c, k) => c.ok && !on.includes(k)); if (i < 0) { const x = on.findIndex(k => !d.chips[k].ok); if (x >= 0) { on.splice(x, 1); return 'Ne hai selezionata una di troppo: l’ho tolta io.'; } return 'La selezione è già giusta: conferma pure.'; } on.push(i); st.hintChip = i; return `“${d.chips[i].t}” c’è di sicuro: l’ho selezionato io.`; };
calc.hint = d => d.hint ? `Ecco come si fa: ${d.hint}` : 'Rileggi le fonti: tutti i numeri che servono sono lì.';
cal.hint = d => `Regola: ${d.hint}. Conta i giorni dalla data della pratica.`;

export const mechanics = {diff, boxes, triage, proof, phone, calc, cal, classify, pick, multi};
