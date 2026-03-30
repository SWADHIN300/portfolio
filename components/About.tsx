"use client";

import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.55, delay, ease: "easeOut" },
});

export default function About() {
    return (
        <section id="about" className="section-container">
            <div className="max-w-3xl">
                <motion.p className="section-label mb-4" {...fadeUp(0)}>// 01</motion.p>

                <motion.h2
                    {...fadeUp(0.08)}
                    style={{
                        fontFamily: "var(--font-space-mono), monospace",
                        color: "var(--fg)",
                        fontSize: "clamp(2.5rem, 7vw, 5rem)",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                        marginBottom: "2.5rem",
                    }}
                >
                    About Me
                </motion.h2>

                <motion.div className="clean-card p-7 mb-8" {...fadeUp(0.16)}>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--fg-muted)", fontFamily: "var(--font-space-mono), monospace" }}>
                        I&apos;m a Full Stack Developer passionate about building modern, scalable web
                        applications that solve real-world problems. With expertise in both frontend
                        and backend technologies, I create seamless user experiences backed by robust
                        infrastructure.
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)", fontFamily: "var(--font-space-mono), monospace" }}>
                        My approach combines clean code, performance optimization, and user-centric
                        design to deliver applications that not only work well but feel great to use.
                    </p>
                </motion.div>

                <motion.p className="section-label mb-5" {...fadeUp(0.22)}>// experience</motion.p>

                <motion.div className="clean-card p-6" {...fadeUp(0.28)}>
                    <p
                        className="text-[10px] tracking-widest uppercase mb-2"
                        style={{ color: "var(--fg-muted)", fontFamily: "var(--font-space-mono), monospace" }}
                    >
                        2023 — Present
                    </p>
                    <p
                        className="text-lg font-bold uppercase tracking-wide mb-2"
                        style={{ fontFamily: "var(--font-space-mono), monospace", color: "var(--fg)" }}
                    >
                        Full Stack Developer
                    </p>
                    <p
                        className="text-sm"
                        style={{ color: "var(--fg-muted)", fontFamily: "var(--font-space-mono), monospace" }}
                    >
                        Building modern web applications with Next.js and React.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
