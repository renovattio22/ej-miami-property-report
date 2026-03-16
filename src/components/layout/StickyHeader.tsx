"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

const navLinks = [
  { label: "About", href: "https://ejmiami.com/about/" },
  { label: "Listings", href: "https://ejmiami.com/listings/" },
  { label: "Luxury Buildings", href: "https://ejmiami.com/luxury-buildings/" },
  { label: "Market Report", href: "https://ejmiami.com/market-report/" },
];

export default function StickyHeader() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0.85, 0.98]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.08]);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      className="sticky top-0 z-50 backdrop-blur-xl"
      style={{
        backgroundColor: useTransform(bgOpacity, (v) => `rgba(13, 27, 53, ${v})`),
        borderBottom: useTransform(borderOpacity, (v) => `1px solid rgba(255,255,255,${v})`),
      }}
    >
      <div className="container-luxury flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <div>
            <div className="font-body text-[26px] font-bold text-[var(--gold)] tracking-[0.5px] leading-tight">
              Eric Johnson
            </div>
            <div className="text-white/40 text-[11px] font-medium tracking-[4px] uppercase">
              EJMIAMI.COM
            </div>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex gap-8 items-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-white/70 text-[13px] tracking-[1px] uppercase font-medium hover:text-white transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[var(--gold)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <div className="bg-white/[0.06] text-white/80 px-5 py-2 rounded-md text-[11px] font-medium tracking-[2px] uppercase border-l-2 border-[var(--gold)] border-r-0 border-t-0 border-b-0"
            style={{ borderRight: '1px solid rgba(255,255,255,0.06)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            Property Intelligence Report
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-white p-3 -mr-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <motion.div
            className="space-y-1.5"
            animate={mobileOpen ? "open" : "closed"}
          >
            <motion.div
              className="w-5 h-[1.5px] bg-white/80"
              variants={{
                open: { rotate: 45, y: 7 },
                closed: { rotate: 0, y: 0 },
              }}
              transition={{ duration: 0.25 }}
            />
            <motion.div
              className="w-5 h-[1.5px] bg-white/80"
              variants={{
                open: { opacity: 0, x: -8 },
                closed: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              className="w-5 h-[1.5px] bg-white/80"
              variants={{
                open: { rotate: -45, y: -7 },
                closed: { rotate: 0, y: 0 },
              }}
              transition={{ duration: 0.25 }}
            />
          </motion.div>
        </button>
      </div>

      {/* Mobile menu */}
      <motion.nav
        className="lg:hidden overflow-hidden backdrop-blur-lg"
        initial={false}
        animate={mobileOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ backgroundColor: "rgba(13, 27, 53, 0.95)" }}
      >
        <div className="container-luxury pb-6 pt-2 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white/80 text-[14px] tracking-[1px] uppercase hover:text-white transition-colors py-3.5 border-b border-white/[0.05]"
            >
              <span className="w-0.5 h-4 bg-[var(--gold)] rounded-full" />
              {link.label}
            </a>
          ))}
        </div>
      </motion.nav>
    </motion.header>
  );
}
