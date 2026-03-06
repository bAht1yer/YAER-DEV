"use client";

import { motion } from "framer-motion";
import { Volume2, Languages, Headphones, FileText } from "lucide-react";
import Section from "../../ui/Section";

export default function BilingualRecitation() {
    return (
        <Section id="bilingual-recitation" className="py-24 relative z-10 bg-black/40 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Text & Features */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8 lg:pr-8"
                    >
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-[#D4C4A8]">Deep Dive into the Text</h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Experience the Tao Te Ching as it was meant to be studied. Our immersive reading environment offers precise bilingual annotations and synchronized audio recitations.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-[#D4C4A8]/10 border border-[#D4C4A8]/20 shrink-0">
                                    <Languages className="w-6 h-6 text-[#D4C4A8]" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold mb-2 text-white">Bilingual & Bopomofo</h4>
                                    <p className="text-gray-500 leading-relaxed">Every character is annotated with Bopomofo (Zhu-Yin) to aid pronunciation. Switch instantly between Modern Vernacular, Contemporary English, or the classical Legge interpretation.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-[#D4C4A8]/10 border border-[#D4C4A8]/20 shrink-0">
                                    <Headphones className="w-6 h-6 text-[#D4C4A8]" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold mb-2 text-white">Smart Recitation</h4>
                                    <p className="text-gray-500 leading-relaxed">Listen in your preferred style with a synchronized audio player. Choose from Bilingual (CN+EN), Chinese only, or English only recitation modes.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Interactive Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative group rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-2xl p-6 md:p-10">
                            {/* Browser/Player Header Bar */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 border-b border-white/10 pb-6 mb-8">
                                <div className="flex gap-2 bg-[#1A1A1A] p-1 rounded-full border border-white/5 overflow-x-auto max-w-full">
                                    <button className="px-3 sm:px-4 py-1.5 text-xs font-medium rounded-full bg-[#D4C4A8]/20 text-[#D4C4A8] whitespace-nowrap">文言文</button>
                                    <button className="px-3 sm:px-4 py-1.5 text-xs font-medium rounded-full text-gray-400 hover:text-white transition-colors whitespace-nowrap">Contemporary</button>
                                    <button className="px-3 sm:px-4 py-1.5 text-xs font-medium rounded-full text-gray-400 hover:text-white transition-colors whitespace-nowrap">Legge</button>
                                </div>
                                <div className="flex gap-3">
                                    <div className="p-2 rounded-full bg-[#1A1A1A] border border-white/5 flex items-center gap-2 px-3 text-xs text-[#D4C4A8] cursor-pointer hover:bg-white/5 transition-colors">
                                        <Volume2 className="w-4 h-4" />
                                        <span>CN + EN</span>
                                    </div>
                                </div>
                            </div>

                            {/* Text Display */}
                            <div className="space-y-12 text-center">
                                <div className="flex flex-col items-center justify-center">
                                    <div className="flex flex-row justify-center gap-6 md:gap-10 mb-8 scale-100 sm:scale-110 md:scale-125 origin-center">
                                        {/* Character 1 */}
                                        <div className="flex flex-col items-center group/char cursor-default">
                                            <span className="text-sm text-gray-500 mb-2 font-mono group-hover/char:text-[#D4C4A8] transition-colors">ㄉㄠˋ</span>
                                            <span className="text-5xl md:text-6xl font-serif text-white group-hover/char:text-[#D4C4A8] transition-colors drop-shadow-lg">道</span>
                                        </div>
                                        {/* Character 2 */}
                                        <div className="flex flex-col items-center group/char cursor-default">
                                            <span className="text-sm text-gray-500 mb-2 font-mono group-hover/char:text-[#D4C4A8] transition-colors">ㄎㄜˇ</span>
                                            <span className="text-5xl md:text-6xl font-serif text-white group-hover/char:text-[#D4C4A8] transition-colors drop-shadow-lg">可</span>
                                        </div>
                                        {/* Character 3 */}
                                        <div className="flex flex-col items-center group/char cursor-default relative">
                                            {/* Glow effect on the active recited character */}
                                            <div className="absolute inset-0 bg-[#D4C4A8]/20 blur-xl rounded-full scale-150 pointer-events-none animate-pulse"></div>
                                            <span className="text-sm text-[#D4C4A8] mb-2 font-mono relative z-10">ㄉㄠˋ</span>
                                            <span className="text-5xl md:text-6xl font-serif text-[#D4C4A8] relative z-10 drop-shadow-[0_0_15px_rgba(212,196,168,0.5)]">道</span>
                                        </div>
                                    </div>
                                    <p className="text-[#D4C4A8] font-serif italic text-lg md:text-xl text-center px-4">
                                        &quot;The Tao that can be trodden is not the enduring and unchanging Tao.&quot;
                                    </p>
                                </div>

                                {/* Deep Dive Box */}
                                <div className="mt-8 relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-[#151515] to-[#0A0A0A] p-6 text-left">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4C4A8]/30 to-transparent opacity-50"></div>
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center gap-2 text-[#D4C4A8]">
                                            <FileText className="w-4 h-4" />
                                            <span className="text-xs font-semibold uppercase tracking-wider">Deep Dive</span>
                                        </div>
                                        <button className="text-xs text-gray-400 border border-white/10 rounded-md px-2.5 py-1 hover:text-white hover:border-white/30 transition-colors bg-white/5">
                                            中 / EN
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        The opening paradox establishes the impossibility of confining the absolute truth (Tao) within language or rigid definitions. To name the Tao is to limit its boundlessness.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Section>
    );
}
