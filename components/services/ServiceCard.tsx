"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon, ChevronDown, Code2, Server, Shield, Smartphone, Zap, Database, BrainCircuit, Rocket, Activity, BarChart3, Briefcase, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

// Mapping string names to Lucide Icons for dynamic rendering
const ICON_MAP: Record<string, LucideIcon> = {
    Code2, Server, Shield, Smartphone, Zap, Database, BrainCircuit, Rocket, Activity, BarChart3, Briefcase, Stethoscope
};

export type ServiceOffering = {
    id: string;
    title: string;
    description: string;
    icon: string;
    bullets: string[];
    process: { step: string; detail: string }[];
};

export function ServiceCard({ service, index }: { service: ServiceOffering; index: number }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const Icon = ICON_MAP[service.icon] || Code2;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
                "group relative glass rounded-3xl border transition-all duration-300 overflow-hidden",
                isExpanded
                    ? "border-electric-400/50 bg-electric-950/20 shadow-[0_0_30px_-5px_var(--electric-400)] shadow-electric-400/20"
                    : "border-white/[0.06] hover:border-electric-400/30 hover:bg-white/[0.02]"
            )}
        >
            {/* Header / Trigger */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full text-left p-6 md:p-8 flex items-start gap-4 md:gap-6 focus:outline-none"
            >
                <div className={cn(
                    "flex-shrink-0 p-4 rounded-2xl transition-all duration-300",
                    isExpanded
                        ? "bg-electric-400/20 text-electric-400"
                        : "bg-white/[0.03] text-muted-foreground group-hover:text-electric-400 group-hover:bg-electric-400/10"
                )}>
                    <Icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>

                <div className="flex-1 pt-1">
                    <h3 className="text-xl md:text-2xl font-bold font-mono tracking-tight text-foreground mb-2 group-hover:text-electric-400 transition-colors">
                        {service.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-2 md:line-clamp-none">
                        {service.description}
                    </p>
                </div>

                <div className="flex-shrink-0 pt-2">
                    <div className={cn(
                        "p-2 rounded-full border transition-all duration-300",
                        isExpanded
                            ? "border-electric-400/30 text-electric-400 bg-electric-400/10 rotate-180"
                            : "border-white/[0.06] text-muted-foreground group-hover:border-electric-400/30 group-hover:text-electric-400"
                    )}>
                        <ChevronDown className="w-5 h-5" />
                    </div>
                </div>
            </button>

            {/* Expandable Content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 border-t border-white/[0.06] mt-2">

                            {/* What We Build */}
                            <div className="mt-6 mb-8">
                                <h4 className="text-xs font-mono text-electric-400 mb-4 tracking-wider uppercase">
                                    // Scope of Delivery
                                </h4>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {service.bullets.map((bullet, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                                            <div className="w-1.5 h-1.5 rounded-full bg-electric-400/50 flex-shrink-0" />
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* How We Do It */}
                            <div className="space-y-4">
                                <h4 className="text-xs font-mono text-electric-400 mb-4 tracking-wider uppercase">
                                    // Implementation Architecture
                                </h4>
                                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-electric-400/50 before:via-electric-400/10 before:to-transparent">
                                    {service.process.map((step, i) => (
                                        <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group/step is-active">
                                            {/* Timeline Node */}
                                            <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-electric-400 bg-background absolute left-0 md:left-1/2 -translate-x-2 md:-translate-x-1/2 shrink-0 z-10" />

                                            {/* Content Card */}
                                            <div className="w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] ml-auto md:ml-0 p-4 rounded-xl border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                                                <h5 className="font-bold text-foreground text-sm mb-1">{step.step}</h5>
                                                <p className="text-xs text-muted-foreground leading-relaxed">{step.detail}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
