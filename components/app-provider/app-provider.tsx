"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

export interface AppProviderProps {
  children: React.ReactNode;
  defaultTheme?: "light" | "dark" | "system";
}

/**
 * The one wrapper an app mounts at its root: theme (light/dark/system via
 * `next-themes`), a shared `TooltipProvider` so every tooltip in the tree
 * uses one delay group instead of re-mounting its own, and the toast
 * viewport. Fluent UI calls this `FluentProvider`; kept neutral here since
 * this registry isn't shipping the Fluent design system, just the same
 * "wrap the app once" role.
 */
export function AppProvider({ children, defaultTheme = "system" }: AppProviderProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme={defaultTheme} enableSystem>
      <TooltipProvider>
        {children}
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  );
}
