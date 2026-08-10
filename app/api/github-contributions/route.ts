import { NextResponse, NextRequest } from "next/server";

export const revalidate = 3600;

export async function GET(req: NextRequest) {
    const year = req.nextUrl.searchParams.get("y") ?? new Date().getFullYear().toString();

    // Try multiple endpoints with better error handling
    const endpoints = [
        `https://github-contributions-api.jogruber.de/v4/SWADHIN300?y=${year}`,
        `https://github-contributions-api.deno.dev/SWADHIN300.json`,
        `https://github-contributions.vercel.app/api/SWADHIN300?y=${year}`,
    ];

    for (const url of endpoints) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);

            const res = await fetch(url, {
                signal: controller.signal,
                next: { revalidate: 3600 },
                headers: { "User-Agent": "portfolio-site" },
            });
            clearTimeout(timeoutId);

            if (!res.ok) continue;
            const data = await res.json();

            // Validate the response has some contribution data
            if (data && (data.contributions || data.days || data.weeks || (data.data && data.data.user)))
                return NextResponse.json(data, {
                    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
                });
        } catch {
            // Try next endpoint
        }
    }

    // Return a structured fallback response instead of just error
    return NextResponse.json(
        {
            error: "unavailable",
            contributions: [],
            total: { [year]: 0 }
        },
        { status: 200 } // Return 200 with empty data instead of 502 to avoid breaking the UI
    );
}