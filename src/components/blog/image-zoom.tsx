"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { Expand, Minus, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageZoomProps {
  /** Full-resolution source shown in the overlay. */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** The inline (in-article) rendering of the image. */
  children: ReactNode;
}

/**
 * Zoom steps used by the overlay. Level 0 fits the image to the viewport;
 * higher levels size it past the viewport width so the container scrolls,
 * letting dense infographics be read at their own scale.
 */
const ZOOM_LEVELS = ["fit", "w-[140vw]", "w-[220vw]", "w-[320vw]"] as const;
const MAX_ZOOM = ZOOM_LEVELS.length - 1;

/**
 * Wraps an article image so it can be opened full-size in an overlay —
 * useful for dense infographics that are unreadable at column width.
 */
export function ImageZoom({
  src,
  alt,
  width,
  height,
  children,
}: ImageZoomProps) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(0);

  const close = useCallback(() => {
    setOpen(false);
    setZoom(0);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(z + 1, MAX_ZOOM));
      if (e.key === "-") setZoom((z) => Math.max(z - 1, 0));
    };
    document.addEventListener("keydown", onKeyDown);

    // Prevent the article behind the overlay from scrolling.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  const isFit = zoom === 0;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View full size: ${alt}`}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {children}
        <span
          aria-hidden
          className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <Expand className="h-3.5 w-3.5" />
          View full size
        </span>
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={close}
          className="fixed inset-0 z-50 overflow-auto overscroll-contain bg-black/95"
        >
          {/* Toolbar sits above the scrolling image and never scrolls away. */}
          <div className="fixed right-4 top-4 z-10 flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setZoom((z) => Math.max(z - 1, 0));
              }}
              disabled={isFit}
              aria-label="Zoom out"
              className="rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-30"
            >
              <Minus className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setZoom((z) => Math.min(z + 1, MAX_ZOOM));
              }}
              disabled={zoom === MAX_ZOOM}
              aria-label="Zoom in"
              className="rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-30"
            >
              <Plus className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={close}
              aria-label="Close full size image"
              className="rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            className={cn(
              "flex min-h-full w-full",
              isFit ? "items-center justify-center p-4" : "items-start p-0",
            )}
          >
            {isFit ? (
              // A fixed box plus object-contain scales the image to the viewport
              // without depending on which srcset candidate the browser picked.
              // Letterboxing is invisible against the black backdrop.
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setZoom(1);
                }}
                className="relative h-[92vh] w-[96vw] cursor-zoom-in"
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="96vw"
                  className="object-contain"
                />
              </div>
            ) : (
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                onClick={(e) => {
                  e.stopPropagation();
                  setZoom((z) => (z >= MAX_ZOOM ? 0 : z + 1));
                }}
                // Explicit width + h-auto derives height from the width/height
                // attributes, so layout never depends on the delivered bitmap.
                className={cn(
                  "h-auto max-w-none cursor-zoom-in",
                  ZOOM_LEVELS[zoom],
                )}
                sizes="100vw"
              />
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
