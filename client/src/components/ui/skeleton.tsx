import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-base border-border dark:border-dark-border dark:bg-secondary-black animate-pulse border-2 bg-white",
        className,
      )}
      {...props}
    />
  )
}

export { Skeleton }
