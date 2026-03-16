"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingDemoBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY > 600 && !dismissed) {
        setVisible(true);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  function dismiss() {
    setDismissed(true);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-auto z-50"
        >
          <div className="bg-[var(--navy-deep)]/95 backdrop-blur-xl border border-white/10 rounded-xl px-5 py-3.5 flex items-center gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse flex-shrink-0" />
              <span className="text-white/70 text-[12px] md:text-[13px] font-medium">
                <span className="text-white/90">Demo Report</span>
                <span className="hidden sm:inline"> — Powered by Lujo AI</span>
              </span>
            </div>
            <a
              href="https://agency.lujo.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] text-[var(--navy-deep)] px-4 py-1.5 rounded-md text-[11px] font-bold tracking-[0.5px] uppercase whitespace-nowrap hover:shadow-[var(--shadow-gold)] transition-shadow no-underline"
            >
              Get Your Own &rarr;
            </a>
            <button
              onClick={dismiss}
              className="text-white/30 hover:text-white/60 transition-colors p-1 -mr-1"
              aria-label="Dismiss"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
