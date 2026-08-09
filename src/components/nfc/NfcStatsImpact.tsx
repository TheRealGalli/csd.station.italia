import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { TrendingUp, ArrowUpRight, CheckCircle2, Sparkles, Star } from "lucide-react";

export const NfcStatsImpact = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  // Interactive ROI Calculator state
  const [sector, setSector] = useState<"ristoranti" | "medici" | "beauty" | "hotel">("ristoranti");
  const [weeklyClients, setWeeklyClients] = useState<number>(150);

  // Growth formulas
  const conversionRateOld = 0.02; // ~2% write reviews normally
  const conversionRateNfc = 0.32; // ~32% write reviews with NFC card tap

  const weeklyOldReviews = Math.round(weeklyClients * conversionRateOld);
  const weeklyNfcReviews = Math.round(weeklyClients * conversionRateNfc);
  const annualNfcReviews = weeklyNfcReviews * 52;

  const sectorLabels = {
    ristoranti: "Ristorante / Bar",
    medici: "Studio Medico / Dentistico",
    beauty: "Centro Estetico / Parrucchiere",
    hotel: "Hotel & B&B",
  };

  return (
    <section
      className="py-20 bg-gray-50 border-y border-gray-200/60"
      ref={sectionRef as any}
      id="nfc-stats"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 ${
            isVisible ? "animate-fade-in-up" : "reveal-hidden"
          }`}
        >
          <span className="section-tag bg-google-blue-light text-google-blue">
            Risultati Reali dei Nostri Clienti
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-2">
            Da <span className="text-red-500 line-through">3 recensioni</span> a oltre{" "}
            <span className="text-google-green">50 recensioni a settimana</span>
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Rendi il processo di recensione per i tuoi clienti senza attrito. Basta avvicinare lo smartphone alla Card NFC ed il gioco è fatto.
          </p>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Before Card */}
          <div className="bg-white p-8 rounded-2xl border border-red-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-red-100 text-red-700 text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
              Metodo Tradizionale
            </div>
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Senza Card NFC
            </div>
            <div className="text-4xl font-black text-gray-900 mb-4 flex items-baseline gap-2">
              ~3 <span className="text-lg font-normal text-gray-500">recensioni / settimana</span>
            </div>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 mt-0.5 font-bold">✕</span>
                Clienti che dimenticano di recensire una volta tornati a casa
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 mt-0.5 font-bold">✕</span>
                Ricerca manuale del locale su Google Maps troppo lunga
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 mt-0.5 font-bold">✕</span>
                Posizionamento fermo su Google Maps e scarsa rilevanza AI
              </li>
            </ul>
          </div>

          {/* After Card (CSD Station) */}
          <div className="bg-gradient-to-br from-white to-blue-50/50 p-8 rounded-2xl border-2 border-google-blue shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-google-blue text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              Con Card NFC CSD Station
            </div>
            <div className="text-sm font-semibold text-google-blue uppercase tracking-wider mb-2">
              Risultato Garantito
            </div>
            <div className="text-4xl sm:text-5xl font-black text-google-blue mb-4 flex items-baseline gap-2">
              50+ <span className="text-lg font-bold text-google-green">recensioni / settimana</span>
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2.5 font-medium">
                <CheckCircle2 className="w-5 h-5 text-google-green shrink-0 mt-0.5" />
                Tap immediato in 2 secondi mentre il cliente è ancora al tavolo o in cassa
              </li>
              <li className="flex items-start gap-2.5 font-medium">
                <CheckCircle2 className="w-5 h-5 text-google-green shrink-0 mt-0.5" />
                Apertura automatica diretta alla scheda di valutazione 5 stelle
              </li>
              <li className="flex items-start gap-2.5 font-medium">
                <CheckCircle2 className="w-5 h-5 text-google-green shrink-0 mt-0.5" />
                Scalata immediata del ranking locale su Google Maps & consiglieri Gemini AI
              </li>
            </ul>
          </div>
        </div>

        {/* Interactive ROI Calculator */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 border border-gray-200 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-8 mb-8">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-google-blue bg-blue-50 px-3 py-1 rounded-full">
                Simulatore di Crescita
              </span>
              <h3 className="text-2xl font-extrabold text-gray-900 mt-2">
                Calcola quante recensioni guadagnerai
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Seleziona il tuo settore ed il volume approssimativo di clienti settimanali.
              </p>
            </div>
            
            {/* Sector selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-gray-100 p-1.5 rounded-2xl shrink-0">
              {(Object.keys(sectorLabels) as Array<keyof typeof sectorLabels>).map((key) => (
                <button
                  key={key}
                  onClick={() => setSector(key)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    sector === key
                      ? "bg-white text-google-blue shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {sectorLabels[key].split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Slider control */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-gray-800">
                    Clienti serviti a settimana:
                  </label>
                  <span className="text-xl font-extrabold text-google-blue bg-blue-50 px-4 py-1 rounded-xl">
                    {weeklyClients} clienti
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="500"
                  step="10"
                  value={weeklyClients}
                  onChange={(e) => setWeeklyClients(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-google-blue"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>30 clienti/sett</span>
                  <span>250 clienti/sett</span>
                  <span>500+ clienti/sett</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl text-xs text-gray-600 leading-relaxed border border-gray-200/80">
                💡 <strong className="text-gray-900">Come calcoliamo:</strong> I dati si basano sul tasso medio di conversione di tap della card NFC sul luogo rispetto al solo metodo verbale.
              </div>
            </div>

            {/* Results Display */}
            <div className="lg:col-span-5 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6 shadow-2xl flex flex-col justify-between gap-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Previsione Crescita Anno 1
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-google-green bg-google-green/20 px-2.5 py-1 rounded-full">
                  <TrendingUp className="w-3.5 h-3.5" />
                  +1600% ROI
                </span>
              </div>

              <div>
                <div className="text-xs text-gray-400">Stima Nuove Recensioni/Anno:</div>
                <div className="text-4xl sm:text-5xl font-black text-white mt-1 tracking-tight flex items-center gap-2">
                  +{annualNfcReviews.toLocaleString()}
                  <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
                </div>
                <div className="text-sm text-google-green font-semibold mt-2">
                  ovvero ~{weeklyNfcReviews} recensioni reali a settimana (rispetto alle vecchie {weeklyOldReviews})
                </div>
              </div>

              <a
                href="#nfc-booking"
                className="w-full py-3 bg-google-blue hover:bg-blue-600 text-white text-center font-bold rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
              >
                Inizia Ora per il Tuo {sectorLabels[sector]}
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
