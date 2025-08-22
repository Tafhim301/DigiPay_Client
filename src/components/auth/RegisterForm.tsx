import { Button } from "@/components/ui/button";
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";

import { Link, useLocation, useNavigate } from "react-router";
import PasswordInput from "../ui/PasswordInput";
import z from 'zod'
import { useRegisterMutation } from "@/redux/feature/Auth/auth.api";
import { toast } from "sonner";










const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  phone: z
    .string()
    .regex(/^01[3-9][0-9]{8}$/, "Please provide a valid Bangladesh phone number"),

  password: z.string().min(8, { message: "Password must be at least 8 characters.", }),
  confirmPassword: z.string(),

}).refine((data) => data.password === data.confirmPassword, {
  message: "Password does not match",
  path: ["confirmPassword"]
})



export default function RegisterForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {

  const [register] = useRegisterMutation()
  const navigate = useNavigate();
  const location = useLocation();





  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: '',
      password: "",
      confirmPassword: ""

    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const userInfo = {
      name: data.name,
      phone: data.phone,
      password: data.password,


    };

    const toastId = toast.loading("Proccesssing")

    try {

      const res = await register(userInfo).unwrap();
      console.log(res);
      toast.success("User Registration Successful", { id: toastId });

      form.reset();

      if(location.state){
        navigate(location.state);
      }

      else {
        navigate('/')
      }



    } catch (error) {
      console.log(error)
      toast.error("Sorry an unexpected error occured", { id: toastId })

    }







  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register your account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your details to create an account
        </p>
      </div>

      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" type="text" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="01XXXXXXXXX" type="tel" {...field} />

                  </FormControl>
                  <FormDescription className="sr-only">
                    Enter Your Phone Number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field}></PasswordInput>
                  </FormControl>
                  <FormDescription className="sr-only">
                    Enter your password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field}></PasswordInput>
                  </FormControl>
                  <FormDescription className="sr-only">
                    Please Confirm Your Password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />



            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </Form>




      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 font-bold underline">
          Login
        </Link>
      </div>
    </div>
  );
}