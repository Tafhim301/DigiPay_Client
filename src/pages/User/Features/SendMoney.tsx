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
import { useSendMoneyMutation } from "@/redux/feature/transaction/transaction.api";
import { useValidatePasswordMutation, useUserInfoQuery } from "@/redux/feature/Auth/auth.api";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { walletApi } from "@/redux/feature/wallet/wallet.api";
import PasswordInput from "@/components/ui/PasswordInput";
import { Logo } from "@/assets/Logo";
import { Banknote, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HeroSkeleton from "@/components/Skeletons/HeroSkeleton";

const formSchema = z.object({
  receiver: z
    .string()
    .regex(/^01[3-9][0-9]{8}$/, "Please provide a valid Bangladesh phone number"),
  amount: z
    .number({ error: "Amount must be a number" })
    .min(1, "Amount must be a positive number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SendMoneyFormValues = z.infer<typeof formSchema>;

export default function SendMoney() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: userData, isLoading: isUserLoading } = useUserInfoQuery(undefined);
  const balance = userData?.data?.wallet?.balance ?? 0;

  const form = useForm<SendMoneyFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receiver: "",
      amount: undefined,
      password: "",
    },
  });

  const [sendMoney, { isLoading: sendLoading }] = useSendMoneyMutation();
  const [validatePassword] = useValidatePasswordMutation();

  const onSubmit = async (data: SendMoneyFormValues) => {
    const toastId = toast.loading("Processing...");
    try {
      const passwordValidation = await validatePassword({ password: data.password }).unwrap();
      if (passwordValidation.success) {
        await sendMoney({ receiver: data.receiver, amount: data.amount }).unwrap();
        dispatch(walletApi.util.invalidateTags(["User", "Wallet", "Transaction"]));
        toast.success("Send Money Successful", { id: toastId });
        navigate("/user/wallet");
      }
      form.reset();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.data?.message === "Password doesn't Match") {
        toast.error("Incorrect Password", { id: toastId });
        form.reset({ password: "" });
      } else {
        toast.error(`${err?.data?.message || "Something went wrong"}`, { id: toastId });
        console.log(err);
      }
    }
  };

  if (isUserLoading) return <HeroSkeleton />;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-6">
      <div className="lg:grid lg:grid-cols-2 lg:gap-10 items-center max-w-6xl mx-auto">

        {/* Left Pane: Branding / Info */}
        <div className="flex flex-col justify-center items-start px-6 lg:px-12 lg:h-screen mb-10 lg:mb-0">
          <Logo />
          <h2 className="text-4xl font-extrabold mt-6 mb-4">Send Money</h2>
          <p className="text-muted-foreground max-w-md leading-relaxed">
            Send money securely to another user account. Fast, safe, and reliable.
          </p>
        </div>

        {/* Right Pane: Balance + Form */}
        <div>
          {/* Balance Card */}
          <Card className="mb-8 border-border/40">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Balance
              </CardTitle>
              <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                <Banknote className="h-5 w-5 text-indigo-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                BDT {balance.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Your current available balance
              </p>
            </CardContent>
          </Card>

          {/* Send Money Form */}
          <section className="bg-card rounded-2xl shadow-lg p-8 border border-border/40">
            <div className="flex flex-col gap-4 items-center mb-6">
              <Logo />
              <h1 className="text-4xl font-extrabold mb-2 border-b-2 pb-3 w-full flex items-center justify-center border-primary/50">
                Send Money
              </h1>
              <p className="text-center text-muted-foreground max-w-lg">
                Send money to another user account securely.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="receiver"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter recipient phone number" type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter amount"
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value === "" ? undefined : Number(e.target.value))
                          }
                          value={field.value === undefined ? "" : field.value}
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
                        <PasswordInput placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="w-full text-white bg-primary hover:bg-primary/90 transition-colors duration-200"
                  disabled={sendLoading}
                  type="submit"
                >
                  {sendLoading ? (
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
          </section>
        </div>
      </div>
    </main>
  );
}
