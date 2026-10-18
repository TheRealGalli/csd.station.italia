// Le sezioni vive dello studio nella sfida: hanno una capienza e un tempo, e se le trascuri vanno in rosso.
//  · Posta: ogni email ha un tempo di risposta dello studio; oltre, è in ritardo.
//  · Adempimenti post-stipula: gli atti firmati generano adempimenti con scadenza di legge;
//    l'addetto ne lavora pochi alla volta e ognuno richiede tempo. Vicino alla scadenza e non avviato = rosso;
//    scaduto = sanzione.
import * as D from './demo.js';
import {gameMail} from './live.js';

// slaBonus: secondi comprati nella Bottega (i capitoli cambiano mailSla, mai il bonus)
export const studioCfg = {mailSla:120, slaBonus:0, cap:2, work:25, rate:1};
export const slaMax = () => studioCfg.mailSla + studioCfg.slaBonus;
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
export const mailLate = (m, handled) => on && !m.old && !handled && !m.reading && !m.missionOpen && mailAge(m) > slaMax();
export const filingLeft = f => f.due - (Date.now() - f.created) / 1000;
export const doingNow = () => filings.filter(f => f.state === 'doing');
export const filingRed = f => f.state === 'todo' && filingLeft(f) < 45;

function newFiling(due) {
 const [what, office, act] = kinds[Math.floor(Math.random() * kinds.length)];
 const f = {id:`ad${++seq}`, what, office, act:`Rep. ${12480 + seq} · ${act} ${names[Math.floor(Math.random() * names.length)]}`, due:due || 150 + Math.random() * 90, created:Date.now(), state:'todo', time:clock()};
 filings.unshift(f); return f;
}
export function studioGameStart(handled) {
 on = true; Object.assign(studioCfg, {mailSla:120, slaBonus:0, cap:2, work:25, rate:1}); rooms.splice(3);
 filings.length = 0; newFiling(200); newFiling(260);
 // le email già in casella all'inizio non hanno tempo di risposta: lo hanno solo quelle che arrivano dopo
 D.mails.forEach(m => { m.old = true; });
 nextFilingAt = Date.now() + 70000; nextMailAt = Date.now() + 45000;
 lobby.length = 0; rooms.forEach(r => { r.until = 0; r.with = null; }); Object.assign(lobbyCfg, {wait:60, leave:150, rate:1, bonus:0}); nextGuestAt = Date.now() + 60000;
}
export function studioGameStop() { on = false; lobby.length = 0; rooms.forEach(r => { r.until = 0; r.with = null; }); }
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
 // sala d'attesa: chi aspetta troppo se ne va; le sale si liberano a fine appuntamento (e un atto firmato porta il suo adempimento)
 const left = [], met = [];
 for (let i = lobby.length - 1; i >= 0; i--) if (lobbyWait(lobby[i]) > lobbyLeave()) { left.push(...lobby.splice(i, 1)); changed = true; }
 for (const r of rooms) if (r.with && now >= r.until) { met.push({...r.with, room:r.name}); if (r.with.files) newFiling(); r.with = null; r.until = 0; changed = true; }
 if (now >= nextGuestAt) {
  const gap = [[60, 95], [50, 80], [40, 65]][level - 1] || [60, 95];
  nextGuestAt = now + (gap[0] + Math.random() * (gap[1] - gap[0])) * 1000 / lobbyCfg.rate;
  if (lobby.length < 1 + level) { guestArrive(); changed = true; }
 }
 return {late:D.mails.filter(m => mailLate(m, handled.includes(m.id))), red:filings.filter(filingRed), expired, done, changed, lobbyRed:lobby.filter(lobbyRed), left, met};
}

// ————— La sala d'attesa (Centralino & segreteria) —————
// Le parti arrivano per l'appuntamento: vanno accompagnate in una sala libera con abbastanza posti.
// Una stipula con venditori, acquirenti, banca e agente non sta nello studio del notaio; un testamento sì, con i due testimoni.
// Finito l'appuntamento la sala si libera, e un atto firmato fa nascere il suo adempimento nello Scadenziario.
export const rooms = [{id:'R1', name:'Sala Arno', seats:8}, {id:'R2', name:'Sala Ponte Vecchio', seats:5}, {id:'R3', name:'Studio del notaio', seats:3}].map(r => ({...r, until:0, with:null}));
export const lobby = [];
export const lobbyCfg = {wait:60, leave:150, rate:1, bonus:0};
let nextGuestAt = 0, guestSeq = 0;
const visits = [
 {act:'Stipula di compravendita', note:'venditori, acquirenti, banca e agente', n:[5, 7], files:true},
 {act:'Firma del mutuo', note:'mutuatari e funzionario della banca', n:[3, 4], files:true},
 {act:'Costituzione di S.r.l.', note:'i soci fondatori', n:[3, 5], files:true},
 {act:'Donazione', note:'donante, donatari e due testimoni', n:[4, 5], files:true},
 {act:'Testamento pubblico', note:'testatore e due testimoni', n:[3, 3], files:false},
 {act:'Procura speciale', note:'il cliente e un familiare', n:[2, 2], files:false},
 {act:'Consulenza per successione', note:'gli eredi', n:[2, 4], files:false}
];
const guests = ['Famiglia Lenzi', 'Ricasoli e Pieri', 'Arcadia S.r.l.', 'Sig.ra Bandini', 'Famiglia Galeotti', 'Sig. Fabbri', 'Eredi Orlandi', 'Marchetti e Serra', 'Sig.ra Neri', 'Famiglia Sarti'];
export const lobbyWait = p => (Date.now() - p.at) / 1000;
export const lobbyRed = p => lobbyWait(p) > lobbyCfg.wait + lobbyCfg.bonus;
export const lobbyLeave = () => lobbyCfg.leave + lobbyCfg.bonus * 1.5;
export const roomFree = r => !r.with;
export const fitsRoom = (r, p) => roomFree(r) && r.seats >= p.n;
export const roomLeft = r => r.with ? Math.max(0, Math.ceil((r.until - Date.now()) / 1000)) : 0;
function guestArrive(n) {
 const v = visits[Math.floor(Math.random() * visits.length)];
 const p = {id:`V${++guestSeq}`, who:guests[Math.floor(Math.random() * guests.length)], act:v.act, note:v.note, n:n || v.n[0] + Math.floor(Math.random() * (v.n[1] - v.n[0] + 1)), files:v.files, at:Date.now(), time:clock()};
 lobby.push(p); return p;
}
export function seatClient(pid, rid) {
 const i = lobby.findIndex(p => p.id === pid), r = rooms.find(x => x.id === rid);
 if (i < 0 || !r || !fitsRoom(r, lobby[i])) return null;
 const [p] = lobby.splice(i, 1); r.with = p; r.until = Date.now() + (70 + Math.random() * 40) * 1000; return p;
}
// Per le prove a mano: fa arrivare subito qualcuno in sala d'attesa.
export const lobbyArrive = n => on ? guestArrive(n) : null;
