"use client"

import * as React from "react"

export interface StatsBandItem {
  value: string
  label: string
}

export interface StatsBandProps {
  eyebrow?: string
  heading?: string
  stats?: StatsBandItem[]
}

const DEFAULT_STATS: StatsBandItem[] = [
  { value: "24", label: "Registry items" },
  { value: "6", label: "Library sections" },
  { value: "<2KB", label: "Per wallpaper" },
  { value: "100%", label: "Installable via CLI" },
]

/**
 * A horizontal strip of key metrics, divided by hairlines with a subtle
 * accent bar above each figure.
 */
export function StatsBand({
  eyebrow = "By the numbers",
  heading = "A registry that stays in sync with the site",
  stats = DEFAULT_STATS,
}: StatsBandProps) {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <span className="text-sm font-medium text-muted-foreground">{eyebrow}</span>
          <h2 className="mt-2 text-2xl font-semibold text-balance md:text-3xl">{heading}</h2>
        </div>

        <div className="grid grid-cols-2 divide-y divide-border rounded-xl border md:grid-cols-4 md:divide-x md:divide-y-0">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2 px-6 py-8 text-center">
              <span className="h-0.5 w-8 rounded-full bg-primary" />
              <span className="text-3xl font-semibold tabular-nums md:text-4xl">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
