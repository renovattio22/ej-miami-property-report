"use client";

import AnimatedCounter from "@/components/ui/AnimatedCounter";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

interface NavyStatStripProps {
  stats: { val: string; lbl: string }[];
}

export default function NavyStatStrip({ stats }: NavyStatStripProps) {
  return (
    <div className="bg-[var(--navy-deep)] py-10 noise-overlay border-t border-b border-[var(--gold)]/[0.12]">
      <RevealOnScroll className="relative z-10">
        <div className="container-luxury flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {stats.map((stat, i) => (
            <div key={i} className="text-center min-w-[100px]">
              <div className="font-heading text-[32px] md:text-[34px] font-semibold text-[var(--gold)] tabular-nums">
                <AnimatedCounter value={stat.val} />
              </div>
              <div className="text-[11px] md:text-[12px] text-white/45 uppercase tracking-[2px] mt-1 font-medium">
                {stat.lbl}
              </div>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </div>
  );
}
