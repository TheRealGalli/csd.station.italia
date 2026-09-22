import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Check, HeartHandshake, Layers, Smartphone, MessageCircle, Store } from "lucide-react";

export const NfcVersatilitySection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      className="hidden md:block py-20 bg-gray-50 border-t border-gray-200/60"
      ref={sectionRef as any}
      id="nfc-versatility"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div
          className={`text-center max-w-3xl mx-auto mb-14 ${
            isVisible ? "animate-fade-in-up" : "reveal-hidden"
          }`}
        >
          <span className="section-tag bg-blue-50 text-google-blue">
            Versatilità & Formati NFC
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-5">
            Card NFC Tascabile <span className="text-google-blue">vs</span> Plate Fissa da Banco
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mt-4 leading-relaxed">
            Entrambe integrano la medesima tecnologia NFC intelligente con chip dinamico e QR Code. Tuttavia, il formato giusto presentato nell'occasione corretta fa la differenza sul tasso di risposta e sulla crescita delle tue recensioni.
          </p>

          <div className="mt-6 inline-flex items-center gap-2.5 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm text-xs sm:text-sm text-gray-700">
            <MessageCircle className="w-4 h-4 text-google-green shrink-0" />
            <span>
              Dubbio sul formato?{" "}
              <a
                href="https://wa.me/393518628203?text=Ciao!%20Vorrei%20un%20consiglio%20su%20quale%20formato%20scegliere%20tra%20Card%20NFC%20e%20Plate%20Adesiva%20da%20Banco%20e%20in%20quali%20quantit%C3%A0."
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-google-blue hover:underline"
              >
                Scrivi su WhatsApp
              </a>{" "}
              per essere consigliato direttamente dal nostro consulente su quale scegliere e in quale quantità.
            </span>
          </div>
        </div>

        {/* Pro vs Pro Grid */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${
            isVisible ? "animate-fade-in-up delay-100" : "reveal-hidden"
          }`}
        >
          {/* Card NFC Tascabile CSD Station */}
          <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border-2 border-google-green shadow-xl relative flex flex-col justify-between">
            <div className="absolute top-5 right-5 sm:top-6 sm:right-6 bg-google-green text-white text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">
              Scelta Tascabile
            </div>

            <div className="mt-6 sm:mt-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-google-green-light text-google-green flex items-center justify-center font-bold text-xl shrink-0">
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

              <ul className="space-y-6 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-google-green-light text-google-green flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-gray-900">Consegna con il conto al tavolo:</strong> In ristoranti, bar e bistrot il personale porta la card elegante insieme al portaconto, cogliendo il cliente nel momento di massima soddisfazione e relax.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-google-green-light text-google-green flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-gray-900">Contatto umano e diretto:</strong> Negli studi medici, dentistici, saloni di bellezza o showroom, il professionista porge la card a fine appuntamento con un sorriso. Tasso di risposta oltre il 90%.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-google-green-light text-google-green flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-gray-900">Materiale PVC Premium impermeabile:</strong> Tascabile formato carta di credito, ultra resistente, lavabile e idrorepellente contro liquidi o usura.
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-2 text-xs font-bold text-google-green">
              <HeartHandshake className="w-4 h-4" />
              Esperienza relazionale e personalizzata da portare ovunque
            </div>
          </div>

          {/* Stand / Plate Fissa Adesiva da Banco */}
          <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border-2 border-google-blue shadow-xl relative flex flex-col justify-between">
            <div className="absolute top-5 right-5 sm:top-6 sm:right-6 bg-google-blue text-white text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">
              Posizionamento Fisso
            </div>

            <div className="mt-6 sm:mt-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-google-blue flex items-center justify-center font-bold text-xl shrink-0">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-gray-900">
                    Stand / Plate Fissa Adesiva da Banco
                  </h3>
                  <p className="text-xs text-google-blue font-semibold">
                    Visibilità continua e punto fisso dedicato
                  </p>
                </div>
              </div>

              <ul className="space-y-6 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-google-blue flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-gray-900">Presenza continua alla cassa e reception:</strong> Sempre posizionata all'altezza degli occhi durante il pagamento o il check-in/out, pronta a catturare ogni cliente in transito.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-google-blue flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-gray-900">Zero carico di lavoro per il personale:</strong> Perfetta per attività ad alto flusso continuo (bar, retail, negozi, hotel) dove il cliente si avvicina spontaneamente e appoggia lo smartphone.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-google-blue flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-gray-900">Adesivo ultra-forte & finitura rigida:</strong> Si fissa saldamente su banchi in legno, vetro, plexiglass o pareti, garantendo stabilità totale senza spostarsi.
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-2 text-xs font-bold text-google-blue">
              <Store className="w-4 h-4" />
              Ideale per punti cassa, banchi reception e postazioni fisse ad alto passaggio
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
