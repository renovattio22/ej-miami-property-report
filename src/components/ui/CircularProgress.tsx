"use client";

import { motion } from "framer-motion";

interface CircularProgressProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label: string;
}

export default function CircularProgress({
  value,
  max,
  size = 64,
  strokeWidth = 4.5,
  color,
  label,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = value / max;
  const resolvedColor = color || (value >= max * 0.8 ? "var(--gold)" : "var(--navy)");

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--light-gray)"
            strokeWidth={strokeWidth}
          />
          {/* Animated foreground circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={resolvedColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: circumference * (1 - percentage) }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{
              duration: 1.2,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        </svg>
        {/* Center value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading text-[15px] font-semibold text-[var(--text)]">
            {value}
          </span>
        </div>
      </div>
      <span className="text-[10px] text-[var(--text-dim)] uppercase tracking-[0.5px] text-center leading-tight max-w-[60px]">
        {label}
      </span>
    </div>
  );
}
