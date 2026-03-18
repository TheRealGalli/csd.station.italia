import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-blue prose-sm sm:prose-base lg:prose-lg text-gray-700">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4">Cookie Policy</h1>
          <p className="text-sm text-gray-500 mb-8 italic">Ultimo aggiornamento: 18 marzo 2026</p>

          <p>
            Questa Cookie Policy spiega come <code>csd-station.it</code> utilizza i cookie e tecnologie simili per riconoscerti quando visiti il nostro sito web. Spiega cosa sono queste tecnologie e perché le usiamo.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Cosa sono i cookie?</h2>
          <p>
            I cookie sono piccoli file di dati che vengono memorizzati sul tuo computer o dispositivo mobile quando visiti un sito web. I cookie sono ampiamente utilizzati dai proprietari di siti web per far funzionare i loro siti, o per farli funzionare in modo più efficiente, nonché per fornire informazioni di reporting.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Perché usiamo i cookie?</h2>
          <p>
            Usiamo cookie di prima parte e di terza parte per diversi motivi. Alcuni cookie sono necessari per motivi tecnici affinché il nostro Sito possa funzionare, e ci riferiamo a questi come cookie "essenziali" o "strettamente necessari". Altri cookie ci consentono anche di tracciare e mirare gli interessi dei nostri utenti per migliorare l'esperienza sulle nostre proprietà online.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Tipi di cookie che usiamo</h2>
          <div className="overflow-x-auto not-prose">
            <table className="min-w-full text-sm border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 border border-gray-200 text-left">Categoria</th>
                  <th className="px-4 py-2 border border-gray-200 text-left">Descrizione</th>
                  <th className="px-4 py-2 border border-gray-200 text-left">Cookie</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 font-semibold">Strettamente Necessari</td>
                  <td className="px-4 py-2 border border-gray-200">Richiesti per le funzionalità principali del sito e la sicurezza.</td>
                  <td className="px-4 py-2 border border-gray-200"><code>csd-cookie-consent</code>, <code>__cf_bm</code></td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 font-semibold">Funzionalità (Terza Parte)</td>
                  <td className="px-4 py-2 border border-gray-200">Usati per fornire funzionalità come il widget di prenotazione di Google Calendar.</td>
                  <td className="px-4 py-2 border border-gray-200"><code>NID</code>, <code>OGPC</code> (Google)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 font-semibold">Distribuzione Contenuti</td>
                  <td className="px-4 py-2 border border-gray-200">Usati dai CDN per visualizzare badge e asset esterni.</td>
                  <td className="px-4 py-2 border border-gray-200">Google Cloud/Qwiklabs assets</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Come posso controllare i cookie?</h2>
          <p>
            Hai il diritto di decidere se accettare o rifiutare i cookie. Puoi esercitare i tuoi diritti sui cookie impostando le tue preferenze nel Cookie Consent Banner che è apparso quando hai visitato per la prima volta il nostro sito.
          </p>
          <p>
            Puoi anche impostare o modificare i controlli del tuo browser web per accettare o rifiutare i cookie. Se scegli di rifiutare i cookie, potrai comunque utilizzare il nostro sito web, anche se l'accesso ad alcune funzionalità e aree del nostro sito (come il calendario integrato) potrebbe essere limitato.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Ogni quanto aggiornerete questa Cookie Policy?</h2>
          <p>
            Potremmo aggiornare questa Cookie Policy di volta in volta per riflettere, ad esempio, modifiche ai cookie che usiamo o per altri motivi operativi, legali o normativi. Ti invitiamo pertanto a consultare regolarmente questa Cookie Policy per rimanere informato sul nostro uso dei cookie e delle tecnologie correlate.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. Dove poso ottenere ulteriori informazioni?</h2>
          <p>
            In caso di domande sul nostro uso dei cookie o di altre tecnologie, scrivici a 
            <a href="mailto:carlo@csd-station.it" className="text-blue-600"> carlo@csd-station.it</a> o <a href="mailto:carlo@csd-station.com" className="text-blue-600"> carlo@csd-station.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
