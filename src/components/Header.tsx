import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Bot, CreditCard } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useSiteMode } from "@/context/SiteModeContext";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { mode, setMode } = useSiteMode();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const automazioniMenuItems = [
    { label: "Automazione", href: "#demo" },
    { label: "Chi Siamo", href: "#about" },
    { label: "Servizi", href: "#services" },
    { label: "Come Funziona", href: "#how-it-works" },
    { label: "Perché Noi", href: "#why-us" },
    { label: "Certificazioni", href: "#certifications" },
  ];

  const nfcMenuItems = [
    { label: "Card NFC", href: "#nfc-hero" },
    { label: "Impatto", href: "#nfc-stats" },
    { label: "SEO & Gemini AI", href: "#nfc-seo" },
    { label: "Versatilità", href: "#nfc-versatility" },
    { label: "Tutto Incluso", href: "#nfc-value" },
    { label: "Settori", href: "#nfc-verticals" },
  ];

  const menuItems = mode === "automazioni" ? automazioniMenuItems : nfcMenuItems;

  const ctaText = mode === "automazioni" ? "Prenota Chiamata Gratuita" : "Ordina Card NFC";
  const ctaHref = mode === "automazioni" ? "#booking" : "#nfc-booking";

  const getHref = (href: string) => (isHomePage ? href : `/${href}`);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHomePage
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200/80"
          : "bg-white/95 backdrop-blur-md border-b border-gray-200/60"
      }`}
    >
      {/* Top Section Switcher Sub-Bar */}
      <div className="bg-gray-50/90 border-b border-gray-200/60 py-1.5 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block text-xs font-semibold text-gray-500 tracking-tight">
            Seleziona Servizio CSD Station:
          </div>

          {/* Mode Switcher Pill */}
          <div className="inline-flex p-0.5 bg-gray-200/70 border border-gray-300/60 shadow-inner rounded-full mx-auto sm:mx-0">
            <button
              onClick={() => setMode("automazioni")}
              className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                mode === "automazioni"
                  ? "bg-google-blue text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              Automazioni AI
            </button>
            <button
              onClick={() => setMode("nfc")}
              className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                mode === "nfc"
                  ? "bg-google-blue text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              Card NFC Recensioni Google
            </button>
          </div>

          <div className="hidden md:block text-[11px] font-medium text-gray-400">
            {mode === "automazioni" ? "Workflow & AI Agent" : "Soluzione Una Tantum"}
          </div>
        </div>
      </div>

      {/* Main Header Nav — Thin, perfectly aligned & identical for both modes */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" id="header-logo">
            <span className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
              <span>CSD <span className="text-google-blue">Station</span></span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 border border-gray-200/80">
                {mode === "automazioni" ? "Automazioni" : "NFC Cards"}
              </span>
            </span>
          </Link>

          {/* Desktop Navigation — Slim, sleek line height */}
          <nav className="hidden lg:flex items-center gap-1" id="desktop-nav">
            {menuItems.map((item) => (
              <a
                key={item.href}
                className="px-3 py-1.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all text-xs lg:text-sm font-medium tracking-tight"
                href={getHref(item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={getHref(ctaHref)}
              className="btn btn-primary group text-xs font-semibold px-4 py-2 rounded-full shadow-sm"
              id="header-cta"
            >
              {ctaText}
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg animate-fade-in">
          <nav className="flex flex-col p-4 gap-1">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={getHref(item.href)}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between text-sm font-medium text-gray-800 hover:text-google-blue hover:bg-gray-50 rounded-xl px-4 py-2.5 transition-all"
              >
                {item.label}
                <ArrowRight className="w-4 h-4 opacity-40" />
              </a>
            ))}
            <div className="mt-3 pt-3 border-t border-gray-200">
              <a
                href={getHref(ctaHref)}
                onClick={() => setOpen(false)}
                className="btn btn-primary w-full text-xs font-semibold py-2.5"
              >
                {ctaText}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
