"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export interface AvatarGroupProps extends React.ComponentProps<"div"> {
  /** Avatars beyond this count collapse into a single "+N" circle. */
  max?: number;
}

/**
 * Overlapping avatars for "N people on this thing" — a stack with a `max`
 * cutoff, not just a row. Composes over the existing `Avatar` rather than
 * requiring a newer size-aware Avatar variant, so it works with whatever
 * Avatar is already installed.
 */
export function AvatarGroup({ className, max, children, ...props }: AvatarGroupProps) {
  const items = React.Children.toArray(children);
  const visible = max ? items.slice(0, max) : items;
  const overflow = max ? items.length - visible.length : 0;

  return (
    <div
      data-slot="avatar-group"
      className={cn("flex -space-x-3", className)}
      {...props}
    >
      {visible.map((child, i) => (
        <div key={i} className="rounded-full ring-2 ring-background">
          {child}
        </div>
      ))}
      {overflow > 0 && (
        <div className="rounded-full ring-2 ring-background">
          <Avatar>
            <AvatarFallback className="text-xs">+{overflow}</AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
}
