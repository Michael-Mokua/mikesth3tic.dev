"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Cpu, HardDrive, Globe, Zap, ShieldCheck } from "lucide-react";

export function NexusDashboard() {
    const [metrics, setMetrics] = useState({
        latency: 0,
        memory: 0,
        load: 0,
        uptime: "99.99%",
        nodes: 12
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics(prev => ({
                ...prev,
                latency: Math.floor(Math.random() * 20) + 5,
                memory: Math.floor(Math.random() * 200) + 400,
                load: Math.floor(Math.random() * 15) + 5
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const dataPoints = [
        { label: "SYSTEM_LATENCY", value: `${metrics.latency}MS`, icon: Activity, color: "text-electric-400" },
        { label: "MEMORY_USAGE", value: `${metrics.memory}MB`, icon: Cpu, color: "text-neon-400" },
        { label: "LOAD_FACTOR", value: `${metrics.load}%`, icon: HardDrive, color: "text-white" },
        { label: "NODE_STATUS", value: "OPTIMAL", icon: ShieldCheck, color: "text-green-400" },
        { label: "ACTIVE_EDGE", value: metrics.nodes, icon: Globe, color: "text-electric-300" },
        { label: "UPTIME", value: metrics.uptime, icon: Zap, color: "text-yellow-400" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-6 rounded-[2rem] liquid-glass border-white/5 shadow-2xl">
            {dataPoints.map((point, i) => (
                <motion.div
                    key={point.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col gap-2 p-4 rounded-xl hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/5"
                >
                    <div className="flex items-center justify-between">
                        <point.icon className={`w-4 h-4 ${point.color}`} />
                        <span className="text-[8px] font-mono text-white/20 tracking-tighter">NODE_{i+1}</span>
                    </div>
                    <div>
                        <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">
                            {point.label}
                        </p>
                        <p className={`text-sm font-black font-mono tracking-tight ${point.color}`}>
                            {point.value}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
