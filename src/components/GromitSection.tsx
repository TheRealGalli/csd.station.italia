import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Sparkles, Coins, ShieldCheck, ExternalLink, Bot, Image, PenTool, Scale, ClipboardCheck, PhoneCall, Hammer, ArrowRight, MessageSquare, Home } from "lucide-react";

// Import local assets for Home Staging gameplay
import roomOriginal from "@/assets/room-original.jpg";
import roomModern from "@/assets/room-modern.png";
import roomDali from "@/assets/room-dali.png";

interface ChatMessage {
  sender: "user" | "ai";
  text: string;
  image?: string;
  imageLabel?: string;
}

interface GemTab {
  id: string;
  name: string;
  role: string;
  icon: any;
  messages: ChatMessage[];
}

interface CatalogGem {
  title: string;
  description: string;
  useCase: string;
  icon: any;
  color: string;
  bgColor: string;
}

const best6Gems: CatalogGem[] = [
  {
    title: "Allestimento Immagini",
    description: "Valorizza e arreda virtualmente le foto degli immobili per presentazioni d'impatto.",
    useCase: "Mostrare istantaneamente a un cliente indeciso durante la visita come si presenterà la stanza arredata.",
    icon: Image,
    color: "text-google-blue",
    bgColor: "bg-google-blue-light/50",
  },
  {
    title: "Copywriter Immobiliare",
    description: "Genera testi per annunci persuasivi, post social e descrizioni portali ottimizzate SEO.",
    useCase: "Scrivere un post Instagram e una descrizione per Immobiliare.it partendo solo dalla scheda tecnica dell'immobile.",
    icon: PenTool,
    color: "text-google-red",
    bgColor: "bg-google-red-light/50",
  },
  {
    title: "Contrattualistica & Compliance",
    description: "Supporto legale per conformità dei contratti di locazione/vendita, GDPR e regolamenti locali.",
    useCase: "Redigere clausole contrattuali specifiche o verificare la conformità di un contratto di locazione transitorio.",
    icon: Scale,
    color: "text-google-yellow",
    bgColor: "bg-google-yellow-light/50",
  },
  {
    title: "Filtro Pre-Rogito",
    description: "Verifica e prepara la documentazione necessaria, gli accertamenti e le pratiche per l'atto notarile.",
    useCase: "Creare una check-list automatica di tutti i documenti mancanti da richiedere al venditore prima del rogito.",
    icon: ClipboardCheck,
    color: "text-google-green",
    bgColor: "bg-google-green-light/50",
  },
  {
    title: "Acquisizione Telefonica",
    description: "Fornisce script mirati, gestione delle obiezioni e risposte efficaci per le telefonate a freddo.",
    useCase: "Superare l'obiezione di un privato che non vuole pagare provvigioni o che rifiuta l'esclusiva.",
    icon: PhoneCall,
    color: "text-google-blue",
    bgColor: "bg-google-blue-light/50",
  },
  {
    title: "Ristrutturazioni & Bonus",
    description: "Stima costi di intervento, detrazioni fiscali e conformità alla Direttiva Case Green.",
    useCase: "Calcolare per un potenziale acquirente i costi orientativi per migliorare la classe energetica di un appartamento.",
    icon: Hammer,
    color: "text-google-green",
    bgColor: "bg-google-green-light/50",
  },
];

export const GromitSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [activeTab, setActiveTab] = useState<string>("staging");

  const tabs: GemTab[] = [
    {
      id: "staging",
      name: "Allestimento Foto",
      role: "Allestimento Immagini Immobiliari",
      icon: Image,
      messages: [
        {
          sender: "user",
          text: "Sono ora in visita con una cliente. Voglio farle vedere come questa stanza può diventare una camera da letto moderna.",
          image: roomOriginal,
          imageLabel: "Foto Originale dello Stato Attuale"
        },
        {
          sender: "ai",
          text: "Ecco un'anteprima dell'allestimento virtuale per questa camera. Ho mantenuto i caratteristici soffitti con travi in legno a vista e il pavimento in cotto, integrando un letto moderno dai toni caldi, una poltrona di design e una parete attrezzata in legno coordinata per valorizzare al massimo la luminosità dell'ambiente.",
          image: roomModern,
          imageLabel: "Allestimento Virtuale 1: Camera Moderna"
        },
        {
          sender: "user",
          text: "La signora mi sta dicendo che le piace molto la camera, ma cercava qualcosa di un po' più eccentrico. Mi dice anche che le piace molto Dalí."
        },
        {
          sender: "ai",
          text: "Ricevuto! Con il Gems Home Staging possiamo spingerci oltre. Ecco una proposta eclettica ispirata al surrealismo di Salvador Dalí: gli orologi molli si fondono sui mobili, la poltrona assume forme organiche e la stanza si trasforma in un'opera d'arte onirica. Perfetto per conquistare una cliente dai gusti artistici e non convenzionali!",
          image: roomDali,
          imageLabel: "Allestimento Virtuale 2: Stile Salvador Dalí"
        }
      ]
    },
    {
      id: "copy",
      name: "Copywriter",
      role: "Copywriter Immobiliare",
      icon: PenTool,
      messages: [
        {
          sender: "user",
          text: "Genera una descrizione per un trilocale ristrutturato in centro a Firenze da pubblicare su social e portali."
        },
        {
          sender: "ai",
          text: "Ecco la descrizione ottimizzata per te:\n\n🇮🇹 **Toscana | Firenze Centro Storico**\n✨ *Luminosità, comfort e storia si incontrano in questa splendida dimora ristrutturata.*\n\nProponiamo un trilocale di pregio caratterizzato da soffitti con travi a vista originali e pavimenti in cotto fiorentino. L'appartamento si compone di un'ampia zona giorno open space con cucina a vista, camera matrimoniale padronale e un terrazzo privato che offre una vista impareggiabile sui tetti storici di Firenze.\n\n📍 Ideale sia come residenza privata che come investimento turistico ad alta resa.\n📞 Contattaci per prenotare la tua visita esclusiva."
        }
      ]
    },
    {
      id: "compliance",
      name: "Compliance",
      role: "Contrattualistica & Compliance",
      icon: Scale,
      messages: [
        {
          sender: "user",
          text: "Quali sono gli obblighi di allegazione dell'APE (Attestato Prestazione Energetica) nei contratti d'affitto in Italia?"
        },
        {
          sender: "ai",
          text: "In base alla normativa vigente (D.Lgs. 192/2005 e s.m.i.):\n\n1. **Allegazione obbligatoria**: L'APE deve essere tassativamente allegato a ogni nuovo contratto di locazione di interi immobili (o singole unità) a pena di sanzione pecuniaria amministrativa per le parti (da 1.000€ a 4.000€).\n2. **Clausola specifica**: Nel testo del contratto deve essere inserita una dichiarazione con la quale il conduttore attesta di aver ricevuto le informazioni e la documentazione comprensiva dell'APE.\n3. **Annunci immobiliari**: L'indice di prestazione energetica globale deve essere sempre riportato in tutti gli annunci commerciali di vendita o locazione."
        }
      ]
    },
    {
      id: "phone",
      name: "Telefonate",
      role: "Acquisizione Telefonica",
      icon: PhoneCall,
      messages: [
        {
          sender: "user",
          text: "Un privato al telefono mi dice: 'Non voglio collaborare con agenzie, vendo da solo per non pagare commissioni'."
        },
        {
          sender: "ai",
          text: "Ecco uno script strategico per gestire questa obiezione:\n\n💬 *'Capisco perfettamente il suo punto di vista, signor Rossi. Vendere da soli per risparmiare è una scelta comprensibile. Tuttavia, il nostro lavoro non è solo mettere un annuncio, ma filtrare i curiosi, accertare la capacità finanziaria degli acquirenti con mutui pre-deliberati e gestire tutta la burocrazia legale pre-rogito.\n\nLe propongo questo: posso fare un sopralluogo conoscitivo senza impegno di 15 minuti per mostrarle come lavoriamo e come riusciamo spesso a vendere a un prezzo più alto che compensa ampiamente la nostra provvigione. Che ne dice di domani alle 17:00?'*"
        }
      ]
    },
    {
      id: "prerogito",
      name: "Pre-Rogito",
      role: "Filtro Pre-Rogito",
      icon: ClipboardCheck,
      messages: [
        {
          sender: "user",
          text: "Quali verifiche documentali urgenti devo fare prima di mandare la pratica al notaio?"
        },
        {
          sender: "ai",
          text: "Ecco la check-list pre-rogito per il controllo conformità:\n\n1. **Conformità Urbanistico-Catastale**: Verifica la corrispondenza esatta tra lo stato di fatto dell'immobile, le planimetrie catastali e l'ultimo titolo edilizio abilitativo (licenza, concessione, SCIA/CILA).\n2. **Provenienza**: Atto di acquisto precedente, donazione (con verifica dei rischi di azione di riduzione) o dichiarazione di successione.\n3. **Spese Condominiali**: Richiedi la dichiarazione firmata dall'amministratore di condominio che attesti il saldo di tutte le spese ordinarie e straordinarie del venditore.\n4. **Ispezione Ipotecaria**: Accerta l'assenza di ipoteche volontarie (es. mutui da estinguere), giudiziali o pignoramenti."
        }
      ]
    },
    {
      id: "green",
      name: "Ristrutturazioni & Green",
      role: "Ristrutturazioni & Case Green",
      icon: Hammer,
      messages: [
        {
          sender: "user",
          text: "Un potenziale acquirente è preoccupato per la Direttiva Case Green europea su un immobile in classe G. Cosa gli consiglio?"
        },
        {
          sender: "ai",
          text: "Puoi rassicurare il cliente proponendo i seguenti interventi per il salto di classe (agevolati dai bonus fiscali):\n\n1. **Sostituzione Infissi**: Installazione di serramenti a taglio termico con triplo vetro camera (migliora immediatamente l'isolamento).\n2. **Climatizzazione**: Sostituzione della vecchia caldaia con una pompa di calore ibrida o caldaia a condensazione di classe A.\n3. **Isolamento**: Realizzazione di un cappotto termico interno nelle stanze principali (non richiede interventi condominiali).\n\n*Nota: Ricorda al cliente che questi interventi incrementano il valore commerciale dell'immobile fino al 15-20% e riducono drasticamente i costi in bolletta.*"
        }
      ]
    }
  ];

  const currentTab = tabs.find(t => t.id === activeTab) || tabs[0];

  return (
    <section id="gromit" className="section bg-gray-50 border-y border-gray-100 animate-fade-in" ref={sectionRef as any}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className={`section-header ${isVisible ? "animate-fade-in-up" : "reveal-hidden"}`}>
          <span className="section-tag bg-google-blue-light text-google-blue flex items-center gap-1.5">
            <Bot className="w-3.5 h-3.5" />
            Gromit.me by CSD Station
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
            Gems <span className="text-google-blue">Home Staging</span> e Assistenza AI
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Configurazioni di Google Gems pronte all'uso per la tua attività. Seleziona una specializzazione per vedere l'AI in azione nei tipici workflow operativi dell'agente immobiliare.
          </p>
        </div>

        {/* Grid Container: Demo & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          
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
                  Importa le configurazioni dei Gems direttamente all'interno del tuo account Gemini. Nessuna API complessa da configurare, nessuna integrazione richiesta.
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
                  Elimina i canoni mensili ricorrenti. Paghi solo una volta per il pacchetto di configurazioni e l'assistente rimane memorizzato nel tuo account per sempre.
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
                  Le conversazioni avvengono all'interno della tua console protetta di Google. Nessun dato riservato dell'agenzia o dei clienti viene condiviso o archiviato esternamente.
                </p>
              </div>
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
                  <span className="ml-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Flusso Chat - Catalogo Gems</span>
                </div>
                <span className="text-[10px] text-google-blue font-semibold bg-google-blue-light px-2 py-0.5 rounded-full">
                  Visualizzazione Completa
                </span>
              </div>

              {/* Tabs for Gems selection */}
              <div className="flex flex-wrap border-b border-gray-100 bg-gray-50/50 p-2 gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-white text-google-blue shadow-sm border border-gray-100"
                          : "text-gray-500 hover:text-gray-800 hover:bg-gray-100/50"
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${activeTab === tab.id ? "text-google-blue" : "text-gray-400"}`} />
                      {tab.name}
                    </button>
                  );
                })}
              </div>

              {/* Chat View */}
              <div className="p-6 flex flex-col gap-4 max-h-[500px] overflow-y-auto bg-gray-50/30">
                
                {/* Intro Notification */}
                <div className="text-[10px] text-gray-400 text-center py-1 border-b border-gray-100">
                  Storico conversazione con: <strong>Gromit {currentTab.role}</strong>
                </div>

                {/* Render Messages */}
                {currentTab.messages.map((msg, index) => (
                  <div 
                    key={index}
                    className={`flex flex-col gap-1 max-w-[85%] ${
                      msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                    }`}
                  >
                    <span className="text-[9px] text-gray-400 px-1">
                      {msg.sender === "user" ? "Agente Immobiliare" : "Gems Assistant"}
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
                            loading="lazy"
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
              </div>

            </div>
          </div>

        </div>

        {/* Catalog Highlights: The Best 6 Gems */}
        <div className={`mt-16 pt-16 border-t border-gray-150 ${isVisible ? "animate-fade-in-up delay-300" : "reveal-hidden"}`}>
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Le Migliori Casistiche per l'Agente Immobiliare
            </h3>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Ecco i 6 assistenti più scelti e performanti estratti dal nostro catalogo completo di 26 Gems configurati.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {best6Gems.map((gem, idx) => {
              const IconComponent = gem.icon;
              return (
                <div 
                  key={idx}
                  className="flex flex-col bg-white border border-gray-150 rounded-2xl p-6 hover:shadow-lg hover:border-gray-250 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${gem.bgColor} ${gem.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-gray-900">{gem.title}</h4>
                  </div>
                  <p className="text-xs text-gray-600 mb-4 flex-grow leading-relaxed">
                    {gem.description}
                  </p>
                  <div className="pt-3 border-t border-gray-100 bg-gray-50/50 -mx-6 -mb-6 p-4 rounded-b-2xl">
                    <span className="text-[10px] font-bold text-google-blue uppercase tracking-wider block mb-1">Casistica reale d'uso</span>
                    <p className="text-xs text-gray-700 italic leading-relaxed">
                      &ldquo;{gem.useCase}&rdquo;
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Catalog Call-to-action */}
          <div className="mt-12 text-center">
            <a
              href="https://gromit.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-google-blue hover:bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-sm"
            >
              Vedi Tutti i 26 Gems su Gromit.me
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
