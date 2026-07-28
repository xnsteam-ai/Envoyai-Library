"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export interface CtaBannerProps {
  heading?: string
  description?: string
  primaryLabel?: string
  secondaryLabel?: string
}

/**
 * A full-width call-to-action band with a soft radial backdrop, a heading,
 * supporting copy and two buttons.
 */
export function CtaBanner({
  heading = "Start installing from the registry",
  description = "Every component, template, icon and theme on this site ships as a single CLI command.",
  primaryLabel = "Browse the library",
  secondaryLabel = "View on GitHub",
}: CtaBannerProps) {
  return (
    <section className="relative overflow-hidden bg-foreground py-20 text-background md:py-28">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          // color-mix, not hsl(var(--background) / a): themes may define their vars
          // in any colour space — shadcn's own default is oklch — and wrapping an
          // oklch() value in hsl() is invalid CSS, so the whole gradient is dropped.
          background:
            "radial-gradient(55% 70% at 50% 0%, color-mix(in oklab, var(--background) 14%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 text-center">
        <h2 className="text-3xl font-semibold text-balance md:text-4xl">{heading}</h2>
        <p className="text-base text-background/70 text-pretty">{description}</p>

        {/* h-11 below md: the default button height is 36px, under the ~44px
            comfortable touch target on phones. Desktop keeps the tighter default. */}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Button className="h-11 bg-background text-foreground hover:bg-background/90 md:h-9">
            {primaryLabel}
            <ArrowRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="h-11 border-background/25 bg-transparent text-background hover:bg-background/10 hover:text-background md:h-9"
          >
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  )
}
