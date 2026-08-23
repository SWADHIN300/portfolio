"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

export type DraggableCardProps = {
    children: ReactNode;
    /** Ref to the element that bounds the draggable area. If omitted, drag is free. */
    constraintsRef?: React.RefObject<HTMLElement | null>;
    /** How springy the snap-back / release feels. */
    elastic?: number;
    className?: string;
    style?: React.CSSProperties;
};

/**
 * DraggableCard makes any content grabbable and movable via pointer/touch.
 * Built on framer-motion's drag. Lifts and tilts slightly while held for a
 * tactile feel, and honours reduced-motion by disabling drag. Original component.
 */
export default function DraggableCard({
    children,
    constraintsRef,
    elastic = 0.18,
    className,
    style,
}: DraggableCardProps) {
    const reduceMotion = useReducedMotion();
    const localRef = useRef<HTMLDivElement>(null);

    // When reduced motion is preferred, render a plain, static container.
    if (reduceMotion) {
        return (
            <div ref={localRef} className={className} style={style}>
                {children}
            </div>
        );
    }

    return (
        <motion.div
            ref={localRef}
            className={className}
            style={{ cursor: "grab", touchAction: "none", ...style }}
            drag
            dragConstraints={constraintsRef ?? false}
            dragElastic={elastic}
            dragMomentum={false}
            whileHover={{ scale: 1.01 }}
            whileDrag={{
                scale: 1.03,
                rotate: -1.5,
                cursor: "grabbing",
                boxShadow: "0 24px 60px rgba(0, 0, 0, 0.22)",
                zIndex: 50,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
        >
            {children}
        </motion.div>
    );
}
