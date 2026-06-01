"use client";

import { motion } from "framer-motion";
import { ExternalLink, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Section from "../../ui/Section";

/**
 * Wyisdom hero — scholarly ink/vermilion palette (its own identity, like the
 * DigiTao page). Web app, so the showcase is a tilted desktop browser mock.
 */
export default function Hero() {
    return (
        <Section id="wyisdom-hero" className="relative min-h-[70vh] flex items-center justify-center py-6 overflow-hidden">
            <div className="absolute inset-0 bg-transparent">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(199,91,67,0.10)_0%,transparent_60%)]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
                {/* Text */}
                <div className="order-2 lg:order-1 flex flex-col items-start space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-12 h-[1px] bg-[#C75B43]" />
                            <span className="text-[#C75B43] font-mono text-sm tracking-wider uppercase">
                                通透明瞭地解析上古智慧
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold font-serif leading-tight mb-6 text-[#E6D9BE]">
                            Wyisdom<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C75B43] to-[#C9A227] relative">
                                易通
                                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#C75B43]/50 to-transparent blur-sm" />
                            </span>
                        </h1>

                        <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
                            A bilingual study surface for the I Ching (易經). All 64 hexagrams with
                            classical and modern commentary, a daily-hexagram engine, an interactive
                            year-cycle wheel, and a reflective coin / yarrow cast flow.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="flex items-center gap-4"
                    >
                        <Link
                            href="https://calclife.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-[#C75B43]/10 border border-[#C75B43]/30 hover:bg-[#C75B43]/20 text-white rounded-md transition-all group backdrop-blur-sm"
                        >
                            <ExternalLink className="w-5 h-5 text-[#E6D9BE] group-hover:scale-110 transition-transform" />
                            <span>Visit Web App</span>
                        </Link>
                        <div className="flex items-center gap-2 px-5 py-3 text-sm bg-[#070B0E] border border-white/10 text-gray-400 rounded-md backdrop-blur-sm">
                            <BookOpen className="w-4 h-4" />
                            <span>64 / 64 hexagrams seeded</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="flex flex-wrap gap-3 mt-4"
                    >
                        {["Next.js", "易經 · I Ching", "Bilingual zh/en", "京房 卦氣", "Live Web App"].map((tech) => (
                            <span key={tech} className="text-xs font-mono text-gray-400 bg-black/40 border border-[#C75B43]/20 px-2 py-1 rounded">
                                {tech}
                            </span>
                        ))}
                    </motion.div>
                </div>

                {/* Desktop browser mockup */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.92, rotateY: 8 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 8 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="order-1 lg:order-2 relative flex justify-center lg:justify-end"
                    style={{ perspective: "1400px" }}
                >
                    <div className="group relative w-full max-w-[560px] rounded-xl border border-[#C9A227]/20 bg-black overflow-hidden shadow-2xl transition-transform duration-700 ease-out hover:rotate-y-0" style={{ transform: "rotateY(-8deg)" }}>
                        <div className="absolute -inset-6 bg-gradient-to-r from-[#C75B43] to-[#C9A227] opacity-10 blur-2xl group-hover:opacity-20 transition-opacity" />

                        {/* Browser chrome */}
                        <div className="relative flex items-center gap-2 border-b border-white/10 bg-[#111] px-4 py-2.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
                            <span className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
                            <span className="ml-3 truncate font-mono text-[10px] text-gray-500">calclife.vercel.app</span>
                        </div>

                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#070B0E]">
                            <Image
                                src="/projects/wyisdom/home.png"
                                alt="Wyisdom — I Ching study platform home"
                                fill
                                priority
                                sizes="(min-width: 1024px) 560px, 92vw"
                                className="object-cover object-top opacity-95 group-hover:opacity-100 transition-opacity duration-300"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
}
