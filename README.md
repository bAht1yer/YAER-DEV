# YAER Developer Portfolio

This is the source code for the portfolio and service agency site of YAER (Y43R). It is built with Next.js, uses Framer Motion for animations, and integrates a custom AI Chatflow using Dify.ai for the Revamp Solutions demonstration.

## Technologies Used

- Next.js 15 (App Router)
- React 19
- Framer Motion
- Tailwind CSS
- Prisma ORM
- NextAuth.js
- Dify AI (Chatbot Integration)
- Resend (Email API)

## Getting Started

First, install dependencies:

```bash
npm install
```

Copy the example environment variables:

```bash
cp .env.example .env.local
```

Fill in the `.env.local` file with your actual keys.

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

See `VERCEL_DEPLOYMENT.md` for instructions on deploying the full stack application to Vercel, including the Postgres database setup.
