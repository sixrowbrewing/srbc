# Project Rules

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion (minimal)
- Lucide Icons

## Architecture Rules

- Use Server Components by default
- Use Client Components only when necessary
- Keep components small and reusable
- No inline styles
- No duplicated sections
- Separate UI from content
- Use semantic HTML

## SEO Rules

- Every page must have metadata
- Use proper heading hierarchy
- Optimize image loading
- Use structured data where useful
- Ensure Lighthouse score above 90

## Styling Rules

- Use consistent spacing scale
- Typography must use CSS variables
- Mobile-first responsive design
- Avoid excessive animations

## Folder Structure Rules

- Feature-based architecture
- Shared UI components inside `/components/ui`
- Page-specific sections inside `/features`

## Performance Rules

- Lazy load heavy sections
- Optimize fonts
- Avoid unnecessary client-side JS
- Use next/image everywhere

## Content Rules

- Preserve ALL content from srbc-website-optimized.jsx
- Redesign layout but do not lose text/content
