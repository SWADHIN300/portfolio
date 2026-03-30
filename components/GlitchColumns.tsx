"use client";

export default function GlitchColumns() {
    // Generate 60 lines for each column
    const lines = Array.from({ length: 60 });

    return (
        <>
            {/* Left glitch column */}
            <div className="glitch-column left" aria-hidden="true">
                {lines.map((_, i) => (
                    <div
                        key={`l-${i}`}
                        className="glitch-line"
                        style={{ "--delay": `${(i * 0.05).toFixed(2)}s` } as React.CSSProperties}
                    />
                ))}
            </div>

            {/* Right glitch column */}
            <div className="glitch-column right" aria-hidden="true">
                {lines.map((_, i) => (
                    <div
                        key={`r-${i}`}
                        className="glitch-line"
                        style={{ "--delay": `${((i * 0.05) + 1.5).toFixed(2)}s` } as React.CSSProperties}
                    />
                ))}
            </div>
        </>
    );
}
