import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-space-mono",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Swadhin Raha — Software Engineer",
    description: "Portfolio of Swadhin Raha, a software engineer building fast, thoughtful products with React, Next.js, TypeScript, and Rust.",
    keywords: ["Swadhin Raha", "software engineer", "portfolio", "Next.js", "React", "TypeScript", "Rust"],
    icons: {
        icon: "/profile.jpeg",
        shortcut: "/profile.jpeg",
        apple: "/profile.jpeg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <body
                className={`${spaceMono.variable} font-sans antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
