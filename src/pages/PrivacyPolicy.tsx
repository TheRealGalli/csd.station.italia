import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-blue prose-sm sm:prose-base lg:prose-lg text-gray-700">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8 italic">Ultimo aggiornamento: 18 marzo 2026</p>

          <p>
            Benvenuto su <code>csd-station.it</code>. La tua privacy è di fondamentale importanza per noi. Questa Privacy Policy descrive come Carlo Galli (P.IVA), operante come CSD Station (di seguito "noi", "nostro" o "CSD Station Italia"), raccoglie, utilizza e protegge i tuoi dati personali in conformità con il Regolamento Generale sulla Protezione dei Dati (GDPR) dell'Unione Europea.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Titolare del Trattamento dei Dati</h2>
          <p>Il Titolare del Trattamento dei tuoi dati personali per i servizi offerti tramite <code>csd-station.it</code> è:</p>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 not-prose text-sm mb-6">
            <p><strong>Carlo Galli (P.IVA 01630510525)</strong></p>
            <p>Indirizzo: Via Francesco Campana 45, Colle Val d'Elsa, 53034, Italia</p>
            <p>Email: <a href="mailto:carlo@csd-station.it" className="text-blue-600">carlo@csd-station.it</a> (per comunicazioni dirette relative al sito .it)</p>
            <p>Email: <a href="mailto:carlo@csd-station.com" className="text-blue-600">carlo@csd-station.com</a> (per comunicazioni e gestione operativa generale)</p>
            <p>Telefono: +393518628203</p>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Responsabile del Trattamento e Infrastruttura Tecnica</h2>
          <p>
            Per la gestione tecnica dell'infrastruttura di raccolta e archiviazione dei dati, CSD Station Italia si avvale della collaborazione di:
          </p>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 not-prose text-sm mb-6">
            <p><strong>CyberSpaceDokingStation LLC</strong></p>
            <p>Indirizzo: 7901 4th St N, Ste 300, St. Petersburg, FL 33702, USA</p>
            <p>Email: <a href="mailto:carlo@csd-station.com" className="text-blue-600">carlo@csd-station.com</a></p>
          </div>
          <p>
            CyberSpaceDokingStation LLC agisce in qualità di Responsabile del Trattamento per conto di Carlo Galli (P.IVA), fornendo l'infrastruttura tecnica di Google Workspace (Google Calendar, Gmail, Google Forms, Google Sheets, Google Cloud) attraverso il dominio <code>csd-station.com</code>. Questo garantisce che, sebbene i dati siano processati e stoccati principalmente tramite l'account Google Workspace associato alla LLC americana, ciò avvenga sotto le direttive e per conto di Carlo Galli (P.IVA) e in piena conformità con il GDPR, come dettagliato nella sezione 5.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Dati Personali Raccolti</h2>
          <p>Raccogliamo i seguenti tipi di dati personali:</p>
          <ul>
            <li><strong>Dati forniti volontariamente dall'utente per la prenotazione:</strong> Quando prenoti una consulenza gratuita tramite il modulo di prenotazione basato su Google Calendar, che è integrato o linkato dal nostro sito (<code>csd-station.it</code>), ma gestito tramite l'infrastruttura Google Workspace di <code>csd-station.com</code> (CyberSpaceDokingStation LLC), raccogliamo il tuo nome, cognome, indirizzo email e qualsiasi altra informazione che scegli di fornire nel campo note o richiesta.</li>
            <li><strong>Dati raccolti tramite comunicazioni successive:</strong> Dopo la prenotazione, potremmo raccogliere ulteriori dati personali tramite comunicazioni via email (utilizzando sia <code>carlo@csd-station.it</code> che <code>carlo@csd-station.com</code> su Gmail), moduli Google (Google Forms) o fogli di calcolo (Google Sheets) per la gestione delle consulenze, la profilazione delle esigenze e l'erogazione dei nostri servizi. Questi dati possono includere informazioni relative alle tue esigenze professionali, dettagli del progetto e altri dati pertinenti alla nostra collaborazione.</li>
            <li><strong>Dati di navigazione e cookie:</strong> Anche se il nostro sito è statico, l'integrazione di servizi di terze parti come Google Calendar e l'eventuale utilizzo di strumenti di analisi (se attivati) possono comportare la raccolta di dati di navigazione e l'installazione di cookie sul tuo dispositivo. Per maggiori dettagli, consulta la nostra <strong>Cookie Policy</strong>.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Finalità del Trattamento dei Dati</h2>
          <p>Trattiamo i tuoi dati personali per le seguenti finalità:</p>
          <ul>
            <li><strong>Gestione delle prenotazioni:</strong> Per gestire e confermare le tue prenotazioni di consulenza gratuita, anche se la prenotazione avviene tramite l'infrastruttura di <code>csd-station.com</code>.</li>
            <li><strong>Comunicazioni e assistenza:</strong> Per contattarti in merito alle tue prenotazioni, rispondere alle tue richieste e fornirti assistenza, utilizzando le email <code>carlo@csd-station.it</code> e <code>carlo@csd-station.com</code>.</li>
            <li><strong>Erogazione dei servizi:</strong> Per comprendere le tue esigenze e fornirti i servizi richiesti, anche attraverso l'utilizzo di strumenti e funzionalità di Google Workspace (gestiti tramite <code>csd-station.com</code>), inclusi form, analisi di dati e, se del caso, funzionalità di intelligenza artificiale per ottimizzare l'offerta.</li>
            <li><strong>Adempimento di obblighi legali:</strong> Per adempiere a qualsiasi obbligo legale o regolamentare applicabile alla nostra attività italiana.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Base Giuridica del Trattamento</h2>
          <p>Il trattamento dei tuoi dati personali si basa sulle seguenti basi giuridiche:</p>
          <ul>
            <li><strong>Esecuzione di misure precontrattuali o contrattuali:</strong> Il trattamento è necessario per dare seguito alla tua richiesta di prenotazione e per fornirti i servizi richiesti (Art. 6, par. 1, lett. b) GDPR).</li>
            <li><strong>Consenso:</strong> Per l'installazione di cookie non essenziali e, in alcuni casi, per specifiche finalità di marketing o profilazione, richiederemo il tuo consenso esplicito (Art. 6, par. 1, lett. a) GDPR).</li>
            <li><strong>Interesse legittimo:</strong> Il trattamento è necessario per il perseguimento del nostro legittimo interesse a gestire e migliorare i nostri servizi, a prevenire frodi e a garantire la sicurezza delle nostre operazioni, sempre nel rispetto dei tuoi diritti e libertà fondamentali (Art. 6, par. 1, lett. f) GDPR).</li>
            <li><strong>Obbligo legale:</strong> Il trattamento è necessario per adempiere a un obbligo legale al quale siamo soggetti (Art. 6, par. 1, lett. c) GDPR).</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. Modalità del Trattamento e Sicurezza dei Dati</h2>
          <p>
            Il trattamento dei dati personali avviene principalmente tramite strumenti informatici e telematici. Per tutte le operazioni di raccolta, archiviazione ed elaborazione dei dati, ci affidiamo interamente ai servizi di Google Workspace, gestiti attraverso l'account di CyberSpaceDokingStation LLC (<code>csd-station.com</code>).
          </p>
          <p>
            Google, in qualità di nostro Responsabile del Trattamento (e sub-Responsabile per CyberSpaceDokingStation LLC), si impegna a garantire la conformità al GDPR e ha adottato misure tecniche e organizzative adeguate per proteggere i tuoi dati. Carlo Galli (P.IVA) ha stipulato un accordo di trattamento dati con CyberSpaceDokingStation LLC, e quest'ultima ha accettato il Cloud Data Processing Addendum (CDPA) di Google, che include le Clausole Contrattuali Standard (SCCs) approvate dall'UE, garantendo un adeguato livello di protezione anche in caso di trasferimenti di dati al di fuori dell'Unione Europea. Google aderisce inoltre all'EU-U.S. Data Privacy Framework (DPF).
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">7. Destinatari dei Dati</h2>
          <p>I tuoi dati personali potranno essere comunicati a:</p>
          <ul>
            <li><strong>CyberSpaceDokingStation LLC:</strong> In qualità di Responsabile del Trattamento che fornisce l'infrastruttura Google Workspace.</li>
            <li><strong>Google LLC:</strong> In qualità di fornitore dei servizi Google Workspace (Google Calendar, Gmail, Google Forms, Google Sheets, Google Cloud) e nostro sub-Responsabile del Trattamento.</li>
            <li><strong>Collaboratori di Carlo Galli (P.IVA) e CyberSpaceDokingStation LLC:</strong> Autorizzati al trattamento dei dati per le finalità sopra indicate.</li>
            <li><strong>Autorità competenti:</strong> Ove richiesto da obblighi legali o per far valere un diritto in sede giudiziaria.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">8. Trasferimento Dati Extra-UE</h2>
          <p>
            I tuoi dati personali raccolti tramite <code>csd-station.it</code> saranno trasferiti al di fuori dell'Unione Europea, in particolare verso gli Stati Uniti, dove ha sede la CyberSpaceDokingStation LLC e dove sono localizzati alcuni dei server di Google. Tale trasferimento è legittimato dall'adozione del Cloud Data Processing Addendum (CDPA) di Google da parte di CyberSpaceDokingStation LLC, che incorpora le Clausole Contrattuali Standard (SCCs) approvate dalla Commissione Europea, e dall'adesione di Google all'EU-U.S. Data Privacy Framework (DPF), garantendo un livello di protezione adeguato per i dati trasferiti.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">9. Periodo di Conservazione dei Dati</h2>
          <p>
            I tuoi dati personali saranno conservati per il tempo strettamente necessario al raggiungimento delle finalità per cui sono stati raccolti, o per il tempo richiesto dalla normativa applicabile. In particolare:
          </p>
          <ul>
            <li>I dati relativi alle prenotazioni e alle comunicazioni saranno conservati per la durata del rapporto contrattuale e per un periodo successivo necessario per adempiere agli obblighi legali, fiscali e contabili.</li>
            <li>I dati raccolti tramite cookie saranno conservati per il periodo indicato nella nostra <strong>Cookie Policy</strong>.</li>
          </ul>
          <p>Al termine del periodo di conservazione, i dati verranno cancellati o resi anonimi in modo irreversibile.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">10. Diritti dell'Interessato</h2>
          <p>In qualità di interessato, hai il diritto di esercitare i seguenti diritti ai sensi del GDPR:</p>
          <ul>
            <li><strong>Diritto di accesso:</strong> Ottenere la conferma che sia in corso un trattamento di dati personali che ti riguardano e, in tal caso, di ottenere l'accesso ai dati e a informazioni specifiche.</li>
            <li><strong>Diritto di rettifica:</strong> Ottenere la rettifica dei dati personali inesatti che ti riguardano e l'integrazione dei dati personali incompleti.</li>
            <li><strong>Diritto alla cancellazione (diritto all'oblio):</strong> Ottenere la cancellazione dei dati personali che ti riguardano senza ingiustificato ritardo.</li>
            <li><strong>Diritto di limitazione di trattamento:</strong> Ottenere la limitazione del trattamento quando ricorre una delle ipotesi previste dall'Art. 18 GDPR.</li>
            <li><strong>Diritto alla portabilità dei dati:</strong> Ricevere in un formato strutturato, di uso comune e leggibile da dispositivo automatico i dati personali che ti riguardano e/o richiederne la trasmissione ad un altro titolare del trattamento.</li>
            <li><strong>Diritto di opposizione:</strong> Opporsi in qualsiasi momento al trattamento dei dati personali che ti riguardano, compresa la profilazione.</li>
            <li><strong>Diritto di revocare il consenso:</strong> Revocare il consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento basata sul consenso prestato prima della revoca.</li>
            <li><strong>Diritto di proporre reclamo:</strong> Proporre reclamo all'Autorità di controllo competente (per l'Italia, il Garante per la protezione dei dati personali).</li>
          </ul>
          <p>Per esercitare i tuoi diritti, puoi contattarci all'indirizzo email <a href="mailto:carlo@csd-station.it" className="text-blue-600">carlo@csd-station.it</a> o <a href="mailto:carlo@csd-station.com" className="text-blue-600">carlo@csd-station.com</a>.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">11. Modifiche alla presente Privacy Policy</h2>
          <p>Ci riserviamo il diritto di modificare la presente Privacy Policy in qualsiasi momento. Ti invitiamo a consultare periodicamente questa pagina per essere sempre aggiornato sulle eventuali modifiche. La data dell'ultimo aggiornamento sarà indicata in cima alla pagina.</p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">12. Cookie Policy</h2>
          <p>Per informazioni dettagliate sull'uso dei cookie sul nostro sito, ti invitiamo a consultare la nostra specifica <strong><a href="/cookie-policy" className="text-blue-600">Cookie Policy</a></strong></p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
