import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
        return NextResponse.json({ posts: [] });
    }

    try {
        const posts = await prisma.post.findMany({
            where: {
                published: true,
                OR: [
                    { title: { contains: query, mode: "insensitive" } },
                    { content: { contains: query, mode: "insensitive" } },
                ],
            },
            select: {
                title: true,
                slug: true,
                category: {
                    select: {
                        name: true,
                    },
                },
            },
            take: 5, // Limit dropdown results to top 5
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ posts });
    } catch (error) {
        console.error("Search API error:", error);
        return NextResponse.json({ error: "Failed to search" }, { status: 500 });
    }
}
