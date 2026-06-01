"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BookOpenText, Dices, CircleDot, GraduationCap } from "lucide-react";
import Section from "../../ui/Section";

const features = [
    {
        icon: <BookOpenText className="w-6 h-6 text-[#C75B43]" />,
        title: "六十四卦 · The 64 Hexagrams",
        description:
            "Every one of the 64 hexagrams is fully seeded — 卦辭, 彖傳, 大象, the six lines with 小象, four-domain application, and four schools of commentary (王弼 · 程頤 · 朱熹 · modern lineage). Image-first reading before parsing the words.",
        image: "/projects/wyisdom/hexagram.png",
        imageAlt: "Hexagram reading surface for 乾 Qian",
        tab: "六十四卦",
        bg: "bg-[#C75B43]/5",
        border: "border-[#C75B43]/20",
    },
    {
        icon: <Dices className="w-6 h-6 text-[#C9A227]" />,
        title: "起卦 · Cast a Hexagram",
        description:
            "A guided coin or yarrow-stalk cast: frame a real situation, choose a method, watch the lines build, then read the result and journal it. Reflection, not forecast — no fortune claims.",
        image: "/projects/wyisdom/cast.png",
        imageAlt: "Cast flow — situation prompt",
        tab: "起卦",
        bg: "bg-[#C9A227]/5",
        border: "border-[#C9A227]/20",
    },
    {
        icon: <CircleDot className="w-6 h-6 text-[#C75B43]" />,
        title: "十二消息卦 · The Year Cycle",
        description:
            "An interactive TimeWheel of the twelve 消息卦, mapping yang waxing and waning across the solar year. Today's hexagram is derived live from the 京房 卦氣 60-day cycle.",
        image: "/projects/wyisdom/cycle.png",
        imageAlt: "Twelve sovereign hexagrams year-cycle wheel",
        tab: "十二消息卦",
        bg: "bg-[#C75B43]/5",
        border: "border-[#C75B43]/20",
    },
    {
        icon: <GraduationCap className="w-6 h-6 text-[#C9A227]" />,
        title: "學 · Foundations & Method",
        description:
            "Structured pedagogy from first principles — 陰陽, 八卦, 三才, 五行, 河圖洛書, 干支, the King Wen sequence — plus method modules on how to read the image, the lines, and a situation. Cross-cutting indices by image, position, and theme.",
        image: "/projects/wyisdom/learn.png",
        imageAlt: "Bagua foundation lesson",
        tab: "八卦",
        bg: "bg-[#C9A227]/5",
        border: "border-[#C9A227]/20",
    },
];

export default function Features() {
    return (
        <Section id="wyisdom-features" className="py-24 relative z-10">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-[#E6D9BE]">
                        What's inside
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        A scholarly yet readable study surface — primary sources inline with
                        attribution, two registers (introductory and scholarly), both aiming at 通透.
                    </p>
                </motion.div>

                <div className="space-y-24">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className={`flex flex-col gap-12 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"}`}
                        >
                            <div className="flex-1 space-y-6">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className={`inline-flex p-4 rounded-xl border ${feature.bg} ${feature.border}`}
                                >
                                    {feature.icon}
                                </motion.div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-lg">{feature.description}</p>
                            </div>

                            <div className="flex-[1.5] w-full">
                                <div className="relative group rounded-2xl overflow-hidden border border-white/10 bg-[#070B0E] shadow-2xl">
                                    <div className="bg-[#111] px-4 py-3 border-b border-white/5 flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                        <span className="ml-4 text-xs font-mono text-gray-500">{feature.tab}</span>
                                    </div>
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <Image
                                            src={feature.image}
                                            alt={feature.imageAlt}
                                            fill
                                            className="object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 pointer-events-none" />
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
