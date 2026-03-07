"use client";

import { motion } from "framer-motion";
import { ExternalLink, ShoppingCart, Bot, Gamepad2, PenTool, Layout } from "lucide-react";
import Image from "next/image";

const projects = [
    {
        title: "Revamp Solutions",
        type: "Service Agency + AI Chatflow",
        isFeatured: true,
        desc: "A comprehensive multi-page company website featuring a live, domain-deployed custom AI chatbot powered by Dify for 24/7 autonomous customer support.",
        tech: ["Next.js", "Dify AI", "Framer Motion", "Live Production"],
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
        staticImage: "/projects/mystery-cavern.png",
        status: "Demo"
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
        icon: <PenTool className="w-6 h-6" />,
        status: "Demo"
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
        status: "In Development"
    }
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
                            </div>

                            <h2 className="text-4xl font-bold text-white flex items-center gap-4">
                                {project.title}
                                {project.isFeatured && (
                                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase tracking-tighter">
                                        ⭐ Featured Project
                                    </span>
                                )}
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed">{project.desc}</p>

                            <div className="flex flex-wrap gap-3">
                                {project.tech.map((t, idx) => (
                                    <span
                                        key={idx}
                                        className={`px-3 py-1 border rounded-full text-xs font-mono ${t === "Live Production"
                                            ? "bg-green-500/20 border-green-500/50 text-green-400 font-bold shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                                            : "bg-white/5 border-white/10 text-gray-300"
                                            }`}
                                    >
                                        {t === "Live Production" && <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-2 animate-pulse" />}
                                        {t}
                                    </span>
                                ))}
                                {project.status && (
                                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-primary/20 text-primary border border-primary/30 uppercase tracking-tighter">
                                        {project.status}
                                    </span>
                                )}
                            </div>

                            <div className="pt-4 flex flex-wrap items-center gap-4">
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
                        <div className={`flex-1 w-full aspect-video rounded-2xl border border-white/10 bg-[#0a0a0a] relative overflow-hidden group ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                            <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent z-10 pointer-events-none" />

                            {/* Browser Mockup Header */}
                            <div className="absolute top-0 left-0 right-0 h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2 z-20">
                                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                <div className="w-2 h-2 rounded-full bg-green-500/50" />
                            </div>

                            {/* Project Preview (Image or Iframe) */}
                            {project.staticImage ? (
                                <div className="absolute inset-0 pt-8 bg-[#0a0a0a] group-hover:scale-105 transition-transform duration-700">
                                    <Image
                                        src={project.staticImage}
                                        alt={project.title}
                                        fill
                                        className="object-contain p-8 opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                                    />
                                    {/* Abstract Icon Overlay (Fades out on hover) */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none">
                                        {i === 0 && <Bot className="w-32 h-32 text-amber-500/20" />}
                                        {i === 1 && <Gamepad2 className="w-32 h-32 text-emerald-500/20" />}
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="absolute inset-0 pt-8 flex items-center justify-center text-gray-800 pointer-events-none">
                                        {/* Abstract Pattern Based on Project Type */}
                                        {i === 2 && <Layout className="w-32 h-32 text-purple-500/10" />}
                                        {i === 3 && <ShoppingCart className="w-32 h-32 text-rose-500/10" />}
                                    </div>

                                    <iframe
                                        src={project.link}
                                        className="w-[200%] h-[200%] scale-50 origin-top-left border-none opacity-100 grayscale hover:grayscale-0 transition-all duration-700 bg-white"
                                        tabIndex={-1}
                                        loading="lazy"
                                    />
                                </>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
