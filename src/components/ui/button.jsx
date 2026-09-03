import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-md hover:bg-[#E63A7A] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
        secondary: "bg-secondary text-secondary-foreground hover:bg-[#3E2921] shadow-md",
        outline: "border border-border bg-card hover:bg-accent/20 hover:border-primary/40",
        ghost: "hover:bg-accent/30 hover:text-accent-foreground",
        soft: "bg-[#FFF0F6] text-[#FF4D8D] border border-[#FFD6E7] hover:bg-[#FFE4EF] hover:border-[#FF4D8D]/30",
        pill: "bg-card border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5"
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 rounded-full px-4 text-xs",
        lg: "h-12 rounded-full px-8 text-base",
        icon: "h-9 w-9 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }
