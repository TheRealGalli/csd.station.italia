// Otto: un unico agente per tutti i moduli. In questa anteprima le risposte sono scenari dimostrativi
// costruiti sui dati di demo.js. Il contratto (passaggi → risposta → documento → azioni) è quello
// che il backend reale dovrà restituire.
import {persona} from './persona.js';
import {sources as S, practices, tasks, mails, calls, deadlines, person} from './demo.js';

const hit = (text, words) => words.some(w => text.includes(w));

export const studioSuggestions = [
 {id:'erogazione', label:'Compila il modulo di erogazione Banca Arno', prompt:'Compila il modulo di erogazione di Banca Arno per la pratica Rossi / Verdi'},
 {id:'confronto', label:'Confronta preliminare e bozza d’atto', prompt:'Confronta il preliminare con la bozza d’atto Rossi / Verdi'},
 {id:'bozza', label:'Redigi la bozza di compravendita', prompt:'Redigi la bozza dell’atto di compravendita Rossi / Verdi dal clausolario'},
 {id:'ricerca', label:'Cerca servitù di passaggio a Fiesole', prompt:'Cerca negli atti dello studio servitù di passaggio a Fiesole'}
];

const scenarios = {
 erogazione: () => ({
  steps:[
   'Apro la pratica P-184 · Rossi / Verdi',
   'Leggo l’email di Banca Arno e i 3 allegati',
   'Recupero i dati da documenti d’identità, preliminare e perizia',
   'Controllo i 7 moduli Banca Arno già compilati in archivio',
   'Incrocio i dati catastali con la visura di stamattina'
  ],
  reply:'Ho compilato **9 campi su 10**. Il subalterno è **8** secondo perizia e visura, ma la bozza d’atto riporta **6**: ho usato 8 e l’ho segnalato. L’IBAN della venditrice non è in nessun documento, quindi l’ho lasciato vuoto.',
  artifact:{type:'form', title:'Banca Arno · Richiesta di erogazione mutuo', file:'Modulo_erogazione.pdf', fields:[
   {label:'Mutuatario', value:'Mario Rossi', source:S.ci},
   {label:'Codice fiscale', value:'RSSMRA85M01D612X', source:S.cf},
   {label:'Co-mutuataria', value:'Chiara Fabbri', source:S.delibera},
   {label:'Importo del mutuo', value:'€ 180.000,00', source:S.delibera},
   {label:'Durata', value:'25 anni', source:S.delibera},
   {label:'Immobile', value:'Firenze, Via dei Tigli 12, int. 4', source:S.preliminare},
   {label:'Dati catastali', value:'Fg. 42 · Part. 318 · Sub. 8', source:S.visura, warn:'La bozza d’atto riporta Sub. 6'},
   {label:'Data di stipula', value:'24/10/2026 · ore 10:30', source:S.agenda},
   {label:'Notaio rogante', value:`Notaio ${persona.name}`, source:'Anagrafica studio'},
   {label:'IBAN parte venditrice', value:'', source:'', missing:'Non presente nei documenti: da chiedere all’avv. Lorenzi'}
  ]},
  actions:[{label:'Scarica PDF compilato', act:'download-form', icon:'download'},{label:'Prepara la risposta alla banca', act:'go:posta', icon:'message'},{label:'Chiedi l’IBAN su WhatsApp', act:'go:whatsapp', icon:'arrow'}]
 }),
 confronto: () => ({
  steps:['Apro preliminare del 02/09 e bozza d’atto v2','Allineo le clausole per argomento','Confronto importi, dati catastali e termini','Verifico le differenze con la visura'],
  reply:'Ho trovato **3 differenze** su 8 punti controllati. Due sono probabilmente refusi della bozza; la terza (caparra) va chiarita con le parti.',
  artifact:{type:'diff', title:'Preliminare 02/09 ↔ Bozza d’atto v2', rows:[
   ['Prezzo','€ 245.000,00','€ 245.000,00','ok'],
   ['Dati catastali','Fg. 42 · Part. 318 · Sub. 8','Fg. 42 · Part. 318 · Sub. 6','ko','Visura e perizia confermano Sub. 8'],
   ['Caparra confirmatoria','€ 24.500,00','€ 25.000,00','ko','Verificare con le parti la somma effettivamente versata'],
   ['Intestazione','Rossi e Fabbri · 1/2 ciascuno','Rossi e Fabbri · 1/2 ciascuno','ok'],
   ['Agevolazione prima casa','Richiesta da entrambi','Clausola presente','ok'],
   ['Certificato di agibilità','Da consegnare','Dichiarato consegnato','ko','Non ancora ricevuto: email avv. Lorenzi 17/10'],
   ['Mediazione','Agenzia Casa Arno · € 6.100','Agenzia Casa Arno · € 6.100','ok'],
   ['Termine per la stipula','Entro il 31/10/2026','24/10/2026','ok']
  ]},
  actions:[{label:'Correggi la bozza', act:'studio:bozza', icon:'check'},{label:'Assegna a Giulia', act:'toast:Attività assegnata a Giulia Marchi', icon:'users'}]
 }),
 bozza: () => ({
  steps:['Scelgo il modello “Compravendita con mutuo” v7','Compilo le parti dalle anagrafiche verificate','Inserisco le clausole dal clausolario dello studio','Applico le correzioni del confronto (Sub. 8)','Segno i punti che richiedono la tua decisione'],
  reply:'La bozza è pronta: **comparsa e 5 articoli**. Ogni clausola indica da dove arriva. Ho lasciato evidenziati i due punti su cui serve la tua decisione.',
  artifact:{type:'draft', title:'Compravendita con mutuo · Rossi / Verdi · bozza v3', clauses:[
   {head:'Comparsa', text:`Avanti a me, Notaio ${persona.name}, sono presenti: Anna Verdi, venditrice; Mario Rossi e Chiara Fabbri, acquirenti, della cui identità personale io Notaio sono certo.`, source:'Modello studio v7 · anagrafiche verificate'},
   {head:'Art. 1 · Oggetto', text:'La venditrice vende agli acquirenti, che acquistano in parti uguali, l’appartamento in Firenze, Via dei Tigli 12, int. 4, censito al Catasto Fabbricati al foglio 42, particella 318, subalterno 8.', source:'Visura 17/10 · corretto da Sub. 6'},
   {head:'Art. 2 · Prezzo', text:'Il prezzo è convenuto in € 245.000,00, di cui € 24.500,00 già versati a titolo di caparra confirmatoria.', source:'Preliminare 02/09 · p. 2', decide:'Caparra: € 24.500 (preliminare) o € 25.000 (bozza v2)?'},
   {head:'Art. 3 · Garanzie', text:'La venditrice garantisce la piena proprietà e la libertà da pesi, ipoteche e trascrizioni pregiudizievoli, salvo l’ipoteca del 2011 che sarà cancellata a seguito dell’estinzione contestuale del mutuo.', source:'Clausolario C-12 · ispezione ipotecaria 17/10'},
   {head:'Art. 4 · Dichiarazioni urbanistiche', text:'La venditrice dichiara che l’immobile è stato costruito in data anteriore al 1° settembre 1967 e che successivamente non sono stati eseguiti interventi soggetti a titolo abilitativo.', source:'Clausolario C-31 v4', decide:'Agibilità non ancora ricevuta: mantenere la clausola?'},
   {head:'Art. 5 · Agevolazioni', text:'Gli acquirenti chiedono l’applicazione delle agevolazioni per l’acquisto della prima casa e rendono le relative dichiarazioni.', source:'Clausolario C-44'}
  ]},
  actions:[{label:'Esporta in Word', act:'toast:Esportazione disponibile con il backend', icon:'download'},{label:'Invia al notaio per approvazione', act:`toast:Inviata a ${persona.name} per approvazione`, icon:'arrow'}]
 }),
 'confronto-statuto': () => ({
  steps:['Apro statuto Lumen Tech v2 (archivio) e v3 (email della commercialista)','Confronto articolo per articolo','Verifico la coerenza con le clausole societarie dello studio'],
  reply:'Tra v2 e v3 ci sono **2 modifiche rilevanti** e 4 correzioni formali. Il nuovo quorum è più alto della media dei nostri statuti.',
  artifact:{type:'diff', title:'Statuto Lumen Tech · v2 ↔ v3', rows:[
   ['Art. 8 · Gradimento','Gradimento dell’assemblea','Gradimento dell’organo amministrativo, motivato','ko','Più restrittivo: va previsto il diritto di recesso'],
   ['Art. 14 · Decisioni straordinarie','Maggioranza del 66%','Maggioranza del 75%','ko','Con il 40% di Helix, il socio estero avrebbe diritto di veto'],
   ['Art. 3 · Oggetto sociale','Sviluppo software','Sviluppo software e consulenza','ok'],
   ['Art. 20 · Esercizio sociale','1/1 – 31/12','1/1 – 31/12','ok']
  ]},
  actions:[{label:'Proponi formulazione alternativa', act:'toast:Bozza alternativa preparata per Luca Benassi', icon:'sparkle'}]
 }),
 ricerca: () => ({
  steps:['Cerco in 12.480 atti, clausole e note','Filtro per Comune di Fiesole e servitù','Ordino per somiglianza con la pratica'],
  reply:'Ho trovato **3 atti** pertinenti. Il più vicino è la Rep. 11.902, con servitù pedonale e carrabile.',
  artifact:{type:'results', title:'Servitù di passaggio · Fiesole', items:[
   ['Rep. 11.902 · Compravendita · 2024','“…si costituisce servitù di passaggio pedonale e carrabile a carico della particella 77…”','97%'],
   ['Rep. 10.377 · Divisione · 2022','“…resta ferma la servitù di passaggio sulla strada vicinale già esistente…”','84%'],
   ['Rep. 9.015 · Costituzione di servitù · 2021','“…il fondo servente sito in Fiesole, località Montebeni…”','78%']
  ]},
  actions:[{label:'Usa la clausola della Rep. 11.902', act:'toast:Clausola aggiunta al clausolario della pratica', icon:'plus'}]
 })
};

export function studioScenario(text) {
 const t = text.toLowerCase();
 if (scenarios[t]) return scenarios[t]();
 if (hit(t, ['statuto','lumen'])) return scenarios['confronto-statuto']();
 if (hit(t, ['erogazion','modulo','compila','banca'])) return scenarios.erogazione();
 if (hit(t, ['confront','differenz','diff'])) return scenarios.confronto();
 if (hit(t, ['bozza','redig','clausol','atto di'])) return scenarios.bozza();
 if (hit(t, ['cerca','servit','preceden','trova'])) return scenarios.ricerca();
 return {
  steps:['Leggo la richiesta','Cerco nella pratica e nell’archivio'],
  reply:'In questa anteprima so compilare il modulo di erogazione, confrontare preliminare e bozza, redigere la compravendita Rossi / Verdi, confrontare lo statuto Lumen Tech e cercare precedenti. Prova una di queste richieste, oppure carica un PDF con campi compilabili.',
  artifact:null, actions:[]
 };
}

// Otto globale: risponde da qualsiasi modulo con una visione d'insieme.
export function askOtto(text) {
 const t = text.toLowerCase();
 if (hit(t, ['oggi','fare','priorit','giornata'])) {
  const mine = tasks.filter(x => !x.done && x.due === 'Oggi');
  return {text:`Oggi ci sono **${mine.length} attività** in scadenza e **2 decisioni** che spettano a te: il subalterno nella pratica Rossi / Verdi e il titolare effettivo di Helix Ventures. La stipula Rossi / Verdi è venerdì alle 10:30.`, links:[['Apri la posta','posta'],['Vedi il team','staff']]};
 }
 if (hit(t, ['rossi','verdi','p-184'])) {
  const p = practices[0];
  return {text:`**${p.name}** · ${p.type}, al ${p.progress}%. Stipula ${p.stipula}. Mancano agibilità e IBAN della venditrice; il modulo di erogazione è compilato. Responsabile: ${person(p.owner).name}.`, links:[['Apri nello Studio','studio'],['Scadenze','scadenze']]};
 }
 if (hit(t, ['chiamat','telefon','centralino'])) return {text:`Oggi **${calls.length} chiamate**: un nuovo cliente (Laura Bianchi, prima casa), Banca Arno, Giorgio Sarti per spostare la firma e un anonimo a cui non ho dato informazioni.`, links:[['Apri il centralino','centralino']]};
 if (hit(t, ['email','posta','mail'])) return {text:`Ho letto **${mails.length} email** e preparato ${mails.filter(m => m.draft).length} bozze di risposta. Due sono ad alta priorità: Banca Arno e lo statuto Lumen Tech.`, links:[['Apri la posta','posta']]};
 if (hit(t, ['scadenz','termin','trascri','deposit'])) {
  const urgent = deadlines.filter(d => d.state === 'urgent');
  return {text:`**${urgent.length} termini** nei prossimi 5 giorni: ${urgent.map(d => `${d.what.toLowerCase()} (${d.act.split(' · ')[0]}, ${d.due})`).join(' e ')}. Paolo è in ferie: ti propongo di riassegnarli.`, links:[['Apri lo scadenziario','scadenze']]};
 }
 return {text:'Vedo posta, chiamate, pratiche, archivio, scadenze e team. Chiedimi per esempio “cosa c’è da fare oggi?”, “a che punto è la pratica Rossi?” o “ci sono scadenze vicine?”.', links:[]};
}

export const ottoSuggestions = ['Cosa c’è da fare oggi?','A che punto è la pratica Rossi?','Ci sono scadenze vicine?','Chi ha chiamato stamattina?'];

// Abbina i campi di un PDF caricato ai dati conosciuti della pratica (euristica dimostrativa).
const known = [
 [['nome completo','mutuatario','intestatario'], 'Mario Rossi'], [['cognome'], 'Rossi'], [['nome'], 'Mario'], [['codice fiscale','cf','fiscal'], 'RSSMRA85M01D612X'],
 [['comune','città','citta'], 'Firenze'], [['indirizzo','via','residenza'], 'Via dei Tigli 12'],
 [['foglio'], '42'], [['particella','mappale'], '318'], [['subalterno','sub'], '8'],
 [['importo'], '180.000,00'], [['prezzo'], '245.000,00'], [['data'], '24/10/2026'], [['notaio'], persona.name],
 [['provincia'], 'FI'], [['cap'], '50123']
];
export function proposeValues(fields) {
 const out = {};
 for (const f of fields) {
  if (f.type !== 'text' || f.readOnly) continue;
  const n = f.name.toLowerCase();
  const match = known.find(([keys]) => keys.some(k => n.includes(k)));
  if (match) out[f.name] = match[1];
 }
 return out;
}
