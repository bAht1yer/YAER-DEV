"use client";

import { motion } from "framer-motion";
import Section from "../ui/Section";

/**
 * Skills (Capabilities) -- buyer-facing first, technical proof second.
 * The language starts with outcomes a local business recognizes, then keeps
 * the stack credibility lower-friction for technical visitors.
 */
const skills = [
    {
        category: "Turn visits into leads",
        items: ["Website fixes", "Quote request forms", "Phone + email CTAs", "Google profile cleanup", "Basic local SEO"],
    },
    {
        category: "Clean up the workflow",
        items: ["Lead sheets", "Email notifications", "Simple dashboards", "PDF quote templates", "Follow-up paths"],
    },
    {
        category: "Add useful AI",
        items: ["Chat helpers", "Intake summaries", "Draft replies", "FAQ assistants", "Dify / OpenAI builds"],
    },
    {
        category: "Build it properly",
        items: ["Next.js", "TypeScript", "PostgreSQL", "Vercel", "Maintenance-ready handoff"],
    },
];

export default function Skills() {
    return (
        <Section id="skills" className="bg-transparent">
            <div className="max-w-6xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <span className="h-px w-10 bg-[#34E5FF]" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#34E5FF]">
                            Capabilities
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
                        Practical systems, built cleanly.
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="border border-[#1C2A30] bg-[#0E171D] p-6 transition-colors hover:border-[#34E5FF]/45 group"
                        >
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
                                {skill.items.map((item) => (
                                    <li key={item} className="text-sm text-gray-400 flex items-center gap-2">
                                        <span className="w-1 h-1 bg-[#34E5FF]/70" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
