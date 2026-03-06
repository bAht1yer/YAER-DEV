"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BookOpen, Bot, Leaf, Sun } from "lucide-react";
import Section from "../../ui/Section";

const features = [
    {
        icon: <BookOpen className="w-6 h-6 text-[#D4C4A8]" />,
        title: "道德經 (Tao Te Ching)",
        description: "Explore the full 81 chapters of Laozi's profound philosophy. Features bilingual support (Original Chinese & English translation), category tags, and search functionality.",
        image: "/projects/digitao/chapters.png",
        imageAlt: "Tao Te Ching Chapters Grid",
        bg: "bg-[#D4C4A8]/5",
        border: "border-[#D4C4A8]/20"
    },
    {
        icon: <Bot className="w-6 h-6 text-cyan-500" />,
        title: "智慧問答 (Interpreter)",
        description: "An AI-powered interpreter that provides spiritual guidance to modern life questions using principles from the Tao.",
        image: "/projects/digitao/ask.png",
        imageAlt: "Wisdom Interpreter AI",
        bg: "bg-cyan-500/5",
        border: "border-cyan-500/20"
    },
    {
        icon: <Leaf className="w-6 h-6 text-emerald-500" />,
        title: "靜坐 (Meditation)",
        description: "Cultivate inner peace with highly configurable timers and immersive high-quality ambient soundscapes like 'Forest Stream' or 'Pure Silence'.",
        image: "/projects/digitao/meditation.png",
        imageAlt: "Guided Meditation",
        bg: "bg-emerald-500/5",
        border: "border-emerald-500/20"
    },
    {
        icon: <Sun className="w-6 h-6 text-orange-400" />,
        title: "養生 (Seasonal Wellness)",
        description: "Holistic health advice synchronized with the traditional 24 Solar Terms, offering dietary, lifestyle, and exercise recommendations tailored to the current season.",
        image: "/projects/digitao/wellness.png",
        imageAlt: "Seasonal Wellness",
        bg: "bg-orange-500/5",
        border: "border-orange-500/20"
    }
];

export default function MergedFeatures() {
    return (
        <Section id="core-modules" className="py-24 relative z-10">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-[#D4C4A8]">Core Modules & Interface</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">A seamless blend of ancient wisdom and modern technology, featuring an immersive, distraction-free environment designed to help you focus on the Tao.</p>
                </motion.div>

                <div className="space-y-24">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className={`flex flex-col gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                                }`}
                        >
                            {/* Text Content */}
                            <div className="flex-1 space-y-6">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className={`inline-flex p-4 rounded-xl border ${feature.bg} ${feature.border}`}
                                >
                                    {feature.icon}
                                </motion.div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-lg">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Image Showcase */}
                            <div className="flex-[1.5] w-full">
                                <div className="relative group rounded-2xl overflow-hidden border border-white/10 bg-[#050505] shadow-2xl">
                                    {/* Browser Header Bar */}
                                    <div className="bg-[#111] px-4 py-3 border-b border-white/5 flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                        <span className="ml-4 text-xs font-mono text-gray-500">{feature.title.split(' ')[0]}</span>
                                    </div>

                                    <div className="relative aspect-[16/10] sm:aspect-[4/3] md:aspect-[16/10] overflow-hidden">
                                        <Image
                                            src={feature.image}
                                            alt={feature.imageAlt}
                                            fill
                                            className="object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
