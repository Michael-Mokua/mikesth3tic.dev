"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Code2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const featured = [
    {
        title: "MIKESTH3TIC.DEV",
        slug: "mikesth3tic-dev",
        description: "My personal portfolio and blog, built with Next.js 14, TypeScript, Three.js, Firebase, and Framer Motion.",
        tags: ["Next.js", "TypeScript", "Firebase", "Three.js"],
        repo: "https://github.com/Michael-Mokua/mikesth3tic.dev",
        demo: "https://mikesth3tic.dev",
        color: "from-electric-400/20 to-blue-600/20",
        featured: true,
    },
    {
        title: "StrideOS",
        slug: "strideos",
        description: "Android fitness tracking app with OpenStreetMap-based live route visualization and GPS analytics.",
        tags: ["Android", "Kotlin", "osmdroid", "GPS"],
        repo: "https://github.com/Michael-Mokua/StrideOS",
        color: "from-blue-600/20 to-neon-400/20",
        featured: true,
    },
    {
        title: "Agri-Value Connect",
        slug: "agri-value-connect",
        description: "Platform connecting Kenyan smallholder farmers directly to buyers, reducing post-harvest losses.",
        tags: ["React", "Node.js", "PostgreSQL", "M-Pesa"],
        repo: "https://github.com/Michael-Mokua/agri-value-connect",
        color: "from-green-500/10 to-electric-400/10",
        featured: true,
    },
];

export function FeaturedProjects() {
    return (
        <section className="section-padding relative overflow-hidden" aria-label="Featured projects">
            {/* Dynamic background element */}
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-electric-400/5 rounded-full blur-[100px] -z-10" />

            <div className="container-custom">
                <motion.div
                    className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="max-w-2xl">
                        <p className="text-sm font-mono text-electric-400 mb-3 tracking-widest uppercase">// FEATURED PROJECTS</p>
                        <h2 className="text-5xl md:text-6xl font-black leading-tight">
                            Building <span className="text-gradient">Impactful</span> Digital Products.
                        </h2>
                    </div>
                    <Link
                        href="/projects"
                        className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm text-foreground hover:bg-white/[0.06] transition-all"
                    >
                        Explore all work
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {featured.map((project, i) => (
                        <ProjectCard key={project.title} project={project} index={i} />
                    ))}

                    {/* View More Card */}
                    <motion.div
                        className="relative group overflow-hidden rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] p-10 flex flex-col items-center justify-center text-center hover:border-electric-400/30 transition-all duration-500 min-h-[400px]"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="w-20 h-20 rounded-3xl bg-electric-400/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                            <Code2 className="w-10 h-10 text-electric-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter">Want to see more?</h3>
                        <p className="text-muted-foreground text-sm max-w-xs mb-8">
                            I've built over 20+ applications ranging from AI agents to complex enterprise systems.
                        </p>
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 text-electric-400 font-bold tracking-widest text-[10px] uppercase hover:gap-4 transition-all"
                        >
                            View Full Archive <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project, index }: { project: any; index: number }) {
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientY - rect.top) / rect.height - 0.5;
        const y = (e.clientX - rect.left) / rect.width - 0.5;
        setRotate({ x: x * -10, y: y * 10 });
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
    };

    return (
        <motion.div
            className="group relative h-[500px] w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{ rotateX: rotate.x, rotateY: rotate.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative h-full w-full rounded-[2.5rem] p-10 flex flex-col overflow-hidden bg-gradient-to-br ${project.color} border border-white/[0.08] hover:border-electric-400/40 transition-colors duration-500 select-none`}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Gloss effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 h-full flex flex-col" style={{ transform: "translateZ(50px)" }}>
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <h3 className="text-3xl font-black text-foreground mb-2 tracking-tighter uppercase group-hover:text-electric-400 transition-colors">
                                {project.title}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.slice(0, 3).map((tag: string) => (
                                    <span key={tag} className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <a href={project.repo} target="_blank" className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <Github className="w-5 h-5 text-white" />
                            </a>
                        </div>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-10">
                        {project.description}
                    </p>

                    <div className="mt-auto">
                        <Link
                            href={`/projects/${project.slug || project.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                            className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-electric-400/10 border border-electric-400/30 text-electric-400 font-bold text-xs uppercase tracking-widest hover:bg-electric-400 hover:text-black transition-all"
                        >
                            View Case Study <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* Decorative background number */}
                <div className="absolute -bottom-10 -right-10 text-[200px] font-black text-white/[0.02] italic tracking-tighter select-none pointer-events-none" style={{ transform: "translateZ(-20px)" }}>
                    0{index + 1}
                </div>
            </motion.div>
        </motion.div>
    );
}
