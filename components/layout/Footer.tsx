"use client";

import Link from "next/link";
import { Github, Twitter, Instagram, Mail, ArrowUp, Linkedin, Send } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const socialLinks = [
  { href: "https://www.linkedin.com/in/michael-mokua-251390302/", label: "LinkedIn", icon: Linkedin },
  { href: "https://github.com/Michael-Mokua", label: "GitHub", icon: Github },
  { href: "https://twitter.com/Mikesth3tic_dev", label: "X / Twitter", icon: Twitter },
  { href: "https://instagram.com/whoismichaia", label: "Instagram", icon: Instagram },
];

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Work & Case Studies", href: "/projects" },
  { label: "About & Story", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Now", href: "/now" },
  { label: "Resume (PDF)", href: "/resume" },
  { label: "Get in Touch", href: "/contact" },
];

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-white/[0.08] bg-dark-950/90 mt-auto">
      {/* Top warm gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <Logo />
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-md">
              Full-stack developer and AI systems builder from Nairobi, Kenya. Founder of{" "}
              <span className="text-amber-400 font-semibold">MIKESTH3TIC.DEV</span>. Rooted in an agricultural background, engineering Africa-first digital platforms with Next.js, Python, and Claude API.
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 pt-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Nairobi, Kenya 🇰🇪 · Disrupt. Automate. Dominate.</span>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-4">
              // Navigation
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-amber-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Emails Column */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-4">
              // Direct Inquiries
            </h3>
            <div className="space-y-2 text-sm">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <p className="text-[11px] font-mono text-zinc-500 uppercase">Work / Studio Inquiries</p>
                <a
                  href="mailto:mikestheticdev@gmail.com"
                  className="font-mono text-xs text-amber-300 hover:underline flex items-center gap-1.5 mt-0.5"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  mikestheticdev@gmail.com
                </a>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <p className="text-[11px] font-mono text-zinc-500 uppercase">Personal & Collaborations</p>
                <a
                  href="mailto:michaelcartelo03@gmail.com"
                  className="font-mono text-xs text-zinc-300 hover:text-amber-400 hover:underline flex items-center gap-1.5 mt-0.5"
                >
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  michaelcartelo03@gmail.com
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-amber-400 hover:border-amber-400/30 transition-all hover:scale-105"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500 text-center sm:text-left">
            © {new Date().getFullYear()} Michael Ogutu Mokua. Built with Next.js & Tailwind CSS in Nairobi.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-amber-400 p-2 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-amber-400/30 transition-all"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
