"use client";

import { motion } from "framer-motion";
import Section from "../ui/Section";
import { Send } from "lucide-react";

export default function Contact() {
    return (
        <Section id="contact" className="bg-transparent">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl mx-auto w-full text-center"
            >
                <h2 className="text-4xl font-bold mb-6 flex items-center justify-center gap-3">
                    <span className="text-primary">04.</span> Get In Touch
                </h2>
                <p className="text-gray-400 text-lg mb-12">
                    I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi,
                    I&apos;ll try my best to get back to you!
                </p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-black/40 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-lg"
                >
                    <form className="space-y-6 text-left">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                            <textarea
                                id="message"
                                rows={4}
                                className="w-full bg-[#1e1e1e] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                placeholder="Hello, I'd like to talk about..."
                            />
                        </div>

                        <button
                            type="button"
                            className="w-full md:w-auto px-8 py-3 bg-transparent border border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300 rounded-lg font-medium flex items-center justify-center gap-2 mx-auto"
                        >
                            <Send className="w-4 h-4" />
                            Send Message
                        </button>
                    </form>
                </motion.div>
            </motion.div>
        </Section>
    );
}
