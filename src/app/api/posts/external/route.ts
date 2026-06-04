import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const AUTO_PUBLISH_CATEGORIES = new Set(["devlog", "weekly-digest"]);

function slugify(input: string): string {
    return input
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

async function uniqueSlug(base: string): Promise<string> {
    let candidate = base || "post";
    let n = 1;
    while (await prisma.post.findUnique({ where: { slug: candidate } })) {
        n += 1;
        candidate = `${base}-${n}`;
    }
    return candidate;
}

export async function POST(req: Request) {
    const expected = process.env.BLOG_PUBLISH_TOKEN;
    if (!expected) {
        return NextResponse.json({ error: "Publish token not configured" }, { status: 500 });
    }

    const header = req.headers.get("authorization") || "";
    const provided = header.startsWith("Bearer ") ? header.slice(7) : "";
    if (!provided || provided !== expected) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { title, slug, content, categoryName } = body as {
            title?: string;
            slug?: string;
            content?: string;
            categoryName?: string;
            published?: boolean;
        };

        if (!title || !content) {
            return NextResponse.json({ error: "title and content are required" }, { status: 400 });
        }

        const author = await prisma.user.findFirst({ where: { role: "ADMIN" } });
        if (!author) {
            return NextResponse.json({ error: "No ADMIN user found" }, { status: 500 });
        }

        let categoryId: string | null = null;
        let categorySlug: string | null = null;
        if (categoryName) {
            const slugified = slugify(categoryName);
            const category = await prisma.category.upsert({
                where: { slug: slugified },
                update: {},
                create: { name: categoryName, slug: slugified }
            });
            categoryId = category.id;
            categorySlug = category.slug;
        }

        // Trust-category rule: caller's `published` is honored only for trusted categories.
        // Everything else is forced to draft regardless of what was sent.
        const requestedPublished = body.published === true;
        const trusted = categorySlug !== null && AUTO_PUBLISH_CATEGORIES.has(categorySlug);
        const published = trusted ? requestedPublished : false;

        const finalSlug = await uniqueSlug(slug ? slugify(slug) : slugify(title));

        const post = await prisma.post.create({
            data: {
                title,
                slug: finalSlug,
                content,
                published,
                categoryId,
                authorId: author.id
            }
        });

        revalidatePath("/blog");
        revalidatePath(`/blog/${finalSlug}`);

        return NextResponse.json({
            id: post.id,
            slug: post.slug,
            published: post.published,
            category: categorySlug,
            url: published ? `/blog/${post.slug}` : null
        });
    } catch (error: unknown) {
        const err = error as Error;
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
