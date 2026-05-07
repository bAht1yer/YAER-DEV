"use client";

import { motion } from "framer-motion";
import Section from "../ui/Section";
import { Bot, ExternalLink, Github, ReceiptText, Smartphone, Terminal, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Project = {
    title: string;
    eyebrow: string;
    description: string;
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
        description: "A product for small construction teams that brings estimates, invoices, payments, approvals, dashboards, and helpful AI tools into one practical workspace.",
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
        description: "A service website with a live AI support flow, clear service pages, and a polished brand presence that feels ready for customers.",
        tags: ["Next.js", "Dify AI", "Customer Support", "Live Site"],
        image: "/projects/revamp.png",
        links: { demo: "https://www.revampsolutions.ca/" },
        icon: Bot,
        external: true,
    },
    {
        title: "DigiTao",
        eyebrow: "Mobile learning companion",
        description: "A calm mobile app for reading the Tao Te Ching with character notes, AI interpretation, bilingual recitation, and guided practice.",
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
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-12 text-white flex items-center gap-3"
                >
                    <Terminal className="text-primary w-8 h-8 md:w-10 md:h-10" />
                    Selected Work
                </motion.h2>

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
                            <div onClick={() => openProject(project)} className="group relative glass-panel overflow-hidden hover:neon-border transition-all duration-300 h-full flex flex-col block cursor-pointer">
                                {/* Cyberpunk Decor */}
                                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary opacity-50 group-hover:opacity-100 transition-opacity" />

                                {/* Image Overlay */}
                                <div className={`relative overflow-hidden border-b border-white/10 ${project.featured ? "h-72 md:h-80" : "h-56"}`}>
                                    {project.image ? (
                                        <>
                                            <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover object-top transform group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
                                            />
                                        </>
                                    ) : (
                                        <div className="absolute inset-0 bg-[#070707] p-5">
                                            <div className="h-full border border-[#39FF14]/20 bg-[#0d0d0d] p-4 shadow-[inset_0_0_25px_rgba(57,255,20,0.04)]">
                                                <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                                                    <div>
                                                        <div className="font-mono text-[10px] uppercase tracking-widest text-gray-500">Dashboard</div>
                                                        <div className="text-sm font-bold text-white">Apex Contracting</div>
                                                    </div>
                                                    <div className="font-mono text-lg font-bold text-[#39FF14]">$184.2k</div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {[
                                                        ["Projects", "14"],
                                                        ["Pending", "5"],
                                                        ["Outstanding", "$22.4k"],
                                                        ["Approvals", "Court-ready"],
                                                    ].map(([label, value]) => (
                                                        <div key={label} className="border border-white/10 bg-white/[0.03] p-3">
                                                            <div className="font-mono text-[10px] uppercase tracking-widest text-gray-500">{label}</div>
                                                            <div className="mt-2 text-base font-bold text-white">{value}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="mt-4 h-2 overflow-hidden bg-white/10">
                                                    <div className="h-full w-[68%] bg-[#39FF14]" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-grow flex flex-col relative z-20">
                                    <div className="mb-3 flex items-center justify-between gap-3">
                                        <span className="font-mono text-[11px] uppercase tracking-widest text-primary">
                                            {project.eyebrow}
                                        </span>
                                        {project.external && <ExternalLink className="h-4 w-4 text-gray-500 group-hover:text-primary transition-colors" />}
                                    </div>

                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors flex items-center gap-2">
                                        <project.icon className="w-5 h-5 text-accent opacity-80 group-hover:opacity-100 transition-opacity" />
                                        {project.title}
                                    </h3>

                                    <p className="text-gray-400 mb-6 text-sm leading-6 flex-grow">
                                        {project.description}
                                    </p>

                                    {project.metrics && (
                                        <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
                                            {project.metrics.map((metric) => (
                                                <span key={metric} className="border border-[#39FF14]/20 bg-[#39FF14]/5 px-3 py-2 font-mono text-[11px] text-[#39FF14]">
                                                    {metric}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-4 mt-auto">
                                        {project.links.github && (
                                            <a href={project.links.github} onClick={(e) => e.stopPropagation()} className="text-gray-400 hover:text-white hover:text-glow transition-all">
                                                <Github className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
