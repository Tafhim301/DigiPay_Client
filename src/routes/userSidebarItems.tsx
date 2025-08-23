
import Home from "@/components/pages/Home/Home";
import Wallet from "@/components/pages/User/Wallet";
import type { ISidebarItems } from "@/types";
 


export const userSidebarItems : ISidebarItems[]   = 
    [
        {
            title: "Wallet",
            items: [
                {
                    title: "Wallet",
                    url: "/user/wallet",
                    Component: Wallet

                },
                {
                    title: "Transactions",
                    url: "/user/transactions",
                    Component: Home

                }


            ],
        },
      


    
]