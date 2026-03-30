import { NextResponse, NextRequest } from "next/server";

export const revalidate = 3600;

export async function GET(req: NextRequest) {
    const year = req.nextUrl.searchParams.get("y") ?? new Date().getFullYear().toString();

    const endpoints = [
        `https://github-contributions-api.jogruber.de/v4/SWADHIN300?y=${year}`,
        `https://github-contributions-api.deno.dev/SWADHIN300.json`,
    ];

    for (const url of endpoints) {
        try {
            const res = await fetch(url, {
                next: { revalidate: 3600 },
                headers: { "User-Agent": "portfolio-site" },
            });
            if (!res.ok) continue;
            const data = await res.json();
            return NextResponse.json(data, {
                headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
            });
        } catch {
            // try next endpoint
        }
    }

    return NextResponse.json({ error: "unavailable" }, { status: 502 });
}
