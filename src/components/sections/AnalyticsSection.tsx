"use client";

import { motion } from "framer-motion";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import AnimatedBar from "@/components/ui/AnimatedBar";
import { neighborhoodData, pricePerSqftData } from "@/data/computed";

export default function AnalyticsSection() {
  const neighborhoodMax = Math.max(...neighborhoodData.map((d) => d.value));
  const psfMax = Math.max(...pricePerSqftData.map((d) => d.value));

  return (
    <section className="py-16 md:py-20 bg-[var(--off-white)] grid-pattern" id="analytics">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-1">
            <span className="w-1 h-5 bg-[var(--gold)] rounded-full" />
            <span className="section-label">Market Analysis</span>
          </div>
          <div className="section-title text-left">Analytics</div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <RevealOnScroll delay={0.1}>
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-[var(--shadow-md)]">
              <h3 className="font-body text-[13px] text-[var(--text-light)] uppercase tracking-[2.5px] mb-6 font-medium pb-3 border-b border-[var(--border-light)]">
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
                  delay={i * 0.06}
                />
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-[var(--shadow-md)]">
              <h3 className="font-body text-[13px] text-[var(--text-light)] uppercase tracking-[2.5px] mb-6 font-medium pb-3 border-b border-[var(--border-light)]">
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
                  delay={i * 0.08}
                />
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
