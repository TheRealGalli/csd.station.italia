import { Building, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const getHref = (href: string) => (isHomePage ? href : `/${href}`);

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
              Soluzioni di automazione AI e ottimizzazione dello spazio di lavoro.
              Consulenze gratuite di 30 minuti per le aziende pronte a scalare in modo più intelligente.
            </p>
            <div className="flex flex-col gap-1.5 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Via Francesco Campana 45, Colle Val d'Elsa, SI, ITA
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                carlo@csd-station.it
              </span>
              <span className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                P.IVA: 01630510525
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Link Rapidi
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Chi Siamo", href: "#about" },
                { label: "Servizi", href: "#services" },
                { label: "Come Funziona", href: "#how-it-works" },
                { label: "Prenota Chiamata", href: "#booking" },
                { label: "Certificazioni", href: "#certifications" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={getHref(link.href)}
                  className="text-gray-600 hover:text-google-blue transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Connettiamoci
            </h4>
            <div className="flex gap-3">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl bg-white border border-gray-200 hover:bg-google-blue hover:text-white hover:border-google-blue flex items-center justify-center transition-all"
                id="footer-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/TheRealGalli"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-xl bg-white border border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900 flex items-center justify-center transition-all"
                id="footer-github"
              >
                <Github className="w-5 h-5" />
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
            <Link to="/privacy-policy" className="hover:text-gray-700 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/cookie-policy" className="hover:text-gray-700 transition-colors">
              Cookie Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-gray-700 transition-colors">
              Termini di Servizio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
