"use client";

import { useEffect, useState } from "react";

export default function StatusBar() {
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        const update = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }));
            setDate(now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }));
        };
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div
            className="hidden md:flex fixed top-0 left-0 right-0 z-50 items-center justify-between px-4 h-7 text-[11px]"
            style={{
                background: "var(--bg)",
                borderBottom: "1px solid var(--border)",
                fontFamily: "var(--font-space-mono), monospace",
                color: "var(--fg-muted)",
                transition: "background 0.35s ease",
                fontSize: "0.62rem",
                letterSpacing: "0.08em",
            }}
        >
            {/* Left: Brand */}
            <div className="flex items-center gap-4">
                <span style={{ color: "var(--fg)", fontWeight: 700, letterSpacing: "0.15em" }}>
                    SR
                </span>
                <span>Portfolio</span>
            </div>

            {/* Center: Status */}
            <div className="flex items-center gap-2">
                <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#28c840", boxShadow: "0 0 4px #28c84080" }}
                />
                <span>Open to Work</span>
            </div>

            {/* Right: Date & time */}
            <div className="flex items-center gap-3">
                <span>{date}</span>
                <span style={{ color: "var(--fg)" }}>{time}</span>
            </div>
        </div>
    );
}
