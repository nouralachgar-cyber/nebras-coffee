import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function SpotlightNew({ className, fill = "#FF4D8D" }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className="absolute -top-[40%] left-1/2 -translate-x-1/2 h-[80%] w-[120%] rounded-[100%] blur-[80px]"
        style={{
          background: `radial-gradient(ellipse at center, ${fill}18 0%, ${fill}08 40%, transparent 70%)`,
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-[#FF4D8D]/40 to-transparent" />
    </motion.div>
  )
}
