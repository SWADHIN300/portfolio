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
        } catch {
            // ignore
        }
    }, []);

    return (
        <section id="projects" className="min-h-screen py-20 px-4 border-t-4 border-foreground">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-6xl md:text-8xl font-display mb-16 uppercase tracking-tighter border-b-8 border-foreground pb-4 inline-block">
                        Featured Projects
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.title + index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="bg-background border-4 border-foreground p-8 shadow-hard hover:-translate-x-2 hover:-translate-y-2 transition-all duration-300">
                                    <h3 className="text-4xl font-display text-white font-bold mb-4 uppercase tracking-tight">
                                        {project.title}
                                    </h3>

                                    <p className="text-white/60 text-lg mb-6 leading-relaxed font-sans">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 text-sm font-mono border-2 border-white text-white bg-black"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-4">
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-neobrutal flex items-center gap-2 text-sm"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                Live Demo
                                            </a>
                                        )}
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-neobrutal flex items-center gap-2 text-sm"
                                        >
                                            <Github className="w-4 h-4" />
                                            GitHub
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
