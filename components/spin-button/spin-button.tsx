"use client";

import * as React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

export interface SpinButtonProps {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
}

function clamp(n: number, min?: number, max?: number) {
  if (min !== undefined) n = Math.max(min, n);
  if (max !== undefined) n = Math.min(max, n);
  return n;
}

/**
 * A number field with increment/decrement steppers — arrow keys and the
 * button pair both move by `step`, clamped to `min`/`max`. Built on
 * InputGroup rather than a raw Input with two absolutely-positioned buttons.
 */
export function SpinButton({
  value,
  defaultValue = 0,
  onValueChange,
  min,
  max,
  step = 1,
  disabled,
  className,
}: SpinButtonProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const current = isControlled ? value : internal;

  const commit = (next: number) => {
    const clamped = clamp(next, min, max);
    if (!isControlled) setInternal(clamped);
    onValueChange?.(clamped);
  };

  return (
    <InputGroup className={className}>
      <InputGroupInput
        type="text"
        inputMode="decimal"
        role="spinbutton"
        aria-valuenow={current}
        aria-valuemin={min}
        aria-valuemax={max}
        disabled={disabled}
        value={current}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (!Number.isNaN(n)) commit(n);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp") {
            e.preventDefault();
            commit(current + step);
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            commit(current - step);
          }
        }}
      />
      <InputGroupAddon align="inline-end" className="flex-col gap-0 py-0 pr-1">
        <InputGroupButton
          aria-label="Increment"
          disabled={disabled || (max !== undefined && current >= max)}
          onClick={() => commit(current + step)}
          className="size-4"
        >
          <ChevronUpIcon />
        </InputGroupButton>
        <InputGroupButton
          aria-label="Decrement"
          disabled={disabled || (min !== undefined && current <= min)}
          onClick={() => commit(current - step)}
          className="size-4"
        >
          <ChevronDownIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
