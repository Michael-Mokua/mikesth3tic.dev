"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Users, Eye, FileEdit, MessageSquare, TrendingUp,
    Clock, ArrowUpRight, Zap, Globe, Activity, RefreshCw, Loader2
} from "lucide-react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

type DashStats = {
    totalViews: number;
    subscriberCount: number;
    totalPosts: number;
    contactCount: number;
};

type ActivityItem = {
    id: string;
    action: string;
    detail: string;
    timestamp: string | null;
    color?: string;
};

type PageView = { path: string; views: number };

const quickActions = [
    { href: "/dashboard/posts", label: "Blog Posts", icon: FileEdit, color: "bg-electric-400/10 text-electric-400 border border-electric-400/20" },
    { href: "/dashboard/contacts", label: "View Messages", icon: MessageSquare, color: "bg-neon-400/10 text-neon-400 border border-neon-400/20" },
    { href: "/dashboard/subscribers", label: "Subscribers", icon: Users, color: "bg-green-400/10 text-green-400 border border-green-400/20" },
    { href: "/dashboard/settings", label: "Settings", icon: Zap, color: "bg-blue-400/10 text-blue-400 border border-blue-400/20" },
];

function timeAgo(iso: string | null) {
    if (!iso) return "—";
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
}

export default function DashboardPage() {
    const [stats, setStats] = useState<DashStats | null>(null);
    const [activity, setActivity] = useState<ActivityItem[]>([]);
    const [pageViews, setPageViews] = useState<PageView[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true);
        else setLoading(true);
        try {
            const res = await fetch("/api/admin/stats");
            const json = await res.json();
            if (!res.ok) throw new Error(json.error);
            setStats(json.stats);
            setActivity(json.recentActivity ?? []);
            setPageViews(json.pageViews ?? []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const statCards = stats ? [
        { label: "Total Page Views", value: stats.totalViews.toLocaleString(), icon: Eye, positive: true, change: "from Firestore" },
        { label: "Subscribers", value: stats.subscriberCount.toLocaleString(), icon: Users, positive: true, change: "registered" },
        { label: "Blog Posts", value: stats.totalPosts.toLocaleString(), icon: FileEdit, positive: true, change: "MDX files" },
        { label: "Messages", value: stats.contactCount.toLocaleString(), icon: MessageSquare, positive: stats.contactCount > 0, change: "contact forms" },
    ] : [];

    const maxViews = pageViews.length > 0 ? Math.max(...pageViews.map((p) => p.views), 1) : 1;

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-mono text-electric-400 uppercase tracking-widest mb-1">// OVERVIEW</p>
                        <h1 className="text-2xl md:text-3xl font-black text-foreground">Command Center</h1>
                        <p className="text-sm text-muted-foreground mt-1">Welcome back, Michael. Here's what's happening.</p>
                    </div>
                    <button
                        onClick={() => fetchData(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-muted-foreground hover:text-foreground hover:border-electric-400/30 transition-all"
                    >
                        <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
                        Refresh
                    </button>
                </div>

                {/* Stats Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 animate-pulse">
                                <div className="h-8 bg-white/[0.05] rounded mb-3 w-1/2" />
                                <div className="h-6 bg-white/[0.05] rounded w-3/4" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        {statCards.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-2 rounded-xl bg-electric-400/10 border border-electric-400/20 text-electric-400">
                                        <stat.icon className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] font-mono px-2 py-1 rounded-full border text-muted-foreground border-white/10 bg-white/[0.03]">
                                        {stat.change}
                                    </span>
                                </div>
                                <p className="text-2xl font-black text-foreground">{stat.value}</p>
                                <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mt-1">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Quick actions */}
                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
                        <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-electric-400" /> Quick Actions
                        </h2>
                        <div className="space-y-3">
                            {quickActions.map((a) => (
                                <Link key={a.href} href={a.href}
                                    className={`flex items-center gap-3 p-3 rounded-xl ${a.color} hover:scale-[1.02] active:scale-[0.99] transition-all`}>
                                    <a.icon className="w-4 h-4 shrink-0" />
                                    <span className="text-sm font-medium">{a.label}</span>
                                    <ArrowUpRight className="w-3 h-3 ml-auto" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Top Pages */}
                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
                        <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-electric-400" /> Top Pages
                        </h2>
                        {pageViews.length === 0 ? (
                            <p className="text-sm text-muted-foreground italic">No view data yet. Views are tracked as users visit pages.</p>
                        ) : (
                            <div className="space-y-3">
                                {pageViews.slice(0, 6).map((page, i) => (
                                    <div key={page.path}>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-foreground font-mono truncate max-w-[120px]">{page.path}</span>
                                            <span className="text-muted-foreground">{page.views.toLocaleString()} views</span>
                                        </div>
                                        <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-electric-400 rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(page.views / maxViews) * 100}%` }}
                                                transition={{ delay: i * 0.07, duration: 0.6 }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Activity Feed */}
                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
                        <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                            <Activity className="w-4 h-4 text-electric-400" /> Recent Activity
                        </h2>
                        {activity.length === 0 ? (
                            <p className="text-sm text-muted-foreground italic">No activity yet. Activity is logged as users interact with the site.</p>
                        ) : (
                            <div className="space-y-3">
                                {activity.map((item) => (
                                    <div key={item.id} className="flex gap-3 items-start">
                                        <div className="w-1.5 h-1.5 rounded-full bg-electric-400 mt-1.5 shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-xs font-bold ${item.color ?? "text-electric-400"}`}>{item.action}</p>
                                            <p className="text-xs text-muted-foreground truncate">{item.detail}</p>
                                            <p className="text-[10px] text-muted-foreground/50 font-mono mt-0.5">{timeAgo(item.timestamp)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
