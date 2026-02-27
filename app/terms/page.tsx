"use client";

import { motion } from "framer-motion";
import { Scale, FileCode, Zap, AlertTriangle } from "lucide-react";

export default function TermsPage() {
    const lastUpdated = "February 28, 2026";

    return (
        <div className="pt-32 pb-20 min-h-screen">
            <div className="container-custom max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-400/10 border border-electric-400/20 text-electric-400 text-xs font-mono mb-6">
                        <Scale className="w-3.5 h-3.5" />
                        <span>// LEGAL FRAMEWORK</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black mb-4">Terms of <span className="text-gradient">Service.</span></h1>
                    <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest mb-12">Last Updated: {lastUpdated}</p>

                    <div className="glass p-8 md:p-12 rounded-[2rem] border border-white/5 space-y-12 text-muted-foreground leading-relaxed">

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                                <FileCode className="w-5 h-5 text-electric-400" />
                                1. Acceptance of Terms
                            </h2>
                            <p>
                                By accessing MIKESTH3TIC.DEV, using MikeAI, or submitting inquiries through our platform, you agree to be bound by these terms. If you do not agree, please terminate your session immediately. These terms apply to all visitors, users, and clients of MIKESTH3TIC.DEV.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                                <Zap className="w-5 h-5 text-electric-400" />
                                2. Intellectual Property
                            </h2>
                            <p>
                                All code architectures, visual designs, AI models (MikeAI), and original content on this platform are the exclusive intellectual property of <strong>Michael Ogutu</strong> (Founder of MIKESTH3TIC.DEV) and are protected by applicable copyright and trademark laws. Unauthorized replication or distribution is strictly prohibited.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-electric-400" />
                                3. AI Disclaimer (MikeAI)
                            </h2>
                            <div className="space-y-3">
                                <p>MikeAI is an experimental intelligent interface. While we strive for accuracy, the AI may provide responses that are incorrect, incomplete, or outdated. MIKESTH3TIC.DEV is not liable for actions taken based on MikeAI's outputs. Use common sense and verify critical technical information.</p>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                                4. Client Engagement
                            </h2>
                            <p>
                                Submitting a project inquiry through the "Start a Project" flow does not constitute a legally binding contract for service. Formal engagements require a signed Statement of Work (SOW) and deep architectural alignment.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                                5. Limitation of Liability
                            </h2>
                            <p>
                                In no event shall MIKESTH3TIC.DEV or its founder be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use this platform or its AI systems.
                            </p>
                        </section>

                        <section className="space-y-4 border-t border-white/5 pt-8">
                            <h2 className="text-lg font-bold text-foreground">Contact Legal</h2>
                            <p>
                                For questions regarding these terms, contact <span className="text-electric-400">mikestheticdev@gmail.com</span> with the subject line "Legal Inquiry".
                            </p>
                        </section>

                    </div>
                </motion.div>
            </div>
        </div>
    );
}
