"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface LibrarySidebarItem {
  label: string
  href?: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface LibrarySidebarProps
  extends Omit<React.ComponentPropsWithoutRef<"aside">, "defaultValue"> {
  items: LibrarySidebarItem[]
  /** Small uppercase heading above the nav. */
  label?: string
  /** Controlled active item label. Pair with `onValueChange`. */
  value?: string
  /** Uncontrolled initial active item. Defaults to the first item. */
  defaultValue?: string
  onValueChange?: (label: string) => void
}

/**
 * A sticky sidebar of icon + label navigation entries.
 * Renders anchors when an item has `href`, buttons otherwise.
 */
export function LibrarySidebar({
  items,
  label,
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: LibrarySidebarProps) {
  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? items[0]?.label
  )

  const isControlled = value !== undefined
  const active = isControlled ? value : internalValue

  const select = (itemLabel: string) => {
    if (!isControlled) setInternalValue(itemLabel)
    onValueChange?.(itemLabel)
  }

  return (
    <aside
      className={cn("w-60 shrink-0 border-r border-border px-4 py-8", className)}
      {...props}
    >
      {label && (
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
      )}

      <nav className="flex flex-col gap-0.5">
        {items.map((item) => {
          const isActive = item.label === active
          const Icon = item.icon
          const classes = cn(
            "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
            isActive
              ? "bg-muted font-medium text-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )

          const content = (
            <>
              {Icon && <Icon className="size-4" />}
              {item.label}
            </>
          )

          return item.href ? (
            <a
              key={item.label}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              onClick={() => select(item.label)}
              className={classes}
            >
              {content}
            </a>
          ) : (
            <button
              key={item.label}
              type="button"
              aria-current={isActive ? "page" : undefined}
              onClick={() => select(item.label)}
              className={cn(classes, "text-left")}
            >
              {content}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
