import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--bg)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "#34E5FF", // cyan
                    dark: "#2BC3E0",
                },
                secondary: {
                    DEFAULT: "#9B7BFF", // iridescent violet
                    dark: "#6D4FD6",
                },
                accent: {
                    DEFAULT: "#FF5FD2", // signal magenta
                },
                chrome: "#CBD2D9",
                "code-bg": "#0E171D",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                mono: ["var(--font-jetbrains-mono)", "monospace"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            animation: {
                "glitch-1": "glitch-1 2.5s infinite linear alternate-reverse",
                "glitch-2": "glitch-2 2.5s infinite linear alternate-reverse",
                "scan": "scan 8s ease-in-out infinite alternate",
            },
            keyframes: {
                "glitch-1": {
                    "0%": { clipPath: "inset(20% 0 80% 0)" },
                    "20%": { clipPath: "inset(60% 0 10% 0)" },
                    "40%": { clipPath: "inset(40% 0 50% 0)" },
                    "60%": { clipPath: "inset(80% 0 5% 0)" },
                    "80%": { clipPath: "inset(10% 0 60% 0)" },
                    "100%": { clipPath: "inset(30% 0 30% 0)" },
                },
                "glitch-2": {
                    "0%": { clipPath: "inset(10% 0 60% 0)" },
                    "20%": { clipPath: "inset(30% 0 20% 0)" },
                    "40%": { clipPath: "inset(10% 0 50% 0)" },
                    "60%": { clipPath: "inset(50% 0 30% 0)" },
                    "80%": { clipPath: "inset(70% 0 10% 0)" },
                    "100%": { clipPath: "inset(20% 0 60% 0)" },
                },
                "scan": {
                    "0%": { transform: "translateY(-100%)" },
                    "100%": { transform: "translateY(100vh)" },
                }
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
export default config;
