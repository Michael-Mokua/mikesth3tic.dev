"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Eye, Calendar, Tag, RefreshCw, ExternalLink, FileText, Trash2 } from "lucide-react";
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
    const [isCreating, setIsCreating] = useState(false);
    const [newPost, setNewPost] = useState({ title: "", slug: "", excerpt: "", content: "", tags: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const refreshPosts = () => {
        setLoading(true);
        fetch("/api/admin/posts")
            .then((r) => r.json())
            .then((d) => setPosts(d.posts ?? []))
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        refreshPosts();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/admin/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...newPost,
                    tags: newPost.tags.split(",").map(t => t.trim()).filter(Boolean)
                })
            });
            if (res.ok) {
                setIsCreating(false);
                setNewPost({ title: "", slug: "", excerpt: "", content: "", tags: "" });
                refreshPosts();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (slug: string) => {
        if (!confirm("Are you sure? This only deletes posts stored in the database.")) return;
        try {
            const res = await fetch(`/api/admin/posts?slug=${slug}`, { method: "DELETE" });
            if (res.ok) refreshPosts();
        } catch (error) {
            console.error(error);
        }
    };

    const filtered = posts.filter((p) => {
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === "all" || p.type === filter;
        return matchSearch && matchFilter;
    });

    return (
        <DashboardLayout>
            <div className="space-y-6 text-foreground">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-mono text-electric-400 uppercase tracking-widest mb-1">// CONTENT</p>
                        <h1 className="text-2xl font-black">Blog Posts</h1>
                        <p className="text-sm text-muted-foreground mt-1">{posts.length} posts loaded (MDX + Firestore)</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsCreating(true)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-electric-400 text-dark-950 text-sm font-bold hover:bg-electric-300 transition-all"
                        >
                            <Tag className="w-4 h-4" /> Create New Post
                        </button>
                        <Link
                            href="/blog"
                            target="_blank"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-foreground hover:border-electric-400/30 transition-all"
                        >
                            <ExternalLink className="w-4 h-4" /> View Blog
                        </Link>
                    </div>
                </div>

                {/* Create Modal */}
                <AnimatePresence>
                    {isCreating && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsCreating(false)}
                                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative w-full max-w-2xl bg-dark-900 border border-white/[0.1] rounded-[2rem] p-8 overflow-hidden shadow-2xl"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-electric-400/5 blur-[80px] rounded-full -mr-32 -mt-32" />

                                <h2 className="text-2xl font-black mb-6 flex items-center gap-2 relative z-10">
                                    <FileText className="w-6 h-6 text-electric-400" />
                                    New Blog Post
                                </h2>

                                <form onSubmit={handleCreate} className="space-y-4 relative z-10">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground ml-1">Title</label>
                                            <input
                                                required
                                                value={newPost.title}
                                                onChange={e => setNewPost({ ...newPost, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') })}
                                                placeholder="Understanding Neural Networks"
                                                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-electric-400/50"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground ml-1">Slug</label>
                                            <input
                                                required
                                                value={newPost.slug}
                                                onChange={e => setNewPost({ ...newPost, slug: e.target.value })}
                                                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-electric-400/50 font-mono"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground ml-1">Excerpt</label>
                                        <input
                                            required
                                            value={newPost.excerpt}
                                            onChange={e => setNewPost({ ...newPost, excerpt: e.target.value })}
                                            placeholder="A brief overview of the post..."
                                            className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-electric-400/50"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground ml-1">Content (Markdown)</label>
                                        <textarea
                                            required
                                            rows={8}
                                            value={newPost.content}
                                            onChange={e => setNewPost({ ...newPost, content: e.target.value })}
                                            placeholder="# Hello World\n\nYour amazing content here..."
                                            className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-electric-400/50 resize-none font-mono"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground ml-1">Tags (Comma separated)</label>
                                        <input
                                            value={newPost.tags}
                                            onChange={e => setNewPost({ ...newPost, tags: e.target.value })}
                                            placeholder="AI, Tech, Architecture"
                                            className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-electric-400/50"
                                        />
                                    </div>

                                    <div className="flex justify-end gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setIsCreating(false)}
                                            className="px-6 py-2.5 rounded-xl text-sm font-bold text-muted-foreground hover:text-foreground transition-all"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-8 py-2.5 rounded-xl bg-electric-400 text-dark-950 text-sm font-bold hover:bg-electric-300 transition-all disabled:opacity-50"
                                        >
                                            {isSubmitting ? "Publishing..." : "Publish Post"}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

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
                        <div className="col-span-1 text-right">Actions</div>
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
                                <div className="col-span-1 flex items-center justify-end gap-2">
                                    <Link
                                        href={post.type === "blog" ? `/blog/${post.slug}` : `/projects/${post.slug}`}
                                        target="_blank"
                                        className="p-1.5 rounded-lg hover:bg-white/[0.05] text-muted-foreground hover:text-electric-400 transition-colors"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(post.slug)}
                                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
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
