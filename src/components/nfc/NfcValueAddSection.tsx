import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BarChart3, CheckCircle2, Zap, Building2, Mail, Sparkles, ShieldCheck } from "lucide-react";

export const NfcValueAddSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      className="py-20 lg:py-28 bg-gradient-to-br from-[#1967d2] via-google-blue to-[#1558c0] text-white relative overflow-hidden"
      ref={sectionRef as any}
      id="nfc-value"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-white/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-google-yellow/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 ${
            isVisible ? "animate-fade-in-up" : "reveal-hidden"
          }`}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/15 text-white border border-white/20 backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-google-yellow" />
            Il Servizio Esclusivo CSD Station
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-5">
            Il Valore Aggiunto di <span className="text-google-yellow">CSD Station</span>
          </h2>
          <p className="text-base sm:text-lg text-blue-100 mt-4 leading-relaxed">
            Non ti vendiamo solo un supporto NFC: con un unico pagamento <strong className="text-white font-semibold">Una Tantum</strong> ti aggiudichi la configurazione completa della scheda, link dinamici proprietari e statistiche avanzate inviate ogni mese.
          </p>
        </div>

        {/* 3 Main Value Added Cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 ${
            isVisible ? "animate-fade-in-up delay-100" : "reveal-hidden"
          }`}
        >
          {/* Card 1: Pronta all'uso e Link Dinamico */}
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-xl flex flex-col justify-between hover:bg-white/15 transition-all duration-300">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white text-google-blue flex items-center justify-center mb-6 shadow-md">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3">
                Dispositivo Già Configurato & Link Dinamico
              </h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                La tua Card o Plate ti arriva a casa già <strong className="text-white">100% pronta e programmata</strong> con il link dinamico di CSD Station, collegato direttamente alla tua scheda Google Maps ufficiale.
              </p>
            </div>
            <ul className="space-y-2.5 text-xs font-semibold text-blue-100 pt-5 border-t border-white/15">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-google-green shrink-0" />
                <span>Zero passaggi tecnici o configurazioni</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-google-green shrink-0" />
                <span>Link modificabile da remoto in futuro</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Statistiche Mensili Personalizzate */}
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-xl flex flex-col justify-between hover:bg-white/15 transition-all duration-300">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-google-yellow text-gray-950 flex items-center justify-center mb-6 shadow-md">
                <BarChart3 className="w-7 h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3">
                Statistiche Mensili via Email
              </h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                Monitoriamo costantemente le interazioni. Ogni mese ricevi un'email con il report puntuale dei <strong className="text-white">tap NFC e scansioni QR</strong> per misurare l'efficacia reale sulle recensioni.
              </p>
            </div>
            <ul className="space-y-2.5 text-xs font-semibold text-blue-100 pt-5 border-t border-white/15">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-google-green shrink-0" />
                <span>Report periodico automatico nella tua email</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-google-green shrink-0" />
                <span>Conteggio trasparente di tap e scansioni</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Multi-Punto in Singola Email */}
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-xl flex flex-col justify-between hover:bg-white/15 transition-all duration-300">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-google-green text-white flex items-center justify-center mb-6 shadow-md">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3">
                Multi-Punto & Multi-Sede in Un'Unica Email
              </h3>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                Se la tua attività ha più filiali, negozi o postazioni (es. cassa, tavoli, reception), ricevi <strong className="text-white">una sola email riepilogativa</strong> con tutti i punti separati e i relativi tap.
              </p>
            </div>
            <ul className="space-y-2.5 text-xs font-semibold text-blue-100 pt-5 border-t border-white/15">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-google-green shrink-0" />
                <span>Niente email frammentate o disordinate</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-google-green shrink-0" />
                <span>Confronta le performance di ogni sede</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Visual Report Preview Banner */}
        <div
          className={`bg-white rounded-3xl p-6 sm:p-8 lg:p-10 text-gray-900 shadow-2xl border border-white/40 ${
            isVisible ? "animate-fade-in-up delay-200" : "reveal-hidden"
          }`}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-google-blue-light text-google-blue flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-google-blue">
                  Esempio Pratico Report Mensile Multi-Sede
                </div>
                <h4 className="text-lg sm:text-xl font-extrabold text-gray-900">
                  Una sola email, tutte le tue postazioni sotto controllo
                </h4>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-google-green-light text-google-green text-xs font-bold shrink-0">
              <ShieldCheck className="w-4 h-4" />
              Incluso Una Tantum • Zero Canoni
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/70">
              <div className="text-xs font-semibold text-gray-500">Punto Vendita #1 — Milano Centro</div>
              <div className="text-2xl font-black text-gray-900 mt-1">248 Tap</div>
              <div className="text-xs font-medium text-google-blue mt-0.5">Giornata di picco: 38 tap (6 Ottobre 2026)</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/70">
              <div className="text-xs font-semibold text-gray-500">Punto Vendita #2 — Torino</div>
              <div className="text-2xl font-black text-gray-900 mt-1">164 Tap</div>
              <div className="text-xs font-medium text-google-blue mt-0.5">Giornata di picco: 26 tap (14 Ottobre 2026)</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/70">
              <div className="text-xs font-semibold text-gray-500">Punto Vendita #3 — Bologna</div>
              <div className="text-2xl font-black text-gray-900 mt-1">82 Tap</div>
              <div className="text-xs font-medium text-google-blue mt-0.5">Giornata di picco: 16 tap (22 Ottobre 2026)</div>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center sm:text-left">
            💡 Il report viene elaborato ed inviato in automatico all'inizio di ogni mese. Hai pieno controllo sull'impatto reale senza dover configurare server o software esterni.
          </p>
        </div>
      </div>
    </section>
  );
};
