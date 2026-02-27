"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    onClick?: () => void;
}

export function Logo({ className, onClick }: LogoProps) {
    return (
        <motion.div
            className={cn("relative flex items-center whitespace-nowrap select-none text-foreground", className)}
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            role="img"
            aria-label="MIKESTH3TIC.DEV Logo"
        >
            <div className="flex items-center gap-[2px]">
                {/* stylized Elite "M" icon representing architecture/structure */}
                <motion.svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 text-electric-400"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Outer structural frame */}
                    <motion.path
                        d="M4 28V8L16 18L28 8V28"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                    {/* Inner core support */}
                    <motion.path
                        d="M16 28V18"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                    />
                    {/* Architectural accent lines */}
                    <motion.path
                        d="M8 28H24"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        style={{ opacity: 0.4 }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 1.5 }}
                    />
                    {/* Top horizon line */}
                    <motion.path
                        d="M4 8H28"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        strokeDasharray="4 4"
                        style={{ opacity: 0.2 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        transition={{ duration: 1, delay: 2 }}
                    />
                </motion.svg>

                <div className="flex flex-col leading-none">
                    <div className="flex items-center">
                        <span className="text-xl md:text-2xl font-black font-mono tracking-tighter">
                            MIKES
                        </span>
                        <span className="text-xl md:text-2xl font-bold font-mono tracking-tight opacity-40">
                            TH3TIC
                        </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-[0.35em] text-electric-400 uppercase opacity-90 mt-0.5">
                        Architect .DEV
                    </span>
                </div>
            </div>

            {/* Hover Glow Effect */}
            <motion.div
                className="absolute inset-0 bg-electric-400/20 blur-2xl rounded-full -z-10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.5 }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
}
