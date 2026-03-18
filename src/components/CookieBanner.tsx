import { useState, useEffect } from "react";
import { X, Cookie, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift();
        return null;
    };

    useEffect(() => {
        const handleShow = () => setIsVisible(true);
        window.addEventListener("show-cookie-banner", handleShow);

        const consent = getCookie("csd-cookie-consent");
        if (!consent) {
            // Delay showing the banner for a smoother entrance
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => {
                clearTimeout(timer);
                window.removeEventListener("show-cookie-banner", handleShow);
            };
        }

        return () => window.removeEventListener("show-cookie-banner", handleShow);
    }, []);

    const handleConsent = (status: "accepted" | "rejected") => {
        // Set cookie valid for 365 days
        const date = new Date();
        date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
        document.cookie = `csd-cookie-consent=${status}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
        
        setIsVisible(false);
        // Dispatch a custom event to notify other components (like BookingSection)
        window.dispatchEvent(new CustomEvent("cookie-consent-updated", { detail: status }));
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 animate-fade-in-up">
            <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0 bg-blue-50 p-4 rounded-full">
                    <Cookie className="w-8 h-8 text-blue-600" />
                </div>
                
                <div className="flex-grow text-center md:text-left">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center justify-center md:justify-start gap-2">
                        <ShieldCheck className="w-5 h-5 text-green-600" />
                        Impostazioni Cookie
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Usiamo i cookie per migliorare la tua esperienza, proteggere dai bot e abilitare il sistema di prenotazione. 
                        I cookie necessari sono attivi di default. Per il widget di Google Calendar, abbiamo bisogno del tuo consenso per il tracciamento di terze parti. 
                        Leggi la nostra <Link to="/cookie-policy" className="text-blue-600 underline">Cookie Policy</Link> per i dettagli.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <button
                        onClick={() => handleConsent("rejected")}
                        className="btn btn-outline border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 text-sm w-full sm:w-auto"
                    >
                        Rifiuta
                    </button>
                    <button
                        onClick={() => handleConsent("accepted")}
                        className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 text-sm w-full sm:w-auto"
                    >
                        Accetta Tutto
                    </button>
                </div>
                
                <button 
                    onClick={() => setIsVisible(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 md:hidden"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};
