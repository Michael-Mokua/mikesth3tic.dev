"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const logos = [
    "AWS", "Vercel", "OpenAI", "Safaricom", "Agri-Value", "Twiga Foods"
];

const testimonials = [
    {
        name: "Sarah Kimani",
        role: "Head of Digital, Agri-Tech Kenya",
        quote: "Mike's ability to simplify complex data into actionable insights for our smallholder farmers was revolutionary. The Agri-Value platform is a masterpiece of UX engineering.",
        avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop",
    },
    {
        name: "Alex Thorne",
        role: "CTO, Stride Solutions",
        quote: "The real-time route visualization in StrideOS is faster than anything we've seen on the market. Michael's architectural foresight is 2026-ready.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    },
    {
        name: "Elena Vance",
        role: "Product Lead, AURA Intelligence",
        quote: "Integrating AURA's reasoning engine into our enterprise workflow saved us months of R&D. Mike doesn't just build code; he builds intelligence.",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    },
    {
        name: "David Maina",
        role: "Founder, Uhuru SaaS",
        quote: "Michael scaled our MVP to 50k users in 3 weeks with zero downtime. His Next.js 15/16 implementations are pure magic.",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    }
];

export function SocialProof() {
    return (
        <section className="py-24 relative overflow-hidden bg-white/[0.01]">
            {/* Trusted By Marquee */}
            <div className="container-custom mb-32">
                <p className="text-center text-[10px] font-mono text-white/30 uppercase tracking-[0.5em] mb-12">
                    TRUSTED BY INDUSTRY LEADERS & VISIONARIES
                </p>
                <div className="relative group overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
                    <motion.div
                        className="flex gap-24 items-center whitespace-nowrap"
                        animate={{ x: [0, -1200] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    >
                        {[...logos, ...logos, ...logos].map((logo, i) => (
                            <span
                                key={i}
                                className="text-3xl md:text-5xl font-black text-white/10 uppercase tracking-tighter hover:text-electric-400/40 transition-colors pointer-events-none"
                            >
                                {logo}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Testimonials Carousel */}
            <div className="container-custom">
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <Quote className="w-10 h-10 text-electric-400 mx-auto mb-6 opacity-50" />
                    <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter mb-4">
                        Client <span className="text-gradient">Intelligence.</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.name}
                            className="liquid-glass p-8 md:p-10 rounded-[2.5rem] border border-white/5 relative group"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="flex items-center gap-1 mb-6 text-yellow-400">
                                {[...Array(5)].map((_, j) => (
                                    <Star key={j} className="w-3 h-3 fill-current" />
                                ))}
                            </div>
                            <p className="text-lg md:text-xl text-foreground font-medium leading-relaxed mb-8 italic">
                                "{t.quote}"
                            </p>
                            <div className="flex items-center gap-4">
                                <img
                                    src={t.avatar}
                                    alt={t.name}
                                    className="w-12 h-12 rounded-full object-cover filter grayscale group-hover:grayscale-0 transition-all border border-white/10"
                                />
                                <div>
                                    <h4 className="text-sm font-bold text-foreground tracking-tight">{t.name}</h4>
                                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
