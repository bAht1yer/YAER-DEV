"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import Section from "../../ui/Section";

export default function Hero() {
    return (
        <Section id="coinbot-hero" className="relative min-h-[70vh] flex items-center justify-center py-6 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-transparent">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.08)_0%,transparent_60%)]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">

                {/* Text Content */}
                <div className="order-2 lg:order-1 flex flex-col items-start space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-12 h-[1px] bg-primary"></span>
                            <span className="text-primary font-mono text-sm tracking-wider uppercase">Algorithmic Trading Platform</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold font-inter leading-tight mb-6">
                            Algorithmic <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent relative">
                                Precision.
                                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent blur-sm"></span>
                            </span>
                            <br />
                            24/7 Execution.
                        </h1>

                        <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
                            A full-stack, autonomous trading platform built for the Coinbase Advanced Trade ecosystem. Decoupled microservices architecture ensures 99.9% uptime.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="flex items-center gap-4"
                    >
                        <Link href="https://coinbot-web.vercel.app/" className="flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/20 hover:bg-primary/20 text-white rounded-md transition-all group backdrop-blur-sm">
                            <ExternalLink className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
                            <span>Live Demo</span>
                        </Link>
                        <Link href="#" className="flex items-center gap-2 px-5 py-2 text-sm bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-md transition-all group backdrop-blur-sm">
                            <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            <span>View Source Code</span>
                        </Link>
                    </motion.div>

                    {/* Tech Stack badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="flex flex-wrap gap-3 mt-4"
                    >
                        {["Next.js 16", "Node.js", "PostgreSQL", "WebSocket", "Redis"].map((tech) => (
                            <span key={tech} className="text-xs font-mono text-gray-400 bg-black/40 border border-white/5 px-2 py-1 rounded">
                                {tech}
                            </span>
                        ))}
                    </motion.div>
                </div>

                {/* Visual Content - Tilted Mockup */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                    animate={{ opacity: 1, scale: 1, rotateY: -10 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="order-1 lg:order-2 relative perspective-1000"
                    style={{ perspective: "1000px" }}
                >
                    <div className="relative transform rotate-y-[-10deg] rotate-x-[5deg] shadow-2xl rounded-xl border border-white/10 bg-[#0a0a0a] overflow-hidden group hover:rotate-y-[0deg] hover:rotate-x-[0deg] transition-all duration-700 ease-out">
                        {/* Glow effect matching neon accents */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent opacity-20 blur-lg group-hover:opacity-30 transition-opacity" />

                        {/* Mockup Header */}
                        <div className="relative z-10 bg-[#0f0f0f] p-4 border-b border-white/10 flex items-center justify-between">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            <div className="text-xs font-mono text-gray-500 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                Running: 14d 2h 45m
                            </div>
                        </div>

                        {/* Mockup Body - Realistic Trading Dashboard */}
                        <div className="relative z-10 p-4 bg-[#050505] min-h-[400px] flex flex-col gap-4">

                            {/* Top Bar: Ticker & Price */}
                            <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-bold text-white">BTC-USD</h3>
                                        <span className="bg-emerald-500/10 text-emerald-500 text-xs px-2 py-0.5 rounded font-mono">+2.4%</span>
                                    </div>
                                    <div className="text-2xl font-mono text-white mt-1">$64,293.50</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-gray-500 uppercase tracking-wider">24h Volume</div>
                                    <div className="text-sm font-mono text-gray-300">12,405 BTC</div>
                                </div>
                            </div>

                            {/* Main Area: Chart & Order Book */}
                            <div className="grid grid-cols-3 gap-4 flex-grow">

                                {/* Chart Area (2/3) */}
                                <div className="col-span-2 bg-[#0a0a0a] rounded border border-white/5 p-4 relative overflow-hidden flex items-end">
                                    {/* Simulated Candles */}
                                    <div className="flex items-end gap-1 w-full h-48 opacity-80">
                                        {[40, 60, 45, 70, 65, 80, 75, 90, 85, 100, 95, 110].map((h, i) => (
                                            <div key={i} className={`w-full rounded-sm ${i % 2 === 0 ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ height: `${h}%`, opacity: 0.6 + (i * 0.03) }} />
                                        ))}
                                    </div>

                                    {/* Overlay Indicators */}
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <span className="text-[10px] text-primary bg-primary/10 px-1 rounded">RSI: 68</span>
                                        <span className="text-[10px] text-amber-500 bg-amber-500/10 px-1 rounded">MACD: Bull</span>
                                    </div>
                                </div>

                                {/* Order Book (1/3) */}
                                <div className="col-span-1 flex flex-col gap-2">
                                    <div className="bg-[#0a0a0a] rounded border border-white/5 p-2 flex-grow flex flex-col gap-1 overflow-hidden">
                                        <div className="text-[10px] text-gray-500 mb-1">ASKS</div>
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="flex justify-between text-[10px] font-mono">
                                                <span className="text-red-400">64,{(300 + i * 10)}</span>
                                                <span className="text-gray-600">{(0.5 * i).toFixed(2)}</span>
                                            </div>
                                        ))}
                                        <div className="my-2 border-t border-white/5" />
                                        <div className="text-[10px] text-gray-500 mb-1">BIDS</div>
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="flex justify-between text-[10px] font-mono">
                                                <span className="text-emerald-400">64,{(200 - i * 10)}</span>
                                                <span className="text-gray-600">{(0.8 * i).toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Bottom: Active Orders */}
                            <div className="bg-[#0a0a0a] rounded border border-white/5 p-3">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-gray-400">OPEN ORDERS (2)</span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-xs font-mono bg-white/5 p-2 rounded border-l-2 border-emerald-500">
                                        <span className="text-emerald-500">BUY LIMIT</span>
                                        <span className="text-white">0.5 BTC @ $63,500</span>
                                        <span className="text-gray-500">Just now</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Reflection/Sheen */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                    </div>
                </motion.div>
            </div>
        </Section>
    );
}
