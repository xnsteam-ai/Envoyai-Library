"use client";

import * as React from "react";
import { SearchIcon, XIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

export interface SearchBoxProps
  extends Omit<React.ComponentProps<typeof InputGroupInput>, "value" | "defaultValue"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** A shortcut hint shown on the trailing edge when the field is empty, e.g. `"⌘K"`. */
  shortcut?: string;
}

/**
 * A search field: leading icon, trailing clear button once there's text (or
 * a shortcut hint when there isn't), built on `InputGroup` rather than a
 * bare `Input` with absolutely-positioned icons.
 */
export function SearchBox({
  value,
  defaultValue,
  onValueChange,
  shortcut,
  placeholder = "Search…",
  ...props
}: SearchBoxProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const current = isControlled ? value : internal;

  const setValue = (next: string) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  return (
    <InputGroup>
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput
        value={current}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        {current ? (
          <InputGroupButton aria-label="Clear search" onClick={() => setValue("")}>
            <XIcon />
          </InputGroupButton>
        ) : (
          shortcut && (
            <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              {shortcut}
            </kbd>
          )
        )}
      </InputGroupAddon>
    </InputGroup>
  );
}
