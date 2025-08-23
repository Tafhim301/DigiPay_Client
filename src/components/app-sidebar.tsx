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
import { Link } from "react-router"




export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {data : userData} = useUserInfoQuery(undefined)
  const data = {
  
  navMain: getSidebarItems(userData?.data?.role)
}

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b-2">
        <Logo></Logo>

      
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>{item.title}</Link>
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
