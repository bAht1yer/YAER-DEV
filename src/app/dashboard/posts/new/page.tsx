"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, ChevronLeft } from "lucide-react";

export default function NewPost() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [published, setPublished] = useState(false);
    const [categoryName, setCategoryName] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // In a real flow, this sends data to an API route to save the Prisma Post
        // For this demonstration, we simulate standard form validation.
        if (!title || !slug || !content) {
            alert("Title, Slug, and Content are required fields.");
            return;
        }

        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, slug, content, published, categoryName })
            });

            if (res.ok) {
                router.push("/dashboard/posts");
            } else {
                console.error("Save failed");
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-20 animate-in fade-in duration-500">
            <Link href="/dashboard/posts" className="flex items-center gap-2 text-primary/50 hover:text-primary mb-8 font-mono text-xs uppercase tracking-widest transition-colors">
                <ChevronLeft className="w-4 h-4" /> Return to Datacube Manager
            </Link>

            <div className="flex justify-between items-end mb-8 border-b border-primary/20 pb-4">
                <h1 className="text-3xl font-bold text-white text-glow-cyan uppercase tracking-widest">
                    Initialize_Datacube()
                </h1>
                <button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 bg-primary/20 hover:bg-primary/40 text-primary border border-primary px-6 py-2 uppercase tracking-widest text-sm transition-colors shadow-glow"
                >
                    <Save className="w-4 h-4" /> Save
                </button>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs text-primary/70 uppercase tracking-widest font-mono">Datacube Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors font-mono"
                        placeholder="E.g. Building Next.js Applications"
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs text-primary/70 uppercase tracking-widest font-mono">URL Slug</label>
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors font-mono"
                            placeholder="e.g. building-nextjs"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-primary/70 uppercase tracking-widest font-mono">Category (Optional)</label>
                        <input
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors font-mono"
                            placeholder="e.g. Web Dev"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs text-primary/70 uppercase tracking-widest font-mono">Datacube Status</label>
                    <select
                        value={published ? "true" : "false"}
                        onChange={(e) => setPublished(e.target.value === "true")}
                        className="w-full bg-black/50 border border-white/10 px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors font-mono uppercase text-sm"
                    >
                        <option value="false">DRAFT (Offline)</option>
                        <option value="true">PUBLISHED (Online)</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs text-primary/70 uppercase tracking-widest font-mono flex items-center justify-between">
                        <span>Payload (Markdown)</span>
                        <span className="text-gray-500 text-xs normal-case">Supports GitHub Flavored Markdown</span>
                    </label>
                    <textarea
                        rows={15}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 p-4 text-white focus:border-primary focus:outline-none transition-colors font-mono text-sm leading-relaxed"
                        placeholder="# Initialization&#10;&#10;Write your transmission here..."
                    />
                </div>
            </div>
        </div>
    );
}
