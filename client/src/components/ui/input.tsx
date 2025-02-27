import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "rounded-base border-border font-base text-text selection:bg-main selection:text-text file:font-base dark:border-dark-border dark:bg-secondary-black dark:text-dark-text flex h-10 w-full border-2 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = "Input"

export { Input }
