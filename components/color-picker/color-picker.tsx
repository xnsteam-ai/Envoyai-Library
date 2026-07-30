"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

// ── Color math ───────────────────────────────────────────────────────────
// Kept local rather than pulled in as a dependency: three small pure
// functions, not worth a package for a registry item meant to be readable
// and copy-pasteable.

function hsvToRgb(h: number, s: number, v: number) {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  const [r, g, b] =
    h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) };
}

function rgbToHsv(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = 60 * (((g - b) / d) % 6);
    else if (max === g) h = 60 * ((b - r) / d + 2);
    else h = 60 * ((r - g) / d + 4);
  }
  if (h < 0) h += 360;
  return { h, s: max === 0 ? 0 : d / max, v: max };
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("");
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

// ── Component ────────────────────────────────────────────────────────────

export interface ColorPickerProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (hex: string) => void;
  className?: string;
}

/**
 * A saturation/value area, a hue slider and a hex input, kept in sync
 * through one HSV state — hex alone can't represent the drag position
 * uniquely (multiple hue/saturation combinations round to the same hex),
 * so the pointer areas would jump during a drag if hex were the source of
 * truth instead.
 */
export function ColorPicker({ value, defaultValue = "#3b82f6", onValueChange, className }: ColorPickerProps) {
  const initial = hexToRgb(value ?? defaultValue) ?? { r: 59, g: 130, b: 246 };
  const [hsv, setHsv] = React.useState(() => rgbToHsv(initial.r, initial.g, initial.b));
  const [hexInput, setHexInput] = React.useState(value ?? defaultValue);

  const rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
  const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

  React.useEffect(() => setHexInput(hex), [hex]);

  const commit = (next: typeof hsv) => {
    setHsv(next);
    const c = hsvToRgb(next.h, next.s, next.v);
    onValueChange?.(rgbToHex(c.r, c.g, c.b));
  };

  // Reads the drag surface from `e.currentTarget` at event time rather than a
  // ref captured at render time — a ref read during the render that defines
  // this handler would still be null on the very first paint, before React
  // has committed anything to the DOM.
  const dragOn = (onMove: (x: number, y: number) => void) => (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);
    const update = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
      onMove(x, y);
    };
    update(e.clientX, e.clientY);
    const onPointerMove = (ev: PointerEvent) => update(ev.clientX, ev.clientY);
    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  return (
    <div className={cn("flex w-56 flex-col gap-3", className)}>
      <div
        className="relative h-40 w-full touch-none cursor-crosshair rounded-md"
        style={{
          backgroundColor: `hsl(${hsv.h}, 100%, 50%)`,
          backgroundImage:
            "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)",
        }}
        onPointerDown={dragOn((x, y) => commit({ ...hsv, s: x, v: 1 - y }))}
      >
        <div
          className="absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.3)]"
          style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%`, background: hex }}
        />
      </div>

      <div
        className="relative h-3 w-full touch-none cursor-pointer rounded-full"
        style={{
          background:
            "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
        }}
        onPointerDown={dragOn((x) => commit({ ...hsv, h: x * 360 }))}
      >
        <div
          className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.3)]"
          style={{ left: `${(hsv.h / 360) * 100}%` }}
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="size-8 shrink-0 rounded-md border" style={{ background: hex }} />
        <Input
          value={hexInput}
          onChange={(e) => {
            setHexInput(e.target.value);
            const parsed = hexToRgb(e.target.value);
            if (parsed) commit(rgbToHsv(parsed.r, parsed.g, parsed.b));
          }}
          className="h-8 font-mono uppercase"
        />
      </div>
    </div>
  );
}
