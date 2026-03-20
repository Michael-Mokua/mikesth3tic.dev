"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
    Zap, 
    Shield, 
    TrendingUp, 
    Bot, 
    Cpu, 
    Sparkles,
    ArrowRight,
    Github,
    Twitter,
    Linkedin
} from "lucide-react";
import { useTranslation } from "@/components/providers/LanguageProvider";

const images = [
    "/images/michael/michael-1.jpeg",
    "/images/michael/michael-2.jpeg",
    "/images/michael/michael-3.jpg"
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

export default function FoundersPage() {
    const { t } = useTranslation();

    return (
        <div className="pt-32 pb-20 overflow-hidden">
            <div className="container-custom">
                {/* Hero / Big Photo */}
                <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 glass">
                        <Image
                            src={images[0]}
                            alt="Michael Ogutu Mokua"
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8">
                            <span className="text-[10px] font-mono text-electric-400 mb-2 block uppercase tracking-widest">FOUNDING ARCHITECT</span>
                            <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Michael <br /> Mokua</h1>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-400/10 border border-electric-400/20 text-electric-400 text-xs font-mono mb-4">
                            <Bot className="w-3 h-3" />
                            <span>// THE_FOUNDER</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter text-gradient">
                            Engineering the <br /> Future.
                        </h2>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                            "I believe that code is more than logic—it is architecture. Every system we build should feel like a living expression of intelligence and aesthetics."
                        </p>
                        
                        <div className="flex gap-4 pt-4">
                            <a href="https://github.com/Michael-Mokua" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-electric-400 hover:text-black transition-all">
                                <Github className="w-6 h-6" />
                            </a>
                            <a href="#" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-electric-400 hover:text-black transition-all">
                                <Twitter className="w-6 h-6" />
                            </a>
                            <a href="#" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-electric-400 hover:text-black transition-all">
                                <Linkedin className="w-6 h-6" />
                            </a>
                        </div>
                    </motion.div>
                </motion.div>

                {/* The Manifesto */}
                <motion.section 
                    className="mb-32 py-24 px-8 md:px-16 liquid-glass rounded-[4rem] border border-electric-400/20 relative"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative z-10">
                        <div className="lg:col-span-1">
                            <p className="text-xs font-mono text-electric-400 mb-4 tracking-[0.5em] uppercase">// MANIFESTO</p>
                            <h3 className="text-4xl font-black leading-none tracking-tighter mb-8">
                                Standards of <br /> <span className="text-gradient">Innovation.</span>
                            </h3>
                        </div>
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <Zap className="w-8 h-8 text-electric-400 mb-4" />
                                <h4 className="text-xl font-bold">Uncompromising Performance</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    We don't just build websites; we engineer high-performance systems. Speed is not a luxury—it is a functional requirement for the next generation.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <Shield className="w-8 h-8 text-electric-400 mb-4" />
                                <h4 className="text-xl font-bold">Intelligent Foundation</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Every product from MIKESTH3TIC is infused with intelligence. We integrate AI at the architectural level to augment human capabilities.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <Cpu className="w-8 h-8 text-electric-400 mb-4" />
                                <h4 className="text-xl font-bold">Clean Architecture</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Scalability is born from precision. We follow rigid design patterns to ensure our systems evolve as fast as the industry.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <Sparkles className="w-8 h-8 text-electric-400 mb-4" />
                                <h4 className="text-xl font-bold">Immersive Aesthetics</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Beauty is a form of usability. We lean into the "Cyber-System" aesthetic to create digital experiences that feel alive.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Legacy & Vision Banner */}
                <motion.div 
                    className="relative h-[400px] rounded-[3rem] overflow-hidden mb-32"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <Image
                        src={images[1]}
                        alt="Workspace"
                        fill
                        className="object-cover brightness-50 contrast-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent flex items-center justify-center text-center p-8">
                        <div className="max-w-3xl">
                            <h4 className="text-3xl md:text-5xl font-black mb-8 italic">
                                "Transforming complex ideas into intelligent digital empires."
                            </h4>
                            <p className="font-mono text-sm text-electric-400 tracking-[0.3em] uppercase">SYSTEM.READY_FOR_2026</p>
                        </div>
                    </div>
                </motion.div>
                
                {/* Footer Call */}
                <div className="text-center">
                    <button className="text-xs font-mono text-white/40 hover:text-electric-400 transition-colors uppercase tracking-[0.5em]">
                        // VIEW_ARCHIVE_STATUS [OK]
                    </button>
                </div>
            </div>
        </div>
    );
}

