"use client";

import { motion } from "framer-motion";
import Section from "../ui/Section";
import ContactForm from "../ui/ContactForm";

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
                <p className="text-gray-300 text-lg mb-12">
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
                    <ContactForm />
                </motion.div>
            </motion.div>
        </Section>
    );
}
