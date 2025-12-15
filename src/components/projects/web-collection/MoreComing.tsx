"use client";

import { motion } from "framer-motion";

export default function MoreComing() {
    return (
        <div className="py-24 flex flex-col items-center justify-center gap-6">
            <div className="flex flex-col gap-3">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0.2 }}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: "easeInOut"
                        }}
                        className="w-1.5 h-1.5 rounded-full bg-primary"
                    />
                ))}
            </div>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-gray-500 font-mono text-sm tracking-[0.2em] uppercase"
            >
                More Projects Initializing...
            </motion.p>
        </div>
    );
}
