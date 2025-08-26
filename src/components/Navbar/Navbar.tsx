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
import HeroSkeleton from "../Skeletons/HeroSkeleton";



const Navbar = () => {
  const { data, isLoading } = useUserInfoQuery(undefined)
  console.log(data);
 
  const [logout] = useLogoutMutation();
    const dispatch = useAppDispatch();

  


 

  if (isLoading) {
    return (
      <div>
        <NavbarSkeleton></NavbarSkeleton>
        <HeroSkeleton></HeroSkeleton>
      </div>
    )
  }


  const handleLogOut = async () => {
    const toastId = toast.loading("Processing")
    try {
      await logout(undefined).unwrap()
      toast.success("Logout Successful", { id: toastId })
      dispatch(authApi.util.resetApiState())


    } catch (error) {
      toast.error("Something Went Wrong", { id: toastId });


      console.log(error)

    }


  }



  return (
    <div className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-md">
      <nav className="h-16 bg-background border-b">
        <div className="h-full flex items-center justify-between  px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Logo />

      
            <NavMenu className="hidden md:block" />
          </div>

          <div className="flex items-center justify-end gap-3">

            {
            data?.data?._id ?
                <Button onClick={() => handleLogOut()} variant={'secondary'}>Logout</Button>
               :
               <Link to={'/login'}>
                <Button>Login</Button>
              </Link>


              


            }



            <ModeToggle />


            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
