import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { type NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { Link } from "react-router";


const navLinks = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
  { name: "Contact Us", path: "/contact" },
];

export const NavMenu = (props: NavigationMenuProps) => (

  <NavigationMenu {...props}>
    <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
      {navLinks.map((item : {name : string, path: string}) => (
           <NavigationMenuItem key={item.path}>
        <NavigationMenuLink asChild>
          <Link  to={item.path}>{item.name}</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>

      ))}
    </NavigationMenuList>
  </NavigationMenu>
);
