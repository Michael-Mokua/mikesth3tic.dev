"use client";

import { motion } from "framer-motion";
import { Bot, Zap, Cpu, Server, BarChart3 } from "lucide-react";

const metrics = [
    {
        label: "AI Models Deployed",
        value: "12",
        suffix: "",
        icon: Bot,
        color: "text-electric-400",
        bg: "bg-electric-400/10",
    },
    {
        label: "Requests Processed",
        value: "450",
        suffix: "k+",
        icon: Cpu,
        color: "text-neon-400",
        bg: "bg-neon-400/10",
    },
    {
        label: "Automation Efficiency",
        value: "85",
        suffix: "%",
        icon: Zap,
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
    },
    {
        label: "Active Systems",
        value: "24",
        suffix: "/7",
        icon: Server,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
    },
];

export function CapabilityDashboard() {
    return (
        <section className="section-padding relative overflow-hidden">
            <div className="container-custom">
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-sm font-mono text-electric-400 mb-3 tracking-widest uppercase">// SYSTEM PERFORMANCE</p>
                    <h2 className="text-4xl md:text-5xl font-black mb-4">
                        Real-Time <span className="text-gradient">Capabilities.</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Visualizing the operational scale of our intelligent digital infrastructure.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {metrics.map((m, i) => (
                        <motion.div
                            key={m.label}
                            className="glass p-8 rounded-3xl border border-white/5 relative overflow-hidden group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            {/* Animated scanning bar */}
                            <motion.div
                                className="absolute left-0 right-0 h-px bg-white/20 z-0"
                                animate={{ top: ["0%", "100%", "0%"] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />

                            <div className="relative z-10">
                                <div className={`w-12 h-12 rounded-2xl ${m.bg} flex items-center justify-center mb-6`}>
                                    <m.icon className={`w-6 h-6 ${m.color}`} />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-baseline gap-1">
                                        <motion.span
                                            className="text-4xl font-black text-foreground"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                        >
                                            {m.value}
                                        </motion.span>
                                        <span className={`text-xl font-bold ${m.color}`}>{m.suffix}</span>
                                    </div>
                                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{m.label}</p>
                                </div>

                                {/* Mini chart simulation */}
                                <div className="mt-6 flex gap-1 h-8 items-end">
                                    {[...Array(8)].map((_, j) => (
                                        <motion.div
                                            key={j}
                                            className={`flex-1 rounded-sm ${m.bg}`}
                                            initial={{ height: "30%" }}
                                            animate={{
                                                height: [
                                                    `${20 + (Math.sin(i + j) + 1) * 40}%`,
                                                    `${30 + (Math.cos(i + j) + 1) * 35}%`
                                                ]
                                            }}
                                            transition={{
                                                duration: 2 + (i + j) % 3,
                                                repeat: Infinity,
                                                repeatType: "reverse"
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer simulation */}
                <motion.div
                    className="mt-12 flex items-center justify-center gap-6 py-4 glass rounded-2xl border border-white/5"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Global Node Status: OPTIMAL</span>
                    </div>
                    <div className="h-4 w-px bg-white/10" />
                    <div className="flex items-center gap-2">
                        <BarChart3 className="w-3 h-3 text-electric-400" />
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Optimization Rate: +4.2% (24h)</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
