"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"

export interface AssetCardProps
  extends Omit<React.ComponentPropsWithoutRef<"article">, "title"> {
  title: string
  /** Short type or category label shown as a badge over the preview. */
  badge?: string
  description?: string
  /** Image URL for the preview. Ignored when `preview` is supplied. */
  previewSrc?: string
  /** Custom preview node — a swatch row, a live component, anything. */
  preview?: React.ReactNode
  /** Shell command shown in the footer with a copy button. */
  installCommand?: string
}

/**
 * A card for presenting a library asset: preview on top, title and
 * description below, and an optional copy-to-clipboard install command.
 */
export function AssetCard({
  title,
  badge,
  description,
  previewSrc,
  preview,
  installCommand,
  className,
  ...props
}: AssetCardProps) {
  const [copied, setCopied] = React.useState(false)
  const timeout = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  React.useEffect(() => () => clearTimeout(timeout.current), [])

  const copy = async () => {
    if (!installCommand) return
    try {
      await navigator.clipboard.writeText(installCommand)
      setCopied(true)
      clearTimeout(timeout.current)
      timeout.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked (insecure origin, denied permission) — leave the
      // command visible so it can still be selected by hand.
    }
  }

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-card",
        className
      )}
      {...props}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {preview ??
          (previewSrc ? (
            <img
              src={previewSrc}
              alt=""
              loading="lazy"
              className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : null)}

        {badge && (
          <span
            className={cn(
              "absolute left-3 top-3 z-10 rounded px-2 py-0.5",
              "bg-background/85 text-[11px] font-medium uppercase tracking-wide text-foreground",
              "backdrop-blur-sm"
            )}
          >
            {badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-sm font-medium leading-snug text-foreground">{title}</p>
        {description && (
          <p className="line-clamp-2 text-[13px] leading-snug text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {installCommand && (
        <div className="flex items-center gap-2 border-t border-border px-3 py-2">
          <code className="flex-1 truncate font-mono text-[11px] text-muted-foreground">
            {installCommand}
          </code>
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? "Copied" : "Copy install command"}
            className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-md",
              "text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            )}
          >
            {copied ? (
              <Check className="size-3.5 text-foreground" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
        </div>
      )}
    </article>
  )
}
