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
 {id:'bruschetta', name:'Bruschetta al pomodoro', cat:'Antipasti', price:8, allergens:['Glutine'], recipe:{pane:.08, pomodoro:.06}, course:1},
 {id:'burrata', name:'Burrata e pomodorini', cat:'Antipasti', price:12, allergens:['Latte'], recipe:{burrata:1, pomodoro:.05}, course:1},
 {id:'carbonara', name:'Carbonara', cat:'Primi', price:14, allergens:['Glutine','Uova','Latte'], recipe:{pasta:.12, guanciale:.05, uova:2, pecorino:.03}, course:2},
 {id:'risotto', name:'Risotto ai porcini', cat:'Primi', price:16, allergens:['Latte'], recipe:{riso:.09, funghi:.07}, course:2},
 {id:'pici', name:'Pici al pomodoro', cat:'Primi', price:12, allergens:['Glutine'], recipe:{pasta:.13, pomodoro:.1}, course:2},
 {id:'tagliata', name:'Tagliata di manzo', cat:'Secondi', price:24, allergens:[], recipe:{manzo:.25}, course:3},
 {id:'tiramisu', name:'Tiramisù', cat:'Dolci', price:7, allergens:['Uova','Latte','Glutine'], recipe:{mascarpone:.08, uova:1}, course:4},
 {id:'chianti', name:'Chianti Classico (bt)', cat:'Vini', price:28, allergens:['Solfiti'], recipe:{vino:1}, course:0}
];
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

export const service = {revenue:0, covers:0, closed:[], events:[], live:true, nextLine:1, started:'19:00'};
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
export const available = d => Object.entries(d.recipe).every(([k, q]) => ingredient(k).qty >= q);
export const kitchenLines = () => tables.flatMap(t => t.lines.filter(l => l.state !== 'served' && dish(l.dish).course > 0).map(l => ({...l, table:t.id})));

export function openTable(id, guests, name='') {
 const t = table(id); if (t.status !== 'free') return;
 Object.assign(t, {status:'seated', guests, since:Date.now(), lines:[], name});
 service.covers += guests; log(`${id} · ${guests} ospiti accomodati${name ? ' (' + name + ')' : ''}`); emit();
}
export function addDish(id, dishId, qty=1, silent=false) {
 const t = table(id), d = dish(dishId);
 if (!t || !d) return false;
 if (!available(d)) { log(`${d.name} esaurito: ingredienti sotto il necessario`, 'magazzino'); emit(); return false; }
 if (t.status === 'free') openTable(id, Math.min(t.seats, 2));
 for (const [k, q] of Object.entries(d.recipe)) { const i = ingredient(k); i.qty = Math.max(0, +(i.qty - q * qty).toFixed(3)); i.changed = Date.now(); }
 const line = {id:'L' + service.nextLine++, dish:dishId, qty, state: d.course === 0 ? 'served' : 'waiting', at:Date.now()};
 t.lines.push(line); t.status = 'ordered';
 log(`${id} · ${qty}× ${d.name}${d.course === 0 ? '' : ' → cucina'}`, 'cucina');
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
export function closeBill(id, method='Carta') {
 const t = table(id); const total = tableTotal(t); if (!total) return 0;
 service.revenue += total; service.closed.unshift({table:id, total, guests:t.guests, method, time:now(), items:t.lines.reduce((n, l) => n + l.qty, 0)});
 log(`${id} · conto chiuso € ${total} (${method})`, 'cassa');
 Object.assign(t, {status:'free', guests:0, since:null, lines:[], name:''}); emit(); return total;
}
export function reorder(ids) {
 for (const id of ids) { const i = ingredient(id); i.qty = +(i.qty + i.min * 2).toFixed(2); i.alerted = false; i.changed = Date.now(); }
 log(`Ordine inviato ai fornitori: ${ids.map(id => ingredient(id).name).join(', ')}`, 'magazzino'); emit();
}
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
 service.events = [{time:now(), text:'Servizio avviato · 7 tavoli occupati', kind:'sala', at:0}];
}
seed();

// Servizio live: la cucina avanza e arrivano nuovi ordini.
export function tick() {
 if (!service.live) return;
 tidy();
 if (Math.random() < .25 && turnover()) return;
 const r = Math.random();
 const lines = kitchenLines();
 if (r < .5 && lines.length) { const l = lines.sort((a, b) => a.at - b.at).find(x => x.state !== 'ready') || lines[0]; advance(l.id); return; }
 if (r < .72) { const t = tables.filter(t => (t.status === 'seated' || t.status === 'ordered') && t.lines.length < 8)[Math.floor(Math.random() * 4)]; if (t) { const d = menu.filter(available)[Math.floor(Math.random() * menu.length)]; if (d) addDish(t.id, d.id); } return; }
 if (r < .82) { const ready = lines.find(x => x.state === 'ready'); if (ready) advance(ready.id); return; }
 const free = tables.filter(t => t.status === 'free'); if (free.length > 3) openTable(free[0].id, Math.min(free[0].seats, 2 + Math.floor(Math.random() * 2)));
}

// Il servizio si rigenera da solo, così la demo può girare per ore senza appesantirsi:
// chi ha finito chiede il conto e se ne va, il fornitore consegna, le liste hanno un tetto.
// T3 e T8 restano come sono perché la demo guidata ci passa sopra.
const guided = ['T3', 'T8'];
function turnover() {
 const paying = tables.find(t => t.status === 'bill' && !guided.includes(t.id) && Date.now() - (t.billAt || 0) > 25000);
 if (paying) { closeBill(paying.id, Math.random() < .7 ? 'Carta' : 'Contanti'); return true; }
 const finished = tables.find(t => t.status === 'ordered' && !guided.includes(t.id) && t.lines.length >= 4 && t.lines.every(l => l.state === 'served'));
 if (finished) { requestBill(finished.id); return true; }
 return false;
}
function tidy() {
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
export function inboundTick() { if (!service.live) return; inboundScript[phase++ % inboundScript.length](); }
