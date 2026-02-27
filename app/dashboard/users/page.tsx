"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Search, MoreHorizontal, Shield, User, Eye } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

const mockUsers = [
    { id: "1", name: "Michael Mokua", email: "mikestheticdev@gmail.com", role: "admin", status: "active", joined: "2024-01-01" },
    { id: "2", name: "Newsletter Sub", email: "subscriber@example.com", role: "viewer", status: "active", joined: "2026-01-15" },
];

const roleColors: Record<string, string> = {
    admin: "text-electric-400 bg-electric-400/10 border-electric-400/20",
    editor: "text-neon-400 bg-neon-400/10 border-neon-400/20",
    viewer: "text-green-400 bg-green-400/10 border-green-400/20",
};

export default function UsersPage() {
    const [search, setSearch] = useState("");

    const filtered = mockUsers.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-mono text-electric-400 uppercase tracking-widest mb-1">// TEAM</p>
                        <h1 className="text-2xl font-black text-foreground">User Management</h1>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                            <Users className="w-4 h-4 text-electric-400" />
                            <span className="text-sm font-mono text-foreground">{filtered.length} Users</span>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search users..."
                        className="w-full max-w-sm bg-white/[0.04] border border-white/[0.06] rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-electric-400/30 transition-all"
                    />
                </div>

                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-white/[0.06] grid grid-cols-12 gap-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                        <div className="col-span-4">User</div>
                        <div className="col-span-3 hidden sm:block">Role</div>
                        <div className="col-span-3 hidden md:block">Status</div>
                        <div className="col-span-2 hidden lg:block">Joined</div>
                    </div>

                    {filtered.map((user, i) => (
                        <motion.div
                            key={user.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="p-4 border-b border-white/[0.04] last:border-0 grid grid-cols-12 gap-4 items-center hover:bg-white/[0.02] transition-colors"
                        >
                            <div className="col-span-4 flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-electric-400/10 border border-electric-400/20 flex items-center justify-center text-electric-400 font-black text-sm shrink-0">
                                    {user.name.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                </div>
                            </div>
                            <div className="col-span-3 hidden sm:block">
                                <span className={`text-[10px] px-2 py-1 rounded-full font-mono border flex items-center gap-1 w-fit ${roleColors[user.role]}`}>
                                    {user.role === "admin" ? <Shield className="w-2.5 h-2.5" /> : <User className="w-2.5 h-2.5" />}
                                    {user.role}
                                </span>
                            </div>
                            <div className="col-span-3 hidden md:block">
                                <span className="text-[10px] px-2 py-1 rounded-full font-mono border text-green-400 bg-green-400/10 border-green-400/20">
                                    {user.status}
                                </span>
                            </div>
                            <div className="col-span-2 hidden lg:block">
                                <p className="text-xs text-muted-foreground">{user.joined}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
