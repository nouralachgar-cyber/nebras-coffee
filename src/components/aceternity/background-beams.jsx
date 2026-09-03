import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function GridPattern({ className }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#FFD6E7_1px,transparent_1px),linear-gradient(to_bottom,#FFD6E7_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.18] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_110%)]" />
    </div>
  )
}

export function FloatingDots() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-[#FF4D8D]/30"
          style={{
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{ y: [0, -12, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
    </div>
  )
}
