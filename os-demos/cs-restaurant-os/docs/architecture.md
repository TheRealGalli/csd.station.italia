# Architettura dell’interfaccia

## Identità visiva

Riferimento analizzato: `CSD Station/csd.station.italia/src/components/station/Station.tsx`, `station.css`, `StationExperiences.tsx`, `experiences.css` e `public/csd-mark.svg`.

Il workspace riprende il verde scuro, il lime #c5f476, il marchio a tre segmenti, la tipografia di sistema, i fondi carta e Otto. La navigazione scura rimane persistente, mentre la superficie di lavoro chiara ospita dati e configurazioni. Otto è un componente CSS locale originale, non un’immagine esterna. Il progetto CSD Station di riferimento non è stato modificato.

## Mappa del prodotto

- Accesso: un futuro ingresso unico tramite l’identità CSD Station.
- Panoramica: benvenuto, percorso di preparazione, riepilogo ancora vuoto e primi sei moduli.
- Catalogo: dodici spazi, ricercabili per funzione e area.
- Modulo: intestazione, sezioni, indicatori, area operativa vuota, guida e bozza di configurazione.
- Impostazioni: ristorante, ruolo previsto, preferenze italiane, piano e ripristino dell’anteprima.
- Piani: due ipotesi commerciali esplicite, nessuna attivazione o cifra inventata.

Il raggruppamento Essenziale/Completo è deliberatamente reversibile. Il catalogo centrale conserva gli identificativi della demo originaria (`sala`, `kds`, `menu_pos`, ecc.), così da avere un punto stabile per i futuri moduli.

## Stati da distinguere

1. Nuovo account: ristorante ancora senza nome, nessun dato operativo.
2. Configurazione locale preparata: bozza sul dispositivo, nessun servizio collegato.
3. In futuro: configurazione sincronizzata, integrazione collegata, servizio attivo.

Nella versione corrente esistono solo i primi due stati. Un trattino negli indicatori significa dato non disponibile, non un risultato economico pari a zero. Il completamento dei tre passi riguarda le bozze iniziali e non attiva moduli.

## Organizzazione attuale

La shell e i comportamenti comuni vivono in `app.js`. Il registro `modules.js` contiene dati, gruppi, descrizioni, schede, campi e proposta di piano. `store.js` isola la persistenza locale. Il router a fragment evita dipendenze dalla configurazione del server e rende ciascuna schermata direttamente raggiungibile.

Questa separazione consente di migrare l’interfaccia a componenti React o ad altro framework della piattaforma mantenendo identificativi e contenuti. Non sono stati introdotti servizi cloud, dipendenze o endpoint fittizi.

## Prossime integrazioni, da realizzare modulo per modulo

1. Collegare l’identità CSD Station; caricare utente, ristorante e sedi dal servizio reale.
2. Definire il contratto di workspace: tenant, ruoli, permessi e moduli inclusi. L’autorizzazione deve essere applicata sul server, non tramite visibilità delle schede.
3. Sostituire lo store locale con un adattatore dati e introdurre stati di caricamento, errore, assenza di dati e successo delle operazioni remote. Non trasferire automaticamente le bozze del prototipo senza revisione.
4. Implementare il primo modulo, con API e modello dati reali, mantenendo l’interfaccia comune. Sala e menu sono i punti d’ingresso naturali al servizio.
5. Integrare i piani con il sistema di fatturazione scelto; gestire attivazioni, rinnovi, scadenze e cambi piano sulla piattaforma.
6. Collegare gli altri servizi solo quando sono pronti. Autenticazione, token, credenziali e dati dei clienti non devono essere affidati a questo store locale.

La scelta dei servizi GCP, il modello multi-tenant, la gestione dei pagamenti e gli aspetti fiscali restano nella fase successiva: questa consegna non li assume già risolti.
