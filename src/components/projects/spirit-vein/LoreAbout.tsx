"use client";

import { motion } from "framer-motion";

export default function LoreAbout() {
    return (
        <section className="py-20 px-6 relative">
            <div className="max-w-4xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-3xl font-serif text-white mb-8"
                >
                    The World of Aethos
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-gray-400 text-lg leading-loose"
                >
                    In a world where the sun has fractured, civilization clings to the
                    <span className="text-purple-400"> Spirit Veins</span>—ancient conduits of magical energy.
                    As a Commander of the Bastion, you must navigate the treacherous Fog,
                    secure resources, and fend off the Voidborn horrors that lurk in the shadows.
                </motion.p>
                <div className="mt-12 h-px w-32 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mx-auto" />
            </div>
        </section>
    );
}
