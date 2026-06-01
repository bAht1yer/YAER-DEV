"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2, Terminal, User, Mail, FileText, Package } from "lucide-react";

/**
 * Navbar -- industrial restyle.
 *
 * Logo: Y mark image (28x28) + "yaer.dev" rendered as mono caps text in HTML.
 * Hovering the link tints ".dev" lime. Clicking returns to homepage.
 *
 * Same display on desktop and mobile so the brand reads identically everywhere.
 */
const navItems = [
    { name: "About", href: "/#about", icon: User },
    { name: "Packages", href: "/#packages", icon: Package },
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
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isVisible = hideOnTop ? scrolled : true;

    return (
        <motion.nav
            initial={{ clipPath: "inset(0 50% 0 50%)" }}
            animate={{ clipPath: "inset(0 0% 0 0%)" }}
            transition={{ duration: 1, ease: "circOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                    ? "bg-[#0A1014]/90 backdrop-blur-md border-b border-[#1C2A30] py-3"
                    : "bg-transparent py-5"
            } ${isVisible ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-full"}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-12">
                    {/* Logo: mark + text */}
                    <div className="flex-shrink-0">
                        <Link
                            href="/"
                            className="group inline-flex items-center gap-2.5"
                            aria-label="yaer.dev home"
                        >
                            <Image
                                src="/brand/yaer-mark.png"
                                alt=""
                                width={28}
                                height={28}
                                priority
                                className="h-6 w-6"
                            />
                            <span className="flex items-baseline gap-0.5 font-mono text-[13px] tracking-[0.22em] uppercase">
                                <span className="text-white">yaer</span>
                                <span className="text-gray-500 group-hover:text-[#34E5FF] transition-colors">.dev</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="group inline-flex items-center gap-2 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-gray-400 transition-colors hover:text-[#34E5FF]"
                                >
                                    <item.icon className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#34E5FF] transition-colors" />
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="md:hidden">
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-[#34E5FF] p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1014]"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-[#1C2A30] bg-[#0A1014]/95 backdrop-blur-md overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-3 py-3 font-mono text-[12px] uppercase tracking-[0.22em] text-gray-300 hover:text-[#34E5FF] transition-colors"
                                >
                                    <item.icon className="w-4 h-4 text-gray-500" />
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
