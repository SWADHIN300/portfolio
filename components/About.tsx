"use client";

import { motion } from "framer-motion";

export default function About() {
    return (
        <section id="about" className="min-h-screen py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-7xl md:text-9xl font-display mb-12 uppercase tracking-tighter border-b-8 border-foreground pb-4 inline-block">
                        About Me
                    </h2>

                    <div className="space-y-6 text-foreground text-xl font-sans border-2 border-foreground p-8 bg-background shadow-hard-lg">
                        <p>
                            I&apos;m a Full Stack Developer passionate about building modern, scalable web applications
                            that solve real-world problems. With expertise in both frontend and backend technologies,
                            I create seamless user experiences backed by robust infrastructure.
                        </p>

                        <p>
                            My approach combines clean code, performance optimization, and user-centric design
                            to deliver applications that not only work well but feel great to use.
                        </p>

                        <div className="pt-12">
                            <h3 className="text-4xl font-display font-bold mb-8 uppercase border-l-8 border-foreground pl-4">Experience</h3>
                            <div className="space-y-8">
                                <div className="border-2 border-foreground p-6 shadow-hard bg-background">
                                    <p className="text-foreground text-sm font-mono mb-2">2023 - PRESENT</p>
                                    <p className="text-foreground font-display text-2xl uppercase">Full Stack Developer</p>
                                    <p className="text-foreground/70 font-sans mt-2">Building modern web applications with Next.js and React</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
