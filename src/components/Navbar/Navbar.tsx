import { Button } from "@/components/ui/button";
import { NavMenu } from "./NavMenu";
import { NavigationSheet } from "./NavigationSheet";
import { ModeToggle } from "../ModeToggler";
import { Logo } from "@/assets/Logo";
import { Link } from "react-router";
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/feature/Auth/auth.api";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hook";
import NavbarSkeleton from "../Skeletons/NavbarSkeleton";
import TourProvider from "../TourProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback} from "@/components/ui/avatar";
import { User } from "lucide-react";

const Navbar = () => {
  const { data, isLoading } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  if (isLoading) {
    return <NavbarSkeleton />;
  }

  const handleLogOut = async () => {
    const toastId = toast.loading("Processing");
    try {
      await logout(undefined).unwrap();
      toast.success("Logout Successful", { id: toastId });
      dispatch(authApi.util.resetApiState());
    } catch (error) {
      toast.error("Something Went Wrong", { id: toastId });
      console.log(error);
    }
  };

  const role = data?.data?.role || "user"; 
  const userName = data?.data?.name || "User";


  return (
    <div
      id="navbar"
      className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-md"
    >
      <nav className="h-16 bg-background border-b">
        <div className="h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
     
          <div className="flex items-center gap-8">
            <Logo />
            <NavMenu className="hidden lg:block" />
          </div>

       
          <div className="flex items-center justify-end gap-3">
            {data?.data?._id ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="cursor-pointer">
                    
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
            
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium">{userName}</span>
                      <span className="text-xs text-muted-foreground capitalize">
                        {role}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link to={`/${role.toLowerCase()}/profile`}>Profile</Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

               
                  <DropdownMenuItem onClick={handleLogOut}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to={"/login"}>
                <Button id="loginButton">Login</Button>
              </Link>
            )}

        
            <div className="hidden md:block">
              <ModeToggle />
            </div>

        
            <div className="lg:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
      <TourProvider />
    </div>
  );
};

export default Navbar;
