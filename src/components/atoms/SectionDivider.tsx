import React from "react";

/**
 * Spacer divider used between sections on the home page.
 * Replaces 6 instances of `<div className="w-full h-[clamp(2rem,6vw,5rem)] bg-[#FAFAFA]" />`.
 */
export default function SectionDivider() {
  return <div className="w-full h-[clamp(2rem,6vw,5rem)] bg-[#FAFAFA]" />;
}
