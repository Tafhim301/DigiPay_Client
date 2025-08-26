/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const contactFormSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(5, "Message should be at least 5 characters"),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export default function ContactPage() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  const onSubmit = (_values: ContactFormValues) => {
    //This is just a simulated submission the backend api with rtk will be added later.

    toast.success("Thank you for your feedback! We'll get back to you soon.")
    form.reset()
  }

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4 sm:px-6 lg:px-8 ">
      <Card className="shadow-md rounded-2xl border border-gray-200 dark:border-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">📬 Contact Us</CardTitle>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Have questions or feedback? Send us a message.
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write your message..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-2">
                Send Message
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
