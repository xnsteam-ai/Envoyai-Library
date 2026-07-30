"use client";

import * as React from "react";
import { StarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export interface RatingProps {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  max?: number;
  /** Lets each star register a half-value click on its left half. */
  allowHalf?: boolean;
  disabled?: boolean;
  size?: "sm" | "default" | "lg";
  className?: string;
}

const SIZE_CLASS = { sm: "size-4", default: "size-5", lg: "size-6" };

/**
 * An interactive star rating input. Each star is two overlapping buttons
 * (left half / right half) when `allowHalf` is set, so a half-value click
 * doesn't need pointer-position math — just two normal click targets.
 */
export function Rating({
  value,
  defaultValue = 0,
  onValueChange,
  max = 5,
  allowHalf = false,
  disabled = false,
  size = "default",
  className,
}: RatingProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const [hovered, setHovered] = React.useState<number | null>(null);

  const current = isControlled ? value! : internal;
  const displayed = hovered ?? current;

  const commit = (next: number) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  return (
    <div
      role="radiogroup"
      aria-label="Rating"
      className={cn("inline-flex items-center gap-0.5", className)}
      onMouseLeave={() => setHovered(null)}
    >
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const fill = clampFill(displayed - i);

        return (
          <div key={i} className={cn("relative", SIZE_CLASS[size])}>
            <StarIcon
              className={cn("absolute inset-0 size-full text-muted-foreground/40")}
              fill="currentColor"
            />
            {fill > 0 && (
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <StarIcon className={cn(SIZE_CLASS[size], "text-amber-500")} fill="currentColor" />
              </div>
            )}
            {!disabled && (
              <>
                {allowHalf && (
                  <button
                    type="button"
                    aria-label={`Rate ${starValue - 0.5}`}
                    className="absolute inset-y-0 left-0 w-1/2 cursor-pointer"
                    onMouseEnter={() => setHovered(starValue - 0.5)}
                    onClick={() => commit(starValue - 0.5)}
                  />
                )}
                <button
                  type="button"
                  aria-label={`Rate ${starValue}`}
                  className={cn("absolute inset-y-0 cursor-pointer", allowHalf ? "left-1/2 w-1/2" : "inset-x-0")}
                  onMouseEnter={() => setHovered(starValue)}
                  onClick={() => commit(starValue)}
                />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

function clampFill(n: number) {
  return Math.max(0, Math.min(1, n));
}
