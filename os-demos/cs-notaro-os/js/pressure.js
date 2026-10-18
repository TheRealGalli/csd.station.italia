// Le sezioni vive dello studio nella sfida: hanno una capienza e un tempo, e se le trascuri vanno in rosso.
//  · Posta: ogni email ha un tempo di risposta dello studio; oltre, è in ritardo.
//  · Adempimenti post-stipula: gli atti firmati generano adempimenti con scadenza di legge;
//    l'addetto ne lavora pochi alla volta e ognuno richiede tempo. Vicino alla scadenza e non avviato = rosso;
//    scaduto = sanzione.
import * as D from './demo.js';
import {gameMail} from './live.js';

export const studioCfg = {mailSla:120, cap:2, work:25, rate:1};
export const filings = [];
let seq = 0, nextFilingAt = 0, nextMailAt = 0, on = false;
const clock = () => new Intl.DateTimeFormat('it-IT', {hour:'2-digit', minute:'2-digit', timeZone:'Europe/Rome'}).format(new Date());
const kinds = [
 ['Registrazione', 'Agenzia delle Entrate', 'Compravendita'],
 ['Trascrizione', 'Conservatoria', 'Compravendita'],
 ['Voltura catastale', 'Catasto', 'Donazione'],
 ['Deposito al Registro Imprese', 'Camera di Commercio', 'Costituzione S.r.l.'],
 ['Annotazione di cancellazione ipoteca', 'Conservatoria', 'Mutuo'],
 ['Copia esecutiva alla banca', 'Banca', 'Mutuo']
];
const names = ['Lenzi', 'Ricasoli', 'Galeotti', 'Pieri', 'Arcadia S.r.l.', 'Marchetti', 'Serra', 'Bandini', 'Fabbri', 'Orlandi'];

export const mailAge = m => (Date.now() - (m.slaFrom || m.at || Date.now())) / 1000;
// contano solo le email arrivate durante la sfida: quelle già in casella all'inizio non fanno perdere punti
export const mailLate = (m, handled) => on && !m.old && !handled && !m.reading && !m.missionOpen && mailAge(m) > studioCfg.mailSla;
export const filingLeft = f => f.due - (Date.now() - f.created) / 1000;
export const doingNow = () => filings.filter(f => f.state === 'doing');
export const filingRed = f => f.state === 'todo' && filingLeft(f) < 45;

function newFiling(due) {
 const [what, office, act] = kinds[Math.floor(Math.random() * kinds.length)];
 const f = {id:`ad${++seq}`, what, office, act:`Rep. ${12480 + seq} · ${act} ${names[Math.floor(Math.random() * names.length)]}`, due:due || 150 + Math.random() * 90, created:Date.now(), state:'todo', time:clock()};
 filings.unshift(f); return f;
}
export function studioGameStart(handled) {
 on = true; Object.assign(studioCfg, {mailSla:120, cap:2, work:25, rate:1});
 filings.length = 0; newFiling(200); newFiling(260);
 // le email già in casella all'inizio non hanno tempo di risposta: lo hanno solo quelle che arrivano dopo
 D.mails.forEach(m => { m.old = true; });
 nextFilingAt = Date.now() + 70000; nextMailAt = Date.now() + 45000;
}
export function studioGameStop() { on = false; }
export function startFiling(id) {
 const f = filings.find(x => x.id === id);
 if (!f || f.state !== 'todo' || doingNow().length >= studioCfg.cap) return false;
 f.state = 'doing'; f.doneAt = Date.now() + studioCfg.work * 1000; return true;
}
// Un battito al secondo: lavori finiti, nuovi atti firmati, scadenze.
export function studioTick(level = 1, handled = []) {
 if (!on) return {late:[], red:[], expired:[], done:[], changed:false};
 const now = Date.now(), done = [], expired = []; let changed = false;
 for (const f of filings) {
  if (f.state === 'doing' && now >= f.doneAt) { f.state = 'done'; f.doneTime = clock(); done.push(f); changed = true; }
  if (f.state === 'todo' && filingLeft(f) <= 0) { f.state = 'expired'; expired.push(f); changed = true; }
 }
 if (now >= nextFilingAt && filings.filter(f => f.state === 'todo').length < 2 + level) {
  const gap = [[70, 100], [50, 80], [40, 65]][level - 1] || [70, 100];
  nextFilingAt = now + (gap[0] + Math.random() * (gap[1] - gap[0])) * 1000 / studioCfg.rate;
  newFiling(); changed = true;
 }
 // un'email nuova ogni minuto e mezzo circa: si approva in Posta prima che scada il tempo di risposta
 if (now >= nextMailAt) {
  const gap = [[80, 120], [60, 95], [45, 75]][level - 1] || [80, 120];
  nextMailAt = now + (gap[0] + Math.random() * (gap[1] - gap[0])) * 1000 / studioCfg.rate;
  if (D.mails.filter(m => !m.old && !handled.includes(m.id) && !m.missionOpen).length < 2 + level) { gameMail(); changed = true; }
 }
 // le pratiche chiuse escono dall'elenco dopo un po'
 for (let i = filings.length - 1; i >= 0; i--) if (['done', 'expired'].includes(filings[i].state) && filings.length > 6) { filings.splice(i, 1); changed = true; break; }
 return {late:D.mails.filter(m => mailLate(m, handled.includes(m.id))), red:filings.filter(filingRed), expired, done, changed};
}
