export interface Listing {
  n: number;
  addr: string;
  city: string;
  zip: string;
  price: number;
  beds: number;
  fbath: number;
  hbath: number;
  sqft: number;
  mls: string;
  type: "House" | "Condo";
  subtype: string;
  subdiv: string;
  yr: number;
  lotAc: number;
  lotSf: number;
  stories: number;
  style: string;
  const: string;
  garage: string;
  gSpaces: number;
  pool: string;
  wf: string;
  view: string;
  heat: string;
  cool: string;
  floors: string;
  hoa: number;
  hoaFreq: string;
  taxYr: number;
  tax: number;
  terms: string;
  pets: string;
  senior: string;
  apn: string;
  amenities: string;
  photos: number;
  desc: string;
  url: string;
}

export interface KpiMetric {
  value: string;
  label: string;
  sub: string;
}

export interface Insight {
  icon: string;
  title: string;
  metric: string;
  body: string;
}

export interface NeighborhoodScore {
  name: string;
  zip: string;
  icon: string;
  scores: { label: string; value: number }[];
}

export interface BarDataItem {
  label: string;
  value: number;
  color: string;
  displayValue: string;
}
