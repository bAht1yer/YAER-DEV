"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Bot, ExternalLink, ReceiptText, Smartphone } from "lucide-react";

const cases = [
    {
        id: "bossimating",
        title: "Bossimating",
        type: "Contractor SaaS",
        url: "https://bossimating.com/",
        image: "/projects/bossimating-home.png",
        icon: ReceiptText,
        outcome: "Contractor SaaS with estimates, invoices, payments, approvals, dashboards, and AI helpers.",
        proof: ["5-minute estimates", "Trade-ready catalog", "AI inside the workflow"],
    },
    {
        id: "revamp",
        title: "Revamp Solutions",
        type: "AI Service Website",
        url: "https://www.revampsolutions.ca/",
        image: "/projects/revamp.png",
        icon: Bot,
        outcome: "Service site with a live AI support flow and clearer buying path.",
        proof: ["Live AI support", "Clear offer", "Customer-ready"],
    },
    {
        id: "digitao",
        title: "DigiTao",
        type: "AI Mobile Companion",
        url: "/projects/digitao",
        image: "/projects/digitao/home.png",
        icon: Smartphone,
        outcome: "Mobile companion for AI interpretation, bilingual recitation, and calmer study.",
        proof: ["Mobile-first", "AI interpretation", "Practice flow"],
    },
];

export default function HeroCaseFiles() {
    const [activeCase, setActiveCase] = useState(cases[0]);

    return (
        <div className="w-full min-h-full pt-8 px-4 md:px-10 pb-20 max-w-7xl mx-auto pointer-events-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid min-h-[620px] grid-cols-1 gap-6 lg:grid-cols-[0.42fr_0.58fr]"
            >
                <div className="border border-[#00FBFB]/25 bg-[#050505]/90 p-5 shadow-[0_0_36px_rgba(0,251,251,0.08)]">
                    <div className="mb-6">
                        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#00FBFB]">Case Files</p>
                        <h2 className="mt-2 text-3xl font-black tracking-tight text-white">
                            Real projects. <span className="text-[#00FBFB]">Clear proof.</span>
                        </h2>
                        <p className="mt-3 text-sm leading-6 text-gray-400">
                            Tap a case. See the product, the proof, and the useful part fast.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {cases.map((item) => {
                            const Icon = item.icon;
                            const selected = activeCase.id === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveCase(item)}
                                    className={`w-full border p-4 text-left transition-colors ${selected ? "border-[#00FBFB]/60 bg-[#00FBFB]/10" : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]"}`}
                                >
                                    <div className="flex items-start gap-3">
                                        <Icon className={`mt-1 h-5 w-5 shrink-0 ${selected ? "text-[#00FBFB]" : "text-gray-500"}`} />
                                        <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="font-bold text-white">{item.title}</span>
                                                <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500">{item.type}</span>
                                            </div>
                                            <p className="mt-2 text-xs leading-5 text-gray-400">{item.outcome}</p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="overflow-hidden border border-white/10 bg-[#050505]/90">
                    <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                        <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                            <span className="h-2.5 w-2.5 rounded-full bg-[#00FBFB]/90" />
                            <span className="ml-2 font-mono text-[11px] uppercase tracking-widest text-gray-500">
                                {activeCase.id}.case
                            </span>
                        </div>
                        <a
                            href={activeCase.url}
                            target={activeCase.url.startsWith("http") ? "_blank" : undefined}
                            rel={activeCase.url.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#00FBFB] hover:text-white"
                        >
                            Open
                            <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                    </div>

                    <div className="relative aspect-[16/9] border-b border-white/10 bg-black">
                        <Image
                            src={activeCase.image}
                            alt={`${activeCase.title} project preview`}
                            fill
                            sizes="(min-width: 1024px) 54vw, 92vw"
                            className="object-cover object-top opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#00FBFB]">{activeCase.type}</p>
                            <h3 className="mt-2 text-4xl font-black text-white">{activeCase.title}</h3>
                        </div>
                    </div>

                    <div className="grid gap-4 p-5 md:grid-cols-3">
                        {activeCase.proof.map((proof) => (
                            <div key={proof} className="border border-white/10 bg-white/[0.03] p-4">
                                <div className="font-mono text-[10px] uppercase tracking-widest text-gray-500">Shows</div>
                                <div className="mt-2 text-sm font-bold text-white">{proof}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
