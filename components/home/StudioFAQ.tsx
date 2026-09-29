"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    id: "01",
    question: "What is MIKESTH3TIC.DEV and who is behind it?",
    answer:
      "MIKESTH3TIC.DEV is my independent software studio based in Nairobi, Kenya. Founded by Michael Ogutu Mokua, I build full-stack web applications, localized AI reasoning workflows, and African-market digital products with Next.js, Python, and Claude API.",
  },
  {
    id: "02",
    question: "How do you ensure reliability in your AI and LLM integrations?",
    answer:
      "I engineer hybrid systems that pair neural LLMs with strict deterministic validation gates. Instead of raw text prompting, I use structured schema enforcement (Zod/Pydantic), anti-hallucination checks, and vector retrieval pipelines so every output is defensible and accurate.",
  },
  {
    id: "03",
    question: "Do you build M-Pesa (Daraja) and African payment integrations?",
    answer:
      "Yes. I have implemented Safaricom Daraja STK Push, C2B payment verification, and webhook reconciliation in production platforms like Agri Value Connect, ensuring instant, automated settlements for users.",
  },
  {
    id: "04",
    question: "What was your government ICT attachment experience?",
    answer:
      "I completed a 3-month ICT attachment at the State Department for Youth Affairs and Creative Economy (SDYACE). I worked directly on structured cabling, VoIP configuration, network switch routing, server room maintenance, and digitalization audits across KECOBO, DITD, and NYC.",
  },
  {
    id: "05",
    question: "What is your availability for freelance, contract, or engineering roles?",
    answer:
      "I am open to contract product builds, technical consultations, and engineering discussions. Send a project brief or email me directly at mikestheticdev@gmail.com, and I typically respond within 24 hours.",
  },
];

export function StudioFAQ() {
  const [openId, setOpenId] = useState<string | null>("01");

  return (
    <section className="section-padding relative" aria-label="Frequently Asked Questions">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Heading & Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6 lg:sticky lg:top-28"
          >
            <div className="space-y-3">
              <p className="text-xs font-mono text-amber-400 tracking-[0.3em] uppercase">
                // Clarifications & FAQs
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground">
                Frequently Asked <span className="text-gradient">Questions.</span>
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Everything you need to know about my engineering capabilities, project timelines, and technical background.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
              <h3 className="text-base font-bold text-foreground">Have a specific question or project idea?</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Reach out directly and let&apos;s discuss how we can build your product.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-ochre-600 text-dark-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-warm"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-white/[0.03] border-amber-400/30 shadow-sm"
                      : "bg-white/[0.01] border-white/[0.06] hover:border-white/15"
                  }`}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full p-5 sm:p-6 flex items-center justify-between text-left gap-4"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono text-amber-400/80 font-bold shrink-0">{faq.id}</span>
                      <h3 className="text-sm sm:text-base font-bold text-foreground">{faq.question}</h3>
                    </div>
                    <div
                      className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                        isOpen ? "bg-amber-400 text-dark-950" : "bg-white/5 text-zinc-400"
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-5 sm:px-6 pb-6"
                      >
                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pl-7 sm:pl-8 border-l border-amber-400/20">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
