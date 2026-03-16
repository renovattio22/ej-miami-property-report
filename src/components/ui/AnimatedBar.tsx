"use client";

import { motion } from "framer-motion";

interface AnimatedBarProps {
  label: string;
  value: number;
  maxValue: number;
  displayValue: string;
  color?: string;
  gradientTo?: string;
  delay?: number;
}

function lightenColor(hex: string, amount: number = 0.3): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (num >> 16) + Math.round(255 * amount));
  const g = Math.min(255, ((num >> 8) & 0x00ff) + Math.round(255 * amount));
  const b = Math.min(255, (num & 0x0000ff) + Math.round(255 * amount));
  return `rgb(${r}, ${g}, ${b})`;
}

export default function AnimatedBar({
  label,
  value,
  maxValue,
  displayValue,
  color = "#192E5A",
  gradientTo,
  delay = 0,
}: AnimatedBarProps) {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const endColor = gradientTo || lightenColor(color, 0.2);

  return (
    <div className="flex items-center mb-3.5 gap-3">
      <div className="min-w-[100px] max-w-[170px] w-[170px] text-[13px] text-[var(--text)] flex-shrink-0 text-right font-medium truncate">
        {label}
      </div>
      <div className="flex-1 h-[34px] bg-[var(--navy)]/[0.04] rounded-md overflow-hidden relative">
        <motion.div
          className="h-full rounded-md flex items-center pl-3 text-[11px] font-semibold text-white"
          style={{
            background: `linear-gradient(90deg, ${color}, ${endColor})`,
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 1.2,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {percentage > 30 && (
            <span className="whitespace-nowrap opacity-90">{displayValue}</span>
          )}
        </motion.div>
      </div>
      <div className="w-[80px] text-[13px] font-semibold text-[var(--navy)] text-right flex-shrink-0 tabular-nums">
        {displayValue}
      </div>
    </div>
  );
}
