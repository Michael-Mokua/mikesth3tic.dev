"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Hide after 2s if already loaded, or wait for load
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="preloader"
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="flex flex-col items-center gap-6">
                        {/* Animated logo */}
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Spinning ring */}
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-transparent border-t-electric-400 border-r-neon-400"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                style={{ margin: "-16px", padding: "16px" }}
                            />

                            {/* Logo text */}
                            <div className="relative font-mono font-bold text-2xl">
                                <span className="text-gradient">MIKES</span>
                                <span className="text-foreground">TH3TIC</span>
                                <span className="text-electric-400">.DEV</span>
                            </div>
                        </motion.div>

                        {/* Loading bar */}
                        <div className="w-48 h-0.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-electric-400 to-neon-400 rounded-full"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.8, ease: "easeInOut" }}
                            />
                        </div>

                        {/* Status text */}
                        <motion.p
                            className="text-xs text-muted-foreground font-mono tracking-widest"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            INITIALIZING...
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
