import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CashOutForm from "@/components/modules/User/CashOutForm"
import WithdrawMoneyForm from "@/components/modules/User/WithdrawForm"

export default function WithdrawPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <Tabs defaultValue="cashout" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cashout">Cash-out</TabsTrigger>
          <TabsTrigger value="atm">ATM Withdraw</TabsTrigger>
        </TabsList>

        <TabsContent value="cashout">
     
             <CashOutForm></CashOutForm>
      
        </TabsContent>

        <TabsContent value="atm">
       
              <WithdrawMoneyForm></WithdrawMoneyForm>
       
      
        </TabsContent>
      </Tabs>
    </div>
  )
}
