

import Home from "@/pages/Home/Home";
import type { ISidebarItems } from "@/types";

 


export const adminSidebarItems : ISidebarItems[]   = 
    [
        {
            title: "Dashboard",
            items: [
                {
                    title: "Analytics",
                    url: "/admin/analytics",
                    Component: Home

                }


            ],
        },
      



    
]