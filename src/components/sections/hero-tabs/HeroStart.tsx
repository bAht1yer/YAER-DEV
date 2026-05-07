"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ClipboardList, MessageSquareText, Sparkles } from "lucide-react";
import { useState } from "react";
import ContactModal from "../../ui/ContactModal";

const tracks = [
    {
        id: "audit",
        title: "AI System Audit",
        range: "3-5 days",
        summary: "Find the few AI moves worth building.",
        outputs: ["workflow map", "AI shortlist", "build plan"],
    },
    {
        id: "workflow",
        title: "Workflow Automation",
        range: "1-2 weeks",
        summary: "Automate one repeatable process end to end.",
        outputs: ["agent flow", "review UI", "ship checklist"],
    },
    {
        id: "saas",
        title: "Product Sprint",
        range: "2-4 weeks",
        summary: "Ship a focused slice: portal, dashboard, payments, or AI workflow.",
        outputs: ["usable MVP", "deployment", "handoff docs"],
    },
];

export default function HeroStart() {
    const [activeTrack, setActiveTrack] = useState(tracks[2]);
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <div className="w-full min-h-full pt-8 px-4 md:px-10 pb-20 max-w-6xl mx-auto pointer-events-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid gap-6 lg:grid-cols-[0.48fr_0.52fr]"
            >
                <div className="border border-white/15 bg-[#050505]/90 p-5 md:p-6">
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/70">Start</p>
                    <h2 className="mt-2 text-3xl md:text-5xl font-black tracking-tight text-white">
                        Pick the <span className="text-[#39FF14]">right starting point.</span>
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-gray-400">
                        Audit, automate, or ship. No long warm-up.
                    </p>

                    <div className="mt-7 space-y-3">
                        {tracks.map((track) => {
                            const selected = activeTrack.id === track.id;

                            return (
                                <button
                                    key={track.id}
                                    onClick={() => setActiveTrack(track)}
                                    className={`w-full border p-4 text-left transition-colors ${selected ? "border-[#39FF14]/60 bg-[#39FF14]/10" : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]"}`}
                                >
                                    <div className="flex items-start gap-3">
                                        <ClipboardList className={`mt-1 h-5 w-5 shrink-0 ${selected ? "text-[#39FF14]" : "text-gray-500"}`} />
                                        <div>
                                            <div className="flex flex-wrap items-center gap-3">
                                                <span className="font-bold text-white">{track.title}</span>
                                                <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500">{track.range}</span>
                                            </div>
                                            <p className="mt-2 text-xs leading-5 text-gray-400">{track.summary}</p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="border border-[#39FF14]/25 bg-[#050505]/90 shadow-[0_0_36px_rgba(57,255,20,0.08)]">
                    <div className="border-b border-[#39FF14]/20 p-5 md:p-6">
                        <div className="flex items-center gap-3">
                            <Sparkles className="h-5 w-5 text-[#39FF14]" />
                            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#39FF14]">
                                Best next move
                            </p>
                        </div>
                        <h3 className="mt-3 text-3xl font-black text-white">{activeTrack.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-gray-400">{activeTrack.summary}</p>
                    </div>

                    <div className="grid gap-4 p-5 md:grid-cols-3 md:p-6">
                        {activeTrack.outputs.map((output) => (
                            <div key={output} className="border border-white/10 bg-white/[0.03] p-4">
                                <CheckCircle2 className="h-5 w-5 text-[#39FF14]" />
                                <div className="mt-3 text-sm font-bold text-white">{output}</div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-white/10 p-5 md:p-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <a
                                href="#projects"
                                className="inline-flex items-center justify-center gap-2 border border-[#00FBFB]/40 px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-[#00FBFB] transition-colors hover:bg-[#00FBFB]/10"
                            >
                                See the work
                                <ArrowRight className="h-4 w-4" />
                            </a>
                            <button
                                onClick={() => setIsContactOpen(true)}
                                className="inline-flex items-center justify-center gap-2 bg-[#39FF14] px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-[#39FF14]/85"
                            >
                                Start conversation
                                <MessageSquareText className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </div>
    );
}
