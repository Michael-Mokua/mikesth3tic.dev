"use client";

import { motion } from "framer-motion";
import {
    Mail,
    Phone,
    Globe,
    Github,
    ExternalLink,
    Target,
    Zap,
    Crown,
    Star,
    ArrowLeft,
    Download
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const HeroBackground = dynamic(
    () => import("@/components/home/HeroBackground").then((m) => ({ default: m.HeroBackground })),
    { ssr: false }
);

const Magnetic = dynamic(() => import("@/components/ui/Magnetic"), { ssr: false });

import { Variants } from "framer-motion";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function ResumePage() {
    return (
        <div className="relative min-h-screen bg-background selection:bg-electric-400 selection:text-dark-950">
            {/* Background */}
            <HeroBackground />

            {/* Header / Nav */}
            <div className="fixed top-0 inset-x-0 z-50 p-6 flex justify-between items-center pointer-events-none">
                <Magnetic>
                    <Link
                        href="/"
                        className="pointer-events-auto p-4 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all backdrop-blur-xl shadow-glass"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                </Magnetic>
                <Magnetic>
                    <button
                        onClick={() => window.print()}
                        className="pointer-events-auto flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold text-sm shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all hover:scale-105 active:scale-95"
                    >
                        <Download className="w-4 h-4" />
                        Export PDF
                    </button>
                </Magnetic>
            </div>

            <main className="relative z-10 pt-32 pb-20 container-custom max-w-5xl">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Hero Section */}
                    <div className="flex flex-col md:flex-row items-center gap-10 mb-20">
                        <motion.div variants={itemVariants} className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-electric-400 to-neon-400 rounded-full blur-[40px] opacity-30 group-hover:opacity-60 transition-opacity" />
                            <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-electric-400 to-neon-400 flex items-center justify-center text-5xl font-black text-white shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 border-white/20">
                                MO
                            </div>
                        </motion.div>

                        <div className="text-center md:text-left flex-1">
                            <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-white drop-shadow-2xl">
                                Michael <span className="text-gradient">Ogutu Mokua</span>
                            </motion.h1>
                            <motion.p variants={itemVariants} className="text-2xl text-electric-400 font-bold tracking-wider uppercase mb-8 flex items-center justify-center md:justify-start gap-3">
                                <Zap className="w-6 h-6 fill-current" />
                                Full-Stack Systems Architect
                            </motion.p>

                            <motion.div variants={itemVariants} className="flex flex-wrap justify-center md:justify-start gap-4">
                                {[
                                    { icon: Mail, label: "michaelcartelo03@gmail.com", href: "mailto:michaelcartelo03@gmail.com" },
                                    { icon: Phone, label: "+254 110 254 359", href: "tel:+254110254359" },
                                    { icon: Globe, label: "mikesth3tic.dev", href: "https://mikesth3tic.dev" },
                                    { icon: Github, label: "Michael-Mokua", href: "https://github.com/Michael-Mokua" }
                                ].map((pill) => (
                                    <Magnetic key={pill.label}>
                                        <a
                                            href={pill.href}
                                            target={pill.href.startsWith('http') ? "_blank" : undefined}
                                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-sm font-medium text-white hover:bg-white/20 transition-all backdrop-blur-md"
                                        >
                                            <pill.icon className="w-4 h-4 text-electric-400" />
                                            {pill.label}
                                        </a>
                                    </Magnetic>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">
                        {/* Main Content */}
                        <div className="space-y-20">
                            {/* Professional Summary */}
                            <section>
                                <motion.div variants={itemVariants} className="flex items-center gap-6 mb-10">
                                    <h2 className="text-sm font-mono font-black text-electric-400 tracking-[0.4em] uppercase whitespace-nowrap">Professional Summary</h2>
                                    <div className="h-px flex-1 bg-gradient-to-r from-electric-400/50 via-electric-400/10 to-transparent" />
                                </motion.div>
                                <motion.div variants={itemVariants} className="glass rounded-[2rem] p-10 md:p-12 border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-2xl">
                                    <p className="text-xl text-white/90 leading-relaxed italic font-medium">
                                        "Motivated and results-driven IT student and full-stack developer specializing in scalable web and mobile solutions. Experienced in designing and deploying applications using modern JavaScript (React, Next.js), Node.js, and Android/Kotlin. Passionate about building immersive, high-performance software that dominates the digital landscape."
                                    </p>
                                </motion.div>
                            </section>

                            {/* Projects */}
                            <section>
                                <motion.div variants={itemVariants} className="flex items-center gap-6 mb-10">
                                    <h2 className="text-sm font-mono font-black text-electric-400 tracking-[0.4em] uppercase whitespace-nowrap">Featured Deployments</h2>
                                    <div className="h-px flex-1 bg-gradient-to-r from-electric-400/50 via-electric-400/10 to-transparent" />
                                </motion.div>
                                <div className="space-y-8">
                                    {[
                                        {
                                            title: "EatsAndReps",
                                            subtitle: "AI-Powered Health Ecosystem",
                                            desc: "A comprehensive health monitoring system featuring dynamic exercise tracking, nutritional analysis, and intuitive visualization dashboards.",
                                            tech: ["Next.js 14", "Firebase", "MongoDB", "Framer Motion"],
                                            link: "https://github.com/Michael-Mokua"
                                        },
                                        {
                                            title: "Agri Value Connect",
                                            subtitle: "B2B Agricultural Marketplace",
                                            desc: "A decentralized platform bridging the gap between farmers and vendors, optimizing the supply chain through secure real-time transactions.",
                                            tech: ["React", "Express.js", "MongoDB", "Stripe API"],
                                            link: "https://github.com/Michael-Mokua"
                                        },
                                        {
                                            title: "Breast Cancer Advisory System",
                                            subtitle: "Deep Medical Reasoning",
                                            desc: "An intelligent diagnostic assistance tool designed to empower users with risk assessments and clinical resource mapping.",
                                            tech: ["Node.js", "JWT", "REST Architecture", "React"],
                                            link: "https://github.com/Michael-Mokua"
                                        }
                                    ].map((project) => (
                                        <motion.div
                                            key={project.title}
                                            variants={itemVariants}
                                            className="group relative glass rounded-[2.5rem] p-10 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-electric-400/40 transition-all duration-700 overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-electric-400/10 via-transparent to-neon-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                            <div className="relative z-10">
                                                <div className="flex justify-between items-start mb-6">
                                                    <div>
                                                        <h3 className="text-3xl font-black group-hover:text-electric-400 transition-colors uppercase tracking-tighter text-white">{project.title}</h3>
                                                        <p className="text-xs font-mono text-electric-400/60 uppercase tracking-[0.2em] mt-1 font-bold">{project.subtitle}</p>
                                                    </div>
                                                    <a href={project.link} target="_blank" className="p-4 rounded-2xl bg-white/10 border border-white/10 hover:bg-electric-400 hover:text-black hover:scale-110 transition-all shadow-lg">
                                                        <ExternalLink className="w-5 h-5" />
                                                    </a>
                                                </div>
                                                <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-2xl font-medium">{project.desc}</p>
                                                <div className="flex flex-wrap gap-3">
                                                    {project.tech.map(t => (
                                                        <span key={t} className="text-[11px] px-4 py-1.5 rounded-full bg-electric-400/10 border border-electric-400/20 text-electric-400 uppercase font-mono font-bold tracking-widest">{t}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>

                            {/* Infrastructure */}
                            <section>
                                <motion.div variants={itemVariants} className="flex items-center gap-6 mb-10">
                                    <h2 className="text-sm font-mono font-black text-electric-400 tracking-[0.4em] uppercase whitespace-nowrap">Hardware & Infra</h2>
                                    <div className="h-px flex-1 bg-gradient-to-r from-electric-400/50 via-electric-400/10 to-transparent" />
                                </motion.div>
                                <motion.div variants={itemVariants} className="glass rounded-[2rem] p-10 border border-white/10 bg-white/[0.03] backdrop-blur-2xl">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {[
                                            "Advanced Copper & Fiber Splicing",
                                            "Structured Cabling (T568A/B)",
                                            "Scalable Rack Architectures",
                                            "Hardware Diagnostics & Optimization"
                                        ].map((tool, i) => (
                                            <div key={i} className="flex items-center gap-4 group">
                                                <div className="w-10 h-10 rounded-xl bg-electric-400/10 border border-electric-400/20 flex items-center justify-center group-hover:bg-electric-400 group-hover:text-black transition-all">
                                                    <Zap className="w-5 h-5" />
                                                </div>
                                                <span className="text-lg text-white font-bold tracking-tight">{tool}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-16">
                            {/* Skills Sidebar */}
                            <section>
                                <motion.div variants={itemVariants} className="flex flex-col gap-8">
                                    <div className="flex items-center gap-4">
                                        <h2 className="text-sm font-mono font-black text-electric-400 tracking-[0.3em] uppercase whitespace-nowrap">Core Stack</h2>
                                        <div className="h-px flex-1 bg-gradient-to-l from-electric-400/50 via-electric-400/10 to-transparent" />
                                    </div>
                                    <div className="space-y-10">
                                        {[
                                            { label: "Frontend", skills: ["React 18", "Next.js", "Tailwind", "Three.js"] },
                                            { label: "Backend", skills: ["Node.js", "Express", "Firebase", "Python"] },
                                            { label: "Mobile", skills: ["Kotlin", "Android", "Jetpack Compose"] },
                                            { label: "Tools", skills: ["Git / CLI", "Docker", "REST API", "CI/CD"] }
                                        ].map((group) => (
                                            <motion.div key={group.label} variants={itemVariants} className="space-y-4">
                                                <p className="text-xs font-mono text-white/40 uppercase tracking-[0.3em] font-black">{group.label}</p>
                                                <div className="flex flex-wrap gap-2.5">
                                                    {group.skills.map(s => (
                                                        <span key={s} className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm text-white font-bold transition-all hover:border-electric-400 hover:bg-electric-400/10 hover:text-electric-400 shadow-glass">
                                                            {s}
                                                        </span>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            </section>

                            {/* Achievements Sidebar */}
                            <section>
                                <motion.div variants={itemVariants} className="space-y-8">
                                    <div className="flex items-center gap-4">
                                        <h2 className="text-sm font-mono font-black text-electric-400 tracking-[0.3em] uppercase whitespace-nowrap">Milestones</h2>
                                        <div className="h-px flex-1 bg-gradient-to-l from-electric-400/50 via-electric-400/10 to-transparent" />
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            { icon: Target, text: "Systems Architect" },
                                            { icon: Zap, text: "Full-Stack Expert" },
                                            { icon: Crown, text: "Innovation Lead" },
                                            { icon: Star, text: "UI/UX Specialist" }
                                        ].map((m, i) => (
                                            <motion.div
                                                key={i}
                                                variants={itemVariants}
                                                className="flex items-center gap-5 p-5 rounded-[1.5rem] bg-white/[0.03] border border-white/10 group hover:border-electric-400/40 hover:bg-white/[0.06] transition-all duration-500 shadow-xl"
                                            >
                                                <div className="p-3 rounded-xl bg-electric-400/10 text-electric-400 group-hover:scale-110 group-hover:bg-electric-400 group-hover:text-black transition-all">
                                                    <m.icon className="w-5 h-5" />
                                                </div>
                                                <span className="text-sm font-black text-white group-hover:text-electric-400 transition-colors uppercase tracking-tighter">{m.text}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            </section>

                            {/* Quick Stats */}
                            <section>
                                <motion.div variants={itemVariants} className="glass rounded-[2rem] p-8 bg-gradient-to-br from-electric-400/20 to-neon-400/10 border border-white/10 text-center">
                                    <p className="text-[10px] font-mono font-black text-white/40 uppercase tracking-[0.5em] mb-4">Availability</p>
                                    <p className="text-xl font-black text-white mb-2">OPEN FOR HIRE</p>
                                    <p className="text-xs text-electric-400 font-bold uppercase tracking-widest leading-relaxed">Nairobi 🇰🇪 // Remote 🌍</p>
                                </motion.div>
                            </section>
                        </div>
                    </div>

                    {/* Footer Footnote */}
                    <motion.div variants={itemVariants} className="mt-40 pt-16 border-t border-white/10 text-center">
                        <p className="text-xs font-mono font-black text-white/20 uppercase tracking-[1.5em] animate-pulse">
                            System Finalized // Built by MIKESTH3TIC.DEV
                        </p>
                    </motion.div>
                </motion.div>
            </main>

            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    .relative { position: static !important; }
                    .min-h-screen { height: auto !important; }
                    .pt-32 { padding-top: 2rem !important; }
                    .container-custom { max-width: 100% !important; }
                    .glass { background: white !important; color: black !important; border: 1px solid #eee !important; box-shadow: none !important; backdrop-filter: none !important; }
                    .text-white, .text-gradient, .text-electric-400 { color: black !important; background: none !important; -webkit-text-fill-color: initial !important; }
                    .bg-background, .bg-white\\/[0.03], .bg-white\\/5 { background: white !important; }
                    .border-white\\/10 { border-color: #eee !important; }
                    .hidden-print { display: none !important; }
                    nav, button, .pointer-events-none { display: none !important; }
                    .shadow-glass, .shadow-2xl, .shadow-[0_0_50px_rgba(0,0,0,0.5)] { box-shadow: none !important; }
                    body { background: white !important; color: black !important; }
                    h1, h2, h3, p, span { color: black !important; }
                }
            `}</style>
        </div>
    );
}
