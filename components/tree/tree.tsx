"use client";

import * as React from "react";
import { ChevronRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// ── Roving tabindex ──────────────────────────────────────────────────────
// One shared context per <Tree>, tracking which row id currently holds the
// tab stop and moving it with Up/Down — the standard tree/listbox keyboard
// pattern: every row is reachable by Tab, but only one at a time.

interface TreeContextValue {
  activeId: string | null;
  register: (id: string, el: HTMLDivElement | null) => void;
  order: React.RefObject<string[]>;
  setActiveId: (id: string) => void;
}

const TreeContext = React.createContext<TreeContextValue | null>(null);

export interface TreeProps extends React.ComponentProps<"div"> {}

/** The root container. Rows register themselves in DOM order so arrow keys can move between them. */
export function Tree({ className, children, ...props }: TreeProps) {
  const order = React.useRef<string[]>([]);
  const elements = React.useRef(new Map<string, HTMLDivElement>());
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const register = React.useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) {
      elements.current.set(id, el);
      if (!order.current.includes(id)) order.current.push(id);
    } else {
      elements.current.delete(id);
      order.current = order.current.filter((x) => x !== id);
    }
  }, []);

  React.useEffect(() => {
    if (!activeId && order.current.length > 0) setActiveId(order.current[0]);
  }, [activeId]);

  const moveFocus = (direction: 1 | -1) => {
    const ids = order.current;
    const currentIndex = activeId ? ids.indexOf(activeId) : -1;
    const next = ids[Math.min(ids.length - 1, Math.max(0, currentIndex + direction))];
    if (next) {
      setActiveId(next);
      elements.current.get(next)?.focus();
    }
  };

  return (
    <TreeContext.Provider value={{ activeId, register, order, setActiveId }}>
      <div
        role="tree"
        className={cn("flex flex-col text-sm", className)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            moveFocus(1);
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            moveFocus(-1);
          }
        }}
        {...props}
      >
        {children}
      </div>
    </TreeContext.Provider>
  );
}

export interface TreeItemProps extends React.ComponentProps<"div"> {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  defaultExpanded?: boolean;
  /** Omit for a leaf row — it renders without an expand chevron or children slot. */
  children?: React.ReactNode;
}

/** A single row — a leaf if it has no children, otherwise a Collapsible disclosure with nested Tree rows indented under it. */
export function TreeItem({ id, label, icon, defaultExpanded, children, className, ...props }: TreeItemProps) {
  const ctx = React.useContext(TreeContext);
  if (!ctx) throw new Error("TreeItem must be used inside a Tree");

  const ref = React.useRef<HTMLDivElement>(null);
  const isActive = ctx.activeId === id;
  const hasChildren = children !== undefined;
  const [open, setOpen] = React.useState(defaultExpanded ?? false);

  React.useEffect(() => {
    ctx.register(id, ref.current);
    return () => ctx.register(id, null);
  }, [id]);

  const row = (
    <div
      ref={ref}
      role="treeitem"
      aria-expanded={hasChildren ? open : undefined}
      tabIndex={isActive ? 0 : -1}
      onFocus={() => ctx.setActiveId(id)}
      onKeyDown={(e) => {
        if (!hasChildren) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen((v) => !v);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          setOpen(true);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          setOpen(false);
        }
      }}
      className={cn(
        "flex items-center gap-1.5 rounded-md px-2 py-1.5 outline-none",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      {...props}
    >
      {hasChildren ? (
        <CollapsibleTrigger asChild>
          <button
            type="button"
            tabIndex={-1}
            className="flex size-4 shrink-0 items-center justify-center text-muted-foreground [&[data-state=open]>svg]:rotate-90"
          >
            <ChevronRightIcon className="size-3.5 transition-transform" />
          </button>
        </CollapsibleTrigger>
      ) : (
        <span className="size-4 shrink-0" />
      )}
      {icon && <span className="shrink-0 text-muted-foreground">{icon}</span>}
      <span className="truncate">{label}</span>
    </div>
  );

  if (!hasChildren) return row;

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      {row}
      <CollapsibleContent className="ml-5 flex flex-col border-l pl-2">{children}</CollapsibleContent>
    </Collapsible>
  );
}
