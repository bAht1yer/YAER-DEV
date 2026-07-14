"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
    ArrowUpRight,
    Code2,
    FileText,
  Mail,
  Menu,
  Package,
  User,
  X,
} from "lucide-react";

/**
 * Navbar -- industrial restyle.
 *
 * Logo: Y mark image (28x28) + "yaer.dev" rendered as mono caps text in HTML.
 * Hovering the link tints ".dev" cyan. Clicking returns to homepage.
 */
const navItems = [
  { name: "Process", href: "/#skills", icon: User },
  { name: "Projects", href: "/#projects", icon: Code2 },
  { name: "Blog", href: "/blog", icon: FileText },
  { name: "Contact", href: "/#contact", icon: Mail },
];

const quotePackages = [
    {
        name: "Quick Fix",
        description: "Sharpen an existing site",
        href: "/quote-service#packages",
    },
    {
        name: "One-Page Site",
        description: "Launch a clear home base",
        href: "/quote-service#offer-one-page",
    },
    {
        name: "Lead System",
        description: "Build the full quote path",
        href: "/quote-service#offer-lead-system",
    },
];

function DesktopQuoteMenu({ reducedMotion }: { reducedMotion: boolean }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.88, x: -10 }}
            animate={
                reducedMotion
                    ? { opacity: 1 }
                    : {
                          opacity: [0, 1, 1],
                          scale: [0.88, 1.05, 1],
                          x: [-10, 0, 0],
                      }
            }
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={(event) => {
                if (!event.currentTarget.contains(document.activeElement)) {
                    setIsOpen(false);
                }
            }}
            onFocusCapture={() => setIsOpen(true)}
            onBlurCapture={(event) => {
                if (
                    !event.currentTarget.contains(event.relatedTarget as Node | null) &&
                    !event.currentTarget.matches(":hover")
                ) {
                    setIsOpen(false);
                }
            }}
            onKeyDown={(event) => {
                if (event.key === "Escape") {
                    (event.currentTarget.querySelector("a") as HTMLAnchorElement | null)?.focus();
                    setIsOpen(false);
                }
            }}
        >
            <Link
                href="/quote-service"
                aria-haspopup="true"
                aria-expanded={isOpen}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-sm border border-[#65ECFF]/80 bg-gradient-to-r from-[#7AF0FF] via-[#34E5FF] to-[#2BC3E0] px-3.5 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#03191E] shadow-[0_0_18px_rgba(52,229,255,0.22)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_26px_rgba(52,229,255,0.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1014]"
            >
                <span
                    aria-hidden="true"
                    className="absolute inset-y-0 -left-8 w-8 -skew-x-12 bg-white/35 transition-transform duration-500 group-hover:translate-x-32 group-focus-visible:translate-x-32"
                />
                <Package className="relative h-3.5 w-3.5" />
                <span className="relative">Quote</span>
                <ArrowUpRight className="relative h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 5, scale: 0.98 }}
                        transition={{ duration: reducedMotion ? 0.01 : 0.18 }}
                        className="absolute right-0 top-full w-72 pt-3"
                    >
                        <div className="border border-[#2A4650] bg-[#091217]/[0.98] p-2 shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
                            <div className="flex items-center justify-between px-3 pb-2 pt-1">
                                <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#34E5FF]">
                                    Quote packages
                                </span>
                                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#617680]">
                                    Pick a path
                                </span>
                            </div>
                            <div className="space-y-1">
                                {quotePackages.map((item, index) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="group/item flex items-center gap-3 border border-transparent px-3 py-2.5 transition-[border-color,background-color] hover:border-[#34E5FF]/25 hover:bg-[#34E5FF]/[0.07] focus-visible:border-[#34E5FF]/60 focus-visible:bg-[#34E5FF]/[0.07] focus-visible:outline-none"
                                    >
                                        <span className="font-mono text-[9px] text-[#617680] transition-colors group-hover/item:text-[#34E5FF]">
                                            0{index + 1}
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="block text-[12px] font-semibold text-white">
                                                {item.name}
                                            </span>
                                            <span className="mt-0.5 block text-[10px] text-[#81969F]">
                                                {item.description}
                                            </span>
                                        </span>
                                        <ArrowUpRight className="h-3.5 w-3.5 text-[#617680] transition-[color,transform] group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5 group-hover/item:text-[#34E5FF]" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function Navbar({ hideOnTop = false }: { hideOnTop?: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showQuoteCta, setShowQuoteCta] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        const hero = document.getElementById("about");

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            setShowQuoteCta(hero ? hero.getBoundingClientRect().bottom <= 80 : true);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    const isVisible = hideOnTop ? scrolled : true;
  const processItems = navItems.slice(0, 2);
  const secondaryItems = navItems.slice(2);

    return (
        <motion.nav
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: isVisible ? 0 : "-100%", opacity: isVisible ? 1 : 0 }}
            transition={{
                duration: prefersReducedMotion ? 0.01 : 0.8,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,padding] duration-500 ${
                scrolled
                    ? "bg-[#0A1014]/95 border-b border-[#1C2A30] py-3"
                    : "bg-transparent py-5"
            } ${isVisible ? "pointer-events-auto" : "pointer-events-none"}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-12">
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
                                <span className="text-gray-500 group-hover:text-[#34E5FF] transition-colors">
                                    .dev
                                </span>
                            </span>
                        </Link>
                    </div>

                    <div className="hidden lg:block">
                        <div className="ml-10 flex items-center gap-1">
                            {processItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="group inline-flex items-center gap-2 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-gray-400 transition-colors hover:text-[#34E5FF]"
                                >
                                    <item.icon className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#34E5FF] transition-colors" />
                                    {item.name}
                                </Link>
                            ))}

                            <AnimatePresence initial={false}>
                                {showQuoteCta && (
                                    <DesktopQuoteMenu reducedMotion={Boolean(prefersReducedMotion)} />
                                )}
                            </AnimatePresence>

                            {secondaryItems.map((item) => (
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

                    <div className="lg:hidden">
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-[#34E5FF] p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1014]"
                            aria-label="Toggle menu"
                            aria-expanded={isOpen}
                            aria-controls="mobile-navigation"
                        >
                            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id="mobile-navigation"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.01 : 0.24 }}
                        className="lg:hidden border-t border-[#1C2A30] bg-[#0A1014]/[0.98] overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {processItems.map((item) => (
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

                            <AnimatePresence initial={false}>
                                {showQuoteCta && (
                                    <motion.div
                                        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: prefersReducedMotion ? 0.01 : 0.28 }}
                                        className="border border-[#34E5FF]/45 bg-[#34E5FF]/[0.06] p-2"
                                    >
                                        <Link
                                            href="/quote-service"
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center justify-between bg-gradient-to-r from-[#7AF0FF] to-[#2BC3E0] px-3 py-3 font-mono text-[12px] font-bold uppercase tracking-[0.22em] text-[#03191E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                        >
                                            <span className="flex items-center gap-3">
                                                <Package className="h-4 w-4" />
                                                Quote
                                            </span>
                                            <ArrowUpRight className="h-4 w-4" />
                                        </Link>
                                        <div className="grid grid-cols-3 gap-1 pt-2">
                                            {quotePackages.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className="flex min-h-12 items-center justify-center border border-[#2A4650] px-1.5 py-2 text-center font-mono text-[8px] uppercase leading-4 tracking-[0.12em] text-[#A9BCC4] transition-colors hover:border-[#34E5FF]/60 hover:text-[#34E5FF] focus-visible:border-[#34E5FF] focus-visible:text-white focus-visible:outline-none"
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {secondaryItems.map((item) => (
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
