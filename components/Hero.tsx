"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center relative px-4 overflow-hidden">
            {/* Simple static background or minimalist pattern if needed */}
            <div className="absolute inset-0 bg-background opacity-20 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(var(--foreground) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-7xl md:text-9xl  font-display mb-6 uppercase tracking-tighter">
                        Swadhin
                    </h1>
                    <p className="text-3xl md:text-5xl mb-8 font-display uppercase border-y-4 border-foreground py-4 inline-block tracking-widest">
                        Full Stack Developer
                    </p>
                    <p className="text-xl md:text-2xl text-foreground font-sans max-w-2xl mx-auto leading-relaxed mt-8 border-2 border-foreground p-6 shadow-hard bg-background">
                        Building modern web applications with{" "}
                        <span className="font-bold underline decoration-4">Next.js</span>,{" "}
                        <span className="font-bold underline decoration-4">React</span>, and{" "}
                        <span className="font-bold underline decoration-4">TypeScript</span>
                    </p>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
            >
                <a href="#about" className="inline-block animate-bounce">
                    <ArrowDown className="w-8 h-8 text-foreground" />
                </a>
            </motion.div>
        </section>
    );
}
