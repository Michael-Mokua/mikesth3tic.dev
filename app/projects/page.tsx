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

                {/* Featured Case Studies Grid (Dynamic from MDX) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-32">
                    {loading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-64 glass rounded-3xl animate-pulse bg-white/5" />
                        ))
                    ) : (
                        caseStudies.map((study, idx) => (
                            <motion.div
                                key={study.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Link href={`/projects/${study.slug}`} className="group block h-full glass rounded-3xl p-8 border border-electric-400/20 hover:border-electric-400/50 hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-electric-400/10 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:bg-electric-400/20 transition-colors" />

                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-electric-400 transition-colors relative z-10">{study.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-6 relative z-10">{study.excerpt || study.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                                        {(study.technologies || study.tags || []).map((t: string) => (
                                            <span key={t} className="px-3 py-1 bg-white/[0.05] border border-white/[0.05] rounded-full text-xs font-mono text-muted-foreground">{t}</span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-2 text-electric-400 font-bold text-sm mt-auto relative z-10">
                                        Read Architecture <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            </motion.div>
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
                        <Loader2 className="w-10 h-10 text-electric-400 animate-spin mb-4" />
                        <p className="font-mono text-sm text-muted-foreground">SYNCING REPOSITORIES...</p>
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
                                        {repo.description || "No description provided."}
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
