import { motion } from "framer-motion";
import {
    ShieldCheck,
    DatabaseZap,
    Fingerprint,
    Scale,
    MessageCircleCode,

} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const listVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.6,
            ease: "easeOut" as const,
        },
    }),
};

const policyHighlights = [
    {
        title: "Robust Data Security",
        desc: "We use AES-256 encryption and advanced security protocols to ensure your transactions and personal information are always protected.",
        icon: <DatabaseZap className="w-8 h-8 text-primary" />,
    },
    {
        title: "Absolute User Privacy",
        desc: "You are in full control. We only collect the minimum necessary data required for secure transactions and regulatory compliance.",
        icon: <Fingerprint className="w-8 h-8 text-primary" />,
    },
    {
        title: "Ethical Data Usage",
        desc: "Your data is used solely to improve our services and your experience. We have a strict policy against selling or sharing your data with third-party marketers.",
        icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    },
    {
        title: "Legal Compliance",
        desc: "DigiPay fully adheres to the guidelines set by Bangladesh Bank and all applicable financial laws to ensure transparency and accountability.",
        icon: <Scale className="w-8 h-8 text-primary" />,
    },

];

const fullPolicyDetails = [
    {
        title: "1. Information We Collect",
        content: (
            <div className="space-y-2 text-muted-foreground">
                <p>To provide our services, we collect necessary information such as your full name, phone number, National ID (NID) for verification, transaction history, and device information for security purposes. All data is collected with your explicit consent.</p>
            </div>
        ),
    },
    {
        title: "2. How We Use Your Information",
        content: (
            <div className="space-y-2 text-muted-foreground">
                <p>Your information is used to:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Process transactions securely and efficiently.</li>
                    <li>Verify your identity to prevent fraud (KYC).</li>
                    <li>Communicate with you about your account and services.</li>
                    <li>Comply with legal obligations and requests from regulatory bodies like Bangladesh Bank.</li>
                    <li>Improve and personalize our application and services.</li>
                </ul>
            </div>
        ),
    },
    {
        title: "3. Information Sharing and Disclosure",
        content: (
            <div className="space-y-2 text-muted-foreground">
                <p>We do not share your personal information with external companies for their own promotional purposes. We may only share data with trusted partners for identity verification, or with law enforcement agencies when required by law.</p>
            </div>
        ),
    },
    {
        title: "4. Your Rights and Choices",
        content: (
            <div className="space-y-2 text-muted-foreground">
                <p>You have the right to access, update, or correct your personal information through the app settings. You also have the right to request the closure of your account, subject to our data retention policies for legal and regulatory compliance.</p>
            </div>
        ),
    },
];

export default function PrivacyPolicy() {
    return (
        <div className="bg-gradient-to-br from-background via-muted to-background text-foreground py-24 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-5xl space-y-20">

                <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <div className="flex justify-center mb-4">
                        <ShieldCheck className="w-16 h-16 text-primary" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-primary tracking-tight">
                        Privacy & Security Policy
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        At DigiPay, your trust is our most important asset. We are committed to protecting your privacy and keeping your data secure with transparency and integrity.
                    </p>
                    <p className="text-sm text-muted-foreground mt-4 font-medium">
                        Last Updated: September 7, 2025
                    </p>
                </motion.div>


                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
                    {policyHighlights.map((highlight, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={listVariants}
                        >
                            <Card className="h-full p-6 bg-card border border-border/20 rounded-xl shadow-md
                             hover:shadow-lg hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2">
                                <CardHeader className="flex items-center p-0 mb-4">
                                    <div className="p-4 bg-primary/10 rounded-full">
                                        {highlight.icon}
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0 text-center">
                                    <CardTitle className="text-xl font-semibold mb-2 text-foreground">{highlight.title}</CardTitle>
                                    <p className="text-muted-foreground">{highlight.desc}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>


                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="text-3xl font-bold text-center mb-10 text-foreground">
                        The Fine Print: Full Policy Details
                    </h2>
                    <Accordion type="single" collapsible className="w-full bg-card p-4 sm:p-8 rounded-xl border border-border/20">
                        {fullPolicyDetails.map((item, i) => (
                            <AccordionItem key={i} value={`item-${i}`}>
                                <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">
                                    {item.title}
                                </AccordionTrigger>
                                <AccordionContent className="text-base pt-2">
                                    {item.content}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="text-center bg-card p-8 rounded-2xl border border-primary/30">
                        <MessageCircleCode className="w-12 h-12 text-primary mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-foreground mb-2">Have Questions?</h3>
                        <p className="text-muted-foreground mb-4">
                            If you have any questions about our privacy policy, please don't hesitate to reach out.
                        </p>
                        <a
                            href="mailto:tafhimul301@gmail.com"
                            className="inline-block mt-4 px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow 
             hover:scale-105 hover:shadow-lg transition"
                        >
                            Contact Support
                        </a>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}