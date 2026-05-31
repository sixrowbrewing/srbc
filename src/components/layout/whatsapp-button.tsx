// WhatsApp floating button — disabled so the number is not exposed in the UI
// or client bundle. Re-enable `whatsappLink` in src/lib/utils.ts and the
// `siteConfig.whatsapp` config in src/lib/site.ts to restore this.
//
// import { MessageCircle } from "lucide-react";
// import { whatsappLink } from "@/lib/utils";
//
// export function WhatsAppButton() {
//   return (
//     <a
//       href={whatsappLink()}
//       target="_blank"
//       rel="noopener noreferrer"
//       aria-label="Chat with us on WhatsApp"
//       className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-1 ring-black/5 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 md:bottom-8 md:right-8 md:h-16 md:w-16"
//     >
//       <MessageCircle className="h-6 w-6 md:h-7 md:w-7" aria-hidden />
//       <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
//         <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500/70" />
//         <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
//       </span>
//     </a>
//   );
// }

export {};
