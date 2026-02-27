"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
    Coffee,
    Code2,
    Rocket,
    Heart,
    GraduationCap,
    MapPin,
    UserCheck,
    Cpu,
    Zap,
    Target,
    Layout,
    Database,
    Globe,
    Shield,
    Bot,
    ArrowRight,
    TrendingUp,
    Compass
} from "lucide-react";
import { SkillsSection } from "@/components/home/SkillsSection";
import { ArchitectureExplorer } from "@/components/services/ArchitectureExplorer";
import { TechNetwork } from "@/components/home/TechNetwork";

import { Variants } from "framer-motion";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

const images = [
    "/images/michael/michael-1.jpeg",
    "/images/michael/michael-2.jpeg",
    "/images/michael/michael-3.jpg"
];

export default function AboutPage() {
    return (
        <div className="pt-32 pb-20">
            <div className="container-custom">
                {/* Hero Section */}
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Visual Side */}
                    <motion.div variants={itemVariants} className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-electric-400 to-neon-400 rounded-3xl rotate-6 opacity-20 blur-3xl" />
                        <div className="relative z-10 w-full h-full glass border border-white/[0.1] rounded-3xl p-4 transition-transform duration-500 hover:scale-[1.02]">
                            <div className="w-full h-full rounded-2xl overflow-hidden bg-dark-800 relative">
                                <Image
                                    src={images[0]}
                                    alt="Michael Ogutu Mokua"
                                    fill
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute bottom-4 left-4 right-4 p-4 glass rounded-xl border border-white/10 backdrop-blur-md">
                                    <p className="text-[10px] font-mono text-electric-400 mb-1 uppercase tracking-widest">CURRENT STATUS</p>
                                    <p className="text-sm font-bold text-foreground">Dominating the future @ MIKESTH3TIC</p>
                                </div>
                            </div>
                        </div>

                        {/* Stats Badges */}
                        <motion.div
                            className="absolute -top-6 -right-6 glass p-4 rounded-2xl shadow-2xl border border-white/[0.1] z-20"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-electric-400/20 flex items-center justify-center">
                                    <Cpu className="w-5 h-5 text-electric-400" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-mono text-muted-foreground uppercase">Focus</p>
                                    <p className="text-xs font-bold text-foreground">AI Systems</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Text Side */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-400/10 border border-electric-400/20 text-electric-400 text-xs font-mono uppercase tracking-widest">
                            <Bot className="w-3 h-3" />
                            RELIANT ENGINE
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter">
                            Disrupt. <br />
                            <span className="text-gradient">Automate</span>. <br />
                            <span className="text-gradient-neon">Dominate</span>.
                        </h1>
                        <div className="prose prose-invert max-w-none text-muted-foreground space-y-6">
                            <p className="text-xl text-foreground/90 font-medium leading-relaxed">
                                MIKESTH3TIC.DEV is an AI and software development company focused on engineering
                                intelligent, scalable, and human-centered digital products.
                            </p>
                            <p className="leading-relaxed">
                                Founded by <strong>Michael Ogutu Mokua</strong>, a full-stack systems builder and IT student,
                                the company was built from hands-on experimentation and a deep passion for modern architecture—not just visually, but technically.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4 font-mono text-xs">
                                <div className="flex items-center gap-2 px-4 py-2 glass rounded-lg border border-white/5">
                                    <MapPin className="w-3 h-3 text-electric-400" />
                                    NAIROBI, KENYA
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 glass rounded-lg border border-white/5">
                                    <GraduationCap className="w-3 h-3 text-electric-400" />
                                    BSC. IT (KABARAK UNIVERSITY) — 2026
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Resume Sections: Education & Experience */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
                    <motion.div variants={itemVariants} className="space-y-8">
                        <h2 className="text-3xl font-black flex items-center gap-3">
                            <GraduationCap className="w-6 h-6 text-electric-400" />
                            Education
                        </h2>
                        <div className="glass p-8 rounded-3xl border border-white/5 space-y-4">
                            <div>
                                <h3 className="text-xl font-bold text-foreground">Bachelor’s Degree in Information Technology</h3>
                                <p className="text-electric-400 font-mono text-sm uppercase tracking-wider">Kabarak University | Expected Dec 2026</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">// RELEVANT COURSEWORK</p>
                                <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                                    {["Web Development", "Mobile App Dev (Kotlin)", "Software Engineering", "Database Systems", "HCI", "System Analysis & Design"].map(course => (
                                        <span key={course} className="px-3 py-1 bg-white/[0.04] border border-white/[0.06] rounded-full">{course}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-8">
                        <h2 className="text-3xl font-black flex items-center gap-3">
                            <Code2 className="w-6 h-6 text-neon-400" />
                            Work Experience
                        </h2>
                        <div className="glass p-8 rounded-3xl border border-white/5 space-y-6">
                            <div>
                                <h3 className="text-xl font-bold text-foreground">Undergraduate Attachment</h3>
                                <p className="text-neon-400 font-mono text-sm uppercase tracking-wider">SDYAE | Jan 2026 — April 2026</p>
                                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                                    <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 text-neon-400 mt-1 shrink-0" /> Assisted in ICT operations and technical support</li>
                                    <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 text-neon-400 mt-1 shrink-0" /> Software and hardware configuration & maintenance</li>
                                    <li className="flex items-start gap-2"><ArrowRight className="w-3 h-3 text-neon-400 mt-1 shrink-0" /> Network and user support responsibilities</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                    <motion.div
                        className="glass p-10 rounded-3xl border border-white/5 relative overflow-hidden group"
                        whileHover={{ y: -5 }}
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Target className="w-32 h-32" />
                        </div>
                        <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-electric-400/20 flex items-center justify-center">
                                <Globe className="w-5 h-5 text-electric-400" />
                            </div>
                            Mission
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                            To build intelligent, scalable, and future-ready digital systems that empower individuals,
                            startups, and organizations through AI-driven innovation.
                        </p>
                        <ul className="space-y-3 text-sm font-mono text-muted-foreground">
                            <li className="flex items-center gap-3"><span className="text-electric-400">01</span> Simplify complexity through smart design</li>
                            <li className="flex items-center gap-3"><span className="text-electric-400">02</span> Integrate AI into daily workflows</li>
                            <li className="flex items-center gap-3"><span className="text-electric-400">03</span> Engineer secure, human-centered ecosystems</li>
                        </ul>
                    </motion.div>

                    <motion.div
                        className="glass p-10 rounded-3xl border border-white/5 relative overflow-hidden group"
                        whileHover={{ y: -5 }}
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Compass className="w-32 h-32" />
                        </div>
                        <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-neon-400/20 flex items-center justify-center">
                                <Zap className="w-5 h-5 text-neon-400" />
                            </div>
                            Vision
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                            To become a globally recognized technology powerhouse leading innovation in adaptive
                            AI platforms and immersive digital architecture.
                        </p>
                        <ul className="space-y-3 text-sm font-mono text-muted-foreground">
                            <li className="flex items-center gap-3"><span className="text-neon-400">01</span> Lead AI-driven analytics</li>
                            <li className="flex items-center gap-3"><span className="text-neon-400">02</span> Scale intelligent SaaS products</li>
                            <li className="flex items-center gap-3"><span className="text-neon-400">03</span> Augment human potential</li>
                        </ul>
                    </motion.div>
                </div>

                {/* Services Section */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <p className="text-sm font-mono text-electric-400 mb-2 uppercase tracking-widest">// ARCHITECTURE & CAPABILITIES</p>
                        <h2 className="text-4xl md:text-5xl font-black mb-4">Explorable <span className="text-gradient">Systems</span></h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Interactive breakdown of our technical frameworks and operational solutions.
                        </p>
                    </div>

                    <ArchitectureExplorer />
                </div>

                {/* Technical Stack / Expertise */}
                <div className="mb-32">
                    <div className="glass p-12 rounded-[3rem] border border-white/[0.05] relative overflow-hidden">
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-black mb-6">Technical <span className="text-gradient">Expertise</span></h2>
                                <p className="text-muted-foreground mb-8 leading-relaxed">
                                    Operating with a performance-first mindset using the most advanced tools
                                    in the industry to build secure, scalable foundations.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {["React", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "REST APIs", "JWT", "AI API Integration"].map(tech => (
                                        <span key={tech} className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] text-xs font-mono text-foreground/80 lowercase">
                                            #{tech.toLowerCase().replace(" ", "")}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 glass rounded-2xl border border-white/5">
                                    <Shield className="w-6 h-6 text-green-400 mb-4" />
                                    <h4 className="font-bold text-sm mb-2">Security-First</h4>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none">Standard</p>
                                </div>
                                <div className="p-6 glass rounded-2xl border border-white/5">
                                    <TrendingUp className="w-6 h-6 text-electric-400 mb-4" />
                                    <h4 className="font-bold text-sm mb-2">Performance</h4>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none">Uncompromised</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tech Network Visualization */}
                <div className="mb-32">
                    <TechNetwork />
                </div>

                {/* Philosophy & Why Us */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
                    <div className="lg:col-span-2 space-y-8">
                        <section className="glass p-10 rounded-3xl border border-white/5">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 underline decoration-electric-400/30 decoration-4 underline-offset-8">
                                Philosophy
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="text-sm font-bold text-foreground flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-electric-400" />
                                        Clean architecture is power.
                                    </div>
                                    <div className="text-sm font-bold text-foreground flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-electric-400" />
                                        Intelligence should be integrated.
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="text-sm font-bold text-foreground flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-electric-400" />
                                        Performance is a feature.
                                    </div>
                                    <div className="text-sm font-bold text-foreground flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-electric-400" />
                                        Simplicity is sophistication.
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <section className="glass p-8 rounded-3xl border border-white/5">
                                <h3 className="text-xl font-bold mb-4">Focus Areas</h3>
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-electric-400" /> AI Advisory Platforms</li>
                                    <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-electric-400" /> Financial Tracking</li>
                                    <li className="flex items-center gap-2"><ArrowRight className="w-3 h-3 text-electric-400" /> Marketplaces</li>
                                </ul>
                            </section>
                            <section className="glass p-8 rounded-3xl border border-white/5">
                                <h3 className="text-xl font-bold mb-4">Future Roadmap</h3>
                                <ul className="space-y-3 text-sm text-muted-foreground font-mono">
                                    <li>[ ] AI Productivity Assistant</li>
                                    <li>[ ] Intelligent Tracking SaaS</li>
                                    <li>[ ] Open Source Components</li>
                                </ul>
                            </section>
                        </div>
                    </div>

                    <aside className="space-y-6">
                        <div className="glass p-8 rounded-3xl border border-white/5 bg-electric-400/5">
                            <h3 className="text-xl font-bold mb-6">Why MIKESTH3TIC?</h3>
                            <ul className="space-y-4">
                                {[
                                    "Founder-led execution",
                                    "Modern full-stack expertise",
                                    "AI-first development mindset",
                                    "Clean, scalable code standards"
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 text-sm">
                                        <UserCheck className="w-4 h-4 text-electric-400 flex-shrink-0" />
                                        <span className="text-muted-foreground">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>

                {/* Founder Image Banner */}
                <motion.div
                    className="mb-32 h-[300px] rounded-[3rem] overflow-hidden relative"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <Image
                        src={images[1]}
                        alt="Workspace"
                        fill
                        className="object-cover opacity-40 brightness-50"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-t from-dark-950 via-transparent to-transparent">
                        <blockquote className="max-w-3xl">
                            <p className="text-2xl md:text-3xl font-black italic mb-6 leading-tight">
                                &ldquo;MIKESTH3TIC.DEV represents the intersection of learning,
                                innovation, and ambition. We are building foundations for the next generation.&rdquo;
                            </p>
                            <footer className="font-mono text-sm text-electric-400 tracking-widest uppercase">
                                &mdash; MICHAEL OGUTU MOKUA, FOUNDER
                            </footer>
                        </blockquote>
                    </div>
                </motion.div>

                {/* Detailed Founder Bio */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-32 items-start">
                    <div className="lg:col-span-1">
                        <div className="aspect-[3/4] rounded-2xl overflow-hidden glass border border-white/10 relative">
                            <Image
                                src={images[2]}
                                alt="Michael Profile"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="lg:col-span-3 space-y-6">
                        <h2 className="text-3xl font-black">Founder & Lead <span className="text-gradient">Developer</span></h2>
                        <div className="prose prose-invert max-w-none text-muted-foreground prose-p:leading-relaxed">
                            <p className="text-lg">
                                &ldquo;I&apos;m Michael Ogutu Mokua, a relentless innovator and the founder behind MIKESTH3TIC.DEV,
                                an AI and software development startup dedicated to engineering the future of intelligent digital systems.&rdquo;
                            </p>
                            <p>
                                I specialize in architecting cutting-edge platforms—ranging from AI-powered advisory systems and advanced
                                full-stack dashboards to marketplaces and immersive corporate digital architecture. My work doesn&apos;t
                                just perform; it thinks, adapts, and evolves.
                            </p>
                            <p>
                                With a focus on merging Artificial Intelligence with high-performance web architecture,
                                I am obsessed with building solutions that automate, optimize, and redefine the boundaries
                                of modern software. Every system I deliver is scalable, powerful, and engineered for
                                maximum impact.
                            </p>
                            <p className="font-bold text-foreground">
                                MIKESTH3TIC.DEV is more than a company—it&apos;s a vision where innovation meets precision execution,
                                transforming complex ideas into intelligent digital empires.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="-mx-4 sm:-mx-6 lg:-mx-8">
                    <SkillsSection />
                </div>
                {/* Founder's Memo / Authority */}
                <motion.section
                    className="relative py-20 px-8 md:px-16 glass rounded-[3rem] border border-electric-400/20 overflow-hidden mb-32"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-electric-400/5 blur-[120px] rounded-full -mr-48 -mt-48" />
                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <p className="text-xs font-mono text-electric-400 mb-8 tracking-[0.5em] uppercase">// FOUNDER'S PERSPECTIVE</p>
                        <h2 className="text-3xl md:text-5xl font-light italic leading-tight text-foreground/90 mb-12">
                            "I believe that code is more than logic,it is <span className="text-electric-400 font-bold not-italic">architecture.</span> Every system we build should feel like a living, breathing expression of intelligence and aesthetics."
                        </h2>

                        <div className="flex flex-col items-center gap-4">
                            <div className="relative h-16 w-64">
                                {/* Visual signature representation */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-4xl font-serif italic text-foreground/40 select-none opacity-50">Michael Mokua</span>
                                    <motion.div
                                        className="absolute bottom-4 left-0 right-0 h-[1px] bg-electric-400/30"
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        transition={{ duration: 1.5, delay: 0.5 }}
                                    />
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-bold text-foreground">Michael Ogutu Mokua</p>
                                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-1">Founding Architect & Software Engineer</p>
                            </div>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
}

import { UserCheck as UserCheckIcon } from "lucide-react";
