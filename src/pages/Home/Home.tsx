"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/modules/Home/HeroSection";
import HomePageFeaturesSection from "@/components/modules/Home/HomePageFeatures";
import { CallToAction, CoreValues, OurMission, OurStory, WhyChooseUs } from "../About/About";
import BlogSection from "../Blogs/BlogSection";
import PrivacySummary from "@/components/modules/Home/PrivacyPolicySummary";
import ContactPage from "../Contact/ContactPage";
import NewsletterSection from "@/components/modules/Home/NewsLetter";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <div className="grid space-y-20">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        transition={{ duration: 0.8 }}
      >
        <HeroSection />
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <HomePageFeaturesSection />
      </motion.div>

      {/* Explore Our Journey */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-gradient-to-br text-center from-background via-muted to-background text-foreground py-24 px-4 sm:px-6 lg:px-20 grid space-y-10"
      >
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight"
          >
            Explore Our Journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-md text-muted-foreground leading-relaxed"
          >
            DigiPay is a modern, secure, and user-friendly digital wallet system inspired by the success of services like bKash and Nagad. Our mission is to make financial transactions{" "}
            <strong className="text-foreground font-semibold">fast, safe, and accessible for everyone in Bangladesh</strong>.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          <motion.div whileHover={{ scale: 1.03 }} className="transition-shadow shadow hover:shadow-lg rounded-xl">
            <OurStory />
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} className="transition-shadow shadow hover:shadow-lg rounded-xl">
            <OurMission />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <CoreValues />
        </motion.div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="bg-gradient-to-br from-background via-muted to-background text-foreground py-24 px-4 sm:px-6 lg:px-20"
      >
        <WhyChooseUs />
      </motion.section>

      {/* Blog Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-gradient-to-br from-background via-muted to-background text-foreground py-24 px-4 sm:px-6 lg:px-20"
      >
        <BlogSection />
      </motion.section>

      {/* Call To Action */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="bg-gradient-to-br from-background via-muted to-background text-foreground py-24 px-4 sm:px-6 lg:px-20"
      >
        <CallToAction />
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-gradient-to-br from-background via-muted to-background text-foreground py-24 px-4 sm:px-6 lg:px-20"
      >
        <ContactPage />
      </motion.section>

      {/* Newsletter Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="bg-gradient-to-br from-background via-muted to-background text-foreground py-24 px-4 sm:px-6 lg:px-20"
      >
        <NewsletterSection />
      </motion.section>

      {/* Privacy Summary */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <PrivacySummary />
      </motion.div>
    </div>
  );
}
