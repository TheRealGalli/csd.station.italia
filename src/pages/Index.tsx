import { Hero } from "@/components/Hero";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import { AboutSection } from "@/components/AboutSection";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { BookingSection } from "@/components/BookingSection";
import { GromitSection } from "@/components/GromitSection";
import { Certifications } from "@/components/Certifications";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative w-full flex flex-col bg-white min-h-screen">
      <Header />
      <main>
        <Hero />
        <InteractiveDemo />
        <AboutSection />
        <Services />
        <HowItWorks />
        <WhyChooseUs />
        <BookingSection />
        <GromitSection />
        <Certifications />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
