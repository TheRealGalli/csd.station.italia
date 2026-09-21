import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight, Star, Zap, ShieldCheck, BarChart3, QrCode, ChevronRight, ChevronLeft } from "lucide-react";
import nfcCardImg from "@/assets/nfc-card.jpg";
import nfcPlateImg from "@/assets/nfc-plate.png";

const NFC_MODELS = [
  {
    id: "card",
    title: "Card NFC",
    badge: "NFC Active Tap",
    badgeDotClass: "bg-google-green animate-ping",
    image: nfcCardImg,
    alt: "Card NFC Recensioni Google",
    statTitle: "Incremento Recensioni",
    statValue: "+1500% al mese",
    statBadge: "Valutazione 5.0 ★",
    isPlate: false,
  },
  {
    id: "plate",
    title: "Plate Adesiva NFC",
    badge: "NFC Plate Adesiva",
    badgeDotClass: "bg-google-blue animate-ping",
    image: nfcPlateImg,
    alt: "Plate Adesiva NFC Recensioni Google",
    statTitle: "Incremento Recensioni",
    statValue: "+1500% al mese",
    statBadge: "Valutazione 5.0 ★",
    isPlate: true,
  },
];

export const NfcHero = () => {
  const { ref: heroRef, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentModel = NFC_MODELS[currentIndex];

  const toggleModel = () => {
    setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <section
      className="relative pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-24 bg-gradient-to-b from-blue-50/40 via-white to-white overflow-hidden"
      ref={heroRef as any}
      id="nfc-hero"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-google-blue/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left — Text Content */}
          <div
            className={`flex-1 flex flex-col gap-6 text-center lg:text-left ${
              isVisible ? "animate-fade-in-up" : "reveal-hidden"
            }`}
          >
            {/* Tag */}
            <div className="flex justify-center lg:justify-start mt-1 mb-1">
              <span className="section-tag bg-google-green-light text-google-green border border-google-green/30 inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                <Zap className="w-4 h-4 fill-current shrink-0" />
                Recensioni Google Istantanee
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight text-gray-900">
              Metti le <span className="text-google-blue">Recensioni Google</span> al Centro del Tuo{" "}
              <span className="text-google-green">Business</span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Con le <strong className="text-gray-900 font-semibold">Card & Plate NFC CSD Station</strong> i tuoi clienti lasciano una recensione a 5 stelle in 2 secondi. Passa da 3 a oltre <strong className="text-google-blue">50 recensioni a settimana</strong>, scala su Google Maps e domina i consigli dei motori AI come <strong className="text-google-green">Google Gemini</strong>.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-800 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-google-blue" />
                Pagamento Unico (Una Tantum)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-800 text-xs font-semibold">
                <BarChart3 className="w-4 h-4 text-google-green" />
                Statistiche Mensili Incluse
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-800 text-xs font-semibold">
                <QrCode className="w-4 h-4 text-google-yellow" />
                QR Code Stampa Frontale
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mt-2">
              <a href="#nfc-booking" className="btn btn-primary btn-lg group" id="nfc-hero-cta">
                Ordina i tuoi dispositivi NFC
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#nfc-stats" className="btn btn-outline btn-lg" id="nfc-hero-secondary">
                Scopri l'Impatto
              </a>
            </div>

            {/* Trust rating badge */}
            <div className="flex items-center gap-3 justify-center lg:justify-start mt-2 text-sm text-gray-600">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-medium text-gray-800">Dispositivi ufficiali con Chip NFC ultra-veloce</span>
            </div>
          </div>

          {/* Right — Google NFC Card & Plate Showcase */}
          <div
            className={`flex-1 flex flex-col items-center lg:items-end justify-center relative ${
              isVisible ? "animate-fade-in delay-200" : "reveal-hidden"
            }`}
          >
            <div className="relative group max-w-[290px] xs:max-w-[320px] sm:max-w-md w-full -translate-x-3 sm:translate-x-0 lg:mr-14">
              {/* Decorative background glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-google-blue via-google-yellow to-google-green rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500" />
              
              {/* Showcase Container */}
              <div className="relative bg-white rounded-3xl p-5 shadow-2xl border border-gray-100 overflow-hidden">
                <div className="relative overflow-hidden rounded-2xl bg-white aspect-[3/4.2] flex items-center justify-center border border-gray-200/60">
                  {/* Current Model Display */}
                  <div
                    key={currentModel.id}
                    className="w-full h-full flex items-center justify-center animate-fade-in transition-all duration-300"
                  >
                    {currentModel.isPlate ? (
                      <div className="w-full h-full flex items-center justify-center p-6 sm:p-8 bg-white">
                        <img
                          src={currentModel.image}
                          alt={currentModel.alt}
                          className="w-[75%] max-w-[270px] aspect-square object-contain drop-shadow-md rounded-2xl transform group-hover:scale-105 transition-transform duration-500 select-none"
                        />
                      </div>
                    ) : (
                      <img
                        src={currentModel.image}
                        alt={currentModel.alt}
                        className="w-full h-full object-contain p-2 transform group-hover:scale-102 transition-transform duration-500 bg-white select-none"
                      />
                    )}
                  </div>
                  
                  {/* Floating Live Tap Tag */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-gray-100 flex items-center gap-2 z-20">
                    <span className={`w-2.5 h-2.5 rounded-full ${currentModel.badgeDotClass}`} />
                    <span className="text-xs font-bold text-gray-900">{currentModel.badge}</span>
                  </div>

                  {/* Floating rating badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-xl border border-gray-100 flex items-center justify-between z-20">
                    <div>
                      <div className="text-xs text-gray-500 font-medium">{currentModel.statTitle}</div>
                      <div className="text-lg font-extrabold text-google-blue">{currentModel.statValue}</div>
                    </div>
                    <div className="bg-google-green-light px-3 py-1 rounded-lg text-google-green text-xs font-bold">
                      {currentModel.statBadge}
                    </div>
                  </div>
                </div>
              </div>

              {/* Single Navigation Arrow - Always on the right side, outside the plate container */}
              <button
                onClick={toggleModel}
                className="absolute -right-11 sm:-right-13 lg:-right-16 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-xl hover:shadow-2xl border border-gray-200/90 flex items-center justify-center text-gray-800 hover:text-google-blue hover:scale-110 active:scale-95 transition-all duration-200 group/btn focus:outline-none focus:ring-2 focus:ring-google-blue/40 cursor-pointer"
                aria-label={currentIndex === 0 ? "Vedi Plate Adesiva NFC" : "Torna a Card NFC"}
                title={currentIndex === 0 ? "Vedi Plate Adesiva NFC" : "Torna a Card NFC"}
              >
                {currentIndex === 0 ? (
                  <ChevronRight className="w-6 h-6 transition-transform group-hover/btn:translate-x-0.5 text-gray-700 group-hover/btn:text-google-blue" />
                ) : (
                  <ChevronLeft className="w-6 h-6 transition-transform group-hover/btn:-translate-x-0.5 text-gray-700 group-hover/btn:text-google-blue" />
                )}
              </button>

              {/* Model Selector Pills */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {NFC_MODELS.map((model, idx) => (
                  <button
                    key={model.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                      currentIndex === idx
                        ? "bg-gray-900 text-white shadow-md scale-105"
                        : "bg-white/90 text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200/80 shadow-sm"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        currentIndex === idx ? "bg-google-green" : "bg-gray-300"
                      }`}
                    />
                    {model.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
