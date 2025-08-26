import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FAQPage() {
  const faqs = [
    {
      question: "What is the Digital Wallet system?",
      answer:
        "It’s a secure wallet platform similar to bKash or Nagad, allowing users to send, receive, deposit, and withdraw money seamlessly. Agents can handle cash-in/out and Admins can manage the ecosystem.",
    },
    {
      question: "Who can use the Digital Wallet?",
      answer:
        "There are three roles: Users, Agents, and Admins. Users manage personal wallets, Agents facilitate cash-in/out, and Admins oversee transactions, approvals, and user management.",
    },
    {
      question: "How do I become an Agent?",
      answer:
        "Any registered User can apply to become an Agent from their dashboard. Admins will review and approve or reject the application based on eligibility.",
    },
    {
      question: "Is my money secure?",
      answer:
        "Yes. The system uses JWT-based authentication, bcrypt password hashing, and role-based access controls to ensure security. Every transaction is recorded and traceable.",
    },
    {
      question: "What types of transactions are supported?",
      answer:
        "Users can Top-up, Withdraw, Send Money, and Cash Out. Agents can perform Cash-In and Cash-Out operations for users. Admins can view and manage all transactions.",
    },
    {
      question: "Can I view my transaction history?",
      answer:
        "Yes. Users and Agents can view their personal transaction history with filtering and pagination. Admins can view all transactions in the system.",
    },
    {
      question: "What happens if I forget my password?",
      answer:
        "You can reset your password from the login screen. If you’re an Agent or Admin, contact the system administrator for further assistance.",
    },
    {
      question: "Is the system mobile-friendly?",
      answer:
        "Absolutely. The frontend is fully responsive and optimized for desktops, tablets, and mobile devices.",
    },
  ]

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 sm:px-6 lg:px-8">
      <Card className="shadow-md rounded-2xl border border-gray-200 dark:border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">❓ Frequently Asked Questions</CardTitle>
          <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
            Find answers to common questions about using the Digital Wallet.
          </p>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
