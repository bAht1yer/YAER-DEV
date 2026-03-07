"use client";

import { motion } from "framer-motion";
import { Smartphone, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Section from "../../ui/Section";

export default function Hero() {
    return (
        <Section id="digitao-hero" className="relative min-h-[70vh] flex items-center justify-center py-6 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-transparent">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(74,120,86,0.08)_0%,transparent_60%)]" />
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
                            <span className="w-12 h-[1px] bg-[#4A7856]"></span>
                            <span className="text-[#4A7856] font-mono text-sm tracking-wider uppercase">Taoism follows its own nature</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold font-serif leading-tight mb-6 text-[#D4C4A8]">
                            DigiTao<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A7856] to-[#D4C4A8] relative">
                                數·道
                                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#4A7856]/50 to-transparent blur-sm"></span>
                            </span>
                            <br />
                            <span className="text-3xl md:text-5xl text-gray-300">道法自然</span>
                        </h1>

                        <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
                            A mobile-first companion app for the Tao Te Ching. Featuring an AI-powered Wisdom Interpreter, bilingual chapters, guided meditation, and Seasonal Wellness based on the 24 Solar Terms.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="flex items-center gap-4"
                    >
                        <Link href="https://tao-blue.vercel.app/" className="flex items-center gap-2 px-6 py-3 bg-[#4A7856]/10 border border-[#4A7856]/30 hover:bg-[#4A7856]/20 text-white rounded-md transition-all group backdrop-blur-sm">
                            <ExternalLink className="w-5 h-5 text-[#D4C4A8] group-hover:scale-110 transition-transform" />
                            <span>Visit Web App</span>
                        </Link>
                        <div className="flex items-center gap-2 px-5 py-3 text-sm bg-[#050505] border border-white/10 text-gray-400 rounded-md backdrop-blur-sm cursor-not-allowed opacity-75">
                            <Smartphone className="w-4 h-4" />
                            <span>iOS / Android (Coming Soon)</span>
                        </div>
                    </motion.div>

                    {/* Tech Stack badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="flex flex-wrap gap-3 mt-4"
                    >
                        {["Expo", "React Native", "AI Guidance", "Cross-Platform", "Bilingual"].map((tech) => (
                            <span key={tech} className="text-xs font-mono text-gray-400 bg-black/40 border border-[#4A7856]/20 px-2 py-1 rounded">
                                {tech}
                            </span>
                        ))}
                    </motion.div>
                </div>

                {/* Visual Content - Tilted Mobile Mockup with Screenshot */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                    animate={{ opacity: 1, scale: 1, rotateY: -10 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="order-1 lg:order-2 relative perspective-1000 flex justify-center lg:justify-end"
                    style={{ perspective: "1000px" }}
                >
                    <div className="relative w-[300px] h-[600px] transform rotate-y-[-10deg] rotate-x-[5deg] shadow-2xl rounded-[3rem] border-[8px] border-[#1f1f1f] bg-black overflow-hidden group hover:rotate-y-[0deg] hover:rotate-x-[0deg] transition-all duration-700 ease-out">
                        {/* Glow effect */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#4A7856] to-[#D4C4A8] opacity-10 blur-xl group-hover:opacity-20 transition-opacity" />

                        {/* Top Notch/Speaker area */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-[#1f1f1f] rounded-b-3xl z-20 flex justify-center items-end pb-2">
                            <div className="w-16 h-1.5 rounded-full bg-black/50"></div>
                        </div>

                        {/* App Interface (Screenshot) */}
                        <div className="relative w-full h-full bg-[#050505] flex items-center justify-center overflow-hidden">
                            <Image
                                src="/projects/digitao/home.png"
                                alt="DigiTao App Home Screen"
                                fill
                                className="object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                            />
                        </div>

                        {/* Screen Reflection Sheen */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none rounded-[2rem]" />
                    </div>
                </motion.div>
            </div>
        </Section>
    );
}
