"use client";

import { motion } from "framer-motion";
import {
    Code2,
    Database,
    Server,
    Layers,
    Zap,
    Box,
    GitBranch,
    Globe,
    FileCode,
    Braces,
    Terminal,
    Wrench,
    Shield,
    Cloud
} from "lucide-react";

const skills = [
    { name: "React", icon: Braces },
    { name: "Next.js", icon: Layers },
    { name: "TypeScript", icon: FileCode },
    { name: "JavaScript", icon: Terminal },
    { name: "Express", icon: Server },
    { name: "Node.js", icon: Server },
    { name: "PostgreSQL", icon: Database },
    { name: "MongoDB", icon: Database },
    { name: "Prisma", icon: Layers },
    { name: "Redis", icon: Database },
    { name: "Tailwind CSS", icon: Zap },
    { name: "Framer Motion", icon: Zap },
    { name: "Git", icon: GitBranch },
    { name: "GitHub", icon: GitBranch },
    { name: "Docker", icon: Box },
    { name: "Vercel", icon: Cloud },
    { name: "REST APIs", icon: Globe },
    { name: "GraphQL", icon: Layers },
    { name: "MySQL", icon: Database },
    { name: "HTML/CSS", icon: Globe },
    { name: "VS Code", icon: Code2 },
];

export default function Skills() {
    return (
        <section id="skills" className="min-h-screen py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">
                        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            Skills & Technologies
                        </span>
                    </h2>

                    {/* Pill badges layout */}
                    <div className="flex flex-wrap gap-3">
                        {skills.map((skill, index) => {
                            const Icon = skill.icon;
                            return (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.03 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.05 }}
                                    className="group relative"
                                >
                                    <div className="px-4 py-2.5 bg-gray-900/50 border border-gray-800 rounded-full flex items-center gap-2 hover:border-gray-600 hover:bg-gray-800/50 transition-all duration-300 cursor-default">
                                        <Icon className="w-4 h-4 text-gray-400 group-hover:text-gray-300 transition-colors" />
                                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors font-medium">
                                            {skill.name}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

