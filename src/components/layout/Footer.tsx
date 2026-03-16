"use client";

import { motion } from "framer-motion";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function Footer() {
  return (
    <footer className="bg-[var(--navy)] text-center py-[50px] px-5 md:px-10 pb-[30px] text-white/70 text-[13px] relative overflow-hidden">
      {/* Subtle wave pattern overlay */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='rgba(255,255,255,0.03)' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      />

      <div className="relative z-10">
        <RevealOnScroll>
          <div className="font-body text-[36px] font-bold text-[var(--gold)] mb-1">
            Eric Johnson
          </div>
          <div className="text-[14px] font-normal tracking-[6px] uppercase text-white/50">
            EJMIAMI.COM
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <motion.a
            href="https://agency.lujo.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[var(--gold)] text-[var(--navy)] px-10 py-3.5 rounded-sm font-heading font-semibold text-[16px] tracking-[1.5px] uppercase mt-7 mb-6 no-underline"
            whileHover={{
              y: -2,
              boxShadow: "0 4px 20px rgba(184,146,62,0.4)",
              backgroundColor: "var(--gold-light)",
            }}
            transition={{ duration: 0.3 }}
          >
            Automate This Report &rarr;
          </motion.a>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3}>
          <p className="max-w-[600px] mx-auto leading-[1.7]">
            Imagine this intelligence report generated{" "}
            <strong>automatically every Monday at 12:01 PM</strong> — no logins,
            no CSV exports, no Visual Basic.
          </p>
          <p className="max-w-[600px] mx-auto mt-2.5 text-white/50">
            Your MLS data flows in. Intelligence flows out. Before your first
            coffee.
          </p>
        </RevealOnScroll>

        <div className="mt-5 text-[11px] text-white/35 tracking-[1px] uppercase">
          Powered by Lujo AI Agency &middot; agency.lujo.ai
        </div>
      </div>
    </footer>
  );
}
