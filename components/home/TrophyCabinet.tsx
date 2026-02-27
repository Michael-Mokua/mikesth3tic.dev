"use client";

import { motion } from "framer-motion";
import { Star, Target, Crown } from "lucide-react";

const ZapIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M13 2 L3 14 H12 L11 22 L21 10 H12 L13 2 Z" />
    </svg>
);

const achivements = [
    {
        title: "Systems Architect",
        description: "Successfully architected 10+ scalable cloud systems.",
        icon: Target,
        unlocked: true,
        gradient: "from-electric-400/20 to-blue-500/20",
    },
    {
        title: "Full-Stack Master",
        description: "Shipped 20+ production-grade applications.",
        icon: ZapIcon,
        unlocked: true,
        gradient: "from-amber-400/20 to-orange-500/20",
    },
    {
        title: "AI Integration Expert",
        description: "Implemented LLM workflows in 5+ enterprise tools.",
        icon: Crown,
        unlocked: true,
        gradient: "from-purple-400/20 to-neon-400/20",
    },
    {
        title: "Open Source Contributor",
        description: "Active contributor to major web frameworks.",
        icon: Star,
        unlocked: true,
        gradient: "from-green-400/20 to-emerald-500/20",
    },
];

export function TrophyCabinet() {
    return (
        <section className="section-padding relative overflow-hidden" aria-label="Achievements">
            <div className="container-custom">
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-sm font-mono text-electric-400 mb-3 tracking-widest uppercase">// TROPHY CABINET</p>
                    <h2 className="text-5xl md:text-6xl font-black">
                        Unlocked <span className="text-gradient">Milestones.</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {achivements.map((item, i) => (
                        <motion.div
                            key={item.title}
                            className={`relative group h-[300px] overflow-hidden rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] p-8 hover:border-electric-400/30 transition-all duration-500`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
                                <div className="p-4 rounded-3xl bg-white/5 border border-white/10 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                                    <item.icon className="w-10 h-10 text-electric-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 uppercase tracking-tighter">{item.title}</h3>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
