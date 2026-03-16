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
  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    ["0 2px 10px rgba(0,0,0,0)", "0 2px 10px rgba(0,0,0,0.15)"]
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      className="sticky top-0 z-50 bg-[var(--navy)]"
      style={{ boxShadow }}
    >
      <div className="flex items-center justify-between px-5 md:px-10 py-[18px]">
        <div className="flex items-center gap-4">
          <div>
            <div className="font-body text-[28px] font-bold text-[var(--gold)] tracking-[0.5px]">
              Eric Johnson
            </div>
            <div className="text-white/60 text-[14px] font-normal tracking-[3px] uppercase -mt-1">
              EJMIAMI.COM
            </div>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-7">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/85 text-[14px] tracking-[0.85px] uppercase font-normal hover:text-[var(--gold)] transition-colors"
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        <div className="hidden md:block">
          <div className="bg-white/[0.12] text-white/90 px-[18px] py-[6px] rounded-sm text-[13px] font-medium tracking-[1.5px] uppercase border border-white/[0.15]">
            Property Intelligence Report
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <motion.div
            className="space-y-1.5"
            animate={mobileOpen ? "open" : "closed"}
          >
            <motion.div
              className="w-6 h-0.5 bg-white"
              variants={{
                open: { rotate: 45, y: 8 },
                closed: { rotate: 0, y: 0 },
              }}
            />
            <motion.div
              className="w-6 h-0.5 bg-white"
              variants={{
                open: { opacity: 0 },
                closed: { opacity: 1 },
              }}
            />
            <motion.div
              className="w-6 h-0.5 bg-white"
              variants={{
                open: { rotate: -45, y: -8 },
                closed: { rotate: 0, y: 0 },
              }}
            />
          </motion.div>
        </button>
      </div>

      {/* Mobile menu */}
      <motion.nav
        className="md:hidden overflow-hidden"
        initial={false}
        animate={mobileOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="px-5 pb-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-white/85 text-[14px] tracking-[0.85px] uppercase hover:text-[var(--gold)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.nav>
    </motion.header>
  );
}
