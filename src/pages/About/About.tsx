import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function AboutPage() {
  return (
    <div className="container bg-slate-100 dark:bg-gray-900 mx-auto px-6 py-12 rounded-b-2xl">
     
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">About DigiPay</h1>
        <p className="text-lg text-muted-foreground">
          Pay is a modern, secure, and user-friendly tal wallet system inspired by bKash and Nagad.
          Our mission is to make financial transactions{" "}
          <strong className="text-primary">fast, safe, and accessible for everyone</strong>.
        </p>
      </motion.div>

     
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-semibold mb-4 text-primary">Our Story</h2>
        <p className="text-muted-foreground leading-relaxed">
          Pay was built with the vision of creating a{" "}
          <strong className="text-primary">cashless ecosystem</strong> where users, agents,
          and admins can interact seamlessly. By combining cutting-edge technology with a clean and
          simple interface, we empower people to{" "}
          <strong className="text-primary">send, receive, and manage money effortlessly</strong>.
        </p>
      </motion.div>

     
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-semibold mb-4 text-primary">Our Mission</h2>
        <p className="text-muted-foreground leading-relaxed">
          Our mission is to bring <strong className="text-primary">financial inclusivity</strong> by making tal payments available
          to everyone — whether in cities or rural areas. We aim to create a{" "}
          <strong className="text-primary">secure, transparent, and role-based</strong> financial system that adapts to your needs.
        </p>
      </motion.div>

     
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Our Core Values</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Security First",
              desc: "We prioritize safety and reliability in every transaction to ensure your money is always protected."
            },
            {
              title: "User-Centric",
              desc: "Our platform is designed with simplicity, so anyone can use Pay without hassle."
            },
            {
              title: "Innovation",
              desc: "We continuously improve with new features, keeping you ahead in the tal payment era."
            },
          ].map((value, i) => (
            <Card key={i} className="shadow-sm border border-primary/30 hover:shadow-md transition">
              <CardHeader>
                <CardTitle className="text-primary">{value.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">{value.desc}</CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

     
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-8 text-center">Meet Our Team</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { name: "Atif Islam", role: "Project Lead", img: "/team1.jpg" },
            { name: "Sarah Khan", role: "Frontend Engineer", img: "/team2.jpg" },
            { name: "Rahul Das", role: "Backend Engineer", img: "/team3.jpg" },
          ].map((member, i) => (
            <Card
              key={i}
              className="shadow-md border border-primary/30 hover:shadow-lg transition duration-300"
            >
              <CardHeader className="flex flex-col items-center">
                <Avatar className="w-20 h-20 mb-3 border-4 border-primary">
                  <AvatarImage src={member.img} alt={member.name} />
                  <AvatarFallback className="bg-white text-primary border border-primary">
                    {member.name[0]}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">{member.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                {member.role}
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
