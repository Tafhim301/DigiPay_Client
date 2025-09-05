import Overview from "@/pages/Agent/Overview/Overview";
import CashIn from "@/pages/Agent/Transaction/CashIn";
import CashOutByAgent from "@/pages/Agent/Transaction/CashOut";
import TransactionHistory from "@/pages/Agent/Transaction/TransactionHistory"; 
import Profile from "@/pages/User/Profile";
import type { ISidebarItems } from "@/types";
import {

  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  ListOrdered,
  UserCircle,

} from "lucide-react";

 


export const agentSidebarItems: ISidebarItems[] = [
  {
    title: "Wallet",
    items: [
      {
        title: "Overview",
        url: "/agent/overview",
        Component: Overview,
        icon: <Wallet/>,
      },
    ],
  },
  {
    title: "Transaction",
    items: [
      {
        title: "Cash In",
        url: "/agent/cash-in",
        Component: CashIn,
        icon: <ArrowDownCircle/>,
      },
      {
        title: "Cash Out",
        url: "/agent/cash-out",
        Component: CashOutByAgent,
        icon: <ArrowUpCircle/>,
      },
      {
        title: "Transaction History",
        url: "/agent/transactionHistory",
        Component: TransactionHistory,
        icon: <ListOrdered/>,
      },
    ],
  },
  {
    title: "Profile",
    items: [
      {
        title: "Manage Profile",
        url: "/agent/profile",
        Component: Profile,
        icon: <UserCircle/>,
      },
    ],
  },
];
