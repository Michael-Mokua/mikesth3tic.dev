"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Save, Briefcase, Mail, Info } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

const sections = [
    { id: "hero", label: "Hero Section", icon: Globe },
    { id: "about", label: "About Page", icon: Info },
    { id: "services", label: "Services", icon: Briefcase },
    { id: "contact", label: "Contact Info", icon: Mail },
];

export default function ContentPage() {
    const [activeSection, setActiveSection] = useState("hero");
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-3xl">
                <div>
                    <p className="text-xs font-mono text-electric-400 uppercase tracking-widest mb-1">// CMS</p>
                    <h1 className="text-2xl font-black text-foreground">Site Content</h1>
                    <p className="text-sm text-muted-foreground mt-1">Manage your website's page content and copy</p>
                </div>

                {/* Section selector */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all border ${activeSection === section.id ? "bg-electric-400/10 text-electric-400 border-electric-400/30" : "bg-white/[0.03] text-muted-foreground border-white/[0.06] hover:border-white/20"}`}
                        >
                            <section.icon className="w-4 h-4" />
                            {section.label}
                        </button>
                    ))}
                </div>

                <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 space-y-5"
                >
                    {activeSection === "hero" && (
                        <>
                            <h2 className="text-base font-bold text-foreground">Hero Section</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-2">Headline Name</label>
                                    <input defaultValue="Michael" className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-electric-400/30 transition-all" />
                                </div>
                                <div>
                                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-2">Surname / Gradient Text</label>
                                    <input defaultValue="Mokua." className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-electric-400/30 transition-all" />
                                </div>
                                <div>
                                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-2">Slogan</label>
                                    <input defaultValue="Disrupt. Automate. Dominate." className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-electric-400/30 transition-all" />
                                </div>
                                <div>
                                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-2">Badge Label</label>
                                    <input defaultValue="Engineering the Infinite" className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-electric-400/30 transition-all" />
                                </div>
                            </div>
                        </>
                    )}
                    {activeSection === "about" && (
                        <>
                            <h2 className="text-base font-bold text-foreground">About Page</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-2">Short Bio</label>
                                    <textarea rows={4} defaultValue="I'm a Systems Architect and Full-Stack Innovator based in Nairobi, Kenya. I build intelligent systems that scale." className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-electric-400/30 transition-all resize-none" />
                                </div>
                                <div>
                                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-2">Location</label>
                                    <input defaultValue="Nairobi, Kenya 🇰🇪" className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-electric-400/30 transition-all" />
                                </div>
                            </div>
                        </>
                    )}
                    {activeSection === "services" && (
                        <>
                            <h2 className="text-base font-bold text-foreground">Services Page</h2>
                            <p className="text-sm text-muted-foreground">Edit your service offerings from the /services page. The content is managed via the ServiceCard components.</p>
                            <a href="/services" target="_blank" className="inline-flex items-center gap-2 text-electric-400 text-sm hover:underline">
                                Open Services Page →
                            </a>
                        </>
                    )}
                    {activeSection === "contact" && (
                        <>
                            <h2 className="text-base font-bold text-foreground">Contact Information</h2>
                            <div className="space-y-4">
                                {[
                                    { label: "Email", value: "mikestheticdev@gmail.com" },
                                    { label: "WhatsApp", value: "+254110254359" },
                                    { label: "GitHub", value: "https://github.com/Michael-Mokua" },
                                    { label: "Twitter/X", value: "https://twitter.com/Mikesth3tic_dev" },
                                    { label: "Instagram", value: "https://instagram.com/mikesth3tic.dev" },
                                ].map(f => (
                                    <div key={f.label}>
                                        <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-2">{f.label}</label>
                                        <input defaultValue={f.value} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-electric-400/30 transition-all" />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    <div className="flex justify-end pt-4 border-t border-white/[0.06]">
                        <button
                            onClick={handleSave}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${saved ? "bg-green-500 text-white" : "bg-electric-400 text-dark-950 hover:bg-electric-300"}`}
                        >
                            <Save className="w-4 h-4" />
                            {saved ? "Saved!" : "Save Changes"}
                        </button>
                    </div>
                </motion.div>
            </div>
        </DashboardLayout>
    );
}
