"use client";

import { motion } from "framer-motion";
import { GraduationCap, ShieldCheck, Trophy, Sparkles, Building2 } from "lucide-react";

const milestones = [
  {
    title: "BSc Information Technology",
    organization: "Kabarak University",
    date: "Graduating Dec 2026",
    description: "Final-year student specializing in software engineering, database architectures, networks, and intelligent systems.",
    icon: GraduationCap,
    badge: "Academic Degree",
    accent: "text-amber-400",
    border: "group-hover:border-amber-400/40",
  },
  {
    title: "Government ICT Attachment",
    organization: "State Dept. for Youth Affairs & Creative Economy",
    date: "3-Month Attachment",
    description: "Hands-on network infrastructure, structured cabling, VoIP systems, server room maintenance, and digitalisation scoping across KECOBO, DITD, and NYC.",
    icon: Building2,
    badge: "Infrastructure & Gov-Tech",
    accent: "text-blue-400",
    border: "group-hover:border-blue-400/40",
  },
  {
    title: "KCIC Cleantech Innovation",
    organization: "Kenya Climate Innovation Center",
    date: "Agri-Value Connect",
    description: "Built Agri Value Connect (MAZAOLOOP), an AI-driven agricultural marketplace for crop-waste byproduct matching and M-Pesa settlements.",
    icon: Trophy,
    badge: "Competition Platform",
    accent: "text-emerald-400",
    border: "group-hover:border-emerald-400/40",
  },
  {
    title: "Founder, MIKESTH3TIC.DEV",
    organization: "Nairobi AI Software Studio",
    date: "Established in Nairobi",
    description: "Built and published 10 production-ready architectures, curated proprietary Sheng/Swahili datasets, and established an Africa-first engineering brand.",
    icon: Sparkles,
    badge: "Studio Founder",
    accent: "text-ochre-400",
    border: "group-hover:border-ochre-400/40",
  },
];

export function TrophyCabinet() {
  return (
    <section className="section-padding relative" aria-label="Key Milestones">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center max-w-2xl mx-auto"
        >
          <p className="text-xs font-mono text-amber-400 tracking-[0.3em] uppercase mb-2">
            // Milestones & Credentials
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground">
            Defensible <span className="text-gradient">Milestones.</span>
          </h2>
          <p className="text-sm text-zinc-400 mt-3">
            Real achievements and practical foundations across academic degrees, public infrastructure attachments, and shipped technology platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {milestones.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`p-7 rounded-3xl bg-white/[0.02] border border-white/[0.07] ${item.border} transition-all duration-300 group flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-zinc-300 group-hover:scale-105 transition-all">
                    <item.icon className={`w-6 h-6 ${item.accent}`} />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-amber-400/90 font-medium mb-3">
                  {item.organization} · {item.date}
                </p>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
