import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function MovingBorderCard({ children, className, borderClassName }) {
  return (
    <div className={cn("relative p-[1.5px] rounded-[1.8rem] overflow-hidden", className)}>
      <div className="absolute inset-0 rounded-[1.8rem]">
        <motion.div
          className={cn(
            "absolute inset-[-50%] rounded-[1.8rem] opacity-70",
            borderClassName
          )}
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, #FF4D8D 60deg, #FFB5D0 120deg, #C8B6FF 180deg, transparent 260deg)`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="relative bg-white rounded-[1.65rem] h-full w-full">{children}</div>
    </div>
  )
}

export function GlowCard({ children, className }) {
  return (
    <div className={cn("relative rounded-[1.7rem] bg-white border border-[#FFD6E7] overflow-hidden", className)}>
      <div className="absolute -top-24 -right-24 h-48 w-48 bg-[#FF4D8D]/10 blur-[40px] rounded-full" />
      <div className="absolute -bottom-24 -left-24 h-48 w-48 bg-[#C8B6FF]/10 blur-[40px] rounded-full" />
      <div className="relative">{children}</div>
    </div>
  )
}
