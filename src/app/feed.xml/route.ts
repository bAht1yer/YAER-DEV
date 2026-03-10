import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const items = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
    });

    const feedXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Databank - YAER_SYS</title>
    <link>https://mesproj.example.com/blog</link>
    <description>Archived transmissions, technical logs, and systems philosophy.</description>
    <atom:link href="https://mesproj.example.com/feed.xml" rel="self" type="application/rss+xml" />
    ${items.map(post => `
    <item>
      <title>${post.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')}</title>
      <link>https://mesproj.example.com/blog/${post.slug}</link>
      <guid>https://mesproj.example.com/blog/${post.slug}</guid>
      <pubDate>${post.createdAt.toUTCString()}</pubDate>
      <description><![CDATA[${post.content.substring(0, 300)}...]]></description>
    </item>`).join("")}
  </channel>
</rss>`;

    return new NextResponse(feedXml, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
