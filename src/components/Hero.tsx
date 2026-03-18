import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight } from "lucide-react";
import heroIllustration from "@/assets/illustrations/hero-girl-umbrella.webp";

export const Hero = () => {
  const { ref: heroRef, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      className="relative pt-28 lg:pt-36 pb-16 lg:pb-24"
      ref={heroRef as any}
      id="hero"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left — Text Content */}
          <div
            className={`flex-1 flex flex-col gap-6 text-center lg:text-left ${isVisible ? "animate-fade-in-up" : "reveal-hidden"
              }`}
          >
            {/* Tag */}
            <div className="flex justify-center lg:justify-start">
              <span className="section-tag bg-google-blue-light text-google-blue">
                Consulenza Gratuita di 30 Min
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight text-gray-900">
              Mettiamo l'{" "}
              <span className="text-google-blue">AI</span>{" "}
              al Servizio del Tuo{" "}
              <span className="text-google-green">Business</span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              CyberSpaceDokingStation LLC — il tuo partner di fiducia per l'automazione basata sull'AI
              e l'ottimizzazione degli spazi di lavoro. Aiutiamo le aziende ad automatizzare
              le attività, snellire i flussi di lavoro e scalare in modo più intelligente.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mt-2">
              <a href="#booking" className="btn btn-primary btn-lg group" id="hero-cta-primary">
                Prenota Consulenza Gratuita
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#services" className="btn btn-outline btn-lg" id="hero-cta-secondary">
                I Nostri Servizi
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-google-green"></span>
                Partner Membro
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-google-blue"></span>
                Su tutto il territorio nazionale, ITA
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-google-yellow"></span>
                Professionista Google
              </span>
            </div>
          </div>

          {/* Right — Illustration */}
          <div
            className={`flex-1 flex justify-center lg:justify-end ${isVisible ? "animate-fade-in delay-200" : "reveal-hidden"
              }`}
          >
            <img
              src={heroIllustration}
              alt="Illustration of a girl with a colorful umbrella"
              className="w-72 sm:w-80 lg:w-[420px] animate-float"
              id="hero-illustration"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
