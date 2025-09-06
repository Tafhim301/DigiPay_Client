import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"


export default function FAQPage() {
  const faqSections = [
  {
    title: "General Questions",
    description: "Learn the basics about DigiPay, its features, and safety measures.",
    faqs: [
      { question: "What is the Digital Wallet?", answer: "It’s an online wallet that lets you safely store money, send and receive funds, and make transactions easily — similar to services like bKash or Nagad." },
      { question: "Who can use DigiPay?", answer: "Anyone with an account! Users manage personal wallets, Agents help with cash-in/out, and Admins oversee the system." },
      { question: "Can I access DigiPay on mobile?", answer: "Yes! Fully responsive and works on phones, tablets, and desktops." },
      { question: "Is my money safe?", answer: "Yes! JWT-based login, encrypted passwords, strict access control, and full transaction recording ensure safety." },
      { question: "Do I need internet to use it?", answer: "Yes, a stable internet connection is required to access the app." },
      { question: "How do I reset my password?", answer: "Use the 'Forgot Password' link on the login page. Agents/Admins can contact the system admin for extra help." },
      { question: "What devices are supported?", answer: "Chrome, Firefox, Edge, Safari, mobile browsers, tablets, and desktops are fully supported." },
      { question: "Can I have multiple accounts?", answer: "Each user can have one primary account. Agents and Admins have specific roles tied to their account." }
    ]
  },
  {
    title: "User Operations",
    description: "Questions about sending money, deposits, withdrawals, and transaction tracking.",
    faqs: [
      { question: "How do I send money?", answer: "Navigate to the Send Money section, enter recipient phone/email, amount, and confirm." },
      { question: "How can I deposit money?", answer: "Use a nearby Agent or online deposit option to add balance to your wallet." },
      { question: "Can I withdraw money from ATMs?", answer: "Yes, some banks support wallet-to-ATM withdrawals. Check the withdrawal page." },
      { question: "Can I send money internationally?", answer: "Currently, DigiPay supports local transactions only." },
      { question: "How do I check my transaction history?", answer: "Visit the Transactions tab in your dashboard; filter and paginate results as needed." },
      { question: "Can I schedule transactions?", answer: "Future-dated transactions are not yet supported, but we plan to add this soon." },
      { question: "What if a transaction fails?", answer: "Failed transactions are logged, and your balance remains safe. Retry or contact support." },
      { question: "Can I add multiple recipients?", answer: "Currently, transactions are one-to-one. Bulk transfers are coming in future updates." }
    ]
  },
  {
    title: "Agent Operations",
    description: "FAQs for agents handling cash-in, cash-out, and commissions.",
    faqs: [
      { question: "How do I become an Agent?", answer: "Apply via the dashboard. Admins review applications for approval." },
      { question: "How do I process a cash-in?", answer: "Go to the Cash-In page, select user, enter amount, and confirm." },
      { question: "How do I process a cash-out?", answer: "Use the Cash-Out page, verify user balance, and confirm transaction." },
      { question: "Can I see my commission history?", answer: "Yes, your commissions are displayed in the Commission History tab." },
      { question: "What happens if a cash-in fails?", answer: "Failed cash-ins are logged. Retry or contact admin if repeated issues occur." },
      { question: "Are there transaction limits?", answer: "Yes, Admins set minimum and maximum limits per transaction and per day." },
      { question: "Can I manage multiple users?", answer: "Agents can serve multiple users, but only via the app interface; no batch operations yet." },
      { question: "How do I update my profile?", answer: "Go to Profile > Edit to update personal info like phone number or password." }
    ]
  },
  {
    title: "Admin & System",
    description: "For Admins: managing users, agents, fees, and monitoring transactions.",
    faqs: [
      { question: "How do Admins manage users?", answer: "Admins can block, unblock, or view details of all users." },
      { question: "How do Admins approve Agents?", answer: "Pending Agent requests appear in the dashboard; Admins can approve or decline." },
      { question: "Can Admins adjust system fees?", answer: "Yes, Admins can update transfer fees and limits via the Admin Dashboard." },
      { question: "How do Admins monitor transactions?", answer: "Admins have access to all transactions, filters, and export options." },
      { question: "Can Admins restore failed transactions?", answer: "Failed transactions can be retried but cannot be manually altered." },
      { question: "Is there a user activity log?", answer: "Yes, all login, transactions, and changes are logged for transparency." },
      { question: "Can Admins enable 2FA?", answer: "Yes, the system supports enabling two-factor authentication for all roles." },
      { question: "How do Admins generate reports?", answer: "Reports can be generated in CSV format from the Reports tab." }
    ]
  }
]

return (
    <div className="container mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8">
      {faqSections.map((section, sIndex) => (
        <Card key={sIndex} className="shadow-md rounded-2xl border border-gray-200 dark:border-gray-700 mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">{section.title}</CardTitle>
            <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">{section.description}</p>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {section.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${sIndex}-${index}`} className="border-b border-gray-200 dark:border-gray-700">
                  <AccordionTrigger className="text-left text-base font-medium hover:text-blue-500 transition-colors">
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                      {faq.question}
                    </motion.div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                      {faq.answer}
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}