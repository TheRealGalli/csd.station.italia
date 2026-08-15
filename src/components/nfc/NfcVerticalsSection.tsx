import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Utensils, Stethoscope, Scissors, Building2, CheckCircle } from "lucide-react";

export const NfcVerticalsSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  const verticals = [
    {
      icon: Utensils,
      title: "Ristoranti, Pizzerie & Bar",
      accentColor: "bg-google-red-light text-google-red border-google-red/20",
      description: "Il cameriere presenta la Card NFC insieme al libretto del conto al tavolo. Il cliente recensisce prima di alzarsi.",
      stats: "Da 3 a 50 recensioni a settimana nel primo mese",
      highlights: ["Portata direttamente al tavolo col conto", "Feedback a caldo al termine del pasto"],
    },
    {
      icon: Stethoscope,
      title: "Studi Medici e Dentistici",
      accentColor: "bg-google-blue-light text-google-blue border-google-blue/20",
      description: "Al termine della visita, il medico o la reception porge la card al paziente mentre programma l'appuntamento successivo.",
      stats: "+400% di recensioni certificate di pazienti felici",
      highlights: ["Massima autorevolezza su Google Maps", "Genera fiducia per nuovi pazienti"],
    },
    {
      icon: Scissors,
      title: "Saloni di Bellezza & Parrucchieri",
      accentColor: "bg-google-yellow-light text-amber-700 border-google-yellow/40",
      description: "Posizionata alla cassa o presentata dall'hairstylist all'ultimo specchio dopo il restyling perfetto.",
      stats: "Moltiplica le prenotazioni tramite Google",
      highlights: ["Perfetto per clienti entusiasti del look", "Richiesta immediata durante il pagamento"],
    },
    {
      icon: Building2,
      title: "Hotel, B&B & Strutture Ricettive",
      accentColor: "bg-google-green-light text-google-green border-google-green/20",
      description: "Presentata alla reception durante le operazioni di Check-out mentre si ringrazia l'ospite per il soggiorno.",
      stats: "Supera i concorrenti della tua città",
      highlights: ["Recensioni da turisti italiani e stranieri", "Riconoscimento instantaneo Trip/Google"],
    },
  ];

  return (
    <section
      className="py-20 bg-gray-50 border-t border-gray-200/60"
      ref={sectionRef as any}
      id="nfc-verticals"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 ${
            isVisible ? "animate-fade-in-up" : "reveal-hidden"
          }`}
        >
          <span className="section-tag bg-google-green-light text-google-green">
            Settori di Successo
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-5">
            Ideale per qualsiasi attività commerciale con presenza locale
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Scopri come i vari settori utilizzano le Card NFC CSD Station per trasformare la soddisfazione del cliente in recensioni a 5 stelle.
          </p>
        </div>

        {/* Verticals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {verticals.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${item.accentColor}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                      {item.stats}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {item.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-center gap-2 text-xs font-semibold text-gray-800">
                        <CheckCircle className="w-4 h-4 text-google-green shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
