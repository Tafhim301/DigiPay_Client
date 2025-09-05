import { Link } from "react-router";
import { Logo } from "@/assets/Logo";
import { Card, CardContent } from "@/components/ui/card";
import image from "@/assets/Images/Auth-Img.png";
import RegisterForm from "@/components/modules/auth/RegisterForm";

export default function Register() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2">

      <div className="hidden md:flex relative overflow-hidden">
        <img
          src={image}
          alt="DigiPay Illustration"
          className="w-full h-full object-contain"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/20 to-black/30" />


        <div className="absolute top-5 left-3 text-white z-10">
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

       
           <RegisterForm></RegisterForm>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
