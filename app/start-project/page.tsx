"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, CheckCircle2, Loader2, Sparkles, Rocket } from "lucide-react";
import Link from "next/link";
import { toast } from "@/components/ui/Toaster";

const projectTypes = [
  "Full-Stack Web / SaaS Application",
  "AI Reasoning & LLM Integration",
  "Agricultural / Marketplace Platform",
  "Native Mobile (Android Kotlin)",
  "ICT Infrastructure & System Audit",
  "Other / Technical Consultation",
];

const timelineOptions = [
  "Immediate (< 2 weeks)",
  "1 – 2 Months",
  "3+ Months",
  "Flexible / Ongoing",
];

export default function StartProjectPage() {
  const [selectedType, setSelectedType] = useState(projectTypes[0]);
  const [selectedTimeline, setSelectedTimeline] = useState(timelineOptions[1]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    details: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      subject: `[Project Intake] ${selectedType} — ${formData.organization || formData.name}`,
      message: `Project Type: ${selectedType}\nTimeline: ${selectedTimeline}\nOrganization: ${formData.organization || "N/A"}\n\nProject Details:\n${formData.details}`,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
        toast("Project brief received! I will review it and get back to you within 24 hours.", "success");
      } else {
        toast("Failed to submit. Please reach out directly to mikestheticdev@gmail.com", "error");
      }
    } catch {
      toast("An error occurred. Please email directly to mikestheticdev@gmail.com", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container-custom max-w-3xl">
        {/* Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-amber-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </Link>

        {/* Header */}
        <div className="mb-12 space-y-3">
          <p className="text-xs font-mono text-amber-400 tracking-[0.3em] uppercase">
            // Project Brief Intake
          </p>
          <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            Start a <span className="text-gradient">Project.</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Fill in the key details of what you are looking to build. I will evaluate your requirements, architectural feasibility, and timeline before scheduling a technical discovery call.
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 sm:p-14 rounded-3xl bg-white/[0.02] border border-white/[0.08] text-center space-y-4 flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Project Brief Received!</h2>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
              Thank you for sharing your project specifications. I will review the architecture requirements and respond to your email within 24 hours.
            </p>
            <div className="pt-4 flex gap-4">
              <Link
                href="/projects"
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-ochre-600 text-dark-950 font-bold text-xs uppercase tracking-wider"
              >
                Explore More Projects
              </Link>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-full border border-white/10 text-xs font-mono text-zinc-300 hover:text-amber-400 transition-colors"
              >
                Submit another brief
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-8">
            {/* 1. Project Type */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold block">
                01. What type of project are you building?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {projectTypes.map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`p-3.5 rounded-2xl text-left text-xs sm:text-sm font-medium border transition-all cursor-pointer ${
                      selectedType === type
                        ? "bg-amber-500/15 border-amber-500/40 text-amber-300 font-bold"
                        : "bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/15"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Timeline */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold block">
                02. What is your estimated timeline?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {timelineOptions.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setSelectedTimeline(t)}
                    className={`p-3 rounded-2xl text-center text-xs font-mono border transition-all cursor-pointer ${
                      selectedTimeline === t
                        ? "bg-amber-500/15 border-amber-500/40 text-amber-300 font-bold"
                        : "bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/15"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Project Details */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold block">
                03. Project Specifications & Goals
              </label>
              <textarea
                required
                rows={5}
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                placeholder="Describe your product idea, user problem, target platform, any existing codebase, and specific requirements (e.g. M-Pesa integration, Claude API)..."
                className="w-full bg-dark-950/80 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-foreground focus:border-amber-400/50 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* 4. Contact Details */}
            <div className="space-y-4 pt-4 border-t border-white/[0.06]">
              <label className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold block">
                04. Your Contact Information
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono text-zinc-400">Your Full Name</span>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Grace Wanjiku"
                    className="w-full bg-dark-950/80 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-foreground focus:border-amber-400/50 focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono text-zinc-400">Email Address</span>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="grace@company.com"
                    className="w-full bg-dark-950/80 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-foreground focus:border-amber-400/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-zinc-400">Company / Organization (Optional)</span>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="e.g. AgriTrade Kenya Ltd"
                  className="w-full bg-dark-950/80 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-foreground focus:border-amber-400/50 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-ochre-600 text-dark-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-warm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Brief...</span>
                </>
              ) : (
                <>
                  <span>Submit Project Brief</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
