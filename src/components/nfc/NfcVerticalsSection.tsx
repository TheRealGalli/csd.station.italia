import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Utensils,
  Stethoscope,
  Scissors,
  Building2,
  ShoppingBag,
  Wrench,
  Dumbbell,
  HeartPulse,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const NfcVerticalsSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [currentPage, setCurrentPage] = useState(0);

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
      title: "Studi Professionali (Legali, Medici & Dentistici)",
      accentColor: "bg-google-blue-light text-google-blue border-google-blue/20",
      description: "Al termine della consulenza o visita, il professionista o la reception porge la card al cliente/paziente mentre si saluta o si programma il prossimo appuntamento.",
      stats: "+400% di recensioni di clienti e pazienti felici",
      highlights: ["Massima autorevolezza per professionisti e studi", "Genera fiducia immediata per nuovi clienti"],
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
      highlights: ["Recensioni da turisti italiani e stranieri", "Riconoscimento istantaneo Trip/Google"],
    },
    {
      icon: ShoppingBag,
      title: "Boutique, Retail & Negozi",
      accentColor: "bg-purple-100 text-purple-700 border-purple-200",
      description: "Posizionata sul banco cassa al momento dell'impacchettamento del prodotto o pagamento.",
      stats: "+250% di recensioni da clienti in negozio",
      highlights: ["Perfetto per abbigliamento, ottica e gioiellerie", "Fidelizza il cliente locale"],
    },
    {
      icon: Wrench,
      title: "Officine, Gommisti & Auto",
      accentColor: "bg-blue-100 text-blue-800 border-blue-200",
      description: "Presentata all'accettazione o sul bancone al momento della riconsegna delle chiavi dell'auto.",
      stats: "+300% di reputazione per riparazioni",
      highlights: ["Genera massima fiducia per guasti e tagliandi", "Recensioni verificate al ritiro auto"],
    },
    {
      icon: Dumbbell,
      title: "Palestre, Fitness & Sport",
      accentColor: "bg-amber-100 text-amber-800 border-amber-200",
      description: "Esposta al desk di accoglienza o proposta dal Personal Trainer al termine dell'allenamento.",
      stats: "Aumenta le richieste di prova gratuita",
      highlights: ["Ideale per centri fitness, yoga e pilates", "Coinvolge gli iscritti più entusiasti"],
    },
    {
      icon: HeartPulse,
      title: "Cliniche Veterinarie & Pet Care",
      accentColor: "bg-rose-100 text-rose-700 border-rose-200",
      description: "Porgi la card al proprietario dell'animale al termine della visita o del servizio di toelettatura.",
      stats: "Dominanza locale nelle ricerche Pet",
      highlights: ["Recensioni ad altissimo valore emotivo", "Attira nuovi proprietari in zona"],
    },
  ];

  const totalPages = Math.ceil(verticals.length / 2);

  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const visibleItems = verticals.slice(currentPage * 2, currentPage * 2 + 2);

  return (
    <section
      className="py-20 bg-gray-50 border-t border-gray-200/60"
      ref={sectionRef as any}
      id="nfc-verticals"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header with Navigation Arrows */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 ${
            isVisible ? "animate-fade-in-up" : "reveal-hidden"
          }`}
        >
          <div className="max-w-2xl">
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

          {/* Slider Arrow Controls */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
            <button
              onClick={prevPage}
              className="w-12 h-12 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-100 text-gray-700 flex items-center justify-center transition-all duration-200 active:scale-95"
              aria-label="Settori precedenti"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextPage}
              className="w-12 h-12 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-100 text-gray-700 flex items-center justify-center transition-all duration-200 active:scale-95"
              aria-label="Settori successivi"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* 2-Card Slider Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-300">
          {visibleItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[320px] animate-fade-in"
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

        {/* Pagination Dots Indicator */}
        <div className="flex items-center justify-center gap-2.5 mt-10">
          {Array.from({ length: totalPages }).map((_, pageIdx) => (
            <button
              key={pageIdx}
              onClick={() => setCurrentPage(pageIdx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentPage === pageIdx
                  ? "w-8 bg-google-green"
                  : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Vai alla pagina ${pageIdx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

