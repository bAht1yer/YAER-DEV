"use client";

import { motion } from "framer-motion";
import GlitchText from "../ui/GlitchText";
import TypewriterText from "../ui/TypewriterText";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Hero() {
    const { data: session } = useSession();
    const userStatus = session?.user?.name ? `SYSTEM.INIT(USER: ${session.user.name.toUpperCase()})` : "SYSTEM.INIT(USER: VISITOR)";

    return (
        <section id="hero" className="relative h-screen w-full overflow-hidden bg-transparent">

            {/* Content Overlay - Centered & On Top */}
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-center pointer-events-none mix-blend-difference px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="pointer-events-auto"
                >
                    <div className="mb-6">
                        {session ? (
                            <button onClick={() => signOut()} className="group relative inline-flex items-center justify-center px-6 py-2 border border-primary/50 hover:border-accent rounded-full bg-black/50 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,0,60,0.4)] cursor-pointer">
                                <span className="text-primary font-mono text-sm tracking-widest block group-hover:hidden">
                                    <TypewriterText text={userStatus} delay={500} speed={50} cursor={false} />
                                </span>
                                <span className="text-red-500 font-mono text-sm tracking-widest hidden group-hover:block transition-all text-glow-red">
                                    ACTIVATE.LOGOUT()
                                </span>
                            </button>
                        ) : (
                            <Link href="/login" className="group relative inline-flex items-center justify-center px-6 py-2 border border-primary/50 hover:border-primary rounded-full bg-black/50 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] cursor-pointer">
                                <span className="text-primary font-mono text-sm tracking-widest block group-hover:hidden">
                                    <TypewriterText text={userStatus} delay={500} speed={50} cursor={false} />
                                </span>
                                <span className="text-primary font-mono text-sm tracking-widest hidden group-hover:block transition-all text-glow-cyan">
                                    ACTIVATE.LOGIN()
                                </span>
                            </Link>
                        )}
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="text-5xl md:text-7xl lg:text-[10rem] font-bold mb-2 tracking-tighter leading-none relative z-20"
                    style={{
                        textShadow: "0 0 10px rgba(0, 240, 255, 0.5), 0 0 20px rgba(0, 240, 255, 0.3), 0 0 30px rgba(0, 240, 255, 0.1)"
                    }}
                >
                    <GlitchText text1="YAER" text2="Y43R" />
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                >
                    <div className="text-gray-300 text-xl md:text-2xl font-mono max-w-2xl mx-auto leading-relaxed mt-4 flex flex-col gap-2">
                        <div>
                            <span className="text-accent mr-2">&gt;</span>
                            <TypewriterText text="Full Stack Creative Developer" delay={1000} speed={50} cursor={true} hideCursorOnComplete={true} />
                        </div>
                        <div>
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 3, duration: 0.1 }} // Appears just before typing starts
                                className="text-accent mr-2"
                            >
                                &gt;
                            </motion.span>
                            <TypewriterText text="Building Digital Realities" delay={3000} speed={50} cursor={true} />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                    className="mt-12 pointer-events-auto"
                >
                    <a
                        href="#projects"
                        className="group relative inline-flex items-center gap-2 px-8 py-3 bg-transparent overflow-hidden rounded-sm hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-all duration-300"
                    >
                        <span className="absolute inset-0 border border-primary group-hover:border-primary/50 transition-colors duration-300"></span>
                        <span className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                        <span className="relative text-primary font-mono uppercase tracking-widest text-sm group-hover:text-white transition-colors">
                            Initialize_Project_View()
                        </span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
