"use client"

import * as React from "react"
import { Quote } from "lucide-react"

import { cn } from "@/lib/utils"

interface Testimonial {
  quote: string
  name: string
  role: string
  initials: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We install two or three registry items a week now instead of rebuilding the same card from scratch every time.",
    name: "Priya Nair",
    role: "Frontend lead, Anchor",
    initials: "PN",
  },
  {
    quote:
      "The theme presets alone saved us a full sprint. Light and dark shipped on day one.",
    name: "Marcus Webb",
    role: "Founder, Loomstack",
    initials: "MW",
  },
  {
    quote:
      "Having the wallpapers and the components in the same registry keeps design and engineering looking at one source.",
    name: "Sara Al-Amin",
    role: "Design systems, Fenwick",
    initials: "SA",
  },
]

const AVATAR_TINTS = [
  "bg-primary/15 text-primary",
  "bg-foreground/10 text-foreground",
  "bg-muted-foreground/15 text-muted-foreground",
]

/**
 * A responsive grid of quote cards with initials avatars, name and role —
 * no external images required.
 */
export function TestimonialWall() {
  return (
    <section className="bg-muted/40 py-16 dark:bg-transparent md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <h2 className="text-2xl font-semibold md:text-3xl">Teams building on the registry</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((item, i) => (
            <figure
              key={item.name}
              className="flex flex-col justify-between gap-6 rounded-xl border bg-card p-6"
            >
              <Quote className="size-5 text-muted-foreground/50" />
              <blockquote className="text-sm leading-relaxed text-pretty">
                “{item.quote}”
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-medium",
                    AVATAR_TINTS[i % AVATAR_TINTS.length]
                  )}
                >
                  {item.initials}
                </span>
                <div className="leading-tight">
                  <div className="text-sm font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
