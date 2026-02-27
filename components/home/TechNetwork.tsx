"use client";

import { motion } from "framer-motion";
import {
    Cpu,
    Database,
    Globe,
    Layers,
    Smartphone,
    Zap,
    Terminal,
    Palette,
    Shield,
    Cloud,
    GitBranch,
    Box
} from "lucide-react";

const techNodes = [
    { name: "Next.js", icon: Globe, x: "20%", y: "30%", color: "text-white" },
    { name: "React", icon: Box, x: "40%", y: "20%", color: "text-electric-400" },
    { name: "TypeScript", icon: Terminal, x: "60%", y: "25%", color: "text-blue-400" },
    { name: "Node.js", icon: Cpu, x: "80%", y: "40%", color: "text-green-400" },
    { name: "MongoDB", icon: Database, x: "70%", y: "70%", color: "text-green-500" },
    { name: "Firebase", icon: Flame, iconOverride: true, x: "50%", y: "80%", color: "text-orange-400" },
    { name: "Kotlin", icon: Smartphone, x: "30%", y: "75%", color: "text-purple-400" },
    { name: "Git", icon: GitBranch, x: "15%", y: "60%", color: "text-red-400" },
    { name: "Three.js", icon: Layers, x: "40%", y: "50%", color: "text-neon-400" },
    { name: "Tailwind", icon: Palette, x: "60%", y: "55%", color: "text-cyan-400" },
];

import { Flame } from "lucide-react";

export function TechNetwork() {
    return (
        <section className="py-24 relative overflow-hidden bg-dark-950/50">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <p className="text-sm font-mono text-electric-400 mb-3 tracking-widest uppercase">// NEURAL TECH STACK</p>
                    <h2 className="text-4xl md:text-5xl font-black mb-4">The <span className="text-gradient">Intelligence Network.</span></h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A visualized web of the technologies powering our high-performance systems.
                    </p>
                </div>

                <div className="relative h-[600px] w-full glass rounded-[3rem] border border-white/5 overflow-hidden group">
                    {/* SVG Connections Layer */}
                    <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
                        <defs>
                            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="var(--electric-400)" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="var(--neon-400)" stopOpacity="0.8" />
                            </linearGradient>
                        </defs>
                        {/* Dynamic connection lines simulation */}
                        <motion.path
                            d="M 20% 30% L 40% 20% L 60% 25% L 80% 40% L 70% 70% L 50% 80% L 30% 75% L 15% 60% Z"
                            fill="none"
                            stroke="url(#lineGrad)"
                            strokeWidth="1"
                            strokeDasharray="10 20"
                            animate={{ strokeDashoffset: [0, -100] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                        <line x1="40%" y1="50%" x2="40%" y2="20%" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
                        <line x1="40%" y1="50%" x2="60%" y2="55%" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
                        <line x1="60%" y1="55%" x2="60%" y2="25%" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
                        <line x1="60%" y1="55%" x2="70%" y2="70%" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
                    </svg>

                    {/* Nodes Layer */}
                    {techNodes.map((node, i) => (
                        <motion.div
                            key={node.name}
                            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group/node"
                            style={{ left: node.x, top: node.y }}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05, type: "spring", stiffness: 200, damping: 20 }}
                        >
                            <motion.div
                                className={`w-14 h-14 rounded-2xl glass border border-white/10 flex items-center justify-center bg-white/[0.03] group-hover/node:border-electric-400/50 group-hover/node:bg-electric-400/5 transition-all duration-300 shadow-xl`}
                                whileHover={{ y: -5, scale: 1.1 }}
                            >
                                <node.icon className={`w-6 h-6 ${node.color} group-hover/node:scale-110 transition-transform`} />
                            </motion.div>
                            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest bg-dark-950/80 px-2 py-0.5 rounded-md opacity-0 group-hover/node:opacity-100 transition-opacity">
                                {node.name}
                            </span>
                        </motion.div>
                    ))}

                    {/* Ambient Glows */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-electric-400/5 rounded-full blur-[100px] pointer-events-none" />
                </div>
            </div>
        </section>
    );
}
