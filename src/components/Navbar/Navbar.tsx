import { Button } from "@/components/ui/button";

import { NavMenu } from "./NavMenu";
import { NavigationSheet } from "./NavigationSheet";
import { ModeToggle } from "../ModeToggler";
import { Logo } from "@/assets/Logo";
import { Link } from "react-router";

const Navbar = () => {

  return (
    <div className="min-h-screen w-full bg-muted">
      <nav className="h-16 bg-background border-b">
        <div className="h-full flex items-center justify-between  px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Logo />

            {/* Desktop Menu */}
            <NavMenu className="hidden md:block" />
          </div>

          <div className="flex items-center justify-end gap-3">

            <Link to={'/login'}>
              <Button>Login</Button>
            </Link>

            <ModeToggle></ModeToggle>


            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet/>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
