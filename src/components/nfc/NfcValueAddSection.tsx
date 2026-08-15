import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BarChart3, QrCode, CreditCard, CheckCircle2, ShieldAlert } from "lucide-react";

export const NfcValueAddSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      className="py-20 bg-white"
      ref={sectionRef as any}
      id="nfc-value"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 ${
            isVisible ? "animate-fade-in-up" : "reveal-hidden"
          }`}
        >
          <span className="section-tag bg-google-blue-light text-google-blue">
            Valore Aggiunto CSD Station
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-5">
            Tutto Incluso nel Prezzo <span className="text-google-blue">Una Tantum</span>
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            A differenza di altri fornitori che richiedono abbonamenti mensili ricorrenti per la carta, con CSD Station paghi **una sola volta** ed ottieni un pacchetto completo con servizi a valore aggiunto.
          </p>
        </div>

        {/* 3 Pillar Value Added Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1: One-time payment */}
          <div className="bg-gradient-to-b from-gray-50 to-white p-8 rounded-3xl border border-gray-200 shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-google-blue/10 text-google-blue flex items-center justify-center mb-6">
                <CreditCard className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-3">
                Pagamento Una Tantum
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Paghi la tua Card NFC una sola volta. Nessun canone mensile, nessun vincolo e nessuna sorpresa in fattura a fine anno.
              </p>
            </div>
            <ul className="space-y-2 text-xs font-semibold text-gray-700 pt-4 border-t border-gray-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-google-green" />
                Nessun canone o abbonamento
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-google-green" />
                Proprietà 100% della card
              </li>
            </ul>
          </div>

          {/* Feature 2: Monthly Analytics */}
          <div className="bg-gradient-to-b from-blue-50/50 to-white p-8 rounded-3xl border-2 border-google-blue shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 bg-google-blue text-white text-[10px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Esclusiva CSD
            </div>
            <div>
              <div className="w-14 h-14 rounded-2xl bg-google-blue text-white flex items-center justify-center mb-6 shadow-md">
                <BarChart3 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-3">
                Statistiche Mensili Incluse
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Monitoriamo per te l'andamento della card. Ricevi report periodici dettagliati con il numero esatto di tap e di interazioni effettuate dai clienti.
              </p>
            </div>
            <ul className="space-y-2 text-xs font-semibold text-gray-700 pt-4 border-t border-gray-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-google-blue" />
                Report mensile tap & scansioni
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-google-blue" />
                Analisi del tasso di conversione
              </li>
            </ul>
          </div>

          {/* Feature 3: Printed QR Code */}
          <div className="bg-gradient-to-b from-gray-50 to-white p-8 rounded-3xl border border-gray-200 shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-google-yellow-light text-gray-900 flex items-center justify-center mb-6">
                <QrCode className="w-7 h-7 text-amber-500" />
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-3">
                QR Code Integrato
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Ogni card integra sulla superficie sia il Chip NFC ad alta frequenza che il QR Code ad altissima risoluzione per garantire il 100% di compatibilità con ogni modello di telefono.
              </p>
            </div>
            <ul className="space-y-2 text-xs font-semibold text-gray-700 pt-4 border-t border-gray-100">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-google-yellow shrink-0 mt-0.5" />
                Funziona con vecchi e nuovi smartphone
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-google-yellow shrink-0 mt-0.5" />
                Zero blocchi o incompatibilità
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
