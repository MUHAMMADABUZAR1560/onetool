import { LandingHeader } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero";
import { CategoriesSection } from "@/components/landing/categories";
import { PopularToolsSection } from "@/components/landing/popular-tools";
import { FeaturesSection } from "@/components/landing/features";
import { CTASection } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function HomePage() {
  return (
    <main>
      <LandingHeader />
      <HeroSection />
      <CategoriesSection />
      <PopularToolsSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
