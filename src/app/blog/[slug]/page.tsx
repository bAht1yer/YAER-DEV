import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";


export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;

    const post = await prisma.post.findUnique({
        where: { slug: resolvedParams.slug },
        include: { category: true }
    });

    if (!post || !post.published) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black text-gray-300 relative font-mono selection:bg-primary/30">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20">

                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
            </div>

            <Navbar />

            <article className="pt-32 pb-20 relative z-10 max-w-4xl mx-auto px-6">
                <Link href="/blog" className="flex items-center gap-2 text-primary/50 hover:text-primary mb-8 font-mono text-xs uppercase tracking-widest transition-colors w-fit group">
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    &lt; Return_To_Databank()
                </Link>

                {/* Subtle, rotating wireframe cube watermark in the background of the reader */}
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-5 z-[-1]">
                    <div className="w-full h-full animate-[spin_180s_linear_infinite]">
                        <div className="absolute inset-0 border-[4px] border-primary rotate-45 transform-gpu" />
                        <div className="absolute inset-0 border-[4px] border-primary rotate-12 transform-gpu" />
                    </div>
                </div>

                <header className="mb-16 border-b border-primary/20 pb-8 relative">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-primary tracking-widest uppercase text-xs border border-primary/30 px-2 py-1 bg-primary/10">
                            {post.category?.name || "SYS.LOG"}
                        </span>
                        <span className="text-gray-500 text-xs tracking-widest uppercase flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            {post.createdAt.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: '2-digit' })}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tighter mb-6 relative">
                        <span className="relative z-10 text-glow-cyan">{post.title}</span>
                    </h1>

                    <div className="text-gray-500 tracking-widest uppercase text-xs flex gap-4">
                        <span>Author: YAER_SYS</span>
                        <span>ID: {post.id.split("").slice(-8).join("")}</span>
                    </div>
                </header>

                <div className="prose prose-invert prose-p:text-gray-400 prose-headings:text-white prose-headings:uppercase prose-headings:tracking-wider prose-headings:scroll-mt-32 prose-a:text-primary prose-a:no-underline hover:prose-a:text-white prose-a:transition-colors prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1 prose-code:rounded-sm max-w-none prose-pre:bg-black/50 prose-pre:border prose-pre:border-primary/20 prose-pre:shadow-[inset_0_0_15px_rgba(0,0,0,1)]">
                    <ReactMarkdown rehypePlugins={[rehypeSlug]}>{post.content}</ReactMarkdown>
                </div>

                <div className="mt-20 pt-8 border-t border-primary/20 flex justify-between items-center text-xs tracking-widest uppercase text-gray-500">
                    <span>END OF TRANSMISSION.</span>
                    <span>[&lt; /&gt;]</span>
                </div>
            </article>

            <Footer />
        </main>
    );
}
