"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Sparkles, Gamepad2 } from "lucide-react";
import { Project } from "@/lib/projects";

// Dynamic import: Only loads Three.js & R3F when visitor clicks Explore in 3D!
const DynamicExploreMode = dynamic(
  () => import("./ExploreMode").then((mod) => mod.ExploreMode),
  { ssr: false }
);

interface ExploreModeTriggerProps {
  projects: Project[];
  variant?: "button" | "pill" | "hero";
  className?: string;
}

export function ExploreModeTrigger({ projects, variant = "button", className = "" }: ExploreModeTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {variant === "hero" ? (
        <button
          onClick={() => setIsOpen(true)}
          className={`group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-amber-500/10 border border-amber-500/30 hover:border-amber-400 text-amber-300 hover:text-amber-200 font-mono text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(245,158,11,0.15)] cursor-pointer ${className}`}
        >
          <Gamepad2 className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span>Explore in 3D (Drive Matatu)</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </button>
      ) : variant === "pill" ? (
        <button
          onClick={() => setIsOpen(true)}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:text-white text-xs font-mono font-bold transition-all hover:scale-105 cursor-pointer ${className}`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>3D World</span>
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-amber-400/40 text-xs font-mono text-zinc-300 hover:text-amber-400 transition-all cursor-pointer ${className}`}
        >
          <Gamepad2 className="w-3.5 h-3.5 text-amber-400" />
          <span>Explore in 3D</span>
        </button>
      )}

      {isOpen && (
        <DynamicExploreMode
          projects={projects}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
