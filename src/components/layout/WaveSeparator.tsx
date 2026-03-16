"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface WaveSeparatorProps {
  topColor?: string;
  fillColor?: string;
  flip?: boolean;
}

export default function WaveSeparator({
  topColor = "var(--navy)",
  fillColor = "var(--white)",
  flip = false,
}: WaveSeparatorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  const path = flip
    ? "M0,40 C360,0 720,80 1080,40 C1260,20 1380,30 1440,40 L1440,80 L0,80 Z"
    : "M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z";

  return (
    <div
      ref={ref}
      className="w-full h-[80px] relative overflow-hidden"
      style={{ background: topColor }}
    >
      <motion.svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute bottom-0 w-full h-[80px]"
        style={{ y }}
      >
        <path d={path} fill={fillColor} />
      </motion.svg>
    </div>
  );
}
