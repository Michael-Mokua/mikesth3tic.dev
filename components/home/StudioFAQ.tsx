"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, Shield, Zap, Terminal } from "lucide-react";
import { useState } from "react";

const faqs = [
    {
        id: "01",
        question: "What is the 'MIKESTH3TIC' architectural philosophy?",
        answer: "We believe software is a living organism. Our philosophy, 'Software-First Technology', prioritizes architectural integrity, sub-10ms performance, and an immersive aesthetic that communicates technical dominance.",
        protocol: "PROTOCOL_CORE"
    },
    {
        id: "02",
        question: "How do you handle project scalability for startups?",
        answer: "Every node we deploy is architected for 'Hyper-Scale'. We utilize distributed edge runtimes, multi-tenant database patterns, and elastic compute orchestration to ensure your system grows without friction.",
        protocol: "PROTOCOL_SCALE"
    },
    {
        id: "03",
        question: "Can I integrate AI beyond simple chat interfaces?",
        answer: "Absolutely. We specialize in 'Agentic Integration'—embedding autonomous neural nodes directly into your business logic to automate decision-making, content synthesis, and user personalization.",
        protocol: "PROTOCOL_NEURAL"
    },
    {
        id: "04",
        question: "What is the typical 'Handshake' duration?",
        answer: "From initialization (kickoff) to V1 deployment, we aim for a 4-8 week cycle depending on complexity. Our sprint protocols are optimized for high-velocity software studios.",
        protocol: "PROTOCOL_TIME"
    }
];

export function StudioFAQ() {
    const [openId, setOpenId] = useState<string | null>("01");

    return (
        <section className="section-padding bg-dark-950/50 relative overflow-hidden">
            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <HelpCircle className="w-5 h-5 text-electric-400" />
                        <span className="text-[10px] font-mono text-electric-400 uppercase tracking-[0.5em] font-bold">
                            // SYSTEM_PROTOCOLS
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                        Frequent <span className="text-gradient">Handshakes</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-4">
                        {faqs.map((faq) => (
                            <motion.div
                                key={faq.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className={`rounded-[1.5rem] border transition-all duration-500 overflow-hidden ${
                                    openId === faq.id 
                                    ? "liquid-glass border-electric-400/30" 
                                    : "bg-white/[0.02] border-white/5 hover:border-white/10"
                                }`}
                            >
                                <button
                                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                                    className="w-full p-6 flex items-center justify-between text-left"
                                >
                                    <div className="flex items-center gap-6">
                                        <span className="text-xs font-mono text-white/20">{faq.id}</span>
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-white/80">
                                            {faq.question}
                                        </h3>
                                    </div>
                                    <div className={`p-2 rounded-lg transition-colors ${openId === faq.id ? "bg-electric-400 text-dark-950" : "bg-white/5 text-white/40"}`}>
                                        {openId === faq.id ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {openId === faq.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-6 pb-6"
                                        >
                                            <div className="pl-12">
                                                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                                    {faq.answer}
                                                </p>
                                                <div className="flex items-center gap-2 px-2 py-1 rounded bg-electric-400/5 border border-electric-400/10 w-fit">
                                                    <Terminal className="w-3 h-3 text-electric-400" />
                                                    <span className="text-[8px] font-mono text-electric-400">
                                                        {faq.protocol}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>

                    <div className="hidden lg:block">
                        <div className="sticky top-24 p-8 rounded-[2.5rem] liquid-glass border-white/10 text-center">
                            <Shield className="w-16 h-16 text-electric-400 mx-auto mb-6 opacity-20" />
                            <h3 className="text-xl font-black mb-4 uppercase tracking-wider">Still have questions?</h3>
                            <p className="text-sm text-muted-foreground mb-8">
                                Initialize a direct secure handshake with our core system architect for custom protocol analysis.
                            </p>
                            <div className="p-1 rounded-full bg-electric-400/10 border border-electric-400/20 mb-8 max-w-xs mx-auto">
                                <div className="flex items-center justify-between px-4 py-2">
                                    <span className="text-[10px] font-mono text-electric-400">ENCRYPTION: AES_256</span>
                                    <Zap className="w-3 h-3 text-electric-400" />
                                </div>
                            </div>
                            <button className="w-full py-4 rounded-2xl bg-electric-400 text-dark-950 font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all">
                                Initialize Direct Contact
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-electric-400/5 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-400/5 blur-[100px] rounded-full -z-10" />
        </section>
    );
}
