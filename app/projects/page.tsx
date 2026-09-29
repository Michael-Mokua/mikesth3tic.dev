"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Github, ExternalLink, ArrowRight, Code2, CheckCircle2, Layers } from "lucide-react";
import Link from "next/link";
import { getAllProjects, Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

const categories = ["All", "AI & Reasoning", "Marketplace & Fintech", "Mobile & Systems", "Analytics & ML"];

export default function ProjectsPage() {
  const allProjects = useMemo(() => getAllProjects(), []);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.tagline.toLowerCase().includes(query) ||
        project.tags.some((t) => t.toLowerCase().includes(query)) ||
        project.stack.some((s) => s.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [allProjects, selectedCategory, searchQuery]);

  return (
    <div className="pt-32 pb-24">
      <div className="container-custom">
        {/* Page Header */}
        <div className="mb-14 space-y-3">
          <p className="text-xs font-mono text-amber-400 tracking-[0.3em] uppercase">
            // Engineering Portfolio
          </p>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground">
            Projects & <span className="text-gradient">Case Studies.</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
            A comprehensive archive of software products, agricultural marketplaces, neuro-symbolic AI engines, and mobile telemetry systems engineered by Michael Ogutu Mokua.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by name, technology, or domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-foreground placeholder-zinc-500 focus:border-amber-400/50 focus:outline-none transition-colors"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all",
                  selectedCategory === cat
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold"
                    : "bg-white/[0.02] border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/15"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectArchiveCard key={project.slug} project={project} index={idx} />
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-20 text-center rounded-3xl bg-white/[0.01] border border-dashed border-white/10 p-8 space-y-3">
            <p className="text-zinc-400 text-sm">No projects found matching &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="text-xs font-mono text-amber-400 hover:underline"
            >
              Clear filters and view all projects
            </button>
          </div>
        )}

        {/* GitHub Direct Link Banner */}
        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-foreground">Explore all 49+ Public Repositories</h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Check out open source experiments, utility packages, and code commits on GitHub.
            </p>
          </div>

          <a
            href="https://github.com/Michael-Mokua"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.05] border border-white/10 hover:border-amber-400/40 text-zinc-200 hover:text-amber-400 text-xs font-mono font-bold transition-all shrink-0"
          >
            <Github className="w-4 h-4" />
            <span>github.com/Michael-Mokua</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

function ProjectArchiveCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="group flex flex-col justify-between rounded-3xl p-7 bg-white/[0.02] border border-white/[0.07] hover:border-amber-500/30 transition-all duration-300"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-amber-400 font-semibold">
            {project.category}
          </span>
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live Demo of ${project.title}`}
                className="p-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-zinc-400 hover:text-amber-400 hover:border-amber-400/40 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repo of ${project.title}`}
              className="p-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-amber-400 transition-colors tracking-tight">
          {project.title}
        </h3>

        <p className="text-xs text-zinc-300 leading-relaxed mb-6 line-clamp-3">
          {project.tagline}
        </p>

        <div className="space-y-1.5 mb-6 text-xs text-zinc-400">
          {project.built.slice(0, 2).map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
              <span className="line-clamp-2">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3 mt-4">
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 3).map((t) => (
            <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-zinc-400">
              {t}
            </span>
          ))}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors shrink-0 group/link"
        >
          <span>Case Study</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
