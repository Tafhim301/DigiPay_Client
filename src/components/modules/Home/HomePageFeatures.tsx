import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CreditCard, Shield, BarChart2, Users, DollarSign, Gift } from "lucide-react";
import { Link } from "react-router"; // Use react-router-dom for Link
import { motion } from "framer-motion";

const features = [
    {
        title: "Instant Money Transfer",
        description:
            "Unlike traditional banks where transfers can take hours or even days, DigiPay allows instant, seamless money transfers across accounts and wallets, 24/7, with minimal fees and maximum convenience.",
        icon: <CreditCard className="w-7 h-7 text-primary" />,
    },
    {
        title: "Secure Wallet",
        description:
            "Our wallet offers bank-level security with end-to-end encryption, multi-factor authentication, and continuous monitoring, giving you peace of mind for storing and managing your funds digitally.",
        icon: <Shield className="w-7 h-7 text-primary" />,
    },
    {
        title: "Detailed Transaction History",
        description:
            "Get a clear, comprehensive view of all your financial activity. Track payments, deposits, withdrawals, and transfers with easy-to-read reports, insights, and export options, surpassing traditional bank statements.",
        icon: <BarChart2 className="w-7 h-7 text-primary" />,
    },
    {
        title: "Multi-role Access & Permissions",
        description:
            "DigiPay supports multiple user roles—Admins, Agents, and Customers—offering fine-grained access control, role-based dashboards, and actionable insights that traditional banking apps rarely provide.",
        icon: <Users className="w-7 h-7 text-primary" />,
    },
    {
        title: "Cash In / Cash Out Anywhere",
        description:
            "Seamlessly deposit or withdraw funds at supported banks, agents, and partner locations. Enjoy flexibility without long queues or banking hours, making finance effortless.",
        icon: <DollarSign className="w-7 h-7 text-primary" />,
    },
    {
        title: "Referral Programs & Rewards",
        description:
            "Maximize your earnings with our referral system, cashback offers, and promotional rewards, giving you more benefits than standard banking loyalty programs.",
        icon: <Gift className="w-7 h-7 text-primary" />,
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * 0.1,
            duration: 0.6,
            ease: "easeOut" as const,
        },
    }),
};

export default function HomePageFeaturesSection() {
    return (
        <section className="bg-gradient-to-br from-background via-muted to-background text-foreground py-24 px-4 lg:px-20 overflow-hidden">
            <div className="max-w-7xl mx-auto text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-extrabold mb-5 tracking-tight">
                    Unleash the Power of Modern Finance
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    DigiPay bridges the gap between traditional banking and cutting-edge fintech solutions. Explore features that make financial management smarter, faster, and more secure than ever before.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        custom={index}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={cardVariants}
                    >
                        <Card className="h-full flex flex-col justify-between p-6 bg-card border-3 border-border/20 rounded-xl shadow-md
                          hover:shadow-lg hover:border-primary/80 transition-all duration-300 transform hover:-translate-y-2">
                            <CardContent className="flex flex-col p-0">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-primary/10 rounded-full flex items-center justify-center">
                                        {feature.icon}
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

            <div className="mt-16 text-center">
                <Link to="/features">
                    <Button
                        variant="default"
                        size="lg"
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full
                       bg-primary text-primary-foreground hover:bg-primary/90
                       transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Explore All Features
                        <ArrowRight className="w-5 h-5 ml-1 transition-all group-hover:translate-x-1" />
                    </Button>
                </Link>
            </div>
        </section>
    );
}