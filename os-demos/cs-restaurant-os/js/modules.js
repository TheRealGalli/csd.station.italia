// Registro unico dei 12 moduli (testati sul campo). Gli identificativi restano quelli della demo originaria.
export const groups = {operations:'Sala & cucina', ai:'Intelligenza artificiale', marketing:'Clienti & marketing', management:'Gestione & controllo'};
export const groupNotes = {
 operations:'Il servizio in tempo reale: tavolo, cucina, conto.',
 ai:'Otto risponde al telefono e alle recensioni, mentre tu lavori.',
 marketing:'Gli ospiti tornano: messaggi, fedeltà, la tua identità.',
 management:'Magazzino, documenti, persone e opportunità sotto controllo.'
};
export const modules = [
 {id:'sala', title:'Sala & tavoli', icon:'table', group:'operations', live:true, description:'Ogni tavolo in tempo reale: cosa ha ordinato, a che punto è, quanto è il conto.', features:['Pianta live della sala','Comanda dal tavolo','Conto e chiusura']},
 {id:'kds', title:'Cucina & comande', icon:'chef', group:'operations', live:true, description:'Le comande arrivano al pass nell’istante in cui la sala le prende.', features:['Comande per stato','Tempi di preparazione','Allergeni in evidenza']},
 {id:'menu_pos', title:'Menu digitale & cassa', icon:'menu', group:'operations', live:true, description:'Prezzi, food cost e margini. Gli incassi della serata, conto per conto.', features:['Menu con allergeni','Margine per piatto','Cassa della serata']},
 {id:'centralino_ai', title:'Centralino AI', icon:'phone', group:'ai', description:'Otto risponde al telefono, prenota e mette in lista d’attesa.', features:['Prenotazioni al telefono','Allergie segnalate alla cucina','Lista d’attesa']},
 {id:'recensioni_ai', title:'Recensioni AI', icon:'star', group:'ai', description:'Ogni recensione letta, ogni risposta pronta da approvare.', features:['Google e TripAdvisor','Bozze nel tuo tono','Temi ricorrenti']},
 {id:'whatsapp', title:'WhatsApp & campagne', icon:'message', group:'marketing', description:'Conferme, promemoria e campagne agli ospiti che lo vogliono.', features:['Promemoria automatici','Campagne preparate da Otto','Consensi gestiti']},
 {id:'fidelity_nfc', title:'Fidelity & NFC', icon:'card', group:'marketing', description:'Gli ospiti abituali riconosciuti, premiati e invitati a tornare.', features:['Punti e premi','Card NFC','Ospiti abituali']},
 {id:'magazzino', title:'Magazzino & food cost', icon:'box', group:'management', live:true, description:'Ogni piatto venduto scala gli ingredienti. Sai cosa manca prima che manchi.', features:['Scarico automatico da ricetta','Sotto scorta in tempo reale','Ordini ai fornitori']},
 {id:'fatture', title:'Fatture & corrispettivi', icon:'receipt', group:'management', description:'Corrispettivi della serata e fatture, pronti per il commercialista.', features:['Corrispettivi giornalieri','Fatture elettroniche','Acquisti dai fornitori']},
 {id:'bandi', title:'Bandi & opportunità', icon:'radar', group:'management', description:'Contributi e bandi adatti al tuo locale, con le scadenze.', features:['Ricerca per territorio','Compatibilità stimata','Scadenze']},
 {id:'staff', title:'Staff & HACCP', icon:'users', group:'management', description:'Turni della serata e checklist HACCP, sempre a portata di mano.', features:['Turni','Checklist HACCP','Procedure']},
 {id:'app_builder', title:'Brand & app', icon:'palette', group:'marketing', description:'Menu QR, portale ospiti e la tua identità su ogni dispositivo.', features:['Menu QR','Portale ospiti','Identità']}
];
export const moduleById = id => modules.find(m => m.id === id);
