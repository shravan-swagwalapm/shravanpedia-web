"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { getCategoryMeta } from "@/lib/categories";
import type { SearchEntry } from "@/lib/types";

export default function SearchModal({
  isOpen,
  onClose,
  searchIndex,
}: {
  isOpen: boolean;
  onClose: () => void;
  searchIndex: SearchEntry[];
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const fuse = useRef(
    new Fuse(searchIndex, {
      keys: [
        { name: "title", weight: 3 },
        { name: "summary", weight: 2 },
        { name: "tags", weight: 2 },
        { name: "body", weight: 1 },
      ],
      threshold: 0.4,
      includeMatches: true,
    })
  );

  useEffect(() => {
    fuse.current = new Fuse(searchIndex, {
      keys: [
        { name: "title", weight: 3 },
        { name: "summary", weight: 2 },
        { name: "tags", weight: 2 },
        { name: "body", weight: 1 },
      ],
      threshold: 0.4,
      includeMatches: true,
    });
  }, [searchIndex]);

  const results = query.trim()
    ? fuse.current.search(query).slice(0, 10)
    : [];

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  const navigateTo = useCallback(
    (entry: SearchEntry) => {
      router.push(`/${entry.categorySlug}/${entry.slug}`);
      onClose();
    },
    [router, onClose]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        navigateTo(results[selectedIndex].item);
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [results, selectedIndex, navigateTo, onClose]
  );

  if (!isOpen) return null;

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-backdrop" />
      <div className="search-dialog" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search Shravanpedia..."
        />

        {results.length > 0 && (
          <div style={{ maxHeight: "360px", overflowY: "auto" }}>
            {results.map((result, i) => {
              const meta = getCategoryMeta(result.item.category);
              return (
                <div
                  key={result.item.slug}
                  className={`search-result ${i === selectedIndex ? "search-result-active" : ""}`}
                  onClick={() => navigateTo(result.item)}
                  onMouseEnter={() => setSelectedIndex(i)}
                >
                  <div className="search-result-title">
                    {result.item.title}
                  </div>
                  {result.item.summary && (
                    <div className="search-result-summary">
                      {result.item.summary.length > 100
                        ? result.item.summary.slice(0, 100) + "..."
                        : result.item.summary}
                    </div>
                  )}
                  <div className="search-result-category">
                    {meta.name}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {query.trim() && results.length === 0 && (
          <div style={{
            padding: "16px",
            textAlign: "center",
            fontSize: "13px",
            color: "var(--text-faint)",
            fontFamily: "-apple-system, sans-serif",
          }}>
            No articles found for &ldquo;{query}&rdquo;
          </div>
        )}

        <div style={{
          padding: "6px 14px",
          borderTop: "1px solid var(--border-lighter)",
          fontSize: "11px",
          color: "var(--text-faint)",
          fontFamily: "-apple-system, sans-serif",
          display: "flex",
          gap: "12px",
        }}>
          <span>&#8593;&#8595; navigate</span>
          <span>&#9166; open</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
