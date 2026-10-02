import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-blue prose-sm sm:prose-base lg:prose-lg text-gray-700">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8 italic">Ultimo aggiornamento: 2 ottobre 2026</p>

          <p>
            Benvenuto su <code>csd-station.it</code>. La tua privacy è di fondamentale importanza per noi. Questa Privacy Policy descrive in modo chiaro e trasparente come Carlo Galli (P.IVA 01630510525), operante come CSD Station (di seguito "noi", "nostro" o "CSD Station Italia"), raccoglie, utilizza e protegge i dati personali in conformità con il Regolamento Generale sulla Protezione dei Dati (GDPR - Regolamento UE 2016/679).
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Titolare del Trattamento dei Dati</h2>
          <p>Il Titolare del Trattamento dei dati personali per le attività e i servizi offerti tramite <code>csd-station.it</code> è:</p>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 not-prose text-sm mb-6">
            <p><strong>Carlo Galli (P.IVA 01630510525)</strong></p>
            <p>Sede: Via Francesco Campana 45, Colle di Val d'Elsa, 53034 (SI), Italia</p>
            <p>Email: <a href="mailto:carlo@csd-station.it" className="text-blue-600 font-medium">carlo@csd-station.it</a></p>
            <p>Telefono: +39 351 862 8203</p>
          </div>
          <p>
            Tutte le attività di CSD Station hanno sede e operano esclusivamente in Italia.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Infrastruttura Tecnica e Servizi Cloud (Google Workspace)</h2>
          <p>
            Per la gestione dei contatti, delle comunicazioni, delle prenotazioni e dell'organizzazione del lavoro, ci affidiamo all'infrastruttura sicura di <strong>Google Workspace</strong> (Gmail, Google Calendar, Google Forms, Google Sheets, Google Cloud Platform). Google agisce come fornitore tecnologico e responsabile del trattamento (o sub-responsabile) in piena aderenza al GDPR, grazie al Cloud Data Processing Addendum (CDPA) e alle misure di sicurezza certificate adottate a livello globale ed europeo.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Servizi di Automazione AI e Ruolo Privacy</h2>
          <p>
            In relazione alla progettazione e fornitura di automazioni personalizzate e soluzioni di intelligenza artificiale per i nostri Clienti:
          </p>
          <ul>
            <li>
              <strong>Sviluppo, test e consegna:</strong> Carlo Galli crea l'architettura del sistema di automazione, la configura nell'ambiente concordato, esegue i test di funzionamento e la fa partire.
            </li>
            <li>
              <strong>Nessun trattamento dati post-consegna:</strong> Una volta collaudata e consegnata la soluzione, il sistema viene affidato interamente al Cliente. CSD Station <strong>non conserva accessi, non visualizza e non tratta i dati personali</strong> che transitano o vengono elaborati dall'automazione nel normale esercizio dell'attività del Cliente. Di conseguenza, CSD Station non agisce come responsabile continuativo del trattamento per i dati operativi del Cliente.
            </li>
            <li>
              <strong>Titolare e Sub-responsabile:</strong> Il Cliente agisce come unico ed esclusivo <strong>Titolare del Trattamento</strong> per i dati gestiti tramite la propria automazione. L'infrastruttura cloud sottostante (es. Google Workspace, Google Cloud, Apps Script) fa capo a <strong>Google in qualità di fornitore dell'infrastruttura / sub-responsabile</strong>, secondo i termini di servizio e le condizioni privacy concordate direttamente con Google o attive nell'ambiente di lavoro.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Dati Personali Raccolti tramite il Sito</h2>
          <p>Raccogliamo esclusivamente i dati necessari per gestire le relazioni con utenti e clienti:</p>
          <ul>
            <li><strong>Dati per la prenotazione:</strong> Quando prenoti una consulenza tramite il modulo integrato basato su Google Calendar, raccogliamo nome, cognome, indirizzo email ed eventuali dettagli inseriti nel campo note.</li>
            <li><strong>Dati di contatto e richieste commerciali:</strong> Dati forniti volontariamente tramite email (<code>carlo@csd-station.it</code>) o moduli di contatto per richiedere preventivi, informazioni o dettagli su progetti di automazione.</li>
            <li><strong>Dati di contatto professionale B2B (fonti pubbliche):</strong> Dati pubblici di contatto (es. da Google Maps o registri pubblici di imprese) utilizzati per l'invio mirato di comunicazioni e proposte di consulenza a professionisti e aziende, garantendo sempre informativa al primo contatto e possibilità di disiscrizione immediata (opt-out).</li>
            <li><strong>Dati tecnici e cookie:</strong> Dati di navigazione strettamente necessari al funzionamento del sito o relativi a servizi terzi integrati. Per maggiori informazioni, consulta la nostra Cookie Policy.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Finalità del Trattamento dei Dati</h2>
          <ul>
            <li><strong>Gestione delle prenotazioni e consulenze:</strong> Per confermare e svolgere le sessioni di consulenza richieste.</li>
            <li><strong>Comunicazioni e supporto:</strong> Per rispondere alle richieste di contatto, fornire assistenza e gestire i preventivi via email.</li>
            <li><strong>Sviluppo ed erogazione dei servizi:</strong> Per analizzare i requisiti tecnici e sviluppare le soluzioni di automazione richieste dal Cliente.</li>
            <li><strong>Adempimenti amministrativi e contabili:</strong> Per la corretta fatturazione e gli adempimenti previsti dalla legge italiana.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. Basi Giuridiche del Trattamento</h2>
          <ul>
            <li><strong>Esecuzione di misure precontrattuali o contrattuali (Art. 6.1.b GDPR):</strong> Per la gestione delle richieste, appuntamenti e fornitura dei servizi concordati.</li>
            <li><strong>Legittimo interesse (Art. 6.1.f GDPR):</strong> Per le comunicazioni promozionali B2B personalizzate dirette ad aziende e professionisti (con diritto di opt-out immediato) e per garantire la sicurezza del sito.</li>
            <li><strong>Obbligo di legge (Art. 6.1.c GDPR):</strong> Per obblighi fiscali, contabili e normativi vigenti in Italia.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">7. Destinatari dei Dati</h2>
          <p>I dati personali raccolti tramite il sito non vengono diffusi o venduti a terzi. Possono essere comunicati a:</p>
          <ul>
            <li><strong>Google LLC / Google Ireland Ltd:</strong> In qualità di fornitore dell'infrastruttura Google Workspace e dei servizi cloud utilizzati per la gestione operativa.</li>
            <li><strong>Consulenti fiscali o legali:</strong> Limitatamente agli adempimenti di contabilità e fatturazione previsti dalla legge italiana.</li>
            <li><strong>Autorità competenti:</strong> Ove espressamente richiesto da norme di legge o provvedimenti giudiziari.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">8. Trasferimento dei Dati</h2>
          <p>
            Le attività del Titolare si svolgono in Italia. I dati gestiti tramite i servizi cloud di Google Workspace sono trattati nel rispetto del Capo V del GDPR, mediante garanzie appropriate quali il Cloud Data Processing Addendum (CDPA), le Clausole Contrattuali Standard (SCCs) approvate dalla Commissione Europea e la conformità al Data Privacy Framework (DPF).
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">9. Conservazione dei Dati</h2>
          <p>
            I dati relativi alle comunicazioni e alle richieste vengono conservati per il tempo necessario a evadere la richiesta e gestire il rapporto professionale. I dati fiscali e di fatturazione sono conservati per 10 anni come stabilito dalla normativa italiana.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">10. Diritti dell'Interessato</h2>
          <p>
            In qualità di interessato, ai sensi degli Artt. 15-22 del GDPR, hai il diritto di richiedere l'accesso ai tuoi dati personali, la rettifica, la cancellazione, la limitazione del trattamento, l'opposizione al trattamento e la portabilità dei dati, nonché di revocare il consenso o proporre reclamo al Garante per la Protezione dei Dati Personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">garanteprivacy.it</a>).
          </p>
          <p>
            Per esercitare tali diritti, puoi scrivere all'indirizzo email <a href="mailto:carlo@csd-station.it" className="text-blue-600 font-medium">carlo@csd-station.it</a>.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">11. Modifiche alla Privacy Policy</h2>
          <p>
            Eventuali aggiornamenti alla presente informativa saranno pubblicati su questa pagina, con indicazione della data di revisione in alto.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">12. Cookie Policy</h2>
          <p>
            Per maggiori informazioni sui cookie utilizzati sul nostro sito, consulta la nostra <strong><a href="/cookie-policy" className="text-blue-600">Cookie Policy</a></strong>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
