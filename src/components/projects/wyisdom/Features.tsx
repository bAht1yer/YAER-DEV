"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BookOpenText, Dices, CircleDot, GraduationCap } from "lucide-react";
import Section from "../../ui/Section";

const features = [
  {
    icon: <BookOpenText className="w-6 h-6 text-[#DFFF00]" />,
    title: "Explore all 64 hexagrams",
    description:
      "Clear explanations, bilingual readings, and practical examples help you connect each hexagram to everyday life.",
    image: "/projects/wyisdom/hexagram-2026.webp",
    imageAlt: "GuanXiang reading page for Zhun, with its hexagram diagram and guided sections",
    tab: "64 hexagrams",
    bg: "bg-[#DFFF00]/5",
    border: "border-[#DFFF00]/20",
  },
  {
    icon: <Dices className="w-6 h-6 text-[#DFFF00]" />,
    title: "Reflect on a real question",
    description:
      "Start with a situation on your mind. A guided coin or yarrow-stalk reading helps you explore it and find a useful next step.",
    image: "/projects/wyisdom/cast-2026.webp",
    imageAlt: "GuanXiang guided reflection screen for entering a question",
    tab: "Guided reflection",
    bg: "bg-[#DFFF00]/5",
    border: "border-[#DFFF00]/20",
  },
  {
    icon: <CircleDot className="w-6 h-6 text-[#DFFF00]" />,
    title: "Follow the rhythm of the year",
    description:
      "Explore an interactive wheel of 12 seasonal hexagrams and see how their themes change throughout the year.",
    image: "/projects/wyisdom/cycle-2026.webp",
    imageAlt: "GuanXiang seasonal wheel showing all 12 hexagrams and the current season",
    tab: "Year cycle",
    bg: "bg-[#DFFF00]/5",
    border: "border-[#DFFF00]/20",
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-[#DFFF00]" />,
    title: "Learn at your own pace",
    description:
      "Start with yin and yang and the eight trigrams. Illustrated lessons make the ideas easier to understand, one step at a time.",
    image: "/projects/wyisdom/learn-2026.webp",
    imageAlt: "GuanXiang illustrated trigram learning cards with Chinese and English explanations",
    tab: "Learning foundations",
    bg: "bg-[#DFFF00]/5",
    border: "border-[#DFFF00]/20",
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-sans text-[#F1F0E9]">
            What&apos;s inside
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Ancient ideas, made easier to explore. Read, reflect, and learn in
            Chinese and English.
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
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>

              <div className="flex-[1.5] w-full">
                <div className="relative group rounded-2xl overflow-hidden border border-white/10 bg-[#18191B] shadow-2xl">
                  <div className="bg-[#111] px-4 py-3 border-b border-white/5 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    <span className="ml-4 text-xs font-mono text-gray-400">
                      {feature.tab}
                    </span>
                  </div>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.imageAlt}
                      fill
                      sizes="(max-width: 1023px) 92vw, 58vw"
                      className="object-cover object-top"
                    />
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
