import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-blue prose-sm sm:prose-base lg:prose-lg text-gray-700">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4">Termini di Servizio</h1>
          <p className="text-sm text-gray-500 mb-8 italic">Ultimo aggiornamento: 2 aprile 2026</p>

          <p>
            Benvenuto su <code>csd-station.it</code>. Questi Termini di Servizio ("Termini") regolano l'accesso e l'utilizzo del nostro sito web da parte tua e la fruizione dei servizi offerti da Carlo Galli (P.IVA 01630510525), operante come CSD Station (di seguito "noi", "nostro" o "CSD Station Italia"). Accedendo o utilizzando il nostro sito web, prenotando una consulenza o ingaggiando i nostri servizi professionali tramite la sottoscrizione di uno specifico Accordo di Servizio, accetti di essere vincolato da questi Termini. Se non accetti una qualsiasi parte di questi Termini, non ti è consentito accedere al sito web o usufruire dei nostri servizi.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Indice dei Nomi e delle Entità</h2>
          <p>Ai fini della rigorosa interpretazione contrattuale dei presenti Termini:</p>
          <ul>
            <li><strong>Carlo Galli (P.IVA 01630510525)</strong>: Sono i riferimenti legali e fiscali del professionista.</li>
            <li><strong>CSD Station Italia</strong>: È il brand e il portale web utilizzato dal Fornitore per la propria attività.</li>
            <li><strong>Automazione</strong>: Si riferisce a una singola routine o flusso di lavoro automatizzato sviluppato utilizzando Google Workspace Studio, che si integra con applicazioni di Google Workspace.</li>
            <li><strong>Asset</strong>: Si riferisce all'insieme completo di automazioni, fogli di calcolo collegati, configurazioni, dati e ambiente Google Workspace (es. account automazioni@dominio.com) fornito e implementato dal Fornitore per il Cliente, come soluzione integrata.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Servizi Offerti</h2>
          <p>
            CSD Station Italia è specializzata nella fornitura di servizi professionali di consulenza e sviluppo di soluzioni automatizzate basate principalmente sull'ecosistema Google Workspace Studio. Il nostro obiettivo è ottimizzare i processi e introdurre automazioni intelligenti per i nostri clienti.
          </p>
          <p>
            Il sito web <code>csd-station.it</code> funge principalmente da piattaforma informativa e di contatto per presentare le nostre capacità e facilitare la prenotazione di consulenze iniziali, focalizzate sulla creazione di automazioni e l'ottimizzazione tramite Google Workspace Studio.
          </p>
          <p>
            <strong>Nota bene:</strong> L'erogazione di servizi professionali di consulenza, sviluppo e implementazione di Asset è regolata da uno specifico <strong>Accordo di Servizio e Proposta Tecnica per Asset</strong> (di seguito "Accordo di Servizio"), sottoscritto tra le Parti. Tale Accordo di Servizio, che prevale sui presenti Termini generali per quanto riguarda le specifiche del progetto, include anche le disposizioni relative al trattamento dei dati personali (DPA) ai sensi del GDPR, ove applicabile.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Accettazione dei Servizi e Pagamento</h2>
          <ul>
            <li><strong>Processo di ingaggio:</strong> Dopo una consulenza iniziale, ti forniremo un preventivo o una proposta dettagliata (Accordo di Servizio) per i servizi richiesti. L'accettazione della proposta, il pagamento di un acconto o l'avvio della fase di lavoro costituirà la tua accettazione di questi Termini e delle condizioni specifiche incluse nell'Accordo di Servizio.</li>
            <li><strong>Pagamento:</strong> I termini di pagamento specifici (costi, scadenze, modalità) saranno dettagliati nell'Accordo di Servizio accettato. Salvo diversamente specificato, i pagamenti sono dovuti entro i termini indicati. In caso di ritardo nei pagamenti, ci riserviamo il diritto di sospendere i servizi.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Responsabilità del Cliente</h2>
          <p>
            Per l'erogazione dei servizi professionali, il Cliente si impegna a collaborare attivamente con il Fornitore, fornendo tutte le informazioni e gli accessi necessari come dettagliato nello specifico Accordo di Servizio.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Proprietà Intellettuale</h2>
          <ul>
            <li><strong>Contenuti del Sito:</strong> Tutti i contenuti presenti sul sito web sono di proprietà di Carlo Galli (P.IVA) o dei suoi fornitori e sono protetti dalle leggi sulla proprietà intellettuale.</li>
            <li><strong>Sviluppi di Servizio:</strong> Per quanto concerne lo sviluppo di Asset personalizzati, la proprietà intellettuale sarà trasferita al Cliente al momento dell'accettazione dell'Asset (collaudo/UAT) e del contestuale saldo integrale dei corrispettivi, come dettagliato nello specifico Accordo di Servizio. In caso di mancata accettazione o mancato pagamento, la proprietà intellettuale rimarrà in capo a CSD Station Italia.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Condotta dell'Utente</h2>
          <p>
            Accetti di utilizzare il sito web e i servizi solo per scopi leciti. Accetti di non:
          </p>
          <ul>
            <li>Utilizzare il sito web o i servizi per scopi illegali o non autorizzati.</li>
            <li>Tentare di decodificare, decompilare o disassemblare qualsiasi software che compone o fa parte delle soluzioni fornite, se non espressamente autorizzato nell'Accordo di Servizio.</li>
            <li><strong>Contatti B2B:</strong> Nelle comunicazioni professionali svolte dal Fornitore, ogni comunicazione include una chiara informativa sull'origine dei dati e un meccanismo di opposizione (Opt-out) tramite risposta diretta (es. "CANCELLAMI").</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. Riservatezza</h2>
          <p>
            Entrambe le Parti si impegnano a trattare le informazioni e i dati a cui avranno accesso con la massima riservatezza e diligenza, nel rispetto del segreto professionale e delle normative vigenti in materia di protezione dei dati personali, come ulteriormente dettagliato nell'Accordo di Servizio.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">7. Esclusione di Garanzie</h2>
          <p>
            Il sito web e i servizi sono forniti "così come sono", senza garanzie di alcun tipo, espresse o implicite, ad eccezione di quanto espressamente previsto negli specifici Accordo di Servizio sottoscritti.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">8. Garanzia sui Servizi e Manutenzione</h2>
          <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">8.1 Garanzia sui Difetti di Sviluppo:</h3>
          <p>
            CSD Station Italia garantisce che l'Asset sviluppato funzionerà conformemente alle specifiche concordate per un periodo di <strong>90 (novanta) giorni</strong> a partire dalla data di accettazione o consegna (come dettagliato nell'Accordo di Servizio). Durante tale periodo, ci impegniamo a riparare gratuitamente eventuali difetti intrinseci del codice.
          </p>

          <h3 className="text-lg font-bold text-gray-900 mt-6 mb-3">8.2 Servizi di Manutenzione e Supporto Post-Garanzia:</h3>
          <p>
            Al di fuori del Periodo di Garanzia, o per malfunzionamenti derivanti da modifiche esterne (aggiornamenti di piattaforme terze, modifiche del Cliente all'ambiente operativo), il supporto è condizionato alla sottoscrizione di uno specifico <strong>Accordo di Servizio di Manutenzione</strong> (MSA di manutenzione). In assenza di tale accordo, non è offerta alcuna garanzia sul continuo funzionamento dell'Asset.
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
            I presenti Termini rimarranno in vigore per tutta la durata dell'utilizzo del sito o, per i servizi professionali, fino al completamento delle attività e al saldo integrale dei pagamenti come specificato nell'Accordo di Servizio. Ciascuna parte può recedere per giusta causa con preavviso scritto.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">12. Legge Applicabile e Foro Competente</h2>
          <p>
            Questi Termini sono regolati dalle leggi della Repubblica Italiana. Per qualsiasi controversia sarà competente esclusivamente il Tribunale di Siena.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">13. Clausole Vessatorie</h2>
          <p>
            Per i contratti professionali sottoscritti offline, il Cliente approva specificamente, ai sensi degli Artt. 1341 e 1342 c.c., le clausole vessatorie richiamate nello specifico Accordo di Servizio.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">14. Privacy e Trattamento Dati</h2>
          <p>
            Il trattamento dei dati personali è regolato dalla nostra <a href="/privacy-policy" className="text-blue-600 underline">Privacy Policy</a>. Per i servizi professionali che comportano il trattamento di dati personali, il ruolo di Responsabile del Trattamento (Data Processor) e le relative condizioni sono dettagliati nello specifico Accordo di Servizio sottoscritto tra le Parti.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">15. Intero Accordo</h2>
          <p>
            Questi Termini, unitamente all'Accordo di Servizio (ove applicabile) e alla Privacy Policy, costituiscono l'intero accordo tra le Parti e sostituiscono ogni precedente intesa scritta o orale.
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
