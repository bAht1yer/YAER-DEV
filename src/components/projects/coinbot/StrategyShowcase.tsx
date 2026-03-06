"use client";

import { motion } from "framer-motion";
import Section from "../../ui/Section";

export default function StrategyShowcase() {
    return (
        <Section id="strategies" className="min-h-0 h-auto py-12 border-t border-white/5 bg-black/40">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl font-bold mb-4"><span className="text-primary">{">_"}</span> Algorithmic Strategies</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Pre-built logic modules that can be hot-swapped into the execution engine.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Strategy 1 */}
                        <StrategyCard
                            title="Momentum RSI"
                            desc="Classic mean reversion. Buys when RSI < 30 (Oversold) and Sells when RSI > 70 (Overbought). Enhanced with trend filters to avoid catching falling knives."
                            tags={["Mean Reversion", "Oscillator", "Safe"]}
                            color="border-primary"
                        />

                        {/* Strategy 2 */}
                        <StrategyCard
                            title="Grid DCA"
                            desc="Places a mesh of buy orders below the market price to lower average entry cost. Automatically places take-profit orders as positions fill."
                            tags={["Accumulation", "High Frequency", "Volatile"]}
                            color="border-accent"
                        />

                        {/* Strategy 3 */}
                        <StrategyCard
                            title="Trailing Stop Surfer"
                            desc="Advanced exit strategy. Once a trade is in profit, a dynamic stop-loss follows price peaks, locking in gains while allowing run-ups."
                            tags={["Exit Logic", "Utility", "Profit-Max"]}
                            color="border-emerald-500"
                        />
                    </div>
                </motion.div>
            </div>
        </Section>
    )
}

function StrategyCard({ title, desc, tags, color }: { title: string, desc: string, tags: string[], color: string }) {
    return (
        <div className={`group relative p-8 rounded-xl bg-[#080808] border border-white/5 hover:border-opacity-100 transition-all duration-300`}>
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${color.replace('border-', '')} to-transparent opacity-50 group-hover:opacity-100`} />

            <h3 className="text-xl font-bold mb-4 group-hover:text-white transition-colors">{title}</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {desc}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
                {tags.map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-wider font-mono text-gray-500 border border-white/5 px-2 py-1 rounded">
                        {t}
                    </span>
                ))}
            </div>
        </div>
    )
}
