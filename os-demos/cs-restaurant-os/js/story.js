// La storia di CS Restaurant OS: una serata all'Osteria del Borgo, in cinque capitoli.
// Ogni capitolo ha più varianti (variants): a ogni partita se ne estrae una a caso, così due serate non sono mai uguali.
// Ogni variante ha un antagonista vero del mestiere, sposta le missioni verso le sue sezioni (bias)
// e stringe una regola del gioco (rules), che torna com'era alla fine del capitolo.
import {persona} from './persona.js';
import * as D from './demo.js';

// rules: [[oggetto, chiave, valore o funzione del valore attuale], …] → apply(on) che cambia e poi ripristina
const rules = list => { const was = []; return on => { if (on) list.forEach(([o, k, v], i) => { was[i] = o[k]; o[k] = typeof v === 'function' ? v(o[k]) : v; }); else list.forEach(([o, k], i) => { if (was[i] !== undefined) o[k] = was[i]; }); }; };
const tasks3 = {type:'tasks', n:3, label:'Fai 3 compiti'};
// il delivery si apre per forza in questo capitolo (e resta aperto), oltre a cambiare le sue regole
const withDelivery = list => { const r = rules(list); return on => { r(on); if (on) D.delivery.forced = true; }; };
const points = {type:'points', n:150, label:'Fai 150 punti in questo capitolo'};
const wa = 'https://wa.me/393518628203?text=Ciao%20Carlo%21%20Ho%20finito%20la%20serata%20di%20CS%20Restaurant%20OS.%20Vorrei%20avere%20pi%C3%B9%20informazioni.';

export const story = {
 // la schermata finale: anche questa cambia; {capitoli} diventa l'elenco dei capitoli giocati in mezzo
 finale:[
  {kicker:'SERVIZIO CHIUSO', title:'Hai completato la cena di oggi', text:'Ultimo tavolo servito, cucina spenta, conti chiusi. {capitoli}: il locale ha retto a tutto, **con te alle decisioni e Otto a fare il resto**.', wa, waLabel:'Vorrei più informazioni'},
  {kicker:'SALA VUOTA · CUCINA PULITA', title:'Hai completato la cena di oggi', text:'Le sedie sono sui tavoli e Sofia conta la cassa: torna al centesimo. Tra {capitoli}, stasera il locale ha imparato che **un sistema che lavora da solo lascia a te solo le decisioni giuste**.', wa, waLabel:'Vorrei più informazioni'},
  {kicker:'CHIUSURA · 00:40', title:'Hai completato la cena di oggi', text:'Davide spegne l’ultimo fornello e ti batte una mano sulla spalla. {capitoli}: è andata, e domani Otto ha già preparato gli ordini ai fornitori.', wa, waLabel:'Vorrei più informazioni'}
 ],
 ending:'La serata è andata. Il locale ha retto: cucina, sala, frigo e conti. **Puoi continuare a giocare quanto vuoi.**',
 chapters:[
  {variants:[
   {title:'Si apre la sala', narrator:'Otto cameriere', role:'otto-bow',
    intro:['Buonasera! Le prime luci della sala si accendono.', 'Stasera il locale lavora da solo: io prendo le comande dal QR, rispondo al telefono, tengo i conti.', 'Tu intervieni quando serve una persona. Cominciamo dalle cose semplici.'],
    outro:['Visto? Il locale gira, e tu sai dove mettere le mani.', 'Però sul retro si sente un furgone che fa manovra…'],
    goal:tasks3},
   {title:'Il primo turno', narrator:'Otto maître', role:'otto-bow',
    intro:[`Benvenuto all’Osteria del Borgo! ${persona.first} mi ha detto che stasera sei tu il responsabile di sala.`, 'Io sono il sistema: comande, cucina, frigo, cassa e telefono. **Quando serve una persona, il quadrato rosso in alto ti chiama.**', 'Si comincia piano: tre cose da sistemare, e intanto ti guardi intorno.'],
    outro:['Primo turno superato, e senza un piatto freddo.', `Ma ${persona.first} ha una faccia strana: qualcosa sta per succedere…`],
    goal:tasks3},
   {title:'Il servizio comincia', narrator:'Otto cuoco', role:'otto-chef',
    intro:['Davide accende i fornelli, Sofia sistema i coperti. Io? Sono già al lavoro su tutto il resto.', 'Il QR prende gli ordini, la cucina li riceve, il magazzino si scala da solo.', 'Ti chiamo io quando serve una mano vera. **Il primo obiettivo è semplice**: tre compiti.'],
    outro:['La cucina è calda e la sala piena a metà. Bene così.', 'Adesso però la serata comincia a fare sul serio…'],
    goal:tasks3}
  ]},
  {variants:[
   {title:'Il fornitore furbo', narrator:'Otto magazziniere', role:'otto-cap',
    intro:['È arrivato il furgone della Macelleria Bartolini.', 'Bartolini è simpatico, ma ha un vizio: **le sue fatture non tornano mai con quello che scarica**. Un chilo in più qui, un prezzo arrotondato là.', 'Stasera arriveranno più fatture e documenti da controllare. Confronta sempre con la bolla firmata: vale quella.'],
    outro:['Bartolini se ne va brontolando, con due note di credito in tasca.', 'Il magazzino è giusto, i conti pure.'],
    goal:{type:'missions', n:2, pages:['magazzino', 'fatture'], label:'Vinci 2 missioni di Magazzino o Cassa'}, bias:['magazzino', 'fatture']},
   {title:'La consegna a 9 gradi', narrator:'Otto magazziniere', role:'otto-cap',
    intro:['Il camion frigo del fornitore di latticini è arrivato in ritardo, e il termometro del cassone segna **9 °C**.', 'La merce va controllata prima di entrare in cella, e intanto le celle lavorano di più: **i frigo si guastano più spesso**.', 'Regola d’oro dell’HACCP: quello che non è conforme non entra.'],
    outro:['Merce respinta dove serviva, celle tornate in norma, tutto registrato.', 'Il fornitore manderà un altro camion domani mattina.'],
    goal:{type:'missions', n:2, pages:['magazzino', 'staff'], label:'Vinci 2 missioni di Magazzino o HACCP'}, bias:['magazzino', 'staff'],
    apply:rules([[D.fridgeCfg, 'rate', 1.7]])},
   {title:'Il POS che fa i capricci', narrator:'Otto cassiere', role:'otto-bow',
    intro:['Il POS del banco ha deciso di riavviarsi ogni dieci minuti.', 'Gli ospiti pagano dal QR, a volte metà al tavolo e metà in cassa, e chi ha la card vuole il suo sconto: **i conti vanno fatti con attenzione**, e i documenti per l’Agenzia delle Entrate devono tornare.', 'Arriveranno più conti e fatture da sistemare.'],
    outro:['Il tecnico ha cambiato il POS, e nessun conto è andato storto.', 'Ogni euro incassato ha il suo documento commerciale.'],
    goal:{type:'missions', n:2, pages:['sala', 'fatture', 'menu_pos', 'fidelity_nfc'], label:'Vinci 2 missioni di Sala, Cassa, Menu QR o Fidelity'}, bias:['sala', 'fatture', 'menu_pos', 'fidelity_nfc']}
  ]},
  {variants:[
   {title:'Il critico in incognito', narrator:'Otto cuoco', role:'otto-chef',
    intro:['Tavolo 4: un signore solo, giacca scura, guarda l’orologio a ogni piatto.', 'Sofia lo ha riconosciuto: è **un critico gastronomico**. Scrive di tempi, di conti e di come si risponde alle recensioni.', 'Da adesso **le comande possono aspettare meno**: la cucina deve correre, senza sbagliare.'],
    outro:['Il critico paga, lascia una mancia e un biglietto: “Tornerò”.'],
    goal:{type:'missions', n:2, pages:['sala', 'kds', 'recensioni_ai', 'menu_pos'], label:'Vinci 2 missioni di Sala, Cucina, Menu o Recensioni'}, bias:['sala', 'kds', 'recensioni_ai', 'menu_pos'],
    apply:rules([[D.kitchen, 'waitLimit', v => Math.round(v * .75)]])},
   {title:'La comitiva senza prenotazione', narrator:'Otto maître', role:'otto-bow',
    intro:['Una gita aziendale ha trovato l’osteria su Google, e si presenta **senza prenotare**.', 'Arriva gente alla porta più spesso del solito, e **aspetta meno prima di andarsene**. Intanto il telefono squilla per chiedere se c’è posto.', 'Accomoda tutti al tavolo giusto: un tavolo da otto dato a due persone è un gruppo che resta fuori.'],
    outro:['L’ultimo gruppo si siede mentre il primo ordina il dolce. Sala piena, nessuno rimandato a casa.'],
    goal:{type:'missions', n:2, pages:['sala', 'centralino_ai', 'whatsapp'], label:'Vinci 2 missioni di Sala, Centralino o WhatsApp'}, bias:['sala', 'centralino_ai', 'whatsapp'],
    apply:rules([[D.doorCfg, 'rate', 1.8], [D.doorCfg, 'leave', 100]])},
   {title:'La recensione che gira', narrator:'Otto social', role:'otto-star',
    intro:['Una recensione da una stella sta girando su Instagram: “Due ore per una tagliata”.', 'Non è vera, ma **tutti la leggono**. Arriveranno più recensioni, messaggi e clienti fedeli preoccupati.', 'Si risponde con i fatti e con garbo: chi legge giudica il locale da come risponde.'],
    outro:['La recensione è sparita sotto venti risposte di clienti contenti. E il tuo commento ha più like di lei.'],
    goal:{type:'missions', n:2, pages:['recensioni_ai', 'whatsapp', 'fidelity_nfc'], label:'Vinci 2 missioni di Recensioni, WhatsApp o Fidelity'}, bias:['recensioni_ai', 'whatsapp', 'fidelity_nfc']},
   {title:'Il temporale', narrator:'Otto rider', role:'otto-phone',
    intro:['Fuori diluvia: la sala si svuota e mezza Firenze **ordina a casa**.', 'Il tablet del delivery suona di continuo: **gli ordini arrivano quasi il doppio del solito** e i rider, con la pioggia, non hanno pazienza.', 'Accetta in fretta, consegna appena il rider è al banco e, se la cucina non regge, metti in pausa il canale che costa di più.'],
    outro:['Ha smesso di piovere. Nessun ordine annullato, e il sito del locale ha preso più ordini di Glovo.'],
    goal:{type:'missions', n:2, pages:['delivery', 'kds', 'menu_pos'], label:'Vinci 2 missioni di Delivery, Cucina o Menu QR'}, bias:['delivery', 'kds', 'menu_pos'],
    apply:withDelivery([[D.delivery.cfg, 'rate', 1.8], [D.doorCfg, 'rate', .6]])}
  ]},
  {variants:[
   {title:'L’ispettore ASL', narrator:'Otto ispettore', role:'otto-inspector',
    intro:['**Ispezione ASL a sorpresa.** La dottoressa Ferretti vuole vedere celle, temperature, etichette e allergeni.', 'Proprio stasera i frigoriferi fanno i capricci: **i guasti arriveranno più spesso**.', 'Tieni le celle in norma e valida le carte: è quello che conta in un controllo.'],
    outro:['Verbale pulito: “Nessuna non conformità rilevata”.'],
    goal:{type:'missions', n:2, pages:['staff', 'app_builder'], label:'Vinci 2 missioni di HACCP o Allergeni'}, bias:['staff', 'app_builder'],
    apply:rules([[D.fridgeCfg, 'rate', 2.4]])},
   {title:'Il controllo della Finanza', narrator:'Otto cassiere', role:'otto-inspector',
    intro:['Due signori in borghese chiedono di parlare con la titolare: **Guardia di Finanza, controllo sugli scontrini**.', 'Ogni incasso deve avere il suo documento commerciale, ogni fattura il codice giusto, ogni spesa del bando la sua carta.', 'Arriveranno più conti, fatture e domande sui contributi. Niente panico: Otto ha registrato tutto.'],
    outro:[`Il verbale dice: “Corrispettivi regolarmente trasmessi”. ${persona.first} può respirare.`],
    goal:{type:'missions', n:2, pages:['fatture', 'sala', 'bandi'], label:'Vinci 2 missioni di Cassa, Sala o Bandi'}, bias:['fatture', 'sala', 'bandi']},
   {title:'Il tavolo dei celiaci', narrator:'Otto cuoco', role:'otto-chef',
    intro:['Il tavolo 6 ha prenotato per una festa: tre ospiti sono **celiaci** e uno è allergico alle uova.', 'In cucina si lavora con il doppio dell’attenzione, e **le comande possono aspettare un po’ meno**.', 'Allergeni giusti sul menu, comande chiare in cucina, risposte precise al telefono.'],
    outro:['Torta senza glutine, candeline, applausi. E nessuno è stato male.'],
    goal:{type:'missions', n:2, pages:['app_builder', 'kds', 'centralino_ai', 'menu_pos'], label:'Vinci 2 missioni di Allergeni, Cucina, Centralino o Menu'}, bias:['app_builder', 'kds', 'centralino_ai', 'menu_pos'],
    apply:rules([[D.kitchen, 'waitLimit', v => Math.round(v * .85)]])}
  ]},
  {variants:[
   {title:'Il sabato sera', narrator:'Otto', role:'otto-happy',
    intro:['Sala piena, telefono che squilla, comande che piovono.', 'È il momento in cui un locale si vede davvero: **tutto più veloce**, tutto insieme.', 'Hai tutto quello che ti serve. Andiamo.'],
    outro:['Ultimo tavolo servito. La cucina si spegne, la sala si svuota.', 'Grande serata.'],
    goal:points,
    apply:rules([[D.kitchen, 'waitLimit', v => Math.round(v * .85)], [D.fridgeCfg, 'rate', 1.5], [D.doorCfg, 'rate', 1.4]])},
   {title:'Il matrimonio in terrazza', narrator:'Otto maître', role:'otto-bow',
    intro:['Sulla terrazza c’è un matrimonio da quaranta coperti, e la sala interna è piena lo stesso.', 'La cucina lavora per due, **le comande arrivano più fitte** e alla porta c’è sempre qualcuno.', 'Ultimo sforzo: tieni tutto insieme fino al taglio della torta.'],
    outro:['Gli sposi ballano, la torta è tagliata, la cucina chiude.', 'Che serata.'],
    goal:points,
    apply:rules([[D.kitchen, 'waitLimit', v => Math.round(v * .8)], [D.doorCfg, 'rate', 1.6]])},
   {title:'La finale in TV', narrator:'Otto', role:'otto-happy',
    intro:['Stasera c’è la finale, e mezza città vuole guardarla mangiando da noi.', 'Tutti arrivano insieme, tutti ordinano all’intervallo: **la cucina deve correre e la porta non si ferma**. E chi resta a casa ordina il delivery.', 'Novanta minuti più recupero. Si gioca.'],
    outro:['Fischio finale. Abbiamo vinto, e anche la cucina.', 'Si spengono gli schermi e le luci.'],
    goal:points, bias:['delivery', 'kds', 'sala'],
    apply:rules([[D.kitchen, 'waitLimit', v => Math.round(v * .8)], [D.doorCfg, 'rate', 2], [D.doorCfg, 'leave', 110], [D.delivery.cfg, 'rate', 1.6]])}
  ]}
 ]
};
