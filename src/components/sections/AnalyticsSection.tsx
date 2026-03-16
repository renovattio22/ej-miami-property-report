"use client";

import { motion } from "framer-motion";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import AnimatedBar from "@/components/ui/AnimatedBar";
import { neighborhoodData, pricePerSqftData } from "@/data/computed";

export default function AnalyticsSection() {
  const neighborhoodMax = Math.max(...neighborhoodData.map((d) => d.value));
  const psfMax = Math.max(...pricePerSqftData.map((d) => d.value));

  return (
    <section className="py-10 px-5 md:px-10 bg-[var(--off-white)]" id="analytics">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="section-label">Market Analysis</div>
        <div className="section-title">Analytics</div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <RevealOnScroll delay={0.1}>
          <div className="bg-white border border-[var(--border)] rounded-sm p-[30px] shadow-[var(--shadow)]">
            <h3 className="font-body text-[13px] text-[var(--text-light)] uppercase tracking-[3px] mb-5 font-medium">
              Price Distribution by Neighborhood
            </h3>
            {neighborhoodData.map((item, i) => (
              <AnimatedBar
                key={item.label}
                label={item.label}
                value={item.value}
                maxValue={neighborhoodMax}
                displayValue={item.displayValue}
                color={item.color}
                delay={i * 0.08}
              />
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div className="bg-white border border-[var(--border)] rounded-sm p-[30px] shadow-[var(--shadow)]">
            <h3 className="font-body text-[13px] text-[var(--text-light)] uppercase tracking-[3px] mb-5 font-medium">
              Price Per Sq Ft by Property Type
            </h3>
            {pricePerSqftData.map((item, i) => (
              <AnimatedBar
                key={item.label}
                label={item.label}
                value={item.value}
                maxValue={psfMax}
                displayValue={item.displayValue}
                color={item.color}
                delay={i * 0.1}
              />
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
