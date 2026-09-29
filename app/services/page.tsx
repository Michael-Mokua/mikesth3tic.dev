"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code2, Bot, Smartphone, Network, CheckCircle2, ShieldCheck } from "lucide-react";

const coreOfferings = [
  {
    id: "full-stack",
    title: "1. Full-Stack Web & SaaS Engineering",
    description:
      "End-to-end web applications designed for high performance, modular architecture, and seamless Safaricom M-Pesa payment integration.",
    stack: ["Next.js 14/15", "TypeScript", "React", "PostgreSQL / Supabase", "M-Pesa Daraja", "Tailwind CSS"],
    deliverables: [
      "Custom SaaS platforms & marketplaces",
      "Safaricom M-Pesa Daraja STK Push & C2B checkout flows",
      "Role-based authentication and secure REST/Server Action endpoints",
      "Accessible, responsive interfaces optimized for Lighthouse performance",
    ],
    process: [
      "Requirements gathering & data model specification",
      "Database schema & API routing design",
      "Iterative sprint development with strict typing",
      "Deployment on Vercel/cloud with monitoring",
    ],
  },
  {
    id: "ai-systems",
    title: "2. AI Systems & LLM Orchestration",
    description:
      "Autonomous reasoning pipelines, specialized prompt workflows, and African-market NLP models built with deterministic safeguards against hallucination.",
    stack: ["Claude 3.5 Sonnet", "LangChain", "Python", "FastAPI", "Vector Embeddings", "Sheng Dataset"],
    deliverables: [
      "Neuro-symbolic hybrid reasoning systems (AURA architecture)",
      "Financial report & PDF structured ratio extraction (ORACLE NSE)",
      "Curated Sheng/Swahili prompt injection & localized copywriting (CHAPUO)",
      "Strict Zod/Pydantic schema validation for predictable JSON outputs",
    ],
    process: [
      "Domain context analysis & prompt architecture design",
      "Vector retrieval (RAG) & deterministic rule gating",
      "Inference testing & latency optimization",
      "Secure backend integration & rate-limiting",
    ],
  },
  {
    id: "mobile-telemetry",
    title: "3. Mobile & Offline-First Engineering",
    description:
      "Native Android applications and offline-ready web platforms engineered to perform reliably in low-bandwidth and remote environments.",
    stack: ["Kotlin", "Jetpack Compose", "Room Database", "OpenStreetMap (OSMDroid)", "IndexedDB"],
    deliverables: [
      "Native Android background GPS location services (StrideOS)",
      "Offline vector map rendering and tile caching",
      "Low-bandwidth data synchronization and USSD workflow mockups",
      "Clean Architecture patterns (MVVM, Repositories, UseCases)",
    ],
    process: [
      "Mobile UX & offline state mapping",
      "Native Kotlin / Compose component development",
      "Background worker & battery consumption optimization",
      "Local database migration & test builds",
    ],
  },
  {
    id: "ict-infra",
    title: "4. ICT Infrastructure & Digitalization",
    description:
      "Hardware-level network design, structured cabling, VoIP configuration, and legacy digitalization audits backed by Kenyan government attachment experience.",
    stack: ["Structured Cabling", "Network Switch Routing", "VoIP Telephony", "Server Rooms", "Digital Audits"],
    deliverables: [
      "Structured data cabling & server rack organization",
      "VoIP PBX telephony configuration & testing",
      "Legacy departmental workflow audit & modernization blueprint",
      "Network subnetting, routing, and access control scoping",
    ],
    process: [
      "On-site infrastructure inspection & cable mapping",
      "Network switch topology & IP subnet planning",
      "VoIP extension & server room deployment",
      "Documentation handover & staff onboarding",
    ],
  },
];

export function ServicesPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16 space-y-3"
        >
          <p className="text-xs font-mono text-amber-400 tracking-[0.3em] uppercase">
            // Engineering Offerings
          </p>
          <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight">
            Software & Systems <span className="text-gradient">Capabilities.</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            I work with founders, businesses, and organizations as a full-stack engineer and technical architect. Every deliverable is built on maintainable code and realistic engineering principles.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {coreOfferings.map((srv, idx) => (
            <motion.div
              key={srv.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.07] hover:border-amber-400/30 transition-all flex flex-col justify-between group"
            >
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-amber-400 transition-colors">
                  {srv.title}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                  {srv.description}
                </p>

                {/* Deliverables */}
                <div className="space-y-2 mb-6">
                  <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                    Core Deliverables:
                  </p>
                  {srv.deliverables.map((d, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>

                {/* Process Steps */}
                <div className="space-y-1.5 mb-6 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-semibold mb-2">
                    Execution Steps:
                  </p>
                  {srv.process.map((step, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                      <span className="text-amber-400 font-bold text-[10px]">0{i + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack Pills */}
              <div className="pt-4 border-t border-white/[0.06] flex flex-wrap gap-1.5 mt-2">
                {srv.stack.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-zinc-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-amber-500/15 via-ochre-500/10 to-transparent border border-amber-500/25 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-2xl font-bold text-foreground">Ready to discuss your project?</h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Send over your specifications or schedule an introductory call.
            </p>
          </div>

          <Link
            href="/start-project"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-ochre-600 text-dark-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-warm shrink-0"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;
