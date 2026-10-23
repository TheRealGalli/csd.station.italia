// Missioni di CS Restaurant OS: un minigioco per ogni modulo, con più scenari e valori sempre nuovi (gen.js).
// Le meccaniche sono in mg.js; qui ci sono i contenuti del locale. La difficoltà cresce con il livello
// (gameLevel): al livello 1 poche voci e conti semplici, poi più voci, percentuali e calcoli composti.
//
//  Sala             · Il conto torna (calcolatrice: QR già pagato, alla romana, sconti, coperto)
//  Cucina           · Smista la comanda (ogni piatto alla partita giusta)
//  Menu digitale QR · Cosa resta sul QR? (disponibile, ultime porzioni, esaurito)
//  Centralino AI    · Al telefono
//  Recensioni AI    · La risposta giusta
//  WhatsApp         · Correggi la bozza · (dal capitolo 2) Il pubblico giusto / Quando la mandi
//  Delivery         · (dal capitolo 2) Quanto resta al locale, Viaggia bene?, Cucina piena, Il cliente al telefono
//  Fidelity & NFC   · Premio sì o no? · Il premio giusto · Il conto con la card · A chi la mandi?
//  Magazzino        · Trova la differenza (fattura contro bolla firmata)
//  Cassa & Entrate  · Caselle dalla fonte (codice destinatario, partita IVA) · I conti tornano? · Il cassetto torna?
//  Bandi            · Spesa ammissibile o no? · Quanto vale il contributo?
//  Staff & HACCP    · Conforme o no?
//  Brand & app      · Gli allergeni del piatto del giorno · La notifica giusta · Le prenotazioni dell’app · La scheda dello store
//
// Le missioni dopo la prima di ogni settore non arrivano sempre: vedi `extras` più sotto.
import * as G from './gen.js';
import {mechanics as M} from './mg.js';
import {addMission, gameLevel, canSpawnMission, missionRush, storyBias, rnd, gameState} from './game.js';
import * as D from './demo.js';

let testLevel = 0;
const lvl = () => testLevel || gameLevel();
const by = (l1, l2, l3) => [l1, l2, l3][lvl() - 1];
const days = ['lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
const mk = (kind, label, title, data, ttl = 240000) => ({kind, label, title, ttl, data, render:M[kind].render, handle:M[kind].handle, hint:M[kind].hint});
const euro2 = n => `€ ${n.toFixed(2).replace('.', ',')}`;
let timer = 0, running = false, turn = 0;

// ————— Sala · Il conto torna —————
function salaMission(tb) {
 // se c'è un tavolo vero che può chiedere il conto, il conto è il suo
 const t = tb ? +tb.id.slice(1) : G.int(1, 12), people = tb ? Math.max(2, tb.guests) : G.int(2, 6), real = tb ? D.tableTotal(tb) : 0;
 const total = real >= 30 ? real : people * G.int(22, 41), paid = G.int(1, people - 1) * G.int(Math.min(14, Math.floor(total / people / 2)), Math.max(15, Math.floor(total / people)));
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

// ————— WhatsApp & campagne · Il pubblico giusto / Quando la mandi (pick) —————
function waCampaignMission() {
 const occ = G.pick([
  ['Serata tartufo', 'chi negli ordini e su WhatsApp ha chiesto piatti al tartufo o ai funghi', 'Chi ha dato il consenso e ama tartufo e funghi'],
  ['Aperitivo del venerdì', 'chi viene a bere un calice dopo il lavoro', 'Chi ha dato il consenso e prenota spesso tra le 18 e le 20'],
  ['Musica dal vivo', 'chi ha chiesto delle serate con musica', 'Chi ha dato il consenso e ha chiesto della musica dal vivo']
 ]), n = G.int(40, 90);
 if (Math.random() < .5) {
  const cards = [{title:occ[2], meta:`${n} ospiti`, body:'Il gruppo che Otto ha trovato nelle conversazioni e negli ordini, solo con il sì ai messaggi.', ok:true},
   {title:'Tutta la rubrica del telefono', meta:`${n * 6} numeri`, why:'Chi non ha dato il consenso non può ricevere promozioni: è una violazione della privacy, e i contatti bloccano il numero.'},
   {title:'Gli ospiti di ieri sera', meta:`${G.int(25, 40)} ospiti`, why:'Sono appena stati da voi e non hanno detto nulla su questa occasione: il messaggio arriva alla persona sbagliata nel momento sbagliato.'},
   {title:'Tutti gli iscritti alla card', meta:'412 iscritti', why:'Tra gli iscritti c’è anche chi non ha dato il consenso WhatsApp, e chi non è interessato: più messaggi, meno prenotazioni.'}];
  return {event:['WhatsApp & campagne', `${occ[0]}: a chi la mandi?`], brief:{what:`Otto ha scritto la campagna “${occ[0]}”. Scegli il pubblico: ${occ[1]}, e solo chi ha detto sì ai messaggi.`, why:'Una campagna mandata a tutti costa di più, porta meno tavoli e, senza consenso, è vietata. Il pubblico giusto è metà del lavoro.'},
   m:mk('pick', 'IL PUBBLICO GIUSTO', `WhatsApp & campagne · ${occ[0]}`, {ask:`Campagna <b>“${occ[0]}”</b>. A chi la mandi?`, sources:[{t:'Regole delle campagne', rows:[['Consenso', 'solo chi ha detto sì ai messaggi WhatsApp'], ['Pubblico', occ[1]]]}], cards:G.shuffle([cards[0], ...G.shuffle(cards.slice(1)).slice(0, by(2, 3, 3))]), winWhy:'Messaggio a chi lo aspetta: più letture, più risposte SÌ, nessun reclamo per la privacy.'})};
 }
 const good = {['Serata tartufo']:['Martedì alle 11:00', 'una settimana prima: c’è il tempo di organizzarsi e prenotare'], ['Aperitivo del venerdì']:['Venerdì alle 17:00', 'poco prima dell’uscita dal lavoro, quando si decide dove andare'], ['Musica dal vivo']:['Mercoledì alle 18:00', 'tre giorni prima della serata, a fine giornata']}[occ[0]];
 const cards = [{title:good[0], body:good[1], ok:true},
  {title:'Adesso, alle 23:40', body:'Subito, appena scritta', why:'Di notte un messaggio promozionale disturba: si legge male e spesso si blocca il numero.'},
  {title:'Domenica alle 8:00', body:'Prima di colazione', why:'Una promozione la domenica mattina presto disturba: è il momento in cui si blocca il numero.'},
  {title:'Il giorno stesso, alle 21:00', body:'A serata già iniziata', why:'Arriva troppo tardi: chi voleva venire ha già deciso dove andare.'}];
 return {event:['WhatsApp & campagne', `${occ[0]}: quando la mandi?`], brief:{what:`La campagna “${occ[0]}” è pronta e il pubblico è scelto. Ora decidi quando parte.`, why:'Lo stesso messaggio, all’ora sbagliata, disturba e fa bloccare il numero; all’ora giusta diventa un tavolo prenotato.'},
  m:mk('pick', 'QUANDO LA MANDI?', `WhatsApp & campagne · ${occ[0]}`, {ask:`Campagna <b>“${occ[0]}”</b> per ${n} ospiti con il consenso. Quando la programmi?`, sources:[{t:'Buone regole di Otto', rows:[['Orari', 'mai di notte né la mattina presto'], ['Anticipo', 'abbastanza per decidere, non così tanto da dimenticarsene']]}], cards:G.shuffle([cards[0], ...G.shuffle(cards.slice(1)).slice(0, by(2, 3, 3))]), winWhy:'All’ora giusta il messaggio si legge con calma: le risposte SÌ diventano prenotazioni.'})};
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
 const items = G.shuffle(pool).slice(0, n).map(f => { const [text, ans] = f(); return {text, sub:`registrato da ${G.pick(['Andrea', 'Davide', 'Sofia', 'Elena'])}`, ans}; });
 return {event:['Checklist HACCP', `${n} controlli da validare`], m:mk('classify', 'CONFORME?', 'Staff & HACCP · controlli di oggi', {ask:'Valida la checklist HACCP: <b>ogni controllo è conforme o no?</b>', sources:[{t:'Procedura HACCP', rows:[['Frigo', 'massimo 4 °C'], ['Congelatore', '−18 °C o meno'], ['Abbattitore', 'al cuore 3 °C entro 90 minuti'], ['Lavastoviglie', 'risciacquo almeno 65 °C'], ['Preparazioni', 'sempre etichettate con data']]}], states:[['ok', 'Conforme'], ['ko', 'Non conforme']], items, winWhy:'Checklist vera: le non conformità sono registrate con l’azione correttiva, ed è questo che protegge il locale in un controllo.'})};
}

// ————— Brand & app · Gli allergeni del piatto del giorno —————
const allergenList = ['Glutine', 'Crostacei', 'Uova', 'Pesce', 'Arachidi', 'Soia', 'Latte', 'Frutta a guscio', 'Sedano', 'Senape', 'Sesamo', 'Solfiti'];
function appMission() {
 const dish = G.pick([['Trofie al pesto', 'trofie (farina di grano), basilico, pinoli, parmigiano, aglio', ['Glutine', 'Frutta a guscio', 'Latte']], ['Gamberi in tempura', 'gamberi, farina di grano, acqua frizzante, salsa di soia', ['Crostacei', 'Glutine', 'Soia']], ['Panna cotta alle nocciole', 'panna, zucchero, gelatina, granella di nocciole', ['Latte', 'Frutta a guscio']], ['Tartare di tonno', 'tonno, semi di sesamo, senape, olio', ['Pesce', 'Sesamo', 'Senape']], ['Risotto al vino rosso', 'riso, burro, Chianti, sedano, cipolla', ['Latte', 'Solfiti', 'Sedano']]]);
 const decoys = G.shuffle(allergenList.filter(a => !dish[2].includes(a))).slice(0, by(3, 5, 7));
 return {event:['Piatto del giorno', `${dish[0]}: allergeni da pubblicare`], m:mk('multi', 'GLI ALLERGENI GIUSTI', `Brand & app · ${dish[0]}`, {ask:`Lo chef ha scritto il piatto del giorno: <b>${dish[0]}</b>. Seleziona <b>tutti</b> gli allergeni da mostrare sull’app e sul menu QR, e nessuno di più.`, sources:[{t:'Ricetta dello chef', rows:[['Ingredienti', dish[1]]]}], chips:G.shuffle([...dish[2].map(t => ({t, ok:true})), ...decoys.map(t => ({t}))]), confirm:'Pubblica sull’app', winWhy:'Allergeni completi e giusti: chi è allergico lo vede prima di ordinare, come chiede la legge.', partWhy:'Un allergene mancante è il rischio più grave per un locale.'})};
}



// ————— Magazzino · Ricevimento merce (caccia agli errori) —————
// La merce refrigerata si controlla alla consegna, prima che entri in cella: temperatura, imballo, etichetta, lotto, scadenza.
function ricevimentoMission() {
 const sup = G.pick([['Caseificio Mugello', 'Burrata', 'latticini'], ['Macelleria Bartolini', 'Manzo da tagliata', 'carni'], ['Ittica Tirrena', 'Gamberi freschi', 'pesce']]);
 const pool = [
  ['Mezzo di trasporto', 'Furgone refrigerato, registro temperature a bordo', 'Furgone non refrigerato', 'La merce refrigerata viaggia solo in mezzi refrigerati.'],
  ['Temperatura all’arrivo', `${G.pick(['2,4', '3,1', '3,6'])} °C (sonda al cuore)`, `${G.pick(['7,8', '8,6', '9,2'])} °C (sonda al cuore)`, 'Sopra i 4 °C la merce refrigerata si respinge.'],
  ['Imballo', 'Integro, sigillato', 'Pellicola aperta su un lato', 'Imballo danneggiato: rischio di contaminazione.'],
  ['Etichetta', 'In italiano, con produttore e allergeni', 'Assente sul collo n. 2', 'Senza etichetta non si sa cosa c’è dentro né gli allergeni.'],
  ['Lotto', `L${G.int(2600, 2699)}-${G.pick([...'ABCD'])}`, 'Non indicato', 'Senza lotto la merce non è rintracciabile in caso di richiamo.'],
  ['Scadenza', `${G.int(10, 28)}/11/2026`, `${new Date().getDate()}/${new Date().getMonth() + 1}/2026 (oggi)`, 'Scade oggi: non può entrare in magazzino.'],
  ['Documento di trasporto', 'Presente, quantità coincidenti', 'Presente, quantità coincidenti', '']
 ];
 const nBad = by(2, 2, 3), bad = G.shuffle([0, 1, 2, 3, 4, 5]).slice(0, nBad);
 // tutti i problemi estratti, più qualche riga in regola (il documento di trasporto c'è sempre)
 const fin = [...pool.filter((r, i) => bad.includes(i)).map(r => [r[0], r[2], r[3]]), ...G.shuffle(pool.filter((r, i) => !bad.includes(i) && i < 6)).slice(0, by(2, 3, 3)).map(r => [r[0], r[1], '']), [pool[6][0], pool[6][1], '']];
 return {event:[`Consegna · ${sup[0]}`, `${sup[1]}: controlla la merce prima della cella`], log:'magazzino', brief:{what:'Arriva un fornitore di freschi: prima che la merce entri in cella, si controllano temperatura, imballo, etichetta, lotto e scadenza. Trova tutti i problemi.', why:'Una volta in cella, la merce non conforme è tua: se qualcuno sta male, la responsabilità è del locale.'},
  m:mk('hunt', 'RICEVIMENTO MERCE', `Magazzino · consegna ${sup[0]}`, {ask:`È arrivata la consegna di <b>${sup[1].toLowerCase()}</b> (${sup[2]}). Tocca <b>tutte le righe che non vanno</b>: sono ${nBad}.`, docTitle:`Scheda di ricevimento · ${sup[0]}`, rows:G.shuffle(fin), sources:[{t:'Procedura HACCP di ricevimento', rows:[['Refrigerati', 'arrivo a 4 °C o meno, mezzo refrigerato'], ['Imballo ed etichetta', 'integri, in italiano, con lotto'], ['Scadenza', 'non oggi né già passata']]}], winWhy:'Merce non conforme respinta e registrata: il fornitore la sostituisce, e la cella resta sicura.'}, 180000)};
}

// ————— Staff & HACCP · In fila (procedure) —————
function proceduraMission() {
 const procs = [
  {name:'Sanificazione del piano di lavoro', steps:[['Togli i residui grossolani', 'con spatola e carta'], ['Lava con acqua calda e detergente'], ['Risciacqua bene'], ['Applica il disinfettante', 'e lascialo agire il tempo indicato'], ['Risciacqua di nuovo'], ['Lascia asciugare all’aria', 'niente panni']], why:'Il disinfettante funziona solo su una superficie già pulita: sporco e grasso lo bloccano.'},
  {name:'Dalla cottura alla cella', steps:[['Cuoci il ragù', 'fino a 75 °C al cuore'], ['Mettilo nell’abbattitore', 'entro 30 minuti dalla cottura'], ['Abbatti fino a 3 °C al cuore', 'entro 90 minuti'], ['Porziona in contenitori chiusi'], ['Etichetta con data e lotto'], ['Riponi in cella', 'tra 0 e 4 °C']], why:'Tra 10 e 60 °C i batteri si moltiplicano: l’abbattitore serve a passare in fretta quella fascia.'},
  {name:'Una porta di cella rimasta aperta', steps:[['Chiudi la porta della cella'], ['Leggi la temperatura sulla sonda'], ['Controlla da quanto è fuori norma', 'dal registro della sonda'], ['Decidi cosa tenere e cosa buttare', 'secondo la procedura'], ['Registra la non conformità', 'e l’azione correttiva']], why:'Prima si ferma il danno, poi si misura, poi si decide: e tutto finisce nel registro HACCP.'}
 ];
 const p = G.pick(procs), n = by(4, 5, 6), steps = (p.steps.length <= n ? p.steps : p.steps.slice(0, n)).map(([t, sub]) => ({t, sub}));
 return {event:['Procedura HACCP', `${p.name}: in che ordine?`], brief:{what:'Le procedure HACCP sono sequenze: metti i passaggi nell’ordine giusto, dal primo all’ultimo.', why:'Un passaggio fatto nell’ordine sbagliato annulla quelli dopo: il disinfettante sullo sporco non disinfetta.'},
  m:mk('order', 'IN FILA', `Staff & HACCP · ${p.name}`, {ask:`Il nuovo aiuto cuoco chiede: “<b>${p.name.toLowerCase()}</b>, come si fa?” Tocca i passaggi <b>dal primo all’ultimo</b>.`, steps, winWhy:p.why, sources:[{t:'Manuale HACCP del locale', rows:[['Regola', 'ogni procedura si registra con data, ora e chi l’ha fatta']]}]}, 180000)};
}

// ————— Fidelity · Il premio giusto (pick) —————
// L'ospite appoggia la card e chiede cosa può prendere: il premio più alto che il saldo copre, compatibile con le sue allergie.
function nfcPickMission() {
 const who = G.person(), pts = G.int(320, 1650), allergy = G.pick(['', '', 'celiaca', 'astemio']);
 const conflict = r => (allergy === 'celiaca' && r.id === 'dessert') || (allergy === 'astemio' && r.id === 'chianti');
 const ok = [...D.rewards].reverse().find(r => pts >= r.cost && !conflict(r)), above = D.rewards.find(r => r.cost > pts), clash = D.rewards.find(r => pts >= r.cost && conflict(r)), lower = D.rewards.filter(r => r.cost < ok.cost && !conflict(r))[0];
 const cards = [{title:ok.name, meta:`${ok.cost} punti`, body:`Il premio più alto che il saldo copre${allergy ? ', compatibile con quello che può prendere' : ''}.`, ok:true}];
 if (above) cards.push({title:above.name, meta:`${above.cost} punti`, body:'Il premio più ambito.', why:`Costa ${above.cost} punti: con ${pts} ne mancano ${above.cost - pts}.`});
 if (clash) cards.push({title:clash.name, meta:`${clash.cost} punti`, body:'Il saldo basta.', why:allergy === 'celiaca' ? 'Il dessert della casa è il tiramisù, con il glutine dei savoiardi: a un ospite celiaco non si propone.' : 'L’ospite non beve alcolici: una bottiglia di vino non è un premio per lui.'});
 if (cards.length < 3 && lower) cards.push({title:lower.name, meta:`${lower.cost} punti`, body:'Il premio più semplice.', why:`Spetta di più: con ${pts} punti arriva a “${ok.name}”.`});
 if (cards.length < 2) return fidelityMission();
 return {event:[`Card NFC · ${who.name}`, 'Chiede quale premio può avere'], brief:{what:'Un ospite appoggia la card e chiede cosa può avere con i suoi punti. Scegli il premio più alto che il saldo copre, tenendo conto di allergie e abitudini segnate sulla card.', why:'Proporre il premio giusto è il momento in cui la fidelity si vede: un premio che non spetta o che l’ospite non può mangiare rovina la serata.'},
  m:mk('pick', 'IL PREMIO GIUSTO', `Fidelity · ${who.name}`, {ask:`<b>${who.name}</b> appoggia la card al tavolo: “Cosa posso prendere con i miei punti?” Quale premio proponi?`, sources:[{t:`Card di ${who.name}`, rows:[['Saldo', `${pts} punti`], ['Note', allergy === 'celiaca' ? 'Celiaca' : allergy === 'astemio' ? 'Non beve alcolici' : 'Nessuna allergia segnalata']]}, {t:'Premi della card', rows:D.rewards.map(r => [r.name, `${r.cost} punti`])}, {t:'Dessert della casa', rows:[['Tiramisù', 'uova, latte, glutine (savoiardi)']]}], cards:G.shuffle(cards), winWhy:'Il premio più alto che spetta, e che l’ospite può davvero godersi: Otto lo scala dal saldo e lo segna sul conto.'})};
}

// ————— Fidelity · Il conto con la card (calc) —————
function nfcBillMission() {
 const who = G.person(), t = G.int(1, 12), food = G.int(18, 52) * 2, wine = G.pick([0, 28, 28, 56]), tier = G.pick([['Argento', 5], ['Oro', 10]]), dessert = lvl() >= 3 && Math.random() < .6;
 const base = food - (dessert ? 7 : 0), off = +(base * tier[1] / 100).toFixed(2), answer = +(base - off + wine).toFixed(2);
 return {event:[`Tavolo ${t}: card ${tier[0]}`, `${who.name} paga con la card`], brief:{what:'Un ospite iscritto paga il conto: si applica lo sconto del suo livello, ma solo sulla cucina (i vini sono esclusi), e prima si toglie il premio già offerto.', why:'Lo sconto sbagliato è un documento commerciale sbagliato: o regali soldi o fai pagare troppo un cliente fedele.'},
  m:mk('calc', 'IL CONTO CON LA CARD', `Fidelity · conto del tavolo ${t}`, {unit:'€', ask:`${who.name} è di livello <b>${tier[0]}</b>. Quanto paga il <b>tavolo ${t}</b>?`, answer, sources:[{t:`Conto tavolo ${t}`, rows:[['Cucina', G.euro(food)], ...(wine ? [['Vini', G.euro(wine)]] : []), ...(dessert ? [['Tiramisù offerto con i punti', '− € 7,00']] : [])]}, {t:'Regole della card', rows:[['Sconto Argento', '5% sulla cucina'], ['Sconto Oro', '10% sulla cucina'], ['Esclusi', 'vini e premi già offerti']]}], hint:`Sconto del ${tier[1]}% solo sulla cucina${dessert ? ' (dopo aver tolto il dessert offerto)' : ''}, poi si aggiungono i vini.`, winWhy:'Sconto giusto, sul pezzo giusto del conto: il documento commerciale torna e l’ospite vede il suo vantaggio.'})};
}

// ————— Fidelity · La campagna agli iscritti (multi) —————
function campaignMission() {
 const pool = Array.from({length:by(5, 6, 7)}, () => { const p = G.person(), days = G.pick([12, 25, 40, 64, 75, 92, 120]), wa = Math.random() < .7; return {p, days, wa}; });
 if (!pool.some(x => x.days > 60 && x.wa)) Object.assign(pool[0], {days:75, wa:true});
 if (!pool.some(x => x.days > 60 && !x.wa)) Object.assign(pool[1], {days:92, wa:false});
 return {event:['Campagna WhatsApp', 'Otto chiede a chi mandarla'], brief:{what:'Otto ha preparato un messaggio per gli iscritti che non vengono da più di 60 giorni. Scegli i destinatari: solo chi è nel gruppo e ha dato il consenso.', why:'Un WhatsApp a chi non ha dato il consenso è una violazione della privacy, e chi viene ogni settimana non ha bisogno di essere “riconquistato”.'},
  m:mk('multi', 'A CHI LA MANDI?', 'Fidelity · campagna “Ci manchi”', {ask:'Campagna <b>“Ci manchi”</b>: caffè e amaro offerti a chi non viene da <b>più di 60 giorni</b>. Seleziona i destinatari giusti.', sources:[{t:'Regole della campagna', rows:[['Gruppo', 'ultima visita oltre 60 giorni fa'], ['Consenso', 'solo chi ha detto sì ai messaggi WhatsApp']]}], chips:G.shuffle(pool.map(x => ({t:`${x.p.name} · ultima visita ${x.days} giorni fa · consenso ${x.wa ? 'sì' : 'no'}`, ok:x.days > 60 && x.wa}))), confirm:'Invia la campagna', winWhy:'Messaggio solo a chi serve e a chi lo ha chiesto: più letture, nessun reclamo per la privacy.', partWhy:'Contano due condizioni insieme: oltre 60 giorni e consenso sì.'})};
}

// ————— Brand & app · La notifica push (proof) —————
function pushMission() {
 const ev = G.pick([['Serata vini toscani', 'giovedì', '35'], ['Cena del tartufo', 'venerdì', '65'], ['Brunch della domenica', 'domenica', '28']]);
 const kind = G.pick(['giorno', 'prezzo', 'ora']), hour = ev[1] === 'domenica' ? '12:30' : '20:00';
 const wrong = {giorno:G.pick(['mercoledì', 'sabato'].filter(d => d !== ev[1])), prezzo:String(+ev[2] + G.pick([5, 10])), ora:ev[1] === 'domenica' ? '13:30' : '21:00'}[kind];
 const right = {giorno:ev[1], prezzo:ev[2], ora:hour}[kind], decoy = {giorno:'lunedì', prezzo:String(+ev[2] - 5), ora:'19:00'}[kind];
 const seg = (txt, key) => key === kind ? {t:wrong, err:true, ok:right, choices:G.shuffle([right, wrong, decoy])} : {t:txt};
 const parts = [{t:`${ev[0]}: `}, seg(ev[1], 'giorno'), {t:' alle '}, seg(hour, 'ora'), {t:', '}, seg(ev[2], 'prezzo'), {t:' € a persona. Posti limitati: prenota dall’app.'}];
 return {event:['Notifica push da approvare', `${ev[0]}: controlla prima dell’invio`], brief:{what:'Otto ha scritto la notifica push dell’app per un evento. Prima che parta a più di mille telefoni, confrontala con il calendario degli eventi e correggi il dato sbagliato.', why:'Una notifica non si ritira: se dice il giorno o il prezzo sbagliato, arrivano prenotazioni sbagliate e ospiti scontenti.'},
  m:mk('proof', 'LA NOTIFICA GIUSTA', `Brand & app · notifica “${ev[0]}”`, {ask:`La notifica parte a <b>1.102 iscritti</b>: c’è un dato che <b>non coincide con il calendario</b>.`, draftLabel:'Notifica proposta da Otto', parts, sources:[{t:'Calendario eventi dell’app', rows:[[ev[0], `${ev[1]} alle ${hour}`], ['Prezzo', `${ev[2]} € a persona`]]}], winWhy:'Notifica corretta prima dell’invio: chi la apre trova le stesse informazioni dell’evento nell’app.', winLabel:'Notifica perfetta'}, 150000)};
}

// ————— Brand & app · Le prenotazioni dall'app (classify) —————
function bookingMission() {
 const b = D.appCfg.booking, n = by(4, 5, 6);
 const pool = [() => [`Sabato 21:30 · ${G.int(2, 4)} persone`, 'ok'], () => [`Venerdì 20:00 · ${G.int(b.deposit, b.maxOnline)} persone`, 'dep'], () => [`Sabato 22:45 · 2 persone`, 'no'], () => [`Domenica 13:00 · ${G.int(b.maxOnline + 1, 14)} persone`, 'no'], () => [`Giovedì 19:30 · ${G.int(2, b.deposit - 1)} persone`, 'ok'], () => [`Martedì 21:00 · ${b.deposit} persone`, 'dep'], () => [`Lunedì 20:30 · 2 persone`, 'no']];
 const items = G.shuffle(pool).slice(0, n).map(f => { const [text, ans] = f(); return {text, sub:`dall’app · ${G.person().name}`, ans}; });
 return {event:['Prenotazioni dall’app', `${n} richieste da confermare`], brief:{what:'Dall’app arrivano richieste di prenotazione. Per ognuna decidi: si conferma, si chiede la caparra oppure non si può prendere online, secondo le regole dell’app.', why:'Le regole dell’app proteggono la sala: niente gruppi grandi senza parlarne, niente tavoli dopo l’ultimo orario, caparra dove il tavolo vuoto costa caro.'},
  m:mk('classify', 'LE PRENOTAZIONI DELL’APP', 'Brand & app · richieste di prenotazione', {ask:'Applica le <b>regole delle prenotazioni online</b> a ogni richiesta.', sources:[{t:'Regole dell’app', rows:[['Online fino a', `${b.maxOnline} persone`], ['Ultimo orario', b.last], ['Caparra', `da ${b.deposit} persone, ${b.depositAmount} € a testa`], ['Lunedì', 'chiuso']]}], states:[['ok', 'Conferma'], ['dep', 'Chiedi caparra'], ['no', 'Non online']], items, winWhy:'Richieste gestite con le regole giuste: la sala sa chi arriva, e i gruppi grandi parlano con una persona.'})};
}

// ————— Brand & app · La scheda dello store (hunt) —————
function storeMission() {
 const pool = [
  ['Nome dell’app', 'Osteria del Borgo', ''],
  ['Telefono', '055 234 8890', ''],
  ['Orari', 'Lunedì 19:30–23:00', 'Il lunedì il locale è chiuso: l’app direbbe il contrario.'],
  ['Foto della galleria', 'Risotto al tartufo nero', 'Il piatto non è più in menu da settembre: si mostra solo ciò che si può ordinare.'],
  ['Descrizione', '“Il miglior ristorante di Firenze”', 'Un vanto che non si può dimostrare: lo store la può rifiutare ed è pubblicità ingannevole.'],
  ['Informativa privacy', 'Link mancante', 'Senza informativa privacy un’app che raccoglie prenotazioni non può essere pubblicata.'],
  ['Categoria', 'Cibo e bevande', ''],
  ['Età minima', '4+, con vendita di vino nel delivery', 'Con la vendita di alcolici serve la verifica dell’età: la classificazione va alzata.'],
  ['Novità della versione', 'Ordina a domicilio senza commissioni', '']
 ];
 const bad = G.shuffle(pool.filter(r => r[2])).slice(0, by(2, 3, 3)), good = G.shuffle(pool.filter(r => !r[2])).slice(0, by(2, 3, 3));
 return {event:['Versione 2.5 dell’app', 'Scheda dello store da controllare'], brief:{what:'Prima di mandare la nuova versione dell’app in revisione su App Store e Google Play, si controlla la scheda: orari, foto, descrizione, privacy, età. Trova tutto quello che non va.', why:'Una scheda sbagliata fa rifiutare l’app dallo store, oppure promette agli ospiti cose che il locale non fa.'},
  m:mk('hunt', 'LA SCHEDA DELLO STORE', 'Brand & app · scheda della versione 2.5', {ask:`Tocca <b>tutte le righe che non vanno</b>: sono ${bad.length}.`, docTitle:'Scheda App Store e Google Play · v2.5', rows:G.shuffle([...bad, ...good]), sources:[{t:'Il locale', rows:[['Orari', 'chiuso il lunedì'], ['Menu', 'senza risotto al tartufo da settembre'], ['Delivery', 'anche vino, solo maggiorenni']]}], winWhy:'Scheda pulita: l’app passa la revisione e dice agli ospiti solo cose vere.'}, 180000)};
}

// ————— Delivery · Quanto resta al locale (calc) —————
function commissionMission() {
 const ch = G.pick(D.channels.filter(c => c.fee)), items = G.shuffle(D.deliveryMenu.filter(x => x.on)).slice(0, G.int(2, 3)), total = items.reduce((n, x) => n + x.price, 0);
 const promo = lvl() >= 2 ? G.pick([0, 3, 4]) : 0, vat = lvl() >= 3, fee = +((total - promo) * ch.fee / 100).toFixed(2), answer = +(total - promo - fee - (vat ? fee * .22 : 0)).toFixed(2);
 return {event:[`Ordine ${ch.name}`, 'Quanto resta davvero al locale?'], brief:{what:'Le piattaforme trattengono una commissione su ogni ordine, e a volte una promozione a carico del locale. Calcola quanto arriva davvero in cassa con il bonifico.', why:'Il delivery sembra incasso pieno, ma tra commissioni e promozioni il margine cambia: è da qui che si decidono i prezzi del menu delivery.'},
  m:mk('calc', 'QUANTO RESTA AL LOCALE?', `Delivery · ordine ${ch.name}`, {unit:'€', ask:`Ordine <b>${ch.name}</b>: quanto arriva al locale${vat ? ', con l’IVA sulla commissione' : ''}?`, answer, sources:[{t:`Ordine ${ch.short}-${G.int(4830, 4999)}`, rows:[...items.map(x => [D.dish(x.id).name, G.euro(x.price)]), ...(promo ? [['Promo “consegna −€” a carico del locale', `− ${G.euro(promo)}`]] : [])]}, {t:`Contratto ${ch.name} (esempio)`, rows:[['Commissione', `${ch.fee}% sul totale${promo ? ' dopo la promo' : ''}`], ...(vat ? [['IVA sulla commissione', '22% della commissione']] : []), ['Al locale arriva', `totale${promo ? ' − promo' : ''} − commissione${vat ? ' − IVA sulla commissione' : ''}`]]}], hint:`Totale${promo ? ' meno la promo' : ''}, meno il ${ch.fee}%${vat ? ', meno il 22% della commissione' : ''}.`, winWhy:'Netto giusto: Otto confronta ogni bonifico della piattaforma con gli ordini e trova subito una commissione sbagliata.'})};
}

// ————— Delivery · Viaggia bene? (classify) —————
function dlvMenuMission() {
 const pool = [['Lasagna al forno', 'in teglia chiusa: resta calda', 'ok'], ['Frittura di calamari', 'fritta: in 25 minuti si ammoscia', 'no'], ['Risotto ai porcini', 'mantecato: in 25 minuti si incolla', 'no'], ['Tagliata di manzo', 'carne a fette, salsa a parte: regge', 'ok'], ['Tiramisù', 'in vasetto chiuso: non si muove', 'ok'], ['Soufflé al cioccolato', 'si sgonfia in 5 minuti', 'no'], ['Pici al pomodoro', 'sugo a parte: si condisce a casa', 'ok'], ['Gelato artigianale', 'senza box freddo: si scioglie', 'no'], ['Bruschetta al pomodoro', 'pane già condito: in 25 minuti si inzuppa', 'no'], ['Burrata e pomodorini', 'nel box freddo: arriva com’è', 'ok']];
 const n = by(4, 5, 6), items = G.shuffle(pool).slice(0, n).map(([t, sub, ans]) => ({text:t, sub, ans}));
 return {event:['Menu del delivery', 'Quali piatti mettere sulle piattaforme?'], brief:{what:'Si prepara il menu del delivery: per ogni piatto decidi se viaggia bene nel box per 25 minuti, oppure se resta solo in sala.', why:'Un piatto che arriva molle o freddo porta una recensione negativa sulla piattaforma, e quella pesa più di cento in sala.'},
  m:mk('classify', 'VIAGGIA BENE?', 'Delivery · il menu delle piattaforme', {ask:'Per ogni piatto: <b>sul delivery o solo in sala</b>?', sources:[{t:'Regola dello chef', rows:[['Sul delivery', 'tiene 25 minuti nel box senza cambiare consistenza'], ['Solo in sala', 'fritture, mantecature, piatti che si sgonfiano o si sciolgono']]}], states:[['ok', 'Delivery'], ['no', 'Solo sala']], items, winWhy:'Sulle piattaforme solo piatti che arrivano come escono dalla cucina: meno rimborsi, recensioni migliori.'})};
}

// ————— Delivery · Cucina piena (pick) —————
function dlvPauseMission() {
 const w = G.int(9, 14), chs = D.channels.filter(c => c.fee).map(c => ({...c, q:G.int(2, 6)}));
 const worst = [...chs].sort((a, b) => b.fee - a.fee)[0];
 const cheap = [...chs].sort((a, b) => a.fee - b.fee)[0];
 const cards = [{title:`Pausa a ${worst.name} per 15 minuti`, meta:`commissione ${worst.fee}%`, body:'Il canale che costa di più resta fermo finché la cucina respira.', ok:true}, {title:'Pausa al sito e all’app del locale', meta:'nessuna commissione', why:'È il canale che non paga commissioni e porta i clienti del locale: si chiude per ultimo.'}, {title:'Pausa a tutti i canali per un’ora', meta:'delivery chiuso', why:'Un’ora di chiusura perde tutti gli ordini, anche quelli che la cucina può reggere.'}, {title:`Pausa a ${cheap.name}`, meta:`commissione ${cheap.fee}%`, why:`${cheap.name} è il canale più economico tra le piattaforme: si ferma prima chi costa di più.`}];
 return {event:['Cucina piena', `${w} comande in attesa: cosa fermi?`], brief:{what:'La cucina è piena e il delivery continua a mandare ordini. Scegli quale canale mettere in pausa, e per quanto.', why:'Meglio che l’ospite veda “non disponibile ora” piuttosto che aspetti un’ora: le piattaforme penalizzano i ritardi, e la sala ne soffre.'},
  m:mk('pick', 'COSA METTI IN PAUSA?', 'Delivery · la cucina è piena', {ask:`In cucina aspettano <b>${w} comande</b> e i fornelli sono pieni. Cosa fai con il delivery?`, sources:[{t:'Canali adesso', rows:chs.map(c => [c.name, `${c.q} ordini in arrivo · commissione ${c.fee}%`]).concat([['Sito e app del locale', `${G.int(1, 2)} ordini · nessuna commissione`]])}], cards:G.shuffle([cards[0], ...G.shuffle(cards.slice(1)).slice(0, by(2, 3, 3))]), winWhy:'Si ferma il canale che costa di più, per il tempo che serve: la cucina recupera e i clienti del locale continuano a ordinare.'})};
}

// ————— Delivery · Al telefono con il cliente (phone) —————
function dlvPhoneMission() {
 const who = G.person(), ch = G.pick(D.channels.filter(c => c.fee)), kind = G.pick(['manca', 'freddo']);
 const sources = [{t:`Ordine ${ch.name}`, rows:[['Consegnato', '20:41 · rider Luca'], ['Contenuto', kind === 'manca' ? '2× Carbonara, 1× Tiramisù, 1× acqua' : '1× Tagliata, 1× Pici al pomodoro'], ['Tempo di consegna', kind === 'freddo' ? '48 minuti (stimati 25)' : '22 minuti']]}, {t:'Regola del locale', rows:[['Errore nostro', 'si rimedia subito, senza discutere'], ['Rimborsi', 'dalla piattaforma, con la segnalazione dell’ordine']]}];
 const turns = kind === 'manca' ? [
  {c:`Buonasera, ho ordinato su ${ch.name}: è arrivato tutto tranne il tiramisù.`, o:[{t:'Ha ragione, è rimasto al banco: le segnalo il rimborso del tiramisù sulla piattaforma subito.', ok:true}, {t:'Il rider l’avrà perso, chiami la piattaforma.', why:'Il tiramisù non è mai partito: l’errore è del locale, si rimedia noi.'}, {t:'Le mandiamo un altro rider con il tiramisù tra un’ora.', why:'Un’ora per un dolce non risolve: il rimborso immediato sì.'}]},
  {c:'Grazie. Peccato, era per mio figlio.', o:[{t:'Alla prossima ordinazione dall’app del locale il dolce è offerto: le lascio il codice via messaggio.', ok:true}, {t:'Capita, la prossima volta controlli il sacchetto.', why:'Non è compito del cliente controllare il nostro lavoro.'}, {t:'Le regaliamo una cena per quattro.', why:'Un gesto sproporzionato: basta il rimborso e un dolce offerto.'}]}
 ] : [
  {c:`L’ordine ${ch.name} è arrivato dopo 48 minuti ed era freddo.`, o:[{t:'Mi dispiace: il rider ha avuto un ritardo. Segnalo il ritardo alla piattaforma e chiedo il rimborso per lei.', ok:true}, {t:'Da noi è uscito caldo, non è colpa nostra.', why:'Difendersi non serve al cliente: si segnala e si rimedia.'}, {t:'Lo scaldi al microonde, va benissimo.', why:'Una tagliata al microonde non è un rimedio.'}]},
  {c:'E la prossima volta come faccio a fidarmi?', o:[{t:'Se ordina dall’app del locale consegna il nostro rider: le lascio un codice per la consegna gratuita.', ok:true}, {t:'Non ordini più su quella piattaforma.', why:'Non si parla male di un canale con cui il locale lavora.'}, {t:'Non dipende da noi.', why:'Si offre un’alternativa concreta: il canale del locale.'}]}
 ];
 if (lvl() === 1) turns.length = 1;
 turns.forEach(t => { t.o = G.shuffle(t.o); });
 return {event:[`Cliente delivery · ${who.name}`, kind === 'manca' ? 'Manca un piatto nell’ordine' : 'Ordine arrivato in ritardo'], brief:{what:'Un cliente del delivery chiama perché qualcosa è andato storto. Scegli le risposte: rimediare subito e portarlo verso il canale del locale.', why:'Sulle piattaforme il voto del cliente decide la posizione del locale: una chiamata gestita bene salva la recensione.'},
  m:mk('phone', 'IL CLIENTE DEL DELIVERY', `Delivery · ${who.name} al telefono`, {turns, sources, caller:who.name}, 180000)};
}

// ————— Cassa · Riconciliazione dei pagamenti (classify) —————
function riconciliaMission() {
 const n = by(4, 5, 6);
 const items = Array.from({length:n}, (_, i) => { const amt = G.int(24, 180), k = i < 2 ? ['manca', 'diverso'][i] : G.pick(['ok', 'ok', 'manca', 'diverso']); const dc = k === 'diverso' ? amt + G.pick([-10, -2, 2, 9]) : amt; const m = G.pick(['POS · carta', 'Stripe · Apple Pay', 'Stripe · Google Pay', 'POS · bancomat']); return {text:`${m} · ${G.euro(amt)}`, sub:k === 'manca' ? 'documento commerciale: nessuno' : `documento commerciale DC ${G.int(380, 470)} · ${G.euro(dc)}`, ans:k}; });
 return {event:['Riconciliazione di fine servizio', `${n} pagamenti da incrociare`], brief:{what:'A fine servizio ogni pagamento elettronico deve avere il suo documento commerciale con lo stesso importo. Per ognuno: torna, manca il documento o l’importo è diverso.', why:'Dal 2026 POS e registratore sono collegati: l’Agenzia delle Entrate incrocia i pagamenti con i corrispettivi, e una differenza fa partire un controllo.'},
  m:mk('classify', 'I CONTI TORNANO?', 'Cassa · pagamenti e documenti commerciali', {ask:'Incrocia ogni <b>pagamento elettronico</b> con il suo <b>documento commerciale</b>.', sources:[{t:'Regola', rows:[['Torna', 'stesso importo, documento emesso'], ['Manca', 'pagamento senza documento: va emesso'], ['Diverso', 'importi diversi: va corretto con un reso o un annullo']]}], states:[['ok', 'Torna'], ['manca', 'Manca'], ['diverso', 'Diverso']], items, winWhy:'Ogni pagamento ha il suo documento: i corrispettivi trasmessi coincidono con i dati dei pagamenti.'})};
}

// ————— Cassa · Chiusura di cassa (calc) —————
function chiusuraMission() {
 const fondo = G.pick([100, 150, 200]), cash = G.int(180, 640), out = lvl() >= 3 ? G.int(40, 120) : 0, tips = G.pick([0, 0, 25, 30]);
 const answer = fondo + cash - out;
 return {event:['Chiusura di cassa', 'Quanti contanti devono esserci?'], brief:{what:'A fine serata si conta il cassetto: fondo cassa iniziale più i contanti incassati, meno quello che è uscito in contanti con il suo documento. Le mance hanno un barattolo a parte.', why:'Se il cassetto non torna con i documenti commerciali, o mancano soldi o manca uno scontrino: in entrambi i casi va trovato stasera.'},
  m:mk('calc', 'IL CASSETTO TORNA?', 'Cassa · chiusura della serata', {unit:'€', ask:'Quanti <b>contanti</b> devono esserci nel cassetto della cassa?', answer, sources:[{t:'Chiusura giornaliera', rows:[['Fondo cassa di apertura', G.euro(fondo)], ['Contanti incassati (documenti commerciali)', G.euro(cash)], ...(out ? [['Pagato in contanti al pescivendolo, con fattura', `− ${G.euro(out)}`] ] : []), ...(tips ? [['Mance della sala', `${G.euro(tips)} · barattolo a parte`]] : [])]}], hint:`Fondo più contanti incassati${out ? ', meno il pagamento in contanti' : ''}. Le mance non entrano nel cassetto.`, winWhy:'Il cassetto torna con i documenti: la chiusura si firma e il fondo cassa è pronto per domani.'})};
}

// ————— Bandi · Quanto vale il contributo (calc) —————
function contributoMission() {
 const pct = G.pick([30, 40, 50]), cap = G.pick([5000, 8000, 10000]);
 const pool = [['Abbattitore nuovo', G.int(30, 60) * 100, true], ['Cappa aspirante nuova', G.int(20, 45) * 100, true], ['Software di gestione', G.int(12, 30) * 100, true], ['Sedie della sala', G.int(10, 25) * 100, false], ['Forno usato', G.int(15, 30) * 100, false]];
 const list = G.shuffle(pool).slice(0, by(3, 4, 5)); if (!list.some(x => x[2])) list[0] = pool[0];
 const vat = lvl() >= 3, ok = list.filter(x => x[2]).reduce((n, x) => n + x[1], 0), answer = Math.min(cap, Math.round(ok * pct / 100));
 return {event:['Bando attrezzature (esempio)', 'Quanto contributo chiedere?'], brief:{what:'Il bando rimborsa una percentuale delle spese ammissibili, fino a un massimale. Somma solo quelle che rientrano, applica la percentuale e controlla il tetto.', why:'Chiedere un contributo sbagliato vuol dire domanda da rifare, o un contributo ridotto in fase di controllo.'},
  m:mk('calc', 'QUANTO VALE IL CONTRIBUTO?', 'Bandi · la domanda da presentare', {unit:'€', ask:`Il bando paga il <b>${pct}%</b> delle spese ammissibili, fino a <b>${G.euro(cap)}</b>. Quanto contributo chiedi?`, answer, tolerance:1, sources:[{t:`Preventivi${vat ? ' (imponibile, IVA esclusa)' : ''}`, rows:list.map(x => [x[0], G.euro(x[1])])}, {t:'Bando (esempio)', rows:[['Ammesse', 'attrezzature e software nuovi'], ['Escluse', 'arredi e beni usati'], ['Massimale', G.euro(cap)], ...(vat ? [['IVA', 'mai ammissibile: si calcola sull’imponibile']] : [])]}], hint:`Somma solo le spese ammesse, poi il ${pct}%; se supera ${G.euro(cap)} vale il massimale.`, winWhy:'Contributo calcolato come lo calcolerà chi istruisce la domanda: niente tagli in fase di controllo.'})};
}

// ————— missioni in più, a caso —————
// Non arrivano sempre: a ogni partita se ne accende solo una parte (p), e alcune solo dal capitolo indicato (ch: 1 = capitolo 2)
// o dal livello indicato (lvl). Il Delivery non ha una missione di base: le sue arrivano solo dal capitolo 2 in poi.
// Ogni missione extra ha la sua difficoltà (d): 1 si fa a colpo d'occhio, 2 chiede un calcolo o un confronto,
// 3 chiede di mettere insieme più regole. Si sblocca quando il livello (cioè il capitolo) la raggiunge.
const extras = [
 {page:'fidelity_nfc', fn:nfcPickMission, d:1},
 {page:'app_builder', fn:pushMission, d:1},
 {page:'delivery', fn:dlvMenuMission, d:1},
 {page:'fidelity_nfc', fn:nfcBillMission, d:2},
 {page:'fidelity_nfc', fn:campaignMission, d:2},
 {page:'app_builder', fn:bookingMission, d:2},
 {page:'app_builder', fn:storeMission, d:2},
 {page:'delivery', fn:dlvPhoneMission, d:2},
 {page:'whatsapp', fn:waCampaignMission, d:2},
 {page:'fatture', fn:riconciliaMission, d:2},
 {page:'fatture', fn:chiusuraMission, d:2},
 {page:'delivery', fn:commissionMission, d:3},
 {page:'delivery', fn:dlvPauseMission, d:3},
 {page:'bandi', fn:contributoMission, d:3}
];
let active = new Set(extras);
// A ogni partita un mazzo bilanciato: due missioni extra per difficoltà, pescate davvero a caso.
// Una run ne vede una manciata, ben distribuite sulla curva, e la partita dopo ne vede altre.
const drawExtras = () => { active = new Set([1, 2, 3].flatMap(d => G.shuffle(extras.filter(x => x.d === d)).slice(0, 2))); };
const ready = x => active.has(x) && x.d <= lvl();
const candidates = page => [...(base[page] ? [base[page]] : []), ...extras.filter(x => x.page === page && ready(x)).map(x => x.fn)];
const eligible = page => candidates(page).length > 0;
function generate(page) { const c = candidates(page); return c[rnd(c.length)](); }

// ————— regista —————
// Le missioni sono un bonus raro (una ogni un paio di minuti): il cuore della sfida sono i compiti veri.
const base = {sala:salaMission, kds:kdsMission, menu_pos:menuMission, centralino_ai:centralinoMission, recensioni_ai:recensioniMission, whatsapp:whatsappMission, fidelity_nfc:fidelityMission, magazzino:() => (rnd(2) ? ricevimentoMission : magazzinoMission)(), fatture:fattureMission, bandi:bandiMission, staff:() => (rnd(2) ? proceduraMission : staffMission)(), app_builder:appMission};
const rotation = ['kds', 'sala', 'centralino_ai', 'magazzino', 'menu_pos', 'delivery', 'whatsapp', 'fatture', 'recensioni_ai', 'staff', 'app_builder', 'fidelity_nfc', 'bandi'];
// Il primo arrivo di ogni settore lo spiega un Otto di quel settore: cosa fai e perché, a tempo fermo.
const briefs = {
 sala:{where:'in sala, al pannello del tavolo', role:'otto-bow', name:'Otto cameriere', what:'Il tavolo chiede il conto, ma c’è qualcosa da calcolare: una parte già pagata dal QR, il coperto, uno sconto o la divisione alla romana. Fai il conto con la calcolatrice, guardando i documenti.', why:'Se il conto non torna, l’ospite paga due volte o il locale perde soldi, e il documento fiscale va rifatto.'},
 kds:{where:'in cucina, davanti al pass', role:'otto-chef', name:'Otto cuoco', what:'È arrivata una comanda grande dal QR: manda ogni piatto alla sua partita (antipasti, primi, secondi, dolci).', why:'Ogni partita prepara solo i suoi piatti: se uno finisce nel posto sbagliato, il tavolo mangia a pezzi e freddo.'},
 menu_pos:{where:'al menu QR che vedono gli ospiti', role:'otto-bow', name:'Otto di sala', what:'Dopo l’inventario decidi cosa mostra il menu QR: disponibile, ultime porzioni o esaurito.', why:'Così nessun ospite ordina un piatto che in cucina è già finito.'},
 centralino_ai:{where:'al centralino, con una chiamata in linea', role:'otto-phone', name:'Otto centralinista', what:'Una chiamata che Otto non può chiudere da solo: scegli tu le risposte, guardando sala e menu.', why:'Al telefono si promette quello che il locale può mantenere: tavolo vero, allergeni veri.'},
 recensioni_ai:{where:'sulle recensioni Google del locale', role:'otto-star', name:'Otto social', what:'Una recensione negativa: tra le risposte preparate da Otto, scegli quella da pubblicare.', why:'Chi legge le recensioni guarda soprattutto come rispondi: riconoscere il problema convince più di difendersi.'},
 whatsapp:{where:'su WhatsApp, nella chat con un ospite', role:'otto-phone', name:'Otto messaggi', what:'Otto ha scritto la conferma della prenotazione, ma un dato non coincide con il registro: trovalo e correggilo.', why:'Un orario o un tavolo sbagliato in un messaggio diventa un ospite arrabbiato all’ingresso.'},
 fidelity_nfc:{where:'al lettore delle card fedeltà', role:'otto-star', name:'Otto fidelity', what:'Gli ospiti appoggiano la card: per ognuno decidi se il premio spetta.', why:'Premi giusti a chi li ha raggiunti: è così che un cliente torna, e il programma non costa più di quanto rende.'},
 magazzino:{where:'in magazzino, con la merce appena arrivata', role:'otto-cap', name:'Otto magazziniere', what:'È arrivata la fattura del fornitore: confrontala con la bolla firmata alla consegna e trova la riga che non torna.', why:'Vale la bolla firmata: se paghi la fattura sbagliata, paghi merce che non hai mai ricevuto.'},
 fatture:{where:'in cassa, alle fatture elettroniche', role:'otto-bow', name:'Otto cassiere', what:'Per emettere la fattura elettronica copi un codice dalla fonte giusta, una casella alla volta.', why:'Con un codice o una partita IVA sbagliati la fattura non arriva al cliente e va rifatta.'},
 bandi:{where:'sui bandi, con una domanda da preparare', role:'otto-inspector', name:'Otto consulente', what:'Il bando chiede quali spese inserire: per ognuna decidi se è ammissibile.', why:'Una sola spesa non ammessa può far perdere tutto il contributo.'},
 staff:{where:'in cucina, con la checklist HACCP', role:'otto-inspector', name:'Otto ispettore', what:'Valida la checklist HACCP: ogni controllo è conforme o no, secondo la procedura.', why:'In un controllo dell’ASL conta quello che è scritto: una non conformità registrata con l’azione giusta protegge il locale.'},
 app_builder:{where:'all’app del locale, sul piatto del giorno', role:'otto-chef', name:'Otto cuoco', what:'Il piatto del giorno va pubblicato sull’app e sul menu QR: scegli tutti gli allergeni, e nessuno in più.', why:'Per chi è allergico è una questione di salute, e per il locale un obbligo di legge.'},
 delivery:{where:'al tablet del delivery', role:'otto-phone', name:'Otto rider', what:'Il delivery ha i suoi conti e le sue regole: commissioni delle piattaforme, piatti che viaggiano bene, canali da fermare quando la cucina è piena.', why:'Un ordine delivery sbagliato non si vede in sala, ma si legge nelle recensioni della piattaforma e nel bonifico di fine mese.'}
};
// Seconde versioni delle spiegazioni: Otto non racconta il settore sempre con le stesse parole (si estrae a caso).
const briefAlt = {
 sala:{what:'Al tavolo il conto non è mai solo un totale: c’è chi ha già pagato dal QR, chi divide, chi ha la card. Fai i conti con la calcolatrice, documenti alla mano.', why:'Un conto sbagliato si vede subito: l’ospite che paga due volte non torna, e il documento fiscale va annullato.'},
 kds:{what:'Una comanda grande va divisa tra le partite: antipasti, primi, secondi e dolci hanno ognuno il suo cuoco.', why:'Se un piatto finisce alla partita sbagliata, esce in ritardo e il tavolo mangia uno alla volta.'},
 menu_pos:{what:'Il menu QR deve dire la verità: per ogni piatto guarda le porzioni rimaste e scegli disponibile, ultime o esaurito.', why:'Un piatto esaurito che resta ordinabile è un ospite deluso e un cameriere che deve chiedere scusa.'},
 centralino_ai:{what:'Al telefono c’è una richiesta che Otto non può chiudere da solo. Leggi sala, menu e pagamenti, e scegli cosa dire.', why:'Quello che si promette al telefono, il locale lo deve mantenere: tavoli veri, allergeni veri, rimborsi veri.'},
 recensioni_ai:{what:'È arrivata una recensione negativa, e Otto ha preparato più risposte. Scegli quella che pubblicheresti tu.', why:'Una risposta difensiva fa più danni della recensione: chi legge cerca un locale che ascolta.'},
 whatsapp:{what:'Otto ha preparato la conferma per l’ospite, ma un dato non corrisponde al registro delle prenotazioni. Trovalo e correggilo.', why:'Il messaggio è una promessa scritta: se dice le 21 e il tavolo è per le 20, l’errore lo paga la sala.'},
 fidelity_nfc:{what:'Al tavolo gli ospiti appoggiano la card fedeltà e chiedono un premio. Guarda i punti e la regola, e decidi.', why:'Un premio dato a chi non lo ha ancora raggiunto costa al locale; uno negato a chi lo merita costa il cliente.'},
 magazzino:{what:'La merce è arrivata e la fattura pure. Prima di pagare, si confronta con la bolla firmata alla consegna.', why:'La fattura la scrive il fornitore, la bolla la firmi tu: in caso di differenza vale la bolla.'},
 fatture:{what:'Per la fattura elettronica serve un codice preciso: copialo dalla fonte giusta, carattere per carattere.', why:'Un carattere sbagliato e la fattura non arriva al cliente: lo Sdi la scarta, e si ricomincia.'},
 bandi:{what:'Il bando paga solo certe spese: per ognuna decidi se va inserita nella domanda o lasciata fuori.', why:'Basta una spesa non ammessa per far scattare un controllo, e a volte la revoca del contributo.'},
 staff:{what:'La checklist HACCP di oggi va validata: ogni controllo, conforme o no, secondo la procedura scritta.', why:'In un controllo dell’ASL conta la registrazione: un frigo a 6 °C segnato come conforme è un problema doppio.'},
 app_builder:{what:'Il piatto del giorno va pubblicato con i suoi allergeni: tutti quelli giusti, e nessuno di troppo.', why:'Gli allergeni sono un obbligo di legge e una questione di salute: per un celiaco non esiste il “quasi”.'},
 delivery:{what:'Dal tablet passano Glovo, Deliveroo, Just Eat e il sito del locale: ogni ordine ha un costo e un tempo, e qui si decide come gestirli.', why:'Il delivery fatto male costa due volte: commissioni pagate e clienti persi.'}
};
Object.entries(briefAlt).forEach(([k, v]) => { briefs[k].alt = [v]; });

const icons = {sala:'coins', kds:'chef', menu_pos:'menu', delivery:'bike', centralino_ai:'phone', recensioni_ai:'star', whatsapp:'message', fidelity_nfc:'card', magazzino:'box', fatture:'receipt', bandi:'radar', staff:'users', app_builder:'palette'};
let open = [];
function spawn(force, forced) {
 if (!running && !force) return;
 if (!force && (document.body.classList.contains('touring') || document.hidden)) return schedule(3);
 // una missione arriva solo quando il giocatore ha preso la mano (due compiti fatti) e c'è spazio nel livello
 if (force || canSpawnMission()) {
  const busy = new Set(open.filter(x => x.open).map(x => x.page));
  const order = rotation.slice(turn % rotation.length).concat(rotation.slice(0, turn % rotation.length));
  // nella storia, l'antagonista del capitolo porta più spesso missioni dalle sue sezioni
  const bias = storyBias()?.filter(p => eligible(p) && !busy.has(p)), fromStory = !force && bias?.length && Math.random() < (missionRush() ? .95 : .7) ? bias[Math.floor(Math.random() * bias.length)] : null;
  const page = force || fromStory || order.find(p => eligible(p) && !busy.has(p)) || order.find(eligible); turn = rotation.indexOf(page) + 1;
  // la Sala usa un tavolo vero: chiede il conto, il "!" compare sulla pianta e si risolve nel suo pannello
  const tb = page === 'sala' ? D.tables.find(x => ['seated', 'ordered'].includes(x.status) && !['T3', 'T8'].includes(x.id) && !x.mission && x.lines.length) : null;
  const made = page === 'sala' ? salaMission(tb) : forced ? forced() : generate(page), ttl = Math.round(made.m.ttl * by(1, .85, .7)), rec = {open:true, page};
  if (tb) tb.status = 'bill';
  const id = addMission({...made.m, ttl, page, ref:tb?.id, brief:made.brief ? {...briefs[page], alt:null, ...made.brief} : briefs[page], event:made.event, onDone:() => {
   rec.open = false; schedule(missionRush() ? G.int(40, 70) : G.int(120, 180));
   if (tb) { tb.mission = null; if (tb.status === 'bill') D.closeBill(tb.id); }
  }});
  if (tb) tb.mission = id;
  open.push(rec);
  D.notify({type:'mission', title:made.event[0], text:made.event[1], icon:icons[page], go:page}, `${made.event[0]}: ${made.event[1].toLowerCase()}`, made.log || 'sala');
 }
 // se la missione non è potuta arrivare (troppo presto o troppe cose aperte), si riprova tra poco
 if (!force) schedule(open.some(x => x.open) ? G.int(90, 140) : 15);
}
// Per i test e le prove a mano: fa arrivare subito la missione di una sezione.
// Con un indice sceglie una missione precisa del settore (0 = quella di base, poi le extra), anche se non è ancora sbloccata.
export const spawnNow = (page, k) => spawn(page, k == null ? null : [...(base[page] ? [base[page]] : []), ...extras.filter(x => x.page === page).map(x => x.fn)][k]);
export const extraList = () => extras.map(x => ({page:x.page, name:x.fn.name, ch:x.ch, lvl:x.lvl, on:active.has(x), ready:ready(x)}));
function schedule(s) { clearTimeout(timer); timer = setTimeout(spawn, s * 1000); }
// a ogni partita l'ordine dei settori si rimescola davvero: le prime missioni non sono mai le stesse
const reshuffle = () => { for (let i = rotation.length - 1; i > 0; i--) { const j = rnd(i + 1); [rotation[i], rotation[j]] = [rotation[j], rotation[i]]; } };
export function startMissions() { running = true; turn = 0; reshuffle(); drawExtras(); open = []; schedule(30); }
export function stopMissions() { running = false; D.service.game = false; clearTimeout(timer); }
// Per i test: i generatori di ogni modulo, con un livello forzato.
export const generators = Object.fromEntries(Object.entries(base).map(([k, f]) => [k, () => f().m]));
export const extraGenerators = extras.map(x => ({page:x.page, name:x.fn.name, make:() => x.fn().m}));
export const setTestLevel = l => { testLevel = l; };
