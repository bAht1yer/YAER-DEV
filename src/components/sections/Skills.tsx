"use client";

import { motion } from "framer-motion";
import Section from "../ui/Section";
import RevealText from "../ui/RevealText";
import TiltCard from "../ui/TiltCard";

/**
 * Skills (Capabilities) -- personal capability map.
 * Header rises out of a mask; cards stagger in, then tilt toward the cursor
 * with a travelling cyan spotlight. List items cascade on first view.
 */
const skills = [
    {
        category: "Shape the idea",
        items: ["Map the user path", "Find the smallest useful version", "Write clearer page copy", "Turn fuzzy goals into tasks"],
    },
    {
        category: "Build the interface",
        items: ["Next.js pages", "Responsive UI", "Forms and dashboards", "Motion with restraint", "Polished handoff states"],
    },
    {
        category: "Connect the workflow",
        items: ["Lead capture", "Email notifications", "Admin tools", "PDF and email handoffs", "Simple automations"],
    },
    {
        category: "Use AI carefully",
        items: ["Chat helpers", "Intake summaries", "Drafting assistants", "OpenAI and Dify builds", "Practical guardrails"],
    },
];

export default function Skills() {
    return (
        <Section id="skills" className="bg-transparent !min-h-0 py-24">
      <div className="max-w-7xl mx-auto w-full">
                <div className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 mb-2"
                    >
                        <motion.span
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="h-px w-10 origin-left bg-[#34E5FF]"
                        />
                        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#34E5FF]">
                            Process
                        </span>
                    </motion.div>
                    <RevealText
                        as="h2"
                        text="How I turn ideas into working things."
                        stagger={0.04}
                        className="text-4xl font-black tracking-tight text-white md:text-5xl"
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="mt-5 max-w-2xl text-base leading-7 text-[#8AA3AD]"
                    >
                        I move between product shape, visual detail, code, and automation.
                        The useful part is not just making a page exist; it is making the
                        next click feel obvious.
                    </motion.p>
                </div>

                <div
                    id="capabilities"
                    className="grid scroll-mt-28 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
                >
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.category}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <TiltCard className="h-full border border-[#1C2A30] bg-[#0E171D] transition-colors duration-300 hover:border-[#34E5FF]/45">
                                <div className="relative z-[2] p-6" style={{ transform: "translateZ(24px)" }}>
                                    <div className="mb-4 flex items-center gap-2">
                                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gray-500 group-hover:text-[#34E5FF] transition-colors">
                                            0{index + 1}
                                        </span>
                                        <span className="h-px flex-1 bg-[#1C2A30]" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-4 text-white">
                                        {skill.category}
                                    </h3>
                                    <ul className="space-y-2">
                                        {skill.items.map((item, itemIndex) => (
                                            <motion.li
                                                key={item}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.4, delay: index * 0.09 + 0.25 + itemIndex * 0.06 }}
                                                className="text-sm text-gray-400 flex items-center gap-2"
                                            >
                                                <span className="w-1 h-1 bg-[#34E5FF]/70" />
                                                {item}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
