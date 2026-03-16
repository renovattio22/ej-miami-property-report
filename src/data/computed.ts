import { listings } from "./listings";
import { KpiMetric, Insight, NeighborhoodScore, BarDataItem } from "@/types";
import { fmt, fmtK } from "@/lib/formatters";

// Core computed values
const withSqft = listings.filter((l) => l.sqft > 0);
const houses = listings.filter((l) => l.type === "House");
const condos = listings.filter((l) => l.type === "Condo");
const totalValue = listings.reduce((s, l) => s + l.price, 0);
const avgPrice = Math.round(totalValue / listings.length);
const medianPrice = [...listings].sort((a, b) => a.price - b.price)[
  Math.floor(listings.length / 2)
].price;
const avgPSF = Math.round(
  withSqft.reduce((s, l) => s + l.price / l.sqft, 0) / withSqft.length
);
const housePSF = Math.round(
  houses
    .filter((l) => l.sqft > 0)
    .reduce((s, l) => s + l.price / l.sqft, 0) /
    houses.filter((l) => l.sqft > 0).length
);
const condoPSF = Math.round(
  condos
    .filter((l) => l.sqft > 0)
    .reduce((s, l) => s + l.price / l.sqft, 0) /
    condos.filter((l) => l.sqft > 0).length
);
const newConst = listings.filter((l) => l.yr >= 2020).length;
const withPool = listings.filter((l) => l.pool === "Yes").length;

export { houses, condos, totalValue, avgPrice, medianPrice, avgPSF, housePSF, condoPSF, newConst, withPool, withSqft };

// KPI Metrics
export const kpiMetrics: KpiMetric[] = [
  { value: String(listings.length), label: "Total Listings", sub: "Active Portfolio" },
  { value: fmtK(totalValue), label: "Portfolio Value", sub: fmt(totalValue) },
  { value: fmtK(avgPrice), label: "Average Price", sub: "Median: " + fmtK(medianPrice) },
  { value: "$" + avgPSF, label: "Avg $/Sq Ft", sub: "Across " + withSqft.length + " listings" },
  { value: houses.length + " / " + condos.length, label: "Houses / Condos", sub: Math.round((houses.length / listings.length) * 100) + "% Houses" },
  { value: String(newConst), label: "New Construction", sub: "Built 2020+" },
];

// Navy strip stats
export const navyStripStats = [
  { val: withPool.toString(), lbl: "With Pool" },
  { val: "$" + housePSF, lbl: "House $/SF" },
  { val: "$" + condoPSF, lbl: "Condo $/SF" },
  { val: listings.filter((l) => l.yr >= 2024).length.toString(), lbl: "Built 2024-25" },
  { val: listings.filter((l) => l.hoa > 0).length.toString(), lbl: "With HOA" },
];

// Neighborhood chart data
function getNeighborhoodData(): BarDataItem[] {
  const neighborhoods: Record<string, { total: number; count: number }> = {};
  listings.forEach((l) => {
    const name = l.subdiv || "Other";
    if (!neighborhoods[name]) neighborhoods[name] = { total: 0, count: 0 };
    neighborhoods[name].total += l.price;
    neighborhoods[name].count++;
  });
  return Object.entries(neighborhoods)
    .map(([name, data]) => ({
      label: name.length > 20 ? name.slice(0, 18) + "..." : name,
      value: Math.round(data.total / data.count),
      color: "#192E5A",
      displayValue: fmtK(Math.round(data.total / data.count)),
    }))
    .filter((d) => d.label !== "Other" && d.label !== "")
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);
}

export const neighborhoodData = getNeighborhoodData();

// Price per sqft chart data
export const pricePerSqftData: BarDataItem[] = [
  { label: "Houses (All)", value: housePSF, color: "#192E5A", displayValue: "$" + housePSF },
  { label: "Condos (All)", value: condoPSF, color: "#B8923E", displayValue: "$" + condoPSF },
  {
    label: "New Construction",
    value: Math.round(
      listings.filter((l) => l.yr >= 2020 && l.sqft > 0).reduce((s, l) => s + l.price / l.sqft, 0) /
        listings.filter((l) => l.yr >= 2020 && l.sqft > 0).length
    ),
    color: "#1a8a4a",
    displayValue:
      "$" +
      Math.round(
        listings.filter((l) => l.yr >= 2020 && l.sqft > 0).reduce((s, l) => s + l.price / l.sqft, 0) /
          listings.filter((l) => l.yr >= 2020 && l.sqft > 0).length
      ),
  },
  {
    label: "Pre-2000",
    value: Math.round(
      listings.filter((l) => l.yr > 0 && l.yr < 2000 && l.sqft > 0).reduce((s, l) => s + l.price / l.sqft, 0) /
        listings.filter((l) => l.yr > 0 && l.yr < 2000 && l.sqft > 0).length
    ),
    color: "#c0392b",
    displayValue:
      "$" +
      Math.round(
        listings.filter((l) => l.yr > 0 && l.yr < 2000 && l.sqft > 0).reduce((s, l) => s + l.price / l.sqft, 0) /
          listings.filter((l) => l.yr > 0 && l.yr < 2000 && l.sqft > 0).length
      ),
  },
];

// AI Insights
export const insights: Insight[] = [
  {
    icon: "🏗️",
    title: "New Construction Premium",
    metric: Math.round(
      ((listings.filter((l) => l.yr >= 2020 && l.sqft > 0).reduce((s, l) => s + l.price / l.sqft, 0) /
        listings.filter((l) => l.yr >= 2020 && l.sqft > 0).length -
        avgPSF) /
        avgPSF) *
        100
    ) + "% above avg",
    body: "New construction (2020+) commands a significant premium per square foot versus the portfolio average, reflecting buyer preference for modern finishes and energy efficiency.",
  },
  {
    icon: "📊",
    title: "Brickell Estates Dominance",
    metric: listings.filter((l) => l.subdiv === "BRICKELL ESTATES").length + " listings",
    body: "Brickell Estates is the most represented subdivision, accounting for " +
      Math.round((listings.filter((l) => l.subdiv === "BRICKELL ESTATES").length / listings.length) * 100) +
      "% of the portfolio. Average price: " +
      fmtK(
        Math.round(
          listings.filter((l) => l.subdiv === "BRICKELL ESTATES").reduce((s, l) => s + l.price, 0) /
            listings.filter((l) => l.subdiv === "BRICKELL ESTATES").length
        )
      ),
  },
  {
    icon: "💰",
    title: "Entry Point Analysis",
    metric: fmtK(listings[listings.length - 1].price),
    body: "The most affordable listing starts at " +
      fmt(listings[listings.length - 1].price) +
      " — a condo in " + (listings[listings.length - 1].subdiv || "West Brickell") +
      ". The price range spans " +
      fmtK(listings[listings.length - 1].price) +
      " to " +
      fmtK(listings[0].price) +
      ".",
  },
  {
    icon: "🏊",
    title: "Pool Premium",
    metric: withPool + " properties",
    body: Math.round((withPool / listings.length) * 100) +
      "% of listings include a pool. Pool properties average " +
      fmtK(
        Math.round(
          listings.filter((l) => l.pool === "Yes").reduce((s, l) => s + l.price, 0) /
            withPool
        )
      ) +
      " vs " +
      fmtK(
        Math.round(
          listings.filter((l) => l.pool !== "Yes").reduce((s, l) => s + l.price, 0) /
            listings.filter((l) => l.pool !== "Yes").length
        )
      ) +
      " without.",
  },
  {
    icon: "📐",
    title: "Lot Size Value",
    metric: "Avg " + Math.round(houses.filter((l) => l.lotSf > 0).reduce((s, l) => s + l.lotSf, 0) / houses.filter((l) => l.lotSf > 0).length).toLocaleString() + " SF",
    body: "Houses average " +
      Math.round(houses.filter((l) => l.lotSf > 0).reduce((s, l) => s + l.lotSf, 0) / houses.filter((l) => l.lotSf > 0).length).toLocaleString() +
      " sqft lot size. The largest lot is " +
      Math.max(...houses.filter((l) => l.lotSf > 0).map((l) => l.lotSf)).toLocaleString() +
      " sqft.",
  },
  {
    icon: "🏢",
    title: "Condo HOA Impact",
    metric: "$" + Math.round(condos.filter((l) => l.hoa > 0).reduce((s, l) => s + l.hoa, 0) / condos.filter((l) => l.hoa > 0).length) + "/mo avg",
    body: condos.filter((l) => l.hoa > 0).length +
      " of " +
      condos.length +
      " condos have HOA fees. Range: $" +
      Math.min(...condos.filter((l) => l.hoa > 0).map((l) => l.hoa)) +
      " to $" +
      Math.max(...condos.filter((l) => l.hoa > 0).map((l) => l.hoa)) +
      "/month.",
  },
];

// Neighborhood scores
export const neighborhoodScores: NeighborhoodScore[] = [
  {
    name: "Brickell / The Roads",
    zip: "33129",
    icon: "🏙️",
    scores: [
      { label: "Walk Score", value: 82 },
      { label: "Transit Score", value: 72 },
      { label: "Bike Score", value: 78 },
      { label: "School Rating", value: 7 },
      { label: "Safety Index", value: 74 },
    ],
  },
  {
    name: "West Brickell",
    zip: "33130",
    icon: "🌴",
    scores: [
      { label: "Walk Score", value: 76 },
      { label: "Transit Score", value: 65 },
      { label: "Bike Score", value: 70 },
      { label: "School Rating", value: 6 },
      { label: "Safety Index", value: 68 },
    ],
  },
  {
    name: "East Shenandoah",
    zip: "33129",
    icon: "🏡",
    scores: [
      { label: "Walk Score", value: 79 },
      { label: "Transit Score", value: 58 },
      { label: "Bike Score", value: 75 },
      { label: "School Rating", value: 7 },
      { label: "Safety Index", value: 76 },
    ],
  },
];

// Rental yield data (estimated)
export const yieldData = listings
  .filter((l) => l.sqft > 0)
  .map((l) => {
    const monthlyRent =
      l.type === "House"
        ? l.sqft * 2.8
        : l.sqft * 2.4;
    const annualRent = monthlyRent * 12;
    const grossYield = (annualRent / l.price) * 100;
    const monthlyMortgage = l.price * 0.8 * 0.065 / 12;
    const monthlyCashFlow = monthlyRent - monthlyMortgage - (l.hoa || 0) - l.tax / 12;
    return {
      addr: l.addr,
      price: l.price,
      monthlyRent: Math.round(monthlyRent),
      grossYield: Math.round(grossYield * 10) / 10,
      monthlyCashFlow: Math.round(monthlyCashFlow),
      type: l.type,
    };
  })
  .sort((a, b) => b.grossYield - a.grossYield);

export const topYield = yieldData.slice(0, 10);
export const topCashFlow = [...yieldData].sort((a, b) => b.monthlyCashFlow - a.monthlyCashFlow).slice(0, 10);

// Yield by type
export const yieldByType: BarDataItem[] = [
  {
    label: "Houses",
    value: Math.round(yieldData.filter((y) => y.type === "House").reduce((s, y) => s + y.grossYield, 0) / yieldData.filter((y) => y.type === "House").length * 10) / 10,
    color: "#192E5A",
    displayValue: (Math.round(yieldData.filter((y) => y.type === "House").reduce((s, y) => s + y.grossYield, 0) / yieldData.filter((y) => y.type === "House").length * 10) / 10) + "%",
  },
  {
    label: "Condos",
    value: Math.round(yieldData.filter((y) => y.type === "Condo").reduce((s, y) => s + y.grossYield, 0) / yieldData.filter((y) => y.type === "Condo").length * 10) / 10,
    color: "#B8923E",
    displayValue: (Math.round(yieldData.filter((y) => y.type === "Condo").reduce((s, y) => s + y.grossYield, 0) / yieldData.filter((y) => y.type === "Condo").length * 10) / 10) + "%",
  },
  {
    label: "Townhouses",
    value: Math.round(yieldData.filter((y) => y.type === "Condo").reduce((s, y) => s + y.grossYield, 0) / yieldData.filter((y) => y.type === "Condo").length * 10) / 10,
    color: "#1a8a4a",
    displayValue: (Math.round(yieldData.filter((y) => y.type === "Condo").reduce((s, y) => s + y.grossYield, 0) / yieldData.filter((y) => y.type === "Condo").length * 10) / 10) + "%",
  },
];

// Appreciation forecast
export const appreciationData = [
  { label: "Brickell Estates", forecast: 4.2, direction: "up" as const },
  { label: "Holleman Park", forecast: 5.1, direction: "up" as const },
  { label: "East Shenandoah", forecast: 3.8, direction: "up" as const },
  { label: "West Brickell", forecast: 2.5, direction: "up" as const },
  { label: "Nordica / High Rise", forecast: 1.2, direction: "up" as const },
  { label: "Brickell Vista", forecast: -0.5, direction: "down" as const },
];

// Navy strip 2
export const navyStrip2Stats = [
  { val: fmt(Math.round(yieldData.reduce((s, y) => s + y.monthlyRent, 0) / yieldData.length)), lbl: "Avg Est. Rent" },
  { val: (Math.round(yieldData.reduce((s, y) => s + y.grossYield, 0) / yieldData.length * 10) / 10) + "%", lbl: "Avg Gross Yield" },
  { val: listings.filter((l) => l.garage === "Yes").length.toString(), lbl: "With Garage" },
  { val: listings.filter((l) => l.terms.includes("FHA")).length.toString(), lbl: "FHA Eligible" },
];
