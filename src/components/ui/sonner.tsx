"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

/**
 * App-styled Sonner toaster: dark, slightly translucent toasts at the top
 * right, offset to clear the fixed site header (h-20 on mobile, md:h-24).
 */
export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      position="top-right"
      offset={{ top: 112, right: 24 }}
      mobileOffset={{ top: 96, right: 16, left: 16 }}
      duration={3500}
      toastOptions={{
        classNames: {
          toast:
            "!rounded-lg !border !border-white/15 !bg-neutral-950/90 !text-sm !font-medium !text-white !shadow-xl backdrop-blur-md",
          title: "!text-white",
          description: "!text-white/80",
          icon: "!text-green-400",
        },
      }}
      {...props}
    />
  );
}
