// Le sfide di CS Notaro OS (motore in game.js). Ogni risposta giusta si trova davvero nelle fonti:
// è il lavoro vero dello studio, Otto prepara e la persona verifica. Dati e persone inventati.
export const challenges = [
 // ————— livello 1: prendere la mano —————
 {id:'n-banca', level:1, page:'posta', title:'Banca Arno conferma il modulo',
  text:'La banca scrive che ha ricevuto il modulo di erogazione. Otto propone di **archiviare l’email e avvisare Mario Rossi su WhatsApp** che l’assegno sarà pronto giovedì.',
  sources:[{label:'Email di Banca Arno', text:'Confermiamo la ricezione del modulo. ==L’assegno circolare sarà disponibile in filiale giovedì.=='}],
  options:[
   {label:'Approva: archivia e avvisa il cliente', ok:true, why:'Esatto. Nessuna azione per lo studio, il cliente aggiornato senza una telefonata.'},
   {label:'Rispondi chiedendo di nuovo il modulo', why:'La banca l’ha già ricevuto: una richiesta in più fa solo perdere tempo a tutti.'}
  ]},
 {id:'n-sarti', level:1, page:'whatsapp', title:'Giorgio Sarti conferma la firma',
  text:'Il cliente scrive “Martedì alle 11 va benissimo”. Otto ha preparato la risposta: **“Confermato martedì 27 alle 11:00, le mando un promemoria il giorno prima.”**',
  sources:[{label:'Agenda dello studio', text:'Martedì 27 ottobre · ==11:00 · Firma donazione Sarti== · sala grande · Notaio Conti'}],
  options:[
   {label:'Invia la risposta di Otto', ok:true, why:'Giorno e ora coincidono con l’agenda: un clic e il cliente è tranquillo.'},
   {label:'Proponi un altro orario', why:'L’agenda conferma martedì alle 11: spostarlo creerebbe un problema che non c’era.'}
  ]},
 // ————— livello 2: le fonti contano —————
 {id:'n-sub', level:2, page:'visure', title:'Subalterno 8 o 6?',
  text:'Nel modulo di erogazione per la pratica **Rossi / Verdi** Otto ha scritto **Sub. 8**, ma la bozza d’atto v2 riporta **Sub. 6**. Quale va approvato?',
  sources:[
   {label:'Visura catastale 17/10', text:'Firenze · Fg. 42 · Part. 318 · ==Sub. 8== · Cat. A/2 · 5,5 vani', key:true},
   {label:'Perizia della banca', text:'Unità immobiliare identificata al ==subalterno 8==, piano terzo, interno 4.', key:true},
   {label:'Bozza d’atto v2', text:'…censito al foglio 42, particella 318, ==subalterno 6==…'}
  ],
  options:[
   {label:'Approva Sub. 8 e correggi la bozza', ok:true, why:'Visura e perizia dicono 8: il 6 della bozza è un refuso. Un atto con il subalterno sbagliato avrebbe trasferito un altro immobile.'},
   {label:'Approva Sub. 6 come nella bozza', why:'La bozza è l’unico documento che dice 6. Visura e perizia, le fonti ufficiali, dicono 8.'}
  ]},
 {id:'n-caparra', level:2, page:'home', title:'Quanto è stato versato di caparra?',
  text:'Nell’articolo 2 della compravendita la caparra va scritta con l’importo **effettivamente versato**. Il preliminare e la bozza non coincidono.',
  sources:[
   {label:'Preliminare del 02/09', text:'La parte acquirente versa a titolo di caparra confirmatoria ==€ 24.500,00==.'},
   {label:'Bonifico ricevuto', text:'03/09/2026 · Rossi Mario → Verdi Anna · ==€ 24.500,00== · causale “caparra via dei Tigli 12”', key:true},
   {label:'Bozza d’atto v2', text:'…di cui ==€ 25.000,00== già versati a titolo di caparra…'}
  ],
  options:[
   {label:'€ 24.500, come il bonifico', ok:true, why:'Il bonifico è la prova del versamento: 24.500. I 25.000 della bozza sono un arrotondamento sbagliato.'},
   {label:'€ 25.000, come la bozza', why:'Nessun documento prova un versamento di 25.000: in atto finirebbe una somma mai pagata.'},
   {label:'Chiedi alle parti prima di decidere', partial:true, why:'Prudente, ma la risposta era già nel bonifico: bastava aprirlo.'}
  ]},
 {id:'n-iban', level:2, page:'posta', title:'Manca l’IBAN della venditrice',
  text:'Per il modulo di erogazione serve l’IBAN di **Anna Verdi**. Otto l’ha lasciato vuoto: non è in nessun documento della pratica. Cosa fai?',
  sources:[
   {label:'Email dell’avv. Lorenzi', text:'Le trasmetto il certificato di agibilità. ==L’IBAN della sig.ra Verdi le arriverà a parte.==', key:true},
   {label:'Pratica 2021 della sig.ra Verdi', text:'IBAN IT60 X054 2811 1010 0000 0123 456 · ==conto chiuso nel 2023=='}
  ],
  options:[
   {label:'Chiedi l’IBAN all’avvocato su WhatsApp', ok:true, why:'Giusto: il dato arriva da chi lo deve dare. Otto ha già pronta la richiesta.'},
   {label:'Usa l’IBAN della pratica del 2021', why:'Quel conto è stato chiuso nel 2023: l’erogazione sarebbe tornata indietro il giorno della stipula.'}
  ]},
 // ————— livello 3: errori sottili, a tempo —————
 {id:'n-titolare', level:3, page:'antiriciclaggio', title:'Chi è il titolare effettivo di Lumen Tech?',
  text:'Il socio **Helix Ventures S.r.l.** ha il 40% di Lumen Tech. Per l’adeguata verifica serve la **persona fisica** che c’è dietro.',
  sources:[
   {label:'Visura Lumen Tech', text:'Soci: Marco Bellandi 60% · ==Helix Ventures S.r.l. 40%=='},
   {label:'Visura Helix Ventures', text:'Socio unico: ==Paolo Ferri, 100%== · amministratore unico Paolo Ferri', key:true}
  ],
  options:[
   {label:'Marco Bellandi e Paolo Ferri', ok:true, why:'Bellandi ha il 60% diretto, Ferri controlla il 40% tramite Helix: entrambi sopra il 25%, entrambi titolari effettivi.'},
   {label:'Solo Marco Bellandi', why:'Ferri possiede il 100% di Helix, che ha il 40% di Lumen Tech: è sopra il 25% anche lui, in modo indiretto.'},
   {label:'Marco Bellandi e Helix Ventures', why:'Il titolare effettivo è sempre una persona fisica: dietro Helix c’è Paolo Ferri.'}
  ]},
 {id:'n-agibilita', level:3, page:'scadenze', title:'L’agibilità è davvero arrivata?',
  text:'La bozza d’atto dichiara che il certificato di agibilità **è stato consegnato**. Prima della stipula di venerdì, è vero?',
  sources:[
   {label:'Bozza d’atto v2', text:'La parte venditrice dichiara di aver ==consegnato== il certificato di agibilità.'},
   {label:'Email avv. Lorenzi 17/10', text:'Il certificato di agibilità ==le verrà trasmesso entro giovedì==.', key:true}
  ],
  options:[
   {label:'Correggi: “da consegnare prima della stipula”', ok:true, why:'Il certificato non è ancora arrivato: dichiararlo consegnato sarebbe falso. Otto mette anche un promemoria per giovedì.'},
   {label:'Lascia così: arriverà prima di venerdì', why:'Un atto non può dichiarare una cosa che non è ancora successa. Se giovedì non arriva, l’atto è sbagliato.'}
  ]}
];
