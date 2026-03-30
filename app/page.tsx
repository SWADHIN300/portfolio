"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
    motion, AnimatePresence,
    useMotionValue, useTransform, useSpring,
} from "framer-motion";
import {
    Sun, Moon, Home, User, FolderOpen, Cpu, Mail, Github, Twitter,
    ExternalLink, Send, CheckCircle, AlertCircle, Loader, Briefcase,
    BookOpen, Terminal as TerminalIcon, Wrench, FileText, FileDown,
    X as XIcon, Music, Link as LinkIcon,
} from "lucide-react";
import { defaultProjects, defaultSkills } from "@/lib/data";

/* ══════════════════════════════════════════╗
   HELPERS
╚══════════════════════════════════════════ */
function SectionHead({ label, title }: { label: string; title: string }) {
    return (
        <div style={{ marginBottom: 18 }}>
            <p className="label" style={{ marginBottom: 5 }}>{label}</p>
            <h2 style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "1.9rem", fontWeight: 700, textTransform: "uppercase", color: "var(--fg)", lineHeight: 1, margin: 0 }}>{title}</h2>
        </div>
    );
}

/* ══════════════════════════════════════════╗
   STATUS BAR
╚══════════════════════════════════════════ */
function StatusBar({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    useEffect(() => {
        const tick = () => {
            const n = new Date();
            setTime(n.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }));
            setDate(n.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }));
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);
    return (
        <div className="status-bar">
            <span style={{ color: "var(--fg)", fontWeight: 700, letterSpacing: "0.2em" }}>SR</span>
            <span style={{ marginLeft: 10,paddingRight:10}}>Portfolio</span>
            <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 8 }}>
                <span className="status-dot" />
                <span>Open to Work</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <button onClick={onToggle} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--fg-muted)", padding: 0, display: "flex", alignItems: "center", gap: 4, fontSize: "0.62rem", fontFamily: "var(--font-space-mono), monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {isDark ? <><Sun size={10} /> Light</> : <><Moon size={10} /> Dark</>}
                </button>
                <span>{date}</span>
                <span style={{ color: "var(--fg)" }}>{time}</span>
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════╗
   WINDOW WRAPPER
╚══════════════════════════════════════════ */
function Window({ id, title, children, onClose, width = "min(640px, 92vw)", maxH = "76vh" }: {
    id: string; title: string; children: React.ReactNode;
    onClose: () => void; width?: string; maxH?: string;
}) {
    return (
        <motion.div
            key={id}
            initial={{ scale: 0.82, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.82, opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className="glass-window"
            style={{ width, display: "flex", flexDirection: "column", maxHeight: maxH }}
        >
            <div className="glass-window-titlebar">
                <span className="traffic-dot traffic-close" onClick={onClose} style={{ cursor: "pointer" }} />
                <span className="traffic-dot traffic-min" />
                <span className="traffic-dot traffic-max" />
                <span style={{ flex: 1, textAlign: "center", fontFamily: "var(--font-space-mono), monospace", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--fg-muted)" }}>{title}</span>
            </div>
            <div style={{ overflowY: "auto", flex: 1 }}>{children}</div>
        </motion.div>
    );
}

/* ══════════════════════════════════════════╗
   DESKTOP BACKGROUND WIDGETS
╚══════════════════════════════════════════ */
const QUOTES = [
    { text: "The best code is no code at all.", attr: "Jeff Atwood" },
    { text: "Simplicity is prerequisite for reliability.", attr: "Dijkstra" },
    { text: "Make it work, make it right, make it fast.", attr: "Kent Beck" },
    { text: "First, solve the problem. Then, write the code.", attr: "John Johnson" },
];

function Widget({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
                background: "rgba(18,18,18,0.82)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: 10,
                padding: "14px 16px",
                fontFamily: "var(--font-space-mono), monospace",
                ...style,
            }}
        >
            {children}
        </motion.div>
    );
}

function QuoteWidget() {
    const [idx, setIdx] = useState(0);
    useEffect(() => { const id = setInterval(() => setIdx(i => (i + 1) % QUOTES.length), 8000); return () => clearInterval(id); }, []);
    const q = QUOTES[idx];
    return (
        <Widget>
            <AnimatePresence mode="wait">
                <motion.p key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
                    style={{ fontSize: "0.7rem", color: "rgba(240,240,240,0.8)", lineHeight: 1.6, fontStyle: "italic", marginBottom: 10 }}>
                    &ldquo;{q.text}&rdquo;
                </motion.p>
            </AnimatePresence>
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
                {QUOTES.map((_, i) => (
                    <span key={i} style={{ width: i === idx ? 16 : 5, height: 3, borderRadius: 2, background: i === idx ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)", transition: "all 0.3s" }} />
                ))}
            </div>
            <p style={{ fontSize: "0.55rem", color: "rgba(240,240,240,0.35)", letterSpacing: "0.2em", textTransform: "uppercase" }}>— SR · WRITING</p>
        </Widget>
    );
}

function LinksWidget() {
    const links = [
        { title: "The Zen of Erlang", sub: "Fred Hebert · systems" },
        { title: "You Don't Know JS", sub: "Kyle Simpson · js" },
        { title: "The Pragmatic Programmer", sub: "Hunt & Thomas · craft" },
        { title: "Clean Architecture", sub: "Robert C. Martin · design" },
        { title: "Designing Data-Intensive Apps", sub: "Kleppmann · systems" },
    ];
    return (
        <Widget>
            <p style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(240,240,240,0.35)", marginBottom: 12 }}>Links · Worth Reading</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {links.map(l => (
                    <div key={l.title} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 9 }}>
                        <p style={{ fontSize: "0.68rem", color: "rgba(240,240,240,0.85)", marginBottom: 2 }}>{l.title}</p>
                        <p style={{ fontSize: "0.55rem", color: "rgba(240,240,240,0.35)", letterSpacing: "0.08em" }}>{l.sub}</p>
                    </div>
                ))}
            </div>
        </Widget>
    );
}

function MusicWidget() {
    return (
        <Widget style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 6, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Music size={14} style={{ color: "rgba(240,240,240,0.5)" }} />
            </div>
            <div>
                <p style={{ fontSize: "0.62rem", color: "rgba(240,240,240,0.5)" }}>not playing</p>
                <div style={{ display: "flex", gap: 3, marginTop: 3 }}>
                    {[3, 6, 4, 7, 5, 3, 8].map((h, i) => (
                        <div key={i} style={{ width: 2, height: h, background: "rgba(240,240,240,0.2)", borderRadius: 1 }} />
                    ))}
                </div>
            </div>
        </Widget>
    );
}

function StatusWidget() {
    return (
        <Widget>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                <span className="status-dot" />
                <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(240,240,240,0.7)" }}>Open to Work</p>
            </div>
            {[
                { label: "Building", value: "Portfolio v2" },
                { label: "Reading", value: "Clean Architecture" },
                { label: "Writing", value: "Dev Blog Posts" },
            ].map(({ label, value }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                    <p style={{ fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(240,240,240,0.35)" }}>{label}</p>
                    <p style={{ fontSize: "0.68rem", color: "rgba(240,240,240,0.8)" }}>{value}</p>
                </div>
            ))}
        </Widget>
    );
}

function CalendarWidget() {
    const [now, setNow] = useState<Date | null>(null);

    useEffect(() => {
        setNow(new Date());
    }, []);

    const activeDate = now ?? new Date(2026, 2, 1);
    const year = activeDate.getFullYear();
    const month = activeDate.getMonth();
    const today = now ? activeDate.getDate() : null;
    const monthName = activeDate.toLocaleString("en-US", { month: "long" });
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (number | null)[] = Array(firstDay).fill(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return (
        <Widget>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "rgba(240,240,240,0.85)" }}>{monthName}</p>
                <p style={{ fontSize: "0.65rem", color: "rgba(240,240,240,0.35)" }}>{year}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 6 }}>
                {["S","M","T","W","T","F","S"].map((d, i) => (
                    <p key={i} style={{ fontSize: "0.5rem", textAlign: "center", color: "rgba(240,240,240,0.3)", letterSpacing: "0.05em" }}>{d}</p>
                ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
                {days.map((d, i) => (
                    <div key={i} style={{
                        fontSize: "0.55rem", textAlign: "center", padding: "3px 0", borderRadius: 4,
                        color: d !== null && d === today ? "black" : "rgba(240,240,240,0.55)",
                        background: d !== null && d === today ? "rgba(240,240,240,0.9)" : "transparent",
                        fontWeight: d !== null && d === today ? 700 : 400,
                    }}>
                        {d ?? ""}
                    </div>
                ))}
            </div>
        </Widget>
    );
}

const CONTRIBUTION_LEVELS: Record<string, number> = {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
};

function clampContributionLevel(value: number): number {
    return Math.max(0, Math.min(4, Math.round(value)));
}

function parseContributionDays(payload: unknown): Array<Record<string, unknown>> {
    if (!payload || typeof payload !== "object") return [];

    const source = payload as Record<string, unknown>;
    if (Array.isArray(source.contributions)) return source.contributions as Array<Record<string, unknown>>;
    if (Array.isArray(source.days)) return source.days as Array<Record<string, unknown>>;
    if (Array.isArray(source.weeks)) {
        return source.weeks.flatMap((week) => {
            if (!week || typeof week !== "object") return [];
            const weekData = week as Record<string, unknown>;
            if (Array.isArray(weekData.contributionDays)) return weekData.contributionDays as Array<Record<string, unknown>>;
            if (Array.isArray(weekData.days)) return weekData.days as Array<Record<string, unknown>>;
            return [];
        });
    }

    const graphWeeks = (source.data as Record<string, unknown> | undefined)?.user &&
        ((((source.data as Record<string, unknown>).user as Record<string, unknown>).contributionsCollection as Record<string, unknown> | undefined)?.contributionCalendar as Record<string, unknown> | undefined)?.weeks;
    if (Array.isArray(graphWeeks)) {
        return graphWeeks.flatMap((week) => {
            if (!week || typeof week !== "object") return [];
            const weekData = week as Record<string, unknown>;
            if (Array.isArray(weekData.contributionDays)) return weekData.contributionDays as Array<Record<string, unknown>>;
            return [];
        });
    }

    return [];
}

function parseContributionLevel(day: Record<string, unknown>): number {
    if (typeof day.level === "number") return clampContributionLevel(day.level);
    if (typeof day.intensity === "number") return clampContributionLevel(day.intensity);
    if (typeof day.level === "string") {
        const mapped = CONTRIBUTION_LEVELS[day.level.toUpperCase()];
        if (typeof mapped === "number") return mapped;
    }
    if (typeof day.contributionLevel === "string") {
        const mapped = CONTRIBUTION_LEVELS[day.contributionLevel.toUpperCase()];
        if (typeof mapped === "number") return mapped;
    }

    const countCandidate = typeof day.count === "number"
        ? day.count
        : typeof day.contributionCount === "number"
            ? day.contributionCount
            : null;

    if (countCandidate === null || countCandidate <= 0) return 0;
    if (countCandidate < 3) return 1;
    if (countCandidate < 7) return 2;
    if (countCandidate < 12) return 3;
    return 4;
}

function parseContributionCount(day: Record<string, unknown>): number {
    if (typeof day.count === "number") return day.count;
    if (typeof day.contributionCount === "number") return day.contributionCount;
    return parseContributionLevel(day) > 0 ? 1 : 0;
}

function buildContributionGrid(days: Array<Record<string, unknown>>, weeks: number): number[][] {
    const dayLevels = days.map(parseContributionLevel);
    const totalDays = weeks * 7;
    const slice = dayLevels.slice(-totalDays);
    const padded = [
        ...Array(Math.max(0, totalDays - slice.length)).fill(0),
        ...slice,
    ];

    const grid: number[][] = [];
    for (let week = 0; week < weeks; week++) {
        grid.push(padded.slice(week * 7, week * 7 + 7));
    }
    return grid;
}

function GithubGrid({ style }: { style?: React.CSSProperties }) {
    // GitHub's exact 5-level green palette
    const GH_COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
    const FUTURE_COLOR = "rgba(255,255,255,0.04)";
    const CELL = 11;
    const GAP  = 3;

    const YEAR = new Date().getFullYear();
    const TODAY = new Date();
    TODAY.setHours(0, 0, 0, 0);

    // Build the full Jan–Dec week columns for this year
    const yearStart = new Date(YEAR, 0, 1);         // Jan 1
    const yearEnd   = new Date(YEAR, 11, 31);        // Dec 31
    // Pad so the first column always starts on Sunday
    const startOffset = yearStart.getDay();           // 0=Sun
    const totalCells  = startOffset + (Math.ceil((yearEnd.getTime() - yearStart.getTime()) / 86400000) + 1);
    const WEEKS = Math.ceil(totalCells / 7);

    type CellInfo = { date: Date | null; isFuture: boolean; level: number };

    const [cells, setCells] = useState<CellInfo[]>(() =>
        Array.from({ length: WEEKS * 7 }, (_, i) => {
            const dayIndex = i - startOffset;
            if (dayIndex < 0) return { date: null, isFuture: false, level: 0 };
            const d = new Date(YEAR, 0, 1 + dayIndex);
            if (d.getFullYear() !== YEAR) return { date: null, isFuture: false, level: 0 };
            return { date: d, isFuture: d > TODAY, level: 0 };
        })
    );

    const [yearTotal, setYearTotal] = useState<number | null>(null);
    const [mode, setMode]           = useState<"loading" | "live" | "fallback">("loading");

    useEffect(() => {
        let active = true;

        const load = async () => {
            const endpoints = [
                `/api/github-contributions?y=${YEAR}`,
                `https://github-contributions-api.jogruber.de/v4/SWADHIN300?y=${YEAR}`,
            ];

            for (const endpoint of endpoints) {
                try {
                    const res = await fetch(endpoint);
                    if (!res.ok) continue;
                    const payload = await res.json();
                    const days = parseContributionDays(payload);
                    if (!days.length) continue;
                    if (!active) return;

                    // Build a date → level map
                    const levelMap = new Map<string, number>();
                    days.forEach(day => {
                        const dateStr = (day.date ?? day.day ?? "") as string;
                        if (dateStr) levelMap.set(dateStr.slice(0, 10), parseContributionLevel(day));
                    });

                    // Year total from API's total field, fallback to summing
                    const apiTotal = (payload as Record<string, unknown>).total as Record<string, number> | undefined;
                    const total = apiTotal?.[YEAR] ?? days.reduce((s, d) => s + parseContributionCount(d), 0);

                    setCells(prev => prev.map(cell => {
                        if (!cell.date) return cell;
                        const key = cell.date.toISOString().slice(0, 10);
                        return { ...cell, level: levelMap.get(key) ?? 0 };
                    }));
                    setYearTotal(total);
                    setMode("live");
                    return;
                } catch {
                    // try next
                }
            }

            if (!active) return;
            setMode("fallback");
        };

        load();
        return () => { active = false; };
    }, []);

    // Month labels: one per column where month changes
    const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const monthLabels: { label: string; col: number }[] = [];
    let lastMonth = -1;
    for (let col = 0; col < WEEKS; col++) {
        const cellIdx = col * 7;
        const cell = cells[cellIdx];
        if (cell?.date) {
            const m = cell.date.getMonth();
            if (m !== lastMonth) {
                monthLabels.push({ label: MONTH_NAMES[m], col });
                lastMonth = m;
            }
        }
    }

    // Reshape flat cells into week columns
    const weekCols: CellInfo[][] = [];
    for (let w = 0; w < WEEKS; w++) weekCols.push(cells.slice(w * 7, w * 7 + 7));

    return (
        <Widget style={{ padding: "10px 14px", ...style }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <p style={{ fontSize: "0.5rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(240,240,240,0.3)" }}>
                    {mode === "live" && yearTotal !== null
                        ? `${yearTotal.toLocaleString()} contributions in ${YEAR}`
                        : mode === "loading"
                            ? "Loading contributions..."
                            : `Contributions ${YEAR} · github.com/SWADHIN300`}
                </p>
                <a href="https://github.com/SWADHIN300" target="_blank" rel="noopener noreferrer"
                    style={{ color: "rgba(240,240,240,0.25)", display: "flex", alignItems: "center", pointerEvents: "auto" }}>
                    <Github size={11} />
                </a>
            </div>

            {/* Scrollable graph */}
            <div style={{ overflowX: "auto", overflowY: "hidden", paddingBottom: 2 }}>
                <div style={{ position: "relative", minWidth: WEEKS * (CELL + GAP) - GAP }}>

                    {/* Month labels */}
                    <div style={{ position: "relative", height: 14, marginBottom: 2 }}>
                        {monthLabels.map(({ label, col }) => (
                            <span key={`${label}-${col}`} style={{
                                position: "absolute",
                                left: col * (CELL + GAP),
                                fontSize: "0.46rem",
                                color: "rgba(240,240,240,0.28)",
                                letterSpacing: "0.05em",
                                fontFamily: "var(--font-space-mono), monospace",
                                textTransform: "uppercase",
                                whiteSpace: "nowrap",
                            }}>{label}</span>
                        ))}
                    </div>

                    {/* Grid */}
                    <div style={{ display: "flex", gap: GAP }}>
                        {weekCols.map((week, wi) => (
                            <div key={wi} style={{ display: "flex", flexDirection: "column", gap: GAP }}>
                                {week.map((cell, di) => {
                                    const isBlank  = !cell.date;
                                    const isFuture = cell.isFuture;
                                    const bg = isBlank
                                        ? "transparent"
                                        : isFuture
                                            ? FUTURE_COLOR
                                            : GH_COLORS[cell.level] ?? GH_COLORS[0];

                                    return (
                                        <motion.div
                                            key={di}
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: (wi * 7 + di) * 0.0005, duration: 0.15 }}
                                            style={{
                                                width: CELL,
                                                height: CELL,
                                                borderRadius: 3,
                                                background: bg,
                                                border: isBlank ? "none" : `1px solid ${cell.level > 0 ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)"}`,
                                                transition: "background 0.3s ease",
                                            }}
                                            title={
                                                cell.date
                                                    ? `${cell.date.toDateString()} · level ${cell.level}`
                                                    : ""
                                            }
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    {/* Legend */}
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8, justifyContent: "flex-end" }}>
                        <span style={{ fontSize: "0.42rem", color: "rgba(240,240,240,0.22)", fontFamily: "var(--font-space-mono), monospace" }}>Less</span>
                        {GH_COLORS.map((c, i) => (
                            <div key={i} style={{ width: 8, height: 8, borderRadius: 2, background: c, border: "1px solid rgba(255,255,255,0.05)" }} />
                        ))}
                        <span style={{ fontSize: "0.42rem", color: "rgba(240,240,240,0.22)", fontFamily: "var(--font-space-mono), monospace" }}>More</span>
                    </div>
                </div>
            </div>
        </Widget>
    );
}

function VisitorWidget({ style }: { style?: React.CSSProperties }) {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        // counterapi.dev — free, no signup, auto-creates on first hit
        fetch("https://api.counterapi.dev/v1/swadhin-portfolio-sr/views/up")
            .then(r => r.json())
            .then(d => setCount(d.count ?? d.value ?? null))
            .catch(() => setCount(null));
    }, []);

    return (
        <Widget style={{ padding: "12px 16px", ...style }}>
            <p style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(240,240,240,0.35)", marginBottom: 6 }}>Visitors</p>
            <motion.p
                key={count}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                style={{ fontSize: "1.6rem", fontWeight: 700, color: "rgba(240,240,240,0.9)", lineHeight: 1 }}
            >
                {count !== null ? count.toLocaleString() : "—"}
            </motion.p>
            <p style={{ fontSize: "0.5rem", color: "rgba(240,240,240,0.3)", marginTop: 4 }}>total visits</p>
        </Widget>
    );
}

function DesktopWidgets() {
    return (
        <>
            {/* LEFT COLUMN */}
            <div style={{ position: "fixed", top: 40, left: 12, width: 192, zIndex: 5, display: "flex", flexDirection: "column", gap: 8, pointerEvents: "none" }}>
                <QuoteWidget />
                <LinksWidget />
            </div>
            <div style={{ position: "fixed", bottom: 92, left: 12, width: 192, zIndex: 5, pointerEvents: "none" }}>
                <MusicWidget />
            </div>

            {/* RIGHT COLUMN */}
            <div style={{ position: "fixed", top: 40, right: 12, width: 210, zIndex: 5, display: "flex", flexDirection: "column", gap: 8, pointerEvents: "none" }}>
                <StatusWidget />
                <CalendarWidget />
            </div>

            {/* BOTTOM CENTER — visitor + github grid */}
            <div
                style={{
                    position: "fixed",
                    bottom: 102,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 4,
                    width: "min(94vw, 700px)",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                    alignItems: "stretch",
                    justifyContent: "center",
                    pointerEvents: "none",
                }}
            >
                <VisitorWidget style={{ flex: "0 0 170px" }} />
                <GithubGrid style={{ flex: "1 1 420px", minWidth: 260 }} />
            </div>
        </>
    );
}

/* ══════════════════════════════════════════╗
   WINDOW CONTENTS
╚══════════════════════════════════════════ */
function HeroContent({ onNavigate }: { onNavigate: (id: string) => void }) {
    return (
        <div style={{ padding: "28px 32px" }}>
            <p className="label" style={{ marginBottom: 14 }}>// swadhin raha — portfolio</p>
            <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.55, ease: [0.33, 1, 0.68, 1] }}
                className="heading-xl" style={{ marginBottom: 12 }}>Full Stack<br />Developer</motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
                style={{ color: "var(--fg-muted)", fontFamily: "var(--font-space-mono), monospace", fontSize: "0.75rem", lineHeight: 1.75, marginBottom: 22, maxWidth: 420 }}>
                Building modern web applications with <b style={{ color: "var(--fg)" }}>Next.js</b>, <b style={{ color: "var(--fg)" }}>React</b>, and <b style={{ color: "var(--fg)" }}>TypeScript</b>.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 22 }}>
                <button className="btn-solid" onClick={() => onNavigate("projects")}>View Projects</button>
                <button className="btn-ghost" onClick={() => onNavigate("contact")}>Contact Me</button>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ display: "flex", gap: 8 }}>
                <a href="https://github.com/SWADHIN300" target="_blank" rel="noopener noreferrer" className="social-icon"><Github size={15} /></a>
                <a href="https://x.com/swadhin_ra35911" target="_blank" rel="noopener noreferrer" className="social-icon"><Twitter size={15} /></a>
            </motion.div>
        </div>
    );
}

const TWITTER_AVATAR = "https://pbs.twimg.com/profile_images/2013510532079267840/cmT_YB7t_400x400.jpg";

function AboutContent() {
    const stats = [
        { label: "Age", value: "20" },
        { label: "Location", value: "Berhampur, Odisha" },
        { label: "Status", value: "Open to Work" },
        { label: "Email", value: "swadhinraha81@gmail.com" },
    ];

    return (
        <div style={{ padding: "24px 28px" }}>
            <SectionHead label="// 01" title="About" />

            {/* Profile header */}
            <motion.div
                className="mini-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{ marginBottom: 10, display: "flex", gap: 20, alignItems: "flex-start" }}
            >
                {/* Avatar */}
                <div style={{ position: "relative", flexShrink: 0 }}>
                    <img
                        src={TWITTER_AVATAR}
                        alt="Swadhin Raha"
                        style={{
                            width: 88,
                            height: 88,
                            borderRadius: 16,
                            objectFit: "cover",
                            border: "2px solid rgba(255,255,255,0.15)",
                            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                            display: "block",
                        }}
                        onError={(e) => {
                            e.currentTarget.src = "/avatar.png";
                            e.currentTarget.onerror = null;
                        }}
                    />
                    {/* Online indicator */}
                    <span style={{
                        position: "absolute",
                        bottom: 6,
                        right: 6,
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: "#28c840",
                        border: "2px solid rgba(18,18,18,0.95)",
                        boxShadow: "0 0 6px #28c840",
                    }} />
                </div>

                {/* Name & role */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                        fontFamily: "system-ui, sans-serif",
                        fontSize: "1.3rem",
                        fontWeight: 800,
                        color: "var(--fg)",
                        lineHeight: 1.1,
                        marginBottom: 5,
                        letterSpacing: "-0.02em",
                    }}>Swadhin Raha</p>
                    <p style={{
                        fontFamily: "var(--font-space-mono), monospace",
                        fontSize: "0.6rem",
                        color: "var(--fg-muted)",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        marginBottom: 10,
                    }}>Sr. Full Stack · Next.js · TypeScript</p>
                    <div style={{ display: "flex", gap: 6 }}>
                        <a href="https://github.com/SWADHIN300" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <Github size={12} />
                        </a>
                        <a href="https://x.com/swadhin_ra35911" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <Twitter size={12} />
                        </a>
                        <a href="mailto:swadhinraha81@gmail.com" className="social-icon">
                            <Mail size={12} />
                        </a>
                    </div>
                </div>
            </motion.div>

            {/* Bio */}
            <motion.div
                className="mini-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 }}
                style={{ marginBottom: 10 }}
            >
                <p className="label" style={{ marginBottom: 6 }}>// bio</p>
                <p style={{ color: "var(--fg-muted)", fontFamily: "var(--font-space-mono), monospace", fontSize: "0.73rem", lineHeight: 1.85 }}>
                    I&apos;m a Full Stack Developer passionate about building modern, scalable web applications.
                    With expertise in both frontend and backend technologies, I create seamless user experiences
                    backed by robust infrastructure — clean code, performance-first, and user-centric design.
                </p>
            </motion.div>

            {/* Stats grid */}
            <motion.div
                className="mini-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.14 }}
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
            >
                {stats.map(({ label, value }) => (
                    <div key={label}>
                        <p className="label" style={{ marginBottom: 3 }}>{label}</p>
                        <p style={{
                            fontFamily: "var(--font-space-mono), monospace",
                            fontSize: "0.72rem",
                            color: "var(--fg)",
                            fontWeight: 600,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}>{value}</p>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

function ExperienceContent() {
    const exp = [
        { period: "2023 — Present", role: "Full Stack Developer", company: "Freelance", desc: "Building modern web applications with Next.js, React and TypeScript." },
        { period: "2022 — 2023", role: "Frontend Developer", company: "Personal Projects", desc: "Developed and deployed multiple React-based projects focusing on performance." },
    ];
    return (
        <div style={{ padding: "24px 28px" }}>
            <SectionHead label="// experience" title="Experience" />
            {exp.map((e, i) => (
                <motion.div key={i} className="mini-card" style={{ marginBottom: 10 }}
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.09 }}>
                    <p className="label" style={{ marginBottom: 3 }}>{e.period}</p>
                    <p style={{ fontFamily: "var(--font-space-mono), monospace", fontWeight: 700, color: "var(--fg)", fontSize: "0.9rem", textTransform: "uppercase", marginBottom: 2 }}>{e.role}</p>
                    <p className="label" style={{ marginBottom: 8, opacity: 0.5 }}>{e.company}</p>
                    <p style={{ color: "var(--fg-muted)", fontFamily: "var(--font-space-mono), monospace", fontSize: "0.72rem", lineHeight: 1.7 }}>{e.desc}</p>
                </motion.div>
            ))}
        </div>
    );
}

function ProjectsContent() {
    return (
        <div style={{ padding: "24px 28px" }}>
            <SectionHead label="// 02" title="Projects" />
            {defaultProjects.map((p, i) => (
                <motion.div key={p.title} className="mini-card" style={{ marginBottom: 10 }}
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 7 }}>
                        <p style={{ fontFamily: "var(--font-space-mono), monospace", fontWeight: 700, color: "var(--fg)", fontSize: "0.82rem", textTransform: "uppercase" }}>
                            {String(i + 1).padStart(2, "0")}. {p.title}
                        </p>
                        <div style={{ display: "flex", gap: 5 }}>
                            {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="social-icon"><ExternalLink size={11} /></a>}
                            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="social-icon"><Github size={11} /></a>
                        </div>
                    </div>
                    <p style={{ color: "var(--fg-muted)", fontFamily: "var(--font-space-mono), monospace", fontSize: "0.7rem", lineHeight: 1.65, marginBottom: 9 }}>{p.description}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                        {p.tech.map(t => <span key={t} className="badge">{t}</span>)}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

function BlogsContent() {
    const posts = [
        { title: "Building Scalable Next.js Apps", date: "Mar 2026", tag: "Next.js" },
        { title: "TypeScript Best Practices in 2026", date: "Feb 2026", tag: "TypeScript" },
        { title: "Understanding React Server Components", date: "Jan 2026", tag: "React" },
    ];
    return (
        <div style={{ padding: "24px 28px" }}>
            <SectionHead label="// writing" title="Blogs" />
            {posts.map((p, i) => (
                <motion.div key={i} className="mini-card" style={{ marginBottom: 10 }}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <span className="badge">{p.tag}</span>
                        <span className="label">{p.date}</span>
                    </div>
                    <p style={{ fontFamily: "var(--font-space-mono), monospace", fontWeight: 700, color: "var(--fg)", fontSize: "0.82rem" }}>{p.title}</p>
                </motion.div>
            ))}
            <p className="label" style={{ marginTop: 12, textAlign: "center" }}>More posts coming soon...</p>
        </div>
    );
}

function SkillsContent() {
    return (
        <div style={{ padding: "24px 28px" }}>
            <SectionHead label="// 03" title="Skills" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {defaultSkills.map((s, i) => {
                    const Icon = s.icon;
                    return (
                        <motion.a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                            className="skill-pill" initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.02, type: "spring", stiffness: 300, damping: 20 }}>
                            <Icon size={11} />{s.name}
                        </motion.a>
                    );
                })}
            </div>
        </div>
    );
}

function TerminalContent() {
    const [lines, setLines] = useState([
        "swadhin@portfolio ~ % whoami",
        "  Swadhin Raha — Full Stack Developer",
        "",
        "swadhin@portfolio ~ % skills",
        "  Next.js · React · TypeScript · Node.js · TailwindCSS",
        "  PostgreSQL · MongoDB · Prisma · Docker · Git",
        "",
        "swadhin@portfolio ~ % contact",
        "  📧 swadhinraha81@gmail.com",
        "  🐙 github.com/SWADHIN300",
        "  🐦 x.com/swadhin_ra35911",
        "",
        "swadhin@portfolio ~ % _",
    ]);
    const [input, setInput] = useState("");
    const bottomRef = useRef<HTMLDivElement>(null);

    const handleCommand = (cmd: string) => {
        const c = cmd.trim().toLowerCase();
        let out: string[] = [];
        if (c === "help") out = ["  Available: whoami, skills, contact, clear, date, ls"];
        else if (c === "date") out = [`  ${new Date().toLocaleString()}`];
        else if (c === "clear") { setLines(["swadhin@portfolio ~ % _"]); return; }
        else if (c === "whoami") out = ["  Swadhin Raha — Full Stack Developer"];
        else if (c === "skills") out = ["  Next.js · React · TypeScript · Node.js · TailwindCSS", "  PostgreSQL · MongoDB · Prisma · Docker · Git"];
        else if (c === "contact") out = ["  📧 swadhinraha81@gmail.com", "  🐙 github.com/SWADHIN300", "  🐦 x.com/swadhin_ra35911"];
        else if (c === "ls") out = ["  about/  experience/  projects/  blogs/  skills/  contact/  notes/  uses/"];
        else out = [`  command not found: ${cmd}. type 'help'`];
        setLines(prev => {
            const without = prev.filter(l => !l.endsWith("% _"));
            return [...without, `swadhin@portfolio ~ % ${cmd}`, ...out, "", "swadhin@portfolio ~ % _"];
        });
    };

    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [lines]);

    return (
        <div style={{ padding: "16px 20px", background: "rgba(0,0,0,0.7)", fontFamily: "var(--font-space-mono), monospace", fontSize: "0.73rem", minHeight: 300 }}>
            {lines.map((l, i) => (
                <div key={i} style={{ color: l.startsWith("swadhin@") ? "#28c840" : "rgba(240,240,240,0.8)", lineHeight: 1.7, whiteSpace: "pre" }}>{l}</div>
            ))}
            <div ref={bottomRef} />
            <input autoFocus value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && input.trim()) { handleCommand(input); setInput(""); } }}
                style={{ background: "transparent", border: "none", outline: "none", color: "#28c840", fontFamily: "var(--font-space-mono), monospace", fontSize: "0.73rem", width: "100%", marginTop: 2 }}
                placeholder="type a command..." />
        </div>
    );
}

function UsesContent() {
    const cats = [
        { name: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL"] },
        { name: "Frameworks", items: ["Next.js", "React", "Node.js", "Express"] },
        { name: "Tools", items: ["VS Code", "Git", "Docker", "Figma", "Postman"] },
        { name: "Databases", items: ["PostgreSQL", "MongoDB", "Redis", "Prisma"] },
    ];
    return (
        <div style={{ padding: "24px 28px" }}>
            <SectionHead label="// setup" title="Uses" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {cats.map((c, i) => (
                    <motion.div key={c.name} className="mini-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                        <p className="label" style={{ marginBottom: 7 }}>{c.name}</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                            {c.items.map(it => <span key={it} className="badge">{it}</span>)}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function NotesContent() {
    const notes = [
        { title: "On Simplicity", body: "The best code is the code you don't write. Keep it simple." },
        { title: "On Learning", body: "Consistency beats intensity. 30 minutes daily > 4 hours once a week." },
        { title: "On Design", body: "Good design is obvious. Great design is transparent." },
    ];
    return (
        <div style={{ padding: "24px 28px" }}>
            <SectionHead label="// thoughts" title="Notes" />
            {notes.map((n, i) => (
                <motion.div key={i} className="mini-card" style={{ marginBottom: 10 }}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                    <p style={{ fontFamily: "var(--font-space-mono), monospace", fontWeight: 700, color: "var(--fg)", fontSize: "0.82rem", marginBottom: 6 }}>{n.title}</p>
                    <p style={{ color: "var(--fg-muted)", fontFamily: "var(--font-space-mono), monospace", fontSize: "0.72rem", lineHeight: 1.75, fontStyle: "italic" }}>&ldquo;{n.body}&rdquo;</p>
                </motion.div>
            ))}
        </div>
    );
}

function ContactContent() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [errMsg, setErrMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        try {
            const res = await fetch("https://formsubmit.co/ajax/swadhinraha81@gmail.com", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
            });
            const data = await res.json();
            if (data.success === "true" || data.success === true) {
                setStatus("success"); setForm({ name: "", email: "", message: "" });
                setTimeout(() => setStatus("idle"), 5000);
            } else throw new Error("failed");
        } catch {
            setErrMsg("Failed — email me directly: swadhinraha81@gmail.com");
            setStatus("error");
        }
    };

    return (
        <div style={{ padding: "24px 28px", minWidth: 300 }}>
            <SectionHead label="// 04" title="Say Hey" />
            <a href="mailto:swadhinraha81@gmail.com" style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.7rem", color: "var(--fg-muted)", display: "block", marginBottom: 14, textDecoration: "underline" }}>swadhinraha81@gmail.com</a>
            <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                <a href="https://github.com/SWADHIN300" target="_blank" rel="noopener noreferrer" className="social-icon"><Github size={13} /></a>
                <a href="https://x.com/swadhin_ra35911" target="_blank" rel="noopener noreferrer" className="social-icon"><Twitter size={13} /></a>
            </div>
            <AnimatePresence>
                {status === "success" && (
                    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mini-card" style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
                        <CheckCircle size={13} color="#28c840" />
                        <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.68rem", color: "var(--fg)" }}>Sent! I&apos;ll get back to you soon.</span>
                    </motion.div>
                )}
                {status === "error" && (
                    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mini-card" style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 10, borderColor: "rgba(255,95,87,0.4)" }}>
                        <AlertCircle size={13} color="#ff5f57" style={{ flexShrink: 0, marginTop: 1 }} />
                        <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.66rem", color: "var(--fg)" }}>{errMsg}</span>
                    </motion.div>
                )}
            </AnimatePresence>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {[{ label: "Name", name: "name", type: "text", ph: "Your name" }, { label: "Email", name: "email", type: "email", ph: "your@email.com" }].map(({ label, name, type, ph }) => (
                    <div key={name}>
                        <p className="label" style={{ marginBottom: 4 }}>{label}</p>
                        <input type={type} name={name} required placeholder={ph} disabled={status === "sending"}
                            value={form[name as keyof typeof form]} onChange={e => setForm({ ...form, [name]: e.target.value })} className="field" />
                    </div>
                ))}
                <div>
                    <p className="label" style={{ marginBottom: 4 }}>Message</p>
                    <textarea name="message" required rows={3} placeholder="Your message..." disabled={status === "sending"}
                        value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                        className="field" style={{ resize: "none" }} />
                </div>
                <button type="submit" disabled={status === "sending" || status === "success"} className="btn-solid" style={{ justifyContent: "center" }}>
                    {status === "sending" ? <><Loader size={11} className="animate-spin" /> Sending...</> :
                     status === "success" ? <><CheckCircle size={11} /> Sent!</> :
                     <><Send size={11} /> Send Message</>}
                </button>
            </form>
        </div>
    );
}

/* ══════════════════════════════════════════╗
   DOCK WITH macOS MAGNIFICATION
╚══════════════════════════════════════════ */
const RESUME_URL = "/resume.pdf";
const X_PROFILE_HANDLE = "swadhin_ra35911";
const X_PROFILE_AVATAR = `https://unavatar.io/x/${X_PROFILE_HANDLE}`;

const DOCK_ITEMS = [
    { id: "hero",       label: "Home",       Icon: Home,         isLink: false, href: "" },
    { id: "about",      label: "About",      Icon: User,         isLink: false, href: "" },
    { id: "experience", label: "Experience", Icon: Briefcase,    isLink: false, href: "" },
    { id: "projects",   label: "Projects",   Icon: FolderOpen,   isLink: false, href: "" },
    { id: "blogs",      label: "Blogs",      Icon: BookOpen,     isLink: false, href: "" },
    { id: "contact",    label: "Contact",    Icon: Mail,         isLink: false, href: "" },
    { id: "resume",     label: "Resume",     Icon: FileDown,     isLink: true,  href: RESUME_URL },
    { id: "terminal",   label: "Terminal",   Icon: TerminalIcon, isLink: false, href: "" },
    { id: "uses",       label: "Uses",       Icon: Wrench,       isLink: false, href: "" },
    { id: "notes",      label: "Notes",      Icon: FileText,     isLink: false, href: "" },
];

const SOCIAL_DOCK = [
    { id: "github",   label: "GitHub", Icon: Github,  href: "https://github.com/SWADHIN300" },
    { id: "xtwitter", label: "X",      Icon: XIcon,   href: "https://x.com/swadhin_ra35911" },
];

/* About hover preview card (shown above the About dock button) */
function AboutHoverCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{
                position: "absolute",
                bottom: "calc(100% + 18px)",
                left: "50%",
                transform: "translateX(-50%)",
                width: "min(760px, 80vw)",
                minHeight: 470,
                background: "linear-gradient(180deg, rgba(16,16,16,0.98), rgba(10,10,10,0.98))",
                backgroundImage: "radial-gradient(circle at top, rgba(255,255,255,0.05), transparent 42%)",
                border: "1px solid rgba(255,255,255,0.11)",
                borderRadius: 18,
                padding: "46px 56px 34px",
                zIndex: 9999,
                pointerEvents: "none",
                boxShadow: "0 26px 70px rgba(0,0,0,0.78), inset 0 1px 0 rgba(255,255,255,0.04)",
                fontFamily: "var(--font-space-mono), monospace",
                overflow: "hidden",
            }}
        >
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.02), transparent 42%)", pointerEvents: "none" }} />

            <h2
                style={{
                    position: "relative",
                    fontSize: "clamp(3.6rem, 7vw, 5.4rem)",
                    fontWeight: 800,
                    color: "#f3f3f3",
                    lineHeight: 0.92,
                    letterSpacing: "-0.06em",
                    marginBottom: 26,
                    fontFamily: "system-ui, sans-serif",
                }}
            >
                Swadhin<br />Raha
            </h2>

            <p
                style={{
                    position: "relative",
                    fontSize: "0.92rem",
                    letterSpacing: "0.22em",
                    color: "rgba(240,240,240,0.36)",
                    textTransform: "uppercase",
                    marginBottom: 40,
                    fontWeight: 700,
                }}
            >
                Sr. Full Stack / Next.js / TypeScript Engineer
            </p>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginBottom: 34 }} />

            <p
                style={{
                    position: "relative",
                    maxWidth: 610,
                    fontSize: "1.02rem",
                    color: "rgba(240,240,240,0.62)",
                    lineHeight: 1.95,
                    marginBottom: 110,
                    fontFamily: "system-ui, sans-serif",
                    fontWeight: 500,
                }}
            >
                Building modern web applications at the intersection of design, speed, and product thinking.
                Crafting interfaces, APIs, and polished developer experiences with a strong focus on clean systems and memorable interactions.
            </p>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginBottom: 26 }} />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 0 }}>
                    <img
                        src={X_PROFILE_AVATAR}
                        alt="Swadhin"
                        style={{
                            width: 54,
                            height: 54,
                            borderRadius: 14,
                            objectFit: "cover",
                            border: "1px solid rgba(255,255,255,0.16)",
                            boxShadow: "0 10px 20px rgba(0,0,0,0.26)",
                            flexShrink: 0,
                        }}
                        onError={(e) => {
                            const image = e.currentTarget;
                            if (image.dataset.fallback !== "1") {
                                image.dataset.fallback = "1";
                                image.src = "/avatar.png";
                                return;
                            }
                            image.style.display = "none";
                        }}
                    />
                    <div style={{ minWidth: 0 }}>
                        <p
                            style={{
                                fontSize: "1.02rem",
                                fontWeight: 700,
                                color: "rgba(240,240,240,0.7)",
                                textTransform: "uppercase",
                                letterSpacing: "0.12em",
                                marginBottom: 4,
                            }}
                        >
                            SWADHIN300
                        </p>
                        <p style={{ fontSize: "0.88rem", color: "rgba(240,240,240,0.28)", letterSpacing: "0.03em" }}>
                            Berhampur · Odisha · 20
                        </p>
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                    <a
                        href="https://x.com/swadhin_ra35911"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "rgba(240,240,240,0.5)", pointerEvents: "auto" }}
                    >
                        <Twitter size={20} />
                    </a>
                    <a
                        href="https://github.com/SWADHIN300"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "rgba(240,240,240,0.5)", pointerEvents: "auto" }}
                    >
                        <Github size={20} />
                    </a>
                    <a
                        href="#notes"
                        style={{ color: "rgba(240,240,240,0.5)", pointerEvents: "auto" }}
                    >
                        <BookOpen size={20} />
                    </a>
                </div>
            </div>
        </motion.div>
    );
}

function DockItem({ mouseX, id, label, Icon, isOpen, isLink, href, onToggle }: {
    mouseX: ReturnType<typeof useMotionValue<number>>;
    id: string; label: string; Icon: React.ElementType;
    isOpen?: boolean; isLink?: boolean; href?: string;
    onToggle?: (id: string) => void;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);
    const distance = useTransform(mouseX, v => {
        const rect = ref.current?.getBoundingClientRect();
        return rect ? v - rect.x - rect.width / 2 : Infinity;
    });
    const scaleVal = useTransform(distance, [-80, 0, 80], [1, 1.6, 1]);
    const scale = useSpring(scaleVal, { mass: 0.08, stiffness: 200, damping: 14 });
    const yVal = useTransform(distance, [-80, 0, 80], [0, -10, 0]);
    const y = useSpring(yVal, { mass: 0.08, stiffness: 200, damping: 14 });

    const inner = (
        <motion.div
            ref={ref}
            style={{ scale, y, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
        >
            {/* About hover card */}
            <AnimatePresence>
                {id === "about" && hovered && <AboutHoverCard />}
            </AnimatePresence>

            {/* Label tooltip shown for all items */}
            <AnimatePresence>
                {hovered && id !== "about" && (
                    <motion.div
                        initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 2 }}
                        style={{
                            position: "absolute", bottom: "calc(100% + 10px)",
                            background: "rgba(20,20,20,0.92)", border: "1px solid rgba(255,255,255,0.12)",
                            borderRadius: 6, padding: "4px 10px", fontSize: "0.6rem", color: "rgba(240,240,240,0.8)",
                            fontFamily: "var(--font-space-mono), monospace", whiteSpace: "nowrap", letterSpacing: "0.08em",
                            textTransform: "uppercase", zIndex: 9999, pointerEvents: "none",
                        }}
                    >
                        {label}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: isOpen
                        ? "linear-gradient(145deg, rgba(255,255,255,0.24), rgba(255,255,255,0.08))"
                        : "linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0.03))",
                    border: `1px solid ${isOpen ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.17)"}`,
                    color: "rgba(240,240,240,0.88)",
                }}
                animate={{
                    boxShadow: isOpen
                        ? [
                            "0 10px 22px rgba(0,0,0,0.36), 0 0 0 rgba(57,211,83,0.2)",
                            "0 13px 30px rgba(0,0,0,0.42), 0 0 18px rgba(57,211,83,0.32)",
                            "0 10px 22px rgba(0,0,0,0.36), 0 0 0 rgba(57,211,83,0.2)",
                        ]
                        : [
                            "0 8px 18px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.12)",
                            "0 12px 24px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.2)",
                            "0 8px 18px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.12)",
                        ],
                }}
                transition={{ duration: isOpen ? 2.1 : 3, repeat: Infinity, ease: "easeInOut" }}
                whileTap={{ scale: 0.9 }}
            >
                <Icon size={22} />
            </motion.div>
            <motion.div
                style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(240,240,240,0.85)" }}
                animate={isOpen ? { opacity: [0.35, 1, 0.35], scale: [1, 1.35, 1] } : { opacity: 0, scale: 1 }}
                transition={isOpen ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
            />
        </motion.div>
    );

    if (isLink) return <a href={href} target="_blank" rel="noopener noreferrer" title={label}>{inner}</a>;
    return <div onClick={() => onToggle?.(id)} title={label}>{inner}</div>;
}

function SocialDockItem({ mouseX, label, Icon, href }: {
    mouseX: ReturnType<typeof useMotionValue<number>>;
    label: string; Icon: React.ElementType; href: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const distance = useTransform(mouseX, v => {
        const rect = ref.current?.getBoundingClientRect();
        return rect ? v - rect.x - rect.width / 2 : Infinity;
    });
    const scaleVal = useTransform(distance, [-80, 0, 80], [1, 1.6, 1]);
    const scale = useSpring(scaleVal, { mass: 0.08, stiffness: 200, damping: 14 });
    const yVal = useTransform(distance, [-80, 0, 80], [0, -10, 0]);
    const y = useSpring(yVal, { mass: 0.08, stiffness: 200, damping: 14 });

    return (
        <a href={href} target="_blank" rel="noopener noreferrer" title={label}>
            <motion.div ref={ref} style={{ scale, y, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}>
                <motion.div
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 14,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03))",
                        border: "1px solid rgba(255,255,255,0.18)",
                        color: "rgba(240,240,240,0.9)",
                    }}
                    whileHover={{ boxShadow: "0 14px 28px rgba(0,0,0,0.4), 0 0 14px rgba(255,255,255,0.2)" }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Icon size={22} />
                </motion.div>
                <div style={{ width: 4, height: 4, borderRadius: "50%", opacity: 0 }} />
            </motion.div>
        </a>
    );
}

function Dock({ open, onToggle }: { open: Set<string>; onToggle: (id: string) => void }) {
    const mouseX = useMotionValue(Infinity);
    return (
        <div className="dock" onMouseMove={e => mouseX.set(e.clientX)} onMouseLeave={() => mouseX.set(Infinity)}>
            {DOCK_ITEMS.map(({ id, label, Icon, isLink, href }) => (
                <DockItem key={id} mouseX={mouseX} id={id} label={label} Icon={Icon}
                    isOpen={open.has(id)} isLink={isLink} href={href} onToggle={onToggle} />
            ))}
            <div className="dock-sep" />
            {SOCIAL_DOCK.map(({ id, label, Icon, href }) => (
                <SocialDockItem key={id} mouseX={mouseX} label={label} Icon={Icon} href={href} />
            ))}
        </div>
    );
}

/* ══════════════════════════════════════════╗
   WINDOW LAYOUT
╚══════════════════════════════════════════ */
const WINDOW_TITLES: Record<string, string> = {
    hero: "Swadhin — Portfolio", about: "About", experience: "Experience",
    projects: "Projects", blogs: "Blogs", contact: "Contact",
    terminal: "Terminal — zsh", uses: "Uses", notes: "Notes",
};

const OFFSETS: Record<string, { top: string; left: string }> = {
    hero:       { top: "8%",  left: "22%" },
    about:      { top: "10%", left: "26%" },
    experience: { top: "7%",  left: "30%" },
    projects:   { top: "9%",  left: "24%" },
    blogs:      { top: "8%",  left: "28%" },
    contact:    { top: "10%", left: "32%" },
    terminal:   { top: "6%",  left: "20%" },
    uses:       { top: "11%", left: "27%" },
    notes:      { top: "8%",  left: "34%" },
};

/* ══════════════════════════════════════════╗
   MAIN DESKTOP PAGE
╚══════════════════════════════════════════ */
export default function DesktopPage() {
    const [isDark, setIsDark]     = useState(true);
    const [uiReady, setUiReady]   = useState(false);
    const [open, setOpen]         = useState<Set<string>>(new Set(["hero"]));
    const [zMap, setZMap]         = useState<Record<string, number>>({ hero: 10 });
    const [zCounter, setZCounter] = useState(11);

    useEffect(() => {
        setUiReady(true);
        const saved = localStorage.getItem("theme");
        const dark = saved !== "light";
        setIsDark(dark);
        document.documentElement.classList.toggle("light", !dark);
    }, []);

    const toggleTheme = () => {
        const next = !isDark;
        setIsDark(next);
        document.documentElement.classList.toggle("light", !next);
        localStorage.setItem("theme", next ? "dark" : "light");
    };

    const focusWindow = (id: string) => {
        const z = zCounter;
        setZMap(prev => ({ ...prev, [id]: z }));
        setZCounter(c => c + 1);
    };

    const toggleWindow = (id: string) => {
        setOpen(prev => {
            const next = new Set(prev);
            if (next.has(id)) { next.delete(id); }
            else { next.add(id); focusWindow(id); }
            return next;
        });
    };

    const closeWindow = (id: string) => {
        setOpen(prev => { const n = new Set(prev); n.delete(id); return n; });
    };

    if (!uiReady) {
        return (
            <div style={{ minHeight: "100dvh", paddingTop: 28, paddingBottom: 100, background: "#000000" }} />
        );
    }

    return (
        <div style={{ minHeight: "100dvh", paddingTop: 28, paddingBottom: 100, background: "#000000" }}>
            <StatusBar isDark={isDark} onToggle={toggleTheme} />

            {/* Background Widgets — always visible */}
            <DesktopWidgets />

            {/* Floating Windows Layer */}
            <div style={{ position: "fixed", inset: 0, top: 28, bottom: 80, pointerEvents: "none", zIndex: 30 }}>
                <AnimatePresence>
                    {Array.from(open).map(id => {
                        const off = OFFSETS[id] ?? { top: "10%", left: "22%" };
                        const isWide = ["projects", "uses", "skills"].includes(id);
                        return (
                            <div key={id}
                                style={{ position: "absolute", top: off.top, left: off.left, zIndex: zMap[id] ?? 10, pointerEvents: "auto" }}
                                onClick={() => focusWindow(id)}
                            >
                                <Window id={id} title={WINDOW_TITLES[id] ?? id} onClose={() => closeWindow(id)}
                                    width={isWide ? "min(820px, 86vw)" : "min(580px, 80vw)"}>
                                    {id === "hero"       && <HeroContent onNavigate={wid => { setOpen(prev => { const n = new Set(prev); n.add(wid); return n; }); focusWindow(wid); }} />}
                                    {id === "about"      && <AboutContent />}
                                    {id === "experience" && <ExperienceContent />}
                                    {id === "projects"   && <ProjectsContent />}
                                    {id === "blogs"      && <BlogsContent />}
                                    {id === "contact"    && <ContactContent />}
                                    {id === "terminal"   && <TerminalContent />}
                                    {id === "uses"       && <UsesContent />}
                                    {id === "notes"      && <NotesContent />}
                                </Window>
                            </div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* macOS Dock */}
            <Dock open={open} onToggle={toggleWindow} />
        </div>
    );
}
