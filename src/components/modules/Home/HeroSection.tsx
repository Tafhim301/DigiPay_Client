import { ArrowRight } from "lucide-react";
import img from "@/assets/Images/homePageImage.jpg";
import { Button } from "@/components/ui/button";
import { Logo } from "@/assets/Logo";
import { motion, type Variants } from "framer-motion";
import { Link } from "react-router";


const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 1.2,
      ease: "easeInOut",
    },
  },
};


const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring", 
      stiffness: 100,
      damping: 10,
    },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.17, 0.67, 0.83, 0.67],
    },
  },
};




const HeroSection = ({
  heading = "Seamless Digital Payments with DigiPay",
  description = "DigiPay is a secure and modern digital wallet system designed to simplify money transfers, cash-in, cash-out, and transaction tracking. Built with the latest modern tecnologies for a smooth user experience.",
  buttons = {

    secondary: {
      text: "Learn More",
      url: "/features",
    },
  },
  image = {
    src: img,
    alt: "Illustration of secure digital wallet transactions",
  },
}) => {
  return (
    <section className="relative rounded-b-2xl px-6 py-20 lg:px-20 lg:py-15 shadow-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-cyan-900 to-cyan-600 opacity-90 z-0" />
      <div className="absolute inset-0 bg-gray-900/10 z-10" />

      <div className="relative container z-20">
        <div className="grid items-center gap-12 justify-between w-full lg:grid-cols-2">
          <motion.div
            className="flex flex-col items-center text-center lg:items-start lg:text-left text-white"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Logo />
            </motion.div>

            <motion.h1
              className="my-6 text-4xl font-extrabold leading-tight lg:text-6xl"
              variants={itemVariants}
            >
              {heading}
            </motion.h1>

            <motion.p
              className="mb-8 max-w-xl text-lg lg:text-xl opacity-90"
              variants={itemVariants}
            >
              {description}
            </motion.p>

            <motion.div
              className="flex w-full flex-col justify-center gap-3 sm:flex-row lg:justify-start"
              variants={itemVariants}
            >
              
              {buttons.secondary && (
                <Button asChild>
                  <Link to={buttons.secondary.url}>
                    {buttons.secondary.text}
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="justify-end"
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