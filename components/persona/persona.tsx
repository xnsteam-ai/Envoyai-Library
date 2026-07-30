import * as React from "react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type PersonaPresence = "online" | "away" | "busy" | "offline";

const PRESENCE_COLOR: Record<PersonaPresence, string> = {
  online: "bg-emerald-500",
  away: "bg-amber-500",
  busy: "bg-red-500",
  offline: "bg-muted-foreground/40",
};

const SIZES = {
  sm: { avatar: "size-8", dot: "size-2.5", name: "text-sm", secondary: "text-xs" },
  default: { avatar: "size-10", dot: "size-3", name: "text-sm", secondary: "text-xs" },
  lg: { avatar: "size-12", dot: "size-3.5", name: "text-base", secondary: "text-sm" },
} as const;

export interface PersonaProps extends React.ComponentProps<"div"> {
  name: string;
  secondaryText?: React.ReactNode;
  avatarSrc?: string;
  /** Falls back to initials from `name` when omitted. */
  avatarFallback?: React.ReactNode;
  presence?: PersonaPresence;
  size?: keyof typeof SIZES;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "")).toUpperCase();
}

/** An avatar paired with name, secondary text and a presence indicator — the "who is this" unit used across lists, headers and cards. */
export function Persona({
  className,
  name,
  secondaryText,
  avatarSrc,
  avatarFallback,
  presence,
  size = "default",
  ...props
}: PersonaProps) {
  const s = SIZES[size];

  return (
    <div data-slot="persona" className={cn("flex items-center gap-3", className)} {...props}>
      <div className="relative shrink-0">
        <Avatar className={s.avatar}>
          {avatarSrc && <AvatarImage src={avatarSrc} alt={name} />}
          <AvatarFallback>{avatarFallback ?? initials(name)}</AvatarFallback>
        </Avatar>
        {presence && (
          <span
            className={cn(
              "absolute right-0 bottom-0 rounded-full ring-2 ring-background",
              PRESENCE_COLOR[presence],
              s.dot
            )}
            aria-label={`Presence: ${presence}`}
          />
        )}
      </div>
      <div className="flex min-w-0 flex-col">
        <span className={cn("truncate font-medium", s.name)}>{name}</span>
        {secondaryText && (
          <span className={cn("truncate text-muted-foreground", s.secondary)}>
            {secondaryText}
          </span>
        )}
      </div>
    </div>
  );
}
