"use client";

import { motion } from "framer-motion";
import { Cpu, Layers, Database, Shield, Zap, Layout, Terminal } from "lucide-react";
import { useState } from "react";

const PROCESS_STEPS = [
    {
        id: "strategy",
        title: "Strategy & Intelligence",
        icon: Terminal,
        description: "Aligning product vision with technical feasibility. We define the core logic and system requirements.",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
    },
    {
        id: "ux",
        title: "Concept & UX Engineering",
        icon: Layout,
        description: "Designing intuitive interfaces for complex systems. Priority on user flow and accessibility.",
        color: "text-electric-400",
        bg: "bg-electric-400/10",
    },
    {
        id: "engineering",
        title: "Product Engineering",
        icon: Cpu,
        description: "Writing high-performance, scalable code. Building the engines that power your vision.",
        color: "text-neon-400",
        bg: "bg-neon-400/10",
    },
    {
        id: "scale",
        title: "Deployment & Scaling",
        icon: Zap,
        description: "Cloud orchestration and performance tuning. Ensuring your system remains fast under load.",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
    },
];

const STACK_LAYERS = [
    {
        name: "Client Layer",
        icon: Layers,
        tech: ["Next.js", "React Native", "Kotlin", "Three.js"],
        desc: "Immersive, high-performance user interfaces across all platforms."
    },
    {
        name: "Intelligence Layer",
        icon: Cpu,
        tech: ["Llama 3", "Groq", "Vector DBs", "Reasoning Engines"],
        desc: "Integrating advanced AI to automate complex decision-making."
    },
    {
        name: "Infrastructure Layer",
        icon: Database,
        tech: ["PostgreSQL", "Firebase", "Docker", "AWS/Vercel"],
        desc: "Scalable backends and secure cloud architecture built for growth."
    },
    {
        name: "Security Layer",
        icon: Shield,
        tech: ["NextAuth", "JWT", "RBAC", "Cloudflare"],
        desc: "Hardened systems ensuring data integrity and user protection."
    }
];

export function StudioProcess() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container-custom">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter">
                        The <span className="text-gradient">Studio Process</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Our engineering lifecycle is designed for speed, precision, and long-term scalability.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {PROCESS_STEPS.map((step, idx) => (
                        <motion.div
                            key={step.id}
                            className="glass p-8 rounded-[2.5rem] border border-white/5 hover:border-electric-400/30 transition-all group relative overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <div className={`w-14 h-14 rounded-2xl ${step.bg} flex items-center justify-center mb-6 border border-white/5`}>
                                <step.icon className={`w-7 h-7 ${step.color}`} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {step.description}
                            </p>
                            <div className="absolute -bottom-4 -right-4 text-6xl font-black text-white/[0.02] italic tracking-tighter">
                                0{idx + 1}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function VaultExplorer() {
    const [activeLayer, setActiveLayer] = useState(0);

    return (
        <section className="py-24 bg-white/[0.02] border-y border-white/5 relative">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-xs font-mono text-electric-400 mb-4 tracking-widest uppercase">// THE VAULT</p>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter">
                            Engineering <span className="text-gradient">Infrastructure</span>
                        </h2>
                        <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
                            Explore the core technologies that power our studio. Every layer is carefully chosen for maximum performance and future-proofing.
                        </p>

                        <div className="space-y-4">
                            {STACK_LAYERS.map((layer, idx) => (
                                <button
                                    key={layer.name}
                                    onClick={() => setActiveLayer(idx)}
                                    className={`w-full text-left p-6 rounded-3xl border transition-all flex items-center gap-6 ${activeLayer === idx
                                            ? "glass border-electric-400/30 bg-electric-400/10"
                                            : "border-transparent hover:bg-white/5"
                                        }`}
                                >
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeLayer === idx ? "bg-electric-400/20" : "bg-white/5"}`}>
                                        <layer.icon className={`w-6 h-6 ${activeLayer === idx ? "text-electric-400" : "text-muted-foreground"}`} />
                                    </div>
                                    <div>
                                        <h4 className={`font-bold ${activeLayer === idx ? "text-foreground" : "text-muted-foreground"}`}>{layer.name}</h4>
                                        {activeLayer === idx && (
                                            <p className="text-xs text-muted-foreground mt-1 max-w-xs">{layer.desc}</p>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    <div className="relative">
                        <motion.div
                            key={activeLayer}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass p-10 rounded-[3rem] border border-electric-400/20 relative z-10 aspect-square flex flex-col items-center justify-center text-center"
                        >
                            <div className="text-electric-400 mb-8">
                                {(() => {
                                    const Icon = STACK_LAYERS[activeLayer].icon;
                                    return <Icon className="w-20 h-20" />;
                                })()}
                            </div>
                            <h3 className="text-3xl font-bold mb-6">{STACK_LAYERS[activeLayer].name}</h3>
                            <div className="flex flex-wrap justify-center gap-3">
                                {STACK_LAYERS[activeLayer].tech.map((t) => (
                                    <span key={t} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-mono text-muted-foreground">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Background glow */}
                        <div className="absolute inset-0 bg-electric-400/20 rounded-full blur-[120px] -z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}
