"use client";

import * as React from "react";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export interface Swatch {
  value: string;
  /** CSS color for the swatch itself; falls back to `value` when it's already a valid color. */
  color?: string;
  label?: string;
}

export interface SwatchPickerProps {
  swatches: Swatch[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

/**
 * A grid of preset color swatches — one `RadioGroup`, so only one swatch is
 * ever selected and it's keyboard-navigable for free, rather than a grid of
 * plain buttons re-implementing single-select state by hand.
 */
export function SwatchPicker({ swatches, value, defaultValue, onValueChange, className }: SwatchPickerProps) {
  return (
    <RadioGroup
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      className={cn("grid grid-cols-8 gap-2", className)}
    >
      {swatches.map((swatch) => (
        <label key={swatch.value} className="relative" title={swatch.label ?? swatch.value}>
          <RadioGroupItem value={swatch.value} className="peer sr-only" aria-label={swatch.label ?? swatch.value} />
          <span
            className="block size-7 cursor-pointer rounded-full border shadow-xs ring-offset-2 ring-offset-background transition-shadow peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-ring"
            style={{ background: swatch.color ?? swatch.value }}
          />
          <CheckIcon className="pointer-events-none absolute inset-0 m-auto hidden size-3.5 text-white mix-blend-difference peer-data-[state=checked]:block" />
        </label>
      ))}
    </RadioGroup>
  );
}
