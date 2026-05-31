import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Disabled so the WhatsApp number is not bundled into the client. Re-enable
// together with `siteConfig.whatsapp` in src/lib/site.ts when needed.
// import { siteConfig } from "./site";
// export function whatsappLink(message?: string) {
//   const text = message ?? siteConfig.whatsapp.defaultMessage;
//   return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(text)}`;
// }

export function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
