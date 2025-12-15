"use client";

import { motion } from "framer-motion";

const phases = [
    { title: "Phase 1: Core Systems", status: "Completed", items: ["Grid Movement", "Basic AI", "Inventory UI"] },
    { title: "Phase 2: Combat Update", status: "In Progress", items: ["Ability System", "Status Effects", "Turn Timeline"] },
    { title: "Phase 3: Content Expansion", status: "Planned", items: ["New Biomes", "Boss Encounters", "Story Campaign"] }
];

export default function Roadmap() {
    return (
        <section className="py-20 px-6 relative overflow-hidden">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-16 text-center">Development Roadmap</h2>

                <div className="relative border-l border-white/10 ml-4 md:ml-12 space-y-12">
                    {phases.map((phase, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="relative pl-8 md:pl-12"
                        >
                            {/* Dot */}
                            <div className={`absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full ${i === 1 ? 'bg-cyan-400 shadow-[0_0_10px_cyan]' : 'bg-gray-600'}`} />

                            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
                                {phase.title}
                                {i === 1 && <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/30">CURRENT</span>}
                            </h3>
                            <ul className="space-y-2">
                                {phase.items.map((item, idx) => (
                                    <li key={idx} className="text-gray-400 text-sm flex items-center gap-2">
                                        <span className="w-1 h-1 bg-purple-500 rounded-full" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
