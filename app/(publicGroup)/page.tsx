import { getAllServices } from "./_actions/getAllPublicData";
import { AboutSection } from "./_components/AboutSection";
import { FaqSection } from "./_components/FaqSection";
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

      {/* 2. How It Works */}
      <HowItWorks />

      {/* 3. Featured / Public Services */}
      <PublicServices services={services} />

      {/* 4. Customer Reviews */}
      <TestimonialsSection />

      {/* 5. About Section */}
      <AboutSection />

      {/* 6. Technician Onboarding CTA Banner */}
      <TechnicianCTA />

      {/* 7. Frequently Asked Questions */}
      <FaqSection />

    </main>
  );
};

export default HomePage;