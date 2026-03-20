"use client";

import { motion } from "framer-motion";
import { Globe, Layers, Bot, Rocket } from "lucide-react";

const services = [
    {
        title: "Custom Web Apps",
        description: "High-performance systems built for modern browser architectures.",
        icon: Globe,
    },
    {
        title: "SaaS Platforms",
        description: "Multi-tenant solutions engineered for rapid scale and reliability.",
        icon: Layers,
    },
    {
        title: "AI Systems",
        description: "Intelligent agents and reasoning engines integrated into your core product.",
        icon: Bot,
    },
    {
        title: "Scalable Products",
        description: "Built-to-scale digital assets that evolve from MVP to Enterprise.",
        icon: Rocket,
    }
];

export function Services() {
    return (
        <section id="services" className="section-padding relative overflow-hidden">
            <div className="container-custom">
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-xs font-mono text-electric-400 mb-4 tracking-[0.3em] uppercase">Professional Services</p>
                    <h2 className="text-4xl md:text-6xl font-black text-foreground max-w-2xl leading-[1.05] tracking-tighter">
                        We build the <span className="text-gradient">future of software.</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, i) => (
                        <motion.div
                            key={service.title}
                            className="brutal-card p-10 flex flex-col items-start gap-8"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="w-14 h-14 rounded-2xl bg-electric-400/10 text-electric-400 flex items-center justify-center border border-electric-400/20">
                                <service.icon className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-foreground mb-4">{service.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
