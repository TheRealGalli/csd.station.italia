// Missioni di CS Notaro OS: un minigioco per ogni modulo, con più scenari e valori sempre nuovi (gen.js).
// Le meccaniche sono in mg.js; qui ci sono i contenuti dello studio. La difficoltà cresce con il livello
// (gameLevel): al livello 1 poche righe ed errori evidenti, poi più voci, esche e calcoli composti.
//
//  Posta            · Smista la coda (persone, priorità, phishing)      [nell'email]
//  Centralino       · Al telefono                                       [nella chiamata]
//  WhatsApp         · Correggi la bozza                                 [nella chat]
//  Lo Studio        · Caselle dalla fonte (IBAN, codice fiscale, catasto)
//  Memoria          · Trova il precedente giusto
//  Visure           · Trova la differenza
//  Preventivi       · Il conto torna (calcolatrice: percentuali, minimi, IVA, frazioni)
//  Osservatorio     · Si applica o no? · (dal capitolo 2, a caso) Chi va avvisato?
//  Staff            · Riassegna il lavoro · (dal livello 2, a caso) Chi segue la firma?
//  Scadenziario     · La data giusta sul calendario
//  Antiriciclaggio  · Quanto possiede davvero? (percentuali composte)
//  Compliance       · Consenti o rifiuta · (dal capitolo 2, a caso) La violazione dei dati, in fila
import * as G from './gen.js';
import {mechanics as M} from './mg.js';
import {addMission, gameLevel, canSpawnMission, storyBias, rnd, gameState} from './game.js';
import {spawnMail, spawnChat, spawnCall, live} from './live.js';

let testLevel = 0;
const lvl = () => testLevel || gameLevel();
const by = (l1, l2, l3) => [l1, l2, l3][lvl() - 1];
const days = ['lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì'];
const mk = (kind, label, title, data, ttl = 240000) => ({kind, label, title, ttl, data, render:M[kind].render, handle:M[kind].handle, hint:M[kind].hint});
const srl = () => `${G.pick(['Arcadia', 'Lumen', 'Orione', 'Vela', 'Trama', 'Nodo', 'Tessera', 'Ginepro'])} S.r.l.`;
const date = d => d.toLocaleDateString('it-IT', {day:'numeric', month:'long', year:'numeric'});
const dm = d => d.toLocaleDateString('it-IT', {day:'numeric', month:'long'});
let timer = 0, running = false, turn = 0, onHandled = () => {};

// ————— Posta · Smista la coda —————
const team = [['GM', 'Giulia', 'Compravendite e mutui'], ['LB', 'Luca', 'Società'], ['EF', 'Elena', 'Successioni e donazioni'], ['SR', 'Sara', 'Appuntamenti e segreteria']];
const teamPool = {
 GM:[() => `${G.pick(G.banks)[0]}: delibera del mutuo ${G.person().last}`, () => `Agenzia: proposta d’acquisto in ${G.pick(G.streets)}`, () => `Perizia dell’immobile ${G.person().last}`, () => `Geometra: planimetria aggiornata ${G.person().last}`],
 LB:[() => `Commercialista: cessione quote ${srl()}`, () => `Statuto ${srl()}: revisione v3`, () => `Aumento di capitale ${srl()}`, () => `Nomina nuovo amministratore ${srl()}`],
 EF:[() => `Successione ${G.person().last}: certificato di morte`, () => `Donazione al figlio: casa di ${G.pick(G.cities)}`, () => 'Testamento olografo: richiesta di pubblicazione', () => `Rinuncia all’eredità ${G.person().last}`],
 SR:[() => `${G.person().name}: richiesta di appuntamento`, () => `Spostamento della firma ${G.person().last}`, () => `Copia conforme di un atto del ${G.int(2008, 2022)}`, () => `${G.person().name}: dove parcheggio?`]
};
function postaMission() {
 const n = by(3, 4, 6), kind = G.pick(by(['team', 'team', 'prio'], ['team', 'prio', 'phish'], ['team', 'prio', 'phish']));
 let lanes, items, ask, why, under;
 if (kind === 'team') {
  lanes = team; const keys = G.shuffle([...team, ...team].map(l => l[0])).slice(0, n);
  items = keys.map(k => ({lane:k, text:G.pick(teamPool[k])()}));
  ask = 'Assegna ogni email <b>alla persona giusta</b>, poi conferma lo smistamento.'; why = 'Ogni email è arrivata a chi segue quella materia: nessuno deve girarla a un collega.';
  under = 'Ognuna va a chi segue quella materia: Giulia compravendite, Luca società, Elena successioni, Sara segreteria.';
 } else if (kind === 'prio') {
  lanes = [['oggi', 'Oggi', 'scade entro 48 ore'], ['sett', 'Settimana', 'entro 7 giorni'], ['arch', 'Archivio', 'nessuna azione']];
  const pool = {oggi:[() => `Stipula ${G.person().last} domani: manca il modulo della banca`, () => 'PEC Agenzia Entrate: risposta entro 2 giorni', () => `${G.pick(G.banks)[0]}: erogazione dopodomani, serve la bozza`], sett:[() => `Statuto ${srl()}: osservazioni entro venerdì prossimo`, () => `Successione ${G.person().last}: documenti entro 7 giorni`, () => 'Commercialista: preventivo entro la settimana'], arch:[() => 'Newsletter del Consiglio notarile', () => `Conferma di lettura · ${G.person().name}`, () => 'Fattura già pagata del fornitore di cancelleria']};
  items = G.shuffle(['oggi', 'oggi', 'sett', 'sett', 'arch', 'arch']).slice(0, n).map(k => ({lane:k, text:G.pick(pool[k])()}));
  ask = 'Metti in ordine la coda: <b>cosa va fatto oggi</b>, in settimana o si archivia?'; why = 'La coda è in ordine: Otto mette in cima ciò che scade e archivia il resto.';
  under = 'Le email vanno messe in ordine di urgenza: ciò che scade entro 48 ore prima di tutto.';
 } else {
  lanes = [['ok', 'Vera', 'mittente conosciuto'], ['phish', 'Truffa', 'da segnalare']];
  const goods = [() => { const [b, d] = G.pick(G.banks); return [`${b} <mutui@${d}.example>`, 'Delibera del mutuo in allegato']; }, () => ['Avv. Lorenzi <studio@lorenzi.example>', 'Bozza d’atto v2'], () => ['Agenzia Entrate <pec@agenzia.example>', 'Ricevuta di registrazione']];
  const bads = [() => { const [b, d] = G.pick(G.banks); return [`${b} <sicurezza@${d}-verifica.example>`, 'Conto bloccato: confermi i dati entro un’ora']; }, () => ['Notaio Conti <notaio.conti@posta-gratis.example>', 'Bonifico urgente da fare oggi, non chiamarmi'], () => ['Agenzia Entrate <rimborsi@agenzia-entrate.example.ru>', 'Rimborso: inserisca la carta']];
  items = G.shuffle([...Array(Math.ceil(n / 2))].map(() => ({lane:'phish', p:G.pick(bads)()})).concat([...Array(Math.floor(n / 2))].map(() => ({lane:'ok', p:G.pick(goods)()})))).map(x => ({lane:x.lane, text:x.p[1], sub:x.p[0]}));
  ask = 'Alcune email sono <b>truffe</b>: guarda bene il mittente e segnala quelle false.'; why = 'Truffe segnalate e bloccate: nessuno dello studio cliccherà su quei link.';
  under = 'Tra le email nuove ci sono tentativi di phishing: il nome sembra giusto, l’indirizzo no.';
 }
 const subject = kind === 'phish' ? `${n} email sospette da controllare` : `${n} email da smistare`;
 return {anchor:'mail', mail:{from:'PEC dello studio · smistamento', address:'pec@studioconti.example', kind:'PEC', subject, attachments:[], body:`Sono arrivate ${n} email. Otto le ha lette: ora serve la tua decisione.`, understood:under},
  mission:mk('triage', 'SMISTA LA CODA', `Smista la coda · ${subject}`, {ask, lanes, items, confirm:'Conferma', winWhy:why}, 200000)};
}

// ————— Posta · Controlla gli allegati —————
// Un'email con due allegati PDF che dovrebbero dire la stessa cosa: trovi il dato che non torna
// e rimandi al mittente un'email di avvertimento con la correzione.
const docKinds = [['Visura catastale', 'Perizia della banca'], ['Preliminare', 'Contabile del bonifico'], ['Carta d’identità', 'Modulo della banca'], ['Delibera del mutuo', 'Modulo di erogazione'], ['Planimetria', 'Visura catastale'], ['Certificato di agibilità', 'Bozza d’atto'], ['Tessera sanitaria', 'Anagrafica cliente'], ['APE', 'Annuncio dell’agenzia'], ['Contratto di locazione', 'Visura catastale'], ['Visura camerale', 'Statuto'], ['Fattura del geometra', 'Preventivo'], ['Certificato di residenza', 'Dichiarazione prima casa']];
function allegatiMission() {
 const who = G.person(), [a, b] = G.pick(docKinds), c = G.catasto(), amt = G.amount(), city = G.pick(G.cities);
 const rows = G.pick([
  [['Intestatario', who.name, who.name], ['Comune', city, city], ['Foglio', String(c.fg), String(c.fg)], ['Particella', String(c.part), String(c.part)], ['Subalterno', String(c.sub), String(c.sub)]],
  [['Nome', who.name, who.name], ['Nato il', who.born, who.born], ['Codice fiscale', who.cf, who.cf], ['Residenza', city, city]],
  [['Parte', who.name, who.name], ['Importo', G.euro(amt), G.euro(amt)], ['Data', '12/09/2026', '12/09/2026'], ['Immobile', `${G.pick(G.streets)} ${G.int(2, 60)}`, '']]
 ]);
 rows.forEach(r => { if (!r[2]) r[2] = r[1]; });
 const w = G.int(1, rows.length - 1), k = rows[w][0];
 rows[w][2] = /Importo/.test(k) ? G.euro(G.roundUp(amt)) : /Nato|Data/.test(k) ? G.typoDate(rows[w][1]) : /^\d+$/.test(rows[w][1]) ? String(G.typoNumber(+rows[w][1])) : G.typoText(rows[w][1]);
 const [law, dom] = G.pick(G.lawyers), fa = `${a.replace(/[’ ]/g, '_')}.pdf`, fb = `${b.replace(/[’ ]/g, '_')}.pdf`;
 return {anchor:'mail', mail:{from:law, address:`studio@${dom}.example`, kind:'Legale', subject:`${who.last} – documenti per la pratica`, attachments:[fa, fb], body:`Le trasmetto ${a.toLowerCase()} e ${b.toLowerCase()} per la pratica ${who.last}.`, understood:'Otto ha letto i due allegati: c’è un dato che non coincide. Controlla tu prima di andare avanti.'},
  mission:mk('diff', 'CONTROLLA GLI ALLEGATI', `Controlla gli allegati · ${who.last}`, {paper:true, ask:`Apri i due allegati: <b>tocca nel primo la riga che non coincide</b> con il secondo.`, chooseAsk:'Cosa fai?', left:fa, right:fb, rows, wrongRow:w,
   options:G.shuffle([{v:`Rispondo a ${law}: “Il dato ${k.toLowerCase()} non coincide, ci mandate il documento corretto?”`, ok:true}, {v:'Approvo: la differenza non conta'}, {v:`Correggo io il dato in ${fb} senza dire niente`}]),
   winWhy:'Email di avvertimento partita: il mittente corregge alla fonte e la pratica resta pulita. È così che lavora lo studio.', loseWhy:'Un dato che non coincide tra due allegati va segnalato al mittente: non si approva e non si corregge di nascosto.'}, 200000)};
}

// ————— Posta · L'email truffa (caccia agli errori) —————
// La frode più diffusa contro gli studi: un'email quasi uguale a quella vera chiede di cambiare l'IBAN prima del rogito.
function frodeMission() {
 const who = G.person(), [law, dom] = G.pick(G.lawyers), amt = G.amount();
 const fakeDom = G.pick([`${dom}-studio`, `${dom}.legal`, dom.replace(/([a-z])/, '$1$1')]);
 const pool = [
  ['Mittente', `${law} <studio@${fakeDom}.example>`, `Il dominio è “${fakeDom}”, non “${dom}” come in rubrica.`],
  ['Oggetto', `URGENTE – nuove coordinate per il saldo ${who.last}`, 'Urgenza e “nuove coordinate” insieme: il segnale tipico della truffa del bonifico.'],
  ['IBAN indicato', `LT${G.int(10, 99)} 3250 0${G.int(100, 999)} ${G.int(1000, 9999)} ${G.int(1000, 9999)}`, 'IBAN estero (Lituania) per un venditore residente a Firenze.'],
  ['Telefono in firma', `+44 7${G.int(100, 999)} ${G.int(100000, 999999)}`, 'Numero diverso da quello in rubrica: non va mai usato per verificare.'],
  ['Richiesta', 'Non telefonate, sono in udienza tutto il giorno', 'Chiedere di non telefonare serve a impedire la verifica.'],
  ['Pratica', `Compravendita ${who.last} · saldo € ${amt.toLocaleString('it-IT')}`, ''],
  ['Data del rogito', 'Venerdì alle 10:30', ''],
  ['Allegato', 'Coordinate_bancarie.pdf', '']
 ];
 const nBad = by(3, 4, 5), bad = pool.slice(0, 5).map((r, i) => i).sort(() => Math.random() - .5).slice(0, nBad);
 const rows = G.shuffle([...pool.filter((r, i) => bad.includes(i)), ...pool.filter((r, i) => i < 5 && !bad.includes(i)).map(r => [r[0], r[0] === 'Mittente' ? `${law} <studio@${dom}.example>` : r[0] === 'Telefono in firma' ? '055 ' + G.int(200000, 299999) : r[0] === 'Oggetto' ? `Saldo ${who.last} – conferma` : r[0] === 'IBAN indicato' ? 'Quello già in pratica (IT…)' : 'Per qualsiasi dubbio chiamatemi', '']), ...pool.slice(5)]);
 return {anchor:'mail', brief:{what:'Un’email chiede di cambiare le coordinate del bonifico prima del rogito. Trova tutti i segnali della truffa, uno per uno.', why:'Con la truffa del bonifico il saldo di una casa finisce su un conto estero in pochi minuti: e non torna più.'},
  mail:{from:law, address:`studio@${fakeDom}.example`, kind:'Legale', subject:`URGENTE – nuove coordinate ${who.last}`, attachments:['Coordinate_bancarie.pdf'], body:`Gentile Notaio, per il saldo della compravendita ${who.last} vi preghiamo di usare le nuove coordinate in allegato. Non telefonate, sono in udienza.`, understood:'Attenzione: questa email ha più segnali di frode. Otto ha bloccato le coordinate finché non le controlli tu.'},
  mission:mk('hunt', 'L’EMAIL TRUFFA', `Email sospetta · ${who.last}`, {ask:`Questa email chiede di <b>cambiare l’IBAN del saldo</b>. Tocca <b>tutti i segnali di truffa</b>: sono ${nBad}.`, docTitle:'Email ricevuta · PEC ordinaria', rows, sources:[{t:'Rubrica dello studio', rows:[[law, `studio@${dom}.example`], ['Telefono', '055 2…'], ['IBAN del venditore', 'già in pratica, banca italiana']]}, {t:'Regola dello studio', rows:[['Cambio IBAN', 'si verifica sempre al telefono, al numero in rubrica']]}], winWhy:'Coordinate bloccate e venditore chiamato al numero in rubrica: l’IBAN non era cambiato. Otto segnala la frode alla Polizia Postale.'}, 200000)};
}

// ————— Scadenziario · In fila (il giorno dell'atto) —————
function proceduraMission() {
 const procs = [
  {name:'il giorno della compravendita', steps:[['Visure aggiornate', 'la mattina stessa'], ['Identificazione delle parti', 'documenti in corso di validità'], ['Lettura dell’atto alle parti'], ['Firme delle parti e del notaio'], ['Registrazione e trascrizione', 'con l’adempimento unico'], ['Copia dell’atto alle parti']], why:'Prima si verifica, poi si identifica, poi si legge e si firma: solo dopo l’atto va nei registri.'},
  {name:'un testamento pubblico', steps:[['Identificazione del testatore'], ['Presenza dei due testimoni'], ['Il testatore dichiara le sue volontà', 'al notaio, a voce'], ['Il notaio le scrive nell’atto'], ['Lettura al testatore e ai testimoni'], ['Firme e iscrizione a repertorio']], why:'Nel testamento pubblico le volontà le dichiara il testatore e le scrive il notaio, davanti ai testimoni: l’ordine è la garanzia.'},
  {name:'la costituzione di una S.r.l.', steps:[['Verifica dei soci e del titolare effettivo'], ['Statuto concordato con i soci'], ['Firma dell’atto costitutivo'], ['Deposito al Registro Imprese', 'entro 10 giorni'], ['Iscrizione: la società esiste'], ['Comunicazione della partita IVA ai soci']], why:'Una S.r.l. nasce con l’iscrizione nel Registro Imprese, non con la firma: e prima ancora vengono le verifiche.'}
 ];
 const p = G.pick(procs), n = by(4, 5, 6), steps = p.steps.slice(0, n).map(([t, sub]) => ({t, sub}));
 return {brief:{what:'Le procedure dello studio hanno un ordine preciso: metti i passaggi in fila, dal primo all’ultimo.', why:'Un atto firmato prima delle verifiche, o depositato prima della firma, è un atto da rifare.'},
  mission:mk('order', 'IN FILA', `Procedura · ${p.name}`, {ask:`Il praticante chiede: “Per <b>${p.name}</b>, in che ordine si fa?” Tocca i passaggi <b>dal primo all’ultimo</b>.`, steps, winWhy:p.why, sources:[{t:'Prassi dello studio', rows:[['Regola', 'ogni passaggio si registra in pratica con data e autore']]}]}, 200000)};
}

// ————— Centralino · Al telefono —————
function centralinoMission() {
 const who = G.person(), kind = G.pick(['sposta', 'privacy', 'urgenza', 'banca']), d1 = G.pick(days), busy = G.pick(['10:00', '11:30']), free = G.pick(['15:00', '16:30']);
 let turns, sources, caller = who.name, intent;
 if (kind === 'sposta') {
  sources = [{t:`Agenda di ${d1}`, rows:[[busy, 'occupato · altra firma'], [free, 'libero']]}]; intent = 'Spostamento della firma';
  turns = [{c:`Buongiorno, sono ${who.name}. Posso spostare la mia firma a ${d1}?`, o:[{t:`Certo: ${d1} alle ${free} è libero, la segno?`, ok:true}, {t:`Sì, alle ${busy} va benissimo.`, why:`Alle ${busy} c’è già un’altra firma.`}, {t:'Le firme non si possono spostare.', why:'Si possono spostare, se c’è posto: e c’è.'}]},
   {c:'Perfetto. Devo portare qualcosa?', o:[{t:'Solo un documento d’identità valido: il resto lo abbiamo noi.', ok:true}, {t:'Niente, non serve nulla.', why:'Il notaio deve identificare chi firma: il documento serve sempre.'}, {t:'Tutti gli atti originali di casa.', why:'Gli atti li ha già lo studio.'}]}];
 } else if (kind === 'privacy') {
  const rel = G.person(); caller = `${rel.first} ${who.last}`; intent = 'Informazioni su una successione';
  sources = [{t:`Pratica successione ${who.last}`, rows:[['Erede', who.name], ['Altri autorizzati', 'nessuno']]}];
  turns = [{c:`Salve, sono ${caller}, il fratello di ${who.first}. A che punto è la successione?`, o:[{t:`Posso dare informazioni solo a ${who.first}: le chiedo di richiamarla lei.`, ok:true}, {t:'Manca solo la dichiarazione, poi è fatta.', why:'Nessuno lo ha autorizzato: sarebbe una violazione della privacy.'}, {t:'Mi dica il codice fiscale e le dico tutto.', why:'Un codice fiscale non dà diritto alla pratica di un altro.'}]},
   {c:'Ma sono di famiglia!', o:[{t:`Capisco. Se ${who.first} ci autorizza per iscritto, la aggiorno volentieri.`, ok:true}, {t:'Va bene, allora le dico tutto.', why:'Essere parenti non basta: serve l’autorizzazione.'}, {t:'La richiamiamo noi tra un’ora.', why:'Senza autorizzazione non si dice niente, nemmeno tra un’ora.'}]}];
 } else if (kind === 'urgenza') {
  const s1 = G.pick(['domani alle 9:00', 'domani alle 12:00']); intent = 'Successione urgente';
  sources = [{t:'Agenda della dott.ssa Ferri', rows:[[s1, 'libero'], ['oggi pomeriggio', 'occupato'], ['tra 10 giorni', 'libero']]}];
  turns = [{c:'Buongiorno... è mancato mio padre e la banca ha bloccato il conto. Non so cosa fare.', o:[{t:`Mi dispiace molto. La dott.ssa Ferri può vederla ${s1}: va bene?`, ok:true}, {t:'Le propongo tra dieci giorni.', why:'C’è un posto molto prima: con un conto bloccato ogni giorno conta.'}, {t:'Venga oggi pomeriggio.', why:'Oggi pomeriggio è occupata.'}]},
   {c:'Grazie. Cosa devo portare?', o:[{t:'Il certificato di morte e i documenti degli eredi: le mando l’elenco su WhatsApp.', ok:true}, {t:'Il testamento firmato da lei.', why:'Il testamento lo firma chi lo fa, non chi eredita.'}, {t:'Niente, facciamo tutto noi.', why:'Senza certificato e documenti la pratica non parte.'}]}];
 } else {
  const [bank] = G.pick(G.banks), num = `+39 055 ${G.int(200, 899)} ${G.int(1000, 9999)}`; caller = `${bank} · Ufficio mutui`; intent = `Stato della bozza ${who.last}`;
  sources = [{t:`Anagrafica ${bank}`, rows:[['Numero registrato', num], ['Chiamata in arrivo da', num]]}];
  turns = [{c:`Buongiorno, ${bank}. A che punto è la bozza della pratica ${who.last}?`, o:[{t:'Il numero è quello registrato: la bozza vi arriva via PEC entro mercoledì.', ok:true}, {t:'Non possiamo dire nulla alle banche.', why:'La banca è parte della pratica e chiama dal numero registrato.'}, {t:'Ci mandi una PEC, rispondiamo tra una settimana.', why:'La chiamata è verificata: farla aspettare rallenta la stipula.'}]},
   {c:'Perfetto, e la data di stipula è confermata?', o:[{t:'Sì, è in agenda: Otto vi manda la conferma scritta adesso.', ok:true}, {t:'Non lo so, richiami domani.', why:'L’agenda è lì: si conferma subito.'}, {t:'Ditecelo voi.', why:'La data la fissa lo studio ed è già in agenda.'}]}];
 }
 if (lvl() === 1) turns.length = 1;
 turns.forEach(t => { t.o = G.shuffle(t.o); });
 return {anchor:'call', call:{caller, kind:kind === 'banca' ? 'Banca' : 'Cliente', intent, first:turns[0].c}, mission:mk('phone', 'AL TELEFONO', `Al telefono · ${caller}`, {turns, sources, caller}, 190000)};
}

// ————— WhatsApp · Correggi la bozza —————
function whatsappMission() {
 const who = G.person(), day = G.int(0, 4), dd = G.int(20, 30), hour = G.pick(['9:30', '10:30', '11:00', '15:00', '16:30']), notary = G.pick(['Notaio Conti', 'Notaio Ferri']), amt = G.amount() * 4, num = G.int(2, 40);
 const kind = G.pick(['ora', 'giorno', 'notaio', 'importo', 'civico']);
 const wrongOf = {ora:G.pick(['9:00', '12:00', '14:30', '17:30'].filter(h => h !== hour)), giorno:`${days[(day + 1) % 5]} ${dd + 1}`, notaio:notary === 'Notaio Conti' ? 'Notaio Ferri' : 'Notaio Conti', importo:G.euro(G.typoNumber(amt)), civico:String(G.typoNumber(num))};
 const rightOf = {ora:hour, giorno:`${days[day]} ${dd}`, notaio:notary, importo:G.euro(amt), civico:String(num)};
 const decoyOf = {ora:'13:00', giorno:`sabato ${dd + 2}`, notaio:'Notaio Benassi', importo:G.euro(G.roundUp(amt)), civico:String(num + 10)};
 const seg = key => key === kind ? {t:wrongOf[key], err:true, ok:rightOf[key], choices:G.shuffle([rightOf[key], wrongOf[key], decoyOf[key]])} : {t:rightOf[key]};
 const parts = [{t:`Buongiorno ${who.first}, confermato: firma `}, seg('giorno'), {t:' alle '}, seg('ora'), {t:' con il '}, seg('notaio'), {t:', in via de’ Tornabuoni '}, seg('civico'), {t:'. Per il saldo prepari un bonifico di '}, seg('importo'), {t:'.'}];
 const sources = [{t:'Agenda dello studio', rows:[[`${days[day]} ${dd} ottobre`, `${hour} · firma ${who.last} · ${notary}`]]}, {t:`Pratica ${who.last}`, rows:[['Saldo prezzo', G.euro(amt)], ['Sede della firma', `via de’ Tornabuoni ${num}`]]}];
 return {anchor:'chat', chat:{who:who.name, practice:`P-${G.int(205, 289)}`, text:G.pick(['Mi conferma giorno, ora e indirizzo della firma? E quanto è il saldo?', 'Buongiorno, ci ricorda quando e dove firmiamo? E il saldo?'])},
  mission:mk('proof', 'CORREGGI LA BOZZA', `Correggi la bozza · risposta a ${who.name}`, {ask:'Otto ha scritto la risposta, ma qualcosa <b>non torna con le fonti</b>. Tocca la parte sbagliata e correggila.', draftLabel:'Risposta proposta da Otto', parts, sources, winWhy:'Ora la risposta coincide con agenda e pratica: Otto la invia al cliente.', winLabel:'Bozza perfetta'}, 170000)};
}

// ————— Lo Studio · Caselle dalla fonte —————
function studioMission() {
 const who = G.person(), kind = G.pick(by(['cf', 'catasto'], ['iban', 'cf', 'catasto'], ['iban', 'cf', 'catasto']));
 if (kind === 'iban') {
  const now = G.iban(), old = G.iban(), n = by(5, 7, 9), raw = now.replace(/ /g, '');
  return mk('boxes', 'CASELLE DALLA FONTE', `Caselle dalla fonte · IBAN di ${who.name}`, {ask:'Otto sta compilando il modulo di erogazione: copia la parte finale dell’IBAN dal <b>conto attuale</b>, una casella per carattere.', field:'Modulo di erogazione · IBAN parte venditrice', answer:raw.slice(-n), prefix:raw.slice(0, -n).replace(/(.{4})/g, '$1 ').trim(), sources:[{t:`Email dell’avvocato di ${who.name}`, rows:[['Conto attuale', now, true], ['Conto chiuso nel 2024', old, true]]}], winWhy:'IBAN del conto attuale: l’erogazione arriverà davvero alla venditrice.', loseWhy:'Il conto chiuso avrebbe fatto tornare indietro l’erogazione.'});
 }
 if (kind === 'cf') {
  const other = G.person(), n = by(4, 6, 8);
  return mk('boxes', 'CASELLE DALLA FONTE', `Caselle dalla fonte · codice fiscale di ${who.name}`, {ask:`Nel modulo della banca il codice fiscale di <b>${who.name}</b> è a metà: completalo dalla tessera giusta.`, field:`Codice fiscale di ${who.name}`, answer:who.cf.slice(-n), prefix:who.cf.slice(0, -n), sources:[{t:`Tessera sanitaria · ${who.name}`, rows:[['Codice fiscale', who.cf, true]]}, {t:`Tessera sanitaria · ${other.name} (coniuge)`, rows:[['Codice fiscale', other.cf, true]]}], winWhy:'Codice fiscale completo e identico alla tessera giusta: la banca non bloccherà la delibera.', loseWhy:'Dalla tessera del coniuge il modulo sarebbe stato intestato alla persona sbagliata.'});
 }
 const c = G.catasto(), city = G.pick(G.cities), oldSub = G.typoNumber(c.sub);
 return mk('boxes', 'CASELLE DALLA FONTE', `Caselle dalla fonte · dati catastali ${who.last}`, {ask:'Nel modulo mancano particella e subalterno: prendili dalla <b>visura aggiornata</b>, non da quella vecchia.', field:'Particella e subalterno', firstLabel:'part.', split:String(String(c.part).length), splitLabel:'sub', answer:`${c.part}${String(c.sub).padStart(2, '0')}`, sources:[{t:`Visura aggiornata · ${city}`, rows:[['Foglio', String(c.fg)], ['Particella', String(c.part)], ['Subalterno', String(c.sub).padStart(2, '0')]]}, {t:'Visura del 2019', rows:[['Particella', String(c.part)], ['Subalterno', String(oldSub).padStart(2, '0')]]}], winWhy:'Dati presi dalla visura aggiornata: l’atto descrive l’immobile com’è oggi.', loseWhy:'La visura del 2019 è precedente alla variazione.'});
}

// ————— Memoria dello studio · Trova il precedente —————
function memoriaMission() {
 const kind = G.pick(['servitu', 'provenienza', 'clausola']), who = G.person();
 if (kind === 'servitu') {
  const y1 = G.int(2004, 2012), y2 = G.int(2015, 2023), r1 = G.int(6000, 9000), r2 = G.int(10000, 12400), place = G.pick(G.cities);
  const cards = [{title:`No: rinunciata nel ${y2}`, meta:`Rep. ${r2.toLocaleString('it-IT')} · ${y2}`, body:`Rinuncia alla servitù costituita con Rep. ${r1.toLocaleString('it-IT')}, **trascritta**.`, ok:true}, {title:`Sì: costituita nel ${y1}`, meta:`Rep. ${r1.toLocaleString('it-IT')} · ${y1}`, body:'Costituzione di servitù di passaggio a favore del fondo vicino.', why:`Era vera fino al ${y2}: l’atto successivo l’ha estinta.`}];
  if (lvl() > 1) cards.push({title:'Sì, ma solo a piedi', meta:`Rep. ${(r1 + 812).toLocaleString('it-IT')} · ${y1 + 1}`, body:'Modifica delle modalità di passaggio.', why:'Anche la modifica è stata superata dalla rinuncia.'});
  return mk('pick', 'TROVA IL PRECEDENTE', `Memoria · servitù a ${place}`, {ask:`${who.name} compra un fondo a <b>${place}</b> e chiede: <b>c’è ancora la servitù di passaggio?</b> Otto ha trovato questi atti nell’archivio.`, cards:G.shuffle(cards), winWhy:'L’atto più recente decide: la servitù è estinta e trascritta. Otto lo cita nella bozza.', loseWhy:'Si guarda sempre l’ultimo atto trascritto.'});
 }
 if (kind === 'provenienza') {
  const c = G.catasto(), city = G.pick(G.cities), y = G.int(2006, 2016), seller = G.person();
  const cards = [{title:`Compravendita ${y + G.int(2, 4)} · acquirente ${seller.name}`, meta:`Fg. ${c.fg} · Part. ${c.part} · Sub. ${c.sub}`, body:`Rep. ${G.int(10000, 12400).toLocaleString('it-IT')} · atto di compravendita`, ok:true}, {title:`Compravendita ${y} · acquirente ${G.person().name}`, meta:`Fg. ${c.fg} · Part. ${c.part} · Sub. ${c.sub}`, body:`Rep. ${G.int(6000, 9000).toLocaleString('it-IT')} · atto di compravendita`, why:'C’è un passaggio più recente: la provenienza è sempre l’ultimo titolo.'}, {title:`Compravendita ${y + G.int(5, 6)} · acquirente ${seller.name}`, meta:`Fg. ${c.fg} · Part. ${c.part} · Sub. ${G.typoNumber(c.sub)}`, body:`Rep. ${G.int(12401, 12600).toLocaleString('it-IT')} · atto di compravendita`, why:'Subalterno diverso: è un altro immobile.'}];
  return mk('pick', 'TROVA IL PRECEDENTE', `Memoria · provenienza ${seller.last}`, {ask:`Per la bozza serve l’<b>atto di provenienza</b> dell’immobile che ${seller.name} vende a ${city} (Fg. ${c.fg}, Part. ${c.part}, Sub. ${c.sub}). Quale?`, cards:G.shuffle(lvl() === 1 ? cards.slice(0, 2) : cards), winWhy:'Ultimo titolo, stesso immobile: è la provenienza giusta da citare.', loseWhy:'Serve l’ultimo titolo dello stesso identico immobile.'});
 }
 const t = G.pick([['un terreno agricolo confinante con un coltivatore diretto', 'Prelazione agraria', 'Prelazione urbana', 'Regolamento di condominio'], ['un appartamento in condominio con regolamento contrattuale', 'Regolamento di condominio', 'Prelazione agraria', 'Prelazione urbana'], ['un negozio affittato a un’attività commerciale', 'Prelazione urbana del conduttore', 'Prelazione agraria', 'Regolamento di condominio']]);
 return mk('pick', 'TROVA IL PRECEDENTE', 'Memoria · la clausola giusta', {ask:`La bozza riguarda <b>${t[0]}</b>. Quale clausola del clausolario va inserita?`, cards:G.shuffle([{title:t[1], meta:'Clausolario dello studio', ok:true}, {title:t[2], meta:'Clausolario dello studio', why:'Non è il caso di questo immobile.'}, {title:t[3], meta:'Clausolario dello studio', why:'Non è il caso di questo immobile.'}]), winWhy:'Clausola giusta per il tipo di immobile: Otto la inserisce con il riferimento al modello.'});
}

// ————— Visure · Trova la differenza —————
function visureMission() {
 const buyer = G.person(), kind = G.pick(['catasto', 'identita', 'bonifico']);
 let rows, w, left, right;
 if (kind === 'catasto') {
  const c = G.catasto(), city = G.pick(G.cities);
  rows = [['Comune', city, city], ['Foglio', String(c.fg), String(c.fg)], ['Particella', String(c.part), String(c.part)], ['Subalterno', String(c.sub), String(c.sub)], ['Categoria', c.cat, c.cat]];
  w = G.int(1, 3); rows[w][1] = String(G.typoNumber(+rows[w][2])); left = 'Bozza d’atto v2'; right = 'Visura catastale';
 } else if (kind === 'identita') {
  rows = [['Cognome', buyer.last, buyer.last], ['Nome', buyer.first, buyer.first], ['Nato a', buyer.place, buyer.place], ['Data di nascita', buyer.born, buyer.born], ['Codice fiscale', buyer.cf, buyer.cf]];
  w = by(G.pick([0, 3]), G.pick([0, 3, 4]), G.pick([3, 4])); rows[w][1] = w === 3 ? G.typoDate(buyer.born) : G.typoText(rows[w][2]); left = 'Modulo della banca'; right = 'Carta d’identità';
 } else {
  const seller = G.person(), amt = G.amount();
  rows = [['Ordinante', buyer.name, buyer.name], ['Beneficiario', seller.name, seller.name], ['Importo', G.euro(amt), G.euro(amt)], ['Causale', 'Caparra confirmatoria', 'Caparra confirmatoria']];
  w = 2; rows[2][1] = G.euro(Math.random() < .5 ? G.roundUp(amt) : G.typoNumber(amt)); left = 'Preliminare'; right = 'Bonifico ricevuto';
 }
 if (lvl() === 1 && rows.length > 4) { const keep = rows.filter((r, i) => i === w || i < 3).slice(0, 4); rows = keep; w = rows.findIndex(r => r[1] !== r[2]); }
 return mk('diff', 'TROVA LA DIFFERENZA', `Trova la differenza · ${left} di ${buyer.last}`, {ask:'Confronta i due documenti e <b>tocca a sinistra la riga che non coincide</b> con la fonte ufficiale.', left, right, rows, wrongRow:w, options:G.shuffle([{v:rows[w][2], ok:true}, {v:rows[w][1]}]), winWhy:`Vale la fonte ufficiale (${right.toLowerCase()}): Otto corregge il documento e lo segna nel registro.`, loseWhy:`Hai scelto il valore del documento da correggere: la fonte ufficiale dice ${rows[w][2]}.`});
}

// ————— Preventivi · Il conto torna —————
function preventiviMission() {
 const who = G.person(), k = G.pick(by(['reg', 'caparra', 'iva'], ['reg', 'regmin', 'iva', 'caparra', 'saldo'], ['regmin', 'totale', 'saldo', 'iva']));
 const base = {unit:'€', winWhy:'Il conto torna: Otto lo scrive nel preventivo.'};
 if (k === 'reg' || k === 'regmin') {
  const v = k === 'regmin' && Math.random() < .5 ? G.int(28, 49) * 1000 : G.int(60, 140) * 1000 + G.int(0, 9) * 110;
  return mk('calc', 'IL CONTO TORNA?', `Preventivo · imposta di registro ${who.last}`, {...base, ask:`Prima casa: quanto è l’<b>imposta di registro</b> per ${who.name}?`, answer:Math.max(1000, Math.round(v * .02)), sources:[{t:'Regola prima casa', rows:[['Imposta di registro', '2% del valore catastale'], ['Minimo di legge', '€ 1.000']]}, {t:`Visura · ${who.last}`, rows:[['Valore catastale', G.euro(v)]]}], hint:'2% del valore catastale, mai meno di € 1.000.', winWhy:v * .02 < 1000 ? 'Il 2% era sotto il minimo: si pagano € 1.000. È la trappola classica.' : 'Il 2% del valore catastale: Otto lo scrive nel preventivo.'});
 }
 if (k === 'caparra') {
  const p = G.int(14, 42) * 10000, f = G.pick([[1, 10, 'un decimo'], [1, 5, 'un quinto'], [1, 20, 'un ventesimo']]);
  return mk('calc', 'IL CONTO TORNA?', `Preventivo · caparra ${who.last}`, {...base, ask:`Nel preliminare la caparra è <b>${f[2]} del prezzo</b>. Quanto deve versare ${who.name}?`, answer:p * f[0] / f[1], sources:[{t:'Preliminare', rows:[['Prezzo', G.euro(p)], ['Caparra', `${f[0]}/${f[1]} del prezzo`]]}], hint:`Prezzo diviso ${f[1]}.`});
 }
 if (k === 'iva') {
  const o = G.int(12, 36) * 100;
  return mk('calc', 'IL CONTO TORNA?', `Preventivo · onorario con IVA ${who.last}`, {...base, ask:'Quanto paga il cliente per l’<b>onorario con l’IVA al 22%</b>?', answer:+(o * 1.22).toFixed(2), sources:[{t:'Preventivo', rows:[['Onorario', G.euro(o)], ['IVA', '22%']]}], hint:'Onorario più il 22%: per esempio onorario × 122%.'});
 }
 if (k === 'saldo') {
  const p = G.int(140, 420) * 1000, c = Math.round(p * G.pick([.05, .1]) / 500) * 500, m = Math.round(p * G.pick([.5, .6, .7]) / 1000) * 1000;
  return mk('calc', 'IL CONTO TORNA?', `Preventivo · saldo ${who.last}`, {...base, ask:'Quanto deve versare l’acquirente <b>di saldo alla firma</b>?', answer:p - c - m, sources:[{t:'Preliminare', rows:[['Prezzo', G.euro(p)], ['Caparra già versata', G.euro(c)]]}, {t:'Delibera del mutuo', rows:[['Erogato alla firma', G.euro(m)]]}], hint:'Prezzo meno caparra meno mutuo.'});
 }
 const v = G.int(60, 140) * 1000;
 return mk('calc', 'IL CONTO TORNA?', `Preventivo · imposte totali ${who.last}`, {...base, ask:'Prima casa: quanto sono le <b>imposte in tutto</b>?', answer:Math.max(1000, Math.round(v * .02)) + 100, sources:[{t:'Prima casa', rows:[['Registro', '2% del valore catastale (min € 1.000)'], ['Ipotecaria', '€ 50'], ['Catastale', '€ 50']]}, {t:`Visura · ${who.last}`, rows:[['Valore catastale', G.euro(v)]]}], hint:'Registro (2%, minimo 1.000) + 50 + 50.'});
}

// ————— Osservatorio · Si applica o no? —————
function osservatorioMission() {
 const from = new Date(2026, G.int(10, 11), G.int(1, 25)), n = by(3, 4, 6);
 const items = Array.from({length:n}, () => { const before = Math.random() < .5, dt = new Date(from); dt.setDate(dt.getDate() + (before ? -G.int(1, 20) : G.int(0, 20))); return {text:`Pratica ${G.person().last}`, sub:`visura richiesta il ${dm(dt)}`, ans:before ? 'no' : 'si'}; });
 return mk('classify', 'SI APPLICA?', 'Osservatorio · nuova tabella dei diritti', {ask:`Nuova tabella dei diritti per le visure ipotecarie, <b>dal ${dm(from)}</b>. A quali pratiche si applica?`, sources:[{t:'Circolare (esempio)', rows:[['Si applica', `alle richieste presentate dal ${dm(from)} in poi`]]}], states:[['si', 'Si applica'], ['no', 'Non si applica']], items, winWhy:'Solo le richieste dalla data della circolare: i clienti con visure già fatte non ricevono rincari che non esistono.'});
}

// ————— Staff · Riassegna il lavoro —————
function staffMission() {
 const n = by(3, 4, 5);
 const tasks = {GM:['Trascrizione compravendita', 'Modulo erogazione mutuo', 'Voltura catastale'], LB:['Deposito al Registro Imprese', 'Verbale di assemblea', 'Statuto da rivedere'], EF:['Dichiarazione di successione', 'Pubblicazione testamento', 'Atto di donazione'], SR:['Richiamare un cliente', 'Spostare una firma', 'Preparare copie conformi']};
 const keys = G.shuffle(['GM', 'LB', 'EF', 'SR', 'GM', 'EF']).slice(0, n);
 return mk('triage', 'RIASSEGNA IL LAVORO', 'Staff · Paolo è in ferie', {ask:'<b>Paolo Donati è in ferie</b> fino a lunedì: riassegna le sue attività a chi segue quella materia.', lanes:team, sources:[{t:'Presenze', rows:[['Paolo Donati', 'in ferie fino a lunedì'], ['Tutti gli altri', 'in studio']]}], items:keys.map(k => ({lane:k, text:G.pick(tasks[k]), sub:`scade ${G.pick(['oggi', 'domani', 'venerdì'])}`})), confirm:'Riassegna', winWhy:'Ogni attività di Paolo è a chi conosce la materia: nessun termine scade durante le ferie.'});
}

// ————— Scadenziario · La data giusta —————
function scadenzeMission() {
 const who = G.person(), k = G.pick(by(['30'], ['30', 'reg'], ['30', 'reg', 'succ']));
 const d = new Date(2026, G.int(9, 10), G.int(1, 28)), due = new Date(d);
 let ask, rule, label;
 if (k === 'succ') { d.setFullYear(2025); due.setTime(d.getTime()); due.setMonth(due.getMonth() + 12); ask = `Entro quando va presentata la <b>dichiarazione di successione</b> di ${who.last}?`; rule = 'entro 12 mesi dalla data del decesso'; label = 'Data del decesso'; }
 else { due.setDate(due.getDate() + 30); ask = k === 'reg' ? `Entro quando va fatto il <b>deposito al Registro Imprese</b> dell’atto di ${srl()}?` : `Entro quando vanno fatte <b>registrazione e trascrizione</b> dell’atto ${who.last}?`; rule = 'entro 30 giorni dalla data dell’atto'; label = 'Atto firmato il'; }
 return mk('cal', 'LA DATA GIUSTA', `Scadenziario · ${who.last}`, {ask, answer:due.toDateString(), month:[due.getFullYear(), due.getMonth()], sources:[{t:'Regola', rows:[['Termine', rule]]}, {t:'Pratica', rows:[[label, date(d)]]}], winWhy:'Data giusta: Otto la mette in scadenziario con un promemoria una settimana prima.', hint:rule});
}

// ————— Antiriciclaggio · Quanto possiede davvero? —————
function antiriciclaggioMission() {
 const company = srl(), holding = `${G.pick(['Helix', 'Orione', 'Kappa', 'Delta'])} Holding S.r.l.`, who = G.person();
 const a = G.pick([30, 35, 40, 45, 50, 60]), b = G.pick([40, 50, 60, 70, 80]), direct = G.pick([5, 10, 15]);
 const k = by('uno', 'due', G.pick(['due', 'somma']));
 if (k === 'uno') return mk('calc', 'QUANTO POSSIEDE?', `Antiriciclaggio · ${company}`, {ask:`${holding} ha il ${a}% di ${company}. ${who.name} possiede <b>il 100% di ${holding}</b>. Che percentuale di ${company} controlla?`, unit:'%', answer:a, tolerance:.05, sources:[{t:`Visura ${company}`, rows:[[holding, `${a}%`]]}, {t:`Visura ${holding}`, rows:[[who.name, '100%']]}], winWhy:`${a}%: sopra il 25%, quindi ${who.name} è titolare effettivo.`, hint:'Con il 100% della holding si controlla tutta la sua quota.'});
 const tot = a * b / 100 + (k === 'somma' ? direct : 0);
 return mk('calc', 'QUANTO POSSIEDE?', `Antiriciclaggio · ${company}`, {ask:`Che percentuale di <b>${company}</b> possiede ${who.name}${k === 'somma' ? ', sommando quota diretta e indiretta' : ' attraverso la holding'}?`, unit:'%', answer:tot, tolerance:.05, sources:[{t:`Visura ${company}`, rows:[[holding, `${a}%`], ...(k === 'somma' ? [[who.name, `${direct}% diretto`]] : [])]}, {t:`Visura ${holding}`, rows:[[who.name, `${b}%`]]}], winWhy:`${tot.toLocaleString('it-IT')}%: ${tot > 25 ? 'sopra' : 'sotto'} la soglia del 25%, quindi ${tot > 25 ? 'è' : 'non è'} titolare effettivo.`, hint:`Si moltiplicano le quote: ${a} × ${b}%${k === 'somma' ? ` + ${direct}` : ''}.`});
}

// ————— Compliance · Consenti o rifiuta —————
function complianceMission() {
 const n = by(3, 4, 5), pool = [
  ['Banca Arno chiede la bozza della pratica di cui è parte', 'ok'], ['Il cliente chiede i suoi dati dall’email registrata', 'ok'], ['Il commercialista con delega scritta chiede l’atto della società', 'ok'], ['Il coerede chiede la dichiarazione di successione', 'ok'],
  ['L’ex coniuge chiede copia dell’atto di acquisto dell’altro', 'no'], ['Un’agenzia immobiliare chiede il prezzo di una vendita', 'no'], ['Un indirizzo non registrato chiede l’export dei dati di un cliente', 'no'], ['Un giornalista chiede i nomi dei soci di una società cliente', 'no']];
 const items = G.shuffle(pool).slice(0, n).map(([text, ans]) => ({text, ans}));
 if (!items.some(i => i.ans === 'ok')) items[0] = {text:pool[0][0], ans:'ok'};
 if (!items.some(i => i.ans === 'no')) items[n - 1] = {text:pool[4][0], ans:'no'};
 return mk('classify', 'CONSENTI O RIFIUTA', 'Compliance · richieste di accesso', {ask:'Arrivano richieste di documenti e dati. <b>Consenti</b> solo a chi ne ha diritto.', sources:[{t:'Regola dello studio', rows:[['Si consente a', 'parti della pratica, interessati verificati, chi ha delega scritta'], ['Si rifiuta a', 'terzi, indirizzi non verificati']]}], states:[['ok', 'Consenti'], ['no', 'Rifiuta']], items, winWhy:'Accessi giusti: chi ha diritto riceve i documenti, gli altri no. Tutto finisce nel registro di audit.'});
}



// ————— Osservatorio · Chi va avvisato? (pick) —————
// Agevolazione prima casa: chi vende entro 5 anni dall'acquisto la perde, salvo riacquistare un'altra prima casa entro un anno.
function primaCasaMission() {
 const [a, b, c] = [G.person(), G.person(), G.person()], y = n => 2026 - n;
 const cards = [
  {title:a.name, meta:`comprata nel ${y(3)} con l’agevolazione`, body:'Vende ora, nessun nuovo acquisto in vista.', ok:true},
  {title:b.name, meta:`comprata nel ${y(G.int(6, 9))} con l’agevolazione`, body:'Vende ora, nessun nuovo acquisto.', why:'Sono passati più di 5 anni dall’acquisto: l’agevolazione non si perde più.'},
  {title:c.name, meta:`comprata nel ${y(2)} con l’agevolazione`, body:`Vende ora e ha già comprato un’altra prima casa ${G.int(3, 9)} mesi fa.`, why:'Ha riacquistato entro un anno: l’agevolazione è salva, e matura anche il credito d’imposta.'}
 ];
 return {mission:mk('pick', 'CHI VA AVVISATO?', 'Osservatorio · agevolazione prima casa', {ask:'L’Osservatorio segnala i chiarimenti sulla <b>decadenza dall’agevolazione prima casa</b>. Tra le vendite in agenda, <b>chi va avvisato subito</b>?', sources:[{t:'Regola (sintesi)', rows:[['Decadenza', 'vendita entro 5 anni dall’acquisto agevolato'], ['Salvo', 'riacquisto di un’altra abitazione principale entro 1 anno']]}], cards:G.shuffle(cards), winWhy:'Avvisato prima del rogito: il cliente sa che ha un anno per riacquistare, e lo studio lo mette in scadenziario.'}),
  brief:{what:'È uscita una novità che tocca alcune pratiche in agenda. Scegli il cliente che rischia davvero e va avvisato prima della firma.', why:'Un cliente avvisato prima del rogito può ancora organizzarsi; dopo, paga imposte, sanzioni e interessi.'}};
}

// ————— Staff · Chi segue la firma? (pick) —————
function firmaMission() {
 const act = G.pick([['una compravendita con mutuo', 'GM', 'immobiliare'], ['una costituzione di S.r.l.', 'LB', 'societario'], ['una successione', 'EF', 'successioni']]);
 const by2 = {GM:'Giulia Marchi', LB:'Luca Benassi', EF:'Elena Ferri', SR:'Sara Ricci'};
 const others = Object.keys(by2).filter(k => k !== act[1]), busyK = G.pick(others.filter(k => k !== 'SR'));
 const load = G.int(45, 70);
 const cards = [
  {title:by2[act[1]], meta:`${act[2]} · carico ${load}%`, body:'Segue questa materia ed è in studio venerdì.', ok:true},
  {title:by2.SR, meta:'segreteria · carico 30%', body:'È la più libera.', why:'Sara segue agenda e clienti, non istruisce pratiche: la firma va a chi conosce la materia.'},
  {title:by2[busyK], meta:`carico 95% · venerdì in Conservatoria`, body:'Ha esperienza su tutto.', why:'Venerdì è fuori studio e ha già il carico pieno: la pratica resterebbe ferma.'}
 ];
 return {mission:mk('pick', 'CHI SEGUE LA FIRMA?', 'Staff · la firma di venerdì', {ask:`Paolo Donati è in ferie e venerdì c’è la firma di <b>${act[0]}</b>. A chi la affidi?`, sources:[{t:'Competenze dello studio', rows:[['Immobiliare', by2.GM], ['Societario', by2.LB], ['Successioni', by2.EF], ['Segreteria', by2.SR]]}], cards:G.shuffle(cards), winWhy:'Pratica a chi la conosce e ha tempo: la firma resta in agenda e nessuno corre all’ultimo.'}),
  brief:{what:'Qualcuno è assente e c’è una firma da coprire. Scegli chi la segue: deve conoscere la materia ed essere libero quel giorno.', why:'Una pratica data alla persona sbagliata si ferma, o arriva alla firma con un errore.'}};
}

// ————— Compliance · La violazione dei dati (in fila) —————
function breachMission() {
 const what = G.pick(['Un’email con l’atto di un cliente è partita all’indirizzo sbagliato', 'Il portatile di un collaboratore con le pratiche è stato rubato in treno', 'Un allegato con i documenti d’identità è finito in una chat di gruppo']);
 const steps = [['Contieni la violazione', 'chiedi la cancellazione, blocca l’accesso, cambia le password'], ['Valuta il rischio per le persone', 'che dati, quante persone, che conseguenze'], ['Notifica al Garante entro 72 ore', 'se c’è un rischio per i diritti delle persone'], ['Informa i clienti coinvolti', 'se il rischio è elevato'], ['Registra tutto nel registro delle violazioni', 'anche quando non si notifica']].slice(0, by(4, 5, 5)).map(([t, sub]) => ({t, sub}));
 return {mission:mk('order', 'IN FILA', 'Compliance · violazione dei dati', {ask:`<b>${what}.</b> Cosa si fa, dal primo all’ultimo passaggio?`, steps, sources:[{t:'Regolamento privacy (GDPR, sintesi)', rows:[['Notifica al Garante', 'entro 72 ore da quando lo studio lo scopre'], ['Registro', 'ogni violazione si documenta']]}], winWhy:'Prima si ferma il danno, poi si valuta, poi si notifica nei tempi: e tutto resta scritto nel registro.'}, 180000),
  brief:{what:'Una violazione dei dati: un documento finito dove non doveva. Metti in fila la procedura, dal primo all’ultimo passaggio.', why:'Il termine di 72 ore per avvisare il Garante corre da quando lo studio lo scopre: l’ordine giusto fa risparmiare ore preziose.'}};
}

// Missioni in più: a ogni partita se ne accendono alcune a caso, e solo da un certo punto (ch: 1 = capitolo 2, lvl: livello).
const extras = [{page:'osservatorio', fn:primaCasaMission, p:.75, ch:1}, {page:'staff', fn:firmaMission, p:.75, lvl:2}, {page:'compliance', fn:breachMission, p:.7, ch:1}];
let active = new Set(extras);
const ready = x => active.has(x) && (x.ch == null || gameState().chapter >= x.ch) && (x.lvl == null || lvl() >= x.lvl);
const withExtras = (page, fn) => () => { const c = [fn, ...extras.filter(x => x.page === page && ready(x)).map(x => x.fn)]; return c[rnd(c.length)](); };
export const extraGenerators = extras.map(x => ({page:x.page, name:x.fn.name, make:() => x.fn()}));

// Il primo arrivo di ogni settore lo spiega un Otto di quel settore: cosa fai e perché, a tempo fermo.
const briefs = {
 posta:{where:'nella posta dello studio', role:'otto-cap', name:'Otto postino', what:'Nella posta è arrivato qualcosa che Otto non può smistare da solo: leggi bene e decidi tu.', why:'Ogni email sbagliata di posto è una pratica che si ferma, e un dato sbagliato in un allegato finisce dritto nell’atto.'},
 centralino:{where:'al centralino, con una chiamata in linea', role:'otto-phone', name:'Otto centralinista', what:'Una chiamata che Otto non può chiudere da solo: scegli tu le risposte, guardando agenda e regole dello studio.', why:'Al telefono si dà solo quello che si può dare: date vere, e mai informazioni su altri clienti.'},
 whatsapp:{where:'su WhatsApp, nella chat con un cliente', role:'otto-phone', name:'Otto messaggi', what:'Otto ha scritto la risposta al cliente, ma un dato non coincide con la pratica: trovalo e correggilo.', why:'Un orario o un importo sbagliato in un messaggio diventa una firma saltata o una banca che aspetta.'},
 studio:{where:'nello Studio, con il modulo della pratica aperto', role:'otto-notary', name:'Otto del notaio', what:'Nel modulo manca un dato: copialo dalla fonte giusta, una casella alla volta.', why:'Un IBAN, un codice fiscale o un subalterno sbagliati bloccano il mutuo o rendono l’atto da correggere.'},
 memoria:{where:'nell’archivio dello studio', role:'otto-read', name:'Otto archivista', what:'Tra i precedenti dello studio, scegli quello che risponde davvero alla domanda.', why:'Riusare il precedente giusto fa risparmiare ore; quello sbagliato porta nell’atto una clausola che non c’entra.'},
 visure:{where:'alle visure, con l’esito appena arrivato', role:'otto-inspector', name:'Otto delle visure', what:'È arrivato l’esito della visura: confrontalo con il documento della pratica e trova la riga che non torna.', why:'Vale il registro pubblico: se nell’atto finisce un dato diverso, la trascrizione può essere rifiutata.'},
 preventivi:{where:'ai preventivi, con un cliente che aspetta la cifra', role:'otto-bow', name:'Otto contabile', what:'Il cliente aspetta la cifra: fai il conto con la calcolatrice, guardando le regole accanto.', why:'Un preventivo sbagliato si paga due volte: in fiducia del cliente e in differenza da coprire.'},
 osservatorio:{where:'all’osservatorio, con una novità appena pubblicata', role:'otto-inspector', name:'Otto osservatore', what:'È uscita una novità: per ogni pratica decidi se si applica o no.', why:'Una regola nuova applicata alla pratica sbagliata, o dimenticata in quella giusta, cambia imposte e tempi.'},
 staff:{where:'all’organizzazione del team', role:'otto-star', name:'Otto organizzatore', what:'Qualcuno è assente: riassegna ogni attività alla persona giusta.', why:'Un termine che resta sulla scrivania di chi è in ferie è un termine perso.'},
 scadenze:{where:'allo scadenziario degli atti', role:'otto-read', name:'Otto dello scadenziario', what:'Dalla data dell’atto, trova sul calendario il giorno giusto della scadenza.', why:'Registrazione e trascrizione hanno termini di legge: un giorno di ritardo costa sanzioni allo studio.'},
 antiriciclaggio:{where:'all’antiriciclaggio, con una società da verificare', role:'otto-inspector', name:'Otto antiriciclaggio', what:'Calcola quanto possiede davvero la persona dietro le società: è lei il titolare effettivo?', why:'Il notaio deve sapere chi c’è dietro una società: è un obbligo di legge, e la soglia è il 25%.'},
 compliance:{where:'al registro della privacy', role:'otto-notary', name:'Otto della privacy', what:'Sono arrivate richieste di accesso ai dati: per ognuna decidi se consentirla o rifiutarla.', why:'I dati dei clienti si danno solo a chi ne ha diritto: un accesso sbagliato è una violazione della privacy.'}
};
// Seconde versioni delle spiegazioni: Otto non racconta il settore sempre con le stesse parole (si estrae a caso).
const briefAlt = {
 posta:{what:'In casella c’è qualcosa che va guardato da una persona: allegati da controllare o email da assegnare. Leggi e decidi.', why:'Una pratica si ferma più spesso per un’email finita nel posto sbagliato che per un problema giuridico.'},
 centralino:{what:'C’è una chiamata in linea e Otto ha bisogno di te per le risposte: guarda agenda, regole e privacy prima di parlare.', why:'Al telefono non si danno informazioni su altri clienti, e le date si danno solo se sono vere.'},
 whatsapp:{what:'Il cliente aspetta una risposta su WhatsApp. Otto l’ha scritta, ma c’è un dato che non coincide con la pratica.', why:'Un importo o una data sbagliata in chat diventa un cliente che si presenta il giorno sbagliato, o una banca che non bonifica.'},
 studio:{what:'Il modulo è quasi pronto: manca un dato da copiare dal documento giusto, una casella alla volta.', why:'Nei moduli bancari e catastali non esistono errori piccoli: un carattere sbagliato blocca tutto.'},
 memoria:{what:'Otto ha trovato più atti simili in archivio. Scegli quello che risponde davvero alla domanda del notaio.', why:'Un precedente sbagliato porta con sé clausole che non c’entrano: si riparte da quello giusto.'},
 visure:{what:'La visura è tornata dal registro: mettila accanto al documento della pratica e trova il dato che non coincide.', why:'Il registro pubblico ha sempre ragione: un dato diverso nell’atto vuol dire una trascrizione respinta.'},
 preventivi:{what:'Il cliente vuole sapere quanto spenderà. Fai il conto, regole e aliquote sono accanto.', why:'Il preventivo è un impegno dello studio: se è sbagliato, la differenza la paga qualcuno.'},
 osservatorio:{what:'È cambiata una regola. Per ogni pratica aperta, decidi se la novità la tocca o no.', why:'Le novità normative cambiano imposte e tempi: applicarle a metà è peggio che non saperle.'},
 staff:{what:'Una persona del team è assente: le sue attività vanno date a chi può farle davvero.', why:'Un’attività lasciata sulla scrivania vuota è un termine che scade senza che nessuno se ne accorga.'},
 scadenze:{what:'Dalla data dell’atto, calcola il giorno della scadenza e segnalo sul calendario.', why:'I termini di registrazione e trascrizione non perdonano: un giorno dopo è già sanzione.'},
 antiriciclaggio:{what:'Dietro la società ci sono altre società: calcola quanto possiede davvero la persona in cima alla catena.', why:'La legge chiede al notaio di sapere chi comanda davvero: sopra il 25% è il titolare effettivo.'},
 compliance:{what:'Ci sono richieste di accesso ai dati dei clienti: per ognuna, chi la fa ha diritto di averli?', why:'Un dato dato alla persona sbagliata è una violazione da notificare al Garante.'}
};
Object.entries(briefAlt).forEach(([k, v]) => { briefs[k].alt = [v]; });


// ————— regista —————
// Le missioni sono un bonus raro (una ogni un paio di minuti): il cuore della sfida sono i compiti veri.
// Gira su tutti i moduli, così ogni sezione dello studio prima o poi ha la sua missione.
const pages = {posta:() => [allegatiMission, postaMission, frodeMission][rnd(3)](), centralino:centralinoMission, whatsapp:whatsappMission, studio:studioMission, memoria:memoriaMission, visure:visureMission, preventivi:preventiviMission, osservatorio:withExtras('osservatorio', osservatorioMission), staff:withExtras('staff', staffMission), scadenze:() => (rnd(2) ? proceduraMission : scadenzeMission)(), antiriciclaggio:antiriciclaggioMission, compliance:withExtras('compliance', complianceMission)};
const rotation = ['posta', 'visure', 'centralino', 'preventivi', 'whatsapp', 'studio', 'scadenze', 'memoria', 'antiriciclaggio', 'staff', 'compliance', 'osservatorio'];
let open = [];
function spawn(force, forced) {
 if (!running && !force) return;
 if (!force && (document.body.classList.contains('touring') || document.hidden)) return schedule(3);
 // una missione arriva solo quando il giocatore ha preso la mano (due compiti fatti) e c'è spazio nel livello
 if (force || canSpawnMission()) {
  const busy = new Set(open.filter(x => x.open).map(x => x.page));
  const order = rotation.slice(turn % rotation.length).concat(rotation.slice(0, turn % rotation.length));
  // nella storia, l'antagonista del capitolo porta più spesso missioni dalle sue sezioni
  const bias = storyBias()?.filter(p => pages[p] && !busy.has(p)), fromStory = !force && bias?.length && Math.random() < .6 ? bias[Math.floor(Math.random() * bias.length)] : null;
  const page = force || fromStory || order.find(p => !busy.has(p)) || order[0]; turn = rotation.indexOf(page) + 1;
  const made = forced ? forced() : pages[page](), mission = made.mission || made, ttl = Math.round(mission.ttl * by(1, .85, .7)), rec = {open:true, page};
  let item = null;
  if (made.anchor === 'mail') item = spawnMail({...made.mail, priority:'alta', assignee:'GM', prepared:[], draft:''});
  if (made.anchor === 'chat') item = spawnChat(made.chat);
  if (made.anchor === 'call') item = spawnCall(made.call);
  const id = addMission({...mission, ttl, page, ref:item?.id, brief:made.brief ? {...briefs[page], alt:null, ...made.brief} : briefs[page], onDone:() => { rec.open = false; if (item) { item.missionOpen = false; if (made.anchor === 'call') Object.assign(item, {duration:'2:40', outcome:'Gestita con te'}); } onHandled(item?.id, page); schedule(G.int(120, 180)); }});
  if (item) { item.mission = id; item.missionOpen = true; live.missions.push(item); }
  open.push(rec);
 }
 // se la missione non è potuta arrivare (troppo presto o troppe cose aperte), si riprova tra poco
 if (!force) schedule(open.some(x => x.open) ? G.int(90, 140) : 15);
}
// Per i test e le prove a mano: fa arrivare subito la missione di una sezione.
// Con k = 0, 1… fa arrivare una missione extra precisa del settore, anche se in questa partita non è accesa.
export const spawnNow = (page, k) => spawn(page, k == null ? null : extras.filter(x => x.page === page)[k]?.fn);
function schedule(s) { clearTimeout(timer); timer = setTimeout(spawn, s * 1000); }
// a ogni partita l'ordine dei settori si rimescola davvero: le prime missioni non sono mai le stesse
const reshuffle = () => { for (let i = rotation.length - 1; i > 0; i--) { const j = rnd(i + 1); [rotation[i], rotation[j]] = [rotation[j], rotation[i]]; } };
export function startMissions(handled) { onHandled = handled || onHandled; running = true; turn = 0; reshuffle(); active = new Set(extras.filter(x => Math.random() < x.p)); open = []; schedule(45); }
export function stopMissions() { running = false; live.game = false; clearTimeout(timer); }
// Per i test: i generatori di ogni modulo, con un livello forzato.
export const generators = pages;
export const setTestLevel = l => { testLevel = l; };
