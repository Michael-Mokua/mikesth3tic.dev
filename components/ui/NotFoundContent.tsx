"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Zap } from "lucide-react";
import { HeroBackground } from "@/components/home/HeroBackground";
import Magnetic from "@/components/ui/Magnetic";

export function NotFoundContent() {
    return (
        <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
            <HeroBackground />

            <div className="relative z-10 max-w-2xl w-full text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="relative inline-block mb-8">
                        <motion.span
                            className="text-[12rem] md:text-[18rem] font-black leading-none tracking-tighter text-white/5 select-none"
                            animate={{ opacity: [0.05, 0.1, 0.05] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            404
                        </motion.span>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                                Reality <span className="text-gradient">Not Found.</span>
                            </h1>
                        </div>
                    </div>

                    <p className="text-xl text-white/60 mb-12 max-w-md mx-auto leading-relaxed">
                        The requested system address does not exist or has been shifted across the digital grid.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Magnetic>
                            <Link
                                href="/"
                                className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                            >
                                <Home className="w-5 h-5" />
                                Return Home
                            </Link>
                        </Magnetic>

                        <Magnetic>
                            <Link
                                href="/projects"
                                className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold transition-all hover:bg-white/10 backdrop-blur-xl"
                            >
                                <Zap className="w-5 h-5 text-electric-400" />
                                Explore Projects
                            </Link>
                        </Magnetic>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Glitch lines */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-electric-400 to-transparent blur-sm" />
                <div className="absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-400 to-transparent blur-sm" />
            </div>
        </div>
    );
}
