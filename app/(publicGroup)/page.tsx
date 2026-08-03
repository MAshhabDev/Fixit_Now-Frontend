import { getAllServices } from "./_actions/getAllPublicData";
import { AboutSection } from "./_components/AboutSection";
import { FaqSection } from "./_components/FaqSection";
import { Footer } from "./_components/Footer";
import { HeroSection } from "./_components/HeroSection";
import { TestimonialsSection } from "./_components/PublicReview";
import { PublicServices } from "./_components/PublicServices";
import { TechnicianCTA } from "./_components/TechnicianCTA";
import { HowItWorks } from "./_components/Work";

const HomePage = async () => {
  const servicesRes = await getAllServices();
  const services = servicesRes?.data || [];
  return (
    <main className="flex-1 min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      <HowItWorks></HowItWorks>

      {/* 2. Featured / Public Services */}
      <PublicServices services={services} />

      <TestimonialsSection></TestimonialsSection>

      {/* 3. About Section */}
      <AboutSection />

      {/* 4. Technician Onboarding CTA Banner */}
      <TechnicianCTA />

      {/* 5. Frequently Asked Questions */}
      <FaqSection />

      {/* 6. Footer Section */}
      <Footer />
    </main>
  );
};

export default HomePage;
