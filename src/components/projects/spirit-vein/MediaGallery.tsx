"use client";

import { motion } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";

export default function MediaGallery() {
    return (
        <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-8">Gameplay Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[600px]">
                    <div className="bg-white/5 rounded-2xl md:col-span-1 md:row-span-2 flex items-center justify-center border border-white/5 relative group overflow-hidden">
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-500" />
                        <div className="text-center p-8">
                            <ImageIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-500 font-mono">Main Gameplay View</p>
                        </div>
                    </div>
                    <div className="bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 relative group overflow-hidden">
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-500" />
                        <p className="text-gray-500 font-mono">Inventory System</p>
                    </div>
                    <div className="bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 relative group overflow-hidden">
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-500" />
                        <p className="text-gray-500 font-mono">Skill Tree</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
