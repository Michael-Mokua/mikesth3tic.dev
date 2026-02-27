"use client";

import { motion } from "framer-motion";
import { ServiceCard, type ServiceOffering } from "@/components/services/ServiceCard";
import { BackgroundGradient } from "@/components/ui/BackgroundGradient";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";

// The massive array of 12 Founder & Architect Services
const services: ServiceOffering[] = [
    {
        id: "custom-software",
        title: "1. Custom Software Development",
        icon: "Code2",
        description: "Full-stack Web Applications, Custom Business Systems, SaaS Platforms, Admin Dashboards, API Development & Integration, and Secure Backend Architecture (Node.js, MongoDB, REST APIs).",
        bullets: [
            "Full-stack Web Applications",
            "Custom Business Systems",
            "SaaS Platforms",
            "Admin Dashboards",
            "API Development & Integration",
            "Secure Backend Architecture"
        ],
        process: [
            { step: "Requirements Gathering", detail: "Deep dive into your business logic and technical constraints." },
            { step: "Architecture Design", detail: "Structuring models, API endpoints, and scalable infrastructure." },
            { step: "Agile Development", detail: "Iterative sprints delivering functional components." },
            { step: "Deployment & Scale", detail: "Launching with CI/CD pipelines ensuring zero downtime." }
        ]
    },
    {
        id: "ai-systems",
        title: "2. AI & Intelligent Systems",
        icon: "BrainCircuit",
        description: "AI-powered advisory systems, Chatbots & virtual assistants, Predictive analytics systems, Automation tools, and Smart recommendation engines.",
        bullets: [
            "AI-powered Advisory Systems",
            "Chatbots & Virtual Assistants",
            "Predictive Analytics Systems",
            "Automation Tools",
            "Smart Recommendation Engines",
            "Business AI Integration"
        ],
        process: [
            { step: "Data Audit", detail: "Evaluating your existing data architecture for AI readiness." },
            { step: "Model Sourcing", detail: "Selecting optimal LLMs (OpenAI, Groq, local models) for the use case." },
            { step: "RAG & Fine-Tuning", detail: "Injecting enterprise context into the reasoning engine." },
            { step: "System Integration", detail: "Exposing insights via custom APIs or intuitive chat interfaces." }
        ]
    },
    {
        id: "ui-ux",
        title: "3. UI/UX & Experimental Interfaces",
        icon: "Zap",
        description: "Modern Web Design, Experimental UI Concepts, Immersive Landing Pages, Interactive Dashboards, and Product Redesign. We design digital experiences that feel futuristic.",
        bullets: [
            "Modern Web Design",
            "Experimental UI Concepts",
            "Immersive Landing Pages",
            "Interactive Dashboards",
            "Product Redesign & Optimization"
        ],
        process: [
            { step: "Wireframing", detail: "Mapping user journeys and core visual hierarchy." },
            { step: "High-Fidelity Prototyping", detail: "Crafting glassmorphic, interactive Figma prototypes." },
            { step: "Motion Design", detail: "Adding physics-based animations (Framer Motion) for spatial awareness." },
            { step: "Frontend Implementation", detail: "Translating design to pixel-perfect React/Next.js components." }
        ]
    },
    {
        id: "startup-mvp",
        title: "4. Startup & MVP Development",
        icon: "Rocket",
        description: "Idea to MVP, Rapid Prototyping, Technical Co-Founder Support, Product Architecture Planning, and Scalable System Setup for ambitious founders.",
        bullets: [
            "Idea to MVP",
            "Rapid Prototyping",
            "Technical Co-Founder Support",
            "Product Architecture Planning",
            "Scalable System Setup"
        ],
        process: [
            { step: "Product Validation", detail: "Stripping the idea down to its core value proposition." },
            { step: "Rapid Tech Stack", detail: "Selecting high-velocity tools (Next.js, Supabase) for fast scaling." },
            { step: "MVP Build", detail: "Aggressive 4-8 week development sprints for market testing." },
            { step: "Iterative Feedback", detail: "Instrumenting analytics and pivoting based on first-user data." }
        ]
    },
    {
        id: "business-systems",
        title: "5. Business Systems & Automation",
        icon: "Briefcase",
        description: "Inventory Systems, Marketplace Platforms, Financial Trackers, Internal Business Dashboards, and Workflow Automation tailored for SMEs.",
        bullets: [
            "Inventory Systems",
            "Marketplace Platforms",
            "Financial Trackers",
            "Internal Business Dashboards",
            "Workflow Automation"
        ],
        process: [
            { step: "Process Mapping", detail: "Identifying operational bottlenecks and manual workflows." },
            { step: "System Architecture", detail: "Designing relational databases to track money, goods, or users." },
            { step: "Custom Development", detail: "Building secure, role-based access portals (Admin/User/Vendor)." },
            { step: "Legacy Migration", detail: "Safely transitioning data from old spreadsheets to the new platform." }
        ]
    },
    {
        id: "system-architecture",
        title: "6. System Architecture & Consulting",
        icon: "Server",
        description: "Scalable System Architecture Design, Database Optimization, Microservices Planning, Cloud Infrastructure Strategy, and Technical Due Diligence.",
        bullets: [
            "Scalable System Design",
            "Database Optimization",
            "Microservices Planning",
            "Cloud Infrastructure Strategy",
            "Technical Due Diligence"
        ],
        process: [
            { step: "Infrastructure Audit", detail: "Locating single points of failure and performance bottlenecks." },
            { step: "Topology Redesign", detail: "Mapping monolithic structures to resilient microservices." },
            { step: "Cloud Strategy", detail: "Optimizing AWS/Vercel usage for cost and global latency." },
            { step: "Roadmap Delivery", detail: "Providing a technical blueprint for your internal teams to execute." }
        ]
    },
    {
        id: "cybersecurity",
        title: "7. Cybersecurity & Data Protection",
        icon: "Shield",
        description: "Security Audits, Penetration Testing (Ethical Hacking), Secure API Design, Data Protection Compliance, and System Hardening.",
        bullets: [
            "Security Audits",
            "Penetration Testing",
            "Secure API Design",
            "Data Protection Compliance",
            "System Hardening"
        ],
        process: [
            { step: "Vulnerability Scanning", detail: "Automated probing for known CVEs and misconfigurations." },
            { step: "Ethical Exploitation", detail: "Manual penetration testing to bypass auth and logic controls." },
            { step: "Code Review", detail: "Static analysis of the repository hunting for injection vulnerabilities." },
            { step: "Hardening Report", detail: "Delivering actionable patches to secure the perimeter." }
        ]
    },
    {
        id: "data-analytics",
        title: "8. Data & Analytics Engineering",
        icon: "BarChart3",
        description: "Business Intelligence Dashboards, Data Pipeline Setup, Custom Reporting Systems, KPI Monitoring Systems, and Performance Analytics.",
        bullets: [
            "Business Intelligence Dashboards",
            "Data Pipeline Setup",
            "Custom Reporting Systems",
            "KPI Monitoring Systems",
            "Performance Analytics"
        ],
        process: [
            { step: "Ingestion Routing", detail: "Connecting disparate raw data sources (APIs, SQL, CSVs)." },
            { step: "Pipeline Architecture", detail: "Building ETL (Extract, Transform, Load) pipelines for clean data." },
            { step: "Real-time Visualization", detail: "Designing dynamic dashboards using Recharts/D3.js." },
            { step: "Automated Reporting", detail: "Scheduling cron jobs for weekly KPI email distributions." }
        ]
    },
    {
        id: "advanced-mobile",
        title: "9. Advanced Mobile App Engineering",
        icon: "Smartphone",
        description: "Native Android Apps (Kotlin), Cross-Platform Apps, API-Connected Mobile Systems, and High-Performance UI/UX.",
        bullets: [
            "Native Android (Kotlin)",
            "Cross-Platform Interfaces",
            "API-Connected Systems",
            "High-Performance UI/UX",
            "Offline First Architecture"
        ],
        process: [
            { step: "UX Strategy", detail: "Optimizing touch targets and navigation for mobile constraints." },
            { step: "Native Development", detail: "Writing efficient, bare-metal Kotlin logic or bridging React Native." },
            { step: "State Synchronization", detail: "Ensuring offline changes sync cleanly when connectivity returns." },
            { step: "Store Deployment", detail: "Navigating Google Play Store compliance and release tracks." }
        ]
    },
    {
        id: "experimental-lab",
        title: "10. Experimental & Emerging Tech Lab",
        icon: "Activity",
        description: "Experimental Interfaces, AI + Automation Prototypes, AR/Interactive Web Experiences, and Futuristic Concept Builds.",
        bullets: [
            "Experimental Interfaces",
            "AI + Automation Prototypes",
            "AR/Interactive Web Experiences",
            "Futuristic Concept Builds"
        ],
        process: [
            { step: "Ideation Workshop", detail: "Brainstorming boundary-pushing concepts with no technical constraints." },
            { step: "Tech Spike", detail: "Rapidly validating emerging technologies (WebGL, WebXR, Local LLMs)." },
            { step: "Proof of Concept", detail: "Building a functional but unpolished prototype of the vision." },
            { step: "Refinement", detail: "Polishing the interaction design until it feels like magic." }
        ]
    },
    {
        id: "tech-retainers",
        title: "11. Tech Partnership & Retainers",
        icon: "Database",
        description: "Ongoing System Maintenance, Monthly Optimization, CTO-as-a-Service, and Startup Technical Advisory.",
        bullets: [
            "Ongoing System Maintenance",
            "Monthly Optimization",
            "CTO-as-a-Service",
            "Startup Technical Advisory"
        ],
        process: [
            { step: "Strategic Alignment", detail: "Monthly meetings to align technology goals with business objectives." },
            { step: "Proactive Monitoring", detail: "24/7 uptime monitoring and automated error reporting." },
            { step: "Codebase Stewardship", detail: "Continuous dependency updates and technical debt reduction." },
            { step: "Architectural Foresight", detail: "Planning for the next 6-12 months of scale." }
        ]
    },
    {
        id: "industry-solns",
        title: "12. Industry-Specific Solutions",
        icon: "Stethoscope",
        description: "Healthcare Advisory Systems, Architecture & Design Firm Systems, Agriculture Marketplaces, Educational Platforms, and FinTech Tracking.",
        bullets: [
            "Healthcare Advisory Systems",
            "Architecture & Design Systems",
            "Agriculture Marketplaces",
            "Financial Tracking Platforms",
            "Educational Tech"
        ],
        process: [
            { step: "Domain Immersion", detail: "Studying the specific regulatory and operational quirks of your industry." },
            { step: "Compliance Mapping", detail: "Ensuring HIPAA, GDPR, or financial compliance at the architecture level." },
            { step: "Custom Feature Dev", detail: "Building vertical-specific tools (e.g. crop pricing, patient ledgers)." },
            { step: "Specialized Launch", detail: "Rolling out the system with industry-specific onboarding." }
        ]
    }
];

export default function ServicesPage() {
    return (
        <div className="pt-32 pb-20 overflow-hidden">
            <BackgroundGradient />

            <div className="container-custom relative z-10">

                {/* Immersive Header */}
                <motion.div
                    className="max-w-3xl mb-16 md:mb-24"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-400/10 border border-electric-400/20 text-electric-400 text-xs font-mono mb-6">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>// ARCHITECTURE & ENGINEERING</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
                        We design digital experiences that feel <span className="text-gradient">futuristic.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light mt-4">
                        From rapid MVP prototyping to enterprise-grade AI architecture. I partner with ambitious founders and businesses to build intelligent, scalable, and relentlessly optimized systems.
                    </p>
                </motion.div>

                {/* The Grid of 12 Services */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-24">
                    {services.map((service, idx) => (
                        <ServiceCard key={service.id} service={service} index={idx} />
                    ))}
                </div>

                {/* High-Impact CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative rounded-3xl overflow-hidden glass border border-electric-400/30 p-8 md:p-16 text-center"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-electric-900/40 via-background to-background -z-10" />

                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to scale your idea?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg">
                        Stop managing freelancers. Partner with a technology architect to build your system right the first time.
                    </p>

                    <Link
                        href="/start-project"
                        className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-electric-400 text-dark-950 font-bold text-lg hover:bg-electric-300 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_var(--electric-400)]"
                    >
                        Start a Project
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>

            </div>
        </div>
    );
}
