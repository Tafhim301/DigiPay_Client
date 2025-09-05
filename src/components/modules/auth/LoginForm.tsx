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
import PasswordInput from "@/components/ui/PasswordInput";

import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/feature/Auth/auth.api";

import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

import { Building2, User as UserIcon, ShieldEllipsis } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const form = useForm();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Processing...");
    try {
      const res = await login(data).unwrap();
      console.log(res);
      toast.success("Login Successful", { id: toastId });
      navigate(location.state || "/");
    } catch (error) {
      toast.error("Invalid Credentials", { id: toastId });
      console.log(error);
    }
  };


  const handleDemoLogin = (credentials: { phone: string; password: string }) => {
    form.setValue("phone", credentials.phone);
    form.setValue("password", credentials.password);
    form.handleSubmit(onSubmit)(); 
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your phone number below to login to your account
        </p>

        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="flex items-center gap-1 rounded-full px-3 py-1 text-xs"
            onClick={() =>
              handleDemoLogin({
                phone: "01312345678",
                password: "123456",
              })
            }
          >
            <ShieldEllipsis className="h-3 w-3 text-yellow-500" />
            Admin Demo
          </Button>

          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="flex items-center gap-1 rounded-full px-3 py-1 text-xs"
            onClick={() =>
              handleDemoLogin({
                phone: "01812121212",
                password: "@Abc123",
              })
            }
          >
            <Building2 className="h-3 w-3 text-green-500" />
            Agent Demo
          </Button>

          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="flex items-center gap-1 rounded-full px-3 py-1 text-xs"
            onClick={() =>
              handleDemoLogin({
                phone: "01819191919",
                password: "@Abc123",
              })
            }
          >
            <UserIcon className="h-3 w-3 text-blue-500" />
            User Demo
          </Button>
        </div>
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
                    <PasswordInput {...field} />
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
        <Link
          to="/register"
          replace
          className="underline font-bold text-blue-600"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
