"use client";

import { motion } from "framer-motion";
import { Bot, CheckCircle2, Database, GitBranch, Lock, Rocket, Workflow } from "lucide-react";

const layers = [
    {
        icon: Workflow,
        title: "Map work",
        detail: "Turn the real process into flows, roles, approvals, and screens.",
        examples: ["estimating pipeline", "financial health", "approval records"],
    },
    {
        icon: Bot,
        title: "Add AI",
        detail: "Use AI where it saves time, with review and control still clear.",
        examples: ["support flows", "scope drafts", "punch-list helpers"],
    },
    {
        icon: Database,
        title: "Clean data",
        detail: "Structure records, permissions, history, and reporting from day one.",
        examples: ["project ledgers", "catalog items", "activity trails"],
    },
    {
        icon: Lock,
        title: "Build trust",
        detail: "Treat auth, payments, privacy, limits, and deploys as product work.",
        examples: ["secure portals", "Stripe paths", "observability"],
    },
];

const deliverySteps = [
    "Map the workflow",
    "Prototype the key screen",
    "Wire data and AI",
    "Ship a real slice",
];

export default function HeroBlueprint() {
    return (
        <div className="w-full min-h-full pt-8 px-4 md:px-10 pb-20 max-w-7xl mx-auto pointer-events-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-[#ff6b16]/30 bg-[#050505]/90 shadow-[0_0_44px_rgba(255,107,22,0.1)]"
            >
                <div className="border-b border-[#ff6b16]/20 p-5 md:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#ff8b3d]">Blueprint</p>
                            <h2 className="mt-2 max-w-3xl text-3xl md:text-5xl font-black tracking-tight text-white">
                                <span className="text-[#ff8b3d]">Workflow</span> first.
                                <span className="text-[#00FBFB]"> AI</span> where it earns its place.
                            </h2>
                        </div>
                        <div className="border border-white/10 bg-white/[0.03] px-4 py-3">
                            <div className="font-mono text-[10px] uppercase tracking-widest text-gray-500">Best fit</div>
                            <div className="mt-1 text-sm font-bold text-white">Useful internal tools</div>
                        </div>
                    </div>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-400">
                        Start with <span className="text-white">the real work</span>. Add
                        <span className="text-[#00FBFB]"> AI</span>, dependable
                        <span className="text-[#39FF14]"> data</span>, and a shippable product slice.
                    </p>
                </div>

                <div className="grid gap-0 lg:grid-cols-[0.62fr_0.38fr]">
                    <div className="grid gap-0 md:grid-cols-2">
                        {layers.map((layer) => {
                            const Icon = layer.icon;

                            return (
                                <div key={layer.title} className="border-b border-r border-white/10 p-5 md:p-6">
                                    <div className="flex items-center gap-3">
                                        <Icon className="h-5 w-5 text-[#ff6b16]" />
                                        <h3 className="text-xl font-black text-white">{layer.title}</h3>
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-gray-400">{layer.detail}</p>
                                    <div className="mt-5 space-y-2">
                                        {layer.examples.map((example) => (
                                            <div key={example} className="flex items-start gap-2 text-xs text-gray-400">
                                                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#39FF14]" />
                                                <span>{example}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="border-white/10 p-5 md:p-6 lg:border-l">
                        <div className="mb-6 flex items-center gap-3">
                            <GitBranch className="h-5 w-5 text-[#00FBFB]" />
                            <h3 className="text-xl font-black text-white">Delivery Path</h3>
                        </div>
                        <div className="space-y-4">
                            {deliverySteps.map((step, index) => (
                                <div key={step} className="flex gap-3">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#00FBFB]/30 bg-[#00FBFB]/10 font-mono text-xs text-[#00FBFB]">
                                        {index + 1}
                                    </div>
                                    <div className="border-b border-white/10 pb-4">
                                        <div className="text-sm font-bold text-white">{step}</div>
                                        <div className="mt-1 text-xs leading-5 text-gray-500">
                                            {index === 0 && "No vague automation before the work is clear."}
                                            {index === 1 && "One screen should prove the value fast."}
                                            {index === 2 && "Services should fit the product path."}
                                            {index === 3 && "A live slice beats a deck."}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <a
                            href="#projects"
                            className="mt-7 inline-flex w-full items-center justify-center gap-2 bg-[#ff6b16] px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-[#ff8b3d]"
                        >
                            See the work
                            <Rocket className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
