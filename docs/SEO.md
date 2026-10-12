# SEO e lettura da parte degli assistenti AI

Intervento del 12 ottobre 2026. Modifiche al sito pubblico e alla build statica; nessuna modifica a Firebase, redirect NFC dei clienti, statistiche o invio dei report.

## Pagine e intenti di ricerca

| URL canonico | Contenuti e pubblico |
| --- | --- |
| `https://csd-station.it/` | Consulenza AI e informatica per PMI e professionisti; automazioni, strumenti Google, hardware, nuove tecnologie e inventario NFC. |
| `https://csd-station.it/card-nfc/` | Card, plate adesive e stand NFC con QR per recensioni Google Maps; formati, prezzi, configurazione e significato dei report. |
| `https://csd-station.it/training-ai/` | Training AI aziendale per PMI e team; programma su misura, collegamenti alle applicazioni, utilizzo consapevole, remoto o presenza. |

Questi sono indirizzi pronti nella build, non una conferma di pubblicazione. Il titolo della scheda rimane **CSD Station** per scelta del proprietario. Descrizioni, anteprime social e nomi delle pagine nei dati strutturati sono specifici per servizio. Google decide autonomamente titolo e descrizione effettivamente mostrati nei risultati: i metadati social non sostituiscono un titolo HTML descrittivo.

I testi esplicitano i servizi realmente offerti, senza creare pagine per ogni variante di parola chiave, risultati cliente inventati, recensioni o qualifiche inesistenti. Non è stata aggiunta un'offerta specifica per la pubblica amministrazione. Le risposte informative sono condivise fra desktop e mobile; sul telefono restano dentro le tre sezioni e nelle tendine.

## Come funziona

`npm run build` esegue Vite e il rendering statico degli stessi componenti React usati dal sito. Genera pagine HTML complete per i servizi e le informative, con contenuto disponibile prima del JavaScript. Il browser riattiva le interazioni tramite hydration. Non serve un nuovo server e non sono state aggiunte dipendenze.

Ogni pagina riceve description, canonical, Open Graph, Twitter e JSON-LD. Organization, Person, WebSite, WebPage e Service descrivono entità e relazioni effettive; i breadcrumb distinguono NFC e training. Nessuna promessa di rich result e nessuna valutazione inventata. Le immagini social usano URL assoluti.

`src/seo/routes.ts` centralizza gli indirizzi. I link condivisi `/?mode=nfc`, `/?mode=training` e `/?mode=automazioni` continuano a funzionare, conservando ancore e parametri di provenienza. GitHub Pages non permette redirect HTTP basati sulla query: per questi vecchi link il passaggio avviene nel browser. Condividere i nuovi indirizzi per ottenere anche anteprime social corrette. Le pagine nuove sono file reali; gli indirizzi sconosciuti ricevono il documento 404 di GitHub Pages, senza il precedente rimbalzo universale alla homepage.

La sitemap è generata dai percorsi canonici senza date di modifica fittizie e indicata in robots.txt. I crawler pubblici restano autorizzati come in precedenza.

## Formati testuali per AI

- `public/llms.txt`: indice breve dei servizi e collegamenti alle versioni testuali.
- `/index.md`, `/card-nfc/index.md`, `/training-ai/index.md`: trascrizioni informative prodotte dall'HTML reale a ogni build.
- `/llms-full.txt`: raccolta generata delle tre trascrizioni. Non modificare una copia manuale: il vecchio file obsoleto in public è stato rimosso.
- Nei metadati, `rel="alternate" type="text/markdown"` e `rel="describedby"` permettono di trovare queste risorse.

I testi includono le risposte nelle tendine. Escludono decorazioni, pulsanti e stati interattivi non attivi; non sono un archivio di ogni frame delle demo. Nessun contenuto viene servito appositamente soltanto ai bot. I file sono generati in dist e quindi disponibili dopo la build, non nel semplice server di sviluppo Vite.

`llms.txt` è una proposta per i sistemi che scelgono di usarla, non una garanzia di citazione. Google dichiara di non usarlo per migliorare la visibilità, neppure nelle proprie funzioni generative: per Google il lavoro determinante resta sulle pagine HTML e sulla qualità dei contenuti.

## Controlli e pubblicazione

La build esegue anche `npm run check:seo`. Verifica HTML non vuoto, un solo H1, canonical corretti, descrizioni distinte, JSON-LD valido, immagini presenti, link ai tre servizi, destinazioni della sitemap, file Markdown, pulizia dei contenuti AI obsoleti, gestione 404 e compatibilità dei vecchi link. Non sostituisce una verifica nel browser o una verifica dell'indicizzazione.

Dopo il deploy con il workflow GitHub esistente:

1. Verificare la proprietà `csd-station.it` in Google Search Console, se non è già verificata.
2. Inviare `https://csd-station.it/sitemap.xml` e ispezionare le tre pagine canoniche. Controllare che Google riceva 200, possa leggere il contenuto e scelga il canonical previsto.
3. Controllare le impostazioni per le funzioni generative di Google nella Search Console, secondo la documentazione corrente.
4. Monitorare pagine indicizzate, query, impressioni, clic e Core Web Vitals. Nessun punteggio Lighthouse o miglioramento di posizione è stato misurato in questo intervento.
5. Come lavoro editoriale successivo, pubblicare casi reali autorizzati con problema, soluzione e risultati misurati. Aggiornare eventuale Google Business Profile solo con dati verificati dell'attività.

Push, deploy e invio della sitemap a Search Console non sono stati effettuati. Il posizionamento non è garantito; richiede anche rilevanza, reputazione e risultati osservati nel tempo.

## Fonti ufficiali consultate

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), aggiornata il 10 dicembre 2025: contenuti utili, link, titoli e descrizioni; evitare ripetizioni artificiali.
- [Google: optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), aggiornata il 10 luglio 2026: fondamenta SEO, accessibilità tecnica e limiti delle tecniche presentate come GEO.
- [Google: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics): rendering preventivo, canonical e corretta gestione degli errori.
- [Google: build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
- [Google: Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization).
- [Proposta llms.txt v2](https://llmstxt.org/), modificata il 10 agosto 2026: indice Markdown e collegamenti alle versioni testuali delle pagine.
