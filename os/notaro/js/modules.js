// Registro unico dei 12 moduli: navigazione, catalogo e mappa dell'ecosistema.
// L'ordine segue il flusso reale dello studio: ciò che entra → il lavoro → l'organizzazione → il controllo.
export const groups = {
 entrata: 'Ciò che entra',
 lavoro: 'Il lavoro',
 studio: 'Lo studio',
 controllo: 'Il controllo'
};

export const groupNotes = {
 entrata: 'Posta, telefono e messaggi arrivano già letti, collegati alla pratica e smistati.',
 lavoro: 'Lo Studio AI compila, confronta e redige con tutto l’archivio a disposizione.',
 studio: 'Preventivi, aggiornamenti e persone: lo studio si organizza da solo.',
 controllo: 'Termini, antiriciclaggio e tracciabilità di ogni azione dell’AI.'
};

export const modules = [
 {id:'posta', title:'Posta & coda pratiche', short:'Posta', icon:'inbox', group:'entrata',
  description:'Ogni email arriva già letta, collegata alla pratica e trasformata in lavoro.',
  features:['Lettura di email, PEC e allegati','Bozze di risposta pronte','Coda del giorno divisa nel team']},
 {id:'centralino', title:'Centralino & segreteria', short:'Centralino', icon:'phone', group:'entrata',
  description:'Le prime risposte ai nuovi clienti, anche quando lo studio è in stipula.',
  features:['Risposta telefonica AI','Raccolta richieste e appuntamenti','Primo preventivo al nuovo cliente']},
 {id:'whatsapp', title:'WhatsApp & notifiche', short:'Notifiche', icon:'message', group:'entrata',
  description:'Clienti e banche aggiornati sulle pratiche già in corso, senza telefonate.',
  features:['Aggiornamenti automatici di stato','Risposte su pratiche aperte','Canale dedicato alle banche']},
 {id:'studio', title:'Lo Studio', short:'Studio', icon:'otto-read', group:'lavoro', core:true,
  description:'Il centro dello studio: l’AI compila moduli, confronta atti e redige bozze.',
  features:['Compilazione automatica di PDF','Confronto tra atti e bozze','Redazione dal clausolario dello studio']},
 {id:'memoria', title:'Memoria dello studio', short:'Memoria', icon:'network', group:'lavoro',
  description:'Una domanda veloce, una risposta con la fonte. Tutto l’archivio, in un istante.',
  features:['Ricerca su atti, email e anagrafiche','Risposte con citazioni','Precedenti e clausole già usate']},
 {id:'visure', title:'Visure & Public Gateway', short:'Visure', icon:'scan', group:'lavoro',
  description:'Catasto, Conservatoria e Registro Imprese, letti e controllati dall’AI.',
  features:['Richieste dai dati della pratica','Lettura automatica degli esiti','Segnalazione di gravami e differenze']},
 {id:'preventivi', title:'Preventivi & imposte', short:'Preventivi', icon:'coins', group:'studio',
  description:'Imposte e onorari stimati in pochi secondi, pronti da inviare al cliente.',
  features:['Calcolo imposte per tipo di atto','Tariffario dello studio','Preventivo inviabile al cliente']},
 {id:'osservatorio', title:'Osservatorio normativo & bandi', short:'Osservatorio', icon:'radar', group:'studio',
  description:'Novità, prassi e bandi pubblici filtrati per ciò che tocca le tue pratiche.',
  features:['Fonti pubbliche monitorate','Impatto sulle pratiche aperte','Bandi e opportunità per lo studio']},
 {id:'staff', title:'Staff & task', short:'Staff', icon:'users', group:'studio',
  description:'Chi fa cosa, oggi. L’AI distribuisce il lavoro, tu decidi le priorità.',
  features:['Assegnazione automatica','Carichi di lavoro e presenze','Workflow per tipo di pratica']},
 {id:'scadenze', title:'Scadenziario & post-stipula', short:'Scadenze', icon:'calendar', group:'controllo',
  description:'Registrazione, trascrizione, volture e depositi: nessun termine dimenticato.',
  features:['Termini calcolati per atto','Adempimenti post-stipula','Avvisi al responsabile']},
 {id:'antiriciclaggio', title:'Antiriciclaggio & clienti', short:'Antiriciclaggio', icon:'shield', group:'controllo',
  description:'Adeguata verifica, titolare effettivo e profilo di rischio, preparati in anticipo.',
  features:['Fascicolo cliente e documenti','Titolare effettivo e PEP','Anomalie da valutare']},
 {id:'compliance', title:'Privacy, audit & compliance', short:'Audit', icon:'lock', group:'controllo',
  description:'Ogni azione dell’AI registrata, con chi l’ha approvata. Privacy sotto controllo.',
  features:['Registro delle azioni AI','Accessi e permessi','Trattamenti e conservazione']}
];

export const moduleById = id => modules.find(m => m.id === id);
