import HeroSection from "@/components/modules/Home/HeroSection";
import FeaturesPage from "../Features/Features";





export default function Home() {
  return (
    <div>
      <div className="w-full">

        <HeroSection />
      </div>
      <div className="mt-20">
        <FeaturesPage></FeaturesPage>
      </div>
    </div>
  );
}
