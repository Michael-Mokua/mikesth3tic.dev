"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Zap, ShieldAlert } from "lucide-react";

export function NodeUnlock() {
    const [progress, setProgress] = useState(0);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const h = document.documentElement, 
                  b = document.body,
                  st = "scrollTop",
                  sh = "scrollHeight";
            const percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
            setProgress(Math.min(percent, 100));
            
            if (percent >= 90 && !isUnlocked) {
                setIsUnlocked(true);
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 5000);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isUnlocked]);

    if (isUnlocked && !showSuccess) return null;

    return (
        <AnimatePresence>
            {showSuccess && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="fixed bottom-32 left-10 z-[90] max-w-xs"
                >
                    <div className="liquid-glass p-6 rounded-2xl border-neon-400/40 shadow-[0_0_30px_rgba(186,255,0,0.2)]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-neon-400/20">
                                <Unlock className="w-5 h-5 text-neon-400" />
                            </div>
                            <h4 className="font-black text-white uppercase tracking-tight">System Unlocked.</h4>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                            You've synthesized 100% of the site data nodes. Access to the **Restricted Vault** is now granted.
                        </p>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                                className="h-full bg-neon-400"
                                initial={{ width: "100%" }}
                                animate={{ width: "0%" }}
                                transition={{ duration: 5, ease: "linear" }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}

            {!isUnlocked && (
                <div className="fixed bottom-10 left-10 z-[100] hidden xl:block">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-dark-950/80 backdrop-blur-xl border border-white/5 scale-90 origin-bottom-left">
                        <div className="relative">
                            <svg className="w-12 h-12 -rotate-90">
                                <circle
                                    cx="24"
                                    cy="24"
                                    r="20"
                                    className="stroke-white/5 fill-none"
                                    strokeWidth="2"
                                />
                                <motion.circle
                                    cx="24"
                                    cy="24"
                                    r="20"
                                    className="stroke-electric-400 fill-none"
                                    strokeWidth="2"
                                    strokeDasharray="125.66"
                                    animate={{ strokeDashoffset: 125.66 - (125.66 * progress) / 100 }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Lock className="w-4 h-4 text-white/20" />
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">NODE_SYNTHESIS</p>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white">{Math.round(progress)}%</span>
                                <span className="w-8 h-px bg-white/10" />
                                <span className="text-[9px] font-mono text-electric-400/50 uppercase">RESTRICTED_ACCESS</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}
