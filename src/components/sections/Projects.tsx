"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

export default function Projects() {
    const sectionRef = useRef(null);

    // Mouse position for tilt effect
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Rotate values
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
            transformPerspective: 1000,
            transformOrigin: "center"
        });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray(".project-card");

            gsap.set(cards, { opacity: 0, y: 100 });

            ScrollTrigger.batch(cards as Element[], {
                onEnter: (elements) => {
                    gsap.to(elements, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power4.out",
                        overwrite: true
                    });
                },
                once: true
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="projects" ref={sectionRef} className="py-24 bg-black text-white relative">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center gradient-text">Featured Projects</h2>

                {(!projects || projects.length === 0) && (
                    <p className="text-center text-gray-500">No projects loaded.</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="project-card group relative bg-zinc-900/50 rounded-2xl border border-zinc-800 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-colors duration-300 transform-gpu preserve-3d"
                            onMouseMove={(e) => handleMouseMove(e, index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="h-48 bg-zinc-800/80 relative overflow-hidden flex items-center justify-center">
                                {/* Fallback pattern or Image */}
                                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black opacity-80 z-0"></div>
                                <div className="z-10 text-6xl transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                                    {project.title.includes("Vision") ? <Image src="/vision.jpeg" alt="Vision" width={500} height={500} /> :
                                        project.title.includes("Movie") ? <Image src="/movie.jpeg" alt="Movie" width={500} height={500} /> :
                                            project.title.includes("Resume") ? <Image src="/resume.jpeg" alt="Resume" width={500} height={500} /> :
                                                project.title.includes("Tastsee") ? <Image src="/recipe.jpeg" alt="Recipe" width={500} height={500} /> :
                                                    <Image src="/timetable.jpeg" alt="Timetable" width={500} height={500} />}
                                </div>

                                {/* Overlay effect */}
                                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"></div>
                            </div>

                            <div className="p-6 relative z-10 bg-zinc-900/90 h-full">
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                                <p className="text-gray-400 mb-6 line-clamp-3 text-sm leading-relaxed">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="text-xs px-2.5 py-1 bg-zinc-800 rounded-full border border-zinc-700 text-gray-300 group-hover:border-primary/30 transition-colors">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-4 mt-auto">
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors hover:translate-x-1 duration-200">
                                        <Github size={18} /> Code
                                    </a>
                                    {project.demo && project.demo !== "#" && (
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors hover:translate-x-1 duration-200">
                                            <ExternalLink size={18} /> Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Glow effect border bottom */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
