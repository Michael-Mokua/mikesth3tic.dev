"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, MapPin } from "lucide-react";
import Link from "next/link";
import { ExploreModeTrigger } from "@/components/explore/ExploreModeTrigger";
import { getFeaturedProjects } from "@/lib/projects";

export function HeroSection() {
  const featuredProjects = getFeaturedProjects();

  return (
    <section
      className="relative min-h-[92vh] w-full flex items-center justify-center pt-28 pb-16 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-500/10 via-ochre-500/5 to-cyan-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="container-custom relative z-10 w-full">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Status & Origin Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 flex flex-wrap items-center justify-center gap-2.5"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-semibold bg-amber-500/10 border border-amber-500/25 text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Nairobi, Kenya 🇰🇪 · Founder @ MIKESTH3TIC.DEV
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-white/[0.03] border border-white/[0.08] text-zinc-400">
              <MapPin className="w-3 h-3 text-amber-400" />
              Kabarak University (Class of '26)
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 space-y-2"
          >
            <p className="text-xs sm:text-sm font-mono text-zinc-400 uppercase tracking-[0.3em]">
              Full-Stack Developer & AI Systems Builder
            </p>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[1.02]">
              Michael <span className="text-gradient">Ogutu Mokua.</span>
            </h1>
          </motion.div>

          {/* Tagline & Story Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 space-y-4 max-w-2xl"
          >
            <p className="text-lg sm:text-xl font-mono text-amber-400 font-semibold tracking-wide">
              &ldquo;Disrupt. Automate. Dominate.&rdquo;
            </p>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Rooted in a farming background off Old Kangundo Road and sharpened by government ICT infrastructure experience, I build production-grade web applications, agritech platforms, and specialized LLM reasoning pipelines.
            </p>
          </motion.div>

          {/* 3D Interactive Explore Trigger (Special Feature) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mb-8"
          >
            <ExploreModeTrigger projects={featuredProjects} variant="hero" />
          </motion.div>

          {/* Direct CTA Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-14"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-ochre-600 text-dark-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-warm hover:scale-105 active:scale-95"
            >
              Explore Selected Work
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 bg-white/[0.03] text-zinc-200 hover:text-white hover:border-amber-400/40 hover:bg-white/[0.07] font-bold text-xs uppercase tracking-wider transition-all"
            >
              Start a Project
            </Link>

            <Link
              href="/resume"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-white/10 bg-transparent text-zinc-400 hover:text-amber-400 text-xs font-mono transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              Resume (PDF)
            </Link>
          </motion.div>

          {/* Quick Real Stack Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-2 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-zinc-400"
          >
            <span className="text-zinc-500 uppercase tracking-wider mr-2">Core Arsenal:</span>
            {["Next.js / React", "TypeScript", "Python", "Claude API / LangChain", "PostgreSQL / Supabase", "Kotlin (Android)", "M-Pesa Daraja"].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/[0.06] text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
