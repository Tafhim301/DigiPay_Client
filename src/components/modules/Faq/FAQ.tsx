import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


export default function FAQPage() {
   const faqs = [
    {
      question: "What is the Digital Wallet?",
      answer:
        "It’s an online wallet that lets you safely store money, send and receive funds, and make transactions easily — similar to services like bKash or Nagad.",
    },
    {
      question: "Who can use it?",
      answer:
        "Anyone with an account! Regular users manage their personal wallets, Agents help with cash-in/out, and Admins oversee the whole system.",
    },
    {
      question: "How do I become an Agent?",
      answer:
        "If you already have a user account, you can apply to become an Agent right from your dashboard. Once you apply, an Admin will review and approve or decline your request.",
    },
    {
      question: "Is my money safe?",
      answer:
        "Yes! We use secure login (JWT), encrypted passwords, and strict access control. Every transaction is recorded so your money is always protected.",
    },
    {
      question: "What transactions can I do?",
      answer:
        "Users can send money, add balance, withdraw, and cash out. Agents can help users with cash-in and cash-out. Admins can monitor and manage everything.",
    },
    {
      question: "Can I see my past transactions?",
      answer:
        "Of course. You can check your full transaction history anytime. Admins can also view system-wide activity.",
    },
    {
      question: "What if I forget my password?",
      answer:
        "No worries. You can reset it on the login screen. Agents and Admins can also contact the system administrator if they need extra help.",
    },
    {
      question: "Can I use it on mobile?",
      answer:
        "Yes! The platform is mobile-friendly and works smoothly on phones, tablets, and desktops.",
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
