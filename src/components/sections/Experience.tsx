"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience, education } from "@/data/experience";

export default function Experience() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".experience-item", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
                x: -50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="experience" ref={sectionRef} className="py-24 bg-zinc-950 text-white relative">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center gradient-text">Journey So Far</h2>

                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Experience */}
                    <div>
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <span className="w-8 h-1 bg-primary rounded-full"></span> Experience
                        </h3>
                        <div className="border-l-2 border-zinc-800 ml-4 pl-8 space-y-12">
                            {experience.map((exp, index) => (
                                <div key={index} className="experience-item relative">
                                    <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-zinc-900 border-2 border-primary"></span>
                                    <div className="mb-2">
                                        <h4 className="text-xl font-bold text-white">{exp.role}</h4>
                                        <p className="text-primary">{exp.company}</p>
                                    </div>
                                    <span className="text-sm text-gray-500 mb-4 block">{exp.period}</span>
                                    <p className="text-gray-400">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    <div>
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <span className="w-8 h-1 bg-secondary rounded-full"></span> Education
                        </h3>
                        <div className="border-l-2 border-zinc-800 ml-4 pl-8 space-y-12">
                            {education.map((edu, index) => (
                                <div key={index} className="experience-item relative">
                                    <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-zinc-900 border-2 border-secondary"></span>
                                    <div className="mb-2">
                                        <h4 className="text-xl font-bold text-white">{edu.degree}</h4>
                                        <p className="text-secondary">{edu.institution}</p>
                                    </div>
                                    <span className="text-sm text-gray-500 mb-4 block">{edu.period}</span>
                                    <p className="text-gray-400">{edu.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
