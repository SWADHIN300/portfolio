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
                    <h2 className="text-5xl md:text-7xl font-bold mb-12">
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                            Swadhin
                        </span>
                    </h2>

                    <div className="space-y-6 text-gray-300 text-lg">
                        <p>
                            I&apos;m a Full Stack Developer passionate about building modern, scalable web applications
                            that solve real-world problems. With expertise in both frontend and backend technologies,
                            I create seamless user experiences backed by robust infrastructure.
                        </p>

                        <p>
                            My approach combines clean code, performance optimization, and user-centric design
                            to deliver applications that not only work well but feel great to use.
                        </p>

                        <div className="pt-8">
                            <h3 className="text-2xl font-bold mb-4 text-white">Experience</h3>
                            <div className="space-y-4">
                                <div className="border-l-2 border-gray-700 pl-4">
                                    <p className="text-gray-400 text-sm">2023 - Present</p>
                                    <p className="text-white font-semibold">Full Stack Developer</p>
                                    <p className="text-gray-400">Building modern web applications with Next.js and React</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
