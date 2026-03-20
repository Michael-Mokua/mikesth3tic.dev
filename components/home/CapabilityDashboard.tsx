"use client";

import { motion } from "framer-motion";
import { Bot, Rocket, Heart, ShieldCheck, BarChart3, Leaf, Zap, Globe } from "lucide-react";
import { useEffect, useState } from "react";

const metrics = [
    {
        label: "Products Shipped",
        value: 15,
        suffix: "+",
        icon: Rocket,
        color: "text-electric-400",
        bg: "bg-electric-400/10",
    },
    {
        label: "User Satisfaction",
        value: 98,
        suffix: "%",
        icon: Heart,
        color: "text-neon-400",
        bg: "bg-neon-400/10",
    },
    {
        label: "AI Systems Deployed",
        value: 8,
        suffix: "",
        icon: Bot,
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
    },
    {
        label: "System Uptime",
        value: 99.9,
        suffix: "%",
        icon: ShieldCheck,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
    },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = value;
        const duration = 2000;
        const increment = end / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start * 10) / 10);
            }
        }, 16);
        
        return () => clearInterval(timer);
    }, [value]);

    return (
        <span className="text-4xl font-black text-foreground tracking-tighter tabular-nums">
            {count}{suffix}
        </span>
    );
}

export function CapabilityDashboard() {
    return (
        <section className="section-padding relative overflow-hidden bg-white/[0.01]">
            <div className="container-custom">
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-xs font-mono text-electric-400 mb-4 tracking-[0.3em] uppercase">// PERFORMANCE_METRICS</p>
                    <h2 className="text-4xl md:text-6xl font-black text-foreground max-w-2xl leading-[1.05] tracking-tighter">
                        Measurable <span className="text-gradient">Impact & Scale.</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {metrics.map((m, i) => (
                        <motion.div
                            key={m.label}
                            className="liquid-glass p-8 rounded-[2rem] border border-white/5 relative overflow-hidden group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="relative z-10">
                                <div className={`w-12 h-12 rounded-2xl ${m.bg} flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-500`}>
                                    <m.icon className={`w-6 h-6 ${m.color}`} />
                                </div>
                                <div className="space-y-1">
                                    <Counter value={m.value} suffix={m.suffix} />
                                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{m.label}</p>
                                </div>
                            </div>
                            <div className="absolute -bottom-2 -right-2 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                                <m.icon className="w-24 h-24" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Sustainability & Transparency Badge */}
                <motion.div
                    className="flex flex-wrap items-center justify-center gap-4 py-6 px-8 liquid-glass rounded-2xl border border-white/5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-2 text-green-400">
                        <Leaf className="w-4 h-4" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Carbon-Negative</span>
                    </div>
                    <div className="w-px h-4 bg-white/10 hidden sm:block" />
                    <div className="flex items-center gap-2 text-electric-400">
                        <Zap className="w-4 h-4" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Lighthouse 100/100</span>
                    </div>
                    <div className="w-px h-4 bg-white/10 hidden sm:block" />
                    <div className="flex items-center gap-2 text-neon-400">
                        <Globe className="w-4 h-4" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Edge-Delivered</span>
                    </div>
                    <div className="w-px h-4 bg-white/10 hidden sm:block" />
                    <div className="flex items-center gap-2 text-white/40">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-mono uppercase tracking-widest">Global Node Status: OPTIMAL</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
