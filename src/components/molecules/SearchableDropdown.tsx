"use client";

import React, { useState, useRef, useEffect } from "react";

interface SearchableDropdownProps<T> {
  items: T[];
  selectedValue: string | null;
  placeholder: string;
  searchPlaceholder: string;
  filterFn: (item: T, query: string) => boolean;
  renderItem: (item: T, isSelected: boolean) => React.ReactNode;
  getKey: (item: T) => string;
  onSelect: (item: T) => void;
  renderSelectedLabel?: (item: T) => string;
  className?: string;
}

/**
 * Searchable dropdown molecule used by AdmissionsSection for both
 * programs and provinces dropdowns.
 */
export default function SearchableDropdown<T>({
  items,
  selectedValue,
  placeholder,
  searchPlaceholder,
  filterFn,
  renderItem,
  getKey,
  onSelect,
  className = "",
}: SearchableDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredItems = items.filter(item => filterFn(item, searchQuery));

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div 
        className={`w-full bg-white/50 border ${isOpen ? 'border-[#2c2b7c] ring-1 ring-[#2c2b7c]' : 'border-[#2c2b7c]/20'} rounded-xl px-4 py-3 text-sm transition-all shadow-sm flex items-center justify-between cursor-pointer select-none`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedValue ? "text-[#2c2b7c] font-semibold" : "text-[#2c2b7c]/60"}>
          {selectedValue || placeholder}
        </span>
        <svg className={`w-4 h-4 text-[#2c2b7c] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white/95 backdrop-blur-xl border border-[#2c2b7c]/10 rounded-xl shadow-2xl z-[100] flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          
          <div className="p-3 border-b border-[#2c2b7c]/10 bg-[#FAFAFA]">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2c2b7c]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                autoFocus
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#2c2b7c]/20 rounded-lg pl-9 pr-4 py-2 text-sm text-[#2c2b7c] placeholder-[#2c2b7c]/40 outline-none focus:border-[#2c2b7c] focus:ring-1 focus:ring-[#2c2b7c] transition-all"
              />
            </div>
          </div>

          <div className="max-h-[250px] overflow-y-auto w-full flex flex-col py-1 pr-1 custom-scrollbar" data-lenis-prevent="true">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={getKey(item)}
                  onClick={() => {
                    onSelect(item);
                    setIsOpen(false);
                    setSearchQuery("");
                  }}
                  className="cursor-pointer transition-colors"
                >
                  {renderItem(item, getKey(item) === selectedValue)}
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-sm text-[#555] italic">
                Không tìm thấy kết quả hợp lệ!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
