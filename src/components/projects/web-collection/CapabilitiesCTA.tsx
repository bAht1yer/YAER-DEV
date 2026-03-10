"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code, Cpu, Globe, Lock } from "lucide-react";
import { useState } from "react";
import ContactModal from "../../ui/ContactModal";

const capabilities = [
    { icon: Globe, label: "SEO Optimized" },
    { icon: Cpu, label: "AI Integration" },
    { icon: Lock, label: "Secure Auth" },
    { icon: Code, label: "Modern Stack" },
];

export default function CapabilitiesCTA() {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <section className="py-20 px-6 relative overflow-hidden">
            <div className="max-w-5xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl font-bold mb-8">Summary of Capabilities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
                        {capabilities.map((cap, i) => (
                            <div key={i} className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                                <cap.icon className="w-6 h-6 text-primary" />
                                <span className="text-sm font-mono text-gray-300">{cap.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative p-12 rounded-2xl border border-primary/20 bg-primary/5 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-primary/5 blur-3xl opacity-20 pointer-events-none" />

                    <h3 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">Have a Vision?</h3>
                    <p className="text-gray-400 max-w-xl mx-auto mb-8 relative z-10">
                        From simple landing pages to complex AI integrated platforms, I can bring your digital presence to life.
                    </p>

                    <button
                        onClick={() => setIsContactOpen(true)}
                        className="relative z-10 inline-flex items-center gap-2 px-8 py-4 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                    >
                        <span>Create Your Site Now</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </motion.div>
            </div>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </section>
    );
}
