"use client";

import { motion } from "framer-motion";
import StaggerChildren, { staggerItem } from "@/components/ui/StaggerChildren";
import { insights } from "@/data/computed";

export default function AiInsights() {
  return (
    <section
      className="py-16 md:py-20"
      id="insights"
      style={{
        background: "linear-gradient(135deg, #faf8f3 0%, #ffffff 50%, #f0f0f8 100%)",
      }}
    >
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="section-label">Intelligence</div>
          <div className="section-title">AI-Generated Insights</div>
        </motion.div>

        <StaggerChildren
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
          stagger={0.08}
        >
          {insights.map((insight, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="bg-white/70 backdrop-blur-sm border border-white/60 rounded-xl p-7 relative overflow-hidden shadow-[var(--shadow-lg)] group"
            >
              {/* Top gradient accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{
                  background: "linear-gradient(90deg, var(--navy), var(--gold), var(--navy))",
                }}
              />

              <div className="w-12 h-12 rounded-full bg-[var(--navy)]/[0.05] flex items-center justify-center text-[22px] mb-4">
                {insight.icon}
              </div>
              <div className="font-heading text-[15px] font-medium uppercase tracking-[1px] mb-2 text-[var(--text)]">
                {insight.title}
              </div>
              <div className="font-heading text-[24px] font-semibold text-[var(--gold)] my-2">
                {insight.metric}
              </div>
              <p className="text-[13px] text-[var(--text-muted)] leading-[1.7]">
                {insight.body}
              </p>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
