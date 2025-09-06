import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NavMenu } from "./NavMenu";
import { Logo } from "@/assets/Logo";
import { ModeToggle } from "../ModeToggler";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="w-full flex items-center gap-5 justify-between pr-10 bg-muted justify-self-start p-2 border">
        <Logo />
          <ModeToggle></ModeToggle>
        </div>
        <NavMenu orientation="vertical" className="mx-2" />


      </SheetContent>
    </Sheet>
  );
};
