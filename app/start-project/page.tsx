"use client";

import { motion } from "framer-motion";
import { BackgroundGradient } from "@/components/ui/BackgroundGradient";
import { ProjectInquiryForm } from "@/components/forms/ProjectInquiryForm";
import { Terminal } from "lucide-react";

export default function StartProjectPage() {
    return (
        <div className="pt-32 pb-20 min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
            <BackgroundGradient />

            <div className="container-custom relative z-10 w-full">

                {/* Header Section */}
                <motion.div
                    className="max-w-3xl mx-auto text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-400/10 border border-electric-400/20 text-electric-400 text-xs font-mono mb-6 mx-auto">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>// NEW INITIATIVE</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                        Let's build the <span className="text-gradient">future.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light mt-4">
                        Quality architecture requires deep alignment. Fill out the brief below and I will get back to you within 24-48 hours.
                    </p>
                </motion.div>

                {/* The Form */}
                <ProjectInquiryForm />

            </div>
        </div>
    );
}
