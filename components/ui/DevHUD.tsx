"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TerminalSquare, Activity, Cpu, Wifi, X } from "lucide-react";

export function DevHUD() {
    const [isVisible, setIsVisible] = useState(false);
    const [fps, setFps] = useState(60);
    const [memory, setMemory] = useState(0);
    const [latency, setLatency] = useState(0);

    // Toggle via keyboard shortcut (Shift + T)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.shiftKey && e.key.toLowerCase() === 't') {
                setIsVisible(v => !v);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Simulate/Measure telemetry
    useEffect(() => {
        if (!isVisible) return;

        let frameCount = 0;
        let lastTime = performance.now();
        let animationFrameId: number;

        const measureFPS = () => {
            const now = performance.now();
            frameCount++;
            if (now - lastTime >= 1000) {
                setFps(frameCount);
                frameCount = 0;
                lastTime = now;
                
                // Simulate memory/latency jitter for realism
                setMemory(Math.floor(Math.random() * 15) + 45); // 45-60MB
                setLatency(Math.floor(Math.random() * 10) + 15); // 15-25ms
            }
            animationFrameId = requestAnimationFrame(measureFPS);
        };

        animationFrameId = requestAnimationFrame(measureFPS);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isVisible]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed bottom-6 left-6 z-[999] w-72 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl font-mono text-xs"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                        <div className="flex items-center gap-2 text-electric-400">
                            <TerminalSquare className="w-3.5 h-3.5" />
                            <span className="font-bold tracking-widest uppercase">SYS.TELEMETRY</span>
                        </div>
                        <button 
                            onClick={() => setIsVisible(false)}
                            className="text-white/40 hover:text-white transition-colors"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-white/60">
                                <Activity className="w-3.5 h-3.5" />
                                <span>CLIENT_FPS</span>
                            </div>
                            <span className={`font-bold ${fps >= 55 ? 'text-green-400' : 'text-yellow-400'}`}>
                                {fps}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-white/60">
                                <Cpu className="w-3.5 h-3.5" />
                                <span>HEAP_MEM</span>
                            </div>
                            <span className="text-white">{memory} MB</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-white/60">
                                <Wifi className="w-3.5 h-3.5" />
                                <span>NET_LATENCY</span>
                            </div>
                            <span className="text-electric-400">{latency} ms</span>
                        </div>

                        {/* Visual graph simulation */}
                        <div className="pt-2">
                            <div className="h-6 flex items-end gap-1 opacity-50">
                                {[...Array(20)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-full bg-electric-400 rounded-t-sm"
                                        initial={{ height: "10%" }}
                                        animate={{ height: `${Math.random() * 80 + 20}%` }}
                                        transition={{ 
                                            repeat: Infinity, 
                                            repeatType: "reverse", 
                                            duration: 0.5 + Math.random(),
                                            ease: "easeInOut"
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
