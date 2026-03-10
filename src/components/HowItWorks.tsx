import { useScrollReveal } from "@/hooks/useScrollReveal";
import dwarfTech from "@/assets/illustrations/dwarf-tech.webp";
import dwarfSecurity from "@/assets/illustrations/dwarf-security.webp";
import dwarfData from "@/assets/illustrations/dwarf-data.webp";

const steps = [
    {
        number: "01",
        illustration: dwarfTech,
        title: "Prenota una Chiamata Gratuita",
        description:
            "Prenota una consulenza gratuita di 30 minuti senza impegno. Parleremo del tuo business, capiremo i tuoi punti critici ed esploreremo come l'AI può aiutarti.",
        color: "text-google-blue",
        bgColor: "bg-google-blue-light",
    },
    {
        number: "02",
        illustration: dwarfSecurity,
        title: "Analizziamo e Progettiamo",
        description:
            "Il nostro team analizza i tuoi flussi di lavoro, identifica le opportunità di automazione e progetta una soluzione su misura che si adatti al tuo budget e ai tuoi obiettivi.",
        color: "text-google-yellow",
        bgColor: "bg-google-yellow-light",
    },
    {
        number: "03",
        illustration: dwarfData,
        title: "Costruiamo e Consegniamo",
        description:
            "Implementiamo la soluzione, la integriamo con i tuoi strumenti esistenti e forniamo supporto continuo per assicurarci che tutto funzioni perfettamente.",
        color: "text-google-green",
        bgColor: "bg-google-green-light",
    },
];

export const HowItWorks = () => {
    const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.15 });

    return (
        <section id="how-it-works" className="section" ref={sectionRef as any}>
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div
                    className={`section-header ${isVisible ? "animate-fade-in-up" : "reveal-hidden"
                        }`}
                >
                    <span className="section-tag bg-google-yellow-light text-yellow-700">
                        Come Funziona
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
                        Semplice come{" "}
                        <span className="text-google-blue">1</span>
                        <span className="text-google-red">-</span>
                        <span className="text-google-yellow">2</span>
                        <span className="text-google-red">-</span>
                        <span className="text-google-green">3</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Iniziare è facile. Ecco come lavoriamo insieme per trasformare il tuo business.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
                    {/* Connector line — desktop only */}
                    <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-gray-200 z-0" />

                    {steps.map((step, index) => (
                        <div
                            key={step.title}
                            className={`relative z-10 flex flex-col items-center text-center gap-4 ${isVisible
                                ? `animate-fade-in-up delay-${(index + 1) * 100}`
                                : "reveal-hidden"
                                }`}
                            id={`step-${index}`}
                        >
                            {/* Step number badge */}
                            <div
                                className={`w-12 h-12 rounded-full ${step.bgColor} flex items-center justify-center`}
                            >
                                <span className={`text-lg font-bold ${step.color}`}>
                                    {step.number}
                                </span>
                            </div>

                            {/* Illustration */}
                            <img
                                src={step.illustration}
                                alt={step.title}
                                className="w-32 h-32 object-contain"
                            />

                            {/* Text */}
                            <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
