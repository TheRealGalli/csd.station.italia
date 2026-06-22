import { Building, Github, Mail, MapPin } from "lucide-react";
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
                Su tutto territorio nazionale : ITA
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                carlo@csd-station.it
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
                { label: "Automazione", href: "#demo" },
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
                href="https://wa.me/393518628203"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-xl bg-white border border-gray-200 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] flex items-center justify-center transition-all"
                id="footer-whatsapp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
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
