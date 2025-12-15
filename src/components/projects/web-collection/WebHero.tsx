"use client";

import { motion } from "framer-motion";
import GlitchText from "../../ui/GlitchText";

export default function WebHero() {
    return (
        <section className="relative min-h-[60vh] flex items-center justify-center py-20 overflow-hidden">
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-6 inline-block"
                >
                    <span className="px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono mb-4 inline-block">
                        PRODUCTION READY
                    </span>
                </motion.div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                    <GlitchText text1="Full Stack" text2="Web Suite" className="text-white" />
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                >
                    A collection of deployed applications demonstrating versatility in E-commerce, <span className="text-primary">AI Integration</span>, SaaS Platforms, and Interactive Gaming.
                </motion.p>
            </div>

            {/* Background Elements handled globally by page wrapper, but adding local glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full opacity-20 pointer-events-none" />
        </section>
    );
}
