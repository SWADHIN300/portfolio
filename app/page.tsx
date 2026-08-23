"use client";

import {
    useState, useEffect, useRef, useCallback, useMemo
} from "react";
import {
    motion, AnimatePresence,
} from "framer-motion";
import {
    Sun, Moon, Home, User, FolderOpen, Cpu, Mail, Github, Twitter,
    ExternalLink, Send, CheckCircle, AlertCircle, Loader, Briefcase,
    BookOpen, Terminal as TerminalIcon, Wrench, FileText, FileDown,
    X as XIcon, Music, Link as LinkIcon, Maximize2, Minimize2, HelpCircle,
    Pause, Play,
} from "lucide-react";
import { defaultProjects, defaultSkills, iconMap, type Project } from "@/lib/data";
import { Braces } from "lucide-react";
import Image from "next/image";
import MacDock, { type MacDockItem } from "@/components/MacDock";

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
        <header className="status-bar">
            <div className="status-brand">
                <span style={{ color: "var(--fg)", fontWeight: 700, letterSpacing: "0.2em" }}>SR</span>
                <span>Portfolio</span>
            </div>
            <div className="status-center">
                <span className="status-dot" />
                <span>Open to Work</span>
            </div>
            <div className="status-meta">
                <button onClick={onToggle} aria-label="Toggle color theme" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--fg-muted)", padding: 0, display: "flex", alignItems: "center", gap: 4, fontSize: "0.62rem", fontFamily: "var(--font-space-mono), monospace", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {isDark ? <><Sun size={10} /> Light</> : <><Moon size={10} /> Dark</>}
                </button>
                <span className="status-date">{date}</span>
                <span style={{ color: "var(--fg)" }}>{time}</span>
            </div>
        </header>
    );
}

/* ══════════════════════════════════════════╗
   MAC-STYLE FOOTER BAR
╚══════════════════════════════════════════ */
function WindowFooter({ children, left, center, right }: {
    children?: React.ReactNode;
    left?: React.ReactNode;
    center?: React.ReactNode;
    right?: React.ReactNode;
}) {
    return (
        <div
            className="window-footer"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 20px',
                borderTop: '1px solid var(--widget-border)',
                background: 'color-mix(in oklab, var(--card) 85%, var(--background) 15%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottomLeftRadius: '12px',
                borderBottomRightRadius: '12px',
                flexShrink: 0,
                minHeight: 56,
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {left}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {center}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {right}
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════╗
   MAC-STYLE BUTTON
╚══════════════════════════════════════════ */
function MacButton({ 
    children, 
    onClick, 
    variant = 'default', 
    size = 'sm',
    disabled,
    ...props 
}: {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'default' | 'primary' | 'danger' | 'ghost';
    size?: 'sm' | 'md';
    disabled?: boolean;
    [key: string]: any;
}) {
    const baseStyle: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        fontFamily: 'var(--font-space-mono), monospace',
        fontSize: size === 'sm' ? '0.62rem' : '0.7rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        fontWeight: 600,
        borderRadius: 6,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.15s ease',
        opacity: disabled ? 0.5 : 1,
        border: 'none',
        outline: 'none',
        ...props,
    };

    const variants = {
        default: {
            background: 'color-mix(in oklab, var(--fg) 12%, transparent)',
            color: 'var(--fg)',
            border: '1px solid color-mix(in oklab, var(--fg) 20%, transparent)',
            boxShadow: 'inset 0 1px 0 color-mix(in oklab, var(--fg) 15%, transparent)',
        },
        primary: {
            background: 'var(--accent)',
            color: 'var(--accent-foreground)',
            boxShadow: 'inset 0 1px 0 color-mix(in oklab, var(--accent-foreground) 20%, transparent), 0 2px 8px color-mix(in oklab, var(--accent) 30%, transparent)',
        },
        danger: {
            background: 'var(--destructive)',
            color: 'var(--destructive-foreground)',
            boxShadow: 'inset 0 1px 0 color-mix(in oklab, var(--destructive-foreground) 20%, transparent), 0 2px 8px color-mix(in oklab, var(--destructive) 30%, transparent)',
        },
        ghost: {
            background: 'transparent',
            color: 'var(--fg-muted)',
            border: '1px solid transparent',
        },
    };

    const sizes = {
        sm: { padding: '8px 14px', minWidth: 76, height: 32 },
        md: { padding: '10px 18px', minWidth: 96, height: 36 },
    };

    const hoverStyles = {
        default: { background: 'color-mix(in oklab, var(--fg) 20%, transparent)', transform: 'translateY(-1px)', boxShadow: 'inset 0 1px 0 color-mix(in oklab, var(--fg) 15%, transparent), 0 4px 12px rgba(0,0,0,0.15)' },
        primary: { background: 'color-mix(in oklab, var(--accent) 90%, var(--fg) 10%)', transform: 'translateY(-1px)', boxShadow: 'inset 0 1px 0 color-mix(in oklab, var(--accent-foreground) 20%, transparent), 0 4px 16px color-mix(in oklab, var(--accent) 40%, transparent)' },
        danger: { background: 'color-mix(in oklab, var(--destructive) 90%, var(--fg) 10%)', transform: 'translateY(-1px)', boxShadow: 'inset 0 1px 0 color-mix(in oklab, var(--destructive-foreground) 20%, transparent), 0 4px 16px color-mix(in oklab, var(--destructive) 40%, transparent)' },
        ghost: { background: 'color-mix(in oklab, var(--fg) 8%, transparent)', color: 'var(--fg)' },
    };

    return (
        <button
            {...props}
            onClick={onClick}
            disabled={disabled}
            style={{
                ...baseStyle,
                ...variants[variant],
                ...sizes[size],
            }}
            onMouseEnter={(e) => !disabled && Object.assign(e.currentTarget.style, hoverStyles[variant])}
            onMouseLeave={(e) => !disabled && Object.assign(e.currentTarget.style, { ...variants[variant], ...sizes[size] })}
            onMouseDown={(e) => !disabled && Object.assign(e.currentTarget.style, { transform: 'translateY(0)' })}
            onMouseUp={(e) => !disabled && Object.assign(e.currentTarget.style, hoverStyles[variant])}
        >
            {children}
        </button>
    );
}
function Window({ id, title, children, onClose, onFocus, width = "min(640px, 92vw)", maxH = "76vh", isMaximized = false, onMaximize, onMinimize, maximizable = true, footer }: {
    id: string; title: string; children: React.ReactNode;
    onClose: () => void; width?: string; maxH?: string;
    isMaximized?: boolean; onFocus?: () => void; onMaximize?: () => void; onMinimize?: () => void;
    maximizable?: boolean;
    footer?: React.ReactNode;
}) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ pointerX: 0, pointerY: 0, x: 0, y: 0 });
    const dragBounds = useRef({ minX: 0, maxX: 0, minY: 0, maxY: 0 });
    const windowRef = useRef<HTMLDivElement>(null);
    const [showTooltips, setShowTooltips] = useState(false);

    const handleDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
        if (isMaximized || (e.target as HTMLElement).closest(".window-btn")) return;

        const rect = windowRef.current?.getBoundingClientRect();
        if (!rect) return;

        dragStart.current = {
            pointerX: e.clientX,
            pointerY: e.clientY,
            x: position.x,
            y: position.y,
        };

        // Keep the full card visible where possible, above the floating dock.
        const minX = position.x + 8 - rect.left;
        const maxX = position.x + window.innerWidth - 8 - rect.right;
        const minY = position.y + 38 - rect.top;
        const availableMaxY = position.y + window.innerHeight - 92 - rect.bottom;
        dragBounds.current = {
            minX,
            maxX: Math.max(minX, maxX),
            minY,
            maxY: Math.max(minY, availableMaxY),
        };

        e.currentTarget.setPointerCapture(e.pointerId);
        setIsDragging(true);
        setShowTooltips(false);
        onFocus?.();
    };

    useEffect(() => {
        if (!isDragging) return;

        const handlePointerMove = (e: PointerEvent) => {
            const nextX = dragStart.current.x + e.clientX - dragStart.current.pointerX;
            const nextY = dragStart.current.y + e.clientY - dragStart.current.pointerY;
            const { minX, maxX, minY, maxY } = dragBounds.current;
            setPosition({
                x: Math.max(minX, Math.min(nextX, maxX)),
                y: Math.max(minY, Math.min(nextY, maxY)),
            });
        };

        const handlePointerEnd = () => setIsDragging(false);
        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerEnd);
        window.addEventListener("pointercancel", handlePointerEnd);
        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerEnd);
            window.removeEventListener("pointercancel", handlePointerEnd);
        };
    }, [isDragging]);

    const handleDoubleClick = () => {
        if (!isMaximized) onMaximize?.();
        else onMinimize?.();
    };

    const windowStyle: React.CSSProperties = {
        width: isMaximized ? '100vw' : width,
        height: isMaximized ? 'calc(100vh - 120px)' : undefined,
        maxHeight: isMaximized ? 'calc(100vh - 120px)' : maxH,
        top: isMaximized ? 32 : undefined,
        left: isMaximized ? 0 : undefined,
        transform: isMaximized ? 'none' : undefined,
        borderRadius: isMaximized ? 0 : undefined,
        display: 'flex',
        flexDirection: 'column',
        position: isMaximized ? 'fixed' : 'relative',
        zIndex: isMaximized ? 1000 : undefined,
    };

    return (
        <motion.div
            ref={windowRef}
            key={id}
            initial={{ scale: 0.7, opacity: 0, y: 64 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.82, opacity: 0, y: 44 }}
            transition={{
                type: "spring",
                stiffness: 320,
                damping: 26,
                opacity: { duration: 0.22 },
            }}
            className={`glass-window ${isDragging ? "is-dragging" : ""}`}
            style={{
                ...windowStyle,
                transformOrigin: "bottom center",
                translate: isMaximized ? "none" : `${position.x}px ${position.y}px`,
            }}
            onMouseEnter={() => setShowTooltips(true)}
            onMouseLeave={() => setShowTooltips(false)}
        >
            <div
                className="glass-window-titlebar"
                onPointerDown={handleDragStart}
                onDoubleClick={handleDoubleClick}
                style={{ cursor: isMaximized ? 'default' : (isDragging ? 'grabbing' : 'grab'), touchAction: 'none', userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px' }}
            >
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <button
                        className="traffic-dot traffic-close window-btn"
                        onClick={onClose}
                        aria-label="Close"
                        style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', border: 'none', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
                    >
                        {showTooltips && <span className="btn-tooltip">Close</span>}
                    </button>
                    <button
                        className="traffic-dot traffic-min window-btn"
                        onClick={onMinimize}
                        aria-label="Minimize"
                        style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e', border: 'none', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
                    >
                        {showTooltips && <span className="btn-tooltip">Minimize</span>}
                    </button>
                    {maximizable && (
                        <button
                            className={`traffic-dot traffic-max window-btn ${isMaximized ? 'maximized' : ''}`}
                            onClick={isMaximized ? onMinimize : onMaximize}
                            aria-label={isMaximized ? "Restore" : "Maximize"}
                            style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--status-green)', border: 'none', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
                        >
                            {isMaximized ? <Minimize2 size={8} /> : <Maximize2 size={8} />}
                            {showTooltips && <span className="btn-tooltip">{isMaximized ? 'Restore' : 'Maximize'}</span>}
                        </button>
                    )}
                </div>
                <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--fg-muted)" }}>{title}</span>
                <div style={{ width: 46 }} />
            </div>
            <div className="glass-window-content" style={{ overflowY: "auto", flex: 1, minHeight: 0 }}>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.14, duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                >
                    {children}
                </motion.div>
            </div>
            {footer && <div style={{ flexShrink: 0 }}>{footer}</div>}
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
                background: "var(--widget-bg)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid var(--widget-border)",
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

/* ══════════════════════════════════════════╗
   DRAGGABLE WIDGET WRAPPER
╚══════════════════════════════════════════ */
function DraggableWidget({
    children,
    initialPosition,
    storageKey,
    style,
}: {
    children: React.ReactNode;
    initialPosition: { x: number; y: number };
    storageKey: string;
    style?: React.CSSProperties;
}) {
    const [position, setPosition] = useState<{ x: number; y: number }>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                try { return JSON.parse(saved); } catch {}
            }
        }
        return initialPosition;
    });
    const [isDragging, setIsDragging] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const widgetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(position));
    }, [position, storageKey]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('a, button, input')) return;
        setIsDragging(true);
        const rect = widgetRef.current?.getBoundingClientRect();
        if (rect) {
            dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        }
    };

    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!widgetRef.current) return;
            const newX = e.clientX - dragOffset.current.x;
            const newY = e.clientY - dragOffset.current.y;
            const maxX = window.innerWidth - (widgetRef.current.offsetWidth || 0);
            const maxY = window.innerHeight - (widgetRef.current.offsetHeight || 0) - 100;
            setPosition({
                x: Math.max(0, Math.min(newX, maxX)),
                y: Math.max(0, Math.min(newY, maxY)),
            });
        };

        const handleMouseUp = () => setIsDragging(false);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div
            ref={widgetRef}
            className={`draggable-widget ${isDragging ? 'dragging' : ''}`}
            style={{
                position: 'fixed',
                left: position.x,
                top: position.y,
                zIndex: isDragging ? 9999 : 5,
                transition: isDragging ? 'none' : 'box-shadow 0.2s ease',
                ...style,
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
        >
            {children}
        </div>
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
                    style={{ fontSize: "0.7rem", color: "var(--widget-strong)", lineHeight: 1.6, fontStyle: "italic", marginBottom: 10 }}>
                    &ldquo;{q.text}&rdquo;
                </motion.p>
            </AnimatePresence>
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
                {QUOTES.map((_, i) => (
                    <span key={i} style={{ width: i === idx ? 16 : 5, height: 3, borderRadius: 2, background: i === idx ? "var(--widget-muted)" : "var(--widget-surface-strong)", transition: "all 0.3s" }} />
                ))}
            </div>
            <p style={{ fontSize: "0.55rem", color: "var(--widget-subtle)", letterSpacing: "0.2em", textTransform: "uppercase" }}>- SR · WRITING</p>
        </Widget>
    );
}

function LinksWidget() {
    const links = [
        { title: "The Zen of Erlang", sub: "Fred Hebert · systems", href: "https://ferd.ca/the-zen-of-erlang.html" },
        { title: "You Don't Know JS", sub: "Kyle Simpson · js", href: "https://github.com/getify/You-Dont-Know-JS" },
        { title: "The Pragmatic Programmer", sub: "Hunt & Thomas · craft", href: "https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/" },
        { title: "Clean Architecture", sub: "Robert C. Martin · design", href: "https://www.oreilly.com/library/view/clean-architecture-a/9780134494272/" },
        { title: "Designing Data-Intensive Apps", sub: "Kleppmann · systems", href: "https://dataintensive.net/" },
    ];
    return (
        <Widget>
            <p style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--widget-subtle)", marginBottom: 12 }}>Links · Worth Reading</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {links.map(l => (
                    <a key={l.title} href={l.href} target="_blank" rel="noopener noreferrer" style={{ display: "block", borderBottom: "1px solid var(--widget-surface)", paddingBottom: 9 }}>
                        <p style={{ fontSize: "0.68rem", color: "var(--widget-bright)", marginBottom: 2 }}>{l.title}</p>
                        <p style={{ fontSize: "0.55rem", color: "var(--widget-subtle)", letterSpacing: "0.08em" }}>{l.sub}</p>
                    </a>
                ))}
            </div>
        </Widget>
    );
}

function MusicWidget() {
    const [trackInfo, setTrackInfo] = useState({
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        progress: 0,
        duration: 200,
        isPlaying: false,
        colors: { primary: "#ff0000", secondary: "#000000" },
    });
    const [colorTheme, setColorTheme] = useState('blinding-lights');

    useEffect(() => {
        setTrackInfo({
            title: "Blinding Lights",
            artist: "The Weeknd",
            album: "After Hours",
            progress: 0,
            duration: 200,
            isPlaying: true,
            colors: { primary: "#ff0000", secondary: "#000000" },
        });
        setColorTheme('blinding-lights');

        const tracks = [
            { title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: 200, colors: { primary: "#ff0000", secondary: "#000000" }, theme: 'blinding-lights' },
            { title: "Is There Someone Else?", artist: "The Weeknd", album: "Dawn FM", duration: 180, colors: { primary: "#8a2be2", secondary: "#191970" }, theme: 'is-there-someone-else' },
            { title: "Popular", artist: "The Weeknd, Playboi Carti & Madonna", album: "The Highlights", duration: 190, colors: { primary: "#ff1493", secondary: "#fff0f5" }, theme: 'popular' }
        ];

        const progressInterval = setInterval(() => {
            setTrackInfo(prev => {
                if (!prev.isPlaying) return prev;
                const newProgress = Math.min(prev.progress + 1, prev.duration);
                if (newProgress >= prev.duration) {
                    const currentIndex = tracks.findIndex(t => t.title === prev.title);
                    const nextIndex = (currentIndex + 1) % tracks.length;
                    const nextTrack = tracks[nextIndex];
                    setColorTheme(nextTrack.theme);
                    return {
                        title: nextTrack.title,
                        artist: nextTrack.artist,
                        album: nextTrack.album,
                        progress: 0,
                        duration: nextTrack.duration,
                        isPlaying: true,
                        colors: nextTrack.colors,
                    };
                }
                return { ...prev, progress: newProgress };
            });
        }, 1000);

        return () => clearInterval(progressInterval);
    }, []);

    useEffect(() => {
        document.documentElement.style.setProperty('--music-primary', trackInfo.colors.primary);
        document.documentElement.style.setProperty('--music-secondary', trackInfo.colors.secondary);
    }, [trackInfo]);

    return (
        <Widget style={{ display: "flex", alignItems: "center", gap: 10, position: "relative", minWidth: 220 }}>
            <button
                onClick={() => setTrackInfo(prev => ({ ...prev, isPlaying: !prev.isPlaying }))}
                style={{ width: 32, height: 32, borderRadius: 6, background: "var(--widget-surface)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer", border: "1px solid var(--widget-border)" }}
                aria-label={trackInfo.isPlaying ? "Pause" : "Play"}
            >
                {trackInfo.isPlaying ? <Pause size={14} style={{ color: "var(--widget-bright)" }} /> : <Play size={14} style={{ color: "var(--widget-muted)" }} />}
            </button>
            <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                <p style={{ fontSize: "0.62rem", color: "var(--widget-bright)", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{trackInfo.title}</p>
                <p style={{ fontSize: "0.55rem", color: "var(--widget-strong)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{trackInfo.artist} · {trackInfo.album}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                    <div style={{ width: 80, height: 4, background: "var(--widget-surface)", borderRadius: 2, position: "relative", flexShrink: 0 }}>
                        <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${(trackInfo.progress / trackInfo.duration) * 100}%`, background: "var(--widget-bright)", borderRadius: 2 }}></div>
                    </div>
                    <span style={{ fontSize: "0.5rem", color: "var(--widget-muted)", whiteSpace: "nowrap" }}>
                        {`${Math.floor(trackInfo.progress / 60)}:${String(trackInfo.progress % 60).padStart(2, '0')} / ${Math.floor(trackInfo.duration / 60)}:${String(trackInfo.duration % 60).padStart(2, '0')}`}
                    </span>
                </div>
            </div>
        </Widget>
    );
}

function StatusWidget() {
    return (
        <Widget style={{ minWidth: 200 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                <span className="status-dot" />
                <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--widget-muted)" }}>Open to Work</p>
            </div>
            {
                [
                    { label: "Building", value: "ApeX terminal" },
                    { label: "Reading", value: "The Pragmatic Programmer" },
                    { label: "Writing", value: "Systems notes" },
                ].map(({ label, value }) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                        <p style={{ fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--widget-subtle)" }}>{label}</p>
                        <p style={{ fontSize: "0.68rem", color: "var(--widget-strong)" }}>{value}</p>
                    </div>
                ))
            }
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
        <Widget style={{ minWidth: 200 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--widget-bright)" }}>{monthName}</p>
                <p style={{ fontSize: "0.65rem", color: "var(--widget-subtle)" }}>{year}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 6 }}>
                {["S","M","T","W","T","F","S"].map((d, i) => (
                    <p key={i} style={{ fontSize: "0.5rem", textAlign: "center", color: "var(--widget-faint)", letterSpacing: "0.05em" }}>{d}</p>
                ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
                {days.map((d, i) => (
                    <div key={i} style={{
                        fontSize: "0.55rem", textAlign: "center", padding: "3px 0", borderRadius: 4,
                        color: d !== null && d === today ? "var(--background)" : "var(--widget-muted)",
                        background: d !== null && d === today ? "var(--foreground)" : "transparent",
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
    const GH_COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
    const FUTURE_COLOR = "var(--widget-surface)";
    const CELL = 11;
    const GAP  = 3;

    const YEAR = new Date().getFullYear();
    const TODAY = new Date();
    TODAY.setHours(0, 0, 0, 0);

    const yearStart = new Date(YEAR, 0, 1);
    const yearEnd   = new Date(YEAR, 11, 31);
    const startOffset = yearStart.getDay();
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
    const [retryCount, setRetryCount] = useState(0);

    const loadContributions = useCallback(async () => {
        let active = true;

        const load = async () => {
            const endpoints = [
                `/api/github-contributions?y=${YEAR}&t=${retryCount}`,
                `https://github-contributions-api.jogruber.de/v4/SWADHIN300?y=${YEAR}`,
                `https://github-contributions-api.deno.dev/SWADHIN300.json`,
            ];

            for (const endpoint of endpoints) {
                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 10000);

                    const res = await fetch(endpoint, { signal: controller.signal });
                    clearTimeout(timeoutId);

                    if (!res.ok) continue;
                    const payload = await res.json();
                    const days = parseContributionDays(payload);
                    if (!days.length) continue;
                    if (!active) return;

                    const levelMap = new Map<string, number>();
                    days.forEach(day => {
                        const dateStr = (day.date ?? day.day ?? "") as string;
                        if (dateStr) levelMap.set(dateStr.slice(0, 10), parseContributionLevel(day));
                    });

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
    }, [YEAR, retryCount]);

    useEffect(() => {
        setMode("loading");
        loadContributions();
    }, [loadContributions]);

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

    const weekCols: CellInfo[][] = [];
    for (let w = 0; w < WEEKS; w++) weekCols.push(cells.slice(w * 7, w * 7 + 7));

    return (
        <Widget style={{ padding: "10px 14px", ...style, minWidth: 280 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <p style={{ fontSize: "0.5rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--widget-faint)" }}>
                    {mode === "live" && yearTotal !== null
                        ? `${yearTotal.toLocaleString()} contributions in ${YEAR}`
                        : mode === "loading"
                            ? "Loading contributions..."
                            : `Contributions ${YEAR} · github.com/SWADHIN300`}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {mode === "fallback" && (
                        <button
                            onClick={() => setRetryCount(c => c + 1)}
                            style={{
                                background: "none",
                                border: "1px solid var(--widget-border)",
                                color: "var(--widget-muted)",
                                fontSize: "0.45rem",
                                fontFamily: "var(--font-space-mono), monospace",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                padding: "2px 8px",
                                borderRadius: 3,
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                            }}
                        >
                            Retry
                        </button>
                    )}
                    <a href="https://github.com/SWADHIN300" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile"
                        style={{ color: "var(--widget-faint)", display: "flex", alignItems: "center", pointerEvents: "auto" }}>
                        <Github size={11} />
                    </a>
                </div>
            </div>

            <div style={{ overflowX: "auto", overflowY: "hidden", paddingBottom: 2 }}>
                <div style={{ position: "relative", minWidth: WEEKS * (CELL + GAP) - GAP }}>

                    <div style={{ position: "relative", height: 14, marginBottom: 2 }}>
                        {monthLabels.map(({ label, col }) => (
                            <span key={`${label}-${col}`} style={{
                                position: "absolute",
                                left: col * (CELL + GAP),
                                fontSize: "0.46rem",
                                color: "var(--widget-faint)",
                                letterSpacing: "0.05em",
                                fontFamily: "var(--font-space-mono), monospace",
                                textTransform: "uppercase",
                                whiteSpace: "nowrap",
                            }}>{label}</span>
                        ))}
                    </div>

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
                                                border: isBlank ? "none" : `1px solid ${cell.level > 0 ? "var(--widget-border)" : "var(--widget-surface)"}`,
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

                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8, justifyContent: "flex-end" }}>
                        <span style={{ fontSize: "0.42rem", color: "var(--widget-faint)", fontFamily: "var(--font-space-mono), monospace" }}>Less</span>
                        {GH_COLORS.map((c, i) => (
                            <div key={i} style={{ width: 8, height: 8, borderRadius: 2, background: c, border: "1px solid var(--widget-surface)" }} />
                        ))}
                        <span style={{ fontSize: "0.42rem", color: "var(--widget-faint)", fontFamily: "var(--font-space-mono), monospace" }}>More</span>
                    </div>
                </div>
            </div>
        </Widget>
    );
}

function VisitorWidget({ style }: { style?: React.CSSProperties }) {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        fetch("https://api.counterapi.dev/v1/swadhin-portfolio-sr/views/up")
            .then(r => r.json())
            .then(d => setCount(d.count ?? d.value ?? null))
            .catch(() => setCount(null));
    }, []);

    return (
        <Widget style={{ padding: "12px 16px", ...style, minWidth: 170 }}>
            <p style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--widget-subtle)", marginBottom: 6 }}>Visitors</p>
            <motion.p
                key={count}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--widget-bright)", lineHeight: 1 }}
            >
                {count !== null ? count.toLocaleString() : "—"}
            </motion.p>
            <p style={{ fontSize: "0.5rem", color: "var(--widget-faint)", marginTop: 4 }}>total visits</p>
        </Widget>
    );
}

function DesktopWidgets() {
    const [viewportWidth, setViewportWidth] = useState(1200);

    useEffect(() => {
        const updateWidth = () => setViewportWidth(window.innerWidth);
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const rightColumnX = Math.max(viewportWidth - 240, 500);
    const bottomLeftX = Math.min(Math.max(viewportWidth / 2 - 320, 150), viewportWidth - 520);
    const githubX = Math.min(Math.max(viewportWidth / 2 - 80, 360), viewportWidth - 520);

    return (
        <div className="desktop-widgets">
            {/* LEFT COLUMN */}
            <DraggableWidget
                initialPosition={{ x: 20, y: 50 }}
                storageKey="widget-quote-position"
            >
                <QuoteWidget />
            </DraggableWidget>
            <DraggableWidget
                initialPosition={{ x: 20, y: 200 }}
                storageKey="widget-links-position"
            >
                <LinksWidget />
            </DraggableWidget>
            <DraggableWidget
                initialPosition={{ x: 20, y: 400 }}
                storageKey="widget-music-position"
            >
                <MusicWidget />
            </DraggableWidget>

            {/* RIGHT COLUMN */}
            <DraggableWidget
                initialPosition={{ x: rightColumnX, y: 50 }}
                storageKey="widget-status-position"
            >
                <StatusWidget />
            </DraggableWidget>
            <DraggableWidget
                initialPosition={{ x: rightColumnX, y: 220 }}
                storageKey="widget-calendar-position"
            >
                <CalendarWidget />
            </DraggableWidget>

            {/* BOTTOM CENTER — visitor + github grid */}
            <DraggableWidget
                initialPosition={{ x: bottomLeftX, y: Math.max(viewportWidth > 800 ? 390 : 500, 390) }}
                storageKey="widget-visitor-position"
            >
                <VisitorWidget />
            </DraggableWidget>
            <DraggableWidget
                initialPosition={{ x: githubX, y: Math.max(viewportWidth > 800 ? 465 : 600, 465) }}
                storageKey="widget-github-position"
            >
                <GithubGrid />
            </DraggableWidget>
        </div>
    );
}

/* ══════════════════════════════════════════╗
   WINDOW CONTENTS
╚══════════════════════════════════════════ */
const PROFILE_AVATAR = "/profile.jpeg";

function HeroContent({ onNavigate }: { onNavigate: (id: string) => void }) {
    return (
        <div className="hero-content">
            <p className="label hero-kicker">{"// swadhin raha — portfolio"}</p>
            <motion.h1 initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.55, ease: [0.33, 1, 0.68, 1] }}
                className="hero-name">Swadhin<br />Raha</motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="hero-role">
                Software Engineer — React, Next.js, TypeScript & systems
            </motion.p>
            <div className="hero-rule" />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }} className="hero-description">
                I build thoughtful products and reliable systems from Berhampur, Odisha. My work lives at the intersection of sharp interfaces, fast APIs, and infrastructure that stays out of the way.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="hero-actions">
                <button className="btn-solid" onClick={() => onNavigate("projects")}>View Projects <ExternalLink size={12} /></button>
                <button className="btn-ghost" onClick={() => onNavigate("contact")}>Contact Me <Mail size={12} /></button>
            </motion.div>
            <div className="hero-profile">
                <Image src={PROFILE_AVATAR} alt="Swadhin Raha" width={42} height={42} className="hero-avatar" />
                <div>
                    <p className="hero-handle">SWADHIN300</p>
                    <p className="hero-location">Berhampur · Odisha · 20</p>
                </div>
                <div className="hero-socials">
                    <a href="https://github.com/SWADHIN300" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={17} /></a>
                    <a href="https://x.com/swadhin_ra35911" target="_blank" rel="noopener noreferrer" aria-label="X"><Twitter size={17} /></a>
                    <a href="mailto:swadhinraha81@gmail.com" aria-label="Email"><Mail size={17} /></a>
                </div>
            </div>
        </div>
    );
}

const TWITTER_AVATAR = PROFILE_AVATAR;

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

            <motion.div
                className="mini-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{ marginBottom: 10, display: "flex", gap: 20, alignItems: "flex-start" }}
            >
                <div style={{ position: "relative", flexShrink: 0 }}>
                    <Image
                        src={TWITTER_AVATAR}
                        alt="Swadhin Raha"
                        width={88}
                        height={88}
                        unoptimized
                        style={{
                            borderRadius: 16,
                            objectFit: "cover",
                            border: "2px solid var(--widget-border)",
                            boxShadow: "var(--hero-shadow)",
                            display: "block",
                        }}
                        onError={(e) => {
                            e.currentTarget.src = PROFILE_AVATAR;
                            e.currentTarget.onerror = null;
                        }}
                    />
                    <span style={{
                        position: "absolute",
                        bottom: 6,
                        right: 6,
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: "var(--status-green)",
                        border: "2px solid var(--card)",
                        boxShadow: "0 0 6px var(--status-green)",
                    }} />
                </div>

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
                    }}>Software Engineer · Next.js · TypeScript</p>
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

            <motion.div
                className="mini-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 }}
                style={{ marginBottom: 10 }}
            >
                <p className="label" style={{ marginBottom: 6 }}>{ "// bio" }</p>
                <p style={{ color: "var(--fg-muted)", fontFamily: "var(--font-space-mono), monospace", fontSize: "0.73rem", lineHeight: 1.85 }}>
                    I&apos;m a Software Engineer passionate about building scalable, maintainable systems.
                    With expertise across the full stack, I create robust backend architectures,
                    performant frontend experiences, and reliable infrastructure — clean code, performance-first, and user-centric design.
                </p>
            </motion.div>

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
        { period: "2023 — Present", role: "Software Engineer", company: "Freelance", desc: "Building scalable web applications with Next.js, React and TypeScript." },
        { period: "2022 — 2023", role: "Frontend Engineer", company: "Personal Projects", desc: "Developed and deployed multiple React-based projects focusing on performance." },
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
    const [extraProjects, setExtraProjects] = useState<Project[]>(() => {
        try {
            return JSON.parse(localStorage.getItem("portfolio_projects") ?? "[]");
        } catch {
            return [];
        }
    });

    useEffect(() => {
        const handleStorageChange = () => {
            try {
                setExtraProjects(JSON.parse(localStorage.getItem("portfolio_projects") ?? "[]"));
            } catch {
                setExtraProjects([]);
            }
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const allProjects = [...defaultProjects, ...extraProjects];

    return (
        <div style={{ padding: "24px 28px" }}>
            <SectionHead label="// 02" title="Projects" />
            <div className="pcards">
                {allProjects.map((p, i) => (
                    <motion.article
                        key={p.title + i}
                        className="pcard"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, type: "spring", stiffness: 380, damping: 28 }}
                        whileHover={{ y: -5 }}
                    >
                        <div className="pcard-body">
                            <div className="pcard-head">
                                <span className="pcard-idx">{String(i + 1).padStart(2, "0")}</span>
                                <h3 className="pcard-title">{p.title}</h3>
                                {p.liveUrl && (
                                    <span className="pcard-live">
                                        <span className="status-dot" /> Live
                                    </span>
                                )}
                            </div>

                            <p className="pcard-desc">{p.description}</p>

                            <div className="pcard-tags">
                                {p.tech.map((t, ti) => (
                                    <motion.span
                                        key={t}
                                        className="badge"
                                        initial={{ opacity: 0, y: 6, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ delay: i * 0.05 + 0.18 + ti * 0.04, duration: 0.3 }}
                                    >
                                        {t}
                                    </motion.span>
                                ))}
                            </div>

                            <div className="pcard-actions">
                                {p.liveUrl && (
                                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                                        className="pcard-btn pcard-btn-primary">
                                        <ExternalLink size={11} /> Visit
                                    </a>
                                )}
                                <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="pcard-btn">
                                    <Github size={11} /> Source
                                </a>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>
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
    const [extraSkills, setExtraSkills] = useState<Array<{name: string, iconKey: string, url: string}>>(() => {
        try {
            return JSON.parse(localStorage.getItem("portfolio_skills") ?? "[]");
        } catch {
            return [];
        }
    });

    useEffect(() => {
        const handleStorageChange = () => {
            try {
                setExtraSkills(JSON.parse(localStorage.getItem("portfolio_skills") ?? "[]"));
            } catch {
                setExtraSkills([]);
            }
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const allSkills = [...defaultSkills.map(s => ({ name: s.name, iconKey: "Braces", url: s.url })), ...extraSkills];

    return (
        <div style={{ padding: "24px 28px" }}>
            <SectionHead label="// 03" title="Skills" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {allSkills.map((s, i) => {
                    const Icon = iconMap[s.iconKey] || Braces;
                    return (
                        <motion.a key={s.name + i} href={s.url} target="_blank" rel="noopener noreferrer"
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
        "  Swadhin Raha — Software Engineer",
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
        else if (c === "whoami") out = ["  Swadhin Raha — Software Engineer"];
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
        <div style={{ padding: "16px 20px", background: "var(--terminal-bg)", fontFamily: "var(--font-space-mono), monospace", fontSize: "0.73rem", minHeight: 300 }}>
            {lines.map((l, i) => (
                <div key={i} style={{ color: l.startsWith("swadhin@") ? "var(--prompt)" : "var(--terminal-text)", lineHeight: 1.7, whiteSpace: "pre" }}>{l}</div>
            ))}
            <div ref={bottomRef} />
            <input autoFocus value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && input.trim()) { handleCommand(input); setInput(""); } }}
                style={{ background: "transparent", border: "none", outline: "none", color: "var(--prompt)", fontFamily: "var(--font-space-mono), monospace", fontSize: "0.73rem", width: "100%", marginTop: 2 }}
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
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName: form.name, email: form.email, message: form.message }),
            });
            const data = await res.json();
            if (data.success) {
                setStatus("success"); setForm({ name: "", email: "", message: "" });
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                throw new Error(data.error || "failed");
            }
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
                        <CheckCircle size={13} color="var(--status-green)" />
                        <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.68rem", color: "var(--fg)" }}>Sent! I&apos;ll get back to you soon.</span>
                    </motion.div>
                )}
                {status === "error" && (
                    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mini-card" style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 10, borderColor: "var(--danger-border)", background: "var(--danger-bg)" }}>
                        <AlertCircle size={13} color="var(--destructive)" style={{ flexShrink: 0, marginTop: 1 }} />
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
const X_PROFILE_AVATAR = PROFILE_AVATAR;

const DOCK_ITEMS = [
    { id: "hero",       label: "Home",         Icon: Home,         isLink: false, href: "", maximizable: false },
    { id: "about",      label: "Profile",      Icon: User,         isLink: false, href: "" },
    { id: "experience", label: "Work",         Icon: Briefcase,    isLink: false, href: "" },
    { id: "projects",   label: "Code",         Icon: FolderOpen,   isLink: false, href: "", maximizable: false },
    { id: "blogs",      label: "Reading",      Icon: BookOpen,     isLink: false, href: "" },
    { id: "contact",    label: "Contact",      Icon: Mail,         isLink: false, href: "" },
    { id: "resume",     label: "Certificates", Icon: FileDown,     isLink: true,  href: RESUME_URL },
    { id: "terminal",   label: "Terminal",     Icon: TerminalIcon, isLink: false, href: "" },
    { id: "uses",       label: "Skills",       Icon: Wrench,       isLink: false, href: "" },
    { id: "notes",      label: "Blog",         Icon: FileText,     isLink: false, href: "" },
];

const SOCIAL_DOCK = [
    { id: "github",   label: "GitHub", Icon: Github,  href: "https://github.com/SWADHIN300" },
    { id: "xtwitter", label: "X",      Icon: XIcon,   href: "https://x.com/swadhin_ra35911" },
];

function Dock({ activeId, onToggle, isDark, onThemeChange }: {
    activeId?: string;
    onToggle: (id: string) => void;
    isDark: boolean;
    onThemeChange: (dark: boolean) => void;
}) {
    const items: MacDockItem[] = [
        ...DOCK_ITEMS.map((d) => ({
            id: d.id,
            label: d.label,
            icon: d.Icon,
            href: d.isLink ? d.href : undefined,
            external: d.isLink,
        })),
        ...SOCIAL_DOCK.map((s) => ({
            id: s.id,
            label: s.label,
            icon: s.Icon,
            href: s.href,
            external: true,
        })),
        { id: "theme", label: isDark ? "Light Mode" : "Dark Mode", icon: isDark ? Sun : Moon },
    ];

    const handleSelect = (id: string) => {
        if (id === "theme") {
            onThemeChange(!isDark);
            return;
        }
        onToggle(id);
    };

    return <MacDock items={items} activeId={activeId} onSelect={handleSelect} />;
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
    hero:       { top: "1%",  left: "27%" },
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
    const [maximized, setMaximized] = useState<Set<string>>(new Set());
    const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});

    // The active dock item = the open window currently on top (highest z-index).
    const activeId = useMemo(() => {
        const dockIds = new Set(DOCK_ITEMS.map((d) => d.id));
        let best: string | undefined;
        let bestZ = -Infinity;
        open.forEach((id) => {
            if (!dockIds.has(id)) return;
            const z = zMap[id] ?? 0;
            if (z >= bestZ) {
                bestZ = z;
                best = id;
            }
        });
        return best;
    }, [open, zMap]);

    useEffect(() => {
        setUiReady(true);
        const saved = localStorage.getItem("theme");
        const dark = saved !== "light";
        setIsDark(dark);
        document.documentElement.classList.toggle("dark", dark);
    }, []);

    const applyTheme = (dark: boolean) => {
        setIsDark(dark);
        document.documentElement.classList.toggle("dark", dark);
        localStorage.setItem("theme", dark ? "dark" : "light");
    };

    const toggleTheme = () => applyTheme(!isDark);

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
        setMaximized(prev => { const n = new Set(prev); n.delete(id); return n; });
    };

    const maximizeWindow = (id: string) => {
        setMaximized(prev => { const n = new Set(prev); n.add(id); return n; });
        focusWindow(id);
    };

    const minimizeWindow = (id: string) => {
        setMaximized(prev => { const n = new Set(prev); n.delete(id); return n; });
    };

    // Content and Footer helpers
    const getContent = (id: string) => {
        switch (id) {
            case "hero":
                return <HeroContent onNavigate={wid => { setOpen(prev => { const n = new Set(prev); n.add(wid); return n; }); focusWindow(wid); }} />;
            case "about":
                return <AboutContent />;
            case "experience":
                return <ExperienceContent />;
            case "projects":
                return <ProjectsContent />;
            case "blogs":
                return <BlogsContent />;
            case "contact":
                return <ContactContent />;
            case "terminal":
                return <TerminalContent />;
            case "uses":
                return <UsesContent />;
            case "notes":
                return <NotesContent />;
            default:
                return null;
        }
    };

    const getFooter = (id: string) => {
        switch (id) {
            case "about":
                return (
                    <WindowFooter
                        left={<MacButton variant="ghost" size="sm" onClick={() => window.open("https://github.com/SWADHIN300", "_blank")}><Github size={10} /> GitHub</MacButton>}
                        center={<MacButton variant="ghost" size="sm" onClick={() => window.open("https://x.com/swadhin_ra35911", "_blank")}><Twitter size={10} /> X</MacButton>}
                        right={<MacButton variant="primary" size="sm" onClick={() => { setOpen(prev => { const n = new Set(prev); n.add("contact"); return n; }); focusWindow("contact"); }}><Mail size={10} /> Contact Me</MacButton>}
                    />
                );
            case "experience":
                return (
                    <WindowFooter
                        left={<MacButton variant="ghost" size="sm" onClick={() => { setOpen(prev => { const n = new Set(prev); n.add("projects"); return n; }); focusWindow("projects"); }}><FolderOpen size={10} /> View Projects</MacButton>}
                        right={<MacButton variant="primary" size="sm" onClick={() => { setOpen(prev => { const n = new Set(prev); n.add("contact"); return n; }); focusWindow("contact"); }}><Mail size={10} /> Hire Me</MacButton>}
                    />
                );
            case "projects":
                return (
                    <WindowFooter
                        left={<MacButton variant="ghost" size="sm" onClick={() => { setOpen(prev => { const n = new Set(prev); n.add("about"); return n; }); focusWindow("about"); }}><User size={10} /> About Me</MacButton>}
                        right={<MacButton variant="primary" size="sm" onClick={() => { setOpen(prev => { const n = new Set(prev); n.add("contact"); return n; }); focusWindow("contact"); }}><Mail size={10} /> Get in Touch</MacButton>}
                    />
                );
            case "blogs":
                return (
                    <WindowFooter
                        left={<MacButton variant="ghost" size="sm" onClick={() => { setOpen(prev => { const n = new Set(prev); n.add("notes"); return n; }); focusWindow("notes"); }}><BookOpen size={10} /> Notes</MacButton>}
                        right={<MacButton variant="primary" size="sm" onClick={() => { setOpen(prev => { const n = new Set(prev); n.add("contact"); return n; }); focusWindow("contact"); }}><Mail size={10} /> Contact</MacButton>}
                    />
                );
            case "contact":
                return (
                    <WindowFooter
                        left={<MacButton variant="ghost" size="sm" onClick={() => window.open("mailto:swadhinraha81@gmail.com")}><Mail size={10} /> Email Direct</MacButton>}
                        right={<MacButton variant="primary" size="sm" onClick={() => { setOpen(prev => { const n = new Set(prev); n.add("about"); return n; }); focusWindow("about"); }}><User size={10} /> About Me</MacButton>}
                    />
                );
            case "terminal":
                return (
                    <WindowFooter
                        left={<MacButton variant="ghost" size="sm" onClick={() => { setOpen(prev => { const n = new Set(prev); n.add("uses"); return n; }); focusWindow("uses"); }}><Wrench size={10} /> Uses</MacButton>}
                        center={<MacButton variant="ghost" size="sm" onClick={() => { setOpen(prev => { const n = new Set(prev); n.add("notes"); return n; }); focusWindow("notes"); }}><BookOpen size={10} /> Notes</MacButton>}
                        right={<MacButton variant="primary" size="sm" onClick={() => { setOpen(prev => { const n = new Set(prev); n.add("contact"); return n; }); focusWindow("contact"); }}><Mail size={10} /> Contact</MacButton>}
                    />
                );
            case "uses":
                return (
                    <WindowFooter
                        left={<MacButton variant="ghost" size="sm" onClick={() => { setOpen(prev => { const n = new Set(prev); n.add("terminal"); return n; }); focusWindow("terminal"); }}><TerminalIcon size={10} /> Terminal</MacButton>}
                        right={<MacButton variant="primary" size="sm" onClick={() => { setOpen(prev => { const n = new Set(prev); n.add("contact"); return n; }); focusWindow("contact"); }}><Mail size={10} /> Contact</MacButton>}
                    />
                );
            case "notes":
                return (
                    <WindowFooter
                        left={<MacButton variant="ghost" size="sm" onClick={() => { setOpen(prev => { const n = new Set(prev); n.add("blogs"); return n; }); focusWindow("blogs"); }}><BookOpen size={10} /> Blogs</MacButton>}
                        right={<MacButton variant="primary" size="sm" onClick={() => { setOpen(prev => { const n = new Set(prev); n.add("contact"); return n; }); focusWindow("contact"); }}><Mail size={10} /> Contact</MacButton>}
                    />
                );
            default:
                return null;
        }
    };

    if (!uiReady) {
        return (
            <div style={{ minHeight: "100dvh", paddingTop: 28, paddingBottom: 100, background: "var(--background)" }} />
        );
    }

    return (
        <div className="desktop-boot" style={{ minHeight: "100dvh", paddingTop: 28, paddingBottom: 100, background: "var(--background)" }}>
            <div className="boot-overlay" aria-hidden>
                <span className="boot-mark">SR</span>
            </div>
            <StatusBar isDark={isDark} onToggle={toggleTheme} />

            <main className="portfolio-main">
            <DesktopWidgets />

            <div className="window-stage" style={{ position: "fixed", inset: 0, top: 28, bottom: 80, pointerEvents: "none", zIndex: 30 }}>
                <AnimatePresence>
                    {Array.from(open).map(id => {
                        const off = OFFSETS[id] ?? { top: "10%", left: "22%" };
                        const isWide = ["projects", "uses", "skills"].includes(id);
                        const isMax = maximized.has(id);
                        const pos = positions[id];
                        return (
                            <div key={id}
                                style={{
                                    position: isMax ? "fixed" : "absolute",
                                    top: isMax ? 32 : off.top,
                                    left: isMax ? 0 : off.left,
                                    zIndex: zMap[id] ?? 10,
                                    pointerEvents: "auto"
                                }}
                                onClick={() => focusWindow(id)}
                            >
                                <Window
                                    id={id}
                                    title={WINDOW_TITLES[id] ?? id}
                                    onClose={() => closeWindow(id)}
                                    onFocus={() => focusWindow(id)}
                                    onMaximize={() => maximizeWindow(id)}
                                    onMinimize={() => minimizeWindow(id)}
                                    isMaximized={isMax}
                                    width={isWide ? "min(820px, 86vw)" : "min(580px, 80vw)"}
                                    maximizable={!["hero", "projects", "resume"].includes(id)}
                                    footer={getFooter(id)}
                                >
                                    {getContent(id)}
                                </Window>
                            </div>
                        );
                    })}
                </AnimatePresence>
            </div>
            </main>

            <Dock activeId={activeId} onToggle={toggleWindow} isDark={isDark} onThemeChange={applyTheme} />
        </div>
    );
}
