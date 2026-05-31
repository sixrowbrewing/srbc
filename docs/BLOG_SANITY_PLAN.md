# Blog + Sanity CMS Integration Plan

> **Goal:** Add an SEO-optimized blog to the SRBC site, powered by Sanity CMS, so the
> brewery keywords rank through real, indexable, linked content — not hidden meta tags
> or orphan pages.

---

## 0. Why we're doing it this way (the SEO reasoning)

| Approach | Verdict |
|---|---|
| `<meta name="keywords">` tag | ❌ Ignored by Google. No ranking value. |
| Hidden / unlinked pages | ❌ "Orphan pages" — rarely indexed; keyword-only versions risk a **doorway page penalty**. |
| **A real blog with linked, useful articles** | ✅ The correct, Google-approved way. Each post is a new indexable page targeting real search queries. |

**Principle:** keywords rank when they appear naturally in *visible, linked* content that
genuinely answers what people search for. A blog is the home for the educational keywords
(`how to brew beer`, `types of beer`, `brewery license in India`, `cost to setup a brewery`)
that don't fit on service pages.

---

## 1. What we're building

1. **Sanity CMS** — a content dashboard so posts can be written without touching code.
2. **Embedded Studio** at `/studio` (lives inside this Next.js app, one repo, one deploy).
3. **`/blog`** — a listing page of all published posts.
4. **`/blog/[slug]`** — individual post pages with full per-post SEO.
5. **SEO plumbing** — per-post metadata, `BlogPosting` structured data, canonical URLs,
   OG/Twitter images, and blog posts added to `sitemap.ts`.
6. **Navigation + footer links** to `/blog` (so posts are never orphaned).

---

## 2. Prerequisites (what YOU need to do)

These are the only steps that require you — everything else is code I'll write.

1. **Create a free Sanity account** → <https://www.sanity.io/login>
2. **Create a new project** in the Sanity dashboard (or via CLI during setup).
   - Note the **Project ID** (looks like `abc12xyz`).
   - Use dataset name **`production`**.
3. **Create an API token** (Settings → API → Tokens) with **Viewer** read access — used
   for fetching draft/published content at build time.
4. **Add `http://localhost:3000` and your production domain** to
   Settings → API → CORS origins (so the embedded Studio can talk to Sanity).
5. Hand me the **Project ID** + **API token**, and I'll fill in the env vars.

---

## 3. Dependencies to install

```bash
npm install next-sanity @sanity/image-url @portabletext/react
npm install sanity @sanity/vision styled-components
```

- `next-sanity` — Sanity client + helpers tuned for Next.js App Router.
- `@sanity/image-url` — builds optimized image URLs from Sanity assets.
- `@portabletext/react` — renders Sanity's rich-text ("Portable Text") to React.
- `sanity` + `@sanity/vision` — the Studio app + query playground (embedded at `/studio`).
- `styled-components` — peer dependency required by the embedded Studio.

---

## 4. Environment variables

Add to `.env.local` (and document in `.env.example`):

```bash
# Sanity CMS — blog content
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
SANITY_API_READ_TOKEN=your_viewer_token

# Shared secret to verify Sanity webhook requests (auto-update on publish/edit).
# Generate any long random string, e.g.  openssl rand -hex 32
SANITY_REVALIDATE_SECRET=your_long_random_secret
```

> `NEXT_PUBLIC_*` vars are safe to expose (needed by the in-browser Studio).
> The read token stays server-side only.

---

## 5. File structure to add

```
sanity.config.ts                         # Studio config (schemas, plugins)
sanity.cli.ts                            # CLI config (project id, dataset)

src/sanity/
  env.ts                                 # reads + validates env vars
  schemaTypes/
    index.ts                             # exports all schemas
    post.ts                              # blog post document
    author.ts                            # author document
    category.ts                          # category document
    blockContent.ts                      # rich-text body definition
    seo.ts                               # reusable SEO object (meta title/description/og image)
  lib/
    client.ts                            # configured Sanity client
    image.ts                             # urlFor() image helper
    queries.ts                           # GROQ queries (all posts, post by slug, slugs)
    fetch.ts                             # typed sanityFetch wrapper w/ caching tags

src/app/studio/[[...tool]]/page.tsx      # embedded Studio route
src/app/api/revalidate/route.ts          # webhook endpoint Sanity calls on publish/edit
src/app/blog/page.tsx                    # blog listing
src/app/blog/[slug]/page.tsx             # single post
src/components/blog/
  post-card.tsx                          # listing card
  portable-text.tsx                      # rich-text renderer (custom marks/images)

# Edits to existing files:
src/lib/seo.ts                           # add blogPostingJsonLd() + reuse buildMetadata
src/app/sitemap.ts                       # append blog post URLs from Sanity
src/components/layout/navigation.tsx     # add "Blog" nav link
src/components/layout/footer.tsx         # add "Blog" footer link
src/lib/site.ts                          # add { label: "Blog", href: "/blog" } to nav
next.config.ts                           # allow cdn.sanity.io in images.remotePatterns
```

---

## 6. Content model (the "Standard blog set")

**Post** document fields:
- `title` (string, required)
- `slug` (auto-generated from title, required)
- `coverImage` (image + alt text, required for OG/social)
- `excerpt` (text, ~160 chars — also used as fallback meta description)
- `body` (Portable Text rich content: headings, lists, links, inline images)
- `author` (reference → Author)
- `categories` (array of references → Category)
- `publishedAt` (datetime, required)
- `seo` (object):
  - `metaTitle` (overrides `<title>` if set)
  - `metaDescription` (overrides excerpt for `<meta description>`)
  - `ogImage` (overrides cover image for social cards)
  - `noindex` (boolean — hide a post from search engines if needed)

**Author**: `name`, `image`, `bio`.
**Category**: `title`, `slug`, `description`.

---

## 7. SEO implementation details

This is the part that makes the blog actually rank.

1. **Per-post `generateMetadata()`** on `/blog/[slug]`:
   - Uses the existing `buildMetadata()` helper in `src/lib/seo.ts`.
   - Title = `seo.metaTitle ?? post.title`.
   - Description = `seo.metaDescription ?? post.excerpt`.
   - Canonical URL = `https://sixrowbrewing.com/blog/<slug>`.
   - OG/Twitter image = `seo.ogImage ?? coverImage`.
   - Respects `noindex` via `robots: { index: false }`.

2. **Structured data** — add `blogPostingJsonLd()` to `src/lib/seo.ts` emitting
   schema.org `BlogPosting` (headline, image, datePublished, author, publisher).
   Helps Google show rich results.

3. **Sitemap** — `src/app/sitemap.ts` fetches all published post slugs from Sanity and
   appends them with `lastModified` from `publishedAt`. Ensures Google discovers every post.

4. **Internal linking** — `/blog` is added to the main nav + footer; each post links back
   to relevant `/services` pages. No orphan pages.

5. **Headings & semantics** — Portable Text renders proper `<h2>/<h3>`, one `<h1>` per post,
   `next/image` for all images with required `alt` text (per project CLAUDE.md rules).

6. **Performance** — Server Components by default, ISR caching on Sanity fetches
   (revalidate on publish), Sanity CDN images via `next/image`. Keeps Lighthouse > 90.

### Keyword → article mapping (first content batch)

| Article | Target keywords |
|---|---|
| How much does it cost to set up a brewery in India? | cost to setup a brewery, brewery setup, cost of equipment, beer machine cost |
| How to get a brewery license in India | brewery license, brewery license in India |
| How to brew beer: a beginner's guide | how to brew beer, brewing in India, beer recipe |
| Types of beer & beer styles explained | types of beer, beer styles, stout beer, wheat beer in India |
| Craft vs commercial beer: the difference | difference between craft and commercial beer, craft brewery |
| Writing a brewery business plan & project report | brewery business plan, brewery project report, beer costing and finances |

> **Note:** keywords are *worked into* genuinely useful articles — never stuffed. One clear
> primary keyword per post, used in the title, URL slug, first paragraph, and a heading.

---

## 7b. Automatic updates: Sanity webhook → instant revalidation

**Goal:** the moment you publish or edit a post in Studio, the live site updates — no
redeploy, no waiting.

### How it works

```
You publish in /studio
        │
        ▼
Sanity fires a webhook  ──POST──►  https://www.sixrowbrewing.com/api/revalidate
                                            │  (verifies the secret signature)
                                            ▼
                                   revalidateTag("post")
                                            │
                                            ▼
                          Next.js drops the cached blog pages and
                          rebuilds them on the next visit (seconds).
```

- Every Sanity fetch is tagged (e.g. `next: { tags: ["post"] }`).
- The `/api/revalidate` route verifies the request is genuinely from Sanity using the
  shared **`SANITY_REVALIDATE_SECRET`**, then calls `revalidateTag()`.
- This is the standard `next-sanity` pattern (on-demand ISR). Until a webhook fires, pages
  are served from cache (fast); after it fires, they're regenerated with fresh content.

### What YOU set up in Sanity (after we deploy)

The webhook needs a **live, deployed URL** to call, so this step happens once the site is
deployed (localhost can't receive Sanity's webhook). In the Sanity dashboard:

1. Go to **Settings → API → Webhooks → Create webhook**.
2. **Name:** `Next.js revalidate`
3. **URL:** `https://www.sixrowbrewing.com/api/revalidate`
4. **Dataset:** `production`
5. **Trigger on:** ✅ Create ✅ Update ✅ Delete
6. **Filter:** `_type == "post" || _type == "author" || _type == "category"`
7. **HTTP method:** `POST`
8. **API version:** latest (`v2024-10-01` or newer)
9. **Secret:** paste the same value you put in `SANITY_REVALIDATE_SECRET`.
10. Save.

> Tip: you can also create it from the CLI with `npx sanity hook create`, but the dashboard
> form above is simpler.

### Before deployment (local dev)

While developing locally, you don't need the webhook — set a short time-based fallback
(`export const revalidate = 60`) so content refreshes within a minute. The webhook takes
over for instant updates in production.

---

## 8. Build order (how I'll execute, once approved)

1. Install dependencies.
2. Add env vars + validate in `src/sanity/env.ts`.
3. Define schemas (post, author, category, blockContent, seo).
4. Add `sanity.config.ts` + `sanity.cli.ts` + embedded `/studio` route.
5. Add Sanity client, image helper, GROQ queries, typed fetch wrapper.
6. Build `/blog` listing + `/blog/[slug]` with `generateMetadata` + `generateStaticParams`.
7. Add Portable Text renderer + post card components.
8. Wire SEO: `blogPostingJsonLd`, sitemap posts, canonical URLs.
9. Add nav + footer links.
10. Update `next.config.ts` image domains.
11. Run `npm run type-check` + `npm run build` to verify.
12. Walk you through creating the Sanity project, then publish a first test post end-to-end.

---

## 9. Post-launch SEO checklist

- [ ] Submit `sitemap.xml` in **Google Search Console**.
- [ ] Verify each post is indexable (no accidental `noindex`).
- [ ] Confirm rich results with Google's **Rich Results Test**.
- [ ] Set up a **Google Business Profile** for local terms ("brewery consultant in Pune").
- [ ] Publish on a regular cadence — fresh content compounds ranking.
- [ ] Internally link new posts to older posts + relevant service pages.
- [ ] Add descriptive `alt` text to every image.

---

## 10. Decisions (locked)

1. ✅ `/blog` appears in **both** the top navigation **and** the footer.
2. ✅ **Flat post list** — no category/tag browsing for now (categories still exist as a
   field for future use, just not surfaced as browsable pages).
3. ✅ **Content is owned by you** — no sample article will be drafted. The schema + Studio
   will be ready for you to write posts.

---

## 11. ⚠️ Required fix: canonical domain (www vs non-www)

The live site is **`https://www.sixrowbrewing.com`** (with `www`), but
`src/lib/site.ts` currently has `https://sixrowbrewing.com` (no `www`).

These **must match** the host search engines actually serve, or canonical tags, the sitemap,
OG URLs, and the webhook target will point to the wrong domain — splitting SEO signals.

**Action:** update `siteConfig.url` to `https://www.sixrowbrewing.com` (assuming `www` is the
canonical/live host). Also confirm the non-`www` version 301-redirects to `www` at the DNS/host
level so there's a single canonical home.
```