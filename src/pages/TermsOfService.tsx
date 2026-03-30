import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-blue prose-sm sm:prose-base lg:prose-lg text-gray-700">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4">Termini di Servizio</h1>
          <p className="text-sm text-gray-500 mb-8 italic">Ultimo aggiornamento: 30 marzo 2026</p>

          <p>
            Benvenuto su <code>csd-station.it</code>. Questi Termini di Servizio ("Termini") regolano l'accesso e l'utilizzo del nostro sito web da parte tua e la fruizione dei servizi di consulenza e sviluppo di automazioni offerti da Carlo Galli (P.IVA 01630510525), operante come CSD Station (di seguito "noi", "nostro" o "CSD Station Italia"). Accedendo o utilizzando il nostro sito web, prenotando una consulenza o ingaggiando i nostri servizi, accetti di essere vincolato da questi Termini. Se non accetti una qualsiasi parte di questi Termini, non ti è consentito accedere al sito web o usufruire dei nostri servizi.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Indice dei Nomi e delle Entità</h2>
          <p>
            Ai fini della rigorosa interpretazione contrattuale dei presenti Termini e di tutti i documenti allegati:
          </p>
          <ul>
            <li><strong>Carlo Galli (P.IVA 01630510525)</strong>: Sono i riferimenti legali e fiscali del professionista.</li>
            <li><strong>CSD Station Italia</strong>: È l'entità operativa e il modo in cui il testo (o i contratti) può fare riferimento al professionista stesso (anche inteso come "noi" o "nostro").</li>
            <li><strong>CSD Station</strong>: È unicamente il nome del portale web e del brand associato.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Servizi Offerti</h2>
          <p>
            CSD Station Italia è specializzata nella fornitura di servizi professionali di consulenza e sviluppo di soluzioni automatizzate basate principalmente sull'ecosistema Google Workspace. Il nostro obiettivo è ottimizzare i processi e introdurre automazioni intelligenti per i nostri clienti.
          </p>
          <p>
            Il sito web <code>csd-station.it</code> funge principalmente da piattaforma informativa e di contatto per presentare le nostre capacità e facilitare la prenotazione di consulenze iniziali, focalizzate sulla creazione di automazioni e l'ottimizzazione tramite Google Workspace.
          </p>
          <p>
            <strong>Nota bene:</strong> L'erogazione di servizi di sviluppo e implementazione professionale è regolata da uno specifico <strong>Accordo di Servizio e Proposta Tecnica per Automazione</strong> (di seguito "Accordo di Servizio"), sottoscritto tra le Parti, che prevale sui presenti termini generali per quanto riguarda le specifiche del progetto.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Accettazione dei Servizi e Pagamento</h2>
          <ul>
            <li><strong>Processo di ingaggio:</strong> Dopo una consulenza iniziale, ti forniremo un preventivo o una proposta dettagliata (Accordo di Servizio) per i servizi richiesti. L'accettazione della proposta, il pagamento di un acconto o l'avvio della fase di lavoro costituirà la tua accettazione di questi Termini e delle condizioni specifiche incluse nell'Accordo di Servizio.</li>
            <li><strong>Pagamento:</strong> I termini di pagamento specifici (costi, scadenze, modalità) saranno dettagliati nell'Accordo di Servizio accettato. Salvo diversamente specificato, i pagamenti sono dovuti entro i termini indicati. In caso di ritardo nei pagamenti, ci riserviamo il diritto di sospendere i servizi.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Responsabilità del Cliente</h2>
          <p>Per la corretta erogazione dei servizi, il Cliente si impegna a:</p>
          <ul>
            <li>Fornire tutte le informazioni e gli accessi necessari (inclusa la creazione di un account dedicato all'automazione, se richiesto) in modo tempestivo e sicuro.</li>
            <li>Collaborare attivamente fornendo feedback e approvazioni durante la fase di collaudo (UAT - User Acceptance Test).</li>
            <li>Assicurarsi di avere i diritti e le licenze necessarie per qualsiasi dato o servizio che ci venga fornito per l'integrazione.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Proprietà Intellettuale</h2>
          <ul>
            <li><strong>Contenuti del Sito:</strong> Tutti i contenuti presenti sul sito web sono di proprietà di Carlo Galli (P.IVA) o dei suoi fornitori e sono protetti dalle leggi sulla proprietà intellettuale.</li>
            <li><strong>Sviluppi di Servizio:</strong> Per quanto concerne lo sviluppo di automazioni personalizzate, la proprietà intellettuale sarà trasferita al Cliente al momento dell'**accettazione dell'Automazione** (collaudo/UAT) e del contestuale saldo integrale dei corrispettivi, come dettagliato nello specifico **Accordo di Servizio**. In caso di mancata accettazione o mancato pagamento, la proprietà intellettuale rimarrà in capo a CSD Station Italia.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Condotta dell'Utente</h2>
          <p>
            Accetti di utilizzare il sito web e i servizi solo per scopi leciti. Accetti di non:
          </p>
          <ul>
            <li>Utilizzare il sito web o i servizi per scopi illegali o non autorizzati.</li>
            <li>Tentare di decodificare, decompilare o disassemblare qualsiasi software che compone o fa parte delle soluzioni fornite, se non espressamente autorizzato nell'Accordo di Servizio.</li>
            <li><strong>Contatti B2B:</strong> Nelle comunicazioni professionali svolte dal Titolare, ogni comunicazione include una chiara informativa sull'origine dei dati e un meccanismo di opposizione (Opt-out) tramite risposta diretta (es. "CANCELLAMI").</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. Riservatezza</h2>
          <p>
            Entrambe le Parti si impegnano a trattare le informazioni e i dati a cui avranno accesso con la massima riservatezza e diligenza, nel rispetto del segreto professionale e delle normative vigenti in materia di protezione dei dati personali.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">7. Esclusione di Garanzie</h2>
          <p>
            Il sito web e i servizi sono forniti "così come sono", senza garanzie di alcun tipo, espresse o implicite, ad eccezione di quanto espressamente previsto nella sezione seguente e negli specifici contratti sottoscritti (Accordo di Servizio e MSA di manutenzione).
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">8. Garanzia sui Servizi e Manutenzione</h2>
          <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">8.1 Garanzia sui Difetti di Sviluppo:</h3>
          <p>
            CSD Station Italia garantisce che le automazioni sviluppate funzioneranno conformemente alle specifiche concordate per un periodo di <strong>90 (novanta) giorni</strong> a partire dalla data di accettazione o consegna (come dettagliato nell'Accordo di Servizio). Durante tale periodo, ci impegniamo a riparare gratuitamente eventuali difetti intrinseci del codice.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">8.2 Servizi di Manutenzione e Supporto Post-Garanzia:</h3>
          <p>
            Al di fuori del Periodo di Garanzia, o per malfunzionamenti derivanti da modifiche esterne (aggiornamenti di piattaforme terze, modifiche del Cliente all'ambiente operativo), il supporto è condizionato alla sottoscrizione di un <strong>accordo di servizio di manutenzione specifico</strong> (MSA di manutenzione). In assenza di tale accordo, non è offerta alcuna garanzia sul continuo funzionamento dell'automazione.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">9. Limitazione di Responsabilità</h2>
          <p>
            Nella misura massima consentita dalla legge, Carlo Galli (P.IVA) non sarà responsabile per danni indiretti, incidentali o consequenziali (inclusa la perdita di profitti o dati) derivanti dall'utilizzo o dall'incapacità di utilizzare le soluzioni fornite.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">10. Indennizzo</h2>
          <p>
            Accetti di indennizzare CSD Station Italia da qualsiasi reclamo o perdita derivante dalla tua violazione di questi Termini o dall'uso improprio dei servizi forniti.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">11. Durata e Recesso</h2>
          <p>
            I presenti Termini rimarranno in vigore per tutta la durata dell'utilizzo del sito o, per i servizi di sviluppo, fino al completamento delle attività e al saldo integrale dei pagamenti. Ciascuna parte può recedere per giusta causa con preavviso scritto.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">12. Legge Applicabile e Foro Competente</h2>
          <p>
            Questi Termini sono regolati dalle leggi della Repubblica Italiana. Per qualsiasi controversia sarà competente esclusivamente il Tribunale di Siena.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">13. Clausole Vessatorie</h2>
          <p>
            Per i contratti sottoscritti offline, il Cliente approva specificamente, ai sensi degli Artt. 1341 e 1342 c.c., le clausole relative all'esclusione di garanzie, limitazione di responsabilità e foro competente richiamate nell'Accordo di Servizio.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">14. Privacy e Trattamento Dati</h2>
          <p>
            Il trattamento dei dati personali è regolato dalla nostra <a href="/privacy-policy" className="text-blue-600 underline">Privacy Policy</a>. Nello sviluppo dei servizi, il Fornitore agirà in qualità di Responsabile del Trattamento (Data Processor) ai sensi del GDPR per i dati del Cliente a cui avrà accesso tramite l'account automazioni.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">15. Intero Accordo</h2>
          <p>
            Questi Termini, unitamente all'Accordo di Servizio e alla Privacy Policy, costituiscono l'intero accordo tra le Parti e sostituiscono ogni precedente intesa scritta o orale.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">16. Contattaci</h2>
          <p>
            Per qualsiasi domanda relativa a questi Termini di Servizio, contattaci all'indirizzo <a href="mailto:carlo@csd-station.it" className="text-blue-600">carlo@csd-station.it</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
