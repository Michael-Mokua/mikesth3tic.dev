"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Bot, 
    Mic, 
    MessageCircle, 
    Zap, 
    X,
    LayoutGrid,
    Settings,
    Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SystemNexusProps {
    onOpenAI: () => void;
    onOpenVoice: () => void;
    isChatOpen?: boolean;
}

export function SystemNexus({ onOpenAI, onOpenVoice, isChatOpen = false }: SystemNexusProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const actions = [
        {
            id: "ai",
            label: "MikeAI Assistant",
            icon: Bot,
            color: "text-electric-400",
            bg: "bg-electric-400/10",
            onClick: () => {
                onOpenAI();
                setIsExpanded(false);
            }
        },
        {
            id: "voice",
            label: "Voice Command",
            icon: Mic,
            color: "text-neon-400",
            bg: "bg-neon-400/10",
            onClick: () => {
                onOpenVoice();
                setIsExpanded(false);
            }
        },
        {
            id: "whatsapp",
            label: "Secure Signal",
            icon: MessageCircle,
            color: "text-green-400",
            bg: "bg-green-400/10",
            onClick: () => {
                const text = encodeURIComponent("Hey Michael! I'd love to discuss a project with you. 🚀");
                window.open(`https://wa.me/254110254359?text=${text}`, "_blank");
                setIsExpanded(false);
            }
        }
    ];

    return (
        <div className="fixed bottom-10 right-10 z-[200]">
            <div className="relative flex items-center justify-center">
                {/* Orbital Rings */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute -inset-16 pointer-events-none"
                        >
                            <div className="w-full h-full rounded-full border border-electric-400/20 animate-spin-slow" />
                            <div className="absolute inset-4 rounded-full border border-neon-400/10 animate-reverse-spin" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Expanded Menu */}
                <AnimatePresence>
                    {isExpanded && (
                        <div className="absolute bottom-20 right-0 flex flex-col gap-3 items-end">
                            {actions.map((action, i) => (
                                <motion.button
                                    key={action.id}
                                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: 20, scale: 0.9 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={action.onClick}
                                    className="group flex items-center gap-4 px-4 py-3 rounded-2xl liquid-glass border-white/10 hover:border-electric-400/50 transition-all shadow-2xl"
                                >
                                    <span className="text-[10px] font-mono font-bold text-white/40 group-hover:text-white uppercase tracking-widest transition-colors">
                                        {action.label}
                                    </span>
                                    <div className={cn("p-2 rounded-xl transition-transform group-hover:scale-110", action.bg)}>
                                        <action.icon className={cn("w-5 h-5", action.color)} />
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    )}
                </AnimatePresence>

                {/* Primary Trigger */}
                <motion.button
                    onClick={() => setIsExpanded(!isExpanded)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                        "relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-50",
                        isExpanded 
                        ? "bg-electric-400 text-dark-950 rotate-90" 
                        : "liquid-glass border-white/10 text-electric-400 hover:border-electric-400/50"
                    )}
                >
                    <AnimatePresence mode="wait">
                        {isExpanded ? (
                            <motion.div
                                key="close"
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                            >
                                <X className="w-7 h-7" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="open"
                                initial={{ opacity: 0, rotate: 90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: -90 }}
                            >
                                <LayoutGrid className="w-7 h-7" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Status Dot */}
                    {!isExpanded && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-dark-950 animate-pulse" />
                    )}
                </motion.button>

                {/* Background Decor */}
                {!isExpanded && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-electric-400/5 blur-2xl -z-10" />
                )}
            </div>

            {/* Global Status Pill (Fixed to the left of the button) */}
            {!isExpanded && !isChatOpen && (
                <div className="absolute right-20 top-1/2 -translate-y-1/2 pointer-events-none">
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="px-3 py-1 rounded-md bg-dark-950/80 border border-white/5 text-[9px] font-mono text-white/40 uppercase tracking-[0.3em] backdrop-blur-md whitespace-nowrap"
                    >
                        // NEXUS_ACTIVE: OPTIMAL
                    </motion.div>
                </div>
            )}
        </div>
    );
}
