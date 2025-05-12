"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GlowArcProps {
  className?: string;
  pulseEffect?: boolean;
}

export const GlowArc = ({ className, pulseEffect = true }: GlowArcProps) => {
  const arcRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!pulseEffect || !arcRef.current) return;

    // Create subtle pulsing animation for the glow
    const glowElements = arcRef.current.querySelectorAll(".glow-element");

    glowElements.forEach((element, index) => {
      const animationDelay = index * 0.7; // Stagger animations
      const animate = () => {
        const el = element as SVGElement;
        el.style.opacity = "0.6";

        setTimeout(() => {
          el.style.opacity = "1";
          setTimeout(animate, 3000);
        }, 1500);
      };

      setTimeout(() => animate(), animationDelay * 1000);
    });
  }, [pulseEffect]);

  return (
    <div className={cn("w-full h-full relative overflow-hidden", className)}>
      <svg
        ref={arcRef}
        viewBox="0 0 100 50"
        className="w-full h-full"
        preserveAspectRatio="xMidYMin slice"
      >
        {/* Enhanced filter definitions for more vibrant glow */}
        <defs>
          <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#071330" />
            <stop offset="50%" stopColor="#0a2253" />
            <stop offset="100%" stopColor="#071330" />
          </linearGradient>

          <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0036c6" />
            <stop offset="50%" stopColor="#2276ff" />
            <stop offset="100%" stopColor="#0036c6" />
          </linearGradient>

          <linearGradient
            id="brightGlowGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#2276ff" />
            <stop offset="50%" stopColor="#58a0ff" />
            <stop offset="100%" stopColor="#2276ff" />
          </linearGradient>

          <radialGradient
            id="centerGlow"
            cx="50%"
            cy="0%"
            r="70%"
            fx="50%"
            fy="0%"
          >
            <stop offset="0%" stopColor="#58a0ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Base arc */}
        <path
          d="M0,50 L100,50 A50,50 0 0,0 0,50"
          fill="url(#arcGradient)"
          className="drop-shadow-lg"
        />

        {/* Subtle radial glow from center of arc */}
        <ellipse
          cx="50"
          cy="0"
          rx="60"
          ry="30"
          fill="url(#centerGlow)"
          className="opacity-50"
        />

        {/* Primary glow layer */}
        <path
          d="M0,50 A50,50 0 0,1 100,50"
          fill="none"
          stroke="url(#glowGradient)"
          strokeWidth="0.8"
          filter="url(#enhanced-glow)"
          className="opacity-90 glow-element"
          style={{ transition: "opacity 1.5s ease-in-out" }}
        />

        {/* Secondary brighter glow */}
        <path
          d="M0,50 A50,50 0 0,1 100,50"
          fill="none"
          stroke="url(#brightGlowGradient)"
          strokeWidth="0.4"
          filter="url(#enhanced-glow)"
          className="opacity-100 glow-element"
          style={{ transition: "opacity 1.5s ease-in-out" }}
        />

        {/* Tertiary intense thin glow - creates the sharp edge */}
        <path
          d="M0,50 A50,50 0 0,1 100,50"
          fill="none"
          stroke="#a9cdff"
          strokeWidth="0.15"
          filter="url(#enhanced-glow)"
          className="opacity-90 glow-element"
          style={{ transition: "opacity 1.5s ease-in-out" }}
        />
      </svg>
    </div>
  );
};
