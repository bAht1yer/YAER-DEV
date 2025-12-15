"use client";

import { motion } from "framer-motion";
import { Server, Database, Globe, RefreshCw, ShieldCheck } from "lucide-react";
import Section from "../../ui/Section";

export default function ArchitectureDiagram() {
    return (
        <Section id="architecture" className="min-h-0 h-auto py-12 bg-black/20">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Decoupled Architecture</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            The Worker runs independently of the web UI, ensuring trades execute reliably even when the browser is closed.
                        </p>
                    </div>

                    {/* Diagram Container */}
                    <div className="relative max-w-4xl mx-auto h-[400px] md:h-[500px] rounded-2xl glass-panel border border-white/5 p-8 flex items-center justify-center overflow-hidden">

                        {/* Background Grid - Localized */}
                        <div className="absolute inset-0 opacity-20"
                            style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                        </div>

                        {/* Nodes */}
                        <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">

                            {/* Client / UI */}
                            <Node
                                icon={<Globe className="w-8 h-8 text-white" />}
                                label="Client (Next.js)"
                                sub="Dashboard UI"
                                color="bg-blue-600"
                                position="left"
                            />

                            {/* API Layer */}
                            <Node
                                icon={<Server className="w-8 h-8 text-black" />}
                                label="API Layer"
                                sub="Server Actions"
                                color="bg-white"
                                position="center-left"
                            />

                            {/* Database */}
                            <div className="flex flex-col items-center gap-12 relative">
                                <Node
                                    icon={<Database className="w-8 h-8 text-white" />}
                                    label="PostgreSQL"
                                    sub="Persistence"
                                    color="bg-indigo-600"
                                    position="center"
                                />
                            </div>

                            {/* Worker - The Star */}
                            <Node
                                icon={<RefreshCw className="w-8 h-8 text-black animate-spin-slow" />}
                                label="Worker Service"
                                sub="Node.js Loop"
                                color="bg-primary"
                                position="center-right"
                                glow
                            />

                            {/* Coinbase */}
                            <Node
                                icon={<ShieldCheck className="w-8 h-8 text-white" />}
                                label="Coinbase API"
                                sub="External"
                                color="bg-[#0052FF]"
                                position="right"
                            />
                        </div>

                        {/* Connecting Lines & Packets (SVG Overlay) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block">
                            {/* Define gradients */}
                            <defs>
                                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                                    <stop offset="50%" stopColor="rgba(0,240,255,0.5)" />
                                    <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                                </linearGradient>
                            </defs>

                            {/* Path connecting nodes horizontally - Updated for 5 Nodes */}
                            {/* 5 Nodes roughly at: 10%, 30%, 50%, 70%, 90% of ~900px width */}
                            {/* Segments: 1->2, 2->3, 3->4, 4->5 */}
                            <path
                                d="M130,250 L230,250 M310,250 L410,250 M490,250 L590,250 M670,250 L770,250"
                                stroke="rgba(255,255,255,0.2)"
                                strokeWidth="2"
                                strokeDasharray="4,4"
                            />

                            {/* Animated Packets */}
                            <Packet path="M130,250 L230,250" delay={0} />
                            <Packet path="M310,250 L410,250" delay={0.8} />
                            <Packet path="M490,250 L590,250" delay={1.6} color="#7000ff" /> {/* DB Interaction */}
                            <Packet path="M670,250 L770,250" delay={2.4} color="#10B981" /> {/* Trade Execution */}
                        </svg>

                    </div>
                </motion.div>
            </div>
        </Section>
    );
}

const shakeVariant = {
    idle: {
        rotate: 0,
        transition: { duration: 0.2 }
    },
    hover: {
        rotate: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.5 }
    }
};

function Node({ icon, label, sub, color, position, glow = false }: { icon: any, label: string, sub: string, color: string, position: string, glow?: boolean }) {
    return (
        <motion.div
            initial="idle"
            whileHover="hover"
            variants={{
                idle: { scale: 1 },
                hover: { scale: 1.05 }
            }}
            className={`flex flex-col items-center gap-3 relative group z-10 p-4 rounded-xl border border-white/5 bg-[#0a0a0a] ${glow ? 'shadow-[0_0_30px_rgba(0,240,255,0.2)] border-primary/50' : ''}`}
        >
            <motion.div
                variants={shakeVariant}
                className={`w-16 h-16 rounded-2xl flex items-center justify-center ${color} shadow-lg relative overflow-hidden`}
            >
                {glow && <div className="absolute inset-0 bg-white/20 animate-pulse" />}
                <div className="relative z-10">{icon}</div>
            </motion.div>
            <div className="text-center">
                <div className="text-white font-bold text-sm">{label}</div>
                <div className="text-xs text-gray-500 font-mono">{sub}</div>
            </div>
        </motion.div>
    );
}

function Packet({ path, delay, color = "#00f0ff" }: { path: string, delay: number, color?: string }) {
    return (
        <motion.circle
            r="3"
            fill={color}
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
                delay: delay,
                repeatDelay: 0.5
            }}
            style={{ offsetPath: `path('${path}')` }}
        />
    );
}
