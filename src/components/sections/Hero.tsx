"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useReducedMotion,
    useSpring,
    type Variants,
} from "framer-motion";
import {
    ArrowRight,
    ArrowUpRight,
    BadgeDollarSign,
    ChevronLeft,
    ChevronRight,
    Send,
    X,
} from "lucide-react";
import { PROJECT_CATALOG } from "@/data/projectCatalog";
import FloatingBlockField from "../canvas/FloatingBlockField";

const reveal: Variants = {
    hidden: { opacity: 0, y: 24, filter: "blur(5px)" },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
    }),
};

function CNTowerGlyph({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 16 24" className={className} fill="currentColor" aria-hidden="true">
            <rect x="7.6" y="0" width="0.8" height="5" />
            <polygon points="7.2,7 8.8,7 8.4,4 7.6,4" />
            <ellipse cx="8" cy="8" rx="3.6" ry="1.4" />
            <ellipse cx="8" cy="9.6" rx="2.6" ry="0.7" opacity="0.85" />
            <polygon points="7.2,11 8.8,11 9.6,22 6.4,22" />
            <rect x="5.6" y="22" width="4.8" height="2" />
        </svg>
    );
}

export default function Hero() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [selectedProject, setSelectedProject] = useState<number | null>(null);
    const reducedMotion = !!useReducedMotion();
    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);
    const glowX = useSpring(pointerX, { stiffness: 72, damping: 18, mass: 0.58 });
    const glowY = useSpring(pointerY, { stiffness: 72, damping: 18, mass: 0.58 });
    const projectedProject = selectedProject === null ? null : PROJECT_CATALOG[selectedProject];

    const selectProject = useCallback((projectIndex: number) => {
        setSelectedProject((current) => (current === projectIndex ? null : projectIndex));
    }, []);

    const stepProject = (direction: -1 | 1) => {
        setSelectedProject((current) => {
            const start = current ?? 0;
            return (start + direction + PROJECT_CATALOG.length) % PROJECT_CATALOG.length;
        });
    };

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        pointerX.set(rect.width * 0.7);
        pointerY.set(rect.height * 0.4);
    }, [pointerX, pointerY]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                document.body.classList.toggle("hero-performance-mode", entry.isIntersecting);
            },
            { threshold: 0.02 }
        );
        observer.observe(section);
        return () => {
            observer.disconnect();
            document.body.classList.remove("hero-performance-mode");
        };
    }, []);

    const updatePointer = (event: PointerEvent<HTMLElement>) => {
        if (reducedMotion || event.pointerType !== "mouse" || !sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        pointerX.set(event.clientX - rect.left);
        pointerY.set(event.clientY - rect.top);
    };

    const resetPointer = () => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        pointerX.set(rect.width * 0.7);
        pointerY.set(rect.height * 0.4);
    };

    return (
        <section
            ref={sectionRef}
            id="about"
            onPointerMove={updatePointer}
            onPointerLeave={resetPointer}
            className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-[#070B0E]"
        >
            <FloatingBlockField
                reducedMotion={reducedMotion}
                selectedProject={selectedProject}
                onProjectSelect={selectProject}
            />

            {/* One translated compositor layer: no blur, blend mode, or per-frame gradient rebuild. */}
            <motion.div
                className="pointer-events-none absolute left-0 top-0 z-[1] h-0 w-0 will-change-transform"
                style={{ x: glowX, y: glowY }}
                aria-hidden="true"
            >
                <div className="h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(122,240,255,0.19)_0%,rgba(52,229,255,0.1)_19%,rgba(155,123,255,0.055)_38%,transparent_69%)] sm:h-[50rem] sm:w-[50rem]" />
            </motion.div>

            {/* Symmetric edge fades keep the wall immersive without hard canvas boundaries. */}
            <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgba(7,11,14,0.94)_0%,rgba(7,11,14,0.7)_34%,rgba(7,11,14,0.1)_66%,rgba(7,11,14,0.12)_78%,rgba(7,11,14,0.94)_100%)]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[44%] bg-gradient-to-t from-[#070B0E] via-[#070B0E]/46 to-transparent" />

            <div
                className="pointer-events-auto absolute right-8 top-24 z-20 hidden items-center gap-2 lg:flex"
                aria-label="Project cube selector"
                role="group"
            >
                <span className="mr-2 font-mono text-[8px] font-semibold uppercase tracking-[0.24em] text-[#7AF0FF]/75">
                    Live project portals
                </span>
                {PROJECT_CATALOG.map((project, index) => (
                    <button
                        key={project.id}
                        type="button"
                        onClick={() => selectProject(index)}
                        aria-label={`Project ${index + 1}: ${project.title}`}
                        aria-pressed={selectedProject === index}
                        className={`flex h-8 w-8 items-center justify-center border font-mono text-[9px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7AF0FF] ${
                            selectedProject === index
                                ? "border-[#7AF0FF] bg-[#7AF0FF] text-[#04181D]"
                                : project.featured
                                  ? "border-[#7AF0FF]/70 bg-[#7AF0FF]/10 text-[#A4F7FF] shadow-[0_0_22px_rgba(52,229,255,0.13)] hover:bg-[#7AF0FF]/20"
                                  : "border-[#34E5FF]/28 bg-[#071218]/80 text-[#A8BAC3] hover:border-[#7AF0FF] hover:text-white"
                        }`}
                    >
                        {String(index + 1).padStart(2, "0")}
                    </button>
                ))}
            </div>

            <AnimatePresence>
                {projectedProject && (
                    <motion.aside
                        key={projectedProject.id}
                        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 34, scale: 0.965 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 22, scale: 0.975 }}
                        transition={{ duration: reducedMotion ? 0.15 : 0.36, ease: [0.16, 1, 0.3, 1] }}
                        className="pointer-events-none absolute right-[2vw] top-[15%] z-20 hidden w-[min(34rem,38vw)] lg:block"
                        aria-live="polite"
                    >
                        <div className="relative border border-[#7AF0FF]/55 bg-[#071218]/82 p-2 shadow-[0_20px_80px_rgba(0,0,0,0.5),0_0_38px_rgba(52,229,255,0.12)] backdrop-blur-[2px]">
                            <span className="pointer-events-none absolute -left-px -top-px h-5 w-5 border-l-2 border-t-2 border-[#A4F7FF]" />
                            <span className="pointer-events-none absolute -bottom-px -right-px h-5 w-5 border-b-2 border-r-2 border-[#A4F7FF]" />

                            <div className="flex items-center justify-between px-2 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7AF0FF]">
                                <span>Project projection / {String(selectedProject! + 1).padStart(2, "0")}</span>
                                <button
                                    type="button"
                                    onClick={() => setSelectedProject(null)}
                                    className="pointer-events-auto flex h-9 w-9 items-center justify-center border border-white/14 bg-[#071218]/90 text-[#A8BAC3] transition-colors hover:border-[#7AF0FF]/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7AF0FF]"
                                    aria-label="Close project projection"
                                >
                                <X className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="relative aspect-[16/9] overflow-hidden border border-[#34E5FF]/20 bg-[#050B0E]">
                                {projectedProject.imageFit === "contain" && (
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(52,229,255,0.14),transparent_48%),linear-gradient(135deg,#071218,#0B1020)]" />
                                )}
                                <Image
                                    src={projectedProject.image}
                                    alt={`${projectedProject.title} project preview`}
                                    fill
                                    priority={selectedProject === 0}
                                    sizes="(min-width: 1440px) 544px, 38vw"
                                    className={
                                        projectedProject.imageFit === "contain"
                                            ? "object-contain object-center p-[7%]"
                                            : "object-cover object-top"
                                    }
                                />
                                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(122,240,255,0.06),transparent_25%,transparent_75%,rgba(7,18,24,0.28))]" />
                                {projectedProject.featured && (
                                    <div className="absolute left-4 top-4 flex items-center gap-2 border border-[#FF8A5B]/55 bg-[#120A07]/88 px-3 py-2.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#FFD2B3] backdrop-blur-sm">
                                        <span className="h-2 w-2 rounded-full bg-[#FF6A3D] shadow-[0_0_12px_rgba(255,106,61,0.95)]" />
                                        New flagship · live AI company
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between gap-5 px-3 pb-3 pt-4">
                                <div className="min-w-0">
                                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7AF0FF]/85">
                                        {projectedProject.eyebrow}
                                    </p>
                                    <h2 className="mt-1 truncate text-3xl font-black tracking-tight text-white">
                                        {projectedProject.title}
                                    </h2>
                                    {projectedProject.featured && (
                                        <p className="mt-2 text-[11px] font-semibold leading-4 text-[#D6E3E8]">
                                            Hire in one sentence · Run once or on a loop
                                        </p>
                                    )}
                                </div>
                                <div className="flex shrink-0 items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => stepProject(-1)}
                                        className="pointer-events-auto flex h-10 w-10 items-center justify-center border border-white/14 bg-[#071218]/88 text-[#A8BAC3] transition-colors hover:border-[#7AF0FF]/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7AF0FF]"
                                        aria-label="Previous project"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => stepProject(1)}
                                        className="pointer-events-auto flex h-10 w-10 items-center justify-center border border-white/14 bg-[#071218]/88 text-[#A8BAC3] transition-colors hover:border-[#7AF0FF]/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7AF0FF]"
                                        aria-label="Next project"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                    <a
                                        href={projectedProject.links.demo}
                                        target={projectedProject.external ? "_blank" : undefined}
                                        rel={projectedProject.external ? "noopener noreferrer" : undefined}
                                        className="pointer-events-auto inline-flex h-10 items-center gap-2 bg-[#7AF0FF] px-4 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#04181D] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                    >
                                        {projectedProject.id === "nuo"
                                            ? "Enter Nuo"
                                            : projectedProject.external
                                              ? "Live page"
                                              : "Case study"}
                                        <ArrowUpRight className="h-3.5 w-3.5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            <div className="pointer-events-none relative z-10 w-full px-4 pb-8 pt-32 sm:px-6 sm:pb-10 md:px-10 lg:px-16 lg:pb-12">
                <div className="max-w-[56rem]">
                    <motion.div
                        variants={reveal}
                        initial="hidden"
                        animate="visible"
                        custom={0.14}
                        className="mb-5 flex items-center gap-3 font-mono text-[9px] font-semibold uppercase tracking-[0.3em] text-[#7AF0FF]"
                    >
                        <span className="h-px w-8 bg-[#34E5FF] shadow-[0_0_8px_rgba(52,229,255,0.8)]" />
                        YAER.DEV
                    </motion.div>

                    <motion.h1
                        variants={reveal}
                        initial="hidden"
                        animate="visible"
                        custom={0.24}
                        className="max-w-[15ch] text-[clamp(3.15rem,7.4vw,7rem)] font-bold uppercase leading-[0.91] tracking-[-0.07em] text-white drop-shadow-[0_8px_32px_rgba(0,0,0,0.38)]"
                    >
                        <span className="block">Websites</span>
                        <span className="block lg:whitespace-nowrap">that help clients</span>
                        <span className="block text-[#7AF0FF]">choose you.</span>
                    </motion.h1>

                    <motion.p
                        variants={reveal}
                        initial="hidden"
                        animate="visible"
                        custom={0.42}
                        className="mt-5 max-w-2xl text-[clamp(0.95rem,1.35vw,1.1rem)] font-light leading-7 text-[#A8BAC3]"
                    >
                        I build clear websites, straightforward quote forms, and useful automations for small teams.
                    </motion.p>

                    <motion.a
                        variants={reveal}
                        initial="hidden"
                        animate="visible"
                        custom={0.5}
                        href={PROJECT_CATALOG[0].links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pointer-events-auto mt-5 flex max-w-md items-center gap-3 border border-[#7AF0FF]/42 bg-[#071A20]/82 p-3.5 shadow-[0_16px_46px_rgba(0,0,0,0.32)] backdrop-blur-sm lg:hidden"
                    >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#A4F7FF]/55 bg-[#A4F7FF]/10 font-mono text-[11px] font-black text-[#A4F7FF]">
                            N
                        </span>
                        <span className="min-w-0 flex-1">
                            <span className="block font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-[#7AF0FF]">
                                New flagship · Nuo
                            </span>
                            <span className="mt-1 block text-xs font-semibold text-white">
                                Hire AI employees. Keep work moving.
                            </span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-[#7AF0FF]" />
                    </motion.a>

                    <motion.div
                        variants={reveal}
                        initial="hidden"
                        animate="visible"
                        custom={0.58}
                        className="mt-6 flex flex-wrap gap-3"
                    >
                        <a
                            href="#contact"
                            className="pointer-events-auto inline-flex items-center justify-center gap-2 bg-[#34E5FF] px-6 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#04181D] transition-all hover:bg-[#7AF0FF] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7AF0FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070B0E] md:px-8 md:py-4"
                        >
                            Send me your site
                            <Send className="h-3.5 w-3.5" />
                        </a>
                        <div className="pointer-events-auto flex w-full gap-3 sm:w-auto">
                            <a
                                href="#projects"
                                className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap bg-white px-4 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#070B0E] transition-all hover:bg-[#DCE7EB] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#070B0E] sm:flex-none md:px-8 md:py-4"
                            >
                                See selected work
                                <ArrowRight className="h-3.5 w-3.5" />
                            </a>
                            <Link
                                href="/quote-service"
                                className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap border border-[#7AF0FF]/42 bg-[#071218]/78 px-4 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#CBD2D9] transition-all hover:border-[#7AF0FF] hover:bg-[#7AF0FF]/10 hover:text-white active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7AF0FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070B0E] sm:flex-none md:px-6 md:py-4"
                            >
                                Compare packages
                                <BadgeDollarSign className="h-3.5 w-3.5 text-[#7AF0FF]" />
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={reveal}
                        initial="hidden"
                        animate="visible"
                        custom={0.72}
                        className="mt-5 flex items-center gap-2"
                    >
                        <CNTowerGlyph className="h-4 w-3 text-[#34E5FF]" />
                        <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#CBD2D9]">
                            Toronto
                        </p>
                    </motion.div>
                </div>
            </div>

        </section>
    );
}
