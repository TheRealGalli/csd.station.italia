import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const NfcTermsOfService = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-emerald prose-sm sm:prose-base lg:prose-lg text-gray-700">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4 border-b pb-4">
            Termini di Servizio - Card NFC Recensioni
          </h1>
          <p className="text-sm text-gray-500 mb-8 italic">
            Ultimo aggiornamento: In fase di definizione
          </p>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-8 text-emerald-900">
            <h2 className="text-lg font-bold text-emerald-950 mt-0 mb-2">
              Sezione in aggiornamento
            </h2>
            <p className="text-sm leading-relaxed mb-0">
              Termini di Servizio specifici per l'acquisto, la fornitura e l'utilizzo delle 
              <strong> Card NFC Recensioni Google</strong> e relativi servizi di supporto e reportistica. 
              I contenuti di questa pagina verranno integrati a breve.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NfcTermsOfService;
