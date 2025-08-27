import AdminDashboard from "@/pages/Admin/AdminDashboard";
import AgentApllications from "@/pages/Admin/AgentApllications";
import AgentCashIn from "@/pages/Admin/AgentCashIn";
import AllTransactionTable from "@/pages/Admin/AllTransactionTable";
import ManageAgent from "@/pages/Admin/ManageAgent";
import ManageUser from "@/pages/Admin/ManageUser";
import Profile from "@/pages/User/Profile";
import type { ISidebarItems } from "@/types";

 


export const adminSidebarItems : ISidebarItems[]   = 
    [
        {
            title: "Dashboard",
            items: [
                {
                    title: "Business Dashboard",
                    url: "/admin/overview",
                    Component: AdminDashboard

                },
                {
                    title: "All Transaction",
                    url: "/admin/transaction",
                    Component: AllTransactionTable

                },
             


            ],
        },
      
        {
            title: "Users",
            items: [
                  {
                    title: "Manage Users",
                    url: "/admin/manageUsers",
                    Component: ManageUser

                },
               


            ],
        },
        {
            title: "Agents",
            items: [
             
                {
                    title: "Manage Agents",
                    url: "/admin/manageAgents",
                    Component: ManageAgent

                },
             
                {
                    title: "Agent Application",
                    url: "/admin/applications",
                    Component: AgentApllications

                },
                {
                    title: "Cash In to an Agent Account",
                    url: "/admin/agentCashIn",
                    Component: AgentCashIn

                },
             


            ],
        },
        {
            title: "Profile",
            items: [
                  {
                    title: "Manage Profile",
                    url: "/admin/profile",
                    Component: Profile

                },
              


            ],
        },
      



    
]