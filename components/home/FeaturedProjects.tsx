"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { getFeaturedProjects, Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function FeaturedProjects() {
  const projects = getFeaturedProjects();

  return (
    <section id="work" className="section-padding relative">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <p className="text-xs font-mono text-amber-400 tracking-[0.3em] uppercase">
              // Selected Work & Case Studies
            </p>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
              Production <span className="text-gradient">Architectures.</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl">
              Real platforms built with real code. From agricultural marketplaces and M-Pesa integrations to neuro-symbolic AI engines and native Android GPS telemetry.
            </p>
          </motion.div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-mono text-zinc-300 hover:text-amber-400 hover:border-amber-400/40 transition-all w-fit"
          >
            <span>View All 10 Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => {
            const isWide = idx === 0 || idx === 3;
            return (
              <ProjectCard key={project.slug} project={project} index={idx} isWide={isWide} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, isWide }: { project: Project; index: number; isWide: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={cn(
        "group relative flex flex-col justify-between rounded-3xl p-7 sm:p-8 bg-white/[0.02] border border-white/[0.08] hover:border-amber-500/30 transition-all duration-300 overflow-hidden",
        isWide ? "lg:col-span-2" : "lg:col-span-1"
      )}
    >
      {/* Background Hover Accent */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10",
          project.gradient
        )}
      />

      {/* Card Header: Category & External Links */}
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
                className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-zinc-400 hover:text-amber-400 hover:border-amber-400/40 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository of ${project.title}`}
              className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-xl sm:text-2xl font-black text-foreground mb-2 group-hover:text-amber-400 transition-colors tracking-tight">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6 line-clamp-3">
          {project.tagline}
        </p>

        {/* Key Features Bullet points */}
        <div className="space-y-1.5 mb-6 text-xs text-zinc-400">
          {project.built.slice(0, isWide ? 3 : 2).map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span className="line-clamp-2">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Footer: Tags & Case Study Link */}
      <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 mt-4">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-zinc-400">
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors group/link"
        >
          <span>Case Study</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
