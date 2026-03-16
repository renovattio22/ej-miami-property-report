import StickyHeader from "@/components/layout/StickyHeader";
import WaveSeparator from "@/components/layout/WaveSeparator";
import Footer from "@/components/layout/Footer";
import HeroKpiStrip from "@/components/sections/HeroKpiStrip";
import AnalyticsSection from "@/components/sections/AnalyticsSection";
import NavyStatStrip from "@/components/sections/NavyStatStrip";
import AiInsights from "@/components/sections/AiInsights";
import LocationIntelligence from "@/components/sections/LocationIntelligence";
import InvestorAnalytics from "@/components/sections/InvestorAnalytics";
import PortfolioTable from "@/components/sections/PortfolioTable";
import { navyStripStats, navyStrip2Stats } from "@/data/computed";

export default function Home() {
  return (
    <main>
      <StickyHeader />
      <WaveSeparator topColor="var(--navy)" fillColor="var(--white)" />
      <HeroKpiStrip />
      <AnalyticsSection />
      <NavyStatStrip stats={navyStripStats} />
      <AiInsights />
      <LocationIntelligence />
      <InvestorAnalytics />
      <NavyStatStrip stats={navyStrip2Stats} />
      <PortfolioTable />
      <WaveSeparator topColor="var(--off-white)" fillColor="var(--navy)" flip />
      <Footer />
    </main>
  );
}
