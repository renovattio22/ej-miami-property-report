"use client";

import { motion } from "framer-motion";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import AnimatedBar from "@/components/ui/AnimatedBar";
import {
  topYield,
  topCashFlow,
  yieldByType,
  appreciationData,
} from "@/data/computed";
import { fmt } from "@/lib/formatters";

export default function InvestorAnalytics() {
  const yieldTypeMax = Math.max(...yieldByType.map((y) => y.value));

  return (
    <section className="py-16 md:py-20 bg-[var(--off-white)]" id="investor">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="section-label">Investment Analysis</div>
          <div className="section-title">Rental Yield &amp; Cash Flow</div>
        </motion.div>

        {/* Top row: Yield + Cash Flow lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <RevealOnScroll delay={0.1}>
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-[var(--shadow-md)]">
              <h3 className="font-body text-[13px] text-[var(--text-light)] uppercase tracking-[2.5px] mb-5 font-medium pb-3 border-b border-[var(--border-light)]">
                Top 10 — Gross Rental Yield
              </h3>
              {topYield.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center py-2.5 border-b border-[var(--border-light)] last:border-b-0 gap-3"
                >
                  <div className="flex-1 text-[13px] font-medium text-[var(--text)] truncate max-w-[200px] md:max-w-none">
                    {item.addr}
                  </div>
                  <div
                    className={`font-heading text-[14px] font-medium px-3 py-1 rounded-md min-w-[60px] text-center ${
                      item.grossYield >= 4
                        ? "bg-[var(--green)]/10 text-[var(--green)]"
                        : "bg-[var(--navy)]/[0.06] text-[var(--navy)]"
                    }`}
                  >
                    {item.grossYield}%
                  </div>
                  <div className="text-[12px] text-[var(--text-dim)] w-[120px] text-right hidden sm:block tabular-nums">
                    Est. {fmt(item.monthlyRent)}/mo
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-[var(--shadow-md)]">
              <h3 className="font-body text-[13px] text-[var(--text-light)] uppercase tracking-[2.5px] mb-5 font-medium pb-3 border-b border-[var(--border-light)]">
                Top 10 — Monthly Cash Flow (Est.)
              </h3>
              {topCashFlow.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center py-2.5 border-b border-[var(--border-light)] last:border-b-0 gap-3"
                >
                  <div className="flex-1 text-[13px] font-medium text-[var(--text)] truncate max-w-[200px] md:max-w-none">
                    {item.addr}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        item.monthlyCashFlow >= 0 ? "bg-[var(--green)]" : "bg-[var(--red)]"
                      }`}
                    />
                    <span
                      className={`font-heading text-[14px] font-medium ${
                        item.monthlyCashFlow >= 0
                          ? "text-[var(--green)]"
                          : "text-[var(--red)]"
                      }`}
                    >
                      {item.monthlyCashFlow >= 0 ? "+" : ""}
                      {fmt(item.monthlyCashFlow)}
                    </span>
                  </div>
                  <div className="text-[12px] text-[var(--text-dim)] w-[100px] text-right hidden sm:block tabular-nums">
                    Yield: {item.grossYield}%
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>

        {/* Bottom row: dark treatment */}
        <div
          className="rounded-2xl p-6 md:p-8 noise-overlay"
          style={{
            background: "linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 100%)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
            <RevealOnScroll delay={0.1}>
              <div className="glass-card p-6 md:p-7">
                <h3 className="font-body text-[13px] text-white/50 uppercase tracking-[2.5px] mb-5 font-medium pb-3 border-b border-white/[0.08]">
                  Rental Yield by Property Type
                </h3>
                {yieldByType.map((item, i) => (
                  <div key={item.label} className="flex items-center mb-3.5 gap-3">
                    <div className="min-w-[100px] max-w-[170px] w-[170px] text-[13px] text-white/70 flex-shrink-0 text-right font-medium">
                      {item.label}
                    </div>
                    <div className="flex-1 h-[34px] bg-white/[0.06] rounded-md overflow-hidden">
                      <motion.div
                        className="h-full rounded-md flex items-center pl-3 text-[11px] font-semibold text-white"
                        style={{
                          background: `linear-gradient(90deg, ${item.color}, ${item.color}88)`,
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(item.value / yieldTypeMax) * 100}%` }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1.2, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                      />
                    </div>
                    <div className="w-[60px] text-[13px] font-semibold text-[var(--gold)] text-right flex-shrink-0 tabular-nums">
                      {item.displayValue}
                    </div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <div className="glass-card p-6 md:p-7">
                <h3 className="font-body text-[13px] text-white/50 uppercase tracking-[2.5px] mb-5 font-medium pb-3 border-b border-white/[0.08]">
                  2026 Appreciation Forecast
                </h3>
                {appreciationData.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center py-3 border-b border-white/[0.05] last:border-b-0 gap-3"
                  >
                    <div className="flex-1 text-[13px] font-medium text-white/70">
                      {item.label}
                    </div>
                    {/* Mini progress bar */}
                    <div className="w-[100px] h-[6px] bg-white/[0.06] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background:
                            item.direction === "up"
                              ? "linear-gradient(90deg, var(--green), #2ecc71)"
                              : "linear-gradient(90deg, var(--red), #e74c3c)",
                        }}
                        initial={{ width: 0 }}
                        whileInView={{
                          width: `${Math.min(Math.abs(item.forecast) / 6 * 100, 100)}%`,
                        }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                      />
                    </div>
                    <span
                      className={`font-heading font-semibold text-[14px] tabular-nums min-w-[50px] text-right ${
                        item.forecast >= 0 ? "text-[#2ecc71]" : "text-[#e74c3c]"
                      }`}
                    >
                      {item.forecast > 0 ? "+" : ""}
                      {item.forecast}%
                    </span>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>

          {/* ROI Calculator CTA */}
          <a
            href="https://agency.lujo.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="block glass-card p-6 md:p-7 mt-6 relative z-10 text-center no-underline group hover:border-[var(--gold)]/30 transition-colors duration-300"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--gold)]/15 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[var(--gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-heading text-[14px] font-medium uppercase tracking-[1px] text-white">
                    Interactive ROI Calculator
                  </div>
                  <p className="text-[12px] text-white/40 mt-0.5">
                    Model cash-on-cash returns, cap rates &amp; 5-year projections
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[var(--gold)] text-[13px] font-medium tracking-[0.5px] group-hover:gap-2.5 transition-all whitespace-nowrap">
                Get Access
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
