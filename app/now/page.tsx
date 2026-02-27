
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { motion } from "framer-motion";
import { Zap, Calendar, ExternalLink, RefreshCcw } from "lucide-react";

export default function NowPage() {
    const filePath = path.join(process.cwd(), "content", "now.md");
    let content = "";
    let lastUpdated = "";

    if (fs.existsSync(filePath)) {
        const file = fs.readFileSync(filePath, "utf8");
        const { content: mdContent, data } = matter(file);
        content = mdContent;
        lastUpdated = data.date || "Recently";
    }

    return (
        <div className="pt-32 pb-20">
            <div className="container-custom max-w-4xl">
                <div
                    className="mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-400/10 border border-electric-400/20 text-electric-400 text-xs font-mono mb-4">
                        <Zap className="w-3 h-3 fill-current" />
                        LIVE STATUS
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 italic">
                        What I&apos;m doing <span className="text-gradient">Now</span>
                    </h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        This is a &ldquo;now&rdquo; page. It&apos;s a focused snapshot of my life and work at this exact moment.
                        No long-term history, just the current priorities.
                    </p>
                </div>

                <div className="glass rounded-3xl p-8 md:p-12 border border-white/[0.05] relative overflow-hidden mb-12">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <RefreshCcw className="w-40 h-40 text-electric-400 rotate-12" />
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-8">
                        <Calendar className="w-3.5 h-3.5" />
                        LAST UPDATED: {lastUpdated}
                    </div>

                    <div className="prose prose-invert prose-custom max-w-none">
                        {/* Simplified markdown rendering for this single page */}
                        <p className="text-xl text-foreground font-bold mb-6">Building & Thinking:</p>
                        <div className="space-y-6">
                            {content.split('\n\n').map((para, i) => (
                                <p key={i} className="leading-relaxed text-muted-foreground text-lg">{para}</p>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-8 glass rounded-3xl border border-white/[0.05] text-center">
                    <p className="text-sm text-muted-foreground">
                        Inspiration as the key to my innovation
                    </p>
                </div>
            </div>
        </div>
    );
}
