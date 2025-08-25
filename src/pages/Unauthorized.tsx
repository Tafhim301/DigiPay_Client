import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { useNavigate } from "react-router"

export default function Unauthorized() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-6">
    
      <div className="bg-red-100 p-4 rounded-full mb-6">
        <AlertTriangle className="w-12 h-12 text-red-600" />
      </div>

  
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">You Can't Access this page!</h1>
      <p className="text-muted-foreground max-w-md mb-6">
        You Need To login to view this page
        Please Login or return to the Home.
      </p>

  
      <div className="flex gap-4">
        <Button
          variant="default"
          onClick={() => navigate("/")}
          className=""
        >
          Go Home
        </Button>
        <Button
          variant="ghost"
         onClick={() => navigate('/login')}
          className="bg-cyan-700 text-white"
        >
          Login
        </Button>
      </div>

      
      <p className="text-xs text-gray-400 mt-8">
        DigiPay © {new Date().getFullYear()} — Secure Digital Transactions
      </p>
    </div>
  )
}
