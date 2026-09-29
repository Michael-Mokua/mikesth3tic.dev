"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, Loader2, ArrowUpRight, MessageSquare, Linkedin } from "lucide-react";
import { toast } from "@/components/ui/Toaster";

export function BiometricContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "New Project / Collaboration",
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
        setFormData({ name: "", email: "", subject: "New Project / Collaboration", message: "" });
        toast("Message sent successfully! I'll get back to you within 24 hours.", "success");
      } else {
        toast("Message failed to send. Please reach out directly via mikestheticdev@gmail.com", "error");
      }
    } catch {
      toast("Something went wrong. Please email directly to mikestheticdev@gmail.com", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative border-t border-white/[0.06]">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14 space-y-3"
          >
            <p className="text-xs font-mono text-amber-400 tracking-[0.3em] uppercase">
              // Get In Touch
            </p>
            <h2 className="text-3xl sm:text-5xl font-black text-foreground">
              Let&apos;s Build <span className="text-gradient">Something Remarkable.</span>
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl mx-auto">
              Have a project, job opportunity, or research collaboration in mind? Send a note below or reach out directly to my inbox.
            </p>
          </motion.div>

          {/* Contact Card with Form & Direct Details */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Direct Contact Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-5 space-y-4"
            >
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-4">
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400" />
                  Direct Inboxes
                </h3>

                <div className="space-y-3">
                  <a
                    href="mailto:mikestheticdev@gmail.com"
                    className="block p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-amber-400/30 transition-all group"
                  >
                    <p className="text-[10px] font-mono text-zinc-500 uppercase">Work / Studio</p>
                    <p className="text-xs font-mono font-bold text-amber-400 group-hover:underline">
                      mikestheticdev@gmail.com
                    </p>
                  </a>

                  <a
                    href="mailto:michaelcartelo03@gmail.com"
                    className="block p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-amber-400/30 transition-all group"
                  >
                    <p className="text-[10px] font-mono text-zinc-500 uppercase">Personal & Alternate</p>
                    <p className="text-xs font-mono text-zinc-300 group-hover:text-amber-400 group-hover:underline">
                      michaelcartelo03@gmail.com
                    </p>
                  </a>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                  Professional Channels
                </h3>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://www.linkedin.com/in/michael-mokua-251390302/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs font-medium text-zinc-300 hover:text-amber-400 hover:border-amber-400/30 transition-all"
                  >
                    <span>LinkedIn Profile</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </a>

                  <a
                    href="https://github.com/Michael-Mokua"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs font-medium text-zinc-300 hover:text-amber-400 hover:border-amber-400/30 transition-all"
                  >
                    <span>GitHub (@Michael-Mokua)</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Instant Form Side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-7 p-7 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08]"
            >
              {sent ? (
                <div className="py-12 text-center space-y-4 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Message Delivered</h3>
                  <p className="text-xs sm:text-sm text-zinc-400 max-w-sm">
                    Thank you for reaching out. I received your details and will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-4 px-5 py-2 rounded-full border border-white/10 text-xs font-mono text-zinc-300 hover:text-amber-400 hover:border-amber-400/40 transition-all"
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
                        placeholder="e.g. Alex Kimani"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-dark-950/80 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-foreground focus:border-amber-400/50 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-dark-950/80 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-foreground focus:border-amber-400/50 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                      Subject / Project Type
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Agricultural Marketplace / AI Reasoning Consultation"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-dark-950/80 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-foreground focus:border-amber-400/50 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                      Message & Requirements
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell me about what you are looking to build, timeline, and tech stack..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-dark-950/80 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-foreground focus:border-amber-400/50 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-ochre-600 text-dark-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-warm flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting...</span>
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
          </div>
        </div>
      </div>
    </section>
  );
}
