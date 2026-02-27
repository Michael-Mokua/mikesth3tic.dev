"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Search,
    Calendar,
    Clock,
    ChevronRight,
    Tag
} from "lucide-react";
import { useState, useMemo } from "react";
import { PostMeta } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

interface BlogListProps {
    initialPosts: PostMeta[];
    tags: string[];
}

export function BlogList({ initialPosts, tags }: BlogListProps) {
    const [search, setSearch] = useState("");
    const [activeTag, setActiveTag] = useState("All");

    const filteredPosts = useMemo(() => {
        return initialPosts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
                (post.excerpt?.toLowerCase() || "").includes(search.toLowerCase());
            const matchesTag = activeTag === "All" || (post.tags || []).includes(activeTag);
            return matchesSearch && matchesTag;
        });
    }, [initialPosts, search, activeTag]);

    return (
        <>
            {/* Search & Tags */}
            <div className="flex flex-col md:flex-row gap-6 mb-16">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-electric-400 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl pl-11 pr-4 py-3 text-sm focus:border-electric-400/30 transition-all outline-none"
                    />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                    <Tag className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    {["All", ...tags].map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setActiveTag(tag)}
                            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex-shrink-0 ${activeTag === tag
                                ? "bg-electric-400/20 text-electric-400 border border-electric-400/30"
                                : "bg-white/[0.04] border border-white/[0.06] text-muted-foreground hover:border-white/20"
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredPosts.map((post, i) => (
                    <motion.div
                        key={post.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="group"
                    >
                        <Link href={`/blog/${post.slug}`} className="block glass-hover rounded-3xl p-8 card-hover h-full border border-white/[0.05]">
                            <div className="flex flex-col h-full">
                                <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground mb-4">
                                    {post.date && post.date !== "2024-01-01" && (
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {formatDate(post.date)}
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5" />
                                        {post.readingTime}
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-electric-400 transition-colors leading-snug">
                                    {post.title}
                                </h2>

                                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6 line-clamp-2">
                                    {post.excerpt || post.description || ""}
                                </p>

                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/[0.04]">
                                    <div className="flex flex-wrap gap-2">
                                        {(post.tags || []).slice(0, 3).map(tag => (
                                            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-muted-foreground font-mono">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-electric-400/10 flex items-center justify-center text-electric-400 group-hover:bg-electric-400 group-hover:text-dark-900 transition-all duration-300">
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {filteredPosts.length === 0 && (
                <div className="text-center py-40 glass rounded-3xl border border-dashed border-white/10">
                    <p className="text-muted-foreground italic">No articles found matching your criteria.</p>
                </div>
            )}
        </>
    );
}
