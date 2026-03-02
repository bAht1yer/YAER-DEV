# Deploying Blog Application to Vercel with Vercel Postgres

This guide provides step-by-step instructions to transition your local SQLite database to a **Vercel Postgres** database and deploy your Next.js application on Vercel.

## 1. Setup Vercel Postgres

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Select your project or create a new one by importing this repository.
3. Once the project is created or selected, navigate to the **Storage** tab.
4. Click **Create** and select **Postgres**.
5. Follow the prompts to name your database and select a region (choose the region closest to your Vercel Edge functions for best performance, typical is Washington, D.C. `iad1`).
6. Once created, Vercel will automatically add the necessary environment variables (`POSTGRES_URL`, `POSTGRES_PRISMA_URL`, `POSTGRES_URL_NON_POOLING`, etc.) to your project.

## 2. Update Prisma Schema for Postgres

Prisma currently uses SQLite for local development. To use Postgres in production on Vercel, you need to update `prisma/schema.prisma`.

1. Open `prisma/schema.prisma`.
2. Change the `datasource` block provider from `"sqlite"` to `"postgresql"`.
3. Update the `url` and add a `directUrl` for migrations.

**Example `schema.prisma` configuration:**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("POSTGRES_PRISMA_URL") // Uses connection pooling
  directUrl = env("POSTGRES_URL_NON_POOLING") // Used for migrations
}
```

## 3. Configure Local Environment Variables

To run the app locally with the new Postgres database (or a local Postgres instance if you prefer), you need to update your `.env` or `.env.local` file.

If you want to connect your local development environment directly to the Vercel Postgres database, copy the environment variables from your Vercel Postgres dashboard ("Quickstarts" -> "Prisma" or "Environment Variables").

Your `.env` should include:

```env
POSTGRES_PRISMA_URL="postgres://default:xxx@ep-xxx.pooler.postgres.vercel-storage.com/verceldb?pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NON_POOLING="postgres://default:xxx@ep-xxx.postgres.vercel-storage.com/verceldb"
```

*Note: Replace the URL strings with your actual connection strings from Vercel.*

## 4. Generate the Prisma Client and Push the Schema

After updating the schema, you'll need to generate a new Prisma Client tailored for Postgres and push your schema to the Vercel Postgres database.

Run the following commands locally:

```bash
# Generate Prisma Client for PostgreSQL
npx prisma generate

# Push the schema directly to your Vercel Postgres Database
# (Make sure POSTGRES_URL_NON_POOLING is correctly set in your .env)
npx prisma db push
```

*Note: Because you are switching from a local SQLite file (`dev.db`) to a brand-new Vercel Postgres instance, your new database will be completely empty upon deployment. Any existing posts, accounts, or categories you created locally will NOT be pushed to the server automatically. You must either write a migration script to copy your local data, or recreate your deployed posts manually via your admin dashboard.*

## 5. Add Prisma Generate to Build Step

Vercel needs to know to generate the Prisma Client during the deployment build process.

1. Open your `package.json`.
2. Find the `"scripts"` section.
3. Update your `"build"` script to run `prisma generate` before `next build`. But usually Vercel runs `postinstall` automatically if it finds Prisma, or it can be explicitly added. The recommended approach is adding `postinstall`:

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "postinstall": "prisma generate"
  }
```

## 6. Deploying on Vercel

1. **Commit your changes:** Commit `prisma/schema.prisma` and `package.json`.

   ```bash
   git add prisma/schema.prisma package.json
   git commit -m "chore: migrate to vercel postgres"
   git push
   ```

2. Vercel will automatically detect the push and begin a new deployment.
3. Wait for the build to finish. During the build, it should automatically read the `POSTGRES_PRISMA_URL` and `POSTGRES_URL_NON_POOLING` environment variables set in Step 1.

## 7. Verifying Deployment

1. Once the deployment says "Ready", click the domain Vercel provides.
2. Check if the website loads without database errors.
3. If you have a seed script (e.g., `/api/seed`), visit that route to populate your database with initial data (like your admin user). Example: `https://your-domain.vercel.app/api/seed`.
4. Then try to login using the dashboard.

## Additional Notes

- If you run into build errors related to Prisma on Vercel, verify your script in `package.json` correctly runs `prisma generate`.
- Do not commit your `.env` or `.env.local` containing Postgres passwords to GitHub. Let Vercel manage the production environment variables via its project settings.
