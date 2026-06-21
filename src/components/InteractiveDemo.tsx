import { useState, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Mail, Calendar, FileSpreadsheet, MessageSquare, Code, Play, RefreshCw, Send, Sparkles, CheckCircle2 } from "lucide-react";

interface Step {
  type: string;
  text: string;
  sender?: string;
  meta?: string;
}

interface DemoTab {
  id: string;
  app: string;
  tag: string;
  title: string;
  description: string;
  colorClass: string;
  hoverClass: string;
  activeClass: string;
  iconColor: string;
  icon: any;
  steps: Step[];
}

const demoTabs: DemoTab[] = [
  {
    id: "gmail",
    app: "Gmail",
    tag: "Automazione Email",
    title: "Auto-Responder con AI",
    description: "Invia risposte e stime di tempi/costi elaborate dall'AI all'istante, non appena un cliente invia una richiesta via email.",
    colorClass: "border-google-red text-google-red bg-google-red-light/30",
    hoverClass: "hover:border-google-red/40 hover:bg-google-red-light/10",
    activeClass: "border-google-red bg-google-red-light/20 text-google-red shadow-sm",
    iconColor: "text-google-red bg-google-red-light",
    icon: Mail,
    steps: [
      { 
        type: "inbound", 
        sender: "cliente@azienda.it",
        meta: "Oggetto: Info Automazione",
        text: "Salve, vorrei ottimizzare i nostri flussi di lavoro aziendali. È possibile avere maggiori informazioni e un preventivo indicativo?" 
      },
      { 
        type: "system", 
        text: "Analisi AI & Scrittura bozza con Apps Script..." 
      },
      { 
        type: "outbound", 
        sender: "CSD Station Italia",
        meta: "Oggetto: Re: Info Automazione",
        text: "Ciao! Grazie per il messaggio. Le nostre soluzioni basate su Google Workspace e AI possono ridurre i tempi di gestione dell'80%. Ecco il nostro catalogo..." 
      }
    ]
  },
  {
    id: "calendar",
    app: "Google Calendar",
    tag: "Gestione Calendario",
    title: "Smart Booking & Scheduling",
    description: "Sincronizza prenotazioni e disponibilità, creando automaticamente inviti su Google Meet e riservando gli slot in agenda.",
    colorClass: "border-google-blue text-google-blue bg-google-blue-light/30",
    hoverClass: "hover:border-google-blue/40 hover:bg-google-blue-light/10",
    activeClass: "border-google-blue bg-google-blue-light/20 text-google-blue shadow-sm",
    iconColor: "text-google-blue bg-google-blue-light",
    icon: Calendar,
    steps: [
      { 
        type: "inbound", 
        sender: "Prenotazione Portale",
        text: "Nuova richiesta appuntamento ricevuta:\n📅 Giovanni Rossi - 25 Giugno, ore 15:30" 
      },
      { 
        type: "system", 
        text: "Verifica disponibilità e generazione link Google Meet..." 
      },
      { 
        type: "outbound", 
        sender: "Google Calendar",
        text: "Appuntamento confermato! Invito inviato con link Meet e slot riservato nell'agenda di Carlo Galli." 
      }
    ]
  },
  {
    id: "sheets",
    app: "Forms & Sheets",
    tag: "Database & Pipeline",
    title: "Data Entry Automatico",
    description: "Raccogli dati dai moduli e caricali in tempo reale su Google Sheets, organizzando i lead in modo strutturato.",
    colorClass: "border-purple-500 text-purple-600 bg-purple-50",
    hoverClass: "hover:border-purple-300 hover:bg-purple-50/50",
    activeClass: "border-purple-600 bg-purple-50 text-purple-700 shadow-sm",
    iconColor: "text-purple-600 bg-purple-100",
    icon: FileSpreadsheet,
    steps: [
      { 
        type: "inbound", 
        sender: "Google Forms",
        text: "Inviato modulo: Giovanni Rossi, Rossi Consulting, budget €500-1000" 
      },
      { 
        type: "system", 
        text: "Inserimento riga nel database del foglio di calcolo..." 
      },
      { 
        type: "sheets-row", 
        text: "Nome: G. Rossi | Azienda: Rossi Consulting | Budget: €500-1000 | Status: QUALIFICATO" 
      }
    ]
  },
  {
    id: "chat",
    app: "Google Chat",
    tag: "Notifiche Team",
    title: "Avvisi Lead in Tempo Reale",
    description: "Ricevi notifiche istantanee all'interno di Google Chat non appena viene catturato o qualificato un nuovo lead.",
    colorClass: "border-google-green text-google-green bg-google-green-light/30",
    hoverClass: "hover:border-google-green/40 hover:bg-google-green-light/10",
    activeClass: "border-google-green bg-google-green-light/20 text-google-green shadow-sm",
    iconColor: "text-google-green bg-google-green-light",
    icon: MessageSquare,
    steps: [
      { 
        type: "inbound", 
        sender: "Notifica Sistema",
        text: "Un cliente ha appena compilato il modulo di contatto sul sito." 
      },
      { 
        type: "system", 
        text: "Invio avviso nel canale Google Chat del team vendite..." 
      },
      { 
        type: "chat-bot", 
        sender: "🤖 Bot Notifiche",
        text: "🚨 NUOVO CLIENTE QUALIFICATO!\n👤 Giovanni Rossi (Rossi Consulting)\n📅 Richiesta: Automazione CRM\n💬 Azione: Contatta ora!" 
      }
    ]
  },
  {
    id: "script",
    app: "Apps Script",
    tag: "Flussi Documentali",
    title: "Generazione PDF & Contratti",
    description: "Genera preventivi e contratti PDF a partire dai dati inseriti, salvali su Drive e inviali via email con allegati dedicati.",
    colorClass: "border-google-yellow text-amber-700 bg-google-yellow-light/30",
    hoverClass: "hover:border-google-yellow/40 hover:bg-google-yellow-light/10",
    activeClass: "border-google-yellow bg-google-yellow-light/20 text-google-yellow shadow-sm",
    iconColor: "text-amber-600 bg-google-yellow-light",
    icon: Code,
    steps: [
      { 
        type: "inbound", 
        sender: "Workflow Preventivi",
        text: "Trigger: Generazione preventivo richiesta per Rossi Consulting" 
      },
      { 
        type: "system", 
        text: "Creazione Documento da template ed esportazione PDF..." 
      },
      { 
        type: "pdf-doc", 
        text: "Preventivo_Rossi_Consulting.pdf" 
      }
    ]
  }
];

export const InteractiveDemo = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.15 });
  const [activeTab, setActiveTab] = useState("gmail");
  const [stepIndex, setStepIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const activeDemo = demoTabs.find((t) => t.id === activeTab) || demoTabs[0];

  useEffect(() => {
    setStepIndex(0);
    setIsTyping(true);

    const timer1 = setTimeout(() => {
      setStepIndex(1);
      setIsTyping(true);
    }, 1000);

    const timer2 = setTimeout(() => {
      setStepIndex(2);
      setIsTyping(false);
    }, 2200);

    const timer3 = setTimeout(() => {
      setStepIndex(3);
    }, 3400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [activeTab]);

  return (
    <section id="demo" className="section" ref={sectionRef as any}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className={`${isVisible ? "animate-fade-in-up" : "reveal-hidden"}`}>
          {/* Header */}
          <div className="section-header text-center mb-12">
            <span className="section-tag bg-google-green-light text-google-green">
              Automazione Nativa
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 mb-3">
              Tutto Integrato, <span className="text-google-green">Senza Plugin Esterni</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Perché pagare costosi strumenti esterni come Spoki o N8N? Con l'infrastruttura Google Workspace puoi automatizzare i tuoi flussi di lavoro alla radice, in modo nativo, rapido e sicuro.
            </p>
          </div>

          {/* Interactive Playground */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Side: Tabs */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {demoTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-start gap-4 p-4 rounded-2xl border text-left transition-all duration-300 ${
                      isActive ? tab.activeClass : `border-gray-100 bg-white ${tab.hoverClass}`
                    }`}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${tab.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold tracking-wider uppercase opacity-80">
                        {tab.tag}
                      </span>
                      <h3 className="text-base font-bold text-gray-900 mb-1 flex items-center gap-1.5">
                        {tab.title}
                        {isActive && <Sparkles className="w-3.5 h-3.5 animate-pulse" />}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {tab.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Side: Smartphone Simulator */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="relative w-[300px] h-[580px] bg-gray-900 rounded-[44px] p-3 shadow-2xl border-4 border-gray-800/80 flex flex-col overflow-hidden">
                {/* Phone Notch/Speaker */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-20 flex items-center justify-center">
                  <div className="w-12 h-1 bg-gray-800 rounded-full mb-1"></div>
                </div>

                {/* Simulated Screen */}
                <div className="w-full h-full bg-slate-50 rounded-[34px] overflow-hidden flex flex-col relative border border-gray-800/20">
                  {/* Status Bar */}
                  <div className="h-7 bg-white/95 px-5 flex items-center justify-between text-[10px] font-semibold text-gray-500 border-b border-gray-100">
                    <span>13:02</span>
                    <div className="flex items-center gap-1">
                      <span>LTE</span>
                      <div className="w-4 h-2 border border-gray-400 rounded-sm p-[1px] flex items-center">
                        <div className="w-full h-full bg-gray-500 rounded-2xs"></div>
                      </div>
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="bg-white px-4 py-2 border-b border-gray-100 flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                      activeTab === "gmail" ? "bg-google-red" : 
                      activeTab === "calendar" ? "bg-google-blue" :
                      activeTab === "sheets" ? "bg-emerald-600" :
                      activeTab === "chat" ? "bg-google-green" : "bg-amber-500"
                    }`}>
                      {activeTab === "gmail" && <Mail className="w-4 h-4" />}
                      {activeTab === "calendar" && <Calendar className="w-4 h-4" />}
                      {activeTab === "sheets" && <FileSpreadsheet className="w-4 h-4" />}
                      {activeTab === "chat" && <MessageSquare className="w-4 h-4" />}
                      {activeTab === "script" && <Code className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 leading-tight">
                        {activeDemo.app}
                      </h4>
                      <span className="text-[9px] text-google-green font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-google-green inline-block animate-ping"></span>
                        Automazione Attiva
                      </span>
                    </div>
                  </div>

                  {/* Message Container / Log Feed */}
                  <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-3.5 bg-slate-50/50">
                    {/* Step 1: Inbound Trigger */}
                    {stepIndex >= 1 && (
                      <div className="flex flex-col gap-1.5 max-w-[85%] self-start animate-fade-in-up">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-bold text-gray-400">
                            {activeDemo.steps[0].sender || "Inbound"}
                          </span>
                        </div>
                        <div className="bg-white border border-gray-100 text-gray-800 p-3 rounded-2xl rounded-tl-sm text-xs shadow-sm whitespace-pre-line leading-relaxed">
                          {activeDemo.steps[0].text}
                        </div>
                      </div>
                    )}

                    {/* Step 2: System Processing Indicator */}
                    {stepIndex >= 2 && (
                      <div className="bg-google-blue-light/50 text-google-blue border border-google-blue/10 px-3 py-1.5 rounded-full text-[9px] font-semibold flex items-center gap-1.5 self-center my-1 animate-fade-in-up shadow-sm">
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        {activeDemo.steps[1].text}
                      </div>
                    )}

                    {/* Step 3: Outbound Action Result */}
                    {stepIndex >= 3 && (
                      <div className="flex flex-col gap-1.5 max-w-[85%] self-end animate-scale-in">
                        <div className="flex items-center justify-end gap-1.5">
                          <span className="text-[9px] font-bold text-gray-400">
                            {activeDemo.steps[2].sender || "System"}
                          </span>
                          <CheckCircle2 className="w-3 h-3 text-google-green" />
                        </div>

                        {/* Rendering based on outcome layout */}
                        {activeDemo.steps[2].type === "sheets-row" ? (
                          <div className="bg-white border border-emerald-100 rounded-2xl rounded-tr-sm overflow-hidden shadow-md text-[10px] w-full max-w-[240px]">
                            <div className="bg-emerald-600 text-white p-1.5 font-semibold text-center text-[9px] uppercase tracking-wider">
                              Google Sheet Row Added
                            </div>
                            <div className="p-3 font-mono text-emerald-800 bg-emerald-50/50 leading-relaxed whitespace-pre-line">
                              {activeDemo.steps[2].text}
                            </div>
                          </div>
                        ) : activeDemo.steps[2].type === "chat-bot" ? (
                          <div className="bg-white border-l-4 border-google-green text-gray-800 p-3 rounded-r-2xl rounded-bl-2xl text-xs shadow-md whitespace-pre-line leading-relaxed">
                            {activeDemo.steps[2].text}
                          </div>
                        ) : activeDemo.steps[2].type === "pdf-doc" ? (
                          <div className="border border-google-yellow/20 bg-google-yellow-light/20 p-3 rounded-2xl flex items-center gap-3 text-xs text-amber-900 shadow-md">
                            <div className="w-8 h-8 rounded-lg bg-google-red/10 flex items-center justify-center text-google-red flex-shrink-0">
                              <FileSpreadsheet className="w-4 h-4" />
                            </div>
                            <div className="overflow-hidden">
                              <p className="font-bold truncate text-[11px]">{activeDemo.steps[2].text}</p>
                              <span className="text-[9px] opacity-75 font-semibold">Drive PDF Document</span>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-google-blue text-white p-3 rounded-2xl rounded-tr-sm text-xs shadow-md whitespace-pre-line leading-relaxed">
                            {activeDemo.steps[2].meta && (
                              <p className="text-[9px] font-bold opacity-80 mb-1 border-b border-white/20 pb-1">
                                {activeDemo.steps[2].meta}
                              </p>
                            )}
                            {activeDemo.steps[2].text}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Typing Indicator */}
                    {isTyping && stepIndex < 3 && (
                      <div className="bg-white border border-gray-100 p-2.5 rounded-full self-start flex items-center gap-1 shadow-sm mt-1">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-0"></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-300"></div>
                      </div>
                    )}
                  </div>

                  {/* Input Simulation Footer */}
                  <div className="bg-white px-3.5 py-2.5 border-t border-gray-100 flex items-center gap-2">
                    <div className="flex-1 bg-gray-50 border border-gray-200 rounded-full py-1.5 px-3.5 text-[10px] text-gray-400 select-none">
                      Automazione in corso...
                    </div>
                    <button 
                      onClick={() => {
                        setStepIndex(0);
                        setIsTyping(true);
                        const t1 = setTimeout(() => { setStepIndex(1); setIsTyping(true); }, 1000);
                        const t2 = setTimeout(() => { setStepIndex(2); setIsTyping(false); }, 2200);
                        const t3 = setTimeout(() => { setStepIndex(3); }, 3400);
                      }} 
                      className="w-7 h-7 rounded-full bg-google-blue flex items-center justify-center text-white hover:bg-blue-600 transition-colors shadow-sm"
                      aria-label="Ricomincia demo"
                    >
                      <Play className="w-3.5 h-3.5" />
                    </button>
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
