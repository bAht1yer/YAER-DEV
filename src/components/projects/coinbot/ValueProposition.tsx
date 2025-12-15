"use client";

import { motion } from "framer-motion";
import Section from "../../ui/Section";
import { CheckCircle2 } from "lucide-react";

export default function ValueProposition() {
    return (
        <Section id="value-prop" className="min-h-0 h-auto py-12">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12"
            >

                <div>
                    <h2 className="text-2xl font-bold mb-6">Why I Built This</h2>
                    <div className="space-y-6 text-gray-400 leading-relaxed">
                        <p>
                            Cryptocurrency markets run 24/7, but humans need sleep. Manual trading is often plagued by emotional decision-making, hesitation, and fatigue.
                        </p>
                        <p>
                            I wanted to build a system that was <span className="text-white">cold, calculated, and relentless</span>. CoinBot wasn't just a coding project; it was an attempt to engineer discipline.
                        </p>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-6">Technical Challenges Solved</h2>
                    <ul className="space-y-4">
                        {[
                            "Handling Websocket reconnection logic and heartbeat management.",
                            "Ensuring idempotency: preventing double-buys with unique client_order_ids.",
                            "Syncing async Worker state with the Real-time UI.",
                            "Securely encrypting API keys while making them accessible to the backend."
                        ].map((item, i) => (
                            <li key={i} className="flex gap-3 items-start">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                                <span className="text-gray-300 text-sm">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

            </motion.div>
        </Section>
    );
}
