import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useUserInfoQuery } from "@/redux/feature/Auth/auth.api"
import { getSidebarItems } from "@/utils/getSidebarItems"
import { Logo } from "@/assets/Logo"
import { NavLink, useLocation } from "react-router"
import { ModeToggle } from "./ModeToggler"




export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserInfoQuery(undefined);
  const location = useLocation()
  const data = {

    navMain: getSidebarItems(userData?.data?.role)
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b-2">
        <div className="flex items-center justify-between">
          <Logo></Logo>

          <ModeToggle></ModeToggle>

        </div>

      </SidebarHeader>
      <SidebarContent>
      
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="">{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink className={location.pathname === item.url ? "border bg-muted" : ""} to={item.url}>{item.icon}{item.title}</NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
