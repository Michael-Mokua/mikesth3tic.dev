"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { useGreeting } from "@/hooks/useGreeting";
import { useSound } from "@/hooks/useSound";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { NeuralField } from "./NeuralField";

const ROLES = [
    "Software Product Studio",
    "AI Systems Engineering",
    "Scalable Digital Solutions",
    "Product Engineering Studio",
];

export function HeroSection() {
    const { t } = useTranslation();
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayed, setDisplayed] = useState("");
    const [typing, setTyping] = useState(true);
    const { playHover, playClick, playAmbient } = useSound();

    useEffect(() => {
        const stopAmbient = playAmbient();
        return () => {
            if (stopAmbient) stopAmbient();
        };
    }, [playAmbient]);

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

    return (
        <section
            className="relative h-screen w-full flex items-center justify-center overflow-hidden"
            aria-label="Hero section"
        >
            {/* Immersive Neural Field Background */}
            <div className="absolute inset-0 z-0">
                <NeuralField />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 container-custom w-full max-w-7xl px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-start text-left"
                >
                    {/* System Status Badge */}
                    <motion.div variants={itemVariants} className="mb-6">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-mono font-bold bg-white/[0.03] border border-white/[0.08] text-electric-400 uppercase tracking-[0.3em] backdrop-blur-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-electric-400 animate-pulse" />
                            {t("hero.badge")}
                        </span>
                    </motion.div>

                    {/* Kinetic Headline */}
                    <motion.div variants={itemVariants} className="mb-4">
                        <span className="text-xs font-mono text-white/40 uppercase tracking-[0.5em] block mb-2">
                           Michael Ogutu Mokua // Software Studio
                        </span>
                        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter">
                            <span className="block text-white opacity-90">Michael</span>
                            <span className="block text-gradient">Mokua.</span>
                        </h1>
                    </motion.div>

                    {/* Interactive Role Switcher */}
                    <motion.div variants={itemVariants} className="mb-10 flex items-center gap-4 text-xl sm:text-2xl md:text-3xl font-mono text-white/60">
                         <div className="w-12 h-px bg-electric-400/50" />
                         <span>{displayed}</span>
                         <span className="animate-blink w-1 h-8 bg-electric-400" />
                    </motion.div>

                    {/* Elite CTA Actions */}
                    <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6">
                        <Link
                            href="/start-project"
                            onMouseEnter={playHover}
                            onClick={playClick}
                            className="group relative px-8 py-4 rounded-full bg-electric-400 text-dark-950 font-black text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(0,212,255,0.4)]"
                        >
                            {t("hero.cta.start")}
                            <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href="/resume"
                            onMouseEnter={playHover}
                            onClick={playClick}
                            className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white/80 font-bold text-xs uppercase tracking-widest transition-all hover:bg-white/10 hover:border-white/20"
                        >
                            <Download className="w-4 h-4 text-electric-400" />
                            {t("hero.cta.portfolio")}
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Viewport Nav Indicators */}
            <div className="absolute bottom-10 left-10 hidden xl:flex flex-col gap-2 font-mono text-[10px] text-white/20">
                <p>LATENCY: 12ms</p>
                <p>UPTIME: 99.99%</p>
                <p>SEC: AES_256_GCM</p>
            </div>

            <motion.div
                className="absolute bottom-10 right-10 flex flex-col items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
            >
                <span className="writing-mode-vertical text-[10px] font-mono tracking-[0.5em] text-white/30 uppercase">DRIV_ENERGY</span>
                <div className="w-px h-16 bg-gradient-to-b from-electric-400/5 to-electric-400" />
            </motion.div>
        </section>
    );
}
