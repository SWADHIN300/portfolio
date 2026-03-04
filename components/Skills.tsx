"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { defaultSkills, iconMap, type Skill } from "@/lib/data";

type StoredSkill = { name: string; iconKey: string; url: string };

export default function Skills() {
    const [skills, setSkills] = useState<Skill[]>(defaultSkills);

    useEffect(() => {
        try {
            const stored = localStorage.getItem("admin_skills");
            if (stored) {
                const extra: StoredSkill[] = JSON.parse(stored);
                const extraSkills: Skill[] = extra.map((s) => ({
                    name: s.name,
                    icon: iconMap[s.iconKey] ?? iconMap["Globe"],
                    url: s.url,
                }));
                setSkills([...defaultSkills, ...extraSkills]);
            }
        } catch {
            // ignore
        }
    }, []);

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
                                <motion.a
                                    key={skill.name + index}
                                    href={skill.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
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
                                    <div className="px-6 py-4 bg-background border-2 border-foreground hover:shadow-hard transition-all cursor-pointer flex items-center gap-3 relative">
                                        <Icon className="w-6 h-6 text-foreground" />
                                        <span className="text-xl text-foreground font-display uppercase tracking-tight">
                                            {skill.name}
                                        </span>
                                        <ExternalLink className="w-3 h-3 text-foreground opacity-0 group-hover:opacity-60 transition-opacity absolute top-2 right-2" />
                                    </div>
                                </motion.a>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
