import { Mail, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSiteMode } from "@/context/SiteModeContext";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { mode, setMode } = useSiteMode();

  const getHref = (href: string) => (isHomePage ? href : `/${href}`);
  const privacyPolicyHref = mode === "nfc" ? "/nfc/privacy-policy?mode=nfc" : "/privacy-policy?mode=automazioni";
  const termsOfServiceHref = mode === "nfc" ? "/nfc/terms-of-service?mode=nfc" : "/terms-of-service?mode=automazioni";
  const cookiePolicyHref = isHomePage ? `/cookie-policy?mode=${mode}` : `/cookie-policy?mode=${mode}`;

  return (
    <footer className="border-t border-gray-200 bg-gray-50" id="footer">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                CSD <span className="text-google-blue">Station</span>
              </span>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                CyberSpaceDokingStation Italia
              </p>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              Soluzioni di Automazione AI e Card NFC Recensioni Google per far crescere la visibilità locale della tua attività su Google Maps e Gemini AI.
            </p>
            <div className="flex flex-col gap-1.5 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-google-blue" />
                Su tutto il territorio nazionale, ITA
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-google-green" />
                carlo@csd-station.it
              </span>
            </div>
          </div>

          {/* Quick Links Automazioni */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Automazioni AI
            </h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setMode("automazioni")}
                className="text-left text-gray-600 hover:text-google-blue transition-colors text-sm font-medium"
              >
                🤖 Vai a Sezione Automazioni
              </button>
              <a href={getHref("#demo")} className="text-gray-600 hover:text-google-blue transition-colors text-sm">
                Interactive Demo
              </a>
              <a href={getHref("#services")} className="text-gray-600 hover:text-google-blue transition-colors text-sm">
                Servizi AI & Workflow
              </a>
              <a href={getHref("#booking")} className="text-gray-600 hover:text-google-blue transition-colors text-sm">
                Prenota Consulenza
              </a>
            </div>
          </div>

          {/* Quick Links NFC */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Card NFC Recensioni
            </h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setMode("nfc")}
                className="text-left text-google-green hover:text-green-700 transition-colors text-sm font-bold"
              >
                💳 Vai a Sezione Card NFC
              </button>
              <a href={getHref("#nfc-stats")} className="text-gray-600 hover:text-google-green transition-colors text-sm">
                Impatto Recensioni (3 ➔ 50)
              </a>
              <a href={getHref("#nfc-seo")} className="text-gray-600 hover:text-google-green transition-colors text-sm">
                Google Maps & Gemini AI
              </a>
              <a href={getHref("#nfc-value")} className="text-gray-600 hover:text-google-green transition-colors text-sm">
                Statistiche Mensili & QR Code
              </a>
              <a href={getHref("#nfc-booking")} className="text-gray-600 hover:text-google-green transition-colors text-sm font-bold">
                Ordina Card NFC
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {currentYear} Carlo Galli (P.IVA). Tutti i diritti riservati.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <Link to={privacyPolicyHref} className="hover:text-gray-700 transition-colors">
              Privacy Policy
            </Link>
            <Link to={cookiePolicyHref} className="hover:text-gray-700 transition-colors">
              Cookie Policy
            </Link>
            <Link to={termsOfServiceHref} className="hover:text-gray-700 transition-colors">
              Termini di Servizio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
