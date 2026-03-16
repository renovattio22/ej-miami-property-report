"use client";

import { motion } from "framer-motion";
import StaggerChildren, { staggerItem } from "@/components/ui/StaggerChildren";
import { neighborhoodScores } from "@/data/computed";

export default function LocationIntelligence() {
  return (
    <section className="py-10 px-5 md:px-10" id="location">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="section-label">Location Intelligence</div>
        <div className="section-title">Neighborhood Scores</div>
      </motion.div>

      <StaggerChildren
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
        stagger={0.15}
      >
        {neighborhoodScores.map((loc, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            className="bg-white border border-[var(--border)] rounded-sm p-6 shadow-[var(--shadow)] text-center"
            whileHover={{
              y: -2,
              boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-[32px] mb-2.5">{loc.icon}</div>
            <div className="font-heading text-[15px] font-medium uppercase tracking-[1px] mb-1">
              {loc.name}
            </div>
            <div className="text-[12px] text-[var(--text-dim)] mb-3">
              ZIP: {loc.zip}
            </div>

            {loc.scores.map((score, j) => (
              <div
                key={j}
                className="flex justify-between py-1.5 border-b border-[var(--border-light)] last:border-b-0 text-[13px]"
              >
                <span>{score.label}</span>
                <span className="font-heading font-medium text-[var(--navy)]">
                  {score.value}
                  {score.label !== "School Rating" ? "/100" : "/10"}
                </span>
              </div>
            ))}
          </motion.div>
        ))}
      </StaggerChildren>
    </section>
  );
}
