/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useCashInMutation } from "@/redux/feature/transaction/transaction.api";
import {
  useUserInfoQuery,
  useValidatePasswordMutation,
} from "@/redux/feature/Auth/auth.api";
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
    .regex(
      /^01[3-9][0-9]{8}$/,
      "Please provide a valid Bangladesh phone number"
    ),
  amount: z
    .number({
      error: "Amount must be a number",
    })
    .min(1, "Amount must be a positive number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type TopUpFormValues = z.infer<typeof formSchema>;

export default function CashIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: userData, isLoading: isUserLoading } =
    useUserInfoQuery(undefined);
  const balance = userData?.data?.wallet?.balance ?? 0;

  const form = useForm<TopUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receiver: "",
      amount: undefined,
      password: "",
    },
  });

  const [CashIn, { isLoading: topUpLoading }] = useCashInMutation();
  const [validatePassword] = useValidatePasswordMutation();

  const onSubmit = async (data: TopUpFormValues) => {
    const toastId = toast.loading("Processing");

    try {
      const passwordValidation = await validatePassword({
        password: data.password,
      }).unwrap();

      if (passwordValidation.success) {
        const res = await CashIn({
          receiver: data.receiver,
          amount: data.amount,
        }).unwrap();
        console.log(res);

        dispatch(
          walletApi.util.invalidateTags(["User", "Wallet", "Transaction"])
        );

        toast.success("Cash In Successful", { id: toastId });
        navigate("/agent/overview");
      }

      form.reset();
    } catch (err: any) {
      if (err?.data?.message === "Password doesn't Match") {
        toast.error("Incorrect Password", { id: toastId });
        form.reset({ password: "" });
      } else {
        toast.error(
          `${err?.data?.message}` || "Something Went Wrong",
          { id: toastId }
        );
        console.log(err);
      }
    }
  };

  if (isUserLoading) {
    return <HeroSkeleton />;
  }

  return (
    <main className=" bg-slate-50 dark:bg-slate-950 py-10 px-6">
      <div className="lg:grid lg:grid-cols-2 lg:gap-10 items-center max-w-6xl mx-auto">
        
        <div className="flex flex-col justify-center items-start px-6 lg:px-12 border-muted lg:h-screen mb-10 lg:mb-0">
          <Logo />
          <h2 className="text-4xl font-extrabold mt-6 mb-4">Agent Cash In</h2>
          <p className="text-muted-foreground max-w-md leading-relaxed">
            Deposit money into a user account instantly. Secure, fast, and
            reliable — empower users with digital cash today.
          </p>
        </div>

   
        <div>
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

          <section className="bg-card rounded-2xl shadow-lg p-8 border border-border/40">
            <div className="flex flex-col gap-4 items-center mb-6">
              <Logo />
              <h1 className="text-4xl font-extrabold mb-2 border-b-2 pb-3 w-full flex items-center justify-center border-primary/50">Cash In</h1>
              <p className="text-center text-muted-foreground max-w-lg">
                Cash In to a user account and give them a taste of real cash.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <FormField
                  control={form.control}
                  name="receiver"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter user phone number"
                          type="tel"
                          {...field}
                        />
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
                            field.onChange(Number(e.target.value))
                          }
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
                        <PasswordInput
                          placeholder="Enter your password"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="sm:col-span-2">
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
                </div>
              </form>
            </Form>
          </section>
        </div>
      </div>
    </main>
  );
}
