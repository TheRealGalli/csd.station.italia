// Le sfide di CS Restaurant OS (motore in game.js). Ogni risposta giusta si trova davvero nelle fonti:
// è il lavoro vero del locale, Otto prepara e chi gestisce decide. Locale, ospiti e numeri inventati.
export const challenges = [
 // ————— livello 1: prendere la mano —————
 {id:'r-review', level:1, page:'recensioni_ai', title:'Una recensione a 5 stelle',
  text:'Giulia M. scrive su Google: “Carbonara strepitosa e servizio attento”. Otto ha preparato la risposta: **“Grazie Giulia! La carbonara è il nostro orgoglio: vi aspettiamo presto.”**',
  options:[
   {label:'Approva e pubblica', ok:true, why:'Rispondere anche alle recensioni belle fa salire il locale su Google e chi legge vede che ci tenete.'},
   {label:'Non rispondere, è già positiva', why:'Una recensione senza risposta è un’occasione persa: Google premia i locali che rispondono.'}
  ]},
 {id:'r-pass', level:1, page:'kds', title:'Quale comanda parte per prima?',
  text:'Il cuoco ha un fuoco libero e tre comande in attesa. Quale fa partire?',
  options:[
   {label:'Tavolo 4 · carbonara · in attesa da 18′', ok:true, why:'Si parte sempre dalla più vecchia: oltre i 15 minuti il tavolo inizia a guardare l’orologio.'},
   {label:'Tavolo 6 · bruschetta · da 3′', why:'È appena arrivata: il tavolo 4 aspetta da 18 minuti.'},
   {label:'Tavolo 11 · tiramisù · da 1′', why:'Il dolce può aspettare: la carbonara del tavolo 4 è in ritardo.'}
  ]},
 // ————— livello 2: le fonti contano —————
 {id:'r-celiaca', level:2, page:'sala', title:'Il tavolo 2 ordina dal QR',
  text:'Dal QR del tavolo 2 arriva **“2× Pici al pomodoro”**. Prima che la comanda parta per la cucina, Otto ti chiede di controllare.',
  sources:[
   {label:'Prenotazione tavolo 2', text:'21:15 · Anna Serra · 2 persone · Centralino AI · ==nota: celiaca==', key:true},
   {label:'Scheda piatto', text:'Pici al pomodoro · pici tirati a mano · allergeni: ==Glutine=='}
  ],
  options:[
   {label:'Blocca e proponi il risotto ai porcini', ok:true, why:'Anna è celiaca e i pici contengono glutine. Il risotto è senza glutine: Otto le scrive sul QR e avvisa la cucina.'},
   {label:'Manda in cucina, avviso il cameriere a voce', why:'Un avviso a voce si perde nel servizio del sabato. Una comanda con glutine per una celiaca non deve mai partire.'},
   {label:'Manda in cucina così', why:'La prenotazione dice “celiaca”: i pici contengono glutine. È l’errore più grave che un locale possa fare.'}
  ]},
 {id:'r-guanciale', level:2, page:'magazzino', title:'Basta il guanciale per sabato?',
  text:'Otto propone di ordinare **3 kg di guanciale** a Salumificio Chianti per sabato. Approvi o aspetti?',
  sources:[
   {label:'Magazzino adesso', text:'Guanciale · ==1,4 kg== · scorta minima 1,5 kg'},
   {label:'Sabato scorso', text:'38 coperti · 31 carbonare · ==1,6 kg di guanciale usati==', key:true}
  ],
  options:[
   {label:'Approva l’ordine', ok:true, why:'Sabato scorso ne sono serviti 1,6 kg e ne hai 1,4: senza ordine la carbonara finisce a metà serata.'},
   {label:'Aspetta lunedì, ne basta', why:'1,4 kg non coprono un sabato da 1,6 kg: verso le 22 la carbonara sparirebbe dal menu.'}
  ]},
 {id:'r-porcini', level:2, page:'menu_pos', title:'I porcini non arrivano',
  text:'Ortofrutta Mugello avvisa che la consegna di porcini salta. In cella ne resta abbastanza per **2 risotti** e sei tavoli stanno guardando il menu.',
  sources:[
   {label:'Messaggio del fornitore', text:'Buonasera, ==domani niente porcini==: la raccolta è saltata per la pioggia.'},
   {label:'Magazzino', text:'Porcini · 0,15 kg · ricetta risotto 0,07 kg a porzione → ==2 porzioni==', key:true}
  ],
  options:[
   {label:'Lascia fare al menu: “ultime 2”, poi sparisce', ok:true, why:'Il menu intelligente mostra “ultime 2” e toglie il risotto da solo alla seconda porzione: nessuno ordina un piatto che non c’è.'},
   {label:'Lascialo in menu come sempre', why:'Al terzo risotto ordinato la cucina dovrebbe tornare al tavolo a scusarsi.'},
   {label:'Togli subito tutti i primi', partial:true, why:'Nessun rischio, ma perdi carbonare e pici che hai: bastava fermare solo il risotto.'}
  ]},
 // ————— livello 3: errori sottili, a tempo —————
 {id:'r-fattura', level:3, page:'fatture', title:'La fattura dello Studio Marchetti',
  text:'Otto ha preparato la fattura elettronica della cena aziendale di stasera (€ 620) **con i dati dell’ultima volta**. La invii?',
  sources:[
   {label:'Fattura di settembre', text:'Studio Marchetti · P.IVA 04512870487 · ==codice SDI M5UXCR1=='},
   {label:'Email di oggi dello Studio', text:'Vi ricordiamo che dal 1° ottobre il nostro ==codice destinatario è KRRH6B9==.', key:true}
  ],
  options:[
   {label:'Invia con il nuovo codice KRRH6B9', ok:true, why:'Lo studio ha cambiato codice destinatario: con quello vecchio la fattura non sarebbe mai arrivata al cliente.'},
   {label:'Invia con i dati dell’ultima volta', why:'Il codice SDI è cambiato il 1° ottobre: la fattura finirebbe nel posto sbagliato e andrebbe rifatta.'}
  ]},
 {id:'r-sei', level:3, page:'centralino_ai', title:'Sei persone alle 21:30, uno vegano',
  text:'Al telefono: **“Siamo in 6 alle 21:30, uno è vegano.”** Otto aspetta la tua conferma sul tavolo.',
  sources:[
   {label:'Sala alle 21:30', text:'T5 · 6 posti · ==occupato fino alle 22:15== · T9 · 8 posti · ==libero dalle 21:15== · T12 · 4 posti · libero', key:true},
   {label:'Menu', text:'Piatti vegani: bruschetta al pomodoro, ==pici al pomodoro== (senza formaggio)'}
  ],
  options:[
   {label:'Tavolo 9 e nota “vegano” alla cucina', ok:true, why:'Il 9 ha 8 posti ed è libero dalle 21:15. La nota fa trovare alla cucina i pici senza formaggio pronti.'},
   {label:'Tavolo 5, è da 6', why:'Il 5 è occupato fino alle 22:15: gli ospiti aspetterebbero 45 minuti in piedi.'},
   {label:'Tavolo 12', why:'Il 12 ha solo 4 posti: in sei non ci stanno.'}
  ]}
];
