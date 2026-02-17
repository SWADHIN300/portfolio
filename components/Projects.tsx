"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "./ui/button";

const projects = [
    {
        title: "Coin Tracking",
        description: "A comprehensive cryptocurrency tracking application with real-time price updates, candlestick charts, and portfolio management features.",
        tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Chart.js"],
        liveUrl: "https://coin-tracking-7mso.vercel.app/",
        githubUrl: "https://github.com/SWADHIN300/coin-tracking",
        gradient: "from-purple-500 to-pink-500",
    },
    {
        title: "Stock Tracker",
        description: "Real-time stock market tracking application with advanced analytics, portfolio management, and market insights.",
        tech: ["Next.js", "React", "TypeScript", "API Integration"],
        liveUrl: null,
        githubUrl: "https://github.com/SWADHIN300/stock-tracker",
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        title: "Gift",
        description: "An interactive gift application with beautiful animations and user-friendly interface for creating and sharing digital gifts.",
        tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        liveUrl: "https://gift-two-ivory.vercel.app/",
        githubUrl: "https://github.com/SWADHIN300/gift",
        gradient: "from-pink-500 to-rose-500",
    },
];

export default function Projects() {
    return (
        <section id="projects" className="min-h-screen py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-12">
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Featured Projects
                        </span>
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="group relative"
                            >
                                {/* Gradient border effect */}
                                <div className={`absolute -inset-0.5 bg-gradient-to-r ${project.gradient} rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-300`}></div>

                                <div className="relative bg-black border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all duration-300">
                                    <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                                        {project.title}
                                    </h3>

                                    <p className="text-gray-400 mb-4 leading-relaxed">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 text-xs font-mono bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 rounded-full border border-gray-700"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-4">
                                        {project.liveUrl && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                                className="group/btn border-purple-500/50 hover:border-purple-500 hover:bg-purple-500/10"
                                            >
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    Live Demo
                                                </a>
                                            </Button>
                                        )}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            asChild
                                            className="group/btn hover:bg-gray-800"
                                        >
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2"
                                            >
                                                <Github className="w-4 h-4" />
                                                GitHub
                                            </a>
                                        </Button>
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
