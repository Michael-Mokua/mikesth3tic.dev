"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
    Send, ArrowRight, ArrowLeft, Loader2, CheckCircle2,
    Globe, Smartphone, Brain, Zap, ShoppingCart, BarChart2,
    Clock, DollarSign, MapPin, Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

type ProjectFormData = {
    name: string;
    email: string;
    phone: string;
    company: string;
    location: string;
    projectType: string;
    platform: string;
    budget: string;
    timeline: string;
    teamSize: string;
    hasExistingSystem: string;
    description: string;
    referral: string;
    priority: string;
    successMetrics: string;
};

const PROJECT_TYPES = [
    { label: "Web / SaaS Application", icon: Globe },
    { label: "AI & Intelligent Systems", icon: Brain },
    { label: "Mobile App (Android/iOS)", icon: Smartphone },
    { label: "Business Automation", icon: Zap },
    { label: "E-Commerce Platform", icon: ShoppingCart },
    { label: "Data & Analytics Dashboard", icon: BarChart2 },
];

// KSH budget ranges
const BUDGET_RANGES = [
    "Below KSH 50,000",
    "KSH 50,000 – 150,000",
    "KSH 150,000 – 500,000",
    "KSH 500,000 – 1,000,000",
    "KSH 1,000,000 – 5,000,000",
    "KSH 5,000,000+ (Enterprise)",
];

const TIMELINES = [
    { label: "ASAP — Under 2 weeks", icon: "🔥" },
    { label: "1 – 3 Months", icon: "⚡" },
    { label: "3 – 6 Months", icon: "🚀" },
    { label: "6+ Months / Long-term", icon: "🌍" },
    { label: "Flexible — Open to discussion", icon: "🤝" },
];

const TEAM_SIZES = ["Just me (Solo founder)", "2–5 people", "6–20 people", "20+ people / Corporate"];
const EXISTING_SYSTEM = ["Starting from scratch", "Upgrading existing system", "Integrating with existing tools", "Not sure yet"];
const REFERRALS = ["Google / Search", "LinkedIn", "Twitter / X", "Friend / Word of mouth", "GitHub", "Other"];
const TECHNICAL_PRIORITIES = ["Speed & Performance", "Security & Encryption", "AI Intelligence", "Scalability", "User Experience"];

const TOTAL_STEPS = 4;

export function ProjectInquiryForm() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { toast } = useToast();

    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<ProjectFormData>({
        defaultValues: {
            projectType: "",
            platform: "",
            budget: "",
            timeline: "",
            teamSize: "",
            hasExistingSystem: "",
            referral: "",
            priority: "",
            successMetrics: "",
        }
    });

    const onSubmit = async (data: ProjectFormData) => {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    subject: `NEW PROJECT INQUIRY: ${data.company || data.name} — ${data.projectType}`,
                    message: `
📌 PROJECT INQUIRY BRIEF
━━━━━━━━━━━━━━━━━━━━━━━

👤 CONTACT INFO
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "N/A"}
Company: ${data.company || "N/A"}
Location: ${data.location || "N/A"}

🏗️ PROJECT DETAILS
Type: ${data.projectType}
Budget Range: ${data.budget}
Timeline: ${data.timeline}
Team Size: ${data.teamSize}
Existing System: ${data.hasExistingSystem}

📝 BRIEF
${data.description}

🔗 HOW THEY FOUND ME: ${data.referral || "Not specified"}
⚡ TECHNICAL PRIORITY: ${data.priority || "Not specified"}
📈 SUCCESS METRICS: ${data.successMetrics || "Not specified"}
                    `,
                }),
            });

            if (!response.ok) throw new Error("Failed to send inquiry");
            setIsSuccess(true);
        } catch {
            toast({
                title: "Error",
                description: "Something went wrong. Please email me directly at mikestheticdev@gmail.com",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-3xl p-12 md:p-16 border border-electric-400/30 text-center relative overflow-hidden max-w-2xl mx-auto"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-electric-400/10 to-transparent pointer-events-none" />
                <div className="w-20 h-20 rounded-full bg-electric-400/10 border border-electric-400/20 flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 className="w-10 h-10 text-electric-400" />
                </div>
                <h3 className="text-3xl font-black mb-4 text-foreground">Brief Received. 🚀</h3>
                <p className="text-muted-foreground text-lg mb-8">
                    I will review your requirements and respond within 24–48 hours to kick off the architecture discussion.
                </p>
                <button
                    onClick={() => window.location.href = "/"}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors font-medium text-foreground"
                >
                    Return to Home
                </button>
            </motion.div>
        );
    }

    // Reusable option pill button
    const OptionPill = ({ value, fieldName, label, icon }: { value: string; fieldName: keyof ProjectFormData; label?: string; icon?: string }) => {
        const active = watch(fieldName) === value;
        return (
            <button
                type="button"
                onClick={() => setValue(fieldName, value)}
                className={cn(
                    "p-3 rounded-xl border text-sm text-left transition-all font-medium",
                    active
                        ? "border-electric-400 bg-electric-400/10 text-electric-400"
                        : "border-white/[0.08] bg-white/[0.02] text-foreground hover:bg-white/[0.05] hover:border-white/20"
                )}
            >
                {icon && <span className="mr-1.5">{icon}</span>}
                {label ?? value}
            </button>
        );
    };

    return (
        <div className="max-w-2xl mx-auto relative">
            <div className="glass rounded-3xl p-6 md:p-10 border border-white/[0.06] relative z-20">
                {/* Progress */}
                <div className="mb-8">
                    <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-2 uppercase tracking-widest">
                        <span>Step {step} of {TOTAL_STEPS}</span>
                        <span>{Math.round((step / TOTAL_STEPS) * 100)}% complete</span>
                    </div>
                    <div className="flex gap-2">
                        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "h-1.5 flex-1 rounded-full transition-all duration-500",
                                    step > i ? "bg-electric-400" : "bg-white/[0.06]"
                                )}
                            />
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 min-h-[440px] flex flex-col">
                    <AnimatePresence mode="wait">

                        {/* STEP 1: Personal Details */}
                        {step === 1 && (
                            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5 flex-1">
                                <div>
                                    <h3 className="text-2xl font-bold mb-1 text-foreground">Let's get acquainted.</h3>
                                    <p className="text-muted-foreground text-sm">Tell me who you are and how to reach you.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Full Name *</label>
                                        <input
                                            {...register("name", { required: true })}
                                            className="w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-electric-400 focus:bg-electric-400/5 transition-all outline-none"
                                            placeholder="John Kamau"
                                        />
                                        {errors.name && <span className="text-xs text-red-400">Name is required</span>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Email Address *</label>
                                        <input
                                            type="email"
                                            {...register("email", { required: true })}
                                            className="w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-electric-400 focus:bg-electric-400/5 transition-all outline-none"
                                            placeholder="john@company.com"
                                        />
                                        {errors.email && <span className="text-xs text-red-400">Email is required</span>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Phone / WhatsApp</label>
                                        <input
                                            {...register("phone")}
                                            className="w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-electric-400 focus:bg-electric-400/5 transition-all outline-none"
                                            placeholder="+254 700 000 000"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Company / Organisation</label>
                                        <input
                                            {...register("company")}
                                            className="w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-electric-400 focus:bg-electric-400/5 transition-all outline-none"
                                            placeholder="Acme Corp (optional)"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-1.5"><MapPin className="w-3 h-3" /> Location / City</label>
                                    <input
                                        {...register("location")}
                                        className="w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-electric-400 focus:bg-electric-400/5 transition-all outline-none"
                                        placeholder="Nairobi, Kenya"
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2: Project Type */}
                        {step === 2 && (
                            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5 flex-1">
                                <div>
                                    <h3 className="text-2xl font-bold mb-1 text-foreground">What are we building?</h3>
                                    <p className="text-muted-foreground text-sm">Select the primary type of system you need.</p>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Project Category *</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {PROJECT_TYPES.map(({ label, icon: Icon }) => {
                                            const active = watch("projectType") === label;
                                            return (
                                                <button
                                                    key={label}
                                                    type="button"
                                                    onClick={() => setValue("projectType", label)}
                                                    className={cn(
                                                        "p-3 rounded-xl border text-sm text-left transition-all flex items-center gap-3",
                                                        active
                                                            ? "border-electric-400 bg-electric-400/10 text-electric-400 font-medium"
                                                            : "border-white/[0.08] bg-white/[0.02] text-foreground hover:bg-white/[0.05] hover:border-white/20"
                                                    )}
                                                >
                                                    <Icon className="w-4 h-4 shrink-0" />
                                                    {label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <input type="hidden" {...register("projectType", { required: true })} />
                                    {errors.projectType && <span className="text-xs text-red-400">Please select a project type</span>}
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-1.5"><Users className="w-3 h-3" /> Team Size</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {TEAM_SIZES.map((t) => <OptionPill key={t} value={t} fieldName="teamSize" />)}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Existing System?</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {EXISTING_SYSTEM.map((e) => <OptionPill key={e} value={e} fieldName="hasExistingSystem" />)}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 3: Timeline & Budget */}
                        {step === 3 && (
                            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 flex-1">
                                <div>
                                    <h3 className="text-2xl font-bold mb-1 text-foreground">Timeline & Budget.</h3>
                                    <p className="text-muted-foreground text-sm">Budget is in Kenyan Shillings (KSH). Be honest — it helps me propose the right solution.</p>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-1.5"><DollarSign className="w-3 h-3" /> Estimated Budget (KSH) *</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {BUDGET_RANGES.map((b) => <OptionPill key={b} value={b} fieldName="budget" />)}
                                    </div>
                                    <input type="hidden" {...register("budget", { required: true })} />
                                    {errors.budget && <span className="text-xs text-red-400">Please select a budget range</span>}
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-1.5"><Clock className="w-3 h-3" /> Desired Timeline *</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {TIMELINES.map(({ label, icon }) => <OptionPill key={label} value={label} fieldName="timeline" label={label} icon={icon} />)}
                                    </div>
                                    <input type="hidden" {...register("timeline", { required: true })} />
                                    {errors.timeline && <span className="text-xs text-red-400">Please select a timeline</span>}
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 4: Strategic Priorities & Submit */}
                        {step === 4 && (
                            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 flex-1">
                                <div>
                                    <h3 className="text-2xl font-bold mb-1 text-foreground">Strategic Priorities.</h3>
                                    <p className="text-muted-foreground text-sm">Help me understand what matters most for your system.</p>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Primary Technical Priority</label>
                                    <div className="flex flex-wrap gap-2">
                                        {TECHNICAL_PRIORITIES.map((p) => <OptionPill key={p} value={p} fieldName="priority" />)}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">What does success look like?</label>
                                    <input
                                        {...register("successMetrics")}
                                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-electric-400 focus:bg-electric-400/5 transition-all outline-none"
                                        placeholder="e.g. 10k active users, automated billing..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Project Brief *</label>
                                    <textarea
                                        {...register("description", { required: true })}
                                        rows={4}
                                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-electric-400 focus:bg-electric-400/5 transition-all outline-none resize-none"
                                        placeholder="Describe your vision, key features, and any technical context..."
                                    />
                                    {errors.description && <span className="text-xs text-red-400">Please provide a brief description</span>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">How did you find me?</label>
                                    <div className="flex flex-wrap gap-2">
                                        {REFERRALS.map((r) => <OptionPill key={r} value={r} fieldName="referral" />)}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-6 border-t border-white/[0.06] mt-auto">
                        {step > 1 ? (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="p-3 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] text-muted-foreground hover:text-foreground transition-all flex items-center gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span className="text-sm font-medium hidden sm:inline">Back</span>
                            </button>
                        ) : <div />}

                        {step < TOTAL_STEPS ? (
                            <button
                                type="button"
                                onClick={() => {
                                    if (step === 1 && (!watch("name") || !watch("email"))) return;
                                    if (step === 2 && !watch("projectType")) return;
                                    nextStep();
                                }}
                                className="px-6 py-3 rounded-xl bg-electric-400 text-dark-950 font-bold hover:bg-electric-300 transition-all flex items-center gap-2 ml-auto"
                            >
                                Continue
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-3 rounded-xl bg-electric-400 text-dark-950 font-bold hover:bg-electric-300 transition-all flex items-center gap-2 disabled:opacity-50 ml-auto shadow-[0_0_30px_-5px_var(--electric-400)]"
                            >
                                {isSubmitting ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" />Submitting...</>
                                ) : (
                                    <>Submit Brief<Send className="w-4 h-4" /></>
                                )}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
