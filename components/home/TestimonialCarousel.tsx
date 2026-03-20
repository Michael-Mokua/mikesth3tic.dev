"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, User } from "lucide-react";

const testimonials = [
    {
        quote: "The architecture Mike built for our agrotech platform is levels above anything else. Scaling from zero to 10k users happened without a single node failure.",
        author: "Founder, Early Kenyan Startup",
        role: "Beta Client 01",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    {
        quote: "Integrating MikeAI changed how we handle customer onboarding. It feels like having a senior engineer on call 24/7. Precision is an understatement.",
        author: "CEO, AI SaaS Startup",
        role: "Beta Client 02",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    {
        quote: "Cyber-system aesthetics paired with actual performance. MIKESTH3TIC turned our legacy vision into a futuristic reality in record time.",
        author: "Product Lead, Fintech Hub",
        role: "Strategic Partner",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
    }
];

export function TestimonialCarousel() {
    const [index, setIndex] = useState(0);

    const next = () => setIndex((i) => (i + 1) % testimonials.length);
    const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="py-24 relative overflow-hidden bg-dark-950">
            <div className="container-custom relative z-10">
                <div className="text-center mb-16">
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.5em] mb-4 block underline decoration-electric-400/50">
                        // Early Client Feedback (Simulated Placeholders)
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
                       SYSTEM <span className="text-gradient">TESTIMONIALS.</span>
                    </h2>
                </div>

                <div className="max-w-4xl mx-auto relative px-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="liquid-glass p-12 rounded-[3rem] relative"
                        >
                            <Quote className="absolute top-8 left-8 w-12 h-12 text-electric-400/10" />
                            
                            <p className="text-xl md:text-3xl font-bold leading-tight mb-10 tracking-tight text-white/90">
                                "{testimonials[index].quote}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden border border-electric-400/30">
                                    <img src={testimonials[index].avatar} alt={testimonials[index].author} className="w-full h-full object-cover grayscale" />
                                </div>
                                <div>
                                    <p className="font-bold text-white uppercase tracking-wider text-sm">{testimonials[index].author}</p>
                                    <p className="text-xs font-mono text-electric-400">{testimonials[index].role}</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <button 
                        onClick={prev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 border border-white/10 hover:bg-electric-400 hover:text-dark-950 transition-all z-20"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                        onClick={next}
                        className="absolute right-0 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 border border-white/10 hover:bg-electric-400 hover:text-dark-950 transition-all z-20"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Background Text Decor */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -rotate-90 select-none pointer-events-none opacity-[0.02]">
                <span className="text-9xl font-black uppercase tracking-tighter text-white">VALIDATION</span>
            </div>
        </section>
    );
}
