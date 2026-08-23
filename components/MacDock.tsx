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
                "overflow-visible rounded-[26px] border border-white/10 bg-black/45 px-4 pb-2.5 pt-2 " +
                "shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl " +
                className
            }
        >
            {items.map((item, i) => (
                <DockIcon
                    key={item.id}
                    item={item}
                    index={i}
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
    index,
    mouseX,
    active,
    onSelect,
}: {
    item: MacDockItem;
    index: number;
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
            {/* Sliding active background — springy, slightly elastic */}
            {active && (
                <motion.span
                    layoutId="dock-active-bg"
                    className="absolute inset-0 rounded-[14px] bg-white/15 ring-1 ring-white/20"
                    transition={{ type: "spring", stiffness: 460, damping: 32 }}
                />
            )}
            {/* Hover background — fades in over 180ms */}
            <span
                style={{
                    opacity: hovered && !active ? 1 : 0,
                    transition: "opacity 180ms ease",
                }}
                className="absolute inset-0 rounded-[11px] bg-white/10"
            />
            <span
                style={{ transition: "color 180ms ease" }}
                className={
                    "relative flex h-11 w-11 items-center justify-center rounded-[14px] " +
                    (active || hovered ? "text-white" : "text-neutral-400")
                }
            >
                <Icon size={20} strokeWidth={1.8} />
            </span>
        </motion.div>
    );

    const slot = (
        <motion.div
            className="relative flex flex-col items-center gap-1.5 pb-0.5"
            // Staggered pop-in entrance, left → right
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 + index * 0.04, type: "spring", stiffness: 440, damping: 24 }}
            // Lift on hover (scale handled by magnification), press feedback on tap
            whileHover={{ y: -4, transition: { duration: 0.18, ease: "easeOut" } }}
            whileTap={{ scale: 0.86 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Label pill — pops up above the button on hover */}
            <AnimatePresence>
                {hovered && (
                    <motion.span
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        style={{ background: "rgba(0,0,0,0.92)", padding: "4px 8px" }}
                        className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-[9999] -translate-x-1/2 whitespace-nowrap rounded-md text-center text-[11px] font-medium text-white"
                    >
                        {item.label}
                    </motion.span>
                )}
            </AnimatePresence>

            {magnified}

            {/* Permanent label attached under the button */}
            <span
                style={{ transition: "color 180ms ease" }}
                className={
                    "max-w-[64px] truncate text-center text-[8.5px] font-medium leading-none tracking-[0.04em] " +
                    (active ? "text-white" : "text-neutral-400")
                }
            >
                {item.label}
            </span>

            {/* Active indicator dot — elastic slide between items */}
            <span className="flex h-1 w-1 items-center justify-center">
                {active && (
                    <motion.span
                        layoutId="dock-active-dot"
                        className="block h-1 w-1 rounded-full bg-white"
                        transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    />
                )}
            </span>
        </motion.div>
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
