"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { PostMeta } from "@/lib/mdx";

interface FeaturedBlogProps {
    posts: PostMeta[];
}

export function FeaturedBlog({ posts }: FeaturedBlogProps) {
    return (
        <section className="section-padding" aria-label="Featured blog posts">
            <div className="container-custom">
                <motion.div
                    className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div>
                        <p className="text-sm font-mono text-electric-400 mb-2">// LATEST THOUGHTS</p>
                        <h2 className="text-4xl md:text-5xl font-black">
                            From the <span className="text-gradient">Blog</span>
                        </h2>
                    </div>
                    <Link
                        href="/blog"
                        className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-electric-400 transition-colors flex-shrink-0"
                    >
                        All posts
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                {posts.length === 0 ? (
                    <div className="text-center py-16 text-muted-foreground">
                        <p className="text-lg">No posts yet — check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {posts.map((post, i) => (
                            <motion.div
                                key={post.slug}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="block glass-hover rounded-[2rem] p-8 card-hover group h-full border border-white/[0.05]"
                                    aria-label={`Read: ${post.title}`}
                                >
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mb-3">
                                        <Clock className="w-3 h-3" />
                                        {post.readingTime}
                                    </div>
                                    <h3 className="font-bold text-foreground text-lg leading-snug mb-2 group-hover:text-electric-400 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-wrap gap-1.5">
                                            {(post.tags || []).slice(0, 2).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-xs px-2 py-0.5 rounded-full bg-electric-400/10 text-electric-400 border border-electric-400/20 font-mono"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <span className="text-xs text-muted-foreground">{formatDate(post.date)}</span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
