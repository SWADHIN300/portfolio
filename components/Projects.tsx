"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "./ui/button";

const projects = [
    {
        title: "Coin Tracking",
        description: "A comprehensive cryptocurrency tracking application with real-time price updates, candlestick charts, and portfolio management features.",
        tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Chart.js"],
        liveUrl: "https://coin-tracking-three.vercel.app/",
        githubUrl: "https://github.com/SWADHIN300/coin-tracking",
    },
    {
        title: "Stock Tracker",
        description: "Real-time stock market tracking application with advanced analytics, portfolio management, and market insights.",
        tech: ["Next.js", "React", "TypeScript", "API Integration"],
        liveUrl: null,
        githubUrl: "https://github.com/SWADHIN300/stock-tracker",
    },
];

export default function Projects() {
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
                                key={project.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="bg-background border-4 border-foreground p-8 shadow-hard hover:-translate-x-2 hover:-translate-y-2 transition-all duration-300">
                                    <h3 className="text-4xl font-display font-bold mb-4 uppercase tracking-tight">
                                        {project.title}
                                    </h3>

                                    <p className="text-foreground text-lg mb-6 leading-relaxed font-sans">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 text-sm font-mono border-2 border-foreground bg-foreground text-background"
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
