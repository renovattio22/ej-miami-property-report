"use client";

import { motion } from "framer-motion";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function Footer() {
  return (
    <footer className="bg-[var(--navy-deep)] text-center py-16 pb-10 text-white/70 text-[13px] relative overflow-hidden noise-overlay">
      <RevealOnScroll className="relative z-10">
        <div className="container-luxury">
          <div
            className="font-body text-[42px] font-bold text-[var(--gold)] mb-1"
            style={{ textShadow: "0 2px 20px rgba(184, 146, 62, 0.2)" }}
          >
            Eric Johnson
          </div>
          <div className="text-[12px] font-medium tracking-[6px] uppercase text-white/35">
            EJMIAMI.COM
          </div>

          <p className="text-[12px] text-white/30 uppercase tracking-[2px] mt-6 mb-2 font-medium">
            This is a demo report
          </p>

          <motion.a
            href="https://agency.lujo.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] text-[var(--navy-deep)] px-10 py-4 rounded-md font-heading font-semibold text-[15px] tracking-[1.5px] uppercase mt-8 mb-8 no-underline"
            whileHover={{
              y: -2,
              boxShadow: "0 8px 32px rgba(184,146,62,0.35)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            Automate This Report &rarr;
          </motion.a>

          <p className="max-w-[560px] mx-auto leading-[1.8] text-white/55 text-[14px]">
            Imagine this intelligence report generated{" "}
            <strong className="text-white/80">automatically every Monday at 12:01 PM</strong> — no logins,
            no CSV exports, no Visual Basic.
          </p>
          <p className="max-w-[560px] mx-auto mt-3 text-white/35 text-[14px]">
            Your MLS data flows in. Intelligence flows out. Before your first
            coffee.
          </p>

          <hr className="border-t border-[var(--gold)]/15 max-w-[200px] mx-auto mt-10 mb-4" />

          <a
            href="https://agency.lujo.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[11px] text-white/35 tracking-[1.5px] uppercase hover:text-[var(--gold)] transition-colors"
          >
            Powered by Lujo AI Agency &middot; agency.lujo.ai
          </a>
        </div>
      </RevealOnScroll>
    </footer>
  );
}
