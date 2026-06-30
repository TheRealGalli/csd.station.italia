import { useState, useEffect, useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Sparkles, Coins, ShieldCheck, ExternalLink, Bot, MessageSquare, ArrowRight, RefreshCw, Send } from "lucide-react";

// Import local assets
import roomOriginal from "@/assets/room-original.jpg";
import roomModern from "@/assets/room-modern.png";
import roomDali from "@/assets/room-dali.png";

interface Message {
  sender: "user" | "ai";
  text: string;
  image?: string;
  imageLabel?: string;
}

export const GromitSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.15 });
  const [chatStep, setChatStep] = useState<number>(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Initial chat setup
  useEffect(() => {
    resetChat();
  }, []);

  const resetChat = () => {
    setChatStep(0);
    setIsTyping(true);
    setMessages([]);
    
    // Simulate first user message and AI response
    setTimeout(() => {
      setMessages([
        {
          sender: "user",
          text: "Sono ora in visita con una cliente. Voglio farle vedere come questa stanza può diventare una camera da letto moderna.",
          image: roomOriginal,
          imageLabel: "Foto Originale dello Stato Attuale"
        }
      ]);
      
      setIsTyping(true);
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            sender: "ai",
            text: "Ecco un'anteprima dell'allestimento virtuale per questa camera. Ho mantenuto i caratteristici soffitti con travi in legno a vista e il pavimento in cotto, integrando un letto moderno dai toni caldi, una poltrona di design e una parete attrezzata in legno coordinata per valorizzare al massimo la luminosità dell'ambiente.",
            image: roomModern,
            imageLabel: "Allestimento Virtuale 1: Camera Moderna"
          }
        ]);
        setIsTyping(false);
        setChatStep(1);
      }, 1500);
    }, 500);
  };

  const handleNextStep = () => {
    if (chatStep !== 1) return;
    
    setIsTyping(false);
    // User response
    setMessages(prev => [
      ...prev,
      {
        sender: "user",
        text: "La signora mi sta dicendo che le piace molto la camera, ma cercava qualcosa di un po' più eccentrico. Mi dice anche che le piace molto Dalí."
      }
    ]);
    
    setChatStep(2);
    setIsTyping(true);
    
    // AI response in Dali style
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: "ai",
          text: "Ricevuto! Con il Gems Home Staging possiamo spingerci oltre. Ecco una proposta eclettica ispirata al surrealismo di Salvador Dalí: gli orologi molli si fondono sui mobili, la poltrona assume forme organiche e la stanza si trasforma in un'opera d'arte onirica. Perfetto per conquistare una cliente dai gusti artistici e non convenzionali!",
          image: roomDali,
          imageLabel: "Allestimento Virtuale 2: Stile Salvador Dalí"
        }
      ]);
      setIsTyping(false);
      setChatStep(3);
    }, 2000);
  };

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
            Gems <span className="text-google-blue">Home Staging</span> in Azione
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Configurazioni di Google Gems pronte all'uso per la tua attività. Guarda come un agente immobiliare usa il nostro Gem per allestire istantaneamente un immobile durante una visita reale.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Features Column (Left) */}
          <div className={`lg:col-span-5 flex flex-col gap-6 ${isVisible ? "animate-fade-in-up" : "reveal-hidden"}`}>
            
            {/* Sector Highlight Info */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-google-blue-light/30 to-google-green-light/20 border border-google-blue/10">
              <span className="text-xs font-bold text-google-blue uppercase tracking-wider block mb-1">Esempio d'Uso Real Estate</span>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Da foto reale ad allestimento 3D</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                I nostri 26 assistenti virtuali del pacchetto <strong>Settore Immobiliare</strong> fungono da Cicerone e assistente operativo, aiutandoti sia nel superamento delle obiezioni che nella valorizzazione visiva degli ambienti.
              </p>
            </div>

            {/* Feature 1: Plug-and-Play */}
            <div className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-google-blue-light flex items-center justify-center text-google-blue">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">AI Plug-and-Play Nativa</h3>
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
                <h3 className="text-base font-bold text-gray-900 mb-1">Privacy e Sicurezza Google</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Le conversazioni avvengono integralmente all'interno della tua console protetta di Google. I dati e le immagini non vengono condivisi o archiviati esternamente.
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
                  <span className="ml-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Simulatore Chat - Gems Home Staging</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={resetChat} 
                    className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-google-blue transition-colors duration-200"
                    title="Riavvia Chat"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Reset
                  </button>
                  <span className="text-[10px] text-google-blue font-semibold bg-google-blue-light px-2 py-0.5 rounded-full">
                    Live Demo
                  </span>
                </div>
              </div>

              {/* Chat View */}
              <div className="p-6 flex flex-col gap-4 max-h-[480px] min-h-[400px] overflow-y-auto bg-gray-50/30">
                
                {/* Intro Notification */}
                <div className="text-[10px] text-gray-400 text-center py-1 border-b border-gray-100">
                  Avvio della sessione con il Google Gem configurato per il Settore Immobiliare
                </div>

                {/* Render Messages */}
                {messages.map((msg, index) => (
                  <div 
                    key={index}
                    className={`flex flex-col gap-1 max-w-[85%] ${
                      msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                    }`}
                  >
                    <span className="text-[9px] text-gray-400 px-1">
                      {msg.sender === "user" ? "Agente Immobiliare" : "Gems Home Staging"}
                    </span>
                    
                    <div 
                      className={`rounded-2xl px-4 py-3 text-xs sm:text-sm shadow-sm ${
                        msg.sender === "user" 
                          ? "bg-google-blue text-white rounded-tr-none" 
                          : "bg-white border border-gray-150 text-gray-800 rounded-tl-none"
                      }`}
                    >
                      <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                      
                      {msg.image && (
                        <div className="mt-3 overflow-hidden rounded-lg border border-gray-250/20 bg-gray-900/5">
                          <img 
                            src={msg.image} 
                            alt={msg.imageLabel} 
                            className="w-full max-h-[220px] object-cover hover:scale-[1.02] transition-transform duration-300"
                          />
                          {msg.imageLabel && (
                            <div className={`text-[10px] p-2 text-center border-t ${
                              msg.sender === "user" 
                                ? "bg-blue-700/30 text-blue-100 border-blue-600/30" 
                                : "bg-gray-50 text-gray-500 border-gray-100"
                            }`}>
                              {msg.imageLabel}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* AI Typing Indicator */}
                {isTyping && (
                  <div className="flex flex-col gap-1 max-w-[85%] self-start items-start">
                    <span className="text-[9px] text-gray-400 px-1">Gems Home Staging</span>
                    <div className="bg-white border border-gray-150 text-gray-800 rounded-2xl rounded-tl-none px-4 py-3 text-xs shadow-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-google-blue animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-google-blue animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-google-blue animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Chat Input / Action Bar */}
              <div className="p-4 bg-gray-50 border-t border-gray-150 flex items-center justify-between gap-4">
                {chatStep === 1 ? (
                  <button
                    onClick={handleNextStep}
                    className="w-full flex items-center justify-between px-4 py-3 bg-google-blue hover:bg-blue-600 text-white font-semibold rounded-xl text-xs shadow-md transition-all duration-300 animate-pulse"
                  >
                    <span>Fai richiesta aggiuntiva (Stile Salvador Dalí)</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                ) : chatStep === 2 || isTyping ? (
                  <div className="w-full text-center text-xs text-gray-400 italic py-2">
                    Il Gem sta elaborando la risposta...
                  </div>
                ) : chatStep === 3 ? (
                  <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 py-1">
                    <span className="text-xs text-google-green font-semibold">✓ Allestimenti completati con successo!</span>
                    <button 
                      onClick={resetChat} 
                      className="text-xs text-google-blue font-semibold hover:underline flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" /> Riprova la demo
                    </button>
                  </div>
                ) : null}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
