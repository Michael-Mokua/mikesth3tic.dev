"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, ArrowRight, Terminal, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";
import { ZoneData } from "./NairobiEnvironment";

interface RetroTerminalModalProps {
  zone: ZoneData | null;
  onClose: () => void;
}

export function RetroTerminalModal({ zone, onClose }: RetroTerminalModalProps) {
  if (!zone) return null;

  const project = zone.project;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-dark-950/95 border-2 border-amber-500/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.25)] text-foreground flex flex-col justify-between"
        >
          {/* Top Window Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="text-xs font-mono text-amber-400 font-bold ml-2">
                NAIROBI_TERMINAL_V1.0 // {zone.name.toUpperCase()}
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close terminal"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Terminal Content */}
          <div className="space-y-6 text-sm">
            {zone.isEasterEgg ? (
              /* Easter Egg Node */
              <div className="space-y-4 py-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-mono font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Hidden Nairobi Node</span>
                </div>
                <h2 className="text-2xl font-black text-foreground">{zone.name}</h2>
                <p className="text-zinc-300 leading-relaxed text-sm sm:text-base border-l-2 border-amber-400 pl-4 py-1">
                  {zone.easterEggText}
                </p>
                <p className="text-xs font-mono text-zinc-500">
                  // Mazee, unaweza endelea ku-drive matatu ugundue projects zote!
                </p>
              </div>
            ) : project ? (
              /* Project Zone Details */
              <div className="space-y-5">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold mb-2 inline-block">
                    {project.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                    {project.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mt-1">
                    {project.tagline}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                    Tech Stack:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((t) => (
                      <span key={t} className="text-xs font-mono px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-amber-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Deliverables */}
                <div className="space-y-2 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold block">
                    What I Built & Role:
                  </span>
                  {project.built.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Sheng commentary */}
                {zone.easterEggText && (
                  <p className="text-xs font-mono text-amber-300/80 italic border-l-2 border-amber-400/40 pl-3">
                    💡 &ldquo;{zone.easterEggText}&rdquo;
                  </p>
                )}
              </div>
            ) : null}
          </div>

          {/* Actions Bar */}
          <div className="pt-6 border-t border-white/[0.08] mt-8 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {project?.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-ochre-600 text-dark-950 text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-all shadow-warm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Demo
                </a>
              )}
              {project?.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 hover:border-amber-400/30 text-zinc-200 hover:text-amber-400 text-xs font-mono transition-all"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub Repo
                </a>
              )}
              {project?.slug && (
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:underline px-2"
                >
                  <span>Full Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-zinc-300 cursor-pointer"
            >
              Back to Driving (ESC)
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
