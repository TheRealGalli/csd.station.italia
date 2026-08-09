import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Check, X, ShieldCheck, HeartHandshake, Layers, Smartphone } from "lucide-react";

export const NfcVersatilitySection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      className="py-20 bg-gray-50 border-t border-gray-200/60"
      ref={sectionRef as any}
      id="nfc-versatility"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 ${
            isVisible ? "animate-fade-in-up" : "reveal-hidden"
          }`}
        >
          <span className="section-tag bg-google-green-light text-google-green">
            Versatilità & Design Tascabile
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-2">
            Perché la <span className="text-google-blue">Card NFC Tascabile</span> vince sugli Stand Fissi da Banco
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Gli stand ed i cartelli fissi da tavolo vengono spesso ignorati. La nostra Card NFC è pensata per essere presentata nel momento perfetto di massima soddisfazione del cliente.
          </p>
        </div>

        {/* Comparison Table / Box Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card NFC CSD Station (Winner) */}
          <div className="bg-white p-8 rounded-3xl border-2 border-google-green shadow-xl relative flex flex-col justify-between">
            <div className="absolute top-4 right-4 bg-google-green text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Scelta Intelligente
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-google-green-light text-google-green flex items-center justify-center font-bold text-xl">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900">
                    Card NFC Tascabile CSD Station
                  </h3>
                  <p className="text-xs text-google-green font-semibold">
                    Massima flessibilità d'uso quotidiano
                  </p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-google-green-light text-google-green flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-gray-900">Consegna con il conto al tavolo:</strong> In ristorante, il cameriere porta la card elegante insieme al portaconto. Il cliente recensisce mentre paga in tranquillità.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-google-green-light text-google-green flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-gray-900">Contatto umano e diretto:</strong> Negli studi medici, dentistici o saloni di bellezza, il professionista porge la card al termine della visita con un sorriso. Tasso di risposta del 90%.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-google-green-light text-google-green flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-gray-900">Materiale PVC Premium impermeabile:</strong> Tascabile, indistruttibile, lavabile e resistente a liquidi o graffi.
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-2 text-xs font-bold text-google-green">
              <HeartHandshake className="w-4 h-4" />
              Esperienza cliente calda, professionale ed efficace
            </div>
          </div>

          {/* Stand fisso da banco (Old method) */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm relative flex flex-col justify-between opacity-80 hover:opacity-100 transition-opacity">
            <div className="absolute top-4 right-4 bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Stand Fisso Tradizionale
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-500 flex items-center justify-center font-bold text-xl">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Stand / Espositore Fisso da Banco
                  </h3>
                  <p className="text-xs text-gray-500">
                    Soluzione statica ingombrante
                  </p>
                </div>
              </div>

              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-gray-800">Invisibile sui tavoli:</strong> Rimane fisso in un angolo della cassa o della reception e viene scambiato per pubblicità passiva.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-gray-800">Nessuna interazione col cameriere/operatore:</strong> Mancando il gesto attivo della consegna, la maggior parte dei clienti passa oltre.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-gray-800">Ingombrante e rigido:</strong> Non può essere portato al tavolo, all'esterno o durante una consulenza.
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-gray-500">
              <ShieldCheck className="w-4 h-4 text-gray-400" />
              Tasso di conversione inferiore del 70% rispetto alla card
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
