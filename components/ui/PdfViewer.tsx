"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileDown, X, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import Link from "next/link";
import { Magnetic } from "@/components/ui/Magnetic";
import { useSound } from "@/hooks/useSound";

interface PdfViewerProps {
    fileUrl: string;
    title: string;
    onCloseHref: string;
}

export function PdfViewer({ fileUrl, title, onCloseHref }: PdfViewerProps) {
    const { playClick } = useSound();
    const [isLoading, setIsLoading] = useState(true);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex flex-col overflow-hidden"
        >
            {/* Top Toolbar */}
            <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-black/50 relative z-20">
                <div className="flex items-center gap-4">
                    <Magnetic>
                        <Link 
                            href={onCloseHref}
                            onClick={() => playClick()}
                            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-white transition-all shadow-glass"
                        >
                            <X className="w-5 h-5" />
                        </Link>
                    </Magnetic>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-electric-400 tracking-widest uppercase">DOC-VIEWER v2.4</span>
                        <h2 className="text-sm font-bold text-white tracking-wide">{title}</h2>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Magnetic>
                        <a 
                            href={fileUrl}
                            download
                            onClick={() => playClick()}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-electric-400 text-black font-bold text-xs uppercase tracking-widest hover:bg-electric-300 transition-all shadow-[0_0_20px_rgba(0,212,255,0.4)]"
                        >
                            <FileDown className="w-4 h-4" />
                            <span className="hidden sm:inline">Download Source</span>
                        </a>
                    </Magnetic>
                </div>
            </header>

            {/* Viewer Content */}
            <div className="flex-1 relative bg-black flex items-center justify-center p-4 sm:p-8">
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                        <div className="w-16 h-16 border-4 border-electric-400/20 border-t-electric-400 rounded-full animate-spin mb-4" />
                        <p className="text-sm font-mono text-electric-400 uppercase tracking-widest animate-pulse">
                            Decrypting & Loading Document...
                        </p>
                    </div>
                )}
                
                <div className="w-full h-full max-w-6xl mx-auto rounded-xl overflow-hidden glass border border-white/10 shadow-2xl relative">
                    <iframe
                        src={`${fileUrl}#view=FitH&toolbar=0&navpanes=0`}
                        className="w-full h-full border-none bg-white rounded-xl"
                        title={title}
                        onLoad={() => setIsLoading(false)}
                    />
                    
                    {/* Scanline Overlay over the iframe (pointer-events-none so we can still scroll) */}
                    <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]" />
                </div>
            </div>
            
            {/* Bottom Telemetry Bar */}
            <footer className="h-8 border-t border-white/5 bg-black/80 flex items-center justify-between px-6 text-[9px] font-mono text-white/40 uppercase tracking-[0.2em] relative z-20">
                <span>SECURE RENDER PLATFORM</span>
                <span className="text-electric-400">STATUS: ACTIVE</span>
            </footer>
        </motion.div>
    );
}
