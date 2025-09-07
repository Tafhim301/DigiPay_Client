import { motion } from "framer-motion";
import { CreditCard, Cpu, Cloud, ArrowUpRightFromSquare, } from "lucide-react";

export default function FutureOfCashless() {
  const insights = [
    {
      title: "AI-Powered Payments",
      desc: "Smart fraud detection and personalized financial recommendations will make digital wallets even safer and more useful.",
      icon: <Cpu className="w-7 h-7 text-primary" />,
    },
    {
      title: "Cloud-First Economy",
      desc: "Seamless cloud-based transactions will ensure instant transfers between banks, wallets, and global platforms.",
      icon: <Cloud className="w-7 h-7 text-primary" />,
    },
    {
      title: "Digital-Only Banking",
      desc: "Future generations may grow up never needing a physical bank branch as mobile-first banking dominates.",
      icon: <CreditCard className="w-7 h-7 text-primary" />,
    },
    {
      title: "Economic Acceleration",
      desc: "A cashless society will drive transparency, reduce corruption, and empower small businesses with faster payments.",
      icon: <ArrowUpRightFromSquare className="w-7 h-7 text-primary" />,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-16 px-4 space-y-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-bold text-foreground mb-6"
      >
        The Future of Cashless Transactions 
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg text-muted-foreground leading-relaxed"
      >
        The world is moving towards a **cashless economy**, and Bangladesh is at
        the center of this digital revolution. With rapid adoption of mobile
        wallets and growing trust in online banking, the future of money is
        digital, seamless, and secure.
      </motion.p>

      <div className="grid gap-10 md:grid-cols-2">
        {insights.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="p-6 bg-card border border-border/20 rounded-xl shadow hover:shadow-lg hover:border-primary/50 transition"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-primary/10 rounded-full">{item.icon}</div>
              <h2 className="text-xl font-semibold text-foreground">
                {item.title}
              </h2>
            </div>
            <p className="text-muted-foreground">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="bg-primary/10 p-8 rounded-2xl shadow-md text-center mt-12"
      >
        <h2 className="text-2xl font-bold mb-4 text-primary">
          DigiPay: Leading the Cashless Movement
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          DigiPay is committed to building the foundation for a **fully digital
          financial future** in Bangladesh. By blending security, simplicity,
          and innovation, we are shaping the way money flows in the modern
          economy.
        </p>
      </motion.div>
    </div>
  );
}
