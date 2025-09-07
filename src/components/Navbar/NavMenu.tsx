import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { role } from "@/constant/role";
import { useUserInfoQuery } from "@/redux/feature/Auth/auth.api";
import { type NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { Link, useLocation } from "react-router";
import { Home, FileText, Info, Phone, HelpCircle, LayoutDashboard, User, Users, FileBox } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/", role: "PUBLIC", icon: <Home className="w-4 h-4" /> },
  { name: "Features", path: "/features", role: "PUBLIC", icon: <FileText className="w-4 h-4" /> },
  { name: "About Us", path: "/about", role: "PUBLIC", icon: <Info className="w-4 h-4" /> },
  { name: "Contact", path: "/contact", role: "PUBLIC", icon: <Phone className="w-4 h-4" /> },
  { name: "FAQ", path: "/faq", role: "PUBLIC", icon: <HelpCircle className="w-4 h-4" /> },
  { name: "Blogs", path: "/blog", role: "PUBLIC", icon: <FileBox className="w-4 h-4" /> },
  { name: "Admin Dashboard", path: "/admin", role: role.ADMIN, icon: <LayoutDashboard className="w-4 h-4" /> },
  { name: "Dashboard", path: "/user", role: role.USER, icon: <User className="w-4 h-4" /> },
  { name: "Agent Dashboard", path: "/agent", role: role.AGENT, icon: <Users className="w-4 h-4" /> },
];

export const NavMenu = (props: NavigationMenuProps) => {
  const { data } = useUserInfoQuery(undefined);
  const userRole = data?.data?.role;
  const location = useLocation();

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        {navLinks
          .filter((link) => link.role === "PUBLIC" || link.role === userRole)
          .map((link, index) => {
            const isActive = location.pathname === link.path;

            return (
              <NavigationMenuItem key={index} id={`nav-${link.name.toLowerCase()}`}>
                <NavigationMenuLink asChild>
                  <Link
                    to={link.path}
                    className={cn(
                      "flex items-center gap-2 py-1.5 px-2 font-semibold rounded-lg transition-colors",
                      isActive
                        ? "bg-muted font-bold border-l-4 border-primary"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-primary"
                    )}
                  >
                    <div className="flex items-center gap-1">
                      {link.icon}
                      <span>{link.name}</span>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
