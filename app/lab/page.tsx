"use client";

import { motion } from "framer-motion";
import { Terminal, Box, Sparkles, Zap, Beaker, ArrowRight } from "lucide-react";
import Link from "next/link";

const experiments = [
    {
        id: "exp-01",
        title: "Neural Constellation",
        description: "Adaptive R3F particle system with mouse-driven elastic recoil and dynamic constellation nodes.",
        tech: ["Three.js", "R3F", "GLSL"],
        status: "STABLE",
        path: "/"
    },
    {
        id: "exp-02",
        title: "Spatial Handshake",
        description: "Interactive biometric scanning interface with Framer Motion orchestration and SVG filtering.",
        tech: ["Framer Motion", "React", "SVG"],
        status: "ACTIVE",
        path: "/"
    },
    {
        id: "exp-03",
        title: "Liquid Glass UI",
        description: "A comprehensive design system system based on ultra-blurred glassmorphism and neo-brutalist shadows.",
        tech: ["CSS", "Tailwind v4"],
        status: "CORE",
        path: "/blog/webgl-performance"
    }
];

export default function LabPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-electric-400/5 via-dark-950 to-dark-950">
            <div className="container-custom">
                {/* Header */}
                <div className="max-w-4xl mb-24">
                    <div className="flex items-center gap-3 mb-6">
                        <Beaker className="w-5 h-5 text-neon-400" />
                        <span className="text-[10px] font-mono text-neon-400 uppercase tracking-[0.5em] font-bold">
                            // THE_EXPERIMENTAL_LAB
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 italic">
                        The <span className="text-gradient-neon">Lab</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                        A repository of <span className="text-white font-medium italic">unstable architectural prototypes</span> and interaction experiments currently in system training.
                    </p>
                </div>

                {/* Experiments Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {experiments.map((exp, i) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="group liquid-glass p-8 rounded-[2.5rem] border border-white/5 hover:border-neon-400/30 transition-all flex flex-col h-full relative overflow-hidden"
                        >
                            {/* Decorative Grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] -z-10" />

                            <div className="flex items-center justify-between mb-8">
                                <div className="p-3 rounded-2xl bg-neon-400/10 border border-neon-400/20">
                                    <Box className="w-6 h-6 text-neon-400" />
                                </div>
                                <span className="text-[9px] font-mono px-2 py-1 rounded bg-white/5 text-white/40 uppercase tracking-widest">
                                    {exp.status}
                                </span>
                            </div>

                            <h3 className="text-xl font-black uppercase tracking-tight mb-4 group-hover:text-neon-400 transition-colors">
                                {exp.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-1 italic font-light">
                                "{exp.description}"
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {exp.tech.map((t) => (
                                    <span key={t} className="text-[8px] font-mono px-1.5 py-0.5 border border-white/10 rounded uppercase text-white/30 tracking-widest">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <Link 
                                href={exp.path}
                                className="inline-flex items-center gap-2 text-[10px] font-bold text-neon-400 uppercase tracking-widest hover:gap-4 transition-all"
                            >
                                SYSTEM_VIEW <ArrowRight className="w-3 h-3" />
                            </Link>
                        </motion.div>
                    ))}

                    {/* Placeholder for future experiments */}
                    <div className="p-8 rounded-[2.5rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-center group">
                        <Zap className="w-12 h-12 text-white/5 mb-6 group-hover:text-neon-400/20 transition-colors" />
                        <h3 className="text-sm font-mono text-white/20 uppercase tracking-[0.3em]">Protocol_Awaiting...</h3>
                    </div>
                </div>
            </div>
        </main>
    );
}
