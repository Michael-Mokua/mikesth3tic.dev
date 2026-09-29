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

const skillCategories = [
    {
        title: "Frontend",
        icon: Globe,
        skills: ["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion", "shadcn/ui"],
    },
    {
        title: "Backend & APIs",
        icon: Database,
        skills: ["Node.js", "Python", "PostgreSQL", "REST APIs", "GraphQL", "M-Pesa Daraja"],
    },
    {
        title: "AI & ML",
        icon: Bot,
        skills: ["Claude API", "LangChain", "OpenAI", "Python", "NLP", "Sheng/Swahili Dataset"],
    },
    {
        title: "DevOps & Tools",
        icon: Cloud,
        skills: ["Git", "Docker", "Vercel", "CI/CD", "Firebase", "Linux"],
    }
];

const additionalSkills = [
    "Mobile Development",
    "UI/UX Design",
    "System Architecture",
    "API Integration",
    "Database Design",
    "Payment Gateways",
    "Authentication",
    "Testing & QA",
    "Performance Optimization",
    "Security Best Practices"
];

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
                    <p className="text-sm font-mono text-electric-400 mb-3 tracking-widest uppercase">// TECHNICAL SKILLS</p>
                    <h2 className="text-5xl md:text-7xl font-black text-foreground max-w-4xl leading-[1.05] tracking-tighter">
                        Technologies <span className="text-gradient">I work with.</span>
                    </h2>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
                    {skillCategories.map((category, i) => (
                        <motion.div
                            key={category.title}
                            className="group relative overflow-hidden rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] p-10 hover:border-electric-400/30 transition-all duration-500"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-electric-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-20">
                                <div className="w-16 h-16 rounded-2xl bg-electric-400/10 text-electric-400 flex items-center justify-center mb-8 border border-electric-400/20 group-hover:scale-110 transition-transform duration-500">
                                    <category.icon className="w-8 h-8" />
                                </div>

                                <h3 className="text-3xl font-bold text-foreground mb-6">{category.title}</h3>

                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="text-xs font-mono px-3 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 text-foreground/70 font-bold uppercase tracking-tighter hover:bg-electric-400/10 hover:border-electric-400/30 hover:text-electric-400 transition-colors"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="mt-24 pt-10 border-t border-white/[0.05] text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p className="text-sm text-muted-foreground mb-4">
                        Looking for someone with these skills?
                    </p>
                    <a
                        href="/start-project"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-electric-400 text-dark-950 font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform"
                    >
                        Start a Project
                        <Rocket className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
