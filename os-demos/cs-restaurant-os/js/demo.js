import {service as SV} from './clock.js';
// Ristorante dimostrativo e motore del servizio. Locale, persone, piatti e numeri sono INVENTATI.
// Ogni azione passa da qui: un piatto ordinato entra nel conto, va in cucina e scala il magazzino.
// Nel prodotto reale gli stessi eventi arriveranno dal backend con la stessa forma.

export const restaurant = {name:'Osteria del Borgo', city:'Firenze', owner:'Marta Rinaldi'};

export const ingredients = [
 {id:'pasta', name:'Pasta fresca', unit:'kg', qty:6.2, min:3, cost:6.5, supplier:'Pastificio Fiorentino'},
 {id:'guanciale', name:'Guanciale', unit:'kg', qty:2.1, min:1.5, cost:18, supplier:'Salumificio Chianti'},
 {id:'uova', name:'Uova', unit:'pz', qty:58, min:30, cost:.35, supplier:'Fattoria Le Querce'},
 {id:'pecorino', name:'Pecorino romano', unit:'kg', qty:1.4, min:1, cost:22, supplier:'Caseificio Toscano'},
 {id:'manzo', name:'Controfiletto di manzo', unit:'kg', qty:6.5, min:4, cost:32, supplier:'Macelleria Bartolini'},
 {id:'funghi', name:'Porcini', unit:'kg', qty:1.0, min:.8, cost:28, supplier:'Ortofrutta Mugello'},
 {id:'riso', name:'Riso Carnaroli', unit:'kg', qty:5, min:2, cost:4.2, supplier:'Riseria Arborio'},
 {id:'pomodoro', name:'Pomodoro pelato', unit:'kg', qty:7, min:3, cost:2.8, supplier:'Ortofrutta Mugello'},
 {id:'burrata', name:'Burrata', unit:'pz', qty:9, min:6, cost:3.2, supplier:'Caseificio Toscano'},
 {id:'mascarpone', name:'Mascarpone', unit:'kg', qty:1.6, min:1, cost:9, supplier:'Caseificio Toscano'},
 {id:'vino', name:'Chianti Classico', unit:'bt', qty:22, min:12, cost:9.5, supplier:'Cantina Castellina'},
 {id:'pane', name:'Pane toscano', unit:'kg', qty:3, min:2, cost:3, supplier:'Forno Santa Croce'}
];

export const menu = [
 {id:'bruschetta', name:'Bruschetta al pomodoro', cat:'Antipasti', price:8, allergens:['Glutine'], recipe:{pane:.08, pomodoro:.06}, course:1, prep:6, desc:'Pane toscano, pomodoro fresco, basilico'},
 {id:'burrata', name:'Burrata e pomodorini', cat:'Antipasti', price:12, allergens:['Latte'], recipe:{burrata:1, pomodoro:.05}, course:1, prep:5, desc:'Burrata pugliese, pomodorini confit'},
 {id:'carbonara', name:'Carbonara', cat:'Primi', price:14, allergens:['Glutine','Uova','Latte'], recipe:{pasta:.12, guanciale:.05, uova:2, pecorino:.03}, course:2, prep:12, desc:'Guanciale croccante, pecorino romano'},
 {id:'risotto', name:'Risotto ai porcini', cat:'Primi', price:16, allergens:['Latte'], recipe:{riso:.09, funghi:.07}, course:2, prep:20, desc:'Carnaroli mantecato, porcini del Mugello'},
 {id:'pici', name:'Pici al pomodoro', cat:'Primi', price:12, allergens:['Glutine'], recipe:{pasta:.13, pomodoro:.1}, course:2, prep:12, desc:'Pici tirati a mano, sugo all’aglione'},
 {id:'tagliata', name:'Tagliata di manzo', cat:'Secondi', price:24, allergens:[], recipe:{manzo:.25}, course:3, prep:16, desc:'Controfiletto, rucola e grana'},
 {id:'tiramisu', name:'Tiramisù', cat:'Dolci', price:7, allergens:['Uova','Latte','Glutine'], recipe:{mascarpone:.08, uova:1}, course:4, prep:3, desc:'Fatto in casa ogni mattina'},
 {id:'chianti', name:'Chianti Classico (bt)', cat:'Vini', price:28, allergens:['Solfiti'], recipe:{vino:1}, course:0, prep:0, desc:'Cantina Castellina, 2021'}
].map(d => ({...d, visible:true, paused:false}));
export const dish = id => menu.find(d => d.id === id);
export const ingredient = id => ingredients.find(i => i.id === id);
export const foodCost = d => Object.entries(d.recipe).reduce((n, [k, q]) => n + ingredient(k).cost * q, 0);

// Pianta: coordinate in percentuale sulla sala.
export const tables = [
 {id:'T1', seats:2, x:8, y:12, shape:'round'}, {id:'T2', seats:2, x:24, y:12, shape:'round'}, {id:'T3', seats:4, x:42, y:10}, {id:'T4', seats:4, x:62, y:10},
 {id:'T5', seats:6, x:82, y:12, shape:'long'}, {id:'T6', seats:4, x:10, y:46}, {id:'T7', seats:4, x:30, y:46}, {id:'T8', seats:2, x:52, y:48, shape:'round'},
 {id:'T9', seats:8, x:72, y:46, shape:'long'}, {id:'T10', seats:2, x:12, y:78, shape:'round'}, {id:'T11', seats:4, x:34, y:78}, {id:'T12', seats:4, x:56, y:78}
].map(t => ({...t, status:'free', guests:0, since:null, lines:[], name:''}));
ingredients.forEach(i => { i.start = i.qty; });
export const table = id => tables.find(t => t.id === id);

export const service = {revenue:0, covers:0, closed:[], events:[], live:true, nextLine:1, started:SV.start, payments:[], doc:410, qrOrders:0};
export const bookings = [
 {time:'20:30', name:'Famiglia Gori', guests:5, table:'T5', channel:'Centralino AI', note:'Un seggiolone'},
 {time:'20:45', name:'Luca Pieri', guests:2, table:'T10', channel:'WhatsApp', note:'Anniversario'},
 {time:'21:00', name:'Studio Marchetti', guests:8, table:'T9', channel:'Email', note:'Cena aziendale, fattura'},
 {time:'21:15', name:'Anna Serra', guests:2, table:'T2', channel:'Centralino AI', note:'Celiaca'}
];

let listeners = [];
export const subscribe = fn => { listeners.push(fn); return () => { listeners = listeners.filter(x => x !== fn); }; };
const emit = () => listeners.forEach(fn => fn());
const now = () => new Intl.DateTimeFormat('it-IT', {hour:'2-digit', minute:'2-digit', timeZone:'Europe/Rome'}).format(new Date());
function log(text, kind='sala') { service.events.unshift({time:now(), text, kind, at:Date.now()}); service.events = service.events.slice(0, 40); }

export const tableTotal = t => t.lines.reduce((n, l) => n + dish(l.dish).price * l.qty, 0);
export const lowStock = () => ingredients.filter(i => i.qty <= i.min);
// Menu intelligente: quante porzioni restano davvero in magazzino, e se la cucina può reggere il piatto adesso.
export const portions = d => Math.min(...Object.entries(d.recipe).map(([k, q]) => Math.floor(ingredient(k).qty / q + 1e-9)));
export const available = d => d.visible && !d.paused && portions(d) >= 1;
export const kitchenLoad = () => kitchenLines().filter(l => l.state !== 'ready').length;
export const loadLimit = 24;
export const kitchenLines = () => tables.flatMap(t => t.lines.filter(l => l.state !== 'served' && dish(l.dish).course > 0).map(l => ({...l, table:t.id})));

export function openTable(id, guests, name='') {
 const t = table(id); if (t.status !== 'free') return;
 Object.assign(t, {status:'seated', guests, since:Date.now(), lines:[], name});
 service.covers += guests; log(`${id} · ${guests} ospiti accomodati${name ? ' (' + name + ')' : ''}`); emit();
}
export function addDish(id, dishId, qty=1, silent=false, via='sala') {
 const t = table(id), d = dish(dishId);
 if (!t || !d) return false;
 if (!available(d)) { log(`${d.name} esaurito: ingredienti sotto il necessario`, 'magazzino'); emit(); return false; }
 if (t.status === 'free') openTable(id, Math.min(t.seats, 2));
 for (const [k, q] of Object.entries(d.recipe)) { const i = ingredient(k); i.qty = Math.max(0, +(i.qty - q * qty).toFixed(3)); i.changed = Date.now(); }
 const line = {id:'L' + service.nextLine++, dish:dishId, qty, state: d.course === 0 ? 'served' : 'waiting', at:Date.now(), via, paid:false};
 t.lines.push(line); t.status = 'ordered';
 if (via === 'sala') log(`${id} · ${qty}× ${d.name}${d.course === 0 ? '' : ' → cucina'}`, 'cucina');
 const low = Object.keys(d.recipe).map(ingredient).filter(i => i.qty <= i.min && !i.alerted);
 low.forEach(i => { i.alerted = true; log(`Sotto scorta: ${i.name} (${fmtQty(i)})`, 'magazzino'); });
 if (!silent) emit();
 return line;
}
export function advance(lineId) {
 for (const t of tables) {
  const l = t.lines.find(x => x.id === lineId); if (!l) continue;
  l.state = {waiting:'cooking', cooking:'ready', ready:'served'}[l.state] || l.state;
  if (l.state === 'ready') log(`${t.id} · ${dish(l.dish).name} pronto al pass`, 'cucina');
  if (l.state === 'served') log(`${t.id} · ${dish(l.dish).name} servito`, 'sala');
  emit(); return;
 }
}
export function requestBill(id) { const t = table(id); if (t.lines.length) { t.status = 'bill'; t.billAt = Date.now(); log(`${id} · conto richiesto (€ ${tableTotal(t)})`); emit(); } }
export const tableDue = t => t.lines.filter(l => !l.paid).reduce((n, l) => n + dish(l.dish).price * l.qty, 0);
// Ogni incasso, dalla cassa o dal QR, emette il documento commerciale e finisce nei corrispettivi per l'Agenzia delle Entrate.
function pay(tableId, amount, method, what) {
 const p = {id:'DC ' + String(++service.doc).padStart(4, '0'), table:tableId, amount, method, what, time:now(), at:Date.now(), ade:'In invio'};
 service.payments.unshift(p); service.payments.length = Math.min(service.payments.length, 30);
 service.revenue += amount;
 setTimeout(() => { p.ade = 'Trasmesso'; emit(); }, 4000);
 return p;
}
export function closeBill(id, method='Carta') {
 const t = table(id); const total = tableTotal(t); if (!total) return 0;
 const due = tableDue(t);
 if (due) pay(id, due, method === 'Carta' ? 'POS · carta' : method, `Conto tavolo ${id.slice(1)}`);
 service.closed.unshift({table:id, total, guests:t.guests, method: due === total ? method : due ? `${method} + QR` : 'Pagato dal QR', time:now(), items:t.lines.reduce((n, l) => n + l.qty, 0)});
 log(`${id} · conto chiuso € ${total}${due !== total ? ` (€ ${total - due} già pagati dal QR)` : ` (${method})`}`, 'cassa');
 Object.assign(t, {status:'free', guests:0, since:null, lines:[], name:''}); emit(); return total;
}
export function reorder(ids) {
 for (const id of ids) { const i = ingredient(id); i.qty = +(i.qty + i.min * 2).toFixed(2); i.alerted = false; i.changed = Date.now(); }
 log(`Ordine inviato ai fornitori: ${ids.map(id => ingredient(id).name).join(', ')}`, 'magazzino'); emit();
}
// L'ospite ordina dal menu QR del suo tavolo: la comanda va in cucina e, se vuole, paga subito con Stripe.
export function qrOrder(id, items, prepaid, method='Apple Pay') {
 const t = table(id); if (!t) return null;
 if (t.status === 'free') openTable(id, Math.min(t.seats, 2));
 const lines = items.map(([dishId, qty]) => addDish(id, dishId, qty, true, 'qr')).filter(Boolean);
 if (!lines.length) { emit(); return null; }
 const amount = lines.reduce((n, l) => n + dish(l.dish).price * l.qty, 0);
 service.qrOrders++;
 log(`${id} · ordine dal menu QR: ${lines.map(l => `${l.qty}× ${dish(l.dish).name}`).join(', ')} → cucina`, 'cucina');
 let receipt = null;
 if (prepaid) { lines.forEach(l => { l.paid = true; }); receipt = pay(id, amount, `Stripe · ${method}`, `Ordine QR tavolo ${id.slice(1)}`); log(`${id} · pagato in anticipo con ${method} · € ${amount}`, 'cassa'); }
 emit(); return {lines, amount, receipt};
}
// Comandi a Otto sul menu, in linguaggio naturale. Ritornano la risposta da mostrare.
export function menuCommand(text) {
 const t = text.toLowerCase();
 const find = () => menu.find(d => t.includes(d.name.toLowerCase().split(' ')[0]) || t.includes(d.id));
 const d = find();
 const price = t.match(/(\d+(?:[.,]\d+)?)\s*(?:€|euro)?/);
 if (/(rimetti tutto|ripristina|com.era)/.test(t)) { menu.forEach(x => { x.visible = !x.special; x.price = x.base ?? x.price; }); log('Otto ha ripristinato il menu originale', 'menu'); emit(); return 'Fatto: **menu ripristinato** com’era a inizio servizio, su tutti i QR dei tavoli.'; }
 if (/(aggiungi|piatto del giorno|nuovo piatto)/.test(t)) {
  const old = menu.find(x => x.special);
  if (old?.visible) return `C’è già un piatto del giorno: **${old.name}**. Vuoi che lo tolga?`;
  if (old) { old.visible = true; emit(); return `Di nuovo in menu il piatto del giorno: **${old.name}** a € ${old.price}.`; }
  const p = price ? +price[1].replace(',', '.') : 22;
  menu.splice(4, 0, {id:'special', name:'Tagliolini al tartufo', cat:'Primi', price:p, allergens:['Glutine','Uova'], recipe:{pasta:.1, uova:1}, course:2, prep:10, desc:'Piatto del giorno · tartufo bianco di San Miniato', visible:true, paused:false, special:true});
  log(`Otto ha aggiunto il piatto del giorno: Tagliolini al tartufo € ${p}`, 'menu'); emit();
  return `Aggiunto **Tagliolini al tartufo a € ${p}** tra i primi, con allergeni glutine e uova. È già visibile su tutti i QR.`;
 }
 if (!d) return 'Dimmi quale piatto: per esempio “togli la tagliata”, “metti il risotto a 18 €” o “aggiungi un piatto del giorno”.';
 if (/(togli|nascondi|leva|finit|non c.è|esaurit)/.test(t)) { d.visible = false; log(`Otto ha tolto dal menu: ${d.name}`, 'menu'); emit(); return `Tolto dal menu ${SV.of === 'del pranzo' ? 'del pranzo' : 'di stasera'}: **${d.name}**. Sparisce dai QR dei tavoli e nessuno può più ordinarlo. Domani torna in carta.`; }
 if (/(rimetti|riattiva|mostra)/.test(t)) { d.visible = true; d.paused = false; log(`Otto ha rimesso in menu: ${d.name}`, 'menu'); emit(); return `**${d.name}** di nuovo in menu, su tutti i QR.`; }
 // un prezzo scritto accanto al piatto basta: "risotto a 14", "risotto ai porcini a € 14", "risotto 14 euro"
 if (price) { d.base ??= d.price; d.price = +price[1].replace(',', '.'); log(`Otto ha cambiato il prezzo di ${d.name}: € ${d.price}`, 'menu'); emit(); return `Nuovo prezzo per **${d.name}**: **€ ${d.price}**, già su tutti i QR. Il margine passa al ${Math.round((1 - foodCost(d) / d.price) * 100)}%.`; }
 return `Per **${d.name}** posso toglierlo dal menu, rimetterlo o cambiare il prezzo. Cosa preferisci?`;
}
export function editDish(id, changes) { const d = dish(id); if (!d) return; if ('price' in changes) d.base ??= d.price; Object.assign(d, changes); log(`Menu aggiornato: ${d.name}`, 'menu'); emit(); }
export const fmtQty = i => `${i.unit === 'pz' || i.unit === 'bt' ? Math.round(i.qty) : i.qty.toFixed(1).replace('.', ',')} ${i.unit}`;

// Stato iniziale: servizio già avviato, così la sala "vive" dal primo secondo.
function seed() {
 const plan = [['T1', 2, ['bruschetta', 'carbonara', 'carbonara']], ['T3', 4, ['burrata', 'bruschetta', 'risotto', 'pici', 'tagliata', 'chianti']], ['T4', 3, ['carbonara', 'tagliata', 'tagliata']],
  ['T6', 4, ['bruschetta', 'bruschetta', 'risotto', 'risotto', 'chianti']], ['T8', 2, ['burrata', 'pici', 'tiramisu']], ['T11', 4, ['carbonara', 'carbonara', 'pici', 'risotto', 'tiramisu', 'tiramisu']], ['T7', 3, []]];
 for (const [id, g, dishes] of plan) { openTable(id, g); dishes.forEach(d => addDish(id, d, 1, true)); }
 // la cucina è già al lavoro
 const lines = kitchenLines();
 lines.slice(0, 8).forEach(l => advance(l.id)); lines.slice(0, 4).forEach(l => advance(l.id)); lines.slice(0, 2).forEach(l => advance(l.id));
 table('T8').status = 'bill';
 service.closed.push({table:'T2', total:46, guests:2, method:'Carta', time:'19:52', items:4}, {table:'T10', total:38, guests:2, method:'Contanti', time:'20:05', items:3});
 service.revenue = 84;
 service.payments = [{id:'DC 0410', table:'T10', amount:38, method:'Contanti', what:'Conto tavolo 10', time:'20:05', at:0, ade:'Trasmesso'}, {id:'DC 0409', table:'T2', amount:46, method:'POS · carta', what:'Conto tavolo 2', time:'19:52', at:0, ade:'Trasmesso'}];
 service.events = [{time:now(), text:'Servizio avviato · 7 tavoli occupati', kind:'sala', at:0}];
}
seed();

// Servizio live: la cucina avanza e arrivano nuovi ordini.
export function tick() {
 if (!service.live) return;
 tidy(); // il riordino (elenchi corti, consegne del fornitore) gira sempre, anche nella sfida
 // nella sfida la cucina la guida il giocatore: la simulazione fa solo girare i tavoli
 if (service.game) { if (Math.random() < .3) turnover(); return; }
 if (Math.random() < .25 && turnover()) return;
 const r = Math.random();
 const lines = kitchenLines();
 const free2 = lines.filter(x => !reserved(x.id));
 if (r < .5 && free2.length) { const l = free2.sort((a, b) => a.at - b.at).find(x => x.state !== 'ready') || free2[0]; advance(l.id); return; }
 if (r < .6) { if (guestOrder()) return; }
 if (r < .72) { const t = tables.filter(t => (t.status === 'seated' || t.status === 'ordered') && t.lines.length < 8 && t.id !== 'T7')[Math.floor(Math.random() * 4)]; if (t) { const d = menu.filter(available)[Math.floor(Math.random() * menu.length)]; if (d) addDish(t.id, d.id); } return; }
 if (r < .82) { const ready = lines.find(x => x.state === 'ready' && !reserved(x.id)); if (ready) advance(ready.id); return; }
 const free = tables.filter(t => t.status === 'free'); if (free.length > 3) openTable(free[0].id, Math.min(free[0].seats, 2 + Math.floor(Math.random() * 2)));
}

// Il servizio si rigenera da solo, così la demo può girare per ore senza appesantirsi:
// chi ha finito chiede il conto e se ne va, il fornitore consegna, le liste hanno un tetto.
// T3, T7 e T8 restano come sono perché la demo guidata ci passa sopra.
const guided = ['T3', 'T7', 'T8'];
// Ciò che il giocatore sta per fare (un compito o una missione aperti) non lo fa la simulazione al posto suo:
// altrimenti il compito sparisce o cambia sotto gli occhi. L'app collega qui il gioco.
let reserved = () => false;
export const setReserved = fn => { reserved = fn; };
function turnover() {
 const paying = tables.find(t => t.status === 'bill' && !t.mission && !reserved(t.id) && !guided.includes(t.id) && Date.now() - (t.billAt || 0) > 25000); // un conto con la sua missione aspetta il giocatore
 if (paying) { closeBill(paying.id, Math.random() < .7 ? 'Carta' : 'Contanti'); return true; }
 const finished = tables.find(t => t.status === 'ordered' && !reserved(t.id) && !guided.includes(t.id) && t.lines.length >= 4 && t.lines.every(l => l.state === 'served'));
 if (finished) { requestBill(finished.id); return true; }
 return false;
}
// La cucina non va in crash: se le comande aperte superano il limite, i piatti lenti vanno in pausa sui QR e tornano da soli.
function smartMenu() {
 const load = kitchenLoad();
 menu.forEach(d => {
  if (!d.paused && d.prep >= 16 && load >= loadLimit) { d.paused = true; log(`Cucina piena: ${d.name} in pausa sul menu QR`, 'menu'); }
  else if (d.paused && load <= loadLimit - 4) { d.paused = false; log(`${d.name} di nuovo ordinabile dal QR`, 'menu'); }
 });
}
function guestOrder() {
 const t = tables.filter(x => (x.status === 'seated' || x.status === 'ordered') && !guided.includes(x.id) && x.lines.length < 6)[Math.floor(Math.random() * 3)];
 if (!t) return false;
 const pick = menu.filter(available).sort(() => Math.random() - .5).slice(0, 1 + Math.floor(Math.random() * 2));
 if (!pick.length) return false;
 return !!qrOrder(t.id, pick.map(d => [d.id, 1]), Math.random() < .6, ['Apple Pay', 'Google Pay', 'carta'][Math.floor(Math.random() * 3)]);
}
function tidy() {
 smartMenu();
 const empty = ingredients.find(i => i.qty < i.min * .4);
 if (empty) { empty.qty = empty.start; empty.alerted = false; empty.changed = Date.now(); log(`${empty.supplier} ha consegnato ${empty.name}`, 'magazzino'); }
 service.closed.length = Math.min(service.closed.length, 12);
 liveCalls.length = Math.min(liveCalls.length, 3);
 calls.length = Math.min(calls.length, 8);
 reviews.length = Math.min(reviews.length, 7);
}

// Gli altri moduli: contenuti dimostrativi.
export const calls = [
 {time:'18:42', caller:'Famiglia Gori', outcome:'Prenotazione', text:'Tavolo per 5 alle 20:30, chiedono un seggiolone.', reply:'Prenotato il tavolo 5 alle 20:30 con seggiolone. Conferma inviata su WhatsApp.'},
 {time:'18:55', caller:'Anna Serra', outcome:'Prenotazione', text:'2 persone alle 21:15, una è celiaca.', reply:'Prenotato. Ho segnalato la celiachia alla cucina e indicato i piatti senza glutine.'},
 {time:'19:20', caller:'Numero sconosciuto', outcome:'Informazioni', text:'Chiede se siete aperti a pranzo la domenica.', reply:'Sì, dalle 12:30 alle 15:00. Ho proposto di prenotare.'},
 {time:'19:48', caller:'Paolo Neri', outcome:'Lista d’attesa', text:'4 persone alle 20:30.', reply:'Sala piena alle 20:30: inserito in lista d’attesa, lo avviso appena si libera un tavolo.'}
];
export const reviews = [
 {who:'Giulia M.', stars:5, source:'Google', text:'Carbonara strepitosa e servizio attento. Torneremo!', draft:'Grazie Giulia! La carbonara è il nostro orgoglio: vi aspettiamo presto.', done:false},
 {who:'Thomas K.', stars:4, source:'TripAdvisor', text:'Great food, a bit noisy on Saturday night.', draft:'Thank you Thomas! We are adding sound-absorbing panels in the main room. Hope to see you again.', done:false},
 {who:'Roberto F.', stars:2, source:'Google', text:'Attesa lunga per i secondi, 40 minuti.', draft:'Gentile Roberto, ha ragione e ci scusiamo. Abbiamo rivisto i tempi in cucina; ci farebbe piacere offrirle il dolce alla prossima visita.', done:false}
];
export const campaigns = [
 {name:'Promemoria prenotazione', sent:42, read:39, kind:'Automatico'}, {name:'Menu del tartufo · novembre', sent:0, read:0, kind:'Bozza di Otto'}, {name:'Grazie della visita + recensione', sent:118, read:96, kind:'Automatico'}
];
export const members = [{name:'Luca Pieri', points:340, visits:14, reward:'Dessert offerto'}, {name:'Anna Serra', points:120, visits:5, reward:'—'}, {name:'Studio Marchetti', points:880, visits:22, reward:'Bottiglia di Chianti'}];
export const invoices = [{n:'FT 2026/412', to:'Studio Marchetti', amount:620, state:'Da emettere'}, {n:'FT 2026/411', to:'Eventi Medici srl', amount:1840, state:'Inviata SDI'}, {n:'Acquisto', to:'Macelleria Bartolini', amount:412.5, state:'Ricevuta'}];
export const grants = [{title:'Contributi per l’efficienza energetica delle cucine', who:'Regione Toscana', deadline:'30 nov', fit:'Alta'}, {title:'Bando digitalizzazione PMI del turismo', who:'Camera di Commercio', deadline:'15 dic', fit:'Media'}];
export const staff = [{name:'Marta Rinaldi', role:'Titolare', shift:'18–24'}, {name:'Davide', role:'Chef', shift:'17–24'}, {name:'Sofia', role:'Sala', shift:'18:30–24'}, {name:'Karim', role:'Cucina', shift:'17–23'}, {name:'Elena', role:'Sala', shift:'19–24'}];
export const haccp = [{task:'Temperatura frigo 1 (≤ 4°C)', done:true, by:'Karim · 17:05'}, {task:'Temperatura abbattitore', done:true, by:'Davide · 17:30'}, {task:'Sanificazione piani di lavoro', done:false, by:'Entro le 24:00'}, {task:'Etichettatura preparazioni', done:false, by:'Entro le 23:00'}];

// Trigger in entrata: telefono, recensioni, WhatsApp, fornitori. Arrivano a ciclo come in un servizio vero.
let inbound = [];
export const onInbound = fn => inbound.push(fn);
const ping = ev => inbound.forEach(fn => fn(ev));
// Un avviso dal locale (usato anche dalle missioni della sfida): riga nel flusso, notifica e aggiornamento.
export function notify(ev, text, kind = 'sala') { if (text) log(text, kind); ping(ev); emit(); }
const callPool = [
 {caller:'Chiara Lotti', guests:4, time:'21:30', text:'Avete un tavolo per 4 alle 21:30?', reply:'Sì: tavolo 12 alle 21:30. Ti mando la conferma su WhatsApp.', table:'T12'},
 {caller:'Hotel Brunelleschi · concierge', guests:2, time:'21:45', text:'Due ospiti dell’hotel, uno vegano.', reply:'Prenotato il tavolo 1 alle 21:45, segnalato il menu vegano alla cucina.', table:'T1'},
 {caller:'Matteo Ricci', guests:6, time:'domani 20:00', text:'Cena di compleanno domani, 6 persone, possiamo portare una torta?', reply:'Prenotato il tavolo 5 domani alle 20:00. La torta va benissimo, la teniamo in frigo noi.', table:'T5'}
];
const reviewPool = [
 {who:'Elisa P.', stars:5, source:'Google', text:'Risotto ai porcini da 10 e lode. Personale gentilissimo.', draft:'Grazie Elisa! I porcini di stagione sono una passione di Davide: ti aspettiamo per il tartufo a novembre.'},
 {who:'Marco V.', stars:3, source:'Google', text:'Buono ma il tiramisù era finito alle 21.', draft:'Grazie Marco, ha ragione: da questa settimana prepariamo una dose in più il sabato. Alla prossima il dolce è offerto!'}
];
const waPool = [
 {who:'Luca Pieri', text:'Arriviamo con 10 minuti di ritardo, scusate!', reply:'Nessun problema Luca, il tavolo vi aspetta 🥂'},
 {who:'Famiglia Gori', text:'Possiamo essere 6 invece di 5?', reply:'Certo! Il tavolo 5 è da 6, aggiungiamo un coperto.'}
];
let ci = 0, ri = 0, wi = 0, phase = 0;
export const liveCalls = [];
function inboundCall() {
 const t = callPool[ci++ % callPool.length];
 const c = {...t, at:Date.now(), live:true, clock:now()};
 liveCalls.unshift(c);
 ping({type:'call', title:`Chiamata in arrivo · ${t.caller}`, text:'Otto sta rispondendo…', go:'centralino_ai', icon:'phone'}); emit();
 setTimeout(() => {
  c.live = false; calls.unshift({time:c.clock, caller:t.caller, outcome:'Prenotazione', text:t.text, reply:t.reply}); calls.length = Math.min(calls.length, 8);
  if (!t.time.startsWith('domani') && !bookings.some(b => b.name === t.caller)) bookings.push({time:t.time, name:t.caller, guests:t.guests, table:t.table, channel:'Centralino AI', note:'Presa da Otto ora'});
  log(`Centralino AI · prenotazione ${t.caller} (${t.guests}) ${t.time}`, 'sala');
  ping({type:'booking', title:'Prenotazione presa da Otto', text:`${t.caller} · ${t.guests} persone · ${t.time}`, go:'sala', icon:'calendar'}); emit();
 }, 5000);
}
function inboundReview() {
 const t = reviewPool[ri++ % reviewPool.length];
 reviews.unshift({...t, who:t.who + ' '.repeat(Math.floor((ri - 1) / reviewPool.length)), done:false});
 ping({type:'review', title:`Nuova recensione ${'★'.repeat(t.stars)} · ${t.source}`, text:'Otto ha già preparato la risposta', go:'recensioni_ai', icon:'star'}); emit();
}
function inboundWhatsapp() {
 const t = waPool[wi++ % waPool.length];
 log(`WhatsApp · ${t.who}: “${t.text}” → Otto ha risposto`, 'sala');
 ping({type:'wa', title:`WhatsApp · ${t.who}`, text:`“${t.text}” · Otto: ${t.reply}`, go:'whatsapp', icon:'message'}); emit();
}
function inboundSupplier() {
 const low = lowStock(); if (!low.length) return inboundWhatsapp();
 const i = low[0];
 log(`${i.supplier} conferma la consegna di ${i.name} per domattina`, 'magazzino');
 ping({type:'supplier', title:`Fornitore · ${i.supplier}`, text:`Consegna di ${i.name} confermata per domattina`, go:'magazzino', icon:'box'}); emit();
}
const inboundScript = [inboundCall, inboundWhatsapp, inboundReview, inboundCall, inboundSupplier, inboundWhatsapp];
// con la sfida avviata (service.game) gli avvisi arrivano dalle missioni
export function inboundTick() { if (!service.live || service.game) return; inboundScript[phase++ % inboundScript.length](); }

// ————— La cucina in modalità sfida —————
// Fuori dalla sfida la cucina va da sola. Nella sfida la guida il giocatore, con limiti veri:
// fornelli con un massimo di piatti insieme, tempi di cottura per piatto, un tempo per servire dal pass.
// Se le comande aspettano troppo o i piatti restano fermi al pass, la colonna va in rosso e si perdono punti.
// waitBonus: secondi in più comprati nella Bottega (i capitoli cambiano waitLimit, mai il bonus)
export const kitchen = {cap:4, passTime:45, waitLimit:70, waitBonus:0, speed:1, auto:{cook:false, pass:false, serve:false}, autoUntil:0, handedOver:false};
// I primi minuti della sfida la cucina va da sola; poi passa al giocatore, che può ricomprare gli automatismi.
export const AUTO_START = 300;
export const waitMax = () => kitchen.waitLimit + (kitchen.waitBonus || 0);
export const cookTime = d => Math.max(8, Math.round(d.prep * 2 * kitchen.speed)); // secondi
const findLine = id => { for (const t of tables) { const l = t.lines.find(x => x.id === id); if (l) return [t, l]; } return []; };
export const cookingNow = () => kitchenLines().filter(l => l.state === 'cooking');
export function startCooking(id) {
 const [t, l] = findLine(id);
 if (!l || l.state !== 'waiting' || cookingNow().length >= kitchen.cap) return false;
 l.state = 'cooking'; l.cookAt = Date.now();
 log(`${t.id} · ${dish(l.dish).name} sui fornelli`, 'cucina'); emit(); return true;
}
export function passLine(id) {
 const [t, l] = findLine(id);
 if (!l || l.state !== 'cooking' || !l.cooked) return false;
 l.state = 'ready'; l.readyAt = Date.now(); log(`${t.id} · ${dish(l.dish).name} al pass`, 'cucina'); emit(); return true;
}
export const autoOn = k => kitchen.auto[k] || Date.now() < kitchen.autoUntil;
export function serveLine(id) {
 const [t, l] = findLine(id);
 if (!l || l.state !== 'ready') return false;
 l.state = 'served'; log(`${t.id} · ${dish(l.dish).name} servito`, 'sala'); emit(); return true;
}
// All'inizio della sfida la cucina parte leggera: poche comande, che poi arrivano con il tempo.
export function kitchenGameStart() {
 service.game = true; Object.assign(kitchen, {cap:4, passTime:45, waitLimit:70, waitBonus:0, speed:1, auto:{cook:false, pass:false, serve:false}, autoUntil:Date.now() + AUTO_START * 1000, handedOver:false});
 const now = Date.now(), keep = {waiting:2, cooking:2, ready:1};
 for (const l of kitchenLines().sort((a, b) => a.at - b.at)) {
  const [, line] = findLine(l.id);
  if (keep[line.state] > 0) {
   keep[line.state]--;
   if (line.state === 'waiting') line.at = now;
   if (line.state === 'cooking') line.cookAt = now - cookTime(dish(line.dish)) * 500;
   if (line.state === 'ready') line.readyAt = now;
  } else line.state = 'served';
 }
 // la cucina parte con un po' di lavoro, anche se il servizio di prima l'aveva svuotata
 for (let n = kitchenLines().filter(l => l.state === 'waiting').length; n < 2; n++) { const t = gameTable(); const d = menu.filter(x => x.course > 0 && available(x))[Math.floor(Math.random() * 6)]; if (t && d) addDish(t.id, d.id, 1, true); }
 nextOrderAt = now + 8000; emit();
}
export function kitchenGameStop() { service.game = false; }
// Un tavolo che ordina: uno già seduto, oppure nuovi ospiti a un tavolo libero, così la cucina non resta mai a secco.
function gameTable() {
 const seated = tables.filter(x => ['seated', 'ordered'].includes(x.status) && !x.mission && x.lines.length < 7);
 const free = tables.filter(x => x.status === 'free');
 // con gli ospiti all'ingresso sono loro a riempire la sala: la cucina apre un tavolo da sola solo se la sala è vuota
 if (doorOn && seated.length) return seated[Math.floor(Math.random() * seated.length)];
 if (free.length && (seated.length < 4 || Math.random() < .3)) { const f = free[Math.floor(Math.random() * free.length)]; openTable(f.id, Math.min(f.seats, 2 + Math.floor(Math.random() * 3))); return f; }
 return seated[Math.floor(Math.random() * seated.length)] || null;
}
let nextOrderAt = 0;
// Un battito al secondo: la cottura finisce, le comande nuove arrivano, si controlla cosa è in rosso.
export function kitchenGameTick(level = 1) {
 if (!service.game) return {waiting:false, pass:false, handover:false};
 const now = Date.now(); let changed = false;
 for (const l of kitchenLines()) {
  const [t, line] = findLine(l.id);
  // cotto: con l'automatismo va al pass da solo, altrimenti aspetta sui fornelli che qualcuno lo porti
  if (line.state === 'cooking' && !line.cooked && now - (line.cookAt || now) >= cookTime(dish(line.dish)) * 1000) { line.cooked = true; line.cookedAt = now; changed = true; }
  if (line.state === 'cooking' && line.cooked && autoOn('pass')) { line.state = 'ready'; line.readyAt = now; log(`${t.id} · ${dish(line.dish).name} pronto al pass`, 'cucina'); changed = true; }
  else if (line.state === 'ready' && autoOn('serve') && now - (line.readyAt || now) > 6000) { line.state = 'served'; log(`${t.id} · ${dish(line.dish).name} servito`, 'sala'); changed = true; }
 }
 if (autoOn('cook')) for (const l of kitchenLines().filter(x => x.state === 'waiting').sort((a, b) => a.at - b.at)) { if (cookingNow().length >= kitchen.cap) break; const [, line] = findLine(l.id); line.state = 'cooking'; line.cookAt = now; changed = true; }
 // finiti i primi minuti, la cucina passa nelle mani del giocatore (una volta sola)
 let handover = false;
 if (!kitchen.handedOver && now >= kitchen.autoUntil) { kitchen.handedOver = true; handover = true; changed = true; }
 const waiting = kitchenLines().filter(l => l.state === 'waiting');
 if (now >= nextOrderAt && waiting.length < 3 + level * 2) {
  const gap = [[25, 40], [20, 32], [15, 25]][level - 1] || [25, 40];
  nextOrderAt = now + (gap[0] + Math.random() * (gap[1] - gap[0])) * 1000;
  const t = gameTable();
  const ds = menu.filter(d => d.course > 0 && available(d)).sort(() => Math.random() - .5).slice(0, 1 + (Math.random() < .35 ? 1 : 0));
  if (t) { ds.forEach(d => addDish(t.id, d.id, 1, true)); changed = true; }
 }
 if (changed) emit();
 const lines = kitchenLines();
 return {
  waiting:lines.some(l => l.state === 'waiting' && now - l.at > waitMax() * 1000),
  pass:lines.some(l => (l.state === 'ready' && now - (l.readyAt || now) > kitchen.passTime * 1000) || (l.state === 'cooking' && l.cooked && now - (l.cookedAt || now) > kitchen.passTime * 1000)),
  handover
 };
}

// ————— Le celle frigorifere (HACCP) —————
// Quattro celle con la sonda di temperatura. Nella sfida possono succedere guasti veri:
// porta rimasta aperta (sale in fretta), compressore guasto (sale piano: serve il tecnico),
// sonda scollegata (il valore non si muove più). Oltre la soglia la cella è fuori norma;
// molto oltre, la merce va buttata.
export const fridges = [
 {id:'F1', name:'Cella carni', base:2.2, max:4, holds:['manzo', 'guanciale']},
 {id:'F2', name:'Frigo latticini', base:3, max:4, holds:['burrata', 'mascarpone', 'pecorino', 'uova']},
 {id:'F3', name:'Frigo verdure', base:3.4, max:4, holds:['funghi', 'pomodoro']},
 {id:'F4', name:'Congelatore', base:-19.5, max:-18, holds:['pasta']}
].map(f => ({...f, temp:f.base, shown:f.base, state:'ok', since:0, faults:0, lost:false}));
export const fridgeCfg = {gap:[90, 150], repair:45, autoDoor:0, rate:1};
let nextFaultAt = 0;
export const fridge = id => fridges.find(f => f.id === id);
export const fridgeRed = f => f.state === 'sensor' ? Date.now() - f.since > 30000 : f.temp > f.max;
export function fridgeAction(id) {
 const f = fridge(id); if (!f) return null;
 const now = Date.now();
 if (f.state === 'door') { f.state = 'ok'; log(`${f.name}: porta chiusa`, 'magazzino'); }
 else if (f.state === 'fault') { f.state = 'repair'; f.repairUntil = now + fridgeCfg.repair * 1000; log(`${f.name}: tecnico chiamato, arriva in ${fridgeCfg.repair} s`, 'magazzino'); }
 else if (f.state === 'sensor') { f.state = 'ok'; f.shown = f.temp; log(`${f.name}: sonda ricollegata`, 'magazzino'); }
 else return null;
 emit(); return f;
}
export function fridgeGameStart() { fridges.forEach(f => Object.assign(f, {temp:f.base, shown:f.base, state:'ok', lost:false})); nextFaultAt = Date.now() + 75000; }
// Un battito al secondo, solo nella sfida.
export function fridgeTick() {
 if (!service.game) return {red:[], lost:[]};
 const now = Date.now(), lost = []; let changed = false;
 for (const f of fridges) {
  const rise = {door:.12, fault:.035, repair:.015}[f.state];
  if (rise) f.temp += rise * (f.max < 0 ? 1.5 : 1);
  else f.temp += (f.base - f.temp) * .06 + (Math.random() - .5) * .04;
  if (f.state === 'repair' && now >= f.repairUntil) { f.state = 'ok'; log(`${f.name}: riparato dal tecnico`, 'magazzino'); changed = true; }
  if (f.state === 'door' && fridgeCfg.autoDoor && now - f.since > fridgeCfg.autoDoor * 1000) { f.state = 'ok'; log(`${f.name}: l’allarme ha richiuso la porta`, 'magazzino'); changed = true; }
  if (f.state !== 'sensor') f.shown = f.temp;
  if (!f.lost && f.temp > f.max + 4) {
   f.lost = true; lost.push(f);
   f.holds.forEach(k => { const i = ingredient(k); if (i) { i.qty = +(i.qty * .5).toFixed(2); i.changed = now; } });
   log(`${f.name}: merce oltre i ${f.max + 4} °C, buttata metà`, 'magazzino'); changed = true;
  }
  if (f.lost && f.temp <= f.max) f.lost = false;
 }
 if (now >= nextFaultAt) {
  const [a, b] = fridgeCfg.gap; nextFaultAt = now + (a + Math.random() * (b - a)) * 1000 / fridgeCfg.rate;
  const f = fridges.filter(x => x.state === 'ok')[Math.floor(Math.random() * 4)];
  if (f) {
   f.state = ['door', 'door', 'fault', 'sensor'][Math.floor(Math.random() * 4)]; f.since = now; f.faults++;
   log(`${f.name}: ${f.state === 'door' ? 'porta rimasta aperta' : f.state === 'fault' ? 'il compressore non parte' : 'la sonda non risponde'}`, 'magazzino'); changed = true;
  }
 }
 if (changed) emit();
 return {red:fridges.filter(fridgeRed), lost};
}

// ————— Gli ospiti all'ingresso (Sala) —————
// Nella sfida arrivano persone senza prenotazione o in anticipo: aspettano alla porta finché qualcuno non le accomoda
// a un tavolo libero abbastanza grande. Dopo un po' l'attesa diventa rossa; se aspettano troppo, se ne vanno.
export const door = [];
// bonus e calm: comprati nella Bottega (secondi di pazienza in più, arrivi senza prenotazione in meno); i capitoli non li toccano
export const doorCfg = {gap:[55, 85], wait:60, leave:130, rate:1, bonus:0, calm:1};
let doorOn = false, nextDoorAt = 0, doorSeq = 0;
const doorNames = ['Famiglia Bianchi', 'Sig.ra Ferri', 'Coppia Moretti', 'Amici di Luca', 'Sig. Conti', 'Famiglia Esposito', 'Colleghi Arno Tech', 'Sig.ra Galli', 'Turisti da Lione', 'Famiglia Romano'];
export const doorWait = p => (Date.now() - p.at) / 1000;
export const doorRed = p => doorWait(p) > doorCfg.wait + doorCfg.bonus;
export const doorLeave = () => doorCfg.leave + doorCfg.bonus * 1.5;
export const fits = (t, p) => t.status === 'free' && t.seats >= p.n;
function arrive(n) {
 const p = {id:`G${++doorSeq}`, name:doorNames[Math.floor(Math.random() * doorNames.length)], n:n || [2, 2, 2, 3, 4, 4, 5, 6][Math.floor(Math.random() * 8)], at:Date.now()};
 door.push(p); log(`All'ingresso: ${p.name}, ${p.n} persone senza prenotazione`, 'sala'); emit(); return p;
}
export function doorGameStart() { doorOn = true; door.length = 0; Object.assign(doorCfg, {gap:[55, 85], wait:60, leave:130, rate:1, bonus:0, calm:1}); nextDoorAt = Date.now() + 50000; }
export function doorGameStop() { doorOn = false; door.length = 0; }
export function seatParty(pid, tid) {
 const i = door.findIndex(p => p.id === pid), t = table(tid);
 if (i < 0 || !t || !fits(t, door[i])) return null;
 const [p] = door.splice(i, 1); openTable(tid, p.n, p.name); return p;
}
export function doorTick(level = 1) {
 if (!doorOn) return {red:[], left:[]};
 const now = Date.now(), left = [];
 for (let i = door.length - 1; i >= 0; i--) if (doorWait(door[i]) > doorLeave()) { left.push(...door.splice(i, 1)); }
 if (left.length) { left.forEach(p => log(`${p.name} (${p.n} persone) se ne sono andati: troppa attesa all'ingresso`, 'sala')); emit(); }
 if (now >= nextDoorAt) {
  const gap = [doorCfg.gap, [45, 70], [35, 60]][level - 1] || doorCfg.gap;
  nextDoorAt = now + (gap[0] + Math.random() * (gap[1] - gap[0])) * 1000 / doorCfg.rate / doorCfg.calm;
  if (door.length < 1 + level) arrive();
 }
 return {red:door.filter(doorRed), left};
}
// Per le prove a mano: fa arrivare subito qualcuno all'ingresso.
export const doorArrive = n => doorOn ? arrive(n) : null;

// Il tempo passato a gioco fermo sposta anche i prossimi arrivi (comande, guasti, ospiti): al ritorno non arriva tutto insieme.
export function shiftClocks(ms) { nextOrderAt += ms; nextFaultAt += ms; nextDoorAt += ms; }
