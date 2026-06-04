# External Publish Endpoint

`POST /api/posts/external` — Bearer-token-authenticated post creation. Used by automation (CLI script, git-history digest, Claude Code session writeups) to publish without going through the dashboard login.

## One-time setup

1. Generate a token:

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. Add it to Vercel: Project → Settings → Environment Variables → `BLOG_PUBLISH_TOKEN` for Production (and Preview if you want to test there). Redeploy.

3. Add the same token to your local `.env.local` so the CLI can use it:

   ```
   BLOG_PUBLISH_TOKEN="..."
   BLOG_PUBLISH_URL="https://yaer.dev"
   ```

## Trust model

The endpoint enforces the trusted-category rule server-side. Even if the caller sends `published: true`, only categories in `AUTO_PUBLISH_CATEGORIES` (currently `devlog`, `weekly-digest`) actually publish. Everything else is forced to draft. Edit the set in `src/app/api/posts/external/route.ts` to change the rules.

## Request shape

```json
{
  "title": "string (required)",
  "content": "markdown string (required)",
  "slug": "optional, derived from title if omitted",
  "categoryName": "optional, e.g. devlog",
  "published": true
}
```

## Response shape

```json
{ "id": "...", "slug": "...", "published": true, "category": "devlog", "url": "/blog/..." }
```

`url` is `null` for drafts.

## Smoke test with curl

```bash
curl -X POST https://yaer.dev/api/posts/external \
  -H "Authorization: Bearer $BLOG_PUBLISH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Token test","content":"hello","categoryName":"longform"}'
```

Expected: `200 OK`, response with `published: false` (because `longform` is not trusted). Find it in the dashboard drafts list, then delete.

## CLI usage

```bash
node scripts/publish.mjs path/to/post.md
```

Frontmatter:

```
---
title: My post
slug: optional-custom-slug
category: devlog
published: true
---

Markdown body here.
```

## Rotation

Replace `BLOG_PUBLISH_TOKEN` in Vercel and your `.env.local`. The old token stops working on next deploy. No DB migration, no user changes.

## Security notes

- The token is the only credential needed. Treat it like a password. Don't commit it.
- The endpoint writes posts as the first user with `role = "ADMIN"`. If you have multiple admins, you may want to add a `BLOG_PUBLISH_AUTHOR_ID` env var to pin the author explicitly.
- There is no rate limiting yet. If the token leaks, an attacker could spam drafts (not publish — non-trusted categories force draft). Add Vercel/middleware rate limiting if this becomes a concern.
