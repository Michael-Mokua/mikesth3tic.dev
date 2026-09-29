import type { Metadata } from "next";
import Link from "next/link";
import { Clock, MapPin, Briefcase, Code2, BookOpen, Sparkles, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Now",
  description: "What Michael Ogutu Mokua is currently building, studying, and focusing on right now in Nairobi, Kenya.",
};

export default function NowPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container-custom max-w-3xl">
        {/* Header */}
        <div className="mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-mono font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>Updated September 2026 · Nairobi, Kenya</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight">
            What I&apos;m Doing <span className="text-gradient">Now.</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Inspired by Derek Sivers&apos; &ldquo;Now Page&rdquo; concept. A public update on my current priorities, active software builds, and technical focus areas.
          </p>
        </div>

        {/* Current Priorities List */}
        <div className="space-y-6 text-sm sm:text-base text-zinc-300 leading-relaxed mb-16">
          {/* Priority 1 */}
          <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.07] space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">
              <Briefcase className="w-4 h-4" />
              <span>01. Professional Role</span>
            </div>
            <h2 className="text-xl font-bold text-foreground">IT Project Manager @ IFSS Group</h2>
            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
              Working as an IT Project Manager at IFSS Group since September 2026, handling IT project and systems work.
            </p>
          </div>

          {/* Priority 2 */}
          <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.07] space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">
              <Code2 className="w-4 h-4" />
              <span>02. Software & Studio Builds</span>
            </div>
            <h2 className="text-xl font-bold text-foreground">Shipping Agri Value Connect & Curating Sheng NLP</h2>
            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
              Iterating on <strong className="text-foreground">Agri Value Connect (MAZAOLOOP)</strong> — refining M-Pesa automated reconciliation and crop-waste matching. Simultaneously expanding my proprietary <strong className="text-foreground">Sheng/Swahili dataset</strong> to improve cultural nuance in regional AI products.
            </p>
          </div>

          {/* Priority 3 */}
          <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.07] space-y-3">
            <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase tracking-widest font-bold">
              <BookOpen className="w-4 h-4" />
              <span>03. Academic Graduation</span>
            </div>
            <h2 className="text-xl font-bold text-foreground">Completing BSc IT @ Kabarak University</h2>
            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
              Finishing my final-year coursework and capstone research project in Information Technology at Kabarak University, heading into graduation in December 2026.
            </p>
          </div>

          {/* Priority 4 */}
          <div className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.07] space-y-3">
            <div className="flex items-center gap-2 text-ochre-400 font-mono text-xs uppercase tracking-widest font-bold">
              <Sparkles className="w-4 h-4" />
              <span>04. Research & Deep-Dives</span>
            </div>
            <h2 className="text-xl font-bold text-foreground">Neuro-Symbolic AI & Low-Bandwidth Sync</h2>
            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
              Studying deterministic validation architectures for LLM reasoning (Zod schemas, AST trees) and exploring SQLite/WASM client caching to minimize mobile data consumption in African markets.
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="pt-8 border-t border-white/[0.08] flex items-center justify-between">
          <Link
            href="/about"
            className="text-xs font-mono text-zinc-400 hover:text-amber-400 transition-colors"
          >
            ← Read My Full Background & Story
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 hover:underline"
          >
            <span>Reach Out</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
