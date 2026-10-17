# CS Notaro OS · L'ecosistema dei 12 moduli

Revisione del 17 ottobre 2026. Sostituisce i 12 moduli precedenti (PDF Studio, Fascicoli, Dati & fonti, Controllo incrociato…), conservati in `archive/v0-moduli-precedenti/`.

## Perché sono cambiati

I moduli precedenti erano pensati come **funzioni tecniche** attorno a un PDF: fascicoli, osservazioni, approvazioni, export. Ragionavano come un software documentale, non come uno studio notarile. Mancavano il telefono, la posta, i clienti, le banche, il team, i termini.

Il nuovo ecosistema segue **il percorso reale di una pratica** dentro lo studio, come CS Restaurant OS segue il servizio di una sala:

```
CIÒ CHE ENTRA        →   IL LAVORO            →   LO STUDIO                 →   IL CONTROLLO
Posta & coda             Lo Studio (centro)       Preventivi & imposte          Scadenziario & post-stipula
Centralino               Memoria dello studio     Osservatorio & bandi          Antiriciclaggio & clienti
WhatsApp & notifiche     Visure & Gateway         Staff & task                  Privacy, audit & compliance
```

Sopra tutti c'è **Otto, un solo assistente** che vede ogni modulo. Quando gli chiedi di compilare un documento legge prima le email, i vecchi atti, le visure e l'agenda. In futuro risponde anche da WhatsApp.

## I 12 moduli

| # | Modulo | Cosa fa | Perché è separato |
|---|---|---|---|
| 01 | **Posta & coda pratiche** | Legge email, PEC e allegati, riconosce la pratica, prepara bozze e attività, divide la coda del giorno nel team | È la porta d'ingresso: tutto parte da qui, per questo viene prima dello Studio |
| 02 | **Centralino & segreteria** | Risponde al telefono, raccoglie le richieste dei nuovi clienti, dà prime informazioni e una stima dei costi | Gestisce chi *non* è ancora cliente |
| 03 | **WhatsApp & notifiche** | Aggiorna clienti e banche sulle pratiche *già aperte*: documenti ricevuti, stipula fissata, atto registrato | Separare ciò che entra da ciò che è in corso rende chiaro chi fa cosa |
| 04 | **Lo Studio** | Interfaccia a chat con il documento accanto: l'AI compila PDF, confronta atti, redige bozze dal clausolario, cerca precedenti | Il centro dell'infrastruttura. Assorbe il vecchio “assistente redazione / clausolario” |
| 05 | **Memoria dello studio** | Domande veloci su tutto l'archivio, con citazioni | Per chi cerca un'informazione senza entrare in una pratica |
| 06 | **Visure & Public Gateway** | Richieste a Catasto, Conservatoria, Registro Imprese, anagrafe; l'AI legge gli esiti e segnala gravami e differenze | Registri pubblici con canali e credenziali propri |
| 07 | **Preventivi & imposte** | Calcolo rapido di imposte e onorari, preventivo inviabile al cliente | Alimentato da centralino e posta |
| 08 | **Osservatorio normativo & bandi** | Novità di legge e prassi, bandi pubblici, con l'impatto sulle pratiche aperte | Tiene aggiornato il team senza lettura manuale |
| 09 | **Staff & task** | Assegnazione automatica, carichi, presenze, workflow per tipo di pratica | L'AI distribuisce, il notaio decide le priorità |
| 10 | **Scadenziario & post-stipula** | Registrazione, trascrizione, volture, depositi, copie: termini calcolati per atto | Dopo la firma il lavoro continua |
| 11 | **Antiriciclaggio & clienti** | Adeguata verifica, titolare effettivo, PEP, origine dei fondi, anomalie da valutare | Obbligo specifico del notaio. **Proposto in più rispetto alla tua lista** |
| 12 | **Privacy, audit & compliance** | Registro di ogni azione dell'AI con chi l'ha approvata, ruoli, conservazione, informativa AI | Condizione per affidare dati notarili a un sistema |

### La scelta del dodicesimo

La lista iniziale aveva 11 moduli (il clausolario è entrato nello Studio). Per il dodicesimo ho scelto **Antiriciclaggio & clienti**: è un obbligo quotidiano del notaio, si prepara bene con documenti già arrivati da posta e WhatsApp e oggi è spesso gestito su carta o fogli di calcolo. Alternative valutate:

- **Agenda stipule & sale**: calendario delle firme, sale, presenze delle parti e delle banche. Forte, ma in parte coperto da Staff e Scadenziario.
- **Fatturazione & repertorio**: utile, ma di solito già coperto dal gestionale esistente.

## Lo Studio: come funziona l'interfaccia

- **Sinistra**: conversazione con Otto. Ogni risposta mostra prima i **passaggi** (apro la pratica, leggo l'email, cerco in archivio, incrocio la visura), poi il risultato.
- **Destra**: il documento che prende forma. Modulo che si compila campo per campo con la **fonte** sotto ogni valore, tabella delle differenze, bozza d'atto con l'origine di ogni clausola e i punti da decidere evidenziati.
- Il documento si può **nascondere** (icona occhio): si lavora anche solo in chat.
- Il **fermaglio** carica un PDF reale. Se ha campi compilabili, Otto li riconosce e li abbina ai dati della pratica; il PDF compilato si scarica davvero. Nessun trascinamento di testo sui pixel.
- I dati che mancano **restano vuoti** e vengono segnalati. Otto non inventa.

## Cosa è reale e cosa è demo

| Reale in questa anteprima | Dimostrativo |
|---|---|
| Lettura dei campi di un PDF caricato e scaricamento del PDF compilato | Le risposte di Otto (scenari predefiniti su dati inventati) |
| Generazione e compilazione del modulo Banca Arno in PDF | Posta, chiamate, WhatsApp, visure, aggiornamenti normativi |
| Calcolatore di imposte (regole semplificate) | Assegnazione dei task e calcolo dei termini |
| Approvazioni, attività chiuse e notifiche salvate nel browser | Collegamenti a caselle, centralino, registri pubblici |

Il contratto di ogni risposta dello Studio (`passaggi → risposta → documento → azioni`, in `js/agent.js`) è quello che il backend reale dovrà restituire.

## Prossimi passi proposti

1. **Guida interattiva** sopra la demo: un percorso di 3 minuti (email della banca → Studio compila → posta approva → WhatsApp avvisa il cliente).
2. **Backend minimo** per lo Studio: un modello reale con accesso a una cartella di atti di prova, che restituisca lo stesso contratto JSON.
3. Validazione con 2-3 studi: quali moduli tenere nel piano base, quali nel completo.
