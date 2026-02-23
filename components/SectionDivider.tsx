"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
    return (
        <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full h-1 bg-foreground my-16"
        />
    );
}
