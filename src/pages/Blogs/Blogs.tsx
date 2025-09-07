import { motion } from "framer-motion";
import { Shield, Globe, CreditCard, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function Blogs() {
  const blogs = [
    {
      id: 1,
      title: "How to Use DigiPay Safely",
      desc: "Stay secure while making digital transactions. Learn the best practices to protect your money and privacy.",
      icon: <Shield className="w-8 h-8 text-primary" />,
      link: "/blogs/safety", 
    },
    {
      id: 2,
      title: "Why Digital Payments Matter in Bangladesh",
      desc: "Discover how digital payments are shaping the financial future of Bangladesh and empowering people.",
      icon: <Globe className="w-8 h-8 text-primary" />,
      link: "/blogs/payments",
    },
    {
      id: 3,
      title: "The Future of Cashless Transactions",
      desc: "Explore the rise of cashless economies and how DigiPay is leading the digital payment revolution.",
      icon: <CreditCard className="w-8 h-8 text-primary" />,
      link: "/blogs/future",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-12"
      >
        📰 DigiPay Blogs & Resources
      </motion.h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, i) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="p-6 bg-card border border-border/20 rounded-xl shadow-md hover:shadow-lg hover:border-primary/50 transition flex flex-col"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-full">{blog.icon}</div>
              <h2 className="text-xl font-semibold text-foreground">
                {blog.title}
              </h2>
            </div>
            <p className="text-muted-foreground flex-grow">{blog.desc}</p>

            <Link
              to={blog.link}
              className="mt-6 inline-block text-primary font-medium hover:underline"
            >
              Read More <ArrowRight></ArrowRight>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
