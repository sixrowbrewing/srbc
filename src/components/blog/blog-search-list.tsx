"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ListFilter, Search } from "lucide-react";
import { PostCard } from "@/components/blog/post-card";
import { cn } from "@/lib/utils";
import type { PostListItem } from "@/sanity/lib/types";

export function BlogSearchList({ posts }: { posts: PostListItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // Unique categories present across the loaded posts, sorted alphabetically.
  const categories = useMemo(() => {
    const map = new Map<string, string>();
    for (const post of posts) {
      for (const c of post.categories ?? []) {
        if (c?.slug && !map.has(c.slug)) map.set(c.slug, c.title);
      }
    }
    return Array.from(map, ([slug, title]) => ({ slug, title })).sort((a, b) =>
      a.title.localeCompare(b.title),
    );
  }, [posts]);

  // Close the filter dropdown on outside click / Escape.
  useEffect(() => {
    if (!isFilterOpen) return;
    const handleClick = (event: MouseEvent) => {
      if (!filterRef.current?.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsFilterOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isFilterOpen]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesQuery = !q || post.title.toLowerCase().includes(q);
      const matchesCategory =
        !category || (post.categories ?? []).some((c) => c.slug === category);
      return matchesQuery && matchesCategory;
    });
  }, [posts, query, category]);

  const activeCategoryTitle = categories.find((c) => c.slug === category)?.title;

  return (
    <div className="flex flex-col gap-10">
      <div className="mx-auto flex w-full max-w-md items-center gap-2">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles by name…"
            aria-label="Search articles by name"
            className="w-full rounded-full border border-border/80 bg-card py-3 pl-11 pr-4 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        {categories.length > 0 ? (
          <div className="relative" ref={filterRef}>
            <button
              type="button"
              onClick={() => setIsFilterOpen((open) => !open)}
              aria-expanded={isFilterOpen}
              aria-haspopup="true"
              aria-label="Filter by category"
              className={cn(
                "relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-card text-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                category && "border-primary/40 text-primary",
              )}
            >
              <ListFilter className="h-4 w-4" aria-hidden />
              {category ? (
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-accent" />
              ) : null}
            </button>

            {isFilterOpen ? (
              <div
                role="menu"
                className="absolute right-0 top-full z-50 mt-2 w-56 animate-fade-in overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-lg ring-1 ring-black/[0.02]"
              >
                <p className="px-3 py-2 text-caption font-semibold uppercase tracking-widest text-muted-foreground">
                  Filter by category
                </p>
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={category === null}
                  onClick={() => {
                    setCategory(null);
                    setIsFilterOpen(false);
                  }}
                  className="flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  All categories
                  {category === null ? (
                    <Check className="h-4 w-4 text-primary" aria-hidden />
                  ) : null}
                </button>
                {categories.map((c) => (
                  <button
                    key={c.slug}
                    type="button"
                    role="menuitemradio"
                    aria-checked={category === c.slug}
                    onClick={() => {
                      setCategory(c.slug);
                      setIsFilterOpen(false);
                    }}
                    className="flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    {c.title}
                    {category === c.slug ? (
                      <Check className="h-4 w-4 text-primary" aria-hidden />
                    ) : null}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      {activeCategoryTitle ? (
        <div className="-mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>
            Showing{" "}
            <span className="font-semibold text-foreground">
              {activeCategoryTitle}
            </span>
          </span>
          <button
            type="button"
            onClick={() => setCategory(null)}
            className="font-semibold text-accent-hover hover:underline"
          >
            Clear filter
          </button>
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No articles match your search.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <li key={post._id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
