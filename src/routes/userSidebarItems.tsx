

import DepositMoney from "@/components/pages/User/Features/DepositMoney";
import SendMoney from "@/components/pages/User/Features/SendMoney";
import TransactionHistory from "@/components/pages/User/Features/TransactionHistory";
import WithdrawMoney from "@/components/pages/User/Features/WithdrawMoney";
import Wallet from "@/components/pages/User/Wallet";
import type { ISidebarItems } from "@/types";
 


export const userSidebarItems : ISidebarItems[]   = 
    [
        {
            title: "Wallet",
            items: [
                {
                    title: "Overview",
                    url: "/user/wallet",
                    Component: Wallet

                },
               
            ],
        },
        {
            title: "Transaction",
            items: [
                {
                    title: "Add Money",
                    url: "/user/addMoney",
                    Component: DepositMoney
                    
                },
                {
                    title: "Send Money",
                    url: "/user/sendMoney",
                    Component: SendMoney
                    
                },
                {
                    title: "Withdraw Money",
                    url: "/user/withdrawMoney",
                    Component: WithdrawMoney
                    
                },
                {
                    title: "Transaction History",
                    url: "/user/transactionHistory",
                    Component: TransactionHistory

                },


            ],
        },
      


    
]