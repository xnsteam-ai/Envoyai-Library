"use client";

import * as React from "react";
import { MoreHorizontalIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface OverflowItem {
  id: string;
  label: React.ReactNode;
  onSelect?: () => void;
}

export interface OverflowProps {
  items: OverflowItem[];
  className?: string;
}

const MENU_TRIGGER_WIDTH = 44; // reserved space for the "+N" button, incl. gap

/**
 * Renders as many items as fit on one line and collapses the rest into a
 * "+N" dropdown — for a toolbar or tab row that has to work at any width,
 * not just the one it happened to be designed at.
 *
 * Measures every item in a hidden row first (`visibility: hidden`, not
 * `display: none` — a non-participating element reports zero size) to get
 * real widths, then decides the visible count from the container's actual
 * width. A CSS-only approach (`overflow: hidden` + `flex-wrap: nowrap`)
 * can hide items but can't tell you *how many* it hid, which is what the
 * "+N" count needs.
 */
export function Overflow({ items, className }: OverflowProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const measureRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCount, setVisibleCount] = React.useState(items.length);

  React.useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const recompute = () => {
      const containerWidth = container.offsetWidth;
      const widths = measureRefs.current.map((el) => el?.offsetWidth ?? 0);
      const totalWidth = widths.reduce((a, b) => a + b, 0);

      if (totalWidth <= containerWidth) {
        setVisibleCount(items.length);
        return;
      }

      let used = 0;
      let count = 0;
      for (const w of widths) {
        if (used + w > containerWidth - MENU_TRIGGER_WIDTH) break;
        used += w;
        count++;
      }
      setVisibleCount(Math.max(0, count));
    };

    recompute();
    const observer = new ResizeObserver(recompute);
    observer.observe(container);
    return () => observer.disconnect();
  }, [items]);

  const visible = items.slice(0, visibleCount);
  const overflowed = items.slice(visibleCount);

  return (
    <div ref={containerRef} className={cn("relative flex min-w-0 items-center gap-1", className)}>
      {/* Hidden measurement row: same content, laid out off-screen so every item reports its real width. */}
      <div className="absolute inset-x-0 top-0 flex items-center gap-1 opacity-0" aria-hidden style={{ visibility: "hidden" }}>
        {items.map((item, i) => (
          <div key={item.id} ref={(el) => { measureRefs.current[i] = el; }} className="shrink-0">
            <Button variant="ghost" size="sm">{item.label}</Button>
          </div>
        ))}
      </div>

      {visible.map((item) => (
        <Button key={item.id} variant="ghost" size="sm" onClick={item.onSelect} className="shrink-0">
          {item.label}
        </Button>
      ))}

      {overflowed.length > 0 && (
        <DropdownMenu>
          {/* No asChild+Button here: Button isn't wrapped in React.forwardRef,
              so Radix can't attach the ref it needs to an asChild'd Button.
              Applying the same classes to the trigger directly sidesteps it. */}
          <DropdownMenuTrigger
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "shrink-0")}
            aria-label={`${overflowed.length} more`}
          >
            <MoreHorizontalIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {overflowed.map((item) => (
              <DropdownMenuItem key={item.id} onSelect={item.onSelect}>
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
