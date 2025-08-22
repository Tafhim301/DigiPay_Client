import { Link } from "react-router";
import { Logo } from "@/assets/Logo";
import { Card, CardContent } from "@/components/ui/card";
import { LoginForm } from "../auth/LoginForm";
import image from "@/assets/Images/AuthImage.jpg";

export default function Login() {
  return (
    <div className="min-w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-4xl shadow-lg rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          
          <CardContent className="hidden md:block border-r-2">
            <img
              src={image}
              alt="DigiPay Illustration"
              className="h-full w-full object-cover"
            />
          </CardContent>

          {/* Right Section: Login Form */}
          <CardContent className="flex flex-col justify-center p-16 ">
            <div className="flex justify-center md:justify-start">
              <Link
                to="/"
                className="flex items-center gap-2 font-semibold text-lg"
              >
                <Logo />
              </Link>
            </div>
            <div className="w-full max-w-sm mx-auto">
              <LoginForm />
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
