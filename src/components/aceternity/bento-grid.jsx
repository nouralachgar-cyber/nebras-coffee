import { cn } from "@/lib/utils"

export const BentoGrid = ({ className, children }) => {
  return (
    <div className={cn("grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto", className)}>
      {children}
    </div>
  )
}

export const BentoGridItem = ({ className, title, description, header, icon, img }) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-[1.7rem] group/bento flex flex-col justify-between space-y-4 border border-[#FFD6E7]/60 bg-white p-5 shadow-[0_8px_30px_rgb(255,77,141,0.06)] hover:shadow-[0_16px_40px_rgb(255,77,141,0.12)] transition-all duration-300 hover:-translate-y-1 overflow-hidden relative",
        className
      )}
    >
      {img && (
        <div className="absolute inset-0 opacity-[0.06] group-hover/bento:opacity-[0.09] transition-opacity">
          <img src={img} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF0F6]/60 via-transparent to-[#FFE4EF]/30 pointer-events-none" />
      {header && <div className="relative z-10 flex-1 w-full">{header}</div>}
      <div className="relative z-10 group-hover/bento:translate-x-1 transition duration-200">
        {icon && <div className="mb-3 h-9 w-9 rounded-xl bg-[#FFF0F6] border border-[#FFD6E7] flex items-center justify-center text-[#FF4D8D]">{icon}</div>}
        <div className="font-serif font-bold text-[#3E2921] text-lg mb-2">{title}</div>
        <div className="font-sans font-normal text-[#8B6B5E] text-sm leading-relaxed">{description}</div>
      </div>
    </div>
  )
}
