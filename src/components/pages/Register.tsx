import { Link } from "react-router";
import { Logo } from "@/assets/Logo";
import RegisterForm from "../auth/RegisterForm";
import { Card, CardContent } from "../ui/card";
import image from "@/assets/Images/AuthImage.jpg";

export default function Register() {
  return (
    <div className=" flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-4xl max-h-fit shadow-lg  overflow-hidden">
         
        <div className="grid grid-cols-1 md:grid-cols-2">
          <CardContent className="hidden md:block border-r-2">
            <img
              src={image}
              alt="DigiPay Illustration"
              className="h-full w-full"
            />
          </CardContent>
        
          <CardContent className="flex flex-col justify-center px-4">
            <div className="flex justify-center ">
              <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
                <Logo />
              </Link>
            </div>
            <div className="w-full max-w-sm mx-auto">
              <RegisterForm />
            </div>
          </CardContent>

         
         
        </div>
      </Card>
    </div>
  );
}
