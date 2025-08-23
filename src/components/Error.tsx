import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { useNavigate } from "react-router"

export default function ErrorPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-6">
    
      <div className="bg-red-100 p-4 rounded-full mb-6">
        <AlertTriangle className="w-12 h-12 text-red-600" />
      </div>

  
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Something went wrong</h1>
      <p className="text-muted-foreground max-w-md mb-6">
        We couldn’t process your request at the moment.  
        Please try again or return to the Home.
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
          onClick={() => window.location.reload()}
          className="bg-cyan-700 text-white"
        >
          Try Again
        </Button>
      </div>

      
      <p className="text-xs text-gray-400 mt-8">
        DigiPay © {new Date().getFullYear()} — Secure Digital Transactions
      </p>
    </div>
  )
}
