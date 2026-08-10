import HeroSection from "./HomeSection/HeroSection";
import Features from "./HomeSection/Features";
import PopularDestinations from "./HomeSection/PopularDestinations";
import RecentTrips from "./HomeSection/RecentTrips";
import CTASection from "./HomeSection/CTASection";



export default function Home() {
  return (
    <div className="homePage">
      <HeroSection />

      <Features />

      <PopularDestinations />

      <RecentTrips />

      <CTASection />
    </div>
  );
}
