import { useScrollReveal } from "@/hooks/useScrollReveal";
import { MapPin } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.png";
import csdLogo from "@/assets/csd-logo.png";

export const AboutSection = () => {
    const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.2 });

    return (
        <section id="about" className="section" ref={sectionRef as any}>
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div
                    className={`${isVisible ? "animate-fade-in-up" : "reveal-hidden"}`}
                >
                    {/* Header */}
                    <div className="section-header">
                        <span className="section-tag bg-google-blue-light text-google-blue">
                            Chi Siamo
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                            Scopri <span className="text-google-blue">CSD Station</span>
                        </h2>
                    </div>

                    {/* Content Card */}
                    <div className="card max-w-4xl mx-auto !p-8 lg:!p-12">
                        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                            {/* Profile Image */}
                            <div className="relative flex-shrink-0">
                                <div className="w-36 h-36 lg:w-44 lg:h-44 rounded-full overflow-hidden border-4 border-gray-100 shadow-card">
                                    <img
                                        src={profilePhoto}
                                        alt="Carlo Galli — Founder & CEO"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-xl overflow-hidden shadow-md border-2 border-white">
                                    <img src={csdLogo} alt="CSD Station" className="w-full h-full object-cover" />
                                </div>
                            </div>

                            {/* Text */}
                            <div className="flex flex-col gap-4 text-center lg:text-left">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                                        Carlo Galli
                                    </h3>
                                    <div className="flex flex-wrap justify-center lg:justify-start gap-2 text-sm text-gray-600">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100">
                                            Fondatore & CEO
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100">
                                            <MapPin className="w-3.5 h-3.5" />
                                            Italia, Toscana
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-3 text-gray-600 leading-relaxed">
                                    <p>
                                        <strong className="text-gray-900">CSD Station Italia</strong> è
                                        un'attività con sede in Toscana, Italia, che offre{" "}
                                        <strong className="text-google-blue">consulenze tecniche gratuite di 30 minuti</strong> per
                                        aiutare professionisti e aziende a scoprire la potenza dell'automazione AI.
                                    </p>
                                    <p>
                                        Come <strong className="text-gray-900">Partner Membro Google</strong>, sono specializzato
                                        nella creazione di soluzioni basate sull'AI che automatizzano task ripetitivi,
                                        sfruttando l'ambiente di lavoro del cliente e l'intelligenza artificiale
                                        all'avanguardia per fornire risultati reali.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
