import { notFound } from "next/navigation";
import { getPost, getAllPostSlugs } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Calendar, Clock, Share2, Tag as TagIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BlogReactions } from "@/components/blog/BlogReactions";

import rehypePrettyCode from "rehype-pretty-code";

interface BlogPostPageProps {
    params: { slug: string };
}

const mdxOptions = {
    mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [
            [
                rehypePrettyCode,
                {
                    theme: "github-dark",
                    onVisitLine(node: any) {
                        if (node.children.length === 0) {
                            node.children = [{ type: "text", value: " " }];
                        }
                    },
                },
            ],
        ],
    },
};

const components = {
    h1: (props: any) => <h1 className="text-3xl font-black mb-6 mt-12 text-white" {...props} />,
    h2: (props: any) => <h2 className="text-2xl font-black mb-4 mt-10 text-white" {...props} />,
    h3: (props: any) => <h3 className="text-xl font-bold mb-4 mt-8 text-white" {...props} />,
    p: (props: any) => <p className="text-muted-foreground leading-relaxed mb-6" {...props} />,
    ul: (props: any) => <ul className="list-disc list-inside mb-6 space-y-2 text-muted-foreground" {...props} />,
    ol: (props: any) => <ol className="list-decimal list-inside mb-6 space-y-2 text-muted-foreground" {...props} />,
    li: (props: any) => <li className="ml-4" {...props} />,
    blockquote: (props: any) => (
        <blockquote className="border-l-4 border-electric-400 bg-electric-400/5 px-6 py-4 italic rounded-r-xl mb-6" {...props} />
    ),
    pre: (props: any) => (
        <pre className="relative rounded-2xl border border-white/10 bg-black/50 p-6 overflow-x-auto mb-8 font-mono text-sm" {...props} />
    ),
    code: (props: any) => <code className="font-mono text-electric-400 bg-electric-400/5 px-1.5 py-0.5 rounded" {...props} />,
};

export async function generateStaticParams() {
    const slugs = getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const post = getPost(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="pt-32 pb-20 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-electric-400/5 to-transparent blur-[120px] pointer-events-none" />

            <div className="container-custom relative z-10">
                {/* Navigation */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-electric-400 transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to all articles
                </Link>

                {/* Header */}
                <header className="max-w-4xl mb-12">
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground mb-6">
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06]">
                            <Calendar className="w-3 h-3 text-electric-400" />
                            {formatDate(post.date)}
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06]">
                            <Clock className="w-3 h-3 text-electric-400" />
                            {post.readingTime}
                        </div>
                        {post.tags && post.tags.map(tag => (
                            <div key={tag} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-400/10 border border-electric-400/20 text-electric-400">
                                <TagIcon className="w-3 h-3" />
                                {tag}
                            </div>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <p className="text-xl text-muted-foreground leading-relaxed">
                        {post.excerpt}
                    </p>
                </header>

                {/* Featured Image */}
                {post.coverImage && (
                    <div className="relative aspect-video w-full rounded-3xl overflow-hidden mb-12 border border-white/[0.05] glass">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                        <div className="prose prose-invert prose-custom max-w-none">
                            <MDXRemote
                                source={post.content}
                                options={mdxOptions as any}
                                components={components}
                            />
                        </div>

                        {/* Reactions */}
                        <BlogReactions slug={post.slug} />

                        {/* Share / Footer */}
                        <div className="mt-16 pt-8 border-t border-white/[0.05] flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-bold text-foreground">Share:</span>
                                <div className="flex items-center gap-2">
                                    {['Twitter', 'LinkedIn'].map(platform => (
                                        <button key={platform} className="p-2 glass-hover rounded-xl text-muted-foreground hover:text-electric-400 transition-colors">
                                            <Share2 className="w-4 h-4" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <Link href="/blog" className="text-sm text-electric-400 font-bold hover:underline">
                                Read more articles
                            </Link>
                        </div>
                    </div>

                    {/* Sidebar / More Info */}
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="glass p-8 rounded-3xl border border-white/[0.05]">
                            <h3 className="text-lg font-bold text-foreground mb-4">About the author</h3>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-electric-400/30">
                                    <Image src="https://avatars.githubusercontent.com/u/74382608?v=4" alt="Michael Ogutu" fill />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-foreground">Michael Ogutu</p>
                                    <p className="text-xs text-muted-foreground">Founder, MIKESTH3TIC.DEV</p>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed italic mb-6">
                                &quot;I write about things I learn while building modern digital experiences.&quot;
                            </p>
                            <Link href="/about" className="text-sm text-electric-400 font-bold hover:underline">
                                The full story →
                            </Link>
                        </div>

                        <div className="glass p-8 rounded-3xl border border-white/[0.05] bg-gradient-to-br from-electric-400/5 to-neon-400/5">
                            <h3 className="text-lg font-bold text-foreground mb-4">Newsletter</h3>
                            <p className="text-sm text-muted-foreground mb-6">Liked this post? Get the next one in your inbox.</p>
                            <form className="space-y-3">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full bg-black/20 border border-white/[0.1] rounded-xl px-4 py-2 text-sm outline-none focus:border-electric-400/50"
                                />
                                <button className="w-full py-2 bg-electric-400 text-dark-900 font-bold text-sm rounded-xl hover:bg-electric-300 transition-colors">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </aside>
                </div>
            </div>
        </article>
    );
}
