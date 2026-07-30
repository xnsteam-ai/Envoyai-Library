"use client";

import * as React from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Tag } from "@/components/ui/tag";

export interface TagPickerOption {
  value: string;
  label: string;
}

export interface TagPickerProps {
  options: TagPickerOption[];
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

/**
 * A multi-select combobox that renders its selection as removable Tags —
 * Popover for the trigger surface, Command for the searchable option list,
 * Tag for what's already picked.
 *
 * The row of Tags sits in a plain div, not inside the trigger button
 * itself: a Tag's remove control is a real `<button>`, and nesting that
 * inside the trigger's own `<button>` is invalid HTML and makes the inner
 * button unreliably clickable. Only the small chevron affordance opens the
 * popover.
 */
export function TagPicker({ options, value, onValueChange, placeholder = "Select…", className }: TagPickerProps) {
  const [open, setOpen] = React.useState(false);

  const toggle = (optionValue: string) => {
    onValueChange(
      value.includes(optionValue) ? value.filter((v) => v !== optionValue) : [...value, optionValue]
    );
  };

  const selectedLabels = new Map(options.map((o) => [o.value, o.label]));

  return (
    <div
      className={cn(
        "flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-md border border-input bg-transparent px-2 py-1.5 text-sm",
        className
      )}
    >
      {value.length === 0 && <span className="text-muted-foreground">{placeholder}</span>}
      {value.map((v) => (
        <Tag key={v} onRemove={() => toggle(v)}>
          {selectedLabels.get(v) ?? v}
        </Tag>
      ))}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label="Add tag"
            className="ml-auto inline-flex shrink-0 rounded-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronDownIcon className="size-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-0" align="end">
          <Command>
            <CommandInput placeholder="Search…" />
            <CommandList>
              <CommandEmpty>No results.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const selected = value.includes(option.value);
                  return (
                    <CommandItem key={option.value} onSelect={() => toggle(option.value)}>
                      <CheckIcon className={cn("size-4", selected ? "opacity-100" : "opacity-0")} />
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
