// La storia di CS Restaurant OS: "Una serata all'Osteria del Borgo", in cinque capitoli.
// Ogni capitolo ha un antagonista vero del mestiere, sposta le missioni verso le sue sezioni (bias)
// e stringe una regola del gioco (apply), che torna com'era alla fine del capitolo.
import * as D from './demo.js';

const keep = {};
const save = (k, v) => { keep[k] = v; };
export const story = {
 ending:'La serata è andata. Il locale ha retto: cucina, sala, frigo e conti. **Puoi continuare a giocare quanto vuoi.**',
 chapters:[
  {title:'Si apre la sala', narrator:'Otto cameriere', role:'otto-bow',
   intro:['Buonasera! Sono le sette, le prime luci della sala si accendono.', 'Stasera il locale lavora da solo: io prendo le comande dal QR, rispondo al telefono, tengo i conti.', 'Tu intervieni quando serve una persona. Cominciamo dalle cose semplici.'],
   outro:['Visto? Il locale gira, e tu sai dove mettere le mani.', 'Però c’è un furgone fermo sul retro…'],
   goal:{type:'tasks', n:3, label:'Fai 3 compiti'}},
  {title:'Il fornitore furbo', narrator:'Otto magazziniere', role:'otto-cap',
   intro:['È arrivato il furgone della Macelleria Bartolini.', 'Bartolini è simpatico, ma ha un vizio: **le sue fatture non tornano mai con quello che scarica**. Un chilo in più qui, un prezzo arrotondato là.', 'Stasera arriveranno più fatture e documenti da controllare. Confronta sempre con la bolla firmata: vale quella.'],
   outro:['Bartolini se ne va brontolando, con due note di credito in tasca.', 'Il magazzino è giusto, i conti pure. Ma in sala si è seduto qualcuno con un taccuino…'],
   goal:{type:'missions', n:2, pages:['magazzino', 'fatture'], label:'Vinci 2 missioni di Magazzino o Cassa'}, bias:['magazzino', 'fatture']},
  {title:'Il critico in incognito', narrator:'Otto cuoco', role:'otto-chef',
   intro:['Tavolo 4: un signore solo, giacca scura, guarda l’orologio a ogni piatto.', 'Sofia lo ha riconosciuto: è **un critico gastronomico**. Scrive di tempi, di conti e di come si risponde alle recensioni.', 'Da adesso **le comande possono aspettare meno**: la cucina deve correre, senza sbagliare.'],
   outro:['Il critico paga, lascia una mancia e un biglietto: “Tornerò”.', 'Bene. Ma alla porta c’è una signora con un tesserino…'],
   goal:{type:'missions', n:2, pages:['sala', 'kds', 'recensioni_ai', 'menu_pos'], label:'Vinci 2 missioni di Sala, Cucina, Menu o Recensioni'}, bias:['sala', 'kds', 'recensioni_ai', 'menu_pos'],
   apply:on => { if (on) { save('wait', D.kitchen.waitLimit); D.kitchen.waitLimit = Math.round(D.kitchen.waitLimit * .75); } else if (keep.wait) D.kitchen.waitLimit = keep.wait; }},
  {title:'L’ispettore ASL', narrator:'Otto ispettore', role:'otto-inspector',
   intro:['**Ispezione ASL a sorpresa.** La dottoressa Ferretti vuole vedere celle, temperature, etichette e allergeni.', 'Proprio stasera i frigoriferi fanno i capricci: **i guasti arriveranno più spesso**.', 'Tieni le celle in norma e valida le carte: è quello che conta in un controllo.'],
   outro:['Verbale pulito: “Nessuna non conformità rilevata”.', 'Respira. Perché è sabato sera, e la sala si sta riempiendo tutta insieme…'],
   goal:{type:'missions', n:2, pages:['staff', 'app_builder'], label:'Vinci 2 missioni di HACCP o Allergeni'}, bias:['staff', 'app_builder'],
   apply:on => { if (on) { save('rate', D.fridgeCfg.rate); D.fridgeCfg.rate = 2.4; } else D.fridgeCfg.rate = keep.rate ?? 1; }},
  {title:'Il sabato sera', narrator:'Otto', role:'otto-happy',
   intro:['Sala piena, telefono che squilla, comande che piovono.', 'È il momento in cui un locale si vede davvero: **tutto più veloce**, tutto insieme.', 'Hai tutto quello che ti serve. Andiamo.'],
   outro:['Ultimo tavolo servito. La cucina si spegne, la sala si svuota.', 'Grande serata.'],
   goal:{type:'points', n:150, label:'Fai 150 punti in questo capitolo'},
   apply:on => { if (on) { save('w5', D.kitchen.waitLimit); save('r5', D.fridgeCfg.rate); D.kitchen.waitLimit = Math.round(D.kitchen.waitLimit * .85); D.fridgeCfg.rate = 1.5; } else { if (keep.w5) D.kitchen.waitLimit = keep.w5; D.fridgeCfg.rate = keep.r5 ?? 1; } }}
 ]
};
