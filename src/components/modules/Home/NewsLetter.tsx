"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Loader2, Gift, Sparkles, Rocket } from "lucide-react";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function NewsletterSection() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Subscribing email:", values.email);
    toast.success("Thank you for subscribing to our newsletter!");
    form.reset();
  }

  const perks = [
    { title: "Early Offers", desc: "Get promotions before anyone else.", icon: <Gift className="w-7 h-7 text-primary"/> },
    { title: "Exclusive Tips", desc: "Helpful insights for smarter payments.", icon: <Sparkles className="w-7 h-7 text-primary"/> },
    { title: "Product Updates", desc: "Be the first to know about new features.", icon: <Rocket className="w-7 h-7 text-primary"/> },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="bg-transparent rounded-2xl text-center w-full border border-border/20"
    >
      <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-extrabold text-primary mb-4">
        Stay Ahead with DigiPay
      </motion.h2>

      <motion.p variants={itemVariants} className="text-muted-foreground mb-8 max-w-2xl mx-auto">
        Subscribe to our newsletter for exclusive tips, early access to offers, and important product updates delivered right to your inbox.
      </motion.p>

      <motion.div variants={itemVariants}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row justify-center items-start gap-3 max-w-lg mx-auto"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full relative">
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input type="email" placeholder="your.email@example.com" className="pl-10 h-12" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full sm:w-auto h-12" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Subscribing...
                </>
              ) : (
                "Subscribe"
              )}
            </Button>
          </form>
        </Form>
      </motion.div>

      <motion.p variants={itemVariants} className="text-sm text-muted-foreground mt-4">
        We respect your privacy. No spam, ever.
      </motion.p>

      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
        {perks.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card className="bg-background/50 text-center p-4 border-dashed border-border/50 shadow hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader className="p-0 flex-row justify-center items-center mb-3">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="p-3 bg-primary/10 rounded-full inline-flex"
                >
                  {item.icon}
                </motion.div>
              </CardHeader>
              <CardContent className="p-0">
                <CardTitle className="text-lg font-semibold text-foreground mb-1">{item.title}</CardTitle>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
