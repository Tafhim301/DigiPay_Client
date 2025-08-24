import DepositMoney from "@/pages/User/Features/DepositMoney";
import SendMoney from "@/pages/User/Features/SendMoney";
import TransactionHistory from "@/pages/User/Features/TransactionHistory";
import WithdrawMoney from "@/pages/User/Features/WithdrawMoney";
import Profile from "@/pages/User/Profile";
import Wallet from "@/pages/User/Wallet";
import type { ISidebarItems } from "@/types";

import {
  Wallet as WalletIcon,
  PlusCircle,
  Send,
  ArrowDownCircle,
  History,
  User,
} from "lucide-react";

export const userSidebarItems: ISidebarItems[] = [
  {
    title: "Wallet",
    items: [
      {
        title: "Manage Wallet",
        url: "/user/wallet",
        Component: Wallet,
        icon: <WalletIcon></WalletIcon>,
      },
    ],
  },
  {
    title: "Transaction",
    items: [
      {
        title: "Add Money",
        url: "/user/addMoney",
        Component: DepositMoney,
        icon: <PlusCircle></PlusCircle>,
      },
      {
        title: "Send Money",
        url: "/user/sendMoney",
        Component: SendMoney,
        icon: <Send></Send>,
      },
      {
        title: "Withdraw Money",
        url: "/user/withdrawMoney",
        Component: WithdrawMoney,
        icon: <ArrowDownCircle></ArrowDownCircle>,
      },
      {
        title: "Transaction History",
        url: "/user/transactionHistory",
        Component: TransactionHistory,
        icon: <History></History>,
      },
    ],
  },
  {
    title: "Profile",
    items: [
      {
        title: "Profile Management",
        url: "/user/profile",
        Component: Profile,
        icon: <User></User>,
      },
    ],
  },
];
