"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export type ScrollProgressProps = {
    /** CSS length for the bar thickness. Defaults to 3px. */
    height?: number;
    /** Optional fixed-position offset from the top, e.g. below a status bar. */
    top?: number;
    /** z-index for the bar. */
    zIndex?: number;
};

/**
 * A slim horizontal bar pinned to the top of the viewport that fills from
 * left to right as the page is scrolled. The spring smooths the motion so
 * it eases rather than tracking scroll 1:1. Original component.
 */
export default function ScrollProgress({
    height = 3,
    top = 0,
    zIndex = 300,
}: ScrollProgressProps) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            aria-hidden
            style={{
                scaleX,
                transformOrigin: "0%",
                position: "fixed",
                top,
                left: 0,
                right: 0,
                height,
                zIndex,
                background:
                    "linear-gradient(90deg, var(--accent), color-mix(in oklab, var(--accent) 55%, var(--fg)))",
                boxShadow: "0 0 10px color-mix(in oklab, var(--accent) 45%, transparent)",
            }}
        />
    );
}
