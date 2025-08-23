import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";


export default function Banner() {
  return (
       <section className="bg-gradient-to-br rounded-2xl shadow-2xl my-20 from-green-800 via-cyan-900 to-cyan-700 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Thousands Simplifying Payments with DigiPay</h2>
        <p className="mb-6 opacity-90">Secure. Fast. Reliable. Start today!</p>
        <Button asChild size="lg" className="bg-white text-cyan-700 hover:bg-gray-100">
          <a href="/register">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </Button>
      </section>
  )
}
