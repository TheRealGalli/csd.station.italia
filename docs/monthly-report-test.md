# Test report mensili

Il pacchetto contiene soltanto il generatore, i modelli e le dipendenze dichiarate. Non contiene credenziali o dati dei clienti. Non avviare server.js per il test: il server ha sincronizzazioni che scrivono in Firestore.

Caricare monthly-report-test.zip in Cloud Shell, quindi:

```sh
unzip -o monthly-report-test.zip -d monthly-report-test
cd monthly-report-test
npm ci --omit=dev
export GOOGLE_CLOUD_PROJECT=nfc-tag-503214
export FIRESTORE_DATABASE_ID=nfctag
node scripts/send-monthly-reports.js --dry-run
read -r -p 'Account SMTP: ' SMTP_USER
export SMTP_USER
read -r -s -p 'Password per app SMTP: ' SMTP_PASS
export SMTP_PASS
printf '\n'
node scripts/send-monthly-reports.js --test=carlogalli15@gmail.com
unset SMTP_PASS
```

Usare il mittente e la password per app già configurati per il servizio. Non incollarli nella chat. La sessione Cloud Shell deve avere accesso in lettura al database nfctag. Un ruolo con sola lettura è sufficiente per lo script.

La prova invia un messaggio a Carlo per ogni gruppo email effettivamente configurato in Firestore. I documenti senza email vengono saltati e segnalati anche in modalità test. La modalità dry-run legge e raggruppa senza connettersi a SMTP né spedire. Nessuna delle due modalità scrive in Firestore. Non chiamare l'endpoint di produzione per questa prova: non supporta un parametro test nell'URL.

`--slug=frammento` limita i documenti selezionati e può escludere altre sedi del medesimo cliente. Per verificare l'intero gruppo multisede usare il test senza filtro. `--month=2026-10` è solo un'etichetta per le prove: non recupera dati storici.

Il pacchetto di test non pubblica il nuovo codice sul servizio Cloud Run. Per rendere automatiche le nuove mail occorre successivamente distribuire il progetto aggiornato, mantenendo variabili, segreti e identità del servizio esistenti.

## Verifica Scheduler

La CLI Google Cloud non è disponibile nell'ambiente locale: orari, versione pubblicata e log non sono stati verificati. In GCP controllare che il job sia abilitato, abbia espressione `0 8 1 * *` e fuso Europe/Rome, raggiunga l'endpoint corretto e includa l'autenticazione configurata. Non premere Esegui ora sul job reale durante il test: invierebbe ai clienti.

## Limiti attuali del conteggio

Il reset resta invariato: dal giorno 2 su avvio, aggiornamento o accesso, senza un orario fisso. I tap del giorno 1 restano nel periodo precedente e quelli raccolti dopo il report e prima del reset non vengono inclusi nel report successivo. Non esiste uno storico mensile e non esiste una protezione dai doppi invii. Una futura separazione dei contatori per mese risolverebbe questi limiti senza affidarsi all'orario del reset. Il test del modello non certifica la consegna futura dello Scheduler.
