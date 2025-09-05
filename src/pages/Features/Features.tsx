

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
} from "lucide-react"
import { motion } from "framer-motion"

export default function FeaturesPage() {
  const features = [
    {
      title: "Easy Money Transfer",
      description: "Send and receive money instantly to any wallet user with just a few taps.",
      icon: Send,
    },
    {
      title: "Cash-In & Cash-Out",
      description: "Deposit or withdraw money seamlessly through verified Agents.",
      icon: Banknote,
    },
    {
      title: "Secure Transactions",
      description: "Your money is safe with role-based access, JWT authentication, and encryption.",
      icon: Shield,
    },
    {
      title: "Wallet Management",
      description: "Track your balance, deposits, withdrawals, and transfers in real time.",
      icon: Wallet,
    },
    {
      title: "Transaction History",
      description: "View detailed records of all your past transactions with filtering support.",
      icon: History,
    },
    {
      title: "Analytics Dashboard",
      description: "Admins can monitor transactions, approvals, and overall system health.",
      icon: BarChart,
    },
    {
      title: "Multi-role System",
      description: "Users, Agents have unique dashboards and permissions.",
      icon: Users,
    },
    {
      title: "Mobile Friendly",
      description: "Enjoy a fully responsive design that works smoothly on any device.",
      icon: Smartphone,
    },
  ]

  return (
    <div className=" bg-gray-50 dark:bg-gray-900 py-16 rounded-b-3xl">
      <div className="container mx-auto px-6 md:px-20 ">
      
        <div className="text-center mb-14">
          <div className="flex justify-center mb-4">
            <Settings className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Features of Our Digital Wallet
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Manage money smarter with a secure and user-friendly wallet system.
          </p>
        </div>

     
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col justify-between shadow-sm border border-gray-200 dark:border-blue-700 hover:shadow-lg hover:scale-[1.02] transition-all rounded-2xl">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <feature.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
