"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Lock,
    LogOut,
    Plus,
    Trash2,
    FolderOpen,
    Zap,
    Eye,
    EyeOff,
    ExternalLink,
    X,
    Save,
    Home,
} from "lucide-react";
import { defaultProjects, defaultSkills, iconMap, type Project } from "@/lib/data";
import Link from "next/link";

const ADMIN_PASSWORD = "swadh123";
const SESSION_KEY = "admin_authed";

type StoredSkill = { name: string; iconKey: string; url: string };

type Tab = "projects" | "skills";

/* ── helpers ── */
function getExtraProjects(): Project[] {
    try {
        return JSON.parse(localStorage.getItem("swadh_projects") ?? "[]");
    } catch {
        return [];
    }
}

function getExtraSkills(): StoredSkill[] {
    try {
        return JSON.parse(localStorage.getItem("swadh_skills") ?? "[]");
    } catch {
        return [];
    }
}

/* ── Login Screen ── */
function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const [shake, setShake] = useState(false);

    const submit = () => {
        if (password === ADMIN_PASSWORD) {
            sessionStorage.setItem(SESSION_KEY, "1");
            onSuccess();
        } else {
            setError("Wrong password. Try again.");
            setShake(true);
            setTimeout(() => setShake(false), 500);
            setPassword("");
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="border-4 border-white p-10" style={{ boxShadow: '6px 6px 0 0 white' }}>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-white flex items-center justify-center">
                            <Lock className="w-6 h-6 text-black" />
                        </div>
                        <h1 className="text-4xl font-display uppercase tracking-tighter text-white">
                            Admin
                        </h1>
                    </div>

                    <p className="text-white/60 font-sans mb-6">
                        Enter your password to access the dashboard.
                    </p>

                    <motion.div
                        animate={shake ? { x: [-8, 8, -8, 8, 0] } : {}}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="relative mb-4">
                            <input
                                type={show ? "text" : "password"}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError("");
                                }}
                                onKeyDown={(e) => e.key === "Enter" && submit()}
                                placeholder="Password"
                                className="w-full border-2 border-white bg-black text-white placeholder-white/40 px-4 py-3 font-mono text-lg pr-12 outline-none focus:border-white"
                            />
                            <button
                                onClick={() => setShow(!show)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                            >
                                {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {error && (
                            <p className="text-red-400 font-mono text-sm mb-4">{error}</p>
                        )}
                    </motion.div>

                    <button
                        onClick={submit}
                        className="w-full border-2 border-white bg-white text-black font-display text-xl uppercase py-3 hover:-translate-x-1 hover:-translate-y-1 transition-all"
                        style={{ boxShadow: '0 0 0 0 white' }}
                    >
                        Login
                    </button>
                </div>

                <Link
                    href="/"
                    className="flex items-center gap-2 mt-6 text-white/50 hover:text-white font-mono text-sm transition-colors"
                >
                    <Home className="w-4 h-4" /> Back to portfolio
                </Link>
            </motion.div>
        </div>
    );
}

/* ── Add Project Modal ── */
function AddProjectModal({ onClose, onAdd }: { onClose: () => void; onAdd: (p: Project) => void }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tech, setTech] = useState("");
    const [liveUrl, setLiveUrl] = useState("");
    const [githubUrl, setGithubUrl] = useState("");

    const save = () => {
        if (!title.trim() || !description.trim() || !githubUrl.trim()) return;
        onAdd({
            title: title.trim(),
            description: description.trim(),
            tech: tech.split(",").map((t) => t.trim()).filter(Boolean),
            liveUrl: liveUrl.trim() || null,
            githubUrl: githubUrl.trim(),
        });
        onClose();
    };

    return (
        <ModalWrapper onClose={onClose} title="Add Project">
            <Field label="Title *" value={title} onChange={setTitle} />
            <Field label="Description *" value={description} onChange={setDescription} multiline />
            <Field label="Tech Stack (comma-separated)" value={tech} onChange={setTech} placeholder="Next.js, React, TypeScript" />
            <Field label="Live URL" value={liveUrl} onChange={setLiveUrl} placeholder="https://..." />
            <Field label="GitHub URL *" value={githubUrl} onChange={setGithubUrl} placeholder="https://github.com/..." />
            <SaveButton onClick={save} disabled={!title || !description || !githubUrl} />
        </ModalWrapper>
    );
}

/* ── Add Skill Modal ── */
function AddSkillModal({ onClose, onAdd }: { onClose: () => void; onAdd: (s: StoredSkill) => void }) {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [iconKey, setIconKey] = useState("Globe");

    const save = () => {
        if (!name.trim() || !url.trim()) return;
        onAdd({ name: name.trim(), url: url.trim(), iconKey });
        onClose();
    };

    return (
        <ModalWrapper onClose={onClose} title="Add Capability">
            <Field label="Name *" value={name} onChange={setName} placeholder="e.g. Rust" />
            <Field label="Official URL *" value={url} onChange={setUrl} placeholder="https://..." />
            <div className="mb-4">
                <label className="block font-mono text-sm mb-2 uppercase tracking-wider text-muted-foreground">
                    Icon
                </label>
                <select
                    value={iconKey}
                    onChange={(e) => setIconKey(e.target.value)}
                    className="w-full border-2 border-white bg-black text-white px-4 py-2 font-mono outline-none focus:border-white"
                >
                    {Object.keys(iconMap).map((k) => (
                        <option key={k} value={k} className="bg-black text-white">{k}</option>
                    ))}
                </select>
            </div>
            <SaveButton onClick={save} disabled={!name || !url} />
        </ModalWrapper>
    );
}

/* ── Shared UI helpers ── */
function ModalWrapper({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) {
    return (
        <div className="fixed inset-0 bg-white/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-black border-4 border-white p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto"
                style={{ boxShadow: '10px 10px 0 0 white' }}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-display uppercase tracking-tight text-white">{title}</h2>
                    <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                {children}
            </motion.div>
        </div>
    );
}

function Field({
    label, value, onChange, multiline, placeholder,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    multiline?: boolean;
    placeholder?: string;
}) {
    const cls = "w-full border-2 border-white bg-black text-white placeholder-white/40 px-4 py-2 font-mono outline-none focus:border-white";
    return (
        <div className="mb-4">
            <label className="block font-mono text-sm mb-2 uppercase tracking-wider text-white/60">
                {label}
            </label>
            {multiline ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    rows={3}
                    className={cls + " resize-none"}
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={cls}
                />
            )}
        </div>
    );
}

function SaveButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="border-2 border-white bg-white text-black font-display text-xl uppercase py-3 flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed w-full justify-center mt-2 hover:-translate-x-1 hover:-translate-y-1 transition-all"
        >
            <Save className="w-4 h-4" /> Save
        </button>
    );
}

/* ── Main Dashboard ── */
function Dashboard({ onLogout }: { onLogout: () => void }) {
    const [tab, setTab] = useState<Tab>("projects");
    const [extraProjects, setExtraProjects] = useState<Project[]>(getExtraProjects);
    const [extraSkills, setExtraSkills] = useState<StoredSkill[]>(getExtraSkills);
    const [showAddProject, setShowAddProject] = useState(false);
    const [showAddSkill, setShowAddSkill] = useState(false);

    const allProjects = [...defaultProjects, ...extraProjects];
    const allSkills = [...defaultSkills.map((s) => ({ name: s.name, iconKey: "Globe", url: s.url })), ...extraSkills];

    function addProject(p: Project) {
        const updated = [...extraProjects, p];
        setExtraProjects(updated);
        localStorage.setItem("admin_projects", JSON.stringify(updated));
    }

    function deleteProject(index: number) {
        // index is into allProjects; first N are defaults
        const defaultCount = defaultProjects.length;
        if (index < defaultCount) return; // can't delete defaults via this — use data.ts
        const extraIndex = index - defaultCount;
        const updated = extraProjects.filter((_, i) => i !== extraIndex);
        setExtraProjects(updated);
        localStorage.setItem("admin_projects", JSON.stringify(updated));
    }

    function addSkill(s: StoredSkill) {
        const updated = [...extraSkills, s];
        setExtraSkills(updated);
        localStorage.setItem("admin_skills", JSON.stringify(updated));
    }

    function deleteSkill(index: number) {
        const defaultCount = defaultSkills.length;
        if (index < defaultCount) return;
        const extraIndex = index - defaultCount;
        const updated = extraSkills.filter((_, i) => i !== extraIndex);
        setExtraSkills(updated);
        localStorage.setItem("admin_skills", JSON.stringify(updated));
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <header className="border-b-4 border-white px-6 py-4 flex items-center justify-between sticky top-0 bg-black z-40">
                <div className="flex items-center gap-4">
                    <div className="w-9 h-9 bg-white flex items-center justify-center">
                        <Lock className="w-4 h-4 text-black" />
                    </div>
                    <span className="text-2xl text-white font-display uppercase tracking-tighter">Admin Dashboard</span>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/"
                        target="_blank"
                        className="border-2 border-white text-white text-sm px-4 py-1.5 flex items-center gap-2 hover:bg-white hover:text-black transition-all font-display uppercase"
                    >
                        <ExternalLink className="w-3 h-3" /> View Site
                    </Link>
                    <button
                        onClick={onLogout}
                        className="border-2 border-white text-white text-sm px-4 py-1.5 flex items-center gap-2 hover:bg-white hover:text-black transition-all font-display uppercase"
                    >
                        <LogOut className="w-3 h-3" /> Logout
                    </button>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-6 py-10">
                {/* Tabs */}
                <div className="flex gap-0 mb-10 border-2 border-white w-fit">
                    {(["projects", "skills"] as Tab[]).map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`px-8 py-3 font-display text-xl uppercase tracking-tight transition-colors flex items-center gap-2 ${tab === t
                                ? "bg-white text-black"
                                : "bg-black text-white hover:bg-white/10"
                                }`}
                        >
                            {t === "projects" ? <FolderOpen className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                            {t}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {tab === "projects" ? (
                        <motion.div
                            key="projects"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-3xl font-display uppercase tracking-tight text-white">
                                    Projects ({allProjects.length})
                                </h2>
                                <button
                                    onClick={() => setShowAddProject(true)}
                                    className="border-2 border-white text-white text-base px-4 py-2 flex items-center gap-2 hover:bg-white hover:text-black transition-all font-display uppercase"
                                >
                                    <Plus className="w-4 h-4" /> Add Project
                                </button>
                            </div>

                            <div className="space-y-4">
                                {allProjects.map((p, i) => {
                                    const isDefault = i < defaultProjects.length;
                                    return (
                                        <motion.div
                                            key={p.title + i}
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="border-2 border-white p-6 flex gap-4 items-start"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-1 flex-wrap">
                                                    <h3 className="text-xl font-display uppercase tracking-tight text-white">
                                                        {p.title}
                                                    </h3>
                                                    {isDefault && (
                                                        <span className="text-xs font-mono border border-white/50 px-2 py-0.5 text-white/50">
                                                            DEFAULT
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-white/60 font-sans text-sm mb-3 line-clamp-2">
                                                    {p.description}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {p.tech.map((t) => (
                                                        <span key={t} className="text-xs font-mono bg-white text-black px-2 py-0.5">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex gap-2 shrink-0">
                                                {p.liveUrl && (
                                                    <a
                                                        href={p.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-9 h-9 border-2 border-white text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                                                        title="Live URL"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                )}
                                                {!isDefault && (
                                                    <button
                                                        onClick={() => deleteProject(i)}
                                                        className="w-9 h-9 border-2 border-red-500 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="skills"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-3xl font-display uppercase tracking-tight text-white">
                                    Capabilities ({allSkills.length})
                                </h2>
                                <button
                                    onClick={() => setShowAddSkill(true)}
                                    className="border-2 border-white text-white text-base px-4 py-2 flex items-center gap-2 hover:bg-white hover:text-black transition-all font-display uppercase"
                                >
                                    <Plus className="w-4 h-4" /> Add Capability
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {allSkills.map((s, i) => {
                                    const isDefault = i < defaultSkills.length;
                                    return (
                                        <motion.div
                                            key={s.name + i}
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="border-2 border-white p-4 flex items-center justify-between gap-3"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <span className="font-display uppercase tracking-tight text-lg text-white">
                                                    {s.name}
                                                </span>
                                                {isDefault && (
                                                    <span className="text-xs font-mono border border-white/50 px-1.5 py-0.5 text-white/50 shrink-0">
                                                        DEFAULT
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <a
                                                    href={s.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-8 h-8 border-2 border-white text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                                                    title="Official page"
                                                >
                                                    <ExternalLink className="w-3.5 h-3.5" />
                                                </a>
                                                {!isDefault && (
                                                    <button
                                                        onClick={() => deleteSkill(i)}
                                                        className="w-8 h-8 border-2 border-red-500 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Modals */}
            <AnimatePresence>
                {showAddProject && (
                    <AddProjectModal onClose={() => setShowAddProject(false)} onAdd={addProject} />
                )}
                {showAddSkill && (
                    <AddSkillModal onClose={() => setShowAddSkill(false)} onAdd={addSkill} />
                )}
            </AnimatePresence>
        </div>
    );
}

/* ── Page Entry ── */
export default function AdminPage() {
    const [authed, setAuthed] = useState<boolean | null>(null);

    useEffect(() => {
        setAuthed(sessionStorage.getItem(SESSION_KEY) === "1");
    }, []);

    const logout = () => {
        sessionStorage.removeItem(SESSION_KEY);
        setAuthed(false);
    };

    if (authed === null) return null; // hydration guard

    return authed ? <Dashboard onLogout={logout} /> : <LoginScreen onSuccess={() => setAuthed(true)} />;
}
