"use client";

import { motion } from "framer-motion";
import Section from "../ui/Section";
import { Bot, ExternalLink, Github, ReceiptText, Smartphone, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

/**
 * Projects (Selected Work) -- industrial restyle.
 *  - Drop grayscale flip on hover
 *  - Industrial palette (lime + steel), no neon shadows
 *  - Bossimating featured card gains one line of contractor authority copy
 */

type Project = {
    title: string;
    eyebrow: string;
    description: string;
    contractorLine?: string;
    tags: string[];
    links: {
        demo: string;
        github?: string;
    };
    icon: LucideIcon;
    image?: string;
    featured?: boolean;
    external?: boolean;
    metrics?: string[];
};

const projects: Project[] = [
    {
        title: "Bossimating",
        eyebrow: "Live contractor product",
        description:
            "A product for small construction teams that brings estimates, invoices, payments, approvals, dashboards, and helpful AI tools into one practical workspace.",
        contractorLine:
            "Built to understand how contractors quote, approve, and get paid -- the same thinking goes into every Lead System engagement.",
        tags: ["SaaS", "AI Helpers", "Payments", "Approvals"],
        links: { demo: "https://bossimating.com/" },
        icon: ReceiptText,
        image: "/projects/bossimating-home.png",
        featured: true,
        external: true,
        metrics: ["Estimates in minutes", "Built for small crews", "Real product, live now"],
    },
    {
        title: "Revamp Solutions",
        eyebrow: "AI support experience",
        description:
            "A service website with a live AI support flow, clear service pages, and a polished brand presence that feels ready for customers.",
        tags: ["Next.js", "Dify AI", "Customer Support", "Live Site"],
        image: "/projects/revamp.png",
        links: { demo: "https://www.revampsolutions.ca/" },
        icon: Bot,
        external: true,
    },
    {
        title: "DigiTao",
        eyebrow: "Mobile learning companion",
        description:
            "A calm mobile app for reading the Tao Te Ching with character notes, AI interpretation, bilingual recitation, and guided practice.",
        tags: ["Expo", "React Native", "AI Guidance", "Mobile UX"],
        image: "/projects/digitao/home.png",
        links: { demo: "/projects/digitao", github: "https://github.com/Neilblaze/digitao" },
        icon: Smartphone,
    },
];

export default function Projects() {
    const router = useRouter();

    const openProject = (project: (typeof projects)[number]) => {
        if (project.external) {
            window.open(project.links.demo, "_blank", "noopener,noreferrer");
            return;
        }
        router.push(project.links.demo);
    };

    return (
        <Section id="projects" className="bg-transparent relative">
            <div className="max-w-6xl mx-auto z-10 relative">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <span className="h-px w-10 bg-[#E6FF3A]" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#E6FF3A]">
                            Selected Work
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
                        Shipped, not shelved.
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`h-full ${project.featured ? "lg:col-span-2" : ""}`}
                        >
                            <div
                                onClick={() => openProject(project)}
                                className="group relative h-full flex flex-col cursor-pointer overflow-hidden border border-[#23262B] bg-[#121316] transition-colors duration-300 hover:border-[#E6FF3A]/45"
                            >
                                <span className="pointer-events-none absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[#E6FF3A] opacity-50 group-hover:opacity-100 transition-opacity" />
                                <span className="pointer-events-none absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#E6FF3A] opacity-50 group-hover:opacity-100 transition-opacity" />
                                <span className="pointer-events-none absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#E6FF3A] opacity-50 group-hover:opacity-100 transition-opacity" />
                                <span className="pointer-events-none absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[#E6FF3A] opacity-50 group-hover:opacity-100 transition-opacity" />

                                <div
                                    className={`relative overflow-hidden border-b border-[#23262B] ${
                                        project.featured ? "h-72 md:h-80" : "h-56"
                                    }`}
                                >
                                    {project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-[#0A0B0D] p-5">
                                            <div className="h-full border border-[#23262B] bg-[#0F1013] p-4">
                                                <div className="mb-4 flex items-center justify-between border-b border-[#23262B] pb-3">
                                                    <div>
                                                        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-gray-500">Dashboard</div>
                                                        <div className="text-sm font-bold text-white">Apex Contracting</div>
                                                    </div>
                                                    <div className="font-mono text-lg font-bold text-[#E6FF3A]">$184.2k</div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {[
                                                        ["Projects", "14"],
                                                        ["Pending", "5"],
                                                        ["Outstanding", "$22.4k"],
                                                        ["Approvals", "Court-ready"],
                                                    ].map(([label, value]) => (
                                                        <div key={label} className="border border-[#23262B] bg-white/[0.02] p-3">
                                                            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-gray-500">{label}</div>
                                                            <div className="mt-2 text-base font-bold text-white">{value}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="mt-4 h-2 overflow-hidden bg-white/10">
                                                    <div className="h-full w-[68%] bg-[#E6FF3A]" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 flex-grow flex flex-col relative z-20">
                                    <div className="mb-3 flex items-center justify-between gap-3">
                                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#E6FF3A]">
                                            {project.eyebrow}
                                        </span>
                                        {project.external && (
                                            <ExternalLink className="h-4 w-4 text-gray-500 group-hover:text-[#E6FF3A] transition-colors" />
                                        )}
                                    </div>

                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-[#E6FF3A] transition-colors flex items-center gap-2">
                                        <project.icon className="w-5 h-5 text-[#D4DCE3] opacity-80 group-hover:opacity-100 transition-opacity" />
                                        {project.title}
                                    </h3>

                                    <p className="text-gray-400 mb-4 text-sm leading-7">
                                        {project.description}
                                    </p>

                                    {project.contractorLine && (
                                        <p className="mb-6 border-l-2 border-[#E6FF3A]/60 pl-4 text-[13px] leading-6 italic text-[#DCE0E5]">
                                            {project.contractorLine}
                                        </p>
                                    )}

                                    {project.metrics && (
                                        <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
                                            {project.metrics.map((metric) => (
                                                <span
                                                    key={metric}
                                                    className="border border-[#E6FF3A]/25 bg-[#E6FF3A]/5 px-3 py-2 font-mono text-[11px] text-[#E6FF3A]"
                                                >
                                                    {metric}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#D4DCE3] border border-[#23262B] bg-white/[0.02] px-2.5 py-1"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {project.links.github && (
                                        <div className="flex gap-4">
                                            <a
                                                href={project.links.github}
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-gray-400 hover:text-white transition-colors"
                                                aria-label={`${project.title} GitHub`}
                                            >
                                                <Github className="w-5 h-5" />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
