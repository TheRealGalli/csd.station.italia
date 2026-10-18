// La storia di CS Notaro OS: "Una settimana in studio", in cinque capitoli.
// Ogni capitolo ha un antagonista vero del mestiere, sposta le missioni verso le sue sezioni (bias)
// e stringe una regola del gioco (apply), che torna com'era alla fine del capitolo.
import {studioCfg} from './pressure.js';

const keep = {};
export const story = {
 ending:'La settimana è chiusa: atti firmati, termini rispettati, nessuna sanzione. **Puoi continuare a giocare quanto vuoi.**',
 chapters:[
  {title:'Il primo giorno', narrator:'Otto del notaio', role:'otto-notary',
   intro:['Buongiorno! Lunedì mattina, Studio Conti & Associati.', 'Io leggo la posta, rispondo al telefono, preparo i moduli e tengo d’occhio le scadenze.', 'Tu intervieni quando serve una persona. Cominciamo dalle cose semplici.'],
   outro:['Ottimo inizio: la coda si muove e lo studio respira.', 'Però è appena arrivata una busta piena di documenti…'],
   goal:{type:'tasks', n:3, label:'Fai 3 compiti'}},
  {title:'Il venditore distratto', narrator:'Otto delle visure', role:'otto-inspector',
   intro:['La signora Verdi vende casa, ed è molto gentile.', 'Peccato che i suoi documenti **non coincidano mai tra loro**: un subalterno qui, una data di nascita là, un intestatario che cambia.', 'Questa settimana arriveranno più allegati e visure da controllare. Vale sempre il registro pubblico.'],
   outro:['Documenti allineati: visura, perizia e bozza dicono finalmente la stessa cosa.', 'Ma il telefono non smette di squillare. È la banca…'],
   goal:{type:'missions', n:2, pages:['posta', 'visure', 'studio'], label:'Vinci 2 missioni di Posta, Visure o Studio'}, bias:['posta', 'visure', 'studio']},
  {title:'La banca impaziente', narrator:'Otto centralinista', role:'otto-phone',
   intro:['Banca Arno ha fretta: deve erogare il mutuo entro venerdì.', 'Chiama, scrive su WhatsApp, chiede preventivi, sposta le date. **Le email vanno in ritardo prima del solito**.', 'Rispondi preciso: una data sbagliata detta al telefono diventa una firma saltata.'],
   outro:['La banca conferma: erogazione venerdì alle 10:30.', 'Ma il cliente di giovedì vuole firmare… prima delle verifiche.'],
   goal:{type:'missions', n:2, pages:['centralino', 'whatsapp', 'preventivi'], label:'Vinci 2 missioni di Centralino, WhatsApp o Preventivi'}, bias:['centralino', 'whatsapp', 'preventivi'],
   apply:on => { if (on) { keep.sla = studioCfg.mailSla; studioCfg.mailSla = Math.round(studioCfg.mailSla * .75); } else if (keep.sla) studioCfg.mailSla = keep.sla; }},
  {title:'Il cliente che ha fretta', narrator:'Otto antiriciclaggio', role:'otto-inspector',
   intro:['Il dottor Bellandi vuole costituire la società **oggi stesso**.', 'Dietro c’è una holding estera, e lui non ha voglia di aspettare la verifica del titolare effettivo. Intanto gli atti firmati generano **adempimenti più spesso**.', 'Un notaio non firma alla cieca: prima le verifiche, poi la penna.'],
   outro:['Titolare effettivo identificato, adempimenti in regola.', 'Resta l’ultima prova: venerdì, la stipula grande.'],
   goal:{type:'missions', n:2, pages:['antiriciclaggio', 'scadenze', 'compliance', 'staff'], label:'Vinci 2 missioni di Antiriciclaggio, Scadenze, Privacy o Staff'}, bias:['antiriciclaggio', 'scadenze', 'compliance', 'staff'],
   apply:on => { if (on) { keep.rate = studioCfg.rate; studioCfg.rate = 1.6; } else studioCfg.rate = keep.rate ?? 1; }},
  {title:'La stipula del venerdì', narrator:'Otto', role:'otto-happy',
   intro:['Venerdì, ore 10:30: Rossi e Verdi, Banca Arno, l’agenzia, tutti in sala.', 'Posta, telefono, adempimenti: **tutto più veloce**, tutto insieme.', 'Hai tutto quello che ti serve. Andiamo.'],
   outro:['Firme raccolte, atto a repertorio, banca soddisfatta.', 'Che settimana.'],
   goal:{type:'points', n:150, label:'Fai 150 punti in questo capitolo'},
   apply:on => { if (on) { keep.sla5 = studioCfg.mailSla; keep.rate5 = studioCfg.rate; studioCfg.mailSla = Math.round(studioCfg.mailSla * .85); studioCfg.rate = 1.3; } else { if (keep.sla5) studioCfg.mailSla = keep.sla5; studioCfg.rate = keep.rate5 ?? 1; } }}
 ]
};
