import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface HoldButtonProps {
  onConfirm: () => void
  holdTime?: number 
  label?: string
}

export function HoldButton({
  onConfirm,
  holdTime = 2000,
  label = "Hold to Confirm",
}: HoldButtonProps) {
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startHold = () => {
    let value = 0
    const step = 100
    const increment = 100 / (holdTime / step)

    intervalRef.current = setInterval(() => {
      value += increment
      setProgress(value)

      if (value >= 100) {
        clearInterval(intervalRef.current!)
        setProgress(100)
        onConfirm() 
        setTimeout(() => setProgress(0), 500) 
      }
    }, step)
  }

  const stopHold = () => {
    clearInterval(intervalRef.current!)
    if (progress < 100) {
      setProgress(0)
    }
  }

  return (
    <div className="relative w-48">
      <Button
        className="relative w-full h-12 overflow-hidden rounded-xl select-none"
        onMouseDown={startHold}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={startHold}
        onTouchEnd={stopHold}
      >
        {label}
       
        <motion.div
          className="absolute left-0 top-0 h-full bg-green-500/30"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </Button>
    </div>
  )
}
