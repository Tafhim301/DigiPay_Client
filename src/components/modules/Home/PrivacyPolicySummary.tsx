import { ShieldCheck, Fingerprint, DatabaseZap } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const highlights = [
  {
    title: "Data Security",
    desc: "Your transactions are encrypted with AES-256 for maximum security.",
    icon: <DatabaseZap className="w-6 h-6 text-primary" />,
  },
  {
    title: "User Privacy",
    desc: "We only collect essential data and never share it with third parties.",
    icon: <Fingerprint className="w-6 h-6 text-primary" />,
  },
  {
    title: "Trusted & Compliant",
    desc: "Fully compliant with Bangladesh Bank regulations.",
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
  },
];

export default function PrivacySection() {
  return (
    <div className="py-20 px-6 lg:px-20 bg-gradient-to-br from-background via-muted to-background text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-primary">Privacy & Security</h2>
        <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
          We prioritize your safety and privacy. Learn more about how DigiPay keeps your data secure.
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-3 max-w-5xl mx-auto">
        {highlights.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Card className="p-6 bg-card border border-border/20 rounded-xl hover:shadow-lg transition-all">
              <div className="flex items-center justify-center mb-4 p-3 bg-primary/10 rounded-full">
                {item.icon}
              </div>
              <CardTitle className="text-lg font-semibold text-center">{item.title}</CardTitle>
              <CardContent className="text-center text-muted-foreground p-0 mt-2">
                {item.desc}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-10">
        <a
          href="/privacy-policy"
          className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition"
        >
          Read Full Policy
        </a>
      </div>
    </div>
  );
}
