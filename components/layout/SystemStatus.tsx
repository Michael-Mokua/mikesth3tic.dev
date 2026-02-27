"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Terminal, Shield, Cpu, Wifi } from "lucide-react";

export function SystemStatus() {
    const [status, setStatus] = useState({
        node: "PRIMARY_OS_V1",
        latency: 12,
        security: "ENCRYPTED_AES_256",
        uptime: "99.98%"
    });

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            setStatus(prev => ({
                ...prev,
                latency: Math.floor(Math.random() * 5) + 8
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[60] h-6 bg-dark-950/80 backdrop-blur-md border-t border-white/[0.05] hidden md:flex items-center px-4 justify-between pointer-events-none select-none">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-[0.2em]">System.Active</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-electric-400" />
                    <span className="text-[9px] font-mono text-muted-foreground/60 tracking-wider">Node: {status.node}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Wifi className="w-3 h-3 text-electric-400" />
                    <span className="text-[9px] font-mono text-muted-foreground/60 tracking-wider">Latency: {status.latency}ms</span>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5">
                    <Cpu className="w-3 h-3 text-electric-400" />
                    <span className="text-[9px] font-mono text-muted-foreground/60 tracking-wider">Uptime: {status.uptime}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Shield className="w-3 h-3 text-electric-400" />
                    <span className="text-[9px] font-mono text-muted-foreground/60 tracking-wider">SECURITY: {status.security}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-mono text-electric-400/40 uppercase tracking-[0.2em]">© 2026 MIKESTH3TIC.DEV</span>
                </div>
            </div>

            {/* Scanning line animation */}
            <motion.div
                className="absolute top-0 left-0 h-[1px] bg-electric-400/20 w-32"
                animate={{ left: ["0%", "100%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
}
