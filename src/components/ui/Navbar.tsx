"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2, Terminal, User, Mail, FileText, Package } from "lucide-react";

/**
 * Navbar -- industrial restyle, built around the yaer.dev brand mark.
 *
 * Logo: image asset (full YAER.DEV wordmark on desktop, Y-only mark on mobile).
 * Drop the assets at:
 *   public/brand/yaer-wordmark.png   -- full horizontal wordmark
 *   public/brand/yaer-mark.png       -- Y-only square mark (for mobile nav)
 *   src/app/icon.png                 -- favicon (App Router auto-detects)
 *   src/app/apple-icon.png           -- iOS home-screen icon (optional)
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
                    ? "bg-[#0A0B0D]/90 backdrop-blur-md border-b border-[#23262B] py-3"
                    : "bg-transparent py-5"
            } ${isVisible ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-full"}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-12">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link
                            href="/"
                            className="group inline-flex items-center"
                            aria-label="yaer.dev home"
                        >
                            {/* Desktop -- full wordmark */}
                            <span className="hidden sm:inline-block">
                                <Image
                                    src="/brand/yaer-wordmark.png"
                                    alt="YAER.DEV"
                                    width={144}
                                    height={32}
                                    priority
                                    className="h-7 w-auto"
                                />
                            </span>
                            {/* Mobile -- Y mark only */}
                            <span className="sm:hidden">
                                <Image
                                    src="/brand/yaer-mark.png"
                                    alt="YAER"
                                    width={32}
                                    height={32}
                                    priority
                                    className="h-7 w-7"
                                />
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
                                    className="group inline-flex items-center gap-2 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-gray-400 transition-colors hover:text-[#E6FF3A]"
                                >
                                    <item.icon className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#E6FF3A] transition-colors" />
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-[#E6FF3A] p-2 transition-colors"
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
                        className="md:hidden border-t border-[#23262B] bg-[#0A0B0D]/95 backdrop-blur-md overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-3 py-3 font-mono text-[12px] uppercase tracking-[0.22em] text-gray-300 hover:text-[#E6FF3A] transition-colors"
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
