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
        <section id="skills" className="min-h-screen py-20 px-4 border-t-4 border-foreground">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-6xl md:text-8xl font-display mb-16 uppercase tracking-tighter border-b-8 border-foreground pb-4 inline-block">
                        Capabilities
                    </h2>

                    <div className="flex flex-wrap gap-4">
                        {skills.map((skill, index) => {
                            const Icon = skill.icon;
                            return (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.02 }}
                                    viewport={{ once: true }}
                                    whileHover={{
                                        translateY: -4,
                                        translateX: -4,
                                    }}
                                    className="group"
                                >
                                    <div className="px-6 py-4 bg-background border-2 border-foreground hover:shadow-hard transition-all cursor-default flex items-center gap-3">
                                        <Icon className="w-6 h-6 text-foreground" />
                                        <span className="text-xl text-foreground font-display uppercase tracking-tight">
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

