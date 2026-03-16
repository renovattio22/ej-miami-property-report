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
  const y1 = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-4, 14]);

  const path1 = flip
    ? "M0,50 C360,10 720,90 1080,50 C1260,30 1380,40 1440,50 L1440,120 L0,120 Z"
    : "M0,50 C360,90 720,10 1080,50 C1260,70 1380,60 1440,50 L1440,120 L0,120 Z";

  const path2 = flip
    ? "M0,60 C400,20 800,100 1200,55 C1320,40 1400,50 1440,60 L1440,120 L0,120 Z"
    : "M0,60 C400,100 800,20 1200,55 C1320,75 1400,65 1440,60 L1440,120 L0,120 Z";

  return (
    <div
      ref={ref}
      className="w-full h-[120px] relative overflow-hidden"
      style={{ background: topColor }}
    >
      <motion.svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute bottom-0 w-full h-[120px]"
        style={{ y: y2, willChange: "transform" }}
      >
        <path d={path2} fill={fillColor} opacity={0.4} />
      </motion.svg>
      <motion.svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute bottom-0 w-full h-[120px]"
        style={{ y: y1, willChange: "transform" }}
      >
        <path d={path1} fill={fillColor} />
      </motion.svg>
    </div>
  );
}
