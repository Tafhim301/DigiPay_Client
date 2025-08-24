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
import { useCashOutByAgentMutation } from "@/redux/feature/transaction/transaction.api";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { walletApi } from "@/redux/feature/wallet/wallet.api";
import PasswordInput from "@/components/ui/PasswordInput";
import { Logo } from "@/assets/Logo";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  userPhone: z
    .string()
    .regex(/^01[3-9][0-9]{8}$/, "Please provide a valid Bangladesh phone number"),
  amount: z
    .number({error : "Amount must be a number"})
    .min(1, "Amount must be a positive number"),
  userPassword: z.string().min(6, "User password must be at least 6 characters"),
  agentPassword: z.string().min(6, "Agent password must be at least 6 characters"),
});

type CashOutFormValues = z.infer<typeof formSchema>;

export default function CashOutByAgent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm<CashOutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userPhone: "",
      amount: undefined,
      userPassword: "",
      agentPassword: "",
    },
  });

  const [cashOutByAgent, { isLoading }] = useCashOutByAgentMutation();

  const onSubmit = async (data: CashOutFormValues) => {
    const toastId = toast.loading("Processing cash out...");

    try {
      const res = await cashOutByAgent({
        userPhone: data.userPhone,
        userPassword: data.userPassword,
        agentPassword: data.agentPassword,
        amount: data.amount,
      }).unwrap();

      console.log(res);

      dispatch(walletApi.util.invalidateTags(["User", "Wallet", "Transaction"]));

      toast.success("Cash Out Successful", { id: toastId });
      navigate("/agent/dashboard");
      form.reset();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(`${err?.data?.message}` || "Something went wrong", {
        id: toastId,
      });
      console.log(err);
    }
  };

  return (
    <div className="max-w-md mx-auto border-t mt-12 p-8 bg-card rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
      <div className="flex flex-col items-center gap-2 justify-center mb-6">
        <div className="mr-12">
          <Logo />
        </div>
        <h1 className="text-3xl font-extrabold text-center px-20 pb-2 mb-2 border-b-2 border-primary/50">
          Cash Out
        </h1>
        <p className="text-center text-muted-foreground mt-2">
          Withdraw money from a user account via your agent account.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="userPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter User Phone Number"
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
                    placeholder="Enter Amount"
                    type="number"
                    {...field}
                    onChange={(e) => {
                      const value =
                        e.target.value === "" ? undefined : Number(e.target.value);
                      field.onChange(value);
                    }}
                    value={field.value === undefined ? "" : field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="userPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Enter User Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Enter Agent Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full text-white bg-primary hover:bg-primary/90 transition-colors duration-200"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? (
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
  );
}
