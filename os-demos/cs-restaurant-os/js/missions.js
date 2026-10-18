// Missioni di CS Restaurant OS: un minigioco per ogni modulo, con più scenari e valori sempre nuovi (gen.js).
// Le meccaniche sono in mg.js; qui ci sono i contenuti del locale. La difficoltà cresce con il livello
// (gameLevel): al livello 1 poche voci e conti semplici, poi più voci, percentuali e calcoli composti.
//
//  Sala             · Il conto torna (calcolatrice: QR già pagato, alla romana, sconti, coperto)
//  Cucina           · Smista la comanda (ogni piatto alla partita giusta)
//  Menu digitale QR · Cosa resta sul QR? (disponibile, ultime porzioni, esaurito)
//  Centralino AI    · Al telefono
//  Recensioni AI    · La risposta giusta
//  WhatsApp         · Correggi la bozza
//  Fidelity & NFC   · Premio sì o no?
//  Magazzino        · Trova la differenza (fattura contro bolla firmata)
//  Cassa & Entrate  · Caselle dalla fonte (codice destinatario, partita IVA)
//  Bandi            · Spesa ammissibile o no?
//  Staff & HACCP    · Conforme o no?
//  Brand & app      · Gli allergeni del piatto del giorno
import * as G from './gen.js';
import {mechanics as M} from './mg.js';
import {addMission, gameLevel} from './game.js';
import * as D from './demo.js';

let testLevel = 0;
const lvl = () => testLevel || gameLevel();
const by = (l1, l2, l3) => [l1, l2, l3][lvl() - 1];
const days = ['lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
const mk = (kind, label, title, data, ttl = 160000) => ({kind, label, title, ttl, data, render:M[kind].render, handle:M[kind].handle});
const euro2 = n => `€ ${n.toFixed(2).replace('.', ',')}`;
let timer = 0, running = false, turn = 0;

// ————— Sala · Il conto torna —————
function salaMission() {
 const t = G.int(1, 12), people = G.int(2, 6), total = people * G.int(22, 41), paid = G.int(1, people - 1) * G.int(14, 30);
 const k = G.pick(by(['qr', 'coperto'], ['qr', 'romana', 'sconto', 'coperto'], ['romana', 'sconto', 'scontoqr', 'coperto']));
 const base = {unit:'€', winWhy:'Il conto torna: Otto emette un solo documento commerciale con la cifra giusta.'};
 if (k === 'qr') return {event:[`Tavolo ${t} chiede il conto`, 'Una parte è già pagata dal QR'], m:mk('calc', 'IL CONTO TORNA?', `Sala · conto del tavolo ${t}`, {...base, ask:`Quanto incassi adesso al <b>tavolo ${t}</b>?`, answer:total - paid, sources:[{t:`Conto tavolo ${t}`, rows:[['Totale', G.euro(total)]]}, {t:'Pagamenti Stripe', rows:[[`Ordine QR tavolo ${t}`, `${G.euro(paid)} · pagato`]]}], hint:'Totale meno quello già pagato dal QR.'})};
 if (k === 'coperto') { const cop = G.pick([2, 2.5, 3]), food = total; return {event:[`Tavolo ${t} chiede il conto`, `${people} persone, coperto da aggiungere`], m:mk('calc', 'IL CONTO TORNA?', `Sala · conto del tavolo ${t}`, {...base, ask:`Quanto è il conto del <b>tavolo ${t}</b>, coperto compreso?`, answer:food + cop * people, sources:[{t:`Comanda tavolo ${t}`, rows:[['Piatti e vini', G.euro(food)], ['Persone', String(people)]]}, {t:'Listino', rows:[['Coperto a persona', euro2(cop)]]}], hint:'Piatti più coperto per ogni persona.'})}; }
 if (k === 'romana') { const n = people - 1 || 1; return {event:[`Tavolo ${t}: conto alla romana`, `${n} persone dividono il resto`], m:mk('calc', 'IL CONTO TORNA?', `Sala · alla romana al tavolo ${t}`, {...base, ask:`Quanto paga ciascuno dei <b>${n}</b> che restano, arrotondando all’euro in su?`, answer:Math.ceil((total - paid) / n), sources:[{t:`Conto tavolo ${t}`, rows:[['Totale', G.euro(total)], ['Già pagato da uno dal QR', G.euro(paid)]]}, {t:'Al tavolo', rows:[['Persone che dividono il resto', String(n)]]}], hint:'Prima si toglie quanto già pagato, poi si divide e si arrotonda in su.'})}; }
 const pct = G.pick([10, 15, 20]);
 if (k === 'sconto') return {event:[`Tavolo ${t}: cliente fidelity`, `Sconto del ${pct}% sul conto`], m:mk('calc', 'IL CONTO TORNA?', `Sala · sconto al tavolo ${t}`, {...base, ask:`Il tavolo ${t} ha la card fidelity: <b>sconto del ${pct}%</b>. Quanto paga?`, answer:+(total * (1 - pct / 100)).toFixed(2), sources:[{t:`Conto tavolo ${t}`, rows:[['Totale', G.euro(total)]]}, {t:'Fidelity', rows:[['Sconto della card', `${pct}%`]]}], hint:`Totale meno il ${pct}%: per esempio totale × ${100 - pct}%.`})};
 return {event:[`Tavolo ${t}: sconto e QR`, 'Conto da chiudere'], m:mk('calc', 'IL CONTO TORNA?', `Sala · conto del tavolo ${t}`, {...base, ask:`Sconto del <b>${pct}% sul totale</b>, poi si toglie quanto già pagato dal QR. Quanto incassi?`, answer:+(total * (1 - pct / 100) - paid).toFixed(2), sources:[{t:`Conto tavolo ${t}`, rows:[['Totale', G.euro(total)], ['Sconto fidelity', `${pct}%`]]}, {t:'Pagamenti Stripe', rows:[['Già pagato dal QR', G.euro(paid)]]}], hint:'Prima lo sconto sul totale, poi meno il già pagato.'})};
}

// ————— Cucina · Smista la comanda —————
const stations = [['Antipasti', 'Antipasti', 'freddi'], ['Primi', 'Primi', 'pasta e risotti'], ['Secondi', 'Secondi', 'griglia'], ['Dolci', 'Dolci', 'pasticceria']];
function kdsMission() {
 const t = G.pick(['T5', 'T9', 'T3']), dishes = G.shuffle(D.menu.filter(d => d.course > 0 && d.visible)).slice(0, by(3, 4, 5));
 return {event:[`Comanda grande · tavolo ${t.slice(1)}`, `${dishes.length} piatti da smistare`], log:'cucina', m:mk('triage', 'SMISTA LA COMANDA', `Cucina · comanda del tavolo ${t.slice(1)}`, {ask:'Una comanda grande dal QR: manda <b>ogni piatto alla partita giusta</b>, poi conferma.', lanes:stations, items:dishes.map(d => ({lane:d.cat, text:d.name, sub:d.allergens.length ? `allergeni: ${d.allergens.join(', ')}` : ''})), confirm:'Manda in cucina', winWhy:'Ogni piatto alla sua partita: escono insieme e il tavolo mangia caldo.'}, 150000)};
}

// ————— Menu QR · Cosa resta sul QR? —————
function menuMission() {
 const list = G.shuffle(D.menu.filter(d => d.course > 0 && d.visible)).slice(0, by(3, 4, 5));
 const items = list.map(d => { const [k, q] = Object.entries(d.recipe)[0], ing = D.ingredient(k), n = G.pick([0, G.int(1, 3), G.int(5, 20)]); const have = ing.unit === 'kg' ? +(q * n + q * .4).toFixed(2) : q * n; return {text:d.name, sub:`${ing.name}: ${ing.unit === 'kg' ? have.toFixed(2).replace('.', ',') + ' kg' : have + ' ' + ing.unit} · ${ing.unit === 'kg' ? Math.round(q * 1000) + ' g' : q + ' ' + ing.unit} a porzione`, ans:n === 0 ? 'out' : n <= 3 ? 'few' : 'ok'}; });
 return {event:['Inventario di metà servizio', 'Il menu QR va aggiornato'], log:'menu', m:mk('classify', 'COSA RESTA SUL QR?', 'Menu QR · inventario', {ask:'Dopo l’inventario: per ogni piatto, <b>cosa deve mostrare il menu QR</b>?', sources:[{t:'Regola del menu intelligente', rows:[['Esaurito', 'meno di una porzione'], ['Ultime porzioni', 'da 1 a 3'], ['Disponibile', 'più di 3']]}], states:[['ok', 'Disponibile'], ['few', 'Ultime'], ['out', 'Esaurito']], items, winWhy:'Il menu QR mostra solo ciò che c’è davvero: nessun ospite ordina un piatto finito.'})};
}

// ————— Centralino AI · Al telefono —————
function centralinoMission() {
 const who = G.person(), kind = G.pick(['prenota', 'allergia', 'piena', 'conto']);
 let turns, sources;
 if (kind === 'prenota') {
  const n = G.int(5, 8);
  sources = [{t:'Sala alle 21:00', rows:[['T5 · 6 posti', 'occupato fino alle 22:30'], ['T9 · 8 posti', 'libero'], ['T12 · 4 posti', 'libero']]}];
  turns = [{c:`Buonasera, sono ${who.name}. Avete un tavolo per ${n} alle 21?`, o:[{t:'Sì: il tavolo 9 da otto è libero, lo segno?', ok:true}, {t:'Vi metto al 5, è da sei.', why:'Il 5 è occupato fino alle 22:30.'}, {t:'Il 12 va benissimo.', why:`Il 12 ha 4 posti: in ${n} non ci state.`}]},
   {c:'Perfetto! Mi mandate una conferma?', o:[{t:'Certo, le arriva adesso su WhatsApp con l’indirizzo.', ok:true}, {t:'Non serve, si ricordi lei.', why:'La conferma scritta riduce i tavoli vuoti.'}, {t:'Ci richiami domani per conferma.', why:'La prenotazione è già fatta.'}]}];
 } else if (kind === 'allergia') {
  const a = G.pick([['celiaca', 'glutine', 'il risotto ai porcini'], ['allergica alle uova', 'uova', 'la tagliata'], ['intollerante al lattosio', 'latte', 'i pici al pomodoro']]);
  sources = [{t:'Menu e allergeni', rows:[['Carbonara', 'glutine, uova, latte'], ['Risotto ai porcini', 'latte'], ['Pici al pomodoro', 'glutine'], ['Tagliata', 'nessuno']]}];
  turns = [{c:`Prenoto per stasera, ma mia figlia è ${a[0]}. Cosa può mangiare?`, o:[{t:`Le consiglio ${a[2]}: senza ${a[1]}. Lo segno sulla prenotazione.`, ok:true}, {t:'Tranquilla, la carbonara va bene per tutti.', why:`La carbonara contiene ${a[1]}.`}, {t:'Non possiamo garantire niente, meglio altrove.', why:'Il menu indica gli allergeni: si può consigliare un piatto sicuro.'}]},
   {c:'Grazie, ci terrei che la cucina lo sappia.', o:[{t:'È già sulla prenotazione: arriverà sulla comanda con l’allergene in evidenza.', ok:true}, {t:'Lo dica lei al cameriere.', why:'Un avviso a voce si perde: deve stare sulla comanda.'}, {t:'Ci pensiamo stasera.', why:'Va segnato adesso.'}]}];
 } else if (kind === 'piena') {
  sources = [{t:'Sala alle 20:30', rows:[['Tavoli liberi', 'nessuno'], ['Prima disponibilità', '21:45'], ['Lista d’attesa', '1 famiglia']]}];
  turns = [{c:'Siamo in quattro, possiamo venire alle 20:30?', o:[{t:'Alle 20:30 siamo pieni: le propongo le 21:45, oppure la lista d’attesa.', ok:true}, {t:'Venite pure, un posto si trova.', why:'La sala è piena: aspetterebbero in piedi.'}, {t:'Siamo pieni, mi dispiace.', why:'C’è posto alle 21:45 e c’è la lista d’attesa.'}]},
   {c:'La lista d’attesa, grazie. Come lo saprò?', o:[{t:'Le scrivo su WhatsApp appena si libera un tavolo.', ok:true}, {t:'Ci richiami ogni mezz’ora.', why:'È Otto ad avvisare.'}, {t:'Passi davanti al locale.', why:'Un messaggio basta.'}]}];
 } else {
  const amt = G.int(68, 160), dup = G.int(20, 40);
  sources = [{t:'Pagamenti di ieri · tavolo 7', rows:[['DC · POS', G.euro(amt)], ['DC · Stripe QR', G.euro(dup)], ['Totale tavolo', G.euro(amt)]]}];
  turns = [{c:`Ieri mi avete fatto pagare due volte: ${G.euro(amt)} al POS e ${G.euro(dup)} dal QR.`, o:[{t:`Ha ragione: il totale era ${G.euro(amt)}, i ${G.euro(dup)} del QR erano compresi. Le rimborso subito.`, ok:true}, {t:'Impossibile, la cassa non sbaglia.', why:'I documenti dicono il contrario.'}, {t:'Passi in cassa con lo scontrino.', why:'Si può rimborsare subito, senza farlo tornare.'}]},
   {c:'Grazie. Come mi arriva il rimborso?', o:[{t:'Sulla stessa carta del QR, con la nota di credito via email.', ok:true}, {t:'In contanti la prossima volta.', why:'Il rimborso va sullo stesso metodo di pagamento.'}, {t:'Con uno sconto sulla prossima cena.', why:'È un rimborso dovuto, non una promozione.'}]}];
 }
 if (lvl() === 1) turns.length = 1;
 turns.forEach(t => { t.o = G.shuffle(t.o); });
 return {event:[`Chiamata · ${who.name}`, 'Otto ha bisogno di te per rispondere'], m:mk('phone', 'AL TELEFONO', `Al telefono · ${who.name}`, {turns, sources, caller:who.name}, 180000)};
}

// ————— Recensioni AI · La risposta giusta —————
function recensioniMission() {
 const who = `${G.person().first} ${G.person().last[0]}.`, c = G.pick([
  ['Attesa di 40 minuti per i secondi', 'Ha ragione e ci scusiamo: abbiamo rivisto i tempi della cucina e alla prossima visita il dolce lo offriamo noi.', 'Il sabato c’è tanta gente, bisogna avere pazienza.', 'Ci dispiace! La prossima cena per voi è gratis.'],
  ['Il tiramisù era finito alle 21', 'Grazie, ha ragione: ora il menu mostra le ultime porzioni e il sabato ne prepariamo di più.', 'Il tiramisù finisce perché è buono, venga prima.', 'Non è vero, il tiramisù c’era.'],
  ['Cameriere sgarbato', 'Ci dispiace davvero: ne abbiamo parlato con lo staff. Ci piacerebbe rivederla per farle cambiare idea.', 'Il nostro staff è sempre gentile, forse ha frainteso.', 'Abbiamo licenziato il cameriere.']]);
 const cards = [{title:'Risposta A', body:c[1], ok:true}, {title:'Risposta B', body:c[2], why:'Dare la colpa al cliente peggiora la recensione e chi legge lo nota.'}, {title:'Risposta C', body:c[3], why:'Una promessa esagerata o una smentita: non risolve e crea nuovi problemi.'}].map((x, i, a) => x);
 const shuffled = G.shuffle(lvl() === 1 ? cards.slice(0, 2) : cards).map((x, i) => ({...x, title:`Risposta ${'ABC'[i]}`}));
 return {event:[`Recensione ★★ · ${who}`, c[0]], m:mk('pick', 'LA RISPOSTA GIUSTA', `Recensioni · ${who}`, {ask:`${who} scrive su Google: <b>“${c[0]}”</b>. Otto ha preparato tre risposte: quale pubblichi?`, cards:shuffled, winWhy:'Si riconosce il problema, si dice cosa si è cambiato e si invita a tornare: chi legge si fida di più.'})};
}

// ————— WhatsApp · Correggi la bozza —————
function whatsappMission() {
 const who = G.person(), day = G.pick(days), hour = G.pick(['19:30', '20:00', '20:30', '21:00']), n = G.int(2, 8), table = G.int(1, 12);
 const kind = G.pick(['ora', 'coperti', 'giorno', 'tavolo']);
 const wrong = {ora:G.pick(['19:00', '21:30', '22:00'].filter(h => h !== hour)), coperti:String(n + G.pick([1, 2])), giorno:days[(days.indexOf(day) + 1) % 6], tavolo:String(table % 12 + 1)}[kind];
 const right = {ora:hour, coperti:String(n), giorno:day, tavolo:String(table)}[kind];
 const decoy = {ora:'18:30', coperti:String(Math.max(1, n - 1)), giorno:'domenica', tavolo:String((table + 5) % 12 + 1)}[kind];
 const seg = (txt, key) => key === kind ? {t:wrong, err:true, ok:right, choices:G.shuffle([right, wrong, decoy])} : {t:txt};
 const parts = [{t:`Ciao ${who.first}! Confermato per `}, seg(day, 'giorno'), {t:' alle '}, seg(hour, 'ora'), {t:', '}, seg(String(n), 'coperti'), {t:' persone al tavolo '}, seg(String(table), 'tavolo'), {t:'. A presto all’Osteria del Borgo!'}];
 return {event:[`WhatsApp · ${who.name}`, 'Chiede la conferma della prenotazione'], m:mk('proof', 'CORREGGI LA BOZZA', `WhatsApp · conferma a ${who.name}`, {ask:`${who.first} chiede: “Mi confermate la prenotazione?” Otto ha scritto la risposta, ma qualcosa <b>non torna con il registro</b>.`, draftLabel:'Risposta proposta da Otto', parts, sources:[{t:'Registro prenotazioni', rows:[[`${day} · ${hour}`, `${who.name} · ${n} persone · tavolo ${table}`]]}], winWhy:'Ora la risposta coincide con il registro: l’ospite arriva all’ora giusta e trova il suo tavolo.', winLabel:'Conferma perfetta'}, 150000)};
}

// ————— Fidelity · Premio sì o no? —————
function fidelityMission() {
 const n = by(3, 4, 5), rules = [['Dessert offerto', 300], ['Bottiglia di Chianti', 800], ['Cena per due', 1500]];
 const items = Array.from({length:n}, () => { const [r, need] = G.pick(rules), pts = Math.random() < .5 ? need + G.int(0, 200) : need - G.int(10, 150); return {text:`${G.person().name} chiede: ${r.toLowerCase()}`, sub:`${pts} punti sulla card`, ans:pts >= need ? 'yes' : 'no'}; });
 return {event:['Card NFC al tavolo', `${n} richieste di premio`], m:mk('classify', 'PREMIO SÌ O NO?', 'Fidelity · richieste di premio', {ask:'Gli ospiti appoggiano la card: <b>il premio spetta o non ancora?</b>', sources:[{t:'Premi della card', rows:rules.map(([r, p]) => [r, `${p} punti`])}], states:[['yes', 'Concedi'], ['no', 'Non ancora']], items, winWhy:'Premi giusti a chi li ha raggiunti: gli altri ricevono un messaggio con quanti punti mancano.'})};
}

// ————— Magazzino · Trova la differenza —————
function magazzinoMission() {
 const ing = G.pick(D.ingredients), qty = G.int(3, 18), price = +(ing.cost * G.pick([.95, 1, 1.05])).toFixed(2), lot = `L${G.int(2600, 2699)}-${G.pick([...'ABCDE'])}`, exp = `${G.int(2, 28)}/${G.pick(['11', '12'])}/2026`;
 let rows = [['Prodotto', ing.name, ing.name], ['Quantità', `${qty} ${ing.unit}`, `${qty} ${ing.unit}`], ['Prezzo unitario', euro2(price), euro2(price)], ['Lotto', lot, lot], ['Scadenza', exp, exp]];
 let w = by(G.pick([1, 2]), G.pick([1, 2, 3]), G.pick([2, 3, 4]));
 rows[w][1] = w === 1 ? `${G.typoNumber(qty)} ${ing.unit}` : w === 2 ? euro2(price * G.pick([1.1, 1.2])) : w === 3 ? G.typoText(lot) : G.typoDate(exp);
 if (lvl() === 1) { rows = rows.slice(0, 4); }
 return {event:[`Fattura · ${ing.supplier}`, `${ing.name}: da controllare con la bolla`], log:'magazzino', m:mk('diff', 'TROVA LA DIFFERENZA', `Magazzino · fattura ${ing.supplier}`, {ask:'È arrivata la fattura: <b>tocca a sinistra la riga che non coincide</b> con la bolla firmata alla consegna.', chooseAsk:'Cosa registri?', left:`Fattura ${ing.supplier}`, right:'Bolla firmata alla consegna', rows, wrongRow:w, options:G.shuffle([{v:rows[w][2], ok:true}, {v:rows[w][1]}]), winWhy:'Vale la bolla firmata alla consegna: Otto contesta la differenza al fornitore e il magazzino resta giusto.', loseWhy:`La bolla firmata dice ${rows[w][2]}: il fornitore ringrazia.`})};
}

// ————— Cassa · Caselle dalla fonte —————
function fattureMission() {
 const firm = `${G.pick(['Studio', 'Eventi', 'Gruppo', 'Officine'])} ${G.person().last}${G.pick([' srl', ' & C.', ' S.p.A.'])}`;
 const code = () => Array.from({length:7}, () => G.pick([...'ABCDEFGHKLMNPRSTUVWXYZ0123456789'])).join('');
 if (lvl() > 1 && Math.random() < .5) {
  const piva = Array.from({length:11}, () => G.int(0, 9)).join(''), n = by(4, 6, 8), other = Array.from({length:11}, () => G.int(0, 9)).join('');
  return {event:[`Fattura da emettere · ${firm}`, 'Manca la partita IVA'], m:mk('boxes', 'CASELLE DALLA FONTE', `Cassa · partita IVA di ${firm}`, {ask:`Completa la <b>partita IVA di ${firm}</b> dalla visura camerale, non da quella della capogruppo.`, field:`Fattura elettronica · P.IVA ${firm}`, prefix:piva.slice(0, -n), answer:piva.slice(-n), sources:[{t:`Visura camerale · ${firm}`, rows:[['Partita IVA', piva, true]]}, {t:'Visura della capogruppo', rows:[['Partita IVA', other, true]]}], winWhy:'Partita IVA giusta: la fattura è valida e il cliente la può scaricare.', loseWhy:'Con la partita IVA sbagliata la fattura va rifatta.'})};
 }
 const now = code(), old = code();
 return {event:[`Fattura da emettere · ${firm}`, 'Manca il codice destinatario'], m:mk('boxes', 'CASELLE DALLA FONTE', `Cassa · fattura ${firm}`, {ask:'Per emettere la fattura elettronica copia il <b>codice destinatario nuovo</b>, una casella per carattere.', field:`Codice destinatario SDI · ${firm}`, answer:now, sources:[{t:`Email di ${firm} · oggi`, rows:[['Nuovo codice destinatario', now, true]]}, {t:'Ultima fattura emessa', rows:[['Codice destinatario', old, true]]}], winWhy:'Codice nuovo, preso dall’email di oggi: la fattura arriva davvero al cliente.', loseWhy:'Con il codice vecchio la fattura sarebbe finita nel vuoto.'})};
}

// ————— Bandi · Spesa ammissibile o no? —————
function bandiMission() {
 const dom = new Date(2026, 9, G.int(1, 20)), n = by(3, 4, 5);
 const pool = [() => { const d = new Date(dom); d.setDate(d.getDate() + G.int(3, 30)); return [`Abbattitore nuovo · ordinato il ${d.toLocaleDateString('it-IT', {day:'numeric', month:'long'})}`, 'yes']; }, () => { const d = new Date(dom); d.setDate(d.getDate() - G.int(3, 30)); return [`Forno combinato · comprato il ${d.toLocaleDateString('it-IT', {day:'numeric', month:'long'})}`, 'no']; }, () => ['Tavoli e sedie per la sala', 'no'], () => ['Cappa aspirante nuova, dopo la domanda', 'yes'], () => ['Lavastoviglie usata da un altro locale', 'no'], () => ['Software di gestione del magazzino, dopo la domanda', 'yes']];
 const items = G.shuffle(pool).slice(0, n).map(f => { const [text, ans] = f(); return {text, ans}; });
 return {event:['Bando attrezzature (esempio)', 'Otto chiede quali spese inserire'], m:mk('classify', 'AMMISSIBILE?', 'Bandi · le spese da inserire', {ask:`Bando per le attrezzature di cucina, domanda presentata il <b>${dom.toLocaleDateString('it-IT', {day:'numeric', month:'long'})}</b>. Quali spese sono ammissibili?`, sources:[{t:'Bando (esempio)', rows:[['Ammesse', 'attrezzature e software nuovi, acquistati dopo la domanda'], ['Escluse', 'arredi, beni usati, acquisti precedenti alla domanda']]}], states:[['yes', 'Ammissibile'], ['no', 'Esclusa']], items, winWhy:'Domanda pulita: solo spese ammissibili, nessun rischio di vedersi negare il contributo.'})};
}

// ————— Staff & HACCP · Conforme o no? —————
function staffMission() {
 const n = by(3, 4, 5), pool = [() => { const t = G.pick([2, 3, 4, 6, 7]); return [`Frigo 1 · ${t} °C`, t <= 4 ? 'ok' : 'ko']; }, () => { const t = G.pick([-22, -19, -18, -15, -12]); return [`Congelatore · ${t} °C`, t <= -18 ? 'ok' : 'ko']; }, () => { const t = G.pick([1, 3, 5, 8]); return [`Abbattitore · al cuore ${t} °C dopo 90 minuti`, t <= 3 ? 'ok' : 'ko']; }, () => { const t = G.pick([60, 65, 70, 55]); return [`Lavastoviglie · risciacquo a ${t} °C`, t >= 65 ? 'ok' : 'ko']; }, () => { const d = G.pick([['etichetta con data', 'ok'], ['senza etichetta', 'ko']]); return [`Ragù preparato ieri · ${d[0]}`, d[1]]; }];
 const items = G.shuffle(pool).slice(0, n).map(f => { const [text, ans] = f(); return {text, sub:`registrato da ${G.pick(['Karim', 'Davide', 'Sofia', 'Elena'])}`, ans}; });
 return {event:['Checklist HACCP', `${n} controlli da validare`], m:mk('classify', 'CONFORME?', 'Staff & HACCP · controlli di oggi', {ask:'Valida la checklist HACCP: <b>ogni controllo è conforme o no?</b>', sources:[{t:'Procedura HACCP', rows:[['Frigo', 'massimo 4 °C'], ['Congelatore', '−18 °C o meno'], ['Abbattitore', 'al cuore 3 °C entro 90 minuti'], ['Lavastoviglie', 'risciacquo almeno 65 °C'], ['Preparazioni', 'sempre etichettate con data']]}], states:[['ok', 'Conforme'], ['ko', 'Non conforme']], items, winWhy:'Checklist vera: le non conformità sono registrate con l’azione correttiva, ed è questo che protegge il locale in un controllo.'})};
}

// ————— Brand & app · Gli allergeni del piatto del giorno —————
const allergenList = ['Glutine', 'Crostacei', 'Uova', 'Pesce', 'Arachidi', 'Soia', 'Latte', 'Frutta a guscio', 'Sedano', 'Senape', 'Sesamo', 'Solfiti'];
function appMission() {
 const dish = G.pick([['Trofie al pesto', 'trofie (farina di grano), basilico, pinoli, parmigiano, aglio', ['Glutine', 'Frutta a guscio', 'Latte']], ['Gamberi in tempura', 'gamberi, farina di grano, acqua frizzante, salsa di soia', ['Crostacei', 'Glutine', 'Soia']], ['Panna cotta alle nocciole', 'panna, zucchero, gelatina, granella di nocciole', ['Latte', 'Frutta a guscio']], ['Tartare di tonno', 'tonno, semi di sesamo, senape, olio', ['Pesce', 'Sesamo', 'Senape']], ['Risotto al vino rosso', 'riso, burro, Chianti, sedano, cipolla', ['Latte', 'Solfiti', 'Sedano']]]);
 const decoys = G.shuffle(allergenList.filter(a => !dish[2].includes(a))).slice(0, by(3, 5, 7));
 return {event:['Piatto del giorno', `${dish[0]}: allergeni da pubblicare`], m:mk('multi', 'GLI ALLERGENI GIUSTI', `Brand & app · ${dish[0]}`, {ask:`Lo chef ha scritto il piatto del giorno: <b>${dish[0]}</b>. Seleziona <b>tutti</b> gli allergeni da mostrare sul menu QR, e nessuno di più.`, sources:[{t:'Ricetta dello chef', rows:[['Ingredienti', dish[1]]]}], chips:G.shuffle([...dish[2].map(t => ({t, ok:true})), ...decoys.map(t => ({t}))]), confirm:'Pubblica sul QR', winWhy:'Allergeni completi e giusti: chi è allergico lo vede prima di ordinare, come chiede la legge.', partWhy:'Un allergene mancante è il rischio più grave per un locale.'})};
}

// ————— regista —————
const pages = {sala:salaMission, kds:kdsMission, menu_pos:menuMission, centralino_ai:centralinoMission, recensioni_ai:recensioniMission, whatsapp:whatsappMission, fidelity_nfc:fidelityMission, magazzino:magazzinoMission, fatture:fattureMission, bandi:bandiMission, staff:staffMission, app_builder:appMission};
const rotation = ['kds', 'sala', 'centralino_ai', 'magazzino', 'menu_pos', 'whatsapp', 'fatture', 'recensioni_ai', 'staff', 'app_builder', 'fidelity_nfc', 'bandi'];
const icons = {sala:'coins', kds:'chef', menu_pos:'menu', centralino_ai:'phone', recensioni_ai:'star', whatsapp:'message', fidelity_nfc:'card', magazzino:'box', fatture:'receipt', bandi:'radar', staff:'users', app_builder:'palette'};
let open = [];
function spawn() {
 if (!running) return;
 if (document.body.classList.contains('touring') || document.hidden) return schedule(3);
 const max = lvl() === 1 ? 2 : 3, nOpen = open.filter(x => x.open).length;
 if (nOpen < max) {
  const busy = new Set(open.filter(x => x.open).map(x => x.page));
  const order = rotation.slice(turn % rotation.length).concat(rotation.slice(0, turn % rotation.length));
  const page = order.find(p => !busy.has(p)) || order[0]; turn = rotation.indexOf(page) + 1;
  const made = pages[page](), ttl = Math.round(made.m.ttl * by(1, .85, .7)), rec = {open:true, page};
  addMission({...made.m, ttl, page, onDone:() => { rec.open = false; schedule(G.int(8, 16)); }});
  open.push(rec);
  D.notify({type:'mission', title:made.event[0], text:made.event[1], icon:icons[page], go:page}, `${made.event[0]}: ${made.event[1].toLowerCase()}`, made.log || 'sala');
 }
 schedule(nOpen + 1 < max ? G.int(25, 40) : G.int(15, 25));
}
function schedule(s) { clearTimeout(timer); timer = setTimeout(spawn, s * 1000); }
export function startMissions() { running = true; D.service.game = true; turn = 0; open = []; schedule(3); }
export function stopMissions() { running = false; D.service.game = false; clearTimeout(timer); }
// Per i test: i generatori di ogni modulo, con un livello forzato.
export const generators = Object.fromEntries(Object.entries(pages).map(([k, f]) => [k, () => f().m]));
export const setTestLevel = l => { testLevel = l; };
