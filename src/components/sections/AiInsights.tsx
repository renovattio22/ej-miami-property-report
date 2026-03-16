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

          {/* CTA Card */}
          <motion.a
            href="https://agency.lujo.ai"
            target="_blank"
            rel="noopener noreferrer"
            variants={staggerItem}
            className="rounded-xl p-7 relative overflow-hidden flex flex-col justify-center items-center text-center no-underline group cursor-pointer"
            style={{
              background: "linear-gradient(135deg, var(--navy-deep), var(--navy))",
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 border-2 border-[var(--gold)]/20 rounded-xl group-hover:border-[var(--gold)]/40 transition-colors" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full bg-[var(--gold)]/15 flex items-center justify-center text-[22px] mb-4 mx-auto">
                <svg className="w-6 h-6 text-[var(--gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                </svg>
              </div>
              <div className="font-heading text-[15px] font-medium uppercase tracking-[1px] mb-2 text-white">
                Get Personalized AI Recommendations
              </div>
              <p className="text-[13px] text-white/50 leading-[1.7] mb-4">
                Unlock AI-powered buy/sell recommendations tailored to your portfolio
              </p>
              <span className="inline-flex items-center gap-1.5 text-[var(--gold)] text-[13px] font-medium tracking-[0.5px] group-hover:gap-2.5 transition-all">
                Learn More
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
          </motion.a>
        </StaggerChildren>
      </div>
    </section>
  );
}
