"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function InteractiveGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Center initially
    gsap.set(container, { "--x": "50%", "--y": "50%" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // Calculate cursor position relative to this container
      // This ensures the spotlight stays under the mouse even when scrolling
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(container, {
        "--x": `${x}px`,
        "--y": `${y}px`,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute top-0 left-0 w-full h-[120%] pointer-events-none z-0 overflow-hidden"
    >
      <div 
        className="w-full h-full opacity-60"
        style={{
          // Creates a denser grid pattern forming vertical rectangles
          backgroundImage: `
            linear-gradient(to right, rgba(14, 15, 15, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(14, 15, 15, 0.15) 1px, transparent 1px)
          `,
          // Size: width creates 16 columns (6.25vw), height creates 6 rows (16.6vh) -> forming dense vertical rectangles
          backgroundSize: "clamp(40px, 6.25vw, 100px) clamp(70px, 16.66vh, 150px)",
          // Spotlight effect tracking the CSS variables updated by GSAP
          maskImage: "radial-gradient(circle 450px at var(--x, 50%) var(--y, 50%), black 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle 450px at var(--x, 50%) var(--y, 50%), black 0%, transparent 100%)",
        }}
      ></div>
    </div>
  );
}
