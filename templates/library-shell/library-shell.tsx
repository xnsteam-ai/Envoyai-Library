"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { CategoryPills } from "@/components/ui/category-pills"
import { DeepSearch } from "@/components/ui/deep-search"
import { LibrarySidebar, type LibrarySidebarItem } from "@/components/ui/library-sidebar"

export interface LibraryShellProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  title?: string
  sidebarLabel?: string
  sidebarItems: LibrarySidebarItem[]
  categories?: string[]
  searchPlaceholder?: string
  /** Grid content — cards, tiles, whatever the section renders. */
  children?: React.ReactNode
  /** Rendered in place of `children` when there is nothing to show. */
  empty?: React.ReactNode
  onSectionChange?: (section: string) => void
  onCategoryChange?: (category: string) => void
  onSearchChange?: (query: string) => void
}

/**
 * A browse layout: sidebar of sections, a search bar, a category filter row,
 * and a responsive grid for results.
 *
 * State is uncontrolled by default — pass the `on*Change` handlers to drive
 * filtering, and render the filtered results as `children`.
 */
export function LibraryShell({
  title = "All Assets",
  sidebarLabel = "Library",
  sidebarItems,
  categories,
  searchPlaceholder = "Search the library…",
  children,
  empty,
  onSectionChange,
  onCategoryChange,
  onSearchChange,
  className,
  ...props
}: LibraryShellProps) {
  const hasResults = React.Children.count(children) > 0

  return (
    <div className={cn("flex min-h-screen", className)} {...props}>
      <LibrarySidebar
        label={sidebarLabel}
        items={sidebarItems}
        onValueChange={onSectionChange}
        className="sticky top-0 hidden h-screen self-start md:block"
      />

      <main className="flex-1 px-6 py-8">
        <h1 className="mb-6 text-2xl font-semibold text-foreground">{title}</h1>

        <DeepSearch
          placeholder={searchPlaceholder}
          onValueChange={onSearchChange}
          className="mb-5"
        />

        {categories && categories.length > 0 && (
          <CategoryPills
            categories={categories}
            onValueChange={onCategoryChange}
            className="mb-7"
          />
        )}

        {hasResults ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {children}
          </div>
        ) : (
          empty ?? (
            <p className="py-16 text-center text-sm text-muted-foreground">
              Nothing matches those filters.
            </p>
          )
        )}
      </main>
    </div>
  )
}
