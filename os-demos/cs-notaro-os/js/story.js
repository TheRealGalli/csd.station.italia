// La storia di CS Notaro OS: una settimana in studio, in cinque capitoli.
// Ogni capitolo ha più varianti (variants): a ogni partita se ne estrae una a caso, così due settimane non sono mai uguali.
// Ogni variante ha un antagonista vero del mestiere, sposta le missioni verso le sue sezioni (bias)
// e stringe una regola del gioco (rules), che torna com'era alla fine del capitolo.
import {persona} from './persona.js';
import {studioCfg, lobbyCfg} from './pressure.js';

// rules: [[oggetto, chiave, valore o funzione del valore attuale], …] → apply(on) che cambia e poi ripristina
const rules = list => { const was = []; return on => { if (on) list.forEach(([o, k, v], i) => { was[i] = o[k]; o[k] = typeof v === 'function' ? v(o[k]) : v; }); else list.forEach(([o, k], i) => { if (was[i] !== undefined) o[k] = was[i]; }); }; };
const tasks3 = {type:'tasks', n:3, label:'Fai 3 compiti'};
const points = {type:'points', n:150, label:'Fai 150 punti in questo capitolo'};
const wa = 'https://wa.me/393518628203?text=Ciao%20Carlo%21%20Ho%20finito%20la%20settimana%20di%20CS%20Notaro%20OS.%20Vorrei%20avere%20pi%C3%B9%20informazioni.';

export const story = {
 // la schermata finale: anche questa cambia; {capitoli} diventa l'elenco dei capitoli giocati in mezzo
 finale:[
  {kicker:'STUDIO CHIUSO', title:'Hai completato la settimana in studio', text:'Atti firmati, termini rispettati, nessuna sanzione. {capitoli}: lo studio ha retto a tutto, **con te alle decisioni e Otto a fare il resto**.', wa, waLabel:'Vorrei più informazioni'},
  {kicker:'VENERDÌ · 19:30', title:'Hai completato la settimana in studio', text:`Il notaio ${persona.last} chiude il repertorio e spegne la luce. Tra {capitoli}, nessun termine è scaduto e **ogni firma è arrivata con le verifiche fatte**.`, wa, waLabel:'Vorrei più informazioni'},
  {kicker:'REPERTORIO CHIUSO', title:'Hai completato la settimana in studio', text:'Giulia archivia l’ultima pratica, Paolo torna dalle ferie e trova tutto in ordine. {capitoli}: settimana superata, e lunedì Otto avrà già letto la posta.', wa, waLabel:'Vorrei più informazioni'}
 ],
 ending:'La settimana è chiusa: atti firmati, termini rispettati, nessuna sanzione. **Puoi continuare a giocare quanto vuoi.**',
 chapters:[
  {variants:[
   {title:'Il primo giorno', narrator:'Otto del notaio', role:'otto-notary',
    intro:[`Buongiorno! Lunedì mattina, ${persona.studio.replace('Studio Notarile ', 'Studio ')}.`, 'Io leggo la posta, rispondo al telefono, preparo i moduli e tengo d’occhio le scadenze.', 'Tu intervieni quando serve una persona. Cominciamo dalle cose semplici.'],
    outro:['Ottimo inizio: la coda si muove e lo studio respira.', 'Però è appena arrivata una busta piena di documenti…'],
    goal:tasks3},
   {title:'Lunedì mattina', narrator:'Otto segretario', role:'otto-phone',
    intro:['Sono le nove, la sala d’attesa si riempie e il telefono ha già squillato tre volte.', `Il notaio ${persona.last} è in stipula fino a mezzogiorno: **lo studio lo teniamo noi due**. Io leggo, smisto e preparo; tu decidi.`, 'Il quadrato rosso in alto ti chiama quando serve. Tre compiti per cominciare.'],
    outro:['Mezzogiorno: il notaio esce dalla sala e trova tutto in ordine.', 'Ma nel pomeriggio arriva una pratica complicata…'],
    goal:tasks3},
   {title:'Il nuovo collaboratore', narrator:'Otto del notaio', role:'otto-notary',
    intro:['Benvenuto nello studio! Oggi è il tuo primo giorno da collaboratore.', 'Qui niente carta che si perde: **email, PEC, chiamate e scadenze passano tutte da me**, e io ti indico solo quello che spetta a una persona.', 'Tre compiti semplici, e intanto impari dove sono le cose.'],
    outro:['Prima giornata superata: Giulia dice che hai la mano giusta.', 'Domani però si comincia a fare sul serio…'],
    goal:tasks3}
  ]},
  {variants:[
   {title:'Il venditore distratto', narrator:'Otto delle visure', role:'otto-inspector',
    intro:['La signora Verdi vende casa, ed è molto gentile.', 'Peccato che i suoi documenti **non coincidano mai tra loro**: un subalterno qui, una data di nascita là, un intestatario che cambia.', 'Questa settimana arriveranno più allegati e visure da controllare. Vale sempre il registro pubblico.'],
    outro:['Documenti allineati: visura, perizia e bozza dicono finalmente la stessa cosa.'],
    goal:{type:'missions', n:2, pages:['posta', 'visure', 'studio'], label:'Vinci 2 missioni di Posta, Visure o Studio'}, bias:['posta', 'visure', 'studio']},
   {title:'L’ipoteca dimenticata', narrator:'Otto delle visure', role:'otto-inspector',
    intro:['La visura ipotecaria della casa di via dei Serragli ha una sorpresa: **un’ipoteca del 2009 mai cancellata**.', 'Il mutuo è estinto da anni, ma nei registri c’è ancora. Bisogna ricostruire la storia: archivio dello studio, visure, bozza d’atto.', 'Arriveranno più missioni di Visure, Memoria e Studio.'],
    outro:['Trovata la quietanza della banca nell’archivio: l’ipoteca si cancella, la vendita si fa.'],
    goal:{type:'missions', n:2, pages:['visure', 'memoria', 'studio'], label:'Vinci 2 missioni di Visure, Memoria o Studio'}, bias:['visure', 'memoria', 'studio']},
   {title:'La PEC che non doveva arrivare', narrator:'Otto della posta', role:'otto-read',
    intro:['Stamattina è arrivata una PEC con **le coordinate bancarie “aggiornate”** del venditore. Il dominio è quasi uguale a quello vero.', 'È il trucco più comune contro gli studi: cambiare l’IBAN all’ultimo momento. **Nessun bonifico parte senza verifica.**', 'Arriveranno più email, messaggi e richieste da controllare con attenzione.'],
    outro:['Telefonata al venditore: l’IBAN non l’aveva cambiato nessuno. Truffa sventata, denuncia fatta.'],
    goal:{type:'missions', n:2, pages:['posta', 'compliance', 'whatsapp'], label:'Vinci 2 missioni di Posta, Privacy o WhatsApp'}, bias:['posta', 'compliance', 'whatsapp']}
  ]},
  {variants:[
   {title:'La banca impaziente', narrator:'Otto centralinista', role:'otto-phone',
    intro:['Banca Arno ha fretta: deve erogare il mutuo entro venerdì.', 'Chiama, scrive su WhatsApp, chiede preventivi, sposta le date. **Le email vanno in ritardo prima del solito**.', 'Rispondi preciso: una data sbagliata detta al telefono diventa una firma saltata.'],
    outro:['La banca conferma: erogazione venerdì alle 10:30.'],
    goal:{type:'missions', n:2, pages:['centralino', 'whatsapp', 'preventivi'], label:'Vinci 2 missioni di Centralino, WhatsApp o Preventivi'}, bias:['centralino', 'whatsapp', 'preventivi'],
    apply:rules([[studioCfg, 'mailSla', v => Math.round(v * .75)]])},
   {title:'Il giorno delle stipule', narrator:'Otto segretario', role:'otto-phone',
    intro:['Oggi in agenda ci sono **sei atti uno dopo l’altro**: compravendite, un mutuo, una donazione.', 'La sala d’attesa non si svuota mai: **arrivano parti più spesso** e le sale vanno usate bene, o la prossima stipula aspetta in piedi.', 'Telefono, preventivi e scadenze intanto non si fermano.'],
    outro:['Sesto atto firmato alle 18:40. Il notaio ha la mano stanca, ma il repertorio è pieno.'],
    goal:{type:'missions', n:2, pages:['centralino', 'preventivi', 'scadenze'], label:'Vinci 2 missioni di Centralino, Preventivi o Scadenze'}, bias:['centralino', 'preventivi', 'scadenze'],
    apply:rules([[lobbyCfg, 'rate', 1.8]])},
   {title:'Il cliente da Zurigo', narrator:'Otto antiriciclaggio', role:'otto-inspector',
    intro:['Un acquirente svizzero vuole comprare un casale in Chianti, **pagando da un conto di una società di Zurigo**.', 'Tutto può essere regolare, ma va verificato: titolare effettivo, provenienza dei fondi, imposte per i non residenti.', 'Arriveranno più missioni di Antiriciclaggio, Memoria e Preventivi.'],
    outro:['Fondi tracciati, titolare identificato, preventivo con le imposte giuste. Il casale ha un nuovo proprietario.'],
    goal:{type:'missions', n:2, pages:['antiriciclaggio', 'memoria', 'preventivi'], label:'Vinci 2 missioni di Antiriciclaggio, Memoria o Preventivi'}, bias:['antiriciclaggio', 'memoria', 'preventivi']}
  ]},
  {variants:[
   {title:'Il cliente che ha fretta', narrator:'Otto antiriciclaggio', role:'otto-inspector',
    intro:['Il dottor Bellandi vuole costituire la società **oggi stesso**.', 'Dietro c’è una holding estera, e lui non ha voglia di aspettare la verifica del titolare effettivo. Intanto gli atti firmati generano **adempimenti più spesso**.', 'Un notaio non firma alla cieca: prima le verifiche, poi la penna.'],
    outro:['Titolare effettivo identificato, adempimenti in regola.'],
    goal:{type:'missions', n:2, pages:['antiriciclaggio', 'scadenze', 'compliance', 'staff'], label:'Vinci 2 missioni di Antiriciclaggio, Scadenze, Privacy o Staff'}, bias:['antiriciclaggio', 'scadenze', 'compliance', 'staff'],
    apply:rules([[studioCfg, 'rate', 1.6]])},
   {title:'L’ispezione dell’Archivio notarile', narrator:'Otto ispettore', role:'otto-inspector',
    intro:['È arrivata la comunicazione: **ispezione biennale dell’Archivio notarile** tra due giorni.', 'Repertorio, registrazioni, trascrizioni nei termini, registro dei trattamenti dei dati: va tutto controllato. E intanto **gli adempimenti arrivano più spesso**.', 'Un termine saltato oggi diventa una sanzione nel verbale.'],
    outro:['L’ispettore sfoglia il repertorio, annuisce e firma: nessun rilievo.'],
    goal:{type:'missions', n:2, pages:['scadenze', 'compliance', 'staff'], label:'Vinci 2 missioni di Scadenze, Privacy o Staff'}, bias:['scadenze', 'compliance', 'staff'],
    apply:rules([[studioCfg, 'rate', 1.5]])},
   {title:'Giulia è in malattia', narrator:'Otto della posta', role:'otto-read',
    intro:['Giulia ha la febbre, e Paolo è ancora in ferie. **Lo studio è a ranghi ridotti.**', 'La posta si accumula prima, il telefono non aspetta e le attività vanno ridistribuite nel team.', 'Le email vanno in ritardo prima del solito: tieni la casella sotto controllo.'],
    outro:['Giulia scrive da casa: “Ho visto il registro, siete stati bravissimi”.'],
    goal:{type:'missions', n:2, pages:['posta', 'centralino', 'staff'], label:'Vinci 2 missioni di Posta, Centralino o Staff'}, bias:['posta', 'centralino', 'staff'],
    apply:rules([[studioCfg, 'mailSla', v => Math.round(v * .8)]])}
  ]},
  {variants:[
   {title:'La stipula del venerdì', narrator:'Otto', role:'otto-happy',
    intro:['Venerdì, ore 10:30: Rossi e Verdi, Banca Arno, l’agenzia, tutti in sala.', 'Posta, telefono, adempimenti: **tutto più veloce**, tutto insieme.', 'Hai tutto quello che ti serve. Andiamo.'],
    outro:['Firme raccolte, atto a repertorio, banca soddisfatta.', 'Che settimana.'],
    goal:points,
    apply:rules([[studioCfg, 'mailSla', v => Math.round(v * .85)], [studioCfg, 'rate', 1.3], [lobbyCfg, 'rate', 1.3]])},
   {title:'Fine mese', narrator:'Otto del notaio', role:'otto-notary',
    intro:['Ultimo giorno del mese: **tutti vogliono firmare prima del 31**, per le agevolazioni prima casa e per le banche.', 'Sala d’attesa piena, PEC a raffica, adempimenti che si accumulano.', 'Ultimo capitolo: tieni il ritmo fino a sera.'],
    outro:['Ultimo atto alle 19:55. Il mese si chiude con il repertorio in ordine.', 'Che settimana.'],
    goal:points,
    apply:rules([[studioCfg, 'mailSla', v => Math.round(v * .85)], [lobbyCfg, 'rate', 1.6]])},
   {title:'Il rogito con quattro banche', narrator:'Otto', role:'otto-happy',
    intro:['Un palazzo in centro, otto appartamenti, **quattro banche che erogano insieme**.', 'Ognuna vuole il suo modulo, la sua data, la sua conferma. E intanto lo studio deve continuare a girare.', 'Tutto più veloce, tutto insieme. Si va.'],
    outro:['Quattro bonifici arrivati, otto famiglie con le chiavi in mano.', 'Che settimana.'],
    goal:points,
    apply:rules([[studioCfg, 'rate', 1.4], [studioCfg, 'mailSla', v => Math.round(v * .8)]])}
  ]}
 ]
};
