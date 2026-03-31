"use client";

import { motion } from "framer-motion";

import { Shield, Zap, Globe, Cpu, Terminal, Sparkles, ArrowRight, Scan, Maximize2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 overflow-hidden">
            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none opacity-20 -z-10">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-electric-400/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-neon-400/10 blur-[120px] rounded-full" />
            </div>

            <div className="container-custom">
                {/* Intro / Header */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <div className="order-2 lg:order-1">
                        <div className="flex items-center gap-3 mb-6">
                            <Terminal className="w-5 h-5 text-electric-400" />
                            <span className="text-[10px] font-mono text-electric-400 uppercase tracking-[0.5em] font-bold">
                                // CORE_ARCHITECT_IDENTITY
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 italic leading-none">
                            Michael <span className="text-gradient">Mokua</span>
                        </h1>
                        <div className="flex flex-col gap-2 mb-8">
                            <span className="text-4xl md:text-5xl font-black text-white/10 uppercase tracking-tighter">Disrupt.</span>
                            <span className="text-4xl md:text-5xl font-black text-electric-400 uppercase tracking-tighter ml-12">Automate.</span>
                            <span className="text-4xl md:text-5xl font-black text-white/10 uppercase tracking-tighter ml-24">Dominate.</span>
                        </div>
                        <p className="text-xl text-white font-light italic leading-relaxed mb-6">
                            "Automation isn't just about efficiency; it's about the <span className="text-electric-400">architectural liberation</span> of human creativity."
                        </p>
                    </div>

                    <div className="order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 1 }}
                            className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden border-2 border-electric-400/20 shadow-[0_0_50px_rgba(0,212,255,0.15)] bg-dark-900 group"
                        >
                            <Image 
                                src="/images/michael/michael-1.jpeg"
                                alt="Michael Mokua - Architect Profile"
                                fill
                                className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                                priority
                            />
                            {/* Scanning line effect */}
                            <motion.div 
                                className="absolute left-0 right-0 h-[2px] bg-electric-400/40 shadow-[0_0_20px_rgba(0,212,255,0.6)] z-10 opacity-0 group-hover:opacity-100"
                                animate={{ top: ["0%", "100%", "0%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute bottom-8 left-8 flex items-center gap-3 bg-dark-950/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 z-20">
                                <Scan className="w-4 h-4 text-electric-400" />
                                <span className="text-[10px] font-mono text-white/80 uppercase tracking-widest font-bold">NODE_01_SYNAPSE</span>
                            </div>
                        </motion.div>
                    </div>

                </div>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-24">
                    {/* Detailed Story Section */}
                    <div className="space-y-16">
                        <div className="prose-custom">
                            <h2 className="text-xs font-mono text-electric-400 uppercase tracking-[0.4em] mb-8 font-bold italic">// THE_ARCHITECT_STORY</h2>
                            <p className="text-lg text-white/80 leading-relaxed italic mb-6">
                                Michael doesn't just write code; he orchestrates digital environments. 
                            </p>
                            <p className="text-muted-foreground leading-relaxed mb-6 font-light">
                                With over 6 years entrenched in the development of distributed systems and sub-millisecond latency optimizations, he identified a critical flaw in the modern web: the lack of architectural soul. High-performance software had become sterile, and visually stunning design had become inefficient.
                            </p>
                            <p className="text-muted-foreground leading-relaxed mb-6 font-light">
                                MIKESTH3TIC was born from the obsession to bridge this void. Michael's journey from a technical systems engineer to a Core System Architect was driven by one principle: <strong>Software should command its space.</strong> Every framework he builds is treated as a high-fidelity living organism, optimized for maximum aesthetic impact and system-tier resilience.
                            </p>
                        </div>

                        <div className="prose-custom">
                            <h2 className="text-xs font-mono text-electric-400 uppercase tracking-[0.4em] mb-8 font-bold italic">// STUDIO_MANIFESTO</h2>
                            <p className="text-muted-foreground leading-relaxed font-light">
                                MIKESTH3TIC.DEV is an AI Software Studio founded directly at the intersection of artificial intelligence and intentional engineering. We do not build generic software. We build the kind of products that shift markets, automate operations, and redefine what digital infrastructure looks like.
                            </p>
                            <p className="text-muted-foreground leading-relaxed font-light">
                                Our mission is to <strong>simplify complexity through smart design</strong>, integrate AI into daily workflows, and engineer secure, human-centered digital ecosystems.
                            </p>
                            <p className="text-muted-foreground leading-relaxed font-light">
                                Our vision is to lead AI-driven analytics across East Africa, scale intelligent SaaS products globally, and augment human potential through autonomous systems. We believe <strong>AI IS INFRASTRUCTURE, NOT A FEATURE</strong>, and that complexity is our competitive edge.
                            </p>
                            <div className="mt-8 space-y-2">
                                <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-4">CORE_FOCUS_AREAS</h3>
                                <ul className="list-disc pl-4 space-y-2 text-muted-foreground text-sm font-light">
                                    <li>AI Advisory Platforms</li>
                                    <li>SaaS Product Engineering</li>
                                    <li>Intelligent Financial Systems</li>
                                    <li>Multi-Agent Automation</li>
                                    <li>Scalable Digital Infrastructure</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* System Specs Table */}
                    <div className="sticky top-32">
                        <div className="p-8 pb-4 rounded-[2.5rem] liquid-glass border border-electric-400/20 shadow-[0_0_50px_rgba(0,212,255,0.1)]">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xs font-mono text-white uppercase tracking-[0.4em] font-bold italic">// PROTOCOL_SPECIFICATIONS</h2>
                            </div>

                            <div className="space-y-1">
                                {[
                                    { label: "COGNITIVE_UPTIME", value: "99.98% NODE RESILIENCE", icon: Zap },
                                    { label: "CORE_COMPILER", value: "NEXT.js 15 / RUST / VERCEL AI", icon: Cpu },
                                    { label: "IDENTITY_VECTOR", value: "ARCHITECT / SYSTEM_BUILDER", icon: Globe },
                                    { label: "SYSTEM_VERSION", value: "2.026.BETA_STABLE", icon: Shield },
                                ].map((spec) => (
                                    <div key={spec.label} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/[0.04] transition-all border border-transparent hover:border-white/5">
                                        <div className="flex items-center gap-4">
                                            <spec.icon className="w-4 h-4 text-electric-400 opacity-40" />
                                            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{spec.label}</span>
                                        </div>
                                        <span className="text-[10px] font-mono text-white font-bold">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final Quote Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative p-12 md:p-24 rounded-[3.5rem] bg-white/[0.02] border border-white/5 overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-25 filter grayscale contrast-125">
                         <Image 
                            src="/images/michael/michael-3.jpg"
                            alt="Michael Mokua - Profile"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="relative z-10 max-w-2xl">
                        <Sparkles className="w-12 h-12 text-electric-400 mb-8 opacity-40" />
                        <blockquote className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-8 leading-tight">
                            "In an era of digital entropy, the only true hedge against obsolescence is <span className="text-gradient">Architectural Precision</span>. We don't just automate; we architect autonomy."
                        </blockquote>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-1 bg-electric-400" />
                            <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em]">CORE ARCHITECT // MIKESTH3TIC.SYS</span>
                        </div>
                    </div>

                    <div className="absolute bottom-12 right-12 hidden md:block">
                         <Link 
                            href="/" 
                            className="flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs hover:bg-electric-400 hover:text-dark-950 transition-all active:scale-95"
                        >
                            Connect Node <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}



