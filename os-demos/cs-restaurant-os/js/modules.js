// Registro unico dei 13 moduli (testati sul campo). Gli identificativi restano quelli della demo originaria.
export const groups = {operations:'Sala & cucina', ai:'Intelligenza artificiale', marketing:'Clienti & marketing', management:'Gestione & controllo'};
export const groupNotes = {
 operations:'Il servizio in tempo reale: tavolo, cucina, delivery, conto.',
 ai:'Otto risponde al telefono e alle recensioni, mentre tu lavori.',
 marketing:'Gli ospiti tornano: messaggi, fedeltà, la tua identità.',
 management:'Magazzino, documenti, persone e opportunità sotto controllo.'
};
export const modules = [
 {id:'sala', title:'Sala & tavoli', icon:'table', group:'operations', live:true, description:'Ogni tavolo in tempo reale: cosa ha ordinato, a che punto è, quanto è il conto.', features:['Pianta live della sala','Comanda dal tavolo','Conto e chiusura']},
 {id:'kds', title:'Cucina & comande', icon:'chef', group:'operations', live:true, description:'Le comande arrivano al pass nell’istante in cui la sala le prende.', features:['Comande per stato','Tempi di preparazione','Allergeni in evidenza']},
 {id:'menu_pos', title:'Menu digitale QR', icon:'menu', group:'operations', live:true, description:'L’ospite ordina dal QR del tavolo e paga subito con Stripe. Il menu cambia da solo se un piatto finisce.', features:['QR per tavolo, ordine dal telefono','Pagamento anticipato con Stripe','Menu intelligente e modificabile da Otto']},
 {id:'delivery', title:'Delivery', icon:'bike', group:'operations', live:true, description:'Glovo, Deliveroo, Just Eat e il tuo sito su un solo tablet: ordini unificati, rider, commissioni e pausa dei canali.', features:['Ordini di tutte le piattaforme insieme','Rider e tempi di ritiro','Pausa dei canali se la cucina è piena']},
 {id:'centralino_ai', title:'Centralino AI', icon:'phone', group:'ai', description:'Otto risponde al telefono, prenota e mette in lista d’attesa.', features:['Prenotazioni al telefono','Allergie segnalate alla cucina','Lista d’attesa']},
 {id:'recensioni_ai', title:'Recensioni AI', icon:'star', group:'ai', description:'Ogni recensione letta, ogni risposta pronta da approvare.', features:['Google e TripAdvisor','Bozze nel tuo tono','Temi ricorrenti']},
 {id:'whatsapp', title:'WhatsApp & campagne', icon:'message', group:'marketing', description:'Conferme, promemoria e campagne agli ospiti che lo vogliono.', features:['Promemoria automatici','Campagne preparate da Otto','Consensi gestiti']},
 {id:'fidelity_nfc', title:'Fidelity & NFC', icon:'card', group:'marketing', description:'L’ospite appoggia la card al tavolo: Otto lo riconosce, somma i punti e propone il premio giusto.', features:['Card NFC e card nel telefono','Livelli, punti e premi','Campagne WhatsApp agli iscritti']},
 {id:'magazzino', title:'Magazzino & food cost', icon:'box', group:'management', live:true, description:'Ogni piatto venduto scala gli ingredienti. Sai cosa manca prima che manchi.', features:['Scarico automatico da ricetta','Sotto scorta in tempo reale','Ordini ai fornitori']},
 {id:'fatture', title:'Cassa & Agenzia Entrate', icon:'receipt', group:'management', live:true, description:'Ogni incasso, in cassa o dal QR, diventa documento commerciale e arriva all’Agenzia delle Entrate.', features:['POS collegato al registratore','Corrispettivi telematici','Incassi Stripe riconciliati']},
 {id:'bandi', title:'Bandi & opportunità', icon:'radar', group:'management', description:'Contributi e bandi adatti al tuo locale, con le scadenze.', features:['Ricerca per territorio','Compatibilità stimata','Scadenze']},
 {id:'staff', title:'Staff & HACCP', icon:'users', group:'management', description:'Turni del servizio e checklist HACCP, sempre a portata di mano.', features:['Turni','Checklist HACCP','Procedure']},
 {id:'app_builder', title:'Brand & app', icon:'palette', group:'marketing', description:'L’app del locale con il tuo nome, sugli store: prenotazioni, card fedeltà, ordini a domicilio e notifiche.', features:['Costruttore dell’app','Anteprima sul telefono','Notifiche push']}
];
export const moduleById = id => modules.find(m => m.id === id);
