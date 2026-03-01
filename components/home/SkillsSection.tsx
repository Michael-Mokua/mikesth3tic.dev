"use client";

import { motion } from "framer-motion";
import {
    Code2,
    Database,
    Globe,
    Layers,
    Smartphone,
    Zap,
    Cpu,
    Terminal,
    Palette,
    Layout,
    Cloud,
    BarChart,
    ShieldCheck,
    Workflow,
    Bot,
    Rocket
} from "lucide-react";

const mainServices = [
    {
        title: "Custom Web Applications",
        description: "High-performance, scalable web systems built with modern frameworks and robust architecture.",
        icon: Globe,
        techs: ["Next.js", "React", "TypeScript", "TailwindCSS"],
    },
    {
        title: "SaaS Platform Development",
        description: "End-to-end product engineering for software-as-a-service platforms with multi-tenancy and scalability.",
        icon: Layers,
        techs: ["Node.js", "PostgreSQL", "Auth", "Stripes"],
    },
    {
        title: "AI-Powered Systems",
        description: "Integrating advanced LLMs and intelligent automation into your business processes and products.",
        icon: Bot,
        techs: ["OpenAI", "LangChain", "Vector DBs", "Python"],
    },
    {
        title: "Scalable Digital Products",
        description: "Building products designed to grow from MVP to enterprise-scale without technical debt.",
        icon: Rocket,
        techs: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    }
];

const supportingServices = [
    {
        title: "Product & UX Design",
        icon: Palette,
        items: ["Interface Design", "UX Optimization", "Prototyping", "Design Systems"],
    },
    {
        title: "AI & Automation",
        icon: Workflow,
        items: ["AI Assistants", "Intelligent Workflows", "Custom Integrations"],
    },
    {
        title: "Cloud & Scaling",
        icon: Cloud,
        items: ["Cloud Deployment", "Infrastructure Architecture", "Performance Tuning"],
    },
    {
        title: "Technical Consultancy",
        icon: Cpu,
        items: ["Startup MVP Strategy", "System Architecture", "Tech Stack Guidance"],
    },
    {
        title: "Maintenance & Growth",
        icon: Zap,
        items: ["Continuous Improvements", "Feature Expansion", "Long-term Support"],
    }
].map(s => s.title === "Technical Consultancy" ? { ...s, icon: Cpu } : s);

export function SkillsSection() {
    return (
        <section className="section-padding overflow-hidden relative" aria-label="Services and expertise">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-electric-400/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-neon-400/5 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2" />

            <div className="container-custom">
                {/* Header */}
                <motion.div
                    className="mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-sm font-mono text-electric-400 mb-3 tracking-widest uppercase">// OUR CORE FOCUS</p>
                    <h2 className="text-5xl md:text-7xl font-black text-foreground max-w-4xl leading-[1.05] tracking-tighter">
                        We design, build, and scale <br />
                        <span className="text-gradient">modern software products.</span>
                    </h2>
                </motion.div>

                {/* Main Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
                    {mainServices.map((service, i) => (
                        <motion.div
                            key={service.title}
                            className="group relative overflow-hidden rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] p-10 hover:border-electric-400/30 transition-all duration-500"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-electric-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-20">
                                <div className="w-16 h-16 rounded-2xl bg-electric-400/10 text-electric-400 flex items-center justify-center mb-8 border border-electric-400/20 group-hover:scale-110 transition-transform duration-500">
                                    <service.icon className="w-8 h-8" />
                                </div>

                                <h3 className="text-3xl font-bold text-foreground mb-4">{service.title}</h3>
                                <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
                                    {service.description}
                                </p>

                                <div className="flex flex-wrap gap-2 pt-6 border-t border-white/[0.05]">
                                    {service.techs.map((tech) => (
                                        <span
                                            key={tech}
                                            className="text-[10px] font-mono px-3 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 text-foreground/70 font-bold uppercase tracking-tighter"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Supporting Services Section */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-sm font-mono text-neon-400 mb-3 tracking-widest uppercase">// SELECTIVE TECH SERVICES</p>
                    <h3 className="text-3xl md:text-4xl font-black text-foreground">Supporting your growth.</h3>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {supportingServices.map((service, i) => (
                        <motion.div
                            key={service.title}
                            className="glass p-6 rounded-[2rem] border border-white/5 hover:border-neon-400/30 transition-all duration-300 group"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                        >
                            <div className="w-10 h-10 rounded-xl bg-neon-400/10 text-neon-400 flex items-center justify-center mb-6 group-hover:bg-neon-400/20 transition-colors">
                                <service.icon className="w-5 h-5" />
                            </div>
                            <h4 className="text-lg font-bold text-foreground mb-4">{service.title}</h4>
                            <ul className="space-y-2">
                                {service.items.map(item => (
                                    <li key={item} className="text-xs text-muted-foreground flex items-center gap-2">
                                        <span className="w-1 h-1 rounded-full bg-neon-400/40" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Marquee/Badge */}
                <motion.div
                    className="mt-24 pt-10 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="flex gap-12 font-mono">
                        <div>
                            <div className="text-3xl font-black text-foreground">PROG.</div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 text-electric-400">Software-First</div>
                        </div>
                        <div>
                            <div className="text-3xl font-black text-foreground">SCAL.</div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 text-neon-400">Cloud-Native</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono text-foreground/30">
                        <Zap className="w-4 h-4" />
                        <span>NO LEGACY IT. NO COMPROMISES. MODERN ENGINEERING ONLY.</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
