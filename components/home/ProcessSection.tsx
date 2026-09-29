"use client";

import { motion } from "framer-motion";
import { Compass, Code2, TestTube2, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery & Architecture Blueprint",
    description:
      "We define the problem, user journeys, data schemas, and regional constraints (e.g., M-Pesa flows, offline requirements) before writing a line of code.",
    icon: Compass,
    accent: "text-amber-400",
  },
  {
    number: "02",
    title: "Rapid Prototype & API Spikes",
    description:
      "I build functional prototypes to validate core technical risks early — testing Daraja STK push webhooks, Claude prompt structures, and database throughput.",
    icon: TestTube2,
    accent: "text-emerald-400",
  },
  {
    number: "03",
    title: "Production-Grade Engineering",
    description:
      "Writing clean, modular Next.js / TypeScript / Python code with strict typing, responsive layouts, accessible UI components, and resilient error handling.",
    icon: Code2,
    accent: "text-blue-400",
  },
  {
    number: "04",
    title: "Hardening, Deployment & Handover",
    description:
      "Automated CI/CD deployment on Vercel/cloud, Lighthouse performance tuning, SEO metadata optimization, and comprehensive documentation for seamless maintenance.",
    icon: Rocket,
    accent: "text-ochre-400",
  },
];

export function ProcessSection() {
  return (
    <section className="section-padding relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center max-w-2xl mx-auto"
        >
          <p className="text-xs font-mono text-amber-400 tracking-[0.3em] uppercase mb-2">
            // Engineering Workflow
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-foreground">
            How I Take Products from <span className="text-gradient">Concept to Launch.</span>
          </h2>
          <p className="text-sm text-zinc-400 mt-3">
            A structured, transparent development lifecycle focused on engineering velocity and maintainability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-7 rounded-3xl bg-white/[0.02] border border-white/[0.07] hover:border-amber-400/30 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-black font-mono text-white/20 group-hover:text-amber-400 transition-colors">
                    {step.number}
                  </span>
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-zinc-300">
                    <step.icon className={`w-5 h-5 ${step.accent}`} />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-amber-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
