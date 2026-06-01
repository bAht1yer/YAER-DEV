"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ContactForm, { type ProjectType } from "./ContactForm";
import { useEffect } from "react";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    /** Preselect a project type when the modal opens (used by offer section CTAs). */
    projectType?: ProjectType;
}

/**
 * ContactModal — industrial restyle.
 * Drops the terminal-prompt header and cyan accent in favor of a hairline panel
 * with mono caps title. Accepts an optional projectType to preselect the
 * dropdown when opened from an offer section CTA.
 */
export default function ContactModal({ isOpen, onClose, projectType }: ContactModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="relative w-full max-w-2xl bg-[#0E171D] border border-[#1C2A30] notch-corners overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-[#1C2A30]">
                            <div className="flex items-center gap-3">
                                <span className="h-2 w-2 rounded-full bg-[#34E5FF]" />
                                <h2 className="font-mono text-[12px] uppercase tracking-[0.22em] text-white">
                                    New project -- intake
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-gray-400 hover:text-white transition-colors"
                                aria-label="Close"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 md:p-10 max-h-[80vh] overflow-y-auto">
                            <p className="text-sm leading-7 text-gray-400 mb-6">
                                Tell me what you&apos;re building. Rough is fine -- I&apos;ll come back with a clear next step within 24 hours.
                            </p>
                            <ContactForm onSuccess={onClose} initialProjectType={projectType} />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
