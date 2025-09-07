import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Shield, Globe } from "lucide-react";
import { Link } from "react-router";

const blogs = [
  {
    title: "How to Use DigiPay Safely",
    desc: "Learn best practices for securing your account, avoiding scams, and making sure your transactions stay protected.",
    icon: <Shield className="w-8 h-8 text-primary" />,
    link: "/blog/how-to-use-digipay-safely",
  },
  {
    title: "Why Digital Payments Matter in Bangladesh",
    desc: "Discover how digital wallets like DigiPay are transforming the financial landscape, empowering rural and urban communities alike.",
    icon: <Globe className="w-8 h-8 text-primary" />,
    link: "/blog/why-digital-payments-matter",
  },
  {
    title: "The Future of Cashless Transactions",
    desc: "Explore how innovations like QR payments, instant transfers, and AI-driven fraud detection are shaping tomorrow’s economy.",
    icon: <BookOpen className="w-8 h-8 text-primary" />,
    link: "/blog/future-of-cashless-transactions",
  },
];

const blogVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut" as const,
    },
  }),
};

export default function BlogSection() {
  return (
    <div className="text-center py-20">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-bold mb-6 text-foreground"
      >
        📰 Resources & Insights
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12"
      >
        Stay informed with the latest articles on digital payments, security, and financial growth in Bangladesh.
      </motion.p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={blogVariants}
          >
            <Card className="h-full p-6 flex flex-col justify-between bg-card border border-border/20 rounded-xl shadow-md
                           hover:shadow-lg hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-full">{blog.icon}</div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {blog.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col justify-between flex-1">
                <p className="text-muted-foreground mb-6">{blog.desc}</p>
                <Link to={blog.link}>
                  <Button variant="outline" className="w-full group">
                    Read More
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="ml-2"
                    >
                      →
                    </motion.span>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
