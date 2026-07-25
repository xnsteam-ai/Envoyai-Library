"use client"

import * as React from "react"
import { Camera, Search, SlidersHorizontal, X } from "lucide-react"

import { cn } from "@/lib/utils"

export interface DeepSearchProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "onChange" | "defaultValue"> {
  /** Controlled value. Pair with `onValueChange`. */
  value?: string
  /** Uncontrolled initial value. */
  defaultValue?: string
  placeholder?: string
  onValueChange?: (value: string) => void
  /** Fired on Enter. */
  onSearch?: (value: string) => void
  onFiltersClick?: () => void
  onVisualSearchClick?: () => void
  showFilters?: boolean
  showVisualSearch?: boolean
}

/**
 * A search bar with an inline clear button, a filters trigger and a
 * visual-search trigger. Works controlled or uncontrolled.
 */
export function DeepSearch({
  value,
  defaultValue = "",
  placeholder = "Search…",
  onValueChange,
  onSearch,
  onFiltersClick,
  onVisualSearchClick,
  showFilters = true,
  showVisualSearch = true,
  className,
  ...props
}: DeepSearchProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const isControlled = value !== undefined
  const query = isControlled ? value : internalValue

  const setQuery = React.useCallback(
    (next: string) => {
      if (!isControlled) setInternalValue(next)
      onValueChange?.(next)
    },
    [isControlled, onValueChange]
  )

  return (
    <div
      className={cn(
        "flex h-14 items-center gap-2.5 rounded-2xl border border-transparent bg-muted pl-5 pr-2",
        "transition-colors focus-within:border-foreground",
        className
      )}
      {...props}
    >
      <Search className="size-5 shrink-0 text-muted-foreground" />

      <input
        ref={inputRef}
        type="text"
        value={query}
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch?.(query)
        }}
        className={cn(
          "h-full flex-1 bg-transparent text-[15px] text-foreground outline-none",
          "placeholder:text-muted-foreground"
        )}
      />

      {query.length > 0 && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            setQuery("")
            inputRef.current?.focus()
          }}
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-full",
            "bg-border text-foreground transition-opacity hover:opacity-80"
          )}
        >
          <X className="size-3.5" />
        </button>
      )}

      {(showFilters || showVisualSearch) && (
        <div className="h-6 w-px shrink-0 bg-border" />
      )}

      {showFilters && (
        <button
          type="button"
          onClick={onFiltersClick}
          className={cn(
            "flex h-10 shrink-0 items-center gap-1.5 rounded-[10px] px-4",
            "bg-background text-sm font-medium text-foreground",
            "transition-colors hover:bg-accent"
          )}
        >
          <SlidersHorizontal className="size-[15px]" />
          Filters
        </button>
      )}

      {showVisualSearch && (
        <button
          type="button"
          aria-label="Search by image"
          onClick={onVisualSearchClick}
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-[10px]",
            "bg-foreground text-background transition-opacity hover:opacity-90"
          )}
        >
          <Camera className="size-4" />
        </button>
      )}
    </div>
  )
}
