import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Section from "@/components/ui/Section";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default async function BlogIndex() {
    const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
        include: { category: true }
    });

    return (
        <main className="min-h-screen bg-black text-white relative font-mono selection:bg-primary/30">
            <div className="fixed inset-0 z-0 pointer-events-none">

                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
            </div>

            <Navbar />

            <Section id="blog" className="pt-32 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <header className="mb-20 text-center relative">
                        <Link href="/dashboard" className="absolute top-0 right-0 text-xs border border-primary/30 text-primary/70 px-4 py-2 hover:bg-primary/10 hover:text-primary transition-all uppercase tracking-widest hidden md:block">
                            SYS.ADMIN
                        </Link>
                        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-glow-cyan uppercase tracking-widest text-primary">
                            The Databank
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto uppercase tracking-widest text-sm">
                            Archived transmissions, technical logs, and systems philosophy.
                        </p>
                    </header>

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
                </div>
            </Section>

            <Footer />
        </main>
    );
}
