import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Goal, ShieldCheck, Heart, Lightbulb, ArrowRight, Wallet, Users, BarChart } from "lucide-react";


const listVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut" as const,
    },
  }),
};



function AboutIntro() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center max-w-4xl mx-auto"
    >
      <Badge variant="default" className="mb-4">Our Vision</Badge>
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-primary tracking-tight">
        About DigiPay
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
        DigiPay is a modern, secure, and user-friendly digital wallet system inspired by the success of services like bKash and Nagad. Our mission is to make financial transactions{" "}
        <strong className="text-foreground font-semibold">fast, safe, and accessible for everyone in Bangladesh</strong>.
      </p>
    </motion.div>
  );
}

export function OurStory() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="bg-card p-8 rounded-2xl border border-border/20 h-full"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-primary/10 rounded-full">
          <BookOpen className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        DigiPay was born from a vision to create a{" "}
        <strong className="text-foreground">truly cashless ecosystem</strong> where users, agents,
        and administrators can interact seamlessly. By combining cutting-edge technology with a clean, intuitive
        interface, we empower people to{" "}
        <strong className="text-foreground">send, receive, and manage money with effortless grace</strong>.
      </p>
    </motion.div>
  );
}


export function OurMission() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="bg-card p-8 rounded-2xl border border-border/20 h-full"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-primary/10 rounded-full">
          <Goal className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        Our core mission is to champion <strong className="text-foreground">financial inclusivity</strong> by making digital payments available
        to everyone — from bustling city centers to remote rural areas. We are committed to building a{" "}
        <strong className="text-foreground">secure, transparent, and role-based</strong> financial system that adapts to the diverse needs of our users.
      </p>
    </motion.div>
  );
}

import { Clock, Smartphone, Globe, TrendingUp } from "lucide-react";
import { useUserInfoQuery } from "@/redux/feature/Auth/auth.api";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import BlogSection from "../Blogs/BlogSection";

export function WhyChooseUs() {
const reasons = [
  { title: "Fast Transactions", desc: "Transfer money instantly with minimal delays.", icon: <Clock className="w-8 h-8 text-primary" /> },
  { title: "Accessible Anywhere", desc: "Seamlessly use DigiPay across Bangladesh.", icon: <Globe className="w-8 h-8 text-primary" /> },
  { title: "Smart & Simple", desc: "An intuitive mobile-first design.", icon: <Smartphone className="w-8 h-8 text-primary" /> },
  { title: "Growth Focused", desc: "Helping businesses scale with secure solutions.", icon: <TrendingUp className="w-8 h-8 text-primary" /> },
  { title: "Low Fees", desc: "Save more with affordable digital transfers.", icon: <Wallet className="w-8 h-8 text-primary" /> },
  { title: "Wide Agent Network", desc: "Thousands of trusted agents ready to help.", icon: <Users className="w-8 h-8 text-primary" /> },
    {
      title: "Analytics Dashboard",
      desc:
        "Admins can monitor transaction trends, approvals, and system health at a glance. ",
      icon: <BarChart></BarChart>,
    },
    {
      title: "Multi-role System",
      desc:
        "Users, Agents, and Admins enjoy unique dashboards and permissions.",
      icon: <Users></Users>,
    },
];


  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-10">Why Choose DigiPay?</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {reasons.map((r, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={listVariants}
          >
            <Card className="p-6 text-center bg-card shadow-xl border-3 hover:scale-105 h-full  border-border/20 hover:border-primary/80 rounded-xl  hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-full">{r.icon}</div>
              </div>
              <CardTitle className="text-xl font-semibold mb-2">{r.title}</CardTitle>
              <p className="text-muted-foreground">{r.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}



function Testimonials() {
  const reviews = [
    { name: "Ayesha Rahman", text: "DigiPay made sending money to my family in the village so much easier!", role: "Small Business Owner" },
    { name: "Tanvir Hossain", text: "I use DigiPay daily — it’s fast, secure, and hassle-free.", role: "Student" },
  ];

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-10">What People Say</h2>
      <div className="grid gap-8 md:grid-cols-2">
        {reviews.map((r, i) => (
          <Card key={i} className="p-6 bg-card border border-border/20 shadow-md">
            <p className="text-muted-foreground mb-4">“{r.text}”</p>
            <CardTitle className="text-lg">{r.name}</CardTitle>
            <p className="text-sm text-primary">{r.role}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}


export function CallToAction() {
  const { data , isLoading} = useUserInfoQuery(undefined);
  const userRole = data?.data?.role;
  return (
    <div className=" text-center dark:text-primary-foreground py-16 px-6 rounded-2xl shadow">
      <h2 className="text-4xl font-bold mb-4">Ready to Experience DigiPay?</h2>
      <p className="mb-6 text-lg">Join thousands of users already enjoying fast, secure, and effortless digital transactions.</p>
      {
        userRole ? <Link to={`/${userRole.toLowerCase()}`}>  <Button disabled={isLoading} className="px-6 py-3 bg-background text-primary font-semibold rounded-lg shadow hover:text-white hover:scale-105 transition">
        Get Started Today <ArrowRight></ArrowRight>
      </Button></Link>
       : <Link to={`/login`}>  <Button disabled={isLoading} className="px-6 py-3 bg-background text-primary font-semibold rounded-lg shadow hover:text-white hover:scale-105 transition">
        Get Started Today <ArrowRight></ArrowRight>
      </Button></Link>
      }
    
    </div>
  );
}



export function CoreValues() {
  const values = [
    {
      title: "Security First",
      desc: "We prioritize the safety and integrity of every transaction, employing robust security measures to ensure your money is always protected.",
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    },
    {
      title: "User-Centric Design",
      desc: "Our platform is crafted with simplicity and elegance, ensuring that anyone can use DigiPay with confidence and without hassle.",
      icon: <Heart className="w-8 h-8 text-primary" />,
    },
    {
      title: "Continuous Innovation",
      desc: "We are dedicated to constant improvement, regularly introducing new features to keep you at the forefront of the digital payment era.",
      icon: <Lightbulb className="w-8 h-8 text-primary" />,
    },
  ];

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-10 text-foreground">Our Core Values</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {values.map((value, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={listVariants}
          >
            <Card className="h-full p-6 text-center bg-card border border-border/20 rounded-xl shadow-md
                           hover:shadow-lg hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="flex items-center justify-center p-0 mb-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  {value.icon}
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <CardTitle className="text-xl font-semibold mb-2 text-foreground">{value.title}</CardTitle>
                <p className="text-muted-foreground">{value.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


function MeetTheTeam() {
  const team = [
    { name: "Atif Aslam", role: "Project Lead & Architect", img: "https://ibb.co.com/jkc4y5K" },
    { name: "Sarah Khan", role: "Lead Frontend Engineer", img: "https://ibb.co.com/cTg2Jzn" },
    { name: "Rahul Das", role: "Lead Backend Engineer", img: "https://ibb.co.com/HC58ZmK" },
  ];

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-10 text-foreground">Meet Our Team</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {team.map((member, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={listVariants}
          >
            <Card className="h-full p-6 text-center bg-card border border-border/20 rounded-xl shadow-md
                           hover:shadow-lg hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="flex flex-col items-center p-0">
                <Avatar className="w-28 h-28 mb-4 border-4 border-primary/50">
                  <AvatarImage src={member.img} alt={member.name} className="object-cover" />
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary font-semibold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl font-semibold text-foreground">{member.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-1">
                <p className="text-primary font-medium">{member.role}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-br from-background via-muted to-background text-foreground py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto space-y-24">
        <AboutIntro />
        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          <OurStory />
          <OurMission />
        </div>
        <CoreValues />
        <WhyChooseUs />

        <MeetTheTeam />
        <Testimonials />
        <BlogSection></BlogSection>

        <CallToAction />
      </div>
    </div>
  );
}
