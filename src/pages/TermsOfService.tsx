import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-blue prose-sm sm:prose-base lg:prose-lg text-gray-700">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4">Termini di Servizio</h1>
          <p className="text-sm text-gray-500 mb-8 italic">Ultimo aggiornamento: 23 marzo 2026</p>

          <p>
            Benvenuto su <code>csd-station.it</code>. Questi Termini di Servizio ("Termini") regolano l'accesso e l'utilizzo del nostro sito web da parte tua e la fruizione dei servizi di consulenza e sviluppo di automazioni offerti da Carlo Galli (P.IVA 01630510525), operante come CSD Station (di seguito "noi", "nostro" o "CSD Station Italia"). Accedendo o utilizzando il nostro sito web, prenotando una consulenza o ingaggiando i nostri servizi, accetti di essere vincolato da questi Termini. Se non accetti una qualsiasi parte di questi Termini, non ti è consentito accedere al sito web o usufruire dei nostri servizi.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Servizi Offerti</h2>
          <p>
            CSD Station Italia, operata da Carlo Galli (P.IVA 01630510525), è specializzata nella fornitura di servizi professionali di consulenza e sviluppo di soluzioni automatizzate basate principalmente sull'ecosistema Google Workspace. Il nostro obiettivo è ottimizzare i processi e introdurre automazioni intelligenti per i nostri clienti.
          </p>
          <p>
            Il sito web <code>csd-station.it</code> funge principalmente da piattaforma informativa e di contatto per presentare le nostre capacità e facilitare la prenotazione di consulenze iniziali, focalizzate sulla creazione di automazioni e l'ottimizzazione tramite Google Workspace. Il nostro approccio combina l'esperienza umana con l'analisi avanzata tramite intelligenza artificiale (Human-in-the-loop). CSD Station Italia utilizza tali strumenti per elaborare diagnosi preliminari e proposte tecniche basate su dati pubblici (es. Google Maps), garantendo sempre una revisione umana finale su ogni comunicazione inviata.
          </p>
          <p>
            I nostri servizi a pagamento includono, ma non sono limitati a:
          </p>
          <ul>
            <li><strong>Consulenza per Google Workspace e Automazione:</strong> Fornitura di expertise e raccomandazioni per l'implementazione e l'ottimizzazione di processi tramite Google Workspace, con particolare attenzione alle soluzioni di automazione e all'integrazione di intelligenza artificiale.</li>
            <li><strong>Sviluppo e Implementazione di Automazioni:</strong> Progettazione, creazione e implementazione di script, integrazioni e soluzioni automatizzate personalizzate principalmente all'ambiente Google Workspace del cliente (es. Google Sheets, Google Forms, Gmail, Google Calendar, Google Drive, Google Workspace Studio), inclusi, ove applicabile, strumenti basati su intelligenza artificiale.</li>
            <li><strong>Formazione e Supporto:</strong> Sessioni di formazione sull'utilizzo delle soluzioni implementate e supporto tecnico.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Accettazione dei Servizi e Pagamento</h2>
          <ul>
            <li><strong>Processo di ingaggio:</strong> Dopo una consulenza iniziale (gratuita), ti forniremo un preventivo o una proposta dettagliata per i servizi richiesti. L'accettazione della proposta, il pagamento di un acconto o l'avvio della fase di lavoro costituirà la tua accettazione di questi Termini di Servizio per la fornitura dei servizi specifici.</li>
            <li><strong>Pagamento:</strong> I termini di pagamento specifici (costi, scadenze, modalità) saranno dettagliati nella proposta o preventivo accettato. Salvo diversamente specificato, i pagamenti sono dovuti entro i termini indicati. In caso di ritardo nei pagamenti, ci riserviamo il diritto di sospendere i servizi.</li>
            <li><strong>Modalità di Pagamento:</strong> Accettiamo le modalità di pagamento indicate nella proposta. Potremmo utilizzare fornitori di servizi di pagamento di terze parti; l'utilizzo di tali servizi è soggetto ai termini e condizioni del fornitore terzo.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Responsabilità del Cliente</h2>
          <p>Per la corretta erogazione dei servizi, il Cliente si impegna a:</p>
          <ul>
            <li>Fornire tutte le informazioni e accessi necessari ai sistemi Google Workspace (o altri sistemi rilevanti) in modo tempestivo e sicuro.</li>
            <li>Collaborare attivamente fornendo feedback e approvazioni quando richiesto.</li>
            <li>Assicurarsi di avere i diritti e le licenze necessarie per qualsiasi dato, software o servizio che ci venga fornito per l'integrazione o l'automazione.</li>
            <li>Mantenere la riservatezza delle credenziali di accesso e delle informazioni sensibili fornite.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Proprietà Intellettuale</h2>
          <ul>
            <li><strong>Contenuti del Sito:</strong> Tutti i contenuti presenti sul sito web, inclusi, a titolo esemplificativo ma non esaustivo, testi, grafica, loghi, icone, immagini, clip audio, download digitali, compilazioni di dati e software, sono di proprietà di Carlo Galli (P.IVA) o dei suoi fornitori di contenuti e sono protetti dalle leggi italiane e internazionali sul copyright, sui marchi e altre leggi sulla proprietà intellettuale.</li>
            <li><strong>Sviluppi di Servizio:</strong> Salvo diverso accordo scritto nella proposta di servizio, la proprietà intellettuale di qualsiasi automazione, script, integrazione o soluzione personalizzata sviluppata da CSD Station Italia per il Cliente sarà trasferita al Cliente al momento del completo pagamento dei servizi correlati. CSD Station Italia si riserva il diritto di utilizzare le conoscenze generali, le tecniche e le esperienze acquisite durante lo sviluppo per altri clienti, purché non violi la riservatezza delle informazioni specifiche del Cliente.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Condotta dell'Utente</h2>
          <p>
            Accetti di utilizzare il sito web e i servizi solo per scopi leciti e in modo da non violare i diritti di, o limitare o inibire l'uso e il godimento del sito web o dei servizi da parte di terzi. Accetti di non:
          </p>
          <ul>
            <li>Utilizzare il sito web o i servizi per scopi illegali o non autorizzati.</li>
            <li>Impegnarti in qualsiasi condotta che possa disabilitare, sovraccaricare, danneggiare o compromettere la funzionalità del sito web o dei servizi o interferire con l'uso da parte di terzi.</li>
            <li>Tentare di ottenere accesso non autorizzato a qualsiasi parte del sito web, account utente, sistemi informatici o reti connesse al sito web o ai servizi.</li>
            <li>Utilizzare robot, spider o altri dispositivi automatici, processi o mezzi per accedere al sito web per qualsiasi scopo, inclusa la copia o il monitoraggio di qualsiasi materiale sul sito web.</li>
            <li>Introdurre virus, trojan, worm, bombe logiche o altro materiale dannoso o tecnologicamente pericoloso.</li>
            <li>Tentare di decodificare, decompilare, disassemblare o decifrare qualsiasi software che compone o in qualsiasi modo fa parte del sito web o delle soluzioni fornite.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. Riservatezza</h2>
          <p>
            Durante la fornitura dei servizi, potremmo avere accesso a informazioni riservate e proprietarie del Cliente. Ci impegniamo a trattare tali informazioni con la massima riservatezza e a non divulgarle a terzi, se non strettamente necessario per l'erogazione dei servizi o se richiesto dalla legge. Il Cliente si impegna a trattare allo stesso modo qualsiasi informazione riservata di CSD Station Italia.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">7. Esclusione di Garanzie</h2>
          <p>
            Il sito web, i servizi e tutti i contenuti, informazioni e soluzioni fornite attraverso di essi sono forniti "così come sono" e "come disponibili", senza garanzie di alcun tipo, espresse o implicite, ad eccezione di quanto espressamente previsto nella sezione "Garanzia sui Servizi e Manutenzione". CSD Station Italia non garantisce che il sito web o i servizi saranno ininterrotti, privi di errori, sicuri o che le soluzioni implementate saranno prive di difetti o funzioneranno senza interruzioni in tutti gli ambienti. Non garantiamo l'accuratezza, la completezza o l'utilità di qualsiasi informazione sul sito web o fornita durante le consulenze.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">8. Garanzia sui Servizi e Manutenzione</h2>
          <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">8.1 Garanzia sui Difetti di Sviluppo:</h3>
          <p>
            CSD Station Italia garantisce che le automazioni sviluppate e consegnate funzioneranno conformemente alle specifiche concordate per un periodo di <strong>90 (novanta) giorni</strong> a partire dalla data di attivazione o consegna del servizio/automazione ("Periodo di Garanzia").
          </p>
          <p>
            Durante il Periodo di Garanzia, in caso di malfunzionamenti o errori attribuibili a difetti intrinseci del codice o del design sviluppato da CSD Station Italia, ci impegniamo a riparare gratuitamente l'automazione per ripristinarne il corretto funzionamento.
          </p>
          <p>
            Questa garanzia è valida a condizione che il Cliente non abbia apportato modifiche non autorizzate all'automazione o alle sue dipendenze essenziali e che l'ambiente operativo (es. configurazione di Google Workspace, struttura dei dati) sia rimasto invariato rispetto al momento della consegna. Il Cliente può segnalare problemi o richiedere assistenza entro il Periodo di Garanzia scrivendo a <a href="mailto:carlo@csd-station.it" className="text-blue-600">carlo@csd-station.it</a>.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">8.2 Servizi di Manutenzione e Aggiornamento:</h3>
          <p>
            Al di fuori del Periodo di Garanzia, o per interventi non coperti dalla garanzia (come malfunzionamenti dovuti a modifiche apportate dal Cliente all'ambiente operativo o alle sorgenti dati, aggiornamenti delle piattaforme esterne che influenzano l'automazione, o nuove funzionalità richieste), CSD Station Italia non offre alcuna garanzia implicita o esplicita sul continuo funzionamento delle automazioni <strong>in assenza di un accordo di servizio di manutenzione specifico</strong>.
          </p>
          <p>
            Qualora il Cliente sottoscriva un accordo di servizio di manutenzione con CSD Station Italia, il funzionamento e il supporto delle automazioni saranno regolati dalle condizioni stabilite in tale accordo.
          </p>
          <p>
            Si consiglia vivamente al Cliente di contattare il servizio clienti all'indirizzo <a href="mailto:carlo@csd-station.it" className="text-blue-600">carlo@csd-station.it</a> per discutere opzioni di rinnovo del supporto, piani di manutenzione, aggiornamenti o lo sviluppo di nuove versioni delle automazioni, che potrebbero essere necessarie a seguito di evoluzioni tecnologiche o modifiche dell'ambiente operativo. Tali servizi saranno quotati separatamente e forniti sulla base di un accordo di servizio specifico.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">9. Limitazione di Responsabilità</h2>
          <p>
            Nella misura massima consentita dalla legge applicabile, Carlo Galli (P.IVA), i suoi collaboratori, agenti, fornitori o licenziatari non saranno in alcun caso responsabili per danni diretti, indiretti, incidentali, speciali, consequenziali o punitivi, inclusi, a titolo esemplificativo ma non esaustivo, perdita di profitti, perdita di dati, perdita di avviamento, interruzione dell'attività o qualsiasi altro danno immateriale, derivanti dall'accesso, utilizzo o incapacità di accedere o utilizzare il sito web, i servizi o le soluzioni fornite, anche se Carlo Galli (P.IVA) è stato avvisato della possibilità di tali danni.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">10. Indennizzo</h2>
          <p>
            Accetti di indennizzare, difendere e tenere indenne Carlo Galli (P.IVA), i suoi collaboratori, agenti, fornitori e licenziatari da e contro qualsiasi reclamo, liability, danni, sentenze, premi, perdite, costi, spese o commissioni (incluse ragionevoli spese legali) derivanti dalla tua violazione di questi Termini di Servizio o dal tuo utilizzo improprio del sito web o dei servizi, incluso, ma non limitato a, l'utilizzo dei contenuti e dei servizi del sito web o delle soluzioni fornite diverso da quanto espressamente autorizzato in questi Termini.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">11. Durata e Recesso</h2>
          <ul>
            <li><strong>Durata:</strong> Questi Termini rimarranno in vigore per tutta la durata del tuo utilizzo del sito web e, per quanto riguarda i servizi, per la durata specificata nella proposta di servizio o fino al completamento dei servizi e al saldo dei pagamenti.</li>
            <li><strong>Recesso:</strong> Ciascuna parte può recedere dai servizi per giusta causa (es. violazione sostanziale dei Termini o della proposta di servizio) con un preavviso scritto. In caso di recesso anticipato da parte del Cliente senza giusta causa, tutti i pagamenti dovuti per i servizi già erogati o in corso di erogazione diventeranno immediatamente esigibili.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">12. Legge Applicabile e Foro Competente</h2>
          <p>
            Questi Termini sono regolati e interpretati in conformità con le leggi della Repubblica Italiana. Accetti che qualsiasi azione legale o procedimento derivante da o relativo a questi Termini, al sito web o ai servizi sarà avviato esclusivamente presso il Tribunale di Siena.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">13. Modifiche ai Termini di Servizio</h2>
          <p>
            Ci riserviamo il diritto, a nostra esclusiva discrezione, di modificare o sostituire questi Termini in qualsiasi momento. Se una revisione è materiale, faremo sforzi ragionevoli per fornire un preavviso di almeno 30 giorni prima che i nuovi termini entrino in vigore. Ciò che costituisce una modifica materiale sarà determinato a nostra esclusiva discrezione. Continuando ad accedere o utilizzare il nostro sito web o ad ingaggiare i nostri servizi dopo l'entrata in vigore di tali revisioni, accetti di essere vincolato dai termini modificati.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">14. Separabilità</h2>
          <p>
            Se una qualsiasi disposizione di questi Termini è ritenuta non valida o inapplicabile da un tribunale della giurisdizione competente, le restanti disposizioni di questi Termini rimarranno in pieno vigore ed effetto.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">15. Intero Accordo</h2>
          <p>
            Questi Termini di Servizio, unitamente alla proposta di servizio accettata e alla Privacy Policy, costituiscono l'intero accordo tra te e Carlo Galli (P.IVA) per quanto riguarda il sito web e i servizi, e sostituiscono tutti gli accordi e l'intese precedenti e contemporanee, scritte o orali, riguardanti tale oggetto.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">16. Comunicazioni Professionali e Opt-out</h2>
          <p>
            Le nostre comunicazioni di primo contatto sono effettuate nel rispetto delle normative vigenti sulle comunicazioni B2B. In ogni email è garantito il diritto di opposizione immediata tramite la dicitura "CANCELLAMI" o similari. L'utente può richiedere in qualsiasi momento la rimozione dei propri dati pubblici dai nostri database di analisi.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">17. Contattaci</h2>
          <p>
            Per qualsiasi domanda relativa a questi Termini di Servizio, ti preghiamo di contattarci all'indirizzo <a href="mailto:carlo@csd-station.it" className="text-blue-600">carlo@csd-station.it</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
