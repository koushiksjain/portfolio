"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        const onMouseMove = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: "power2.out"
            });
        };

        window.addEventListener("mousemove", onMouseMove);

        // Add hover effect for links/buttons
        const handleHoverStart = () => {
            gsap.to(cursor, { scale: 0.5, opacity: 0 });
            gsap.to(follower, { scale: 3, borderColor: "#d946ef", borderWidth: 1, backgroundColor: "rgba(217, 70, 239, 0.1)" });
        };

        const handleHoverEnd = () => {
            gsap.to(cursor, { scale: 1, opacity: 1 });
            gsap.to(follower, { scale: 1, borderColor: "#ffffff", borderWidth: 1, backgroundColor: "transparent" });
        };

        const interactiveElements = document.querySelectorAll("a, button, input, textarea");
        interactiveElements.forEach(el => {
            el.addEventListener("mouseenter", handleHoverStart);
            el.addEventListener("mouseleave", handleHoverEnd);
        });

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            interactiveElements.forEach(el => {
                el.removeEventListener("mouseenter", handleHoverStart);
                el.removeEventListener("mouseleave", handleHoverEnd);
            });
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-50 mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
            ></div>
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-50 mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 hidden md:block transition-colors"
            ></div>
        </>
    );
}
