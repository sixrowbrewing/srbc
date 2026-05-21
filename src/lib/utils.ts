import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "./site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function whatsappLink(message?: string) {
  const text = message ?? siteConfig.whatsapp.defaultMessage;
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(text)}`;
}
