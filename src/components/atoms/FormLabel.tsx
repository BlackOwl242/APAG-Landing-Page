import React from "react";

interface FormLabelProps {
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

/**
 * Standardized form label used in AdmissionsSection.
 */
export default function FormLabel({ children, required = false, className = "" }: FormLabelProps) {
  return (
    <label className={`text-xs font-bold text-[#2c2b7c] uppercase tracking-wide ${className}`}>
      {children} {required && <span className="text-[#ed1c29]">*</span>}
    </label>
  );
}
