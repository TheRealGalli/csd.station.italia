import { useSiteMode } from "@/context/SiteModeContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Automazioni components
import { Hero } from "@/components/Hero";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import { AboutSection } from "@/components/AboutSection";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { BookingSection } from "@/components/BookingSection";
import { Certifications } from "@/components/Certifications";

// NFC Card components
import { NfcHero } from "@/components/nfc/NfcHero";
import { NfcStatsImpact } from "@/components/nfc/NfcStatsImpact";
import { NfcSeoAiSection } from "@/components/nfc/NfcSeoAiSection";
import { NfcVersatilitySection } from "@/components/nfc/NfcVersatilitySection";
import { NfcValueAddSection } from "@/components/nfc/NfcValueAddSection";
import { NfcVerticalsSection } from "@/components/nfc/NfcVerticalsSection";
import { NfcBookingSection } from "@/components/nfc/NfcBookingSection";

const Index = () => {
  const { mode } = useSiteMode();

  return (
    <div className="relative w-full flex flex-col bg-white min-h-screen">
      <Header />
      <main className="flex-1">
        {mode === "automazioni" ? (
          <>
            <Hero />
            <InteractiveDemo />
            <AboutSection />
            <Services />
            <HowItWorks />
            <WhyChooseUs />
            <BookingSection />
            <Certifications />
          </>
        ) : (
          <>
            <NfcHero />
            <NfcStatsImpact />
            <NfcSeoAiSection />
            <NfcVersatilitySection />
            <NfcValueAddSection />
            <NfcVerticalsSection />
            <NfcBookingSection />
            <Certifications />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
