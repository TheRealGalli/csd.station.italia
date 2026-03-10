import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ExternalLink } from "lucide-react";

const skillBadges = [
    // — Advanced —
    {
        name: "Deploy Multi-Agent Architectures",
        img: "https://cdn.qwiklabs.com/H%2BQwNUemcO%2BNuKySkXBxU4dk9eAsdNv7W9hOqqSrzxY%3D",
    },
    {
        name: "Google DeepMind: Train A Small Language Model",
        img: "https://cdn.qwiklabs.com/%2BoWdm%2FHzI%2FCAdbH%2BVisNVqZNrjaLwl24mARfInT99b0%3D",
    },
    {
        name: "Use Machine Learning APIs on Google Cloud",
        img: "https://cdn.qwiklabs.com/GLfVO7bmeMcfYC8AI8NBW8gnMmpYHel4EFovC6enUio%3D",
    },
    // — Intermediate —
    {
        name: "Connecting Cloud Networks with NCC",
        img: "https://cdn.qwiklabs.com/Y0Bg%2FY1trEfF5%2FwE6ByOpoQbSFoZzhKA4AzWbVuBFmY%3D",
    },
    {
        name: "Develop Your Google Cloud Network",
        img: "https://cdn.qwiklabs.com/1W491MLsCade2Tehi6mQSwcQz3XfbGpJNTGHAhlvHdU%3D",
    },
    {
        name: "Engineer AI Agents with ADK",
        img: "https://cdn.qwiklabs.com/cJuD3N2yTWsqG%2FaCI6kMaEtBxaOKn1iA6a981zMbIzg%3D",
    },
    {
        name: "Manage Kubernetes in Google Cloud",
        img: "https://cdn.qwiklabs.com/kv48x9UK42Fqn4QPSyXlXjHwTf75c9YtMBQb2kbVJgc%3D",
    },
    {
        name: "Analyze & Reason on Multimodal Data with Gemini",
        img: "https://cdn.qwiklabs.com/OBueHtVB73JvjkG1wHpDUbF5kqnzHyUpJHr%2Bbq9X%2B3U%3D",
    },
    {
        name: "Multimodal Vector Search with BigQuery",
        img: "https://cdn.qwiklabs.com/ptFjKJhCElCLWeQv%2BT%2F%2Bquj23pUL5YzWprpljt6ceJ0%3D",
    },
    {
        name: "Discover & Protect Sensitive Data",
        img: "https://cdn.qwiklabs.com/%2FDLgYSRx2wyVeNmu3ZJFhu8i8hgut1CW7Rx3nLf6bNM%3D",
    },
    {
        name: "Secure Software Delivery",
        img: "https://cdn.qwiklabs.com/wPsKX9ooPyDhRzoyLxsCaz5VW%2B7hof8T9Qo0j5%2BRIG4%3D",
    },
    {
        name: "Inspect Rich Documents with Gemini Multimodality",
        img: "https://cdn.qwiklabs.com/jFlzyPINlpMtd1ENEaGc8qqX8jbcZ4NK7olpA0H%2Bfc0%3D",
    },
    {
        name: "Develop Gen AI Apps with Gemini & Streamlit",
        img: "https://cdn.qwiklabs.com/R%2BYhbP40DQcgaBNwV5nSLyIehXVx2j9KZslV6rCb9K4%3D",
    },
    {
        name: "Explore Generative AI with Gemini API",
        img: "https://cdn.qwiklabs.com/cmS6mobYbWrdL%2BfShmyvQnXt2P%2Bhm9S2ZpTTQ4Rase4%3D",
    },
    {
        name: "Functions, Formulas & Charts in Google Sheets",
        img: "https://cdn.qwiklabs.com/0G14HiieShpIQWSv%2Fmz%2FHONOtEtCljUWKGMYyfEnsC4%3D",
    },
    {
        name: "Chrome Enterprise Premium Security",
        img: "https://cdn.qwiklabs.com/XPJTvBC16tGtqvnsnQzjpBs6WwPMTEo%2FptFlQ%2BMBiHg%3D",
    },
    {
        name: "Kickstarting App Dev with Gemini Code Assist",
        img: "https://cdn.qwiklabs.com/1Sb5hVLDMPyRbwJTLMwbJQnDemCVgzS7LSld6YgBhUk%3D",
    },
    // — Introductory —
    {
        name: "Mitigate Threats & Vulnerabilities with SCC",
        img: "https://cdn.qwiklabs.com/aM1mN0gSEvrDIrNI62BU5QPavPuCk%2Fi3jLHBRc31ZTc%3D",
    },
    {
        name: "Build Smart Cloud Apps with Vibe Coding & MCP",
        img: "https://cdn.qwiklabs.com/z9bzy3p7KL1CvhBCR9dBz4tdGDy7%2BdQOM%2BGxXQRGePY%3D",
    },
    {
        name: "Get Started with Google Workspace Tools",
        img: "https://cdn.qwiklabs.com/N55TLuzmt8vKvKQ9B1z%2BbQzBlgcJgIgxw93zK%2BuKz8c%3D",
    },
    {
        name: "Integrate BigQuery & Google Workspace with Apps Script",
        img: "https://cdn.qwiklabs.com/PWrgdfhYPRi%2BC2jMkG7%2BXApLiDL8XHorA1rQ8QkRM10%3D",
    },
    {
        name: "Develop with Apps Script & AppSheet",
        img: "https://cdn.qwiklabs.com/WUI%2BxvmLhj0U4q2%2BG6Ec%2Bt5OpG8GoHQ%2FI2ONuFjKSlE%3D",
    },
    {
        name: "Derive Insights from BigQuery Data",
        img: "https://cdn.qwiklabs.com/fRSh6wZemDI5n3Z0y8GNWh4fNLlHZTq4G5p2CCLly3c%3D",
    },
    {
        name: "Deploy Kubernetes Applications on Google Cloud",
        img: "https://cdn.qwiklabs.com/XEaSHIu5cNECoi%2FM%2Fw30h9DDBXPP9Sdke8OQQPv3gNQ%3D",
    },
];

export const Certifications = () => {
    const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

    return (
        <section id="certifications" className="section" ref={sectionRef as any}>
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div
                    className={`section-header ${isVisible ? "animate-fade-in-up" : "reveal-hidden"
                        }`}
                >
                    <span className="section-tag bg-google-green-light text-google-green">
                        Certificazioni
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
                        Esperienza <span className="text-google-green">Verificata</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                        Distintivi di competenza professionale in tecnologie Cloud, AI, Sicurezza e Workspace — in continua crescita.
                    </p>
                    <a
                        href="https://www.skills.google/public_profiles/4a3ed6b8-9f55-463f-83a6-8c218717a8fd"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline text-sm"
                        id="certifications-profile-link"
                    >
                        Guarda il Profilo Completo
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>

                {/* Badge Grid — Official Images, uniform cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
                    {skillBadges.map((badge, index) => (
                        <div
                            key={badge.name}
                            className={`group flex items-center justify-center aspect-square bg-white rounded-2xl border border-gray-100 p-3 hover:shadow-lg hover:border-gray-200 transition-all duration-300 ${isVisible
                                ? `animate-fade-in-up delay-${Math.min((index + 1) * 50, 700)}`
                                : "reveal-hidden"
                                }`}
                            id={`badge-${index}`}
                        >
                            <img
                                src={badge.img}
                                alt={badge.name}
                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
