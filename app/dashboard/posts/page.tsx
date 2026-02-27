"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, Calendar, Tag, RefreshCw, ExternalLink, FileText } from "lucide-react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

type Post = {
    slug: string;
    title: string;
    date: string;
    tags?: string[];
    published?: boolean;
    readingTime: string;
    views: number;
    type: "blog" | "case-study";
};

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<"all" | "blog" | "case-study">("all");

    useEffect(() => {
        fetch("/api/admin/posts")
            .then((r) => r.json())
            .then((d) => setPosts(d.posts ?? []))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const filtered = posts.filter((p) => {
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === "all" || p.type === filter;
        return matchSearch && matchFilter;
    });

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-mono text-electric-400 uppercase tracking-widest mb-1">// CONTENT</p>
                        <h1 className="text-2xl font-black text-foreground">Blog Posts</h1>
                        <p className="text-sm text-muted-foreground mt-1">{posts.length} posts loaded from MDX files + Firestore view counts</p>
                    </div>
                    <Link
                        href="/blog"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-foreground hover:border-electric-400/30 transition-all"
                    >
                        <ExternalLink className="w-4 h-4" /> View Blog
                    </Link>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search posts..."
                            className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-electric-400/30 transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        {(["all", "blog", "case-study"] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-xl text-xs font-mono capitalize transition-all ${filter === f ? "bg-electric-400/20 text-electric-400 border border-electric-400/30" : "bg-white/[0.04] border border-white/[0.06] text-muted-foreground hover:border-white/20"}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-white/[0.06] grid grid-cols-12 gap-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                        <div className="col-span-5">Title</div>
                        <div className="col-span-2 hidden sm:block">Type</div>
                        <div className="col-span-2 hidden md:block">Views</div>
                        <div className="col-span-2 hidden lg:block">Reading Time</div>
                        <div className="col-span-1 text-right">Link</div>
                    </div>

                    {loading ? (
                        <div className="p-8 flex items-center justify-center gap-2 text-muted-foreground">
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span className="text-sm">Loading posts...</span>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="py-20 text-center">
                            <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-3 opacity-50" />
                            <p className="text-muted-foreground text-sm">No posts found.</p>
                        </div>
                    ) : (
                        filtered.map((post, i) => (
                            <motion.div
                                key={post.slug}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.04 }}
                                className="p-4 border-b border-white/[0.04] last:border-0 grid grid-cols-12 gap-4 items-center hover:bg-white/[0.02] transition-colors"
                            >
                                <div className="col-span-5">
                                    <p className="text-sm font-medium text-foreground line-clamp-1">{post.title}</p>
                                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                                        {(post.tags ?? []).slice(0, 2).map((tag) => (
                                            <span key={tag} className="text-[9px] text-muted-foreground font-mono flex items-center gap-0.5">
                                                <Tag className="w-2.5 h-2.5" />#{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-span-2 hidden sm:block">
                                    <span className={`text-[10px] px-2 py-1 rounded-full font-mono border ${post.type === "blog" ? "text-electric-400 bg-electric-400/10 border-electric-400/20" : "text-neon-400 bg-neon-400/10 border-neon-400/20"}`}>
                                        {post.type}
                                    </span>
                                </div>
                                <div className="col-span-2 hidden md:block">
                                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                                        <Eye className="w-3 h-3" />
                                        {post.views.toLocaleString()}
                                    </p>
                                </div>
                                <div className="col-span-2 hidden lg:block">
                                    <p className="text-xs text-muted-foreground">{post.readingTime}</p>
                                </div>
                                <div className="col-span-1 flex items-center justify-end">
                                    <Link
                                        href={post.type === "blog" ? `/blog/${post.slug}` : `/projects/${post.slug}`}
                                        target="_blank"
                                        className="p-1.5 rounded-lg hover:bg-white/[0.05] text-muted-foreground hover:text-electric-400 transition-colors"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
