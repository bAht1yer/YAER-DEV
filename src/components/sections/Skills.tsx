"use client";

import { motion } from "framer-motion";
import Section from "../ui/Section";

const skills = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js"] },
    { category: "Backend", items: ["Node.js", "PostgreSQL", "Prisma ORM", "REST APIs", "Python"] },
    { category: "AI & Automation", items: ["Dify.ai", "LLM Chatflows", "OpenAI API", "Prompt Engineering", "RAG Pipelines"] },
    { category: "DevOps & Tools", items: ["Git", "Docker", "Vercel", "Linux / VPS", "CI/CD"] },
];
import { Terminal } from "lucide-react";

export default function Skills() {
    return (
        <Section id="skills" className="bg-transparent">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-12 text-white flex items-center gap-3"
                >
                    <Terminal className="text-primary w-8 h-8 md:w-10 md:h-10" />
                    <span className="text-primary">02.</span> Tech Stack
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-lg hover:border-primary/50 transition-colors group"
                        >
                            <h3 className="text-xl font-bold mb-4 text-primary group-hover:text-glow transition-all">
                                {skill.category}
                            </h3>
                            <ul className="space-y-2">
                                {skill.items.map((item) => (
                                    <li key={item} className="text-gray-400 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
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
