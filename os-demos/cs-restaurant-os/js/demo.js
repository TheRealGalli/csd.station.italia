import {persona} from './persona.js';
import {service as SV} from './clock.js';
// Ristorante dimostrativo e motore del servizio. Locale, persone, piatti e numeri sono INVENTATI.
// Ogni azione passa da qui: un piatto ordinato entra nel conto, va in cucina e scala il magazzino.
// Nel prodotto reale gli stessi eventi arriveranno dal backend con la stessa forma.

export const restaurant = {name:'Osteria del Borgo', city:'Firenze', owner:persona.name};

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

// perk: un premio o uno sconto della card fedeltà già applicato al conto (Fidelity & NFC)
export const tableTotal = t => Math.max(0, t.lines.reduce((n, l) => n + dish(l.dish).price * l.qty, 0) - (t.perk?.amount || 0));
export const lowStock = () => ingredients.filter(i => i.qty <= i.min);
// Menu intelligente: quante porzioni restano davvero in magazzino, e se la cucina può reggere il piatto adesso.
export const portions = d => Math.min(...Object.entries(d.recipe).map(([k, q]) => Math.floor(ingredient(k).qty / q + 1e-9)));
export const available = d => d.visible && !d.paused && portions(d) >= 1;
export const kitchenLoad = () => kitchenLines().filter(l => l.state !== 'ready').length;
export const loadLimit = 24;
export const kitchenLines = () => tables.flatMap(t => t.lines.filter(l => l.state !== 'served' && dish(l.dish).course > 0).map(l => ({...l, table:t.id})));

export function openTable(id, guests, name='') {
 const t = table(id); if (t.status !== 'free') return;
 Object.assign(t, {status:'seated', guests, since:Date.now(), lines:[], name, perk:null});
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
export const tableDue = t => Math.max(0, t.lines.filter(l => !l.paid).reduce((n, l) => n + dish(l.dish).price * l.qty, 0) - (t.perk?.amount || 0));
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
 Object.assign(t, {status:'free', guests:0, since:null, lines:[], name:'', perk:null}); emit(); return total;
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
 tidy();
 if (!service.game) deliveryDemo(); // il riordino (elenchi corti, consegne del fornitore) gira sempre, anche nella sfida
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
export const invoices = [{n:'FT 2026/412', to:'Studio Marchetti', amount:620, state:'Da emettere'}, {n:'FT 2026/411', to:'Eventi Medici srl', amount:1840, state:'Inviata SDI'}, {n:'Acquisto', to:'Macelleria Bartolini', amount:412.5, state:'Ricevuta'}];
// Bandi di esempio, con quello che serve per decidere: quanto dà, su cosa, entro quando, e a che punto è la domanda.
export const grants = [
 {id:'energia', title:'Efficienza energetica delle cucine professionali', who:'Regione Toscana', deadline:'30 nov', days:42, fit:'Alta', pct:40, cap:30000, kind:'Fondo perduto', spend:'Abbattitori, cappe, forni e piani a induzione nuovi, classe energetica A o superiore', our:18600, state:'Documenti pronti 4/6', docs:[['Preventivo abbattitore Irinox', true], ['Preventivo cappa aspirante', true], ['Visura camerale', true], ['DURC in corso di validità', true], ['Diagnosi energetica', false], ['Dichiarazione de minimis', false]], note:'Il nuovo abbattitore e la cappa rientrano tra le spese ammissibili: contributo stimato **€ 7.440** (40% di € 18.600).'},
 {id:'digitale', title:'Voucher digitalizzazione PMI del turismo', who:'Camera di Commercio di Firenze', deadline:'15 dic', days:57, fit:'Media', pct:50, cap:10000, kind:'Voucher', spend:'Software gestionali, prenotazioni online, app e sito, formazione digitale', our:6200, state:'Da preparare', docs:[['Preventivo CS Restaurant OS', true], ['Visura camerale', true], ['DURC', true], ['Autodichiarazione aiuti ricevuti', false]], note:'Utile per **app del locale, menu digitale e delivery**: voucher stimato **€ 3.100** (50% di € 6.200).'},
 {id:'giovani', title:'Nuova impresa giovanile e femminile · ristorazione', who:'Invitalia (esempio)', deadline:'a sportello', days:null, fit:'Bassa', pct:0, cap:0, kind:'Finanziamento agevolato', spend:'Avvio di nuove imprese con meno di 36 mesi', our:0, state:'Non compatibile', docs:[], note:'Il locale è aperto dal 2019: **oltre i 36 mesi** richiesti. Lo tengo d’occhio per un eventuale secondo locale.'}
];
export const grantHistory = [{title:'Ristori per la ristorazione 2021', amount:4200, state:'Incassato'}, {title:'Credito d’imposta sanificazione 2020', amount:1150, state:'Compensato in F24'}];
export const staff = [{name:persona.name, role:'Titolare', shift:'18–24'}, {name:'Davide', role:'Chef', shift:'17–24'}, {name:'Sofia', role:'Sala', shift:'18:30–24'}, {name:'Karim', role:'Cucina', shift:'17–23'}, {name:'Elena', role:'Sala', shift:'19–24'}];
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
// la cucina è una sola: sui fornelli ci sono i piatti della sala e quelli del delivery in preparazione
export const cookingNow = () => [...kitchenLines().filter(l => l.state === 'cooking'), ...delivery.orders.filter(o => o.state === 'prep')];
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
export const doorCfg = {gap:[85, 125], wait:60, leave:130, rate:1, bonus:0, calm:1, autoSeat:false};
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
export function doorGameStart() { doorOn = true; door.length = 0; Object.assign(doorCfg, {gap:[85, 125], wait:60, leave:130, rate:1, bonus:0, calm:1, autoSeat:false}); nextDoorAt = Date.now() + 80000; }
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
  const gap = [doorCfg.gap, [70, 100], [55, 85]][level - 1] || doorCfg.gap;
  nextDoorAt = now + (gap[0] + Math.random() * (gap[1] - gap[0])) * 1000 / doorCfg.rate / doorCfg.calm;
  if (door.length < 1 + level) arrive();
 }
 // il maître (Bottega): dopo 20 secondi accomoda da solo al tavolo più piccolo che basta
 if (doorCfg.autoSeat) for (const p of [...door]) { if (doorWait(p) < 20) continue; const t = tables.filter(x => fits(x, p)).sort((a, b) => a.seats - b.seats)[0]; if (t) seatParty(p.id, t.id); }
 return {red:door.filter(doorRed), left};
}
// Per le prove a mano: fa arrivare subito qualcuno all'ingresso.
export const doorArrive = n => doorOn ? arrive(n) : null;

// Il tempo passato a gioco fermo sposta anche i prossimi arrivi (comande, guasti, ospiti): al ritorno non arriva tutto insieme.
export function shiftClocks(ms) { nextOrderAt += ms; nextFaultAt += ms; nextDoorAt += ms; deliveryShift(ms); nfcShift(ms); }


// ————— Fidelity & NFC —————
// La card NFC (o il telefono dell'ospite) si appoggia al lettore al tavolo: Otto riconosce l'ospite, somma i punti
// e propone il premio. Un punto per ogni euro. Il livello dipende dai punti degli ultimi 12 mesi, i premi si pagano con il saldo.
export const tiers = [
 {id:'bronzo', name:'Bronzo', from:0, off:0, perk:'1 punto ogni euro, auguri di compleanno'},
 {id:'argento', name:'Argento', from:500, off:5, perk:'Sconto 5% sul conto, prenotazione prioritaria'},
 {id:'oro', name:'Oro', from:1200, off:10, perk:'Sconto 10% sul conto, tavolo preferito, anteprime del menu'}
];
export const tierOf = m => [...tiers].reverse().find(t => (m.year ?? m.points) >= t.from);
export const nextTier = m => tiers.find(t => t.from > (m.year ?? m.points));
export const rewards = [
 {id:'caffe', name:'Caffè e amaro offerti', cost:150, value:5},
 {id:'dessert', name:'Dessert della casa offerto', cost:300, value:7},
 {id:'chianti', name:'Bottiglia di Chianti Classico', cost:800, value:28},
 {id:'cena', name:'Cena per due', cost:1500, value:70}
];
export const reward = id => rewards.find(r => r.id === id);
export const members = [
 {id:'M1', name:'Luca Pieri', uid:'04:3A:91:C2', points:340, year:1340, visits:14, last:'12 ott', fav:'Tagliata di manzo', allergy:'', wa:true, birthday:'3 novembre', since:'2022'},
 {id:'M2', name:'Anna Serra', uid:'04:7F:12:B8', points:120, year:420, visits:5, last:'28 set', fav:'Risotto ai porcini', allergy:'Celiaca', wa:true, birthday:'14 marzo', since:'2025'},
 {id:'M3', name:'Studio Marchetti', uid:'04:C1:5E:07', points:880, year:2650, visits:22, last:'2 ott', fav:'Chianti Classico', allergy:'', wa:false, birthday:'—', since:'2021', company:true},
 {id:'M4', name:'Giulia Fabbri', uid:'04:9B:44:1D', points:610, year:780, visits:9, last:'5 ott', fav:'Carbonara', allergy:'', wa:true, birthday:'27 ottobre', since:'2024'},
 {id:'M5', name:'Elena Guidi', uid:'04:12:E3:A0', points:1520, year:1610, visits:19, last:'1 ago', fav:'Tagliata di manzo', allergy:'Intollerante al lattosio', wa:true, birthday:'9 gennaio', since:'2020'},
 {id:'M6', name:'Paolo Neri', uid:'04:5D:70:3F', points:260, year:540, visits:7, last:'20 ago', fav:'Tiramisù', allergy:'', wa:false, birthday:'30 ottobre', since:'2023'},
 {id:'M7', name:'Tommaso Ricci', uid:'04:E8:2C:91', points:95, year:95, visits:2, last:'17 ott', fav:'Pici al pomodoro', allergy:'', wa:true, birthday:'2 luglio', since:'2026'},
 {id:'M8', name:'Sara Bellini', uid:'04:61:B7:58', points:45, year:180, visits:3, last:'9 lug', fav:'Bruschetta', allergy:'', wa:true, birthday:'21 ottobre', since:'2025'}
];
export const member = id => members.find(m => m.id === id);
// Il premio migliore che l'ospite può già prendere con il suo saldo (il più alto che raggiunge).
export const bestReward = m => [...rewards].reverse().find(r => m.points >= r.cost) || null;
// Gli ultimi tocchi al lettore, fuori dalla sfida: la storia della serata.
export const nfcLog = [
 {time:'20:52', who:'Giulia Fabbri', table:'T4', what:'Riconosciuta · livello Argento, sconto 5% applicato', pts:'+48'},
 {time:'20:31', who:'Luca Pieri', table:'T10', what:'Riconosciuto · anniversario, dessert offerto', pts:'−300'},
 {time:'20:05', who:'Tommaso Ricci', table:'T2', what:'Nuova card attivata al tavolo · consenso WhatsApp sì', pts:'+46'},
 {time:'19:48', who:'Studio Marchetti', table:'T9', what:'Riconosciuto · prenotazione per 8 alle 21:00', pts:''}
];
// Nella sfida: un ospite appoggia la card e aspetta. Chiede di usare un premio, oppure paga e si aspetta lo sconto del livello.
// La risposta giusta segue le regole del programma; se l'ospite aspetta troppo, il lettore va in rosso; troppo a lungo, rinuncia.
export const nfc = {taps:[], cfg:{gap:[75, 115], wait:40, leave:100, rate:1, auto:false, bonus:0}, on:false};
let nfcSeq = 0, nextTapAt = 0;
const tapNames = ['Chiara Lotti', 'Marco Sarti', 'Irene Doni', 'Franco Villa', 'Lucia Moretti', 'Stefano Pini', 'Laura Fontana', 'Davide Sacchi', 'Roberto Galli', 'Sara Carraresi'];
export const nfcWait = t => (Date.now() - t.at) / 1000;
export const nfcRed = t => nfc.on && nfcWait(t) > nfc.cfg.wait + nfc.cfg.bonus;
// la risposta giusta: 'reward:<id>', 'sconto' oppure 'punti'
export function nfcAnswer(tap) {
 const m = tap.m, r = tap.want && reward(tap.want);
 if (tap.ask === 'premio') return m.points >= r.cost ? `reward:${r.id}` : 'punti';
 return tierOf(m).off ? 'sconto' : 'punti';
}
export function nfcWhy(tap, choice) {
 const m = tap.m, r = tap.want && reward(tap.want), t = tierOf(m);
 if (tap.ask === 'premio') return m.points >= r.cost ? `${m.name} ha ${m.points} punti: “${r.name}” ne costa ${r.cost}, il premio spetta.` : `${m.name} ha ${m.points} punti e “${r.name}” ne costa ${r.cost}: mancano ${r.cost - m.points} punti. Si accumulano i punti di stasera.`;
 return t.off ? `${m.name} è di livello ${t.name}: sul conto spetta lo sconto del ${t.off}%.` : `${m.name} è di livello Bronzo: nessuno sconto, solo i punti del conto.`;
}
function tapArrive() {
 const t = tables.filter(x => ['seated', 'ordered'].includes(x.status) && x.lines.length && !x.perk && !x.mission && !nfc.taps.some(y => y.table === x.id))[Math.floor(Math.random() * 6)];
 if (!t) return null;
 const year = [120, 380, 640, 900, 1350, 1800][Math.floor(Math.random() * 6)];
 const ask = Math.random() < .55 ? 'premio' : 'conto', want = rewards[Math.floor(Math.random() * 3)];
 // il saldo è vicino al costo del premio chiesto: a volte basta, a volte no
 const points = ask === 'premio' ? Math.max(20, want.cost + (Math.random() < .55 ? 1 : -1) * (10 + Math.floor(Math.random() * 140))) : 40 + Math.floor(Math.random() * 900);
 const m = {id:`X${++nfcSeq}`, name:tapNames[Math.floor(Math.random() * tapNames.length)], points, year:Math.max(year, ask === 'premio' ? 0 : 0), visits:2 + Math.floor(Math.random() * 18)};
 const tap = {id:`N${nfcSeq}`, table:t.id, m, ask, want:ask === 'premio' ? want.id : null, at:Date.now()};
 nfc.taps.push(tap); log(`${t.id} · card fedeltà appoggiata: ${m.name}`, 'sala'); emit(); return tap;
}
// Applica la scelta: premio (sconto pari al suo valore), sconto del livello o solo punti. Ritorna il tap chiuso.
export function nfcResolve(id, choice) {
 const i = nfc.taps.findIndex(x => x.id === id); if (i < 0) return null;
 const [tap] = nfc.taps.splice(i, 1), t = table(tap.table), m = tap.m;
 if (t && t.status !== 'free') {
  if (choice.startsWith('reward:')) { const r = reward(choice.slice(7)); m.points -= r.cost; t.perk = {label:r.name, amount:Math.min(r.value, tableTotal(t)), who:m.name}; }
  else if (choice === 'sconto') { const off = tierOf(m).off; t.perk = {label:`Sconto ${tierOf(m).name} ${off}%`, amount:+(tableTotal(t) * off / 100).toFixed(2), who:m.name}; }
  else m.points += Math.round(tableTotal(t));
 }
 nfcLog.unshift({time:now(), who:m.name, table:tap.table, what:choice === 'punti' ? 'Punti accumulati sul conto' : t?.perk?.label || '', pts:''}); nfcLog.length = Math.min(nfcLog.length, 8);
 log(`${tap.table} · fidelity: ${m.name}, ${choice === 'punti' ? 'punti accumulati' : t?.perk?.label}`, 'cassa'); emit(); return tap;
}
export function nfcGameStart() { nfc.on = true; nfc.taps.length = 0; Object.assign(nfc.cfg, {gap:[75, 115], wait:40, leave:100, rate:1, auto:false, bonus:0}); nextTapAt = Date.now() + 20000; }
export function nfcGameStop() { nfc.on = false; nfc.taps.length = 0; }
export function nfcTick(level = 1) {
 if (!nfc.on) return {red:[], left:[]};
 const now = Date.now(), left = [];
 for (let i = nfc.taps.length - 1; i >= 0; i--) if (nfcWait(nfc.taps[i]) > nfc.cfg.leave + nfc.cfg.bonus * 1.5) left.push(...nfc.taps.splice(i, 1));
 if (left.length) { left.forEach(x => log(`${x.table} · ${x.m.name} ha rinunciato al premio: nessuno ha letto la card`, 'sala')); emit(); }
 // la cassa automatica (Bottega) applica da sola la regola giusta dopo 10 secondi
 if (nfc.cfg.auto) for (const x of [...nfc.taps]) if (nfcWait(x) > 10) nfcResolve(x.id, nfcAnswer(x));
 if (now >= nextTapAt) {
  const gap = [nfc.cfg.gap, [65, 100], [50, 85]][level - 1] || nfc.cfg.gap;
  nextTapAt = now + (gap[0] + Math.random() * (gap[1] - gap[0])) * 1000 / nfc.cfg.rate;
  if (nfc.taps.length < level) tapArrive();
 }
 return {red:nfc.taps.filter(nfcRed), left};
}
export const nfcArrive = () => nfc.on ? tapArrive() : null;
export const nfcShift = ms => { nextTapAt += ms; nfc.taps.forEach(t => { t.at = Math.min(t.at + ms, Date.now()); }); };
// Campagne WhatsApp ai soli iscritti alla fidelity che hanno dato il consenso.
export const segments = [
 {id:'oro', name:'Livello Oro', test:m => tierOf(m).id === 'oro'},
 {id:'lontani', name:'Non vengono da 60 giorni', test:m => ['1 ago', '20 ago', '9 lug'].includes(m.last)},
 {id:'compleanno', name:'Compleanno nei prossimi 30 giorni', test:m => /ottobre|novembre/.test(m.birthday)},
 {id:'premio', name:'Hanno un premio da usare', test:m => !!bestReward(m)}
];

// ————— L'app del locale (Brand & app) —————
// Non è il menu QR: è l'app con il nome e i colori del locale, sugli store, che l'ospite tiene sul telefono.
export const appCfg = {
 name:'Osteria del Borgo', short:'OdB', theme:'bosco', tab:'home',
 themes:{bosco:{name:'Bosco', bg:'#1d2b20', ink:'#c5f476'}, vino:{name:'Vino', bg:'#4a1f2a', ink:'#f2c879'}, terra:{name:'Terra', bg:'#5b3a24', ink:'#ffd8a8'}, notte:{name:'Notte', bg:'#17233b', ink:'#9fd3ff'}},
 blocks:[
  {id:'prenota', name:'Prenota un tavolo', note:'Collegata alla sala: solo orari e tavoli liberi', on:true},
  {id:'menu', name:'Menu e allergeni', note:'Lo stesso menu del QR, sempre aggiornato', on:true},
  {id:'card', name:'Card fedeltà digitale', note:'Punti, livello e premi nel telefono, anche senza card fisica', on:true},
  {id:'delivery', name:'Ordina a domicilio', note:'Ordini senza commissioni delle piattaforme', on:true},
  {id:'eventi', name:'Serate ed eventi', note:'Degustazioni, menu speciali, prevendite', on:false}
 ],
 store:[['App Store', 'Pubblicata · v2.4', 'ok'], ['Google Play', 'Pubblicata · v2.4', 'ok'], ['Versione 2.5', 'In revisione Apple · aggiunge “Ordina a domicilio”', 'wait']],
 stats:{downloads:1284, active:612, bookings:96, orders:41},
 booking:{maxOnline:8, last:'22:15', deposit:6, depositAmount:10, advance:'2 ore'},
 hours:[['Lunedì', 'chiuso'], ['Mar – Ven', '12:30–14:30 · 19:30–23:00'], ['Sabato', '19:30–23:30'], ['Domenica', '12:30–15:00']],
 pushes:[
  {title:'Arrivano i porcini 🍄', text:'Da stasera risotto e tagliatelle ai porcini del Mugello. Prenota dall’app.', seg:'Tutti gli iscritti', sent:1102, open:38, when:'12 ott'},
  {title:'Ti mancano 40 punti', text:'Alla prossima cena il dessert è offerto da noi.', seg:'Vicini a un premio', sent:86, open:61, when:'8 ott'},
  {title:'Serata vini toscani', text:'Giovedì 24, quattro calici e quattro assaggi a 35 €.', seg:'Livello Oro e Argento', sent:214, open:52, when:'1 ott'}
 ],
 draft:{title:'Il tartufo è arrivato', text:'Da venerdì tagliolini al tartufo bianco di San Miniato. Prenota dall’app.', seg:'Tutti gli iscritti'}
};

// ————— Delivery multicanale —————
// Glovo, Deliveroo, Just Eat e il sito del locale in un solo tablet: ordini unificati, tempi, rider, commissioni,
// menu solo per il delivery e pausa dei canali quando la cucina è piena. Commissioni di esempio.
export const channels = [
 {id:'glovo', name:'Glovo', short:'GL', fee:30, on:true, bg:'#ffc244', ink:'#3d3000', orders:9, gross:286, prep:20, until:0},
 {id:'deliveroo', name:'Deliveroo', short:'DR', fee:32, on:true, bg:'#00ccbc', ink:'#003b36', orders:6, gross:214, prep:20, until:0},
 {id:'justeat', name:'Just Eat', short:'JE', fee:25, on:true, bg:'#ff8000', ink:'#fff', orders:4, gross:131, prep:25, until:0},
 {id:'own', name:'Sito e app del locale', short:'OdB', fee:0, rider:3.5, on:true, bg:'#1d2b20', ink:'#c5f476', orders:5, gross:168, prep:25, until:0}
];
export const channel = id => channels.find(c => c.id === id);
// Il menu del delivery: non tutto viaggia bene, e i prezzi coprono la scatola e parte della commissione.
export const deliveryMenu = [
 {id:'carbonara', on:true, price:15, travels:true, note:'Uova legate a fuoco basso: tiene 25 minuti'},
 {id:'pici', on:true, price:13, travels:true, note:'Sugo a parte, si condisce all’ultimo'},
 {id:'risotto', on:false, price:17, travels:false, note:'Scuoce in 15 minuti: resta solo in sala'},
 {id:'burrata', on:true, price:13, travels:true, note:'Nel box freddo, separato dai caldi'},
 {id:'bruschetta', on:false, price:9, travels:false, note:'Il pane si ammorbidisce nel box'},
 {id:'tagliata', on:true, price:26, travels:true, note:'Cotta media, rucola e grana a parte'},
 {id:'tiramisu', on:true, price:7.5, travels:true, note:'In vasetto chiuso'},
 {id:'chianti', on:true, price:26, travels:true, note:'Solo maggiorenni: documento alla consegna'}
];
export const dmenu = id => deliveryMenu.find(x => x.id === id);
export const delivery = {orders:[], cfg:{gap:[70, 110], accept:35, patience:50, rate:1, autoAccept:false, autoHand:false, bonus:0}, on:false, seq:4820};
const riders = ['Ahmed', 'Yuki', 'Samir', 'Giorgia', 'Ivan', 'Matteo', 'Fatima', 'Kevin'];
const dWho = ['Marco R.', 'Chiara B.', 'Ufficio Arno Tech', 'Davide L.', 'Irene P.', 'Famiglia Conti', 'Sara M.', 'Tommaso G.', 'Elisa F.', 'Luca D.'];
const zones = [['Campo di Marte', 2.1], ['Santo Spirito', 1.4], ['Novoli', 4.2], ['Gavinana', 3.3], ['Rifredi', 3.8], ['Sant’Ambrogio', .9], ['Coverciano', 4.6]];
export const dPrep = o => Math.round((18 + 6 * o.items.reduce((n, [, q]) => n + q, 0)) * kitchen.speed); // secondi nella sfida
export const dTotal = o => o.items.reduce((n, [id, q]) => n + dmenu(id).price * q, 0);
export const dWait = o => (Date.now() - o.at) / 1000;
// il rider è arrivato e aspetta da… (secondi), 0 se non è ancora arrivato
export const riderWait = o => Math.max(0, (Date.now() - o.riderAt) / 1000);
export const dRed = o => delivery.on && ((o.state === 'new' && dWait(o) > delivery.cfg.accept) || (o.state !== 'picked' && riderWait(o) > 12));
export const dActive = () => delivery.orders.filter(o => ['new', 'prep', 'ready'].includes(o.state));
function newOrder(opts = {}) {
 const on = channels.filter(c => c.on && (!c.until || Date.now() > c.until));
 if (!on.length) return null;
 const ch = opts.ch ? channel(opts.ch) : on[Math.floor(Math.random() * on.length)];
 const menuOn = deliveryMenu.filter(x => x.on && available(dish(x.id)));
 if (!menuOn.length) return null;
 const n = 1 + Math.floor(Math.random() * 3), items = [];
 for (let k = 0; k < n; k++) { const x = menuOn[Math.floor(Math.random() * menuOn.length)], e = items.find(y => y[0] === x.id); if (e) e[1]++; else items.push([x.id, 1]); }
 const z = zones[Math.floor(Math.random() * zones.length)], at = opts.at || Date.now();
 const o = {id:`D${++delivery.seq}`, code:`${ch.short}-${delivery.seq}`, ch:ch.id, who:dWho[Math.floor(Math.random() * dWho.length)], zone:z[0], km:z[1], items, state:'new', at, rider:ch.id === 'own' ? 'Matteo · rider del locale' : riders[Math.floor(Math.random() * riders.length)]};
 o.prep = dPrep(o);
 // il rider arriva quando l'ordine dovrebbe essere pronto, se accettato in tempo, più qualche secondo
 o.riderAt = at + (delivery.cfg.accept * .5 + o.prep + 12 + Math.random() * 20) * 1000;
 delivery.orders.unshift(o);
 log(`Delivery · nuovo ordine ${ch.name} ${o.code}: ${o.items.map(([id, q]) => `${q}× ${dish(id).name}`).join(', ')}`, 'cucina');
 return o;
}
export function acceptOrder(id) {
 const o = delivery.orders.find(x => x.id === id); if (!o || o.state !== 'new') return false;
 o.state = 'prep'; o.prepAt = Date.now();
 for (const [dId, q] of o.items) for (const [k, qq] of Object.entries(dish(dId).recipe)) { const i = ingredient(k); i.qty = Math.max(0, +(i.qty - qq * q).toFixed(3)); i.changed = Date.now(); }
 log(`Delivery · ${o.code} accettato, in preparazione`, 'cucina'); emit(); return true;
}
export function handOrder(id) {
 const o = delivery.orders.find(x => x.id === id); if (!o || o.state !== 'ready' || Date.now() < o.riderAt) return false;
 o.state = 'picked'; o.pickedAt = Date.now();
 const ch = channel(o.ch), tot = dTotal(o); ch.orders++; ch.gross += tot;
 // il delivery incassa dalla piattaforma: anche qui ogni vendita ha il suo documento commerciale
 pay('DLV', tot, ch.id === 'own' ? 'Stripe · app del locale' : `Bonifico ${ch.name}`, `Delivery ${o.code}`);
 log(`Delivery · ${o.code} ritirato da ${o.rider}`, 'cassa'); emit(); return true;
}
export function pauseChannel(id, sec = 0) {
 const c = channel(id); if (!c) return;
 if (sec) { c.until = Date.now() + sec * 1000; c.on = true; }
 else { c.on = !c.on; c.until = 0; }
 log(`Delivery · ${c.name} ${c.until || !c.on ? 'in pausa' : 'di nuovo attivo'}`, 'cucina'); emit();
}
export const chPaused = c => !c.on || (c.until && Date.now() < c.until);
// Fuori dalla sfida il tablet accetta da solo e il banco consegna: il flusso gira come in un servizio vero.
function deliveryDemo() {
 const now = Date.now(); let changed = false;
 for (const o of delivery.orders) {
  if (o.state === 'new' && now - o.at > 6000) { o.state = 'prep'; o.prepAt = now; changed = true; }
  else if (o.state === 'prep' && now - o.prepAt > o.prep * 1000) { o.state = 'ready'; o.readyAt = now; changed = true; }
  else if (o.state === 'ready' && now > o.riderAt) { handOrder(o.id); changed = true; }
 }
 if (dActive().length < 4 && Math.random() < .3 && newOrder()) changed = true;
 trimOrders();
 if (changed) emit();
}
const trimOrders = () => { const old = delivery.orders.filter(o => ['picked', 'lost'].includes(o.state)); old.slice(5).forEach(o => delivery.orders.splice(delivery.orders.indexOf(o), 1)); };
let nextDlvAt = 0;
export function deliveryGameStart() {
 delivery.on = true; delivery.orders.length = 0; channels.forEach(c => { c.on = true; c.until = 0; });
 Object.assign(delivery.cfg, {gap:[70, 110], accept:35, patience:50, rate:1, autoAccept:false, autoHand:false, bonus:0});
 nextDlvAt = Date.now() + 15000;
}
export function deliveryGameStop() { delivery.on = false; }
// Un battito al secondo nella sfida: arrivano gli ordini, finisce la preparazione, arrivano e ripartono i rider.
export function deliveryTick(level = 1) {
 if (!delivery.on) return {red:[], lost:[]};
 const now = Date.now(), lost = []; let changed = false;
 for (const o of delivery.orders) {
  if (o.state === 'new' && delivery.cfg.autoAccept && now - o.at > 8000) { acceptOrder(o.id); changed = true; }
  if (o.state === 'prep' && now - o.prepAt > o.prep * 1000) { o.state = 'ready'; o.readyAt = now; log(`Delivery · ${o.code} pronto da imbustare`, 'cucina'); changed = true; }
  if (o.state === 'ready' && delivery.cfg.autoHand && now > o.riderAt + 4000) { handOrder(o.id); changed = true; }
  // il rider non aspetta all'infinito: se riparte senza l'ordine, la piattaforma lo annulla
  if (['new', 'prep', 'ready'].includes(o.state) && riderWait(o) > delivery.cfg.patience + delivery.cfg.bonus) { o.state = 'lost'; lost.push(o); log(`Delivery · ${o.code} annullato: il rider è ripartito senza l’ordine`, 'cucina'); changed = true; }
 }
 if (now >= nextDlvAt) {
  const gap = [delivery.cfg.gap, [60, 95], [45, 75]][level - 1] || delivery.cfg.gap;
  nextDlvAt = now + (gap[0] + Math.random() * (gap[1] - gap[0])) * 1000 / delivery.cfg.rate;
  if (dActive().length < 1 + level && newOrder()) changed = true;
 }
 // finita la pausa a tempo, il canale riapre da solo
 channels.forEach(c => { if (c.until && now > c.until) { c.until = 0; log(`Delivery · ${c.name} di nuovo attivo`, 'cucina'); changed = true; } });
 trimOrders();
 if (changed) emit();
 return {red:delivery.orders.filter(o => ['new', 'prep', 'ready'].includes(o.state) && dRed(o)), lost};
}
export const deliveryArrive = ch => delivery.on ? (newOrder({ch}) && (emit(), delivery.orders[0])) : null;
export const deliveryShift = ms => { nextDlvAt += ms; delivery.orders.forEach(o => { ['at', 'prepAt', 'readyAt'].forEach(k => { if (o[k]) o[k] = Math.min(o[k] + ms, Date.now()); }); if (o.state !== 'picked' && o.state !== 'lost') o.riderAt += ms; }); channels.forEach(c => { if (c.until) c.until += ms; }); };
// Stato iniziale del tablet: qualche ordine già in corsa, uno appena arrivato.
(function seedDelivery() {
 const now = Date.now();
 [[-260, 'picked'], [-200, 'picked'], [-90, 'ready'], [-40, 'prep'], [-3, 'new']].forEach(([s, st]) => {
  const o = newOrder({at:now + s * 1000}); if (!o) return;
  o.state = st; o.prepAt = o.at + 5000; if (st === 'picked') o.pickedAt = o.riderAt;
  if (st === 'ready') o.readyAt = now - 10000;
 });
 service.events = service.events.filter(e => !e.text.startsWith('Delivery'));
})();
