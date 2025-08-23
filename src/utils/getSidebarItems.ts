import { role } from "@/constant/role";
import { adminSidebarItems } from "@/routes/adminSidebar";
import { agentSidebarItems } from "@/routes/agentSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.ADMIN:
      return [...adminSidebarItems];

    case role.USER:
      return [...userSidebarItems];

    case role.AGENT:
      return [...agentSidebarItems];

    default:
      return []
  }
};
