import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
});

/**
 * Brand icon source: public/brand/yaer-mark.png (full-res, used by the Navbar
 * and Footer via next/image, which downscales it).
 *
 * The browser favicon and iOS home-screen icon use small pre-optimized
 * derivatives (yaer-mark-64.png / yaer-mark-180.png, < 1 KB each) so the tab
 * icon isn't an ~840 KB download. Regenerate with sharp if the mark changes.
 */
export const metadata: Metadata = {
    metadataBase: new URL("https://yaer.dev"),
    title: "YAER.DEV -- Websites & lead systems for local businesses",
    description:
        "Websites, quote forms, automations, and useful AI for contractors, local services, and small businesses.",
    icons: {
        icon: [{ url: "/brand/yaer-mark-64.png", type: "image/png", sizes: "64x64" }],
        apple: [{ url: "/brand/yaer-mark-180.png", type: "image/png", sizes: "180x180" }],
        shortcut: "/brand/yaer-mark-64.png",
    },
    openGraph: {
        title: "YAER.DEV -- Websites & lead systems for local businesses",
        description:
            "Turn visitors into leads, quotes, and paid jobs with clean sites, forms, automations, and useful AI.",
        url: "https://yaer.dev",
        siteName: "YAER.DEV",
        type: "website",
        images: [
            {
                url: "/brand/yaer-wordmark.png",
                width: 1254,
                height: 1254,
                alt: "YAER.DEV brand mark",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "YAER.DEV -- Websites & lead systems",
        description:
            "Websites, quote forms, automations, and useful AI for contractors and local services.",
        images: ["/brand/yaer-wordmark.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body
                className={clsx(
                    inter.variable,
                    jetbrainsMono.variable,
                    "bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary relative"
                )}
            >
                <div className="fixed inset-0 cyber-grid -z-10 pointer-events-none" />
                <SessionProvider>
                    <SmoothScroll>{children}</SmoothScroll>
                </SessionProvider>
                <Analytics />
            </body>
        </html>
    );
}
