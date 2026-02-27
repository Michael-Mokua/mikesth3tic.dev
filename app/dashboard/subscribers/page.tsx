"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Search, RefreshCw, Trash2, Mail } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

type Subscriber = { id: string; email: string; subscribedAt: string | null };

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

export default function SubscribersPage() {
    const [subs, setSubs] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [deleting, setDeleting] = useState<string | null>(null);

    const fetchSubs = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/subscribers");
            const data = await res.json();
            setSubs(data.subscribers ?? []);
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchSubs(); }, []);

    const handleDelete = async (id: string) => {
        setDeleting(id);
        try {
            await fetch("/api/admin/subscribers", { method: "DELETE", body: JSON.stringify({ id }), headers: { "Content-Type": "application/json" } });
            setSubs((prev) => prev.filter((s) => s.id !== id));
        } catch (e) { console.error(e); }
        finally { setDeleting(null); }
    };

    const filtered = subs.filter((s) => s.email.toLowerCase().includes(search.toLowerCase()));

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-mono text-electric-400 uppercase tracking-widest mb-1">// AUDIENCE</p>
                        <h1 className="text-2xl font-black text-foreground">Newsletter Subscribers</h1>
                        <p className="text-sm text-muted-foreground mt-1">{subs.length} subscriber{subs.length !== 1 ? "s" : ""} in Firestore</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {subs.length > 0 && (
                            <a
                                href={`mailto:?bcc=${subs.map((s) => s.email).join(",")}&subject=MIKESTH3TIC.DEV Newsletter`}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-electric-400/10 border border-electric-400/20 text-electric-400 text-sm hover:bg-electric-400/20 transition-all"
                            >
                                <Mail className="w-4 h-4" /> Email All
                            </a>
                        )}
                        <button
                            onClick={fetchSubs}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-muted-foreground hover:text-foreground hover:border-electric-400/30 transition-all"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Stats bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { label: "Total Subs", value: subs.length },
                        { label: "This Week", value: subs.filter((s) => s.subscribedAt && Date.now() - new Date(s.subscribedAt).getTime() < 7 * 86400000).length },
                        { label: "This Month", value: subs.filter((s) => s.subscribedAt && Date.now() - new Date(s.subscribedAt).getTime() < 30 * 86400000).length },
                        { label: "Latest", value: subs.length > 0 ? timeAgo(subs[0]?.subscribedAt) : "—" },
                    ].map((s) => (
                        <div key={s.label} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                            <p className="text-xl font-black text-foreground">{s.value}</p>
                            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mt-1">{s.label}</p>
                        </div>
                    ))}
                </div>

                <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search emails..."
                        className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-electric-400/30 transition-all"
                    />
                </div>

                {/* Table */}
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-white/[0.06] grid grid-cols-12 gap-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                        <div className="col-span-7">Email</div>
                        <div className="col-span-4">Subscribed</div>
                        <div className="col-span-1 text-right">Del</div>
                    </div>

                    {loading ? (
                        <div className="p-8 flex items-center justify-center gap-2 text-muted-foreground">
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span className="text-sm">Loading subscribers...</span>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="py-16 text-center">
                            <Users className="w-8 h-8 text-muted-foreground mx-auto mb-3 opacity-30" />
                            <p className="text-sm text-muted-foreground">No subscribers yet.</p>
                            <p className="text-xs text-muted-foreground/60 mt-1">They appear here when visitors sign up via the newsletter form.</p>
                        </div>
                    ) : (
                        filtered.map((sub, i) => (
                            <motion.div
                                key={sub.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.03 }}
                                className="p-4 border-b border-white/[0.04] last:border-0 grid grid-cols-12 gap-4 items-center hover:bg-white/[0.02] transition-colors"
                            >
                                <div className="col-span-7 flex items-center gap-3">
                                    <div className="w-7 h-7 rounded-full bg-electric-400/10 border border-electric-400/20 flex items-center justify-center text-electric-400 text-xs font-black shrink-0">
                                        {sub.email.charAt(0).toUpperCase()}
                                    </div>
                                    <p className="text-sm font-mono text-foreground truncate">{sub.email}</p>
                                </div>
                                <div className="col-span-4">
                                    <p className="text-xs text-muted-foreground">{timeAgo(sub.subscribedAt)}</p>
                                    {sub.subscribedAt && (
                                        <p className="text-[9px] text-muted-foreground/50 font-mono">{new Date(sub.subscribedAt).toLocaleDateString()}</p>
                                    )}
                                </div>
                                <div className="col-span-1 flex justify-end">
                                    <button
                                        onClick={() => handleDelete(sub.id)}
                                        disabled={deleting === sub.id}
                                        className="p-1.5 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-all disabled:opacity-50"
                                    >
                                        {deleting === sub.id ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
