import { Link } from "react-router";
import { LoginForm } from "../auth/LoginForm";
import { Logo } from "@/assets/Logo";
import { Card, CardContent } from "../ui/card";
export default function Login() {
  return (
    <div className="grid felx items-center justify-center min-h-svh ">
      <Card>
        <CardContent>
          <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex justify-center gap-2 md:justify-start">
              <Link to="/" className="flex items-center gap-2 font-medium">
                <Logo />
              </Link>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <div className="w-full max-w-xs">
                <LoginForm />
              </div>
            </div>
          </div>


        </CardContent>

      </Card>
    </div>
  );
}