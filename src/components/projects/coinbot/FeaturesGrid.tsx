"use client";

import { motion } from "framer-motion";
import { Shield, Activity, Coins, Lock, Zap, Ghost } from "lucide-react";
import Section from "../../ui/Section";

const features = [
    {
        icon: <Shield className="w-6 h-6 text-rose-500" />,
        title: "Risk Engine",
        description: "Capital preservation protocols baked into the core. Hard stops, trailing stop-losses, and daily loss limits that trigger auto-shutdown.",
        colSpan: 2,
        bg: "bg-rose-500/5",
        border: "border-rose-500/20"
    },
    {
        icon: <Ghost className="w-6 h-6 text-amber-500" />,
        title: "Shadow Ledger",
        description: "Simulates trades with 0.6% fee estimation before risking real capital. Test strategies in a realistic environment.",
        colSpan: 1,
        bg: "bg-amber-500/5",
        border: "border-amber-500/20"
    },
    {
        icon: <Zap className="w-6 h-6 text-primary" />,
        title: "Real-time Websockets",
        description: "Low-latency price updates and order status reflection via Coinbase Advanced Trade API streams.",
        colSpan: 1,
        bg: "bg-primary/5",
        border: "border-primary/20"
    },
    {
        icon: <Lock className="w-6 h-6 text-emerald-500" />,
        title: "AES-256 Security",
        description: "API keys are encrypted at rest using AES-256-GCM. Decryption happens only in secure server memory.",
        colSpan: 2,
        bg: "bg-emerald-500/5",
        border: "border-emerald-500/20"
    }
];

export default function FeaturesGrid() {
    return (
        <Section id="features" className="min-h-0 h-auto py-12">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold mb-4">Mission Critical Features</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">Built for reliability and performance in high-frequency environments.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            viewport={{ once: true }}
                            className={`
                        ${feature.colSpan === 2 ? 'md:col-span-2' : 'md:col-span-1'}
                        glass-panel p-8 rounded-2xl border hover:border-opacity-50 transition-all duration-300
                        ${feature.bg} ${feature.border} group cursor-default
                    `}
                        >
                            <div className="mb-4 p-3 bg-black/40 rounded-lg w-fit border border-white/5 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
