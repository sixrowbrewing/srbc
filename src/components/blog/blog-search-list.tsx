"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PostCard } from "@/components/blog/post-card";
import type { PostListItem } from "@/sanity/lib/types";

export function BlogSearchList({ posts }: { posts: PostListItem[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((post) => post.title.toLowerCase().includes(q));
  }, [posts, query]);

  return (
    <div className="flex flex-col gap-10">
      <div className="relative mx-auto w-full max-w-md">
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

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No articles match &ldquo;{query}&rdquo;.
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
