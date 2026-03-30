"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Twitter, Send, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
    const [formData, setFormData] = useState({ fullName: "", email: "", message: "" });
    const [status, setStatus] = useState<Status>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        setErrorMsg("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong.");
            }

            setStatus("success");
            setFormData({ fullName: "", email: "", message: "" });
            // Reset to idle after 5 seconds
            setTimeout(() => setStatus("idle"), 5000);
        } catch (err) {
            setErrorMsg(err instanceof Error ? err.message : "Failed to send.");
            setStatus("error");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true } as const,
        transition: { duration: 0.5, delay, ease: "easeOut" },
    });

    return (
        <section id="contact" className="section-container">
            <div className="max-w-2xl">
                <motion.p className="section-label mb-4" {...fadeUp(0)}>// 04</motion.p>

                <motion.h2
                    {...fadeUp(0.07)}
                    style={{
                        fontFamily: "var(--font-space-mono), monospace",
                        color: "var(--fg)",
                        fontSize: "clamp(2.5rem, 7vw, 5rem)",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                        marginBottom: "2rem",
                    }}
                >
                    Contact
                </motion.h2>

                <motion.p
                    {...fadeUp(0.12)}
                    className="text-sm mb-2"
                    style={{ color: "var(--fg-muted)", fontFamily: "var(--font-space-mono), monospace" }}
                >
                    If you have any inquiries, feel free to reach out.
                </motion.p>

                <motion.div {...fadeUp(0.16)} className="mb-8">
                    <a
                        href="mailto:swadhinraha81@gmail.com"
                        className="text-sm nav-link-underline inline-block"
                        style={{ color: "var(--fg)", fontFamily: "var(--font-space-mono), monospace" }}
                    >
                        swadhinraha81@gmail.com
                    </a>
                </motion.div>

                {/* Social links */}
                <motion.div {...fadeUp(0.2)} className="flex gap-2 mb-10">
                    {[
                        { icon: Github,   href: "https://github.com/SWADHIN300",                        label: "GitHub" },
                        { icon: Linkedin, href: "https://www.linkedin.com/in/swadhin-raha-27067226b/", label: "LinkedIn" },
                        { icon: Twitter,  href: "https://x.com/swadhin_ra35911",                       label: "X" },
                    ].map((s) => (
                        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                            aria-label={s.label} className="social-btn">
                            <s.icon size={16} />
                        </a>
                    ))}
                </motion.div>

                {/* ── Contact Form Card (macOS window style) ──────── */}
                <motion.div {...fadeUp(0.26)}>
                    {/* macOS-style window header */}
                    <div
                        className="flex items-center gap-2 px-4 py-3"
                        style={{
                            background: "var(--card-bg)",
                            borderTop: "1px solid var(--border)",
                            borderLeft: "1px solid var(--border)",
                            borderRight: "1px solid var(--border)",
                            borderBottom: "1px solid var(--border-hover)",
                        }}
                    >
                        {/* Traffic-light dots */}
                        <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                        <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
                        <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
                        <p
                            className="flex-1 text-center text-[10px] tracking-widest uppercase"
                            style={{ color: "var(--fg-muted)", fontFamily: "var(--font-space-mono), monospace" }}
                        >
                            send a message
                        </p>
                    </div>

                    {/* Form body */}
                    <div
                        className="p-7"
                        style={{
                            background: "var(--card-bg)",
                            border: "1px solid var(--border)",
                            borderTop: "none",
                        }}
                    >
                        {/* Status messages */}
                        <AnimatePresence mode="wait">
                            {status === "success" && (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-3 mb-6 p-3"
                                    style={{ border: "1px solid var(--border)", background: "var(--accent-bg)" }}
                                >
                                    <CheckCircle size={15} style={{ color: "#28c840", flexShrink: 0 }} />
                                    <p className="text-xs" style={{ color: "var(--fg)", fontFamily: "var(--font-space-mono), monospace" }}>
                                        Message sent! You&apos;ll also get a confirmation email.
                                    </p>
                                </motion.div>
                            )}
                            {status === "error" && (
                                <motion.div
                                    key="error"
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-3 mb-6 p-3"
                                    style={{ border: "1px solid #ff5f57", background: "rgba(255,95,87,0.06)" }}
                                >
                                    <AlertCircle size={15} style={{ color: "#ff5f57", flexShrink: 0 }} />
                                    <p className="text-xs" style={{ color: "var(--fg)", fontFamily: "var(--font-space-mono), monospace" }}>
                                        {errorMsg}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {[
                                { label: "Full Name", name: "fullName", type: "text",  placeholder: "Your name" },
                                { label: "Email",     name: "email",    type: "email", placeholder: "your@email.com" },
                            ].map(({ label, name, type, placeholder }) => (
                                <div key={name}>
                                    <label
                                        className="block text-[10px] tracking-widest uppercase mb-1.5"
                                        style={{ color: "var(--fg-muted)", fontFamily: "var(--font-space-mono), monospace" }}
                                    >
                                        {label}
                                    </label>
                                    <input
                                        type={type} name={name}
                                        value={formData[name as keyof typeof formData]}
                                        onChange={handleChange}
                                        required placeholder={placeholder}
                                        disabled={status === "sending"}
                                        className="clean-input"
                                        style={{ opacity: status === "sending" ? 0.6 : 1 }}
                                    />
                                </div>
                            ))}

                            <div>
                                <label
                                    className="block text-[10px] tracking-widest uppercase mb-1.5"
                                    style={{ color: "var(--fg-muted)", fontFamily: "var(--font-space-mono), monospace" }}
                                >
                                    Message
                                </label>
                                <textarea
                                    name="message" value={formData.message} onChange={handleChange}
                                    required rows={4} placeholder="Your message..."
                                    disabled={status === "sending"}
                                    className="clean-input resize-none"
                                    style={{ opacity: status === "sending" ? 0.6 : 1 }}
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={status === "sending" || status === "success"}
                                className="btn-primary w-full justify-center py-3 text-xs"
                                style={{
                                    opacity: (status === "sending" || status === "success") ? 0.7 : 1,
                                    cursor: status === "sending" ? "not-allowed" : "pointer"
                                }}
                                whileTap={status === "idle" ? { scale: 0.98 } : {}}
                            >
                                {status === "sending" ? (
                                    <>
                                        <Loader size={12} className="animate-spin" />
                                        Sending...
                                    </>
                                ) : status === "success" ? (
                                    <>
                                        <CheckCircle size={12} />
                                        Sent!
                                    </>
                                ) : (
                                    <>
                                        <Send size={12} />
                                        Send Message
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.div
                    {...fadeUp(0.32)}
                    className="mt-14 pt-6 text-center"
                    style={{ borderTop: "1px solid var(--border)" }}
                >
                    <p
                        className="text-[10px] tracking-widest uppercase"
                        style={{ color: "var(--fg-muted)", fontFamily: "var(--font-space-mono), monospace" }}
                    >
                        © {new Date().getFullYear()} Swadhin — Designed &amp; Developed
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
