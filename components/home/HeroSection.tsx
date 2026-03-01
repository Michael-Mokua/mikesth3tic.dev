"use client";

import { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Download, Github, ExternalLink, Sparkles, Bot } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

import { useGreeting } from "@/hooks/useGreeting";

const HeroBackground = dynamic(
    () =>
        import("@/components/home/HeroBackground").then((m) => ({ default: m.HeroBackground })),
    { ssr: false }
);

const Magnetic = dynamic(() => import("@/components/ui/Magnetic"), { ssr: false });

const ROLES = [
    "Software Product Studio",
    "AI Systems Engineering",
    "Scalable Digital Solutions",
    "Product Engineering Studio",
];

export function HeroSection() {
    const { greeting, language } = useGreeting();
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayed, setDisplayed] = useState("");
    const [typing, setTyping] = useState(true);

    useEffect(() => {
        const role = ROLES[roleIndex];
        let timeout: NodeJS.Timeout;

        if (typing) {
            if (displayed.length < role.length) {
                timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 70);
            } else {
                timeout = setTimeout(() => setTyping(false), 2000);
            }
        } else {
            if (displayed.length > 0) {
                timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
            } else {
                setRoleIndex((i) => (i + 1) % ROLES.length);
                setTyping(true);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayed, typing, roleIndex]);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    };

    const techStack = ["Next.js", "TypeScript", "TailwindCSS", "Node.js", "Python", "PostgreSQL", "Docker", "AWS"];

    return (
        <section
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
            aria-label="Hero section"
        >
            {/* 3D Background */}
            <HeroBackground />

            {/* Content Container */}
            <div className="relative z-10 container-custom w-full max-w-5xl text-center px-4">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Badge */}
                    <motion.div variants={itemVariants} className="mb-4 flex justify-center">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-mono font-medium bg-white/[0.03] border border-white/[0.08] text-muted-foreground uppercase tracking-widest backdrop-blur-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-electric-400 animate-pulse" />
                            Software-First Technology Studio
                        </span>
                    </motion.div>

                    {/* Multilingual Greeting */}
                    <motion.div variants={itemVariants} className="mb-2 h-6">
                        <span className="text-sm font-mono text-electric-400 font-bold uppercase tracking-widest">
                            <Bot className="w-3 h-3 inline-block mr-2 -mt-0.5 animate-pulse" />
                            MikeAI: {greeting} <span className="opacity-30 ml-2">// SYSTEM.BOOT()</span>
                        </span>
                    </motion.div>

                    {/* Slogan */}
                    <motion.div variants={itemVariants} className="mb-2">
                        <span className="text-sm sm:text-base font-medium text-white uppercase tracking-[0.3em]">
                            We design, build, and scale modern software products.
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter mb-8"
                    >
                        <span className="block text-white">Michael</span>
                        <span className="block text-gradient">Mokua.</span>
                    </motion.h1>

                    {/* Dynamic Role */}
                    <motion.div variants={itemVariants} className="mb-10 text-xl sm:text-2xl md:text-3xl font-mono text-foreground/60 flex items-center justify-center gap-2 min-h-[1.5em]">
                        <Sparkles className="w-5 h-5 text-electric-400/50" />
                        <span>{displayed}</span>
                        <span className="animate-blink w-1 h-8 bg-electric-400 mx-1" />
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
                        <Magnetic>
                            <Link
                                href="/projects"
                                className="group relative px-10 py-5 rounded-full bg-white text-black font-bold text-sm tracking-tight transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)] overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Explore My Work
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                        </Magnetic>

                        <Magnetic>
                            <Link
                                href="/start-project"
                                className="px-10 py-5 rounded-full bg-electric-400/[0.1] border border-electric-400/30 text-electric-400 font-bold text-sm tracking-tight transition-all duration-300 hover:bg-electric-400/[0.2] hover:border-electric-400/50"
                            >
                                Start a Project
                            </Link>
                        </Magnetic>
                    </motion.div>

                    {/* Infinite Tech Marquee */}
                    <motion.div variants={itemVariants} className="max-w-3xl mx-auto overflow-hidden relative">
                        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
                        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
                        <motion.div
                            className="flex gap-12 whitespace-nowrap"
                            animate={{ x: [0, -1000] }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        >
                            {[...techStack, ...techStack, ...techStack].map((tech, i) => (
                                <span key={i} className="text-sm font-mono font-black text-white uppercase tracking-[0.3em] drop-shadow-lg filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                    {tech}
                                </span>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Vertical Scroll Legend */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                >
                    <span className="writing-mode-vertical text-[10px] font-mono tracking-[0.5em] text-white/40 uppercase">SCROLL</span>
                    <motion.div
                        className="w-px h-12 bg-gradient-to-b from-electric-400 to-transparent"
                        animate={{ height: [0, 48, 0], opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </motion.div>
            </div>

            {/* Background Polish */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-electric-400/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-neon-400/5 rounded-full blur-[120px]" />
            </div>
        </section>
    );
}
