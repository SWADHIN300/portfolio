"use client";

import { motion } from "framer-motion";
import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Mode = "light" | "dark" | "system";

const OPTIONS: { id: Mode; label: string; Icon: typeof Sun }[] = [
    { id: "light", label: "Light", Icon: Sun },
    { id: "dark", label: "Dark", Icon: Moon },
    { id: "system", label: "System", Icon: Monitor },
];

function systemPrefersDark(): boolean {
    return typeof window !== "undefined"
        && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyDark(isDark: boolean) {
    document.documentElement.classList.toggle("dark", isDark);
}

/**
 * A card-style theme switcher offering Light / Dark / System.
 * Persists to the same "theme" localStorage key used elsewhere in the app
 * and toggles the `.dark` class on <html>, so it stays in sync with the
 * existing StatusBar toggle. Original component.
 */
export default function ThemeCard() {
    const [mode, setMode] = useState<Mode>("dark");
    const [mounted, setMounted] = useState(false);

    // Initialise from stored preference on mount.
    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem("theme");
        if (stored === "light" || stored === "dark" || stored === "system") {
            setMode(stored);
        } else {
            // Legacy: default matches page.tsx behaviour (dark unless "light").
            setMode(stored === "light" ? "light" : "dark");
        }
    }, []);

    // Apply whenever mode changes.
    useEffect(() => {
        if (!mounted) return;
        const isDark = mode === "system" ? systemPrefersDark() : mode === "dark";
        applyDark(isDark);
        localStorage.setItem("theme", mode);
    }, [mode, mounted]);

    // Keep "system" mode reactive to OS changes.
    useEffect(() => {
        if (!mounted || mode !== "system") return;
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const onChange = () => applyDark(mq.matches);
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, [mode, mounted]);

    return (
        <div
            className="mini-card"
            style={{ padding: 18, maxWidth: 320, fontFamily: "var(--font-space-mono), monospace" }}
        >
            <p className="label" style={{ marginBottom: 4 }}>{"// appearance"}</p>
            <h3
                style={{
                    color: "var(--fg)",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                    margin: "0 0 14px",
                }}
            >
                Theme
            </h3>

            <div
                role="radiogroup"
                aria-label="Color theme"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 8,
                    position: "relative",
                }}
            >
                {OPTIONS.map(({ id, label, Icon }) => {
                    const active = mounted && mode === id;
                    return (
                        <button
                            key={id}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            onClick={() => setMode(id)}
                            style={{
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 7,
                                padding: "12px 8px",
                                borderRadius: 8,
                                cursor: "pointer",
                                background: "transparent",
                                border: `1px solid ${active ? "var(--fg)" : "var(--border)"}`,
                                color: active ? "var(--fg)" : "var(--fg-muted)",
                                transition: "color .2s ease, border-color .2s ease",
                            }}
                        >
                            {active && (
                                <motion.span
                                    layoutId="theme-active-bg"
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        borderRadius: 8,
                                        background: "color-mix(in oklab, var(--fg) 8%, transparent)",
                                        zIndex: 0,
                                    }}
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                            <Icon size={18} style={{ position: "relative", zIndex: 1 }} />
                            <span
                                style={{
                                    position: "relative",
                                    zIndex: 1,
                                    fontSize: "0.55rem",
                                    letterSpacing: "0.12em",
                                    textTransform: "uppercase",
                                }}
                            >
                                {label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
