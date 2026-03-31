"use client";

import { motion } from "framer-motion";
import { FileText, Download, Lock, ScanLine, ArrowRight, Sparkles } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";
import { useSound } from "@/hooks/useSound";
import Link from "next/link";

const intelDocs = [
    {
        id: "manifesto",
        title: "Company Manifesto",
        subtitle: "Core Directives & Philosophy",
        filename: "manifesto.pdf",
        size: "1.2 MB",
        restricted: false,
    },
    {
        id: "systems",
        title: "Systems Architecture",
        subtitle: "Infrastructure & Topology",
        filename: "systems.pdf",
        size: "2.8 MB",
        restricted: true,
    },
    {
        id: "ai-research",
        title: "AI Portfolio Systems",
        subtitle: "Full Research Document",
        filename: "ai-research.pdf",
        size: "4.5 MB",
        restricted: true,
    }
];

export function IntelCards() {
    const { playHover, playClick } = useSound();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {intelDocs.map((doc, index) => (
                <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                    <Magnetic>
                        <div 
                            className="group relative h-full flex flex-col p-8 glass rounded-[2rem] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-electric-400/30 transition-all duration-700 overflow-hidden cursor-pointer"
                            onMouseEnter={() => playHover()}
                        >
                            {/* Scanning Laser Effect on Hover */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-electric-400/50 blur-[2px] -translate-y-[100%] group-hover:translate-y-[400px] transition-transform duration-[1.5s] ease-in-out pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-br from-electric-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <div className="flex justify-between items-start mb-12 relative z-10">
                                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 group-hover:border-electric-400/30 shadow-glass transition-all">
                                    <FileText className="w-6 h-6 text-electric-400" />
                                </div>
                                {doc.restricted && (
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-mono font-bold uppercase tracking-widest">
                                        <Lock className="w-3 h-3" />
                                        Classified
                                    </div>
                                )}
                            </div>

                            <div className="relative z-10 flex-grow">
                                <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] mb-3 group-hover:text-electric-400/60 transition-colors">
                                    ID: DOC-{Math.floor(Math.random() * 9000) + 1000}
                                </p>
                                <h3 className="text-xl md:text-2xl font-black text-foreground mb-2 group-hover:text-electric-400 transition-colors tracking-tight">
                                    {doc.title}
                                </h3>
                                <p className="text-sm text-muted-foreground font-mono leading-relaxed">
                                    {doc.subtitle}
                                </p>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                                <span className="text-xs font-mono text-white/40">{doc.size}</span>
                                
                                <div className="flex gap-2">
                                    <a 
                                        href={`/docs/${doc.filename}`} 
                                        download
                                        onClick={() => playClick()}
                                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-white transition-all"
                                        title="Download Raw File"
                                    >
                                        <Download className="w-4 h-4" />
                                    </a>
                                    <Link 
                                        href={`/intel/${doc.id}`}
                                        onClick={() => playClick()}
                                        className="p-2 rounded-xl bg-electric-400/10 hover:bg-electric-400/20 text-electric-400 border border-electric-400/20 transition-all flex items-center gap-2"
                                        title="Decrypt Strategic Briefing"
                                    >
                                        <Sparkles className="w-4 h-4" />
                                        <span className="text-xs font-bold font-mono uppercase tracking-wider hidden sm:inline-block pr-1">Decrypt Briefing</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Magnetic>
                </motion.div>
            ))}
        </div>
    );
}
