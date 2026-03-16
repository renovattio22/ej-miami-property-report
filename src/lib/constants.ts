export const COLORS = {
  navy: "#192E5A",
  navyLight: "rgba(25,46,90,0.77)",
  navyDark: "#111d38",
  gold: "#B8923E",
  goldLight: "#d4ad5a",
  goldPale: "#f5ecd8",
  green: "#1a8a4a",
  red: "#c0392b",
  blue: "#2c6fbb",
} as const;

export const ANIMATION = {
  duration: 0.6,
  stagger: 0.1,
  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  spring: { type: "spring" as const, stiffness: 100, damping: 15 },
} as const;
