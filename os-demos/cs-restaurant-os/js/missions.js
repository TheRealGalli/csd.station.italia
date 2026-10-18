// Missioni di CS Restaurant OS. Con la sfida avviata, un regista fa succedere cose vere nel locale e ognuna
// porta con sé un minigioco, nella sezione dove succede. È il controllo umano che il prodotto chiederà davvero.
//  · Trova la differenza (Magazzino): fattura del fornitore contro bolla firmata alla consegna.
//  · Caselle dalla fonte (Cassa): codice destinatario o partita IVA per la fattura elettronica.
//  · Smista la coda (Cucina): i piatti di una comanda grande alla partita giusta.
//  · Il conto torna? (Sala e Menu): conto già pagato in parte dal QR, conto alla romana, porzioni rimaste.
//  · Correggi la bozza (WhatsApp): la conferma di prenotazione di Otto contro il registro.
//  · Al telefono (Centralino): prenotazioni, allergie, sala piena, un conto contestato.
import * as G from './gen.js';
import {addMission, gameLevel} from './game.js';
import * as D from './demo.js';

const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const guests = () => `${G.person().first} ${G.person().last[0]}.`;
const days = ['lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
const srcBlock = sources => `<div class="mg-sources">${sources.map(s => `<div class="mg-doc"><span class="mg-doc-t">${esc(s.t)}</span>${s.rows.map(r => `<div class="mg-row"><span class="mg-k">${esc(r[0])}</span><span class="mg-v ${r[2] ? 'mono' : ''}">${esc(r[1])}</span></div>`).join('')}</div>`).join('')}</div>`;
let timer = 0, running = false, turn = 0;

// ————— Trova la differenza · Magazzino —————
function diffMission() {
 const ing = G.pick(D.ingredients), qty = G.int(3, 18), price = +(ing.cost * G.pick([.95, 1, 1.05])).toFixed(2), lot = `L${G.int(2600, 2699)}-${G.pick([...'ABCDE'])}`, exp = `${G.int(2, 28)}/${G.pick(['11', '12'])}/2026`;
 const rows = [['Prodotto', ing.name, ing.name], ['Quantità', `${qty} ${ing.unit}`, `${qty} ${ing.unit}`], ['Prezzo unitario', `€ ${price.toFixed(2).replace('.', ',')}`, `€ ${price.toFixed(2).replace('.', ',')}`], ['Lotto', lot, lot], ['Scadenza', exp, exp]];
 const w = G.pick([1, 2, 3]);
 rows[w][1] = w === 1 ? `${G.typoNumber(qty)} ${ing.unit}` : w === 2 ? `€ ${(price * G.pick([1.1, 1.2])).toFixed(2).replace('.', ',')}` : G.typoText(lot);
 const what = {1:'la quantità', 2:'il prezzo', 3:'il lotto'}[w];
 return {page:'magazzino', event:{title:`Fattura · ${ing.supplier}`, text:`${ing.name}: da controllare con la bolla`, icon:'box'}, log:`${ing.supplier}: fattura di ${ing.name} da verificare`,
  mission:{kind:'diff', title:`Trova la differenza · fattura ${ing.supplier}`, label:'TROVA LA DIFFERENZA', ttl:150000,
   data:{left:`Fattura ${ing.supplier}`, right:'Bolla firmata alla consegna', rows, wrongRow:w, what, options:G.shuffle([{v:rows[w][2], ok:true}, {v:rows[w][1], ok:false}])},
   render:diffRender, handle:diffHandle}};
}
function diffRender(d, st) {
 const step = st.step || 'find';
 const row = (r, i, left) => {
  const cls = [left && step === 'find' ? 'pick' : '', st.misses?.includes(i) ? 'miss' : '', step !== 'find' && i === d.wrongRow ? 'hit' : ''].join(' ');
  const cell = `<span class="mg-k">${esc(r[0])}</span><span class="mg-v">${esc(left ? r[1] : r[2])}</span>`;
  return left && step === 'find' ? `<button class="mg-row ${cls}" data-game="mg:${st.id}:row:${i}">${cell}</button>` : `<div class="mg-row ${cls}">${cell}</div>`;
 };
 return `<p class="mg-ask">${step === 'find' ? 'È arrivata la fattura: <b>tocca a sinistra la riga che non coincide</b> con la bolla firmata alla consegna.' : `Trovata: <b>${esc(d.rows[d.wrongRow][0].toLowerCase())}</b>. Cosa registri?`}</p>
  <div class="mg-docs"><div class="mg-doc"><span class="mg-doc-t">${esc(d.left)}</span>${d.rows.map((r, i) => row(r, i, true)).join('')}</div>
  <div class="mg-doc official"><span class="mg-doc-t">${esc(d.right)} · fonte</span>${d.rows.map((r, i) => row(r, i, false)).join('')}</div></div>
  ${step === 'choose' && !st.done ? `<div class="gc-options">${d.options.map((o, i) => `<button data-game="mg:${st.id}:pick:${i}">${esc(o.v)}</button>`).join('')}</div>` : ''}`;
}
function diffHandle(d, st, action, v) {
 if (action === 'row') { if (+v === d.wrongRow) { st.step = 'choose'; return {sound:'open'}; } (st.misses ||= []).includes(+v) || st.misses.push(+v); return {sound:'bad'}; }
 if (action === 'pick') {
  const o = d.options[+v], m = st.misses?.length || 0;
  if (o.ok) return {done:true, pts:Math.max(10, 30 + (m ? 0 : 15) - m * 5), label:m ? 'Trovata, con qualche tentativo' : 'Occhio di falco', why:`Vale la bolla firmata alla consegna: ${esc(o.v)}. Otto contesta ${d.what} al fornitore e il magazzino resta giusto.`};
  return {done:true, pts:-15, label:'Hai pagato l’errore', why:`Hai registrato il valore della fattura sbagliata: la bolla firmata dice ${esc(d.rows[d.wrongRow][2])}. Il fornitore ringrazia.`};
 }
}

// ————— Caselle dalla fonte · Cassa —————
function boxesMission() {
 const firm = `${G.pick(['Studio', 'Eventi', 'Gruppo', 'Officine'])} ${G.person().last}${G.pick([' srl', ' & C.', ' S.p.A.'])}`;
 const code = () => Array.from({length:7}, () => G.pick([...'ABCDEFGHKLMNPRSTUVWXYZ0123456789'])).join('');
 const now = code(), old = code(), amt = G.int(18, 90) * 20;
 return {page:'fatture', event:{title:`Fattura da emettere · ${firm}`, text:'Manca il codice destinatario', icon:'receipt'}, log:`${firm}: cena aziendale da fatturare (${G.euro(amt)})`,
  mission:{kind:'boxes', title:`Caselle dalla fonte · fattura ${firm}`, label:'CASELLE DALLA FONTE', ttl:150000,
   data:{prefix:'', answer:now, field:`Codice destinatario SDI · ${firm}`, sources:[{t:`Email di ${firm} · oggi`, rows:[['Nuovo codice destinatario', now, true], ['Valido dal', '1° del mese']]}, {t:'Ultima fattura emessa', rows:[['Codice destinatario', old, true]]}]},
   render:boxesRender, handle:boxesHandle}};
}
function boxesRender(d, st) {
 const vals = st.vals || [], bad = st.bad || [];
 const boxes = [...d.answer].map((_, i) => `<input class="mg-box ${bad.includes(i) ? 'bad' : ''} ${st.done ? 'ok' : ''}" data-mg-input="${st.id}:${i}" autocomplete="off" value="${esc(st.done ? d.answer[i] : vals[i] || '')}" aria-label="Carattere ${i + 1}" ${st.done ? 'disabled' : ''}>`).join('');
 return `<p class="mg-ask">Per emettere la fattura elettronica copia il dato dalla <b>fonte giusta</b>, una casella per carattere.${st.tries ? ` <span class="mg-tries">Tentativi sbagliati: ${st.tries}/3</span>` : ''}</p>${srcBlock(d.sources)}
  <div class="mg-form"><span class="mg-doc-t">Fattura · ${esc(d.field)}</span><div class="mg-line">${boxes}</div></div>
  ${st.done ? '' : `<div class="gc-options"><button data-game="mg:${st.id}:confirm:0">Conferma</button></div>`}`;
}
function boxesHandle(d, st, action, v) {
 if (action === 'type') { (st.vals ||= [])[v.i] = v.v.toUpperCase(); st.bad = (st.bad || []).filter(x => x !== v.i); return null; }
 if (action === 'confirm') {
  const vals = st.vals || [];
  st.bad = [...d.answer].map((c, i) => (vals[i] || '') === c ? -1 : i).filter(i => i >= 0);
  if (!st.bad.length) { st.done = true; return {done:true, pts:Math.max(10, 30 + (st.tries ? 0 : 15) - (st.tries || 0) * 5), label:st.tries ? 'Copiato, al secondo colpo' : 'Copiato alla perfezione', why:'Codice nuovo, preso dall’email di oggi: la fattura arriva davvero al cliente. Con quello vecchio sarebbe finita nel vuoto.'}; }
  st.tries = (st.tries || 0) + 1;
  if (st.tries >= 3) { st.done = true; return {done:true, pts:-10, label:'Codice non corretto', why:`Il codice giusto era ${esc(d.answer)}, dall’email di oggi: quello dell’ultima fattura non vale più.`}; }
  return {sound:'bad'};
 }
}

// ————— Smista la coda · Cucina —————
const stations = [['Antipasti', 'Antipasti e freddi'], ['Primi', 'Primi'], ['Secondi', 'Secondi e griglia'], ['Dolci', 'Dolci']];
function triageMission() {
 const t = G.pick(['T5', 'T9']), dishes = G.shuffle(D.menu.filter(d => d.course > 0 && d.visible)).slice(0, 5);
 return {page:'kds', event:{title:`Comanda grande · tavolo ${t.slice(1)}`, text:`${dishes.length} piatti da smistare tra le partite`, icon:'chef'}, log:`${t} · comanda grande dal QR: ${dishes.length} piatti da smistare`, kind:'cucina',
  mission:{kind:'triage', title:`Smista la coda · tavolo ${t.slice(1)}`, label:'SMISTA LA COMANDA', ttl:150000,
   data:{items:dishes.map(d => ({text:`${d.name}${d.allergens.length ? ` · ${d.allergens.join(', ')}` : ''}`, lane:d.cat}))},
   render:triageRender, handle:triageHandle}};
}
function triageRender(d, st) {
 const a = st.assign || {}, all = d.items.every((_, i) => a[i]);
 return `<p class="mg-ask">Una comanda grande: manda <b>ogni piatto alla partita giusta</b>, poi conferma.</p>
  <div class="mg-lanes">${stations.map(l => `<span><b>${l[0]}</b>${l[1]}</span>`).join('')}</div>
  <div class="mg-queue">${d.items.map((it, i) => `<div class="mg-qrow ${st.done ? (a[i] === it.lane ? 'right' : 'wrong') : ''}"><span class="mg-qtext">${esc(it.text)}</span><span class="mg-chips">${stations.map(l => `<button class="${a[i] === l[0] ? 'on' : ''} ${st.done && it.lane === l[0] ? 'sol' : ''}" data-game="mg:${st.id}:set:${i}.${l[0]}" ${st.done ? 'disabled' : ''}>${l[0]}</button>`).join('')}</span></div>`).join('')}</div>
  ${st.done ? '' : `<div class="gc-options"><button data-game="mg:${st.id}:confirm:0" ${all ? '' : 'disabled'}>Manda in cucina</button></div>`}`;
}
function triageHandle(d, st, action, v) {
 if (action === 'set') { const [i, lane] = v.split('.'); (st.assign ||= {})[i] = lane; return {sound:'click'}; }
 if (action === 'confirm') {
  const a = st.assign || {}, ok = d.items.filter((it, i) => a[i] === it.lane).length, t = d.items.length;
  if (ok === t) return {done:true, pts:45, label:'Comanda perfetta', why:'Ogni piatto alla sua partita: escono insieme e il tavolo mangia caldo.'};
  if (ok >= t / 2) return {done:true, pts:Math.round(30 * ok / t), label:`${ok} su ${t} alla partita giusta`, why:'I piatti in rosso sono finiti alla partita sbagliata: in verde quella giusta.'};
  return {done:true, pts:-10, label:`Solo ${ok} su ${t}`, why:'Metà comanda alla partita sbagliata: il tavolo aspetta. In verde dove andavano.'};
 }
}

// ————— Il conto torna? · Sala e Menu —————
function calcMission() {
 const kind = G.pick(['qr', 'romana', 'porzioni']);
 if (kind === 'porzioni') {
  const d = G.pick(D.menu.filter(x => x.course > 0)), [k, q] = Object.entries(d.recipe)[0], ing = D.ingredient(k);
  const per = q, k0 = G.int(3, 14), have = ing.unit === 'kg' ? +(per * k0 + per * G.pick([0, .3, .6])).toFixed(3) : per * k0 + (per > 1 ? 1 : 0), ans = Math.floor(have / per + 1e-9);
  const fmt = n => ing.unit === 'kg' ? `${n.toFixed(2).replace('.', ',')} kg` : `${n} ${ing.unit}`;
  return {page:'menu_pos', event:{title:'Inventario serale', text:`${ing.name}: quante porzioni di ${d.name}?`, icon:'box'}, log:`Inventario: ${ing.name} da ricontare`,
   mission:mk('Quante porzioni di ' + d.name.toLowerCase() + ' restano?', ans, '', [{t:'Conta in cella', rows:[[ing.name, fmt(have)]]}, {t:`Ricetta · ${d.name}`, rows:[[ing.name + ' a porzione', ing.unit === 'kg' ? `${Math.round(per * 1000)} g` : `${per} ${ing.unit}`]]}], 'Porzioni intere: le frazioni non si servono. Otto aggiorna il menu QR con il numero giusto.')};
 }
 const t = G.int(1, 12), people = G.int(2, 6), total = people * G.int(22, 41), paid = G.int(1, people - 1) * G.int(14, 30);
 if (kind === 'qr') return {page:'sala', event:{title:`Tavolo ${t} chiede il conto`, text:'Una parte è già pagata dal QR', icon:'coins'}, log:`T${t} · conto richiesto`,
  mission:mk(`Quanto incassi adesso al tavolo ${t}?`, total - paid, '€', [{t:`Conto tavolo ${t}`, rows:[['Totale', G.euro(total)]]}, {t:'Pagamenti Stripe', rows:[[`Ordine QR tavolo ${t}`, `${G.euro(paid)} · pagato`]]}], 'Totale meno quello già pagato con Stripe: nessuno paga due volte e il documento commerciale torna.')};
 const each = total - paid;
 const n = people - 1, share = Math.ceil(each / n);
 return {page:'sala', event:{title:`Tavolo ${t}: conto alla romana`, text:`${n} persone dividono il resto`, icon:'coins'}, log:`T${t} · conto alla romana`,
  mission:mk(`Quanto paga ciascuno dei ${n} che restano, arrotondando all’euro in su?`, share, '€', [{t:`Conto tavolo ${t}`, rows:[['Totale', G.euro(total)], ['Già pagato da uno dal QR', G.euro(paid)]]}, {t:'Al tavolo', rows:[['Persone che dividono il resto', String(n)]]}], 'Prima si toglie quanto già pagato, poi si divide: arrotondando in su, la cassa non resta mai corta.')};
}
const mk = (ask, answer, unit, sources, winWhy) => ({kind:'calc', title:`Il conto torna? · ${ask}`, label:'IL CONTO TORNA?', ttl:140000, data:{ask, answer, unit, sources, winWhy}, render:calcRender, handle:calcHandle});
function calcRender(d, st) {
 const tries = st.tries ? ` <span class="mg-tries">Tentativi sbagliati: ${st.tries}/2</span>` : '', val = st.val || '';
 return `<p class="mg-ask"><b>${esc(d.ask)}</b>${tries}</p>${srcBlock(d.sources)}
  <div class="mg-pad"><div class="mg-display ${st.done ? 'ok' : ''}">${d.unit ? d.unit + ' ' : ''}${val ? (+val).toLocaleString('it-IT') : '<span>—</span>'}</div>
  ${st.done ? '' : `<div class="mg-keys">${[1, 2, 3, 4, 5, 6, 7, 8, 9, 'back', 0, 'ok'].map(k => `<button class="${k === 'ok' ? 'go' : ''}" data-game="mg:${st.id}:key:${k}">${k === 'back' ? '⌫' : k === 'ok' ? 'OK' : k}</button>`).join('')}</div>`}</div>`;
}
function calcHandle(d, st, action, v) {
 if (action !== 'key') return;
 if (v === 'back') { st.val = (st.val || '').slice(0, -1); return {sound:'click'}; }
 if (v !== 'ok') { if ((st.val || '').length < 6) st.val = (st.val || '') + v; return {sound:'click'}; }
 if (+st.val === d.answer) { st.val = String(d.answer); st.done = true; return {done:true, pts:st.tries ? 25 : 45, label:st.tries ? 'Giusto, al secondo colpo' : 'Conto perfetto', why:d.winWhy}; }
 st.tries = (st.tries || 0) + 1; st.val = '';
 if (st.tries >= 2) { st.done = true; st.val = String(d.answer); return {done:true, pts:-10, label:'Il conto non torna', why:`Il risultato giusto era ${d.unit ? d.unit + ' ' : ''}${d.answer.toLocaleString('it-IT')}. ${d.winWhy}`}; }
 return {sound:'bad'};
}

// ————— Correggi la bozza · WhatsApp —————
function proofMission() {
 const who = G.person(), day = G.pick(days), hour = G.pick(['19:30', '20:00', '20:30', '21:00']), n = G.int(2, 8), table = G.int(1, 12);
 const kind = G.pick(['ora', 'coperti', 'giorno', 'tavolo']);
 const wrong = {ora:G.pick(['19:00', '21:30', '22:00'].filter(h => h !== hour)), coperti:String(n + G.pick([1, 2])), giorno:days[(days.indexOf(day) + 1) % 6], tavolo:String(table % 12 + 1)}[kind];
 const right = {ora:hour, coperti:String(n), giorno:day, tavolo:String(table)}[kind];
 const seg = (txt, key) => key === kind ? {t:wrong, err:true, ok:right, choices:G.shuffle([right, wrong, {ora:'18:30', coperti:String(Math.max(1, n - 1)), giorno:'domenica', tavolo:String((table + 5) % 12 + 1)}[kind]])} : {t:txt};
 const parts = [{t:`Ciao ${who.first}! Confermato per `}, seg(day, 'giorno'), {t:' alle '}, seg(hour, 'ora'), {t:', '}, seg(String(n), 'coperti'), {t:' persone al tavolo '}, seg(String(table), 'tavolo'), {t:'. A presto all’Osteria del Borgo!'}];
 return {page:'whatsapp', event:{title:`WhatsApp · ${who.name}`, text:'Chiede la conferma della prenotazione', icon:'message'}, log:`WhatsApp · ${who.name} chiede la conferma`,
  mission:{kind:'proof', title:`Correggi la bozza · conferma a ${who.name}`, label:'CORREGGI LA BOZZA', ttl:150000,
   data:{parts, sources:[{t:'Registro prenotazioni', rows:[[`${day} · ${hour}`, `${who.name} · ${n} persone · tavolo ${table}`]]}], ask:`${who.first} chiede: “Mi confermate la prenotazione?”`},
   render:proofRender, handle:proofHandle}};
}
function proofRender(d, st) {
 const sel = st.sel, fixed = st.fixed || {};
 return `<p class="mg-ask">${esc(d.ask)} Otto ha scritto la risposta, ma qualcosa <b>non torna con il registro</b>: tocca la parte sbagliata e correggila.</p>${srcBlock(d.sources)}
  <div class="mg-draft"><span class="mg-doc-t">Risposta proposta da Otto</span><p>${d.parts.map((p, i) => i % 2 ? `<button class="mg-tok ${fixed[i] ? 'fixed' : ''} ${sel === i ? 'sel' : ''} ${st.misses?.includes(i) ? 'miss' : ''}" data-game="mg:${st.id}:tok:${i}" ${st.done || fixed[i] ? 'disabled' : ''}>${esc(fixed[i] || p.t)}</button>` : esc(p.t)).join('')}</p></div>
  ${sel != null && !st.done ? `<div class="gc-options">${d.parts[sel].choices.map(c => `<button data-game="mg:${st.id}:fix:${encodeURIComponent(c)}">${esc(c)}</button>`).join('')}</div>` : ''}`;
}
function proofHandle(d, st, action, v) {
 if (action === 'tok') { const i = +v; if (d.parts[i].err) { st.sel = i; return {sound:'open'}; } (st.misses ||= []).includes(i) || st.misses.push(i); return {sound:'bad'}; }
 if (action === 'fix') {
  const p = d.parts[st.sel], c = decodeURIComponent(v), m = st.misses?.length || 0;
  if (c === p.ok) { (st.fixed ||= {})[st.sel] = c; st.sel = null; return {done:true, pts:Math.max(10, 30 + (m ? 0 : 15) - m * 5), label:m ? 'Corretta, con qualche tentativo' : 'Conferma perfetta', why:'Ora la risposta coincide con il registro: l’ospite arriva all’ora giusta e trova il suo tavolo.'}; }
  return {done:true, pts:-15, label:'Correzione sbagliata', why:`Il registro dice **${esc(p.ok)}**: l’ospite avrebbe ricevuto un’informazione sbagliata.`};
 }
}

// ————— Al telefono · Centralino —————
function phoneMission() {
 const who = G.person(), kind = G.pick(['prenota', 'allergia', 'piena', 'conto']);
 let turns, sources, intent;
 if (kind === 'prenota') {
  const n = G.int(5, 8);
  sources = [{t:'Sala alle 21:00', rows:[['T5 · 6 posti', 'occupato fino alle 22:30'], ['T9 · 8 posti', 'libero'], ['T12 · 4 posti', 'libero']]}];
  turns = [{c:`Buonasera, sono ${who.name}. Avete un tavolo per ${n} alle 21?`, o:[{t:'Sì: il tavolo 9 da otto è libero, lo segno?', ok:true}, {t:'Vi metto al 5, è da sei.', why:'Il 5 è occupato fino alle 22:30.'}, {t:'Il 12 va benissimo.', why:`Il 12 ha 4 posti: in ${n} non ci state.`}]},
   {c:'Perfetto! Mi mandate una conferma?', o:[{t:'Certo, le arriva adesso su WhatsApp con l’indirizzo.', ok:true}, {t:'Non serve, si ricordi lei.', why:'La conferma scritta riduce i tavoli vuoti: si manda sempre.'}, {t:'Ci richiami domani per conferma.', why:'La prenotazione è già fatta: farlo richiamare è solo un fastidio.'}]}];
  intent = 'Prenotazione';
 } else if (kind === 'allergia') {
  const a = G.pick([['celiaca', 'glutine', 'il risotto ai porcini'], ['allergica alle uova', 'uova', 'la tagliata'], ['intollerante al lattosio', 'latte', 'i pici al pomodoro']]);
  sources = [{t:'Menu e allergeni', rows:[['Carbonara', 'glutine, uova, latte'], ['Risotto ai porcini', 'latte'], ['Pici al pomodoro', 'glutine'], ['Tagliata', 'nessuno']]}];
  turns = [{c:`Prenoto per stasera, ma mia figlia è ${a[0]}. Cosa può mangiare?`, o:[{t:`Le consiglio ${a[2]}: senza ${a[1]}. Lo segno sulla prenotazione per la cucina.`, ok:true}, {t:'Tranquilla, la carbonara va bene per tutti.', why:`La carbonara contiene ${a[1]}: un errore pericoloso.`}, {t:'Non possiamo garantire niente, meglio altrove.', why:'Il menu indica gli allergeni: si può consigliare un piatto sicuro e avvisare la cucina.'}]},
   {c:'Grazie, ci terrei che la cucina lo sappia.', o:[{t:'È già sulla prenotazione: arriverà sulla comanda con l’allergene in evidenza.', ok:true}, {t:'Lo dica lei al cameriere quando arriva.', why:'Un avviso a voce si perde: deve stare sulla comanda.'}, {t:'Ci pensiamo stasera.', why:'Stasera è tardi: va segnato adesso.'}]}];
  intent = 'Prenotazione con allergia';
 } else if (kind === 'piena') {
  sources = [{t:'Sala alle 20:30', rows:[['Tavoli liberi', 'nessuno'], ['Prima disponibilità', '21:45'], ['Lista d’attesa', '1 famiglia']]}];
  turns = [{c:'Siamo in quattro, possiamo venire alle 20:30?', o:[{t:'Alle 20:30 siamo pieni: le propongo le 21:45, oppure la metto in lista d’attesa.', ok:true}, {t:'Venite pure, un posto si trova.', why:'La sala è piena: arriverebbero e aspetterebbero in piedi.'}, {t:'Siamo pieni, mi dispiace.', why:'C’è posto alle 21:45 e c’è la lista d’attesa: un no secco perde un tavolo.'}]},
   {c:'La lista d’attesa, grazie. Come lo saprò?', o:[{t:'Le scrivo su WhatsApp appena si libera un tavolo.', ok:true}, {t:'Ci richiami ogni mezz’ora.', why:'È Otto ad avvisare: il cliente non deve fare niente.'}, {t:'Passi davanti al locale.', why:'Un messaggio basta: nessuno deve venire a controllare.'}]}];
  intent = 'Sala piena';
 } else {
  const amt = G.int(68, 160), dup = G.int(20, 40);
  sources = [{t:'Pagamenti di ieri · tavolo 7', rows:[['DC 0418 · POS', G.euro(amt)], ['DC 0412 · Stripe QR', G.euro(dup)], ['Totale tavolo', G.euro(amt)]]}];
  turns = [{c:`Buongiorno, ieri sera mi avete fatto pagare due volte: ${G.euro(amt)} al POS e ${G.euro(dup)} dal QR.`, o:[{t:`Ha ragione: il totale era ${G.euro(amt)}, i ${G.euro(dup)} del QR erano già compresi. Le rimborso subito.`, ok:true}, {t:'Impossibile, la cassa non sbaglia.', why:'I documenti dicono il contrario: il totale era già stato pagato al POS.'}, {t:'Passi in cassa con lo scontrino.', why:'I pagamenti sono già lì: si può rimborsare subito, senza farlo tornare.'}]},
   {c:'Grazie. Come mi arriva il rimborso?', o:[{t:'Sulla stessa carta del QR, con la nota di credito via email.', ok:true}, {t:'In contanti la prossima volta che viene.', why:'Il rimborso va sullo stesso metodo di pagamento, con il documento giusto.'}, {t:'Con uno sconto sulla prossima cena.', why:'È un rimborso dovuto, non una promozione.'}]}];
  intent = 'Conto contestato';
 }
 turns.forEach(t => { t.o = G.shuffle(t.o); });
 return {page:'centralino_ai', event:{title:`Chiamata · ${who.name}`, text:'Otto ha bisogno di te per rispondere', icon:'phone'}, log:`Centralino AI · ${who.name}: ${intent.toLowerCase()}`,
  mission:{kind:'phone', title:`Al telefono · ${who.name}`, label:'AL TELEFONO', ttl:180000, data:{turns, sources, caller:who.name}, render:phoneRender, handle:phoneHandle}};
}
function phoneRender(d, st) {
 const at = st.turn || 0, log = st.log || [];
 return `<p class="mg-ask">Chiamata in corso. <b>Scegli cosa risponde Otto</b>: le fonti dicono cosa si può fare.</p>${srcBlock(d.sources)}
  <div class="transcript mg-call">${d.turns.slice(0, at + 1).map((t, i) => `<div class="bubble caller"><small>${esc(d.caller)}</small>${esc(t.c)}</div>${log.filter(l => l.turn === i).map(l => l.ok ? `<div class="bubble agent"><small>Otto</small>${esc(l.t)}</div>` : `<div class="mg-oops">${esc(l.why)}</div>`).join('')}`).join('')}</div>
  ${st.done ? '' : `<div class="gc-options mg-replies">${d.turns[at].o.map((o, i) => `<button data-game="mg:${st.id}:say:${i}" ${log.some(l => l.turn === at && !l.ok && l.t === o.t) ? 'disabled' : ''}>${esc(o.t)}</button>`).join('')}</div>`}`;
}
function phoneHandle(d, st, action, v) {
 if (action !== 'say') return;
 const at = st.turn || 0, o = d.turns[at].o[+v];
 (st.log ||= []).push({turn:at, ok:!!o.ok, t:o.t, why:o.why});
 if (!o.ok) { st.misses = (st.misses || 0) + 1; return {sound:'bad'}; }
 if (at + 1 < d.turns.length) { st.turn = at + 1; return {sound:'good'}; }
 const m = st.misses || 0;
 return {done:true, pts:m ? Math.max(-10, 30 - m * 12) : 45, label:m ? (m > 1 ? 'Chiamata recuperata a fatica' : 'Chiamata gestita, con un inciampo') : 'Chiamata perfetta', why:m ? 'Otto ha corretto il tiro, ma al telefono la prima risposta è quella che l’ospite ricorda.' : 'Risposte giuste al primo colpo: l’ospite chiude contento e Otto registra tutto.'};
}

// ————— regista —————
const kinds = {diff:diffMission, boxes:boxesMission, triage:triageMission, calc:calcMission, proof:proofMission, phone:phoneMission};
const rotation = ['triage', 'phone', 'calc', 'diff', 'proof', 'boxes'];
let missions = [];
function spawn() {
 if (!running) return;
 if (document.body.classList.contains('touring') || document.hidden) return schedule(3);
 const lvl = gameLevel(), max = lvl === 1 ? 2 : 3, open = missions.filter(m => m.open).length;
 if (open < max) {
  const kind = turn < rotation.length ? rotation[turn] : G.pick(rotation); turn++;
  const made = kinds[kind](), ttl = Math.round(made.mission.ttl * (lvl === 3 ? .7 : lvl === 2 ? .85 : 1)), rec = {open:true};
  addMission({...made.mission, ttl, page:made.page, onDone:() => { rec.open = false; schedule(G.int(8, 16)); }});
  missions.push(rec);
  D.notify({type:'mission', ...made.event, go:made.page}, made.log, made.kind || 'sala');
 }
 schedule(open + 1 < max ? G.int(25, 40) : G.int(15, 25));
}
function schedule(s) { clearTimeout(timer); timer = setTimeout(spawn, s * 1000); }
export function startMissions() { running = true; D.service.game = true; turn = 0; missions = []; schedule(3); }
export function stopMissions() { running = false; D.service.game = false; clearTimeout(timer); }
