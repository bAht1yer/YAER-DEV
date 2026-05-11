"use client";

import { motion } from "framer-motion";
import Section from "../ui/Section";
import ContactForm from "../ui/ContactForm";

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
                    <span className="h-px w-10 bg-[#E6FF3A]" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#E6FF3A]">
                        Get in touch
                    </span>
                    <span className="h-px w-10 bg-[#E6FF3A]" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-5">
                    Tell me what you&apos;re building.
                </h2>
                <p className="text-gray-400 text-base md:text-lg mb-10">
                    Send the rough idea, the messy workflow, or the product you want to improve.
                    I&apos;ll read it and come back with a clear next step.
                </p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    viewport={{ once: true }}
                    className="relative border border-[#23262B] bg-[#121316] notch-corners p-6 md:p-10 text-left"
                >
                    <ContactForm />
                </motion.div>
            </motion.div>
        </Section>
    );
}
