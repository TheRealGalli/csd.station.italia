import { useEffect, useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Calendar, Clock, Video } from "lucide-react";

export const BookingSection = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.15 });
  const scriptContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://calendar.google.com/calendar/scheduling-button-script.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src =
      "https://calendar.google.com/calendar/scheduling-button-script.js";
    script.async = true;
    script.onload = () => {
      if (window.calendar && scriptContainerRef.current) {
        window.calendar.schedulingButton.load({
          url: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0FZIvLBEleNQJEULW-FQtN_ZpmepA6D58hOJXQ4vtF7i0g3dLC8QhbwwDiSIkJ8PQeFnxuoBfJ?gv=true",
          color: "#1a73e8", // Darker Google blue forces white text natively
          label: "Book Appointment",
          target: scriptContainerRef.current,
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section id="booking" className="section" ref={sectionRef as any}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div
          className={`${isVisible ? "animate-fade-in-up" : "reveal-hidden"}`}
        >
          {/* Header */}
          <div className="section-header">
            <span className="section-tag bg-google-blue-light text-google-blue">
              Inizia Ora
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
              Prenota la Tua{" "}
              <span className="text-google-blue">Consulenza Gratuita</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              30 minuti per discutere dei tuoi obiettivi di automazione. Nessuna pressione, nessuna vendita forzata — solo consulenza esperta su come l'AI può aiutare il tuo business.
            </p>
          </div>

          {/* Features */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-google-blue" />
              30 Minuti
            </span>
            <span className="flex items-center gap-2">
              <Video className="w-4 h-4 text-google-green" />
              Videochiamata
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-google-yellow" />
              Scegli l'Orario
            </span>
          </div>

          {/* Google Calendar Button */}
          <div
            className={`flex justify-center ${isVisible ? "animate-scale-in delay-200" : "reveal-hidden"
              }`}
          >
            <div ref={scriptContainerRef} id="booking-calendar-btn"></div>
          </div>
        </div>
      </div>

      <style>{`
        /* Attempt to force white text just in case */
        #booking-calendar-btn {
          color: white !important;
        }
        
        @media (max-width: 768px) {
          iframe[src*="calendar.google.com"] {
            position: fixed !important;
            top: 5vh !important;
            left: 5vw !important;
            width: 90vw !important;
            height: 90vh !important;
            max-width: 90vw !important;
            max-height: 90vh !important;
            z-index: 9999 !important;
          }
        }
        @media (min-width: 769px) {
          iframe[src*="calendar.google.com"] {
            min-width: 700px !important;
            min-height: 600px !important;
          }
        }
      `}</style>
    </section>
  );
};

declare global {
  interface Window {
    calendar: {
      schedulingButton: {
        load: (config: {
          url: string;
          color: string;
          label: string;
          target: HTMLElement;
        }) => void;
      };
    };
  }
}