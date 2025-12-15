"use client";

import { motion } from "framer-motion";
import Section from "../ui/Section";
import { Terminal as TerminalIcon } from "lucide-react";

export default function About() {
    return (
        <Section id="about" className="bg-transparent">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
                        <span className="text-primary">01.</span> About Me
                    </h2>
                    <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                        I&apos;m a passionate <span className="text-white">Full Stack Developer</span> based in the digital realm.
                        I specialize in building exceptional websites, applications, and everything in between.
                    </p>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        With a background in <span className="text-accent">3D Graphics</span> and <span className="text-accent">Web Technologies</span>,
                        I bridge the gap between design and engineering to create truly immersive experiences.
                    </p>
                </motion.div>

                {/* Terminal UI */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden shadow-2xl"
                >
                    <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <div className="ml-2 text-xs text-gray-400 font-mono flex items-center gap-1">
                            <TerminalIcon className="w-3 h-3" />
                            bash — 80x24
                        </div>
                    </div>
                    <div className="p-6 font-mono text-sm md:text-base">
                        <div className="mb-4">
                            <span className="text-green-400">➜</span> <span className="text-blue-400">~</span> <span className="text-yellow-400">whoami</span>
                        </div>
                        <div className="text-gray-300 mb-4">
                            {`{`}
                            <div className="pl-4">
                                <span className="text-primary">&quot;name&quot;</span>: <span className="text-accent">&quot;YAER&quot;</span>,
                            </div>
                            <div className="pl-4">
                                <span className="text-primary">&quot;role&quot;</span>: <span className="text-accent">&quot;Creative Developer&quot;</span>,
                            </div>
                            <div className="pl-4">
                                <span className="text-primary">&quot;location&quot;</span>: <span className="text-accent">&quot;Worldwide&quot;</span>,
                            </div>
                            <div className="pl-4">
                                <span className="text-primary">&quot;hobbies&quot;</span>: [<span className="text-accent">&quot;Coding&quot;</span>, <span className="text-accent">&quot;Gaming&quot;</span>, <span className="text-accent">&quot;Design&quot;</span>]
                            </div>
                            {`}`}
                        </div>
                        <div>
                            <span className="text-green-400">➜</span> <span className="text-blue-400">~</span> <span className="animate-pulse">_</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
}
