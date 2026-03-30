"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react";

export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col justify-center px-8 md:px-16 relative overflow-hidden">
            {/* Subtle dot-grid */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)",
                    backgroundSize: "36px 36px",
                    opacity: 0.6,
                }}
            />

            <div className="relative z-10 max-w-3xl">
                {/* Label */}
                <motion.p
                    className="section-label mb-6"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
                >
                    // portfolio
                </motion.p>

                {/* Name with animated characters */}
                <div className="overflow-hidden mb-5">
                    <motion.h1
                        className="font-bold uppercase leading-none tracking-tighter"
                        style={{
                            fontFamily: "var(--font-space-mono), monospace",
                            color: "var(--fg)",
                            fontSize: "clamp(4rem, 14vw, 9rem)",
                        }}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                    >
                        SWADHIN
                        <span className="cursor-blink" />
                    </motion.h1>
                </div>

                {/* Role */}
                <motion.p
                    className="uppercase tracking-[0.2em] mb-8"
                    style={{
                        fontFamily: "var(--font-space-mono), monospace",
                        fontSize: "clamp(0.8rem, 2vw, 1.1rem)",
                        color: "var(--fg-muted)",
                        borderLeft: "2px solid var(--fg-subtle)",
                        paddingLeft: "1rem",
                    }}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    Full Stack Developer
                </motion.p>

                {/* Description */}
                <motion.p
                    className="text-sm leading-relaxed mb-10 max-w-md"
                    style={{ color: "var(--fg-muted)", fontFamily: "var(--font-space-mono), monospace" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.55 }}
                >
                    Building modern web apps with{" "}
                    <span style={{ color: "var(--fg)" }}>Next.js</span>,{" "}
                    <span style={{ color: "var(--fg)" }}>React</span>, and{" "}
                    <span style={{ color: "var(--fg)" }}>TypeScript</span>.
                </motion.p>

                {/* CTA */}
                <motion.div
                    className="flex flex-wrap gap-3 mb-10"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
                    <a href="#projects" className="btn-primary">View Projects</a>
                    <a href="#contact" className="btn-outline">Contact Me</a>
                </motion.div>

                {/* Socials */}
                <motion.div
                    className="flex gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                >
                    {[
                        { icon: Github,   href: "https://github.com/SWADHIN300",                         label: "GitHub" },
                        { icon: Linkedin, href: "https://www.linkedin.com/in/swadhin-raha-27067226b/",  label: "LinkedIn" },
                        { icon: Twitter,  href: "https://x.com/swadhin_ra35911",                        label: "X" },
                    ].map(({ icon: Icon, href, label }) => (
                        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="social-btn">
                            <Icon size={16} />
                        </a>
                    ))}
                </motion.div>
            </div>

            {/* Scroll arrow */}
            <motion.a
                href="#about"
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                aria-label="Scroll down"
                style={{ color: "var(--fg-muted)" }}
            >
                <ArrowDown size={20} />
            </motion.a>
        </section>
    );
}
