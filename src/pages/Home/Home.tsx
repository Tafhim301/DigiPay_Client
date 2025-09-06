import HeroSection from "@/components/modules/Home/HeroSection";
import HomePageFeaturesSection from "@/components/modules/Home/HomePageFeatures";






export default function Home() {
  return (
    <div className="grid space-y-20">
      

        <HeroSection />

        <HomePageFeaturesSection />
    </div>
  );
}
