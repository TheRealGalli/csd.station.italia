// Missioni della Posta di CS Notaro OS. Con la sfida avviata, un regista fa arrivare email vere da gestire:
// ognuna porta con sé un minigioco, dentro l'email stessa. È il controllo umano che il prodotto chiederà davvero.
//
// Due minigiochi, sempre con valori nuovi dal generatore (gen.js):
//  · Trova la differenza: due documenti affiancati, tocchi la riga che non torna e scegli il valore giusto.
//  · Caselle dalla fonte: copi il dato mancante dal documento giusto, una casella per carattere.
import * as G from './gen.js';
import {addMission} from './game.js';
import {spawnMail, live} from './live.js';

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

// ————— regista —————
// Fa arrivare una missione alla volta (mai più di due aperte), alternando i minigiochi.
function spawn() {
 if (!running) return;
 const open = live.missions.filter(x => x.missionOpen).length;
 if (document.body.classList.contains('touring') || document.hidden) return schedule(3); // riprova appena si torna a giocare
 if (open < 2) {
  const {mail, mission} = turn++ % 2 ? boxesMission() : diffMission();
  const m = spawnMail({...mail, priority:'alta', assignee:'GM', prepared:[], draft:''});
  const id = addMission({...mission, page:'posta', ref:m.id, onDone:() => { m.missionOpen = false; onHandled(m.id); schedule(G.int(12, 22)); }});
  m.mission = id; m.missionOpen = true;
  live.missions.push(m);
 }
 schedule(open + 1 < 2 ? G.int(35, 55) : G.int(20, 30));
}
function schedule(s) { clearTimeout(timer); timer = setTimeout(spawn, s * 1000); }
export function startMissions(handled) { onHandled = handled || onHandled; running = true; live.game = true; schedule(3); }
export function stopMissions() { running = false; live.game = false; clearTimeout(timer); }
