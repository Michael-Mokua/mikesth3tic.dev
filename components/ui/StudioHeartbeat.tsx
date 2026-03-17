"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Cpu, Wifi, Globe } from "lucide-react";

export function StudioHeartbeat() {
  const [metrics, setMetrics] = useState({
    latency: 24,
    uptime: 99.99,
    load: 12,
    location: "Nairobi, KE"
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        latency: Math.floor(20 + Math.random() * 10),
        load: Math.floor(10 + Math.random() * 5)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-6 px-4 py-2 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-md">
      <div className="flex items-center gap-2">
        <Activity className="w-3 h-3 text-green-400 animate-pulse" />
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">System Live</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Wifi className="w-3 h-3 text-electric-400" />
        <span className="text-[10px] font-mono text-foreground uppercase tracking-widest">{metrics.latency}ms</span>
      </div>

      <div className="flex items-center gap-2">
        <Cpu className="w-3 h-3 text-neon-400" />
        <span className="text-[10px] font-mono text-foreground uppercase tracking-widest">{metrics.load}% Load</span>
      </div>

      <div className="flex items-center gap-2">
        <Globe className="w-3 h-3 text-yellow-400" />
        <span className="text-[10px] font-mono text-foreground uppercase tracking-widest">{metrics.location}</span>
      </div>
    </div>
  );
}
