import { motion } from "framer-motion";
import { Globe, Users, TrendingUp, Smartphone } from "lucide-react";

export default function WhyDigitalPaymentsMatter() {
  const points = [
    {
      title: "Financial Inclusion",
      desc: "Digital wallets bring financial services to millions in rural Bangladesh who lack access to banks.",
      icon: <Users className="w-7 h-7 text-primary" />,
    },
    {
      title: "Economic Growth",
      desc: "Fast, secure payments help small businesses and freelancers scale without cash barriers.",
      icon: <TrendingUp className="w-7 h-7 text-primary" />,
    },
    {
      title: "Global Connectivity",
      desc: "Digital payments connect Bangladesh to the global economy with remittances and cross-border trade.",
      icon: <Globe className="w-7 h-7 text-primary" />,
    },
    {
      title: "Everyday Convenience",
      desc: "From rickshaw fares to utility bills, paying with your phone saves time and effort.",
      icon: <Smartphone className="w-7 h-7 text-primary" />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 space-y-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-bold text-foreground mb-6"
      >
        Why Digital Payments Matter in Bangladesh 
      </motion.h1>

      <p className="text-lg text-muted-foreground leading-relaxed">
        Bangladesh is rapidly adopting cashless transactions. Here’s why
        services like DigiPay are vital for the future of our economy.
      </p>

      <div className="grid gap-10">
        {points.map((point, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex gap-4 items-start p-6 bg-card border border-border/20 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="p-3 bg-primary/10 rounded-full">{point.icon}</div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{point.title}</h2>
              <p className="text-muted-foreground">{point.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
