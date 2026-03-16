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
  const yieldMax = Math.max(...topYield.map((y) => y.grossYield));
  const cashFlowMax = Math.max(...topCashFlow.map((y) => Math.abs(y.monthlyCashFlow)));
  const yieldTypeMax = Math.max(...yieldByType.map((y) => y.value));

  return (
    <section className="py-10 px-5 md:px-10 bg-[var(--off-white)]" id="investor">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="section-label">Investment Analysis</div>
        <div className="section-title">Rental Yield &amp; Cash Flow</div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Top Yield */}
        <RevealOnScroll delay={0.1}>
          <div className="bg-white border border-[var(--border)] rounded-sm p-[30px] shadow-[var(--shadow)]">
            <h3 className="font-body text-[13px] text-[var(--text-light)] uppercase tracking-[3px] mb-5 font-medium">
              Top 10 — Gross Rental Yield
            </h3>
            {topYield.map((item, i) => (
              <div
                key={i}
                className="flex items-center py-2.5 border-b border-[var(--border-light)] last:border-b-0 gap-3"
              >
                <div className="flex-1 text-[13px] font-medium text-[var(--text)]">
                  {item.addr}
                </div>
                <div
                  className={`font-heading text-[14px] font-medium px-2.5 py-0.5 rounded-sm min-w-[60px] text-center ${
                    item.grossYield >= 4
                      ? "bg-[rgba(26,138,74,0.1)] text-[var(--green)]"
                      : "bg-[rgba(25,46,90,0.08)] text-[var(--navy)]"
                  }`}
                >
                  {item.grossYield}%
                </div>
                <div className="text-[12px] text-[var(--text-dim)] w-[140px] text-right">
                  Est. {fmt(item.monthlyRent)}/mo
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Top Cash Flow */}
        <RevealOnScroll delay={0.2}>
          <div className="bg-white border border-[var(--border)] rounded-sm p-[30px] shadow-[var(--shadow)]">
            <h3 className="font-body text-[13px] text-[var(--text-light)] uppercase tracking-[3px] mb-5 font-medium">
              Top 10 — Monthly Cash Flow (Est.)
            </h3>
            {topCashFlow.map((item, i) => (
              <div
                key={i}
                className="flex items-center py-2.5 border-b border-[var(--border-light)] last:border-b-0 gap-3"
              >
                <div className="flex-1 text-[13px] font-medium text-[var(--text)]">
                  {item.addr}
                </div>
                <div
                  className={`font-heading text-[14px] font-medium px-2.5 py-0.5 rounded-sm min-w-[60px] text-center ${
                    item.monthlyCashFlow >= 0
                      ? "bg-[rgba(26,138,74,0.1)] text-[var(--green)]"
                      : "bg-[rgba(192,57,43,0.1)] text-[var(--red)]"
                  }`}
                >
                  {item.monthlyCashFlow >= 0 ? "+" : ""}
                  {fmt(item.monthlyCashFlow)}
                </div>
                <div className="text-[12px] text-[var(--text-dim)] w-[140px] text-right">
                  Yield: {item.grossYield}%
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Yield by Type */}
        <RevealOnScroll delay={0.1}>
          <div className="bg-white border border-[var(--border)] rounded-sm p-[30px] shadow-[var(--shadow)]">
            <h3 className="font-body text-[13px] text-[var(--text-light)] uppercase tracking-[3px] mb-5 font-medium">
              Rental Yield by Property Type
            </h3>
            {yieldByType.map((item, i) => (
              <AnimatedBar
                key={item.label}
                label={item.label}
                value={item.value}
                maxValue={yieldTypeMax}
                displayValue={item.displayValue}
                color={item.color}
                delay={i * 0.1}
              />
            ))}
          </div>
        </RevealOnScroll>

        {/* Appreciation Forecast */}
        <RevealOnScroll delay={0.2}>
          <div className="bg-white border border-[var(--border)] rounded-sm p-[30px] shadow-[var(--shadow)]">
            <h3 className="font-body text-[13px] text-[var(--text-light)] uppercase tracking-[3px] mb-5 font-medium">
              2026 Appreciation Forecast
            </h3>
            {appreciationData.map((item, i) => (
              <div
                key={i}
                className="flex items-center py-2.5 border-b border-[var(--border-light)] last:border-b-0 gap-3"
              >
                <div className="flex-1 text-[13px] font-medium text-[var(--text)]">
                  {item.label}
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-10 h-5 rounded-sm flex items-center justify-center text-[11px] font-bold text-white ${
                      item.direction === "up"
                        ? "bg-[var(--green)]"
                        : "bg-[var(--red)]"
                    }`}
                  >
                    {item.direction === "up" ? "▲" : "▼"}
                  </div>
                  <span
                    className={`font-heading font-medium text-[14px] ${
                      item.forecast >= 0
                        ? "text-[var(--green)]"
                        : "text-[var(--red)]"
                    }`}
                  >
                    {item.forecast > 0 ? "+" : ""}
                    {item.forecast}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
