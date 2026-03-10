import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ShareButtons from "@/components/blog/ShareButtons";
import ArticleClientScripts from "@/components/blog/ArticleClientScripts";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const post = await prisma.post.findUnique({
        where: { slug: resolvedParams.slug }
    });

    if (!post) {
        return { title: 'Not Found' };
    }

    return {
        title: `${post.title} | The Databank`,
        description: post.content.substring(0, 160).replace(/[#*`_>\[\]]/g, '').trim() + '...',
        openGraph: {
            title: post.title,
            description: post.content.substring(0, 160).replace(/[#*`_>\[\]]/g, '').trim() + '...',
            type: 'article',
            publishedTime: post.createdAt.toISOString(),
            authors: ['YAER_SYS'],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.content.substring(0, 160).replace(/[#*`_>\[\]]/g, '').trim() + '...',
        }
    };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;

    const post = await prisma.post.findUnique({
        where: { slug: resolvedParams.slug },
        include: { category: true }
    });

    if (!post || !post.published) {
        notFound();
    }

    const words = post.content.split(/\s+/).length;
    const readTime = Math.ceil(words / 200);

    const relatedPosts = await prisma.post.findMany({
        where: {
            categoryId: post.categoryId,
            id: { not: post.id },
            published: true
        },
        take: 3,
        orderBy: { createdAt: "desc" }
    });

    const headings = Array.from(post.content.matchAll(/(?:^|\n)(#{2,3})\s+(.*)/g)).map(m => ({
        level: m[1].length,
        text: m[2],
        id: m[2].toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
    }));

    const file = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeSlug)
        .use(rehypePrettyCode, { theme: "vitesse-dark" })
        .use(rehypeStringify)
        .process(post.content);

    const htmlContent = String(file);

    return (
        <main className="min-h-screen bg-black text-gray-300 relative font-mono selection:bg-primary/30">
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
                        <span>{readTime} MIN READ</span>
                    </div>

                    <ShareButtons title={post.title} />
                </header>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 group/layout items-stretch relative">
                    <ArticleClientScripts />
                    <div
                        className="flex-1 min-w-0 w-full max-w-full prose prose-invert prose-p:text-gray-400 prose-headings:text-white prose-headings:uppercase prose-headings:tracking-wider prose-headings:scroll-mt-32 prose-a:text-primary prose-a:no-underline hover:prose-a:text-white prose-a:transition-colors prose-code:text-primary prose-code:px-1 py-1 prose-code:rounded-sm prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-none prose-pre:shadow-none prose-pre:my-0 [&_figure]:max-w-full [&_pre]:overflow-x-auto [&_pre]:max-w-full [&_pre]:max-h-[500px]"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />

                    <aside className="hidden lg:block shrink-0 transition-[width] duration-300 lg:group-has-[details[open]]/layout:w-64 lg:group-has-[details:not([open])]/layout:w-12 z-20 self-stretch">
                        <details open className="sticky top-32 border-l border-primary/20 pl-6 py-2 group/toc">
                            <summary className="text-xs text-primary tracking-widest uppercase mb-4 font-bold cursor-pointer select-none flex items-center justify-between list-none relative h-6 group-open/toc:w-full w-12 -ml-6 pl-6">
                                <span className="group-open/toc:block hidden">SYS.INDEX</span>

                                {/* Collapsed Vertical Text */}
                                <span className="group-open/toc:hidden absolute left-0 top-0 flex flex-col items-center text-gray-500 hover:text-primary transition-colors h-[60vh] w-12 pt-8">
                                    <span style={{ writingMode: "vertical-rl" }} className="rotate-180 tracking-[0.2em] font-bold">SYS.INDEX</span>
                                    <span className="mt-4 rotate-180 text-lg font-bold">▶</span>
                                </span>

                                <span className="group-open/toc:block hidden transition-transform text-gray-500 hover:text-primary">▼</span>
                            </summary>

                            <div className="pr-4 transition-opacity duration-300 opacity-0 group-open/toc:opacity-100">
                                <ul className="space-y-3 text-xs tracking-widest uppercase text-gray-500">
                                    {headings.map(h => (
                                        <li key={h.id} className={`${h.level === 3 ? "pl-4" : ""}`}>
                                            <a href={`#${h.id}`} className="hover:text-primary transition-colors block truncate" title={h.text}>
                                                {h.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </details>
                    </aside>
                </div>

                <div className="mt-20 pt-8 border-t border-primary/20 flex justify-between items-center text-xs tracking-widest uppercase text-gray-500">
                    <span>END OF TRANSMISSION.</span>
                    <span>[&lt; /&gt;]</span>
                </div>

                {relatedPosts.length > 0 && (
                    <div className="mt-24">
                        <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-8 flex items-center gap-4">
                            <span className="text-primary">&gt;</span> RELATED TRANSMISSIONS
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedPosts.map(rp => (
                                <Link key={rp.id} href={`/blog/${rp.slug}`} className="group block relative h-32 transition-all duration-500 hover:-translate-y-1 hover-gradient-border border border-primary/20 bg-black/50 p-4 rounded-lg">
                                    <div className="text-xs text-primary mb-2 tracking-widest uppercase">
                                        SYS.LOG
                                    </div>
                                    <h4 className="text-sm font-bold text-white uppercase tracking-wider line-clamp-2 group-hover:text-primary transition-colors">
                                        {rp.title}
                                    </h4>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </article>

            <Footer />
        </main>
    );
}
