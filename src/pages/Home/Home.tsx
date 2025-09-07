import HeroSection from "@/components/modules/Home/HeroSection";
import HomePageFeaturesSection from "@/components/modules/Home/HomePageFeatures";
import { WhyChooseUs } from "../About/About";
import BlogSection from "../Blogs/BlogSection";






export default function Home() {
  return (
    <div className="grid space-y-20">
      

        <HeroSection />

        <HomePageFeaturesSection />

        <div className="bg-gradient-to-br from-background via-muted to-background text-foreground py-24 px-4 sm:px-6 lg:px-20">
          <WhyChooseUs></WhyChooseUs>

          

        </div>

        <div className="bg-gradient-to-br from-background via-muted to-background text-foreground py-24 px-4 sm:px-6 lg:px-20">
          <BlogSection></BlogSection>

        </div>
    </div>
  );
}
