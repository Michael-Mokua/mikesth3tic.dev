import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, CheckCircle2, ChevronRight, AlertCircle, Wrench, Target, Sparkles } from "lucide-react";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="pt-32 pb-24 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-amber-500/10 via-ochre-500/5 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="container-custom max-w-4xl relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-10">
          <Link href="/projects" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Projects</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-white/20" />
          <span className="text-amber-400 font-bold uppercase tracking-wider">{project.title}</span>
        </nav>

        {/* Case Study Header */}
        <header className="mb-14 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-mono font-semibold">
            <span>Case Study</span>
            <span>·</span>
            <span>{project.category}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight leading-[1.05]">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl text-zinc-300 leading-relaxed font-light">
            {project.tagline}
          </p>

          {/* Action Links & Tech Stack Bar */}
          <div className="pt-6 border-y border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.07] text-xs font-mono text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-ochre-600 text-dark-950 text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-all shadow-warm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Platform
                </a>
              )}
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 hover:border-amber-400/30 text-zinc-200 hover:text-amber-400 text-xs font-mono font-bold transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                Repository
              </a>
            </div>
          </div>
        </header>

        {/* Case Study Deep-Dive Sections */}
        <div className="space-y-10 text-sm sm:text-base leading-relaxed">
          {/* Section 1: The Problem */}
          <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.07] space-y-4">
            <div className="flex items-center gap-3 text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">
              <Target className="w-4 h-4" />
              <span>01. The Problem Context</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground">Why this project had to be built</h2>
            <p className="text-zinc-300 leading-relaxed">
              {project.problem}
            </p>
          </section>

          {/* Section 2: Role & Responsibilities */}
          <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.07] space-y-4">
            <div className="flex items-center gap-3 text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">
              <Wrench className="w-4 h-4" />
              <span>02. My Role & Engineering Ownership</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground">What I took responsibility for</h2>
            <p className="text-zinc-300 leading-relaxed">
              {project.role}
            </p>
          </section>

          {/* Section 3: Key Technical Implementations */}
          <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.07] space-y-5">
            <div className="flex items-center gap-3 text-blue-400 font-mono text-xs uppercase tracking-widest font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>03. Key Features & Architecture</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground">What I engineered & delivered</h2>
            <div className="space-y-3">
              {project.built.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="w-5 h-5 rounded-full bg-amber-500/15 text-amber-400 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    {idx + 1}
                  </div>
                  <span className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: What I'd Do Differently */}
          <section className="p-8 rounded-3xl bg-amber-500/[0.03] border border-amber-500/20 space-y-4">
            <div className="flex items-center gap-3 text-ochre-400 font-mono text-xs uppercase tracking-widest font-bold">
              <AlertCircle className="w-4 h-4" />
              <span>04. Lessons Learned & Next Iteration</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground">What I would do differently</h2>
            <p className="text-zinc-300 leading-relaxed italic border-l-2 border-amber-400/40 pl-4 py-1">
              &ldquo;{project.whatDifferent}&rdquo;
            </p>
          </section>

          {/* Section 5: Metrics & Domain Highlights */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.metrics.map((m) => (
                <div key={m.label} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center space-y-1">
                  <p className="text-[11px] font-mono text-zinc-500 uppercase">{m.label}</p>
                  <p className="text-base sm:text-lg font-bold font-mono text-amber-400">{m.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-20 p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-foreground">Have a similar project in mind?</h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Let&apos;s talk through your architectural requirements and get building.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-ochre-600 text-dark-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-warm shrink-0"
          >
            <span>Start a Project</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
