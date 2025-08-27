import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { role } from "@/constant/role";
import { useUserInfoQuery } from "@/redux/feature/Auth/auth.api";
import { type NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { NavLink, useLocation } from "react-router";

const navLinks = [
  { name: "Home", path: "/", role: "PUBLIC" },
  { name: "Features", path: "/features", role: "PUBLIC" },
  { name: "Contact", path: "/contact", role: "PUBLIC" },
  { name: "FAQ", path: "/faq", role: "PUBLIC" },
  { name: "Admin Dashboard", path: "/admin", role: role.ADMIN },
  { name: "Dashboard", path: "/user", role: role.USER },
  { name: "Agent Dashboard", path: "/agent", role: role.AGENT },
];

export const NavMenu = (props: NavigationMenuProps) => {
  const { data } = useUserInfoQuery(undefined);
  const location = useLocation();

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        {navLinks.map((link, index) => {
          const userRole = data?.data?.role;

          if (link.role === "PUBLIC" || link.role === userRole) {
            return (
              <NavigationMenuItem id={`nav-${link.name.toLowerCase()}`} className={location.pathname === link.path ? "border bg-muted rounded-lg  px-2" : ""} key={index}>
                <NavigationMenuLink asChild className="py-1.5">
                  <NavLink to={link.path}>{link.name}</NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          }
        

          return null;
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
