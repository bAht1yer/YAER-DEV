"use client";

import { motion } from "framer-motion";
import GlitchText from "../../ui/GlitchText";
import { ArrowRight, MessageSquare } from "lucide-react";

export default function SpiritHero() {
    return (
        <section className="relative min-h-[80vh] flex items-center justify-center py-20 overflow-hidden">
            {/* Dark Magic Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black opacity-80" />

            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <span className="px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-mono tracking-[0.2em] uppercase mb-4 inline-block">
                        Project Spirit Vein
                    </span>
                </motion.div>

                <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tighter font-serif">
                    <span className="block text-white mb-2">ECHOES OF THE</span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400">
                        VOID
                    </span>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed font-light mb-10"
                >
                    Experience the tactical depth of a 2D Isometric RPG where <span className="text-cyan-400">shadows</span> hide more than just enemies.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    <button className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] flex items-center gap-2 group">
                        <span>View Roadmap</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-lg transition-all flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-cyan-400" />
                        <span>Join Discord</span>
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
