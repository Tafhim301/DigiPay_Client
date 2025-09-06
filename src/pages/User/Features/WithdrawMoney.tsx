import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CashOutForm from "@/components/modules/User/CashOutForm";
import WithdrawMoneyForm from "@/components/modules/User/WithdrawForm";
import { useUserInfoQuery } from "@/redux/feature/Auth/auth.api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Banknote } from "lucide-react";
import { Logo } from "@/assets/Logo";

export default function WithdrawPage() {
  const { data: userData, isLoading } = useUserInfoQuery(undefined);
  const balance = userData?.data?.wallet?.balance ?? 0;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-6">
      <div className="lg:grid lg:grid-cols-2 lg:gap-10 max-w-6xl mx-auto">
  
        <div className="flex flex-col justify-center items-start px-6 lg:px-12 mb-10 lg:mb-0">
          <Logo />
          <h2 className="text-4xl font-extrabold mt-6 mb-4">Withdraw Money</h2>
          <p className="text-muted-foreground max-w-md leading-relaxed">
            Withdraw your money securely via Cash-Out or ATM. Fast, safe, and convenient.
          </p>
        </div>


        <div>

          <Card className="mb-8 border-border/40">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Wallet Balance
              </CardTitle>
              <div className="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                <Banknote className="h-5 w-5 text-indigo-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {isLoading ? "Loading..." : `BDT ${balance}`}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Your available balance
              </p>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="cashout" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="cashout">Cash-out</TabsTrigger>
              <TabsTrigger value="atm">ATM Withdraw</TabsTrigger>
            </TabsList>

            <TabsContent value="cashout">
              <CashOutForm />
            </TabsContent>

            <TabsContent value="atm">
              <WithdrawMoneyForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
