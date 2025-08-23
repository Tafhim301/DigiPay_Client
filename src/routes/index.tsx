import App from "@/App";
import Home from "@/components/pages/Home/Home";
import Login from "@/components/pages/Login";
import Register from "@/components/pages/Register";

import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component : App,
    children : [

      { 
        
   
          path : '/',
          
          Component : Home,
        
        
      },

    ]
  },
  {
    path : '/login',
    Component : Login
  },
  {
    path : '/register',
    Component : Register
  },
]);