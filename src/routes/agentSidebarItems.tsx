
import Home from "@/components/pages/Home/Home";
import type { ISidebarItems } from "@/types";
 


export const agentSidebarItems : ISidebarItems[]   = 
    [
        {
            title: "Bookings",
            items: [
                {
                    title: "Transaction",
                    url: "/agent/transactions",
                    Component: Home

                }


            ],
        },
      


    
]