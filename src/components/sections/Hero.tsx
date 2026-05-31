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
    "5-MIN ESTIMATES",
    "TORONTO",
];

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
                    {/* status chip */}
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#34E5FF]/40 bg-[#34E5FF]/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7AF0FF]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#34E5FF] shadow-[0_0_8px_#34E5FF]" />
                        System Online · Toronto · Available
                    </span>

                    <h1 className="mt-7 text-5xl sm:text-6xl md:text-7xl font-black leading-[0.95] tracking-tight text-white">
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
                            onClick={() => setIsContactOpen(true)}
                            className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-b from-[#7AF0FF] to-[#2BC3E0] px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#04181d] shadow-[0_0_20px_rgba(52,229,255,0.4)] transition-transform hover:scale-[1.03]"
                        >
                            Start a project
                            <Send className="h-4 w-4" />
                        </button>
                        <a
                            href="#projects"
                            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#CBD2D9] transition-colors hover:border-[#34E5FF]/50 hover:text-white"
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
                                className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8AA3AD]"
                            >
                                <span className="mr-2 text-[#34E5FF]">/</span>{s}
                            </span>
                        ))}
                    </div>
                </GlassCard>
            </motion.div>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </section>
    );
}
