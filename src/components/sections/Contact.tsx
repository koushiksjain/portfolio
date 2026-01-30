"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Send } from "lucide-react";

export default function Contact() {
    const sectionRef = useRef(null);
    const formRef = useRef(null);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(formRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <section id="contact" ref={sectionRef} className="py-24 bg-black text-white relative">
            <div className="container mx-auto px-6 max-w-4xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center gradient-text">Let's Connect</h2>
                <p className="text-center text-gray-400 mb-12 text-lg">
                    Have a project in mind or just want to discuss AI? Drop me a message!
                </p>

                <div ref={formRef} className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 backdrop-blur-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-primary transition-colors text-white"
                                    placeholder="Enter your Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-primary transition-colors text-white"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                            <textarea
                                id="message"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                                rows={5}
                                className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg focus:outline-none focus:border-primary transition-colors text-white resize-none"
                                placeholder="Enter your message"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || submitted}
                            className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${submitted ? "bg-green-500 text-white" : "bg-primary hover:bg-primary/90 text-white"
                                }`}
                        >
                            {isSubmitting ? (
                                <span className="animate-pulse">Sending...</span>
                            ) : submitted ? (
                                <span>Message Sent!</span>
                            ) : (
                                <>
                                    Send Message <Send size={20} />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
