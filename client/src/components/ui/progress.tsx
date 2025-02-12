"use client"

import * as ProgressPrimitive from "@radix-ui/react-progress"

import * as React from "react"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "rounded-base border-border dark:border-dark-border dark:bg-secondary-black relative h-4 w-full overflow-hidden border-2 bg-white",
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="border-border bg-main dark:border-darkBorder h-full w-full flex-1 border-r-2 transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
