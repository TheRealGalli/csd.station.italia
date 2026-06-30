import { useState, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Sparkles, Coins, ShieldCheck, ExternalLink, Bot, MessageSquare, Scale, Home, ArrowRight } from "lucide-react";

interface GemDemo {
  id: string;
  name: string;
  role: string;
  description: string;
  prompt: string;
  response: string;
  icon: any;
}

const gemDemos: GemDemo[] = [
  {
    id: "marketing",
    name: "Gems Copy & Home Staging",
    role: "Creazione Annunci & Valorizzazione",
    description: "Ottimizza annunci di vendita, descrizioni social e suggerimenti di allestimento visivo.",
    prompt: "Scrivi un annuncio immobiliare persuasivo per un trilocale ristrutturato in centro a Firenze con terrazzo, evidenziando il valore storico e la luminosità.",
    response: "✨ NUOVA OPPORTUNITÀ NEL CUORE DI FIRENZE\n\nNel cuore pulsante della città, a pochi passi dai monumenti storici, proponiamo un luminoso trilocale finemente ristrutturato.\n\n🏡 I Punti di Forza:\n• Luminosità straordinaria: grazie alla doppia esposizione.\n• Terrazzo privato: perfetto per colazioni all'aperto con vista sui tetti storici.\n• Finiture di pregio: pavimenti in parquet e dettagli in pietra serena.\n\n[Clicca per scaricare il template completo configurato]",
    icon: Home,
  },
  {
    id: "compliance",
    name: "Gems Legal & Compliance",
    role: "Verifica Normative & Contratti",
    description: "Supporto sulle leggi italiane ed europee, conformità catastale e modulistica.",
    prompt: "Quali sono gli obblighi di allegazione dell'attestato di prestazione energetica (APE) nei contratti di locazione in Italia?",
    response: "Conformemente alla normativa italiana (D.Lgs. 192/2005 e successive modifiche):\n1. L'APE deve essere obbligatoriamente allegato al contratto di locazione a pena di sanzione amministrativa (da 1.000€ a 4.000€).\n2. Nel testo contrattuale va inserita una clausola in cui il conduttore dichiara di aver ricevuto le informazioni e la documentazione comprensiva dell'APE.\n3. La classe energetica e l'indice di prestazione devono essere indicati in tutti gli annunci commerciali.",
    icon: Scale,
  },
  {
    id: "sales",
    name: "Gems Acquisizione & Clienti",
    role: "Supporto Trattative e Strategia",
    description: "Superamento obiezioni, script di telefonata ed e-mail per acquisire nuovi mandati.",
    prompt: "Fornisci uno script di risposta a un proprietario privato che rifiuta di affidare il mandato in esclusiva all'agenzia.",
    response: "Ecco la strategia consigliata per superare l'obiezione sull'esclusiva:\n\n💬 Script di risposta:\n'Capisco perfettamente il suo punto di vista, signor Rossi. Spesso si pensa che dare la casa a più agenzie aumenti le chance di vendita. In realtà, l'esclusiva ci permette di investire il 100% del nostro budget marketing su canali premium e di coordinare un'unica strategia di prezzo, evitando che l'immobile si svaluti apparendo a prezzi diversi su vari portali. Le propongo un accordo di prova di 60 giorni per dimostrarle il nostro metodo...'",
    icon: MessageSquare,
  },
];

export const GromitSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.15 });
  const [activeGem, setActiveGem] = useState<string>("marketing");
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
    }, 12);

    return () => clearInterval(interval);
  }, [activeGem, currentGem.response]);

  return (
    <section id="gromit" className="section bg-gray-50 border-y border-gray-100" ref={sectionRef as any}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className={`section-header ${isVisible ? "animate-fade-in-up" : "reveal-hidden"}`}>
          <span className="section-tag bg-google-blue-light text-google-blue flex items-center gap-1.5">
            <Bot className="w-3.5 h-3.5" />
            Gromit.me by CSD Station
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
            Assistenti AI <span className="text-google-blue">Plug-and-Play</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Configurazioni di Google Gems pronte all'uso per la tua attività. Zero codice, zero abbonamenti, configurate appositamente per ogni settore aziendale.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Features Column (Left) */}
          <div className={`lg:col-span-5 flex flex-col gap-6 ${isVisible ? "animate-fade-in-up" : "reveal-hidden"}`}>
            
            {/* Sector Highlight Info */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-google-blue-light/30 to-google-green-light/20 border border-google-blue/10">
              <span className="text-xs font-bold text-google-blue uppercase tracking-wider block mb-1">Disponibile Ora</span>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Settore Immobiliare (26 Gems)</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Il primo catalogo completo studiato per le agenzie immobiliari italiane. Dalla creazione di contenuti e allestimento home staging fino alla compliance legale e fiscale basata sulle normative nazionali ed europee.
              </p>
            </div>

            {/* Feature 1: Plug-and-Play */}
            <div className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-google-blue-light flex items-center justify-center text-google-blue">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">Integrazione Nativa</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Importa le configurazioni dei Gems direttamente all'interno del tuo account Gemini. Nessuna API esterna da configurare e nessuna piattaforma terza richiesta.
                </p>
              </div>
            </div>

            {/* Feature 2: Costo una tantum */}
            <div className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-google-yellow-light flex items-center justify-center text-google-yellow">
                <Coins className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">Costo Una Tantum, Licenza a Vita</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Paga una sola volta per il pacchetto di configurazioni del tuo settore. Gli assistenti rimangono memorizzati nel tuo account Google per sempre, senza canoni mensili.
                </p>
              </div>
            </div>

            {/* Feature 3: No data training */}
            <div className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-google-green-light flex items-center justify-center text-google-green">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">Privacy di Livello Aziendale</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Le conversazioni avvengono integralmente all'interno della tua console protetta di Google. Nessun dato riservato dell'agenzia o dei clienti viene condiviso o archiviato esternamente.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-2">
              <a
                href="https://gromit.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-google-blue hover:bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-sm"
              >
                Scopri il Catalogo Gems su Gromit.me
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
                  <span className="ml-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Catalogo Gems - Hub Immobiliare</span>
                </div>
                <span className="text-[10px] text-google-blue font-semibold bg-google-blue-light px-2 py-0.5 rounded-full">
                  26 Assistenti
                </span>
              </div>

              {/* Tabs for Gems selection */}
              <div className="flex flex-wrap border-b border-gray-100 bg-gray-50/50 p-2 gap-1">
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
              <div className="p-6 flex flex-col gap-4 min-h-[340px] bg-gray-50/30">
                
                {/* Role/Subtitle */}
                <div className="text-xs text-gray-500 border-b border-gray-100 pb-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span>Ruolo: <strong className="text-gray-700">{currentGem.role}</strong></span>
                  <span className="text-[10px] text-gray-400 italic">{currentGem.description}</span>
                </div>

                {/* User Input Prompt Bubble */}
                <div className="flex flex-col gap-1 max-w-[85%] self-end">
                  <span className="text-[10px] text-gray-400 self-end mr-1">Agente Immobiliare</span>
                  <div className="bg-google-blue text-white rounded-2xl rounded-tr-none px-4 py-3 text-xs sm:text-sm shadow-sm">
                    {currentGem.prompt}
                  </div>
                </div>

                {/* AI Response Bubble */}
                <div className="flex flex-col gap-1 max-w-[85%] self-start mt-2">
                  <div className="flex items-center gap-1.5 ml-1">
                    <span className="w-2 h-2 rounded-full bg-google-green animate-pulse"></span>
                    <span className="text-[10px] text-google-blue font-bold uppercase tracking-wider">{currentGem.name}</span>
                  </div>
                  <div className="bg-white border border-gray-150 text-gray-800 rounded-2xl rounded-tl-none px-4 py-3 text-xs sm:text-sm shadow-sm min-h-[100px]">
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
