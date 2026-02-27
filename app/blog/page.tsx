import { motion } from "framer-motion";
import {
    Filter,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/mdx";
import { BlogList } from "@/components/blog/BlogList";

export default async function BlogPage() {
    const posts = getAllPosts();
    const tags = getAllTags();

    return (
        <div className="pt-32 pb-20">
            <div className="container-custom">
                <div className="mb-12">
                    <p className="text-sm font-mono text-electric-400 mb-3">// KNOWLEDGE BASE</p>
                    <h1 className="text-4xl md:text-6xl font-black mb-6">
                        Michael&apos;s <span className="text-gradient">Blog</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl leading-relaxed">
                        Thoughts, tutorials, and insights on full-stack development, software architecture,
                        and the journey of a tech founder. Built with MDX for maximum speed.
                    </p>
                </div>

                <BlogList initialPosts={posts} tags={tags} />

                {/* Explore more */}
                <div className="mt-20 p-8 glass rounded-3xl border border-white/[0.05] text-center max-w-3xl mx-auto">
                    <h3 className="text-xl font-bold text-foreground mb-4">Want to read about something specific?</h3>
                    <p className="text-sm text-muted-foreground mb-6">If you have a topic you&apos;d like me to cover, or if you want to collaborate on a guest post, feel free to reach out.</p>
                    <Link href="/contact" className="inline-flex items-center gap-2 text-electric-400 font-bold hover:gap-3 transition-all duration-300 group">
                        Contact Michael <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
