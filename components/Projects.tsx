"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useEffect, useState } from "react";
import { defaultProjects, type Project } from "@/lib/data";

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>(defaultProjects);

    useEffect(() => {
        try {
            const stored = localStorage.getItem("admin_projects");
            if (stored) {
                const extra: Project[] = JSON.parse(stored);
                setProjects([...defaultProjects, ...extra]);
            }
        } catch { /* ignore */ }
    }, []);

    return (
        <section id="projects" className="section-container">
            <div className="max-w-5xl">
                <motion.p
                    className="section-label mb-4"
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                >
                    // 02
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.06 }}
                    style={{
                        fontFamily: "var(--font-space-mono), monospace",
                        color: "var(--fg)",
                        fontSize: "clamp(2.5rem, 7vw, 5rem)",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                        marginBottom: "3rem",
                    }}
                >
                    Projects
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-5">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.title + i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: i * 0.08 }}
                            className="clean-card p-6 flex flex-col"
                        >
                            <p
                                className="text-[10px] tracking-widest uppercase mb-3"
                                style={{ fontFamily: "var(--font-space-mono), monospace", color: "var(--fg-muted)" }}
                            >
                                {String(i + 1).padStart(2, "0")}
                            </p>

                            <h3
                                className="text-xl font-bold uppercase tracking-tight mb-3"
                                style={{ fontFamily: "var(--font-space-mono), monospace", color: "var(--fg)" }}
                            >
                                {project.title}
                            </h3>

                            <p
                                className="text-sm leading-relaxed mb-5 flex-1"
                                style={{ fontFamily: "var(--font-space-mono), monospace", color: "var(--fg-muted)" }}
                            >
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-5">
                                {project.tech.map((tech) => (
                                    <span key={tech} className="tech-badge">{tech}</span>
                                ))}
                            </div>

                            <div className="flex gap-3 flex-wrap">
                                {project.liveUrl && (
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                                        className="btn-primary text-xs py-2 px-4">
                                        <ExternalLink size={12} /> Live
                                    </a>
                                )}
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                                    className="btn-outline text-xs py-2 px-4">
                                    <Github size={12} /> GitHub
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
