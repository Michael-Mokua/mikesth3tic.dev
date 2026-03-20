"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";

interface LogoProps {
    className?: string;
    onClick?: () => void;
}

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

export function Logo({ className, onClick }: LogoProps) {
    const [currentLogo, setCurrentLogo] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Pick a random logo on mount
        const randomIndex = Math.floor(Math.random() * LOGO_ANIMATIONS.length);
        setCurrentLogo(LOGO_ANIMATIONS[randomIndex]);

        // Auto-cycle logo every 8 seconds
        const interval = setInterval(() => {
            cycleLogo();
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    const cycleLogo = () => {
        setCurrentLogo(prev => {
            let next;
            do {
                next = LOGO_ANIMATIONS[Math.floor(Math.random() * LOGO_ANIMATIONS.length)];
            } while (next === prev);
            return next;
        });
    };

    return (
        <motion.div
            className={cn("relative flex items-center whitespace-nowrap select-none text-foreground cursor-pointer group", className)}
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            role="img"
            aria-label="MIKESTH3TIC.DEV Logo"
            onMouseEnter={cycleLogo} // cycle on hover as an extra premium interaction
        >
            <div className="flex items-center gap-[6px]">
                {/* Dynamic Video Logo */}
                <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center overflow-hidden rounded-md mix-blend-screen bg-black">
                    {currentLogo ? (
                        <motion.video
                            ref={videoRef}
                            src={currentLogo}
                            className="w-[150%] h-[150%] max-w-none object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                            autoPlay
                            muted
                            loop
                            playsInline
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        />
                    ) : (
                        <div className="w-full h-full bg-electric-400/20 animate-pulse rounded-md" />
                    )}
                    {/* Inner core accent glow */}
                    <div className="absolute inset-0 ring-1 ring-inset ring-electric-400/30 rounded-md z-10 pointer-events-none" />
                </div>

                <div className="flex flex-col leading-none ml-1">
                    <div className="flex items-center">
                        <span className="text-xl md:text-2xl font-black font-mono tracking-tighter">
                            MIKES
                        </span>
                        <span className="text-xl md:text-2xl font-bold font-mono tracking-tight opacity-40">
                            TH3TIC
                        </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-[0.35em] text-electric-400 uppercase opacity-90 mt-0.5">
                        Creative Software Studio
                    </span>
                </div>
            </div>

            {/* Hover Glow Effect */}
            <motion.div
                className="absolute inset-0 bg-electric-400/20 blur-2xl rounded-full -z-10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.6 }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
}
