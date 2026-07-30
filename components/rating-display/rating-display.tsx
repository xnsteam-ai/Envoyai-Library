import * as React from "react";
import { StarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export interface RatingDisplayProps {
  value: number;
  max?: number;
  /** Total number of ratings behind this average, e.g. "(128)". Omit for just the stars. */
  count?: number;
  size?: "sm" | "default" | "lg";
  className?: string;
}

const SIZE_CLASS = { sm: "size-3.5", default: "size-4", lg: "size-5" };

/**
 * A read-only rating: filled/partial/empty stars plus an optional review
 * count. Renders partial fill with a clip rather than swapping icons, so a
 * 3.7 reads as 3.7, not rounded to the nearest star.
 */
export function RatingDisplay({ value, max = 5, count, size = "default", className }: RatingDisplayProps) {
  return (
    <div className={cn("inline-flex items-center gap-1.5", className)} role="img" aria-label={`${value} out of ${max} stars`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }, (_, i) => {
          const fill = Math.max(0, Math.min(1, value - i));
          return (
            <div key={i} className={cn("relative", SIZE_CLASS[size])}>
              <StarIcon className={cn(SIZE_CLASS[size], "absolute inset-0 text-muted-foreground/40")} fill="currentColor" />
              {fill > 0 && (
                <div className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                  <StarIcon className={cn(SIZE_CLASS[size], "text-amber-500")} fill="currentColor" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <span className="text-sm font-medium">{value.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-sm text-muted-foreground">({count.toLocaleString()})</span>
      )}
    </div>
  );
}
