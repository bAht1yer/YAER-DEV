"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2, Terminal, User, Mail, FileText } from "lucide-react";
import GlitchText from "./GlitchText";

const navItems = [
    { name: "About", href: "/#about", icon: User },
    { name: "Skills", href: "/#skills", icon: Terminal },
    { name: "Projects", href: "/#projects", icon: Code2 },
    { name: "Blog", href: "/blog", icon: FileText },
    { name: "Contact", href: "/#contact", icon: Mail },
];

export default function Navbar({ hideOnTop = false }: { hideOnTop?: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        handleScroll(); // Check initial scroll state
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // If hideOnTop is true, it only becomes visible when scrolled > 50px
    const isVisible = hideOnTop ? scrolled : true;

    return (
        <motion.nav
            initial={{ clipPath: "inset(0 50% 0 50%)" }}
            animate={{ clipPath: "inset(0 0% 0 0%)" }}
            transition={{ duration: 1, ease: "circOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/90 backdrop-blur-md border-b border-[#39FF14]/30 py-4" : "bg-transparent py-6"
                } ${isVisible ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-full"}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 cursor-pointer">
                        <Link href="/" className="text-2xl tracking-tighter flex items-baseline font-bold leading-none">
                            <span className="text-[#39FF14]">&lt;</span>
                            <GlitchText text1="YAER" text2="Y43R" className="text-white mx-1" />
                            <span className="text-[#39FF14]">/&gt;</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-gray-300 hover:text-[#39FF14] hover:shadow-[0_0_15px_rgba(57,255,20,0.5)] transition-all duration-300 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 group"
                                >
                                    <item.icon className="w-4 h-4 group-hover:text-[#00FBFB] transition-colors" />
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-[#39FF14] p-2"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/95 backdrop-blur-xl border-b border-[#39FF14]/30 overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-300 hover:text-[#39FF14] block px-3 py-2 rounded-md text-base font-medium flex items-center gap-3"
                                >
                                    <item.icon className="w-5 h-5 text-[#00FBFB]" />
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
