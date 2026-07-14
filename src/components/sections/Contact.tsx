"use client";

import { motion } from "framer-motion";
import Section from "../ui/Section";
import ContactForm from "../ui/ContactForm";
import RevealText from "../ui/RevealText";

/**
 * Contact — industrial restyle. Hairline panel, mono caps eyebrow, no neon glow.
 */
export default function Contact() {
    return (
        <Section id="contact" className="bg-transparent">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl mx-auto w-full text-center"
            >
                <div className="flex items-center justify-center gap-3 mb-3">
                    <motion.span
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="h-px w-10 origin-right bg-[#34E5FF]"
                    />
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#34E5FF]">
                        Get in touch
                    </span>
                    <motion.span
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="h-px w-10 origin-left bg-[#34E5FF]"
                    />
                </div>
                <RevealText
                    as="h2"
                    text="Send me your site or rough idea."
                    stagger={0.04}
                    className="text-4xl md:text-5xl font-black tracking-tight text-white mb-5"
                />
                <p className="text-gray-400 text-base md:text-lg mb-10">
                    Drop the current URL, what feels broken, or the workflow you want fixed.
                    I&apos;ll reply with the clearest next step and, when useful, 3 practical fixes.
                </p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    viewport={{ once: true }}
                    className="relative border border-[#1C2A30] bg-[#0E171D] notch-corners p-6 md:p-10 text-left"
                >
                    <ContactForm />
                </motion.div>
            </motion.div>
        </Section>
    );
}
