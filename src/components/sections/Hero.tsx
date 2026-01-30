"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroBackground from "@/components/canvas/HeroBackground";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(
            textRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 }
        );
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
            <HeroBackground />

            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 text-white leading-tight">
                    Hi, I’m Koushik — <br />
                    <span className="gradient-text">AI & Full-Stack Developer</span> <br />
                    Building the Future.
                </h1>
                <div ref={textRef} className="space-y-6">
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        I specialize in <span className="text-white">AI/ML</span>, <span className="text-white">full-stack web apps</span>, and <span className="text-white">cross-platform mobile apps</span>.
                        I combine cutting-edge technologies with clean design to build usable and scalable products.
                    </p>
                    <p className="text-sm md:text-base text-gray-500 italic">
                        &quot;My passion is turning complex problems into elegant solutions that people love to use.&quot;
                    </p>
                </div>

                <div className="mt-10 flex gap-4 justify-center">
                    <a href="#projects" className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
                        View Work
                    </a>
                    <a href="#contact" className="px-8 py-3 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
                        Contact Me
                    </a>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                <ArrowDown className="text-white opacity-50" size={32} />
            </div>
        </section>
    );
}
