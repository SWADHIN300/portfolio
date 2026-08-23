"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export type BottomBarItem = {
    id: string;
    label: string;
    Icon: LucideIcon;
    /** External/internal link. If omitted, onClick is used. */
    href?: string;
    onClick?: () => void;
    /** Opens the href in a new tab when true. */
    external?: boolean;
};

export type BottomBarProps = {
    items: BottomBarItem[];
    /** Optional element rendered on the far right (e.g. a theme toggle). */
    trailing?: React.ReactNode;
};

/**
 * A fixed, bottom-centered control bar. Each item shows an icon with a label
 * that appears on hover, and lifts slightly when hovered. Uses the project's
 * design tokens and mirrors the visual language of the existing dock without
 * duplicating its window-management logic. Original component.
 */
export default function BottomBar({ items, trailing }: BottomBarProps) {
    return (
        <motion.nav
            aria-label="Quick actions"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.2 }}
            style={{
                position: "fixed",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 100,
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 14px",
                background:
                    "linear-gradient(135deg, color-mix(in oklab, var(--sidebar) 92%, transparent), color-mix(in oklab, var(--background) 88%, transparent))",
                backdropFilter: "blur(28px) saturate(180%)",
                WebkitBackdropFilter: "blur(28px) saturate(180%)",
                border: "1px solid var(--border-strong)",
                borderRadius: 22,
                boxShadow:
                    "0 20px 50px rgba(0, 0, 0, 0.18), inset 0 1px 0 color-mix(in oklab, var(--fg) 8%, transparent)",
                maxWidth: "92vw",
                overflowX: "auto",
            }}
        >
            {items.map(({ id, label, Icon, href, onClick, external }) => {
                const content = (
                    <motion.div
                        className="dock-icon"
                        whileHover={{ y: -6, scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        transition={{ type: "spring", stiffness: 400, damping: 22 }}
                        style={{
                            position: "relative",
                            width: 46,
                            height: 46,
                            borderRadius: 13,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "var(--dock-icon-bg)",
                            border: "1px solid var(--dock-icon-border)",
                            color: "var(--dock-icon-color)",
                            flexShrink: 0,
                        }}
                    >
                        <Icon size={20} />
                        <span
                            style={{
                                position: "absolute",
                                bottom: "calc(100% + 8px)",
                                left: "50%",
                                transform: "translateX(-50%)",
                                background: "var(--tooltip-bg)",
                                border: "1px solid var(--tooltip-border)",
                                borderRadius: 6,
                                padding: "3px 8px",
                                fontSize: "0.55rem",
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                fontFamily: "var(--font-space-mono), monospace",
                                color: "var(--fg)",
                                whiteSpace: "nowrap",
                                opacity: 0,
                                pointerEvents: "none",
                                transition: "opacity 0.18s ease",
                            }}
                            className="bottombar-tip"
                        >
                            {label}
                        </span>
                    </motion.div>
                );

                if (href) {
                    return (
                        <a
                            key={id}
                            href={href}
                            title={label}
                            aria-label={label}
                            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className="bottombar-item"
                        >
                            {content}
                        </a>
                    );
                }

                return (
                    <button
                        key={id}
                        type="button"
                        onClick={onClick}
                        title={label}
                        aria-label={label}
                        className="bottombar-item"
                        style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                    >
                        {content}
                    </button>
                );
            })}

            {trailing && (
                <>
                    <span
                        style={{
                            width: 1,
                            height: 30,
                            background:
                                "linear-gradient(to bottom, transparent, var(--border-strong), transparent)",
                            margin: "0 4px",
                            flexShrink: 0,
                        }}
                    />
                    <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>{trailing}</div>
                </>
            )}
        </motion.nav>
    );
}
