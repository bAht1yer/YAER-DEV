"use client";

import { motion } from "framer-motion";
import { Shield, Sword, Map, Zap } from "lucide-react";

export default function GameFeatures() {
    return (
        <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-purple-900/20 to-black p-8 rounded-2xl border border-purple-500/20 md:col-span-2">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-white mb-4">Tactical Turn-Based Combat</h3>
                                <p className="text-gray-400">
                                    Master the Initiative Timeline. Manipulate turn order, flank enemies for critical damage,
                                    and utilize ultimate abilities that interact with the grid terrain itself.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <Sword className="w-12 h-12 text-purple-400" />
                                <Shield className="w-12 h-12 text-cyan-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-white/5">
                        <Map className="w-8 h-8 text-cyan-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Persistent World</h3>
                        <p className="text-gray-400 text-sm">
                            Your choices matter. Cleared mines stay cleared, and factions remember your allegiances
                            across game sessions.
                        </p>
                    </div>

                    <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-white/5">
                        <Zap className="w-8 h-8 text-yellow-500 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Spirit Economy</h3>
                        <p className="text-gray-400 text-sm">
                            Balancing fighting with mining. Harvest Spirit Veins to power your abilities,
                            but beware—mining draws attention.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
