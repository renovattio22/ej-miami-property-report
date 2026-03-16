"use client";

import { motion } from "framer-motion";
import StaggerChildren, { staggerItem } from "@/components/ui/StaggerChildren";
import { insights } from "@/data/computed";

export default function AiInsights() {
  return (
    <section className="py-10 px-5 md:px-10" id="insights">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="section-label">Intelligence</div>
        <div className="section-title">AI-Generated Insights</div>
      </motion.div>

      <StaggerChildren
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8"
        stagger={0.12}
      >
        {insights.map((insight, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            className="bg-white border border-[var(--border)] rounded-sm p-7 relative overflow-hidden shadow-[var(--shadow)] group"
            whileHover={{
              y: -2,
              boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--navy)]" />

            <div className="text-[28px] mb-3.5">{insight.icon}</div>
            <div className="font-heading text-[16px] font-medium uppercase tracking-[1px] mb-2 text-[var(--text)]">
              {insight.title}
            </div>
            <div className="font-heading text-[26px] font-semibold text-[var(--navy)] my-2">
              {insight.metric}
            </div>
            <p className="text-[14px] text-[var(--text-muted)] leading-[1.7]">
              {insight.body}
            </p>
          </motion.div>
        ))}
      </StaggerChildren>
    </section>
  );
}
