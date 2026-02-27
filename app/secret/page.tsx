"use client";

import { motion } from "framer-motion";
import { Sparkles, Terminal, ArrowLeft, Trophy } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function SecretPage() {
    const [glitch, setGlitch] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setGlitch(true);
            setTimeout(() => setGlitch(false), 200);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden font-mono">
            {/* Matrix-like background effect */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full relative z-10 text-center"
            >
                <div className="mb-12 inline-block">
                    <div className="relative">
                        <div className={`text-6xl mb-6 transition-all duration-75 ${glitch ? 'translate-x-1 skew-x-12 blur-[1px]' : ''}`}>
                            👾
                        </div>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-4 -right-4"
                        >
                            <Sparkles className="w-8 h-8 text-electric-400 opacity-50" />
                        </motion.div>
                    </div>
                    <h1 className="text-4xl font-black text-electric-400 mb-2 uppercase tracking-[0.2em]">VOID_DETECTED</h1>
                    <p className="text-xs text-muted-foreground">YOU HAVE FOUND THE HIDDEN NODE.</p>
                </div>

                <div className="glass border border-electric-400/20 rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden text-left">
                    <div className="absolute top-0 right-0 p-4">
                        <Terminal className="w-5 h-5 text-electric-400/30" />
                    </div>

                    <div className="space-y-6 text-sm text-foreground/80 leading-relaxed">
                        <p>Congratulations, Michael. Not many people look deep enough into the markup to find the route to the void.</p>
                        <p>As a reward for your curiosity, you&apos;ve unlocked the <span className="text-electric-400 font-bold">Node Explorer</span> achievement badge in your Trophy Cabinet.</p>
                        <p className="border-l-2 border-electric-400 pl-4 py-2 bg-electric-400/5">
                            SUCCESS: achievement_unlocked("NODE_EXPLORER")
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                            <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center border border-yellow-400/20 shadow-[0_0_20px_rgba(250,204,21,0.2)]">
                                <Trophy className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div>
                                <p className="font-bold text-foreground">Achievement Unlocked</p>
                                <p className="text-xs text-muted-foreground">The Node Explorer Badge is now active.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Link href="/" className="inline-flex items-center gap-2 text-sm text-electric-400 hover:text-white transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Return to Reality
                </Link>
            </motion.div>

            {/* Retro scanline effect */}
            <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-50 bg-[length:100%_2px,3px_100%]" />
        </div>
    );
}
