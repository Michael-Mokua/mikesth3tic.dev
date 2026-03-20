import { HeroSection } from "@/components/home/HeroSection";
import { Services } from "@/components/home/Services";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { FeaturedBlog } from "@/components/home/FeaturedBlog";
import { TrophyCabinet } from "@/components/home/TrophyCabinet";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { CapabilityDashboard } from "@/components/home/CapabilityDashboard";
import { ProcessSection } from "@/components/home/ProcessSection";
import { BiometricContact } from "@/components/contact/BiometricContact";
import { getAllPosts } from "@/lib/mdx";
import { StudioFAQ } from "@/components/home/StudioFAQ";
import { NexusDashboard } from "@/components/ui/NexusDashboard";

export default async function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <HeroSection />
      <Services />
      <ProcessSection />
      <FeaturedProjects />
      <CapabilityDashboard />
      <div className="container-custom pb-20">
        <NexusDashboard />
      </div>
      <TrophyCabinet />
      <FeaturedBlog posts={posts} />
      <StudioFAQ />
      <BiometricContact />
      <NewsletterSection />

    </>
  );
}
