"use client";

import * as React from "react";
import { createPortal } from "react-dom";

export interface PortalProps {
  children: React.ReactNode;
  /** Node to render into. Defaults to `document.body`. */
  container?: Element | DocumentFragment | null;
}

/**
 * Renders its children into a different part of the DOM tree — the same job
 * Radix's own overlay primitives do internally, exposed here for cases that
 * need it directly (e.g. escaping an `overflow: hidden` ancestor for
 * something that isn't already a Dialog/Popover/Tooltip).
 *
 * Mounts after the first render rather than during it: `document` doesn't
 * exist during SSR, and portaling before hydration completes can produce a
 * server/client markup mismatch.
 */
export function Portal({ children, container }: PortalProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(children, container ?? document.body);
}
