"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const phases = [
    { title: "Phase 1: Core Systems", status: "Completed", items: ["Grid Movement", "Basic AI", "Inventory UI"] },
    { title: "Phase 2: Combat Update", status: "In Progress", items: ["Ability System", "Status Effects", "Turn Timeline"] },
    { title: "Phase 3: Content Expansion", status: "Planned", items: ["New Biomes", "Boss Encounters", "Story Campaign"] }
];

export default function Roadmap() {
    return (
        <section className="py-20 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase block mb-2">PROJECT TIMELINE</span>
                <h2 className="text-3xl font-bold text-white mb-16 text-left">Development Roadmap</h2>

                <div className="relative border-l border-white/10 ml-4 space-y-12">
                    {phases.map((phase, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="relative pl-8 md:pl-12"
                        >
                            {/* Dot / Icon */}
                            <div className={`absolute left-0 top-2 flex items-center justify-center w-6 h-6 -ml-3 rounded-full border ${i === 0 ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500' : i === 1 ? 'bg-cyan-500/20 border-cyan-500 shadow-[0_0_10px_cyan]' : 'bg-gray-900 border-gray-700'}`}>
                                {i === 0 ? <Check className="w-3 h-3" /> : (i === 1 && <div className="w-2 h-2 bg-cyan-400 rounded-full" />)}
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
                                {phase.title}
                                {i === 0 && <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">COMPLETED</span>}
                                {i === 1 && <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/30">CURRENT</span>}
                            </h3>
                            <ul className="space-y-2">
                                {phase.items.map((item, idx) => (
                                    <li key={idx} className="text-gray-400 text-sm flex items-center gap-2">
                                        <span className={`w-1 h-1 rounded-full ${i === 0 ? 'bg-emerald-500' : 'bg-purple-500'}`} />
                                        <span className={i === 0 ? 'text-gray-400 line-through decoration-emerald-500/50' : ''}>{item}</span>
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
