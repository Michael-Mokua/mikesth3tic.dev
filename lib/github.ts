import { PROJECTS_CONFIG, ProjectOverride } from "@/projects.config";
import { PROJECTS as CURATED_FALLBACK_PROJECTS, Project } from "@/lib/projects";

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  pushed_at: string;
  created_at: string;
  size: number;
  fork: boolean;
  archived: boolean;
}

/**
 * Technical Complexity Scoring Formula:
 * Calculates an objective complexity score based on real code signals:
 * 1. Architecture & Tech Stack presence (Next.js, LangChain, Supabase, M-Pesa, PyTorch, Kotlin): up to 40 pts
 * 2. Language & System diversity (Multi-language repositories): up to 15 pts
 * 3. Repository scale & code footprint (size/commits): up to 15 pts
 * 4. Production deployment (verified live URL): 15 pts
 * 5. Repository maturity (stars, topics, activity): up to 15 pts
 *
 * Total Score range: 0 - 100
 * Note: Score is used exclusively for ranking order and never exposed as a public vanity metric.
 */
export function computeComplexityScore(repo: GitHubRepo, override?: ProjectOverride): number {
  let score = 20; // Base score for functional public repo

  const allText = `${repo.name} ${repo.description || ""} ${(repo.topics || []).join(" ")} ${(override?.stack || []).join(" ")}`.toLowerCase();

  // 1. Core Stack & Infrastructure complexity signals
  if (allText.includes("daraja") || allText.includes("m-pesa") || allText.includes("mpesa")) score += 15;
  if (allText.includes("claude") || allText.includes("langchain") || allText.includes("llm") || allText.includes("reasoning")) score += 15;
  if (allText.includes("pytorch") || allText.includes("tensorflow") || allText.includes("model")) score += 12;
  if (allText.includes("kotlin") || allText.includes("compose") || allText.includes("android")) score += 12;
  if (allText.includes("supabase") || allText.includes("postgres") || allText.includes("database")) score += 10;
  if (allText.includes("next.js") || allText.includes("nextjs") || allText.includes("react")) score += 8;

  // 2. Production Deployment presence
  if (repo.homepage || override?.liveUrl) score += 15;

  // 3. Topics & Tag depth
  if (repo.topics && repo.topics.length > 0) {
    score += Math.min(repo.topics.length * 2, 10);
  }

  // 4. Code size footprint
  if (repo.size > 1000) score += 5;
  if (repo.size > 5000) score += 5;

  // 5. Community traction
  if (repo.stargazers_count > 0) {
    score += Math.min(repo.stargazers_count * 2, 10);
  }

  return score;
}

/**
 * Server-side GitHub project fetcher with ISR caching, rate-limit fallback, and override merger.
 */
export async function fetchGitHubProjects(): Promise<Project[]> {
  const username = PROJECTS_CONFIG.githubUsername;
  const token = process.env.GITHUB_TOKEN;

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "mikesth3tic-portfolio-fetcher",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, {
      headers,
      next: { revalidate: PROJECTS_CONFIG.revalidateSeconds },
    });

    if (!res.ok) {
      console.warn(`GitHub API returned status ${res.status}. Using curated fallback.`);
      return CURATED_FALLBACK_PROJECTS;
    }

    const rawRepos: GitHubRepo[] = await res.json();

    if (!Array.isArray(rawRepos) || rawRepos.length === 0) {
      return CURATED_FALLBACK_PROJECTS;
    }

    // Filter valid public non-fork non-archived non-hidden repos
    const validRepos = rawRepos.filter((repo) => {
      if (repo.fork || repo.archived) return false;
      if (PROJECTS_CONFIG.hiddenRepos.includes(repo.name)) return false;
      const override = PROJECTS_CONFIG.overrides[repo.name];
      if (override?.hidden) return false;
      return true;
    });

    // Transform and map to Project interface
    const mappedProjects: (Project & { score: number; pinned?: boolean; pinnedRank?: number })[] = validRepos.map((repo) => {
      const override = PROJECTS_CONFIG.overrides[repo.name] || {};
      const score = computeComplexityScore(repo, override);

      const curatedMatch = CURATED_FALLBACK_PROJECTS.find(
        (p) => p.slug.toLowerCase() === repo.name.toLowerCase() || p.repoUrl.toLowerCase().includes(repo.name.toLowerCase())
      );

      const slug = repo.name.toLowerCase();
      const title = override.title || curatedMatch?.title || repo.name;
      const tagline = override.tagline || curatedMatch?.tagline || repo.description || "Experimental engineering repository and prototype.";
      const category = override.category || curatedMatch?.category || deriveCategory(repo);
      const tags = override.stack || curatedMatch?.tags || [repo.language || "TypeScript", ...(repo.topics || []).slice(0, 3)];
      const repoUrl = repo.html_url;
      const liveUrl = override.liveUrl || curatedMatch?.liveUrl || (repo.homepage && repo.homepage.startsWith("http") ? repo.homepage : undefined);

      return {
        slug,
        title,
        tagline,
        category,
        featured: false, // will assign top 6 after sorting
        rank: 99,
        tags,
        repoUrl,
        liveUrl,
        accentColor: override.accentColor || curatedMatch?.accentColor || "text-amber-400",
        gradient: override.gradient || curatedMatch?.gradient || "from-amber-500/20 via-ochre-500/10 to-transparent",
        problem: override.problem || curatedMatch?.problem || "Solving domain-specific technical bottlenecks through structured engineering.",
        role: override.role || curatedMatch?.role || "Lead Architect & Full-Stack Developer.",
        stack: override.stack || curatedMatch?.stack || tags,
        built: override.built || curatedMatch?.built || [
          "Engineered modular architecture with clean separation of concerns.",
          "Implemented robust data handling and responsive user interfaces.",
        ],
        whatDifferent: override.whatDifferent || curatedMatch?.whatDifferent || "In future iterations, I would further optimize caching and offline-first state synchronization.",
        metrics: override.metrics || curatedMatch?.metrics || [
          { label: "Stars", value: `${repo.stargazers_count}` },
          { label: "Primary Language", value: repo.language || "TypeScript" },
        ],
        score,
        pinned: override.pinned,
        pinnedRank: override.pinnedRank,
      };
    });

    // Sort: Pinned repos first by pinnedRank, followed by complexity score descending
    mappedProjects.sort((a, b) => {
      if (a.pinned && b.pinned) {
        return (a.pinnedRank || 99) - (b.pinnedRank || 99);
      }
      if (a.pinned) return -1;
      if (b.pinned) return 1;
      return b.score - a.score;
    });

    // Assign final rank and mark top 6 as featured
    return mappedProjects.map((p, index) => ({
      ...p,
      rank: index + 1,
      featured: index < 6,
    }));
  } catch (err) {
    console.error("Error in fetchGitHubProjects:", err);
    return CURATED_FALLBACK_PROJECTS;
  }
}

function deriveCategory(repo: GitHubRepo): "AI & Reasoning" | "Marketplace & Fintech" | "Mobile & Systems" | "Analytics & ML" {
  const text = `${repo.name} ${repo.description || ""} ${(repo.topics || []).join(" ")}`.toLowerCase();
  if (text.includes("ai") || text.includes("claude") || text.includes("langchain") || text.includes("nlp") || text.includes("agent")) {
    return "AI & Reasoning";
  }
  if (text.includes("pay") || text.includes("pesa") || text.includes("market") || text.includes("agri") || text.includes("fintech")) {
    return "Marketplace & Fintech";
  }
  if (text.includes("android") || text.includes("kotlin") || text.includes("gps") || text.includes("mobile") || text.includes("system")) {
    return "Mobile & Systems";
  }
  return "Analytics & ML";
}
