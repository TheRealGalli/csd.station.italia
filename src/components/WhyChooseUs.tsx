import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CheckCircle } from "lucide-react";
import dwarfAutomation from "@/assets/illustrations/dwarf-automation.webp";

const advantages = [
    {
        title: "Consulenza Esperta Gratuita",
        description:
            "Ogni collaborazione inizia con una sessione strategica gratuita di 30 minuti. Nessuna vendita forzata — solo consigli onesti ed esperti su come l'AI può aiutare il tuo business.",
        highlights: ["Senza impegno", "30 minuti", "Consigli esperti"],
        color: "border-l-google-blue",
        tagBg: "bg-google-blue-light",
        tagText: "text-google-blue",
    },
    {
        title: "Partner Avanzato Certificato",
        description:
            "Supportati da certificazioni professionali in cloud computing, AI, sicurezza e gestione dello spazio di lavoro. Portiamo comprovata esperienza in ogni progetto.",
        highlights: ["Professionista certificato", "Cloud & AI", "Pronto per l'impresa"],
        color: "border-l-google-green",
        tagBg: "bg-google-green-light",
        tagText: "text-google-green",
    },
    {
        title: "Soluzioni AI su Misura",
        description:
            "Non facciamo soluzioni standardizzate. Ogni soluzione è costruita su misura intorno ai tuoi flussi di lavoro, strumenti e obiettivi aziendali specifici.",
        highlights: ["Costruito su misura", "I tuoi strumenti", "Il tuo flusso di lavoro"],
        color: "border-l-google-yellow",
        tagBg: "bg-google-yellow-light",
        tagText: "text-yellow-700",
    },
    {
        title: "Supporto End-to-End",
        description:
            "Dalla consulenza iniziale all'implementazione e oltre. Siamo con te in ogni fase, fornendo supporto continuo e ottimizzazione.",
        highlights: ["Ciclo di vita completo", "Supporto continuo", "Miglioramento continuo"],
        color: "border-l-google-red",
        tagBg: "bg-google-red-light",
        tagText: "text-google-red",
    },
];

export const WhyChooseUs = () => {
    const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.15 });

    return (
        <section id="why-us" className="section bg-gray-50" ref={sectionRef as any}>
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16">
                    {/* Left — Content */}
                    <div className="flex-1">
                        {/* Header */}
                        <div
                            className={`mb-8 ${isVisible ? "animate-fade-in-up" : "reveal-hidden"
                                }`}
                        >
                            <span className="section-tag bg-google-green-light text-google-green">
                                Perché Sceglierci
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
                                Il Vantaggio{" "}
                                <span className="text-google-green">CSD</span>
                            </h2>
                            <p className="text-lg text-gray-600 max-w-xl">
                                Uniamo una profonda esperienza tecnica con un autentico impegno per
                                il tuo successo.
                            </p>
                        </div>

                        {/* Advantage Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
                            {advantages.map((adv, index) => (
                                <div
                                    key={adv.title}
                                    className={`bg-white rounded-2xl p-6 border border-gray-200 border-l-4 ${adv.color} hover:shadow-card-hover transition-all duration-300 ${isVisible
                                        ? `animate-fade-in-up delay-${(index + 1) * 100}`
                                        : "reveal-hidden"
                                        }`}
                                    id={`advantage-${index}`}
                                >
                                    <h3 className="text-base font-bold text-gray-900 mb-2">
                                        {adv.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                        {adv.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {adv.highlights.map((h) => (
                                            <span
                                                key={h}
                                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${adv.tagBg} ${adv.tagText}`}
                                            >
                                                <CheckCircle className="w-3 h-3" />
                                                {h}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — Illustration (lower right, at card midpoint) */}
                    <div
                        className={`hidden lg:flex flex-col items-end justify-end flex-shrink-0 self-end pb-8 ${isVisible ? "animate-fade-in delay-200" : "reveal-hidden"
                            }`}
                    >
                        <img
                            src={dwarfAutomation}
                            alt="Automation builder dwarf"
                            className="w-64 animate-float translate-x-4"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
