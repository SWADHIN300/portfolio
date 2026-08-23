"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET = 28;

function offsetFor(direction: Direction): { x: number; y: number } {
    switch (direction) {
        case "up": return { x: 0, y: OFFSET };
        case "down": return { x: 0, y: -OFFSET };
        case "left": return { x: OFFSET, y: 0 };
        case "right": return { x: -OFFSET, y: 0 };
        default: return { x: 0, y: 0 };
    }
}

export type RevealProps = {
    children: ReactNode;
    /** Slide direction the element travels *from* as it fades in. */
    direction?: Direction;
    /** Seconds of delay before the animation starts. */
    delay?: number;
    /** Seconds the animation runs for. */
    duration?: number;
    /** Replay the animation every time the element scrolls into view. */
    once?: boolean;
    /** Fraction of the element that must be visible before animating (0–1). */
    amount?: number;
    className?: string;
    style?: React.CSSProperties;
    as?: "div" | "section" | "li" | "span" | "article";
};

/**
 * Reveal wraps any content and animates it into view on scroll with a
 * smooth fade + slide. Honours the user's reduced-motion preference by
 * rendering content statically. Original component built on framer-motion.
 */
export default function Reveal({
    children,
    direction = "up",
    delay = 0,
    duration = 0.55,
    once = true,
    amount = 0.2,
    className,
    style,
    as = "div",
}: RevealProps) {
    const reduceMotion = useReducedMotion();
    const from = offsetFor(direction);

    const variants: Variants = {
        hidden: reduceMotion
            ? { opacity: 1, x: 0, y: 0 }
            : { opacity: 0, x: from.x, y: from.y },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: reduceMotion ? 0 : duration,
                delay: reduceMotion ? 0 : delay,
                ease: [0.22, 1, 0.36, 1], // gentle "ease-out-expo"-style curve
            },
        },
    };

    const MotionTag = motion[as];

    return (
        <MotionTag
            className={className}
            style={style}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount }}
        >
            {children}
        </MotionTag>
    );
}
