"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, FolderOpen, Cpu, Mail, Sun, Moon } from "lucide-react";

const navItems = [
    { name: "Home",     href: "#",         icon: Home },
    { name: "About",    href: "#about",    icon: User },
    { name: "Projects", href: "#projects", icon: FolderOpen },
    { name: "Skills",   href: "#skills",   icon: Cpu },
    { name: "Contact",  href: "#contact",  icon: Mail },
];

export default function Navigation() {
    const [active, setActive]           = useState("Home");
    const [isMobileOpen, setMobileOpen] = useState(false);
    const [isDark, setIsDark]           = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        const dark = saved !== "light";
        setIsDark(dark);
        document.documentElement.classList.toggle("dark", dark);
    }, []);

    const toggleTheme = () => {
        const next = !isDark;
        setIsDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
    };

    useEffect(() => {
        const sections = [
            { id: "contact",  name: "Contact" },
            { id: "skills",   name: "Skills" },
            { id: "projects", name: "Projects" },
            { id: "about",    name: "About" },
        ];
        const handleScroll = () => {
            for (const s of sections) {
                const el = document.getElementById(s.id);
                if (el && window.scrollY >= el.offsetTop - 140) {
                    setActive(s.name);
                    return;
                }
            }
            setActive("Home");
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* ── Desktop Left Sidebar ─────────────── */}
            <motion.aside
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="hidden md:flex fixed left-0 top-7 bottom-0 w-[200px] z-40 flex-col"
                style={{
                    background: "var(--bg)",
                    borderRight: "1px solid var(--border)",
                    transition: "background 0.35s ease",
                }}
            >
                {/* Logo */}
                <div className="px-6 py-7" style={{ borderBottom: "1px solid var(--border)" }}>
                    <a href="#" className="block group">
                        <span
                            className="block text-sm font-bold tracking-[0.3em] uppercase transition-opacity"
                            style={{ color: "var(--fg)" }}
                        >
                            SWADHIN
                        </span>
                        <span
                            className="block text-[10px] tracking-[0.2em] uppercase mt-1"
                            style={{ color: "var(--fg-muted)" }}
                        >
                            portfolio
                        </span>
                    </a>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 py-6 flex flex-col gap-0.5 px-4">
                    {navItems.map((item, i) => {
                        const Icon = item.icon;
                        const isActive = active === item.name;
                        return (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.07, duration: 0.4 }}
                                onClick={() => { setActive(item.name); setMobileOpen(false); }}
                                className="flex items-center gap-3 px-3 py-2.5 transition-all duration-200"
                                style={{
                                    fontFamily: "var(--font-space-mono), monospace",
                                    fontSize: "0.68rem",
                                    letterSpacing: "0.18em",
                                    textTransform: "uppercase",
                                    color: isActive ? "var(--fg)" : "var(--fg-muted)",
                                    background: isActive ? "var(--accent-bg)" : "transparent",
                                    borderLeft: isActive ? "2px solid var(--fg)" : "2px solid transparent",
                                }}
                            >
                                <Icon size={12} style={{ flexShrink: 0 }} />
                                {item.name}
                            </motion.a>
                        );
                    })}
                </nav>

                {/* Bottom: toggle + status */}
                <div className="px-4 py-5" style={{ borderTop: "1px solid var(--border)" }}>
                    <button
                        onClick={toggleTheme}
                        className="theme-toggle w-full justify-center mb-3"
                        aria-label="Toggle theme"
                    >
                        {isDark ? <><Sun size={10} /> Light</> : <><Moon size={10} /> Dark</>}
                    </button>
                    <div className="flex items-center gap-2">
                        <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: "var(--fg-muted)" }}
                        />
                        <span
                            className="text-[10px] tracking-widest uppercase"
                            style={{ color: "var(--fg-muted)" }}
                        >
                            Online
                        </span>
                    </div>
                </div>
            </motion.aside>

            {/* ── Mobile Top Bar ────────────────────── */}
            <div
                className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3"
                style={{
                    background: "var(--bg)",
                    borderBottom: "1px solid var(--border)",
                    transition: "background 0.35s ease",
                }}
            >
                <span
                    className="text-sm font-bold tracking-[0.28em] uppercase"
                    style={{ color: "var(--fg)" }}
                >
                    SWADHIN
                </span>
                <div className="flex items-center gap-3">
                    <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                        {isDark ? <Sun size={11} /> : <Moon size={11} />}
                    </button>
                    <button onClick={() => setMobileOpen(!isMobileOpen)} style={{ color: "var(--fg)" }}>
                        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden fixed top-[52px] left-0 right-0 z-50"
                        style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}
                    >
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => { setActive(item.name); setMobileOpen(false); }}
                                    className="flex items-center gap-3 px-5 py-3"
                                    style={{
                                        fontFamily: "var(--font-space-mono), monospace",
                                        fontSize: "0.7rem",
                                        letterSpacing: "0.16em",
                                        textTransform: "uppercase",
                                        color: active === item.name ? "var(--fg)" : "var(--fg-muted)",
                                        borderBottom: "1px solid var(--border)",
                                    }}
                                >
                                    <Icon size={13} />
                                    {item.name}
                                </a>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
