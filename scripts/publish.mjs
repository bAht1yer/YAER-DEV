#!/usr/bin/env node
// Publish a markdown file to yaer.dev/blog via /api/posts/external.
//
// Usage:
//   node scripts/publish.mjs path/to/post.md
//
// Env (loaded from .env.local if present):
//   BLOG_PUBLISH_URL   e.g. https://yaer.dev  (default: http://localhost:3000)
//   BLOG_PUBLISH_TOKEN matches server's BLOG_PUBLISH_TOKEN
//
// Frontmatter (between --- lines at top of file):
//   title:     required
//   slug:      optional, derived from title if omitted
//   category:  optional, e.g. "devlog", "weekly-digest", "longform"
//   published: optional bool; honored only if category is in the trusted set

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

function parseFrontmatter(src) {
    if (!src.startsWith("---")) {
        return { meta: {}, body: src };
    }
    const end = src.indexOf("\n---", 3);
    if (end === -1) return { meta: {}, body: src };
    const raw = src.slice(3, end).trim();
    const body = src.slice(end + 4).replace(/^\r?\n/, "");
    const meta = {};
    for (const line of raw.split("\n")) {
        const m = line.match(/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/);
        if (!m) continue;
        let v = m[2].trim();
        if (v === "true") v = true;
        else if (v === "false") v = false;
        else if (/^".*"$/.test(v) || /^'.*'$/.test(v)) v = v.slice(1, -1);
        meta[m[1]] = v;
    }
    return { meta, body };
}

async function main() {
    const filePath = process.argv[2];
    if (!filePath) {
        console.error("Usage: node scripts/publish.mjs <markdown-file>");
        process.exit(1);
    }

    const baseUrl = process.env.BLOG_PUBLISH_URL || "http://localhost:3000";
    const token = process.env.BLOG_PUBLISH_TOKEN;
    if (!token) {
        console.error("BLOG_PUBLISH_TOKEN not set");
        process.exit(1);
    }

    const src = readFileSync(resolve(filePath), "utf8");
    const { meta, body } = parseFrontmatter(src);

    if (!meta.title) {
        console.error("Frontmatter missing required field: title");
        process.exit(1);
    }

    const payload = {
        title: meta.title,
        slug: meta.slug || undefined,
        content: body.trim(),
        categoryName: meta.category || undefined,
        published: meta.published === true
    };

    const res = await fetch(`${baseUrl}/api/posts/external`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });

    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch { data = text; }

    if (!res.ok) {
        console.error(`Publish failed (${res.status}):`, data);
        process.exit(1);
    }

    const state = data.published ? "PUBLISHED" : "DRAFT";
    const where = data.url ? `${baseUrl}${data.url}` : `(draft, slug: ${data.slug})`;
    console.log(`${state}  ${where}`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
