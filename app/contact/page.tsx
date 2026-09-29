"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Github, Twitter, Instagram, Linkedin, ArrowUpRight, Loader2, CheckCircle2, Phone, MapPin } from "lucide-react";
import { toast } from "@/components/ui/Toaster";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSent(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        toast("Message sent successfully! I'll get back to you within 24 hours.", "success");
      } else {
        toast("Failed to send message. Please reach out directly to mikestheticdev@gmail.com", "error");
      }
    } catch {
      toast("An error occurred. Please email directly to mikestheticdev@gmail.com", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="mb-14 text-center max-w-3xl mx-auto space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-xs font-mono text-amber-400 tracking-[0.3em] uppercase">// Direct Inquiries</p>
          <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight">
            Let&apos;s Build <span className="text-gradient">Together.</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl mx-auto">
            Have a project in mind, an engineering opportunity, or questions about my software architectures? My inbox is always open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.08]"
          >
            {sent ? (
              <div className="text-center py-12 flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Message Delivered!</h2>
                <p className="text-sm text-zinc-400 max-w-xs leading-relaxed">
                  Thanks for reaching out! I will review your message and respond within 24 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 px-6 py-2.5 rounded-full border border-white/10 hover:border-amber-400/30 text-xs font-mono text-zinc-300 hover:text-amber-400 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Kimani"
                      className="w-full bg-dark-950/80 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-foreground focus:border-amber-400/50 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@example.com"
                      className="w-full bg-dark-950/80 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-foreground focus:border-amber-400/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Full-Stack Contract / Architecture Consulting"
                    className="w-full bg-dark-950/80 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-foreground focus:border-amber-400/50 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, timeline, and goals..."
                    className="w-full bg-dark-950/80 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-foreground focus:border-amber-400/50 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-ochre-600 text-dark-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-warm disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Socials & Direct Info Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Direct Email Cards */}
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                // Direct Emails
              </h3>
              <div className="space-y-3">
                <a
                  href="mailto:mikestheticdev@gmail.com"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-amber-400/30 transition-all group"
                >
                  <div>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase">Work / Studio</p>
                    <p className="text-xs font-mono font-bold text-amber-400 group-hover:underline">
                      mikestheticdev@gmail.com
                    </p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 transition-colors" />
                </a>

                <a
                  href="mailto:michaelcartelo03@gmail.com"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-amber-400/30 transition-all group"
                >
                  <div>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase">Personal & Collaborations</p>
                    <p className="text-xs font-mono text-zinc-300 group-hover:text-amber-400 group-hover:underline">
                      michaelcartelo03@gmail.com
                    </p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 transition-colors" />
                </a>
              </div>
            </div>

            {/* Social Channels */}
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                // Professional Networks
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/michael-mokua-251390302/" },
                  { icon: Github, label: "GitHub", href: "https://github.com/Michael-Mokua" },
                  { icon: Twitter, label: "X / Twitter", href: "https://twitter.com/Mikesth3tic_dev" },
                  { icon: Instagram, label: "Instagram", href: "https://instagram.com/whoismichaia" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-amber-400/30 text-xs font-mono text-zinc-300 hover:text-amber-400 transition-all"
                  >
                    <s.icon className="w-3.5 h-3.5" />
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Location & Timezone */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 via-white/[0.02] to-transparent border border-white/[0.08] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Nairobi, Kenya (East Africa Time · GMT+3)</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Available for local Kenyan engagements and remote global client collaborations.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
