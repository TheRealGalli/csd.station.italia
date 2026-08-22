import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight, CheckCircle2, Star, BarChart3, QrCode, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import nfcCardImg from "@/assets/nfc-card.jpg";

export const NfcBookingSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      className="py-20 bg-white"
      ref={sectionRef as any}
      id="nfc-booking"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div
          className={`text-center flex flex-col items-center gap-8 ${
            isVisible ? "animate-fade-in-up" : "reveal-hidden"
          }`}
        >
          {/* Header */}
          <div className="flex flex-col items-center gap-5">
            <span className="section-tag bg-google-green-light text-google-green">
              Inizia Subito — Una Tantum
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Ordina le tue <span className="text-google-green">Card NFC Google</span> Adesso
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Contattaci direttamente per ricevere un preventivo personalizzato, l'anteprima della tua card configurata con la tua scheda Google Maps e la spedizione in tutta Italia.
            </p>
          </div>

          {/* Card Showcase + CTA Block */}
          <div className="w-full bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Left: Product image */}
              <div className="relative bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-10">
                <div className="relative group max-w-[260px] w-full">
                  <div className="absolute -inset-1 bg-gradient-to-r from-google-blue via-google-yellow to-google-green rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
                  <div className="relative bg-white rounded-xl p-4 shadow-xl border border-gray-100">
                    <img
                      src={nfcCardImg}
                      alt="Card NFC Recensioni Google"
                      className="w-full object-contain rounded-lg"
                    />
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-gray-100 flex items-center gap-1.5 text-xs font-bold text-gray-900">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  5.0 Google Maps
                </div>
              </div>

              {/* Right: What's included + CTA */}
              <div className="flex flex-col justify-between p-8 lg:p-10 gap-6">
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-5">
                    Tutto Incluso nel Prezzo Unico:
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-google-blue-light text-google-blue flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">Chip NFC ultra-veloce</div>
                        <div className="text-xs text-gray-500">Tap immediato in 2 secondi, compatibile con tutti i dispositivi</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-google-green-light text-google-green flex items-center justify-center shrink-0">
                        <BarChart3 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">Statistiche Mensili Incluse</div>
                        <div className="text-xs text-gray-500">Report periodico con tap, scansioni e tasso di conversione</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-google-yellow-light text-amber-600 flex items-center justify-center shrink-0">
                        <QrCode className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">QR Code Personalizzato Stampato</div>
                        <div className="text-xs text-gray-500">Massima compatibilità anche per chi non usa NFC</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">Nessun Canone Mensile</div>
                        <div className="text-xs text-gray-500">Pagamento una tantum, la card è tua per sempre</div>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Green CTA Button */}
                <a
                  href="https://wa.me/393518628203?text=Ciao!%20Vorrei%20ordinare%20le%20Card%20NFC%20Recensioni%20Google%20di%20CSD%20Station.%20Potete%20darmi%20informazioni?"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="nfc-order-cta"
                  className="group w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-extrabold text-white text-base tracking-wide transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  style={{ backgroundColor: "#25D366" }}
                >
                  {/* WhatsApp icon inline */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Ordina Ora su WhatsApp
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>

                <p className="text-center text-xs text-gray-400">
                  🔒 Risposta garantita in meno di 24 ore • Spedizione in tutta Italia
                </p>
                <p className="text-center text-[11px] text-gray-500 mt-1 leading-normal">
                  Inviando la richiesta accetti i nostri{" "}
                  <Link to="/nfc/terms-of-service?mode=nfc" className="underline hover:text-google-green transition-colors font-medium">
                    Termini di Servizio (Resi B2B e Spedizioni)
                  </Link>{" "}
                  e dichiari di aver letto la{" "}
                  <Link to="/nfc/privacy-policy?mode=nfc" className="underline hover:text-google-green transition-colors font-medium">
                    Privacy Policy
                  </Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
