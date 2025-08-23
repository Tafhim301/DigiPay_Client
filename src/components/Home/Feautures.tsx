import { Clock, Shield, Zap } from "lucide-react";


export default function Feautures() {
  return (
    <div className="text-center mt-20 ">
          <section className="relative rounded-2xl gap-5 grid px-10 bg-gradient-to-br from-green-800 via-cyan-900 to-cyan-600 text-white py-14">
            <div>
                <h1 className="text-3xl">Why Us</h1>
            </div>
        <div className="container grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg hover:scale-105 transition">
            <Zap className="h-10 w-10 mb-4 text-cyan-400" />
            <h3 className="text-xl font-bold mb-2">Instant Transfers</h3>
            <p className="opacity-80">Send and receive money instantly with no delays.</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg hover:scale-105 transition">
            <Shield className="h-10 w-10 mb-4 text-indigo-400" />
            <h3 className="text-xl font-bold mb-2">Bank-Grade Security</h3>
            <p className="opacity-80">Advanced encryption keeps your transactions safe.</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg hover:scale-105 transition">
            <Clock className="h-10 w-10 mb-4 text-blue-400" />
            <h3 className="text-xl font-bold mb-2">24/7 Availability</h3>
            <p className="opacity-80">Access your wallet anytime, anywhere you need.</p>
          </div>
        </div>
      </section>
    </div>
 
  )
}
