import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

export const HoverEffect = ({ items, className, onSelect }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-[#FF4D8D]/10 block rounded-[1.6rem] border border-[#FF4D8D]/20"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence>
          <Card onClick={() => onSelect?.(item)}>
            <div className="relative overflow-hidden rounded-2xl mb-4 bg-[#FFF0F6]">
              <img src={item.img} alt={item.name} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide bg-white/90 backdrop-blur border border-[#FFD6E7] text-[#FF4D8D] shadow-sm">
                  {item.category}
                </span>
              </div>
              <div className="absolute bottom-3 right-3 bg-[#3E2921] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {item.price} DH
              </div>
            </div>
            <CardTitle className="text-[17px] leading-tight">{item.name}</CardTitle>
            <CardDescription className="line-clamp-2 mt-1.5 text-[13px] leading-relaxed">{item.desc}</CardDescription>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs font-mono text-[#FF4D8D] bg-[#FFF0F6] border border-[#FFD6E7] px-2.5 py-1 rounded-full">✦ add to order</span>
              <span className="h-8 w-8 rounded-full bg-[#FF4D8D] text-white grid place-items-center group-hover:rotate-12 transition-transform">→</span>
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
}

export const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-[1.6rem] h-full w-full p-4 overflow-hidden bg-white border border-[#FFD6E7]/50 group-hover:border-[#FF4D8D]/20 relative z-20 shadow-[0_4px_24px_rgba(255,77,141,0.06)] hover:shadow-[0_12px_32px_rgba(255,77,141,0.10)] transition-all cursor-pointer",
        className
      )}
      {...props}
    >
      <div className="relative z-50">
        <div className="p-1">{children}</div>
      </div>
    </div>
  )
}

export const CardTitle = ({ className, children }) => {
  return <h4 className={cn("text-[#3E2921] font-serif font-bold tracking-tight", className)}>{children}</h4>
}

export const CardDescription = ({ className, children }) => {
  return <p className={cn("text-[#8B6B5E] tracking-wide leading-relaxed text-sm", className)}>{children}</p>
}
