import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { auth } from "@/auth";

export default async function PostsDashboard() {
    const session = await auth();
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        include: { category: true }
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
            <header className="flex justify-between items-end border-b border-primary/30 pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-white text-glow-cyan tracking-widest uppercase mb-2">
                        Datacube Manager
                    </h1>
                    <p className="text-primary/70">Create, encrypt, and publish entries.</p>
                </div>
                <Link
                    href="/dashboard/posts/new"
                    className="flex items-center gap-2 px-6 py-2 bg-primary/20 hover:bg-primary/40 text-primary border border-primary font-bold tracking-widest uppercase transition-all shadow-glow"
                >
                    <Plus className="w-5 h-5" />
                    New Entry
                </Link>
            </header>

            <div className="glass-panel border border-primary/20 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-primary/10 border-b border-primary/20 text-xs uppercase tracking-widest text-primary/70">
                            <th className="p-4 font-normal">Title</th>
                            <th className="p-4 font-normal">Category</th>
                            <th className="p-4 font-normal">Status</th>
                            <th className="p-4 font-normal">Date</th>
                            <th className="p-4 font-normal text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-500 uppercase tracking-widest text-sm">
                                    No Datacubes Detected...
                                </td>
                            </tr>
                        ) : (
                            posts.map((post) => (
                                <tr key={post.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                    <td className="p-4 font-bold text-gray-200">{post.title}</td>
                                    <td className="p-4 text-sm text-gray-400">
                                        {post.category?.name || "Uncategorized"}
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-block px-2 py-1 text-xs tracking-widest uppercase font-bold rounded-sm border ${post.published
                                            ? "text-cyan-400 border-cyan-400/30 bg-cyan-400/10"
                                            : "text-orange-400 border-orange-400/30 bg-orange-400/10"
                                            }`}>
                                            {post.published ? "Active" : "Draft"}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-gray-500">
                                        {post.createdAt.toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-50 group-hover:opacity-100 transition-opacity">
                                            <Link href={`/dashboard/posts/${post.id}`} className="text-primary hover:text-white transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button className="text-red-500 hover:text-red-400 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
