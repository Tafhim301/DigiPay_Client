import App from "@/App";
import DashBoardLayout from "@/components/Layout/DashboardLayout";
import Home from "@/components/pages/Home/Home";
import Login from "@/components/pages/Login";
import Register from "@/components/pages/Register";
import { role } from "@/constant/role";
import type { TRole } from "@/types";
import { withAuth } from "@/utils/withAuth";

import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebar";
import { generateRoutes } from "@/utils/generateRoutes";
import { userSidebarItems } from "./userSidebarItems";
import { agentSidebarItems } from "./agentSidebarItems";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [

      {


        path: '/',

        Component: Home,


      },


    ]
  },

  {
    Component: withAuth(DashBoardLayout, role.ADMIN as TRole),
    path: '/admin',

    children: [{
      index: true, element: <Navigate to={'/admin/analytics'}>

      </Navigate>
    }, ...generateRoutes(adminSidebarItems)]

  },
  {
    Component: withAuth(DashBoardLayout, role.USER as TRole),
    path: '/user',

    children: [{
      index: true, element: <Navigate to={'/user/wallet'}>

      </Navigate>
    }, ...generateRoutes(userSidebarItems)]

  },
  {
    Component: withAuth(DashBoardLayout, role.AGENT as TRole),
    path: '/agent',

    children: [{
      index: true, element: <Navigate to={'/agent/transactions'}>

      </Navigate>
    }, ...generateRoutes(agentSidebarItems)]

  },
  {
    path: '/login',
    Component: Login
  },
  {
    path: '/register',
    Component: Register
  },
]);