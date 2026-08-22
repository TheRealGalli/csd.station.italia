import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const NfcTermsOfService = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-emerald prose-sm sm:prose-base lg:prose-lg text-gray-700">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4">
            Termini di Servizio — Card NFC Recensioni
          </h1>
          <p className="text-sm text-gray-500 mb-8 italic">
            Ultimo aggiornamento: 22 agosto 2026
          </p>

          <p>
            I presenti Termini di Servizio regolano l'acquisto e l'utilizzo dei dispositivi fisici <strong>Card NFC Recensioni Google</strong> e dei relativi servizi correlati forniti da Carlo Galli (P.IVA 01630510525), operante come CSD Station (di seguito "noi", "Fornitore" o "CSD Station Italia"). Effettuando un ordine per una o più Card NFC, il Cliente dichiara di aver letto, compreso ed accettato le presenti condizioni commerciali B2B.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Oggetto della Fornitura</h2>
          <p>
            La fornitura comprende l'acquisto una tantum di Card fisiche dotate di chip NFC programmato con link di reindirizzamento diretto alla scheda Google Business Profile del Cliente. Su espressa richiesta del Cliente, unitamente alla Card NFC acquistata, CSD Station fornirà a titolo gratuito il file grafico digitale del QR Code integrato ed abbinato al link di reindirizzamento.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Condizioni di Spedizione e Consegna</h2>
          <ul>
            <li><strong>Territorio di Spedizione:</strong> Le spedizioni vengono effettuate sull'intero territorio italiano.</li>
            <li><strong>Tempi di Consegna:</strong> I tempi di elaborazione e consegna stimati sono entro <strong>7 (sette) giorni lavorativi</strong> dalla data di conferma dell'ordine e ricezione dei dati di configurazione.</li>
            <li>
              <strong>Costi di Spedizione:</strong> 
              Per ordini di importo pari o superiore a <strong>€ 50,00</strong>, la spedizione è <strong>gratuita</strong>. Per ordini di importo inferiore a € 50,00, le spese di spedizione sono a carico dell'acquirente e vengono calcolate al momento dell'ordine/checkout.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Politica di Reso e Diritto di Recesso (Vendite B2B)</h2>
          <ul>
            <li>
              <strong>Disciplina Applicabile:</strong> Trattandosi esclusivamente di transazioni commerciali eseguite tra professionisti/aziende (B2B), non si applicano le disposizioni del D.Lgs. 206/2005 (Codice del Consumo) relative ai consumatori privati.
            </li>
            <li>
              <strong>Facoltà di Reso Commerciale:</strong> CSD Station concede comunque al Cliente B2B la facoltà convenzionale di effettuare il reso dei prodotti entro <strong>14 (quattordici) giorni solari</strong> dal ricevimento dell'hardware.
            </li>
            <li>
              <strong>Condizioni del Prodotto Reso:</strong> Il reso è accettato solo ed esclusivamente a condizione che la Card NFC sia totalmente integra, priva di danni fisici o graffi e custodita nel suo imballo originale.
            </li>
            <li>
              <strong>Spese di Restituzione:</strong> Le spese di spedizione per la restituzione del prodotto reso rimangono interamente a carico dell'acquirente.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Reportistica Analytics e Durata del Servizio ("Life of Product")</h2>
          <ul>
            <li>
              <strong>Invio Report Mensili:</strong> Con l'acquisto della Card NFC, CSD Station include l'invio automatizzato di report e metriche mensili anonime (es. conteggio tap totali, picchi d'affluenza) all'indirizzo email indicato dal Cliente in fase d'ordine.
            </li>
            <li>
              <strong>Cambio Indirizzo Email Report:</strong> Qualora il Cliente desideri modificare l'indirizzo email di destinazione dei report statistici, dovrà inviare una richiesta scritta a: <a href="mailto:carlo@csd-station.it" className="text-emerald-600 font-medium">carlo@csd-station.it</a>.
            </li>
            <li>
              <strong>Condizione "Life of Product":</strong> Il servizio di reportistica e l'infrastruttura software di reindirizzamento dinamico sono forniti a tempo indeterminato, subordinatamente alla durata di vita del prodotto software (<em>Life of Product</em>). In caso di futura deprecazione o dismissione del sistema software da parte del Fornitore, il servizio di analytics cesserà. In tale eventualità, l'hardware (Card NFC) rimarrà di piena proprietà del Cliente e potrà continuare ad essere utilizzato e/o riprogrammato in totale autonomia.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Garanzia sull'Hardware e Limitazioni di Responsabilità</h2>
          <p>
            CSD Station garantisce che la Card NFC è priva di difetti di fabbricazione al momento della consegna e che il chip NFC ed il QR Code sono correttamente funzionanti. Il Fornitore non risponde di malfunzionamenti causati da uso improprio, danneggiamenti fisici, esposizione a campi magnetici estremi o modifiche unilaterali apportate dal Cliente alla propria scheda Google Business Profile.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. Legge Applicabile e Foro Competente</h2>
          <p>
            I presenti Termini sono regolati dalle leggi della Repubblica Italiana. Per qualsiasi controversia derivante dall'interpretazione, esecuzione o risoluzione del presente contratto B2B sarà competente in via esclusiva il Tribunale di Siena.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NfcTermsOfService;
