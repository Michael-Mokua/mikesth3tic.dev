"use client";

import { motion } from "framer-motion";
import { VaultExplorer } from "@/components/home/StudioEnhancements";
import { BrandVault } from "@/components/home/BrandVault";
import { Shield, Zap, Cpu, Database } from "lucide-react";

export default function VaultPage() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-20">
            {/* Vault Hero / Showreel */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-10" />
                    {/* Background Ambient Glows */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-400/10 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-400/10 rounded-full blur-[120px] animate-pulse delay-1000" />
                </div>

                <div className="container-custom relative z-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-xs font-mono text-electric-400 mb-6 tracking-[0.5em] uppercase">Digital Archive</p>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter mb-8">
                            THE <span className="text-gradient">VAULT</span>
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
                            A high-security repository of our core visual intelligence, engineering infrastructure, and brand evolution sequences.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Immersive Brand Loop */}
            <div className="py-10">
                <BrandVault autoPlayAll={true} />
            </div>

            {/* Infrastructure Deep-Dive */}
            <div className="py-10 bg-white/[0.01]">
                <VaultExplorer />
            </div>

            {/* Technical Specs Footer */}
            <section className="container-custom py-24">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        { icon: Shield, label: "PRECISION", value: "High Fidelity" },
                        { icon: Zap, label: "THROUGHPUT", value: "Real-time" },
                        { icon: Cpu, label: "ARCHITECTURE", value: "Modern Stack" },
                        { icon: Database, label: "SCALABILITY", value: "Cloud Native" }
                    ].map((spec, i) => (
                        <motion.div 
                            key={spec.label}
                            className="glass p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <spec.icon className="w-6 h-6 text-electric-400" />
                            <div>
                                <p className="text-[10px] font-mono text-white/30 tracking-widest uppercase mb-1">{spec.label}</p>
                                <p className="text-sm font-bold text-white tracking-widest uppercase">{spec.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
}
