import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Chi Siamo", href: "#about" },
    { label: "Servizi", href: "#services" },
    { label: "Come Funziona", href: "#how-it-works" },
    { label: "Perché Noi", href: "#why-us" },
    { label: "Certificazioni", href: "#certifications" },
  ];

  const getHref = (href: string) => isHomePage ? href : `/${href}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || !isHomePage
        ? "bg-white/95 backdrop-blur-md shadow-card border-b border-gray-100"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" id="header-logo">
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              CSD <span className="text-google-blue">Station</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" id="desktop-nav">
            {menuItems.map((item) => (
              <a
                key={item.href}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all text-sm font-medium"
                href={getHref(item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href={getHref("#booking")} className="btn btn-primary group" id="header-cta">
              Prenota Chiamata Gratuita
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                className="flex items-center justify-between text-base font-medium text-gray-800 hover:text-google-blue hover:bg-gray-50 rounded-xl px-4 py-3 transition-all"
              >
                {item.label}
                <ArrowRight className="w-4 h-4 opacity-40" />
              </a>
            ))}
            <div className="mt-3 pt-3 border-t border-gray-200">
              <a
                href={getHref("#booking")}
                onClick={() => setOpen(false)}
                className="btn btn-primary w-full"
              >
                Prenota Chiamata Gratuita
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
