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
import { useCashInMutation} from "@/redux/feature/transaction/transaction.api";
import { useValidatePasswordMutation } from "@/redux/feature/Auth/auth.api";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { walletApi } from "@/redux/feature/wallet/wallet.api";
import PasswordInput from "@/components/ui/PasswordInput";
import { Logo } from "@/assets/Logo";
import { Loader2 } from "lucide-react";




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

export default function CashIn() {
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

  const [CashIn, { isLoading: topUpLoading }] = useCashInMutation();
  const [validatePassword] = useValidatePasswordMutation();

  const onSubmit = async (data: TopUpFormValues) => {
    const toastId = toast.loading("Processing");

    try {
      const passwordValidation = await validatePassword({
        password: data.password,
      }).unwrap();

      if (passwordValidation.success) {
        const res = await CashIn({receiver : data.receiver, amount: data.amount }).unwrap();
        console.log(res);

        dispatch(walletApi.util.invalidateTags(["User", "Wallet", "Transaction"]));

        toast.success("Send Money Successful", { id: toastId });
        navigate("/agent/overview");
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
    <div className="max-w-md mx-auto border-t mt-12 p-8 bg-card rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
      <div className="flex flex-col items-center gap-2 justify-center mb-6">
        <div className="mr-12">
          <Logo></Logo>
        </div>
        <h1 className="text-3xl font-extrabold text-center px-20 pb-2 mb-2 border-b-2 border-primary/50">
          Cash In
        </h1>
        <p className="text-center text-muted-foreground mt-2">
         Cash In to a user account. A taste of some real cash!
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
              control={form.control}
              name="receiver"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter user Phone Number" type="tel" {...field} />

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
                      const value = e.target.value === "" ? undefined : Number(e.target.value);
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
  );
}