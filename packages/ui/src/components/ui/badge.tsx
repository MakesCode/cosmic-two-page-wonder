import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@ui/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        lightRed: 'border-transparent bg-pale-red text-[#f65c66]',
        yellow: 'border-transparent bg-soft-yellow text-[#fcc005]',
        peach: 'border-transparent bg-warm-peach text-[#f99106]',
        green: 'border-transparent bg-lime-green text-[#d6ecda]',
        blue: 'border-transparent bg-navy-blue text-[#5fb3f8]',
        ocean: 'border-transparent bg-ocean-blue text-[#476797]',
        pink: 'border-transparent bg-soft-pink text-[#7f7fff]',
        forest: 'border-transparent bg-forest-green text-[#6eeca8]',
        gray: 'border-transparent bg-neutral-gray text-[#333f50]',
        faintred: 'border-transparent bg-faint-red text-[#e36463]',
        red: 'border-transparent bg-strong-red text-[#e98e7f]',
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
