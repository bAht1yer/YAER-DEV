"use client";

import { motion } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";

export default function MediaGallery() {
    return (
        <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase block mb-2">VISUAL ARCHIVES</span>
                <h2 className="text-3xl font-bold text-white mb-8">Gameplay Gallery</h2>
                <div className="flex flex-col items-center justify-center h-[400px] border border-white/10 rounded-2xl bg-white/5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative z-10 text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500">
                            <ImageIcon className="w-8 h-8 text-gray-600 group-hover:text-purple-400 transition-colors" />
                        </div>
                        <h3 className="text-2xl font-bold text-white tracking-widest font-serif">COMING SOON</h3>
                        <p className="text-gray-500 font-mono text-sm max-w-md px-4">
                            Visual archives are being decrypted. Expect gameplay footage in the next deployment cycle.
                        </p>
                    </div>
                    {/* Decorative Glitch Effect */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent -translate-x-full group-hover:animate-scan" />
                </div>
            </div>
        </section>
    );
}
