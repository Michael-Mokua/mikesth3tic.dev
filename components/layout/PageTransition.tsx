"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const LOGO_ANIMATIONS = [
    "/logos/grok_video_2026-03-13-09-56-00.mp4",
    "/logos/grok_video_2026-03-13-09-58-17.mp4",
    "/logos/grok_video_2026-03-13-09-59-11.mp4",
    "/logos/grok_video_2026-03-13-10-00-10.mp4",
    "/logos/grok_video_2026-03-13-10-00-53.mp4",
    "/logos/grok_video_2026-03-13-10-04-05.mp4",
    "/logos/grok_video_2026-03-13-10-06-49.mp4",
    "/logos/grok_video_2026-03-13-10-08-18.mp4",
    "/logos/grok_video_2026-03-13-10-09-59.mp4",
    "/logos/grok_video_2026-03-13-10-11-11.mp4",
    "/logos/grok_video_2026-03-13-10-15-27.mp4",
    "/logos/grok_video_2026-03-13-10-21-16.mp4",
    "/logos/grok_video_2026-03-13-10-24-40.mp4",
    "/logos/grok_video_2026-03-13-10-26-58.mp4",
    "/logos/grok_video_2026-03-13-10-28-01.mp4",
    "/logos/grok_video_2026-03-13-10-32-14.mp4"
];

export function PageTransition() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [logo, setLogo] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return; // Skip first render flash if desired, or keep it for an initial splash screen

        const randomLogo = LOGO_ANIMATIONS[Math.floor(Math.random() * LOGO_ANIMATIONS.length)];
        setLogo(randomLogo);

        setIsTransitioning(true);

        const timeout = setTimeout(() => {
            setIsTransitioning(false);
        }, 1200);

        return () => clearTimeout(timeout);
    }, [pathname, searchParams, mounted]);

    return (
        <AnimatePresence>
            {isTransitioning && mounted && (
                <motion.div
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden mix-blend-screen bg-black flex items-center justify-center border border-white/5">
                        {logo && (
                            <video
                                src={logo}
                                autoPlay
                                muted
                                playsInline
                                className="w-[150%] h-[150%] max-w-none object-cover opacity-90"
                            />
                        )}
                        <div className="absolute inset-0 bg-electric-400/10 pointer-events-none" />
                    </div>

                    <motion.div
                        className="mt-10 flex flex-col items-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="text-[10px] font-mono text-electric-400 tracking-[0.2em] uppercase mb-4 animate-pulse">
                            AUTHENTICATING PROTOCOL
                        </div>
                        <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-electric-400"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
