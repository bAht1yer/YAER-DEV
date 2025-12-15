"use client";

import { motion } from "framer-motion";
import Section from "../ui/Section";
import { ExternalLink, Github, Terminal, Cpu } from "lucide-react";
import Image from "next/image";

const projects = [
    {
        title: "Full Stack Websites",
        description: "E-commerce, AI Solutions, SaaS Platforms, and Web Gaming. Real production deployments.",
        tags: ["Next.js", "React", "AI", "Stripe"],
        image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=1000", // Reusing the original image for now, as no new image was provided for "Full Stack Websites"
        links: { demo: "/projects/web-collection", github: "#" }, // Using the provided link for demo, github is placeholder
    },
    {
        title: "Project Spirit Vein",
        description: "2D Isometric Turn-Based RPG built in Unity. Features dynamic fog of war, shadow casting, and complex persistent world state.",
        tags: ["Unity", "C#", "Algorithm", "Game Dev", "In Development"],
        image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&q=80&w=1000",
        links: { demo: "/projects/spirit-vein", github: "#" },
    },
    {
        title: "CoinBot",
        description: "Institutional-grade algorithmic trading platform for Coinbase Advanced Trade. Features decoupled microservices, real-time risk engine, and AES-256 encrypted key management.",
        tags: ["Next.js 16", "Node.js Worker", "PostgreSQL", "WebSocket"],
        image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&q=80&w=1000",
        links: { demo: "/projects/coinbot", github: "#" },
    },
];

export default function Projects() {
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
                    <span className="text-primary">03.</span> Featured_Projects
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative glass-panel overflow-hidden hover:neon-border transition-all duration-300 h-full flex flex-col"
                        >
                            {/* Cyberpunk Decor */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary opacity-50 group-hover:opacity-100 transition-opacity" />

                            {/* Image Overlay */}
                            <div className="relative h-48 overflow-hidden border-b border-white/10">
                                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transform group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-grow flex flex-col">
                                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                                    <Cpu className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    {project.title}
                                </h3>

                                <p className="text-gray-400 mb-6 text-sm flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-4 mt-auto">
                                    <a href={project.links.github} className="text-gray-400 hover:text-white hover:text-glow transition-all">
                                        <Github className="w-5 h-5" />
                                    </a>
                                    <a href={project.links.demo} className="text-gray-400 hover:text-white hover:text-glow transition-all">
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
