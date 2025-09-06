import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Smartphone,
  Shield,
  Send,
  Wallet,
  BarChart,
  Users,
  Banknote,
  History,
  Settings,
  Gift,
  CreditCard,
  Globe,
  PieChart,
  Bell,
  Key,
  Calendar,


  Cpu,
  Zap,
  Repeat,
  Percent,
  Unlock,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Easy Money Transfer",
    description:
      "Send and receive money instantly to any wallet user. Transfers are 24/7, seamless, and cost-effective, eliminating delays typical of traditional banking.",
    icon: Send,
  },
  {
    title: "Cash-In & Cash-Out",
    description:
      "Deposit or withdraw funds conveniently at verified agents or partner locations, anytime. No long queues or banking hours required.",
    icon: Banknote,
  },
  {
    title: "Secure Transactions",
    description:
      "Enjoy bank-level security with role-based access, JWT authentication, and end-to-end encryption. Your money and data are always protected.",
    icon: Shield,
  },
  {
    title: "Wallet Management",
    description:
      "Track your balance, deposits, withdrawals, and transfers in real time with an intuitive interface designed for effortless money management.",
    icon: Wallet,
  },
  {
    title: "Transaction History",
    description:
      "View comprehensive records of all past transactions with easy filtering and exporting options. Get insights beyond standard bank statements.",
    icon: History,
  },
  {
    title: "Analytics Dashboard",
    description:
      "Admins can monitor transaction trends, approvals, and system health at a glance. Gain actionable insights to make data-driven decisions.",
    icon: BarChart,
  },
  {
    title: "Multi-role System",
    description:
      "Users, Agents, and Admins enjoy unique dashboards and permissions, ensuring smooth operations with granular control over access.",
    icon: Users,
  },
  {
    title: "Mobile Friendly",
    description:
      "Enjoy a fully responsive, mobile-first design that works seamlessly across all devices, giving users flexibility on-the-go.",
    icon: Smartphone,
  },

  {
    title: "Instant Credit Services",
    description: "Access instant micro-loans directly through the wallet with transparent terms and minimal processing.",
    icon: CreditCard,
  },
  {
    title: "Global Payments",
    description: "Send money internationally with low fees and transparent exchange rates, making cross-border payments effortless.",
    icon: Globe,
  },
  {
    title: "Financial Analytics",
    description: "Track spending patterns, generate detailed reports, and get personalized insights to optimize your finances.",
    icon: PieChart,
  },
  {
    title: "Real-Time Notifications",
    description: "Receive instant alerts for all account activities, keeping you updated and in control of your funds.",
    icon: Bell,
  },
  {
    title: "Strong Authentication",
    description: "Enable two-factor authentication and other security measures to keep your account protected from unauthorized access.",
    icon: Key,
  },
  {
    title: "Scheduled Payments",
    description: "Set up recurring payments or bill reminders, making sure you never miss an important transaction again.",
    icon: Calendar,
  },
  {
    title: "Rewards & Loyalty",
    description: "Earn cashback, rewards, and referral bonuses to maximize the value of every transaction.",
    icon: Gift,
  },
  {
    title: "Advanced Reporting",
    description: "Generate multi-dimensional financial reports to analyze trends and make informed decisions.",
    icon: PieChart,
  },
  {
    title: "Fast Processing",
    description: "Experience lightning-fast transaction processing thanks to optimized backend systems and smart queuing.",
    icon: Zap,
  },
  
  {
    title: "High-Performance Engine",
    description: "Our platform leverages cutting-edge technology to ensure reliability, low latency, and 99.99% uptime.",
    icon: Cpu,
  },
  {
    title: "Interest & Cashback Programs",
    description: "Benefit from attractive interest on wallet balances and exclusive cashback offers.",
    icon: Percent,
  },
  {
    title: "Automated Transfers",
    description: "Set up smart auto-transfers for recurring needs, savings goals, or bills without manual intervention.",
    icon: Repeat,
  },
  {
    title: "Unlock Premium Features",
    description: "Upgrade to premium accounts to access advanced analytics, higher limits, and exclusive services.",
    icon: Unlock,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.6,
      ease: "easeOut" as const,
    },
  }),
};


export default function FeaturesPage() {
  return (
    <div className="bg-gradient-to-br from-background/90 via-muted to-background/80 text-foreground py-24 px-4 md:px-12 overflow-hidden">
      <div className="container mx-auto">

        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <Settings className="w-16 h-16 text-primary animate-spin-slow" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5  tracking-tight">
            A Universe of Features
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore everything DigiPay has to offer. Our platform is packed with powerful tools designed to simplify your financial life and provide unparalleled security and convenience.
          </p>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
            >
              <Card className="h-full flex flex-col p-6 bg-card border-3 border-border/20 rounded-xl shadow-xl hover:shadow-lg hover:border-primary/80 transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="flex flex-col p-0 flex-grow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-full flex items-center justify-center">
                      <feature.icon className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-muted-foreground leading-relaxed flex-grow">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
      <div className="mt-16 text-center">
        <Link to="/contact">
          <Button
            variant="default"
            size="lg"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full
                       bg-primary text-primary-foreground hover:bg-primary/90
                       transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get in Touch
          </Button>
        </Link>
      </div>
    </div>
  );
}