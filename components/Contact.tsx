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
                    <h2 className="text-7xl md:text-9xl font-display mb-8 uppercase tracking-tighter border-b-8 border-foreground pb-4 inline-block">
                        Get in Touch
                    </h2>

                    <p className="text-foreground mb-4 text-xl font-sans">
                        If you have any inquiries, please feel free to reach out.
                    </p>
                    <p className="text-foreground mb-12 font-sans border-2 border-foreground p-4 bg-background inline-block">
                        EMAIL:{" "}
                        <a
                            href="mailto:swadhinraha81@gmail.com"
                            className="font-bold underline decoration-2 hover:decoration-4 transition-all"
                        >
                            swadhinraha81@gmail.com
                        </a>
                    </p>

                    {/* Follow me section */}
                    <h3 className="text-2xl font-display font-bold mb-6 border-l-4 border-foreground pl-4 uppercase">Follow Me</h3>

                    <div className="flex flex-wrap gap-4 mb-16">
                        {[
                            { icon: Github, label: "GitHub", href: "https://github.com/SWADHIN300" },
                            { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/swadhin-raha-27067226b/" },
                            { icon: Twitter, label: "X (Twitter)", href: "https://x.com/swadhin_ra35911" },
                        ].map((social, idx) => (
                            <a
                                key={idx}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 bg-background border-2 border-foreground hover:shadow-hard hover:-translate-x-1 hover:-translate-y-1 transition-all"
                                aria-label={social.label}
                            >
                                <social.icon className="w-8 h-8 text-foreground" />
                            </a>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="bg-background border-4 border-foreground p-8 mb-16 shadow-hard-lg">
                        <h3 className="text-3xl font-display font-bold mb-8 uppercase text-center border-b-2 border-foreground pb-4">Fill this form</h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold uppercase mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border-2 border-foreground bg-background text-foreground font-sans focus:outline-none focus:shadow-hard transition-all"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold uppercase mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border-2 border-foreground bg-background text-foreground font-sans focus:outline-none focus:shadow-hard transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold uppercase mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full p-3 border-2 border-foreground bg-background text-foreground font-sans focus:outline-none focus:shadow-hard transition-all resize-none"
                                    placeholder="Your message..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-4 bg-foreground text-background font-display text-2xl uppercase hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-hard transition-all duration-300"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Footer bar */}
                    <div className="border-t-4 border-foreground pt-8 text-center">
                        <p className="text-foreground text-sm uppercase font-mono">
                            © {new Date().getFullYear()} Designed & Developed by Swadhin
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
