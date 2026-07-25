"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

export type ThemeToggleProps = React.ComponentPropsWithoutRef<"button">

/**
 * A round light/dark toggle backed by `next-themes`.
 * Requires a `ThemeProvider` with `attribute="class"` above it.
 *
 * Renders a placeholder until mounted so server and client markup match.
 */
export function ThemeToggle({ className, ...props }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === "dark"

  const classes = cn(
    "flex size-[34px] shrink-0 items-center justify-center rounded-full",
    "border border-border bg-background text-foreground",
    "transition-colors hover:bg-accent",
    className
  )

  if (!mounted) {
    return <div aria-hidden className={classes} />
  }

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={classes}
      {...props}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}
