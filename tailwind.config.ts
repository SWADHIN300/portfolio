import type { Config } from "tailwindcss";

const withAlpha = (variable: string) =>
    `oklch(from var(${variable}) l c h / <alpha-value>)`;

export default {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: withAlpha("--background"),
                foreground: withAlpha("--foreground"),
                card: {
                    DEFAULT: withAlpha("--card"),
                    foreground: withAlpha("--card-foreground"),
                },
                popover: {
                    DEFAULT: withAlpha("--popover"),
                    foreground: withAlpha("--popover-foreground"),
                },
                primary: {
                    DEFAULT: withAlpha("--primary"),
                    foreground: withAlpha("--primary-foreground"),
                },
                secondary: {
                    DEFAULT: withAlpha("--secondary"),
                    foreground: withAlpha("--secondary-foreground"),
                },
                muted: {
                    DEFAULT: withAlpha("--muted"),
                    foreground: withAlpha("--muted-foreground"),
                },
                accent: {
                    DEFAULT: withAlpha("--accent"),
                    foreground: withAlpha("--accent-foreground"),
                },
                destructive: {
                    DEFAULT: withAlpha("--destructive"),
                    foreground: withAlpha("--destructive-foreground"),
                },
                border: withAlpha("--border"),
                input: withAlpha("--input"),
                ring: withAlpha("--ring"),
                chart: {
                    "1": withAlpha("--chart-1"),
                    "2": withAlpha("--chart-2"),
                    "3": withAlpha("--chart-3"),
                    "4": withAlpha("--chart-4"),
                    "5": withAlpha("--chart-5"),
                },
            },
            boxShadow: {
                hard: "6px 6px 0px 0px rgba(0,0,0,1)",
                "hard-white": "6px 6px 0px 0px rgba(255,255,255,1)",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: ["var(--font-sans)"],
                display: ["var(--font-vt323)"],
                mono: ["var(--font-mono)"],
            },
            animation: {
                "fade-in": "fadeIn 0.6s ease-out",
                "slide-up": "slideUp 0.6s ease-out",
                "slide-down": "slideDown 0.6s ease-out",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                slideDown: {
                    "0%": { transform: "translateY(-20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;
