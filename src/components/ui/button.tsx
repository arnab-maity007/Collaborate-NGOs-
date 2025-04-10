
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md hover:translate-y-[-3px] hover:scale-105",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-md hover:translate-y-[-3px] hover:scale-105",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:shadow-md hover:translate-y-[-3px] hover:scale-105",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-md hover:translate-y-[-3px] hover:scale-105",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:shadow-sm hover:translate-y-[-2px] hover:scale-105",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80 hover:translate-y-[-1px]",
        glow: "bg-theme-accent-400 text-white hover:bg-theme-accent-500 hover:shadow-lg hover:translate-y-[-4px] hover:scale-110 relative after:absolute after:inset-0 after:rounded-md after:opacity-0 hover:after:opacity-100 after:shadow-[0_0_15px_3px_rgba(18,130,162,0.6)] after:transition-all after:duration-300 after:z-[-1]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
