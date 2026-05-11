import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ElectricGrid from "@/components/ui/ElectricGrid";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://yaer.dev"),
    title: "YAER.DEV -- AI systems that ship",
    description:
        "SaaS, internal tools, and contractor lead systems. Shipped software, not demos. Built by Neil Bahtiyer.",
    openGraph: {
        title: "YAER.DEV -- AI systems that ship",
        description:
            "SaaS, internal tools, and contractor lead systems. Shipped software, not demos.",
        url: "https://yaer.dev",
        siteName: "YAER.DEV",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "YAER.DEV -- AI systems that ship",
        description:
            "SaaS, internal tools, and contractor lead systems. Shipped software, not demos.",
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
                <ElectricGrid />
                <SessionProvider>
                    <SmoothScroll>{children}</SmoothScroll>
                </SessionProvider>
            </body>
        </html>
    );
}
