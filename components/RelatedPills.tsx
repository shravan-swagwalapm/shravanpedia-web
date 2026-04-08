import Link from "next/link";
import type { Article } from "@/lib/types";

export default function RelatedPills({
  slugs,
  articles,
}: {
  slugs: string[];
  articles: Article[];
}) {
  if (!slugs.length) return null;

  const matched = slugs
    .map((s) => articles.find((a) => a.slug === s))
    .filter(Boolean) as Article[];

  if (!matched.length) return null;

  return (
    <section className="mt-8">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-3">
        Related
      </h2>
      <div className="flex flex-wrap gap-2">
        {matched.map((article) => (
          <Link
            key={article.slug}
            href={`/${article.categorySlug}/${article.slug}`}
            className="inline-block px-3 py-1.5 text-sm rounded-full bg-white dark:bg-white/10 border border-[var(--border)] text-[var(--text-primary)] transition-colors hover:bg-[var(--accent-light)] hover:border-[var(--accent)]"
          >
            {article.frontmatter.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
