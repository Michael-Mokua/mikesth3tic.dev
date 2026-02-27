"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Search, RefreshCw, Mail, Trash2, Check, Eye } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

type Contact = {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string | null;
    read: boolean;
};

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

export default function ContactsPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<Contact | null>(null);
    const [deleting, setDeleting] = useState<string | null>(null);

    const fetchContacts = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/contacts");
            const data = await res.json();
            setContacts(data.submissions ?? []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchContacts(); }, []);

    const handleDelete = async (id: string) => {
        setDeleting(id);
        try {
            await fetch("/api/admin/contacts", { method: "DELETE", body: JSON.stringify({ id }), headers: { "Content-Type": "application/json" } });
            setContacts((prev) => prev.filter((c) => c.id !== id));
            if (selected?.id === id) setSelected(null);
        } catch (e) {
            console.error(e);
        } finally {
            setDeleting(null);
        }
    };

    const filtered = contacts.filter((c) =>
        c.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.email?.toLowerCase().includes(search.toLowerCase()) ||
        c.subject?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-mono text-electric-400 uppercase tracking-widest mb-1">// INBOX</p>
                        <h1 className="text-2xl font-black text-foreground">Contact Messages</h1>
                        <p className="text-sm text-muted-foreground mt-1">{contacts.length} submission{contacts.length !== 1 ? "s" : ""} received</p>
                    </div>
                    <button
                        onClick={fetchContacts}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-muted-foreground hover:text-foreground hover:border-electric-400/30 transition-all"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                        Refresh
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[600px]">
                    {/* List */}
                    <div className="lg:col-span-2 bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col">
                        <div className="p-3 border-b border-white/[0.06]">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search messages..."
                                    className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-electric-400/30 transition-all"
                                />
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {loading ? (
                                <div className="flex items-center justify-center h-full gap-2 text-muted-foreground">
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                    <span className="text-sm">Loading...</span>
                                </div>
                            ) : filtered.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2">
                                    <MessageSquare className="w-8 h-8 opacity-30" />
                                    <p className="text-sm">No messages yet</p>
                                    <p className="text-xs opacity-60">Messages appear here when visitors use the contact form</p>
                                </div>
                            ) : (
                                filtered.map((c) => (
                                    <button
                                        key={c.id}
                                        onClick={() => setSelected(c)}
                                        className={`w-full text-left p-4 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.04] transition-colors ${selected?.id === c.id ? "bg-electric-400/5 border-l-2 border-l-electric-400" : ""}`}
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
                                            <span className="text-[9px] text-muted-foreground font-mono">{timeAgo(c.createdAt)}</span>
                                        </div>
                                        <p className="text-xs text-electric-400 truncate">{c.subject}</p>
                                        <p className="text-xs text-muted-foreground truncate mt-0.5">{c.email}</p>
                                    </button>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Detail view */}
                    <div className="lg:col-span-3 bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden flex flex-col">
                        {selected ? (
                            <>
                                <div className="p-5 border-b border-white/[0.06]">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h2 className="text-base font-bold text-foreground">{selected.subject}</h2>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                From <span className="text-electric-400">{selected.name}</span> — <span>{selected.email}</span>
                                            </p>
                                            <p className="text-xs text-muted-foreground/50 font-mono mt-1">{selected.createdAt ? new Date(selected.createdAt).toLocaleString() : "—"}</p>
                                        </div>
                                        <div className="flex gap-2 shrink-0">
                                            <a
                                                href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                                                className="p-2 rounded-xl bg-electric-400/10 border border-electric-400/20 text-electric-400 hover:bg-electric-400/20 transition-all"
                                                title="Reply via email"
                                            >
                                                <Mail className="w-4 h-4" />
                                            </a>
                                            <button
                                                onClick={() => handleDelete(selected.id)}
                                                disabled={deleting === selected.id}
                                                className="p-2 rounded-xl bg-red-400/10 border border-red-400/20 text-red-400 hover:bg-red-400/20 transition-all disabled:opacity-50"
                                            >
                                                {deleting === selected.id ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto p-5">
                                    <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-3">
                                <Eye className="w-10 h-10 opacity-20" />
                                <p className="text-sm">Select a message to read it</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
