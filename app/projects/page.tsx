"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Github,
    Star,
    GitFork,
    ExternalLink,
    Search,
    Filter,
    Code2,
    Calendar,
    Loader2,
    Briefcase,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Project3DExplorer } from "@/components/ui/Project3DExplorer";
import { cn } from "@/lib/utils";
import { Cuboid as Cube } from "lucide-react";


interface Repo {
    id: number;
    name: string;
    description: string;
    url: string;
    homepage: string;
    stars: number;
    forks: number;
    language: string;
    updatedAt: string;
    topics: string[];
}

// Case studies are now fetched dynamically from /api/projects


export default function ProjectsPage() {
    const [caseStudies, setCaseStudies] = useState<any[]>([]);
    const [repos, setRepos] = useState<Repo[]>([]);
    const [filteredRepos, setFilteredRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [activeLang, setActiveLang] = useState("All");

    useEffect(() => {
        async function fetchData() {
            try {
                const [reposRes, studiesRes] = await Promise.all([
                    fetch("/api/github"),
                    fetch("/api/projects")
                ]);

                const reposData = await reposRes.json();
                const studiesData = await studiesRes.json();

                if (reposData.repos) {
                    setRepos(reposData.repos);
                    setFilteredRepos(reposData.repos);
                }

                if (studiesData.studies) {
                    setCaseStudies(studiesData.studies);
                }
            } catch (err) {
                console.error("Failed to load projects", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = repos.filter(repo => {
            const matchesSearch = repo.name.toLowerCase().includes(search.toLowerCase()) ||
                repo.description?.toLowerCase().includes(search.toLowerCase());
            const matchesLang = activeLang === "All" || repo.language === activeLang;
            return matchesSearch && matchesLang;
        });
        setFilteredRepos(filtered);
    }, [search, activeLang, repos]);

    const languages = ["All", ...Array.from(new Set(repos.map(r => r.language).filter(Boolean)))];

    return (
        <div className="pt-32 pb-20">
            <div className="container-custom">
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-400/10 border border-electric-400/20 text-electric-400 text-xs font-mono mb-6">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>// SYSTEM ARCHITECTURE</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6">
                        Featured <span className="text-gradient">Case Studies</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                        Deep dives into the architecture, technical decisions, and scaling strategies behind my most ambitious high-performance systems.
                    </p>
                </motion.div>

                {/* Featured Case Studies Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-80 glass rounded-[2.5rem] animate-pulse bg-white/5" />
                        ))
                    ) : (
                        caseStudies.map((study, idx) => (
                            <ProjectBentoCard 
                                key={study.slug} 
                                project={{
                                    ...study,
                                    type: study.slug === "aura" ? "aura" : 
                                          study.slug === "strideos" ? "strideos" : 
                                          study.slug === "agri-value-connect" ? "agri" : "xgaffer",
                                    className: idx === 0 ? "lg:col-span-2 lg:row-span-2" : 
                                               idx === 3 ? "lg:col-span-2" : "lg:col-span-1"
                                }} 
                                index={idx} 
                            />
                        ))
                    )}
                </div>


                {/* divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent mb-24" />

                {/* Open Source (GitHub API) Header */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-black mb-4">Open Source Contributions</h2>
                    <p className="text-muted-foreground max-w-2xl">
                        A dynamic feed of my minor experiments, components, and public repositories synced directly from GitHub.
                    </p>
                </motion.div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-12">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-electric-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search repositories by name or description..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl pl-11 pr-4 py-3 text-sm focus:border-electric-400/30 transition-all outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                        <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        {languages.map((lang) => (
                            <button
                                key={lang}
                                onClick={() => setActiveLang(lang)}
                                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex-shrink-0 ${activeLang === lang
                                    ? "bg-electric-400/20 text-electric-400 border border-electric-400/30"
                                    : "bg-white/[0.04] border border-white/[0.06] text-muted-foreground hover:border-white/20"
                                    }`}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40">
                        <div className="w-10 h-10 border-2 border-electric-400/20 border-t-electric-400 rounded-full animate-spin mb-4" />
                        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.3em]">Querying_GitHub_Nodes...</p>
                    </div>
                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredRepos.map((repo, i) => (
                                <motion.div
                                    key={repo.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="glass border border-white/[0.1] rounded-2xl p-6 group card-hover relative flex flex-col"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 rounded-xl bg-electric-400/10 border border-electric-400/20 text-electric-400 group-hover:bg-electric-400/20 transition-colors">
                                            <Code2 className="w-5 h-5" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <a href={repo.url} target="_blank" className="p-2 glass-hover rounded-lg text-muted-foreground hover:text-foreground">
                                                <Github className="w-4 h-4" />
                                            </a>
                                            {repo.homepage && (
                                                <a href={repo.homepage} target="_blank" className="p-2 glass-hover rounded-lg text-muted-foreground hover:text-electric-400">
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-electric-400 transition-colors">
                                        {repo.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6 flex-1">
                                        {repo.description || "SYSTEM.ENTITY_IDENTIFIED // NO_METADATA_EXTRACTED"}
                                    </p>


                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                                            <div className="flex items-center gap-1.5">
                                                <Star className="w-3.5 h-3.5 text-yellow-500" />
                                                {repo.stars}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <GitFork className="w-3.5 h-3.5" />
                                                {repo.forks}
                                            </div>
                                            <div className="flex items-center gap-1.5 capitalize">
                                                <div className="w-2 h-2 rounded-full bg-electric-400" />
                                                {repo.language || "Unknown"}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground pt-4 border-t border-white/[0.04]">
                                            <Calendar className="w-3 h-3" />
                                            UPDATED: {new Date(repo.updatedAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {!loading && filteredRepos.length === 0 && (
                    <div className="text-center py-40 glass rounded-3xl border border-dashed border-white/10">
                        <p className="text-muted-foreground italic">No projects found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function ProjectBentoCard({ project, index }: { project: any; index: number }) {
    const [show3D, setShow3D] = useState(false);

    return (
        <motion.div
            className={cn(
                "group relative overflow-hidden rounded-[2.5rem] border p-8 flex flex-col transition-all duration-500",
                project.className,
                "bg-white/[0.02] border-white/5 hover:border-electric-400/30",
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
                            {(project.technologies || project.tags || []).slice(0, 3).map((tag: string) => (
                                <span key={tag} className="text-[9px] font-mono text-white/40 uppercase tracking-widest">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <p className={cn(
                    "text-muted-foreground text-sm leading-relaxed mb-8",
                    project.className.includes("col-span-2") ? "max-w-md" : "max-w-xs"
                )}>
                    {project.excerpt || project.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-4">
                    <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-electric-400 transition-all"
                    >
                        Read Architecture
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
                <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-10" />
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

