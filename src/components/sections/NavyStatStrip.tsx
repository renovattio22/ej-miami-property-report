"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import StaggerChildren, { staggerItem } from "@/components/ui/StaggerChildren";

interface NavyStatStripProps {
  stats: { val: string; lbl: string }[];
}

export default function NavyStatStrip({ stats }: NavyStatStripProps) {
  return (
    <div className="bg-[var(--navy)] py-6 px-5 md:px-10">
      <StaggerChildren
        className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
        stagger={0.15}
      >
        {stats.map((stat, i) => (
          <motion.div key={i} variants={staggerItem} className="text-center">
            <div className="font-heading text-[28px] font-semibold text-[var(--gold)]">
              <AnimatedCounter value={stat.val} />
            </div>
            <div className="text-[11px] text-white/60 uppercase tracking-[2px] mt-0.5">
              {stat.lbl}
            </div>
          </motion.div>
        ))}
      </StaggerChildren>
    </div>
  );
}
