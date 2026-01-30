"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
export default function About() {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const el = sectionRef.current;

        gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, []);

    return (
        <section id="about" ref={sectionRef} className="py-24 bg-black text-white relative overflow-hidden">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center gradient-text">About Me</h2>

                <div ref={contentRef} className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative aspect-square rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden">
                            {/* Placeholder for Profile Image */}
                            <div className="text-6xl">
                                <Image
                                    src="/profile.jpeg"
                                    alt="Profile"
                                    width={500}
                                    height={500}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 text-lg text-gray-300">
                        <p>
                            I’m Koushik S Jain, an <span className="text-primary font-semibold">Emerging Tech Developer</span>, <span className="text-secondary font-semibold">Full Stack Developer</span>, and <span className="text-accent font-semibold">AI/ML Enthusiast</span>.
                        </p>
                        <p>
                            I’m a graduate from RNS Institute of Technology with a B.Tech in Artificial Intelligence & Machine Learning.
                            I possess strong expertise in full-stack development and mobile app engineering, utilizing frameworks like Next.js, Flutter, and React within my projects.
                        </p>
                        <p>
                            I combine AI, computer vision, and scalable web/mobile technologies to create meaningful products that solve real problems.
                            I enjoy turning complex technical challenges into simple, scalable, real-world solutions.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
