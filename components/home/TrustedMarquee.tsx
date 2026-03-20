"use client";

import { motion } from "framer-motion";
import { 
    Cloud, 
    Cpu, 
    Database, 
    Globe, 
    Shield, 
    Zap,
    AlertCircle
} from "lucide-react";

const partners = [
    { name: "Vercel Ecosystem", icon: Zap },
    { name: "AWS Cloud Architecture", icon: Cloud },
    { name: "OpenAI API Partner", icon: Cpu },
    { name: "PostgreSQL Systems", icon: Database },
    { name: "Global Edge Network", icon: Globe },
    { name: "AES-256 Security", icon: Shield },
    { name: "Kenyan Agrotech Beta", icon: Zap },
    { name: "SaaS Scaling Partner", icon: Cloud },
];

export function TrustedMarquee() {
    return (
        <section className="py-20 bg-dark-950 overflow-hidden border-y border-white/[0.05]">
            <div className="container-custom mb-10">
                <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-electric-400/5 border border-electric-400/20 w-max mx-auto shadow-[0_0_20px_rgba(0,212,255,0.1)]">
                    <AlertCircle className="w-4 h-4 text-electric-400" />
                    <span className="text-[10px] font-mono font-bold text-electric-400 uppercase tracking-widest">
                        Partner Network • Expanding Q2 2026 • No major brands claimed
                    </span>
                </div>
            </div>

            <div className="relative flex overflow-x-hidden">
                <motion.div 
                    className="flex gap-12 py-4 whitespace-nowrap"
                    animate={{ x: [0, -1000] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                    {[...partners, ...partners].map((partner, i) => (
                        <div key={i} className="flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all group">
                            <partner.icon className="w-6 h-6 text-white/30 group-hover:text-electric-400 transition-colors" />
                            <span className="text-sm font-bold text-white/40 group-hover:text-white/80 transition-colors uppercase tracking-tight">
                                {partner.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
