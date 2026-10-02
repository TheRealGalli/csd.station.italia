import { useState, useRef, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight, Star, Zap, ShieldCheck, BarChart3 } from "lucide-react";
import nfcCardImg from "@/assets/nfc-card.jpg";
import nfcPlateImg from "@/assets/nfc-plate.png";
import nfcStandImg from "@/assets/nfc-stand.png";

const NFC_MODELS = [
  {
    id: "card",
    title: "Card NFC", mobileTitle: "Card",
    price: "19,90 €",
    image: nfcCardImg,
    alt: "Card NFC Recensioni Google",
    isPlate: false,
    isStand: false,
    whatsappUrl: "https://wa.me/393518628203?text=Ciao!%20Mi%20interessava%20avere%20pi%C3%B9%20informazioni%20sulle%20Card%20NFC.",
  },
  {
    id: "plate",
    title: "Plate Adesiva NFC", mobileTitle: "Plate Adesiva",
    price: "34,90 €",
    image: nfcPlateImg,
    alt: "Plate Adesiva NFC Recensioni Google",
    isPlate: true,
    isStand: false,
    whatsappUrl: "https://wa.me/393518628203?text=Ciao!%20Mi%20interessava%20avere%20pi%C3%B9%20informazioni%20sulle%20Plate%20adesive%20NFC.",
  },
  {
    id: "stand",
    title: "Stand NFC", mobileTitle: "Stand",
    price: "39,90 €",
    image: nfcStandImg,
    alt: "Stand da Banco NFC Recensioni Google",
    isPlate: false,
    isStand: true,
    whatsappUrl: "https://wa.me/393518628203?text=Ciao!%20Mi%20interessava%20avere%20pi%C3%B9%20informazioni%20sugli%20Stand%20NFC.",
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
        <div className="w-full h-full flex items-center justify-center p-6 bg-white">
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

  const renderCardBody = (model: typeof NFC_MODELS[0], isActive: boolean) => (
    <div
      className={`relative bg-white rounded-3xl p-4 sm:p-5 border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
        isActive
          ? "shadow-2xl border-gray-100"
          : "shadow-xl border-gray-200/90 hover:shadow-2xl"
      }`}
    >
      {/* Product Image Frame */}
      <div className="relative overflow-hidden rounded-2xl bg-white aspect-[3/3.1] flex items-center justify-center border border-gray-200/60">
        {renderCardVisual(model, isActive)}

        {/* Floating Price Tag in Top-Right */}
        <div className="absolute top-3.5 right-3.5 z-20 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-md border border-gray-200/90 flex items-center pointer-events-none">
          <span className="text-xs sm:text-sm font-extrabold text-gray-900 tracking-tight">
            {model.price}
          </span>
        </div>
      </div>

      {/* WhatsApp CTA Button */}
      <div className="mt-3.5 pt-0.5">
        <a
          href={model.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="group/wa w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-extrabold text-white text-sm tracking-wide transition-all duration-200 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
          style={{ backgroundColor: "#25D366" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span>Ordina Ora su WhatsApp</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover/wa:translate-x-1" />
        </a>
      </div>
    </div>
  );

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
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mt-2">
              <a href="#nfc-booking" className="btn btn-primary group px-5 py-2.5 text-sm font-semibold" id="nfc-hero-cta">
                Ordina i tuoi dispositivi
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#nfc-stats" className="btn btn-outline px-5 py-2.5 text-sm font-semibold whitespace-nowrap" id="nfc-hero-secondary">
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

                {/* Card box with WhatsApp button */}
                {renderCardBody(currentModel, true)}
              </div>

              {/* DESKTOP DISPLAY (>= 1024px): Prominent cards, full integral card, peeking half off-screen */}
              <div className="hidden lg:block relative w-[380px] xl:w-[400px] h-[530px]">
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
                    // Slides left and dissolves with a smooth fade-out leaving the title clean
                    translateX = -1 * (currentIndex - idx) * 260;
                    opacity = 0;
                    scale = 0.96;
                    zIndex = 10;
                    pointerEvents = "none";
                  } else if (isNext) {
                    // Positioned at the right edge of the screen, with half (cardWidth/2) outside, 100% solid
                    translateX = distToEdge - cardWidth / 2;
                    opacity = 1;
                    scale = 1;
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

                      {/* Complete, integral card container with WhatsApp button */}
                      {renderCardBody(model, isActive)}
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
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors duration-200 flex items-center gap-1.5 cursor-pointer select-none outline-none touch-manipulation ${
                        currentIndex === idx
                          ? "bg-gray-900 text-white shadow-md border border-gray-900"
                          : "bg-transparent text-gray-600 hover:text-gray-900 hover:bg-black/5 border border-gray-300/80 active:bg-black/10"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          currentIndex === idx ? "bg-google-green" : "bg-gray-400"
                        }`}
                      />
                      <span className="sm:hidden">{model.mobileTitle}</span><span className="hidden sm:inline">{model.title}</span>
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
