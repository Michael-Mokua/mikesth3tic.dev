"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPage() {
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
                        <Shield className="w-3.5 h-3.5" />
                        <span>// DATA PROTECTION</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black mb-4">Privacy <span className="text-gradient">Policy.</span></h1>
                    <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest mb-12">Last Updated: {lastUpdated}</p>

                    <div className="glass p-8 md:p-12 rounded-[2rem] border border-white/5 space-y-12 text-muted-foreground leading-relaxed">

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                                <Lock className="w-5 h-5 text-electric-400" />
                                1. Commitment to Privacy
                            </h2>
                            <p>
                                At MIKESTH3TIC.DEV, we prioritize the security and confidentiality of your data. This policy outlines how we handle information collected through our systems, AI interfaces, and project inquiry forms. We do not sell your personal data. Period.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                                <Eye className="w-5 h-5 text-electric-400" />
                                2. Information We Collect
                            </h2>
                            <div className="space-y-3">
                                <p><span className="text-foreground font-semibold">User-Provided Information:</span> Data submitted via the "Start a Project" or "Contact" forms (Name, Email, Project Details).</p>
                                <p><span className="text-foreground font-semibold">AI Interaction Data:</span> Conversations with MikeAI are stored sessionally to improve response accuracy. These are not linked to your identity unless you voluntarily provide it.</p>
                                <p><span className="text-foreground font-semibold">Technical Data:</span> Minimal telemetry (IP address, browser type) to ensure system stability and combat malicious activity.</p>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                                <FileText className="w-5 h-5 text-electric-400" />
                                3. How We Use Data
                            </h2>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>To architect and propose software solutions based on your inquiries.</li>
                                <li>To provide intelligent assistance via our AI chatbot.</li>
                                <li>To maintain the security and integrity of our digital infrastructure.</li>
                                <li>To comply with legal obligations where applicable.</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                                <Shield className="w-5 h-5 text-electric-400" />
                                4. Third-Party Services
                            </h2>
                            <p>
                                We use industry-standard providers to power our platform, including <strong>Resend</strong> for email communications and <strong>Groq/OpenAI</strong> for AI processing. Data sent to these providers is encrypted and handled according to their respective privacy standards.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                                5. Your Rights
                            </h2>
                            <p>
                                You have the right to request the deletion of any personal data submitted through our forms. Contact us at <span className="text-electric-400">mikestheticdev@gmail.com</span> for any data-related inquiries.
                            </p>
                        </section>

                    </div>
                </motion.div>
            </div>
        </div>
    );
}
