"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useKonamiCode } from "@/hooks/useKonamiCode";

export function KonamiOverlay() {
    const { activated, reset } = useKonamiCode();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!activated || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = "MIKESTH3TIC.DEV01アイウエオカキクケコ⚡🏗️💻";
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops: number[] = new Array(columns).fill(1);

        const draw = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#00ff41";
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(char, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        // Auto-dismiss after 5 seconds
        const timeout = setTimeout(() => {
            reset();
        }, 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [activated, reset]);

    return (
        <AnimatePresence>
            {activated && (
                <motion.div
                    className="fixed inset-0 z-[9999] cursor-pointer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={reset}
                >
                    <canvas ref={canvasRef} className="w-full h-full" />

                    {/* Dev message */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                            className="text-center"
                        >
                            <p className="text-4xl md:text-6xl font-black text-green-400 mb-4 font-mono drop-shadow-[0_0_20px_rgba(0,255,65,0.8)]">
                                {"{ DEVELOPER MODE }"}
                            </p>
                            <p className="text-lg text-green-300/80 font-mono">
                                You found the secret. Respect. 🫡
                            </p>
                            <p className="text-sm text-green-400/50 font-mono mt-4">
                                Click anywhere or wait to dismiss
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
