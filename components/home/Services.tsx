"use client";

import { motion } from "framer-motion";
import { Code2, Bot, Smartphone, Network, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Full-Stack Product Engineering",
    description:
      "End-to-end web applications designed for speed, scale, and seamless African payment integration (M-Pesa / Daraja).",
    stack: ["Next.js", "TypeScript", "React", "PostgreSQL", "Supabase", "Tailwind CSS"],
    deliverables: [
      "Custom SaaS architectures & marketplaces",
      "Safaricom M-Pesa Daraja STK Push & C2B checkout",
      "Role-based authentication and secure APIs",
      "Lighthouse-optimized responsive interfaces",
    ],
    icon: Code2,
    accent: "text-amber-400",
  },
  {
    title: "AI Systems & LLM Orchestration",
    description:
      "Intelligent workflows that go beyond simple chat prompts. Custom reasoning pipelines with deterministic safeguards.",
    stack: ["Claude 3.5 API", "LangChain", "Python", "FastAPI", "Vector Embeddings"],
    deliverables: [
      "Autonomous reasoning loops & agent orchestration",
      "Custom Sheng / Swahili prompt tuning & NLP",
      "Automated document synthesis & financial ratio extraction",
      "Anti-hallucination structured JSON output schemas",
    ],
    icon: Bot,
    accent: "text-emerald-400",
  },
  {
    title: "Mobile & Offline-First Solutions",
    description:
      "Native Android applications and offline-ready web platforms engineered for environments with intermittent connectivity.",
    stack: ["Kotlin", "Jetpack Compose", "Room DB", "OpenStreetMap", "IndexedDB"],
    deliverables: [
      "Native Android background GPS & telemetry services",
      "Offline map rendering & local SQLite caching",
      "Low-bandwidth data sync and USSD workflow mockups",
      "Clean Architecture (MVVM/UseCases) codebases",
    ],
    icon: Smartphone,
    accent: "text-blue-400",
  },
  {
    title: "ICT Infrastructure & Digitalization",
    description:
      "Practical network design, systems deployment, and digital transformation scoping backed by government department attachment experience.",
    stack: ["Network Infra", "Structured Cabling", "VoIP", "Server Rooms", "Digital Scoping"],
    deliverables: [
      "Structured network cabling & rack organization",
      "VoIP telephony configuration & server maintenance",
      "Legacy workflow audit & digitalization roadmap",
      "Disaster recovery & data backup planning",
    ],
    icon: Network,
    accent: "text-ochre-400",
  },
];

export function Services() {
  return (
    <section id="services" className="section-padding bg-white/[0.01]">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3 max-w-2xl"
          >
            <p className="text-xs font-mono text-amber-400 tracking-[0.3em] uppercase">
              // Capabilities & Offerings
            </p>
            <h2 className="text-3xl sm:text-5xl font-black text-foreground">
              What I Build for <span className="text-gradient">Clients & Teams.</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400">
              I partner with founders, businesses, and engineering teams to build software that creates measurable value.
            </p>
          </motion.div>

          <Link
            href="/start-project"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-ochre-600 text-dark-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-warm w-fit"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((srv, idx) => (
            <motion.div
              key={srv.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-amber-400/30 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-zinc-200 group-hover:scale-105 transition-all">
                    <srv.icon className={`w-6 h-6 ${srv.accent}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-amber-400 transition-colors">
                      {srv.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                  {srv.description}
                </p>

                <div className="space-y-2 mb-6">
                  <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                    Core Deliverables:
                  </p>
                  {srv.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

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
      </div>
    </section>
  );
}
