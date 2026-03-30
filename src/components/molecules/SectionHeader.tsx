import React from "react";
import SectionLabel from "@/components/atoms/SectionLabel";

interface SectionHeaderProps {
  label: string;
  rightLabel?: string;
  className?: string;
}

/**
 * Standard section header layout: label left + optional right label + bottom border.
 * Used across: About, Branches, Programs, History, Financial sections.
 */
export default function SectionHeader({ label, rightLabel, className = "" }: SectionHeaderProps) {
  return (
    <div className={`flex items-end justify-between border-b-2 border-[#2c2b7c]/20 pb-4 ${className}`}>
      <h2 className="font-heading text-lg md:text-2xl font-black uppercase tracking-wider text-[#2c2b7c]">
        {label}
      </h2>
      {rightLabel && (
        <SectionLabel>{rightLabel}</SectionLabel>
      )}
    </div>
  );
}
