# YAER | Developer Portfolio & Services

This repository contains the source code for the personal portfolio and service agency website of **YAER** (Y43R). It is designed to showcase a collection of full-stack projects, digital services, and technical capabilities, featuring an immersive 3D background and smooth, high-performance animations.

## Key Features & Highlights

- **Immersive 3D Experience:** Uses `@react-three/fiber` and `@react-three/drei` to render an interactive, cyber-themed background canvas.
- **Web Project Collection:** A dedicated showcase of functional, deployed applications, including:
  - **Revamp Solutions:** A live service agency site integrating a custom autonomous AI Chatbot powered by **Dify.ai**.
  - **Mystery Cavern:** A complex state-driven Roguelike RPG.
  - **Ombrilo & BlogYu:** E-commerce and full-stack SaaS SaaS platforms with Stripe and CMS database integrations.
- **Secure Authentication:** Integrated `NextAuth.js` credentials provider and Prisma ORM for an embedded dashboard and blog management system.
- **Automated Contact Flow:** Embedded modal architecture that uses `Resend` to dispatch contact form submissions directly to email.

## Technologies Used

- **Frontend Framework:** Next.js 15 (App Router), React 19
- **Styling & Animation:** Tailwind CSS, Framer Motion, clsx
- **3D Graphics:** Three.js, React Three Fiber
- **Database & Auth:** Prisma ORM, PostgreSQL (Vercel Postgres), NextAuth, bcryptjs
- **Integrations:** Dify AI, Resend Email API

## Local Development Requirements

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Setup Environment:**
   Copy the example environment variables template to set up your local secrets.

   ```bash
   cp .env.example .env.local
   ```

   *Note: Ensure you fill in valid `PRISMA_DATABASE_URL`, `AUTH_SECRET`, and `RESEND_API_KEY` values.*

3. **Database Migration:**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run Server:**

   ```bash
   npm run dev
   ```

   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment

This application is fully optimized for edge deployment on Vercel. See the `VERCEL_DEPLOYMENT.md` file located in the root directory for a comprehensive guide on migrating the local database to Vercel Postgres and deploying the application.
