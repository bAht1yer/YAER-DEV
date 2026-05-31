"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, CheckCircle2, ClipboardList, MessageSquareText, Sparkles } from "lucide-react";
import Section from "../ui/Section";
import GlassCard from "../ui/GlassCard";
import ContactModal from "../ui/ContactModal";

const tracks = [
    { id: "audit", title: "AI System Audit", range: "3-5 days", summary: "Find the few AI moves worth building.", outputs: ["workflow map", "AI shortlist", "build plan"] },
    { id: "workflow", title: "Workflow Automation", range: "1-2 weeks", summary: "Automate one repeatable process end to end.", outputs: ["agent flow", "review UI", "ship checklist"] },
    { id: "saas", title: "Product Sprint", range: "2-4 weeks", summary: "Ship a focused slice: portal, dashboard, payments, or AI workflow.", outputs: ["usable MVP", "deployment", "handoff docs"] },
];

export default function WaysToStart() {
    const [active, setActive] = useState(tracks[2]);
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <Section id="ways-to-start" className="bg-transparent relative">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="h-px w-10 bg-[#34E5FF]" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#34E5FF]">Ways to start</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
                        Pick the <span className="text-[#34E5FF]">right starting point.</span>
                    </h2>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-[#8AA3AD]">Audit, automate, or ship. No long warm-up.</p>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid gap-6 lg:grid-cols-[0.48fr_0.52fr]">
                    <div className="space-y-3">
                        {tracks.map((track) => {
                            const selected = active.id === track.id;
                            return (
                                <button
                                    key={track.id}
                                    type="button"
                                    onClick={() => setActive(track)}
                                    className={`w-full rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1014] ${selected ? "border-[#34E5FF]/60 bg-[#34E5FF]/10" : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]"}`}
                                >
                                    <div className="flex items-start gap-3">
                                        <ClipboardList className={`mt-1 h-5 w-5 shrink-0 ${selected ? "text-[#34E5FF]" : "text-gray-500"}`} />
                                        <div>
                                            <div className="flex flex-wrap items-center gap-3">
                                                <span className="font-bold text-white">{track.title}</span>
                                                <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500">{track.range}</span>
                                            </div>
                                            <p className="mt-2 text-xs leading-5 text-[#8AA3AD]">{track.summary}</p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <GlassCard interactive={false} className="p-0">
                        <div className="border-b border-white/10 p-5 md:p-6">
                            <div className="flex items-center gap-3">
                                <Sparkles className="h-5 w-5 text-[#34E5FF]" />
                                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#34E5FF]">Best next move</p>
                            </div>
                            <h3 className="mt-3 text-3xl font-black text-white">{active.title}</h3>
                            <p className="mt-3 text-sm leading-7 text-[#8AA3AD]">{active.summary}</p>
                        </div>
                        <div className="grid gap-4 p-5 md:grid-cols-3 md:p-6">
                            {active.outputs.map((output) => (
                                <div key={output} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                                    <CheckCircle2 className="h-5 w-5 text-[#34E5FF]" />
                                    <div className="mt-3 text-sm font-bold text-white">{output}</div>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-white/10 p-5 md:p-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <a href="#projects" className="inline-flex items-center justify-center gap-2 rounded-md border border-[#34E5FF]/40 px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-[#34E5FF] transition-colors hover:bg-[#34E5FF]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1014]">
                                    See the work <ArrowRight className="h-4 w-4" />
                                </a>
                                <button type="button" onClick={() => setIsContactOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-md bg-[#34E5FF] px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-[#7AF0FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1014]">
                                    Start conversation <MessageSquareText className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>

                <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
            </div>
        </Section>
    );
}
