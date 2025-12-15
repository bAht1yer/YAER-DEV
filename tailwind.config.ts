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
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "#00f0ff", // Neon Cyan
                    dark: "#00a0aa",
                },
                secondary: {
                    DEFAULT: "#7000ff", // Neon Purple
                    dark: "#4a00aa",
                },
                accent: {
                    DEFAULT: "#ff003c", // Cyberpunk Red
                },
                "code-bg": "#1e1e1e",
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
            },
        },
    },
    plugins: [],
};
export default config;
