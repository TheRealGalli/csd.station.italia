# CS Notaro OS · Studio di prodotto

> **Nota (17/10/2026, revisione):** la tabella «Priorità dei moduli» qui sotto è superata. L'ecosistema attuale è descritto in [ecosistema-moduli.md](ecosistema-moduli.md). Ricerca di mercato, database e fondazione GCP restano validi.

Ricerca del 17 ottobre 2026. Analisi dei sorgenti locali di CS Restaurant OS e Gromit DIE e delle fonti pubbliche primarie elencate in fondo. Non sono state eseguite interviste a clienti né prove dei gestionali concorrenti. Le funzionalità pubblicizzate dai fornitori sono evidenze di offerta, non verifiche indipendenti di qualità. L'assenza di una funzione da una pagina commerciale non dimostra che il prodotto non la offra.

## La decisione

Costruire una suite documentale complementare al gestionale notarile: **dal documento ricevuto al dato verificato, dal dato al modulo pronto per la revisione**. L'ingresso commerciale è il compilatore universale di PDF, accompagnato da un fascicolo di lavoro leggero. Il valore cumulativo è una memoria dello studio che conserva provenienza, contesto, versioni e approvazioni dei dati, esportabile senza ricostruzioni manuali.

Il cliente mantiene gestionale, repertorio, firme, conservazione e canali telematici. CS Notaro OS si occupa del lavoro intermedio che oggi attraversa PDF, email, cartelle, persone e applicazioni diverse. Un archivio completo può diventare un'opzione successiva; migrare tutto non deve essere il requisito per ottenere il primo beneficio.

## Cosa offre già il mercato

| Area | Evidenza pubblica | Conseguenza per CS Notaro OS |
| --- | --- | --- |
| Fascicoli, anagrafiche, agenda, checklist, inserimento dati negli atti | FlaminiaDesk descrive queste funzioni, oltre a estrazione da visure, fatturazione e adempimenti [2] | Non presentarle come innovazioni o sviluppare un duplicato generalista |
| Estrazione AI, confronto di documenti, ricerca nell'archivio e redazione | NotaioNext Expert AI dichiara questi casi d'uso nel luglio 2026 [1] | «Chat con i documenti» da sola non giustifica un altro abbonamento |
| PDF, PDF/A e adempimenti | Suite Notaro include una console PDF/A e moduli per adempimenti [3] | Differenziare la compilazione di moduli esterni dalla sola gestione PDF |
| Ricerca AI su archivi notarili esterni al gestionale | DataWeb propone ricerca e verifiche documentali con tracciabilità [4] | Anche indipendenza e citazioni hanno concorrenti: vanno dimostrate nel flusso completo |
| Prezzo del gestionale | FlaminiaDesk pubblica un canone base di 50 €/mese per notaio, costi per atto e storage aggiuntivo [2] | Non promettere di essere «più economici» confrontando solo il canone: misurare costo totale e tempo recuperato |

Il posizionamento è quindi un'ipotesi competitiva verificabile, non una pretesa di esclusività: **compilazione trasversale a fornitori diversi, revisione campo per campo, riuso dei dati approvati e uscita completa dei dati**.

## Utenti e lavori da risolvere

- Collaboratore: riceve documenti disomogenei, ricopia gli stessi dati in moduli bancari e amministrativi, rincorre allegati mancanti. Deve completare un lavoro reale già al primo accesso.
- Notaio: deve capire da dove viene un dato e quali contraddizioni restano. Serve una coda di revisione, non un indicatore opaco di «pratica sicura».
- Responsabile di studio: vuole tempi prevedibili, costi controllabili e meno passaggi tra strumenti. Serve una misura verificabile del lavoro, non una stima AI di ore risparmiate.
- Studio appena avviato: può desiderare più gestione, ma è un segmento diverso da chi ha un gestionale consolidato. Non forzare lo stesso percorso a entrambi.

## Priorità dei moduli

| Modulo | Lavoro concreto | Priorità | Differenza da validare |
| --- | --- | --- | --- |
| PDF Studio | Compilare campi AcroForm oppure posizionare testo su PDF statici/scansioni; revisione ed esportazione | P0 | Stessi dati, modelli di banche/enti diversi, nessun cambio gestionale |
| Fascicoli di lavoro | Raggruppare le sole fonti necessarie a una lavorazione | P0 | Avvio senza importazione dell'intero archivio |
| Dati & fonti | Conservare ogni dato con documento, pagina, versione e stato di revisione | P0 | Un dato approvato si riusa senza perdere la sua provenienza |
| Controllo incrociato | Evidenziare valori discordanti e documenti mancanti | P0, dopo un corpus di test | Confronto tra fonti esterne e bozza; nessuna certificazione automatica dell'atto |
| Assistente documentale | Rispondere sulle fonti selezionate, aprendo il passaggio citato | P1 | Perimetro di fascicolo esplicito e astensione quando la risposta manca |
| Raccolta documenti | Checklist e richieste al cliente, caricamenti con scadenza | P1 | Meno solleciti; confrontare con portali già posseduti dallo studio |
| Modelli dello studio | Mappature PDF versionate e vocabolario dei campi | P1 | Riuso del lavoro di preparazione, non riscrittura degli atti |
| Memoria dello studio | Ricerca tra soggetti, beni, documenti e precedenti autorizzati | P1 | Costruita progressivamente sui dati approvati e non su tutto indiscriminatamente |
| Esportazione & raccordo | JSON/CSV documentati; in produzione archivio completo con originali e manifest | P0 | Libertà di uscita dimostrata con una prova di ripristino |
| Privacy & accessi | Permessi per fascicolo, retention, eventi di accesso e revisione | Fondazione | Requisito del servizio; non solo una scheda commerciale |
| Attività & scadenze | Lavorazioni e blocchi documentali della suite | P2 | Evitare doppia agenda e duplicazione delle scadenze del gestionale |
| Gestione completa | Pratiche, team e repository estesi | P3, opzionale | Solo dopo domanda pagante e integrazioni sostenibili |

Da non mettere nel primo rilascio: firma digitale proprietaria, conservazione a norma proprietaria, repertorio, invii alla PA, calcolo fiscale vincolante, ricerca normativa generica senza fonti licenziate, giudizio AML automatico, invio autonomo di documenti. Centralino e marketing di Restaurant non sono priorità notarili.

## Cosa riprendere da CS Restaurant OS

Il progetto locale è un frontend navigabile statico, non un backend già operativo. La sua promessa di infrastruttura a 360 gradi è una direzione di prodotto. Riutilizzare direttamente `css/style.css`, `css/otto.css`, il marchio e le icone; conservare shell, menu laterale, selettore workspace, ricerca, dialoghi e catalogo modulare.

L'etica che emerge dall'interfaccia è concreta: non inventare incassi o attività; distinguere configurazione da servizio attivo; partire dalle necessità dell'utente; mostrare ciò che manca; mantenere un linguaggio accessibile. Per il notaio significa: niente percentuali di precisione inventate, nessun «GDPR garantito» non dimostrato, dato mancante lasciato vuoto, autore della revisione riconoscibile, file e database esportabili.

La palette resta verde scuro #151e18, lime #c5f476, carta #f6f7f2. Otto conserva il ruolo di guida discreta. Il marchio è CSD Station; CS Notaro OS è il nome di lavoro, da verificare sul piano commerciale prima del lancio, anche per la vicinanza alla denominazione esistente Suite Notaro.

## Cosa recuperare da Gromit DIE

Analisi del codice, non soltanto del README:

| Componente | Riscontro | Riutilizzo consigliato |
| --- | --- | --- |
| `server/form-compiler-pro.ts` | Scoperta dei campi AcroForm; testo, checkbox, radio e dropdown; pagina, rettangolo e ID; annotazioni visive; proposta multimodale; scrittura tramite pdf-lib | Separare rilevamento deterministico, proposte AI e applicazione di valori approvati |
| `server/form-compiler.ts` | Rilevamento visivo delle aree compilabili attraverso Gemini | Recuperare l'idea, rifare validazione di geometrie e gestione multipagina |
| `client/src/components/DocumentCompilerSection.tsx` | Orchestrazione di fonti, compilazione, privacy e revisione | Estrarre flussi piccoli, senza trasferire il componente monolitico |
| `server/routes.ts`, `ChatInterface.tsx`, contesti | Chat con fonti selezionate, allegati e memoria; connettori Drive/Gmail | Ricostruire il perimetro per studio e fascicolo, citazioni verificabili e autorizzazioni sul server |
| `server/rag-utils.ts` | Chunking per paragrafi e ranking per parole chiave | Non è di per sé un database semantico; serve un indice con metadati, permessi e riferimenti stabili |
| `client/src/lib/privacy.ts`, Ollama e bridge | Tentativo di estrazione locale e pseudonimizzazione | Sperimentazione separata; non equivale a anonimizzazione garantita |

Le due modalità PDF richieste sono distinte: **campi nativi** con scrittura nelle strutture del modulo, e **compilazione visiva** con testo sovrapposto in posizioni revisionate. Le coordinate AI non devono mai essere accettate come certe. Il codice storico assegna `confidence: 1.0` ai campi scoperti e `pageNumber: 0`: sono valori implementativi, non affidabilità misurata. Il nuovo flusso deve validare pagine, coordinate, crop/rotazione e testo che non entra nel riquadro.

Punti da correggere prima di ogni riuso server: CORS riflette anche origini non autorizzate; secret di sessione nel codice; percorso private-cloud con bypass dell'autenticazione; limiti e permessi non uniformi su tutte le route. Questi riscontri impediscono di descrivere il vecchio backend come base già pronta per dati notarili. Non vengono copiati credenziali, sessioni o configurazioni di deployment del vecchio sistema.

## Il database che aggiunge valore

Non solo «file + embeddings». Modello proposto:

`studio → fascicolo → documenti/versioni → osservazioni → valori approvati → impieghi nei modelli → esportazioni`.

Una **osservazione** è: soggetto o bene, attributo, valore originale, valore normalizzato, documento/versione, pagina e area, data di acquisizione, metodo di estrazione, stato. Due fonti discordanti producono due osservazioni e un conflitto, non una sovrascrittura silenziosa. L'approvazione sceglie un valore per un contesto, registra chi lo ha approvato e può essere revocata. Un nuovo documento può rendere necessaria una nuova revisione. Non riusare globalmente dati vecchi senza data di validità e verifica.

Un modello PDF è versionato con hash del documento, geometrie e mappature. Ogni output registra quali valori e versioni ha usato. Soggetti omonimi non vengono fusi automaticamente. Le ricerche devono rispettare permessi prima del recupero dei contenuti, non filtrare dopo la risposta AI.

Uscita: originali, derivati, note, osservazioni, approvazioni, modelli, relazioni e manifest con hash. Formati JSON/CSV/PDF e dizionario del modello. Una prova di round-trip è un requisito di accettazione. Il solo CSV delle anagrafiche non è un export completo. Archivio operativo e conservazione a norma restano servizi distinti.

## Abbonamento e verifica economica

Ipotesi da testare, senza listino inventato: **Essenziale** (PDF, fascicoli, dati, controllo, assistente, export), **Studio** (raccolta, modelli, memoria, attività e ruoli avanzati). Sicurezza di base ed esportazione non sono funzioni da far pagare per poter uscire. Un'offerta di gestione completa va tenuta separata e successiva.

Canone per studio con utenti inclusi e un volume di elaborazione chiaro; consumo extra accettato esplicitamente, un tetto di spesa e visibilità delle pagine elaborate. Il piano non deve limitare lettura/esportazione dei dati alla cessazione senza una finestra contrattuale chiara.

Misura economica: `moduli/mese × minuti netti risparmiati ÷ 60 × costo orario effettivo`, sottraendo revisione, correzioni, preparazione modelli e gestione errori. Esempio puramente ipotetico: 80 moduli × 6 minuti ÷ 60 × 30 €/ora = 240 €/mese di tempo recuperato. Non è una previsione o un prezzo. Confrontare costo totale di suite + gestionale + AI/storage/supporto e non soltanto il nuovo canone.

Prima di fissare prezzi: 8–12 interviste (notaio e collaboratore), 3–5 studi pilota, almeno 30 modelli esterni e 100 lavorazioni rappresentative. Misurare tempo dalla ricezione all'output approvato, correzioni per campo, fallimenti per formato, riuso effettivo e disponibilità a pagare. Obiettivo di pilot proposto: riduzione mediana ≥30% del tempo netto sui flussi selezionati, nessuna uscita senza revisione nei casi incerti, esportazione e ripristino completi. Questi sono criteri di progetto, non risultati già ottenuti.

## Fondazione GCP e responsabilità

Repository GitHub per codice e distribuzione frontend; backend Cloud Run; Cloud SQL PostgreSQL per entità, revisioni e relazioni; Cloud Storage per documenti; coda per OCR/AI/export; Secret Manager; identità e ruoli verificati lato server. Nessun documento cliente nel repository. Ambienti separati e regioni europee scelte per tutti i servizi effettivamente utilizzati.

GCP non significa automaticamente conformità né «zero retention». Le condizioni Google distinguono addestramento, logging per abusi, cache e grounding [5]. La residenza dipende da modello, endpoint e funzione [6]. Disabilitare ricerca web sui documenti riservati per default; verificare termini, conservazione e disponibilità regionale prima di scegliere modelli. Non copiare lo slogan «Zero-Data» di Gromit.

Il disegno deve supportare minimizzazione, controllo degli accessi, retention, DPA e gestione dei subfornitori; base giuridica, obblighi professionali e necessità di DPIA richiedono valutazione sul servizio reale. L'art. 13 della legge 132/2025 prevede l'uso strumentale dell'AI nelle professioni intellettuali e informazione al destinatario della prestazione [7]. La suite deve rendere possibile tracciare l'uso AI e lasciare il controllo al professionista. Non basta una casella grafica per dimostrare conformità.

## Perimetro della prima pagina

Interfaccia nello stile originale con 12 moduli, panoramica iniziale veritiera e un caso dimostrativo esplicitamente attivabile. PDF manuali utilizzabili localmente nelle due modalità; archivio di lavoro, osservazioni con fonti, revisione ed export locale; assistente con ricerca locale esplicita, senza simulare un modello cloud collegato. Moduli futuri presentati con stato chiaro. Nessun accesso, collegamento al gestionale o servizio remoto dichiarato attivo in assenza di implementazione.

## Fonti

1. [Wolters Kluwer, NotaioNext Expert AI, 2 luglio 2026](https://www.wolterskluwer.com/it-it/expert-insights/domenico-digregorio-intelligenza-artificiale-al-servizio-dello-studio-notarile).
2. [Notartel, FlaminiaDesk: funzioni e condizioni pubbliche](https://neonotai.notartel.it/flaminia-desk/).
3. [Wolters Kluwer, moduli Suite Notaro](https://www.wolterskluwer.com/it-it/solutions/suite-notaro/moduli).
4. [DataWeb, servizi AI per notai](https://www.dataweb-srl.it/servizi-ai-per-notai).
5. [Google Cloud, Vertex AI e zero data retention](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/vertex-ai-zero-data-retention).
6. [Google Cloud, servizi con residenza dei dati](https://cloud.google.com/terms/data-residency).
7. [Gazzetta Ufficiale, legge 23 settembre 2025 n. 132](https://www.gazzettaufficiale.it/atto/vediMenuHTML?atto.codiceRedazionale=25G00143&atto.dataPubblicazioneGazzetta=2025-09-25&tipoSerie=serie_generale&tipoVigenza=originario).
8. [Garante Privacy, principi del trattamento](https://www.garanteprivacy.it/trattamento-dei-dati).
