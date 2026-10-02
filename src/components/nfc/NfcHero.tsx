import { useState, useRef, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight, Star, Zap, ShieldCheck, BarChart3, QrCode } from "lucide-react";
import nfcCardImg from "@/assets/nfc-card.jpg";
import nfcPlateImg from "@/assets/nfc-plate.png";

const NFC_MODELS = [
  {
    id: "card",
    title: "Card NFC",
    image: nfcCardImg,
    alt: "Card NFC Recensioni Google",
    isPlate: false,
    isStand: false,
  },
  {
    id: "plate",
    title: "Plate Adesiva NFC",
    image: nfcPlateImg,
    alt: "Plate Adesiva NFC Recensioni Google",
    isPlate: true,
    isStand: false,
  },
  {
    id: "stand",
    title: "Stand NFC",
    image: null as string | null,
    alt: "Stand da Banco NFC Recensioni Google",
    isPlate: false,
    isStand: true,
  },
];

export const NfcHero = () => {
  const { ref: heroRef, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const [windowWidth, setWindowWidth] = useState<number>(1440);
  const [spotlightLeft, setSpotlightLeft] = useState<number>(0);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateLayout = () => {
      if (typeof window !== "undefined") {
        setWindowWidth(window.innerWidth);
        if (spotlightRef.current) {
          const rect = spotlightRef.current.getBoundingClientRect();
          setSpotlightLeft(rect.left);
        }
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    const t1 = setTimeout(updateLayout, 100);
    const t2 = setTimeout(updateLayout, 500);

    return () => {
      window.removeEventListener("resize", updateLayout);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isVisible]);

  const toggleModel = () => {
    setCurrentIndex((prev) => (prev + 1) % NFC_MODELS.length);
  };

  const selectModel = (idx: number) => {
    setCurrentIndex(idx);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const diffX = touchStartX - e.changedTouches[0].clientX;
    const diffY = touchStartY - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        // Swipe left -> next
        setCurrentIndex((prev) => (prev + 1) % NFC_MODELS.length);
      } else {
        // Swipe right -> prev
        setCurrentIndex((prev) => (prev - 1 + NFC_MODELS.length) % NFC_MODELS.length);
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  const currentModel = NFC_MODELS[currentIndex];

  const renderCardVisual = (model: typeof NFC_MODELS[0], isActive: boolean) => {
    if (model.isStand) {
      return (
        <div className="w-full h-full flex items-center justify-center p-6 bg-white select-none">
          <div className="relative w-48 sm:w-52 aspect-[3/4.2] bg-white rounded-2xl shadow-xl border-2 border-gray-200/90 flex flex-col items-center justify-between p-4 transform transition-transform duration-500 hover:scale-105">
            {/* Acrylic shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent rounded-2xl pointer-events-none" />

            {/* Google G Logo & Text */}
            <div className="flex flex-col items-center pt-2">
              <svg className="w-9 h-9" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span className="text-[11px] font-bold text-gray-700 mt-2 uppercase tracking-wider">
                review us on
              </span>
              <span className="text-sm font-black text-gray-900 tracking-tight">Google</span>
              <div className="flex items-center gap-1 mt-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>

            {/* Contactless tap symbol */}
            <div className="flex flex-col items-center pb-2">
              <div className="w-9 h-9 rounded-full bg-google-blue/10 flex items-center justify-center text-google-blue">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <span className="text-[10px] text-gray-400 font-semibold mt-1">avvicina lo smartphone</span>
            </div>

            {/* Acrylic Stand Base */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-56 sm:w-60 h-4 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 rounded-md shadow-md border border-gray-300" />
          </div>
        </div>
      );
    }

    if (model.isPlate) {
      return (
        <div className="w-full h-full flex items-center justify-center p-8 bg-white">
          <img
            src={model.image!}
            alt={model.alt}
            className={`w-[85%] max-w-[280px] aspect-square object-contain drop-shadow-md rounded-2xl select-none transition-transform duration-500 ${
              isActive ? "hover:scale-105" : ""
            }`}
          />
        </div>
      );
    }

    // Default Card NFC
    return (
      <div className="w-full h-full flex items-center justify-center p-3 bg-white">
        <img
          src={model.image!}
          alt={model.alt}
          className={`w-full h-full object-contain select-none transition-transform duration-500 ${
            isActive ? "hover:scale-102" : ""
          }`}
        />
      </div>
    );
  };

  return (
    <section
      className="relative pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-24 bg-gradient-to-b from-blue-50/40 via-white to-white overflow-hidden w-full"
      ref={heroRef as any}
      id="nfc-hero"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-google-blue/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left — Text Content */}
          <div
            className={`flex-1 flex flex-col gap-6 text-center lg:text-left relative z-0 ${
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

          {/* Right — Google NFC Card, Plate & Stand Showcase */}
          <div
            className={`flex-1 flex flex-col items-center lg:items-end justify-center relative z-20 w-full ${
              isVisible ? "animate-fade-in delay-200" : "reveal-hidden"
            }`}
          >
            {/* Spotlight Container for Desktop positioning measurement */}
            <div
              ref={spotlightRef}
              className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[400px] lg:mr-4"
            >
              {/* MOBILE DISPLAY (< 1024px): Single card, clean swipe/tap com'era prima per 3 modelli */}
              <div
                className="block lg:hidden relative select-none touch-pan-y"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onClick={toggleModel}
              >
                {/* Ambient glow behind card */}
                <div className="absolute -inset-2 bg-gradient-to-r from-google-blue via-google-yellow to-google-green rounded-3xl blur-2xl opacity-40 transition-opacity duration-500 pointer-events-none" />

                {/* Card box */}
                <div className="relative bg-white rounded-3xl p-5 shadow-2xl border border-gray-100 overflow-hidden cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl bg-white aspect-[3/4] flex items-center justify-center border border-gray-200/60">
                    {renderCardVisual(currentModel, true)}
                  </div>
                </div>
              </div>

              {/* DESKTOP DISPLAY (>= 1024px): Prominent cards, full integral card, peeking half off-screen */}
              <div className="hidden lg:block relative w-[380px] xl:w-[400px] h-[510px]">
                {NFC_MODELS.map((model, idx) => {
                  const isActive = idx === currentIndex;
                  const isPrev = idx < currentIndex;
                  const isNext = idx === currentIndex + 1;

                  // Distance from spotlight left to right edge of browser screen
                  const distToEdge = Math.max(windowWidth - spotlightLeft, 550);
                  const cardWidth = 390;

                  let translateX = 0;
                  let opacity = 0;
                  let scale = 1;
                  let zIndex = 10;
                  let pointerEvents = "auto";

                  if (isActive) {
                    translateX = 0;
                    opacity = 1;
                    scale = 1;
                    zIndex = 30;
                  } else if (isPrev) {
                    // Slides left over the title: each step moves ~380px to the left
                    translateX = -1 * (currentIndex - idx) * 380;
                    opacity = 0.75;
                    scale = 0.94;
                    zIndex = 20 + idx;
                  } else if (isNext) {
                    // Positioned exactly at the right edge of the screen, with half (cardWidth/2) outside!
                    translateX = distToEdge - cardWidth / 2;
                    opacity = 0.85;
                    scale = 0.94;
                    zIndex = 20;
                  } else {
                    // Further cards off-screen
                    translateX = distToEdge + 350;
                    opacity = 0;
                    pointerEvents = "none";
                  }

                  return (
                    <div
                      key={model.id}
                      onClick={() => selectModel(idx)}
                      className="absolute top-0 left-0 w-[380px] xl:w-[400px] transition-all duration-500 ease-out cursor-pointer select-none"
                      style={{
                        transform: `translateX(${translateX}px) scale(${scale})`,
                        opacity,
                        zIndex,
                        pointerEvents: pointerEvents as any,
                      }}
                      title={!isActive ? `Visualizza ${model.title}` : undefined}
                    >
                      {/* Glow halo when active */}
                      {isActive && (
                        <div className="absolute -inset-2 bg-gradient-to-r from-google-blue via-google-yellow to-google-green rounded-3xl blur-2xl opacity-40 transition-opacity duration-500 pointer-events-none" />
                      )}

                      {/* Complete, integral card container (no tags, no stats, just clean hardware photo) */}
                      <div
                        className={`relative bg-white rounded-3xl p-5 border transition-all duration-300 overflow-hidden ${
                          isActive
                            ? "shadow-2xl border-gray-100"
                            : "shadow-xl border-gray-200/90 hover:shadow-2xl"
                        }`}
                      >
                        <div className="relative overflow-hidden rounded-2xl bg-white aspect-[3/4] flex items-center justify-center border border-gray-200/60">
                          {renderCardVisual(model, isActive)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Model Selector Pills — Exact original styling and spacing restored for all 3 models */}
              <div className="relative z-30 flex flex-col items-center justify-center mt-6">
                <div className="flex items-center justify-center gap-2.5">
                  {NFC_MODELS.map((model, idx) => (
                    <button
                      key={model.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        selectModel(idx);
                      }}
                      className={`px-4 py-2 sm:py-1.5 rounded-full text-xs font-bold transition-colors duration-200 flex items-center gap-2 cursor-pointer select-none outline-none touch-manipulation ${
                        currentIndex === idx
                          ? "bg-gray-900 text-white shadow-md border border-gray-900"
                          : "bg-transparent text-gray-600 hover:text-gray-900 hover:bg-black/5 border border-gray-300/80 active:bg-black/10"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          currentIndex === idx ? "bg-google-green" : "bg-gray-400"
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
      </div>
    </section>
  );
};
