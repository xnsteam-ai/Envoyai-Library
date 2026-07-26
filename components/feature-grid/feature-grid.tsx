"use client"

import * as React from "react"
import { Layers, Search, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * A bento-style feature showcase: two detail cards plus a full-width
 * highlight row with a circular status cluster.
 */
export function FeatureGrid() {
  return (
    <section className="bg-muted/40 py-16 dark:bg-transparent md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <FeaturePanel
            icon={Search}
            title="Search that understands intent"
            description="Deep search matches names, descriptions, tags and dependencies in one pass — no separate filters required."
          >
            <SearchMock />
          </FeaturePanel>

          <FeaturePanel
            icon={Layers}
            title="Composable by design"
            description="Every block ships as an independent registry item. Install one, or let it pull in what it depends on."
          >
            <StackMock />
          </FeaturePanel>

          <FeatureCard className="lg:col-span-2">
            <div className="flex flex-col items-center gap-8 p-10 text-center">
              <p className="max-w-md text-2xl font-semibold text-balance">
                One registry, every surface — components, templates, icons and themes stay in sync.
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                <RingCluster label="Components" rings={2} accent />
                <RingCluster label="Templates" rings={3} />
                <RingCluster label="Themes" rings={1} accent />
                <RingCluster label="Icons" rings={2} className="hidden sm:flex" />
              </div>
            </div>
          </FeatureCard>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-card shadow-sm",
        "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-foreground/25 before:to-transparent",
        className
      )}
    >
      {children}
    </div>
  )
}

function FeaturePanel({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <FeatureCard>
      <div className="p-6 pb-0">
        <span className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon className="size-4" />
          {title}
        </span>
        <p className="mt-4 text-lg font-medium text-pretty">{description}</p>
      </div>
      <div className="p-6">{children}</div>
    </FeatureCard>
  )
}

function SearchMock() {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-muted/60 p-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(45% 60% at 20% 20%, hsl(var(--primary) / 0.16), transparent 70%), radial-gradient(40% 50% at 85% 75%, hsl(var(--primary) / 0.1), transparent 70%)",
        }}
      />
      <div className="relative flex h-11 items-center gap-2.5 rounded-full border bg-background px-4 shadow-sm">
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <div className="h-2 w-2/3 rounded-full bg-foreground/10" />
      </div>
      <div className="relative mt-3 flex gap-2">
        {["gradient", "svg", "wallpaper"].map((tag) => (
          <span
            key={tag}
            className="rounded-full border bg-background px-3 py-1 text-[11px] text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function StackMock() {
  return (
    <div className="flex h-[140px] items-center justify-center rounded-lg border bg-muted/60">
      <div className="relative h-16 w-28">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute inset-x-0 rounded-md border bg-card shadow-sm"
            style={{
              height: 40,
              top: i * 10,
              transform: `translateX(${i * 6}px)`,
              opacity: 1 - i * 0.22,
              zIndex: 3 - i,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function RingCluster({
  label,
  rings,
  accent = false,
  className,
}: {
  label: string
  rings: number
  accent?: boolean
  className?: string
}) {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="flex size-16 items-center justify-center rounded-full border bg-gradient-to-b from-background to-muted/50">
        <div
          className={cn(
            "rounded-full border-2",
            accent ? "border-primary" : "border-foreground/25"
          )}
          style={{ width: 12 + rings * 10, height: 12 + rings * 10 }}
        />
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
