import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/feature/Auth/auth.api";

import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate} from "react-router";
import { toast } from "sonner";






export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {

  const [login] = useLoginMutation();
    const navigate = useNavigate();
    const location = useLocation();
 
  const form = useForm();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Proccessing')
   try {
    const res = await login(data).unwrap()
    console.log(res);
    toast.success("login Successful", {id : toastId})
    navigate(location.state || '/')
   } catch (error) {

    toast.error("Invalid Credentials",{id : toastId});

    console.log(error)

    
   }
 


  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="01XXXXXXXXXXX"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
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
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>


      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" replace className="underline font-bold text-blue-600">
          Register
        </Link>
      </div>
    </div>
  );
}