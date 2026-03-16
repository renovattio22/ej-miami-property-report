"use client";

import { motion } from "framer-motion";
import StaggerChildren, { staggerItem } from "@/components/ui/StaggerChildren";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { kpiMetrics } from "@/data/computed";

export default function HeroKpiStrip() {
  return (
    <section
      className="relative overflow-hidden noise-overlay"
      id="overview"
      style={{
        background: "linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 50%, var(--navy-mid) 100%)",
      }}
    >
      <div className="container-luxury py-16 md:py-24 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12"
        >
          <div className="section-label section-label--gold">Portfolio Overview</div>
          <h1 className="font-heading text-[48px] md:text-[64px] font-semibold uppercase tracking-[2px] text-white mt-2 leading-[1.05] shimmer-text">
            Listings
          </h1>
          <p className="text-white/40 text-[13px] md:text-[14px] tracking-[3px] uppercase mt-3 font-medium">
            54 Active Properties &nbsp;|&nbsp; Brickell, The Roads &amp; Surrounding
          </p>
        </motion.div>

        {/* KPI Grid */}
        <StaggerChildren
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          stagger={0.06}
        >
          {kpiMetrics.map((kpi, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="glass-card px-4 py-6 text-center group transition-colors duration-300 hover:border-[var(--gold)]/30"
            >
              <div className="font-heading text-[28px] md:text-[36px] font-semibold text-[var(--gold)] tracking-tight leading-none">
                <AnimatedCounter value={kpi.value} />
              </div>
              <div className="font-body text-[10px] md:text-[11px] text-white/50 uppercase tracking-[2.5px] mt-3 font-medium">
                {kpi.label}
              </div>
              <div className="text-[11px] text-white/30 mt-1.5">
                {kpi.sub}
              </div>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
