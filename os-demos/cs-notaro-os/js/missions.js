// Missioni di CS Notaro OS. Con la sfida avviata, un regista fa arrivare email vere da gestire:
// ognuna porta con sé un minigioco, dentro l'email stessa. È il controllo umano che il prodotto chiederà davvero.
//
// Sei minigiochi, sempre con valori nuovi dal generatore (gen.js):
//  · Trova la differenza (Posta): due documenti affiancati, tocchi la riga che non torna e scegli il valore giusto.
//  · Caselle dalla fonte (Posta): copi il dato mancante dal documento giusto, una casella per carattere.
//  · Smista la coda (Posta): ogni email della PEC alla persona giusta del team.
//  · Il conto torna? (Posta): imposta, saldo o scadenza, con tastierino o calendario.
//  · Correggi la bozza (WhatsApp): trovi l'errore nella risposta di Otto e lo correggi.
//  · Al telefono (Centralino): scegli le risposte di Otto durante una chiamata in diretta.
import * as G from './gen.js';
import {addMission, gameLevel} from './game.js';
import {spawnMail, spawnChat, spawnCall, live} from './live.js';

const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const practice = () => `P-${G.int(205, 289)}`;
let timer = 0, running = false, turn = 0, onHandled = () => {};

// ————— Trova la differenza —————
function diffMission() {
 const buyer = G.person(), p = practice();
 const kind = G.pick(['catasto', 'identita', 'bonifico']);
 let left, right, rows, wrongRow, mail;
 if (kind === 'catasto') {
  const c = G.catasto(), city = G.pick(G.cities);
  rows = [['Comune', city, city], ['Foglio', c.fg, c.fg], ['Particella', c.part, c.part], ['Subalterno', c.sub, c.sub], ['Categoria', c.cat, c.cat]];
  wrongRow = G.int(1, 3); rows[wrongRow][1] = G.typoNumber(rows[wrongRow][2]);
  left = 'Bozza d’atto v2'; right = 'Visura catastale';
  const [law, dom] = G.pick(G.lawyers);
  mail = {from:law, address:`studio@${dom}.example`, kind:'Legale', subject:`${buyer.last} – bozza d’atto v2 da verificare`, attachments:['Bozza_atto_v2.docx', 'Visura_catastale.pdf'],
   body:`Buongiorno, le trasmetto la bozza d’atto aggiornata per la pratica ${buyer.last}. Mi conferma che i dati catastali sono corretti prima di inviarla alle parti?`,
   understood:`Prima di mandare la bozza alle parti va confrontata con la visura: Otto ha trovato una riga che non torna e chiede a te quale vale.`};
 } else if (kind === 'identita') {
  rows = [['Cognome', buyer.last, buyer.last], ['Nome', buyer.first, buyer.first], ['Nato a', buyer.place, buyer.place], ['Data di nascita', buyer.born, buyer.born], ['Codice fiscale', buyer.cf, buyer.cf]];
  wrongRow = G.pick([0, 3, 4]); rows[wrongRow][1] = wrongRow === 3 ? G.typoDate(buyer.born) : G.typoText(rows[wrongRow][2]);
  left = 'Modulo della banca'; right = 'Carta d’identità';
  const [bank, dom] = G.pick(G.banks);
  mail = {from:`${bank} · Ufficio mutui`, address:`mutui@${dom}.example`, kind:'Banca', subject:`Mutuo ${buyer.last} – modulo anagrafico`, attachments:['Modulo_anagrafico.pdf', `CI_${buyer.last}.jpg`],
   body:`Gentile Notaio, alleghiamo il modulo anagrafico del mutuatario ${buyer.name}. Vi chiediamo di verificarlo con il documento d’identità prima della stipula.`,
   understood:`Il modulo della banca va confrontato con la carta d’identità: un dato anagrafico sbagliato blocca l’erogazione il giorno della firma.`};
 } else {
  const seller = G.person(), amt = G.amount(), d = G.int(2, 27), m = G.int(6, 9);
  rows = [['Ordinante', buyer.name, buyer.name], ['Beneficiario', seller.name, seller.name], ['Importo', G.euro(amt), G.euro(amt)], ['Data', `${String(d).padStart(2, '0')}/${String(m + 1).padStart(2, '0')}/2026`, `${String(d).padStart(2, '0')}/${String(m + 1).padStart(2, '0')}/2026`], ['Causale', `Caparra ${G.pick(G.streets)} ${G.int(2, 60)}`, '']];
  rows[4][2] = rows[4][1];
  wrongRow = 2; rows[2][1] = G.euro(Math.random() < .5 ? G.roundUp(amt) : G.typoNumber(amt));
  left = 'Preliminare'; right = 'Bonifico ricevuto';
  const [law, dom] = G.pick(G.lawyers);
  mail = {from:law, address:`studio@${dom}.example`, kind:'Legale', subject:`${buyer.last} / ${seller.last} – caparra versata`, attachments:['Preliminare.pdf', 'Contabile_bonifico.pdf'],
   body:`Le invio la contabile del bonifico della caparra, da riportare nell’atto di compravendita ${buyer.last} / ${seller.last}.`,
   understood:`La caparra in atto va scritta con l’importo effettivamente versato: il preliminare e la contabile non dicono la stessa cifra.`};
 }
 const options = G.shuffle([{v:rows[wrongRow][2], ok:true}, {v:rows[wrongRow][1], ok:false}]);
 return {mail:{...mail, practice:p}, mission:{kind:'diff', title:`Trova la differenza · ${mail.subject}`, label:'TROVA LA DIFFERENZA', ttl:150000,
  data:{left, right, rows, wrongRow, options},
  render:diffRender, handle:diffHandle}};
}
function diffRender(d, st) {
 const step = st.step || 'find';
 const row = (r, i, side) => {
  const cls = [side === 'left' && step === 'find' ? 'pick' : '', st.misses?.includes(i) ? 'miss' : '', (step !== 'find' || st.done) && i === d.wrongRow ? 'hit' : ''].join(' ');
  const cell = `<span class="mg-k">${esc(r[0])}</span><span class="mg-v">${esc(side === 'left' ? r[1] : r[2])}</span>`;
  return side === 'left' && step === 'find' ? `<button class="mg-row ${cls}" data-game="mg:${st.id}:row:${i}">${cell}</button>` : `<div class="mg-row ${cls}">${cell}</div>`;
 };
 return `<p class="mg-ask">${step === 'find' ? 'Confronta i due documenti e <b>tocca a sinistra la riga che non coincide</b> con la fonte ufficiale.' : `Trovata: <b>${esc(d.rows[d.wrongRow][0].toLowerCase())}</b>. Quale valore è quello giusto?`}</p>
  <div class="mg-docs"><div class="mg-doc"><span class="mg-doc-t">${esc(d.left)}</span>${d.rows.map((r, i) => row(r, i, 'left')).join('')}</div>
  <div class="mg-doc official"><span class="mg-doc-t">${esc(d.right)} · fonte ufficiale</span>${d.rows.map((r, i) => row(r, i, 'right')).join('')}</div></div>
  ${step === 'choose' && !st.done ? `<div class="gc-options">${d.options.map((o, i) => `<button data-game="mg:${st.id}:pick:${i}">Vale ${esc(o.v)}</button>`).join('')}</div>` : ''}`;
}
function diffHandle(d, st, action, v) {
 if (action === 'row') {
  if (+v === d.wrongRow) { st.step = 'choose'; return {sound:'open'}; }
  (st.misses ||= []).includes(+v) || st.misses.push(+v);
  return {sound:'bad'};
 }
 if (action === 'pick') {
  const o = d.options[+v], m = st.misses?.length || 0, field = d.rows[d.wrongRow][0].toLowerCase();
  if (o.ok) return {done:true, pts:Math.max(10, 30 + (m ? 0 : 15) - m * 5), label:m ? 'Trovata, con qualche tentativo' : 'Occhio di falco', why:`Il ${field} giusto è quello della fonte ufficiale (${esc(d.right.toLowerCase())}): ${esc(o.v)}. Otto corregge il documento e lo segna nel registro.`};
  return {done:true, pts:-15, label:'Valore sbagliato', why:`Hai scelto il valore del documento da correggere. La fonte ufficiale, ${esc(d.right.toLowerCase())}, dice ${esc(d.rows[d.wrongRow][2])}.`};
 }
}

// ————— Caselle dalla fonte —————
function boxesMission() {
 const who = G.person(), p = practice();
 const kind = G.pick(['iban', 'cf', 'catasto']);
 let mail, prefix, answer, sources, field;
 if (kind === 'iban') {
  const now = G.iban(), old = G.iban();
  answer = now.replace(/ /g, '').slice(-7); prefix = now.replace(/ /g, '').slice(0, -7).replace(/(.{4})/g, '$1 ').trim();
  field = 'IBAN della parte venditrice';
  sources = [{t:`Email di ${who.name}`, rows:[['Conto attuale', now, true], ['Conto chiuso nel 2024', old, false]]}];
  const [law, dom] = G.pick(G.lawyers);
  mail = {from:law, address:`studio@${dom}.example`, kind:'Legale', subject:`${who.last} – IBAN per l’erogazione`, attachments:['IBAN_venditore.pdf'],
   body:`Le trasmetto le coordinate bancarie di ${who.name}. Attenzione: il vecchio conto è stato chiuso, va usato solo quello attuale.`,
   understood:`Nel modulo di erogazione manca la parte finale dell’IBAN. Copiala dal conto attuale: quello vecchio è chiuso.`};
 } else if (kind === 'cf') {
  answer = who.cf.slice(-6); prefix = who.cf.slice(0, -6);
  field = `Codice fiscale di ${who.name}`;
  const other = G.person();
  sources = [{t:`Tessera sanitaria · ${who.name}`, rows:[['Codice fiscale', who.cf, true], ['Nato a', who.place, false]]}, {t:`Tessera sanitaria · ${other.name} (coniuge)`, rows:[['Codice fiscale', other.cf, false]]}];
  const [bank, dom] = G.pick(G.banks);
  mail = {from:`${bank} · Ufficio mutui`, address:`mutui@${dom}.example`, kind:'Banca', subject:`Mutuo ${who.last} – codice fiscale mancante`, attachments:['Tessere_sanitarie.pdf'],
   body:`Per completare la delibera ci manca il codice fiscale di ${who.name}. In allegato le tessere sanitarie dei due coniugi.`,
   understood:`Nel modulo della banca il codice fiscale è a metà. Copia le ultime sei caselle dalla tessera giusta: nell’allegato ce ne sono due.`};
 } else {
  const c = G.catasto(), city = G.pick(G.cities), old = {...c, sub:G.typoNumber(c.sub)};
  answer = `${c.part}${String(c.sub).padStart(2, '0')}`; prefix = '';
  field = 'Particella e subalterno';
  sources = [{t:`Visura catastale aggiornata · ${city}`, rows:[['Foglio', c.fg, false], ['Particella', c.part, true], ['Subalterno', String(c.sub).padStart(2, '0'), true]]}, {t:'Visura del 2019 (prima della variazione)', rows:[['Particella', c.part, false], ['Subalterno', String(old.sub).padStart(2, '0'), false]]}];
  mail = {from:'Agenzia delle Entrate · Territorio', address:'catasto@agenzia.example', kind:'PEC', subject:`Visura aggiornata – ${who.last}, ${city}`, attachments:['Visura_2026.pdf', 'Visura_2019.pdf'],
   body:`Si trasmette la visura catastale aggiornata dopo la variazione del subalterno. In allegato anche la visura precedente.`,
   understood:`Il modulo di erogazione ha particella e subalterno vuoti. Vanno presi dalla visura aggiornata, non da quella del 2019.`};
 }
 return {mail:{...mail, practice:p}, mission:{kind:'boxes', title:`Caselle dalla fonte · ${mail.subject}`, label:'CASELLE DALLA FONTE', ttl:150000,
  data:{prefix, answer, sources, field, split:kind === 'catasto' ? String(answer.length - 2) : ''},
  render:boxesRender, handle:boxesHandle}};
}
function boxesRender(d, st) {
 const vals = st.vals || [], bad = st.bad || [];
 const boxes = [...d.answer].map((_, i) => `${d.split && i === +d.split ? '<span class="mg-sep">sub</span>' : ''}<input class="mg-box ${bad.includes(i) ? 'bad' : ''} ${st.done ? 'ok' : ''}" data-mg-input="${st.id}:${i}" autocomplete="off" inputmode="${/^\d+$/.test(d.answer) ? 'numeric' : 'text'}" value="${esc(st.done ? d.answer[i] : vals[i] || '')}" aria-label="Carattere ${i + 1}" ${st.done ? 'disabled' : ''}>`).join('');
 return `<p class="mg-ask">Copia il dato dalla <b>fonte giusta</b>: una casella per carattere.${st.tries ? ` <span class="mg-tries">Tentativi sbagliati: ${st.tries}/3</span>` : ''}</p>
  <div class="mg-sources">${d.sources.map(s => `<div class="mg-doc"><span class="mg-doc-t">${esc(s.t)}</span>${s.rows.map(r => `<div class="mg-row"><span class="mg-k">${esc(r[0])}</span><span class="mg-v mono">${esc(r[1])}</span></div>`).join('')}</div>`).join('')}</div>
  <div class="mg-form"><span class="mg-doc-t">Modulo · ${esc(d.field)}</span><div class="mg-line">${d.prefix ? `<span class="mg-prefix mono">${esc(d.prefix)}</span>` : '<span class="mg-sep">part.</span>'}${boxes}</div></div>
  ${st.done ? '' : `<div class="gc-options"><button data-game="mg:${st.id}:confirm:0">Conferma</button></div>`}`;
}
function boxesHandle(d, st, action, v) {
 if (action === 'type') { (st.vals ||= [])[v.i] = v.v.toUpperCase(); st.bad = (st.bad || []).filter(x => x !== v.i); return null; }
 if (action === 'confirm') {
  const vals = st.vals || [];
  st.bad = [...d.answer].map((c, i) => (vals[i] || '') === c ? -1 : i).filter(i => i >= 0);
  if (!st.bad.length) { st.done = true; return {done:true, pts:Math.max(10, 30 + (st.tries ? 0 : 15) - (st.tries || 0) * 5), label:st.tries ? 'Copiato, al secondo colpo' : 'Copiato alla perfezione', why:`Dato completo (${esc(d.field)}) e identico alla fonte. Otto lo inserisce nel modulo e lo segna come verificato da te.`}; }
  st.tries = (st.tries || 0) + 1;
  if (st.tries >= 3) { st.done = true; return {done:true, pts:-10, label:'Dato non corretto', why:`Tre tentativi sbagliati: Otto rimette la pratica in coda. Il valore giusto era ${esc(d.prefix ? '…' : '')}${esc(d.answer)}, dalla ${esc(d.sources[0].t.toLowerCase())}.`}; }
  return {sound:'bad'};
 }
}

// ————— Smista la coda —————
// Un pacco di email dalla PEC: ognuna va alla persona giusta del team.
const lanes = [['GM', 'Giulia', 'Compravendite e mutui'], ['LB', 'Luca', 'Società'], ['EF', 'Elena', 'Successioni e donazioni'], ['SR', 'Sara', 'Appuntamenti e segreteria']];
const srl = () => `${G.pick(['Arcadia', 'Lumen', 'Orione', 'Vela', 'Trama', 'Nodo', 'Tessera'])} ${G.pick(['S.r.l.', 'S.r.l.s.', 'S.p.A.'])}`;
const triagePool = {
 GM:[() => `${G.pick(G.banks)[0]}: delibera del mutuo ${G.person().last}`, () => `Agenzia Casa Arno: proposta d’acquisto in ${G.pick(G.streets)}`, () => `Perizia dell’immobile ${G.person().last}, ${G.pick(G.cities)}`, () => `Geometra: planimetria aggiornata ${G.person().last}`],
 LB:[() => `Commercialista: cessione quote ${srl()}`, () => `Statuto ${srl()}: revisione v3`, () => `Aumento di capitale ${srl()}`, () => `Trasformazione in S.r.l. della ditta ${G.person().last}`],
 EF:[() => `Successione ${G.person().last}: certificato di morte`, () => `Donazione al figlio: casa di ${G.pick(G.cities)}`, () => `Testamento olografo: richiesta di pubblicazione`, () => `Rinuncia all’eredità ${G.person().last}`],
 SR:[() => `${G.person().name}: richiesta di appuntamento`, () => `Spostamento della firma ${G.person().last}`, () => `Richiesta copia conforme di un atto del ${G.int(2008, 2022)}`, () => `${G.person().name}: dove parcheggio venerdì?`]
};
function triageMission() {
 const n = G.int(4, 5), keys = G.shuffle([...lanes.map(l => l[0]), ...lanes.map(l => l[0])]).slice(0, n);
 const items = keys.map(k => ({lane:k, text:G.pick(triagePool[k])()}));
 const mail = {from:'PEC dello studio · smistamento', address:'pec@studioconti.example', kind:'PEC', subject:`${n} email arrivate da smistare`, attachments:[],
  body:`Sono arrivate ${n} email sulla casella PEC dello studio. Otto le ha lette: ora vanno assegnate alle persone giuste.`,
  understood:`Ognuna va a chi segue quella materia: Giulia compravendite e mutui, Luca società, Elena successioni e donazioni, Sara appuntamenti e segreteria.`};
 return {mail, mission:{kind:'triage', title:`Smista la coda · ${n} email dalla PEC`, label:'SMISTA LA CODA', ttl:200000, data:{items}, render:triageRender, handle:triageHandle}};
}
function triageRender(d, st) {
 const a = st.assign || {};
 const all = d.items.every((_, i) => a[i]);
 return `<p class="mg-ask">Assegna ogni email <b>alla persona giusta</b>, poi conferma lo smistamento.</p>
  <div class="mg-lanes">${lanes.map(l => `<span><b>${l[1]}</b>${l[2]}</span>`).join('')}</div>
  <div class="mg-queue">${d.items.map((it, i) => `<div class="mg-qrow ${st.done ? (a[i] === it.lane ? 'right' : 'wrong') : ''}"><span class="mg-qtext">${esc(it.text)}</span><span class="mg-chips">${lanes.map(l => `<button class="${a[i] === l[0] ? 'on' : ''} ${st.done && it.lane === l[0] ? 'sol' : ''}" data-game="mg:${st.id}:set:${i}.${l[0]}" ${st.done ? 'disabled' : ''}>${l[1]}</button>`).join('')}</span></div>`).join('')}</div>
  ${st.done ? '' : `<div class="gc-options"><button data-game="mg:${st.id}:confirm:0" ${all ? '' : 'disabled'}>Conferma lo smistamento</button></div>`}`;
}
function triageHandle(d, st, action, v) {
 if (action === 'set') { const [i, lane] = v.split('.'); (st.assign ||= {})[i] = lane; return {sound:'click'}; }
 if (action === 'confirm') {
  const a = st.assign || {}, ok = d.items.filter((it, i) => a[i] === it.lane).length, t = d.items.length;
  if (ok === t) return {done:true, pts:45, label:'Coda smistata alla perfezione', why:`Tutte e ${t} le email sono arrivate alla persona giusta: nessuno deve girarle a un collega.`};
  if (ok >= t / 2) return {done:true, pts:Math.round(30 * ok / t), label:`${ok} su ${t} al posto giusto`, why:'Le righe rosse sono finite alla persona sbagliata: in verde chi doveva riceverle.'};
  return {done:true, pts:-10, label:`Solo ${ok} su ${t}`, why:'Metà della coda è finita alle persone sbagliate: in verde chi doveva riceverle.'};
 }
}

// ————— Correggi la bozza —————
// La risposta preparata da Otto su WhatsApp contiene un errore rispetto alle fonti: lo trovi e lo correggi.
const days = ['lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì'];
function proofMission() {
 const who = G.person(), day = G.int(0, 4), date = G.int(20, 30), kind = G.pick(['ora', 'giorno', 'notaio', 'importo']);
 const hour = G.pick(['9:30', '10:30', '11:00', '15:00', '16:30']), other = G.pick(['9:00', '12:00', '14:30', '17:30', '18:00'].filter(h => h !== hour));
 const notary = G.pick(['Notaio Conti', 'Notaio Ferri']), notaryOther = notary === 'Notaio Conti' ? 'Notaio Ferri' : 'Notaio Conti';
 const amt = G.amount() * 4, amtWrong = G.typoNumber(amt);
 const fix = {ora:[hour, other], giorno:[`${days[day]} ${date}`, `${days[(day + 1) % 5]} ${date + 1}`], notaio:[notary, notaryOther], importo:[G.euro(amt), G.euro(amtWrong)]}[kind];
 const seg = (txt, key) => key === kind ? {t:fix[1], err:true, ok:fix[0], choices:G.shuffle([fix[0], fix[1], kind === 'ora' ? '13:00' : kind === 'importo' ? G.euro(G.roundUp(amt)) : kind === 'notaio' ? 'Notaio Benassi' : `sabato ${date + 2}`])} : {t:txt};
 const parts = [{t:`Buongiorno ${who.first}, confermato: firma `}, seg(`${days[day]} ${date}`, 'giorno'), {t:' alle '}, seg(hour, 'ora'), {t:' con il '}, seg(notary, 'notaio'), {t:'. Per il saldo prepari un bonifico di '}, seg(G.euro(amt), 'importo'), {t:'. Le mando un promemoria il giorno prima.'}];
 const sources = [{t:'Agenda dello studio', rows:[[`${days[day]} ${date} ottobre`, `${hour} · firma ${who.last} · ${notary}`]]}, {t:`Pratica ${who.last}`, rows:[['Saldo prezzo', G.euro(amt)]]}];
 const chat = {who:who.name, practice:`P-${G.int(205, 289)}`, text:G.pick(['Mi conferma giorno e ora della firma? E quanto devo versare di saldo?', 'Buongiorno, ci ricorda quando firmiamo e l’importo del saldo?', 'Salve! Per venerdì è tutto confermato? Quanto è il bonifico del saldo?'])};
 return {chat, mission:{kind:'proof', title:`Correggi la bozza · risposta a ${who.name}`, label:'CORREGGI LA BOZZA', ttl:170000, data:{parts, sources}, render:proofRender, handle:proofHandle}};
}
function proofRender(d, st) {
 const sel = st.sel, fixed = st.fixed || {};
 return `<p class="mg-ask">Otto ha scritto la risposta, ma qualcosa <b>non torna con le fonti</b>. Tocca la parte sbagliata e correggila.</p>
  <div class="mg-sources">${d.sources.map(s => `<div class="mg-doc"><span class="mg-doc-t">${esc(s.t)}</span>${s.rows.map(r => `<div class="mg-row"><span class="mg-k">${esc(r[0])}</span><span class="mg-v">${esc(r[1])}</span></div>`).join('')}</div>`).join('')}</div>
  <div class="mg-draft"><span class="mg-doc-t">Risposta proposta da Otto</span><p>${d.parts.map((p, i) => p.err || p.t.trim().length > 3 && i % 2 ? `<button class="mg-tok ${fixed[i] ? 'fixed' : ''} ${sel === i ? 'sel' : ''} ${st.misses?.includes(i) ? 'miss' : ''}" data-game="mg:${st.id}:tok:${i}" ${st.done || fixed[i] ? 'disabled' : ''}>${esc(fixed[i] || p.t)}</button>` : esc(p.t)).join('')}</p></div>
  ${sel != null && !st.done ? `<div class="gc-options">${d.parts[sel].choices.map(c => `<button data-game="mg:${st.id}:fix:${encodeURIComponent(c)}">${esc(c)}</button>`).join('')}</div>` : ''}`;
}
function proofHandle(d, st, action, v) {
 if (action === 'tok') {
  const i = +v;
  if (d.parts[i].err) { st.sel = i; return {sound:'open'}; }
  (st.misses ||= []).includes(i) || st.misses.push(i);
  return {sound:'bad'};
 }
 if (action === 'fix') {
  const p = d.parts[st.sel], c = decodeURIComponent(v), m = st.misses?.length || 0;
  if (c === p.ok) { (st.fixed ||= {})[st.sel] = c; st.sel = null; return {done:true, pts:Math.max(10, 30 + (m ? 0 : 15) - m * 5), label:m ? 'Corretta, con qualche tentativo' : 'Bozza perfetta', why:`Con **${esc(c)}** la risposta coincide con agenda e pratica. Otto la invia al cliente.`}; }
  return {done:true, pts:-15, label:'Correzione sbagliata', why:`Le fonti dicono **${esc(p.ok)}**: con ${esc(c)} il cliente avrebbe ricevuto un’informazione sbagliata.`};
 }
}

// ————— Il conto torna? —————
// Un calcolo vero dello studio, con il tastierino o il calendario. Il risultato lo calcola il generatore.
function calcMission() {
 const kind = G.pick(['imposta', 'saldo', 'termine']), who = G.person();
 let data, mail;
 if (kind === 'imposta') {
  const v = G.int(28, 140) * 1000 + G.int(0, 9) * 110;
  data = {kind, ask:'Quanto è l’<b>imposta di registro</b>?', answer:Math.max(1000, Math.round(v * .02)), sources:[{t:'Regola prima casa', rows:[['Imposta di registro', '2% del valore catastale'], ['Minimo', '€ 1.000']]}, {t:`Visura · ${who.last}`, rows:[['Valore catastale', G.euro(v)]]}]};
  mail = {from:who.name, address:`${who.last.toLowerCase()}@mail.example`, kind:'Cliente', subject:`Quanto pago di imposte? Casa a ${G.pick(G.cities)}`, body:'Buongiorno, compro la prima casa: mi sa dire quanto pagherò di imposta di registro?', understood:'Il cliente compra la prima casa e chiede l’imposta di registro: 2% del valore catastale, con un minimo di legge.'};
 } else if (kind === 'saldo') {
  const p = G.int(140, 420) * 1000, c = Math.round(p * G.pick([.05, .1, .1]) / 500) * 500, m = Math.round(p * G.pick([.5, .6, .7, .8]) / 1000) * 1000;
  data = {kind, ask:'Quanto deve versare l’acquirente <b>di saldo alla firma</b>?', answer:p - c - m, sources:[{t:'Preliminare', rows:[['Prezzo', G.euro(p)], ['Caparra già versata', G.euro(c)]]}, {t:'Delibera del mutuo', rows:[['Importo erogato alla firma', G.euro(m)]]}]};
  mail = {from:who.name, address:`${who.last.toLowerCase()}@mail.example`, kind:'Cliente', subject:`Saldo da preparare per la firma`, body:'Salve, devo preparare il bonifico del saldo: qual è la cifra esatta?', understood:'Il saldo è quello che resta del prezzo, togliendo la caparra già versata e il mutuo che la banca eroga alla firma.'};
 } else {
  const d = new Date(2026, G.int(9, 10), G.int(1, 28)), due = new Date(d); due.setDate(due.getDate() + 30);
  data = {kind, ask:'Entro quando vanno fatte <b>registrazione e trascrizione</b>?', answer:due.toDateString(), month:[due.getFullYear(), due.getMonth()], sources:[{t:'Regola dello studio', rows:[['Registrazione e trascrizione', 'entro 30 giorni dalla data dell’atto']]}, {t:`Repertorio · ${who.last}`, rows:[['Atto firmato il', d.toLocaleDateString('it-IT', {day:'numeric', month:'long', year:'numeric'})]]}]};
  mail = {from:'Paolo Donati (dal telefono)', address:'p.donati@studioconti.example', kind:'Interna', subject:`Scadenza atto ${who.last}: me la segni tu?`, body:'Sono fuori studio: mi metti in agenda la scadenza per registrazione e trascrizione dell’atto?', understood:'Va calcolata la scadenza dei 30 giorni dalla data dell’atto e messa in agenda.'};
 }
 return {mail:{...mail, attachments:[]}, mission:{kind:'calc', title:`Il conto torna? · ${mail.subject}`, label:'IL CONTO TORNA?', ttl:170000, data, render:calcRender, handle:calcHandle}};
}
function calcRender(d, st) {
 const src = `<div class="mg-sources">${d.sources.map(s => `<div class="mg-doc"><span class="mg-doc-t">${esc(s.t)}</span>${s.rows.map(r => `<div class="mg-row"><span class="mg-k">${esc(r[0])}</span><span class="mg-v">${esc(r[1])}</span></div>`).join('')}</div>`).join('')}</div>`;
 const tries = st.tries ? ` <span class="mg-tries">Tentativi sbagliati: ${st.tries}/2</span>` : '';
 if (d.kind === 'termine') {
  const [y, m] = d.month, first = new Date(y, m, 1), pad = (first.getDay() + 6) % 7, n = new Date(y, m + 1, 0).getDate();
  const cells = [...Array(pad).fill(''), ...Array.from({length:n}, (_, i) => i + 1)];
  return `<p class="mg-ask">${d.ask}${tries}</p>${src}
   <div class="mg-cal"><span class="mg-doc-t">${first.toLocaleDateString('it-IT', {month:'long', year:'numeric'})}</span><div class="mg-cal-grid">${['L', 'M', 'M', 'G', 'V', 'S', 'D'].map(x => `<i>${x}</i>`).join('')}${cells.map(c => c ? `<button class="${st.done && new Date(y, m, c).toDateString() === d.answer ? 'sol' : ''} ${st.wrong?.includes(c) ? 'miss' : ''}" data-game="mg:${st.id}:day:${c}" ${st.done ? 'disabled' : ''}>${c}</button>` : '<span></span>').join('')}</div></div>`;
 }
 const val = st.val || '';
 return `<p class="mg-ask">${d.ask}${tries}</p>${src}
  <div class="mg-pad"><div class="mg-display ${st.done ? 'ok' : ''}">€ ${val ? (+val).toLocaleString('it-IT') : '<span>—</span>'}</div>
  ${st.done ? '' : `<div class="mg-keys">${[1, 2, 3, 4, 5, 6, 7, 8, 9, 'back', 0, 'ok'].map(k => `<button class="${k === 'ok' ? 'go' : ''}" data-game="mg:${st.id}:key:${k}">${k === 'back' ? '⌫' : k === 'ok' ? 'OK' : k}</button>`).join('')}</div>`}</div>`;
}
function calcHandle(d, st, action, v) {
 const win = () => ({done:true, pts:st.tries ? 25 : 45, label:st.tries ? 'Giusto, al secondo colpo' : 'Conto perfetto', why:d.kind === 'termine' ? 'Trenta giorni esatti dalla firma: Otto mette la scadenza in agenda con un promemoria una settimana prima.' : d.kind === 'imposta' && d.answer === 1000 ? 'Il 2% era sotto il minimo di legge: si pagano € 1.000. È la trappola classica.' : 'Il conto torna: Otto lo scrive nella risposta al cliente e nella pratica.'});
 const lose = () => ({done:true, pts:-10, label:'Il conto non torna', why:`Il risultato giusto era ${d.kind === 'termine' ? new Date(d.answer).toLocaleDateString('it-IT', {day:'numeric', month:'long'}) : G.euro(d.answer)}. ${d.kind === 'imposta' ? 'Ricorda il minimo di € 1.000.' : d.kind === 'saldo' ? 'Prezzo meno caparra meno mutuo.' : 'Trenta giorni dalla data dell’atto.'}`});
 if (action === 'day') {
  if (new Date(d.month[0], d.month[1], +v).toDateString() === d.answer) { st.done = true; return win(); }
  (st.wrong ||= []).push(+v); st.tries = (st.tries || 0) + 1;
  if (st.tries >= 2) { st.done = true; return lose(); }
  return {sound:'bad'};
 }
 if (action === 'key') {
  if (v === 'back') { st.val = (st.val || '').slice(0, -1); return {sound:'click'}; }
  if (v !== 'ok') { if ((st.val || '').length < 7) st.val = (st.val || '') + v; return {sound:'click'}; }
  if (+st.val === d.answer) { st.done = true; return win(); }
  st.tries = (st.tries || 0) + 1; st.val = '';
  if (st.tries >= 2) { st.done = true; return lose(); }
  return {sound:'bad'};
 }
}

// ————— Al telefono —————
// Una chiamata in diretta: il chiamante parla, tu scegli cosa risponde Otto. Le fonti dicono cosa si può fare.
function phoneMission() {
 const who = G.person(), kind = G.pick(['sposta', 'privacy', 'urgenza', 'banca']);
 const d1 = G.pick(days), slotBusy = G.pick(['10:00', '11:30']), slotFree = G.pick(['15:00', '16:30']);
 let turns, sources, call, caller = who.name;
 if (kind === 'sposta') {
  sources = [{t:`Agenda di ${d1}`, rows:[[slotBusy, 'occupato · firma Bellandi'], [slotFree, 'libero']]}];
  turns = [{c:`Buongiorno, sono ${who.name}. Posso spostare la mia firma a ${d1}?`, o:[{t:`Certo: ${d1} alle ${slotFree} è libero, la segno?`, ok:true}, {t:`Sì, alle ${slotBusy} va benissimo.`, why:`Alle ${slotBusy} c’è già un’altra firma: guarda l’agenda.`}, {t:'Mi dispiace, le firme non si possono spostare.', why:'Si possono spostare, se c’è posto: e in agenda c’è.'}]},
   {c:'Perfetto. Devo portare qualcosa?', o:[{t:'Solo un documento d’identità valido: il resto lo abbiamo noi.', ok:true}, {t:'Niente, non serve nulla.', why:'Il notaio deve identificare chi firma: il documento serve sempre.'}, {t:'Tutti gli atti originali di casa.', why:'Gli atti li ha già lo studio: chiederli spaventa il cliente per niente.'}]}];
  call = {kind:'Cliente', intent:'Spostamento della firma'};
 } else if (kind === 'privacy') {
  const rel = G.person(); caller = `${rel.first} ${who.last}`;
  sources = [{t:`Pratica successione ${who.last}`, rows:[['Erede', who.name], ['Altri autorizzati', 'nessuno']]}];
  turns = [{c:`Salve, sono ${rel.first} ${who.last}, il fratello di ${who.first}. A che punto è la successione?`, o:[{t:`Posso dare informazioni solo a ${who.first}: le chiedo di richiamarla lei.`, ok:true}, {t:'Manca solo la dichiarazione, poi è fatta.', why:'Nessuno lo ha autorizzato: una risposta così è una violazione della privacy.'}, {t:'Mi dica il codice fiscale e le dico tutto.', why:'Sapere un codice fiscale non dà diritto a una pratica di un altro.'}]},
   {c:'Ma sono di famiglia!', o:[{t:`Capisco. Se ${who.first} ci autorizza per iscritto, la aggiorno volentieri.`, ok:true}, {t:'Va bene, allora le dico tutto.', why:'Essere parenti non basta: serve l’autorizzazione di chi segue la pratica.'}, {t:'Allora la richiamiamo noi tra un’ora.', why:'Senza autorizzazione non si può dire niente, nemmeno tra un’ora.'}]}];
  call = {kind:'Terzo', intent:'Informazioni su una successione'};
 } else if (kind === 'urgenza') {
  const s1 = G.pick(['domani alle 9:00', 'domani alle 12:00']);
  sources = [{t:'Agenda della dott.ssa Ferri', rows:[[s1, 'libero'], ['oggi pomeriggio', 'occupato'], ['tra 10 giorni', 'libero']]}];
  turns = [{c:`Buongiorno... è mancato mio padre la settimana scorsa e la banca ha bloccato il conto. Non so cosa fare.`, o:[{t:`Mi dispiace molto. La dott.ssa Ferri può vederla ${s1}: va bene?`, ok:true}, {t:'Le propongo tra dieci giorni.', why:'C’è un posto molto prima: con un conto bloccato ogni giorno conta.'}, {t:'Venga oggi pomeriggio.', why:'Oggi pomeriggio la dott.ssa Ferri è occupata: guarda l’agenda.'}]},
   {c:'Grazie. Cosa devo portare?', o:[{t:'Il certificato di morte e i documenti degli eredi: le mando l’elenco su WhatsApp.', ok:true}, {t:'Il testamento originale firmato da lei.', why:'Il testamento lo firma chi lo fa, non chi eredita: e potrebbe non esserci.'}, {t:'Niente, facciamo tutto noi.', why:'Senza certificato e documenti la pratica non parte: meglio dirlo subito.'}]}];
  call = {kind:'Nuovo cliente', intent:'Successione urgente'};
 } else {
  const [bank] = G.pick(G.banks); caller = `${bank} · Ufficio mutui`; const num = `+39 055 ${G.int(200, 899)} ${G.int(1000, 9999)}`;
  sources = [{t:`Anagrafica ${bank}`, rows:[['Numero registrato', num], ['Chiamata in arrivo da', num]]}];
  turns = [{c:`Buongiorno, ${bank}, ufficio mutui. A che punto è la bozza della pratica ${who.last}?`, o:[{t:'Il numero è quello registrato: la bozza vi arriva via PEC entro mercoledì.', ok:true}, {t:'Non possiamo dire nulla alle banche.', why:'La banca è parte della pratica e chiama dal numero registrato: può essere informata.'}, {t:'Ci mandi una PEC e le rispondiamo tra una settimana.', why:'La chiamata è verificata: farla aspettare una settimana rallenta la stipula.'}]},
   {c:'Perfetto, e la data di stipula è confermata?', o:[{t:'Sì, è in agenda: Otto vi manda la conferma scritta adesso.', ok:true}, {t:'Non lo so, richiami domani.', why:'L’agenda è lì: si può confermare subito.'}, {t:'Dipende dalla banca, ditecelo voi.', why:'La data la fissa lo studio con le parti ed è già in agenda.'}]}];
  call = {kind:'Banca', intent:`Stato della bozza ${who.last}`};
 }
 turns.forEach(t => { t.o = G.shuffle(t.o); });
 return {call:{...call, caller, first:turns[0].c}, mission:{kind:'phone', title:`Al telefono · ${caller}`, label:'AL TELEFONO', ttl:190000, data:{turns, sources, caller}, render:phoneRender, handle:phoneHandle}};
}
function phoneRender(d, st) {
 const at = st.turn || 0, log = st.log || [];
 return `<p class="mg-ask">La chiamata è in corso. <b>Scegli cosa risponde Otto</b>: le fonti dicono cosa si può fare.</p>
  <div class="mg-sources">${d.sources.map(s => `<div class="mg-doc"><span class="mg-doc-t">${esc(s.t)}</span>${s.rows.map(r => `<div class="mg-row"><span class="mg-k">${esc(r[0])}</span><span class="mg-v">${esc(r[1])}</span></div>`).join('')}</div>`).join('')}</div>
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
 return {done:true, pts:m ? Math.max(-10, 30 - m * 12) : 45, label:m ? (m > 1 ? 'Chiamata recuperata a fatica' : 'Chiamata gestita, con un inciampo') : 'Chiamata perfetta', why:m ? 'Otto ha corretto il tiro, ma al telefono la prima risposta è quella che il cliente ricorda.' : 'Risposte giuste al primo colpo: il chiamante chiude tranquillo e Otto registra tutto nella pratica.'};
}

// ————— regista —————
// Fa arrivare missioni da tutto lo studio: email nella Posta, messaggi su WhatsApp, chiamate al Centralino.
// Più il livello sale, più missioni possono essere aperte insieme e meno tempo c'è.
const kinds = {diff:diffMission, boxes:boxesMission, triage:triageMission, calc:calcMission, proof:proofMission, phone:phoneMission};
const rotation = ['diff', 'phone', 'boxes', 'proof', 'triage', 'calc'];
function spawn() {
 if (!running) return;
 if (document.body.classList.contains('touring') || document.hidden) return schedule(3); // riprova appena si torna a giocare
 const lvl = gameLevel(), max = lvl === 1 ? 2 : 3;
 const open = live.missions.filter(x => x.missionOpen).length;
 if (open < max) {
  const kind = turn < rotation.length ? rotation[turn] : G.pick(rotation); turn++;
  const made = kinds[kind](), ttl = Math.round(made.mission.ttl * (lvl === 3 ? .7 : lvl === 2 ? .85 : 1));
  let item, page;
  if (made.mail) { item = spawnMail({...made.mail, priority:'alta', assignee:'GM', prepared:[], draft:'', attachments:made.mail.attachments || []}); page = 'posta'; }
  else if (made.chat) { item = spawnChat(made.chat); page = 'whatsapp'; }
  else { item = spawnCall(made.call); page = 'centralino'; }
  const id = addMission({...made.mission, ttl, page, ref:item.id, onDone:() => { item.missionOpen = false; if (made.call) Object.assign(item, {duration:'2:40', outcome:'Gestita con te'}); onHandled(item.id, page); schedule(G.int(8, 16)); }});
  item.mission = id; item.missionOpen = true;
  live.missions.push(item);
 }
 schedule(open + 1 < max ? G.int(25, 40) : G.int(15, 25));
}
function schedule(s) { clearTimeout(timer); timer = setTimeout(spawn, s * 1000); }
export function startMissions(handled) { onHandled = handled || onHandled; running = true; live.game = true; turn = 0; schedule(3); }
export function stopMissions() { running = false; live.game = false; clearTimeout(timer); }
