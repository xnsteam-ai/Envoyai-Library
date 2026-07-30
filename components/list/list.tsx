import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const listVariants = cva("flex flex-col text-sm", {
  variants: {
    variant: {
      plain: "gap-1",
      divided: "divide-y divide-border",
      bordered: "divide-y divide-border rounded-md border",
    },
  },
  defaultVariants: { variant: "plain" },
});

export interface ListProps
  extends React.ComponentProps<"ul">,
    VariantProps<typeof listVariants> {}

/** A structured list of rows — `divided`/`bordered` styles for real content, `plain` for a bare stack. */
function List({ className, variant, ...props }: ListProps) {
  return (
    <ul data-slot="list" className={cn(listVariants({ variant }), className)} {...props} />
  );
}

export interface ListItemProps extends React.ComponentProps<"li"> {
  asChild?: boolean;
  /** Marks the row selected/current — same convention as a menu item. */
  active?: boolean;
  disabled?: boolean;
}

function ListItem({
  className,
  asChild = false,
  active,
  disabled,
  ...props
}: ListItemProps) {
  const Comp = asChild ? Slot : "li";
  return (
    <Comp
      data-slot="list-item"
      data-active={active ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 [.divide-y_>&]:px-4",
        "data-[active]:bg-accent data-[active]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    />
  );
}

function ListItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="list-item-content"
      className={cn("flex min-w-0 flex-1 flex-col gap-0.5", className)}
      {...props}
    />
  );
}

function ListItemTitle({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="list-item-title"
      className={cn("truncate font-medium", className)}
      {...props}
    />
  );
}

function ListItemDescription({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="list-item-description"
      className={cn("truncate text-muted-foreground", className)}
      {...props}
    />
  );
}

export { List, ListItem, ListItemContent, ListItemTitle, ListItemDescription };
