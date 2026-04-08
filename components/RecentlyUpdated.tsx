import Link from "next/link";
import { getCategoryMeta } from "@/lib/categories";
import type { Article } from "@/lib/types";

function relativeDate(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function RecentlyUpdated({ articles }: { articles: Article[] }) {
  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-4">
        Recently Updated
      </h2>
      <ul className="space-y-2">
        {articles.map((article) => {
          const meta = getCategoryMeta(article.frontmatter.category);
          return (
            <li key={article.slug} className="flex items-center gap-3 py-1.5">
              <span
                className="flex-shrink-0 w-2 h-2 rounded-full"
                style={{ backgroundColor: meta.color }}
              />
              <Link
                href={`/${article.categorySlug}/${article.slug}`}
                className="flex-1 text-sm text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors truncate"
              >
                {article.frontmatter.title}
              </Link>
              <span className="flex-shrink-0 text-xs text-[var(--text-tertiary)]">
                {relativeDate(article.frontmatter.updated)}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
