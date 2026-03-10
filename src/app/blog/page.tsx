import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import Section from "@/components/ui/Section";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import BlogFilters from "@/components/blog/BlogFilters";
import BlogPagination from "@/components/blog/Pagination";
import InteractiveGrid from "@/components/ui/InteractiveGrid";

export default async function BlogIndex({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; category?: string; page?: string }>
}) {
    const resolvedParams = await searchParams;
    const query = resolvedParams.q || "";
    const categoryFilter = resolvedParams.category || "all";
    const currentPage = Number(resolvedParams.page) || 1;
    const POSTS_PER_PAGE = 9;

    const whereClause: Prisma.PostWhereInput = { published: true };

    if (query) {
        whereClause.OR = [
            { title: { contains: query, mode: "insensitive" } },
            { content: { contains: query, mode: "insensitive" } }
        ];
    }

    if (categoryFilter !== "all") {
        whereClause.category = { slug: categoryFilter };
    }

    const [posts, totalPosts, categories] = await Promise.all([
        prisma.post.findMany({
            where: whereClause,
            orderBy: { createdAt: "desc" },
            include: { category: true },
            skip: (currentPage - 1) * POSTS_PER_PAGE,
            take: POSTS_PER_PAGE,
        }),
        prisma.post.count({ where: whereClause }),
        prisma.category.findMany()
    ]);

    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

    return (
        <main className="min-h-screen bg-black text-white relative font-mono selection:bg-primary/30">
            <InteractiveGrid />

            <Navbar />

            <Section id="blog" className="pt-32 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <header className="mb-20 text-center relative">
                        <Link href="/dashboard" className="absolute top-0 right-0 text-xs border border-primary/30 text-primary/70 px-4 py-2 hover:bg-primary/10 hover:text-primary transition-all uppercase tracking-widest hidden md:block">
                            SYS.ADMIN
                        </Link>
                        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-glow-cyan uppercase tracking-widest text-primary flex justify-center items-end flex-wrap gap-2 md:gap-4 leading-none">
                            <span>The Databank</span>
                            <span
                                className="inline-block animate-[pulse_1s_step-end_infinite] w-[0.8em] h-[0.15em] bg-primary -skew-x-12 translate-y-[-0.1em]"
                                style={{
                                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.8), 3px 3px 0px rgba(0, 0, 0, 1), -2px -2px 0px rgba(0, 255, 255, 0.4)'
                                }}
                            ></span>
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto uppercase tracking-widest text-sm">
                            Archived transmissions, technical logs, and systems philosophy.
                        </p>
                    </header>

                    <BlogFilters categories={categories} />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 py-12 perspective-1000">
                        {posts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="group block relative h-48 transition-all duration-500 hover:-translate-y-2 gradient-border"
                            >
                                <div className="absolute inset-0 bg-black/90 flex flex-col justify-center items-center text-center p-6 transition-all duration-500 rounded-xl">
                                    <div className="text-xs text-primary mb-2 tracking-widest uppercase">
                                        {post.category?.name || "SYS.LOG"}
                                    </div>
                                    <h2 className="text-xl font-bold text-white uppercase tracking-wider line-clamp-2">
                                        {post.title}
                                    </h2>
                                    <div className="absolute bottom-6 flex flex-col items-center w-full">
                                        <div className="text-xs text-gray-400 transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-4">
                                            {post.createdAt.toLocaleDateString()}
                                        </div>
                                        <div className="absolute text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                            Read More <span>&rarr;</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {posts.length === 0 && (
                            <div className="col-span-full py-20 text-center text-gray-500 uppercase tracking-widest border border-white/5 bg-black/50">
                                DATABANK IS EMPTY. NO TRANSMISSIONS FOUND.
                            </div>
                        )}
                    </div>

                    <BlogPagination currentPage={currentPage} totalPages={totalPages} />
                </div>
            </Section>

            <Footer />
        </main>
    );
}
