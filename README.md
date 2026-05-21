# Six Row Brewing Consulting — Web

Production-grade marketing site for SRBC, built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and a shadcn-style component layer.

---

## Quick Start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run type-check   # tsc --noEmit
```

---

## Project Structure

```
srbc/
├── src/
│   ├── app/                       # App Router routes
│   │   ├── layout.tsx             # Root layout: fonts, nav, footer, JSON-LD
│   │   ├── page.tsx               # Home
│   │   ├── globals.css            # Tailwind + design tokens
│   │   ├── sitemap.ts             # next sitemap
│   │   ├── robots.ts              # next robots
│   │   ├── not-found.tsx
│   │   ├── services/
│   │   │   ├── page.tsx           # Services index
│   │   │   └── [slug]/
│   │   │       ├── page.tsx       # Service detail (SSG via generateStaticParams)
│   │   │       └── not-found.tsx
│   │   └── contact/page.tsx
│   │
│   ├── components/
│   │   ├── ui/                    # shadcn-style primitives (button, card, input, …)
│   │   ├── layout/                # navigation, footer, whatsapp-button
│   │   └── shared/                # container, section, section-heading, service-card, …
│   │
│   ├── features/                  # Page-scoped sections (composition of shared UI)
│   │   ├── home/                  # hero, why-choose, seo-content, services-preview
│   │   ├── services/              # services-grid, page-hero
│   │   ├── service-detail/        # service-hero, offerings, process, outcomes, benchmarks
│   │   └── contact/               # contact-form (Client), contact-info
│   │
│   ├── content/                   # Typed content layer — single source of truth
│   │   ├── services.ts            # All service definitions
│   │   ├── benchmarks.ts          # Industry benchmarks
│   │   └── home.ts                # Hero, why-choose, long-form SEO content
│   │
│   ├── lib/
│   │   ├── site.ts                # Site config (name, contact, nav, whatsapp)
│   │   ├── seo.ts                 # buildMetadata, JSON-LD builders
│   │   └── utils.ts               # cn(), whatsappLink()
│   │
│   └── types/
│       └── service.ts             # ServiceDetail, Benchmark, etc.
│
├── tailwind.config.ts             # Design tokens, fonts, animations
├── next.config.ts                 # Image hosts, package optimizations
└── tsconfig.json                  # `@/*` → `src/*`
```

---

## Architectural Decisions

### Server Components by default
Only `Navigation` (scroll/menu state), `ContactForm` (form state), and the floating WhatsApp button as needed are marked `"use client"`. Everything else — heroes, sections, cards, layouts — renders on the server. This keeps the JavaScript shipped to the browser minimal.

### Content layer (`src/content`)
All copy and structured data lives in typed modules. Pages and components import from `@/content/*` — they never inline copy. Benefits:
- Edit copy without touching JSX.
- Generate sitemap / metadata / static params from the same source.
- Future move to a CMS swaps the import, nothing else.

### Feature folders (`src/features`)
Page-specific sections (e.g., `home/hero-section`, `service-detail/offerings-section`) compose primitives from `components/ui` and `components/shared`. Each section is small and replaceable. Pages just orchestrate them.

### Shared vs UI components
- `components/ui` — generic, reusable primitives (Button, Card, Input). Modeled after shadcn/ui patterns so you can drop in `npx shadcn@latest add …` without disruption.
- `components/shared` — opinionated SRBC-specific blocks (Section, SectionHeading, ServiceCard, CtaSection) that use the primitives.

### Design tokens
Defined as HSL CSS variables in `globals.css` and surfaced through `tailwind.config.ts` (`bg-primary`, `text-accent`, `border-border`, etc.). One palette swap changes the whole site. Includes a fluid display type scale (`text-display-xl`, etc.) using `clamp()` for responsive headings.

### SEO
- `metadataBase` + per-page `buildMetadata()` produce canonical URLs, OpenGraph, Twitter cards.
- JSON-LD `ProfessionalService` schema in the root layout; `Service` schema on each detail page.
- `sitemap.ts` and `robots.ts` generated from the same content layer.
- Semantic HTML, single `<h1>` per page, skip-to-content link, ARIA labels on landmarks.

### Performance
- `next/image` with `priority` on hero, lazy on the rest.
- `optimizePackageImports` for `lucide-react` and `framer-motion`.
- Service detail pages are statically generated via `generateStaticParams`.
- Fonts (Inter, Poppins) loaded via `next/font` with `display: swap` and CSS variables.

### Accessibility
- Visible focus rings (`focus-visible:ring-2 ring-ring`).
- Skip link in the root layout.
- Decorative images marked `alt=""` with overlays as `aria-hidden`.
- Mobile menu uses `aria-expanded` / `aria-controls`.
- Form labels associated with inputs; live regions for status/errors.

---

## Design System

| Token       | Value                                  | Purpose                          |
| ----------- | -------------------------------------- | -------------------------------- |
| `primary`   | `#0F172A` (slate-900)                  | Headers, dark sections, footer   |
| `accent`    | `#2563EB` (blue-600)                   | CTAs, links, focus rings         |
| `muted`     | `#F1F5F9` (slate-100)                  | Alternating section backgrounds  |
| `border`    | `#E2E8F0` (slate-200)                  | Card borders, dividers           |
| `success`   | `#22C55E`                              | Benchmark "World Class"          |
| `warning`   | `#F59E0B`                              | Benchmark "Good"                 |
| `destructive` | `#EF4444`                            | Benchmark "Needs Improvement"    |

**Typography**: Poppins for headings, Inter for body. Fluid scale via `text-display-{lg,xl,2xl}`.

**Spacing**: Section vertical rhythm is `py-16 md:py-24`. Container max width 1280px with `px-6 md:px-8`.

**Radius**: `rounded-xl` (12px) on cards, `rounded-md` on inputs/buttons.

**Motion**: Minimal — `transition-colors`, `hover:-translate-y-1` on cards, no scroll-jacking.

---

## Scalability Considerations

1. **CMS-ready** — `src/content/*` is a clean swap point for Sanity, Contentful, MDX, etc. The page components consume typed objects, not strings.
2. **i18n** — `metadataBase`, `locale` (`en_IN`), and `next/font` are already in place. Add `next-intl` + `[locale]` segment when needed.
3. **Blog / case studies** — Drop `src/app/blog/[slug]` using the same `buildMetadata` + JSON-LD helpers.
4. **Form backend** — `ContactForm` currently simulates submission. Replace the `await new Promise(…)` with a `fetch('/api/contact')` call to a route handler (Resend, SES, HubSpot, etc.).
5. **Analytics** — Inject in the root layout (Vercel Analytics, Plausible) — single touch point.
6. **shadcn/ui** — Primitives follow shadcn conventions; `npx shadcn@latest add dialog` etc. will integrate cleanly.

---

## Recommended Next Steps

- Add a `/case-studies/[slug]` route reusing `ProcessSection` and `OutcomesSection`.
- Wire `ContactForm` to a route handler + email provider.
- Add OG image generation via `app/opengraph-image.tsx`.
- Add a lightweight `Testimonial` shared component.
- Convert the `WhatsAppButton` ping animation into a `prefers-reduced-motion` aware variant.

---

## Content Parity

All copy from the original `srbc-website-optimized.jsx` is preserved across the typed content modules:

- Hero / why-choose / SEO long-form → `src/content/home.ts`
- All 7 services + audit → `src/content/services.ts`
- All 6 industry benchmarks → `src/content/benchmarks.ts`
- Contact / footer / nav → `src/lib/site.ts`
