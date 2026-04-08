import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import type { Heading } from "@/lib/types";

interface SidebarProps {
  categoryCounts: Array<{ slug: string; count: number }>;
  activePath?: string;
  toc?: Heading[];
}

export default function Sidebar({
  categoryCounts,
  activePath,
  toc,
}: SidebarProps) {
  const showToc = toc && toc.length >= 2;

  return (
    <aside className="hidden xl:block w-[248px] shrink-0 border-r border-[var(--border)] bg-[var(--bg-sidebar)] overflow-y-auto h-[calc(100vh-3.5rem)] sticky top-14">
      <div className="flex flex-col gap-6 px-4 py-5">
        {/* Table of contents */}
        {showToc && (
          <section>
            <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
              In This Article
            </h4>
            <nav className="flex flex-col gap-0.5">
              {toc.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className={`block truncate rounded-md py-1 text-[13px] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] ${
                    heading.depth === 3
                      ? "pl-6 text-[var(--text-tertiary)]"
                      : "pl-3 text-[var(--text-secondary)]"
                  }`}
                >
                  {heading.text}
                </a>
              ))}
            </nav>
          </section>
        )}

        {/* Navigation */}
        <section>
          <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
            Navigation
          </h4>
          <nav className="flex flex-col gap-0.5">
            <Link
              href="/"
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--bg-hover)] ${
                activePath === "/"
                  ? "bg-[var(--bg-hover)] text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)]"
              }`}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Home
            </Link>
            <Link
              href="/category"
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--bg-hover)] ${
                activePath === "/category"
                  ? "bg-[var(--bg-hover)] text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)]"
              }`}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
              All Articles
            </Link>
          </nav>
        </section>

        {/* Categories */}
        <section>
          <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
            Categories
          </h4>
          <nav className="flex flex-col gap-0.5">
            {categoryCounts.map(({ slug, count }) => {
              const cat = CATEGORIES[slug];
              const name = cat?.name ?? slug;
              const color = cat?.color ?? "#6b7280";
              return (
                <Link
                  key={slug}
                  href={`/category/${slug}`}
                  className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--bg-hover)] ${
                    activePath === `/category/${slug}`
                      ? "bg-[var(--bg-hover)] text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)]"
                  }`}
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="flex-1 truncate">{name}</span>
                  <span className="text-[11px] text-[var(--text-tertiary)]">
                    {count}
                  </span>
                </Link>
              );
            })}
          </nav>
        </section>

        {/* About */}
        <section className="rounded-lg border border-[var(--border-light)] bg-[var(--bg-surface)] p-3">
          <p className="text-[12px] leading-relaxed text-[var(--text-tertiary)]">
            A personal wiki by Shravan Tickoo. Notes on people, projects,
            learnings, and ideas that shaped how I build.
          </p>
        </section>
      </div>
    </aside>
  );
}
