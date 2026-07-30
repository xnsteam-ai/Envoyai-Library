"use client";

import * as React from "react";
import { InfoIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export interface InfoLabelProps extends React.ComponentProps<typeof Label> {
  /** The help text shown in the tooltip. */
  info: React.ReactNode;
}

/**
 * A form label with an inline info icon — hovering or focusing it reveals
 * `info` in a tooltip, without pushing a permanent description line into the
 * form layout.
 */
export function InfoLabel({ className, info, children, ...props }: InfoLabelProps) {
  return (
    <Label className={cn("gap-1.5", className)} {...props}>
      {children}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="inline-flex text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
            aria-label="More information"
          >
            <InfoIcon className="size-3.5" />
          </button>
        </TooltipTrigger>
        <TooltipContent>{info}</TooltipContent>
      </Tooltip>
    </Label>
  );
}
