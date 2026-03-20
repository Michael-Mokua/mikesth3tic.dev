"use client";

import { motion } from "framer-motion";
import { 
    Search, 
    PencilRuler, 
    Code2, 
    Cpu, 
    ShieldCheck, 
    Rocket,
    ArrowRight
} from "lucide-react";

const STAGES = [
    {
        id: "discovery",
        title: "Intelligence & Strategy",
        subtitle: "01 Discovery",
        icon: Search,
        description: "Deep dive into product vision, technical feasibility, and competitive landscape. We define the core logic and system requirements.",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/20"
    },
    {
        id: "architecture",
        title: "Architecture & Design",
        subtitle: "02 Engineering Design",
        icon: PencilRuler,
        description: "Designing intuitive interfaces for complex systems. Priority on user flow, system architecture, and technical scalability.",
        color: "text-electric-400",
        bg: "bg-electric-400/10",
        border: "border-electric-400/20"
    },
    {
        id: "engineering",
        title: "Engineering Core",
        subtitle: "03 Development",
        icon: Code2,
        description: "Writing high-performance, scalable code. Building the engines that power your vision using modern, battle-tested stacks.",
        color: "text-neon-400",
        bg: "bg-neon-400/10",
        border: "border-neon-400/20"
    },
    {
        id: "ai",
        title: "AI Integration",
        subtitle: "04 Intelligence Layer",
        icon: Cpu,
        description: "Integrating advanced AI models and reasoning engines to automate complex decision-making and enhance user experience.",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        border: "border-purple-400/20"
    },
    {
        id: "hardening",
        title: "System Hardening",
        subtitle: "05 Optimization",
        icon: ShieldCheck,
        description: "Cloud orchestration, performance tuning, and rigorous QA. Ensuring your system remains fast, secure, and resilient under load.",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        border: "border-yellow-400/20"
    },
    {
        id: "launch",
        title: "Deployment & Growth",
        subtitle: "06 Scaling",
        icon: Rocket,
        description: "Seamless deployment and long-term scaling strategy. We monitor and evolve the product as it grows with your user base.",
        color: "text-red-400",
        bg: "bg-red-400/10",
        border: "border-red-400/20"
    }
];

export function ProcessSection() {
    return (
        <section id="process" className="py-32 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-electric-400/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-400/5 rounded-full blur-[120px] -z-10" />

            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <p className="text-xs font-mono text-electric-400 mb-6 tracking-[0.4em] uppercase">The Studio Process</p>
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8">
                            How we build <span className="text-gradient">high-end software.</span>
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="md:pt-14"
                    >
                        <p className="text-muted-foreground text-lg max-w-sm leading-relaxed">
                            Our process is a refined synthesis of speed, precision, and military-grade engineering standards.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {STAGES.map((stage, idx) => (
                        <motion.div
                            key={stage.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative"
                        >
                            <div className={`h-full p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 group-hover:bg-white/[0.04] group-hover:border-electric-400/30 transition-all duration-500 relative overflow-hidden`}>
                                {/* Stage Number Background */}
                                <div className="absolute -top-6 -right-6 text-9xl font-black italic text-white/[0.02] group-hover:text-electric-400/[0.04] transition-colors tracking-tighter">
                                    0{idx + 1}
                                </div>

                                <div className="relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl ${stage.bg} border ${stage.border} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                        <stage.icon className={`w-7 h-7 ${stage.color}`} />
                                    </div>
                                    
                                    <p className="text-[10px] font-mono text-white/40 mb-2 tracking-widest uppercase font-bold">{stage.subtitle}</p>
                                    <h3 className="text-2xl font-bold mb-4 group-hover:text-electric-400 transition-colors uppercase tracking-tight">{stage.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                                        {stage.description}
                                    </p>

                                    <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-electric-400/50 group-hover:text-electric-400 transition-colors uppercase tracking-widest">
                                        <span>Validated Workflow</span>
                                        <div className="w-1 h-1 rounded-full bg-electric-400 animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action Bar */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 p-8 md:p-12 rounded-[3rem] bg-gradient-to-r from-electric-400/10 via-electric-400/5 to-transparent border border-electric-400/20 flex flex-col md:flex-row items-center justify-between gap-8"
                >
                    <div>
                        <h4 className="text-2xl font-bold mb-2 uppercase tracking-tight">Ready to initiate development?</h4>
                        <p className="text-sm text-white/60">Let's architecturalize your vision from concept to high-performance reality.</p>
                    </div>
                    <motion.a
                        href="/start-project"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 rounded-full bg-electric-400 text-dark-950 font-black text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(0,212,255,0.3)] flex items-center gap-2"
                    >
                        Deploy Proposal
                        <ArrowRight className="w-4 h-4" />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
