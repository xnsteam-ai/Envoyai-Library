"use client";

import * as React from "react";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export interface TeachingPopoverProps {
  children: React.ReactNode;
  title: string;
  description: React.ReactNode;
  /** 1-indexed position in a walkthrough, e.g. step 2 of 4. */
  step?: number;
  totalSteps?: number;
  onNext?: () => void;
  onPrev?: () => void;
  onDismiss?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * A coachmark: Popover's positioning and portal behaviour, plus the
 * title/step-counter/next-prev chrome a feature walkthrough needs. `children`
 * is the element being pointed at — the trigger — so this drops in around
 * whatever's already there rather than requiring a separate anchor prop.
 */
export function TeachingPopover({
  children,
  title,
  description,
  step,
  totalSteps,
  onNext,
  onPrev,
  onDismiss,
  open,
  onOpenChange,
}: TeachingPopoverProps) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-72 p-4">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-semibold">{title}</h4>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={onDismiss}
            className="-mt-1 -mr-1 inline-flex rounded-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            <XIcon className="size-4" />
          </button>
        </div>
        <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>

        {(step !== undefined || onNext || onPrev) && (
          <div className="mt-4 flex items-center justify-between">
            {step !== undefined && totalSteps !== undefined ? (
              <span className="text-xs text-muted-foreground">
                {step} of {totalSteps}
              </span>
            ) : (
              <span />
            )}
            <div className="flex gap-2">
              {onPrev && (
                <Button variant="outline" size="sm" onClick={onPrev}>
                  Back
                </Button>
              )}
              {onNext && (
                <Button size="sm" onClick={onNext}>
                  {totalSteps !== undefined && step === totalSteps ? "Done" : "Next"}
                </Button>
              )}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
