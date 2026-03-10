import { useScrollReveal } from "@/hooks/useScrollReveal";
import dwarfAi from "@/assets/illustrations/dwarf-ai.webp";
import dwarfWorkspace from "@/assets/illustrations/dwarf-workspace.webp";
import dwarfCloud from "@/assets/illustrations/dwarf-cloud.webp";

const services = [
    {
        illustration: dwarfAi,
        title: "Consulenza AI",
        description:
            "Consulenza strategica sull'AI per identificare opportunità di automazione nel tuo business. Analizziamo i tuoi flussi di lavoro, troviamo i colli di bottiglia e progettiamo soluzioni intelligenti che fanno risparmiare tempo e denaro.",
        color: "bg-google-red-light",
        textColor: "text-google-red",
        borderColor: "border-google-red/20",
    },
    {
        illustration: dwarfWorkspace,
        title: "Ottimizzazione Workspace",
        description:
            "Massimizza la tua produttività con soluzioni per lo spazio di lavoro su misura. Automazione email, gestione del calendario, flussi documentali e collaborazione del team — tutto ottimizzato con l'AI.",
        color: "bg-google-blue-light",
        textColor: "text-google-blue",
        borderColor: "border-google-blue/20",
    },
    {
        illustration: dwarfCloud,
        title: "Automazione Personalizzata",
        description:
            "Soluzioni di automazione end-to-end costruite per le tue esigenze specifiche. Dall'elaborazione dei dati alla comunicazione con i clienti, creiamo agenti intelligenti che lavorano 24/7 al posto tuo.",
        color: "bg-google-green-light",
        textColor: "text-google-green",
        borderColor: "border-google-green/20",
    },
];

export const Services = () => {
    const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.15 });

    return (
        <section id="services" className="section bg-gray-50" ref={sectionRef as any}>
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div
                    className={`section-header ${isVisible ? "animate-fade-in-up" : "reveal-hidden"
                        }`}
                >
                    <span className="section-tag bg-google-red-light text-google-red">
                        I Nostri Servizi
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
                        Cosa <span className="text-google-red">Facciamo</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Dalla strategia all'esecuzione, forniamo soluzioni complete di AI e automazione per aziende di tutte le dimensioni.
                    </p>
                </div>

                {/* Service Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {services.map((service, index) => (
                        <div
                            key={service.title}
                            className={`card-colored ${service.color} border ${service.borderColor} flex flex-col items-center text-center gap-5 ${isVisible
                                ? `animate-fade-in-up delay-${(index + 1) * 100}`
                                : "reveal-hidden"
                                }`}
                            id={`service-card-${index}`}
                        >
                            <img
                                src={service.illustration}
                                alt={service.title}
                                className="w-28 h-28 object-contain"
                            />
                            <h3 className={`text-xl font-bold ${service.textColor}`}>
                                {service.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
