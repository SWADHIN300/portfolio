"use client";

import { useRef, useState } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    AnimatePresence,
    type MotionValue,
} from "framer-motion";
import type { LucideIcon } from "lucide-react";

export type MacDockItem = {
    id: string;
    label: string;
    icon: LucideIcon;
    /** If provided, the item renders as a link instead of a button. */
    href?: string;
    external?: boolean;
};

type MacDockProps = {
    items: MacDockItem[];
    /** Id of the currently active section — drives the sliding indicator. */
    activeId?: string;
    onSelect?: (id: string) => void;
    className?: string;
};

/** Magnification tuning. */
const INFLUENCE = 150; // px radius over which the cursor affects an icon
const MAX_SCALE = 1.4; // peak scale for the icon directly under the cursor

/**
 * A premium floating dock with macOS-style cursor magnification.
 * Each icon scales continuously based on its distance from the pointer,
 * producing a fluid wave. The active section shows a shared, sliding
 * highlight + dot (animated via layoutId). Original component.
 */
export default function MacDock({ items, activeId, onSelect, className = "" }: MacDockProps) {
    // Infinity = cursor is "far away", so every icon rests at scale 1.
    const mouseX = useMotionValue(Infinity);

    return (
        <motion.nav
            aria-label="Dock"
            onMouseMove={(e) => mouseX.set(e.clientX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            initial={{ y: 44, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 28, delay: 0.1 }}
            className={
                "fixed bottom-4 left-0 right-0 z-[100] mx-auto flex w-max max-w-[94vw] items-end gap-3 " +
                "overflow-x-auto rounded-[26px] border border-white/10 bg-black/45 px-4 pb-2.5 pt-2 " +
                "shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl " +
                "[&::-webkit-scrollbar]:hidden " +
                className
            }
        >
            {items.map((item) => (
                <DockIcon
                    key={item.id}
                    item={item}
                    mouseX={mouseX}
                    active={item.id === activeId}
                    onSelect={onSelect}
                />
            ))}
        </motion.nav>
    );
}

function DockIcon({
    item,
    mouseX,
    active,
    onSelect,
}: {
    item: MacDockItem;
    mouseX: MotionValue<number>;
    active: boolean;
    onSelect?: (id: string) => void;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);
    const Icon = item.icon;

    // Signed horizontal distance from the pointer to this icon's centre.
    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect();
        if (!bounds) return INFLUENCE + 1;
        return val - bounds.x - bounds.width / 2;
    });

    // Map distance → scale, then smooth it with a spring for natural motion.
    const scaleTarget = useTransform(distance, [-INFLUENCE, 0, INFLUENCE], [1, MAX_SCALE, 1]);
    const scale = useSpring(scaleTarget, { mass: 0.1, stiffness: 200, damping: 15 });

    const magnified = (
        <motion.div
            ref={ref}
            style={{ scale }}
            className="relative flex origin-bottom items-center justify-center"
        >
            {/* Sliding active background (shared element across items) */}
            {active && (
                <motion.span
                    layoutId="dock-active-bg"
                    className="absolute inset-0 rounded-[14px] bg-white/15 ring-1 ring-white/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
            )}
            <span
                className={
                    "relative flex h-11 w-11 items-center justify-center rounded-[14px] transition-colors " +
                    (active ? "text-white" : "text-neutral-400")
                }
            >
                <Icon size={20} strokeWidth={1.8} />
            </span>
        </motion.div>
    );

    const slot = (
        <div
            className="relative flex flex-col items-center gap-1.5 pb-0.5"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Hover tooltip (kept outside the magnified box so it isn't scaled) */}
            <AnimatePresence>
                {hovered && (
                    <motion.span
                        initial={{ opacity: 0, y: 6, scale: 0.85 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 26 }}
                        className="pointer-events-none absolute bottom-[calc(100%+14px)] left-1/2 z-[9999] -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-black/85 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white"
                    >
                        {item.label}
                    </motion.span>
                )}
            </AnimatePresence>

            {magnified}

            {/* Active indicator dot (slides between items) */}
            <span className="flex h-1 w-1 items-center justify-center">
                {active && (
                    <motion.span
                        layoutId="dock-active-dot"
                        className="block h-1 w-1 rounded-full bg-white"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                )}
            </span>
        </div>
    );

    if (item.href) {
        return (
            <a
                href={item.href}
                aria-label={item.label}
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
                {slot}
            </a>
        );
    }

    return (
        <button type="button" aria-label={item.label} aria-pressed={active} onClick={() => onSelect?.(item.id)}>
            {slot}
        </button>
    );
}
