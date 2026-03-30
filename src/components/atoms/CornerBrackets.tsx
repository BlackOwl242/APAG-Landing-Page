import React from "react";

interface CornerBracketsProps {
  className?: string;
  size?: 'sm' | 'md';
  color?: string;
}

/**
 * Decorative corner bracket elements used across multiple sections
 * (AboutSection, Footer, ScoreCalculator, Nav overlay).
 */
export default function CornerBrackets({ 
  className = "", 
  size = "md",
  color = "border-[#2c2b7c]/30"
}: CornerBracketsProps) {
  const sizeClasses = size === 'sm' 
    ? "w-6 h-6 sm:w-8 sm:h-8" 
    : "w-8 h-8";
  
  const posClasses = size === 'sm'
    ? "top-4 left-4 sm:top-10 sm:left-10 md:top-20 md:left-20"
    : "top-10 left-10";

  return (
    <div className={className}>
      <div className={`absolute ${size === 'sm' ? 'top-4 left-4 sm:top-10 sm:left-10 md:top-20 md:left-20' : 'top-10 left-10'} ${sizeClasses} border-t-2 border-l-2 ${color}`}></div>
      <div className={`absolute ${size === 'sm' ? 'top-4 right-4 sm:top-10 sm:right-10 md:top-20 md:right-20' : 'top-10 right-10'} ${sizeClasses} border-t-2 border-r-2 ${color}`}></div>
      <div className={`absolute ${size === 'sm' ? 'bottom-4 left-4 sm:bottom-10 sm:left-10 md:bottom-20 md:left-20' : 'bottom-10 left-10'} ${sizeClasses} border-b-2 border-l-2 ${color}`}></div>
      <div className={`absolute ${size === 'sm' ? 'bottom-4 right-4 sm:bottom-10 sm:right-10 md:bottom-20 md:right-20' : 'bottom-10 right-10'} ${sizeClasses} border-b-2 border-r-2 ${color}`}></div>
    </div>
  );
}
