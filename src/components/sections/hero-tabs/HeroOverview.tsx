"use client";

import { motion } from "framer-motion";
import TypewriterText from "../../ui/TypewriterText";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import ContactModal from "../../ui/ContactModal";

export default function HeroOverview() {
    const { data: session } = useSession();
    const [isContactOpen, setIsContactOpen] = useState(false);
    
    // Status text matches the design "SYSTEM_ACCESS: GRANTED"
    const userStatus = session?.user?.name ? `SYSTEM_ACCESS: GRANTED` : "SYSTEM_ACCESS: VISITOR";

    return (
        <div className="w-full h-full flex flex-col pt-10 px-4 md:px-10 pb-20 max-w-7xl mx-auto pointer-events-auto">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-8">
                
                {/* Left Column: Intro & Actions */}
                <div className="flex flex-col gap-6 text-left order-2 lg:order-1 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mb-4"
                    >
                        {session ? (
                            <button onClick={() => signOut()} className="group relative inline-flex items-center justify-center px-4 py-1.5 border border-[#39FF14]/50 hover:border-[#FF00FF] bg-[#39FF14]/5 transition-all duration-300 cursor-pointer rounded-sm">
                                <span className="text-[#39FF14] font-mono text-xs tracking-widest block group-hover:hidden">
                                    <TypewriterText text={userStatus} delay={300} speed={50} cursor={false} />
                                </span>
                                <span className="text-[#FF00FF] font-mono text-xs tracking-widest hidden group-hover:block transition-all" style={{ textShadow: "0 0 8px #FF00FF" }}>
                                    ACTIVATE.LOGOUT()
                                </span>
                            </button>
                        ) : (
                            <Link href="/login" className="group relative inline-flex items-center justify-center px-4 py-1.5 border border-[#39FF14]/40 hover:border-[#39FF14] bg-[#39FF14]/5 transition-all duration-300 cursor-pointer rounded-sm">
                                <span className="text-[#39FF14] font-mono text-xs tracking-widest block group-hover:hidden">
                                    <TypewriterText text={userStatus} delay={300} speed={50} cursor={false} />
                                </span>
                                <span className="text-[#39FF14] font-mono text-xs tracking-widest hidden group-hover:block transition-all" style={{ textShadow: "0 0 8px #39FF14" }}>
                                    ACTIVATE.LOGIN()
                                </span>
                            </Link>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        {/* Big Title matching Stitch Design */}
                        <h1 className="text-6xl md:text-[6rem] lg:text-[7rem] font-black tracking-tighter leading-[0.9] font-space text-white mb-6">
                            SYSTEM<br />
                            <span className="text-[#39FF14]" style={{ textShadow: "0 0 20px rgba(57, 255, 20, 0.4)" }}>ARCHITECT</span>
                        </h1>
                        
                        {/* Description matching Stitch Design */}
                        <p className="text-gray-400 font-mono text-sm md:text-base leading-[1.8] max-w-xl">
                            Engineering high-availability distributed systems and resilient cloud infrastructures. Bridging the gap between raw machine protocols and high-level abstract logic.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row gap-4 mt-6"
                    >
                        {/* Solid Green Button */}
                        <a
                            href="#projects"
                            className="inline-flex items-center justify-center px-8 py-3.5 bg-[#39FF14] text-black font-space font-bold uppercase tracking-widest text-sm hover:bg-[#39FF14]/80 transition-all duration-300 shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:shadow-[0_0_30px_rgba(57,255,20,0.5)]"
                        >
                            VIEW_PROJECTS
                        </a>

                        {/* Hollow Cyan Button */}
                        <button
                            onClick={() => setIsContactOpen(true)}
                            className="inline-flex items-center justify-center px-8 py-3.5 bg-transparent border-2 border-[#00FBFB] text-[#00FBFB] font-space font-bold uppercase tracking-widest text-sm hover:bg-[#00FBFB]/10 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,251,251,0.2)]"
                        >
                            SEND_MESSAGE
                        </button>
                    </motion.div>
                </div>

                {/* Right Column removed per user request */}

            </div>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </div>
    );
}
