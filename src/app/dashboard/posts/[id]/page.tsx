"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, ChevronLeft, Trash2, Loader2, RefreshCw } from "lucide-react";

export default function EditPost({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [published, setPublished] = useState(false);
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            try {
                // Fetch existing post data from a separate GET route or directly from server actions
                // Since we don't have a GET by ID route yet, we'll fetch via server action or a new route
                // Actually, let's create a quick API fetch if we need to, but Server Components are better. 
                // Since this is a client component, let's fetch from the server.
                const res = await fetch(`/api/posts/${id}`);
                if (res.ok) {
                    const post = await res.json();
                    setTitle(post.title || "");
                    setSlug(post.slug || "");
                    setContent(post.content || "");
                    setPublished(post.published || false);
                    setCategoryName(post.category?.name || "");
                } else {
                    console.error("Failed to load post");
                    router.push("/dashboard/posts");
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchPost();
    }, [id, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !slug || !content) {
            alert("Title, Slug, and Content are required fields.");
            return;
        }

        setIsSaving(true);
        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, slug, content, published, categoryName })
            });

            if (res.ok) {
                router.push("/dashboard/posts");
            } else {
                console.error("Update failed");
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to permanently delete this datacube?")) {
            return;
        }

        setIsDeleting(true);
        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                router.push("/dashboard/posts");
            } else {
                console.error("Delete failed");
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64 text-primary">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto pb-20 animate-in fade-in duration-500">
            <Link href="/dashboard/posts" className="flex items-center gap-2 text-primary/50 hover:text-primary mb-8 font-mono text-xs uppercase tracking-widest transition-colors">
                <ChevronLeft className="w-4 h-4" /> Return to Datacube Manager
            </Link>

            <div className="flex justify-between items-end mb-8 border-b border-primary/20 pb-4">
                <h1 className="text-3xl font-bold text-white text-glow-cyan uppercase tracking-widest flex items-center gap-3">
                    <RefreshCw className="w-6 h-6 text-primary" />
                    Modify_Datacube()
                </h1>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="flex items-center gap-2 text-red-500 hover:text-red-400 px-4 py-2 uppercase tracking-widest text-sm transition-colors disabled:opacity-50"
                    >
                        {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        Purge
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSaving}
                        className="flex items-center gap-2 bg-primary/20 hover:bg-primary/40 text-primary border border-primary px-6 py-2 uppercase tracking-widest text-sm transition-colors shadow-glow disabled:opacity-50"
                    >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Update
                    </button>
                </div>
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
