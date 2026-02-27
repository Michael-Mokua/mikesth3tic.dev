"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Eye, Globe, Clock, BarChart2 } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

const topPages = [
    { path: "/", views: 3840, change: "+12%" },
    { path: "/projects", views: 2210, change: "+8%" },
    { path: "/blog", views: 1490, change: "+22%" },
    { path: "/about", views: 980, change: "+5%" },
    { path: "/services", views: 620, change: "+41%" },
    { path: "/contact", views: 390, change: "+3%" },
];

const monthlyData = [180, 240, 300, 220, 380, 450, 320, 480, 420, 510, 390, 600];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const deviceData = [
    { label: "Desktop", percent: 58, color: "bg-electric-400" },
    { label: "Mobile", percent: 36, color: "bg-neon-400" },
    { label: "Tablet", percent: 6, color: "bg-blue-400" },
];

export default function AnalyticsPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <p className="text-xs font-mono text-electric-400 uppercase tracking-widest mb-1">// INSIGHTS</p>
                    <h1 className="text-2xl font-black text-foreground">Analytics</h1>
                    <p className="text-sm text-muted-foreground mt-1">Website performance & audience metrics</p>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: "Total Views", value: "12,840", icon: Eye, delta: "+18.2%" },
                        { label: "Unique Visitors", value: "6,420", icon: Users, delta: "+14.5%" },
                        { label: "Countries", value: "38", icon: Globe, delta: "+3" },
                        { label: "Avg. Duration", value: "3m 42s", icon: Clock, delta: "+8%" },
                    ].map((card, i) => (
                        <motion.div key={card.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                            className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4">
                            <div className="flex items-center justify-between mb-3">
                                <card.icon className="w-4 h-4 text-electric-400" />
                                <span className="text-[10px] font-mono text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded-full">{card.delta}</span>
                            </div>
                            <p className="text-xl font-black text-foreground">{card.value}</p>
                            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mt-1">{card.label}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Monthly traffic chart */}
                    <div className="lg:col-span-2 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
                        <h2 className="text-sm font-bold text-foreground mb-6 flex items-center gap-2">
                            <BarChart2 className="w-4 h-4 text-electric-400" /> Monthly Traffic
                        </h2>
                        <div className="flex items-end gap-1.5 h-36">
                            {monthlyData.map((v, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                    <div className="relative w-full bg-white/[0.05] rounded-t overflow-hidden" style={{ height: "120px" }}>
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 bg-electric-400 rounded-t"
                                            initial={{ height: 0 }}
                                            animate={{ height: `${(v / 600) * 100}%` }}
                                            transition={{ delay: i * 0.06, duration: 0.7, ease: "easeOut" }}
                                        />
                                    </div>
                                    <span className="text-[8px] text-muted-foreground font-mono">{months[i].slice(0, 1)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Device breakdown */}
                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
                        <h2 className="text-sm font-bold text-foreground mb-6 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-electric-400" /> Devices
                        </h2>
                        <div className="space-y-4">
                            {deviceData.map(d => (
                                <div key={d.label}>
                                    <div className="flex justify-between text-xs mb-2">
                                        <span className="text-foreground font-medium">{d.label}</span>
                                        <span className="text-muted-foreground font-mono">{d.percent}%</span>
                                    </div>
                                    <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                                        <motion.div
                                            className={`h-full ${d.color} rounded-full`}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${d.percent}%` }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Top pages */}
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-white/[0.06]">
                        <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                            <Globe className="w-4 h-4 text-electric-400" /> Top Pages
                        </h2>
                    </div>
                    {topPages.map((page, i) => (
                        <div key={page.path} className="flex items-center gap-4 p-4 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                            <span className="text-[10px] font-mono text-muted-foreground/50 w-4">{i + 1}</span>
                            <p className="text-sm font-mono text-foreground flex-1">{page.path}</p>
                            <p className="text-sm text-muted-foreground">{page.views.toLocaleString()}</p>
                            <span className="text-[10px] font-mono text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded-full">{page.change}</span>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
