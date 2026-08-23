"use client";

import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { defaultProjects, type Project } from "@/lib/data";
import Reveal from "@/components/Reveal";
import DraggableCard from "@/components/DraggableCard";

/* A generated "app window" preview so every card has a visual even when
   no screenshot is supplied. Mirrors the project-preview styling already
   defined in globals.css. */
function CardPreview({ title, index }: { title: string; index: number }) {
    return (
        <div
            className={`project-preview project-preview-${index % 4}`}
            role="img"
            aria-label={`${title} preview`}
        >
            <div className="project-preview-top">
                <span>{title.toUpperCase()}</span>
                <span>● LIVE BUILD</span>
            </div>
            <div className="project-preview-body">
                <div className="project-preview-sidebar"><span /><span /><span /><span /></div>
                <div className="project-preview-chart"><i /><i /><i /><i /><i /><i /><i /><i /></div>
                <div className="project-preview-panel"><span /><span /><span /></div>
            </div>
        </div>
    );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <Reveal
            as="article"
            direction="up"
            delay={(index % 2) * 0.08}
            amount={0.25}
            className="mini-card"
            style={{
                display: "flex",
                flexDirection: "column",
                padding: 20,
                height: "100%",
            }}
        >
            {/* Header: index + title, with a hover arrow */}
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 12,
                    marginBottom: 10,
                }}
            >
                <div style={{ minWidth: 0 }}>
                    <p
                        className="label"
                        style={{ marginBottom: 6 }}
                    >
                        {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3
                        style={{
                            fontFamily: "var(--font-space-mono), monospace",
                            color: "var(--fg)",
                            fontSize: "1.05rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "-0.01em",
                            lineHeight: 1.1,
                            margin: 0,
                        }}
                    >
                        {project.title}
                    </h3>
                </div>

                <a
                    href={project.liveUrl ?? project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="social-icon"
                    style={{ flexShrink: 0 }}
                >
                    <ArrowUpRight size={14} />
                </a>
            </div>

            {/* Generated preview */}
            <CardPreview title={project.title} index={index} />

            {/* Description */}
            <p
                style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    color: "var(--fg-muted)",
                    fontSize: "0.72rem",
                    lineHeight: 1.75,
                    margin: "14px 0",
                    flex: 1,
                }}
            >
                {project.description}
            </p>

            {/* Tech tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                {project.tech.map((tech) => (
                    <span key={tech} className="badge">{tech}</span>
                ))}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: "auto" }}>
                {project.liveUrl && (
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-solid"
                        style={{ fontSize: "0.62rem", padding: "7px 14px" }}
                    >
                        <ExternalLink size={12} /> Live
                    </a>
                )}
                <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                    style={{ fontSize: "0.62rem", padding: "7px 14px" }}
                >
                    <Github size={12} /> Source
                </a>
            </div>
        </Reveal>
    );
}

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>(defaultProjects);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        try {
            const stored = localStorage.getItem("admin_projects");
            if (stored) {
                const extra: Project[] = JSON.parse(stored);
                setProjects([...defaultProjects, ...extra]);
            }
        } catch {
            /* ignore malformed storage */
        }
    }, []);

    return (
        <section id="projects" className="section-container">
            <div className="max-w-5xl">
                <Reveal direction="up" amount={0.4}>
                    <p className="label" style={{ marginBottom: 12 }}>{"// 02"}</p>
                    <h2
                        style={{
                            fontFamily: "var(--font-space-mono), monospace",
                            color: "var(--fg)",
                            fontSize: "clamp(2.5rem, 7vw, 5rem)",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            lineHeight: 1,
                            letterSpacing: "-0.02em",
                            marginBottom: "0.75rem",
                        }}
                    >
                        Projects
                    </h2>
                    <p
                        className="label"
                        style={{ marginBottom: "2.5rem", opacity: 0.7 }}
                    >
                        Tip: drag a card to reposition it
                    </p>
                </Reveal>

                <div
                    ref={gridRef}
                    className="grid md:grid-cols-2 gap-5"
                    style={{ display: "grid", gap: 20, position: "relative" }}
                >
                    {projects.map((project, i) => (
                        <DraggableCard
                            key={project.title + i}
                            constraintsRef={gridRef}
                            style={{ height: "100%" }}
                        >
                            <ProjectCard project={project} index={i} />
                        </DraggableCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
