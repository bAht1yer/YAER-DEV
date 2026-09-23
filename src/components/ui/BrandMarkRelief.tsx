"use client";

import { useId } from "react";

/** Lightweight relief rendering while WebGL loads, or when it is unavailable. */
export default function BrandMarkRelief() {
  const id = useId().replace(/:/g, "");
  const shape =
    "M0 0h19l18 25-15 17L0 6ZM44 0h20L25 47 8 57Zm-19 51 20-23-8 35-20 9Z";
  return (
    <svg viewBox="-12 -9 94 102" className="brand-relief" aria-hidden="true">
      <defs>
        <linearGradient
          id={`${id}-face`}
          x1="0"
          y1="0"
          x2="64"
          y2="72"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f5ffb3" />
          <stop offset=".23" stopColor="#dfff00" />
          <stop offset=".48" stopColor="#a2b920" />
          <stop offset=".55" stopColor="#efff86" />
          <stop offset=".7" stopColor="#dfff00" />
          <stop offset="1" stopColor="#6e7e11" />
        </linearGradient>
        <linearGradient
          id={`${id}-edge`}
          x1="0"
          y1="0"
          x2="65"
          y2="75"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#89946b" />
          <stop offset=".45" stopColor="#31382a" />
          <stop offset=".8" stopColor="#6a7652" />
          <stop offset="1" stopColor="#23271f" />
        </linearGradient>
      </defs>
      <ellipse cx="35" cy="85" rx="28" ry="3" fill="#000" opacity=".32" />
      <g transform="translate(2 0) skewY(-7)">
        {[6, 5, 4, 3, 2, 1].map((depth) => (
          <path
            key={depth}
            d={shape}
            transform={`translate(${depth} ${depth * 0.65})`}
            fill={`url(#${id}-edge)`}
            stroke="#404932"
            strokeWidth=".4"
          />
        ))}
        <path
          d={shape}
          fill={`url(#${id}-face)`}
          stroke="#e5f59d"
          strokeWidth=".55"
          strokeLinejoin="round"
        />
        <path
          d="M1 1h17l18 24M45 1h17L25 45M44 30l-8 32-18 9"
          fill="none"
          stroke="#f5ffd0"
          strokeWidth=".7"
          opacity=".8"
        />
      </g>
    </svg>
  );
}
