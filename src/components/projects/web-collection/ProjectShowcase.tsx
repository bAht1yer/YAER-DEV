"use client";

import { motion } from "framer-motion";
import { ExternalLink, ShoppingCart, Bot, Gamepad2, PenTool, Layout } from "lucide-react";
import Image from "next/image";
import BrowserMockup from "@/components/ui/BrowserMockup";

const projects = [
    {
        title: "Revamp Solutions",
        type: "Service Agency + AI",
        desc: "Interactive business site featuring a custom Dify.ai Chatflow integration for intelligent, 24/7 autonomous customer support.",
        tech: ["Next.js", "Dify AI", "Framer Motion", "Tailwind CSS"],
        link: "https://www.revampsolutions.ca/",
        color: "text-amber-400",
        border: "border-amber-500/20",
        bg: "bg-amber-500/5",
        icon: <Bot className="w-6 h-6" />,
        staticImage: "/projects/revamp.png"
    },
    {
        title: "Mystery Cavern",
        type: "Roguelike RPG",
        desc: "An interactive text-based RPG exploring complex state management. Features character classes, inventory systems, and randomized events.",
        tech: ["Vite", "React", "Complex State", "Game Logic"],
        link: "https://myscav.vercel.app/",
        color: "text-emerald-400",
        border: "border-emerald-500/20",
        bg: "bg-emerald-500/5",
        icon: <Gamepad2 className="w-6 h-6" />,
        staticImage: "/projects/mystery-cavern.png"
    },
    {
        title: "BlogYu",
        type: "SaaS Blogging Platform",
        desc: "A personalized blogging platform with full user authentication, content management system, and category-based exploration.",
        tech: ["Next.js", "Auth System", "CMS", "Dynamic Routing"],
        link: "https://demoblog-topaz.vercel.app/",
        color: "text-purple-400",
        border: "border-purple-500/20",
        bg: "bg-purple-500/5",
        icon: <PenTool className="w-6 h-6" />
    },
    {
        title: "Ombrilo",
        type: "E-Commerce / Dropshipping",
        desc: "A premium dropshipping platform focused on furniture and home decor. Features a curated catalog and seamless checkout experience.",
        tech: ["Next.js", "Stripe", "Tailwind", "Vercel"],
        link: "https://ombrilo.vercel.app/",
        color: "text-rose-400",
        border: "border-rose-500/20",
        bg: "bg-rose-500/5",
        icon: <ShoppingCart className="w-6 h-6" />,
        status: "Work in Progress"
    },
];

export default function ProjectShowcase() {
    return (
        <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto space-y-32">
                {projects.map((project, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col md:flex-row gap-12 items-center"
                    >
                        {/* Content */}
                        <div className={`flex-1 space-y-6 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                            <div className="flex items-center gap-3">
                                <span className={`p-3 rounded-xl ${project.bg} ${project.color} border ${project.border}`}>
                                    {project.icon}
                                </span>
                                <span className={`font-mono text-sm tracking-widest uppercase ${project.color}`}>
                                    {project.type}
                                </span>
                                {project.status && (
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/20 text-primary border border-primary/30 uppercase tracking-tighter">
                                        {project.status}
                                    </span>
                                )}
                            </div>

                            <h2 className="text-4xl font-bold text-white">{project.title}</h2>
                            <p className="text-gray-400 text-lg leading-relaxed">{project.desc}</p>

                            <div className="flex flex-wrap gap-3">
                                {project.tech.map((t, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-300">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="pt-4">
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`inline-flex items-center gap-2 text-white hover:gap-4 transition-all duration-300 group`}
                                >
                                    <span className="font-bold">Visit Live Site</span>
                                    <ExternalLink className={`w-4 h-4 ${project.color} group-hover:scale-110 transition-transform`} />
                                </a>
                            </div>
                        </div>

                        {/* Visual / Abstract Representation */}
                        <div className={`flex-1 w-full relative group ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                            <BrowserMockup url={project.link.replace("https://", "")}>
                                {project.staticImage ? (
                                    <div className="relative w-full h-[600px] md:h-[800px] bg-[#0a0a0a] group-hover:scale-[1.02] transition-transform duration-700">
                                        <Image
                                            src={project.staticImage}
                                            alt={project.title}
                                            fill
                                            className="object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                        />
                                        {/* Abstract Icon Overlay (Fades out on hover) */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none bg-black/40">
                                            {project.title === "Revamp Solutions" && <Bot className="w-32 h-32 text-amber-500/40" />}
                                            {project.title === "Mystery Cavern" && <Gamepad2 className="w-32 h-32 text-emerald-500/40" />}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative w-full h-full bg-white">
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-800 pointer-events-none bg-white z-0">
                                            {/* Abstract Pattern Based on Project Type */}
                                            {project.title === "Ombrilo" && <ShoppingCart className="w-32 h-32 text-rose-500/10" />}
                                            {project.title === "BlogYu" && <Layout className="w-32 h-32 text-purple-500/10" />}
                                        </div>
                                        <iframe
                                            src={project.link}
                                            className="relative z-10 w-[200%] h-[200%] scale-50 origin-top-left border-none opacity-90 hover:opacity-100 transition-all duration-700"
                                            tabIndex={-1}
                                            loading="lazy"
                                        />
                                    </div>
                                )}
                            </BrowserMockup>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
