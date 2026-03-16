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

        {/* Deep Dive CTA */}
        <div className="mt-8 text-center bg-[var(--off-white)] rounded-xl p-6 md:p-8">
          <p className="text-[var(--text-muted)] text-[14px] mb-4">
            Want detailed school ratings, crime data &amp; walkability reports?
          </p>
          <a
            href="https://agency.lujo.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[var(--navy)] text-white px-6 py-3 rounded-lg text-[13px] font-medium tracking-[0.5px] hover:bg-[var(--navy-mid)] transition-colors duration-300"
          >
            <svg className="w-3.5 h-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            Unlock Neighborhood Deep Dive &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
