import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import BlogFilters from "@/components/blog/BlogFilters";
import BlogPagination from "@/components/blog/Pagination";

export default async function BlogIndex({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  const categoryFilter = resolvedParams.category || "all";
  const parsedPage = Number(resolvedParams.page);
  const currentPage =
    Number.isSafeInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const POSTS_PER_PAGE = 9;

  const whereClause: Prisma.PostWhereInput = { published: true };

  if (query) {
    whereClause.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { content: { contains: query, mode: "insensitive" } },
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
    prisma.category.findMany(),
  ]);

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <main className="afterimage-site">
      <Navbar />
      <header id="main-content" className="page-intro site-shell" tabIndex={-1}>
        <p className="eyebrow">Notes / From the workbench</p>
        <h1>
          Thinking out loud<span className="acid-text">.</span>
        </h1>
        <p>
          Things learned while building. Ideas about code, design, and making
          technology useful.
        </p>
      </header>
      <section className="notes-content site-shell" aria-label="Articles">
        <BlogFilters categories={categories} />
        <div className="notes-grid">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="note-card"
            >
              <p className="eyebrow acid-text">
                {post.category?.name || "Notes"}
              </p>
              <h2>{post.title}</h2>
              <div>
                <time
                  className="eyebrow"
                  dateTime={post.createdAt.toISOString()}
                >
                  {post.createdAt.toLocaleDateString("en-CA", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <ArrowUpRight size={22} />
              </div>
            </Link>
          ))}
        </div>
        {posts.length === 0 && (
          <div className="notes-empty">
            {query || categoryFilter !== "all"
              ? "No notes match that search. Try another topic."
              : "New notes are on their way. In the meantime, explore the work."}
            <Link href="/#projects" className="text-link ml-4">
              Explore projects <ArrowUpRight size={16} />
            </Link>
          </div>
        )}
        <BlogPagination currentPage={currentPage} totalPages={totalPages} />
        <Link href="/dashboard" className="text-link mt-12">
          Author dashboard <ArrowUpRight size={14} />
        </Link>
      </section>
      <Footer />
    </main>
  );
}
