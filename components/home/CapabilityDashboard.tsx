"use client";

import { motion } from "framer-motion";
import { GitBranch, ShieldCheck, Cpu, Database, Award, Server } from "lucide-react";

const verifiableMetrics = [
  {
    label: "Public Repositories on GitHub",
    value: "49+",
    detail: "Marketplaces, ML pipelines, mobile apps & AI tools",
    icon: GitBranch,
    accent: "text-amber-400",
  },
  {
    label: "Shipped Architectures",
    value: "10",
    detail: "Full-stack web apps, Android telemetry & NLP engines",
    icon: Cpu,
    accent: "text-emerald-400",
  },
  {
    label: "Gov ICT Infrastructure Attachment",
    value: "3 Months",
    detail: "SDYACE — Structured cabling, VoIP, server rooms & scoping",
    icon: Server,
    accent: "text-blue-400",
  },
  {
    label: "Sheng & Swahili AI Dataset",
    value: "Curated",
    detail: "Proprietary lexicon feeding localized African AI products",
    icon: Database,
    accent: "text-ochre-400",
  },
];

export function CapabilityDashboard() {
  return (
    <section className="py-16 md:py-24 bg-white/[0.01] border-y border-white/[0.05]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center max-w-2xl mx-auto"
        >
          <p className="text-xs font-mono text-amber-400 tracking-[0.3em] uppercase mb-2">
            // Verified Track Record
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground">
            Grounded in Real <span className="text-gradient">Experience.</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Every metric below is directly verifiable through my GitHub repositories, academic milestones, and shipped codebases.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {verifiableMetrics.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-amber-400/30 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4 text-zinc-300 group-hover:text-amber-400 group-hover:scale-105 transition-all">
                  <item.icon className="w-5 h-5" />
                </div>
                <p className="text-3xl sm:text-4xl font-black text-foreground tracking-tight mb-1">
                  <span className={item.accent}>{item.value}</span>
                </p>
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold mb-2">
                  {item.label}
                </h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed border-t border-white/[0.04] pt-3 mt-3">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
