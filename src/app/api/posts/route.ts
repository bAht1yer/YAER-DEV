import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { title, slug, content, published, categoryName } = await req.json();

        let categoryId = null;
        if (categoryName) {
            const slugified = categoryName.toLowerCase().replace(/\s+/g, '-');
            const category = await prisma.category.upsert({
                where: { slug: slugified },
                update: {},
                create: { name: categoryName, slug: slugified }
            });
            categoryId = category.id;
        }

        const post = await prisma.post.create({
            data: {
                title,
                slug,
                content,
                published,
                categoryId,
                authorId: session.user.id
            }
        });

        revalidatePath("/blog");
        return NextResponse.json(post);
    } catch (error: unknown) {
        const err = error as Error;
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
