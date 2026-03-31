import { notFound } from "next/navigation";
import { getPost } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ChevronLeft, FileText, Download, ShieldCheck, Cpu, Zap, Sparkles } from "lucide-react";
import Link from "next/link";
import { Magnetic } from "@/components/ui/Magnetic";
import { Logo } from "@/components/ui/Logo";

// Custom MDX Components for a premium tech feel
const components = {
    h1: (props: any) => <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase text-gradient" {...props} />,
    h3: (props: any) => <h3 className="text-2xl font-bold mb-4 mt-12 text-white border-l-4 border-electric-400 pl-4" {...props} />,
    p: (props: any) => <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-mono" {...props} />,
    blockquote: (props: any) => (
        <blockquote className="border-y border-white/5 py-12 px-8 my-12 italic text-2xl md:text-3xl font-serif text-white/90 text-center relative overflow-hidden" {...props}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-electric-400/30" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px bg-electric-400/30" />
            {props.children}
        </blockquote>
    ),
    ul: (props: any) => <ul className="space-y-4 mb-8 list-none" {...props} />,
    li: (props: any) => (
        <li className="flex items-start gap-3 group">
            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-electric-400 group-hover:shadow-[0_0_8px_#00d4ff] transition-shadow" />
            <span className="text-muted-foreground group-hover:text-white transition-colors font-mono">{props.children}</span>
        </li>
    ),
    ShieldCheck,
    Cpu,
    Zap,
    Sparkles,
};

export default async function IntelDocumentPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const post = getPost(slug, "intel");

    if (!post) {
        notFound();
    }

    // PDF filename mapping based on slug
    const pdfMap: Record<string, string> = {
        manifesto: "manifesto.pdf",
        systems: "systems.pdf",
        "ai-research": "ai-research.pdf",
    };

    return (
        <div className="min-h-screen bg-black pt-32 pb-24 relative overflow-hidden">
            {/* Design Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-electric-400/5 blur-[150px] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />

            <div className="container-custom relative z-10">
                <header className="mb-16">
                    <Magnetic>
                        <Link 
                            href="/intel"
                            className="inline-flex items-center gap-2 text-xs font-mono text-white/40 hover:text-electric-400 transition-colors uppercase tracking-[0.3em] mb-12"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Return to Vault
                        </Link>
                    </Magnetic>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-3 mb-4 text-[10px] font-mono text-electric-400 uppercase tracking-[0.5em] animate-pulse">
                                <div className="w-2 h-2 rounded-full bg-electric-400 shadow-[0_0_10px_#00d4ff]" />
                                Decrypted_Manifesto_Access
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic">
                                {post.title}
                            </h1>
                        </div>

                        <div className="flex gap-4">
                            <a 
                                href={`/docs/${pdfMap[slug]}`} 
                                download
                                className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center gap-3 transition-all"
                            >
                                <Download className="w-4 h-4" />
                                <span className="font-mono text-xs uppercase tracking-widest">Download PDF</span>
                            </a>
                        </div>
                    </div>
                </header>

                <div className="max-w-4xl mx-auto py-16 px-8 md:px-12 glass border border-white/5 rounded-[3rem] relative shadow-2xl">
                    {/* Top Scanners */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-electric-400/20 to-transparent animate-pulse" />
                    
                    <article className="prose prose-invert prose-electric max-w-none">
                        <MDXRemote source={post.content} components={components} />
                    </article>

                    {/* Bottom Telemetry */}
                    <div className="mt-20 pt-8 border-t border-white/5 flex items-center justify-between opacity-30 font-mono text-[9px] uppercase tracking-[0.4em]">
                        <span>Secure Rendering System v4.0</span>
                        <span>Fragment-ID: {Math.random().toString(36).substr(2, 9)}</span>
                    </div>
                </div>

                {/* Footer Logo */}
                <div className="mt-24 flex justify-center grayscale opacity-20">
                    <div className="w-24">
                        <Logo />
                    </div>
                </div>
            </div>
        </div>
    );
}
