"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/data/skills";

export default function Skills() {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".skill-category", {
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="skills" ref={sectionRef} className="py-24 bg-zinc-950 text-white relative">
            <div ref={triggerRef} className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center gradient-text">Technical Arsenal</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {skills.map((category, index) => (
                        <div key={index} className="skill-category bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 hover:border-primary/50 transition-colors duration-300">
                            <h3 className="text-xl font-bold mb-4 text-primary">{category.category}</h3>
                            <div className="flex flex-wrap gap-2">
                                {category.items.map((item, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 bg-zinc-800 rounded-full text-sm hover:bg-white hover:text-black transition-colors cursor-default"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
