import React from "react";

interface FormInputProps {
  type?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Standardized form input used in AdmissionsSection.
 */
export default function FormInput({ 
  type = "text", 
  placeholder = "", 
  className = "",
  value,
  onChange
}: FormInputProps) {
  return (
    <input 
      type={type} 
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full bg-white/50 border border-[#2c2b7c]/20 rounded-xl px-4 py-3 text-sm text-[#2c2b7c] placeholder-[#2c2b7c]/40 focus:outline-none focus:border-[#2c2b7c] focus:ring-1 focus:ring-[#2c2b7c] focus:bg-white transition-all shadow-sm ${className}`}
    />
  );
}
