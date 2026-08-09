import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Cpu, Search, Sparkles, MapPin, Award } from "lucide-react";

export const NfcSeoAiSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      className="py-20 bg-white"
      ref={sectionRef as any}
      id="nfc-seo"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 ${
            isVisible ? "animate-fade-in-up" : "reveal-hidden"
          }`}
        >
          <span className="section-tag bg-google-yellow-light text-gray-900 border border-google-yellow/40">
            <Sparkles className="w-3.5 h-3.5 text-google-yellow fill-google-yellow" />
            La Nuova Frontiera SEO & AI Search
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-2">
            Perché le Recensioni sono il fattore #1 per l'
            <span className="text-google-blue">Intelligenza Artificiale</span> e <span className="text-google-green">Google Gemini</span>
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Oggi i clienti non cercano più solo su Google Web. Chiedono a <strong className="text-gray-900 font-semibold">Google Gemini, ChatGPT e SearchGPT</strong> dove mangiare, curarsi o fare acquisti.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Gemini & AI Engines */}
          <div className="card hover:border-google-blue transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-google-blue-light text-google-blue flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Raccomandazioni Vocali & AI Direct Search
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Quando un utente chiede a Google Gemini: <em>"Gemini, consigliami il miglior ristorante della zona"</em>, l'IA seleziona esclusivamente le attività con le **migliori e più recenti recensioni su Google Maps**.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 text-xs font-semibold text-google-blue flex items-center gap-1.5">
              <span>Integrato nativamente con Google Maps</span>
            </div>
          </div>

          {/* Card 2: Local SEO Ranking */}
          <div className="card hover:border-google-green transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-google-green-light text-google-green flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Primo Posto su Google Maps (Local Pack)
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Il 92% dei clienti sceglie una delle prime 3 attività visualizzate sulla mappa. Ricevere recensioni a 5 stelle ogni giorno segnala a Google che il tuo business è attivo, popolare e affidabile.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 text-xs font-semibold text-google-green flex items-center gap-1.5">
              <span>Scalata garantita nelle ricerche locali</span>
            </div>
          </div>

          {/* Card 3: Trust & Conversion */}
          <div className="card hover:border-google-yellow transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-google-yellow-light text-gray-900 flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Reputazione e Fiducia Immediata
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Un'attività con centinaia di recensioni positive converte i visitatori in clienti a tassi tripli rispetto a concorrenti con poche o vecchie opinioni.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 text-xs font-semibold text-gray-800 flex items-center gap-1.5">
              <span>Fiducia al 100% prima della visita</span>
            </div>
          </div>
        </div>

        {/* AI Prompt Example Box */}
        <div className="mt-12 bg-gray-900 text-white rounded-3xl p-6 sm:p-8 border border-gray-800 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-google-blue/20 text-google-blue flex items-center justify-center shrink-0 border border-google-blue/40">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-google-blue">
                  Come l'IA sceglie il tuo locale:
                </div>
                <div className="text-lg font-semibold text-gray-100 mt-1 italic">
                  "Ciao Gemini, trova un ottimo studio dentistico / ristorante vicino a me con ottime opinioni."
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 text-xs text-gray-200 font-medium shrink-0">
              ⚡ Risposta AI: <span className="text-google-green font-bold">Consiglia chi usa le Card NFC CSD Station</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
