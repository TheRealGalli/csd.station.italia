# Verifica del front-end — 17 ottobre 2026

## Controlli svolti

- Sintassi dei quattro moduli JavaScript controllata con `node --check`.
- Avvio del server locale e caricamento nel browser di Codex.
- Navigazione in tutti i 12 moduli: intestazione corretta, tre sezioni e stato iniziale vuoto.
- Configurazione di ristorante e sala con dati esclusivamente di prova: avanzamento aggiornato e persistenza dopo ricaricamento.
- Passaggio dalla guida di Otto alla configurazione della sala; chiusura e riapertura dei dialoghi.
- Ricerca globale di “recensioni” e apertura del risultato corretto.
- Filtro del catalogo per “NFC”.
- Navigazione tra le schede con il tasto freccia destra e verifica dello stato selezionato.
- Selezione del piano Completo: solo preferenza locale, nessuna attivazione.
- Menu mobile: apertura, navigazione e chiusura dopo cambio schermata; contenuto fuori dal menu non interattivo quando aperto.
- Layout osservato su desktop e mobile; assenza di overflow orizzontale nella panoramica a 390 e 320 px.
- Ripristino dall’interfaccia e ritorno al primo accesso, rimuovendo tutti i dati di prova.
- Nessun errore o avviso applicativo nel registro console durante la verifica delle schermate.

## Limiti

Nessun test di servizi remoti o operazioni di business: tali funzionalità sono fuori dal perimetro di questa versione. Nessun deploy. Verifica browser effettuata nel browser integrato di Codex; non è una certificazione di compatibilità universale o accessibilità WCAG.
