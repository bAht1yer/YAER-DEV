"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Bot, BookOpenText, Building2, ExternalLink, ReceiptText, Smartphone, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { PROJECT_CATALOG, type ProjectCatalogItem, type ProjectId } from "@/data/projectCatalog";
import RevealText from "../ui/RevealText";

/**
 * Projects -- sticky stacked case-study cards inspired by the reference prompt.
 * Compact stacked case-study cards keep each project focused on one strong image.
 */

const PROJECT_ICONS: Record<ProjectId, LucideIcon> = {
    nuo: Building2,
    bossimating: ReceiptText,
    revamp: Bot,
    digitao: Smartphone,
    wyisdom: BookOpenText,
};

export type Project = ProjectCatalogItem & { icon: LucideIcon };

// Kept as a compatibility export for the existing project cube reel. The
// content itself now has one serializable source of truth in PROJECT_CATALOG.
export const projects: Project[] = PROJECT_CATALOG.map((project) => ({
    ...project,
    icon: PROJECT_ICONS[project.id],
}));

function ProjectImage({
    project,
}: {
    project: Project;
}) {
    const isContained = project.imageFit === "contain";

    return (
        <motion.div
            className="group/image relative aspect-[16/10] overflow-hidden rounded-lg border border-[#34E5FF]/18 bg-[#071218] shadow-[inset_0_0_40px_rgba(52,229,255,0.035)]"
            whileHover={{ scale: 1.012 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
            {isContained && (
                <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(52,229,255,0.14),transparent_46%),linear-gradient(135deg,#071218_0%,#09151d_48%,#0c1020_100%)]" />
                    <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(52,229,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(52,229,255,0.09)_1px,transparent_1px)] [background-size:32px_32px]" />
                </>
            )}

            <div className={isContained ? "absolute inset-[7%] sm:inset-[8%]" : "absolute inset-0"}>
                <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    className={`${isContained ? "object-contain object-center" : "object-cover object-top"} transition-transform duration-700 group-hover/image:scale-[1.025]`}
                    sizes="(min-width: 1280px) 680px, (min-width: 768px) 54vw, calc(100vw - 3rem)"
                />
            </div>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071218]/25 via-transparent to-transparent" />
            <span className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 border-b border-l border-[#7AF0FF]/45" />
            <span className="pointer-events-none absolute right-4 top-4 h-6 w-6 border-r border-t border-[#7AF0FF]/45" />
        </motion.div>
    );
}

function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const reducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start start"],
    });
    const targetScale = 1 - (total - 1 - index) * 0.025;
    const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
    const entranceY = useTransform(scrollYProgress, [0, 0.6], [reducedMotion ? 0 : 48, 0]);
    return (
        <div ref={containerRef} className="relative py-4 md:h-[68vh] md:min-h-[540px]">
            <motion.article
                style={{ scale, y: entranceY, top: `calc(4.5rem + ${index * 14}px)` }}
                className={`relative overflow-hidden rounded-lg bg-[#08151B]/95 p-4 shadow-[0_22px_64px_rgba(0,0,0,0.46)] md:sticky md:p-5 lg:p-6 ${
                    project.featured
                        ? "border border-[#A4F7FF]/58 shadow-[0_28px_90px_rgba(52,229,255,0.13)]"
                        : "border border-[#34E5FF]/28"
                }`}
            >
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(52,229,255,0.08),transparent_38%,rgba(155,123,255,0.08))]" />
                <div className="relative z-10 grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center lg:gap-8">
                    <div className="flex min-w-0 flex-col">
                        <div className="min-w-0">
                            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#34E5FF]">
                                {project.eyebrow}
                            </p>
                            <h3 className="text-3xl font-black tracking-normal text-white md:text-4xl">
                                {project.title}
                            </h3>
                            <p className="mt-3 max-w-3xl text-sm leading-6 text-[#A8BAC3] md:text-base">
                                {project.description}
                            </p>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">
                            {project.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full border border-[#34E5FF]/20 bg-[#34E5FF]/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#CBD2D9]"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <a
                            href={project.links.demo}
                            target={project.external ? "_blank" : undefined}
                            rel={project.external ? "noopener noreferrer" : undefined}
                            className="mt-6 inline-flex w-fit items-center justify-center gap-2 rounded-full border border-[#CBD2D9]/45 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#CBD2D9] transition-colors hover:border-[#34E5FF] hover:text-white"
                        >
                            Live Project
                            <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                    </div>

                    <div className="min-w-0">
                        <ProjectImage project={project} />
                    </div>
                </div>
            </motion.article>
        </div>
    );
}

export default function Projects() {

    return (
        <section id="projects" className="relative w-full bg-transparent px-4 py-24 sm:px-6 lg:px-8">
            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 mb-2"
                    >
                        <motion.span
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="h-px w-10 origin-left bg-[#34E5FF]"
                        />
                        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#34E5FF]">
                            Selected work
                        </span>
                    </motion.div>
                    <RevealText
                        as="h2"
                        text="Projects"
                        stagger={0.04}
                        className="text-4xl font-black tracking-tight text-white md:text-5xl"
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="mt-4 max-w-xl text-base leading-7 text-[#8AA3AD]"
                    >
                        Live products, focused interfaces, and systems built around real work.
                    </motion.p>
                </div>

                <div className="relative">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            index={index}
                            total={projects.length}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
