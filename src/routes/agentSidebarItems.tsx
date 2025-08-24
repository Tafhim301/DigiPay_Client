

import CashIn from "@/pages/Agent/Transaction/CashIn";
import CashOutByAgent from "@/pages/Agent/Transaction/CashOut";
import Home from "@/pages/Home/Home";
import Profile from "@/pages/User/Profile";
import type { ISidebarItems } from "@/types";
 


export const agentSidebarItems : ISidebarItems[]   = 
    [
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


            ],
        },
      
        {
            title: "Profile",
            items: [
                {
                    title: "Transaction",
                    url: "/agent/transactions",
                    Component: Home

                },
                {
                    title: "Manage Profie",
                    url: "/agent/profile",
                    Component: Profile

                },


            ],
        },
      


    
]