// Studio dimostrativo. Persone, pratiche, numeri di repertorio, banche e documenti sono INVENTATI.
// Ogni modulo legge da qui: è il "mondo" condiviso che l'AI vede quando lavora.

export const studio = {name:'Studio Notarile Conti & Associati', city:'Firenze', notary:'Notaio Andrea Conti'};

export const team = [
 {id:'AC', name:'Andrea Conti', role:'Notaio titolare', load:62, present:true},
 {id:'EF', name:'Elena Ferri', role:'Notaio associato', load:48, present:true},
 {id:'GM', name:'Giulia Marchi', role:'Pratiche immobiliari', load:86, present:true},
 {id:'LB', name:'Luca Benassi', role:'Societario', load:57, present:true},
 {id:'SR', name:'Sara Ricci', role:'Segreteria & accoglienza', load:40, present:true},
 {id:'PD', name:'Paolo Donati', role:'Adempimenti & post-stipula', load:71, present:false, away:'Ferie fino a lunedì'}
];
export const person = id => team.find(t => t.id === id) || {id, name:id, role:''};

export const practices = [
 {id:'P-184', name:'Rossi / Verdi', type:'Compravendita con mutuo', owner:'GM', notary:'AC', stage:'Pre-stipula', progress:72, stipula:'24 ott · 10:30', parties:['Mario Rossi (acquirente)','Chiara Fabbri (acquirente)','Anna Verdi (venditrice)','Banca Arno (mutuante)']},
 {id:'P-191', name:'Lumen Tech S.r.l.', type:'Costituzione di società', owner:'LB', notary:'EF', stage:'Statuto in revisione', progress:45, stipula:'29 ott · 15:00', parties:['Marco Bellandi','Sofia Ranieri','Helix Ventures Ltd']},
 {id:'P-176', name:'Successione Moretti', type:'Successione e accettazione', owner:'PD', notary:'EF', stage:'Raccolta documenti', progress:30, stipula:'—', parties:['Lucia Moretti','Davide Moretti']},
 {id:'P-195', name:'Donazione Sarti', type:'Donazione immobile', owner:'GM', notary:'AC', stage:'Da fissare', progress:55, stipula:'Da confermare', parties:['Giorgio Sarti','Elisa Sarti']},
 {id:'P-199', name:'Bianchi · prima casa', type:'Preventivo compravendita', owner:'SR', notary:'AC', stage:'Nuova richiesta', progress:8, stipula:'—', parties:['Laura Bianchi']}
];
export const practice = id => practices.find(p => p.id === id);

// POSTA — ogni email porta con sé ciò che l'AI ha capito e preparato.
export const mails = [
 {id:'m1', from:'Banca Arno · Ufficio mutui', address:'mutui@bancaarno.example', time:'08:14', subject:'Pratica mutuo Rossi – documentazione per erogazione', practice:'P-184', priority:'alta', assignee:'GM', kind:'Banca',
  attachments:['Delibera_mutuo.pdf','Perizia_immobile.pdf','Modulo_erogazione.pdf'],
  body:'Gentile Notaio, in allegato delibera, perizia e modulo di richiesta erogazione per il mutuo intestato ai sigg. Rossi e Fabbri. Vi chiediamo di restituire il modulo compilato e di confermare la data di stipula. Cordiali saluti, Ufficio mutui.',
  understood:'La banca ha deliberato il mutuo di € 180.000 e chiede il modulo di erogazione compilato. La perizia indica il subalterno 8, la bozza d’atto riporta il 6.',
  prepared:[{icon:'file',text:'Modulo di erogazione compilato (9 campi su 10)',go:'studio:erogazione'},{icon:'message',text:'Bozza di risposta con conferma stipula del 24 ottobre'},{icon:'scan',text:'Discrepanza sul subalterno segnalata a Giulia'}],
  draft:'Gentili, confermiamo la stipula per il 24 ottobre alle 10:30 presso il nostro studio. In allegato il modulo di erogazione compilato. Resta da indicare l’IBAN del conto della parte venditrice, che richiediamo al legale. Cordiali saluti, Studio Notarile Conti & Associati.'},
 {id:'m2', from:'Avv. Federica Lorenzi', address:'studio@lorenzi.example', time:'08:52', subject:'Rossi/Verdi – APE e planimetria', practice:'P-184', priority:'media', assignee:'GM', kind:'Legale',
  attachments:['APE_2026.pdf','Planimetria_catastale.pdf'],
  body:'Buongiorno, per conto della sig.ra Verdi trasmetto APE e planimetria. L’agibilità segue a breve.',
  understood:'Arrivati APE e planimetria per la pratica Rossi / Verdi. Manca ancora il certificato di agibilità.',
  prepared:[{icon:'folder',text:'Allegati archiviati nella pratica P-184'},{icon:'check',text:'Checklist aggiornata: APE ✓ planimetria ✓'},{icon:'message',text:'Promemoria per l’agibilità con richiesta IBAN venditrice'}],
  draft:'Gentile Avvocato, grazie per l’invio. Restiamo in attesa del certificato di agibilità e le chiediamo anche l’IBAN della sig.ra Verdi per il modulo di erogazione della banca.'},
 {id:'m3', from:'Marco Bellandi', address:'marco.bellandi@example.com', time:'09:03', subject:'Richiesta costituzione nuova società', practice:'P-191', priority:'media', assignee:'LB', kind:'Cliente',
  attachments:[],
  body:'Buongiorno, oltre a Lumen Tech vorremmo costituire una seconda S.r.l. per la parte immobiliare. Potete inviarmi tempi e costi?',
  understood:'Un cliente già in studio chiede una seconda S.r.l. Serve un preventivo e la checklist documenti.',
  prepared:[{icon:'coins',text:'Preventivo costituzione S.r.l. in bozza',go:'preventivi'},{icon:'list',text:'Checklist documenti soci'},{icon:'users',text:'Assegnata a Luca Benassi'}],
  draft:'Gentile dott. Bellandi, con piacere. In allegato trova la stima dei costi e l’elenco dei documenti necessari. Possiamo fissare un incontro insieme alla firma di Lumen Tech del 29 ottobre.'},
 {id:'m4', from:'PEC · Agenzia delle Entrate', address:'pec@agenzia.example', time:'09:31', subject:'Ricevuta di registrazione – Rep. 12.480', practice:null, priority:'bassa', assignee:'PD', kind:'PEC',
  attachments:['Ricevuta_registrazione.pdf'],
  body:'Si trasmette la ricevuta di avvenuta registrazione dell’atto Rep. 12.480.',
  understood:'L’atto Rep. 12.480 risulta registrato. Il prossimo adempimento è la trascrizione.',
  prepared:[{icon:'calendar',text:'Scadenziario aggiornato: registrazione completata',go:'scadenze'},{icon:'folder',text:'Ricevuta archiviata nel fascicolo dell’atto'}],
  draft:''},
 {id:'m5', from:'Dott.ssa Irene Neri · Commercialista', address:'neri@studioneri.example', time:'10:12', subject:'Lumen Tech – statuto rivisto', practice:'P-191', priority:'alta', assignee:'LB', kind:'Professionista',
  attachments:['Statuto_Lumen_v3.docx'],
  body:'Vi giro lo statuto rivisto dai soci con le loro osservazioni.',
  understood:'Nuova versione dello statuto. Rispetto alla v2 cambiano la clausola di gradimento e il quorum per le decisioni straordinarie.',
  prepared:[{icon:'scan',text:'Confronto v2 → v3 pronto (2 modifiche rilevanti)',go:'studio:confronto-statuto'},{icon:'shield',text:'Socio estero: titolare effettivo da verificare',go:'antiriciclaggio'}],
  draft:'Gentile Dottoressa, abbiamo ricevuto la versione 3. Le due modifiche su gradimento e quorum sono compatibili; le proponiamo una formulazione alternativa per il quorum.'},
 {id:'m6', from:'Lucia Moretti', address:'lucia.moretti@example.com', time:'11:40', subject:'Documenti per la successione', practice:'P-176', priority:'media', assignee:'PD', kind:'Cliente',
  attachments:['IMG_2041.jpg','IMG_2042.jpg'],
  body:'Le invio le foto dei documenti che ho trovato. Mi dica se manca qualcosa.',
  understood:'Le foto contengono certificato di morte e stato di famiglia. Mancano l’ultimo atto di provenienza e le visure aggiornate.',
  prepared:[{icon:'scan',text:'Testo estratto dalle foto e archiviato'},{icon:'message',text:'Risposta con l’elenco di ciò che manca'},{icon:'scan',text:'Visure catastali richieste',go:'visure'}],
  draft:'Gentile signora Moretti, grazie. Abbiamo ricevuto certificato di morte e stato di famiglia. Ci servono ancora l’atto di provenienza dell’immobile; le visure le richiediamo noi.'}
];

// CENTRALINO — chiamate in entrata gestite dall'assistente vocale.
export const calls = [
 {id:'c1', time:'09:12', caller:'Laura Bianchi', number:'+39 333 •••• 218', kind:'Nuovo cliente', duration:'4:12', outcome:'Preventivo inviato', intent:'Acquisto prima casa',
  summary:'Acquista un appartamento a Scandicci, prezzo 220.000 €, da privato, prima casa, con mutuo. Chiede costi e documenti.',
  reply:'Ho spiegato quali documenti preparare e che riceverà una stima dei costi via email entro oggi. Ho proposto un primo incontro mercoledì alle 17.',
  actions:['Preventivo in bozza','Appuntamento proposto','Pratica P-199 aperta']},
 {id:'c2', time:'09:40', caller:'Banca Arno · Ufficio mutui', number:'055 •••• 400', kind:'Banca', duration:'1:05', outcome:'Risposta data', intent:'Data di stipula',
  summary:'Chiede conferma della data di stipula Rossi / Verdi.',
  reply:'Numero riconosciuto tra i contatti della pratica: confermata la stipula del 24 ottobre alle 10:30.',
  actions:['Nota aggiunta alla pratica P-184']},
 {id:'c3', time:'10:05', caller:'Numero sconosciuto', number:'Anonimo', kind:'Da verificare', duration:'0:48', outcome:'Rifiutata', intent:'Informazioni su terzi',
  summary:'Chiede se il sig. Sarti ha firmato una donazione.',
  reply:'Non posso fornire informazioni su atti e clienti dello studio. Ho invitato a scrivere all’indirizzo dello studio.',
  actions:['Registrato nel log privacy']},
 {id:'c4', time:'11:20', caller:'Giorgio Sarti', number:'+39 347 •••• 090', kind:'Cliente', duration:'2:31', outcome:'In attesa di conferma', intent:'Spostare la firma',
  summary:'Non può venire giovedì, chiede di spostare la firma della donazione.',
  reply:'Ho proposto martedì 27 alle 11:00 o mercoledì 28 alle 16:30. Conferma via WhatsApp.',
  actions:['Due slot proposti','Messaggio WhatsApp inviato']}
];

// WHATSAPP & NOTIFICHE — conversazioni su pratiche già aperte.
export const chats = [
 {id:'w1', who:'Mario Rossi', practice:'P-184', channel:'WhatsApp', last:'09:58', unread:1,
  messages:[
   {from:'bot', text:'Buongiorno Mario, abbiamo ricevuto la delibera del mutuo da Banca Arno ✓'},
   {from:'bot', text:'Stipula confermata: venerdì 24 ottobre ore 10:30, Via de’ Tornabuoni 8, Firenze.'},
   {from:'client', text:'Perfetto grazie! Per il saldo devo portare un assegno circolare?'}],
  draft:'Il saldo prezzo è pagato con bonifico o assegno circolare intestato alla venditrice: le invio gli importi esatti appena la banca conferma l’erogazione. Per sicurezza porti anche un documento d’identità valido.'},
 {id:'w2', who:'Banca Arno · gestore', practice:'P-184', channel:'Canale banche', last:'09:41', unread:0,
  messages:[
   {from:'bot', text:'Pratica Rossi / Verdi: modulo di erogazione in preparazione. Stipula confermata 24/10 ore 10:30.'},
   {from:'client', text:'Ricevuto. Ci inviate la bozza d’atto per la verifica?'}],
  draft:'Certo, la bozza vi arriva entro mercoledì dopo la revisione del notaio.'},
 {id:'w3', who:'Giorgio Sarti', practice:'P-195', channel:'WhatsApp', last:'11:22', unread:0,
  messages:[
   {from:'bot', text:'Gentile Giorgio, per la firma della donazione posso proporre martedì 27 ore 11:00 oppure mercoledì 28 ore 16:30. Quale preferisce?'}],
  draft:''},
 {id:'w4', who:'Lucia Moretti', practice:'P-176', channel:'WhatsApp', last:'ieri', unread:0,
  messages:[
   {from:'bot', text:'Promemoria: per la successione ci serve l’atto di provenienza dell’immobile. Può inviarne una foto qui.'},
   {from:'client', text:'Lo cerco questo weekend 👍'}],
  draft:''}
];

export const notificationRules = [
 {event:'Pratica aperta', to:'Cliente', on:true},
 {event:'Documento ricevuto / mancante', to:'Cliente', on:true},
 {event:'Stipula fissata o spostata', to:'Cliente e banca', on:true},
 {event:'Bozza d’atto pronta', to:'Banca', on:true},
 {event:'Atto registrato · copia disponibile', to:'Cliente', on:true},
 {event:'Solleciti di pagamento', to:'Cliente', on:false}
];

// MEMORIA — domande veloci sull'archivio.
export const memoryIndex = [['Atti a repertorio','12.480'],['Email e PEC','38.200'],['Clausole e modelli','1.240'],['Anagrafiche','3.410']];
export const memoryQA = [
 {q:'Abbiamo già fatto atti con servitù di passaggio a Fiesole?', keys:['servit','fiesole','passaggio'],
  a:'Sì, 3 atti negli ultimi 5 anni. Il più simile è la compravendita Rep. 11.902 (2024), con servitù di passaggio pedonale e carrabile sul fondo confinante.',
  sources:[['Rep. 11.902 · Compravendita · 2024','art. 4 · servitù'],['Rep. 10.377 · Divisione · 2022','art. 6'],['Rep. 9.015 · Costituzione servitù · 2021','intero atto']]},
 {q:'Chi è il nostro referente in Banca Arno?', keys:['banca','arno','referente'],
  a:'Dott. Stefano Malesci, Ufficio mutui Firenze centro. Ultimi contatti il 17 ottobre (pratica Rossi / Verdi). Preferisce ricevere le bozze in PDF via PEC.',
  sources:[['Email del 17/10 · Banca Arno','firma'],['Anagrafica · Banca Arno','contatti']]},
 {q:'Che clausola usiamo per la conformità urbanistica?', keys:['urbanist','conformit','clausola'],
  a:'La clausola C-31 del clausolario, versione aggiornata a marzo 2026. È stata usata in 41 atti quest’anno; ultima volta Rep. 12.402.',
  sources:[['Clausolario · C-31 v4','testo'],['Rep. 12.402 · Compravendita','art. 7']]},
 {q:'Quanto abbiamo chiesto per l’ultima costituzione S.r.l.?', keys:['costituzion','srl','s.r.l','onorario','quanto'],
  a:'Per Lumen Tech S.r.l. il preventivo accettato è di € 2.180 di onorario più imposte e diritti camerali. La media del 2026 per S.r.l. ordinarie è € 2.050.',
  sources:[['Preventivo PRV-2026-088','totale'],['Statistiche preventivi 2026','media']]}
];

// VISURE — richieste ai registri pubblici.
export const registries = [
 {id:'catasto', name:'Catasto', note:'Visure, planimetrie, mappe', icon:'layers'},
 {id:'conservatoria', name:'Ispezioni ipotecarie', note:'Formalità, ipoteche, trascrizioni', icon:'database'},
 {id:'imprese', name:'Registro Imprese', note:'Visure camerali, denominazioni', icon:'store'},
 {id:'anagrafe', name:'Anagrafe e stato civile', note:'Residenza, stato di famiglia', icon:'users'},
 {id:'pra', name:'PRA', note:'Veicoli e beni mobili registrati', icon:'card'},
 {id:'fisco', name:'Agenzia delle Entrate', note:'Codici fiscali, atti registrati', icon:'receipt'}
];
export const visure = [
 {id:'v1', registry:'Catasto', what:'Visura per immobile · Firenze Fg. 42 Part. 318 Sub. 8', practice:'P-184', status:'Completata', time:'08:20',
  finding:'Intestataria Anna Verdi per 1/1, coerente con il preliminare. Rendita € 1.084,56. Il subalterno 8 non corrisponde alla bozza d’atto (sub. 6).', level:'warn'},
 {id:'v2', registry:'Ispezioni ipotecarie', what:'Ispezione per soggetto · Anna Verdi', practice:'P-184', status:'Completata', time:'08:22',
  finding:'Ipoteca volontaria del 2011 a favore di un altro istituto, mutuo da estinguere contestualmente alla stipula. Nessun pignoramento.', level:'warn'},
 {id:'v3', registry:'Registro Imprese', what:'Verifica denominazione · “Lumen Tech S.r.l.”', practice:'P-191', status:'Completata', time:'ieri',
  finding:'Nessuna società attiva con denominazione identica. Esiste “Lumen Technologies S.p.A.” a Milano: da valutare con i soci.', level:'info'},
 {id:'v4', registry:'Catasto', what:'Planimetria · Firenze Fg. 42 Part. 318 Sub. 8', practice:'P-184', status:'In corso', time:'11:05', finding:'', level:''},
 {id:'v5', registry:'Catasto', what:'Visura per soggetto · eredità Moretti', practice:'P-176', status:'In coda', time:'11:41', finding:'', level:''}
];

// OSSERVATORIO — esempi illustrativi, non sono provvedimenti reali.
export const updates = [
 {id:'u1', source:'Agenzia delle Entrate', kind:'Prassi', date:'16 ott', title:'Chiarimenti sul credito d’imposta prima casa in caso di riacquisto', impact:'Tocca 2 pratiche aperte con riacquisto entro l’anno: la clausola C-44 va integrata.', practices:['P-184','P-199'], tag:'Fiscale'},
 {id:'u2', source:'Consiglio Nazionale del Notariato', kind:'Studio', date:'14 ott', title:'Donazioni indirette e circolazione dei beni di provenienza donativa', impact:'Utile per la donazione Sarti: suggerita una nota informativa ai donatari.', practices:['P-195'], tag:'Civile'},
 {id:'u3', source:'Regione Toscana', kind:'Bando', date:'10 ott', title:'Contributi per la digitalizzazione degli studi professionali', impact:'Lo studio risulta ammissibile: contributo fino al 50% delle spese software. Scadenza 30 novembre.', practices:[], tag:'Bando', deadline:'30 nov'},
 {id:'u4', source:'Gazzetta Ufficiale', kind:'Norma', date:'8 ott', title:'Aggiornamento dei diritti di segreteria del Registro Imprese', impact:'Il tariffario dello studio per le costituzioni di società va aggiornato.', practices:['P-191'], tag:'Societario'}
];

// STAFF — attività distribuite dall'AI.
export const tasks = [
 {id:'t1', who:'GM', text:'Verificare subalterno 8 vs 6 nella bozza Rossi / Verdi', practice:'P-184', due:'Oggi', by:'Otto', reason:'Discrepanza tra perizia, visura e bozza', done:false},
 {id:'t2', who:'GM', text:'Inviare modulo di erogazione a Banca Arno', practice:'P-184', due:'Oggi', by:'Otto', reason:'Richiesta della banca delle 08:14', done:false},
 {id:'t3', who:'GM', text:'Sollecitare agibilità e IBAN all’avv. Lorenzi', practice:'P-184', due:'Domani', by:'Otto', reason:'Documento mancante in checklist', done:false},
 {id:'t4', who:'LB', text:'Rivedere statuto Lumen Tech v3 (gradimento, quorum)', practice:'P-191', due:'Oggi', by:'Otto', reason:'Nuova versione dalla commercialista', done:false},
 {id:'t5', who:'LB', text:'Preventivo seconda S.r.l. Bellandi', practice:'P-191', due:'Lunedì', by:'Otto', reason:'Richiesta email delle 09:03', done:false},
 {id:'t6', who:'AC', text:'Approvare bozza compravendita Rossi / Verdi', practice:'P-184', due:'Mercoledì', by:'Giulia', reason:'', done:false},
 {id:'t7', who:'EF', text:'Valutare titolare effettivo Helix Ventures', practice:'P-191', due:'Oggi', by:'Otto', reason:'Socio estero al 40%', done:false},
 {id:'t8', who:'SR', text:'Confermare appuntamento Laura Bianchi', practice:'P-199', due:'Oggi', by:'Otto', reason:'Chiamata delle 09:12', done:true},
 {id:'t9', who:'SR', text:'Confermare nuovo slot firma Sarti', practice:'P-195', due:'Oggi', by:'Otto', reason:'Chiamata delle 11:20', done:false},
 {id:'t10', who:'PD', text:'Trascrizione Rep. 12.480', practice:null, due:'Lunedì', by:'Otto', reason:'Registrazione completata · in ferie: riassegnabile', done:false},
 {id:'t11', who:'PD', text:'Richiedere atto di provenienza Moretti', practice:'P-176', due:'Martedì', by:'Otto', reason:'Mancante dopo email del cliente', done:false}
];
export const workflows = [
 {name:'Compravendita con mutuo', steps:14, avg:'32 giorni', active:6},
 {name:'Costituzione S.r.l.', steps:9, avg:'12 giorni', active:3},
 {name:'Successione', steps:11, avg:'5 mesi', active:4},
 {name:'Donazione', steps:8, avg:'21 giorni', active:2}
];

// SCADENZIARIO
export const deadlines = [
 {id:'d1', act:'Rep. 12.480 · Compravendita Lenzi', what:'Registrazione', due:'Completata', days:null, owner:'PD', state:'done'},
 {id:'d2', act:'Rep. 12.480 · Compravendita Lenzi', what:'Trascrizione in Conservatoria', due:'3 nov', days:17, owner:'PD', state:'todo'},
 {id:'d3', act:'Rep. 12.475 · Costituzione Arcadia S.r.l.', what:'Deposito al Registro Imprese', due:'21 ott', days:4, owner:'LB', state:'urgent'},
 {id:'d4', act:'Rep. 12.471 · Mutuo Galeotti', what:'Copia esecutiva alla banca', due:'22 ott', days:5, owner:'PD', state:'urgent'},
 {id:'d5', act:'Rep. 12.466 · Compravendita Ricasoli', what:'Voltura catastale · verifica esito', due:'28 ott', days:11, owner:'PD', state:'todo'},
 {id:'d6', act:'Successione Moretti', what:'Dichiarazione di successione', due:'12 mar 2027', days:146, owner:'PD', state:'todo'},
 {id:'d7', act:'Rep. 12.402 · Compravendita Pieri', what:'Cancellazione ipoteca · comunicazione banca', due:'Completata', days:null, owner:'GM', state:'done'}
];

// ANTIRICICLAGGIO
export const clients = [
 {id:'k1', name:'Mario Rossi e Chiara Fabbri', practice:'P-184', risk:'Basso', steps:{documento:true, titolare:true, pep:true, fondi:false}, flag:'Il saldo prezzo arriva in parte da un conto di un terzo (genitore): serve dichiarazione sulla provenienza dei fondi.'},
 {id:'k2', name:'Lumen Tech S.r.l. (costituenda)', practice:'P-191', risk:'Medio', steps:{documento:true, titolare:false, pep:true, fondi:true}, flag:'Socio al 40% è Helix Ventures Ltd (Malta): titolare effettivo da identificare prima della stipula.'},
 {id:'k3', name:'Anna Verdi', practice:'P-184', risk:'Basso', steps:{documento:true, titolare:true, pep:true, fondi:true}, flag:''},
 {id:'k4', name:'Giorgio ed Elisa Sarti', practice:'P-195', risk:'Basso', steps:{documento:true, titolare:true, pep:true, fondi:true}, flag:''},
 {id:'k5', name:'Laura Bianchi', practice:'P-199', risk:'Da valutare', steps:{documento:false, titolare:false, pep:false, fondi:false}, flag:'Nuovo cliente: la verifica parte dopo il primo incontro.'}
];

// PRIVACY — richieste degli interessati (GDPR): risposta entro un mese, prorogabile di due nei casi complessi.
export const dataRequests = [
 {who:'Mario Rossi', what:'Accesso ai propri dati', via:'Email registrata', received:'2 ott', due:'2 nov', days:16, state:'In preparazione', owner:'SR'},
 {who:'Chiara Fabbri', what:'Rettifica dell’indirizzo di residenza', via:'Modulo dello studio', received:'14 ott', due:'14 nov', days:28, state:'Completata', owner:'SR'},
 {who:'Ex cliente (2014)', what:'Cancellazione dei dati', via:'PEC', received:'9 ott', due:'9 nov', days:23, state:'Da valutare', owner:'AC', note:'Gli atti notarili si conservano per legge: si cancellano solo i dati di contatto e marketing.'}
];
export const privacyChecks = [['Registro dei trattamenti', 'aggiornato al 1° ottobre', true], ['Nomine dei responsabili esterni', 'CSD Station, PEC, conservazione digitale', true], ['Formazione privacy del team', '5 su 6 · manca Paolo Donati', false], ['Registro delle violazioni', 'nessuna violazione nel 2026', true]];

// AUDIT — ogni azione dell'AI, con chi l'ha approvata.
export const audit = [
 {time:'11:41', actor:'Otto', action:'Richiesta visura per soggetto · eredità Moretti', approved:'Regola automatica', area:'Visure'},
 {time:'11:22', actor:'Otto', action:'Inviato WhatsApp con due slot a Giorgio Sarti', approved:'Sara Ricci', area:'Notifiche'},
 {time:'10:12', actor:'Otto', action:'Confronto statuto Lumen Tech v2 → v3', approved:'—', area:'Studio'},
 {time:'10:05', actor:'Otto', action:'Rifiutate informazioni su terzi a chiamante anonimo', approved:'Policy privacy', area:'Centralino'},
 {time:'09:40', actor:'Otto', action:'Comunicata data stipula a Banca Arno (contatto verificato)', approved:'Regola automatica', area:'Centralino'},
 {time:'08:30', actor:'Giulia Marchi', action:'Aperta pratica P-184 · bozza d’atto v2', approved:'—', area:'Studio'},
 {time:'08:14', actor:'Otto', action:'Lette 6 email e 11 allegati, create 11 attività', approved:'—', area:'Posta'}
];

// ARCHIVIO E CLAUSOLARIO — usati dallo Studio quando redige.
export const sources = {
 mail:'Email Banca Arno · 17/10',
 delibera:'Delibera mutuo · p. 1',
 ci:'Carta d’identità M. Rossi',
 cf:'Tessera sanitaria M. Rossi',
 preliminare:'Preliminare del 02/09/2026 · p. 2',
 perizia:'Perizia · p. 3',
 visura:'Visura catastale · 17/10',
 agenda:'Agenda stipule',
 bozza:'Bozza d’atto v2 · art. 2'
};
