import Link from "next/link";
import { getCategoryMeta } from "@/lib/categories";
import type { Backlink } from "@/lib/types";

export default function Backlinks({ backlinks }: { backlinks: Backlink[] }) {
  if (!backlinks.length) return null;

  return (
    <section className="mt-10 rounded-xl bg-[var(--bg-warm,#faf8f5)] dark:bg-white/5 border border-[var(--border)] p-6">
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-4 h-4 text-[var(--text-tertiary)]"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m9.86-2.06a4.5 4.5 0 0 0-1.242-7.244l-4.5-4.5a4.5 4.5 0 0 0-6.364 6.364L4.34 8.374"
          />
        </svg>
        <h2 className="text-sm font-semibold text-[var(--text-secondary)]">
          Linked from {backlinks.length} article{backlinks.length !== 1 ? "s" : ""}
        </h2>
      </div>
      <ul className="space-y-3">
        {backlinks.map((bl) => {
          const meta = getCategoryMeta(bl.category);
          return (
            <li key={bl.slug} className="flex items-start gap-3">
              <span
                className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full"
                style={{ backgroundColor: meta.color }}
              />
              <div className="min-w-0">
                <Link
                  href={`/${bl.categorySlug}/${bl.slug}`}
                  className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                >
                  {bl.title}
                </Link>
                {bl.context && (
                  <p className="text-xs text-[var(--text-tertiary)] mt-0.5 line-clamp-1">
                    {bl.context}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
