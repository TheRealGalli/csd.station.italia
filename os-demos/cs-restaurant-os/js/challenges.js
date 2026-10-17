// Le 14 sfide di CS Restaurant OS (motore in game.js). Ogni risposta giusta si trova davvero nelle fonti:
// è il lavoro vero del locale, Otto prepara e chi gestisce decide. Ogni giornata usa una variante
// diversa (vars): ospiti, piatti e numeri cambiano. Locale, ospiti e numeri inventati.
export const challenges = [
 // ————— livello 1: prendere la mano —————
 {id:'r-review', level:1, page:'recensioni_ai', title:'Una recensione a 5 stelle',
  text:'{who} scrive su {source}: “{quote}”. Otto ha preparato la risposta: **“{reply}”**',
  options:[
   {label:'Approva e pubblica', ok:true, why:'Rispondere anche alle recensioni belle fa salire il locale su {source} e chi legge vede che ci tenete.'},
   {label:'Non rispondere, è già positiva', why:'Una recensione senza risposta è un’occasione persa: i portali premiano i locali che rispondono.'}
  ],
  vars:[{who:'Giulia M.', source:'Google', quote:'Carbonara strepitosa e servizio attento', reply:'Grazie Giulia! La carbonara è il nostro orgoglio: vi aspettiamo presto.'}, {who:'Elisa P.', source:'Google', quote:'Risotto ai porcini da 10 e lode', reply:'Grazie Elisa! I porcini di stagione sono una passione di Davide: torna a novembre per il tartufo.'}, {who:'Thomas K.', source:'TripAdvisor', quote:'Best tagliata in Florence', reply:'Thank you Thomas! Our chef Davide will be very happy to read this.'}]},
 {id:'r-pass', level:1, page:'kds', title:'Quale comanda parte per prima?',
  text:'Il cuoco ha un fuoco libero e tre comande in attesa. Quale fa partire?',
  options:[
   {label:'Tavolo {t1} · {d1} · in attesa da {m1}′', ok:true, why:'Si parte sempre dalla più vecchia: oltre i 15 minuti il tavolo inizia a guardare l’orologio.'},
   {label:'Tavolo {t2} · {d2} · da {m2}′', why:'È appena arrivata: il tavolo {t1} aspetta da {m1} minuti.'},
   {label:'Tavolo {t3} · {d3} · da {m3}′', why:'Il tavolo {t1} aspetta da {m1} minuti: si parte da lì.'}
  ],
  vars:[{t1:4, d1:'carbonara', m1:18, t2:6, d2:'bruschetta', m2:3, t3:11, d3:'tiramisù', m3:1}, {t1:9, d1:'tagliata', m1:16, t2:3, d2:'pici', m2:5, t3:1, d3:'burrata', m3:2}, {t1:12, d1:'risotto', m1:21, t2:7, d2:'carbonara', m2:6, t3:2, d3:'bruschetta', m3:4}]},
 {id:'r-ritardo', level:1, page:'whatsapp', title:'“Arriviamo con 15 minuti di ritardo”',
  text:'{guest} scrive su WhatsApp che arriva alle {late} invece che alle {time}. Otto propone: **“Nessun problema, il tavolo {table} vi aspetta.”**',
  sources:[{label:'Sala', text:'Tavolo {table} · prenotato {guest} {time} · ==prossima prenotazione alle {next}=='}],
  options:[
   {label:'Approva la risposta', ok:true, why:'Il tavolo è libero fino alle {next}: un ritardo di 15 minuti non crea problemi e l’ospite arriva tranquillo.'},
   {label:'Cancella la prenotazione', why:'Il tavolo resta libero fino alle {next}: cancellare vorrebbe dire perdere un tavolo pieno per niente.'}
  ],
  vars:[{guest:'Luca Pieri', late:'21:00', time:'20:45', table:10, next:'22:45'}, {guest:'Famiglia Gori', late:'20:45', time:'20:30', table:5, next:'22:30'}, {guest:'Chiara Lotti', late:'21:45', time:'21:30', table:12, next:'23:30'}]},
 {id:'r-fedelta', level:1, page:'fidelity_nfc', title:'Un ospite abituale',
  text:'{guest} ha appena appoggiato la card NFC: è alla **{visits}ª visita** e ha diritto a **{reward}**. Otto propone di segnarlo sul tavolo {table}.',
  options:[
   {label:'Approva: premio sul tavolo {table}', ok:true, why:'Il premio arriva da solo al tavolo giusto: l’ospite si sente riconosciuto e torna.'},
   {label:'Lascia stare, stasera c’è troppo da fare', why:'Un clic adesso vale un ospite che torna: il premio promesso e non dato è il modo più veloce per perderlo.'}
  ],
  vars:[{guest:'Luca Pieri', visits:15, reward:'un dessert offerto', table:10}, {guest:'Studio Marchetti', visits:22, reward:'una bottiglia di Chianti', table:9}, {guest:'Anna Serra', visits:6, reward:'il caffè offerto', table:2}]},
 // ————— livello 2: le fonti contano —————
 {id:'r-allergia', level:2, page:'sala', title:'Il tavolo {table} ordina dal QR',
  text:'Dal QR del tavolo {table} arriva **“{qty}× {dish}”**. Prima che la comanda parta per la cucina, Otto ti chiede di controllare.',
  sources:[
   {label:'Prenotazione tavolo {table}', text:'{time} · {guest} · ==nota: {allergy}==', key:true},
   {label:'Scheda piatto', text:'{dish} · allergeni: =={allergen}=='}
  ],
  options:[
   {label:'Blocca e proponi {alt}', ok:true, why:'{guest}: {allergy}, e il piatto contiene {allergen_lower}. {alt} è sicuro: Otto lo propone sul QR e avvisa la cucina.'},
   {label:'Manda in cucina, avviso a voce', why:'Un avviso a voce si perde nel servizio. Una comanda con {allergen_lower} per chi ha questa allergia non deve mai partire.'},
   {label:'Manda in cucina così', why:'La prenotazione lo dice chiaramente: {allergy}. È l’errore più grave che un locale possa fare.'}
  ],
  vars:[{table:2, qty:2, dish:'Pici al pomodoro', time:'21:15', guest:'Anna Serra', allergy:'celiaca', allergen:'Glutine', allergen_lower:'glutine', alt:'il risotto ai porcini'}, {table:8, qty:1, dish:'Tiramisù', time:'20:30', guest:'Marco V.', allergy:'allergia alle uova', allergen:'Uova · Latte · Glutine', allergen_lower:'uova', alt:'la burrata con i pomodorini'}, {table:4, qty:1, dish:'Burrata e pomodorini', time:'20:00', guest:'Sofia R.', allergy:'intollerante al lattosio', allergen:'Latte', allergen_lower:'latte', alt:'la bruschetta al pomodoro'}]},
 {id:'r-scorta', level:2, page:'magazzino', title:'Basta il {item} per {day}?',
  text:'Otto propone di ordinare **{order}** di {item} a {supplier} per {day}. Approvi o aspetti?',
  sources:[
   {label:'Magazzino adesso', text:'{item_cap} · =={now}== · scorta minima {min}'},
   {label:'{day_cap} scorso', text:'{covers} coperti · =={used} di {item} usati==', key:true}
  ],
  options:[
   {label:'Approva l’ordine', ok:true, why:'{day_cap} scorso ne sono serviti {used} e ne hai {now}: senza ordine il piatto finisce a metà serata.'},
   {label:'Aspetta, ne basta', why:'{now} non coprono una serata da {used}: verso le 22 il piatto sparirebbe dal menu.'}
  ],
  vars:[{item:'guanciale', item_cap:'Guanciale', order:'3 kg', supplier:'Salumificio Chianti', day:'sabato', day_cap:'Sabato', now:'1,4 kg', min:'1,5 kg', covers:38, used:'1,6 kg'}, {item:'mascarpone', item_cap:'Mascarpone', order:'2 kg', supplier:'Caseificio Toscano', day:'domenica', day_cap:'Domenica', now:'0,9 kg', min:'1 kg', covers:44, used:'1,3 kg'}, {item:'controfiletto', item_cap:'Controfiletto di manzo', order:'5 kg', supplier:'Macelleria Bartolini', day:'venerdì', day_cap:'Venerdì', now:'3,2 kg', min:'4 kg', covers:41, used:'4,5 kg'}]},
 {id:'r-fornitore', level:2, page:'menu_pos', title:'{ingredient} non arriva',
  text:'{supplier} avvisa che la consegna di {ingredient_lower} salta. In cella ne resta per **{left} porzioni di {dish}** e sei tavoli stanno guardando il menu.',
  sources:[
   {label:'Messaggio del fornitore', text:'Buonasera, ==domani niente {ingredient_lower}==: {reason}.'},
   {label:'Magazzino', text:'{ingredient} · {qty} · ricetta {per} a porzione → =={left} porzioni==', key:true}
  ],
  options:[
   {label:'Lascia fare al menu: “ultime {left}”, poi sparisce', ok:true, why:'Il menu intelligente mostra “ultime {left}” e toglie {dish} da solo all’ultima porzione: nessuno ordina un piatto che non c’è.'},
   {label:'Lascialo in menu come sempre', why:'Alla porzione in più la cucina dovrebbe tornare al tavolo a scusarsi.'},
   {label:'Togli subito tutta la sezione', partial:true, why:'Nessun rischio, ma perdi piatti che hai: bastava fermare solo {dish}.'}
  ],
  vars:[{ingredient:'I porcini', ingredient_lower:'porcini', supplier:'Ortofrutta Mugello', left:2, dish:'il risotto', reason:'la raccolta è saltata per la pioggia', qty:'0,15 kg', per:'0,07 kg'}, {ingredient:'La burrata', ingredient_lower:'burrata', supplier:'Caseificio Toscano', left:3, dish:'la burrata e pomodorini', reason:'il furgone è fermo', qty:'3 pezzi', per:'1 pezzo'}]},
 {id:'r-conto', level:2, page:'home', title:'Il tavolo {table} chiede il conto',
  text:'Il tavolo {table} ha speso **{total}** in tutto. Una parte l’ha già pagata dal QR. Quanto devi incassare adesso?',
  sources:[
   {label:'Conto del tavolo {table}', text:'{lines} · totale =={total}=='},
   {label:'Pagamenti Stripe', text:'{time} · Ordine QR tavolo {table} · ==Apple Pay {paid}== · pagato', key:true}
  ],
  options:[
   {label:'{due}', ok:true, why:'{total} meno i {paid} già pagati con Apple Pay: {due}. Otto chiude il conto con un solo documento commerciale.'},
   {label:'{total}', why:'Il tavolo pagherebbe due volte la parte già saldata dal QR: rimborso, scuse e una brutta recensione.'}
  ],
  vars:[{table:6, total:'€ 96', paid:'€ 34', due:'€ 62', lines:'2 bruschette · 2 risotti · 1 Chianti', time:'20:12'}, {table:11, total:'€ 128', paid:'€ 52', due:'€ 76', lines:'4 carbonare · 2 tiramisù · 1 Chianti', time:'20:41'}, {table:3, total:'€ 74', paid:'€ 26', due:'€ 48', lines:'2 pici · 1 tagliata · 2 tiramisù', time:'21:05'}]},
 {id:'r-haccp', level:2, page:'staff', title:'Il frigo {fridge} segna {temp}',
  text:'Nella checklist HACCP {who} ha registrato **{temp}** nel frigo {fridge}. Otto ti chiede cosa fare prima di segnare il controllo.',
  sources:[
   {label:'Procedura HACCP', text:'Frigo prodotti freschi: ==massimo 4 °C==. Oltre: spostare i prodotti, verificare, registrare la non conformità.', key:true},
   {label:'Contenuto frigo {fridge}', text:'{content}'}
  ],
  options:[
   {label:'Sposta i prodotti, chiama il tecnico, registra', ok:true, why:'{temp} è sopra i 4 °C: i prodotti si salvano spostandoli subito e la non conformità registrata protegge il locale in un controllo.'},
   {label:'Segna “OK”, è solo un grado o due', why:'Sopra i 4 °C {content_short} si rovinano, e un registro falso in un controllo ASL è un problema serio.'}
  ],
  vars:[{fridge:'1', temp:'7 °C', who:'Karim', content:'burrata, mascarpone, guanciale', content_short:'burrata e mascarpone'}, {fridge:'2', temp:'6 °C', who:'Davide', content:'controfiletto, uova, pecorino', content_short:'carne e uova'}]},
 // ————— livello 3: errori sottili, a tempo —————
 {id:'r-fattura', level:3, page:'fatture', title:'La fattura di {client}',
  text:'Otto ha preparato la fattura elettronica della cena aziendale di stasera (**{amount}**) **con i dati dell’ultima volta**. La invii?',
  sources:[
   {label:'Ultima fattura', text:'{client} · P.IVA {vat} · ==codice SDI {old}=='},
   {label:'Email di oggi di {client}', text:'Vi ricordiamo che dal {since} il nostro ==codice destinatario è {new}==.', key:true}
  ],
  options:[
   {label:'Invia con il nuovo codice {new}', ok:true, why:'Il codice destinatario è cambiato: con quello vecchio la fattura non sarebbe mai arrivata al cliente.'},
   {label:'Invia con i dati dell’ultima volta', why:'Il codice SDI è cambiato il {since}: la fattura finirebbe nel posto sbagliato e andrebbe rifatta.'}
  ],
  vars:[{client:'Studio Marchetti', amount:'€ 620', vat:'04512870487', old:'M5UXCR1', new:'KRRH6B9', since:'1° ottobre'}, {client:'Eventi Medici srl', amount:'€ 1.840', vat:'06623110485', old:'SUBM70N', new:'T9K4REB', since:'15 settembre'}]},
 {id:'r-tavolo', level:3, page:'centralino_ai', title:'{n} persone alle {time}',
  text:'Al telefono: **“Siamo in {n} alle {time}, {note}.”** Otto aspetta la tua conferma sul tavolo.',
  sources:[
   {label:'Sala alle {time}', text:'{room}', key:true},
   {label:'Menu', text:'{menu}'}
  ],
  options:[
   {label:'{right}', ok:true, why:'{why_right}'},
   {label:'{wrong1}', why:'{why_wrong1}'},
   {label:'{wrong2}', why:'{why_wrong2}'}
  ],
  vars:[{n:'6', time:'21:30', note:'uno è vegano', room:'T5 · 6 posti · ==occupato fino alle 22:15== · T9 · 8 posti · ==libero dalle 21:15== · T12 · 4 posti · libero', menu:'Piatti vegani: bruschetta, ==pici al pomodoro== senza formaggio', right:'Tavolo 9 e nota “vegano” alla cucina', wrong1:'Tavolo 5, è da 6', wrong2:'Tavolo 12', why_right:'Il 9 ha 8 posti ed è libero dalle 21:15. La nota fa trovare alla cucina i pici senza formaggio.', why_wrong1:'Il 5 è occupato fino alle 22:15: gli ospiti aspetterebbero 45 minuti in piedi.', why_wrong2:'Il 12 ha solo 4 posti: in sei non ci stanno.'},
   {n:'4', time:'20:30', note:'con un passeggino', room:'T3 · 4 posti · ==vicino all’ingresso, libero== · T7 · 4 posti · ==tra i tavoli centrali== · T10 · 2 posti · libero', menu:'Seggioloni disponibili: 2', right:'Tavolo 3, vicino all’ingresso', wrong1:'Tavolo 7, al centro', wrong2:'Tavolo 10', why_right:'Il 3 è vicino all’ingresso: il passeggino entra senza far alzare mezza sala.', why_wrong1:'Al centro il passeggino bloccherebbe il passaggio dei camerieri per tutta la cena.', why_wrong2:'Il 10 ha 2 posti: in quattro non ci stanno.'}]},
 {id:'r-bando', level:3, page:'bandi', title:'Il bando copre l’abbattitore?',
  text:'Otto ha trovato un contributo del **{pct}%** per le attrezzature di cucina. Vorresti usarlo per **{item}**. Puoi?',
  sources:[
   {label:'Bando (esempio)', text:'Spese ammissibili: attrezzature ==acquistate dopo la presentazione della domanda==. Scadenza domanda: {deadline}.', key:true},
   {label:'Fattura {supplier}', text:'{item_cap} · ==acquistato il {bought}== · € {price}', key:true}
  ],
  options:[
   {label:'{right}', ok:true, why:'{why_right}'},
   {label:'{wrong}', why:'{why_wrong}'}
  ],
  vars:[{pct:40, item:'l’abbattitore', item_cap:'Abbattitore di temperatura', supplier:'Grandi Cucine srl', bought:'3 settembre', price:'4.200', deadline:'30 novembre', right:'No, è già stato comprato: usalo per la cappa nuova', wrong:'Sì, presenta la domanda con la fattura', why_right:'L’abbattitore è stato comprato prima della domanda: non è ammissibile. La cappa ancora da comprare invece sì.', why_wrong:'Il bando copre solo acquisti dopo la domanda: la richiesta verrebbe respinta e il tempo perso.'},
   {pct:30, item:'il forno nuovo', item_cap:'Forno combinato (preventivo)', supplier:'Grandi Cucine srl', bought:'non ancora: è un preventivo', price:'7.900', deadline:'15 dicembre', right:'Sì: prima la domanda, poi l’acquisto', wrong:'Compralo subito, la domanda dopo', why_right:'Il forno non è ancora comprato: presenti la domanda e poi acquisti, così il 30% torna indietro.', why_wrong:'Comprandolo prima della domanda il forno non sarebbe più ammissibile: perderesti il 30%.'}]},
 {id:'r-allergeni', level:3, page:'app_builder', title:'Il piatto del giorno sul menu QR',
  text:'Lo chef ha scritto il piatto del giorno: **{dish}**. Otto è pronto a pubblicarlo sul menu QR con gli allergeni **{declared}**.',
  sources:[
   {label:'Ricetta dello chef', text:'{recipe}', key:true},
   {label:'Bozza sul QR', text:'{dish} · € {price} · allergeni: =={declared}=='}
  ],
  options:[
   {label:'Aggiungi “{missing}” e pubblica', ok:true, why:'Nella ricetta c’è {missing_lower}: per legge va dichiarata. Con l’allergene giusto il menu QR lo mostra a tutti e protegge chi è allergico.'},
   {label:'Pubblica così', why:'Manca un allergene che è nella ricetta: un ospite allergico lo ordinerebbe senza saperlo.'}
  ],
  vars:[{dish:'Trofie al pesto', price:'14', declared:'Glutine', recipe:'Trofie fresche, basilico, ==pinoli==, parmigiano, aglio', missing:'Frutta a guscio · Latte', missing_lower:'frutta a guscio e latte'}, {dish:'Gamberi in tempura', price:'18', declared:'Glutine · Crostacei', recipe:'Gamberi, farina, acqua frizzante, ==salsa di soia==', missing:'Soia', missing_lower:'soia'}, {dish:'Panna cotta ai frutti di bosco', price:'7', declared:'Latte', recipe:'Panna, zucchero, frutti di bosco, ==gelatina e granella di nocciole==', missing:'Frutta a guscio', missing_lower:'frutta a guscio'}]},
 {id:'r-chiusura', level:3, page:'home', title:'La chiusura di cassa non torna',
  text:'A fine serata il POS segna **{pos}**, i documenti commerciali **{docs}**. Mancano **{diff}**. Otto ti chiede come chiudere.',
  sources:[
   {label:'Documenti commerciali', text:'Ultimo: ==​{dc} · {diff} · In invio==', key:true},
   {label:'Pagamenti', text:'{time} · Stripe · Ordine QR tavolo {table} · =={diff}=='}
  ],
  options:[
   {label:'Aspetta l’invio del {dc}, poi chiudi', ok:true, why:'La differenza è un pagamento dal QR il cui documento sta per essere trasmesso: tra un minuto tutto torna, senza toccare niente.'},
   {label:'Emetti uno scontrino manuale da {diff}', why:'Il documento esiste già, è solo in invio: uno scontrino in più raddoppierebbe l’incasso dichiarato.'},
   {label:'Chiudi così', why:'Una chiusura che non torna è proprio ciò che l’Agenzia incrocia con i dati dei pagamenti: meglio un minuto di attesa.'}
  ],
  vars:[{pos:'€ 1.240', docs:'€ 1.180', diff:'€ 60', dc:'DC 0438', time:'23:48', table:7}, {pos:'€ 2.015', docs:'€ 1.987', diff:'€ 28', dc:'DC 0452', time:'23:52', table:4}]}
];
