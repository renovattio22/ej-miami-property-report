"use client";

import { motion } from "framer-motion";

interface AnimatedBarProps {
  label: string;
  value: number;
  maxValue: number;
  displayValue: string;
  color?: string;
  delay?: number;
}

export default function AnimatedBar({
  label,
  value,
  maxValue,
  displayValue,
  color = "#192E5A",
  delay = 0,
}: AnimatedBarProps) {
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <div className="flex items-center mb-3 gap-3.5">
      <div className="w-[170px] text-[13px] text-[var(--text)] flex-shrink-0 text-right font-medium">
        {label}
      </div>
      <div className="flex-1 h-[30px] bg-[var(--light-gray)] rounded-sm overflow-hidden relative">
        <motion.div
          className="h-full rounded-sm flex items-center pl-3 text-[12px] font-bold text-white"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 1.2,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {percentage > 25 && displayValue}
        </motion.div>
      </div>
      <div className="w-[90px] text-[13px] font-semibold text-[var(--navy)] text-right flex-shrink-0">
        {displayValue}
      </div>
    </div>
  );
}
