"use client";

import { motion } from "framer-motion";
import StaggerChildren, { staggerItem } from "@/components/ui/StaggerChildren";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { kpiMetrics } from "@/data/computed";

export default function HeroKpiStrip() {
  return (
    <section className="py-[50px] px-5 md:px-10 text-center" id="overview">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">Portfolio Overview</div>
        <div className="section-title">Listings</div>
      </motion.div>

      <StaggerChildren
        className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5 mt-8"
        stagger={0.12}
      >
        {kpiMetrics.map((kpi, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            className="bg-white border border-[var(--border)] rounded-sm px-4 py-6 text-center relative group cursor-default"
            whileHover={{
              borderColor: "var(--navy)",
              y: -3,
              boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="font-heading text-[30px] font-semibold text-[var(--navy)] tracking-tight">
              <AnimatedCounter value={kpi.value} />
            </div>
            <div className="font-body text-[12px] text-[var(--text-light)] uppercase tracking-[2.5px] mt-1.5">
              {kpi.label}
            </div>
            <div className="text-[12px] text-[var(--text-dim)] mt-1">
              {kpi.sub}
            </div>
            {/* Gold underline on hover */}
            <motion.div
              className="absolute bottom-0 left-1/2 h-0.5 bg-[var(--gold)]"
              initial={{ width: 0, x: "-50%" }}
              whileHover={{ width: "60%" }}
              style={{ translateX: "-50%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </StaggerChildren>
    </section>
  );
}
