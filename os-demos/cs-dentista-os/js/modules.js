// Registro unico dei 12 moduli di CS Dentista OS, divisi nelle quattro aree dello studio.
export const groups = {clinic:'Poltrona & clinica', ai:'Intelligenza artificiale', patients:'Pazienti & relazione', management:'Gestione & controllo'};
export const groupNotes = {
 clinic:'La giornata in tempo reale: agenda, cartella, piani di cura, laboratorio.',
 ai:'Otto ascolta, scrive e risponde mentre tu lavori in bocca al paziente.',
 patients:'I pazienti informati, tranquilli e puntuali, su WhatsApp.',
 management:'Materiali, sterilizzazione e fatture sanitarie sotto controllo.'
};
export const modules = [
 {id:'agenda', title:'Agenda & poltrone', icon:'calendar', group:'clinic', live:true, description:'Le tre poltrone in tempo reale: chi è in sala d’attesa, chi è in poltrona, chi ha finito.', features:['Agenda per poltrona','Check-in e sala d’attesa','Disdette riempite da Otto']},
 {id:'cartella', title:'Cartella & odontogramma', icon:'tooth', group:'clinic', live:true, description:'Odontogramma, anamnesi e storia di ogni dente. Gli avvisi clinici prima di iniziare.', features:['Odontogramma interattivo','Anamnesi con avvisi','Storia per dente']},
 {id:'preventivi', title:'Preventivi & piani di cura', icon:'receipt', group:'clinic', description:'Piani di cura chiari, rate comprensibili e nessun preventivo dimenticato nel cassetto.', features:['Piani a fasi','Rate e finanziamento','Spiegazione semplice al paziente']},
 {id:'laboratorio', title:'Laboratorio odontotecnico', icon:'flask', group:'clinic', description:'Corone, protesi e bite: sai sempre se il lavoro arriva prima dell’appuntamento.', features:['Lavori per stato','Consegne collegate all’agenda','Avvisi di ritardo']},
 {id:'dettatura_ai', title:'Dettatura clinica AI', icon:'mic', group:'ai', live:true, description:'Detti una frase a fine seduta: Otto scrive la cartella e aggiorna tutto lo studio.', features:['Nota clinica strutturata','Magazzino e fattura in automatico','Istruzioni post-operatorie']},
 {id:'centralino_ai', title:'Centralino AI', icon:'phone', group:'ai', live:true, description:'Otto risponde al telefono, riconosce le urgenze e trova il primo posto libero.', features:['Triage del dolore','Prenotazioni e spostamenti','Risposte 24/7']},
 {id:'richiami_ai', title:'Richiami & igiene', icon:'repeat', group:'ai', live:true, description:'Chi deve tornare per l’igiene viene richiamato da solo, al momento giusto.', features:['Richiami a 6 mesi','Risposte e prenotazioni','Pazienti persi recuperati']},
 {id:'whatsapp', title:'WhatsApp pazienti', icon:'message', group:'patients', live:true, description:'Promemoria, istruzioni dopo l’intervento e conferme, nel canale che i pazienti usano già.', features:['Promemoria appuntamento','Istruzioni post-operatorie','Conferme e disdette']},
 {id:'consensi', title:'Consensi & privacy', icon:'shield', group:'patients', description:'Consensi informati firmati su tablet prima della seduta, mai all’ultimo minuto.', features:['Consenso per prestazione','Firma su tablet','Privacy e GDPR']},
 {id:'magazzino', title:'Materiali & lotti', icon:'box', group:'management', live:true, description:'Ogni seduta scala i suoi materiali. Lotti degli impianti tracciati paziente per paziente.', features:['Scarico per prestazione','Sotto scorta in tempo reale','Passaporto implantare']},
 {id:'sterilizzazione', title:'Sterilizzazione', icon:'flame', group:'management', live:true, description:'Cicli dell’autoclave, test e buste tracciate fino alla poltrona.', features:['Cicli e test giornalieri','Buste per paziente','Registro per i controlli']},
 {id:'fatture', title:'Fatture & Sistema TS', icon:'coins', group:'management', live:true, description:'Fattura sanitaria a fine seduta e invio al Sistema Tessera Sanitaria per il 730.', features:['Fattura a fine seduta','Invio al Sistema TS','Incassi e rate']}
];
export const moduleById = id => modules.find(m => m.id === id);
