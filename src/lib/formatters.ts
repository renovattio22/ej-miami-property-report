export const fmt = (n: number): string =>
  n ? "$" + n.toLocaleString() : "N/A";

export const fmtK = (n: number): string =>
  n >= 1000000
    ? "$" + (n / 1000000).toFixed(1) + "M"
    : n >= 1000
      ? "$" + (n / 1000).toFixed(0) + "K"
      : "$" + n;

export const fmtPct = (n: number): string => n.toFixed(1) + "%";

export const fmtNum = (n: number): string => n.toLocaleString();
