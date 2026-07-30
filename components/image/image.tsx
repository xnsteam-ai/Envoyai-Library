"use client";

import * as React from "react";
import { ImageOffIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

const imageVariants = cva("size-full", {
  variants: {
    fit: {
      cover: "object-cover",
      contain: "object-contain",
      fill: "object-fill",
      none: "object-none",
    },
  },
  defaultVariants: { fit: "cover" },
});

export interface ImageProps
  extends Omit<React.ComponentProps<"img">, "onLoad" | "onError">,
    VariantProps<typeof imageVariants> {
  /** Locks the frame to a ratio (e.g. `16 / 9`) and centers the image within it. */
  ratio?: number;
  /** Skips the loading skeleton — the caller already knows the image is cached. */
  skipSkeleton?: boolean;
}

/**
 * An `<img>` with real loading and error states instead of a blank box or a
 * broken-image icon: a skeleton while the network request is in flight, and
 * a muted fallback panel if it fails, so a broken URL never looks like a
 * layout bug.
 */
export function Image({
  className,
  fit,
  ratio,
  skipSkeleton = false,
  alt,
  ...props
}: ImageProps) {
  const [status, setStatus] = React.useState<"loading" | "loaded" | "error">(
    skipSkeleton ? "loaded" : "loading"
  );

  const content = (
    <div className="relative size-full overflow-hidden rounded-md bg-muted">
      {status === "loading" && <Skeleton className="absolute inset-0 rounded-md" />}

      {status === "error" ? (
        <div className="flex size-full flex-col items-center justify-center gap-2 text-muted-foreground">
          <ImageOffIcon className="size-6" />
          <span className="text-xs">Image failed to load</span>
        </div>
      ) : (
        <img
          alt={alt}
          className={cn(
            imageVariants({ fit }),
            status === "loading" && "opacity-0",
            "transition-opacity duration-200",
            className
          )}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          {...props}
        />
      )}
    </div>
  );

  if (ratio) {
    return <AspectRatio ratio={ratio}>{content}</AspectRatio>;
  }

  return content;
}
