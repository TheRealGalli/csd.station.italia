import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CreditCard, Send, CheckCircle2, Star, ShieldCheck } from "lucide-react";
import nfcCardImg from "@/assets/nfc-card.jpg";

export const NfcBookingSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    sector: "ristorazione",
    quantity: "2",
    googleMapsUrl: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section
      className="py-20 bg-white"
      ref={sectionRef as any}
      id="nfc-booking"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Info Column */}
          <div
            className={`lg:col-span-5 flex flex-col gap-6 ${
              isVisible ? "animate-fade-in-up" : "reveal-hidden"
            }`}
          >
            <span className="section-tag bg-google-blue-light text-google-blue w-fit">
              Ordina le tue Card NFC
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Richiedi le tue <span className="text-google-blue">Card NFC Google</span> Personalizzate
            </h2>
            <p className="text-gray-600 leading-relaxed text-base">
              Compila il modulo per ordinare le tue Card NFC CSD Station. Ti invieremo un'anteprima digitale configurata direttamente con la tua scheda Google Maps.
            </p>

            {/* Product Feature Checklist */}
            <div className="space-y-3 mt-2">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <CheckCircle2 className="w-5 h-5 text-google-green shrink-0" />
                <span className="text-sm font-semibold text-gray-800">
                  Prezzo Una Tantum (Pagamento unico senza abbonamenti)
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <CheckCircle2 className="w-5 h-5 text-google-green shrink-0" />
                <span className="text-sm font-semibold text-gray-800">
                  Statistiche Mensili sugli accessi incluse gratis
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <CheckCircle2 className="w-5 h-5 text-google-green shrink-0" />
                <span className="text-sm font-semibold text-gray-800">
                  QR Code personalizzato integrato sulla carta
                </span>
              </div>
            </div>

            {/* Visual Mini Badge */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-google-blue/10 via-blue-50 to-google-green/10 border border-blue-100 flex items-center gap-4 mt-2">
              <img
                src={nfcCardImg}
                alt="Mini Card NFC"
                className="w-16 h-20 object-cover rounded-lg shadow-md border border-white"
              />
              <div>
                <div className="text-xs font-bold text-google-blue uppercase tracking-wider">
                  Configurazione Immediata
                </div>
                <div className="text-sm font-extrabold text-gray-900 mt-0.5">
                  Pronta all'uso in 48 ore
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Spedizione rapida in tutta Italia
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 lg:p-10 border-2 border-gray-200 shadow-2xl relative">
            {submitted ? (
              <div className="text-center py-12 flex flex-col items-center gap-4 animate-scale-in">
                <div className="w-16 h-16 rounded-full bg-google-green-light text-google-green flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900">
                  Richiesta Inviata con Successo!
                </h3>
                <p className="text-gray-600 max-w-md">
                  Grazie <strong className="text-gray-900">{formData.name}</strong>. Il nostro team configurerà l'anteprima per <strong className="text-gray-900">{formData.businessName}</strong> e ti ricontatterà a breve su <strong className="text-google-blue">{formData.email || formData.phone}</strong>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn btn-outline mt-4"
                >
                  Invia un'altra richiesta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
                  <CreditCard className="w-5 h-5 text-google-blue" />
                  Modulo di Ordine Card NFC
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Nome e Cognome *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Mario Rossi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-google-blue focus:border-google-blue outline-none text-sm transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Nome Attività / Business *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ristorante Bella Napoli"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-google-blue focus:border-google-blue outline-none text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Email di Contatto *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="mario@bellanapoli.it"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-google-blue focus:border-google-blue outline-none text-sm transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Telefono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+39 340 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-google-blue focus:border-google-blue outline-none text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Settore Attività
                    </label>
                    <select
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-google-blue focus:border-google-blue outline-none text-sm transition-all bg-white"
                    >
                      <option value="ristorazione">Ristorante / Bar / Pizzeria</option>
                      <option value="medico">Studio Medico / Dentistico</option>
                      <option value="beauty">Centro Estetico / Parrucchiere</option>
                      <option value="hotel">Hotel / B&B / Struttura Ricettiva</option>
                      <option value="altro">Altro Settore</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Quantità Card Richieste
                    </label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-google-blue focus:border-google-blue outline-none text-sm transition-all bg-white"
                    >
                      <option value="1">1 Card NFC (Starter)</option>
                      <option value="2">2 Card NFC (Consigliato Ristoranti)</option>
                      <option value="5">5 Card NFC (Pack Multi-Tavolo)</option>
                      <option value="10+">10+ Card NFC (Catene / Grandi Strutture)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Link Google Maps (Opzionale)
                  </label>
                  <input
                    type="url"
                    placeholder="https://maps.google.com/..."
                    value={formData.googleMapsUrl}
                    onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-google-blue focus:border-google-blue outline-none text-sm transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-lg w-full mt-2 font-extrabold tracking-wide"
                >
                  {loading ? (
                    "Elaborazione in corso..."
                  ) : (
                    <>
                      Invia Ordine & Richiedi Anteprima NFC
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
                <div className="text-center text-xs text-gray-400">
                  🔒 Dati protetti secondo la normativa GDPR europea.
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
