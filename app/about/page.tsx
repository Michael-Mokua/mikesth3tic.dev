import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Briefcase, GraduationCap, Building2, Terminal, Code2, Globe, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "The story, background, and engineering philosophy of Michael Ogutu Mokua — Founder of MIKESTH3TIC.DEV.",
};

const experience = [
  {
    role: "IT Project Manager",
    company: "IFSS Group",
    period: "September 2026 – Present",
    location: "Nairobi, Kenya",
    description: "IT project and systems work.",
    type: "Current Role",
  },
  {
    role: "Founder & Lead Architect",
    company: "MIKESTH3TIC.DEV",
    period: "2024 – Present",
    location: "Nairobi, Kenya",
    description:
      "Engineering full-stack web products, agricultural marketplaces, and neuro-symbolic AI reasoning pipelines. Curating proprietary Sheng/Swahili NLP datasets for African market applications.",
    type: "Software Studio",
  },
  {
    role: "ICT Infrastructure & Digitalization Intern",
    company: "State Dept. for Youth Affairs, the Arts & the Creative Economy (SDYACE)",
    period: "3-Month Government Attachment",
    location: "Nairobi, Kenya",
    description:
      "Hands-on structured cabling, network switch routing, VoIP telephony configuration, server room maintenance, and digitalization scoping across KECOBO, DITD, and NYC.",
    type: "Public Sector Attachment",
  },
];

const education = [
  {
    degree: "BSc in Information Technology",
    institution: "Kabarak University",
    period: "Class of December 2026 (Final Year)",
    focus: "Software Engineering, Intelligent Systems, Network Architectures & Database Systems",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="mb-14 space-y-3">
          <p className="text-xs font-mono text-amber-400 tracking-[0.3em] uppercase">
            // Personal & Technical Story
          </p>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground">
            From the Farm to the <span className="text-gradient">Terminal.</span>
          </h1>
        </div>

        {/* Narrative Section */}
        <div className="space-y-8 text-zinc-300 text-sm sm:text-base leading-relaxed mb-20">
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-4">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="text-amber-400">01.</span> Who I Am & Where I Come From
            </h2>
            <p>
              I am <strong className="text-foreground">Michael Ogutu Mokua</strong> (also known in tech circles as <em>Cartelo</em> or <em>Michaia</em>). I am a final-year BSc Information Technology student at Kabarak University (graduating December 2026) and founder of <strong className="text-amber-400">MIKESTH3TIC.DEV</strong>, an AI-focused software studio based in Nairobi, Kenya.
            </p>
            <p>
              My worldview is Africa-first and rooted in a farming background off Old Kangundo Road in Joska. Growing up on the land taught me practical resourcefulness: build things that last, not things that merely look pretty. That grounding translates directly into how I write software — clean architecture, resilient error handling, low-bandwidth optimization, and tangible economic utility.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-4">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span className="text-amber-400">02.</span> Software, AI & Regional Infrastructure
            </h2>
            <p>
              I build full-stack products with <strong className="text-foreground">React, Next.js, Node.js, TypeScript, Python, PostgreSQL/Supabase</strong>, and state-of-the-art LLM reasoning integration (<strong className="text-foreground">Claude 3.5 Sonnet, LangChain</strong>).
            </p>
            <p>
              Beyond the browser, having completed a three-month ICT attachment at the Kenyan government State Department for Youth Affairs and Creative Economy (SDYACE), I understand the infrastructure underneath the code: structured cabling, VoIP configuration, network routing, and server room operations. This gives me a full-picture engineering perspective from hardware racks to client-side renders.
            </p>
            <p>
              I also own and curate a proprietary <strong className="text-emerald-400">Sheng and Swahili NLP dataset</strong>, fueling localized AI models that speak the authentic vernacular of urban East African creators and youth.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center gap-4">
            <div className="text-2xl font-mono text-amber-400 font-black shrink-0">&ldquo;</div>
            <p className="text-amber-300 font-mono text-sm font-semibold">
              Disrupt. Automate. Dominate. Building high-leverage digital systems for Africa and the global market.
            </p>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="mb-20 space-y-8">
          <div className="space-y-1">
            <p className="text-xs font-mono text-amber-400 tracking-[0.3em] uppercase">
              // Career & Experience
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              Work & Practical Attachments
            </h2>
          </div>

          <div className="space-y-4">
            {experience.map((item) => (
              <div
                key={item.role + item.company}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-amber-400/30 transition-all space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-lg font-bold text-foreground">{item.role}</h3>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-amber-400 w-fit">
                    {item.period}
                  </span>
                </div>
                <p className="text-xs font-mono text-zinc-400">
                  {item.company} · {item.location}
                </p>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-2 border-t border-white/[0.04]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-20 space-y-6">
          <div className="space-y-1">
            <p className="text-xs font-mono text-amber-400 tracking-[0.3em] uppercase">
              // Academic Background
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              Education
            </h2>
          </div>

          <div className="space-y-4">
            {education.map((edu) => (
              <div
                key={edu.degree}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.07] space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-lg font-bold text-foreground">{edu.degree}</h3>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-amber-400 w-fit">
                    {edu.period}
                  </span>
                </div>
                <p className="text-xs font-mono text-zinc-400">{edu.institution}</p>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pt-2 border-t border-white/[0.04]">
                  Core Areas: {edu.focus}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-500/15 via-ochre-500/10 to-transparent border border-amber-500/25 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">Want to collaborate or discuss an opportunity?</h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Let&apos;s talk through your product requirements or technical architecture.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-ochre-600 text-dark-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-warm shrink-0"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
