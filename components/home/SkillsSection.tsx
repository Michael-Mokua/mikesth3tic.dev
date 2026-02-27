"use client";

import { motion } from "framer-motion";
import { Code2, Database, Globe, Layers, Smartphone, Zap, Cpu, Terminal, Palette } from "lucide-react";

const skills = [
    {
        category: "Programming & Development",
        icon: Terminal,
        color: "electric",
        description: "Fluent in modern languages for building high-performance logic.",
        techs: ["JavaScript", "React", "Node.js", "Kotlin", "HTML5", "CSS3"],
        size: "col-span-1 md:col-span-2",
    },
    {
        category: "Backend & Databases",
        icon: Database,
        color: "neon",
        description: "Designing robust server-side infrastructures and data layers.",
        techs: ["MongoDB", "REST APIs", "Node.js", "Express", "Auth Systems"],
        size: "col-span-1",
    },
    {
        category: "Software & Tools",
        icon: Layers,
        color: "electric",
        description: "Leveraging industry-standard tools for professional execution.",
        techs: ["Git", "GitHub", "VS Code", "Android Studio", "Vercel"],
        size: "col-span-1",
    },
    {
        category: "Systems & Concepts",
        icon: Cpu,
        color: "neon",
        description: "Mastering the architectural principles of modern software.",
        techs: ["Full-Stack Dev", "UI/UX Design", "System Architecture", "API Integration", "RWD"],
        size: "col-span-1 md:col-span-2",
    },
];

export function SkillsSection() {
    return (
        <section className="section-padding overflow-hidden relative" aria-label="Skills and technologies">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-electric-400/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-neon-400/5 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2" />

            <div className="container-custom">
                {/* Header */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-sm font-mono text-electric-400 mb-3 tracking-widest uppercase">// CORE EXPERTISE</p>
                    <h2 className="text-5xl md:text-6xl font-black text-foreground max-w-2xl leading-[1.1]">
                        Architecting the <span className="text-gradient">Digital Tomorrow.</span>
                    </h2>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {skills.map((skill, i) => (
                        <motion.div
                            key={skill.category}
                            className={`${skill.size} relative group overflow-hidden rounded-[2rem] bg-white/[0.02] border border-white/[0.05] p-8 hover:border-electric-400/30 transition-all duration-500`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            {/* Card Spotlight Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-electric-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-20 h-full flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className={`p-3 rounded-2xl ${skill.color === "electric"
                                            ? "bg-electric-400/10 text-electric-400"
                                            : "bg-neon-400/10 text-neon-400"
                                            }`}>
                                            <skill.icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-foreground">{skill.category}</h3>
                                    </div>

                                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
                                        {skill.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-foreground/[0.05]">
                                    {skill.techs.map((tech) => (
                                        <span
                                            key={tech}
                                            className="text-[10px] font-mono px-3 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 text-foreground font-bold uppercase tracking-tighter hover:border-electric-400/50 hover:bg-electric-400/10 hover:text-electric-400 transition-all duration-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Dynamic Counter/Marquee */}
                <motion.div
                    className="mt-20 pt-10 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="flex gap-12">
                        <div>
                            <div className="text-3xl font-black text-foreground">99.9%</div>
                            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-1">Uptime Mindset</div>
                        </div>
                        <div>
                            <div className="text-3xl font-black text-foreground">100+</div>
                            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-1">Modules Shipped</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono text-electric-400/40">
                        <Zap className="w-4 h-4 animate-pulse" />
                        <span>CONTINUOUSLY EVOLVING THE STACK</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
