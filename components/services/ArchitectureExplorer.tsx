"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Code2, TrendingUp, Layout, ArrowRight, CheckCircle2, Cpu, Globe, Database, Shield } from "lucide-react";

const services = [
    {
        id: "ai",
        icon: Bot,
        title: "AI Systems",
        shortDesc: "Custom AI advisory, dashboards, and recommendation engines.",
        details: {
            features: ["RAG-based Knowledge Bases", "Autonomous Agents", "Predictive Analytics", "Custom LLM Integration"],
            architecture: "Hybrid Cloud + Vector DB",
            impact: "80% reduction in manual data processing time."
        }
    },
    {
        id: "software",
        icon: Code2,
        title: "Software Engineering",
        shortDesc: "Full-stack Next.js/Node.js architecture and secure APIs.",
        details: {
            features: ["Microservices Architecture", "Real-time WebSockets", "Secure Auth Systems", "Performance Optimization"],
            architecture: "Event-Driven Node.js",
            impact: "Scalable up to 1M+ concurrent requests."
        }
    },
    {
        id: "data",
        icon: TrendingUp,
        title: "Data & Analytics",
        shortDesc: "Live dashboards and real-time visualization platforms.",
        details: {
            features: ["D3.js Visualization", "Stream Processing", "IoT Data Sink", "Executive Dashboards"],
            architecture: "Pipeline-First Architecture",
            impact: "Real-time decision making for stakeholders."
        }
    },
    {
        id: "modern-web",
        icon: Layout,
        title: "Modern Web",
        shortDesc: "Interactive UI/UX systems and immersive corporate platforms.",
        details: {
            features: ["Immersive 3D UI", "Motion Design Systems", "High-Conversion UX", "SEO/Performance Core"],
            architecture: "Edge-Rendered Next.js",
            impact: "Top-tier user engagement and retention."
        }
    }
];

export function ArchitectureExplorer() {
    const [selectedId, setSelectedId] = useState(services[0].id);

    const selected = services.find(s => s.id === selectedId)!;

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* List Side */}
                <div className="space-y-4">
                    {services.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => setSelectedId(s.id)}
                            className={`w-full text-left p-6 rounded-3xl border transition-all duration-300 group ${selectedId === s.id
                                    ? "glass border-electric-400/50 bg-electric-400/5 shadow-lg shadow-electric-400/10"
                                    : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]"
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${selectedId === s.id ? "bg-electric-400 text-dark-900" : "bg-white/5 text-electric-400 group-hover:bg-white/10"
                                    }`}>
                                    <s.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className={`font-bold transition-colors ${selectedId === s.id ? "text-foreground" : "text-muted-foreground"}`}>
                                        {s.title}
                                    </h3>
                                    <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest leading-none mt-1">
                                        SYSTEM.{s.id.toUpperCase()}
                                    </p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Explorer Display */}
                <div className="lg:col-span-2">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedId}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="glass p-10 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent h-full relative overflow-hidden"
                        >
                            {/* Decorative Background Icon */}
                            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                                <selected.icon className="w-64 h-64" />
                            </div>

                            <div className="relative z-10 space-y-8">
                                <div className="space-y-2">
                                    <h2 className="text-4xl font-black text-foreground">{selected.title}</h2>
                                    <p className="text-muted-foreground leading-relaxed max-w-xl">
                                        {selected.shortDesc}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <h4 className="text-xs font-mono text-electric-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-electric-400" />
                                            Core Capabilities
                                        </h4>
                                        <ul className="space-y-4">
                                            {selected.details.features.map((f, i) => (
                                                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground group">
                                                    <CheckCircle2 className="w-4 h-4 text-electric-400/50 group-hover:text-electric-400 transition-colors" />
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                                            <h4 className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-3">System Architecture</h4>
                                            <p className="text-sm font-bold text-foreground flex items-center gap-2">
                                                <Database className="w-4 h-4 text-neon-400" />
                                                {selected.details.architecture}
                                            </p>
                                        </div>
                                        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                                            <h4 className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-3">Enterprise Impact</h4>
                                            <p className="text-sm font-bold text-foreground flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4 text-electric-400" />
                                                {selected.details.impact}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-mono text-muted-foreground uppercase">Status</span>
                                            <span className="text-[10px] font-mono text-green-400 uppercase">Deployed</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-mono text-muted-foreground uppercase">Compliance</span>
                                            <span className="text-[10px] font-mono text-foreground uppercase">Standard</span>
                                        </div>
                                    </div>
                                    <button className="flex items-center gap-2 text-xs font-bold text-electric-400 hover:text-white transition-colors group">
                                        Inquire About {selected.id === 'ai' ? 'AI' : 'this'} System
                                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
