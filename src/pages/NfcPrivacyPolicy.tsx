import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const NfcPrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-emerald prose-sm sm:prose-base lg:prose-lg text-gray-700">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4 border-b pb-4">
            Privacy Policy - Card NFC Recensioni
          </h1>
          <p className="text-sm text-gray-500 mb-8 italic">
            Ultimo aggiornamento: In fase di definizione
          </p>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-8 text-emerald-900">
            <h2 className="text-lg font-bold text-emerald-950 mt-0 mb-2">
              Sezione in aggiornamento
            </h2>
            <p className="text-sm leading-relaxed mb-0">
              Informativa sulla Privacy specifica per la vendita, configurazione ed utilizzo delle 
              <strong> Card NFC Recensioni Google</strong> e relativi servizi di reindirizzamento e statistiche. 
              I contenuti di questa pagina verranno integrati a breve.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NfcPrivacyPolicy;
