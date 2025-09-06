import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

import { useValidatePasswordMutation } from "@/redux/feature/Auth/auth.api";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import PasswordInput from "@/components/ui/PasswordInput";
import { Logo } from "@/assets/Logo";
import { Loader2 } from "lucide-react";
import { useAgentCashInMutation } from "@/redux/feature/agent/agent.api";
import { satsApi } from "@/redux/feature/stats/stats.auth";




const formSchema = z.object({
  receiver: z
    .string()
    .regex(/^01[3-9][0-9]{8}$/, "Please provide a valid Bangladesh phone number"),
  amount: z
    .number({
      error: "Amount must be a number",
    })
    .min(1, "Amount must be a positive number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type TopUpFormValues = z.infer<typeof formSchema>;

export default function AgentCashIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm<TopUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receiver: '',
      amount: undefined,
      password: "",
    },
  });

  const [AgentCashIn, { isLoading: topUpLoading }] = useAgentCashInMutation();
  const [validatePassword] = useValidatePasswordMutation();

  const onSubmit = async (data: TopUpFormValues) => {
    const toastId = toast.loading("Processing");

    try {
      const passwordValidation = await validatePassword({
        password: data.password,
      }).unwrap();

      if (passwordValidation.success) {
        const res = await AgentCashIn({ receiver: data.receiver, amount: data.amount }).unwrap();
        console.log(res);

        dispatch(satsApi.util.resetApiState());

        toast.success("Cash In to agent account Successful", { id: toastId });
        navigate("/admin/overview");
      }

      form.reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.data?.message === "Password doesn't Match") {
        toast.error("Incorrect Password", { id: toastId });

        form.reset({ password: "" });
      } else {
        toast.error(`${err?.data?.message}` || "Something Went Wrong", { id: toastId });
        console.log(err);
      }
    }
  };

  return (
    <div className="grid lg:grid-cols-2 items-center bg-muted dark:bg-gray-900 gap-12 lg:gap-16">

      <div className="flex flex-col items-start justify-center px-6 lg:px-12 lg:h-screen mb-10 lg:mb-0">
        <Logo />
        <h2 className="text-4xl font-extrabold mt-6 mb-4">Cash In To Agent</h2>
        <p className="text-muted-foreground max-w-md leading-relaxed">
          Cash in to an agent account. Let the cash flow smoothly and securely around!
        </p>
        <div className="bg-primary/10 text-primary p-4 rounded-xl shadow-sm">
          <p className="font-medium">
            Remember: Always verify the agent’s phone number before cashing in!
          </p>
        </div>
      </div>


      <div className="max-w-md max-h-min mx-auto border border-primary/40 mt-12 lg:mt-0 p-8 bg-card rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="flex flex-col items-center gap-2 justify-center mb-6">
          <Logo />
          <h1 className="text-3xl font-extrabold text-center px-20 pb-2 mb-2 border-b-2 border-primary/50">
            Cash In Agent
          </h1>
          <p className="text-center text-muted-foreground mt-2">
            Cash In to an agent account. Let the cash flow around!
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Phone */}
            <FormField control={form.control} name="receiver" render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Agent Phone Number" type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Amount */}
            <FormField control={form.control} name="amount" render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Amount"
                    type="number"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value === "" ? undefined : Number(e.target.value);
                      field.onChange(value);
                    }}
                    value={field.value === undefined ? "" : field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Password */}
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Submit */}
            <Button
              className="w-full text-white bg-primary hover:bg-primary/90 transition-colors duration-200"
              disabled={topUpLoading}
              type="submit"
            >
              {topUpLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}