import { motion } from "framer-motion";
import {
    Filter,
    ArrowRight,
    Sparkles,
    BrainCircuit
} from "lucide-react";
import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/mdx";
import { BlogList } from "@/components/blog/BlogList";

export default async function BlogPage() {
    const posts = getAllPosts();
    const tags = getAllTags();

    return (
        <div className="pt-40 pb-20">
            <div className="container-custom">
                <div className="mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-400/10 border border-electric-400/20 text-electric-400 text-xs font-mono mb-6">
                        <BrainCircuit className="w-3.5 h-3.5" />
                        <span>// KNOWLEDGE_COLLECTIVE</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
                        Architectural <span className="text-gradient">Insights.</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                        Deep dives into the mechanics of modern software, AI-driven workflows, and the future of digital products.
                    </p>
                </div>

                {/* AI Suggest Section */}
                <div className="mb-16 p-8 liquid-glass rounded-[2rem] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 group">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-electric-400/10 flex items-center justify-center border border-electric-400/20 group-hover:scale-110 transition-transform duration-500">
                            <Sparkles className="w-7 h-7 text-electric-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-foreground">Can't find a topic?</h3>
                            <p className="text-sm text-muted-foreground">Ask MikeAI to suggest the most relevant post for your project.</p>
                        </div>
                    </div>
                    <button className="px-8 py-3 rounded-xl bg-electric-400 text-black font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all">
                        AI SUGGEST
                    </button>
                </div>

                <BlogList initialPosts={posts} tags={tags} />

                {/* Bottom CTA */}
                <div className="mt-32 p-10 md:p-20 glass rounded-[3rem] border border-white/5 text-center relative overflow-hidden group">
                     {/* Decorative background glow */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-electric-400/10 rounded-full blur-[120px] pointer-events-none -z-10" />
                    
                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6 tracking-tighter">Collaborate on the <br /> <span className="text-gradient">Future.</span></h2>
                    <p className="text-muted-foreground text-base max-w-xl mx-auto mb-10 leading-relaxed">
                        If you have a topic you&apos;d like me to cover, or if you want to collaborate on a deep-dive architecture review, let&apos;s talk.
                    </p>
                    <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white text-black font-bold text-sm uppercase tracking-widest hover:bg-electric-400 transition-all shadow-xl shadow-white/5">
                        Start a Conversation <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
