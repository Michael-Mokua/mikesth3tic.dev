"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, Sparkles } from "lucide-react";
import { toast } from "@/components/ui/Toaster";
import dynamic from "next/dynamic";

const Magnetic = dynamic(() => import("@/components/ui/Magnetic"), { ssr: false });

export function NewsletterSection() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || loading) return;

        setLoading(true);
        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                toast("Successfully subscribed to the newsletter! 🚀", "success");
                setEmail("");
            } else {
                toast(data.message || "Something went wrong. Please try again.", "error");
            }
        } catch (error) {
            toast("Failed to connect. Please check your internet.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="section-padding relative" aria-label="Newsletter signup">
            <div className="container-custom">
                <motion.div
                    className="relative glass rounded-[3rem] p-10 md:p-20 overflow-hidden border border-white/[0.05] bg-white/[0.01]"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    {/* Decorative glows */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-electric-400/10 blur-[100px] pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-neon-400/10 blur-[100px] pointer-events-none" />

                    <div className="relative z-10 max-w-2xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-400/10 border border-electric-400/20 text-electric-400 text-xs font-mono mb-6">
                            <Sparkles className="w-3 h-3" />
                            STAY SYNCED
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
                            Join the <span className="text-gradient">Inner Circle</span>
                        </h2>
                        <p className="text-muted-foreground text-base leading-relaxed mb-12">
                            Get occasional updates on what I'm building, new blog posts, and interesting finds in tech.
                            No spam, just value.
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="flex-1 bg-white/[0.05] border border-white/[0.1] rounded-2xl px-6 py-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-electric-400/50 transition-colors"
                                aria-label="Email for newsletter"
                            />
                            <Magnetic>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-black font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                >
                                    {loading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <>
                                            Subscribe
                                            <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </Magnetic>
                        </form>
                        <p className="text-[10px] text-muted-foreground mt-8 font-mono tracking-widest opacity-30">
                            BY SUBSCRIBING, YOU AGREE TO RECEIVE UPDATES. YOU CAN UNSUBSCRIBE ANYTIME.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
