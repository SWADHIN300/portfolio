import {
    Code2,
    Database,
    Server,
    Layers,
    Zap,
    Box,
    GitBranch,
    Globe,
    FileCode,
    Braces,
    Terminal,
    Cloud,
    type LucideIcon,
} from "lucide-react";

export type Project = {
    title: string;
    description: string;
    tech: string[];
    liveUrl: string | null;
    githubUrl: string;
};

export type Skill = {
    name: string;
    icon: LucideIcon;
    url: string;
};

export const defaultProjects: Project[] = [
    {
        title: "Coin Tracking",
        description:
            "A comprehensive cryptocurrency tracking application with real-time price updates, candlestick charts, and portfolio management features.",
        tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Chart.js"],
        liveUrl: "https://coin-tracking-three.vercel.app/",
        githubUrl: "https://github.com/SWADHIN300/coin-tracking",
    },
    {
        title: "Stock Tracker",
        description:
            "Real-time stock market tracking application with advanced analytics, portfolio management, and market insights.",
        tech: ["Next.js", "React", "TypeScript", "API Integration"],
        liveUrl: null,
        githubUrl: "https://github.com/SWADHIN300/stock-tracker",
    },
];

export const defaultSkills: Skill[] = [
    { name: "React", icon: Braces, url: "https://react.dev" },
    { name: "Next.js", icon: Layers, url: "https://nextjs.org" },
    { name: "TypeScript", icon: FileCode, url: "https://www.typescriptlang.org" },
    { name: "JavaScript", icon: Terminal, url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "Express", icon: Server, url: "https://expressjs.com" },
    { name: "Node.js", icon: Server, url: "https://nodejs.org" },
    { name: "PostgreSQL", icon: Database, url: "https://www.postgresql.org" },
    { name: "MongoDB", icon: Database, url: "https://www.mongodb.com" },
    { name: "Prisma", icon: Layers, url: "https://www.prisma.io" },
    { name: "Redis", icon: Database, url: "https://redis.io" },
    { name: "Tailwind CSS", icon: Zap, url: "https://tailwindcss.com" },
    { name: "Framer Motion", icon: Zap, url: "https://www.framer.com/motion" },
    { name: "Git", icon: GitBranch, url: "https://git-scm.com" },
    { name: "GitHub", icon: GitBranch, url: "https://github.com" },
    { name: "Docker", icon: Box, url: "https://www.docker.com" },
    { name: "Vercel", icon: Cloud, url: "https://vercel.com" },
    { name: "REST APIs", icon: Globe, url: "https://restfulapi.net" },
    { name: "GraphQL", icon: Layers, url: "https://graphql.org" },
    { name: "MySQL", icon: Database, url: "https://www.mysql.com" },
    { name: "HTML/CSS", icon: Globe, url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { name: "VS Code", icon: Code2, url: "https://code.visualstudio.com" },
];

// Icon lookup for skills added via admin (stored in localStorage as plain objects)
export const iconMap: Record<string, LucideIcon> = {
    Code2,
    Database,
    Server,
    Layers,
    Zap,
    Box,
    GitBranch,
    Globe,
    FileCode,
    Braces,
    Terminal,
    Cloud,
};
