import AdminDashboard from "@/pages/Admin/AdminDashboard";
import AgentApllications from "@/pages/Admin/AgentApllications";
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