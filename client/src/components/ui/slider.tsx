"use client"

import * as SliderPrimitive from "@radix-ui/react-slider"

import * as React from "react"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none items-center select-none",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="border-border bg-bw relative h-3 w-full grow overflow-hidden rounded-full border-2">
      <SliderPrimitive.Range className="bg-main absolute h-full" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="border-border block h-5 w-5 rounded-full border-2 bg-white ring-offset-white transition-colors focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
