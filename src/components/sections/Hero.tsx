"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Send } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import ContactModal from "../ui/ContactModal";

/**
 * Hero — Cyan Chrome single-focused build.
 * No tab switcher. One glass card: status chip, headline, subhead,
 * one primary CTA (Start a project), one quiet secondary (See work),
 * and a HUD stat-readout strip.
 */
const stats = [
    "IN PRODUCTION",
    "TORONTO",
];

/**
 * Mini CN Tower glyph — recognizable Toronto silhouette (wide pod over a
 * tapered body). Inherits color via `currentColor`.
 */
function CNTowerGlyph({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 16 24" className={className} fill="currentColor" aria-hidden="true">
            <rect x="7.6" y="0" width="0.8" height="5" />
            <polygon points="7.2,7 8.8,7 8.4,4 7.6,4" />
            <ellipse cx="8" cy="8" rx="3.6" ry="1.4" />
            <ellipse cx="8" cy="9.6" rx="2.6" ry="0.7" opacity="0.85" />
            <polygon points="7.2,11 8.8,11 9.6,22 6.4,22" />
            <rect x="5.6" y="22" width="4.8" height="2" />
        </svg>
    );
}

export default function Hero() {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <section
            id="about"
            className="relative min-h-screen w-full bg-transparent flex items-center justify-center px-4 pt-28 pb-20 md:pt-32"
        >
            <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full max-w-3xl"
            >
                <GlassCard className="px-6 py-10 sm:px-12 sm:py-14 text-center">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[0.95] tracking-tight text-white">
                        AI systems<br />
                        <span className="text-[#34E5FF] drop-shadow-[0_0_18px_rgba(52,229,255,0.5)]">
                            that ship.
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#8AA3AD] md:text-lg">
                        SaaS, internal tools &amp; lead systems running in
                        <span className="text-[#CBD2D9]"> production</span> — not just demos.
                    </p>

                    <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <button
                            type="button"
                            onClick={() => setIsContactOpen(true)}
                            className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-b from-[#7AF0FF] to-[#2BC3E0] px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#04181d] shadow-[0_0_20px_rgba(52,229,255,0.4)] transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1014]"
                        >
                            Start a project
                            <Send className="h-4 w-4" />
                        </button>
                        <a
                            href="#projects"
                            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#CBD2D9] transition-colors hover:border-[#34E5FF]/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1014]"
                        >
                            See work
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>

                    {/* HUD stat-readout strip */}
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-white/10 pt-6">
                        {stats.map((s) => (
                            <span
                                key={s}
                                className="inline-flex items-center font-mono text-[10px] uppercase tracking-[0.24em] text-[#8AA3AD]"
                            >
                                <span className="mr-2 text-[#34E5FF]">/</span>
                                {s === "TORONTO" && (
                                    <CNTowerGlyph className="mr-1.5 h-3.5 w-2.5 text-[#34E5FF]" />
                                )}
                                {s}
                            </span>
                        ))}
                    </div>
                </GlassCard>
            </motion.div>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </section>
    );
}
