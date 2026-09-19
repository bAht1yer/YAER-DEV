import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./afterimage.css";
import { clsx } from "clsx";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

/** YAER / Digital Afterimage — shared brand and social metadata. */
export const metadata: Metadata = {
  metadataBase: new URL("https://yaer.dev"),
  title: "YAER — Independent developer, Toronto",
  description:
    "Independent mind. Useful digital things. Websites, digital products, and practical AI by YAER, Toronto.",
  icons: {
    icon: [{ url: "/brand/afterimage-icon.svg", type: "image/svg+xml" }],
    apple: [
      {
        url: "/brand/afterimage-apple.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
    shortcut: "/brand/afterimage-icon.svg",
  },
  openGraph: {
    title: "YAER — Independent developer, Toronto",
    description:
      "Independent mind. Useful digital things. Websites, digital products, and practical AI by YAER, Toronto.",
    url: "https://yaer.dev",
    siteName: "YAER.DEV",
    type: "website",
    images: [
      {
        url: "/brand/afterimage-social.png",
        width: 1200,
        height: 630,
        alt: "YAER.DEV brand mark",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YAER — Independent developer, Toronto",
    description:
      "Independent mind. Useful digital things. Websites, digital products, and practical AI by YAER, Toronto.",
    images: ["/brand/afterimage-social.png"],
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
          "bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary relative",
        )}
      >
        <SessionProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
