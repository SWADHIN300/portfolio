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
                const extras: Skill[] = extra.map((s) => ({
                    name: s.name,
                    icon: iconMap[s.iconKey] ?? iconMap["Globe"],
                    url: s.url,
                }));
                setSkills([...defaultSkills, ...extras]);
            }
        } catch { /* ignore */ }
    }, []);

    return (
        <section id="skills" className="section-container">
            <div className="max-w-5xl">
                <motion.p
                    className="section-label mb-4"
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                >
                    {"// 03"}
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
                    Skills
                </motion.h2>

                <div className="flex flex-wrap gap-2">
                    {skills.map((skill, i) => {
                        const Icon = skill.icon;
                        return (
                            <motion.a
                                key={skill.name + i}
                                href={skill.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.25, delay: i * 0.025 }}
                                className="skill-pill group relative"
                            >
                                <Icon size={13} style={{ flexShrink: 0 }} />
                                {skill.name}
                                <ExternalLink
                                    size={9}
                                    className="opacity-0 group-hover:opacity-40 transition-opacity absolute top-1.5 right-1.5"
                                />
                            </motion.a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
