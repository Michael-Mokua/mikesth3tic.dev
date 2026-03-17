import { HeroSection } from "@/components/home/HeroSection";
import { SkillsSection } from "@/components/home/SkillsSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { FeaturedBlog } from "@/components/home/FeaturedBlog";
import { TrophyCabinet } from "@/components/home/TrophyCabinet";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { CapabilityDashboard } from "@/components/home/CapabilityDashboard";
import { StudioProcess, VaultExplorer } from "@/components/home/StudioEnhancements";
import { BrandVault } from "@/components/home/BrandVault";
import { getAllPosts } from "@/lib/mdx";

export default async function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <HeroSection />
      <SkillsSection />
      <StudioProcess />
      <FeaturedProjects />
      <CapabilityDashboard />
      <VaultExplorer />
      <BrandVault />
      <TrophyCabinet />
      <FeaturedBlog posts={posts} />
      <NewsletterSection />
    </>
  );
}
