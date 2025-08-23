import { ArrowRight } from "lucide-react";
import img from "@/assets/Images/homePageImage.jpg";
import { Button } from "@/components/ui/button";
import { Logo } from "@/assets/Logo";
import { motion } from "framer-motion";

const HeroSection = ({
  heading = "Seamless Digital Payments with DigiPay",
  description = "DigiPay is a secure and modern digital wallet system designed to simplify money transfers, cash-in, cash-out, and transaction tracking. Built with Express, MongoDB, and React for a smooth user experience.",
  buttons = {
    primary: {
      text: "Get Started",
      url: "/register",
    },
    secondary: {
      text: "Learn More",
      url: "/about",
    },
  },
  image = {
    src: img,
    alt: "Illustration of secure digital wallet transactions",
  },
}) => {
  return (
    <section className="relative rounded-b-2xl px-6 py-20 lg:px-20 lg:py-32 shadow-2xl overflow-hidden">
  
      <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-cyan-900 to-cyan-600 opacity-90 z-0" />
      <div className="absolute inset-0 bg-gray-900/10 z-10" />

      <div className="relative container z-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          
          <motion.div
            className="flex flex-col items-center text-center lg:items-start lg:text-left text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <Logo />
            </motion.div>

            <motion.h1
              className="my-6 text-4xl font-extrabold leading-tight lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {heading}
            </motion.h1>

            <motion.p
              className="mb-8 max-w-xl text-lg lg:text-xl opacity-90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {description}
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="flex w-full flex-col justify-center gap-3 sm:flex-row lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {buttons.primary && (
                <Button asChild>
                  <a href={buttons.primary.url}>{buttons.primary.text}</a>
                </Button>
              )}
              {buttons.secondary && (
                <Button asChild>
                  <a href={buttons.secondary.url}>
                    {buttons.secondary.text}
                    <ArrowRight className="ml-2 size-4" />
                  </a>
                </Button>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="rounded-xl shadow-2xl w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
