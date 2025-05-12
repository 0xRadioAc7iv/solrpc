import React, { useState } from "react";
import { Sparkles } from "lucide-react";

interface GradientButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  icon?: boolean;
}

export default function GradientButton({ 
  text, 
  onClick, 
  className = "", 
  icon = true 
}: GradientButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative group overflow-hidden
        px-6 py-2 rounded-xl
        bg-gray-900
        text-gray-600 font-medium text-lg shadow-sm shadow-gray-800 border border-gray-700
        flex items-center justify-center gap-2
        transition-all duration-300
        hover:shadow-[0_0_25px_rgba(149,76,233,0.7)]
        ${className}
      `}
    >
      {/* Gradient overlay on hover */}
      <div
        className={`
          absolute inset-0 
          bg-gradient-to-r from-purple-600 to-purple-400
          opacity-0 group-hover:opacity-100
          transition-all duration-300 ease-in-out
        `}
      />

      {/* Glow effect */}
      <div
        className={`
          absolute inset-0 
          bg-gradient-to-r from-purple-600/80 to-purple-400/80
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        `}
      />

      {/* Sparkle icon */}
      {icon && (
        <Sparkles
          className={`
            w-5 h-5 transition-transform duration-300 relative z-10
            ${isHovered ? "scale-110" : "scale-100"}
          `}
        />
      )}

      {/* Button text */}
      <span className="relative z-10">{text}</span>

      {/* Cursor indicator on hover */}
      <div
        className={`
          absolute right-4 bottom-3
          w-3 h-3 bg-white/80 rounded-full
          opacity-0 group-hover:opacity-100
          transition-all duration-300
          ${isHovered ? "scale-100" : "scale-0"}
        `}
      />
    </button>
  );
}