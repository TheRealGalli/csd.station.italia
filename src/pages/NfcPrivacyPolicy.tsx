import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const NfcPrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-emerald prose-sm sm:prose-base lg:prose-lg text-gray-700">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4">
            Privacy Policy — Card NFC Recensioni
          </h1>
          <p className="text-sm text-gray-500 mb-8 italic">
            Ultimo aggiornamento: 22 agosto 2026
          </p>

          <p>
            La presente informativa integra la Privacy Policy generale di <code>csd-station.it</code> e descrive in dettaglio le modalità di trattamento dei dati personali relative alla fornitura e all'utilizzo dei dispositivi fisici <strong>Card NFC Recensioni Google</strong> e dei relativi servizi correlati erogati da Carlo Galli (P.IVA 01630510525), operante come CSD Station (di seguito "noi", "Fornitore" o "CSD Station Italia").
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Titolare del Trattamento</h2>
          <p>Il Titolare del Trattamento dei dati personali è:</p>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 not-prose text-sm mb-6">
            <p><strong>Carlo Galli (P.IVA 01630510525)</strong></p>
            <p>Indirizzo: Via Francesco Campana 45, Colle Val d'Elsa, 53034, Italia</p>
            <p>Email: <a href="mailto:carlo@csd-station.it" className="text-emerald-600 font-medium">carlo@csd-station.it</a></p>
            <p>Telefono: +39 351 862 8203</p>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Trattamento Dati relativo alle Card NFC e Analytics</h2>
          <p>
            In relazione all'utilizzo delle Card NFC e dei relativi chip/QR Code di reindirizzamento dinamico:
          </p>
          <ul>
            <li>
              <strong>Assenza di Tracciamento dell'Utente Finale e delle Recensioni:</strong> 
              I dispositivi NFC e i QR Code reindirizzano direttamente l'utente finale verso la piattaforma terza designata dal Cliente (es. scheda ufficiale Google Business Profile su Google Maps). CSD Station <strong>non raccoglie, non ha accesso e non memorizza in alcun modo le recensioni, le valutazioni numeriche (stelle) o l'identità personale</strong> dei clienti finali che interagiscono con la card o completano una recensione.
            </li>
            <li>
              <strong>Statistiche ed Analytics Aggregate (No Profilazione):</strong> 
              I sistemi informatici di CSD Station elaborano esclusivamente metriche di utilizzo completamente anonime ed aggregate (a titolo esemplificativo: numero totale di aperture/tap, orari e giorni di maggior affluenza). Tali dati non consentono in alcun modo di identificare né di profilare gli utenti finali e vengono trattati al solo scopo di generare ed inviare periodicamente al Cliente i report statistici sul rendimento del dispositivo.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Dati dei Clienti B2B (Acquirenti delle Card)</h2>
          <p>
            Per la gestione degli ordini d'acquisto delle Card NFC e la fornitura del servizio di reportistica, raccogliamo i seguenti dati del Cliente professionale:
          </p>
          <ul>
            <li><strong>Dati di contatto e fatturazione B2B:</strong> Nome, cognome, ragione sociale, P.IVA/Codice Fiscale, indirizzo di spedizione, indirizzo email e recapito telefonico forniti al momento dell'ordine.</li>
            <li><strong>Dati per la configurazione del link:</strong> URL della scheda Google Business Profile o destinazione scelta per il reindirizzamento NFC/QR Code.</li>
            <li><strong>Email di destinazione Report:</strong> L'indirizzo email a cui inviare periodicamente i report sulle metriche aggregate.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Finalità e Basi Giuridiche del Trattamento</h2>
          <ul>
            <li>
              <strong>Esecuzione del Contratto (Art. 6.1.b GDPR):</strong> Trattamento dei dati per l'evasione dell'ordine d'acquisto, la personalizzazione ed il reindirizzamento del chip NFC, la spedizione dell'hardware e l'invio dei report statistici al Cliente.
            </li>
            <li>
              <strong>Adempimento di Obblighi Legali (Art. 6.1.c GDPR):</strong> Gestione della fatturazione e tenuta della contabilità in conformità con la normativa fiscale italiana.
            </li>
            <li>
              <strong>Legittimo Interesse (Art. 6.1.f GDPR):</strong> Ottimizzazione e sicurezza dell'infrastruttura di reindirizzamento e prevenzione di utilizzi illeciti dei dispositivi.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Conservazione dei Dati</h2>
          <p>
            I dati fiscali e contrattuali legati all'acquisto dell'hardware sono conservati per un periodo di 10 anni in ottemperanza agli obblighi di legge. I dati statistici aggregate vengono conservati per la durata di erogazione del servizio di reportistica al fine di permettere la comparazione storica delle metriche mensili.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. Diritti dell'Interessato</h2>
          <p>
            In qualità di Cliente interessato, puoi esercitare in qualsiasi momento i diritti previsti dagli Artt. 15-22 del GDPR (accesso, rettifica, cancellazione, limitazione, opposizione, portabilità) inviando una comunicazione scritta all'indirizzo email <a href="mailto:carlo@csd-station.it" className="text-emerald-600 font-medium">carlo@csd-station.it</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NfcPrivacyPolicy;
