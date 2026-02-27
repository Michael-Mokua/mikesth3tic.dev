"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Mail,
    MessageSquare,
    Send,
    Github,
    Twitter,
    Youtube,
    Instagram,
    ArrowUpRight,
    Loader2,
    CheckCircle,
    Linkedin
} from "lucide-react";
import { toast } from "@/components/ui/Toaster";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setSent(true);
                setFormData({ name: "", email: "", subject: "", message: "" });
                toast("Message sent successfully! I'll get back to you soon. 🚀", "success");
            } else {
                toast("Failed to send message. Please try again or use direct email.", "error");
            }
        } catch (error) {
            toast("An error occurred. Please try again later.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-32 pb-20">
            <div className="container-custom">
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <p className="text-sm font-mono text-electric-400 mb-3">// GET IN TOUCH</p>
                    <h1 className="text-4xl md:text-7xl font-black mb-6 underline decoration-electric-400/30 underline-offset-8">
                        Let&apos;s Build <span className="text-gradient">Together</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                        Have a project in mind, a question about my work, or just want to say hi?
                        My inbox is always open (and I respond faster than an LLM).
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass p-8 md:p-10 rounded-3xl border border-white/[0.05] relative"
                    >
                        {sent ? (
                            <div className="text-center py-12 flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full bg-green-400/10 flex items-center justify-center mb-6">
                                    <CheckCircle className="w-8 h-8 text-green-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-foreground mb-3">Message Delivered!</h2>
                                <p className="text-muted-foreground mb-8">Thanks for reaching out, Michael. I&apos;ll check it and get back to you within 24 hours.</p>
                                <button
                                    onClick={() => setSent(false)}
                                    className="px-6 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-sm font-bold"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-muted-foreground ml-1">YOUR NAME</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="John Doe"
                                            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm focus:border-electric-400/30 transition-all outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-muted-foreground ml-1">YOUR EMAIL</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="john@example.com"
                                            className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm focus:border-electric-400/30 transition-all outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-muted-foreground ml-1">SUBJECT</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        placeholder="Collaboration Request"
                                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm focus:border-electric-400/30 transition-all outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-muted-foreground ml-1">MESSAGE</label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Tell me about your project..."
                                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm focus:border-electric-400/30 transition-all outline-none resize-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-electric-400 text-dark-950 font-black text-sm hover:bg-electric-300 transition-all duration-200 glow-electric uppercase tracking-wider disabled:opacity-50"
                                >
                                    {loading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                                <p className="text-[10px] text-center text-muted-foreground font-mono">
                                    SECURE TRANSMISSION VIA NEXT.JS API ENCRYPTED ENDPOINTS.
                                </p>
                            </form>
                        )}
                    </motion.div>

                    {/* Socials & Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-8"
                    >
                        <div className="glass p-8 rounded-3xl border border-white/[0.05]">
                            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-electric-400" />
                                Direct Contact
                            </h3>
                            <div className="space-y-4">
                                <a href="mailto:mikestheticdev@gmail.com" className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:border-electric-400/30 transition-all group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-electric-400/10 flex items-center justify-center">
                                            <Mail className="w-5 h-5 text-electric-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground font-mono">EMAIL ME</p>
                                            <p className="text-sm font-bold text-foreground">mikestheticdev@gmail.com</p>
                                        </div>
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-electric-400 transition-colors" />
                                </a>
                                <a href="tel:0110254359" className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:border-electric-400/30 transition-all group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                                            <Rocket className="w-5 h-5 text-green-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground font-mono">CALL ME</p>
                                            <p className="text-sm font-bold text-foreground">0110254359</p>
                                        </div>
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-green-500 transition-colors" />
                                </a>
                            </div>
                        </div>

                        <div className="glass p-8 rounded-3xl border border-white/[0.05]">
                            <h3 className="text-xl font-bold text-foreground mb-6">Social Spaces</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { icon: Github, label: "GitHub", href: "https://github.com/Michael-Mokua", color: "text-white" },
                                    { icon: Twitter, label: "Twitter", href: "https://twitter.com/Mikesth3tic_dev", color: "text-blue-400" },
                                    { icon: Instagram, label: "Insta (Personal)", href: "https://instagram.com/whoismichaia", color: "text-pink-400" },
                                    { icon: Instagram, label: "Insta (Dev)", href: "https://instagram.com/mikesth3tic.dev", color: "text-pink-500" },
                                ].map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] transition-all group"
                                    >
                                        <social.icon className={`w-4 h-4 ${social.color}`} />
                                        <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors">{social.label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="glass p-8 rounded-3xl border border-white/[0.05] bg-gradient-to-br from-electric-400/5 to-neon-400/5 overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Rocket className="w-20 h-20 text-electric-400" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground mb-2">Based in Nairobi</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                GMT+3 / East Africa Time. I am usually online between 9 AM and 11 PM. Let&apos;s schedule a call if you are in a different time zone!
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

import { Rocket } from "lucide-react";
