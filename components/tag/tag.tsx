"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1.5 overflow-hidden rounded-md border px-2 py-1 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] [&>svg]:size-3 [&>svg]:shrink-0 [&>svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "border-transparent bg-secondary text-secondary-foreground",
        outline: "text-foreground",
        accent: "border-transparent bg-primary/10 text-primary",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface TagProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof tagVariants> {
  asChild?: boolean;
  /** Renders a remove button; the tag disappears from selection, not just visually. */
  onRemove?: () => void;
  disabled?: boolean;
}

/**
 * A dismissible/interactive chip — distinct from `Badge`, which is a static
 * status indicator. A `Tag` represents one item in a set the user picked
 * (filters, recipients, selected options) and can be removed from that set.
 */
export function Tag({
  className,
  variant,
  asChild = false,
  onRemove,
  disabled,
  children,
  ...props
}: TagProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="tag"
      data-disabled={disabled ? "" : undefined}
      className={cn(
        tagVariants({ variant }),
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          disabled={disabled}
          aria-label="Remove"
          className="-mr-0.5 ml-0.5 inline-flex rounded-sm outline-none hover:bg-foreground/10 focus-visible:ring-1 focus-visible:ring-ring"
        >
          <XIcon />
        </button>
      )}
    </Comp>
  );
}
