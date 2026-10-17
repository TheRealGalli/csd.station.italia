// Le 14 sfide di CS Notaro OS (motore in game.js). Ogni risposta giusta si trova davvero nelle fonti:
// è il lavoro vero dello studio, Otto prepara e la persona verifica. Ogni giornata usa una variante
// diversa (vars): nomi, numeri e a volte anche la risposta giusta cambiano. Dati e persone inventati.
export const challenges = [
 // ————— livello 1: prendere la mano —————
 {id:'n-banca', level:1, page:'posta', title:'{bank} conferma il modulo',
  text:'La banca scrive che ha ricevuto il modulo di erogazione della pratica **{practice}**. Otto propone di **archiviare l’email e avvisare {client} su WhatsApp** che l’assegno sarà pronto {day}.',
  sources:[{label:'Email di {bank}', text:'Confermiamo la ricezione del modulo. ==L’assegno circolare sarà disponibile in filiale {day}.=='}],
  options:[
   {label:'Approva: archivia e avvisa il cliente', ok:true, why:'Esatto. Nessuna azione per lo studio, il cliente aggiornato senza una telefonata.'},
   {label:'Rispondi chiedendo di nuovo il modulo', why:'La banca l’ha già ricevuto: una richiesta in più fa solo perdere tempo a tutti.'}
  ],
  vars:[{bank:'Banca Arno', practice:'Rossi / Verdi', client:'Mario Rossi', day:'giovedì'}, {bank:'Credito Fiorentino', practice:'Bassi / Lodi', client:'Chiara Bassi', day:'lunedì'}, {bank:'Banca del Mugello', practice:'Neri / Galli', client:'Davide Neri', day:'venerdì mattina'}]},
 {id:'n-firma', level:1, page:'whatsapp', title:'{client} conferma la firma',
  text:'Il cliente scrive “{when} va benissimo”. Otto ha preparato la risposta: **“Confermato {when_full}, le mando un promemoria il giorno prima.”**',
  sources:[{label:'Agenda dello studio', text:'{agenda} · ==Firma {act} {surname}== · sala grande · {notary}'}],
  options:[
   {label:'Invia la risposta di Otto', ok:true, why:'Giorno e ora coincidono con l’agenda: un clic e il cliente è tranquillo.'},
   {label:'Proponi un altro orario', why:'L’agenda conferma proprio quell’appuntamento: spostarlo creerebbe un problema che non c’era.'}
  ],
  vars:[{client:'Giorgio Sarti', surname:'Sarti', when:'Martedì alle 11', when_full:'martedì 27 alle 11:00', agenda:'Martedì 27 ottobre · ==11:00==', act:'donazione', notary:'Notaio Conti'}, {client:'Laura Pini', surname:'Pini', when:'Giovedì alle 16', when_full:'giovedì 29 alle 16:00', agenda:'Giovedì 29 ottobre · ==16:00==', act:'compravendita', notary:'Notaio Ferri'}, {client:'Marco Bellandi', surname:'Bellandi', when:'Mercoledì alle 15', when_full:'mercoledì 28 alle 15:00', agenda:'Mercoledì 28 ottobre · ==15:00==', act:'costituzione Lumen Tech', notary:'Notaio Ferri'}]},
 {id:'n-telefono', level:1, page:'centralino', title:'“Quanto costa il rogito?”',
  text:'Al telefono {caller} chiede quanto costa l’atto per {what}. Otto propone di dare **una stima indicativa e fissare un appuntamento** per il preventivo preciso.',
  options:[
   {label:'Approva: stima e appuntamento', ok:true, why:'Il costo dipende da prezzo, mutuo e agevolazioni: una forchetta onesta al telefono, il preventivo preciso con i documenti.'},
   {label:'Dai subito una cifra esatta', why:'Senza prezzo, mutuo e agevolazioni la cifra sarebbe sbagliata: il cliente se la ricorderebbe.'}
  ],
  vars:[{caller:'Francesca Doni', what:'la sua prima casa'}, {caller:'Stefano Villa', what:'un negozio in centro'}, {caller:'Irene Fabbri', what:'la casa ereditata dalla madre'}]},
 {id:'n-ferie', level:1, page:'staff', title:'Un termine e un collega in ferie',
  text:'{absent} è in ferie fino a lunedì e ha **{task}** in scadenza **{due}**. Otto propone di riassegnarla a {to}.',
  sources:[{label:'Scadenziario', text:'{task} · pratica {practice} · ==scade {due}== · responsabile {absent} (in ferie)'}],
  options:[
   {label:'Riassegna a {to}', ok:true, why:'Il termine arriva prima del rientro: chi è in studio se ne occupa e niente scade.'},
   {label:'Aspetta il rientro lunedì', why:'Lunedì il termine sarebbe già passato: un adempimento fuori tempo costa sanzioni allo studio.'}
  ],
  vars:[{absent:'Paolo Donati', task:'la trascrizione', due:'venerdì', to:'Giulia Marchi', practice:'P-178'}, {absent:'Paolo Donati', task:'la voltura catastale', due:'giovedì', to:'Sara Ricci', practice:'P-181'}, {absent:'Luca Benassi', task:'il deposito al Registro Imprese', due:'venerdì', to:'Elena Ferri', practice:'P-191'}]},
 // ————— livello 2: le fonti contano —————
 {id:'n-sub', level:2, page:'visure', title:'Subalterno {right} o {wrong}?',
  text:'Nel modulo di erogazione per la pratica **{practice}** Otto ha scritto **Sub. {right}**, ma la bozza d’atto v2 riporta **Sub. {wrong}**. Quale va approvato?',
  sources:[
   {label:'Visura catastale', text:'{city} · Fg. {fg} · Part. {part} · ==Sub. {right}== · Cat. A/2', key:true},
   {label:'Perizia della banca', text:'Unità immobiliare identificata al ==subalterno {right}==, {floor}.', key:true},
   {label:'Bozza d’atto v2', text:'…censito al foglio {fg}, particella {part}, ==subalterno {wrong}==…'}
  ],
  options:[
   {label:'Approva Sub. {right} e correggi la bozza', ok:true, why:'Visura e perizia dicono {right}: il {wrong} della bozza è un refuso. Un atto con il subalterno sbagliato avrebbe trasferito un altro immobile.'},
   {label:'Approva Sub. {wrong} come nella bozza', why:'La bozza è l’unico documento che dice {wrong}. Visura e perizia, le fonti ufficiali, dicono {right}.'}
  ],
  vars:[{practice:'Rossi / Verdi', right:8, wrong:6, city:'Firenze', fg:42, part:318, floor:'piano terzo, interno 4'}, {practice:'Bassi / Lodi', right:12, wrong:21, city:'Sesto Fiorentino', fg:17, part:905, floor:'piano primo'}, {practice:'Neri / Galli', right:3, wrong:5, city:'Fiesole', fg:9, part:144, floor:'piano terra con giardino'}]},
 {id:'n-caparra', level:2, page:'home', title:'Quanto è stato versato di caparra?',
  text:'Nell’articolo 2 della compravendita **{practice}** la caparra va scritta con l’importo **effettivamente versato**. Il preliminare e la bozza non coincidono.',
  sources:[
   {label:'Preliminare', text:'La parte acquirente versa a titolo di caparra confirmatoria ==€ {right}==.'},
   {label:'Bonifico ricevuto', text:'{date} · {buyer} → {seller} · ==€ {right}== · causale “caparra {street}”', key:true},
   {label:'Bozza d’atto v2', text:'…di cui ==€ {wrong}== già versati a titolo di caparra…'}
  ],
  options:[
   {label:'€ {right}, come il bonifico', ok:true, why:'Il bonifico è la prova del versamento: € {right}. Quello della bozza è un arrotondamento sbagliato.'},
   {label:'€ {wrong}, come la bozza', why:'Nessun documento prova un versamento di € {wrong}: in atto finirebbe una somma mai pagata.'},
   {label:'Chiedi alle parti prima di decidere', partial:true, why:'Prudente, ma la risposta era già nel bonifico: bastava aprirlo.'}
  ],
  vars:[{practice:'Rossi / Verdi', right:'24.500,00', wrong:'25.000,00', date:'03/09/2026', buyer:'Rossi Mario', seller:'Verdi Anna', street:'via dei Tigli 12'}, {practice:'Bassi / Lodi', right:'18.000,00', wrong:'18.500,00', date:'21/08/2026', buyer:'Bassi Chiara', seller:'Lodi Franco', street:'via Gramsci 40'}, {practice:'Neri / Galli', right:'31.200,00', wrong:'32.100,00', date:'12/09/2026', buyer:'Neri Davide', seller:'Galli Lucia', street:'via Faentina 7'}]},
 {id:'n-iban', level:2, page:'posta', title:'Manca l’IBAN di {seller}',
  text:'Per il modulo di erogazione serve l’IBAN della parte venditrice, **{seller}**. Otto l’ha lasciato vuoto: non è in nessun documento della pratica. Cosa fai?',
  sources:[
   {label:'Email di {lawyer}', text:'Le trasmetto i documenti della pratica. ==L’IBAN di {seller} le arriverà a parte.==', key:true},
   {label:'Pratica {year} di {seller}', text:'IBAN IT60 X054 2811 1010 0000 0123 456 · ==conto chiuso nel {closed}=='}
  ],
  options:[
   {label:'Chiedi l’IBAN a {lawyer} su WhatsApp', ok:true, why:'Giusto: il dato arriva da chi lo deve dare. Otto ha già pronta la richiesta.'},
   {label:'Usa l’IBAN della pratica del {year}', why:'Quel conto è stato chiuso nel {closed}: l’erogazione sarebbe tornata indietro il giorno della stipula.'}
  ],
  vars:[{seller:'Anna Verdi', lawyer:'l’avv. Lorenzi', year:2021, closed:2023}, {seller:'Franco Lodi', lawyer:'lo studio Bertelli', year:2019, closed:2024}, {seller:'Lucia Galli', lawyer:'l’avv. Moretti', year:2020, closed:2022}]},
 {id:'n-imposte', level:2, page:'preventivi', title:'Prima casa o no?',
  text:'Nel preventivo per **{buyer}** Otto deve scegliere l’imposta di registro: **2% con l’agevolazione prima casa** o **9%**. Cosa dicono i documenti?',
  sources:[
   {label:'Dichiarazione dell’acquirente', text:'{decl1} · ==​{decl2}==', key:true},
   {label:'Visura per soggetto', text:'{visura}', key:true}
  ],
  options:[
   {label:'Applica il {right}', ok:true, why:'{why_right}'},
   {label:'Applica il {wrong}', why:'{why_wrong}'}
  ],
  vars:[{buyer:'Mario Rossi', decl1:'Trasferirò la residenza a Firenze entro 18 mesi', decl2:'non possiedo altre abitazioni', visura:'Nessun immobile intestato a Mario Rossi', right:'2% prima casa', wrong:'9%', why_right:'Residenza entro 18 mesi e nessun’altra casa: l’agevolazione spetta. Il cliente risparmia migliaia di euro.', why_wrong:'Tutti i requisiti della prima casa ci sono: con il 9% il cliente avrebbe pagato molto più del dovuto.'},
   {buyer:'Chiara Bassi', decl1:'Ho già la residenza a Sesto Fiorentino', decl2:'possiedo già un appartamento nello stesso comune', visura:'==Sesto Fiorentino · via Roma 3 · abitazione · proprietà 100%==', right:'9%', wrong:'2% prima casa', why_right:'Ha già una casa nello stesso comune: niente agevolazione. Meglio dirlo ora che scoprirlo con un avviso dell’Agenzia.', why_wrong:'Possiede già un’abitazione nello stesso comune: l’agevolazione decadrebbe con sanzione e interessi.'}]},
 {id:'n-termine', level:2, page:'scadenze', title:'Entro quando va registrato l’atto?',
  text:'L’atto **{act}** è stato firmato il **{date}**. Otto ha calcolato la scadenza per la registrazione e la trascrizione: **{right}**. È giusta?',
  sources:[
   {label:'Regola dello studio', text:'Registrazione e trascrizione ==entro 30 giorni dalla data dell’atto==.', key:true},
   {label:'Repertorio', text:'Rep. {rep} · {act} · firmato il ==​{date}=='}
  ],
  options:[
   {label:'Sì, entro il {right}', ok:true, why:'30 giorni dal {date}: {right}. Otto ha già messo il promemoria a chi se ne occupa.'},
   {label:'No, c’è tempo fino al {wrong}', why:'Il {wrong} è oltre i 30 giorni: lo studio pagherebbe la sanzione per il ritardo.'}
  ],
  vars:[{act:'compravendita Rossi / Verdi', date:'2 ottobre', right:'1 novembre', wrong:'1 dicembre', rep:'12.466'}, {act:'donazione Sarti', date:'9 ottobre', right:'8 novembre', wrong:'23 novembre', rep:'12.471'}, {act:'mutuo Bassi', date:'14 ottobre', right:'13 novembre', wrong:'14 dicembre', rep:'12.477'}]},
 // ————— livello 3: errori sottili, a tempo —————
 {id:'n-titolare', level:3, page:'antiriciclaggio', title:'Chi è il titolare effettivo di {company}?',
  text:'Per l’adeguata verifica di **{company}** serve la **persona fisica** che possiede più del 25%, anche attraverso altre società.',
  sources:[
   {label:'Visura {company}', text:'Soci: {s1} {p1}% · ==​{holding} {p2}%=='},
   {label:'Visura {holding}', text:'==​{holding_owners}==', key:true}
  ],
  options:[
   {label:'{right}', ok:true, why:'{why_right}'},
   {label:'{wrong1}', why:'{why_wrong1}'},
   {label:'{wrong2}', why:'Il titolare effettivo è sempre una persona fisica, non una società.'}
  ],
  vars:[{company:'Lumen Tech S.r.l.', s1:'Marco Bellandi', p1:60, holding:'Helix Ventures S.r.l.', p2:40, holding_owners:'Socio unico: Paolo Ferri, 100%', right:'Marco Bellandi e Paolo Ferri', wrong1:'Solo Marco Bellandi', wrong2:'Marco Bellandi e Helix Ventures', why_right:'Bellandi ha il 60% diretto, Ferri controlla il 40% tramite Helix: entrambi sopra il 25%.', why_wrong1:'Ferri possiede il 100% di Helix, che ha il 40%: è sopra il 25% anche lui, in modo indiretto.'},
   {company:'Arcadia S.r.l.', s1:'Giulia Neri', p1:55, holding:'Orione Holding S.r.l.', p2:45, holding_owners:'Soci: Ettore Sala 50% · Bruno Sala 50%', right:'Solo Giulia Neri', wrong1:'Giulia Neri, Ettore e Bruno Sala', wrong2:'Giulia Neri e Orione Holding', why_right:'I fratelli Sala hanno il 50% di un 45%: il 22,5% a testa, sotto il 25%. Resta solo Giulia Neri.', why_wrong1:'Fai il conto: 50% di 45% fa 22,5% a testa, sotto la soglia del 25%.'}]},
 {id:'n-agibilita', level:3, page:'scadenze', title:'{doc}: è davvero arrivato?',
  text:'La bozza d’atto **{practice}** dichiara che {doc_lower} **è stato consegnato**. Prima della stipula di {day}, è vero?',
  sources:[
   {label:'Bozza d’atto v2', text:'La parte venditrice dichiara di aver ==consegnato== {doc_lower}.'},
   {label:'Email di {lawyer}', text:'{doc} ==le verrà trasmesso entro {when}==.', key:true}
  ],
  options:[
   {label:'Correggi: “da consegnare prima della stipula”', ok:true, why:'Non è ancora arrivato: dichiararlo consegnato sarebbe falso. Otto mette anche un promemoria per {when}.'},
   {label:'Lascia così: arriverà in tempo', why:'Un atto non può dichiarare una cosa che non è ancora successa. Se {when} non arriva, l’atto è sbagliato.'}
  ],
  vars:[{doc:'Il certificato di agibilità', doc_lower:'il certificato di agibilità', practice:'Rossi / Verdi', day:'venerdì', lawyer:'avv. Lorenzi', when:'giovedì'}, {doc:'L’attestato energetico', doc_lower:'l’attestato energetico', practice:'Bassi / Lodi', day:'martedì', lawyer:'geom. Righi', when:'lunedì sera'}, {doc:'Il certificato di destinazione urbanistica', doc_lower:'il certificato di destinazione urbanistica', practice:'Neri / Galli', day:'mercoledì', lawyer:'Comune di Fiesole', when:'martedì'}]},
 {id:'n-servitu', level:3, page:'memoria', title:'La servitù esiste ancora?',
  text:'{client} chiede se sul fondo che compra a **{place}** c’è ancora la servitù di passaggio. Otto ha trovato due atti nell’archivio dello studio.',
  sources:[
   {label:'Rep. {rep1}', text:'{year1} · ==costituzione di servitù di passaggio== a favore del fondo {neighbor}'},
   {label:'Rep. {rep2}', text:'{year2} · ==rinuncia alla servitù di passaggio== costituita con Rep. {rep1}, trascritta il {trans}', key:true}
  ],
  options:[
   {label:'No: rinunciata nel {year2}', ok:true, why:'L’atto più recente, Rep. {rep2}, estingue la servitù ed è trascritto: il fondo è libero. Otto lo cita in bozza.'},
   {label:'Sì: costituita nel {year1}', why:'Era vera fino al {year2}: l’atto Rep. {rep2} l’ha estinta. Guardare solo il primo atto è l’errore classico.'}
  ],
  vars:[{client:'Davide Neri', place:'Fiesole', rep1:'8.112', rep2:'11.954', year1:2009, year2:2019, neighbor:'Bianchi', trans:'4 marzo 2019'}, {client:'Laura Pini', place:'Impruneta', rep1:'7.630', rep2:'12.020', year1:2006, year2:2021, neighbor:'Guidi', trans:'18 giugno 2021'}]},
 {id:'n-norma', level:3, page:'osservatorio', title:'Nuovi diritti di visura: a chi si applicano?',
  text:'Otto segnala una nuova tabella dei diritti per le ispezioni ipotecarie, in vigore **dal {date}**. Propone di aggiornare i preventivi aperti.',
  sources:[
   {label:'Circolare (esempio)', text:'La nuova tabella si applica alle ==richieste presentate dal {date}==.', key:true},
   {label:'Preventivi aperti', text:'{n_before} con visure già richieste prima del {date} · ==​{n_after} con visure ancora da chiedere=='}
  ],
  options:[
   {label:'Aggiorna solo i {n_after} da chiedere', ok:true, why:'La tabella vale per le richieste dal {date}: le visure già fatte restano al costo vecchio, i clienti non ricevono sorprese.'},
   {label:'Aggiorna tutti i preventivi', why:'Le visure già richieste non cambiano costo: ai clienti arriverebbe un rincaro che non esiste.'},
   {label:'Non aggiornare niente', why:'Per le visure ancora da chiedere il costo cambia davvero: lo studio pagherebbe la differenza.'}
  ],
  vars:[{date:'1° novembre', n_before:'4 preventivi', n_after:'3 preventivi'}, {date:'15 novembre', n_before:'2 preventivi', n_after:'5 preventivi'}]},
 {id:'n-privacy', level:3, page:'compliance', title:'“Mandatemi tutti i miei dati”',
  text:'Arriva un’email da **{from}**: “Sono {client}, ex cliente: inviatemi tutti i dati che avete su di me.” Otto ha già preparato l’esportazione.',
  sources:[
   {label:'Anagrafica cliente', text:'{client} · email registrata ==​{registered}== · ultima pratica {year}', key:true},
   {label:'Email ricevuta', text:'Da: =={from}== · nessun allegato'}
  ],
  options:[
   {label:'Prima verifica l’identità dall’indirizzo registrato', ok:true, why:'L’indirizzo non è quello in anagrafica: mandare i dati a uno sconosciuto sarebbe una violazione. Si verifica e si risponde entro i 30 giorni previsti.'},
   {label:'Invia subito l’esportazione', why:'L’email non arriva dall’indirizzo registrato: se non è il cliente, lo studio ha appena regalato i suoi dati a qualcun altro.'},
   {label:'Ignora: è un ex cliente', why:'Anche un ex cliente ha diritto ai suoi dati: la richiesta va gestita, dopo aver verificato chi la fa.'}
  ],
  vars:[{client:'Roberto Sacchi', from:'r.sacchi.docs@mailbox.example', registered:'roberto.sacchi@example.com', year:2022}, {client:'Elisa Marchi', from:'elisa.m.2026@posta.example', registered:'emarchi@example.it', year:2023}]}
];
