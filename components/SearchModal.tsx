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
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg rounded-xl bg-[var(--bg-surface,#fff)] dark:bg-[var(--bg-surface,#1a1a1a)] border border-[var(--border)] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
          <svg
            className="w-5 h-5 text-[var(--text-tertiary)]"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search articles..."
            className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none"
          />
        </div>

        {query.trim() && (
          <div className="px-4 py-1.5 text-xs text-[var(--text-tertiary)] border-b border-[var(--border)]">
            {results.length} result{results.length !== 1 ? "s" : ""}
          </div>
        )}

        {results.length > 0 && (
          <ul className="max-h-80 overflow-y-auto py-2">
            {results.map((result, i) => {
              const meta = getCategoryMeta(result.item.category);
              return (
                <li key={result.item.slug}>
                  <button
                    type="button"
                    className={`w-full text-left px-4 py-2.5 flex items-start gap-3 transition-colors ${
                      i === selectedIndex
                        ? "bg-[var(--accent-light,#f0f0f0)] dark:bg-white/5"
                        : "hover:bg-[var(--bg-hover,#f5f5f5)] dark:hover:bg-white/5"
                    }`}
                    onClick={() => navigateTo(result.item)}
                    onMouseEnter={() => setSelectedIndex(i)}
                  >
                    <span
                      className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full"
                      style={{ backgroundColor: meta.color }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[var(--text-primary)] truncate">
                          {result.item.title}
                        </span>
                        <span
                          className="flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-medium"
                          style={{
                            backgroundColor: meta.bgColor,
                            color: meta.color,
                          }}
                        >
                          {meta.name}
                        </span>
                      </div>
                      {result.item.summary && (
                        <p className="text-xs text-[var(--text-tertiary)] mt-0.5 line-clamp-1">
                          {result.item.summary}
                        </p>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {query.trim() && results.length === 0 && (
          <div className="px-4 py-8 text-center text-sm text-[var(--text-tertiary)]">
            No articles found for &ldquo;{query}&rdquo;
          </div>
        )}

        <div className="flex items-center gap-4 px-4 py-2 border-t border-[var(--border)] text-[10px] text-[var(--text-tertiary)]">
          <span>
            <kbd className="px-1 py-0.5 rounded bg-[var(--bg-hover,#eee)] dark:bg-white/10 font-mono">
              &uarr;&darr;
            </kbd>{" "}
            navigate
          </span>
          <span>
            <kbd className="px-1 py-0.5 rounded bg-[var(--bg-hover,#eee)] dark:bg-white/10 font-mono">
              &crarr;
            </kbd>{" "}
            open
          </span>
          <span>
            <kbd className="px-1 py-0.5 rounded bg-[var(--bg-hover,#eee)] dark:bg-white/10 font-mono">
              esc
            </kbd>{" "}
            close
          </span>
        </div>
      </div>
    </div>
  );
}
