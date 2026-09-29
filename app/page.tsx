import { HeroSection } from "@/components/home/HeroSection";
import { CapabilityDashboard } from "@/components/home/CapabilityDashboard";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Services } from "@/components/home/Services";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TrophyCabinet } from "@/components/home/TrophyCabinet";
import { StudioFAQ } from "@/components/home/StudioFAQ";
import { BiometricContact } from "@/components/contact/BiometricContact";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CapabilityDashboard />
      <FeaturedProjects />
      <Services />
      <ProcessSection />
      <TrophyCabinet />
      <StudioFAQ />
      <BiometricContact />
    </>
  );
}
