import { Link } from "react-router";
import { Logo } from "@/assets/Logo";
import { Card, CardContent } from "@/components/ui/card";
import image from "@/assets/Images/Auth-Img.png";
import { LoginForm } from "@/components/modules/auth/LoginForm";

export default function Login() {
  return (
    <div className="h-screen w-full grid grid-cols-1 md:grid-cols-2">

      <div className="hidden md:flex relative overflow-hidden">
        <img
          src={image}
          alt="DigiPay Illustration"
          className="w-full h-full object-cover transform scale-105 transition-transform duration-700 ease-in-out"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/20 to-transparent" />


        <div className="absolute top-3 left-3 text-white z-10">
          <Logo />
          <p className="mt-2 text-sm text-gray-200 max-w-xs drop-shadow-lg">
            Seamless, secure, and fast — manage your money with DigiPay.
          </p>
        </div>
      </div>


      <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
        <Card className="bg-white/30 dark:bg-gray-800/50 backdrop-blur-md shadow-xl rounded-2xl w-full max-w-md">
          <CardContent className="p-8 sm:p-12">

            <div className="flex justify-center mb-6">
              <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
                <Logo />
              </Link>
            </div>

       
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
