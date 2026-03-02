import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "YAER | 3D Developer Portfolio",
  description: "Immersive 3D Portfolio of YAER (Y43R)",
};

import SmoothScroll from "@/components/ui/SmoothScroll";
import ElectricGrid from "@/components/ui/ElectricGrid";
import { SessionProvider } from "next-auth/react";

// ... imports

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
