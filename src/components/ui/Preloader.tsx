"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
    const [loading, setLoading] = useState(true);
    const counterRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                setLoading(false);
            }
        });

        tl.to(counterRef.current, {
            innerText: 100,
            duration: 2,
            snap: { innerText: 1 },
            ease: "power2.inOut",
            onUpdate: function () {
                if (counterRef.current) {
                    counterRef.current.innerText = Math.round(Number(this.targets()[0].innerText)) + "%";
                }
            }
        })
            .to(containerRef.current, {
                y: "-100%",
                duration: 0.8,
                ease: "power3.inOut",
                delay: 0.2
            });

    }, []);

    if (!loading) return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] bg-black flex items-center justify-center text-white">
            <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-bold font-mono tracking-tighter mb-4">
                    KSJ<span className="text-primary">.</span>
                </h1>
                <div ref={counterRef} className="text-xl md:text-2xl font-mono text-gray-400">
                    0%
                </div>
            </div>
        </div>
    );
}
