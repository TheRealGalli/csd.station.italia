// Studio live: eventi che arrivano a ciclo, come se lo studio fosse in funzione.
// Non c'è un modello dietro: ogni evento è una sceneggiatura realistica che passa da "in arrivo"
// a "letto da Otto" in pochi secondi. La forma degli eventi è quella che il backend dovrà emettere.
import * as D from './demo.js';

// awake: dentro il sito la demo resta ferma finché il visitatore non la apre (vedi app.js).
// game: con la sfida avviata il ciclo normale tace e le email arrivano dal regista delle missioni (missions.js).
export const live = {on:true, awake:window.parent === window, game:false, missions:[], feed:[]};
let listeners = [];
export const subscribe = fn => { listeners.push(fn); };
const emit = ev => listeners.forEach(fn => fn(ev));
const clock = () => new Intl.DateTimeFormat('it-IT', {hour:'2-digit', minute:'2-digit', timeZone:'Europe/Rome'}).format(new Date());
let seq = 0;
const uid = p => `${p}-live-${++seq}`;

const mailPool = [
 {from:'Avv. Federica Lorenzi', address:'studio@lorenzi.example', subject:'Rossi/Verdi – certificato di agibilità', practice:'P-184', priority:'media', assignee:'GM', kind:'Legale', attachments:['Agibilita_1998.pdf'],
  body:'Buongiorno, come promesso le trasmetto il certificato di agibilità. L’IBAN della sig.ra Verdi è indicato in calce.',
  understood:'Arrivato il certificato di agibilità (1998) e l’IBAN della venditrice: la pratica Rossi / Verdi non ha più documenti mancanti.',
  prepared:[{icon:'check', text:'Checklist completata: agibilità ✓'}, {icon:'file', text:'IBAN inserito nel modulo di erogazione', go:'studio:erogazione'}, {icon:'message', text:'Conferma di ricezione all’avvocato'}],
  draft:'Gentile Avvocato, ricevuto, grazie. La pratica è completa: ci vediamo venerdì alle 10:30.'},
 {from:'Banca Arno · Ufficio mutui', address:'mutui@bancaarno.example', subject:'Conferma ricezione modulo erogazione', practice:'P-184', priority:'bassa', assignee:'GM', kind:'Banca', attachments:[],
  body:'Confermiamo la ricezione del modulo. L’assegno circolare sarà disponibile in filiale giovedì.',
  understood:'La banca conferma il modulo: l’erogazione è pronta per giovedì. Nessuna azione richiesta.',
  prepared:[{icon:'calendar', text:'Nota in agenda: assegno disponibile giovedì'}, {icon:'message', text:'Aggiornamento WhatsApp al cliente Mario Rossi'}], draft:''},
 {from:'Studio Bertelli Commercialisti', address:'info@bertelli.example', subject:'Nuova richiesta: cessione quote Arcadia S.r.l.', practice:null, priority:'alta', assignee:'LB', kind:'Professionista', attachments:['Visura_Arcadia.pdf','Bozza_cessione.docx'],
  body:'Buongiorno, un nostro cliente vorrebbe cedere il 30% delle quote di Arcadia S.r.l. entro fine mese. Potete darci disponibilità?',
  understood:'Nuova pratica: cessione del 30% delle quote di Arcadia S.r.l., società già costituita nello studio (Rep. 12.475).',
  prepared:[{icon:'folder', text:'Pratica P-203 aperta e collegata ad Arcadia S.r.l.'}, {icon:'coins', text:'Preventivo cessione quote in bozza', go:'preventivi'}, {icon:'users', text:'Assegnata a Luca Benassi'}],
  draft:'Gentili colleghi, con piacere. Abbiamo disponibilità il 28 o il 30 ottobre. Vi inviamo l’elenco dei documenti e una stima dei costi.'},
 {from:'PEC · Conservatoria di Firenze', address:'pec@conservatoria.example', subject:'Nota di trascrizione – Rep. 12.466', practice:null, priority:'bassa', assignee:'PD', kind:'PEC', attachments:['Nota_trascrizione.pdf'],
  body:'Si trasmette la nota di trascrizione relativa all’atto Rep. 12.466.',
  understood:'Trascrizione dell’atto Rep. 12.466 eseguita. La voltura catastale risulterà nei prossimi giorni.',
  prepared:[{icon:'calendar', text:'Scadenziario aggiornato: trascrizione completata', go:'scadenze'}], draft:''},
 {from:'Giorgio Sarti', address:'giorgio.sarti@example.com', subject:'Donazione – documenti di mia figlia', practice:'P-195', priority:'media', assignee:'GM', kind:'Cliente', attachments:['CI_Elisa.jpg','CF_Elisa.jpg'],
  body:'Le mando i documenti di Elisa come richiesto. Confermo martedì alle 11.',
  understood:'Documenti della donataria ricevuti e firma confermata per martedì 27 alle 11:00.',
  prepared:[{icon:'calendar', text:'Firma fissata: martedì 27 · 11:00'}, {icon:'shield', text:'Identificazione di Elisa Sarti completata', go:'antiriciclaggio'}],
  draft:'Gentile Giorgio, ricevuto tutto. Vi aspettiamo martedì alle 11:00.'}
];
const callPool = [
 {caller:'Francesca Doni', kind:'Nuovo cliente', intent:'Successione del padre', duration:'3:20', outcome:'Appuntamento fissato',
  lines:[['caller','Buongiorno, è mancato mio padre e non so da dove cominciare per la casa.'],['agent','Mi dispiace molto. La aiuto io: per iniziare servono il certificato di morte e i dati dell’immobile.'],['caller','Posso venire in studio?'],['agent','Certo. Le propongo giovedì alle 16:00 con la dott.ssa Ferri. Le mando l’elenco dei documenti su WhatsApp.']],
  actions:['Appuntamento giovedì 16:00','Elenco documenti inviato su WhatsApp','Pratica P-204 aperta']},
 {caller:'Banca Arno · Ufficio mutui', kind:'Banca', intent:'Bozza d’atto', duration:'0:58', outcome:'Risposta data',
  lines:[['caller','Buongiorno, chiamo per la bozza della pratica Rossi.'],['agent','Numero verificato. La bozza è in revisione dal notaio e vi arriva entro mercoledì via PEC.']],
  actions:['Nota aggiunta alla pratica P-184']},
 {caller:'Marco Bellandi', kind:'Cliente', intent:'Stato della costituzione', duration:'1:40', outcome:'Risposta data',
  lines:[['caller','A che punto siamo con Lumen Tech?'],['agent','Lo statuto v3 è in revisione da Luca Benassi. Manca la dichiarazione sul titolare effettivo del socio Helix: gliela mando ora via email.']],
  actions:['Email con modulo titolare effettivo','Promemoria a Luca Benassi']}
];
const waPool = [
 {chat:'w1', text:'Buongiorno! Venerdì dobbiamo portare anche l’APE o ce l’avete voi?', draft:'Buongiorno Mario, l’APE ce l’abbiamo già noi. Venerdì portate solo un documento d’identità valido.'},
 {chat:'w3', text:'Martedì alle 11 va benissimo, grazie!', draft:'Perfetto Giorgio, confermato martedì 27 alle 11:00. Le mando un promemoria il giorno prima.'},
 {chat:'w4', text:'Ho trovato l’atto di provenienza, ve lo mando in foto', draft:'Grazie signora Moretti! Appena arriva la foto la aggiungo alla pratica e le dico se è sufficiente.'},
 {chat:'w2', text:'Bozza ricevuta, nessuna osservazione da parte nostra.', draft:'Grazie, procediamo con la stipula di venerdì alle 10:30.'}
];
const taskPool = [['t2','GM'], ['t9','SR'], ['t4','LB'], ['t3','GM'], ['t7','EF']];

const n = {mail:0, call:0, wa:0, task:0};
const pick = (pool, k) => pool[n[k]++ % pool.length];

function newMail() {
 const t = pick(mailPool, 'mail');
 const m = {...t, id:uid('m'), time:clock(), live:true, reading:true, at:Date.now()};
 D.mails.unshift(m);
 emit({type:'mail', title:`Nuova email · ${m.from}`, text:'Otto la sta leggendo…', go:'posta', icon:'inbox', ref:m.id});
 setTimeout(() => {
  m.reading = false;
  D.audit.unshift({time:clock(), actor:'Otto', action:`Letta email “${m.subject}” e preparate ${m.prepared.length} azioni`, approved:'—', area:'Posta'});
  emit({type:'mail-read', title:'Email letta da Otto', text:m.understood, go:'posta', icon:'sparkle', ref:m.id, quiet:true});
 }, 2600);
 return m;
}
// Un'email preparata dal regista delle missioni: arriva come le altre, Otto la legge e poi tocca a te.
export function spawnMail(t) {
 const m = {...t, id:uid('m'), time:clock(), live:true, reading:true, at:Date.now()};
 D.mails.unshift(m);
 emit({type:'mail', title:`Nuova email · ${m.from}`, text:'Otto la sta leggendo…', go:'posta', icon:'inbox', ref:m.id});
 setTimeout(() => { m.reading = false; emit({type:'mail-read', title:'Serve il tuo controllo', text:m.subject, go:'posta', icon:'alert', ref:m.id}); }, 2600);
 return m;
}
export function spawnChat(t) {
 const c = {id:uid('w'), who:t.who, practice:t.practice, channel:'WhatsApp', last:clock(), unread:1, messages:[{from:'client', text:t.text}], draft:'', live:true};
 D.chats.unshift(c);
 emit({type:'wa', title:`WhatsApp · ${c.who}`, text:t.text, go:'whatsapp', icon:'message', ref:c.id});
 return c;
}
export function spawnCall(t) {
 const c = {id:uid('c'), time:clock(), caller:t.caller, number:'+39 3•• •••• ' + (100 + seq * 7 % 900), kind:t.kind, duration:'in corso', outcome:'Serve il tuo aiuto', intent:t.intent, summary:t.first, reply:'', actions:[], lines:[['caller', t.first]], shown:1, live:false};
 D.calls.unshift(c);
 emit({type:'call', title:`Chiamata in arrivo · ${c.caller}`, text:'Otto ha bisogno di te per rispondere', go:'centralino', icon:'phone', ref:c.id});
 return c;
}
function newCall() {
 const t = pick(callPool, 'call');
 const c = {id:uid('c'), time:clock(), caller:t.caller, number:'+39 3•• •••• ' + (100 + seq * 7 % 900), kind:t.kind, duration:'in corso', outcome:'In corso', intent:t.intent, summary:t.lines[0][1], reply:'', actions:[], lines:t.lines, shown:1, live:true};
 D.calls.unshift(c);
 emit({type:'call', title:`Chiamata in arrivo · ${c.caller}`, text:'Otto sta rispondendo', go:'centralino', icon:'phone', ref:c.id});
 const step = () => {
  if (c.shown < c.lines.length) { c.shown++; emit({type:'call-line', quiet:true, ref:c.id}); setTimeout(step, 2200); return; }
  Object.assign(c, {duration:t.duration, outcome:t.outcome, reply:t.lines.filter(l => l[0] === 'agent').map(l => l[1]).join(' '), actions:t.actions, live:false});
  D.audit.unshift({time:clock(), actor:'Otto', action:`Gestita chiamata di ${c.caller}: ${t.outcome.toLowerCase()}`, approved:'Regole dello studio', area:'Centralino'});
  emit({type:'call-end', title:`Chiamata conclusa · ${c.caller}`, text:t.actions[0], go:'centralino', icon:'check', ref:c.id});
 };
 setTimeout(step, 2200);
}
function newWhatsapp() {
 const t = pick(waPool, 'wa');
 const chat = D.chats.find(c => c.id === t.chat); if (!chat) return;
 chat.messages.push({from:'client', text:t.text}); chat.unread = (chat.unread || 0) + 1; chat.last = clock(); chat.draft = ''; chat.thinking = true;
 D.chats.splice(D.chats.indexOf(chat), 1); D.chats.unshift(chat);
 emit({type:'wa', title:`WhatsApp · ${chat.who}`, text:t.text, go:'whatsapp', icon:'message', ref:chat.id});
 setTimeout(() => { chat.thinking = false; chat.draft = t.draft; emit({type:'wa-draft', quiet:true, ref:chat.id}); }, 2400);
}
function visuraDone() {
 const v = D.visure.find(x => x.status !== 'Completata');
 if (!v) return false;
 v.status = 'Completata'; v.time = clock(); v.level = 'info';
 v.finding = v.what.includes('Planimetria') ? 'Planimetria conforme allo stato dei luoghi descritto nella perizia. Nessuna difformità evidente.' : 'Due immobili intestati al de cuius: abitazione a Firenze e un garage a Sesto Fiorentino. Il garage non era nell’elenco della famiglia.';
 emit({type:'visura', title:`Visura completata · ${v.registry}`, text:v.finding, go:'visure', icon:'scan', ref:v.id});
 // una nuova richiesta parte in coda, così il ciclo continua
 setTimeout(() => D.visure.push({id:uid('v'), registry:'Ispezioni ipotecarie', what:'Ispezione per soggetto · Arcadia S.r.l.', practice:null, status:'In corso', time:clock(), finding:'', level:''}), 4000);
 return true;
}
const liveDone = new Set();
function taskDone() {
 const [id, who] = pick(taskPool, 'task');
 const t = D.tasks.find(x => x.id === id); if (!t) return false;
 if (t.done) {
  if (!liveDone.has(id)) return false;
  // giro completo: le attività chiuse dal ciclo tornano aperte senza far rumore
  liveDone.forEach(x => { D.tasks.find(y => y.id === x).done = false; }); liveDone.clear();
 }
 t.done = true; liveDone.add(id);
 emit({type:'task', title:`${D.person(who).name} ha completato un’attività`, text:t.text, go:'staff', icon:'check', ref:id});
 return true;
}

// Le liste hanno un tetto: la demo può girare per ore senza appesantirsi.
// Si tolgono solo gli elementi arrivati dal ciclo, mai i contenuti di partenza dello studio.
function trim(list, keep, done) {
 const extra = list.filter(x => x.id?.includes('-live-') && done(x)).sort((a, b) => a.id.split('-').pop() - b.id.split('-').pop());
 extra.slice(0, Math.max(0, extra.length - keep)).forEach(x => list.splice(list.indexOf(x), 1));
}
function tidy() {
 trim(D.mails, 6, m => !m.reading && !m.missionOpen);
 trim(D.calls, 4, c => !c.live && !c.missionOpen);
 trim(D.visure, 3, v => v.status === 'Completata');
 D.audit.length = Math.min(D.audit.length, 40);
 D.chats.forEach(c => { if (c.messages.length > 14) c.messages.splice(0, c.messages.length - 14); });
}

// Sceneggiatura a ciclo: ritmo variato, mai due eventi uguali di fila.
const script = [newMail, newWhatsapp, newCall, taskDone, newMail, visuraDone, newWhatsapp, newMail, taskDone, newCall];
let i = 0, timer;
const running = () => live.on && live.awake && !live.game && !document.body.classList.contains('touring') && !document.hidden;
function next() {
 timer = setTimeout(() => {
  if (running()) { tidy(); const fn = script[i++ % script.length]; if (fn() === false) script[(i) % script.length](); }
  next();
 }, 9000 + Math.random() * 7000);
}
export function startLive() {
 if (timer) return;
 timer = setTimeout(function first() { if (running()) { newMail(); next(); } else timer = setTimeout(first, 2000); }, 6000);
}
