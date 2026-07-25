import * as React from "react"

import { cn } from "@/lib/utils"

export interface EnvoyLogoProps extends React.ComponentPropsWithoutRef<"svg"> {
  size?: number
}

/**
 * The envoyai mark: a rounded-square badge holding two interlocking
 * leaf forms with a diagonal light streak. Monochrome by design.
 *
 * Gradient ids are namespaced per instance, so several logos can share a page.
 */
export function EnvoyLogo({ size = 24, className, ...props }: EnvoyLogoProps) {
  const uid = React.useId().replace(/:/g, "")
  const id = (part: string) => `envoy-${part}-${uid}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      role="img"
      aria-label="envoyai"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      {...props}
    >
      <defs>
        <linearGradient
          id={id("bg")}
          x1="4"
          y1="4"
          x2="36"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
        <linearGradient
          id={id("leaf-top")}
          x1="12"
          y1="24"
          x2="31"
          y2="8"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#9a9a9a" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient
          id={id("leaf-bottom")}
          x1="28"
          y1="15"
          x2="9"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#4a4a4a" />
          <stop offset="100%" stopColor="#d8d8d8" />
        </linearGradient>
        <linearGradient
          id={id("streak")}
          x1="4"
          y1="36"
          x2="36"
          y2="4"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="35%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="65%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={id("clip")}>
          <rect x="1" y="1" width="38" height="38" rx="10" />
        </clipPath>
      </defs>

      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="10"
        fill={`url(#${id("bg")})`}
        stroke="#2a2a2a"
        strokeWidth="0.75"
      />

      <g clipPath={`url(#${id("clip")})`}>
        <rect x="-4" y="-4" width="48" height="48" fill={`url(#${id("streak")})`} />
        <path
          d="M13 25C10 22 10 17 13 14C16 11 20 12 22 10C25 8 27 7 30 9C27 12 23 14 20 16C17 18 15 21 13 25Z"
          fill={`url(#${id("leaf-top")})`}
        />
        <path
          d="M27 15C30 18 30 23 27 26C24 29 20 28 18 30C15 32 13 33 10 31C13 28 17 26 20 24C23 22 25 19 27 15Z"
          fill={`url(#${id("leaf-bottom")})`}
        />
      </g>
    </svg>
  )
}
