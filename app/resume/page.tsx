"use client";

import { motion } from "framer-motion";
import { Download, Printer, ArrowLeft, Mail, MapPin, Globe, Linkedin, Github, ExternalLink, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="container-custom max-w-4xl">
        {/* Navigation & Print Controls */}
        <div className="flex items-center justify-between gap-4 mb-8 print:hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-ochre-600 text-dark-950 text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-all shadow-warm cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-8 sm:p-12 rounded-3xl bg-white/[0.02] border border-white/[0.08] shadow-2xl print:bg-white print:text-black print:border-none print:p-0 print:shadow-none space-y-8"
        >
          {/* Header */}
          <header className="border-b border-white/[0.08] print:border-zinc-300 pb-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground print:text-black">
                  Michael Ogutu Mokua
                </h1>
                <p className="text-sm font-mono text-amber-400 print:text-amber-700 font-semibold mt-0.5">
                  Full-Stack Developer & AI Systems Builder · Founder @ MIKESTH3TIC.DEV
                </p>
              </div>
              <div className="text-xs font-mono text-zinc-400 print:text-zinc-600 text-left sm:text-right">
                <p>Nairobi, Kenya 🇰🇪</p>
                <p>Kabarak University (Dec 2026)</p>
              </div>
            </div>

            {/* Contact Details & Links */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-300 print:text-zinc-700 pt-2">
              <a href="mailto:mikestheticdev@gmail.com" className="hover:text-amber-400 flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-amber-400 print:text-zinc-600" />
                mikestheticdev@gmail.com
              </a>
              <span>·</span>
              <a href="mailto:michaelcartelo03@gmail.com" className="hover:text-amber-400 flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-zinc-400 print:text-zinc-600" />
                michaelcartelo03@gmail.com
              </a>
              <span>·</span>
              <a
                href="https://www.linkedin.com/in/michael-mokua-251390302/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 flex items-center gap-1.5"
              >
                <Linkedin className="w-3 h-3 text-amber-400 print:text-zinc-600" />
                LinkedIn
              </a>
              <span>·</span>
              <a
                href="https://github.com/Michael-Mokua"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 flex items-center gap-1.5"
              >
                <Github className="w-3 h-3 text-zinc-300 print:text-zinc-600" />
                GitHub (@Michael-Mokua)
              </a>
              <span>·</span>
              <a
                href="https://mikesth3tic-dev.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 flex items-center gap-1.5"
              >
                <Globe className="w-3 h-3 text-amber-400 print:text-zinc-600" />
                mikesth3tic-dev.vercel.app
              </a>
            </div>
          </header>

          {/* Professional Summary */}
          <section className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-widest text-amber-400 print:text-amber-800 font-bold">
              // Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 print:text-zinc-800 leading-relaxed">
              Full-stack developer and intelligent systems architect based in Nairobi, Kenya. Final-year BSc Information Technology student at Kabarak University (graduating December 2026) and founder of MIKESTH3TIC.DEV. Deep expertise across modern web architectures (React, Next.js, TypeScript, PostgreSQL), AI reasoning integration (Claude 3.5 API, LangChain), and Kenyan mobile payments (M-Pesa / Daraja). Hands-on government ICT infrastructure attachment experience in structured cabling, VoIP, and server maintenance.
            </p>
          </section>

          {/* Experience */}
          <section className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-amber-400 print:text-amber-800 font-bold">
              // Work & Practical Experience
            </h2>

            {/* IFSS Group */}
            <div className="space-y-1.5 border-l-2 border-amber-400/40 print:border-zinc-400 pl-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono">
                <h3 className="text-sm font-bold text-foreground print:text-black">
                  IT Project Manager — IFSS Group
                </h3>
                <span className="text-amber-400 print:text-zinc-600">September 2026 – Present · Nairobi</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 print:text-zinc-700">
                IT project and systems work.
              </p>
            </div>

            {/* MIKESTH3TIC.DEV */}
            <div className="space-y-1.5 border-l-2 border-amber-400/40 print:border-zinc-400 pl-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono">
                <h3 className="text-sm font-bold text-foreground print:text-black">
                  Founder & Lead Architect — MIKESTH3TIC.DEV
                </h3>
                <span className="text-amber-400 print:text-zinc-600">2024 – Present · Nairobi</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 print:text-zinc-700">
                Engineered and shipped 10 production-ready software architectures including agricultural marketplaces (Agri Value Connect / MAZAOLOOP), neuro-symbolic reasoning tools (AURA Intelligence), and financial analytics (ORACLE). Curated proprietary Sheng and Swahili NLP datasets for regional AI products.
              </p>
            </div>

            {/* SDYACE */}
            <div className="space-y-1.5 border-l-2 border-amber-400/40 print:border-zinc-400 pl-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono">
                <h3 className="text-sm font-bold text-foreground print:text-black">
                  ICT Infrastructure & Digitalization Intern — State Dept. for Youth Affairs & Creative Economy (SDYACE)
                </h3>
                <span className="text-amber-400 print:text-zinc-600">3-Month Attachment · Nairobi</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 print:text-zinc-700">
                Executed hands-on network infrastructure, structured cabling, VoIP telephony extension setups, server room operations, and digitalization scoping across KECOBO, DITD, and NYC departments.
              </p>
            </div>
          </section>

          {/* Key Featured Projects */}
          <section className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-widest text-amber-400 print:text-amber-800 font-bold">
              // Featured Software Projects
            </h2>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] print:border-zinc-200 print:bg-zinc-50 space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-foreground print:text-black">Agri Value Connect (MAZAOLOOP)</span>
                  <span className="text-zinc-400 print:text-zinc-600">Next.js · Supabase · M-Pesa Daraja · Groq LLM</span>
                </div>
                <p className="text-xs text-zinc-300 print:text-zinc-700">
                  Agricultural marketplace connecting Kenyan farmers to commercial buyers and crop-waste processors with automated M-Pesa STK Push settlements. Built for KCIC Cleantech Innovation Competition.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] print:border-zinc-200 print:bg-zinc-50 space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-foreground print:text-black">AURA Intelligence</span>
                  <span className="text-zinc-400 print:text-zinc-600">Next.js · Claude 3.5 Sonnet API · LangChain</span>
                </div>
                <p className="text-xs text-zinc-300 print:text-zinc-700">
                  Adaptive User Reasoning Architecture — neuro-symbolic hybrid reasoning platform pairing deterministic logic gates with multi-turn LLM reasoning chains.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] print:border-zinc-200 print:bg-zinc-50 space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-foreground print:text-black">StrideOS</span>
                  <span className="text-zinc-400 print:text-zinc-600">Kotlin · Jetpack Compose · OpenStreetMap</span>
                </div>
                <p className="text-xs text-zinc-300 print:text-zinc-700">
                  Native Android GPS telemetry engine with offline vector route rendering, background tracking service, and local Room DB persistence.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] print:border-zinc-200 print:bg-zinc-50 space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-foreground print:text-black">ORACLE: NSE Market Intelligence</span>
                  <span className="text-zinc-400 print:text-zinc-600">Next.js · Python · Claude API · PostgreSQL</span>
                </div>
                <p className="text-xs text-zinc-300 print:text-zinc-700">
                  Automated financial statement ratio extraction and market sentiment intelligence platform for equities listed on the Nairobi Securities Exchange.
                </p>
              </div>
            </div>
          </section>

          {/* Education */}
          <section className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-widest text-amber-400 print:text-amber-800 font-bold">
              // Education
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono">
              <div>
                <p className="text-sm font-bold text-foreground print:text-black">
                  Bachelor of Science in Information Technology (Candidate)
                </p>
                <p className="text-xs text-zinc-400 print:text-zinc-600">Kabarak University · Nakuru / Nairobi, Kenya</p>
              </div>
              <span className="text-amber-400 print:text-zinc-600 mt-1 sm:mt-0">Graduation: December 2026</span>
            </div>
          </section>

          {/* Technical Skills Matrix */}
          <section className="space-y-3 border-t border-white/[0.08] print:border-zinc-300 pt-6">
            <h2 className="text-xs font-mono uppercase tracking-widest text-amber-400 print:text-amber-800 font-bold">
              // Technical Skills
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] print:border-zinc-200 print:bg-zinc-50">
                <span className="font-mono text-amber-400 print:text-zinc-800 font-bold block mb-1">
                  Languages & Frameworks:
                </span>
                <span className="text-zinc-300 print:text-zinc-700">
                  Next.js (App Router), React, TypeScript, JavaScript, Python, Kotlin (Android), Node.js, Tailwind CSS, HTML5/CSS3.
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] print:border-zinc-200 print:bg-zinc-50">
                <span className="font-mono text-amber-400 print:text-zinc-800 font-bold block mb-1">
                  Databases & Cloud:
                </span>
                <span className="text-zinc-300 print:text-zinc-700">
                  PostgreSQL, Supabase, Firebase Firestore, SQLite, Room DB, Vercel, REST APIs, Webhooks.
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] print:border-zinc-200 print:bg-zinc-50">
                <span className="font-mono text-amber-400 print:text-zinc-800 font-bold block mb-1">
                  AI & Intelligent Systems:
                </span>
                <span className="text-zinc-300 print:text-zinc-700">
                  Claude 3.5 Sonnet API, LangChain, Groq AI, Prompt Engineering, Structured Zod Schemas, Sheng/Swahili NLP Dataset.
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] print:border-zinc-200 print:bg-zinc-50">
                <span className="font-mono text-amber-400 print:text-zinc-800 font-bold block mb-1">
                  Payments & Infrastructure:
                </span>
                <span className="text-zinc-300 print:text-zinc-700">
                  Safaricom M-Pesa Daraja API (STK Push/C2B), Structured Cabling, VoIP Telephony, Server Room Deployment.
                </span>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
