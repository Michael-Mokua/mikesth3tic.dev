import { notFound } from "next/navigation";
import { getPost, getAllPostSlugs } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, Github, Calendar, Briefcase, ChevronRight } from "lucide-react";
import Link from "next/link";
import rehypePrettyCode from "rehype-pretty-code";

interface CaseStudyPageProps {
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
    h1: (props: any) => <h1 className="text-3xl font-black mb-6 mt-12 text-foreground tracking-tight" {...props} />,
    h2: (props: any) => <h2 className="text-2xl font-bold mb-4 mt-10 text-electric-400" {...props} />,
    h3: (props: any) => <h3 className="text-xl font-bold mb-4 mt-8 text-foreground" {...props} />,
    p: (props: any) => <p className="text-muted-foreground leading-relaxed mb-6 text-lg" {...props} />,
    ul: (props: any) => <ul className="list-disc list-inside mb-6 space-y-2 text-muted-foreground" {...props} />,
    ol: (props: any) => <ol className="list-decimal list-inside mb-6 space-y-2 text-muted-foreground" {...props} />,
    li: (props: any) => <li className="ml-4" {...props} />,
    blockquote: (props: any) => (
        <blockquote className="border-l-4 border-electric-400 bg-electric-400/5 px-6 py-4 italic rounded-r-xl mb-6 relative overflow-hidden" {...props}>
            <div className="absolute inset-0 bg-gradient-to-r from-electric-400/10 to-transparent pointer-events-none -z-10" />
            {props.children}
        </blockquote>
    ),
    pre: (props: any) => (
        <pre className="relative rounded-2xl border border-white/10 bg-black/50 p-6 overflow-x-auto mb-8 font-mono text-sm shadow-[0_4px_30px_rgba(0,0,0,0.5)]" {...props} />
    ),
    code: (props: any) => <code className="font-mono text-electric-400 bg-electric-400/5 px-1.5 py-0.5 rounded" {...props} />,
};

export async function generateStaticParams() {
    const slugs = getAllPostSlugs("case-studies");
    return slugs.map((slug) => ({ slug }));
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
    const post = getPost(params.slug, "case-studies");

    if (!post) {
        notFound();
    }

    return (
        <article className="pt-32 pb-20 overflow-hidden relative">
            {/* Architectural Background */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-electric-400/10 blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none -z-10" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5 pointer-events-none -z-20" />

            <div className="container-custom max-w-4xl relative z-10">

                {/* Elite Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm font-mono text-muted-foreground mb-12">
                    <Link href="/projects" className="hover:text-electric-400 transition-colors flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        SYSTEMS
                    </Link>
                    <ChevronRight className="w-3 h-3 text-white/20" />
                    <span className="text-electric-400 uppercase tracking-widest">{post.slug}</span>
                </nav>

                {/* Hero Header */}
                <header className="mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-electric-400/10 border border-electric-400/30 text-electric-400 text-xs font-mono font-bold uppercase tracking-wider mb-6">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>Case Study</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-tight">
                        {post.title}
                    </h1>

                    <p className="text-xl text-muted-foreground leading-relaxed font-light mb-8 max-w-3xl">
                        {post.description}
                    </p>

                    {/* Metadata Bar */}
                    <div className="flex flex-wrap items-center gap-4 py-6 border-y border-white/[0.06] text-sm text-foreground/80">
                        <div className="flex items-center gap-2 bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/[0.05]">
                            <Calendar className="w-4 h-4 text-electric-400" />
                            <span className="font-mono">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>

                        {post.technologies && post.technologies.length > 0 && (
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-muted-foreground font-mono mr-2">// TECH STACK:</span>
                                {post.technologies.map(tech => (
                                    <span key={tech} className="px-3 py-1 bg-electric-400/5 text-electric-400 border border-electric-400/20 rounded-full text-xs font-bold tracking-wide">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}

                        {post.github && (
                            <a
                                href={post.github}
                                target="_blank"
                                rel="noreferrer"
                                className="ml-auto inline-flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-white/90 rounded-lg font-bold transition-all text-xs uppercase tracking-widest"
                            >
                                <Github className="w-4 h-4" />
                                View Repository
                            </a>
                        )}
                    </div>
                </header>

                {/* Main MDX Content */}
                <div className="prose prose-invert prose-electric max-w-none">
                    <MDXRemote source={post.content} options={mdxOptions as any} components={components} />
                </div>

                {/* Bottom CTA Overlay */}
                <div className="mt-24 p-8 md:p-12 rounded-3xl glass border border-electric-400/30 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t from-electric-400/20 to-transparent -z-10 group-hover:from-electric-400/30 transition-colors duration-500" />

                    <h2 className="text-3xl font-bold mb-4">Need an architect for your system?</h2>
                    <p className="text-muted-foreground mb-8 text-lg max-w-xl mx-auto">
                        Stop throwing money at patching bad code. Let's design and build an infrastructure that scales from day one.
                    </p>

                    <Link
                        href="/start-project"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-electric-400 text-dark-950 font-black text-lg hover:bg-electric-300 transition-all shadow-[0_0_30px_-5px_var(--electric-400)]"
                    >
                        Start a Project Briefing
                    </Link>
                </div>

            </div>
        </article>
    );
}
