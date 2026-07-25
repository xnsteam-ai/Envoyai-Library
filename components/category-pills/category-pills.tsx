"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface CategoryPillsProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "onChange" | "defaultValue"> {
  categories: string[]
  /** Controlled selection. Pair with `onValueChange`. */
  value?: string
  /** Uncontrolled initial selection. Defaults to the first category. */
  defaultValue?: string
  onValueChange?: (category: string) => void
}

/**
 * A horizontally scrollable row of selectable category pills.
 * Works controlled or uncontrolled.
 */
export function CategoryPills({
  categories,
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: CategoryPillsProps) {
  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? categories[0]
  )

  const isControlled = value !== undefined
  const active = isControlled ? value : internalValue

  const select = (category: string) => {
    if (!isControlled) setInternalValue(category)
    onValueChange?.(category)
  }

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={cn("flex gap-2 overflow-x-auto pb-1", className)}
      {...props}
    >
      {categories.map((category) => {
        const isActive = category === active
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => select(category)}
            className={cn(
              "h-9 shrink-0 rounded-full border px-4 text-[13px] font-medium",
              "transition-colors",
              isActive
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background text-foreground hover:bg-accent"
            )}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
