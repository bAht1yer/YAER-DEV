"use client";

import { motion } from "framer-motion";
import Section from "../../ui/Section";

const LOGS = [
    { text: "Processing 1 active user(s)...", color: "text-gray-400" },
    { text: "[cmj0vu1m] Running trading cycle for BTC-USD...", color: "text-blue-400" },
    { text: "[RiskManager] Today's P/L: $0.00 | Max Loss: $50.00", color: "text-emerald-400" },
    { text: "[SYSTEM] [CoinbaseTrader] API Request: GET /accounts for userId: cmj0vu1mp000g...", color: "text-purple-400" },
    { text: "[cmj0vu1m] 📍 Active position: 0.012645 BTC (~$894.09)", color: "text-yellow-400" },
    { text: "[cmj0vu1m] Analyzing BTC-USD with MOMENTUM strategy... (PAPER)", color: "text-blue-400" },
    { text: "[cmj0vu1m] BTC-USD Price: $70706.94", color: "text-blue-400" },
    { text: "[SYSTEM] [MarketData] Fetched 20 candles for BTC-USD", color: "text-gray-400" },
    { text: "[SYSTEM] [Strategy] BTC-USD RSI(14): 63.12", color: "text-pink-400" },
    { text: "[SYSTEM] [MarketData] Fetched 210 HOURLY candles for BTC-USD (for EMA200)", color: "text-gray-400" },
    { text: "[cmj0vu1m] Signal: HOLD - RSI 63.1 neutral (30-70 range)", color: "text-orange-400" },
    { text: "[cmj0vu1m] No trade executed this cycle", color: "text-gray-400" },
    { text: "[SYSTEM]", color: "text-gray-400" },
    { text: "[RiskManager] Today's P/L: $0.00 | Max Loss: $50.00", color: "text-emerald-400" },
];

export default function BackendLogs() {
    return (
        <Section id="backend-logs" className="min-h-0 h-auto py-12">
            <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="w-full"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <h2 className="text-3xl font-bold text-center"><span className="text-primary">{">_"}</span> Live Execution Logs</h2>
                    </div>
                    <p className="text-gray-400 text-center max-w-2xl mx-auto mb-10">
                        A real-time glimpse into the worker service executing trading logic and managing risk.
                    </p>

                    {/* Fake Terminal Window */}
                    <div className="w-full bg-[#030303] rounded-xl border border-white/10 overflow-hidden shadow-2xl relative">
                        {/* Terminal Header */}
                        <div className="flex items-center justify-between bg-[#0a0a0a] border-b border-white/5 py-3 px-4">
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                            <div className="text-xs text-gray-500 font-mono">worker@railway:~</div>
                            <div className="w-12"></div> {/* Spacer to center title */}
                        </div>

                        {/* Terminal Content */}
                        <div className="p-6 md:p-8 font-mono text-xs sm:text-sm overflow-x-auto min-h-[300px]">
                            <div className="flex flex-col space-y-2">
                                {LOGS.map((log, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: i * 0.15 }}
                                        className={`${log.color} break-all`}
                                    >
                                        {log.text}
                                    </motion.div>
                                ))}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                    className="w-2.5 h-4 bg-primary mt-2"
                                />
                            </div>
                        </div>

                        {/* Subtle inner glow */}
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
                    </div>
                </motion.div>
            </div >
        </Section >
    );
}
