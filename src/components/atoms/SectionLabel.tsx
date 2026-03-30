import React from "react";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Small uppercase tracking label used across all section headers.
 * Standardizes the `text-[10px] font-bold tracking-[0.2em] uppercase text-[#555]` pattern.
 */
export default function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <span className={`text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[#555] ${className}`}>
      {children}
    </span>
  );
}
