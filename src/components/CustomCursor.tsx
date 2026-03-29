"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Follow mouse
    const moveCursor = (e: MouseEvent) => {
      // Dot moves instantly
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
      // Ring follows with a slight delay
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    // Initial center offset to ensure they center on mouse
    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border-2 border-[#2c2b7c] pointer-events-none z-[9999] rounded-full hidden md:block opacity-50"
        style={{ willChange: "transform" }}
      ></div>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[#ed1c29] pointer-events-none z-[9999] rounded-full hidden md:block"
        style={{ willChange: "transform" }}
      ></div>
    </>
  );
}
