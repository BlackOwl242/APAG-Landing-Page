"use client";

import React, { useState, useEffect, useRef } from "react";

interface CustomSelectProps {
  value: string;
  options: string[];
  onChange: (val: string) => void;
  textSize?: string;
}

/**
 * Custom styled select dropdown molecule, extracted from ScoreCalculator.
 * Used for combo selection, major selection, priority inputs.
 */
export default function CustomSelect({ value, options, onChange, textSize = "text-lg" }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    // Đóng dropdown khi thao tác lăn chuột bên ngoài trang (tránh lỗi dính màn)
    const handleScroll = () => {
       if (isOpen) setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("wheel", handleScroll, { passive: true });
    
    return () => {
       document.removeEventListener("mousedown", handleClickOutside);
       window.removeEventListener("wheel", handleScroll);
    };
  }, [isOpen]);

  return (
    <div className="relative w-full" ref={ref}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-12 border-b-2 font-heading font-bold ${textSize} text-[#2c2b7c] bg-transparent cursor-pointer flex items-center justify-between pr-2 transition-colors ${isOpen ? 'border-[#ed1c29]' : 'border-black/20 hover:border-black/40'}`}
      >
         <span className="truncate select-none">{value}</span>
         <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180 text-[#ed1c29]' : 'text-[#2c2b7c]/50'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </div>

      {isOpen && (
        <div 
           className="absolute z-40 top-[calc(100%+4px)] left-0 w-full bg-white border border-black/10 shadow-[0_10px_40px_-10px_rgba(44,43,124,0.15)] rounded-sm max-h-[250px] overflow-y-auto animate-fade-in divide-y divide-black/5 overscroll-contain"
           onWheel={(e) => e.stopPropagation()} /* Chặn sự kiện lăn trang khi đang lăn trong menu */
           onTouchMove={(e) => e.stopPropagation()}
        >
           {options.map((opt) => (
              <div 
                key={opt}
                onClick={() => { onChange(opt); setIsOpen(false); }}
                className={`px-4 py-3 cursor-pointer transition-colors text-sm font-bold font-heading border-l-2 ${value === opt ? 'bg-[#FAFAFA] text-[#ed1c29] border-l-[#ed1c29]' : 'text-[#2c2b7c] hover:bg-[#FAFAFA] border-l-transparent'}`}
              >
                 {opt}
              </div>
           ))}
        </div>
      )}
    </div>
  );
}
