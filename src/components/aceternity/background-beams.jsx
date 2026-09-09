import { cn } from "@/lib/utils"

export function GridPattern({ className }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#FFD6E7_1px,transparent_1px),linear-gradient(to_bottom,#FFD6E7_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.18] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_110%)]" />
    </div>
  )
}


