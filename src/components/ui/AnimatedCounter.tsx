"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useTransform, animate, motion } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

function extractNumber(str: string): { prefix: string; number: number; suffix: string; hasDecimal: boolean } {
  const match = str.match(/^([^0-9]*)([\d,.]+)(.*)$/);
  if (!match) return { prefix: str, number: 0, suffix: "", hasDecimal: false };
  const numStr = match[2].replace(/,/g, "");
  return {
    prefix: match[1],
    number: parseFloat(numStr),
    suffix: match[3],
    hasDecimal: numStr.includes("."),
  };
}

export default function AnimatedCounter({ value, className = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(value);
  const parsed = extractNumber(value);

  useEffect(() => {
    if (!isInView || parsed.number === 0) {
      setDisplayValue(value);
      return;
    }

    const controls = animate(0, parsed.number, {
      duration: 1.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (latest) => {
        if (parsed.hasDecimal) {
          setDisplayValue(parsed.prefix + latest.toFixed(1) + parsed.suffix);
        } else {
          setDisplayValue(
            parsed.prefix + Math.round(latest).toLocaleString() + parsed.suffix
          );
        }
      },
      onComplete: () => {
        setDisplayValue(value);
      },
    });

    return () => controls.stop();
  }, [isInView, value, parsed.number, parsed.prefix, parsed.suffix, parsed.hasDecimal]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3 }}
    >
      {isInView ? displayValue : value}
    </motion.span>
  );
}
