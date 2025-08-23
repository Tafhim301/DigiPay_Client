import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { role } from "@/constant/role";
import { useUserInfoQuery } from "@/redux/feature/Auth/auth.api";
import { type NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { Link } from "react-router";

const navLinks = [
  { name: "Home", path: "/", role: "PUBLIC" },
  { name: "Blog", path: "/blog", role: "PUBLIC" },
  { name: "About", path: "/about", role: "PUBLIC" },
  { name: "Contact", path: "/contact", role: "PUBLIC" },
  { name: "Dashboard", path: "/admin", role: role.ADMIN },
  { name: "Dashboard", path: "/user", role: role.USER },
  { name: "Dashboard", path: "/agent", role: role.AGENT },
];

export const NavMenu = (props: NavigationMenuProps) => {
  const { data } = useUserInfoQuery(undefined);

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        {navLinks.map((link, index) => {
          const userRole = data?.data?.role;

          if (link.role === "PUBLIC" || link.role === userRole) {
            return (
              <NavigationMenuItem key={index} className="w-full">
                <NavigationMenuLink asChild className="py-1.5">
                  <Link to={link.path}>{link.name}</Link>
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
