"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, ExternalLink, Cuboid as Cube } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Project3DExplorer } from "@/components/ui/Project3DExplorer";

const projects = [
    {
        title: "AURA Intelligence",
        slug: "aura",
        description: "Adaptive User Reasoning Architecture. A hybrid intelligence system merging symbolic logic with neural pathways.",
        tags: ["Next.js", "GPT-4o", "LangChain"],
        repo: "https://github.com/Michael-Mokua/AURA",
        type: "aura" as const,
        className: "lg:col-span-2 lg:row-span-2",
        color: "bg-blue-500/10 border-blue-500/20",
    },
    {
        title: "StrideOS",
        slug: "strideos",
        description: "Live route visualization and GPS analytics for high-performance athletes.",
        tags: ["Kotlin", "OSM", "GPS"],
        repo: "https://github.com/Michael-Mokua/StrideOS",
        type: "strideos" as const,
        className: "lg:col-span-1 lg:row-span-1",
        color: "bg-electric-400/10 border-electric-400/20",
    },
    {
        title: "Agri-Value",
        slug: "agri-value-connect",
        description: "Connecting Kenyan farmers to direct buyers, reducing food waste by 40%.",
        tags: ["React", "PostgreSQL"],
        repo: "https://github.com/Michael-Mokua/agri-value-connect",
        type: "agri" as const,
        className: "lg:col-span-1 lg:row-span-1",
        color: "bg-green-500/10 border-green-500/20",
    },
    {
        title: "xGAFFER Analytics",
        slug: "xgaffer",
        description: "FPL analytical powerhouse utilizing real-time data for game-winning squad rotations.",
        tags: ["Zustand", "FPL API"],
        repo: "https://github.com/Michael-Mokua/xGAFFER",
        type: "xgaffer" as const,
        className: "lg:col-span-2 lg:row-span-1",
        color: "bg-neon-400/10 border-neon-400/20",
    },
];

export function FeaturedProjects() {
    return (
        <section id="work" className="section-padding relative">
            <div className="container-custom">
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-xs font-mono text-electric-400 mb-4 tracking-[0.3em] uppercase">// PROJECT_VAULT</p>
                    <h2 className="text-4xl md:text-6xl font-black text-foreground max-w-2xl leading-[1.05] tracking-tighter">
                        Building the <span className="text-gradient">products of 2026.</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <ProjectBentoCard key={project.title} project={project} index={i} />
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <Link
                        href="/projects"
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm font-bold text-foreground hover:bg-white/[0.06] transition-all hover:scale-105 active:scale-95"
                    >
                        Explore Complete Archive
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

function ProjectBentoCard({ project, index }: { project: any; index: number }) {
    const [show3D, setShow3D] = useState(false);

    return (
        <motion.div
            className={cn(
                "group relative overflow-hidden rounded-[2.5rem] border p-8 flex flex-col transition-all duration-500",
                project.className,
                project.color,
                "hover:shadow-2xl hover:shadow-electric-400/10"
            )}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            <div className="relative z-20 h-full flex flex-col">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h3 className="text-2xl font-black text-foreground mb-1 tracking-tighter uppercase group-hover:text-electric-400 transition-colors">
                            {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag: string) => (
                                <span key={tag} className="text-[9px] font-mono text-white/40 uppercase tracking-widest">{tag}</span>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <a href={project.repo} target="_blank" className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <Github className="w-4 h-4 text-white" />
                        </a>
                    </div>
                </div>

                <p className={cn(
                    "text-muted-foreground text-sm leading-relaxed mb-8",
                    project.className.includes("col-span-2") ? "max-w-md" : "max-w-xs"
                )}>
                    {project.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-4">
                    <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-electric-400 transition-all"
                    >
                        Read Case Study
                    </Link>
                    <button
                        onClick={() => setShow3D(!show3D)}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-white font-bold text-xs uppercase tracking-widest hover:bg-white/[0.1] transition-all"
                    >
                        <Cube className={cn("w-3.5 h-3.5", show3D && "text-electric-400 animate-pulse")} />
                        {show3D ? "Exit 3D" : "Explore in 3D"}
                    </button>
                </div>
            </div>

            {/* Immersive 3D Explorer Layer */}
            <div className={cn(
                "absolute inset-0 transition-all duration-700 ease-in-out pointer-events-none",
                show3D ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-110"
            )}>
                <div className="absolute inset-0 bg-dark-950/80 backdrop-blur-md z-10" />
                <Project3DExplorer type={project.type} className="w-full h-full relative z-20" />
                <div className="absolute top-6 right-6 z-30">
                     <button
                        onClick={() => setShow3D(false)}
                        className="p-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                    >
                        <ArrowRight className="w-4 h-4 rotate-180" />
                    </button>
                </div>
            </div>

            {/* Background Decorative Element */}
            <div className="absolute -bottom-10 -right-10 text-[120px] font-black text-white/[0.02] italic tracking-tighter select-none pointer-events-none transition-all duration-500 group-hover:text-white/[0.05]">
                {index + 1}
            </div>
        </motion.div>
    );
}
