"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Tier {
  name: string
  price: string
  period?: string
  description: string
  features: string[]
  highlighted?: boolean
  cta: string
}

const TIERS: Tier[] = [
  {
    name: "Starter",
    price: "$0",
    description: "Browse the registry and install components one at a time.",
    features: ["Unlimited installs", "Community support", "Public registry access"],
    cta: "Get started",
  },
  {
    name: "Pro",
    price: "$24",
    period: "/mo",
    description: "For teams shipping on the registry every week.",
    features: [
      "Everything in Starter",
      "Private registry items",
      "Version pinning",
      "Priority support",
    ],
    highlighted: true,
    cta: "Start free trial",
  },
  {
    name: "Team",
    price: "$59",
    period: "/mo",
    description: "Shared workspaces with seat-based access control.",
    features: [
      "Everything in Pro",
      "Unlimited seats",
      "Audit log",
      "SSO",
    ],
    cta: "Talk to sales",
  },
]

/**
 * Three-tier pricing layout with a highlighted plan, feature checklist
 * and a call-to-action button per tier.
 */
export function PricingCards() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <h2 className="text-2xl font-semibold md:text-3xl">Simple, usage-based pricing</h2>
          <p className="mt-3 text-muted-foreground">
            Every plan installs from the same registry. Upgrade when your team needs more.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {TIERS.map((tier) => (
            <Card
              key={tier.name}
              className={cn(
                "flex flex-col",
                tier.highlighted && "border-foreground shadow-lg md:-translate-y-2"
              )}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">{tier.name}</CardTitle>
                  {tier.highlighted && (
                    <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                      Most popular
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-1 pt-2">
                  <span className="text-4xl font-semibold">{tier.price}</span>
                  {tier.period && (
                    <span className="text-sm text-muted-foreground">{tier.period}</span>
                  )}
                </div>
                <CardDescription className="pt-1">{tier.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-2.5">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  variant={tier.highlighted ? "default" : "outline"}
                >
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
