"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, Instagram } from "lucide-react";
import { useState } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log("Form submitted:", formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <section id="contact" className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                            Get in Touch
                        </span>
                    </h2>

                    <p className="text-gray-400 mb-4 text-lg">
                        If you have any inquiries, please feel free to reach out.
                    </p>
                    <p className="text-gray-400 mb-8">
                        You can contact me via email at{" "}
                        <a
                            href="mailto:your.email@example.com"
                            className="text-white hover:text-purple-400 transition-colors"
                        >
                            your.email@example.com
                        </a>
                    </p>

                    {/* Follow me section */}
                    <h3 className="text-xl font-semibold mb-6 text-gray-300">Follow me</h3>

                    <div className="flex gap-4 mb-12">
                        <a
                            href="https://github.com/SWADHIN300"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-600 hover:bg-gray-800/50 transition-all duration-300"
                            aria-label="GitHub"
                        >
                            <Github className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
                        </a>

                        <a
                            href="https://linkedin.com/in/yourprofile"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-600 hover:bg-gray-800/50 transition-all duration-300"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
                        </a>

                        <a
                            href="https://x.com/swadhin_ra35911"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-600 hover:bg-gray-800/50 transition-all duration-300"
                            aria-label="X (Twitter)"
                        >
                            <Twitter className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
                        </a>

                        <a
                            href="https://instagram.com/yourprofile"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-600 hover:bg-gray-800/50 transition-all duration-300"
                            aria-label="Instagram"
                        >
                            <Instagram className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
                        </a>

                        <a
                            href="mailto:your.email@example.com"
                            className="p-3 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-600 hover:bg-gray-800/50 transition-all duration-300"
                            aria-label="Email"
                        >
                            <Mail className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
                        </a>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-8 mb-16">
                        <h3 className="text-2xl font-bold mb-6 text-center text-gray-200">Fill this form</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone No"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <textarea
                                    name="message"
                                    placeholder="Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors resize-none"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-300"
                            >
                                Submit
                            </button>
                        </form>
                    </div>

                    {/* Footer bar */}
                    <div className="border-t border-gray-800 pt-8 text-center">
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} Developed with ❤️ by Swadhin
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
