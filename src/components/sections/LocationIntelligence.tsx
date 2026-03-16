"use client";

import { motion } from "framer-motion";
import StaggerChildren, { staggerItem } from "@/components/ui/StaggerChildren";
import CircularProgress from "@/components/ui/CircularProgress";
import { neighborhoodScores } from "@/data/computed";

export default function LocationIntelligence() {
  return (
    <section className="py-16 md:py-20 bg-white" id="location">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="section-label">Location Intelligence</div>
          <div className="section-title">Neighborhood Scores</div>
        </motion.div>

        <StaggerChildren
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          stagger={0.1}
        >
          {neighborhoodScores.map((loc, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="bg-white rounded-xl p-6 md:p-8 shadow-[var(--shadow-lg)] text-center"
            >
              <div className="w-14 h-14 rounded-full bg-[var(--navy)]/[0.05] flex items-center justify-center text-[28px] mx-auto mb-3">
                {loc.icon}
              </div>
              <div className="font-heading text-[16px] font-medium uppercase tracking-[1px] mb-1">
                {loc.name}
              </div>
              <span className="inline-block bg-[var(--off-white)] text-[var(--text-dim)] text-[10px] px-3 py-1 rounded-full uppercase tracking-[1px] font-medium mb-6">
                ZIP: {loc.zip}
              </span>

              <div className="flex justify-around items-start flex-wrap gap-y-4">
                {loc.scores.map((score, j) => (
                  <CircularProgress
                    key={j}
                    value={score.value}
                    max={score.label === "School Rating" ? 10 : 100}
                    size={58}
                    strokeWidth={4}
                    label={score.label.replace("Score", "").replace("Rating", "").replace("Index", "").trim()}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
