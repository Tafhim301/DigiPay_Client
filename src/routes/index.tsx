import App from "@/App";
import DashBoardLayout from "@/components/Layout/DashboardLayout";

import { role } from "@/constant/role";
import type { TRole } from "@/types";
import { withAuth } from "@/utils/withAuth";

import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebar";
import { generateRoutes } from "@/utils/generateRoutes";
import { userSidebarItems } from "./userSidebarItems";
import { agentSidebarItems } from "./agentSidebarItems";
import Home from "@/pages/Home/Home";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import ErrorPage from "@/components/Error";
import Unauthorized from "@/pages/Unauthorized";
import FAQPage from "@/pages/Faq/FAQ";
import FeaturesPage from "@/pages/Features/Features";
import ContactPage from "@/pages/Contact/ContactPage";
import AboutPage from "@/pages/About/About";


export const router = createBrowserRouter([
 { errorElement: <ErrorPage></ErrorPage>},
  {
    path: "/",
    Component: App,


    children: [

      {


        path: '/',

        Component: Home,

      
      },

      {
        path : '/faq',
        Component : FAQPage
      },
      {
        path : '/features',
        Component : FeaturesPage

      },
      {
        path : '/contact',
        Component : ContactPage

      },
      {
        path : '/about',
        Component : AboutPage

      }


    ]
  },

  {
    Component: withAuth(DashBoardLayout, role.ADMIN as TRole),
    path: '/admin',

    children: [{
      index: true, element: <Navigate to={'/admin/overview'}>

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
      index: true, element: <Navigate to={'/agent/overview'}>

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
  {
    path: '/unauthorized',
    Component: Unauthorized
  },

]);