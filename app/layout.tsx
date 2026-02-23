import type { Metadata } from "next";
import { Space_Mono, VT323 } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-space-mono",
    display: "swap",
});

const vt323 = VT323({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-vt323",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Portfolio | Full Stack Developer",
    description: "Full Stack Developer specializing in Next.js, React, and modern web technologies",
    keywords: ["portfolio", "developer", "next.js", "react", "typescript", "mongodb", "postgresql"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body
                className={`${spaceMono.variable} ${vt323.variable} font-sans antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
