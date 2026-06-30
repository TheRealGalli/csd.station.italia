import { useState, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Sparkles, Coins, ShieldCheck, ArrowRight, ExternalLink, Bot, MessageSquare, Code, Settings } from "lucide-react";

interface GemDemo {
  id: string;
  name: string;
  role: string;
  prompt: string;
  response: string;
  icon: any;
}

const gemDemos: GemDemo[] = [
  {
    id: "support",
    name: "Gems Customer Care",
    role: "Supporto Clienti Automatico",
    prompt: "Come posso gestire un reso per un cliente che ha superato i 14 giorni ma ha un prodotto difettoso?",
    response: "In base alle tue policy per i prodotti difettosi, puoi procedere alla sostituzione in garanzia anche oltre i 14 giorni. Chiedi al cliente una foto del difetto e genera l'etichetta di spedizione prepagata. Ecco il template di risposta da inviare...",
    icon: MessageSquare,
  },
  {
    id: "marketing",
    name: "Gems Copywriter",
    role: "Creazione Contenuti & SEO",
    prompt: "Scrivi un post LinkedIn per lanciare la nostra nuova automazione AI per la fatturazione.",
    response: "🚀 Stanco di perdere 5 ore a settimana sulla fatturazione? Ecco come abbiamo automatizzato l'intero processo per un nostro cliente usando l'AI, riducendo gli errori al 0%... [Continua con la struttura AIDA]",
    icon: Sparkles,
  },
  {
    id: "operations",
    name: "Gems Analyst",
    role: "Analisi Dati & Report",
    prompt: "Estrai i punti chiave da questo report trimestrale di 40 pagine evidenziando i colli di bottiglia.",
    response: "Analisi completata. I 3 colli di bottiglia principali sono: 1) Tempi di approvazione dei preventivi (media 4.2 giorni), 2) Onboarding manuale dei partner, 3) Mancata sincronizzazione del CRM con la logistica.",
    icon: Settings,
  },
];

export const GromitSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.15 });
  const [activeGem, setActiveGem] = useState<string>("support");
  const [typedResponse, setTypedResponse] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const currentGem = gemDemos.find((g) => g.id === activeGem) || gemDemos[0];

  useEffect(() => {
    setTypedResponse("");
    setIsTyping(true);
    let index = 0;
    const text = currentGem.response;
    
    // Simulate streaming typing effect
    const interval = setInterval(() => {
      if (index < text.length) {
        setTypedResponse((prev) => prev + text.charAt(index));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [activeGem, currentGem.response]);

  return (
    <section id="gromit" className="section bg-gray-50 border-y border-gray-100" ref={sectionRef as any}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className={`section-header ${isVisible ? "animate-fade-in-up" : "reveal-hidden"}`}>
          <span className="section-tag bg-google-blue-light text-google-blue flex items-center gap-1">
            <Bot className="w-3.5 h-3.5" />
            Il Nostro Progetto
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
            Incontra <span className="text-google-blue">Gromit.me</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Assistenti AI Plug-and-Play su misura per il tuo business. Gemini Gems specializzati, pronti all'uso e garantiti a vita.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Features Column (Left) */}
          <div className={`lg:col-span-5 flex flex-col gap-6 ${isVisible ? "animate-fade-in-up" : "reveal-hidden"}`}>
            
            {/* Feature 1 */}
            <div className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-google-blue-light flex items-center justify-center text-google-blue">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">AI Plug-and-Play</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Attiva il tuo assistente specializzato in 2 minuti direttamente all'interno della tua console Gemini. Nessuna API complessa da configurare, nessun codice.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-google-yellow-light flex items-center justify-center text-google-yellow">
                <Coins className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Costo Una Tantum</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Elimina gli abbonamenti mensili ricorrenti. Paghi solo una volta per il setup personalizzato e l'assistente rimane tuo per sempre, senza costi nascosti.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-google-green-light flex items-center justify-center text-google-green">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Zero Trattamento Dati</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  La tua sicurezza è al primo posto. Le conversazioni avvengono nel tuo ambiente sicuro: i tuoi dati non vengono letti, salvati o utilizzati per addestrare modelli AI esterni.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-2">
              <a
                href="https://gromit.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-google-blue hover:bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                Scopri Gromit.me
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Interactive Showcase (Right) */}
          <div className={`lg:col-span-7 ${isVisible ? "animate-scale-in delay-200" : "reveal-hidden"}`}>
            <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
              
              {/* Window Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-150 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                  <span className="w-3 h-3 rounded-full bg-green-400"></span>
                  <span className="ml-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Gemini Gems Simulator</span>
                </div>
                <span className="text-xs text-google-blue font-medium bg-google-blue-light px-2 py-0.5 rounded-full">
                  Live Preview
                </span>
              </div>

              {/* Tabs for Gems selection */}
              <div className="flex border-b border-gray-100 bg-gray-50/50 p-2 gap-2">
                {gemDemos.map((gem) => {
                  const Icon = gem.icon;
                  return (
                    <button
                      key={gem.id}
                      onClick={() => setActiveGem(gem.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                        activeGem === gem.id
                          ? "bg-white text-google-blue shadow-sm border border-gray-100"
                          : "text-gray-500 hover:text-gray-800 hover:bg-gray-100/50"
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${activeGem === gem.id ? "text-google-blue" : "text-gray-400"}`} />
                      {gem.name}
                    </button>
                  );
                })}
              </div>

              {/* Chat View */}
              <div className="p-6 flex flex-col gap-4 min-h-[300px] bg-gray-50/30">
                
                {/* Role/Subtitle */}
                <div className="text-xs text-gray-500 border-b border-gray-100 pb-2 flex justify-between items-center">
                  <span>Ruolo configurato: <strong className="text-gray-700">{currentGem.role}</strong></span>
                  <span className="text-[10px] text-gray-400">Attivo a vita</span>
                </div>

                {/* User Input Prompt Bubble */}
                <div className="flex flex-col gap-1 max-w-[85%] self-end">
                  <span className="text-[10px] text-gray-400 self-end mr-1">Tu</span>
                  <div className="bg-google-blue text-white rounded-2xl rounded-tr-none px-4 py-3 text-sm shadow-sm">
                    {currentGem.prompt}
                  </div>
                </div>

                {/* AI Response Bubble */}
                <div className="flex flex-col gap-1 max-w-[85%] self-start mt-2">
                  <div className="flex items-center gap-1.5 ml-1">
                    <span className="w-2 h-2 rounded-full bg-google-green animate-pulse"></span>
                    <span className="text-[10px] text-google-blue font-bold uppercase tracking-wider">{currentGem.name}</span>
                  </div>
                  <div className="bg-white border border-gray-150 text-gray-800 rounded-2xl rounded-tl-none px-4 py-3 text-sm shadow-sm min-h-[80px]">
                    <p className="leading-relaxed whitespace-pre-line">
                      {typedResponse}
                      {isTyping && <span className="inline-block w-1.5 h-4 bg-google-blue ml-0.5 animate-pulse">|</span>}
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
