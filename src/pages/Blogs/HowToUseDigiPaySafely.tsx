import { motion } from "framer-motion";
import { Shield, Lock, Smartphone, AlertTriangle } from "lucide-react";

export default function HowToUseDigiPaySafely() {
  const tips = [
    {
      title: "Enable Two-Factor Authentication",
      desc: "Always activate 2FA to add an extra layer of protection for your account.",
      icon: <Shield className="w-6 h-6 text-primary" />,
    },
    {
      title: "Use Strong Passwords",
      desc: "Choose unique, complex passwords and never reuse them across platforms.",
      icon: <Lock className="w-6 h-6 text-primary" />,
    },
    {
      title: "Verify Before Sending Money",
      desc: "Double-check recipient details before confirming a transfer.",
      icon: <Smartphone className="w-6 h-6 text-primary" />,
    },
    {
      title: "Stay Alert for Scams",
      desc: "Beware of fake links, OTP scams, and suspicious messages.",
      icon: <AlertTriangle className="w-6 h-6 text-primary" />,
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
        How to Use DigiPay Safely 🔒
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg text-muted-foreground leading-relaxed"
      >
        DigiPay is built with industry-leading security. But your safety also
        depends on how you use it. Here are the most important steps to keep
        your money secure and transactions safe.
      </motion.p>

      <div className="grid gap-8 md:grid-cols-2">
        {tips.map((tip, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="p-6 bg-card border border-border/20 rounded-xl shadow hover:shadow-lg hover:border-primary/50 transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-primary/10 rounded-full">{tip.icon}</div>
              <h2 className="text-xl font-semibold text-foreground">{tip.title}</h2>
            </div>
            <p className="text-muted-foreground">{tip.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
