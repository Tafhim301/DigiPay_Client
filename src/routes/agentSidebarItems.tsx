

import Overview from "@/pages/Agent/Overview/Overview";
import CashIn from "@/pages/Agent/Transaction/CashIn";
import CashOutByAgent from "@/pages/Agent/Transaction/CashOut";
import TransactionHistory from "@/pages/Agent/Transaction/TransactionHistory"; 
import Profile from "@/pages/User/Profile";
import type { ISidebarItems } from "@/types";
 


export const agentSidebarItems : ISidebarItems[]   = 
    [
        {
            title: "Wallet",
            items: [
                {
                    title: "Overview",
                    url: "/agent/overview",
                    Component: Overview

                },
                
                

            ],
        },
      
        {
            title: "Transaction",
            items: [
                {
                    title: "Cash In",
                    url: "/agent/cash-in",
                    Component: CashIn

                },
                {
                    title: "Cash Out",
                    url: "/agent/cash-out",
                    Component: CashOutByAgent

                },
                {
                    title: "Transaction Histrory",
                    url: "/agent/transactionHistory",
                    Component: TransactionHistory

                },


            ],
        },
      
        {
            title: "Profile",
            items: [
               
                {
                    title: "Manage Profie",
                    url: "/agent/profile",
                    Component: Profile

                },


            ],
        },
      


    
]