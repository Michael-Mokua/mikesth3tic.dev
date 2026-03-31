import { IntelCards } from "@/components/ui/IntelCards";
import { IntelDeck } from "@/components/ui/IntelDeck";
import { Terminal, Shield, Database, Cpu } from "lucide-react";

export const metadata = {
    title: "Intel Vault | mikesth3tic.dev",
    description: "Classified directives, systems architecture, and core research documents.",
};

export default function IntelVaultPage() {
    return (
        <div className="relative min-h-screen pt-32 pb-20 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-electric-400/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-neon-400/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/2" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] pointer-events-none" />

            <div className="container-custom relative z-10">
                <header className="mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-400/10 border border-electric-400/20 text-electric-400 text-xs font-mono font-bold uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(0,212,255,0.2)]">
                        <Terminal className="w-4 h-4" />
                        <span>Secure Terminal Connection Established</span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter uppercase text-white scale-y-90">
                        Intel <span className="text-gradient">Vault</span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg text-muted-foreground font-mono leading-relaxed mb-12">
                        Strategic directives and technical blueprints for the studio's next-generation systems.
                    </p>
                </header>

                {/* The 3D Component */}
                <div className="mb-24">
                    <IntelDeck />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 opacity-50">
                    <div className="p-8 glass border border-white/5 rounded-3xl flex flex-col items-center text-center">
                        <Shield className="w-8 h-8 text-electric-400 mb-4" />
                        <h4 className="font-bold mb-2">Immutable Directives</h4>
                        <p className="text-xs text-muted-foreground font-mono">Foundational philosophy and studio operational guidelines.</p>
                    </div>
                    <div className="p-8 glass border border-white/5 rounded-3xl flex flex-col items-center text-center">
                        <Database className="w-8 h-8 text-electric-400 mb-4" />
                        <h4 className="font-bold mb-2">System blue_prints</h4>
                        <p className="text-xs text-muted-foreground font-mono">High-performance architecture and infrastructure topologies.</p>
                    </div>
                    <div className="p-8 glass border border-white/5 rounded-3xl flex flex-col items-center text-center">
                        <Cpu className="w-8 h-8 text-electric-400 mb-4" />
                        <h4 className="font-bold mb-2) active_modules">Active_modules</h4>
                        <p className="text-xs text-muted-foreground font-mono">AI research pathways and agentic synthesis portfolios.</p>
                    </div>
                </div>

                <IntelCards />

                {/* Secure connection footer */}
                <div className="mt-32 pt-10 border-t border-white/5 text-center flex flex-col items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-electric-400 mb-4 animate-pulse shadow-[0_0_10px_#00d4ff]" />
                    <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em]">
                        Connection Encrypted · Activity Logged
                    </p>
                </div>
            </div>
        </div>
    );
}
